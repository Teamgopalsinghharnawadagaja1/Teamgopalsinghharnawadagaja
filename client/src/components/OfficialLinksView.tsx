import React from 'react';
import { ExternalLink, ShieldCheck, Globe, HelpCircle } from 'lucide-react';
import { OFFICIAL_GOVT_SERVICES } from '../data/panchayatData';
import { Language } from '../types';

interface OfficialLinksViewProps {
  lang: Language;
}

export const OfficialLinksView: React.FC<OfficialLinksViewProps> = ({ lang }) => {
  const isHi = lang === 'hi';

  return (
    <div id="official-links-view" className="space-y-4">
      <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-1">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          {isHi ? 'सरकारी एवं आधिकारिक सत्यापन पोर्टल (भारत सरकार)' : 'Official Government Portals & Verification Services'}
        </h3>
        <p className="text-xs text-neutral-500">
          {isHi 
            ? 'यहां दिए गए सभी लिंक पंचायती राज मंत्रालय एवं भारत सरकार के आधिकारिक मान्यता प्राप्त पोर्टल्स हैं:' 
            : 'Direct access to official Government of India and Ministry of Panchayati Raj databases:'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {OFFICIAL_GOVT_SERVICES.map((service, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {service.category}
                </span>
                <Globe className="w-4 h-4 text-neutral-400" />
              </div>
              <h4 className="text-base font-bold text-neutral-900">
                {isHi ? service.titleHi : service.title}
              </h4>
              <p className="text-xs text-neutral-600">
                {isHi ? service.descriptionHi : service.description}
              </p>
            </div>

            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-900 text-xs font-bold transition-colors"
            >
              <span>{isHi ? 'पोर्टल पर जाएं' : 'Visit Official Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </a>
          </div>
        ))}
      </div>

      {/* FAQ / Authenticity explanation */}
      <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-2">
        <h4 className="text-sm font-bold flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          {isHi ? 'LGD (स्थानीय निकाय डायरेक्टरी) कोड क्या होता है?' : 'What is the LGD (Local Government Directory) Code?'}
        </h4>
        <p className="text-xs text-neutral-300 leading-relaxed">
          {isHi 
            ? 'LGD (Local Government Directory) भारत सरकार के पंचायती राज मंत्रालय द्वारा प्रत्येक राज्य, जिला, पंचायत समिति (ब्लॉक), ग्राम पंचायत एवं राजस्व गांव को आवंटित एक अद्वितीय 6-अंकीय कोड (Unique Identification Code) है। यह भारत के प्रत्येक गांव और पंचायत की आधिकारिक पहचान सुनिश्चित करता है।'
            : 'LGD is a unique standard identifier code assigned by the Ministry of Panchayati Raj (Govt. of India) to uniquely identify every State, District, Block, Gram Panchayat, and Village across India.'}
        </p>
      </div>
    </div>
  );
};
