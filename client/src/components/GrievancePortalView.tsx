import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquarePlus, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Filter,
  PlusCircle,
  FileCheck
} from 'lucide-react';
import { GrievanceTicket, GramPanchayat, Language } from '../types';

interface GrievancePortalViewProps {
  panchayats: GramPanchayat[];
  lang: Language;
  grievances: GrievanceTicket[];
  onAddGrievance: (ticket: GrievanceTicket) => void;
}

export const GrievancePortalView: React.FC<GrievancePortalViewProps> = ({
  panchayats,
  lang,
  grievances,
  onAddGrievance,
}) => {
  const isHi = lang === 'hi';
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [panchayatId, setPanchayatId] = useState(panchayats[0]?.id || '');
  const [villageName, setVillageName] = useState('');
  const [wardNo, setWardNo] = useState('Ward No. 01');
  const [category, setCategory] = useState<GrievanceTicket['category']>('water_leakage');
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedGP = panchayats.find((p) => p.id === panchayatId) || panchayats[0];

  const categoryLabels: Record<GrievanceTicket['category'], { en: string; hi: string }> = {
    water_leakage: { en: 'Tap Water Leakage / Pipeline Fault', hi: 'नल जल लीकेज व पाइपलाइन खराबी' },
    street_light: { en: 'Solar Street Light Breakdown', hi: 'सोलर स्ट्रीट लाइट बंद होना' },
    cleanliness: { en: 'Drainage & Village Cleanliness', hi: 'सार्वजनिक नाली जाम व सफाई' },
    road_damage: { en: 'Pothole & CC Road Damage', hi: 'पक्की सड़क / सीसी रोड मरम्मत' },
    scheme_benefit: { en: 'Scheme Benefit / Pension Issue', hi: 'योजना लाभ / पेंशन समस्या' },
    other: { en: 'Other Public Grievance', hi: 'अन्य जनसमस्या' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !citizenName.trim()) return;

    const newTicket: GrievanceTicket = {
      id: `grv-${Date.now()}`,
      ticketNo: `GP-GRV-${Math.floor(1000 + Math.random() * 9000)}`,
      panchayatId: selectedGP.id,
      panchayatName: selectedGP.name,
      panchayatNameHi: selectedGP.nameHi,
      villageName: villageName.trim() || selectedGP.villages[0]?.name || selectedGP.name,
      wardNo: wardNo,
      category: category,
      categoryHi: categoryLabels[category].hi,
      description: description.trim(),
      citizenName: citizenName.trim(),
      citizenPhone: citizenPhone.trim() || '+91 94140 XXXXX',
      reportedDate: new Date().toISOString().split('T')[0],
      status: 'submitted',
      statusHi: 'दर्ज (VDO को अग्रेषित)',
      adminRemark: isHi ? 'ग्राम पंचायत सचिव द्वारा समीक्षाधीन' : 'Under initial review by Gram Panchayat office.',
    };

    onAddGrievance(newTicket);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowForm(false);
      setDescription('');
      setCitizenName('');
      setCitizenPhone('');
      setVillageName('');
    }, 1500);
  };

  return (
    <div id="grievance-portal-view" className="space-y-4">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800">
            <MessageSquarePlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              {isHi ? 'ग्रामीण जनसमस्या निवारण एवं शिकायत पेटी' : 'Citizen Grievance & Public Feedback Portal'}
            </h3>
            <p className="text-xs text-neutral-500">
              {isHi 
                ? 'पानी, बिजली, नाली, सड़क या योजना संबंधी समस्या सीधे वार्डवार दर्ज करें और निवारण ट्रैक करें' 
                : 'Directly report civic issues and track real-time resolution status from your Gram Panchayat'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>{showForm ? (isHi ? 'सूची देखें' : 'View Tickets') : (isHi ? '+ नई शिकायत दर्ज करें' : '+ Register Complaint')}</span>
        </button>
      </div>

      {/* Complaint Registration Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4"
        >
          <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            {isHi ? 'सार्वजनिक समस्या विवरण फॉर्म' : 'Citizen Complaint Registration Form'}
          </h4>

          {isSuccess ? (
            <div className="py-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h5 className="text-sm font-bold text-neutral-900">
                {isHi ? 'शिकायत सफलतापूर्वक दर्ज हो गई!' : 'Grievance ticket successfully registered!'}
              </h5>
              <p className="text-xs text-neutral-500">
                {isHi ? 'शिकायत क्रमांक जारी कर दिया गया है।' : 'Tracking ID generated and assigned to Gram Panchayat.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'ग्राम पंचायत' : 'Gram Panchayat'}</label>
                  <select
                    value={panchayatId}
                    onChange={(e) => setPanchayatId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  >
                    {panchayats.map((p) => (
                      <option key={p.id} value={p.id}>
                        {isHi ? `${p.nameHi} (${p.districtNameHi})` : `${p.name} (${p.districtName})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'गांव / ढाणी' : 'Village / Hamlet'}</label>
                  <input
                    type="text"
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    placeholder={isHi ? 'उदा. मुख्य गांव' : 'e.g. Main Village'}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'वार्ड संख्या' : 'Ward Number'}</label>
                  <select
                    value={wardNo}
                    onChange={(e) => setWardNo(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  >
                    {Array.from({ length: selectedGP.totalWards || 11 }, (_, i) => (
                      <option key={i + 1} value={`Ward No. ${String(i + 1).padStart(2, '0')}`}>
                        {isHi ? `वार्ड संख्या ${i + 1}` : `Ward No. ${i + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'शिकायत श्रेणी' : 'Issue Category'}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GrievanceTicket['category'])}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  >
                    <option value="water_leakage">{isHi ? '🚰 नल जल लीकेज / पाइपलाइन' : '🚰 Water Leakage'}</option>
                    <option value="street_light">{isHi ? '💡 सोलर स्ट्रीट लाइट बंद' : '💡 Street Light Outage'}</option>
                    <option value="cleanliness">{isHi ? '🧹 नाली जाम व कचरा सफाई' : '🧹 Drainage & Garbage'}</option>
                    <option value="road_damage">{isHi ? '🛣️ सीसी सड़क गड्ढे व मरम्मत' : '🛣️ Road Damage'}</option>
                    <option value="scheme_benefit">{isHi ? '📜 योजना लाभ / आवास / पेंशन' : '📜 Scheme / Pension'}</option>
                    <option value="other">{isHi ? '📝 अन्य सार्वजनिक समस्या' : '📝 Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'शिकायतकर्ता का नाम' : 'Your Name'} *</label>
                  <input
                    type="text"
                    required
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder={isHi ? 'उदा. रामस्वरूप शर्मा' : 'e.g. Ramswaroop Sharma'}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'मोबाइल नंबर (SMS ट्रैकिंग हेतु)' : 'Mobile Number'}</label>
                  <input
                    type="tel"
                    value={citizenPhone}
                    onChange={(e) => setCitizenPhone(e.target.value)}
                    placeholder="+91 94140 XXXXX"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'समस्या का स्पष्ट विवरण' : 'Description of the Issue'} *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={isHi ? 'समस्या का सटीक स्थान, गली या स्थल का विवरण लिखें...' : 'Provide specific location, street name and details...'}
                  className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-neutral-600 bg-neutral-100 hover:bg-neutral-200 font-bold"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isHi ? 'शिकायत सबमिट करें' : 'Submit Ticket'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}

      {/* Existing Grievance Tickets List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
          {isHi ? `पंजीकृत जनशिकायतें (${grievances.length})` : `Registered Grievances (${grievances.length})`}
        </h4>

        {grievances.map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
                  {ticket.ticketNo}
                </span>
                <span className="text-xs font-semibold text-neutral-600">
                  {isHi ? `पं. ${ticket.panchayatNameHi}` : `GP: ${ticket.panchayatName}`} • {ticket.wardNo}
                </span>
              </div>

              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto ${
                ticket.status === 'resolved'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : ticket.status === 'under_review'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
              }`}>
                {isHi ? ticket.statusHi : ticket.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-indigo-700">
                {isHi ? ticket.categoryHi : categoryLabels[ticket.category].en}
              </span>
              <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                {ticket.description}
              </p>
            </div>

            {ticket.adminRemark && (
              <div className="p-2.5 bg-neutral-50 rounded-xl text-xs text-neutral-700 border border-neutral-200 flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900">{isHi ? 'कार्रवाई टिप्पणी:' : 'Action Remark:'}</strong>{' '}
                  <span>{ticket.adminRemark}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
              <span>{isHi ? `शिकायतकर्ता: ${ticket.citizenName}` : `Citizen: ${ticket.citizenName}`}</span>
              <span>{isHi ? `दिनांक: ${ticket.reportedDate}` : `Date: ${ticket.reportedDate}`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
