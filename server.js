const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET;
const ALLOW_DEV_OTP = process.env.ALLOW_DEV_OTP === "true";
const DEV_OTP = process.env.DEV_OTP || "123456";
const ADMIN_PHONES = new Set(String(process.env.ADMIN_PHONES || "").split(",").map(v => v.trim()).filter(Boolean));

const fs = require("fs");
const DATA_DIR = path.join(__dirname, "data");
fs.mkdirSync(DATA_DIR, { recursive: true });
if (!SECRET) {
  console.warn("WARNING: JWT_SECRET is not set. Protected API login is disabled until JWT_SECRET is configured.");
}
const db = new Database(path.join(DATA_DIR, "app.db"));
const CLIENT_DIST = path.join(__dirname, "client", "dist");
const HAS_CLIENT_BUILD = fs.existsSync(path.join(CLIENT_DIST, "index.html"));

app.disable("x-powered-by");
app.use((req,res,next)=>{
  res.setHeader("X-Content-Type-Options","nosniff");
  res.setHeader("Referrer-Policy","strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options","SAMEORIGIN");
  next();
});
app.use(express.json({limit:"2mb"}));
// Serve the built React app (client/) when available; otherwise fall back
// to the minimal static public/ page (e.g. before `npm run build` has been run).
app.use(express.static(HAS_CLIENT_BUILD ? CLIENT_DIST : path.join(__dirname, "public")));

db.exec(`
CREATE TABLE IF NOT EXISTS users(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 phone TEXT UNIQUE NOT NULL,
 role TEXT NOT NULL DEFAULT 'citizen',
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS complaints(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 case_id TEXT UNIQUE NOT NULL,
 user_id INTEGER,
 title TEXT NOT NULL,
 description TEXT NOT NULL,
 category TEXT NOT NULL,
 village TEXT NOT NULL,
 latitude REAL,
 longitude REAL,
 priority TEXT NOT NULL DEFAULT 'medium',
 status TEXT NOT NULL DEFAULT 'submitted',
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS projects(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 village TEXT NOT NULL,
 category TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'planned',
 progress INTEGER NOT NULL DEFAULT 0,
 budget REAL NOT NULL DEFAULT 0,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS schemes(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 department TEXT NOT NULL,
 eligibility TEXT NOT NULL,
 description TEXT NOT NULL,
 source_url TEXT,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS villages(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT UNIQUE NOT NULL,
 panchayat TEXT NOT NULL,
 population INTEGER NOT NULL DEFAULT 0,
 problems INTEGER NOT NULL DEFAULT 0,
 projects INTEGER NOT NULL DEFAULT 0
);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS field_visits(
 id INTEGER PRIMARY KEY AUTOINCREMENT, case_id TEXT NOT NULL, user_id INTEGER, notes TEXT NOT NULL, latitude REAL, longitude REAL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS audit_logs(
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, action TEXT NOT NULL, entity TEXT NOT NULL, entity_id TEXT, before_json TEXT, after_json TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS notifications(
 id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT NOT NULL, body TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'queued', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS complaint_assignments(
 id INTEGER PRIMARY KEY AUTOINCREMENT, complaint_id INTEGER NOT NULL, assignee TEXT NOT NULL, assigned_by INTEGER, due_at TEXT, status TEXT NOT NULL DEFAULT 'assigned', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS complaint_feedback(
 id INTEGER PRIMARY KEY AUTOINCREMENT, complaint_id INTEGER NOT NULL, user_id INTEGER, rating INTEGER, comment TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS documents(
 id INTEGER PRIMARY KEY AUTOINCREMENT, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, filename TEXT NOT NULL, mime_type TEXT, storage_key TEXT, verification_status TEXT NOT NULL DEFAULT 'pending', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);

function auth(req,res,next){
  if (!SECRET) return res.status(503).json({error:"Server security is not configured. Set JWT_SECRET before enabling protected APIs."});
  const h=req.headers.authorization||"";
  if(!h.startsWith("Bearer ")) return res.status(401).json({error:"Authentication required"});
  try { req.user=jwt.verify(h.slice(7),SECRET); next(); }
  catch { res.status(401).json({error:"Invalid or expired token"}); }
}

const otpAttempts = new Map();
function allowOtpAttempt(phone){
  const now=Date.now();
  const recent=(otpAttempts.get(phone)||[]).filter(t=>now-t<15*60*1000);
  if(recent.length>=5) return false;
  recent.push(now); otpAttempts.set(phone,recent); return true;
}

app.post("/api/auth/request-otp",(req,res)=>{
  const phone=String(req.body.phone||"").trim();
  if(!/^\d{10}$/.test(phone)) return res.status(400).json({error:"Enter a valid 10-digit mobile number"});
  if(!allowOtpAttempt(phone)) return res.status(429).json({error:"Too many OTP requests. Try again later."});
  if(ALLOW_DEV_OTP && process.env.NODE_ENV === "production") return res.status(503).json({error:"Development OTP cannot be enabled in production."});
  res.json({ok:true, ...(ALLOW_DEV_OTP ? {devOtp: DEV_OTP} : {}), message: ALLOW_DEV_OTP ? "Development OTP enabled." : "OTP request accepted. Connect an SMS provider to deliver the OTP."});
});

app.post("/api/auth/verify-otp",(req,res)=>{
  const phone=String(req.body.phone||"").trim();
  const otp=String(req.body.otp||"").trim();
  if(ALLOW_DEV_OTP) { if(otp!==DEV_OTP) return res.status(401).json({error:"Invalid OTP"}); } else { return res.status(503).json({error:"SMS OTP provider is not configured. Set ALLOW_DEV_OTP=true only for local development."}); }
  let user=db.prepare("SELECT * FROM users WHERE phone=?").get(phone);
  if(!user){
    const role = ADMIN_PHONES.has(phone) ? "admin" : "citizen";
    const r=db.prepare("INSERT INTO users(name,phone,role) VALUES(?,?,?)").run(role === "admin" ? "Administrator" : "Citizen",phone,role);
    user=db.prepare("SELECT * FROM users WHERE id=?").get(r.lastInsertRowid);
  }
  const token=jwt.sign({id:user.id,name:user.name,phone:user.phone,role:user.role},SECRET,{expiresIn:"7d"});
  res.json({token,user});
});

app.get("/api/dashboard",(req,res)=>{
  const complaints=db.prepare("SELECT COUNT(*) c FROM complaints").get().c;
  const projects=db.prepare("SELECT COUNT(*) c FROM projects").get().c;
  const open=db.prepare("SELECT COUNT(*) c FROM complaints WHERE status NOT IN ('resolved','closed')").get().c;
  res.json({complaints,projects,open});
});

app.get("/api/complaints",auth,(req,res)=>{
  const q=String(req.query.q||"").trim();
  const status=String(req.query.status||"").trim();
  let sql="SELECT * FROM complaints WHERE 1=1"; const args=[];
  if(req.user.role === "citizen"){ sql += " AND user_id=?"; args.push(req.user.id); }
  if(q){sql += " AND (case_id LIKE ? OR title LIKE ? OR village LIKE ? OR category LIKE ?)"; const x=`%${q}%`; args.push(x,x,x,x);}
  if(status){sql += " AND status=?"; args.push(status);}
  sql += " ORDER BY id DESC LIMIT 500";
  res.json(db.prepare(sql).all(...args));
});

app.post("/api/complaints",(req,res)=>{
  // Public submission is intentional: citizens can report issues without creating
  // an account. If a valid bearer token is supplied, it is linked to the user.
  let actor = null;
  const h=req.headers.authorization||"";
  if(h.startsWith("Bearer ") && SECRET){
    try { actor=jwt.verify(h.slice(7),SECRET); } catch {}
  }
  const b=req.body;
  if(!b.title||!b.description||!b.category||!b.village) return res.status(400).json({error:"Title, description, category and village are required"});
  const title=String(b.title).trim().slice(0,200);
  const description=String(b.description).trim().slice(0,5000);
  const category=String(b.category).trim().slice(0,100);
  const village=String(b.village).trim().slice(0,200);
  if(!title||!description||!category||!village) return res.status(400).json({error:"Invalid complaint fields"});
  const priority=["low","medium","high","critical"].includes(String(b.priority)) ? String(b.priority) : "medium";
  const latitude=Number.isFinite(Number(b.latitude)) ? Number(b.latitude) : null;
  const longitude=Number.isFinite(Number(b.longitude)) ? Number(b.longitude) : null;
  if(latitude!==null && (latitude < -90 || latitude > 90)) return res.status(400).json({error:"Invalid latitude"});
  if(longitude!==null && (longitude < -180 || longitude > 180)) return res.status(400).json({error:"Invalid longitude"});
  const caseId="TGS-"+new Date().getFullYear()+"-"+crypto.randomBytes(4).toString("hex").toUpperCase();
  const r=db.prepare(`INSERT INTO complaints(case_id,user_id,title,description,category,village,latitude,longitude,priority)
    VALUES(?,?,?,?,?,?,?,?,?)`).run(caseId,actor?.id||null,title,description,category,village,latitude,longitude,priority);
  db.prepare("INSERT INTO audit_logs(user_id,action,entity,entity_id,after_json) VALUES(?,?,?,?,?)").run(actor?.id||null,"complaint_created","complaint",String(r.lastInsertRowid),JSON.stringify({title,description,category,village,latitude,longitude,priority}));
  res.status(201).json(db.prepare("SELECT * FROM complaints WHERE id=?").get(r.lastInsertRowid));
});

app.patch("/api/complaints/:id",auth,(req,res)=>{
  if(!["admin","officer"].includes(req.user.role)) return res.status(403).json({error:"Officer/Admin permission required"});
  const status=String(req.body.status||"").trim();
  const allowed=["submitted","assigned","in_progress","verified","resolved","closed"];
  if(!allowed.includes(status)) return res.status(400).json({error:"Invalid status"});
  const before=db.prepare("SELECT * FROM complaints WHERE id=?").get(req.params.id);
  if(!before) return res.status(404).json({error:"Complaint not found"});
  db.prepare("UPDATE complaints SET status=? WHERE id=?").run(status,req.params.id);
  const after=db.prepare("SELECT * FROM complaints WHERE id=?").get(req.params.id);
  db.prepare("INSERT INTO audit_logs(user_id,action,entity,entity_id,before_json,after_json) VALUES(?,?,?,?,?,?)").run(req.user.id,"complaint_status_changed","complaint",String(req.params.id),JSON.stringify(before),JSON.stringify(after));
  res.json(after);
});
app.post("/api/complaints/:id/assign",auth,(req,res)=>{
  if(!["admin","officer"].includes(req.user.role)) return res.status(403).json({error:"Officer/Admin permission required"});
  const complaint=db.prepare("SELECT id FROM complaints WHERE id=?").get(req.params.id); if(!complaint) return res.status(404).json({error:"Complaint not found"});
  const assignee=String(req.body.assignee||"").trim(); if(!assignee) return res.status(400).json({error:"Assignee is required"});
  const dueAt=req.body.due_at||null;
  const r=db.prepare("INSERT INTO complaint_assignments(complaint_id,assignee,assigned_by,due_at) VALUES(?,?,?,?)").run(req.params.id,assignee,req.user.id,dueAt);
  db.prepare("UPDATE complaints SET status='assigned' WHERE id=?").run(req.params.id);
  db.prepare("INSERT INTO audit_logs(user_id,action,entity,entity_id,after_json) VALUES(?,?,?,?,?)").run(req.user.id,"complaint_assigned","complaint",String(req.params.id),JSON.stringify({assignee,due_at:dueAt}));
  res.status(201).json(db.prepare("SELECT * FROM complaint_assignments WHERE id=?").get(r.lastInsertRowid));
});
app.get("/api/complaints/:id/assignments",auth,(req,res)=>{
  const complaint=db.prepare("SELECT id,user_id FROM complaints WHERE id=?").get(req.params.id);
  if(!complaint) return res.status(404).json({error:"Complaint not found"});
  if(req.user.role === "citizen" && complaint.user_id !== req.user.id) return res.status(403).json({error:"Forbidden"});
  res.json(db.prepare("SELECT * FROM complaint_assignments WHERE complaint_id=? ORDER BY id DESC").all(req.params.id));
});
app.post("/api/complaints/:id/feedback",auth,(req,res)=>{
  const rating=Number(req.body.rating); if(!Number.isInteger(rating)||rating<1||rating>5) return res.status(400).json({error:"Rating must be 1-5"});
  const complaint=db.prepare("SELECT id,user_id,status FROM complaints WHERE id=?").get(req.params.id);
  if(!complaint) return res.status(404).json({error:"Complaint not found"});
  if(req.user.role === "citizen" && complaint.user_id !== req.user.id) return res.status(403).json({error:"You can only rate your own complaint"});
  const r=db.prepare("INSERT INTO complaint_feedback(complaint_id,user_id,rating,comment) VALUES(?,?,?,?)").run(req.params.id,req.user.id,rating,String(req.body.comment||""));
  res.status(201).json(db.prepare("SELECT * FROM complaint_feedback WHERE id=?").get(r.lastInsertRowid));
});

app.get("/api/projects",(req,res)=>res.json(db.prepare("SELECT * FROM projects ORDER BY id DESC").all()));
app.post("/api/projects",auth,(req,res)=>{
  if(!["admin","officer"].includes(req.user.role)) return res.status(403).json({error:"Officer/Admin permission required"});
  const b=req.body;
  if(!b.name||!b.village||!b.category) return res.status(400).json({error:"Name, village and category are required"});
  const r=db.prepare("INSERT INTO projects(name,village,category,status,progress,budget) VALUES(?,?,?,?,?,?)")
    .run(b.name,b.village,b.category,b.status||"planned",Number(b.progress||0),Number(b.budget||0));
  res.status(201).json(db.prepare("SELECT * FROM projects WHERE id=?").get(r.lastInsertRowid));
});

app.patch("/api/projects/:id",auth,(req,res)=>{
  if(!["admin","officer"].includes(req.user.role)) return res.status(403).json({error:"Officer/Admin permission required"});
  const before=db.prepare("SELECT * FROM projects WHERE id=?").get(req.params.id);
  if(!before) return res.status(404).json({error:"Project not found"});
  const b=req.body||{};
  const status=["planned","in_progress","completed","on_hold"].includes(String(b.status)) ? String(b.status) : before.status;
  const progress=Math.max(0,Math.min(100,Number.isFinite(Number(b.progress)) ? Number(b.progress) : before.progress));
  const budget=Number.isFinite(Number(b.budget)) && Number(b.budget)>=0 ? Number(b.budget) : before.budget;
  db.prepare("UPDATE projects SET status=?,progress=?,budget=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").run(status,progress,budget,req.params.id);
  const after=db.prepare("SELECT * FROM projects WHERE id=?").get(req.params.id);
  db.prepare("INSERT INTO audit_logs(user_id,action,entity,entity_id,before_json,after_json) VALUES(?,?,?,?,?,?)").run(req.user.id,"project_updated","project",String(req.params.id),JSON.stringify(before),JSON.stringify(after));
  res.json(after);
});

app.get("/api/schemes",(req,res)=>res.json(db.prepare("SELECT * FROM schemes ORDER BY id DESC").all()));
app.get("/api/villages",(req,res)=>res.json(db.prepare("SELECT * FROM villages ORDER BY name").all()));

app.get("/api/me",auth,(req,res)=>res.json(req.user));
app.post("/api/field-visits",auth,(req,res)=>{
 const b=req.body; if(!b.case_id||!b.notes) return res.status(400).json({error:"Case ID and notes are required"});
 const r=db.prepare("INSERT INTO field_visits(case_id,user_id,notes,latitude,longitude) VALUES(?,?,?,?,?)").run(b.case_id,req.user.id,b.notes,b.latitude||null,b.longitude||null);
 db.prepare("INSERT INTO audit_logs(user_id,action,entity,entity_id,after_json) VALUES(?,?,?,?,?)").run(req.user.id,"field_visit_created","field_visit",String(r.lastInsertRowid),JSON.stringify(b));
 res.status(201).json(db.prepare("SELECT * FROM field_visits WHERE id=?").get(r.lastInsertRowid));
});
app.get("/api/notifications",auth,(req,res)=>res.json(db.prepare("SELECT * FROM notifications WHERE user_id=? OR user_id IS NULL ORDER BY id DESC LIMIT 100").all(req.user.id)));
app.get("/api/documents",auth,(req,res)=>res.json(db.prepare("SELECT * FROM documents ORDER BY id DESC LIMIT 200").all()));
app.get("/api/reports/summary",(req,res)=>{
 const total_cases=db.prepare("SELECT COUNT(*) c FROM complaints").get().c;
 const resolved=db.prepare("SELECT COUNT(*) c FROM complaints WHERE status IN ('resolved','closed')").get().c;
 const projects=db.prepare("SELECT COUNT(*) c FROM projects").get().c;
 const villages=db.prepare("SELECT COUNT(*) c FROM villages").get().c;
 const by_category=db.prepare("SELECT category, COUNT(*) count FROM complaints GROUP BY category ORDER BY count DESC").all();
 const by_status=db.prepare("SELECT status, COUNT(*) count FROM complaints GROUP BY status ORDER BY count DESC").all();
 const avgRow=db.prepare("SELECT AVG(rating) a FROM complaint_feedback").get();
 const avg_rating = avgRow && avgRow.a ? Number(avgRow.a).toFixed(1) : "0.0";
 res.json({total_cases,resolved,projects,villages,by_category,by_status,avg_rating});
});
app.post("/api/schemes",auth,(req,res)=>{
  if(!["admin","officer"].includes(req.user.role)) return res.status(403).json({error:"Officer/Admin permission required"});
  const b=req.body||{};
  if(!b.name||!b.department||!b.eligibility||!b.description) return res.status(400).json({error:"Name, department, eligibility and description are required"});
  const r=db.prepare("INSERT INTO schemes(name,department,eligibility,description,source_url) VALUES(?,?,?,?,?)").run(String(b.name).trim(),String(b.department).trim(),String(b.eligibility).trim(),String(b.description).trim(),String(b.source_url||"").trim());
  res.status(201).json(db.prepare("SELECT * FROM schemes WHERE id=?").get(r.lastInsertRowid));
});
app.patch("/api/schemes/:id",auth,(req,res)=>{
  if(!["admin","officer"].includes(req.user.role)) return res.status(403).json({error:"Officer/Admin permission required"});
  const b=req.body||{}; const before=db.prepare("SELECT * FROM schemes WHERE id=?").get(req.params.id);
  if(!before) return res.status(404).json({error:"Scheme not found"});
  db.prepare("UPDATE schemes SET name=?,department=?,eligibility=?,description=?,source_url=?,updated_at=CURRENT_TIMESTAMP WHERE id=?")
    .run(String(b.name??before.name).trim(),String(b.department??before.department).trim(),String(b.eligibility??before.eligibility).trim(),String(b.description??before.description).trim(),String(b.source_url??before.source_url).trim(),req.params.id);
  res.json(db.prepare("SELECT * FROM schemes WHERE id=?").get(req.params.id));
});
app.post("/api/villages",auth,(req,res)=>{
  if(!["admin","officer"].includes(req.user.role)) return res.status(403).json({error:"Officer/Admin permission required"});
  const b=req.body||{};
  if(!b.name||!b.panchayat) return res.status(400).json({error:"Name and panchayat are required"});
  try {
    const r=db.prepare("INSERT INTO villages(name,panchayat,population,problems,projects) VALUES(?,?,?,?,?)").run(String(b.name).trim(),String(b.panchayat).trim(),Math.max(0,Number(b.population||0)),Math.max(0,Number(b.problems||0)),Math.max(0,Number(b.projects||0)));
    res.status(201).json(db.prepare("SELECT * FROM villages WHERE id=?").get(r.lastInsertRowid));
  } catch { res.status(409).json({error:"Village already exists"}); }
});
app.get("/api/health",(req,res)=>res.json({ok:true,service:"team-gopal-singh",time:new Date().toISOString()}));

app.get("/api/audit",auth,(req,res)=>{
  if(req.user.role!=="admin") return res.status(403).json({error:"Admin permission required"});
  res.json(db.prepare("SELECT * FROM audit_logs ORDER BY id DESC LIMIT 200").all());
});



app.get("*",(req,res)=>{
  if(HAS_CLIENT_BUILD) return res.sendFile(path.join(CLIENT_DIST,"index.html"));
  res.sendFile(path.join(__dirname,"public","index.html"));
});
app.listen(PORT,()=>console.log(`Team Gopal Singh app running at http://localhost:${PORT}`));
