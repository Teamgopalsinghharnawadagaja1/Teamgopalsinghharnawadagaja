import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { GramSabhaMeeting, Language } from '../types';
import { GRAM_SABHA_SCHEDULE_DATA } from '../data/supplementaryData';

interface GramSabhaViewProps {
  lang: Language;
}

export const GramSabhaView: React.FC<GramSabhaViewProps> = ({ lang }) => {
  const isHi = lang === 'hi';
  const [selectedMeeting, setSelectedMeeting] = useState<GramSabhaMeeting | null>(GRAM_SABHA_SCHEDULE_DATA[0]);

  return (
    <div id="gram-sabha-view" className="space-y-5">
      {/* Top Banner / Guidelines */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              {isHi ? 'अनिवार्य ग्राम सभा कैलेंडर व कार्यवृत्त (Gram Sabha Schedule)' : 'Statutory Gram Sabha Calendar & Proceedings'}
            </h3>
            <p className="text-xs text-neutral-500">
              {isHi 
                ? 'पंचायती राज अधिनियम के तहत वर्ष में 4 अनिवार्य ग्राम सभाएं (26 जन, 1 मई, 15 अग, 2 अक्टू) एवं कोरम नियम' 
                : 'Mandatory 4 annual Gram Sabha sessions under Panchayati Raj Act with quorum compliance & resolutions'}
            </p>
          </div>
        </div>

        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>{isHi ? 'ग्राम सभा कोरम नियम:' : 'Gram Sabha Quorum Rules:'}</strong>{' '}
            {isHi 
              ? 'बैठक की वैधता हेतु कुल पंजीकृत मतदाताओं की कम से कम 10% उपस्थिति तथा उसमें न्यूनतम 30% महिला मतदाताओं का भाग लेना अनिवार्य है।'
              : 'At least 10% of total registered electors with minimum 30% women participation is mandatory for valid quorum.'}
          </div>
        </div>
      </div>

      {/* Grid: Meetings list on left, detailed resolutions on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Meetings List */}
        <div className="lg:col-span-1 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            {isHi ? 'वार्षिक बैठक चक्र' : 'Annual Meeting Sessions'}
          </h4>

          {GRAM_SABHA_SCHEDULE_DATA.map((meeting) => {
            const isSelected = selectedMeeting?.id === meeting.id;
            const isUpcoming = meeting.status === 'upcoming';

            return (
              <button
                key={meeting.id}
                type="button"
                onClick={() => setSelectedMeeting(meeting)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                    : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isSelected 
                      ? 'bg-neutral-800 text-emerald-400 border border-neutral-700' 
                      : (isUpcoming ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200')
                  }`}>
                    {isUpcoming ? (isHi ? 'आगामी बैठक 🔔' : 'Upcoming 🔔') : (isHi ? 'सम्पन्न बैठक ✅' : 'Completed ✅')}
                  </span>

                  <span className={`text-xs font-bold ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {meeting.date}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-bold leading-tight">
                    {isHi ? meeting.titleHi : meeting.title}
                  </h5>
                  <p className={`text-xs mt-1 flex items-center gap-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    <Clock className="w-3 h-3" />
                    <span>{meeting.time}</span>
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Meeting Details */}
        <div className="lg:col-span-2">
          {selectedMeeting && (
            <motion.div
              key={selectedMeeting.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {isHi ? selectedMeeting.typeHi : selectedMeeting.type.toUpperCase()}
                  </span>
                  <h4 className="text-lg font-bold text-neutral-900 mt-2">
                    {isHi ? selectedMeeting.titleHi : selectedMeeting.title}
                  </h4>
                </div>

                <div className="text-xs text-neutral-500 sm:text-right font-medium">
                  <div className="flex items-center sm:justify-end gap-1 text-neutral-800 font-bold">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>{selectedMeeting.date} • {selectedMeeting.time}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{isHi ? selectedMeeting.locationHi : selectedMeeting.location}</span>
                  </div>
                </div>
              </div>

              {/* Agenda Box */}
              <div className="space-y-1.5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-neutral-500" />
                  {isHi ? 'बैठक का मुख्य एजेंडा व विचारणीय बिंदु' : 'Official Agenda & Deliberation Points'}
                </h5>
                <div className="p-3.5 bg-neutral-50 rounded-xl text-xs leading-relaxed text-neutral-800 border border-neutral-200">
                  {isHi ? selectedMeeting.agendaHi : selectedMeeting.agenda}
                </div>
              </div>

              {/* Quorum Compliance */}
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-3 text-xs text-neutral-700">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-neutral-900 block">{isHi ? 'कोरम आवश्यकता:' : 'Quorum Compliance:'}</strong>
                  <span>{selectedMeeting.quorumRequired}</span>
                </div>
              </div>

              {/* Key Resolutions / Approved Proposals */}
              {selectedMeeting.keyResolutions && selectedMeeting.keyResolutions.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    {isHi ? 'ग्राम सभा में पारित प्रमुख प्रस्ताव व अनुमोदन' : 'Passed Resolutions & Community Approvals'}
                  </h5>
                  <div className="space-y-2">
                    {(isHi ? selectedMeeting.keyResolutionsHi : selectedMeeting.keyResolutions)?.map((res, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs font-medium text-emerald-950 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Citizen Attendance Tip */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>{isHi ? 'प्रत्येक नागरिक का ग्राम सभा में भाग लेना वैधानिक अधिकार है।' : 'Every voter has the statutory right to vote & raise questions.'}</span>
                <span className="font-bold text-neutral-800">Section 7 (Panchayati Raj Act)</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
