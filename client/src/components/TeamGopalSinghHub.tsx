import React, { useMemo, useState } from 'react';
import { Bell, BookOpen, Building2, CalendarDays, Camera, CheckCircle2, ChevronRight, ClipboardList, FileText, HeartPulse, Landmark, Map, MessageSquare, Megaphone, Phone, Search, ShieldCheck, Sparkles, Trophy, UserPlus, Users, Vote, Waves, Wheat, Wrench, X } from 'lucide-react';
import { Language } from '../types';

const CONTACTS = [
  ['जनसंपर्क', '9166377972', 'tel:9166377972'],
  ['टीम संपर्क', '9166047972', 'tel:9166047972'],
];

const MODULES = [
  ['development','विकास ट्रैकर','Development Tracker','काम, लागत, प्रगति और फोटो रिकॉर्ड','Wrench'],
  ['wards','वार्ड सिस्टम','Ward System','9 वार्डों की समस्या और कार्य सूची','Users'],
  ['map','डिजिटल मैप','Digital Map','गांव, स्कूल, स्वास्थ्य और विकास स्थान','Map'],
  ['village','हरनावदा गजा','Harnawada Gaja','पंचायत, गांव और स्थानीय सुविधाओं का पोर्टल','Landmark'],
  ['election','चुनाव डेटा','Election Data','वार्ड, बूथ, आरक्षण और ऐतिहासिक डेटा','Vote'],
  ['education','शिक्षा','Education','स्कूल, स्टाफ, UDISE और शिक्षा समस्याएं','BookOpen'],
  ['health','स्वास्थ्य','Health','स्वास्थ्य केंद्र और जनस्वास्थ्य सेवाएं','HeartPulse'],
  ['water','जल एवं सिंचाई','Water & Irrigation','पेयजल, नहर, अनिकट और सिंचाई','Waves'],
  ['roads','सड़क एवं इंफ्रास्ट्रक्चर','Roads & Infrastructure','सड़क, बिजली, स्ट्रीट लाइट और काम','Building2'],
  ['farmer','किसान','Farmer','PM-Kisan, कृषि सेवाएं और सरकारी पोर्टल','Wheat'],
  ['youth','युवा एवं शिक्षा','Youth & Education','करियर, छात्रवृत्ति और युवा गतिविधियां','Sparkles'],
  ['sports','खेल','Sports','खेल मैदान, टीम और आयोजन','Trophy'],
  ['news','समाचार','News','स्थानीय समाचार और अपडेट','Megaphone'],
  ['notices','जन सूचना बोर्ड','Public Notice','सार्वजनिक नोटिस और घोषणाएं','Bell'],
  ['events','कार्यक्रम','Events','ग्राम/क्षेत्रीय कार्यक्रम कैलेंडर','CalendarDays'],
  ['gallery','गैलरी','Gallery','विकास व कार्यक्रम फोटो','Camera'],
  ['documents','दस्तावेज','Documents','फॉर्म, आवेदन और PDF संसाधन','FileText'],
  ['suggestions','सुझाव','Suggestions','जनता से सुझाव और प्रतिक्रिया','MessageSquare'],
  ['polls','जनमत','Polls','सर्वे और स्थानीय जनमत','ClipboardList'],
  ['volunteer','स्वयंसेवक','Volunteer','स्वयंसेवक पंजीकरण और गतिविधियां','UserPlus'],
  ['notifications','सूचनाएं','Notifications','महत्वपूर्ण अपडेट और अलर्ट','Bell'],
  ['services','सरकारी सेवाएं','Government Services','राजस्थान की आधिकारिक सेवाओं तक पहुंच','ShieldCheck'],
  ['admin','एडमिन डैशबोर्ड','Admin Dashboard','स्थानीय कंटेंट और डेटा प्रबंधन','Landmark'],
] as const;

const ICONS: Record<string, React.ElementType> = { Wrench, Users, Map, Landmark, Vote, BookOpen, HeartPulse, Waves, Building2, Wheat, Sparkles, Trophy, Megaphone, Bell, CalendarDays, Camera, FileText, MessageSquare, ClipboardList, UserPlus, ShieldCheck };

const sampleItems: Record<string, string[]> = {
  development: ['सड़क मरम्मत — स्थिति अपडेट करें', 'पेयजल पाइपलाइन — कार्य प्रगति दर्ज करें', 'स्कूल भवन/कक्ष — निरीक्षण रिपोर्ट जोड़ें'],
  wards: ['वार्ड 1 — सड़क/नाली समस्या', 'वार्ड 2 — स्ट्रीट लाइट', 'वार्ड 3 — पेयजल', 'वार्ड 4 — सफाई', 'वार्ड 5 — सड़क', 'वार्ड 6 — नाली', 'वार्ड 7 — जल आपूर्ति', 'वार्ड 8 — स्ट्रीट लाइट', 'वार्ड 9 — अन्य'],
  election: ['2026 पंचायत आरक्षण/चुनाव डेटा', 'वार्डवार डेटा', 'बूथवार डेटा', 'ऐतिहासिक चुनाव रिकॉर्ड'],
  education: ['राजकीय उच्च माध्यमिक विद्यालय — स्टाफ/सुविधा ट्रैकर', 'UDISE/शाला दर्पण लिंक', 'विद्यार्थी/शिक्षा समस्या रिपोर्ट'],
  health: ['नजदीकी स्वास्थ्य केंद्र', 'एम्बुलेंस/आपात सेवा', 'स्वास्थ्य शिविर सूचना'],
  water: ['पेयजल शिकायत', 'लिफ्ट नहर/सिंचाई', 'आहू नदी/अनिकट', 'जल स्रोत निरीक्षण'],
  roads: ['सड़क क्षति रिपोर्ट', 'पुलिया/नाली', 'स्ट्रीट लाइट', 'बिजली समस्या'],
  farmer: ['PM-Kisan', 'e-NAM/मंडी', 'कृषि योजनाएं', 'मौसम/कृषि सलाह'],
  youth: ['छात्रवृत्ति', 'करियर/रोजगार', 'कौशल विकास', 'युवा गतिविधियां'],
  sports: ['खेल मैदान', 'खेल आयोजन', 'युवा टीम/खिलाड़ी'],
  services: ['जन आधार/SSO', 'Rajasthan Sampark 181', 'ई-मित्र', 'eGramSwaraj', 'LGD'],
};

export const TeamGopalSinghHub: React.FC<{ lang: Language; onNavigate: (tab: any) => void }> = ({ lang, onNavigate }) => {
  const hi = lang === 'hi';
  const [module, setModule] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [saved, setSaved] = useState<string[]>(() => JSON.parse(localStorage.getItem('tgs_suggestions_v1') || '[]'));

  const filtered = useMemo(() => MODULES.filter(m => `${m[1]} ${m[2]} ${m[3]}`.toLowerCase().includes(search.toLowerCase())), [search]);
  const active = MODULES.find(m => m[0] === module);

  const saveSuggestion = () => {
    if (!suggestion.trim()) return;
    const next = [suggestion.trim(), ...saved].slice(0, 100);
    setSaved(next); localStorage.setItem('tgs_suggestions_v1', JSON.stringify(next)); setSuggestion('');
  };

  const quick = (tab: any) => { setModule(null); onNavigate(tab); };

  return <section className="space-y-5">
    <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 shadow-xl border border-amber-500/20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-300/20 text-amber-200 text-xs font-bold"><Sparkles className="w-4 h-4"/> TEAM GOPALSINGH</div>
          <h1 className="text-3xl sm:text-4xl font-black mt-3">टीम गोपालसिंह – हरनावदा गजा</h1>
          <p className="mt-2 text-slate-300 max-w-2xl">गांव की आवाज़ • गांव का विकास • गांव के साथ</p>
          <p className="mt-3 text-sm text-slate-400">ग्राम पंचायत हरनावदा गजा • तहसील पिड़ावा • जिला झालावाड़ • विधानसभा 198 – झालरापाटन</p>
        </div>
        <div className="grid grid-cols-2 gap-2 min-w-[260px]">
          <a href="tel:9166377972" className="rounded-2xl bg-white/10 hover:bg-white/15 p-4 border border-white/10"><Phone className="w-5 h-5 text-amber-300"/><div className="text-xs text-slate-400 mt-2">{CONTACTS[0][0]}</div><b>{CONTACTS[0][1]}</b></a>
          <a href="tel:9166047972" className="rounded-2xl bg-white/10 hover:bg-white/15 p-4 border border-white/10"><Phone className="w-5 h-5 text-amber-300"/><div className="text-xs text-slate-400 mt-2">{CONTACTS[1][0]}</div><b>{CONTACTS[1][1]}</b></a>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <button onClick={() => quick('grievance')} className="rounded-2xl bg-rose-500/15 border border-rose-300/20 p-4 text-left"><MessageSquare className="w-5 h-5"/><b className="block mt-2">शिकायत दर्ज करें</b><span className="text-xs text-slate-400">Complaint</span></button>
        <button onClick={() => setModule('development')} className="rounded-2xl bg-emerald-500/15 border border-emerald-300/20 p-4 text-left"><Wrench className="w-5 h-5"/><b className="block mt-2">विकास देखें</b><span className="text-xs text-slate-400">Development</span></button>
        <button onClick={() => setModule('services')} className="rounded-2xl bg-blue-500/15 border border-blue-300/20 p-4 text-left"><ShieldCheck className="w-5 h-5"/><b className="block mt-2">सरकारी सेवाएं</b><span className="text-xs text-slate-400">Services</span></button>
        <button onClick={() => setModule('notifications')} className="rounded-2xl bg-amber-500/15 border border-amber-300/20 p-4 text-left"><Bell className="w-5 h-5"/><b className="block mt-2">महत्वपूर्ण सूचना</b><span className="text-xs text-slate-400">Notices</span></button>
      </div>
    </div>

    <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder={hi ? 'सभी मॉड्यूल में खोजें…' : 'Search all modules…'} className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 outline-none focus:bg-white focus:border-amber-500"/></div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filtered.map(m => { const Icon = ICONS[m[4]] || FileText; return <button key={m[0]} onClick={() => setModule(m[0])} className="group text-left bg-white rounded-2xl border border-neutral-200 p-5 hover:-translate-y-0.5 hover:shadow-lg hover:border-amber-300 transition-all"><div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-300 flex items-center justify-center"><Icon className="w-5 h-5"/></div><h3 className="font-extrabold mt-4 text-neutral-900">{m[1]}</h3><p className="text-xs text-neutral-500 mt-1">{m[2]}</p><p className="text-sm text-neutral-600 mt-3">{m[3]}</p><span className="inline-flex items-center gap-1 mt-4 text-xs font-bold text-amber-700">खोलें <ChevronRight className="w-3.5 h-3.5"/></span></button> })}
    </div>

    {active && <div className="fixed inset-0 z-50 bg-black/50 p-4 flex items-center justify-center" onMouseDown={e => e.target === e.currentTarget && setModule(null)}>
      <div className="w-full max-w-2xl max-h-[88vh] overflow-auto rounded-3xl bg-white shadow-2xl">
        <div className="p-5 border-b flex items-center justify-between sticky top-0 bg-white z-10"><div><h2 className="text-xl font-black">{active[1]}</h2><p className="text-xs text-neutral-500">{active[2]}</p></div><button onClick={() => setModule(null)} className="p-2 rounded-xl bg-neutral-100"><X className="w-5 h-5"/></button></div>
        <div className="p-5 space-y-3">
          {(sampleItems[active[0]] || [`${active[1]} का डेटा यहां प्रबंधित किया जा सकता है`, 'नया रिकॉर्ड जोड़ें', 'फोटो/दस्तावेज संलग्न करें', 'स्थिति और अपडेट दर्ज करें']).map((x, i) => <div key={i} className="p-4 rounded-2xl border border-neutral-200 flex items-center justify-between"><div><b className="text-sm">{x}</b><p className="text-xs text-neutral-500 mt-1">स्थानीय रिकॉर्ड • ऑफलाइन सेव</p></div><ChevronRight className="w-4 h-4 text-neutral-400"/></div>)}
          {['development','wards','education','health','water','roads','services'].includes(active[0]) && <div className="pt-3 flex flex-wrap gap-2"><button onClick={() => quick(active[0] === 'services' ? 'citizenServices' : active[0] === 'education' ? 'jhalawarDistrict' : active[0] === 'development' ? 'schemes' : 'jhalawarDistrict')} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold">मौजूदा डेटा मॉड्यूल खोलें</button><button onClick={() => setModule(null)} className="px-4 py-2 rounded-xl border text-sm font-bold">बंद करें</button></div>}
          {active[0] === 'suggestions' && <div className="pt-3"><textarea value={suggestion} onChange={e => setSuggestion(e.target.value)} rows={4} placeholder="अपना सुझाव लिखें…" className="w-full border rounded-2xl p-3 outline-none focus:border-amber-500"/><button onClick={saveSuggestion} className="mt-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold">सुझाव सुरक्षित करें</button>{saved.length > 0 && <p className="text-xs text-neutral-500 mt-3">इस डिवाइस पर {saved.length} सुझाव सुरक्षित हैं।</p>}</div>}
          {active[0] === 'gallery' && <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600"><Camera className="w-6 h-6 mb-2"/>गैलरी के लिए फोटो अपलोड/storage backend जोड़ने पर वास्तविक cloud gallery सक्रिय होगी।</div>}
          {active[0] === 'map' && <a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Harnawada+Gaja+Rajasthan" className="inline-flex px-4 py-2 rounded-xl bg-slate-900 text-white font-bold">Google Maps खोलें</a>}
        </div>
      </div>
    </div>}
  </section>;
};
