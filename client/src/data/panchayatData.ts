import { District, PanchayatSamiti, GramPanchayat, Village, SchemeWork } from '../types';
import { JHALAWAR_DISTRICT, JHALAWAR_SAMITIS, JHALAWAR_GRAM_PANCHAYATS } from './jhalawarData';
import { JHALAWAR_8_SAMITIS_MASTER } from './jhalawarOfficialDirectory';

export const DISTRICTS_DATA: District[] = [
  JHALAWAR_DISTRICT,
];

export const SAMITIS_DATA: PanchayatSamiti[] = [
  ...JHALAWAR_SAMITIS,
];

// Helper to build full 269 Gram Panchayats with complete village, scheme and representative data
function buildAll269GramPanchayats(): GramPanchayat[] {
  /*
   * DATA INTEGRITY RULE:
   * Do not synthesize LGD codes, populations, villages, facilities, officials,
   * budgets or completed works. The previous implementation generated values
   * from counters and marked them verified; that is unsafe for a civic app.
   *
   * The LGD directory is the authoritative source for local-body/village
   * identifiers. Records not backed by an authoritative source are kept
   * explicitly as needs_verification and are never represented as official.
   */
  const existingMap = new Map<string, GramPanchayat>();
  JHALAWAR_GRAM_PANCHAYATS.forEach(gp => {
    existingMap.set(gp.nameHi.trim(), {
      ...gp,
      verified: false,
      dataStatus: 'needs_verification',
      sourceUrl: 'https://lgdirectory.gov.in/',
    });
  });

  const fullList: GramPanchayat[] = [];
  JHALAWAR_8_SAMITIS_MASTER.forEach((samiti) => {
    samiti.panchayatNamesHi.forEach((gpNameHi) => {
      const normalized = gpNameHi.trim();
      const existing = existingMap.get(normalized);

      if (existing) {
        fullList.push(existing);
        return;
      }

      // Name/hierarchy only. Every other fact remains unknown until imported
      // from LGD/Rajasthan Panchayati Raj or another authoritative source.
      fullList.push({
        id: `gp-unverified-${samiti.samitiNameHi}-${normalized}`,
        name: normalized,
        nameHi: normalized,
        lgdCode: '',
        districtName: JHALAWAR_DISTRICT.name,
        districtNameHi: JHALAWAR_DISTRICT.nameHi,
        samitiName: samiti.samitiName,
        samitiNameHi: samiti.samitiNameHi,
        state: 'Rajasthan',
        stateHi: 'राजस्थान',
        totalWards: 0,
        totalPopulation: 0,
        totalHouseholds: 0,
        panchayatBhawanAddress: '',
        panchayatBhawanAddressHi: '',
        representatives: [],
        villages: [],
        schemes: [],
        verified: false,
        dataStatus: 'needs_verification',
        sourceUrl: 'https://lgdirectory.gov.in/',
        lastUpdated: new Date().toISOString().slice(0, 10),
      });
    });
  });

  return fullList;
}

export const GRAM_PANCHAYATS_DATA: GramPanchayat[] = buildAll269GramPanchayats();

export const OFFICIAL_GOVT_SERVICES = [
  {
    title: 'eGramSwaraj Portal (MoPR)',
    titleHi: 'ई-ग्राम स्वराज पोर्टल (पंचायती राज मंत्रालय)',
    category: 'Panchayati Raj & GPDP',
    description: 'Track Gram Panchayat Development Plans, financial approvals, 15th FC vouchers, progress reports, and physical asset geotags.',
    descriptionHi: 'ग्राम पंचायत विकास योजना (GPDP), 15वें वित्त आयोग की वित्तीय स्वीकृतियां, वाउचर भुगतान एवं परिसंपत्ति जियो-टैगिंग की पारदर्शी रिपोर्ट।',
    url: 'https://egramswaraj.gov.in',
    portalName: 'egramswaraj.gov.in',
  },
  {
    title: 'Local Government Directory (LGD)',
    titleHi: 'स्थानीय निकाय डायरेक्टरी (LGD)',
    category: 'Government Directory',
    description: 'Unique standard LGD codes for all States, Districts, Tehsils, Panchayat Samitis, Gram Panchayats, and Revenue Villages across India.',
    descriptionHi: 'भारत के सभी राज्यों, जिलों, तहसीलों, पंचायत समितियों, ग्राम पंचायतों एवं राजस्व ग्रामों के मानक LGD कोड्स की केंद्रीय डायरेक्टरी।',
    url: 'https://lgdirectory.gov.in',
    portalName: 'lgdirectory.gov.in',
  },
  {
    title: 'Jal Jeevan Mission (JJM) Dashboard',
    titleHi: 'जल जीवन मिशन (हर घर जल) डैशबोर्ड',
    category: 'Drinking Water',
    description: 'Real-time monitoring of functional household tap connections (FHTC), water quality test reports (FTK), and village water sanitation status.',
    descriptionHi: 'ग्रामीण क्षेत्रों में नल कनेक्शन (FHTC) प्रगति, पानी की गुणवत्ता (FTK टेस्टिंग) व ग्राम पेयजल एवं स्वच्छता समिति (VWSC) रिपोर्ट।',
    url: 'https://ejalshakti.gov.in/jjmreport/',
    portalName: 'ejalshakti.gov.in',
  },
  {
    title: 'MGNREGA / NREGASoft Portal',
    titleHi: 'महात्मा गांधी नरेगा पोर्टल (ग्रामीण विकास मंत्रालय)',
    category: 'Rural Employment & CC Road',
    description: 'Village-wise muster rolls, job card lists, CC road construction records, water conservation works, and direct DBT wage payments.',
    descriptionHi: 'गांववार मस्टररोल, जॉब कार्ड धारक सूची, आंतरिक सीसी सड़क व चेकडैम निर्माण कार्य एवं सीधे बैंक खाते में मजदूरी भुगतान की स्थिति।',
    url: 'https://nrega.nic.in',
    portalName: 'nrega.nic.in',
  },
  {
    title: 'Rajasthan Sampark Portal (CM 181)',
    titleHi: 'राजस्थान संपर्क जन शिकायत पोर्टल (हेल्पलाइन 181)',
    category: 'Grievance Redressal',
    description: 'Integrated grievance redressal platform of Government of Rajasthan for filing and tracking public complaints against delayed services.',
    descriptionHi: 'राजस्थान सरकार का केंद्रीकृत जन अभियोग निराकरण पोर्टल - पेयजल, बिजली, सड़क व राजस्व संबंधी शिकायतों के त्वरित निवारण हेतु।',
    url: 'https://sampark.rajasthan.gov.in',
    portalName: 'sampark.rajasthan.gov.in',
  },
  {
    title: 'Apna Khata / E-Dharti Rajasthan',
    titleHi: 'अपना खाता / ई-धरती राजस्थान (जमाबंदी व नक्शा)',
    category: 'Land Records',
    description: 'Online land records, digital Jamabandi (ROR), Girdawari reports, and revenue maps for all 12 tehsils of Jhalawar district.',
    descriptionHi: 'झालावाड़ की सभी 12 तहसीलों की डिजिटल जमाबंदी, नामान्तरकरण (म्यूटेशन), गिरदावरी रिपोर्ट एवं भू-नक्शा ऑनलाइन देखने की सुविधा।',
    url: 'https://apnakhata.rajasthan.gov.in',
    portalName: 'apnakhata.rajasthan.gov.in',
  }
];

