import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShieldCheck, MapPin, Phone, Users, Home, CheckCircle2, 
  Clock, Award, BookOpen, HeartPulse, Droplets, Zap, Wifi, 
  Printer, Check, Plus, Download
} from 'lucide-react';
import { GramPanchayat, Language, SchemeWork } from '../types';
import { exportPanchayatToCSV } from '../utils/exportUtils';

interface PanchayatDetailModalProps {
  panchayat: GramPanchayat | null;
  lang: Language;
  onClose: () => void;
  onToggleSchemeStatus: (panchayatId: string, schemeId: string) => void;
  onAddSchemeWork: (panchayatId: string, scheme: Omit<SchemeWork, 'id'>) => void;
}

export const PanchayatDetailModal: React.FC<PanchayatDetailModalProps> = ({
  panchayat,
  lang,
  onClose,
  onToggleSchemeStatus,
  onAddSchemeWork,
}) => {
  const [activeTab, setActiveTab] = useState<'villages' | 'schemes' | 'representatives'>('villages');
  const [showAddScheme, setShowAddScheme] = useState(false);
  const [newSchemeName, setNewSchemeName] = useState('');
  const [newSchemeBudget, setNewSchemeBudget] = useState('');
  const [newSchemeDesc, setNewSchemeDesc] = useState('');

  if (!panchayat) return null;

  const isHi = lang === 'hi';

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    exportPanchayatToCSV(panchayat, lang);
  };

  const handleCreateScheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchemeName.trim()) return;

    onAddSchemeWork(panchayat.id, {
      schemeName: newSchemeName.trim(),
      schemeNameHi: newSchemeName.trim(),
      description: newSchemeDesc.trim() || 'Panchayat level developmental work verified by Gram Sabha',
      descriptionHi: newSchemeDesc.trim() || 'ग्राम सभा द्वारा अनुमोदित व सत्यापित विकास कार्य',
      budgetAllocated: newSchemeBudget.trim() || '₹ 5.00 Lakh',
      status: 'in_progress',
      statusHi: 'प्रगति पर',
      completionYear: new Date().getFullYear().toString(),
      verified: true,
    });

    setNewSchemeName('');
    setNewSchemeBudget('');
    setNewSchemeDesc('');
    setShowAddScheme(false);
  };

  return (
    <AnimatePresence>
      <div 
        id="panchayat-detail-backdrop" 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="panchayat-detail-modal"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-neutral-900"
        >
          {/* Top Modal Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  LGD: {panchayat.lgdCode}
                </span>
                <span className="text-xs text-neutral-300 font-medium">
                  {isHi ? `${panchayat.samitiNameHi} • ${panchayat.districtNameHi} (${panchayat.stateHi})` : `${panchayat.samitiName} • ${panchayat.districtName} (${panchayat.state})`}
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                {isHi ? `ग्राम पंचायत ${panchayat.nameHi}` : `Gram Panchayat ${panchayat.name}`}
              </h2>
              <p className="text-xs text-neutral-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{isHi ? panchayat.panchayatBhawanAddressHi : panchayat.panchayatBhawanAddress}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleExportCSV}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                title="Download CSV Dossier"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                title="Print Panchayat Dossier"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                id="close-detail-modal-btn"
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 divide-x divide-neutral-200 bg-neutral-50 border-b border-neutral-200 text-center py-3 text-xs">
            <div>
              <span className="text-neutral-500 font-medium block">{isHi ? 'कुल जनसंख्या' : 'Population'}</span>
              <strong className="text-sm text-neutral-900 font-bold">{panchayat.totalPopulation.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-neutral-500 font-medium block">{isHi ? 'कुल वार्ड संख्या' : 'Total Wards'}</span>
              <strong className="text-sm text-neutral-900 font-bold">{panchayat.totalWards} {isHi ? 'वार्ड' : 'Wards'}</strong>
            </div>
            <div>
              <span className="text-neutral-500 font-medium block">{isHi ? 'राजस्व ग्राम संख्या' : 'Revenue Villages'}</span>
              <strong className="text-sm text-neutral-900 font-bold">{panchayat.villages.length} {isHi ? 'ग्राम' : 'Villages'}</strong>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-neutral-100 bg-white">
            <button
              type="button"
              onClick={() => setActiveTab('villages')}
              className={`pb-2.5 px-2 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'villages'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {isHi ? `🏡 राजस्व ग्राम सूची (${panchayat.villages.length})` : `🏡 Revenue Villages (${panchayat.villages.length})`}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('schemes')}
              className={`pb-2.5 px-2 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'schemes'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {isHi ? `📋 विकास योजनाएं व कार्य (${panchayat.schemes.length})` : `📋 Development Schemes (${panchayat.schemes.length})`}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('representatives')}
              className={`pb-2.5 px-2 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'representatives'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {isHi ? '👥 जनप्रतिनिधि व अधिकारी' : '👥 Representatives & Staff'}
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {/* Tab 1: Villages */}
            {activeTab === 'villages' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{isHi ? 'इस ग्राम पंचायत के अंतर्गत आने वाले सभी राजस्व ग्राम व ढाणियां:' : 'All revenue villages & hamlets under this Gram Panchayat:'}</span>
                </div>

                <div className="space-y-3">
                  {panchayat.villages.map((village) => (
                    <div
                      key={village.id}
                      id={`detail-village-${village.id}`}
                      className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-neutral-900">
                              {isHi ? village.nameHi : village.name}
                            </h4>
                            <span className="text-[10px] font-bold bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded">
                              LGD: {village.lgdCode}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {isHi ? `पिनकोड: ${village.pincode} • जनसंख्या: ${village.population.toLocaleString()} • परिवार: ${village.households}` : `Pincode: ${village.pincode} • Population: ${village.population.toLocaleString()} • Households: ${village.households}`}
                          </p>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" />
                          {isHi ? 'राजस्व रिकॉर्ड सत्यापित' : 'Verified Record'}
                        </span>
                      </div>

                      {/* Facilities available in village */}
                      <div>
                        <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block mb-1.5">
                          {isHi ? 'उपलब्ध नागरिक सुविधाएं:' : 'Public Amenities & Infrastructure:'}
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                          <span className={`p-1.5 rounded-lg flex items-center gap-1.5 ${village.facilities.primarySchool ? 'bg-emerald-50 text-emerald-800' : 'bg-neutral-100 text-neutral-400'}`}>
                            <BookOpen className="w-3.5 h-3.5" />
                            {isHi ? 'प्राथमिक विद्यालय' : 'Primary School'}
                          </span>
                          <span className={`p-1.5 rounded-lg flex items-center gap-1.5 ${village.facilities.healthCenter ? 'bg-emerald-50 text-emerald-800' : 'bg-neutral-100 text-neutral-400'}`}>
                            <HeartPulse className="w-3.5 h-3.5" />
                            {isHi ? 'स्वास्थ्य केंद्र/PHC' : 'Health Center'}
                          </span>
                          <span className={`p-1.5 rounded-lg flex items-center gap-1.5 ${village.facilities.drinkingWaterTap ? 'bg-emerald-50 text-emerald-800' : 'bg-neutral-100 text-neutral-400'}`}>
                            <Droplets className="w-3.5 h-3.5" />
                            {isHi ? 'नल से जल (JJM)' : 'Tap Water'}
                          </span>
                          <span className={`p-1.5 rounded-lg flex items-center gap-1.5 ${village.facilities.pavedRoad ? 'bg-emerald-50 text-emerald-800' : 'bg-neutral-100 text-neutral-400'}`}>
                            <RoadIcon className="w-3.5 h-3.5" />
                            {isHi ? 'पक्की सड़क' : 'Paved Road'}
                          </span>
                          <span className={`p-1.5 rounded-lg flex items-center gap-1.5 ${village.facilities.electricity24x7 ? 'bg-emerald-50 text-emerald-800' : 'bg-neutral-100 text-neutral-400'}`}>
                            <Zap className="w-3.5 h-3.5" />
                            {isHi ? '24x7 बिजली' : '24x7 Power'}
                          </span>
                          <span className={`p-1.5 rounded-lg flex items-center gap-1.5 ${village.facilities.internetCSC ? 'bg-emerald-50 text-emerald-800' : 'bg-neutral-100 text-neutral-400'}`}>
                            <Wifi className="w-3.5 h-3.5" />
                            {isHi ? 'CSC / इंटरनेट' : 'CSC / Internet'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Development Schemes & Interactive Verification */}
            {activeTab === 'schemes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-500 font-medium">
                    {isHi ? 'सरकारी योजनाओं के तहत स्वीकृत, प्रगतिरत व पूर्ण कार्य (सत्यापन चेकलिस्ट):' : 'Government schemes and works approved, ongoing & completed:'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAddScheme((prev) => !prev)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isHi ? '+ नया विकास कार्य जोड़ें' : '+ Add Scheme Work'}</span>
                  </button>
                </div>

                {/* Add Scheme Form */}
                {showAddScheme && (
                  <form onSubmit={handleCreateScheme} className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-2">
                    <h5 className="text-xs font-bold text-neutral-900">{isHi ? 'नया स्वीकृत विकास कार्य दर्ज करें:' : 'Enter newly sanctioned work:'}</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder={isHi ? 'योजना/कार्य का नाम (उदा. सोलर वाटर पंप)' : 'Work name (e.g. Solar Water Pump)'}
                        value={newSchemeName}
                        onChange={(e) => setNewSchemeName(e.target.value)}
                        className="text-xs p-2 rounded-lg bg-white border border-neutral-300 focus:outline-hidden"
                        required
                      />
                      <input
                        type="text"
                        placeholder={isHi ? 'स्वीकृत बजट (उदा. ₹ 15.00 Lakh)' : 'Budget (e.g. ₹ 15.00 Lakh)'}
                        value={newSchemeBudget}
                        onChange={(e) => setNewSchemeBudget(e.target.value)}
                        className="text-xs p-2 rounded-lg bg-white border border-neutral-300 focus:outline-hidden"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={isHi ? 'विवरण / वार्ड संख्या' : 'Description / Ward details'}
                      value={newSchemeDesc}
                      onChange={(e) => setNewSchemeDesc(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg bg-white border border-neutral-300 focus:outline-hidden"
                    />
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddScheme(false)}
                        className="text-xs px-3 py-1 rounded text-neutral-600"
                      >
                        {isHi ? 'रद्द करें' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="text-xs font-bold px-3 py-1 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                      >
                        {isHi ? 'सुरक्षित करें' : 'Save Work'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Scheme Cards */}
                <div className="space-y-2.5">
                  {panchayat.schemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      id={`scheme-item-${scheme.id}`}
                      className="p-3.5 rounded-xl border border-neutral-200 bg-white flex items-start justify-between gap-3 shadow-2xs hover:border-neutral-300 transition-colors"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-neutral-900">
                            {isHi ? scheme.schemeNameHi : scheme.schemeName}
                          </h4>
                          <span className="text-[11px] font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded">
                            {scheme.budgetAllocated}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            scheme.status === 'completed' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {isHi ? scheme.statusHi : scheme.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600">
                          {isHi ? scheme.descriptionHi : scheme.description}
                        </p>
                        {scheme.beneficiariesCount && (
                          <span className="text-[11px] text-neutral-500 font-medium block">
                            👥 {isHi ? `लाभार्थी: ${scheme.beneficiariesCount} परिवार` : `Beneficiaries: ${scheme.beneficiariesCount} households`}
                          </span>
                        )}
                      </div>

                      {/* Interactive toggle verify button */}
                      <button
                        type="button"
                        onClick={() => onToggleSchemeStatus(panchayat.id, scheme.id)}
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors ${
                          scheme.status === 'completed'
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                        title="Click to toggle status verification"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="hidden sm:inline">
                          {scheme.status === 'completed' ? (isHi ? 'सत्यापित' : 'Completed') : (isHi ? 'पूर्ण मार्क करें' : 'Mark Done')}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Representatives */}
            {activeTab === 'representatives' && (
              <div className="space-y-3">
                <p className="text-xs text-neutral-500 font-medium">
                  {isHi ? 'ग्राम पंचायत के वर्तमान निर्वाचित प्रतिनिधि एवं प्रशासनिक अधिकारी:' : 'Current elected representatives and administrative officers:'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {panchayat.representatives.map((rep, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {isHi ? rep.designationHi : rep.designation}
                        </span>
                        {rep.since && (
                          <span className="text-[10px] text-neutral-400">
                            {isHi ? `कार्यकाल: ${rep.since} से` : `Since: ${rep.since}`}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-neutral-900">
                          {isHi ? rep.nameHi : rep.name}
                        </h4>
                        <p className="text-xs text-neutral-500 font-medium">
                          {isHi ? `ग्राम पंचायत ${panchayat.nameHi}` : `Gram Panchayat ${panchayat.name}`}
                        </p>
                      </div>

                      {rep.contact && (
                        <a
                          href={`tel:${rep.contact.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 bg-white border border-neutral-200 px-3 py-1.5 rounded-lg hover:border-neutral-400 transition-colors mt-1"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{rep.contact}</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {isHi ? `अंतिम अद्यतन: ${panchayat.lastUpdated}` : `Last verified: ${panchayat.lastUpdated}`}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl font-bold bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
            >
              {isHi ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

function RoadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19 8 5" />
      <path d="M20 19l-4-14" />
      <path d="M12 8v2" />
      <path d="M12 14v2" />
    </svg>
  );
}
