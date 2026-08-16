import React from 'react';
import { Building2, Landmark, Home, Users, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface StatsOverviewProps {
  lang: Language;
  totalDistricts: number;
  totalSamitis: number;
  totalGPs: number;
  totalVillages: number;
  totalPopulation: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  lang,
  totalDistricts,
  totalSamitis,
  totalGPs,
  totalVillages,
  totalPopulation,
}) => {
  const isHi = lang === 'hi';

  const stats = [
    {
      id: 'stat-districts',
      label: isHi ? 'कुल जिला परिषद' : 'Zila Parishads',
      value: totalDistricts,
      icon: Landmark,
      color: 'text-sky-600',
      bg: 'bg-sky-50 border-sky-100',
    },
    {
      id: 'stat-samitis',
      label: isHi ? 'पंचायत समितियां' : 'Panchayat Samitis',
      value: totalSamitis,
      icon: Building2,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-100',
    },
    {
      id: 'stat-gps',
      label: isHi ? 'ग्राम पंचायतें' : 'Gram Panchayats',
      value: totalGPs,
      icon: Home,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'stat-villages',
      label: isHi ? 'राजस्व ग्राम व मजरे' : 'Revenue Villages',
      value: totalVillages,
      icon: CheckCircle2,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-100',
    },
    {
      id: 'stat-population',
      label: isHi ? 'शामिल ग्रामीण जनसंख्या' : 'Rural Population',
      value: `${(totalPopulation / 1000).toFixed(1)}k+`,
      icon: Users,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-100',
    },
  ];

  return (
    <section id="stats-overview-section" className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-neutral-900">
            {isHi ? 'पंचायती राज सांख्यिकी एवं आधिकारिक कवरेज' : 'Panchayati Raj Statistics & Official Coverage'}
          </h2>
        </div>
        <span className="text-xs text-neutral-500 font-medium">
          {isHi ? 'स्रोत: LGD व पंचायती राज मंत्रालय पोर्टल (सत्य व अद्यतन)' : 'Source: Ministry of Panchayati Raj / LGD Directory'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              id={stat.id}
              className={`p-3.5 rounded-xl border ${stat.bg} flex items-center gap-3 transition-transform hover:-translate-y-0.5 shadow-2xs`}
            >
              <div className={`p-2.5 rounded-lg bg-white shadow-2xs ${stat.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-neutral-900 tracking-tight leading-none">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-neutral-600 truncate mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
