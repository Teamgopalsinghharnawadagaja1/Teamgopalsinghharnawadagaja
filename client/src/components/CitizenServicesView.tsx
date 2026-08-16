import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileCheck2, 
  Clock, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Building2,
  Download,
  IndianRupee
} from 'lucide-react';
import { CitizenServiceGuide, Language } from '../types';
import { CITIZEN_SERVICES_GUIDE_DATA } from '../data/supplementaryData';

interface CitizenServicesViewProps {
  lang: Language;
}

export const CitizenServicesView: React.FC<CitizenServicesViewProps> = ({ lang }) => {
  const isHi = lang === 'hi';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(CITIZEN_SERVICES_GUIDE_DATA[0].id);

  const categories = [
    { id: 'all', label: isHi ? 'सभी सेवाएं' : 'All Services' },
    { id: 'certificate', label: isHi ? '📜 प्रमाण पत्र (CRS)' : '📜 Certificates' },
    { id: 'housing', label: isHi ? '🏠 आवासीय पट्टा' : '🏠 Housing & Patta' },
    { id: 'revenue', label: isHi ? '🌾 जमाबंदी व नामांतरण' : '🌾 Land & Revenue' },
    { id: 'social_security', label: isHi ? '👵 सामाजिक पेंशन' : '👵 Pensions' },
    { id: 'ration', label: isHi ? '🌾 NFSA राशन' : '🌾 Ration Card' },
  ];

  const filteredServices = CITIZEN_SERVICES_GUIDE_DATA.filter((srv) => {
    if (selectedCategory !== 'all' && srv.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div id="citizen-services-view" className="space-y-4">
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                {isHi ? 'नागरिक सेवा केंद्र एवं प्रमाण-पत्र मार्गदर्शिका' : 'Citizen Service Desk & Certificate Portal Guide'}
              </h3>
              <p className="text-xs text-neutral-500">
                {isHi 
                  ? 'जन्म/मृत्यु, आवासीय पट्टा, जमाबंदी नकल, पेंशन एवं राशन कार्ड हेतु जरूरी दस्तावेज, फीस व समय-सीमा' 
                  : 'Step-by-step procedures, eligibility, timeline and document checklists for village services'}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-xl self-start sm:self-auto">
            {isHi ? 'लोक सेवा गारंटी अधिनियम (RTPG)' : 'Public Service Guarantee Act'}
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {filteredServices.map((service) => {
          const isExpanded = expandedId === service.id;

          return (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 transition-all overflow-hidden shadow-2xs"
            >
              {/* Header Accordion Bar */}
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : service.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left transition-colors hover:bg-neutral-50/70"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-sky-800 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                      {isHi ? service.categoryHi : service.category}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {isHi ? `तय समय-सीमा: ${service.timeLimitDays} कार्य दिवस` : `Time Limit: ${service.timeLimitDays} days`}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-neutral-900">
                    {isHi ? service.serviceNameHi : service.serviceName}
                  </h4>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:block text-right text-xs">
                    <span className="text-neutral-500 block">{isHi ? 'जारीकर्ता प्राधिकरण' : 'Authority'}</span>
                    <strong className="text-neutral-800">{isHi ? service.issuingAuthorityHi : service.issuingAuthority}</strong>
                  </div>
                  <div className="p-1.5 rounded-lg bg-neutral-100 text-neutral-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-neutral-100 p-4 sm:p-5 bg-neutral-50/50 space-y-4 text-xs"
                  >
                    {/* Authority & Fee info bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-neutral-200">
                      <div>
                        <span className="text-neutral-500 font-medium block">{isHi ? '🏛️ सक्षम अधिकारी:' : '🏛️ Issuing Authority:'}</span>
                        <strong className="text-neutral-900 text-xs">{isHi ? service.issuingAuthorityHi : service.issuingAuthority}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-medium block">{isHi ? '💰 निर्धारित शुल्क:' : '💰 Prescribed Fee:'}</span>
                        <strong className="text-emerald-700 text-xs">{isHi ? service.feeHi : service.fee}</strong>
                      </div>
                    </div>

                    {/* 2-Columns: Required Documents and Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Required Documents Checklist */}
                      <div className="p-3.5 bg-white rounded-xl border border-neutral-200 space-y-2">
                        <h5 className="font-bold text-neutral-900 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-sky-600" />
                          {isHi ? 'आवश्यक दस्तावेज चेकलिस्ट:' : 'Required Documents Checklist:'}
                        </h5>
                        <ul className="space-y-1.5">
                          {(isHi ? service.requiredDocumentsHi : service.requiredDocuments).map((doc, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-neutral-700">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Step-by-Step Procedure */}
                      <div className="p-3.5 bg-white rounded-xl border border-neutral-200 space-y-2">
                        <h5 className="font-bold text-neutral-900 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-amber-600" />
                          {isHi ? 'आवेदन व निस्तारण प्रक्रिया:' : 'Step-by-Step Procedure:'}
                        </h5>
                        <ol className="space-y-1.5 list-decimal list-inside text-neutral-700">
                          {(isHi ? service.procedureStepsHi : service.procedureSteps).map((step, idx) => (
                            <li key={idx} className="leading-relaxed">
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* Action Bar */}
                    {service.officialPortalUrl && (
                      <div className="pt-2 flex justify-end">
                        <a
                          href={service.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-colors"
                        >
                          <span>{isHi ? 'आधिकारिक पोर्टल पर ऑनलाइन आवेदन' : 'Apply on Official Portal'}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-300" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
