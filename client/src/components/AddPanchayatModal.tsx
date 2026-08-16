import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, PlusCircle, CheckCircle } from 'lucide-react';
import { District, PanchayatSamiti, GramPanchayat, Language } from '../types';

interface AddPanchayatModalProps {
  isOpen: boolean;
  onClose: () => void;
  districts: District[];
  samitis: PanchayatSamiti[];
  lang: Language;
  onAddPanchayat: (newGP: GramPanchayat) => void;
}

export const AddPanchayatModal: React.FC<AddPanchayatModalProps> = ({
  isOpen,
  onClose,
  districts,
  samitis,
  lang,
  onAddPanchayat,
}) => {
  const [name, setName] = useState('');
  const [nameHi, setNameHi] = useState('');
  const [districtId, setDistrictId] = useState(districts[0]?.id || '');
  const [samitiId, setSamitiId] = useState('');
  const [sarpanchName, setSarpanchName] = useState('');
  const [sarpanchPhone, setSarpanchPhone] = useState('');
  const [vdoName, setVdoName] = useState('');
  const [villageName, setVillageName] = useState('');
  const [population, setPopulation] = useState('');
  const [wards, setWards] = useState('11');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const isHi = lang === 'hi';

  const selectedDistObj = districts.find((d) => d.id === districtId) || districts[0];
  const availableSamitis = samitis.filter((s) => s.districtId === districtId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const samitiObj = samitis.find((s) => s.id === samitiId) || availableSamitis[0] || {
      name: 'Central Samiti',
      nameHi: 'केंद्रीय समिति',
    };

    const lgdCode = `${Math.floor(100000 + Math.random() * 900000)}`;

    const newGP: GramPanchayat = {
      id: `gp-${Date.now()}`,
      name: name.trim(),
      nameHi: nameHi.trim() || name.trim(),
      lgdCode: lgdCode,
      districtName: selectedDistObj?.name || 'Jaipur',
      districtNameHi: selectedDistObj?.nameHi || 'जयपुर',
      samitiName: samitiObj.name,
      samitiNameHi: samitiObj.nameHi,
      state: selectedDistObj?.state || 'Rajasthan',
      stateHi: selectedDistObj?.stateHi || 'राजस्थान',
      totalWards: parseInt(wards, 10) || 11,
      totalPopulation: parseInt(population, 10) || 4500,
      totalHouseholds: Math.round((parseInt(population, 10) || 4500) / 5.5),
      panchayatBhawanAddress: `Panchayat Bhawan, ${name}, ${selectedDistObj?.name}`,
      panchayatBhawanAddressHi: `ग्राम पंचायत भवन, ${nameHi || name}, ${selectedDistObj?.nameHi}`,
      verified: true,
      lastUpdated: new Date().toISOString().split('T')[0],
      representatives: [
        {
          name: sarpanchName.trim() || 'Sarpanch Representative',
          nameHi: sarpanchName.trim() || 'सरपंच प्रतिनिधि',
          designation: 'Sarpanch',
          designationHi: 'सरपंच',
          contact: sarpanchPhone.trim() || '+91 94140 XXXXX',
          since: '2020',
        },
        {
          name: vdoName.trim() || 'Gram Vikas Adhikari',
          nameHi: vdoName.trim() || 'ग्राम विकास अधिकारी',
          designation: 'VDO',
          designationHi: 'ग्राम विकास अधिकारी (VDO)',
          contact: '+91 94600 XXXXX',
          since: '2022',
        }
      ],
      villages: [
        {
          id: `v-${Date.now()}-1`,
          name: villageName.trim() || name.trim(),
          nameHi: (villageName.trim() || nameHi.trim() || name.trim()),
          lgdCode: `${Math.floor(10000 + Math.random() * 90000)}`,
          population: parseInt(population, 10) || 3500,
          households: Math.round((parseInt(population, 10) || 3500) / 5.5),
          pincode: '302001',
          facilities: {
            primarySchool: true,
            secondarySchool: true,
            healthCenter: true,
            drinkingWaterTap: true,
            pavedRoad: true,
            electricity24x7: true,
            internetCSC: true,
            postOffice: true,
          },
          verified: true,
        }
      ],
      schemes: [
        {
          id: `sch-init-1`,
          schemeName: 'Jal Jeevan Mission Piped Water Scheme',
          schemeNameHi: 'जल जीवन मिशन हर घर जल योजना',
          description: 'Piped potable water tap supply verification',
          descriptionHi: 'प्रत्येक घर में नल से शुद्ध जल आपूर्ति सत्यापन कार्य',
          budgetAllocated: '₹ 25.00 Lakh',
          status: 'completed',
          statusHi: 'पूर्ण',
          completionYear: '2025',
          verified: true,
        }
      ]
    };

    onAddPanchayat(newGP);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div 
        id="add-panchayat-modal-backdrop" 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="add-panchayat-modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-lg w-full p-6 space-y-4 text-neutral-900"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-neutral-900 text-white">
                <PlusCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  {isHi ? 'नया गांव अथवा ग्राम पंचायत जोड़ें' : 'Add Village / Gram Panchayat Record'}
                </h3>
                <p className="text-xs text-neutral-500">
                  {isHi ? 'अपने स्थानीय गांव व पंचायत की जानकारी डायरेक्टरी में शामिल करें' : 'Include your local village & panchayat in the directory'}
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

          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-base font-bold text-neutral-900">
                {isHi ? 'ग्राम पंचायत सफलतापूर्वक जुड़ गई!' : 'Gram Panchayat successfully added!'}
              </h4>
              <p className="text-xs text-neutral-500">
                {isHi ? 'यह रिकॉर्ड डायरेक्टरी में अद्यतन हो गया है।' : 'The record has been added to the directory.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    {isHi ? 'पंचायत का नाम (English)' : 'Panchayat Name (English)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rampura"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    {isHi ? 'पंचायत का नाम (हिंदी)' : 'Panchayat Name (Hindi)'}
                  </label>
                  <input
                    type="text"
                    value={nameHi}
                    onChange={(e) => setNameHi(e.target.value)}
                    placeholder="उदा. रामपुरा"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'जिला' : 'District'}</label>
                  <select
                    value={districtId}
                    onChange={(e) => {
                      setDistrictId(e.target.value);
                      setSamitiId('');
                    }}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  >
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {isHi ? d.nameHi : d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'पंचायत समिति' : 'Panchayat Samiti'}</label>
                  <select
                    value={samitiId}
                    onChange={(e) => setSamitiId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  >
                    {availableSamitis.map((s) => (
                      <option key={s.id} value={s.id}>
                        {isHi ? s.nameHi : s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'सरपंच का नाम' : 'Sarpanch Name'}</label>
                  <input
                    type="text"
                    value={sarpanchName}
                    onChange={(e) => setSarpanchName(e.target.value)}
                    placeholder="उदा. श्री मोहन शर्मा"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'सरपंच संपर्क नंबर' : 'Sarpanch Contact'}</label>
                  <input
                    type="tel"
                    value={sarpanchPhone}
                    onChange={(e) => setSarpanchPhone(e.target.value)}
                    placeholder="+91 94140 XXXXX"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'मुख्य राजस्व गांव' : 'Main Village'}</label>
                  <input
                    type="text"
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    placeholder="उदा. रामपुरा कलां"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">{isHi ? 'जनसंख्या' : 'Population'}</label>
                  <input
                    type="number"
                    value={population}
                    onChange={(e) => setPopulation(e.target.value)}
                    placeholder="4500"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-hidden focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-neutral-600 bg-neutral-100 hover:bg-neutral-200 font-bold"
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold transition-colors"
                >
                  {isHi ? 'सुरक्षित करें' : 'Save Record'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
