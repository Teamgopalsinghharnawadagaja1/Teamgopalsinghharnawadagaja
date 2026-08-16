import React from 'react';
import { Languages, Volume2, VolumeX, ShieldCheck, PlusCircle } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAddModal: () => void;
  onOpenVerifyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  soundEnabled,
  onToggleSound,
  onOpenAddModal,
  onOpenVerifyModal,
}) => {
  const isHi = lang === 'hi';

  return (
    <header id="main-navbar" className="bg-neutral-900 text-white border-b border-neutral-800 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          {/* Logo & Portal Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div 
              id="national-emblem-badge"
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-inner shrink-0"
            >
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white truncate">
                  {isHi ? 'ग्राम पंचायत एवं पंचायत समिति डायरेक्टरी' : 'Panchayati Raj & Village Portal'}
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isHi ? 'आधिकारिक स्रोत नीति' : 'Official-source policy'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 truncate hidden sm:block">
                {isHi 
                  ? 'सभी गांव, ग्राम पंचायत, पंचायत समिति एवं जनप्रतिनिधि सूचना पोर्टल' 
                  : 'All Villages, Gram Panchayats, Samitis & Representative Registry'}
              </p>
            </div>
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Verify Check tool */}
            <button
              id="verify-check-btn"
              type="button"
              onClick={onOpenVerifyModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{isHi ? 'LGD सत्यापन जांच' : 'Verify LGD'}</span>
            </button>

            {/* Add Village / Panchayat */}
            <button
              id="add-panchayat-btn"
              type="button"
              onClick={onOpenAddModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isHi ? '+ गांव/पंचायत जोड़ें' : '+ Add Village'}</span>
            </button>

            {/* Language Toggle */}
            <button
              id="language-toggle-btn"
              type="button"
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
              title="Change Language / भाषा बदलें"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{isHi ? 'English' : 'हिंदी'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="nav-sound-toggle-btn"
              type="button"
              onClick={onToggleSound}
              className={`p-2 rounded-lg text-xs border transition-colors ${
                soundEnabled 
                  ? 'bg-neutral-800 border-neutral-700 text-emerald-400 hover:bg-neutral-700' 
                  : 'bg-neutral-800/60 border-neutral-700/60 text-neutral-500 hover:text-neutral-300'
              }`}
              title={soundEnabled ? 'Mute audio' : 'Enable audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
