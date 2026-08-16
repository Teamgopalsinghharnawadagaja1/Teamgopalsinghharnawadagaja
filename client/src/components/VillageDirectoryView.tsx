import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, MapPin, Users, Home, BookOpen, HeartPulse, Droplets, 
  Zap, Wifi, ShieldCheck, Check, ArrowRight 
} from 'lucide-react';
import { GramPanchayat, Language } from '../types';

interface VillageDirectoryViewProps {
  panchayats: GramPanchayat[];
  lang: Language;
  searchQuery: string;
  onSelectPanchayat: (gp: GramPanchayat) => void;
}

export const VillageDirectoryView: React.FC<VillageDirectoryViewProps> = ({
  panchayats,
  lang,
  searchQuery,
  onSelectPanchayat,
}) => {
  const isHi = lang === 'hi';
  const [facilityFilter, setFacilityFilter] = useState<string>('all');

  // Flatten all villages with parent panchayat reference
  const allVillages = panchayats.flatMap((gp) =>
    gp.villages.map((v) => ({
      ...v,
      parentPanchayat: gp,
    }))
  );

  const filteredVillages = allVillages.filter((v) => {
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = v.name.toLowerCase().includes(q) || v.nameHi.toLowerCase().includes(q);
      const matchLgd = v.lgdCode.includes(q);
      const matchPincode = v.pincode.includes(q);
      const matchParent = v.parentPanchayat.name.toLowerCase().includes(q) || v.parentPanchayat.nameHi.toLowerCase().includes(q);
      if (!matchName && !matchLgd && !matchPincode && !matchParent) return false;
    }

    // Facility filter
    if (facilityFilter === 'school' && !v.facilities.primarySchool) return false;
    if (facilityFilter === 'health' && !v.facilities.healthCenter) return false;
    if (facilityFilter === 'water' && !v.facilities.drinkingWaterTap) return false;
    if (facilityFilter === 'road' && !v.facilities.pavedRoad) return false;
    if (facilityFilter === 'internet' && !v.facilities.internetCSC) return false;

    return true;
  });

  return (
    <div id="village-directory-view" className="space-y-4">
      {/* Sub-header & facility filter tags */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div>
          <h3 className="text-sm font-bold text-neutral-900">
            {isHi ? `कुल पंजीकृत राजस्व ग्राम व मजरे (${filteredVillages.length})` : `All Registered Revenue Villages (${filteredVillages.length})`}
          </h3>
          <p className="text-xs text-neutral-500">
            {isHi ? 'प्रत्येक गांव की जनसंख्या, स्कूल, स्वास्थ्य केंद्र एवं सड़क सुविधा का सत्यापन' : 'Population, school, health center and infrastructure verification per village'}
          </p>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: isHi ? 'सभी' : 'All' },
            { id: 'water', label: isHi ? '🚰 नल जल' : '🚰 Tap Water' },
            { id: 'health', label: isHi ? '🏥 स्वास्थ्य केंद्र' : '🏥 Health Center' },
            { id: 'school', label: isHi ? '🏫 विद्यालय' : '🏫 School' },
            { id: 'road', label: isHi ? '🛣️ पक्की सड़क' : '🛣️ Paved Road' },
            { id: 'internet', label: isHi ? '📶 इंटरनेट/CSC' : '📶 Internet' },
          ].map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => setFacilityFilter(tag.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                facilityFilter === tag.id
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Villages List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredVillages.map((village) => (
          <motion.div
            key={village.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-neutral-900">
                    {isHi ? village.nameHi : village.name}
                  </h4>
                  <p className="text-xs font-medium text-neutral-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-sky-600" />
                    <span>
                      {isHi 
                        ? `पं. ${village.parentPanchayat.nameHi} • ${village.parentPanchayat.samitiNameHi}` 
                        : `GP: ${village.parentPanchayat.name} • ${village.parentPanchayat.samitiName}`}
                    </span>
                  </p>
                </div>

                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  LGD: {village.lgdCode}
                </span>
              </div>

              {/* Village stats */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-neutral-50 p-2.5 rounded-xl text-neutral-700">
                <span className="flex items-center gap-1 font-medium">
                  <Users className="w-3.5 h-3.5 text-neutral-400" />
                  <strong>{village.population.toLocaleString()}</strong> {isHi ? 'जनसंख्या' : 'Pop.'}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Home className="w-3.5 h-3.5 text-neutral-400" />
                  <strong>{village.households}</strong> {isHi ? 'परिवार' : 'Families'}
                </span>
              </div>

              {/* Amenities icons and explicit Deficiencies */}
              <div className="space-y-1.5 pt-1">
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {village.facilities.primarySchool && (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium">
                      🏫 {isHi ? 'स्कूल' : 'School'}
                    </span>
                  )}
                  {village.facilities.healthCenter && (
                    <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 font-medium">
                      🏥 {isHi ? 'स्वास्थ्य केंद्र' : 'Health Center'}
                    </span>
                  )}
                  {village.facilities.drinkingWaterTap && (
                    <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-medium">
                      🚰 {isHi ? 'नल जल' : 'Tap Water'}
                    </span>
                  )}
                  {village.facilities.pavedRoad && (
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium">
                      🛣️ {isHi ? 'पक्की सड़क' : 'Road'}
                    </span>
                  )}
                  {village.facilities.internetCSC && (
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-medium">
                      📶 {isHi ? 'CSC कियोस्क' : 'CSC Kiosk'}
                    </span>
                  )}
                </div>

                {/* Ground Deficiencies / कमियां */}
                {(!village.facilities.drinkingWaterTap || !village.facilities.pavedRoad || !village.facilities.healthCenter) && (
                  <div className="flex flex-wrap gap-1 text-[10px] text-rose-700 bg-rose-50/70 p-1.5 rounded-lg border border-rose-100 font-semibold">
                    <span className="text-rose-800">⚠️ {isHi ? 'मौजूदा कमियां:' : 'Deficiencies:'}</span>
                    {!village.facilities.drinkingWaterTap && <span>• {isHi ? 'पेयजल कनेक्शन अधूरा' : 'Tap water missing'}</span>}
                    {!village.facilities.pavedRoad && <span>• {isHi ? 'पक्की सड़क वंचित' : 'Unpaved road'}</span>}
                    {!village.facilities.healthCenter && <span>• {isHi ? 'स्वास्थ्य उप-केंद्र नहीं' : 'No Sub-Center'}</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom link to Panchayat */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500 font-medium">
                {isHi ? `पिन: ${village.pincode}` : `PIN: ${village.pincode}`}
              </span>

              <button
                type="button"
                onClick={() => onSelectPanchayat(village.parentPanchayat)}
                className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:text-emerald-700 transition-colors"
              >
                <span>{isHi ? 'पंचायत विवरण' : 'Panchayat Info'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
