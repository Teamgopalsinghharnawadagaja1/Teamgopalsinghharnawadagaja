import React from 'react';
import { motion } from 'motion/react';
import { Building2, Users, MapPin, CheckCircle, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { GramPanchayat, Language } from '../types';

interface PanchayatCardProps {
  panchayat: GramPanchayat;
  lang: Language;
  onSelect: (panchayat: GramPanchayat) => void;
}

export const PanchayatCard: React.FC<PanchayatCardProps> = ({
  panchayat,
  lang,
  onSelect,
}) => {
  const isHi = lang === 'hi';

  const sarpanch = panchayat.representatives.find((r) => r.designation === 'Sarpanch');
  const vdo = panchayat.representatives.find((r) => r.designation === 'VDO');

  const completedSchemes = panchayat.schemes.filter((s) => s.status === 'completed').length;
  const totalSchemes = panchayat.schemes.length;
  const schemePercentage = totalSchemes > 0 ? Math.round((completedSchemes / totalSchemes) * 100) : 0;

  return (
    <motion.div
      id={`panchayat-card-${panchayat.id}`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
    >
      {/* Top Header info */}
      <div className="p-5 space-y-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-100 text-neutral-800">
              <Building2 className="w-3 h-3 text-neutral-500" />
              {isHi ? panchayat.samitiNameHi : panchayat.samitiName}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-100">
              <MapPin className="w-3 h-3 text-sky-500" />
              {isHi ? panchayat.districtNameHi : panchayat.districtName}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
              title="Official Local Government Directory Code"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              LGD: {panchayat.lgdCode}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
            {isHi ? panchayat.nameHi : panchayat.name}
          </h3>
          <p className="text-xs text-neutral-500 font-medium mt-0.5">
            {isHi ? `ग्राम पंचायत (${panchayat.name})` : `Gram Panchayat (${panchayat.nameHi})`}
          </p>
        </div>

        {/* Representatives & Key Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-neutral-100">
          <div className="p-2.5 rounded-xl bg-neutral-50/80 border border-neutral-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
              {isHi ? 'सरपंच / ग्राम प्रधान' : 'Sarpanch / Pradhan'}
            </span>
            <p className="text-xs font-semibold text-neutral-800 truncate">
              {sarpanch ? (isHi ? sarpanch.nameHi : sarpanch.name) : 'N/A'}
            </p>
            {sarpanch?.contact && (
              <span className="text-[11px] text-neutral-500 block mt-0.5">
                📞 {sarpanch.contact}
              </span>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-50/80 border border-neutral-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
              {isHi ? 'ग्राम विकास अधिकारी (VDO)' : 'Village Dev. Officer'}
            </span>
            <p className="text-xs font-semibold text-neutral-800 truncate">
              {vdo ? (isHi ? vdo.nameHi : vdo.name) : 'N/A'}
            </p>
            {vdo?.contact && (
              <span className="text-[11px] text-neutral-500 block mt-0.5">
                📞 {vdo.contact}
              </span>
            )}
          </div>
        </div>

        {/* Quick Stats: Population, Wards, Villages count */}
        <div className="flex items-center justify-between text-xs text-neutral-600 bg-neutral-50 px-3 py-2 rounded-xl">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            <strong>{panchayat.totalPopulation.toLocaleString()}</strong> {isHi ? 'जनसंख्या' : 'Pop.'}
          </span>
          <span>
            <strong>{panchayat.totalWards}</strong> {isHi ? 'वार्ड' : 'Wards'}
          </span>
          <span>
            <strong>{panchayat.villages.length}</strong> {isHi ? 'राजस्व ग्राम' : 'Villages'}
          </span>
        </div>

        {/* Revenue Villages preview */}
        <div>
          <span className="text-[11px] font-semibold text-neutral-500 block mb-1.5">
            {isHi ? 'शामिल राजस्व गांव एवं मजरे:' : 'Included Revenue Villages:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {panchayat.villages.map((v) => (
              <span
                key={v.id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 text-neutral-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {isHi ? v.nameHi : v.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Card Footer */}
      <div className="p-4 bg-neutral-50/60 border-t border-neutral-100 flex items-center justify-between gap-3">
        {/* Scheme completion */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              {isHi ? `योजनाएं: ${completedSchemes}/${totalSchemes} पूर्ण (${schemePercentage}%)` : `Schemes: ${completedSchemes}/${totalSchemes} (${schemePercentage}%)`}
            </span>
          </div>
          <div className="w-28 bg-neutral-200 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${schemePercentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          id={`view-panchayat-${panchayat.id}`}
          type="button"
          onClick={() => onSelect(panchayat)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs transition-colors shrink-0"
        >
          <span>{isHi ? 'विवरण देखें' : 'View Info'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
