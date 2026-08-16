import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Landmark, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { GramPanchayat, Language } from '../types';

interface SchemeVerificationViewProps {
  panchayats: GramPanchayat[];
  lang: Language;
  onToggleSchemeStatus: (panchayatId: string, schemeId: string) => void;
  onSelectPanchayat: (gp: GramPanchayat) => void;
}

export const SchemeVerificationView: React.FC<SchemeVerificationViewProps> = ({
  panchayats,
  lang,
  onToggleSchemeStatus,
  onSelectPanchayat,
}) => {
  const isHi = lang === 'hi';

  const allSchemesWithPanchayat = panchayats.flatMap((gp) =>
    gp.schemes.map((sch) => ({
      ...sch,
      panchayat: gp,
    }))
  );

  const completedCount = allSchemesWithPanchayat.filter((s) => s.status === 'completed').length;
  const totalCount = allSchemesWithPanchayat.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div id="schemes-verification-view" className="space-y-4">
      {/* Progress & Overview Box */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900">
                {isHi ? 'ग्राम पंचायत विकास कार्य सत्यापन मीटर' : 'Gram Panchayat Scheme Verification Meter'}
              </h3>
              <p className="text-xs text-neutral-500">
                {isHi ? 'जल जीवन, पीएम आवास, मनरेगा, सीसी रोड एवं सोलर लाइट परियोजनाओं का जमीनी सत्यापन' : 'Field verification of JJM, PM-Awas, MGNREGA, Roads and Solar works'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-neutral-600 block">
              <strong className="text-emerald-700 font-bold">{completedCount}</strong> of {totalCount} {isHi ? 'कार्य पूर्ण व सत्यापित' : 'Works verified'}
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
              {percent}% {isHi ? 'सत्यापन दर' : 'Completion Rate'}
            </span>
          </div>
        </div>

        {/* Bar */}
        <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="bg-emerald-600 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {allSchemesWithPanchayat.map((scheme) => (
          <div
            key={scheme.id}
            id={`scheme-card-${scheme.id}`}
            className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-500 mb-1">
                    <Landmark className="w-3 h-3 text-sky-600" />
                    {isHi ? `पं. ${scheme.panchayat.nameHi} (${scheme.panchayat.districtNameHi})` : `GP: ${scheme.panchayat.name} (${scheme.panchayat.districtName})`}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 leading-snug">
                    {isHi ? scheme.schemeNameHi : scheme.schemeName}
                  </h4>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                  scheme.status === 'completed' 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {isHi ? scheme.statusHi : scheme.status.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-neutral-600">
                {isHi ? scheme.descriptionHi : scheme.description}
              </p>

              <div className="flex items-center justify-between text-xs bg-neutral-50 p-2 rounded-xl text-neutral-700 font-medium">
                <span>💰 {isHi ? 'स्वीकृत बजट:' : 'Budget:'} <strong>{scheme.budgetAllocated}</strong></span>
                {scheme.beneficiariesCount && (
                  <span>👥 {isHi ? `लाभार्थी: ${scheme.beneficiariesCount}` : `Beneficiaries: ${scheme.beneficiariesCount}`}</span>
                )}
              </div>
            </div>

            {/* Bottom verification action */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onSelectPanchayat(scheme.panchayat)}
                className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 transition-colors"
              >
                <span>{isHi ? 'पंचायत विवरण' : 'View GP'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={() => onToggleSchemeStatus(scheme.panchayat.id, scheme.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  scheme.status === 'completed'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{scheme.status === 'completed' ? (isHi ? 'सत्यापित ✅' : 'Verified') : (isHi ? 'सत्यापित करें' : 'Verify')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
