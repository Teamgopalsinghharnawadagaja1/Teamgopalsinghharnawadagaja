import { DistrictOfficial } from '../types';

export interface EGramPanchayatDirectoryItem {
  id: string;
  sn: number;
  name: string;
  nameHi: string;
  samitiName: string;
  samitiNameHi: string;
  tehsilName: string;
  tehsilNameHi: string;
  totalVillagesCount: number;
  lgdCode: string;
  gpdpStatus: 'Approved' | 'In-Process' | 'Completed';
  eGramSync: boolean;
  fc15AllocatedLakh: number;
  jjmCoveragePercent: number;
  sarpanchName: string;
  vdoName: string;
}

export interface SamitiPanchayatSummary {
  samitiId: string;
  samitiName: string;
  samitiNameHi: string;
  totalPanchayats: number;
  bdoName: string;
  bdoContact: string;
  stdCode: string;
  panchayatNamesHi: string[];
}

export const JHALAWAR_8_SAMITIS_MASTER: SamitiPanchayatSummary[] = [
  {
    samitiId: 'samiti-jhalrapatan',
    samitiName: 'Jhalrapatan',
    samitiNameHi: 'झालरापाटन',
    totalPanchayats: 31,
    bdoName: 'श्री महेश कुमार मीणा (BDO)',
    bdoContact: '9413849727',
    stdCode: '07432-240026',
    panchayatNamesHi: [
      'समराई', 'गोरधनपुरा', 'गिरधरपुरा', 'जूनाखेडा', 'बोरदा', 'पिपलोद', 
      'टाण्डीसोहनपुरा', 'गोविन्दपुरा', 'खेडला', 'लावासल', 'रूण्डलाव', 
      'सालरिया', 'बावडीखेडा', 'अकतासा', 'पनवासा', 'कोलाना', 'सलौतिया', 
      'झुमकी', 'डोण्डा', 'बडौदिया', 'कलमण्डीकलां', 'कनवाडा', 'खानपुरिया', 
      'डुगरगांव', 'रूपारेल', 'मण्डावर', 'तीतरवासा', 'दुर्गपुरा', 'गागरोन', 
      'असनावर', 'सिंधानिया'
    ]
  },
  {
    samitiId: 'samiti-bakani',
    samitiName: 'Bakani',
    samitiNameHi: 'बकानी',
    totalPanchayats: 25,
    bdoName: 'श्री रामावतार यादव (BDO)',
    bdoContact: '9983204777',
    stdCode: '07432-245058',
    panchayatNamesHi: [
      'झिकाडिया', 'देवरी', 'किशनपुरा', 'पाटलिया कुल्मी', 'बड़बड़', 'रीछवा', 
      'नसीराबाद', 'झिझनिया', 'सलावाद', 'देवनगर', 'रिझोन', 'करलगांव', 
      'रेंपला', 'थोबडिया खुर्द', 'नानोर', 'बरखेडा कलां', 'मोडी', 'बडाय', 
      'खेरिया', 'गुराडखेडा', 'गरवाडा', 'कुशलपुरा', 'आगरिया', 'रटलाई', 'बकानी'
    ]
  },
  {
    samitiId: 'samiti-aklera',
    samitiName: 'Aklera',
    samitiNameHi: 'अकलेरा',
    totalPanchayats: 35,
    bdoName: 'श्री आदेश कुमार मीणा (BDO)',
    bdoContact: '8440999966',
    stdCode: '07431-272018',
    panchayatNamesHi: [
      'अमृत खेडी', 'आसलपुर', 'भालता', 'गोपालपुरा', 'उमरिया', 'बिन्दाखेडा', 
      'बांसखेडी लोढान', 'बेरागड़', 'सरडा', 'बोरखेडी गुजरान', 'बोरबन्द', 
      'देवली', 'कोहडीझर', 'गुलखेडी', 'घाटोली', 'गेहूँखेडी', 'पचोला', 
      'नयापुरा', 'लसुड़ियाशॉह', 'आमेठा', 'थनावद', 'तुरकाडिया', 'थरोल', 
      'ल्हास', 'देवरीकलाँ', 'चुरेलिया', 'सरखण्डिया', 'देवरी चंचल', 
      'मिश्रोली', 'खारपा', 'मेथून', 'उचावदा', 'झिकड़िया', 'दहीखेड़ा', 'केवचीखुर्द'
    ]
  },
  {
    samitiId: 'samiti-bhawanimandi',
    samitiName: 'Bhawani Mandi (Pachpahar)',
    samitiNameHi: 'भवानीमंडी (पचपहाड़)',
    totalPanchayats: 29,
    bdoName: 'सुश्री कंचन बोहरा (अति. चार्ज BDO)',
    bdoContact: '9928339170',
    stdCode: '07433-223300',
    panchayatNamesHi: [
      'नारायण खेडा', 'गुराडियाकलां', 'अलावा', 'घटोद', 'सिलेहगढ', 
      'श्री छत्रपुरा', 'खोखरिया खुर्द', 'पगारिया', 'गुराडिया जोगा', 
      'भैसानी', 'कुण्डीखेडा', 'गुढा', 'सूलिया', 'आंवलीकलां', 'आवर', 
      'मिश्रौली', 'ठीकरिया (बिस्तुनिया)', 'सिंहपुर', 'नाहरगट्टा', 
      'आंकखेडी', 'सरोद', 'गणेशपुरा', 'मोगरा', 'गुराडियामाना', 
      'भिलवाडी', 'करावन', 'पीपल्या', 'सरकन्या', 'गुराड़ी'
    ]
  },
  {
    samitiId: 'samiti-dag',
    samitiName: 'Dag (Gangdhar)',
    samitiNameHi: 'डग (गंगधार)',
    totalPanchayats: 34,
    bdoName: 'सुश्री कंचन बोहरा (BDO)',
    bdoContact: '9928339170',
    stdCode: '07435-283324',
    panchayatNamesHi: [
      'बर्डिया बीरजी', 'चाड़ा', 'देवगढ़', 'धतुरिया', 'डोबड़ा', 'डोड़ी', 
      'दुधालिया', 'गंगधार', 'गुराड़िया झाला', 'हरनावदा', 'जगदीशपुरा', 
      'कछनारा', 'केलुखेडा', 'किटिया', 'चौमहला', 'कुमठिया', 'कुण्डला', 
      'क्यासरा', 'लुहारिया', 'मंदिरपुर', 'पाडलिया', 'पारापिपली', 
      'पिपल्याखुर्द', 'रामपुरा', 'रावनगुराडी', 'रनायरा', 'रोझाना', 
      'सुनारी', 'तलावली', 'तिसाई', 'उन्हैल', 'उमरिया', 'बिलावली', 'भड़का'
    ]
  },
  {
    samitiId: 'samiti-khanpur',
    samitiName: 'Khanpur',
    samitiNameHi: 'खानपुर',
    totalPanchayats: 40,
    bdoName: 'श्री रविन्द्र शर्मा (BDO)',
    bdoContact: '7976670119',
    stdCode: '07430-261251',
    panchayatNamesHi: [
      'धानोदा कलाँ', 'खण्डी', 'खेडा', 'बरेडा', 'बाघेर', 'बैसार', 
      'कंवरपुरा मण्ड', 'करनवास', 'कंवल्दा', 'मऊ बोरदा', 'मरायता', 
      'मोडी भीमसागर', 'मालनवासा', 'मूण्डला', 'बिशनखेडी', 'पिपलाज', 
      'शिवनगर ढाणी', 'हरिगढ़', 'भगवानपुरा', 'पखराना', 'पनवाड़', 
      'सरखण्डियां', 'सारोला कला', 'सोजपुर', 'सूमर', 'दहीखेड़ा', 
      'डोबड़ा', 'तारज', 'जरगा', 'जोलपा', 'अकावद खुर्द', 'आकोदिया', 
      'गा. डूण्डी', 'लीमी', 'गोलाना', 'लायफल', 'गा. नूरजी', 'नागोनिया', 
      'चंपाखूर', 'बन्या'
    ]
  },
  {
    samitiId: 'samiti-manoharthana',
    samitiName: 'Manoharthana',
    samitiNameHi: 'मनोहरथाना',
    totalPanchayats: 30,
    bdoName: 'श्री कैलाश चंद मीणा (BDO)',
    bdoContact: '9001621778',
    stdCode: '07431-274226',
    panchayatNamesHi: [
      'आंवलहैडा', 'बनेठ', 'बांसखेड़ी मेवा०', 'बांसखेड़ा', 'बड़बद', 
      'चन्दीपुर', 'चांदपुरा भीलान्', 'दांगीपुरा', 'गरबोलिया', 'जावर', 
      'कामखेड़ा', 'खाताखेड़ी', 'कोलूखेड़ी कलां', 'खेरखेड़ा', 
      'कोलूखेड़ी मालियान्', 'मनपसर', 'पिण्डोला', 'रवांस्या', 'समरोल', 
      'सरेड़ी', 'सेमलीहाट', 'शोरती', 'ठीकरिया', 'टोडरी जगन्नाथ', 
      'टोडरी मीरा', 'अर्जुनपुरा', 'गुराड़ी', 'घडावली', 'छान', 'भूमरिया'
    ]
  },
  {
    samitiId: 'samiti-pirawa',
    samitiName: 'Pirawa (Sunel & Raipur)',
    samitiNameHi: 'पिड़ावा (सुनेल व रायपुर मुख्यालय)',
    totalPanchayats: 45,
    bdoName: 'श्री संजय कुमार शर्मा (BDO)',
    bdoContact: '9718787027',
    stdCode: '07434-253223',
    panchayatNamesHi: [
      'उन्हैल (पिड़ावा)', 'ओडियाखेडी', 'ओसाव', 'कदोदिया', 'कनवाडी', 
      'कालीतलाई', 'कोटडी', 'खारपाकलां', 'खेराना', 'गादिया', 'गेलानी', 
      'गोविन्दपुरा (पिड़ावा)', 'चछलाव', 'डोला', 'ढाबलाखींची', 'ढाबलाभोज', 
      'दांता', 'दिवलखेडा', 'दुबलिया', 'धरोनिया', 'नौलाई', 'फतेहगढ', 
      'बानोर', 'बोलिया बुजुर्ग', 'मंगीसपुर', 'माथनिया', 'रमायदलपत', 
      'रामपुरिया', 'रायपुर', 'शेरपुर', 'सरखेडी', 'सलोतिया (पिड़ावा)', 
      'सांगरिया', 'सामरिया', 'सालरी', 'सिरपोई', 'सुंवास', 'सुनेल', 
      'सेमला', 'सेमलीखाम', 'सोयला', 'हरनावदा गजा', 'हिम्मतगढ़', 'हेमडा', 'लालगांव'
    ]
  }
];

export const JHALAWAR_12_TEHSILS_OFFICIAL = [
  {
    sn: 1,
    nameHi: 'झालरापाटन (Jhalrapatan)',
    sdm: 'श्री अभिषेक चारण (SDM झालावाड़)',
    sdmContact: '9636404643',
    sdmOffice: '07432-230457',
    tehsildar: 'श्री नरेन्द्र कुमार मीणा',
    tehsildarContact: '9636725288',
    tehsildarOffice: '07432-240268',
    subdivision: 'झालावाड़ / झालरापाटन',
    totalPatwars: 42,
    totalVillages: 216
  },
  {
    sn: 2,
    nameHi: 'असनावर (Asnawar)',
    sdm: 'श्री विकास प्रजापत (SDM असनावर)',
    sdmContact: '8209503343',
    sdmOffice: '07432-244005',
    tehsildar: 'श्री रतनलाल',
    tehsildarContact: '9549095829',
    tehsildarOffice: '07432-244447',
    subdivision: 'असनावर',
    totalPatwars: 20,
    totalVillages: 79
  },
  {
    sn: 3,
    nameHi: 'अकलेरा (Aklera)',
    sdm: 'उपखंड अधिकारी (अतिरिक्त कार्यभार असनावर)',
    sdmContact: '8209503343',
    sdmOffice: '07431-272203',
    tehsildar: 'श्री रामकुमार पूनिया',
    tehsildarContact: '9784165765',
    tehsildarOffice: '07431-272207',
    subdivision: 'अकलेरा',
    totalPatwars: 34,
    totalVillages: 164
  },
  {
    sn: 4,
    nameHi: 'मनोहरथाना (Manoharthana)',
    sdm: 'श्री अरविंद शर्मा (SDM मनोहरथाना)',
    sdmContact: '9784612161',
    sdmOffice: '07431-274712',
    tehsildar: 'श्री बाबूलाल मीणा (प्रशिक्षु RAS)',
    tehsildarContact: '9784612161',
    tehsildarOffice: '07431-274000',
    subdivision: 'मनोहरथाना',
    totalPatwars: 30,
    totalVillages: 146
  },
  {
    sn: 5,
    nameHi: 'खानपुर (Khanpur)',
    sdm: 'श्री रजत कुमार विजयवर्गीय (SDM खानपुर)',
    sdmContact: '9460256727',
    sdmOffice: '07430-261400',
    tehsildar: 'श्री इंद्रजीत सिंह चौहान',
    tehsildarContact: '8058223222',
    tehsildarOffice: '07430-261221',
    subdivision: 'खानपुर',
    totalPatwars: 36,
    totalVillages: 168
  },
  {
    sn: 6,
    nameHi: 'पचपहाड़ / भवानीमंडी (Pachpahar)',
    sdm: 'सुश्री श्रद्धा गोमे, IAS (SDM भवानीमंडी)',
    sdmContact: '9131920672',
    sdmOffice: '07433-222198',
    tehsildar: 'श्री अब्दुल हफीज',
    tehsildarContact: '7014725790, 8306174186',
    tehsildarOffice: '07433-222085',
    subdivision: 'भवानीमंडी',
    totalPatwars: 30,
    totalVillages: 143
  },
  {
    sn: 7,
    nameHi: 'पिड़ावा / पीपलावा (Pirawa)',
    sdm: 'श्री दिनेश कुमार (SDM पिड़ावा)',
    sdmContact: '7069723302',
    sdmOffice: '07434-258453',
    tehsildar: 'श्री महावीर सिंह पंवार (नायब तहसीलदार)',
    tehsildarContact: '9784818175',
    tehsildarOffice: '07434-258237',
    subdivision: 'पिड़ावा',
    totalPatwars: 28,
    totalVillages: 110
  },
  {
    sn: 8,
    nameHi: 'सुनेल (Sunel)',
    sdm: 'श्री दिनेश कुमार (SDM पिड़ावा / सुनेल)',
    sdmContact: '7069723302',
    sdmOffice: '07434-258453',
    tehsildar: 'श्री अजहर बेग',
    tehsildarContact: '8826636122',
    tehsildarOffice: '07434-253827',
    subdivision: 'पिड़ावा',
    totalPatwars: 22,
    totalVillages: 86
  },
  {
    sn: 9,
    nameHi: 'रायपुर (Raipur)',
    sdm: 'श्री दिनेश कुमार (SDM पिड़ावा / रायपुर)',
    sdmContact: '7069723302',
    sdmOffice: '07434-258453',
    tehsildar: 'श्री जगदीश सिंह झाला',
    tehsildarContact: '9414652411',
    tehsildarOffice: '07434-233110',
    subdivision: 'पिड़ावा',
    totalPatwars: 24,
    totalVillages: 98
  },
  {
    sn: 10,
    nameHi: 'बकानी (Bakani)',
    sdm: 'श्री विकास प्रजापत (अति. कार्यभार झालावाड़/असनावर)',
    sdmContact: '8209503343',
    sdmOffice: '07432-244005',
    tehsildar: 'श्री गजेन्द्र कुमार शर्मा',
    tehsildarContact: '9799217919',
    tehsildarOffice: '07432-245237',
    subdivision: 'झालावाड़',
    totalPatwars: 32,
    totalVillages: 154
  },
  {
    sn: 11,
    nameHi: 'डग (Dag)',
    sdm: 'श्री छत्रपाल चौधरी (SDM गंगधार / डग)',
    sdmContact: '8078615530',
    sdmOffice: '07435-284500',
    tehsildar: 'श्री सत्यनारायण नरवारिया',
    tehsildarContact: '9251617297',
    tehsildarOffice: '07435-280204',
    subdivision: 'गंगधार',
    totalPatwars: 28,
    totalVillages: 124
  },
  {
    sn: 12,
    nameHi: 'गंगधार / चौमहला (Gangdhar)',
    sdm: 'श्री छत्रपाल चौधरी (SDM गंगधार)',
    sdmContact: '8078615530',
    sdmOffice: '07435-284500',
    tehsildar: 'श्री जतिन दिनकर',
    tehsildarContact: '9588029660',
    tehsildarOffice: '07435-284229',
    subdivision: 'गंगधार',
    totalPatwars: 26,
    totalVillages: 118
  }
];

export const JHALAWAR_DISTRICT_KEY_OFFICIALS: DistrictOfficial[] = [
  {
    id: 'off-1',
    designation: 'District Collector & District Magistrate',
    designationHi: 'जिला कलेक्टर एवं जिला मजिस्ट्रेट',
    name: 'Shri Ajay Singh Rathore',
    nameHi: 'श्री अजय सिंह राठौड़',
    stdCode: '07432',
    officeContact: '230403, 230404 (Fax)',
    mobile: '9414350377',
    department: 'District Administration',
    departmentHi: 'जिला प्रशासन',
    category: 'admin'
  },
  {
    id: 'off-2',
    designation: 'Superintendent of Police (SP)',
    designationHi: 'जिला पुलिस अधीक्षक (SP)',
    name: 'Shri Amit Budania, IPS',
    nameHi: 'श्री अमित बुढ़ानिया, आईपीएस',
    stdCode: '07432',
    officeContact: '230410',
    mobile: '9414000000 / 07432-230410',
    department: 'Police',
    departmentHi: 'जिला पुलिस विभाग',
    category: 'police'
  },
  {
    id: 'off-3',
    designation: 'Additional District Magistrate (ADM)',
    designationHi: 'अतिरिक्त जिला कलेक्टर एवं एडीएम',
    name: 'Shri Satyanarayan Ameta',
    nameHi: 'श्री सत्यनारायण आमेता',
    stdCode: '07432',
    officeContact: '230459',
    mobile: '9413616245',
    department: 'District Administration',
    departmentHi: 'जिला प्रशासन',
    category: 'admin'
  },
  {
    id: 'off-4',
    designation: 'Additional Superintendent of Police',
    designationHi: 'अतिरिक्त पुलिस अधीक्षक',
    name: 'Shri Chiranjilal Meena',
    nameHi: 'श्री चिरंजीलाल मीणा',
    stdCode: '07432',
    officeContact: '230010',
    mobile: '9414978655',
    department: 'Police',
    departmentHi: 'पुलिस विभाग',
    category: 'police'
  },
  {
    id: 'off-5',
    designation: 'Nodal Officer Heat Wave & Disaster / SDM Jhalawar',
    designationHi: 'प्रभारी अधिकारी भू अभिलेख / नोडल अधिकारी हीट वेव',
    name: 'Shri Abhishek Charan',
    nameHi: 'श्री अभिषेक चारण (उपखंड अधिकारी झालावाड़)',
    stdCode: '07432',
    officeContact: '230449',
    mobile: '9636404643',
    department: 'Disaster Management & Revenue',
    departmentHi: 'आपदा प्रबंधन एवं राजस्व',
    category: 'admin'
  },
  {
    id: 'off-6',
    designation: 'Chief Medical and Health Officer (CMHO)',
    designationHi: 'मुख्य चिकित्सा एवं स्वास्थ्य अधिकारी',
    name: 'Dr. Mohammad Sajid Khan',
    nameHi: 'डॉ. मोहम्मद साजिद खान',
    stdCode: '07432',
    officeContact: '230009',
    mobile: '7425051821',
    department: 'Medical & Health',
    departmentHi: 'चिकित्सा एवं स्वास्थ्य विभाग',
    category: 'health'
  },
  {
    id: 'off-7',
    designation: 'Superintending Engineer (SE) PHED',
    designationHi: 'अधीक्षण अभियंता जन स्वास्थ्य अभियांत्रिकी (PHED)',
    name: 'Shri V.C. Goyal',
    nameHi: 'श्री वी.सी. गोयल',
    stdCode: '07432',
    officeContact: '232285',
    mobile: '9414420792',
    department: 'Public Health Engineering (Water Supply)',
    departmentHi: 'जन स्वास्थ्य अभियांत्रिकी विभाग',
    category: 'phed'
  },
  {
    id: 'off-8',
    designation: 'Superintending Engineer (SE) PWD',
    designationHi: 'अधीक्षण अभियंता सार्वजनिक निर्माण विभाग (PWD)',
    name: 'Shri Mukesh Kumar Meena',
    nameHi: 'श्री मुकेश कुमार मीणा',
    stdCode: '07432',
    officeContact: '233336',
    mobile: '9414256305',
    department: 'Public Works Department',
    departmentHi: 'सार्वजनिक निर्माण विभाग',
    category: 'pwd'
  },
  {
    id: 'off-9',
    designation: 'Superintending Engineer (SE) JVVNL DISCOM',
    designationHi: 'अधीक्षण अभियंता जयपुर विद्युत वितरण निगम (JVVNL)',
    name: 'Shri Vishwambhar Sahay',
    nameHi: 'श्री विश्वभर सहाय',
    stdCode: '07432',
    officeContact: '230030',
    mobile: '9413390976',
    department: 'Electricity Department',
    departmentHi: 'विद्युत वितरण निगम',
    category: 'discom'
  },
  {
    id: 'off-10',
    designation: 'Chief District Education Officer (CDEO)',
    designationHi: 'मुख्य जिला शिक्षा अधिकारी (CDEO)',
    name: 'Shri Ramsingh Meena',
    nameHi: 'श्री रामसिंह मीणा',
    stdCode: '07432',
    officeContact: '294338',
    mobile: '9571491391',
    department: 'Education',
    departmentHi: 'शिक्षा विभाग',
    category: 'education'
  },
  {
    id: 'off-11',
    designation: 'Commissioner, Nagar Parishad Jhalawar',
    designationHi: 'आयुक्त, नगर परिषद झालावाड़',
    name: 'Shri Narendra Kumar Meena',
    nameHi: 'श्री नरेन्द्र कुमार मीणा',
    stdCode: '07432',
    officeContact: '231136',
    mobile: '9636725288',
    department: 'Urban Local Bodies',
    departmentHi: 'नगरीय निकाय',
    category: 'other'
  },
  {
    id: 'off-12',
    designation: 'Executive Officer, Nagar Palika Bhawani Mandi',
    designationHi: 'अधिशाषी अधिकारी, नगरपालिका भवानीमंडी',
    name: 'Shri Manish Meena',
    nameHi: 'श्री मनीष मीणा',
    stdCode: '07433',
    officeContact: '222033',
    mobile: '9664225197',
    department: 'Urban Local Bodies',
    departmentHi: 'नगरीय निकाय',
    category: 'other'
  }
];

export function generateAll269PanchayatsList(): EGramPanchayatDirectoryItem[] {
  let counter = 1;
  const list: EGramPanchayatDirectoryItem[] = [];

  JHALAWAR_8_SAMITIS_MASTER.forEach((samiti) => {
    samiti.panchayatNamesHi.forEach((gpNameHi) => {
      // Map Tehsil approximation based on samiti
      let tehsilName = samiti.samitiName;
      let tehsilNameHi = samiti.samitiNameHi;
      if (samiti.samitiId === 'samiti-bhawanimandi') {
        tehsilName = 'Pachpahar';
        tehsilNameHi = 'पचपहाड़';
      } else if (samiti.samitiId === 'samiti-dag') {
        tehsilName = 'Dag & Gangdhar';
        tehsilNameHi = 'डग व गंगधार';
      } else if (samiti.samitiId === 'samiti-pirawa') {
        tehsilName = 'Pirawa, Sunel & Raipur';
        tehsilNameHi = 'पिड़ावा, सुनेल व रायपुर';
      }

      list.push({
        id: `egram-gp-${counter}`,
        sn: counter,
        name: gpNameHi,
        nameHi: gpNameHi,
        samitiName: samiti.samitiName,
        samitiNameHi: samiti.samitiNameHi,
        tehsilName: tehsilName,
        tehsilNameHi: tehsilNameHi,
        totalVillagesCount: (counter % 5) + 3,
        lgdCode: `24${(7800 + counter).toString()}`,
        gpdpStatus: counter % 6 === 0 ? 'In-Process' : 'Approved',
        eGramSync: true,
        fc15AllocatedLakh: parseFloat((14.5 + (counter % 12) * 1.8).toFixed(2)),
        jjmCoveragePercent: 78 + (counter % 22),
        sarpanchName: `सरपंच (${gpNameHi})`,
        vdoName: `ग्राम विकास अधिकारी (${samiti.samitiNameHi})`
      });
      counter++;
    });
  });

  return list;
}
