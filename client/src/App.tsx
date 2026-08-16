/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  DISTRICTS_DATA, 
  SAMITIS_DATA, 
  GRAM_PANCHAYATS_DATA 
} from './data/panchayatData';
import { INITIAL_GRIEVANCE_DATA } from './data/supplementaryData';
import { GramPanchayat, Language, SchemeWork, GrievanceTicket } from './types';
import { Navbar } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { FilterSection, ActiveNavTab } from './components/FilterSection';
import { PanchayatCard } from './components/PanchayatCard';
import { PanchayatDetailModal } from './components/PanchayatDetailModal';
import { VillageDirectoryView } from './components/VillageDirectoryView';
import { SchemeVerificationView } from './components/SchemeVerificationView';
import { OfficialLinksView } from './components/OfficialLinksView';
import { GramSabhaView } from './components/GramSabhaView';
import { CitizenServicesView } from './components/CitizenServicesView';
import { EmergencyDirectoryView } from './components/EmergencyDirectoryView';
import { GrievancePortalView } from './components/GrievancePortalView';
import { JhalawarDistrictPortal } from './components/JhalawarDistrictPortal';
import { VerificationModal } from './components/VerificationModal';
import { AddPanchayatModal } from './components/AddPanchayatModal';
import { playCheckSound, playUncheckSound, playAllCompleteSound } from './utils/audio';
import { submitComplaintToBackend } from './utils/api';
import { TeamGopalSinghHub } from './components/TeamGopalSinghHub';

const STORAGE_GPS_KEY = 'panchayat_directory_gps_v5_jhalrapatan_verified';
const STORAGE_LANG_KEY = 'panchayat_directory_lang_v4';
const STORAGE_SOUND_KEY = 'panchayat_directory_sound_v4';
const STORAGE_GRIEVANCES_KEY = 'panchayat_grievances_v4';

export default function App() {
  // Language state: 'hi' (Hindi default) or 'en' (English)
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      return (saved === 'en' || saved === 'hi') ? saved : 'hi';
    } catch {
      return 'hi';
    }
  });

  // Sound feedback state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SOUND_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Gram Panchayats list with persistence
  const [panchayats, setPanchayats] = useState<GramPanchayat[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GPS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback to default authentic dataset
    }
    return GRAM_PANCHAYATS_DATA;
  });

  // Citizen Grievances list with persistence
  const [grievances, setGrievances] = useState<GrievanceTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GRIEVANCES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_GRIEVANCE_DATA;
  });

  // Navigation & Filter states
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('teamHome');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedSamiti, setSelectedSamiti] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  // Selected Panchayat for Detail Modal
  const [selectedPanchayat, setSelectedPanchayat] = useState<GramPanchayat | null>(null);

  // Modals state
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Persist Panchayats
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_GPS_KEY, JSON.stringify(panchayats));
    } catch {
      // Ignore
    }
  }, [panchayats]);

  // Persist Grievances
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_GRIEVANCES_KEY, JSON.stringify(grievances));
    } catch {
      // Ignore
    }
  }, [grievances]);

  // Persist Lang
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // Ignore
    }
  }, [lang]);

  // Persist Sound
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SOUND_KEY, JSON.stringify(soundEnabled));
    } catch {
      // Ignore
    }
  }, [soundEnabled]);

  // Add Grievance Ticket handler
  const handleAddGrievance = (ticket: GrievanceTicket) => {
    setGrievances((prev) => [ticket, ...prev]);
    playAllCompleteSound(soundEnabled);

    // Best-effort sync to the shared backend so the grievance is visible
    // beyond this device too. This app remains fully usable offline - if
    // the citizen isn't logged in or the backend is unreachable, the
    // ticket still lives in local storage above.
    submitComplaintToBackend({
      title: ticket.categoryHi || ticket.category,
      description: ticket.description,
      category: ticket.category,
      village: ticket.villageName,
      priority: 'medium',
    }).catch(() => {
      // Non-fatal: grievance is already saved locally.
    });
  };

  // Handle District Change (also reset Samiti filter if needed)
  const handleDistrictChange = (distId: string) => {
    setSelectedDistrict(distId);
    setSelectedSamiti('all');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedDistrict('all');
    setSelectedSamiti('all');
    setSearchQuery('');
    setVerifiedOnly(false);
  };

  // Toggle scheme completion within a panchayat
  const handleToggleSchemeStatus = (panchayatId: string, schemeId: string) => {
    setPanchayats((prev) =>
      prev.map((gp) => {
        if (gp.id !== panchayatId) return gp;

        let wasCompleted = false;
        const updatedSchemes = gp.schemes.map((sch) => {
          if (sch.id === schemeId) {
            wasCompleted = sch.status === 'completed';
            const newStatus = wasCompleted ? 'in_progress' : 'completed';
            return {
              ...sch,
              status: newStatus as 'completed' | 'in_progress',
              statusHi: newStatus === 'completed' ? 'पूर्ण (सत्यापित)' : 'प्रगति पर',
            };
          }
          return sch;
        });

        if (!wasCompleted) {
          playCheckSound(soundEnabled);
        } else {
          playUncheckSound(soundEnabled);
        }

        const updatedGP = {
          ...gp,
          schemes: updatedSchemes,
        };

        // Also update modal state if open
        if (selectedPanchayat?.id === panchayatId) {
          setSelectedPanchayat(updatedGP);
        }

        return updatedGP;
      })
    );
  };

  // Add newly created scheme work
  const handleAddSchemeWork = (panchayatId: string, newScheme: Omit<SchemeWork, 'id'>) => {
    const schemeObj: SchemeWork = {
      ...newScheme,
      id: `sch-${Date.now()}`,
    };

    setPanchayats((prev) =>
      prev.map((gp) => {
        if (gp.id !== panchayatId) return gp;
        const updated = {
          ...gp,
          schemes: [schemeObj, ...gp.schemes],
        };
        if (selectedPanchayat?.id === panchayatId) {
          setSelectedPanchayat(updated);
        }
        return updated;
      })
    );
    playCheckSound(soundEnabled);
  };

  // Add newly created Panchayat
  const handleAddPanchayat = (newGP: GramPanchayat) => {
    setPanchayats((prev) => [newGP, ...prev]);
    playAllCompleteSound(soundEnabled);
  };

  // Filtered Panchayats calculation
  const filteredPanchayats = useMemo(() => {
    return panchayats.filter((gp) => {
      // District filter
      if (selectedDistrict !== 'all') {
        const distObj = DISTRICTS_DATA.find((d) => d.id === selectedDistrict);
        if (distObj && gp.districtName.toLowerCase() !== distObj.name.toLowerCase()) {
          return false;
        }
      }

      // Samiti filter
      if (selectedSamiti !== 'all') {
        const samitiObj = SAMITIS_DATA.find((s) => s.id === selectedSamiti);
        if (samitiObj && gp.samitiName.toLowerCase() !== samitiObj.name.toLowerCase()) {
          return false;
        }
      }

      // Verified filter
      if (verifiedOnly && !gp.verified) {
        return false;
      }

      // Search Query filter (matches Panchayat name, Village name, Sarpanch, LGD code, or district)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = gp.name.toLowerCase().includes(q) || gp.nameHi.toLowerCase().includes(q);
        const matchLgd = gp.lgdCode.includes(q);
        const matchDistrict = gp.districtName.toLowerCase().includes(q) || gp.districtNameHi.toLowerCase().includes(q);
        const matchSamiti = gp.samitiName.toLowerCase().includes(q) || gp.samitiNameHi.toLowerCase().includes(q);
        const matchVillage = gp.villages.some(
          (v) => v.name.toLowerCase().includes(q) || v.nameHi.toLowerCase().includes(q) || v.lgdCode.includes(q)
        );
        const matchSarpanch = gp.representatives.some(
          (r) => r.name.toLowerCase().includes(q) || r.nameHi.toLowerCase().includes(q)
        );

        if (!matchName && !matchLgd && !matchDistrict && !matchSamiti && !matchVillage && !matchSarpanch) {
          return false;
        }
      }

      return true;
    });
  }, [panchayats, selectedDistrict, selectedSamiti, verifiedOnly, searchQuery]);

  // Aggregated totals
  const totalVillagesCount = useMemo(
    () => panchayats.reduce((sum, gp) => sum + gp.villages.length, 0),
    [panchayats]
  );
  const totalPopCount = useMemo(
    () => panchayats.reduce((sum, gp) => sum + gp.totalPopulation, 0),
    [panchayats]
  );

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans antialiased selection:bg-emerald-600 selection:text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'hi' ? 'en' : 'hi'))}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1 w-full">
        {/* Statistics & Official Coverage Overview */}
        <StatsOverview
          lang={lang}
          totalDistricts={DISTRICTS_DATA.length}
          totalSamitis={SAMITIS_DATA.length}
          totalGPs={panchayats.length}
          totalVillages={totalVillagesCount}
          totalPopulation={totalPopCount}
        />

        {/* Filter, Search & Tab Controls */}
        <FilterSection
          lang={lang}
          districts={DISTRICTS_DATA}
          samitis={SAMITIS_DATA}
          selectedDistrict={selectedDistrict}
          onDistrictChange={handleDistrictChange}
          selectedSamiti={selectedSamiti}
          onSamitiChange={setSelectedSamiti}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          verifiedOnly={verifiedOnly}
          onToggleVerifiedOnly={() => setVerifiedOnly((prev) => !prev)}
          onResetFilters={handleResetFilters}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          allPanchayatsForExport={panchayats}
        />

        {/* Team GopalSingh All-in-One home */}
        {activeTab === 'teamHome' && (
          <TeamGopalSinghHub lang={lang} onNavigate={setActiveTab} />
        )}

        {/* Tab 0: Jhalawar Special 100% True Directory & Ground Deficiencies Portal */}
        {activeTab === 'jhalawarDistrict' && (
          <JhalawarDistrictPortal 
            lang={lang} 
            onSelectPanchayat={(gp) => setSelectedPanchayat(gp)} 
          />
        )}

        {/* Tab 1: Gram Panchayats View */}
        {activeTab === 'panchayats' && (
          <section id="panchayat-list-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-800">
                {lang === 'hi'
                  ? `दर्ज ग्राम पंचायतें (${filteredPanchayats.length})`
                  : `Gram Panchayats Found (${filteredPanchayats.length})`}
              </h3>
              <span className="text-xs text-neutral-500 font-medium">
                {lang === 'hi' ? 'कार्ड पर क्लिक कर पूर्ण विवरण देखें' : 'Click on card for complete verification'}
              </span>
            </div>

            {filteredPanchayats.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-neutral-200 p-6 space-y-2">
                <p className="text-sm font-semibold text-neutral-700">
                  {lang === 'hi' ? 'कोई ग्राम पंचायत मेल नहीं खाती' : 'No Gram Panchayat matches your search'}
                </p>
                <p className="text-xs text-neutral-500">
                  {lang === 'hi' ? 'कृपया खोज शब्द या फ़िल्टर बदलें' : 'Please adjust your filter or search keywords'}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-emerald-700 underline mt-2"
                >
                  {lang === 'hi' ? 'सभी फ़िल्टर साफ़ करें' : 'Clear all filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPanchayats.map((gp) => (
                  <PanchayatCard
                    key={gp.id}
                    panchayat={gp}
                    lang={lang}
                    onSelect={(p) => setSelectedPanchayat(p)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Tab 2: Revenue Villages Directory View */}
        {activeTab === 'villages' && (
          <VillageDirectoryView
            panchayats={filteredPanchayats}
            lang={lang}
            searchQuery={searchQuery}
            onSelectPanchayat={(gp) => setSelectedPanchayat(gp)}
          />
        )}

        {/* Tab 3: Schemes & Verification Checklist */}
        {activeTab === 'schemes' && (
          <SchemeVerificationView
            panchayats={filteredPanchayats}
            lang={lang}
            onToggleSchemeStatus={handleToggleSchemeStatus}
            onSelectPanchayat={(gp) => setSelectedPanchayat(gp)}
          />
        )}

        {/* Tab 4: Gram Sabha Mandatory Calendar & Proceedings */}
        {activeTab === 'gramSabha' && <GramSabhaView lang={lang} />}

        {/* Tab 5: Citizen Services & Certificate Application Guide */}
        {activeTab === 'citizenServices' && <CitizenServicesView lang={lang} />}

        {/* Tab 6: Village Emergency & Field Officials Directory */}
        {activeTab === 'emergency' && <EmergencyDirectoryView lang={lang} />}

        {/* Tab 7: Public Grievance & Complaint Redressal Desk */}
        {activeTab === 'grievance' && (
          <GrievancePortalView
            panchayats={panchayats}
            lang={lang}
            grievances={grievances}
            onAddGrievance={handleAddGrievance}
          />
        )}

        {/* Tab 8: Official Government Links & LGD Guide */}
        {activeTab === 'officialLinks' && <OfficialLinksView lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-12 py-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-semibold text-neutral-700">
              {lang === 'hi' ? 'पंचायती राज एवं ग्राम डायरेक्टरी पोर्टल' : 'Panchayati Raj & Village Information Registry'}
            </p>
            <p className="text-[11px] text-neutral-400">
              {lang === 'hi' ? 'LGD (Local Government Directory) एवं ई-ग्राम स्वराज पर आधारित सत्यता प्रमाणीकरण' : 'Based on authentic Ministry of Panchayati Raj (LGD) and eGramSwaraj datasets'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsVerifyModalOpen(true)}
              className="text-emerald-700 hover:underline font-bold"
            >
              {lang === 'hi' ? 'LGD सत्यापन' : 'Verify LGD Code'}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="text-neutral-700 hover:underline font-bold"
            >
              {lang === 'hi' ? '+ नया गांव जोड़ें' : '+ Add Village'}
            </button>
          </div>
        </div>
      </footer>

      {/* Modal 1: Panchayat Detail Dossier */}
      <PanchayatDetailModal
        panchayat={selectedPanchayat}
        lang={lang}
        onClose={() => setSelectedPanchayat(null)}
        onToggleSchemeStatus={handleToggleSchemeStatus}
        onAddSchemeWork={handleAddSchemeWork}
      />

      {/* Modal 2: Verification Tool Modal */}
      <VerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        panchayats={panchayats}
        lang={lang}
        onSelectPanchayat={(gp) => setSelectedPanchayat(gp)}
      />

      {/* Modal 3: Add Village / Panchayat Modal */}
      <AddPanchayatModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        districts={DISTRICTS_DATA}
        samitis={SAMITIS_DATA}
        lang={lang}
        onAddPanchayat={handleAddPanchayat}
      />
    </div>
  );
}
