import { 
  GramSabhaMeeting, 
  CitizenServiceGuide, 
  EmergencyContactItem, 
  GrievanceTicket 
} from '../types';

export const GRAM_SABHA_SCHEDULE_DATA: GramSabhaMeeting[] = [
  {
    id: 'gs-1',
    title: 'Republic Day Statutory Gram Sabha',
    titleHi: 'गणतंत्र दिवस अनिवार्य ग्राम सभा बैठक',
    date: '2026-01-26',
    time: '11:00 AM',
    type: 'mandatory',
    typeHi: 'अनिवार्य बैठक',
    agenda: 'Review of annual GPDP plan, social audit of MGNREGA works, Jal Jeevan Mission water quality test reports and open ward discussions.',
    agendaHi: 'वार्षिक ग्राम पंचायत विकास योजना (GPDP) समीक्षा, मनरेगा कार्यों का सामाजिक अंकेक्षण (Social Audit), जल जीवन मिशन जल गुणवत्ता रिपोर्ट एवं वार्डवार जनसमस्या निवारण।',
    location: 'Gram Panchayat Bhawan premises / Bharat Nirman Rajiv Gandhi Seva Kendra',
    locationHi: 'ग्राम पंचायत भवन प्रांगण / भारत निर्माण राजीव गांधी सेवा केंद्र',
    status: 'completed',
    quorumRequired: '10% of registered electors (with 30% women participation)',
    keyResolutions: [
      'Approved 4 new CC road proposals for Dhanis',
      'Finalized list of 34 eligible PM-Awas rural beneficiaries',
      'Formed village sanitation & solid waste management committee'
    ],
    keyResolutionsHi: [
      'ढाणियों हेतु 4 नवीन सीसी सड़क प्रस्ताव सर्वसम्मति से पारित',
      'पीएम आवास योजना ग्रामीण के 34 पात्र परिवारों की सूची का अनुमोदन',
      'ग्राम स्वच्छता एवं कचरा प्रबंधन समिति का गठन'
    ]
  },
  {
    id: 'gs-2',
    title: 'Labour Day / Swachhata Gram Sabha',
    titleHi: 'मजदूर दिवस एवं स्वच्छता विशेष ग्राम सभा',
    date: '2026-05-01',
    time: '10:30 AM',
    type: 'mandatory',
    typeHi: 'अनिवार्य बैठक',
    agenda: 'MGNREGA labour demand planning for peak summer, Amrit Sarovar deepening, drinking water contingency and plantation drives.',
    agendaHi: 'ग्रीष्मकालीन मनरेगा लेबर बजट आवंटन, अमृत सरोवर तालाब खुदाई, ग्रीष्म पेयजल व्यवस्था व पौधारोपण लक्ष्य निर्धारण।',
    location: 'Gram Panchayat Bhawan Community Hall',
    locationHi: 'ग्राम पंचायत भवन सामुदायिक हॉल',
    status: 'completed',
    quorumRequired: '10% of total voters',
    keyResolutions: [
      'Sanctioned deepening work for 2 village ponds',
      'Assigned 120 new job cards to newly married local youths'
    ],
    keyResolutionsHi: [
      '2 पुराने ग्रामीण तालाबों की गहरीकरण कार्य स्वीकृति',
      '120 नए जॉब कार्ड जारी करने का अनुमोदन'
    ]
  },
  {
    id: 'gs-3',
    title: 'Independence Day Special Gram Sabha',
    titleHi: 'स्वतंत्रता दिवस विशेष ग्राम सभा',
    date: '2026-08-15',
    time: '11:30 AM',
    type: 'mandatory',
    typeHi: 'अनिवार्य बैठक',
    agenda: 'Har Ghar Tiranga, school enrollment drive review, Poshan Abhiyaan status, elderly & widow pension verification list reading.',
    agendaHi: 'हर घर तिरंगा अभियान, स्कूल नामांकन वृद्धि समीक्षा, पोषण अभियान स्थिति एवं वृद्धावस्था/विधवा पेंशन सत्यापन सूची वाचन।',
    location: 'Panchayat Seva Kendra / Govt Senior Secondary School Field',
    locationHi: 'पंचायत सेवा केंद्र / राजकीय उच्च माध्यमिक विद्यालय प्रांगण',
    status: 'upcoming',
    quorumRequired: '10% of registered electors (minimum 30% women presence)',
  },
  {
    id: 'gs-4',
    title: 'Gandhi Jayanti Gram Sabha & GPDP Launch',
    titleHi: 'गांधी जयंती वार्षिक GPDP एवं बजट ग्राम सभा',
    date: '2026-10-02',
    time: '11:00 AM',
    type: 'budget',
    typeHi: 'बजट व कार्ययोजना बैठक',
    agenda: 'Approval of next financial year budget (15th Finance Commission & State Finance Commission), open discussion on village development priority index.',
    agendaHi: '15वें वित्त आयोग एवं राज्य वित्त आयोग के अगले वर्ष के बजट का अनुमोदन, ग्राम पंचायत विकास योजना (GPDP) प्राथमिकताओं का निर्धारण।',
    location: 'Main Gram Panchayat Bhawan',
    locationHi: 'मुख्य ग्राम पंचायत भवन',
    status: 'upcoming',
    quorumRequired: '10% of registered voters',
  }
];

export const CITIZEN_SERVICES_GUIDE_DATA: CitizenServiceGuide[] = [
  {
    id: 'srv-1',
    category: 'certificate',
    categoryHi: 'प्रमाण पत्र',
    serviceName: 'Birth & Death Certificate (CRS)',
    serviceNameHi: 'जन्म एवं मृत्यु प्रमाण पत्र (पहचान पोर्टल)',
    issuingAuthority: 'Gram Vikas Adhikari (VDO) / Registrar',
    issuingAuthorityHi: 'ग्राम विकास अधिकारी (VDO) / पंजीयक',
    timeLimitDays: 7,
    fee: 'Free (Within 21 days) / ₹10 late fee',
    feeHi: 'निःशुल्क (21 दिन के भीतर) / ₹10 विलंब शुल्क',
    requiredDocuments: [
      'Institutional birth/death slip (Hospital card)',
      'Aadhaar card of parents / informant',
      'Address proof / Ration card',
      'Prescribed Application Form-1 / Form-2'
    ],
    requiredDocumentsHi: [
      'अस्पताल की जन्म/मृत्यु पर्ची या सूचना प्रपत्र',
      'माता-पिता / आवेदक का आधार कार्ड',
      'निवास प्रमाण पत्र / राशन कार्ड',
      'निर्धारित आवेदन पत्र-1 अथवा 2'
    ],
    officialPortalUrl: 'https://pehchan.raj.nic.in',
    procedureSteps: [
      'Get Form 1/2 from CSC kiosk or Panchayat Bhawan',
      'Attach hospital report and Aadhaar cards of parents',
      'Submit to Gram Vikas Adhikari (VDO)',
      'Digital signed certificate issued within 7 days on Pehchan portal'
    ],
    procedureStepsHi: [
      'ई-मित्र/CSC कियोस्क अथवा पंचायत भवन से फॉर्म प्राप्त करें',
      'अस्पताल पर्ची व माता-पिता के आधार कार्ड संलग्न करें',
      'ग्राम विकास अधिकारी (VDO) के समक्ष सत्यापन हेतु प्रस्तुत करें',
      '7 कार्य दिवस में डिजिटल हस्ताक्षरित प्रमाण पत्र जारी'
    ]
  },
  {
    id: 'srv-2',
    category: 'housing',
    categoryHi: 'आवास व भूमि',
    serviceName: 'Panchayat Residential Patta (Rule 6A)',
    serviceNameHi: 'पंचायती आवासीय पट्टा (नियम 6A / आबादी भूमि)',
    issuingAuthority: 'Gram Panchayat (Sarpanch & VDO)',
    issuingAuthorityHi: 'ग्राम पंचायत (सरपंच एवं ग्राम विकास अधिकारी)',
    timeLimitDays: 30,
    fee: '₹100 - ₹500 (Government receipt fee)',
    feeHi: '₹100 - ₹500 (निर्धारित सरकारी रसीद शुल्क)',
    requiredDocuments: [
      'Application form with site plan (नक्शा ट्रेस)',
      'Old possession evidence (Electricity bill / Old tax receipt / 30+ yrs proof)',
      'Neighbor no-objection declarations (चौहद्दीदार अनापत्ति)',
      'Aadhaar & Jan Aadhaar card'
    ],
    requiredDocumentsHi: [
      'निर्धारित आवेदन पत्र मय मौका नक्शा (नजरी नक्शा)',
      'पुराने कब्जे का प्रमाण (बिजली बिल / पुराना गृहकर / 30+ वर्ष साक्ष्य)',
      'पड़ोसियों का अनापत्ति शपथ पत्र (चौहद्दीदार)',
      'आधार कार्ड व जन आधार कार्ड'
    ],
    procedureSteps: [
      'Submit application during Prashasan Gaon Ke Sang / GP office',
      'Panchayat committee inspects site and measures boundaries',
      '15-day public objection notice issued in village',
      'Final Patta signed by Sarpanch & VDO upon approval'
    ],
    procedureStepsHi: [
      'ग्राम पंचायत कार्यालय में मय दस्तावेज आवेदन प्रस्तुत करें',
      'पंचायत उप-समिति द्वारा मौके का मुआयना व नाप-जोख',
      '15 दिन की सार्वजनिक विज्ञप्ति व आपत्ति आमंत्रण',
      'आपत्ति न होने पर कोरम निर्णय से सरपंच व सचिव द्वारा पट्टा जारी'
    ]
  },
  {
    id: 'srv-3',
    category: 'revenue',
    categoryHi: 'राजस्व व नामांतरण',
    serviceName: 'Land Record (Jamabandi/Naksha) & Mutation',
    serviceNameHi: 'खेत की जमाबंदी नकल, नक्शा व वरासत नामांतरण',
    issuingAuthority: 'Halka Patwari / Revenue Tehsildar',
    issuingAuthorityHi: 'हल्का पटवारी / राजस्व तहसीलदार',
    timeLimitDays: 15,
    fee: '₹10 per copy on Apna Khata portal',
    feeHi: '₹10 प्रति प्रति (अपना खाता / ई-धरती पोर्टल)',
    requiredDocuments: [
      'Khasra number / Khata number',
      'Death certificate of deceased khatedar (for inheritance mutation)',
      'Family pedigree affidavit (वारिसान शजरा/शपथ पत्र)',
      'Jan Aadhaar card of all legal heirs'
    ],
    requiredDocumentsHi: [
      'खसरा नंबर अथवा खाता संख्या',
      'खातेदार का मृत्यु प्रमाण पत्र (वरासत हेतु)',
      'पारिवारिक वारिसान शजरा व नोटरी शपथ पत्र',
      'सभी कानूनी वारिसों के आधार व जन आधार'
    ],
    officialPortalUrl: 'https://apnakhata.rajasthan.gov.in',
    procedureSteps: [
      'Search Khata online on Apna Khata portal',
      'For mutation, apply at local Patwari / CSC kiosk',
      'Patwari verifies genealogy and records in mutation register',
      'Tehsildar sanctions mutation after mandatory public notice period'
    ],
    procedureStepsHi: [
      'अपना खाता पोर्टल पर ऑनलाइन नकल चेक करें',
      'नामांतरण हेतु पटवारी / ई-मित्र पर आवेदन करें',
      'पटवारी द्वारा वारिसान सत्यापन व पर्चा भरना',
      'तहसीलदार/नायब तहसीलदार द्वारा नामांतरण तस्दीक'
    ]
  },
  {
    id: 'srv-4',
    category: 'social_security',
    categoryHi: 'सामाजिक सुरक्षा',
    serviceName: 'Old Age, Widow & Disability Pension',
    serviceNameHi: 'वृद्धावस्था, विधवा एवं दिव्यांग सामाजिक सुरक्षा पेंशन',
    issuingAuthority: 'Social Justice Dept / BDO Office',
    issuingAuthorityHi: 'सामाजिक न्याय विभाग / विकास अधिकारी कार्यालय',
    timeLimitDays: 21,
    fee: 'Completely Free (निःशुल्क)',
    feeHi: 'पूर्णतः निःशुल्क',
    requiredDocuments: [
      'Jan Aadhaar / Aadhaar card',
      'Age proof (Aadhaar or Voter ID)',
      'Bank passbook linked to NPCI DBT',
      'Income self-declaration (< ₹48,000/yr)',
      'Disability certificate (for disability pension > 40%)'
    ],
    requiredDocumentsHi: [
      'जन आधार कार्ड एवं आधार कार्ड',
      'आयु प्रमाण पत्र (58 वर्ष महिला, 60 वर्ष पुरुष)',
      'बैंक पासबुक (DBT सक्रिय)',
      'वार्षिक आय ₹48,000 से कम का स्व-प्रमाणन',
      'दिव्यांगता प्रमाण पत्र (40% से अधिक हेतु)'
    ],
    officialPortalUrl: 'https://ssp.rajasthan.gov.in',
    procedureSteps: [
      'Apply at CSC kiosk / e-Mitra with Jan Aadhaar',
      'Automatic physical verification by VDO / Patwari',
      'Sanction order issued by Block Development Officer (BDO)',
      'Monthly ₹1,150+ credited directly to bank account'
    ],
    procedureStepsHi: [
      'ई-मित्र / सीएससी से जन आधार के जरिए ऑनलाइन आवेदन',
      'ग्राम विकास अधिकारी (VDO) द्वारा पात्रता का ऑनलाइन सत्यापन',
      'विकास अधिकारी (BDO) द्वारा स्वीकृति आदेश जारी',
      'प्रतिमाह पेंशन सीधे लाभार्थी के बैंक खाते में DBT द्वारा'
    ]
  },
  {
    id: 'srv-5',
    category: 'ration',
    categoryHi: 'राशन व खाद्य सुरक्षा',
    serviceName: 'NFSA Food Security (Free Ration) & FPS Card',
    serviceNameHi: 'राष्ट्रीय खाद्य सुरक्षा (NFSA राशन कार्ड व अन्नपूर्णा)',
    issuingAuthority: 'DSMO / Tehsildar / BDO',
    issuingAuthorityHi: 'जिला रसद अधिकारी / तहसीलदार / BDO',
    timeLimitDays: 30,
    fee: '₹20 application fee',
    feeHi: '₹20 आवेदन शुल्क',
    requiredDocuments: [
      'Jan Aadhaar card with biometric linkage',
      'BPL / Antyodaya proof or eligible category certification',
      'Electricity bill indicating consumption < 150 units',
      'Affidavit of not paying income tax'
    ],
    requiredDocumentsHi: [
      'जन आधार कार्ड (समस्त पारिवारिक सदस्यों का विवरण)',
      'पात्र श्रेणी प्रमाण (बीपीएल/अन्त्योदय/श्रमिक कार्ड आदि)',
      'बिजली बिल एवं गैस डायरी',
      'आयकर दाता न होने का शपथ पत्र'
    ],
    procedureSteps: [
      'Submit NFSA inclusion form at CSC/e-Mitra',
      'Scrutiny by Gram Panchayat committee in Gram Sabha',
      'Enlisted in Ration Portals for monthly 5kg/unit free wheat'
    ],
    procedureStepsHi: [
      'ई-मित्र पोर्टल से NFSA नाम जोड़ने हेतु ऑनलाइन आवेदन',
      'ग्राम सभा व उपखंड समिति द्वारा पात्रता की जांच',
      'नाम जुड़ने पर नजदीकी राशन डीलर से निःशुल्क गेहूं व सामग्री वितरण'
    ]
  }
];

export const EMERGENCY_CONTACTS_DATA: EmergencyContactItem[] = [
  {
    id: 'em-1',
    role: 'Halka Patwari (Revenue Officer)',
    roleHi: 'हल्का पटवारी (राजस्व अधिकारी)',
    department: 'Revenue & Land Records',
    departmentHi: 'राजस्व एवं भू-अभिलेख विभाग',
    contactNumber: '+91 94140 12345',
    emergencyType: 'revenue',
    iconType: 'FileText',
    availableHours: 'Mon - Fri (10 AM - 5 PM)',
    availableHoursHi: 'सोमवार - शुक्रवार (प्रातः 10 से सायं 5 बजे)'
  },
  {
    id: 'em-2',
    role: 'ANM / ASHA Sahyogini (Health Worker)',
    roleHi: 'ए.एन.एम. / आशा सहयोगिनी (स्वास्थ्य कार्यकर्ता)',
    department: 'Primary Health Center (PHC)',
    departmentHi: 'प्राथमिक स्वास्थ्य केंद्र (चिकित्सा एवं स्वास्थ्य)',
    contactNumber: '+91 94610 88990',
    emergencyType: 'medical',
    iconType: 'HeartPulse',
    availableHours: '24x7 On-call Maternity & First Aid',
    availableHoursHi: '24x7 आपातकालीन प्रसव व प्राथमिक उपचार'
  },
  {
    id: 'em-3',
    role: 'Krishi Paryavekshak (Agriculture Supervisor)',
    roleHi: 'कृषि पर्यवेक्षक (फसल बीमा व बीज विशेषज्ञ)',
    department: 'Agriculture & Soil Health Dept',
    departmentHi: 'कृषि विभाग एवं मृदा स्वास्थ्य प्रयोगशाला',
    contactNumber: '+91 98290 45678',
    emergencyType: 'revenue',
    iconType: 'Sprout',
    availableHours: 'Field Visits Tue/Thu (10 AM - 4 PM)',
    availableHoursHi: 'क्षेत्र भ्रमण मंगलवार/गुरुवार (10 AM - 4 PM)'
  },
  {
    id: 'em-4',
    role: 'Pashu Chikitsak (Veterinary Officer)',
    roleHi: 'पशु चिकित्सक / कंपाउंडर (पशुधन आरोग्य)',
    department: 'Animal Husbandry Dept',
    departmentHi: 'पशुपालन विभाग (पशु औषधालय)',
    contactNumber: '+91 97840 67890',
    emergencyType: 'veterinary',
    iconType: 'ShieldAlert',
    availableHours: 'Daily (9 AM - 2 PM)',
    availableHoursHi: 'प्रतिदिन (प्रातः 9 से दोपहर 2 बजे)'
  },
  {
    id: 'em-5',
    role: 'Jal Dayee Junior Engineer (PHED Tap Water)',
    roleHi: 'कनिष्ठ अभियंता (जलदाय विभाग - JJM नल मरम्मत)',
    department: 'Public Health Engineering Dept (PHED)',
    departmentHi: 'जन स्वास्थ्य अभियांत्रिकी विभाग (PHED)',
    contactNumber: '+91 94130 99881',
    emergencyType: 'water',
    iconType: 'Droplets',
    availableHours: 'Call for Pipeline Breakdown (8 AM - 8 PM)',
    availableHoursHi: 'पाइपलाइन लीकेज व मोटर खराबी हेतु (8 AM - 8 PM)'
  },
  {
    id: 'em-6',
    role: 'Discom Vidyut Sahayak (Electricity Lineman)',
    roleHi: 'डिस्कॉम विद्युत लाइनमैन / जेईएन (बिजली फॉल्ट)',
    department: 'Electricity Distribution Co.',
    departmentHi: 'विद्युत वितरण निगम (33/11 KV जीएसएस)',
    contactNumber: '+91 94140 55443',
    emergencyType: 'electricity',
    iconType: 'Zap',
    availableHours: '24x7 Power Breakdown Helpline: 1912',
    availableHoursHi: '24x7 बिजली फॉल्ट शिकायत: 1912'
  },
  {
    id: 'em-7',
    role: 'Gram Rakshak / Beat Constable (Police)',
    roleHi: 'ग्राम रक्षक / बीट कांस्टेबल (थाना पुलिस)',
    department: 'Rural Police Station',
    departmentHi: 'ग्रामीण पुलिस थाना एवं महिला सुरक्षा',
    contactNumber: '112 / +91 98280 11200',
    emergencyType: 'police',
    iconType: 'ShieldCheck',
    availableHours: '24 Hours Emergency Patrol',
    availableHoursHi: '24 घंटे आपातकालीन गश्त'
  },
  {
    id: 'em-8',
    role: 'Rajasthan Sampark Toll-Free CM Helpline',
    roleHi: 'राजस्थान संपर्क मुख्यमंत्री जन शिकायत हेल्पलाइन',
    department: 'Dept of Public Grievance',
    departmentHi: 'लोक सेवा एवं जन अभियोग निराकरण विभाग',
    contactNumber: '181',
    emergencyType: 'women_safety',
    iconType: 'PhoneCall',
    availableHours: 'Toll-Free 24x7',
    availableHoursHi: 'टोल-फ्री 24x7'
  }
];

export const INITIAL_GRIEVANCE_DATA: GrievanceTicket[] = [
  {
    id: 'gr-1',
    ticketNo: 'JHL-GRV-2026-001',
    panchayatId: 'gp-jhl-samrai',
    panchayatName: 'Samrai (Jhalrapatan)',
    panchayatNameHi: 'समराई (झालरापाटन)',
    villageName: 'Samrai Kalan',
    wardNo: 'Ward No. 04',
    category: 'water_leakage',
    categoryHi: 'नल जल लीकेज व पाइपलाइन खराबी',
    description: 'Main distribution pipe of Jal Jeevan Mission leaking near Bus Stand for 2 days.',
    citizenName: 'Shri Ramprasad Dangi',
    citizenPhone: '+91 94138 12XXX',
    reportedDate: '2026-08-10',
    status: 'under_review',
    statusHi: 'समीक्षाधीन / जलदाय लाइनमैन भेजा गया',
    adminRemark: 'PHED junior engineer instructed to repair valve and restore water pressure within 24 hours.'
  },
  {
    id: 'gr-2',
    ticketNo: 'JHL-GRV-2026-002',
    panchayatId: 'gp-jhl-bhalta',
    panchayatName: 'Bhalta (Aklera)',
    panchayatNameHi: 'भालता (अकलेरा)',
    villageName: 'Bhalta Main',
    wardNo: 'Ward No. 07',
    category: 'street_light',
    categoryHi: 'सोलर स्ट्रीट लाइट बंद होना',
    description: 'Solar street light installed near Govt Senior Secondary School not functioning.',
    citizenName: 'Smt. Kamla Bai Meena',
    citizenPhone: '+91 84409 88XXX',
    reportedDate: '2026-08-08',
    status: 'resolved',
    statusHi: 'समाधान पूर्ण ✅',
    adminRemark: 'Battery & LED luminaire replaced under warranty on 12th August.'
  },
  {
    id: 'gr-3',
    ticketNo: 'JHL-GRV-2026-003',
    panchayatId: 'gp-jhl-jhikariya',
    panchayatName: 'Jhikariya (Bakani)',
    panchayatNameHi: 'झिकाडिया (बकानी)',
    villageName: 'Jhikariya',
    wardNo: 'Ward No. 02',
    category: 'cleanliness',
    categoryHi: 'सार्वजनिक नाली जाम व सफाई',
    description: 'Drainage near Panchayat Bhawan choked due to silt accumulation.',
    citizenName: 'Shri Nandkishore Patidar',
    citizenPhone: '+91 99832 33XXX',
    reportedDate: '2026-08-12',
    status: 'submitted',
    statusHi: 'दर्ज (VDO बकानी को अग्रेषित)',
    adminRemark: 'Assigned to Gram Panchayat sanitation team for immediate clearance.'
  }
];
