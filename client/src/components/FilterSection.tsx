import React from 'react';
import { Search, Filter, X, CheckCircle, RefreshCw, Download } from 'lucide-react';
import { District, PanchayatSamiti, Language, GramPanchayat } from '../types';
import { exportAllPanchayatsDirectoryCSV } from '../utils/exportUtils';

export type ActiveNavTab = 'teamHome' | 'jhalawarDistrict' | 'panchayats' | 'villages' | 'schemes' | 'gramSabha' | 'citizenServices' | 'emergency' | 'grievance' | 'officialLinks';

interface FilterSectionProps {
  lang: Language;
  districts: District[];
  samitis: PanchayatSamiti[];
  selectedDistrict: string;
  onDistrictChange: (districtId: string) => void;
  selectedSamiti: string;
  onSamitiChange: (samitiId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  verifiedOnly: boolean;
  onToggleVerifiedOnly: () => void;
  onResetFilters: () => void;
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  allPanchayatsForExport: GramPanchayat[];
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  lang,
  districts,
  samitis,
  selectedDistrict,
  onDistrictChange,
  selectedSamiti,
  onSamitiChange,
  searchQuery,
  onSearchChange,
  verifiedOnly,
  onToggleVerifiedOnly,
  onResetFilters,
  activeTab,
  onTabChange,
  allPanchayatsForExport,
}) => {
  const isHi = lang === 'hi';

  const filteredSamitis = selectedDistrict === 'all' 
    ? samitis 
    : samitis.filter((s) => s.districtId === selectedDistrict);

  return (
    <div id="filter-control-card" className="p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-white shadow-2xs space-y-4">
      {/* Navigation Tabs Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl overflow-x-auto max-w-full">
          <button type="button" onClick={() => onTabChange('teamHome')} className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${activeTab === 'teamHome' ? 'bg-slate-950 text-amber-300 shadow-xs' : 'text-slate-700 hover:bg-white'}`}>🏠 {isHi ? 'Team GopalSingh — All-in-One' : 'Team GopalSingh — All-in-One'}</button>
          <button
            id="tab-jhalawar-special"
            type="button"
            onClick={() => onTabChange('jhalawarDistrict')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'jhalawarDistrict'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-emerald-900 bg-emerald-100/70 hover:bg-emerald-100 border border-emerald-300/50'
            }`}
          >
            <span>🌟</span>
            <span>{isHi ? 'झालावाड़ जिला 100% सत्य डायरेक्टरी व ऑडिट' : 'Jhalawar 100% Master Portal'}</span>
          </button>

          <button
            id="tab-panchayats"
            type="button"
            onClick={() => onTabChange('panchayats')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'panchayats'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {isHi ? '🏛️ ग्राम पंचायतें' : '🏛️ Gram Panchayats'}
          </button>

          <button
            id="tab-villages"
            type="button"
            onClick={() => onTabChange('villages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'villages'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {isHi ? '🏡 राजस्व ग्राम' : '🏡 Revenue Villages'}
          </button>

          <button
            id="tab-schemes"
            type="button"
            onClick={() => onTabChange('schemes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'schemes'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {isHi ? '✅ विकास योजनाएं' : '✅ Schemes'}
          </button>

          <button
            id="tab-gram-sabha"
            type="button"
            onClick={() => onTabChange('gramSabha')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'gramSabha'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {isHi ? '📅 ग्राम सभा कैलेंडर' : '📅 Gram Sabha'}
          </button>

          <button
            id="tab-citizen-services"
            type="button"
            onClick={() => onTabChange('citizenServices')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'citizenServices'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {isHi ? '📜 नागरिक सेवा केंद्र' : '📜 Citizen Services'}
          </button>

          <button
            id="tab-emergency"
            type="button"
            onClick={() => onTabChange('emergency')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'emergency'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {isHi ? '🚨 आपातकालीन हेल्पलाइन' : '🚨 Emergency Helpline'}
          </button>

          <button
            id="tab-grievance"
            type="button"
            onClick={() => onTabChange('grievance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'grievance'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {isHi ? '💬 शिकायत पेटी' : '💬 Grievance Desk'}
          </button>

          <button
            id="tab-official-links"
            type="button"
            onClick={() => onTabChange('officialLinks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'officialLinks'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {isHi ? '🔗 सरकारी पोर्टल' : '🔗 Govt Portals'}
          </button>
        </div>

        {/* Action buttons: Export CSV & Reset Filter */}
        <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
          <button
            type="button"
            onClick={() => exportAllPanchayatsDirectoryCSV(allPanchayatsForExport)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold transition-colors shadow-2xs"
            title="Download Master CSV Registry"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isHi ? 'डेटा डाउनलोड (CSV)' : 'Export CSV'}</span>
          </button>

          {(selectedDistrict !== 'all' || selectedSamiti !== 'all' || searchQuery.trim() !== '' || verifiedOnly) && (
            <button
              id="reset-filter-btn"
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-rose-50 text-xs font-medium text-neutral-600 hover:text-rose-600 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{isHi ? 'फ़िल्टर हटाएं' : 'Reset'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Search and Cascading Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="lg:col-span-2 relative">
          <label htmlFor="panchayat-search" className="block text-xs font-semibold text-neutral-700 mb-1">
            {isHi ? 'खोजें (गांव, पंचायत, सरपंच, LGD कोड):' : 'Search (Village, Panchayat, Sarpanch, LGD Code):'}
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="panchayat-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isHi ? 'उदा. बगरू, सालावास, Achrol, 247812...' : 'e.g. Bagru, Salawas, Achrol, 247812...'}
              className="w-full pl-9 pr-8 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* District Select */}
        <div>
          <label htmlFor="district-select" className="block text-xs font-semibold text-neutral-700 mb-1">
            {isHi ? 'जिला (District):' : 'District:'}
          </label>
          <select
            id="district-select"
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="w-full py-2 px-3 text-sm bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-800 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
          >
            <option value="all">{isHi ? 'सभी जिले (All Districts)' : 'All Districts'}</option>
            {districts.map((dist) => (
              <option key={dist.id} value={dist.id}>
                {isHi ? `${dist.nameHi} (${dist.name})` : `${dist.name} (${dist.state})`}
              </option>
            ))}
          </select>
        </div>

        {/* Panchayat Samiti Select */}
        <div>
          <label htmlFor="samiti-select" className="block text-xs font-semibold text-neutral-700 mb-1">
            {isHi ? 'पंचायत समिति (Block):' : 'Panchayat Samiti:'}
          </label>
          <select
            id="samiti-select"
            value={selectedSamiti}
            onChange={(e) => onSamitiChange(e.target.value)}
            className="w-full py-2 px-3 text-sm bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-800 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
          >
            <option value="all">{isHi ? 'सभी समितियां (All Samitis)' : 'All Samitis'}</option>
            {filteredSamitis.map((samiti) => (
              <option key={samiti.id} value={samiti.id}>
                {isHi ? `${samiti.nameHi} (${samiti.districtNameHi})` : `${samiti.name} (${samiti.districtName})`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
            <Filter className="w-3 h-3" /> {isHi ? 'त्वरित फ़िल्टर:' : 'Quick Filters:'}
          </span>
          <button
            id="toggle-verified-filter"
            type="button"
            onClick={onToggleVerifiedOnly}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
              verifiedOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${verifiedOnly ? 'text-emerald-600' : 'text-neutral-400'}`} />
            <span>{isHi ? 'केवल 100% सत्यापित LGD रिकॉर्ड्स' : '100% Verified LGD only'}</span>
          </button>
        </div>

        <div className="text-xs text-neutral-500 font-medium">
          {isHi ? '💡 आधिकारिक LGD कोड से सीधे खोज सकते हैं' : '💡 You can directly search using 6-digit LGD Census code'}
        </div>
      </div>
    </div>
  );
};
