import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { GramPanchayat, Language } from '../types';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  panchayats: GramPanchayat[];
  lang: Language;
  onSelectPanchayat: (gp: GramPanchayat) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  panchayats,
  lang,
  onSelectPanchayat,
}) => {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const isHi = lang === 'hi';

  const cleanQuery = query.trim().toLowerCase();

  // Search in panchayats or villages
  const matchingPanchayats = cleanQuery
    ? panchayats.filter(
        (p) =>
          p.lgdCode.includes(cleanQuery) ||
          p.name.toLowerCase().includes(cleanQuery) ||
          p.nameHi.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingVillages = cleanQuery
    ? panchayats.flatMap((p) =>
        p.villages
          .filter(
            (v) =>
              v.lgdCode.includes(cleanQuery) ||
              v.name.toLowerCase().includes(cleanQuery) ||
              v.nameHi.toLowerCase().includes(cleanQuery) ||
              v.pincode.includes(cleanQuery)
          )
          .map((v) => ({ ...v, parentPanchayat: p }))
      )
    : [];

  const isFound = matchingPanchayats.length > 0 || matchingVillages.length > 0;

  return (
    <AnimatePresence>
      <div 
        id="verify-modal-backdrop" 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="verification-modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-xl w-full p-6 space-y-4 text-neutral-900"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  {isHi ? 'LGD कोड व गांव सत्यता सत्यापन' : 'LGD Code & Village Verification'}
                </h3>
                <p className="text-xs text-neutral-500">
                  {isHi ? 'किसी भी गांव या ग्राम पंचायत का LGD कोड दर्ज कर सत्यता जांचें' : 'Enter any LGD code or village name to check certification'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHasSearched(true);
              }}
              placeholder={isHi ? 'LGD कोड (उदा. 247812) या गांव का नाम...' : 'LGD code (e.g. 247812) or village name...'}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-all font-medium"
              autoFocus
            />
          </div>

          {/* Search Results */}
          {hasSearched && query.trim() !== '' && (
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {isFound ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isHi ? 'सत्यापित रिकॉर्ड मिला (Certified Official Record Found)' : 'Verified Official Record Found'}</span>
                  </div>

                  {/* Matching Panchayats */}
                  {matchingPanchayats.map((gp) => (
                    <div
                      key={gp.id}
                      className="p-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          LGD: {gp.lgdCode} • Gram Panchayat
                        </span>
                        <h4 className="text-sm font-bold text-neutral-900 mt-0.5">
                          {isHi ? gp.nameHi : gp.name}
                        </h4>
                        <p className="text-xs text-neutral-500">
                          {isHi ? `${gp.samitiNameHi}, जिला: ${gp.districtNameHi}` : `${gp.samitiName}, Dist: ${gp.districtName}`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectPanchayat(gp);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-900 text-white flex items-center gap-1 hover:bg-neutral-800"
                      >
                        <span>{isHi ? 'विवरण' : 'Details'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Matching Villages */}
                  {matchingVillages.map((v) => (
                    <div
                      key={v.id}
                      className="p-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                          LGD: {v.lgdCode} • Revenue Village
                        </span>
                        <h4 className="text-sm font-bold text-neutral-900 mt-0.5">
                          {isHi ? v.nameHi : v.name}
                        </h4>
                        <p className="text-xs text-neutral-500">
                          {isHi 
                            ? `ग्राम पंचायत: ${v.parentPanchayat.nameHi} (${v.parentPanchayat.samitiNameHi})` 
                            : `GP: ${v.parentPanchayat.name} (${v.parentPanchayat.samitiName})`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectPanchayat(v.parentPanchayat);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-900 text-white flex items-center gap-1 hover:bg-neutral-800"
                      >
                        <span>{isHi ? 'विवरण' : 'Details'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{isHi ? 'कोई रिकॉर्ड नहीं मिला' : 'No exact record match'}</span>
                  </div>
                  <p className="text-xs text-amber-700">
                    {isHi 
                      ? 'कृपया सही 6-अंकीय LGD कोड अथवा सही वर्तनी में गांव/पंचायत का नाम जांचें।' 
                      : 'Please verify the 6-digit LGD code or correct spelling of the village name.'}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="pt-2 border-t border-neutral-100 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
            >
              {isHi ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
