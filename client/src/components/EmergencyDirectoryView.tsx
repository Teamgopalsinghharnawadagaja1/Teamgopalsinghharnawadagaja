import React from 'react';
import { 
  PhoneCall, 
  HeartPulse, 
  FileText, 
  Sprout, 
  ShieldAlert, 
  Droplets, 
  Zap, 
  ShieldCheck,
  Clock,
  Building,
  AlertTriangle
} from 'lucide-react';
import { EmergencyContactItem, Language } from '../types';
import { EMERGENCY_CONTACTS_DATA } from '../data/supplementaryData';

interface EmergencyDirectoryViewProps {
  lang: Language;
}

export const EmergencyDirectoryView: React.FC<EmergencyDirectoryViewProps> = ({ lang }) => {
  const isHi = lang === 'hi';

  const getIcon = (type: string) => {
    switch (type) {
      case 'medical':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'water':
        return <Droplets className="w-5 h-5 text-sky-600" />;
      case 'electricity':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'police':
        return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'veterinary':
        return <ShieldAlert className="w-5 h-5 text-emerald-600" />;
      default:
        return <PhoneCall className="w-5 h-5 text-neutral-600" />;
    }
  };

  return (
    <div id="emergency-directory-view" className="space-y-4">
      {/* Top Advisory */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-100 text-rose-800">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              {isHi ? 'ग्राम स्तरीय आवश्यक व आपातकालीन संपर्क डायरेक्टरी' : 'Village Emergency & Public Services Directory'}
            </h3>
            <p className="text-xs text-neutral-500">
              {isHi 
                ? 'पटवारी, ANM/आशा, कृषि पर्यवेक्षक, पशु चिकित्सक, जलदाय व विद्युत फॉल्ट त्वरित हेल्पलाइन' 
                : 'Direct contact numbers for revenue, health, electricity, water, and police field officers'}
            </p>
          </div>
        </div>

        {/* Quick Emergency Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-100">
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs">
            <span className="font-bold block">🚨 {isHi ? 'पुलिस हेल्पलाइन' : 'Police'}</span>
            <strong className="text-base">112</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
            <span className="font-bold block">⚡ {isHi ? 'विद्युत फॉल्ट' : 'Power Helpline'}</span>
            <strong className="text-base">1912</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs">
            <span className="font-bold block">🚑 {isHi ? 'एम्बुलेंस' : 'Ambulance'}</span>
            <strong className="text-base">108 / 102</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs">
            <span className="font-bold block">📞 {isHi ? 'CM हेल्पलाइन' : 'CM Helpline'}</span>
            <strong className="text-base">181</strong>
          </div>
        </div>
      </div>

      {/* Grid of Officials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {EMERGENCY_CONTACTS_DATA.map((officer) => (
          <div
            key={officer.id}
            className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 shrink-0">
                  {getIcon(officer.emergencyType)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    {isHi ? officer.roleHi : officer.role}
                  </h4>
                  <p className="text-xs text-neutral-500 font-medium mt-0.5 flex items-center gap-1">
                    <Building className="w-3 h-3 text-neutral-400" />
                    <span>{isHi ? officer.departmentHi : officer.department}</span>
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-neutral-50 rounded-xl text-xs flex items-center gap-1.5 text-neutral-600">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{isHi ? officer.availableHoursHi : officer.availableHours}</span>
              </div>
            </div>

            {/* Direct Call Action */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-900">
                {officer.contactNumber}
              </span>

              <a
                href={`tel:${officer.contactNumber.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isHi ? 'कॉल करें' : 'Call Officer'}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
