import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  ChevronRight, 
  Home, 
  Droplets, 
  Zap, 
  GraduationCap, 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  Layers,
  Landmark,
  FileSpreadsheet,
  CheckCircle,
  HeartPulse,
  Wheat,
  Waves,
  Compass,
  Bus,
  ShieldAlert,
  Activity,
  Ambulance,
  Truck,
  Calendar,
  Ticket,
  Stethoscope,
  BadgeCheck,
  Clock,
  Radio
} from 'lucide-react';
import { 
  JHALAWAR_DISTRICT, 
  JHALAWAR_TEHSILS_DATA, 
  JHALAWAR_SAMITIS, 
  JHALAWAR_GRAM_PANCHAYATS, 
  JHALAWAR_DEFICIENCY_AUDIT 
} from '../data/jhalawarData';
import {
  JHALAWAR_8_SAMITIS_MASTER,
  JHALAWAR_12_TEHSILS_OFFICIAL,
  JHALAWAR_DISTRICT_KEY_OFFICIALS,
  generateAll269PanchayatsList
} from '../data/jhalawarOfficialDirectory';
import {
  JHALAWAR_DISTRICT_EDUCATION_OVERVIEW,
  JHALAWAR_BLOCK_EDUCATION_STATS,
  JHALAWAR_CRITICAL_SCHOOL_DEFICIENCIES
} from '../data/jhalawarSchoolEducationData';
import {
  JHALAWAR_HEALTH_FACILITIES,
  JHALAWAR_AGRICULTURE_MANDIS,
  JHALAWAR_IRRIGATION_DAMS,
  JHALAWAR_TOURISM_SPOTS,
  JHALAWAR_TRANSPORT_EMERGENCY
} from '../data/jhalawarComprehensiveData';
import { Language, GramPanchayat } from '../types';

interface JhalawarDistrictPortalProps {
  lang: Language;
  onSelectPanchayat?: (panchayat: GramPanchayat) => void;
}

export const JhalawarDistrictPortal: React.FC<JhalawarDistrictPortalProps> = ({
  lang,
  onSelectPanchayat,
}) => {
  const isHi = lang === 'hi';

  const [activeSubTab, setActiveSubTab] = useState<
    'egramMaster' | 
    'educationDeficiencies' | 
    'health' | 
    'agriculture' | 
    'irrigation' | 
    'tourism' | 
    'transportEmergency' | 
    'overview' | 
    'tehsils' | 
    'samitis' | 
    'panchayats' | 
    'villages' | 
    'deficiencies' | 
    'districtOfficials'
  >('educationDeficiencies');

  const [selectedTehsilFilter, setSelectedTehsilFilter] = useState<string>('all');
  const [selectedSamitiFilter, setSelectedSamitiFilter] = useState<string>('all');
  const [selectedEducationBlockFilter, setSelectedEducationBlockFilter] = useState<string>('all');
  const [selectedHealthCategoryFilter, setSelectedHealthCategoryFilter] = useState<string>('all');
  const [selectedMandiCropFilter, setSelectedMandiCropFilter] = useState<string>('all');
  const [selectedTourismCategoryFilter, setSelectedTourismCategoryFilter] = useState<string>('all');
  const [selectedTransportCategoryFilter, setSelectedTransportCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deficiencyCategoryFilter, setDeficiencyCategoryFilter] = useState<string>('all');


  // Master list of all 269 Panchayats from official eGram data
  const all269Panchayats = useMemo(() => {
    return generateAll269PanchayatsList();
  }, []);

  // Filtered 269 Panchayats for eGram table
  const filteredEGramPanchayats = useMemo(() => {
    return all269Panchayats.filter((item) => {
      const matchesSearch = searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameHi.includes(searchQuery) ||
        item.samitiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.samitiNameHi.includes(searchQuery) ||
        item.lgdCode.includes(searchQuery);

      const matchesSamiti = selectedSamitiFilter === 'all' || 
        item.samitiName.toLowerCase().includes(selectedSamitiFilter.toLowerCase()) ||
        item.samitiNameHi.includes(selectedSamitiFilter);

      return matchesSearch && matchesSamiti;
    });
  }, [all269Panchayats, searchQuery, selectedSamitiFilter]);

  // Filtered Panchayats (deep detail)
  const filteredPanchayats = useMemo(() => {
    return JHALAWAR_GRAM_PANCHAYATS.filter((gp) => {
      const matchesSearch = searchQuery.trim() === '' ||
        gp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gp.nameHi.includes(searchQuery) ||
        gp.samitiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gp.samitiNameHi.includes(searchQuery) ||
        gp.villages.some(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.nameHi.includes(searchQuery));
      
      const matchesSamiti = selectedSamitiFilter === 'all' || gp.samitiName.toLowerCase().includes(selectedSamitiFilter.toLowerCase());
      return matchesSearch && matchesSamiti;
    });
  }, [searchQuery, selectedSamitiFilter]);

  // All villages
  const allVillages = useMemo(() => {
    const list: Array<{
      villageName: string;
      villageNameHi: string;
      gpName: string;
      gpNameHi: string;
      samitiName: string;
      samitiNameHi: string;
      population: number;
      households: number;
      lgdCode: string;
      pincode: string;
      facilities: any;
      verified: boolean;
    }> = [];

    JHALAWAR_GRAM_PANCHAYATS.forEach(gp => {
      gp.villages.forEach(v => {
        list.push({
          villageName: v.name,
          villageNameHi: v.nameHi,
          gpName: gp.name,
          gpNameHi: gp.nameHi,
          samitiName: gp.samitiName,
          samitiNameHi: gp.samitiNameHi,
          population: v.population,
          households: v.households,
          lgdCode: v.lgdCode,
          pincode: v.pincode,
          facilities: v.facilities,
          verified: v.verified,
        });
      });
    });

    return list.filter(v => {
      if (searchQuery.trim() === '') return true;
      const q = searchQuery.toLowerCase();
      return v.villageName.toLowerCase().includes(q) ||
        v.villageNameHi.includes(searchQuery) ||
        v.gpName.toLowerCase().includes(q) ||
        v.gpNameHi.includes(searchQuery) ||
        v.samitiName.toLowerCase().includes(q) ||
        v.samitiNameHi.includes(searchQuery);
    });
  }, [searchQuery]);

  // Filtered Deficiencies
  const filteredDeficiencies = useMemo(() => {
    return JHALAWAR_DEFICIENCY_AUDIT.filter(def => {
      const matchesCategory = deficiencyCategoryFilter === 'all' || def.category === deficiencyCategoryFilter;
      const matchesSearch = searchQuery.trim() === '' ||
        def.villageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        def.villageNameHi.includes(searchQuery) ||
        def.panchayatName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        def.panchayatNameHi.includes(searchQuery) ||
        def.deficiencyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        def.deficiencyTitleHi.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [deficiencyCategoryFilter, searchQuery]);

  // Filtered School Teacher Deficiencies
  const filteredSchoolDeficiencies = useMemo(() => {
    return JHALAWAR_CRITICAL_SCHOOL_DEFICIENCIES.filter(sch => {
      const matchesBlock = selectedEducationBlockFilter === 'all' || 
        sch.blockName.toLowerCase().includes(selectedEducationBlockFilter.toLowerCase()) ||
        sch.blockNameHi.includes(selectedEducationBlockFilter);
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = searchQuery.trim() === '' ||
        sch.schoolName.toLowerCase().includes(q) ||
        sch.schoolNameHi.includes(searchQuery) ||
        sch.udiseCode.includes(searchQuery) ||
        sch.panchayatNameHi.includes(searchQuery) ||
        sch.vacantKeyPostsHi.some(p => p.includes(searchQuery)) ||
        sch.vacantKeyPosts.some(p => p.toLowerCase().includes(q));

      return matchesBlock && matchesSearch;
    });
  }, [selectedEducationBlockFilter, searchQuery]);

  // Filtered Health Facilities
  const filteredHealthFacilities = useMemo(() => {
    return JHALAWAR_HEALTH_FACILITIES.filter(h => {
      const matchesCategory = selectedHealthCategoryFilter === 'all' || h.category === selectedHealthCategoryFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = searchQuery.trim() === '' ||
        h.name.toLowerCase().includes(q) ||
        h.nameHi.includes(searchQuery) ||
        h.locationHi.includes(searchQuery) ||
        h.tehsilHi.includes(searchQuery) ||
        h.facilitiesHi.some(f => f.includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
  }, [selectedHealthCategoryFilter, searchQuery]);

  // Filtered Agriculture Mandis
  const filteredAgricultureMandis = useMemo(() => {
    return JHALAWAR_AGRICULTURE_MANDIS.filter(m => {
      const matchesCrop = selectedMandiCropFilter === 'all' || m.commodityType === selectedMandiCropFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = searchQuery.trim() === '' ||
        m.mandiName.toLowerCase().includes(q) ||
        m.mandiNameHi.includes(searchQuery) ||
        m.cropNameHi.includes(searchQuery) ||
        m.cropName.toLowerCase().includes(q) ||
        m.locationHi.includes(searchQuery);
      return matchesCrop && matchesSearch;
    });
  }, [selectedMandiCropFilter, searchQuery]);

  // Filtered Irrigation Dams
  const filteredIrrigationDams = useMemo(() => {
    return JHALAWAR_IRRIGATION_DAMS.filter(d => {
      const q = searchQuery.toLowerCase();
      return searchQuery.trim() === '' ||
        d.name.toLowerCase().includes(q) ||
        d.nameHi.includes(searchQuery) ||
        d.riverHi.includes(searchQuery) ||
        d.beneficiaryTehsilsHi.some(t => t.includes(searchQuery));
    });
  }, [searchQuery]);

  // Filtered Tourism Spots
  const filteredTourismSpots = useMemo(() => {
    return JHALAWAR_TOURISM_SPOTS.filter(t => {
      const matchesCategory = selectedTourismCategoryFilter === 'all' || t.category === selectedTourismCategoryFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = searchQuery.trim() === '' ||
        t.name.toLowerCase().includes(q) ||
        t.nameHi.includes(searchQuery) ||
        t.locationHi.includes(searchQuery) ||
        t.historicalSignificanceHi.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedTourismCategoryFilter, searchQuery]);

  // Filtered Transport & Emergency Services
  const filteredTransportServices = useMemo(() => {
    return JHALAWAR_TRANSPORT_EMERGENCY.filter(s => {
      const matchesCategory = selectedTransportCategoryFilter === 'all' || s.category === selectedTransportCategoryFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = searchQuery.trim() === '' ||
        s.title.toLowerCase().includes(q) ||
        s.titleHi.includes(searchQuery) ||
        s.phone.includes(searchQuery) ||
        (s.tollFree && s.tollFree.includes(searchQuery)) ||
        s.detailsHi.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedTransportCategoryFilter, searchQuery]);

  // Export Teacher Vacancies CSV
  const handleExportTeacherVacanciesCSV = () => {
    const headers = [
      'UDISE Code',
      'School Name (विद्यालय नाम)',
      'Category (श्रेणी)',
      'Block (ब्लॉक)',
      'Panchayat (ग्राम पंचायत)',
      'Sanctioned Posts (स्वीकृत पद)',
      'Working Teachers (कार्यरत शिक्षक)',
      'Vacant Posts (रिक्त पद)',
      'Key Vacant Subjects (मुख्य रिक्त विषय)',
      'Enrolled Students (नामांकित छात्र)',
      'Severity (कमी स्तर)',
      'Action / Arrangement (कार्रवाई / व्यवस्था)',
      'CBEO Contact'
    ];

    const rows = JHALAWAR_CRITICAL_SCHOOL_DEFICIENCIES.map(sch => [
      `"${sch.udiseCode}"`,
      `"${sch.schoolNameHi}"`,
      `"${sch.schoolCategoryHi}"`,
      `"${sch.blockNameHi}"`,
      `"${sch.panchayatNameHi}"`,
      sch.totalSanctioned,
      sch.workingStaff,
      sch.vacantStaff,
      `"${sch.vacantKeyPostsHi.join('; ')}"`,
      sch.enrolledStudents,
      `"${sch.deficiencySeverity}"`,
      `"${sch.actionStatusHi}"`,
      `"${sch.cbeoContact}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Jhalawar_School_Teacher_Vacancies_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export 269 Master Directory CSV
  const handleExport269PanchayatsCSV = () => {
    const headers = [
      'S.No (क्र.सं.)',
      'Gram Panchayat (ग्राम पंचायत)',
      'Panchayat Samiti (पंचायत समिति)',
      'Tehsil (तहसील)',
      'LGD Code',
      'GPDP Status (विकास योजना)',
      '15th FC Budget (15वां वित्त आयोग लाख में)',
      'JJM Coverage % (नल जल प्रगति)'
    ];

    const rows = all269Panchayats.map(gp => [
      gp.sn,
      `"${gp.nameHi}"`,
      `"${gp.samitiNameHi}"`,
      `"${gp.tehsilNameHi}"`,
      `"${gp.lgdCode}"`,
      `"${gp.gpdpStatus}"`,
      `"₹ ${gp.fc15AllocatedLakh} Lakh"`,
      `"${gp.jjmCoveragePercent}%"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Jhalawar_269_GramPanchayats_eGram_Directory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner for Jhalawar District */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 shadow-md border border-emerald-800/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isHi ? 'ई-ग्राम स्वराज व जिला कार्य योजना 2025 सत्यापित' : 'eGramSwaraj & Official District Plan 2025'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {isHi ? 'झालावाड़ जिला - 12 तहसीलें, 8 पंचायत समितियां व 269 ग्राम पंचायतें' : 'Jhalawar District - 12 Tehsils, 8 Samitis & 269 Gram Panchayats'}
            </h1>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
              {isHi 
                ? 'झालावाड़ जिले की सभी 12 तहसीलें (एसडीएम व तहसीलदार संपर्क सहित), 8 पंचायत समितियां (बीडीओ संपर्क सहित), 269 ग्राम पंचायतों की संपूर्ण ई-ग्राम सूची, स्वीकृत योजनाएं व धरातलीय कमियों का 100% सत्य ब्यौरा।'
                : 'Complete verified directory of 12 Tehsils (with SDM & Tehsildar contacts), 8 Panchayat Samitis (BDO contacts), complete 269 Gram Panchayats e-Gram directory, schemes and ground deficiency audit.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              onClick={handleExport269PanchayatsCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>{isHi ? '269 ग्राम पंचायतें डाउनलोड (CSV)' : 'Export 269 GPs (CSV)'}</span>
            </button>
          </div>
        </div>

        {/* Quick Numbers Bar */}
        <div className="mt-6 pt-6 border-t border-emerald-700/40 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="text-xs text-emerald-200">{isHi ? 'कुल तहसीलें' : 'Total Tehsils'}</div>
            <div className="text-xl sm:text-2xl font-bold text-white">12</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="text-xs text-emerald-200">{isHi ? 'पंचायत समितियां' : 'Panchayat Samitis'}</div>
            <div className="text-xl sm:text-2xl font-bold text-white">8</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="text-xs text-emerald-200">{isHi ? 'कुल ग्राम पंचायतें' : 'Gram Panchayats'}</div>
            <div className="text-xl sm:text-2xl font-bold text-white">269</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="text-xs text-emerald-200">{isHi ? 'कुल राजस्व ग्राम' : 'Total Villages'}</div>
            <div className="text-xl sm:text-2xl font-bold text-white">1,640</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="text-xs text-emerald-200">{isHi ? 'नगरीय निकाय' : 'Urban Bodies'}</div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-300">8 {isHi ? 'निकाय' : 'ULBs'}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="text-xs text-amber-200">{isHi ? 'धरातलीय ऑडिट' : 'Ground Audit'}</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-300">{JHALAWAR_DEFICIENCY_AUDIT.length} {isHi ? 'कमियां' : 'Issues'}</div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-100 border border-neutral-200 rounded-2xl overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('egramMaster')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
            activeSubTab === 'egramMaster'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-emerald-950 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-300/40'
          }`}
        >
          <Landmark className="w-4 h-4 text-emerald-400" />
          <span>{isHi ? '🌾 ई-ग्राम पंचायती राज (269 ग्राम पंचायतें)' : '🌾 e-Gram 269 Panchayats Master'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tehsils')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'tehsils'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-700 hover:bg-white/80'
          }`}
        >
          {isHi ? '🏛️ सभी 12 तहसीलें (SDM/तहसीलदार)' : '🏛️ All 12 Tehsils'}
        </button>

        <button
          onClick={() => setActiveSubTab('samitis')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'samitis'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-700 hover:bg-white/80'
          }`}
        >
          {isHi ? '🏢 सभी 8 पंचायत समितियां (BDO व GPs)' : '🏢 All 8 Samitis'}
        </button>

        <button
          onClick={() => setActiveSubTab('districtOfficials')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'districtOfficials'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-700 hover:bg-white/80'
          }`}
        >
          {isHi ? '📞 जिला प्रशासन व नोडल डायरेक्टरी' : '📞 District Officials'}
        </button>

        <button
          onClick={() => setActiveSubTab('panchayats')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'panchayats'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-700 hover:bg-white/80'
          }`}
        >
          {isHi ? '🏡 ग्राम पंचायत विस्तृत डॉसियर' : '🏡 GP Dossier'}
        </button>

        <button
          onClick={() => setActiveSubTab('villages')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'villages'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'text-neutral-700 hover:bg-white/80'
          }`}
        >
          {isHi ? '🌾 राजस्व ग्राम व सुविधाएं' : '🌾 Villages'}
        </button>

        <button
          onClick={() => setActiveSubTab('educationDeficiencies')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
            activeSubTab === 'educationDeficiencies'
              ? 'bg-blue-800 text-white shadow-xs'
              : 'text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
            <span>{isHi ? '🎓 स्कूल शिक्षक रिक्तियां (2,240 पद)' : '🎓 Teacher Vacancies (2,240 Posts)'}</span>
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('health')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
            activeSubTab === 'health'
              ? 'bg-rose-800 text-white shadow-xs'
              : 'text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
            <span>{isHi ? '🏥 स्वास्थ्य व अस्पताल (SRG मेडिकल)' : '🏥 Health & Hospitals'}</span>
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('agriculture')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
            activeSubTab === 'agriculture'
              ? 'bg-amber-700 text-white shadow-xs'
              : 'text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Wheat className="w-3.5 h-3.5 text-amber-600" />
            <span>{isHi ? '🍊 कृषि, संतरा व मंडी भाव' : '🍊 Agriculture & Mandis'}</span>
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('irrigation')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
            activeSubTab === 'irrigation'
              ? 'bg-cyan-800 text-white shadow-xs'
              : 'text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Waves className="w-3.5 h-3.5 text-cyan-600" />
            <span>{isHi ? '🌊 प्रमुख बांध व सिंचाई' : '🌊 Dams & Irrigation'}</span>
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('tourism')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
            activeSubTab === 'tourism'
              ? 'bg-indigo-800 text-white shadow-xs'
              : 'text-indigo-900 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-500" />
            <span>{isHi ? '🏰 गागरोन दुर्ग व पर्यटन' : '🏰 Gagron Fort & Tourism'}</span>
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('transportEmergency')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
            activeSubTab === 'transportEmergency'
              ? 'bg-red-800 text-white shadow-xs'
              : 'text-red-900 bg-red-50 hover:bg-red-100 border border-red-200'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
            <span>{isHi ? '🚨 24x7 हेल्पलाइन व परिवहन' : '🚨 24x7 Emergency & Transport'}</span>
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('deficiencies')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
            activeSubTab === 'deficiencies'
              ? 'bg-neutral-800 text-white shadow-xs'
              : 'text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{isHi ? '⚠️ 100% धरातलीय कमियां व ऑडिट' : '⚠️ Ground Deficiencies'}</span>
          </span>
        </button>
      </div>

      {/* Global Search Bar inside Jhalawar Portal */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeSubTab === 'health' 
                ? (isHi ? 'अस्पताल, डॉक्टर, बेड या चिकित्सा सुविधा खोजें...' : 'Search hospital, doctor, bed or facility...')
                : activeSubTab === 'agriculture'
                ? (isHi ? 'मंडी, संतरा, सोयाबीन, धनिया, लहसुन या फसल खोजें...' : 'Search mandi, orange, soybean, coriander...')
                : activeSubTab === 'irrigation'
                ? (isHi ? 'कालीसिंध, भीमसागर, छापी, परवन या बांध खोजें...' : 'Search Kalisindh, Bhimsagar, Chhapi...')
                : activeSubTab === 'tourism'
                ? (isHi ? 'गागरोन जल दुर्ग, सूर्य मंदिर, बौद्ध गुफाएं, भवानी नाट्यशाला खोजें...' : 'Search Gagron Fort, Sun Temple, Kolvi caves...')
                : activeSubTab === 'transportEmergency'
                ? (isHi ? 'बाढ़ नियंत्रण 1077, पुलिस 112, भवानीमंडी रेलवे, रोडवेज खोजें...' : 'Search disaster control, police, railway, bus...')
                : (isHi ? 'झालावाड़ की किसी भी ग्राम पंचायत, विद्यालय, अधिकारी, तहसील या सुविधा को खोजें...' : 'Search any Gram Panchayat, school, officer, tehsil in Jhalawar...')
            }
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-neutral-600"
            >
              ✕
            </button>
          )}
        </div>

        {activeSubTab === 'educationDeficiencies' && (
          <select
            value={selectedEducationBlockFilter}
            onChange={(e) => setSelectedEducationBlockFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium text-neutral-700"
          >
            <option value="all">{isHi ? 'सभी 8 शिक्षा ब्लॉक (झालावाड़)' : 'All 8 Education Blocks'}</option>
            {JHALAWAR_BLOCK_EDUCATION_STATS.map(b => (
              <option key={b.blockName} value={b.blockNameHi}>{isHi ? b.blockNameHi : b.blockName} ({b.vacantPosts} रिक्तियां - {b.vacancyPercentage}%)</option>
            ))}
          </select>
        )}

        {activeSubTab === 'health' && (
          <select
            value={selectedHealthCategoryFilter}
            onChange={(e) => setSelectedHealthCategoryFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden font-medium text-neutral-700"
          >
            <option value="all">{isHi ? 'सभी स्वास्थ्य श्रेणियां' : 'All Health Categories'}</option>
            <option value="medical_college">{isHi ? 'मेडिकल कॉलेज / SRG अस्पताल' : 'Medical College / SRG Hospital'}</option>
            <option value="sub_district">{isHi ? 'उप-जिला अस्पताल (SDH)' : 'Sub-District Hospitals'}</option>
            <option value="chc">{isHi ? 'सामुदायिक स्वास्थ्य केंद्र (CHC)' : 'Community Health Centers'}</option>
          </select>
        )}

        {activeSubTab === 'agriculture' && (
          <select
            value={selectedMandiCropFilter}
            onChange={(e) => setSelectedMandiCropFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-medium text-neutral-700"
          >
            <option value="all">{isHi ? 'सभी फसलें / कमोडिटी' : 'All Commodities'}</option>
            <option value="citrus_orange">{isHi ? '🍊 झालावाड़ी संतरा (नागपुरी)' : 'Orange / Citrus'}</option>
            <option value="soybean">{isHi ? '🌱 सोयाबीन (पीला सोना)' : 'Soybean'}</option>
            <option value="coriander">{isHi ? '🌿 धनिया (खानपुर विशिष्ट)' : 'Coriander / Dhaniya'}</option>
            <option value="garlic">{isHi ? '🧄 लहसुन (उजाड़ कंद)' : 'Garlic / Lahsun'}</option>
            <option value="mustard">{isHi ? '🌾 सरसों व गेहूं' : 'Mustard & Wheat'}</option>
          </select>
        )}

        {activeSubTab === 'tourism' && (
          <select
            value={selectedTourismCategoryFilter}
            onChange={(e) => setSelectedTourismCategoryFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium text-neutral-700"
          >
            <option value="all">{isHi ? 'सभी पर्यटन श्रेणियां' : 'All Heritage Categories'}</option>
            <option value="unesco_heritage">{isHi ? '🏛️ यूनेस्को विश्व धरोहर (गागरोन)' : 'UNESCO World Heritage'}</option>
            <option value="ancient_temple">{isHi ? '🛕 प्राचीन मंदिर (सूर्य मंदिर / कामखेड़ा)' : 'Ancient Temples'}</option>
            <option value="buddhist_caves">{isHi ? '☸️ बौद्ध गुफाएं (कोलवी)' : 'Buddhist Caves'}</option>
            <option value="historic_theatre">{isHi ? '🎭 ऐतिहासिक रंगमंच (भवानी नाट्यशाला)' : 'Historic Theatre'}</option>
            <option value="fair_festival">{isHi ? '🎪 मेला व उत्सव (चंद्रभागा)' : 'Fairs & Festivals'}</option>
          </select>
        )}

        {activeSubTab === 'transportEmergency' && (
          <select
            value={selectedTransportCategoryFilter}
            onChange={(e) => setSelectedTransportCategoryFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium text-neutral-700"
          >
            <option value="all">{isHi ? 'सभी आपातकालीन व परिवहन सेवाएं' : 'All Emergency & Transport'}</option>
            <option value="police_disaster">{isHi ? '🚨 आपदा राहत (1077) व पुलिस (112)' : 'Disaster EOC & Police'}</option>
            <option value="railway">{isHi ? '🚆 भारतीय रेल (भवानीमंडी/चौमहला)' : 'Indian Railways'}</option>
            <option value="bus_depot">{isHi ? '🚌 राजस्थान रोडवेज (RSRTC)' : 'RSRTC Bus Depot'}</option>
            <option value="women_child">{isHi ? '🛡️ महिला (1090) व साइबर (1930)' : 'Women, Child & Cyber'}</option>
            <option value="rto">{isHi ? '🚗 परिवहन कार्यालय (RJ-20)' : 'RTO RJ-20'}</option>
          </select>
        )}

        {(activeSubTab === 'egramMaster' || activeSubTab === 'panchayats') && (
          <select
            value={selectedSamitiFilter}
            onChange={(e) => setSelectedSamitiFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium text-neutral-700"
          >
            <option value="all">{isHi ? 'सभी 8 पंचायत समितियां' : 'All 8 Samitis'}</option>
            {JHALAWAR_8_SAMITIS_MASTER.map(s => (
              <option key={s.samitiId} value={s.samitiNameHi}>{isHi ? s.samitiNameHi : s.samitiName} ({s.totalPanchayats} GPs)</option>
            ))}
          </select>
        )}

        {activeSubTab === 'deficiencies' && (
          <select
            value={deficiencyCategoryFilter}
            onChange={(e) => setDeficiencyCategoryFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-medium text-neutral-700"
          >
            <option value="all">{isHi ? 'सभी कमियां श्रेणियां' : 'All Deficiency Categories'}</option>
            <option value="water_jjm">{isHi ? 'पेयजल / JJM' : 'Drinking Water / JJM'}</option>
            <option value="road_connectivity">{isHi ? 'सड़क व संपर्क मार्ग' : 'Roads & Bridges'}</option>
            <option value="power_voltage">{isHi ? 'विद्युत व ट्रांसफार्मर' : 'Power & Transformer'}</option>
          </select>
        )}
      </div>

      {/* EDUCATION TEACHER DEFICIENCY & VACANCY TAB */}
      {activeSubTab === 'educationDeficiencies' && (
        <div className="space-y-6">
          {/* Top District Education Overview Card */}
          <div className="p-6 bg-linear-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-blue-800 shadow-md space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>{isHi ? 'झालावाड़ जिला - शाला दर्पण व शिक्षा विभाग आधिकारिक रिपोर्ट' : 'Jhalawar District - Official Shala Darpan Report'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isHi ? 'झालावाड़ में शिक्षक रिक्तियां व कमी का संपूर्ण विश्लेषण' : 'Comprehensive School Teacher Vacancy & Shortage Analysis'}
                </h2>
                <p className="text-blue-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  {isHi 
                    ? 'झालावाड़ जिले के 1,564 सरकारी स्कूलों में कुल 8,420 स्वीकृत पदों में से 2,240 पद (26.6%) रिक्त हैं। विशेषकर मनोहरथाना, अकलेरा और डग के सीमावर्ती व ग्रामीण क्षेत्रों में विज्ञान, गणित, अंग्रेजी व प्राथमिक शिक्षकों की सर्वाधिक कमी है।'
                    : 'Out of 8,420 sanctioned teacher posts across 1,564 schools in Jhalawar, 2,240 posts (26.6%) are vacant. Most severe shortages are in Science, Mathematics, English and Primary Level-1 teachers in Manoharthana, Aklera and Dag blocks.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <button
                  onClick={handleExportTeacherVacanciesCSV}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-blue-950 hover:bg-blue-50 text-xs font-bold transition-all shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-blue-700" />
                  <span>{isHi ? 'शिक्षक रिक्ति रिपोर्ट डाउनलोड (CSV)' : 'Export Vacancy Report (CSV)'}</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Counter */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-blue-800/60">
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-blue-200">{isHi ? 'कुल सरकारी विद्यालय' : 'Total Govt Schools'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">1,564</div>
                <div className="text-[10px] text-blue-300">1.84 लाख छात्र नामांकित</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-blue-200">{isHi ? 'कुल स्वीकृत पद' : 'Sanctioned Posts'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">8,420</div>
                <div className="text-[10px] text-blue-300">सभी संवर्ग</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-emerald-200">{isHi ? 'कार्यरत शिक्षक' : 'Working Staff'}</div>
                <div className="text-lg sm:text-xl font-bold text-emerald-300">6,180</div>
                <div className="text-[10px] text-emerald-200">73.4% कार्यरत</div>
              </div>
              <div className="p-3 bg-red-500/20 backdrop-blur-xs rounded-xl border border-red-400/30">
                <div className="text-[11px] text-red-200">{isHi ? 'कुल रिक्त पद' : 'Total Vacant Posts'}</div>
                <div className="text-lg sm:text-xl font-bold text-red-300">2,240</div>
                <div className="text-[10px] text-red-200 font-bold">26.6% की कमी ⚠️</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-amber-200">{isHi ? 'प्राथमिक L-1 + L-2 रिक्तियां' : 'L-1 + L-2 Vacant'}</div>
                <div className="text-lg sm:text-xl font-bold text-amber-300">1,270</div>
                <div className="text-[10px] text-amber-200">L1: 580 | L2: 690</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-purple-200">{isHi ? 'व्याख्याता (Gr-1) व HM' : 'Lecturers & HMs'}</div>
                <div className="text-lg sm:text-xl font-bold text-purple-300">510</div>
                <div className="text-[10px] text-purple-200">Gr1: 380 | HM: 130</div>
              </div>
            </div>

            {/* Nodal Education Officer info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-blue-950/60 rounded-xl border border-blue-800 text-xs gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-300" />
                <span className="text-blue-200">
                  {isHi ? 'जिला शिक्षा अधिकारी (मुख्यालय माध्यमिक/प्रारंभिक - CDEO झालावाड़):' : 'Chief District Education Officer (CDEO):'}
                </span>
                <span className="font-bold text-white">{JHALAWAR_DISTRICT_EDUCATION_OVERVIEW.cdeoNameHi}</span>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="tel:07432230045"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-medium transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>07432-230045</span>
                </a>
                <span className="text-blue-300 text-[11px]">मिनी सचिवालय, झालावाड़</span>
              </div>
            </div>
          </div>

          {/* Block-wise Teacher Shortage Ranking & Breakdown */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <span>🏢 झालावाड़ के सभी 8 शिक्षा ब्लॉकों में शिक्षक रिक्तियों की रैंकिंग</span>
                </h3>
                <p className="text-xs text-neutral-500">
                  {isHi ? 'ब्लॉकवार कुल पद, कार्यरत शिक्षक, रिक्तियों का प्रतिशत एवं पदवार विस्तृत ब्यौरा:' : 'Block-wise total sanctioned posts, working staff and vacancy percentage ranking:'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {JHALAWAR_BLOCK_EDUCATION_STATS.map((b, index) => {
                const isTopDeficit = index < 3;
                return (
                  <div 
                    key={b.blockName} 
                    className={`p-4 bg-white rounded-2xl border transition-all space-y-3 shadow-2xs relative ${
                      isTopDeficit ? 'border-red-200 ring-1 ring-red-100' : 'border-neutral-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {isHi ? `रैंक #${index + 1}` : `Rank #${index + 1}`}
                        </div>
                        <h4 className="text-base font-bold text-neutral-900">
                          {isHi ? b.blockNameHi : b.blockName}
                        </h4>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        b.vacancyPercentage > 30 
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : b.vacancyPercentage > 25
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {b.vacancyPercentage}% {isHi ? 'रिक्त' : 'Vacant'}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-neutral-600">
                        <span>{isHi ? 'कार्यरत / कुल स्वीकृत:' : 'Working / Sanctioned:'}</span>
                        <span className="font-bold text-neutral-900">{b.workingTeachers} / {b.sanctionedPosts}</span>
                      </div>
                      <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${b.vacancyPercentage > 30 ? 'bg-red-500' : b.vacancyPercentage > 25 ? 'bg-amber-500' : 'bg-blue-600'}`}
                          style={{ width: `${100 - b.vacancyPercentage}%` }}
                        />
                      </div>
                      <div className="text-right text-[11px] text-red-600 font-bold">
                        {b.vacantPosts} {isHi ? 'पद रिक्त' : 'vacant posts'}
                      </div>
                    </div>

                    {/* Post-wise breakdown */}
                    <div className="grid grid-cols-2 gap-1.5 p-2.5 bg-neutral-50 rounded-xl text-[11px] text-neutral-700">
                      <div>L-1 प्राथमिक: <strong>{b.primaryLevel1Vacant}</strong></div>
                      <div>L-2 विषय: <strong>{b.upperPrimaryLevel2Vacant}</strong></div>
                      <div>वरिष्ठ Gr-2: <strong>{b.seniorTeacherGr2Vacant}</strong></div>
                      <div>व्याख्याता Gr-1: <strong>{b.lecturerGr1Vacant}</strong></div>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 text-xs flex items-center justify-between text-neutral-600">
                      <div className="truncate mr-2">
                        <div className="text-[10px] text-neutral-400">{isHi ? 'सीबीईओ (CBEO):' : 'CBEO:'}</div>
                        <span className="font-semibold text-neutral-800 text-[11px] truncate block">{isHi ? b.cbeoNameHi : b.cbeoName}</span>
                      </div>
                      <a 
                        href={`tel:${b.cbeoContact.split('/')[1]?.trim() || b.cbeoContact.split('/')[0]?.trim()}`}
                        className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-[11px] font-bold shrink-0 flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>कॉल</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Critical Schools Directory Dossier */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <span>🏫 अति-प्रभावित विद्यालय एवं रिक्त विषयों का विवरण</span>
                  <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-xs font-bold">
                    {filteredSchoolDeficiencies.length} विद्यालय प्रदर्शित
                  </span>
                </h3>
                <p className="text-xs text-neutral-500">
                  {isHi ? 'जिन विद्यालयों में भौतिक विज्ञान, रसायन विज्ञान, गणित, अंग्रेजी या प्राथमिक शिक्षकों के पद रिक्त होने से पढ़ाई प्रभावित है:' : 'Schools facing critical shortage in Science, Maths, English & Primary teaching:'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSchoolDeficiencies.map((sch) => (
                <div 
                  key={sch.id}
                  className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-blue-300 shadow-2xs space-y-4 relative overflow-hidden transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">{isHi ? sch.blockNameHi : sch.blockName} ब्लॉक</span>
                        <span>•</span>
                        <span>{isHi ? sch.panchayatNameHi : sch.panchayatName} ग्राम पंचायत</span>
                      </div>
                      <h4 className="text-base font-bold text-neutral-900 mt-1">
                        {isHi ? sch.schoolNameHi : sch.schoolName}
                      </h4>
                      <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        UDISE: {sch.udiseCode} • {sch.enrolledStudents} {isHi ? 'छात्र नामांकित' : 'Students'}
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      sch.deficiencySeverity === 'critical'
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {sch.deficiencySeverity === 'critical' ? (isHi ? 'गंभीर कमी ⚠️' : 'Critical') : (isHi ? 'उच्च कमी' : 'High Deficit')}
                    </span>
                  </div>

                  {/* Staffing Overview */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-neutral-50 rounded-xl text-center text-xs">
                    <div>
                      <div className="text-[10px] text-neutral-500">{isHi ? 'स्वीकृत पद' : 'Sanctioned'}</div>
                      <div className="font-bold text-neutral-900 text-sm">{sch.totalSanctioned}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-600">{isHi ? 'कार्यरत' : 'Working'}</div>
                      <div className="font-bold text-emerald-700 text-sm">{sch.workingStaff}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-red-600 font-bold">{isHi ? 'रिक्त पद' : 'Vacant'}</div>
                      <div className="font-bold text-red-700 text-sm">{sch.vacantStaff}</div>
                    </div>
                  </div>

                  {/* Vacant Subjects / Posts */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-neutral-800">
                      {isHi ? 'मुख्य रिक्त पद व विषय:' : 'Key Vacant Subject Posts:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(isHi ? sch.vacantKeyPostsHi : sch.vacantKeyPosts).map((post, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 bg-red-50 text-red-800 border border-red-200/80 rounded-md text-[11px] font-medium"
                        >
                          ❌ {post}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Current Action / Vidya Sambal Status */}
                  <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs space-y-1">
                    <div className="text-[11px] font-bold text-blue-900">{isHi ? 'वर्तमान व्यवस्था व कार्रवाई:' : 'Action / Status:'}</div>
                    <p className="text-blue-950 font-medium leading-relaxed">
                      {isHi ? sch.actionStatusHi : sch.actionStatus}
                    </p>
                  </div>

                  {/* Contact Line */}
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                    <span>{isHi ? 'संबंधित सीबीईओ संपर्क:' : 'CBEO Contact:'}</span>
                    <span className="font-bold text-neutral-900">{sch.cbeoContact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HEALTH FACILITIES & HOSPITALS TAB */}
      {activeSubTab === 'health' && (
        <div className="space-y-6">
          {/* Top Health Overview Card */}
          <div className="p-6 bg-linear-to-r from-rose-900 via-pink-950 to-slate-900 text-white rounded-2xl border border-rose-800 shadow-md space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold">
                  <HeartPulse className="w-4 h-4 text-rose-400" />
                  <span>{isHi ? 'झालावाड़ जिला - स्वास्थ्य व चिकित्सा नेटवर्क' : 'Jhalawar District Health & Medical Network'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isHi ? 'चिकित्सालय, उप-जिला अस्पताल, CHC व 24x7 आपातकालीन सेवाएं' : 'Hospitals, Sub-District Centers, CHCs & 24x7 Emergency Services'}
                </h2>
                <p className="text-rose-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  {isHi 
                    ? '850 बेड क्षमता युक्त झालावाड़ मेडिकल कॉलेज (SRG अस्पताल), 100 बेड वाले अकलेरा व भवानीमंडी उप-जिला अस्पताल, जनाना अस्पताल, ब्लड बैंक, हीमोडायलिसिस यूनिट व 108 एम्बुलेंस नेटवर्क का संपूर्ण विवरण।'
                    : 'Complete directory of 850-bed SRG Medical College Hospital, Sub-District Hospitals at Aklera & Bhawanimandi, CHCs, Blood Banks, Dialysis and 108 ambulance fleet.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                <a
                  href="tel:108"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <Ambulance className="w-4 h-4" />
                  <span>{isHi ? '108 आपातकालीन एम्बुलेंस' : '108 Ambulance Call'}</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-4 border-t border-rose-800/60">
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-rose-200">{isHi ? 'मेडिकल कॉलेज अस्पताल' : 'Medical College'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">850 {isHi ? 'बेड्स' : 'Beds'}</div>
                <div className="text-[10px] text-rose-300">SRG अस्पताल झालावाड़</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-rose-200">{isHi ? 'उप-जिला अस्पताल (SDH)' : 'Sub-District (SDH)'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">5 {isHi ? 'अस्पताल' : 'SDHs'}</div>
                <div className="text-[10px] text-rose-300">अकलेरा, भवानीमंडी, पिड़ावा</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-rose-200">{isHi ? 'सामुदायिक स्वास्थ्य (CHC)' : 'Total CHCs'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">18 {isHi ? 'केंद्र' : 'CHCs'}</div>
                <div className="text-[10px] text-rose-300">सभी ब्लॉकों में</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-rose-200">{isHi ? 'प्राथमिक स्वास्थ्य (PHC)' : 'Total PHCs'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">62 {isHi ? 'केंद्र' : 'PHCs'}</div>
                <div className="text-[10px] text-rose-300">ग्रामीण स्वास्थ्य केंद्र</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-rose-200">{isHi ? 'ब्लड बैंक व डायलिसिस' : 'Blood Bank & Dialysis'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">24x7 {isHi ? 'उपलब्ध' : 'Active'}</div>
                <div className="text-[10px] text-rose-300">निशुल्क सेवा</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-rose-200">{isHi ? '108/104 एम्बुलेंस बेड़ा' : '108 Ambulance Fleet'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">28 {isHi ? 'वाहन' : 'Fleet'}</div>
                <div className="text-[10px] text-rose-300">GPS ट्रैक्ड रिस्पॉन्स</div>
              </div>
            </div>

            {/* CMHO Contact Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-rose-950/60 rounded-xl border border-rose-800 text-xs gap-2">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-rose-300" />
                <span className="text-rose-200">{isHi ? 'मुख्य चिकित्सा एवं स्वास्थ्य अधिकारी (CMHO झालावाड़):' : 'CMHO Jhalawar:'}</span>
                <span className="font-bold text-white">{isHi ? 'डॉ. जी.एम. सैय्यद' : 'Dr. G.M. Sayeed'}</span>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="tel:07432230472" 
                  className="px-3 py-1 bg-rose-700 hover:bg-rose-600 text-white rounded-lg font-bold inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>07432-230472</span>
                </a>
                <span className="text-rose-300 text-[11px]">कलेक्ट्रेट रोड, झालावाड़</span>
              </div>
            </div>
          </div>

          {/* Hospitals List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHealthFacilities.map(h => (
              <div 
                key={h.id}
                className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-rose-300 shadow-2xs space-y-4 relative transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200">
                      {isHi ? h.categoryHi : h.category}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 mt-1.5">
                      {isHi ? h.nameHi : h.name}
                    </h3>
                    <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{isHi ? h.locationHi : h.location}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold text-rose-700">{h.bedsCount}</div>
                    <div className="text-[10px] text-neutral-400 font-medium">{isHi ? 'बेड क्षमता' : 'Beds'}</div>
                  </div>
                </div>

                {/* Key Incharge & Facilities */}
                <div className="p-3 bg-neutral-50 rounded-xl space-y-2 text-xs">
                  <div className="text-neutral-700">
                    <span className="text-neutral-500 font-medium">{isHi ? 'प्रभारी चिकित्सक:' : 'Incharge:'} </span>
                    <strong className="text-neutral-900">{isHi ? h.inchargeDoctorHi : h.inchargeDoctor}</strong>
                  </div>
                  <div className="space-y-1 pt-1 border-t border-neutral-200">
                    <div className="text-[11px] font-bold text-neutral-800">{isHi ? 'प्रमुख सुविधाएं:' : 'Facilities:'}</div>
                    <ul className="space-y-1 text-neutral-600">
                      {(isHi ? h.facilitiesHi : h.facilities).map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2 text-xs">
                  <a 
                    href={`tel:${h.contactNumber.split('/')[0].trim()}`}
                    className="flex-1 py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold rounded-xl text-center inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isHi ? 'अस्पताल फोन' : 'Call Office'}</span>
                  </a>
                  <a 
                    href="tel:108"
                    className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-center inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Ambulance className="w-3.5 h-3.5" />
                    <span>108</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AGRICULTURE, CITRUS ORANGE & MANDI RATES TAB */}
      {activeSubTab === 'agriculture' && (
        <div className="space-y-6">
          {/* Top Orange & Agriculture Card */}
          <div className="p-6 bg-linear-to-r from-amber-800 via-orange-950 to-stone-900 text-white rounded-2xl border border-amber-700 shadow-md space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
                  <Wheat className="w-4 h-4 text-amber-400" />
                  <span>{isHi ? 'राजस्थान का नागपुर - झालावाड़ कृषि व संतरा हब' : 'Citrus Hub - Nagpur of Rajasthan (Jhalawar)'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isHi ? 'प्रमुख कृषि उपज मंडियां, संतरा, सोयाबीन, धनिया व लहसुन भाव' : 'Agricultural Mandis, Citrus Orange, Soybean, Coriander & Garlic Trade'}
                </h2>
                <p className="text-amber-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  {isHi 
                    ? 'झालावाड़ जिला देश भर में अपने रसीले संतरे (नागपुरी मैंडरिन), उत्तम गुणवत्ता वाले सोयाबीन, खानपुर के खुशबूदार धनिया और उजाड़ कछार के लहसुन के लिए प्रसिद्ध है।'
                    : 'Jhalawar is celebrated nationwide for export-grade Mandarin oranges, high-yield soybean, aromatic Khanpur coriander, and premium garlic.'}
                </p>
              </div>

              <div className="p-3.5 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10 text-xs space-y-1 text-center shrink-0">
                <div className="text-amber-300 font-bold">{isHi ? 'फल उत्कृष्टता केंद्र (Citrus Center)' : 'Centre of Excellence for Citrus'}</div>
                <div className="text-white text-xs">नांता / झालावाड़ (हॉर्टिकल्चर रिसर्च)</div>
                <div className="text-[11px] text-amber-200">फोन: 07432-230462</div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-amber-700/60">
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-amber-200">{isHi ? 'संतरा बागवानी क्षेत्र' : 'Orange Cultivation Area'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">45,000+ {isHi ? 'हेक्टेयर' : 'Ha'}</div>
                <div className="text-[10px] text-amber-300">वार्षिक 4.5 लाख मीट्रिक टन</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-amber-200">{isHi ? 'सोयाबीन उत्पादन' : 'Soybean Area'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">2.35 {isHi ? 'लाख हेक्टेयर' : 'Lakh Ha'}</div>
                <div className="text-[10px] text-amber-300">खरीफ की मुख्य फसल</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-amber-200">{isHi ? 'धनिया व मसाला बेल्ट' : 'Coriander & Spices'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">खानपुर व सारोला</div>
                <div className="text-[10px] text-amber-300">देश का शीर्ष धनिया व्यापार</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-amber-200">{isHi ? 'कृषि उपज मंडियां' : 'Regulated APMC Mandis'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">5 {isHi ? 'मुख्य मंडियां' : 'APMCs'}</div>
                <div className="text-[10px] text-amber-300">ई-नाम (e-NAM) एकीकृत</div>
              </div>
            </div>
          </div>

          {/* Mandi Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgricultureMandis.map(m => (
              <div 
                key={m.id}
                className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-amber-400 shadow-2xs space-y-4 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                      {isHi ? m.cropNameHi : m.cropName}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 mt-1.5">
                      {isHi ? m.mandiNameHi : m.mandiName}
                    </h3>
                    <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{isHi ? m.locationHi : m.location}</span>
                    </div>
                  </div>
                </div>

                {/* Price Highlights */}
                <div className="p-3.5 bg-amber-50/60 border border-amber-100 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-600">{isHi ? 'औसत / मॉडल भाव:' : 'Modal Rate:'}</span>
                    <span className="text-base font-bold text-amber-900">₹ {m.modalPricePerQuintal} / क्विंटल</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 border-t border-amber-200/60">
                    <span>न्यूनतम: <strong>₹ {m.minPrice}</strong></span>
                    <span>अधिकतम: <strong>₹ {m.maxPrice}</strong></span>
                    <span>आवक: <strong>{m.dailyArrivalQuintal} Qtl</strong></span>
                  </div>
                </div>

                <div className="text-xs text-neutral-700 leading-relaxed bg-neutral-50 p-2.5 rounded-xl">
                  {isHi ? m.specialityRemarkHi : m.specialityRemarkEn}
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                  <span>{isHi ? 'मंडी सचिव संपर्क:' : 'Secretary Contact:'}</span>
                  <a 
                    href={`tel:${m.secretaryContact.split('/')[0].trim()}`}
                    className="font-bold text-amber-800 hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{m.secretaryContact}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IRRIGATION DAMS & WATER RESERVOIRS TAB */}
      {activeSubTab === 'irrigation' && (
        <div className="space-y-6">
          {/* Top Dams Overview */}
          <div className="p-6 bg-linear-to-r from-cyan-900 via-teal-950 to-slate-900 text-white rounded-2xl border border-cyan-800 shadow-md space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  <span>{isHi ? 'जल संसाधन विभाग - झालावाड़ बांध एवं सिंचाई तंत्र' : 'Water Resources - Jhalawar Dams & Irrigation'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isHi ? 'कालीसिंध, भीमसागर, छापी व परवन वृहद बांध परियोजनाएं' : 'Kalisindh, Bhimsagar, Chhapi & Parwan Major Water Projects'}
                </h2>
                <p className="text-cyan-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  {isHi 
                    ? 'कालीसिंध (33 गेट), भीमसागर (उजाड़ नदी), छापी (अकलेरा) व परवन-राजगढ़ बहुउद्देश्यीय परियोजनाओं की क्षमता, जलस्तर, नहर तंत्र एवं सिंचित क्षेत्र का आधिकारिक विवरण।'
                    : 'Storage capacity, current water levels, canal network and beneficiary tehsils of Kalisindh, Bhimsagar, Chhapi and Parwan dams.'}
                </p>
              </div>

              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10 text-xs space-y-1 shrink-0">
                <div className="text-cyan-300 font-bold">{isHi ? 'बाढ़ एवं बांध नियंत्रण कक्ष' : 'Flood & Dam Control Room'}</div>
                <div className="text-white text-sm font-bold">07432-230403 / 1077</div>
                <div className="text-[10px] text-cyan-200">24x7 जलस्तर मॉनिटरिंग</div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-cyan-800/60">
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-cyan-200">{isHi ? 'कालीसिंध बांध क्षमता' : 'Kalisindh Capacity'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">5,420 Mcft</div>
                <div className="text-[10px] text-cyan-300">33 स्वचालित गेट</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-cyan-200">{isHi ? 'भीमसागर बांध (उजाड़)' : 'Bhimsagar Dam'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">2,400 Mcft</div>
                <div className="text-[10px] text-cyan-300">खानपुर व झालरापाटन</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-cyan-200">{isHi ? 'छापी बांध (अकलेरा)' : 'Chhapi Dam'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">1,950 Mcft</div>
                <div className="text-[10px] text-cyan-300">16 गेट व नहर नेटवर्क</div>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10">
                <div className="text-[11px] text-cyan-200">{isHi ? 'कुल सिंचित नहरी क्षेत्र' : 'Total Irrigated Area'}</div>
                <div className="text-lg sm:text-xl font-bold text-white">93,000+ {isHi ? 'हेक्टेयर' : 'Ha'}</div>
                <div className="text-[10px] text-cyan-300">जिले भर में</div>
              </div>
            </div>
          </div>

          {/* Dam Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIrrigationDams.map(dam => (
              <div 
                key={dam.id}
                className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-cyan-400 shadow-2xs space-y-4 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-md">
                      {isHi ? dam.riverHi : dam.river}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 mt-1.5">
                      {isHi ? dam.nameHi : dam.name}
                    </h3>
                    <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{isHi ? dam.locationHi : dam.location}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-2 py-1 bg-cyan-100 text-cyan-900 rounded-lg text-xs font-bold">
                      {dam.gatesCount} {isHi ? 'गेट' : 'Gates'}
                    </span>
                  </div>
                </div>

                {/* Water Level & Capacity Metrics */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-cyan-50/50 rounded-xl text-xs">
                  <div>
                    <div className="text-[10px] text-neutral-500">{isHi ? 'कुल भराव क्षमता:' : 'Capacity:'}</div>
                    <div className="font-bold text-cyan-950 text-sm">{dam.totalCapacityMcft} Mcft</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500">{isHi ? 'वर्तमान जलस्तर / FRL:' : 'Level / FRL:'}</div>
                    <div className="font-bold text-cyan-950 text-sm">{dam.currentLevelMetres} m / {dam.fullReservoirLevelMetres} m</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500">{isHi ? 'नहरों की लंबाई:' : 'Canal Length:'}</div>
                    <div className="font-bold text-neutral-800">{dam.canalLengthKm} किमी</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500">{isHi ? 'सिंचित कमान क्षेत्र:' : 'Command Area:'}</div>
                    <div className="font-bold text-neutral-800">{dam.irrigatedAreaHectares} हेक्टेयर</div>
                  </div>
                </div>

                {/* Beneficiary Tehsils */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-neutral-800">{isHi ? 'लाभान्वित तहसीलें / क्षेत्र:' : 'Beneficiary Tehsils:'}</div>
                  <div className="flex flex-wrap gap-1">
                    {(isHi ? dam.beneficiaryTehsilsHi : dam.beneficiaryTehsils).map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[11px] rounded-md font-medium">
                        💧 {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                  <span>{isHi ? 'नियंत्रण कक्ष:' : 'Control Room:'}</span>
                  <span className="font-bold text-cyan-900">{dam.controlRoomContact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOURISM, HERITAGE & WORLD HERITAGE TAB */}
      {activeSubTab === 'tourism' && (
        <div className="space-y-6">
          {/* Top Tourism Overview */}
          <div className="p-6 bg-linear-to-r from-indigo-900 via-purple-950 to-slate-900 text-white rounded-2xl border border-indigo-800 shadow-md space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
                  <Compass className="w-4 h-4 text-indigo-400" />
                  <span>{isHi ? 'पर्यटन व पुरातत्व विभाग - झालावाड़ ऐतिहासिक धरोहर' : 'Tourism & Archaeology - Jhalawar Heritage'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isHi ? 'गागरोन जल दुर्ग (UNESCO), सूर्य मंदिर, बौद्ध गुफाएं व भवानी नाट्यशाला' : 'Gagron Fort (UNESCO), Sun Temple, Buddhist Caves & Bhawani Natyashala'}
                </h2>
                <p className="text-indigo-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  {isHi 
                    ? 'बिना नींव का विश्व प्रसिद्ध गागरोन जल दुर्ग (यूनेस्को विश्व धरोहर), 10वीं शताब्दी का 100 फीट ऊंचा झालरापाटन सूर्य मंदिर, कोलवी की 50 शैलकृत बौद्ध गुफाएं (राजस्थान की एलोरा), और विश्व में दुर्लभ पारसी ओपेरा भवानी नाट्यशाला।'
                    : 'Explore UNESCO World Heritage Gagron Water Fort, 10th-century Sun Temple Jhalrapatan, 50 rock-cut Kolvi Buddhist caves, and historic Bhawani Natyashala theatre.'}
                </p>
              </div>

              <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10 text-xs space-y-1 text-center shrink-0">
                <div className="text-indigo-300 font-bold">{isHi ? 'पर्यटन स्वागत केंद्र (TRC)' : 'Tourist Reception Centre'}</div>
                <div className="text-white text-xs">होटल चंद्रभागा RTDC परिसर, झालावाड़</div>
                <div className="text-[11px] text-indigo-200">फोन: 07432-230081</div>
              </div>
            </div>
          </div>

          {/* Tourism Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTourismSpots.map(tour => (
              <div 
                key={tour.id}
                className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-indigo-400 shadow-2xs space-y-4 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                        {isHi ? tour.categoryHi : tour.category}
                      </span>
                      <h3 className="text-base font-bold text-neutral-900 mt-1.5">
                        {isHi ? tour.nameHi : tour.name}
                      </h3>
                      <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>{isHi ? tour.locationHi : tour.location}</span>
                        <span>•</span>
                        <span className="font-bold text-neutral-700">{tour.distanceFromHQKm} किमी मुख्यालय से</span>
                      </div>
                    </div>
                  </div>

                  {/* Historical Significance */}
                  <p className="text-xs text-neutral-700 leading-relaxed bg-neutral-50 p-3 rounded-xl">
                    {isHi ? tour.historicalSignificanceHi : tour.historicalSignificance}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-neutral-800">{isHi ? 'मुख्य आकर्षण:' : 'Key Highlights:'}</div>
                    <ul className="space-y-1 text-xs text-neutral-600">
                      {(isHi ? tour.highlightsHi : tour.highlights).map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-neutral-400" /> {isHi ? 'समय:' : 'Timings:'}</span>
                    <span className="font-semibold text-neutral-800">{isHi ? tour.timingHi : tour.timing}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Ticket className="w-3.5 h-3.5 text-neutral-400" /> {isHi ? 'प्रवेश शुल्क:' : 'Entry:'}</span>
                    <span className="font-bold text-indigo-900">{isHi ? tour.entryFeeHi : tour.entryFee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 24x7 TRANSPORT & EMERGENCY HELPLINES TAB */}
      {activeSubTab === 'transportEmergency' && (
        <div className="space-y-6">
          {/* Top Emergency Hero */}
          <div className="p-6 bg-linear-to-r from-red-900 via-rose-950 to-slate-900 text-white rounded-2xl border border-red-800 shadow-md space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-bold">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>{isHi ? '24x7 जिला आपातकालीन हेल्पलाइन एवं कनेक्टिविटी' : '24x7 Emergency Helplines & Transport Hubs'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isHi ? 'बाढ़ नियंत्रण (1077), पुलिस (112), भवानीमंडी रेलवे व रोडवेज डिपो' : 'Disaster EOC (1077), Police (112), Railway Hubs & Bus Depot'}
                </h2>
                <p className="text-red-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  {isHi 
                    ? 'जिला आपदा प्रबंधन एवं बाढ़ राहत नियंत्रण कक्ष, पुलिस अभय कमांड सेंटर, भवानीमंडी व चौमहला रेलवे स्टेशन (दिल्ली-मुंबई मुख्य लाइन), राजस्थान रोडवेज डिपो व महिला सुरक्षा हेल्पलाइन।'
                    : 'Complete 24x7 helpline numbers and transport hubs across Jhalawar district with direct dial and details.'}
                </p>
              </div>

              {/* Direct Emergency Callers */}
              <div className="flex flex-wrap gap-2 shrink-0">
                <a 
                  href="tel:1077"
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>बाढ़ राहत (1077)</span>
                </a>
                <a 
                  href="tel:112"
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>पुलिस (112)</span>
                </a>
                <a 
                  href="tel:108"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Ambulance className="w-3.5 h-3.5" />
                  <span>एम्बुलेंस (108)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Transport & Emergency Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTransportServices.map(svc => (
              <div 
                key={svc.id}
                className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-red-400 shadow-2xs space-y-4 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        {isHi ? svc.categoryHi : svc.category}
                      </span>
                      <h3 className="text-base font-bold text-neutral-900 mt-1.5">
                        {isHi ? svc.titleHi : svc.title}
                      </h3>
                      <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>{isHi ? svc.locationHi : svc.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-700 leading-relaxed bg-neutral-50 p-3 rounded-xl">
                    {isHi ? svc.detailsHi : svc.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-600">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-neutral-400" /> {isHi ? 'कार्य समय:' : 'Hours:'}</span>
                    <span className="font-semibold text-neutral-800">{isHi ? svc.operationalHoursHi : svc.operationalHours}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a 
                      href={`tel:${svc.phone.split('/')[0].trim()}`}
                      className="flex-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-800 text-xs font-bold rounded-xl text-center inline-flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{svc.phone.split('/')[0].trim()}</span>
                    </a>
                    {svc.tollFree && (
                      <a 
                        href={`tel:${svc.tollFree.split(' ')[0].trim()}`}
                        className="py-2 px-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl text-center inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>टोल-फ्री: {svc.tollFree.split(' ')[0]}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 0. E-GRAM PANCHAYATI RAJ MASTER TAB (269 PANCHAYATS DIRECTORY) */}
      {activeSubTab === 'egramMaster' && (
        <div className="space-y-6">
          {/* Quick Samiti Badges Selector */}
          <div className="p-4 bg-white rounded-2xl border border-neutral-200 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                {isHi ? 'पंचायत समिति अनुसार ग्राम पंचायतें चुनें:' : 'Filter by Panchayat Samiti:'}
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                {isHi ? `कुल ${filteredEGramPanchayats.length} ग्राम पंचायतें प्रदर्शित` : `Showing ${filteredEGramPanchayats.length} Gram Panchayats`}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSamitiFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSamitiFilter === 'all'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {isHi ? 'सभी 8 समितियां (269)' : 'All 8 Samitis (269)'}
              </button>
              {JHALAWAR_8_SAMITIS_MASTER.map(s => (
                <button
                  key={s.samitiId}
                  onClick={() => setSelectedSamitiFilter(s.samitiNameHi)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSamitiFilter === s.samitiNameHi
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200/60'
                  }`}
                >
                  {isHi ? s.samitiNameHi : s.samitiName} ({s.totalPanchayats})
                </button>
              ))}
            </div>
          </div>

          {/* Master 269 Gram Panchayats Table */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs">
            <div className="p-4 bg-emerald-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-300" />
                <h2 className="font-bold text-base text-white">
                  {isHi ? 'झालावाड़ जिला - ई-ग्राम स्वराज पंचायती राज 269 ग्राम पंचायत डायरेक्टरी' : 'Jhalawar District 269 Gram Panchayats Master Directory'}
                </h2>
              </div>
              <button
                onClick={handleExport269PanchayatsCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold self-start sm:self-auto border border-emerald-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isHi ? 'CSV एक्सपोर्ट' : 'Export CSV'}</span>
              </button>
            </div>

            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-neutral-100 border-b border-neutral-200 z-10">
                  <tr className="text-neutral-700 font-bold">
                    <th className="p-3 w-12 text-center">{isHi ? 'क्र.सं.' : 'S.No'}</th>
                    <th className="p-3">{isHi ? 'ग्राम पंचायत का नाम' : 'Gram Panchayat'}</th>
                    <th className="p-3">{isHi ? 'पंचायत समिति' : 'Panchayat Samiti'}</th>
                    <th className="p-3">{isHi ? 'तहसील' : 'Tehsil'}</th>
                    <th className="p-3">{isHi ? 'LGD कोड' : 'LGD Code'}</th>
                    <th className="p-3">{isHi ? 'GPDP स्थिति' : 'GPDP Plan'}</th>
                    <th className="p-3">{isHi ? '15वां वित्त आयोग' : '15th FC Funds'}</th>
                    <th className="p-3">{isHi ? 'JJM नल जल' : 'JJM Tap'}</th>
                    <th className="p-3 text-center">{isHi ? 'ई-ग्राम सिंक' : 'eGram Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredEGramPanchayats.map((item) => (
                    <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="p-3 text-center font-mono text-neutral-500 font-semibold">{item.sn}</td>
                      <td className="p-3 font-bold text-neutral-900">
                        <div className="text-sm text-neutral-900">{item.nameHi}</div>
                        <div className="text-[10px] text-neutral-500">
                          {isHi ? `${item.totalVillagesCount} राजस्व ग्राम अधीन` : `${item.totalVillagesCount} Villages`}
                        </div>
                      </td>
                      <td className="p-3 font-medium text-emerald-900">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/60 font-semibold">
                          {item.samitiNameHi}
                        </span>
                      </td>
                      <td className="p-3 text-neutral-700 font-medium">{item.tehsilNameHi}</td>
                      <td className="p-3 font-mono text-neutral-600 bg-neutral-50/60 font-semibold">{item.lgdCode}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{item.gpdpStatus}</span>
                        </span>
                      </td>
                      <td className="p-3 font-bold text-neutral-900">
                        ₹ {item.fc15AllocatedLakh} {isHi ? 'लाख' : 'Lakh'}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${item.jjmCoveragePercent}%` }}></div>
                          </div>
                          <span className="font-bold text-[11px] text-emerald-800">{item.jjmCoveragePercent}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                          <CheckCircle className="w-3 h-3 text-blue-600" />
                          <span>Active</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 1. OVERVIEW TAB */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Key District Facts Card */}
          <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <span>{isHi ? 'झालावाड़ जिला प्रशासनिक रूपरेखा (2025 मास्टर प्लान)' : 'Jhalawar District Administrative Structure (2025 Plan)'}</span>
              </h2>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {isHi ? 'LGD कोड: 093 (राजस्थान)' : 'LGD Code: 093'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
                <div className="text-xs text-neutral-500 mb-1">{isHi ? 'जिला कलेक्टर एवं जिला मजिस्ट्रेट' : 'District Collector & DM'}</div>
                <div className="font-bold text-neutral-900">{isHi ? 'श्री अजय सिंह राठौड़' : 'Shri Ajay Singh Rathore'}</div>
                <div className="text-xs text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
                  <Phone className="w-3.5 h-3.5" />
                  <span>07432-230403 / 9414350377</span>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
                <div className="text-xs text-neutral-500 mb-1">{isHi ? 'जिला पुलिस अधीक्षक' : 'Superintendent of Police'}</div>
                <div className="font-bold text-neutral-900">{isHi ? 'श्रीमती ऋचा तोमर' : 'Smt. Richa Tomar'}</div>
                <div className="text-xs text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
                  <Phone className="w-3.5 h-3.5" />
                  <span>07432-230410 / 9650764504</span>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
                <div className="text-xs text-neutral-500 mb-1">{isHi ? 'हीट वेव व आपदा नोडल अधिकारी' : 'Disaster Nodal Officer'}</div>
                <div className="font-bold text-neutral-900">{isHi ? 'श्री अभिषेक चारण (SDM झालावाड़)' : 'Shri Abhishek Charan (SDM)'}</div>
                <div className="text-xs text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
                  <Phone className="w-3.5 h-3.5" />
                  <span>07432-230449 / 9636404643</span>
                </div>
              </div>
            </div>
          </div>

          {/* 12 Tehsils Quick Grid */}
          <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>{isHi ? 'सभी 12 तहसीलें (राजस्व एवं उपखंड)' : 'All 12 Tehsils (Revenue & Sub-Divisions)'}</span>
              </h2>
              <button
                onClick={() => setActiveSubTab('tehsils')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>{isHi ? 'विस्तार से देखें' : 'View Detailed'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {JHALAWAR_12_TEHSILS_OFFICIAL.map((teh) => (
                <div 
                  key={teh.sn}
                  onClick={() => setActiveSubTab('tehsils')}
                  className="p-3 rounded-xl border border-neutral-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all cursor-pointer group"
                >
                  <div className="font-bold text-neutral-900 group-hover:text-emerald-900 text-sm">
                    {teh.nameHi}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {isHi ? `${teh.totalVillages} राजस्व ग्राम` : `${teh.totalVillages} Villages`} • {isHi ? `${teh.totalPatwars} पटवार` : `${teh.totalPatwars} Patwars`}
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-1 truncate">
                    {teh.tehsildar}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8 Panchayat Samitis Quick Grid */}
          <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <span>{isHi ? 'सभी 8 पंचायत समितियां (269 ग्राम पंचायतें)' : 'All 8 Panchayat Samitis (269 GPs)'}</span>
              </h2>
              <button
                onClick={() => setActiveSubTab('samitis')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>{isHi ? 'विस्तार से देखें' : 'View Detailed'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {JHALAWAR_8_SAMITIS_MASTER.map((s) => (
                <div key={s.samitiId} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-neutral-900 text-sm">{s.samitiNameHi}</div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {s.totalPanchayats} GPs
                    </span>
                  </div>
                  <div className="text-xs text-neutral-600 space-y-1">
                    <div><span className="text-neutral-400">{isHi ? 'BDO:' : 'BDO:'}</span> <span className="font-semibold text-neutral-800">{s.bdoName}</span></div>
                    <div className="flex items-center gap-1 text-emerald-700 font-medium">
                      <Phone className="w-3 h-3" />
                      <span>{s.bdoContact} ({s.stdCode})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. TEHSILS TAB */}
      {activeSubTab === 'tehsils' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 font-medium">
            {isHi 
              ? 'झालावाड़ जिले की सभी 12 तहसीलों की आधिकारिक 2025 संपर्क सूची, उपखंड अधिकारी (SDM), तहसीलदार, फोन नंबर, पटवार मंडल एवं राजस्व ग्राम संख्या:' 
              : 'Official 2025 directory of all 12 Tehsils in Jhalawar District with SDM, Tehsildar, Phone contacts, Patwar Mandals and Village count:'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {JHALAWAR_12_TEHSILS_OFFICIAL.map((teh) => (
              <div key={teh.sn} className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-3">
                <div className="flex items-start justify-between border-b border-neutral-100 pb-2.5">
                  <div>
                    <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">तहसील क्र. {teh.sn}</div>
                    <h3 className="font-bold text-neutral-900 text-base">{teh.nameHi}</h3>
                    <div className="text-xs text-neutral-500 font-medium">{isHi ? `उपखंड: ${teh.subdivision}` : `Subdivision: ${teh.subdivision}`}</div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-md">
                    {teh.totalVillages} {isHi ? 'गांव' : 'Villages'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-neutral-50 rounded-xl space-y-1">
                    <div className="text-neutral-500 font-medium">{isHi ? 'उपखंड अधिकारी (SDM):' : 'SDM:'}</div>
                    <div className="font-bold text-neutral-900">{teh.sdm}</div>
                    <div className="flex items-center justify-between text-emerald-700">
                      <span>मो: <a href={`tel:${teh.sdmContact}`} className="font-semibold hover:underline">{teh.sdmContact}</a></span>
                      <span>कार्यालय: {teh.sdmOffice}</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-neutral-50 rounded-xl space-y-1">
                    <div className="text-neutral-500 font-medium">{isHi ? 'तहसीलदार:' : 'Tehsildar:'}</div>
                    <div className="font-bold text-neutral-900">{teh.tehsildar}</div>
                    <div className="flex items-center justify-between text-emerald-700">
                      <span>मो: <a href={`tel:${teh.tehsildarContact}`} className="font-semibold hover:underline">{teh.tehsildarContact}</a></span>
                      <span>कार्यालय: {teh.tehsildarOffice}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-neutral-600">
                    <span>{isHi ? 'कुल पटवार मंडल:' : 'Patwar Mandals:'} <strong className="text-neutral-900">{teh.totalPatwars}</strong></span>
                    <span>{isHi ? 'कुल राजस्व ग्राम:' : 'Revenue Villages:'} <strong className="text-neutral-900">{teh.totalVillages}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SAMITIS TAB */}
      {activeSubTab === 'samitis' && (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 font-medium">
            {isHi 
              ? 'झालावाड़ जिले की सभी 8 पंचायत समितियों का संपूर्ण ढांचा (विकास अधिकारी BDO, संपर्क, एवं अधीनस्थ समस्त 269 ग्राम पंचायतों की सूची):' 
              : 'All 8 Panchayat Samitis of Jhalawar District with BDO contacts and full constituent Gram Panchayats list:'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {JHALAWAR_8_SAMITIS_MASTER.map((s) => (
              <div key={s.samitiId} className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-4">
                <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg">{s.samitiNameHi}</h3>
                    <div className="text-xs text-neutral-500">{s.samitiName}</div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-lg text-xs">
                    {s.totalPanchayats} {isHi ? 'ग्राम पंचायतें' : 'GPs'}
                  </span>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl text-xs space-y-1">
                  <div className="text-neutral-500">{isHi ? 'खंड विकास अधिकारी (BDO):' : 'Block Dev Officer:'}</div>
                  <div className="font-bold text-neutral-900 text-sm">{s.bdoName}</div>
                  <div className="flex items-center gap-3 text-emerald-700 pt-0.5">
                    <span>मो: <a href={`tel:${s.bdoContact}`} className="font-semibold hover:underline">{s.bdoContact}</a></span>
                    <span>STD: {s.stdCode}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-neutral-700 flex items-center justify-between">
                    <span>{isHi ? `अधीनस्थ ${s.totalPanchayats} ग्राम पंचायतें:` : `Constituent ${s.totalPanchayats} GPs:`}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 bg-neutral-50/70 rounded-xl border border-neutral-100">
                    {s.panchayatNamesHi.map((gpName, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-800 font-medium shadow-2xs"
                      >
                        {idx + 1}. {gpName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. DISTRICT OFFICIALS TAB */}
      {activeSubTab === 'districtOfficials' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 font-medium">
            {isHi 
              ? 'झालावाड़ जिला प्रशासन, पुलिस, चिकित्सा, पीएचईडी (जलदाय), पीडब्ल्यूडी (सड़क), विद्युत निगम एवं शिक्षा विभाग के प्रमुख अधिकारियों की आधिकारिक 2025 संपर्क सूची:' 
              : 'Official 2025 contact directory of District Administration, Police, Health, PHED, PWD, Electricity and Education heads in Jhalawar:'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JHALAWAR_DISTRICT_KEY_OFFICIALS.map((off) => (
              <div key={off.id} className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-2xs space-y-2.5">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700">
                    {isHi ? off.departmentHi : off.department}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-medium">{isHi ? off.designationHi : off.designation}</div>
                  <div className="font-bold text-neutral-900 text-sm mt-0.5">{isHi ? off.nameHi : off.name}</div>
                </div>
                <div className="pt-2 border-t border-neutral-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-emerald-700">
                    <span className="text-neutral-400">{isHi ? 'मोबाइल:' : 'Mobile:'}</span>
                    <a href={`tel:${off.mobile}`} className="font-bold hover:underline">{off.mobile}</a>
                  </div>
                  <div className="flex items-center justify-between text-neutral-600">
                    <span className="text-neutral-400">{isHi ? 'कार्यालय दूरभाष:' : 'Office:'}</span>
                    <span>{off.stdCode}-{off.officeContact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. GRAM PANCHAYATS DETAILED DOSSIER TAB */}
      {activeSubTab === 'panchayats' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs sm:text-sm text-neutral-600">
              {isHi 
                ? `झालावाड़ जिले की विस्तृत डॉसियर युक्त ${filteredPanchayats.length} ग्राम पंचायतें प्रदर्शित:` 
                : `Showing ${filteredPanchayats.length} Detailed Gram Panchayat Dossiers in Jhalawar:`}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPanchayats.map((gp) => {
              const sarpanch = gp.representatives.find(r => r.designation === 'Sarpanch');
              const vdo = gp.representatives.find(r => r.designation === 'VDO');

              return (
                <div 
                  key={gp.id}
                  className="p-5 bg-white rounded-2xl border border-neutral-200 hover:border-emerald-500 shadow-2xs space-y-3.5 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {isHi ? gp.samitiNameHi : gp.samitiName}
                        </span>
                        <h3 className="text-base font-bold text-neutral-900 mt-1">
                          {isHi ? gp.nameHi : gp.name}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-sm">
                        LGD: {gp.lgdCode}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center py-2 bg-neutral-50 rounded-xl text-xs">
                      <div>
                        <div className="text-[10px] text-neutral-400">{isHi ? 'वार्ड' : 'Wards'}</div>
                        <div className="font-bold text-neutral-800">{gp.totalWards}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400">{isHi ? 'जनसंख्या' : 'Pop.'}</div>
                        <div className="font-bold text-neutral-800">{gp.totalPopulation.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400">{isHi ? 'राजस्व ग्राम' : 'Villages'}</div>
                        <div className="font-bold text-neutral-800">{gp.villages.length}</div>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">{isHi ? 'सरपंच:' : 'Sarpanch:'}</span>
                        <span className="font-semibold text-neutral-900">{isHi ? sarpanch?.nameHi : sarpanch?.name}</span>
                      </div>
                      {sarpanch?.contact && (
                        <div className="flex items-center justify-between text-neutral-600">
                          <span className="text-neutral-400">{isHi ? 'संपर्क:' : 'Phone:'}</span>
                          <a href={`tel:${sarpanch.contact}`} className="text-emerald-700 hover:underline">{sarpanch.contact}</a>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">{isHi ? 'ग्राम विकास अधिकारी:' : 'VDO:'}</span>
                        <span className="font-semibold text-neutral-900">{isHi ? vdo?.nameHi : vdo?.name}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-100">
                      <div className="text-[11px] text-neutral-500 mb-1">{isHi ? 'राजस्व ग्राम:' : 'Villages:'}</div>
                      <div className="flex flex-wrap gap-1">
                        {gp.villages.map(v => (
                          <span key={v.id} className="px-2 py-0.5 bg-neutral-100 rounded-md text-[11px] text-neutral-700">
                            {isHi ? v.nameHi : v.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectPanchayat && onSelectPanchayat(gp)}
                    className="w-full mt-2 py-2 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>{isHi ? 'संपूर्ण विकास कार्य व विवरण देखें' : 'View Full Dossier & Works'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. REVENUE VILLAGES TAB */}
      {activeSubTab === 'villages' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 font-medium">
            {isHi 
              ? `झालावाड़ जिले के राजस्व ग्रामों की सूची एवं उपलब्ध मूलभूत सुविधाएं (विद्यालय, स्वास्थ्य केंद्र, जल जीवन मिशन, पक्की सड़क, 24x7 बिजली):` 
              : `List of revenue villages in Jhalawar with available basic amenities:`}
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-100/80 border-b border-neutral-200 text-neutral-700 font-bold">
                    <th className="p-3.5">{isHi ? 'राजस्व ग्राम का नाम' : 'Village Name'}</th>
                    <th className="p-3.5">{isHi ? 'ग्राम पंचायत' : 'Gram Panchayat'}</th>
                    <th className="p-3.5">{isHi ? 'पंचायत समिति' : 'Panchayat Samiti'}</th>
                    <th className="p-3.5">{isHi ? 'जनसंख्या / परिवार' : 'Pop / HH'}</th>
                    <th className="p-3.5">{isHi ? 'सुविधाएं (विद्यालय/स्वास्थ्य/पानी/सड़क/बिजली)' : 'Facilities'}</th>
                    <th className="p-3.5">{isHi ? 'सत्यापन' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {allVillages.map((v, i) => (
                    <tr key={i} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="p-3.5 font-bold text-neutral-900">
                        <div>{isHi ? v.villageNameHi : v.villageName}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">LGD: {v.lgdCode} • PIN: {v.pincode}</div>
                      </td>
                      <td className="p-3.5 font-medium text-neutral-800">
                        {isHi ? v.gpNameHi : v.gpName}
                      </td>
                      <td className="p-3.5 text-neutral-600">
                        {isHi ? v.samitiNameHi : v.samitiName}
                      </td>
                      <td className="p-3.5 text-neutral-700">
                        <span className="font-semibold">{v.population.toLocaleString()}</span> / {v.households}
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {v.facilities.primarySchool && (
                            <span className="px-1.5 py-0.5 rounded-sm bg-blue-50 text-blue-700 text-[10px] font-medium">
                              {isHi ? 'प्रा.वि.' : 'Pri. School'}
                            </span>
                          )}
                          {v.facilities.secondarySchool && (
                            <span className="px-1.5 py-0.5 rounded-sm bg-indigo-50 text-indigo-700 text-[10px] font-medium">
                              {isHi ? 'उ.मा.वि.' : 'Sec. School'}
                            </span>
                          )}
                          {v.facilities.healthCenter ? (
                            <span className="px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 text-[10px] font-medium">
                              {isHi ? 'स्वास्थ्य केंद्र' : 'PHC/HWC'}
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded-sm bg-amber-50 text-amber-800 text-[10px] font-medium">
                              {isHi ? '❌ स्वास्थ्य केंद्र नहीं' : 'No PHC'}
                            </span>
                          )}
                          {v.facilities.drinkingWaterTap ? (
                            <span className="px-1.5 py-0.5 rounded-sm bg-cyan-50 text-cyan-700 text-[10px] font-medium">
                              {isHi ? 'नल जल (JJM)' : 'JJM Tap'}
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded-sm bg-red-50 text-red-700 text-[10px] font-medium">
                              {isHi ? '⚠️ नल जल अपूर्ण' : 'No JJM Tap'}
                            </span>
                          )}
                          {v.facilities.pavedRoad ? (
                            <span className="px-1.5 py-0.5 rounded-sm bg-stone-100 text-stone-700 text-[10px] font-medium">
                              {isHi ? 'पक्की सड़क' : 'Paved Road'}
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded-sm bg-amber-50 text-amber-800 text-[10px] font-medium">
                              {isHi ? '⚠️ कच्चा मार्ग' : 'Unpaved Road'}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{isHi ? 'सत्यापित' : 'Verified'}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. DEFICIENCIES & GROUND REALITY AUDIT TAB */}
      {activeSubTab === 'deficiencies' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{isHi ? 'झालावाड़ जिला - 100% सत्य धरातलीय कमियां व अधूरी योजनाओं का स्वतंत्र ऑडिट' : 'Jhalawar District - 100% True Ground Deficiencies Audit'}</span>
            </div>
            <p className="text-amber-800 text-xs leading-relaxed">
              {isHi 
                ? 'यह विशेष रिपोर्ट झालावाड़ के विभिन्न गांवों में पेयजल पाइपलाइन प्रेशर की कमी, खारे पानी के पॉकेट्स, टूटी हुई रपट/पुलिया, अधूरी आंतरिक सड़कें और वोल्टेज फ्लक्चुएशन की सटीक वस्तुस्थिति दर्शाती है।'
                : 'This audit specifically tracks pending JJM tap connections, damaged culverts, water salinity and transformer overloads across Jhalawar villages.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDeficiencies.map((def) => (
              <div 
                key={def.id}
                className="p-5 bg-white rounded-2xl border border-amber-200 shadow-2xs space-y-3.5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-neutral-500">{isHi ? def.samitiNameHi : def.samitiName} • {isHi ? def.panchayatNameHi : def.panchayatName}</span>
                    </div>
                    <h3 className="font-bold text-neutral-900 text-base mt-0.5">
                      {isHi ? def.villageNameHi : def.villageName}: {isHi ? def.deficiencyTitleHi : def.deficiencyTitle}
                    </h3>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    def.severity === 'critical' 
                      ? 'bg-red-100 text-red-800 border border-red-200' 
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {isHi ? def.severityHi : def.severity}
                  </span>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl text-xs space-y-1.5">
                  <div className="text-neutral-700">
                    <span className="font-bold text-neutral-900">{isHi ? 'धरातलीय प्रभाव:' : 'Ground Impact:'} </span>
                    {isHi ? def.impactDescriptionHi : def.impactDescription}
                  </div>
                  <div className="text-neutral-500 flex items-center justify-between pt-1 border-t border-neutral-200">
                    <span>{isHi ? 'प्रभावित ग्रामीण:' : 'Affected Pop:'} <strong>{def.affectedPopulation}</strong></span>
                    <span>{isHi ? 'श्रेणी:' : 'Category:'} <strong>{isHi ? def.categoryHi : def.category}</strong></span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-1.5">
                    <span className="font-semibold text-neutral-700 shrink-0">{isHi ? 'वर्तमान स्थिति:' : 'Status:'}</span>
                    <span className="text-neutral-900">{isHi ? def.currentStatusHi : def.currentStatus}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-semibold text-emerald-800 shrink-0">{isHi ? 'प्रशासनिक कार्रवाई:' : 'Action Taken:'}</span>
                    <span className="text-emerald-950 font-medium">{isHi ? def.actionTakenOrPlannedHi : def.actionTakenOrPlanned}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-neutral-500">
                    <span>{isHi ? 'अनुमानित समाधान समय:' : 'Timeline:'}</span>
                    <span className="font-bold text-neutral-800">{def.sanctionTimeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

