export type Language = 'hi' | 'en';

export type Priority = 'low' | 'medium' | 'high';

export interface Representative {
  name: string;
  nameHi: string;
  designation: 'Sarpanch' | 'Up-Sarpanch' | 'VDO' | 'Pradhan' | 'Zila Pramukh' | 'BDO';
  designationHi: string;
  contact?: string;
  since?: string;
}

export interface SchemeWork {
  id: string;
  schemeName: string;
  schemeNameHi: string;
  description: string;
  descriptionHi: string;
  budgetAllocated: string; // e.g. "₹ 12.5 Lakh"
  status: 'completed' | 'in_progress' | 'approved' | 'sanctioned';
  statusHi: string;
  completionYear: string;
  beneficiariesCount?: number;
  verified: boolean;
}

export interface Village {
  id: string;
  name: string;
  nameHi: string;
  lgdCode: string;
  population: number;
  households: number;
  pincode: string;
  facilities: {
    primarySchool: boolean;
    secondarySchool: boolean;
    healthCenter: boolean;
    drinkingWaterTap: boolean;
    pavedRoad: boolean;
    electricity24x7: boolean;
    internetCSC: boolean;
    postOffice: boolean;
  };
  verified: boolean;
}

export interface GramPanchayat {
  id: string;
  name: string;
  nameHi: string;
  lgdCode: string; // Official LGD code format e.g. "247812"
  districtName: string;
  districtNameHi: string;
  samitiName: string;
  samitiNameHi: string;
  state: string;
  stateHi: string;
  totalWards: number;
  totalPopulation: number;
  totalHouseholds: number;
  panchayatBhawanAddress: string;
  panchayatBhawanAddressHi: string;
  representatives: Representative[];
  villages: Village[];
  schemes: SchemeWork[];
  verified: boolean;
  lastUpdated: string;
  /** Provenance state: never display unverified data as official. */
  dataStatus?: 'verified' | 'needs_verification' | 'unknown';
  sourceUrl?: string;
}

export interface PanchayatSamiti {
  id: string;
  name: string;
  nameHi: string;
  lgdCode: string;
  districtId: string;
  districtName: string;
  districtNameHi: string;
  totalGramPanchayats: number;
  totalVillages: number;
  pradhanName: string;
  pradhanNameHi: string;
  bdoName: string;
  bdoNameHi: string;
  contactNumber: string;
}

export interface District {
  id: string;
  name: string;
  nameHi: string;
  state: string;
  stateHi: string;
  lgdCode: string;
  zilaPramukh: string;
  zilaPramukhHi: string;
  collectorateContact: string;
  totalSamitis: number;
  totalGramPanchayats: number;
  totalVillages: number;
}

export interface GramSabhaMeeting {
  id: string;
  title: string;
  titleHi: string;
  date: string;
  time: string;
  type: 'mandatory' | 'special' | 'budget';
  typeHi: string;
  agenda: string;
  agendaHi: string;
  location: string;
  locationHi: string;
  status: 'upcoming' | 'completed';
  quorumRequired: string;
  keyResolutions?: string[];
  keyResolutionsHi?: string[];
}

export interface CitizenServiceGuide {
  id: string;
  category: 'certificate' | 'revenue' | 'housing' | 'social_security' | 'ration';
  categoryHi: string;
  serviceName: string;
  serviceNameHi: string;
  issuingAuthority: string;
  issuingAuthorityHi: string;
  timeLimitDays: number;
  requiredDocuments: string[];
  requiredDocumentsHi: string[];
  fee: string;
  feeHi: string;
  officialPortalUrl?: string;
  procedureSteps: string[];
  procedureStepsHi: string[];
}

export interface EmergencyContactItem {
  id: string;
  role: string;
  roleHi: string;
  department: string;
  departmentHi: string;
  contactNumber: string;
  emergencyType: 'medical' | 'revenue' | 'police' | 'water' | 'electricity' | 'veterinary' | 'women_safety';
  iconType: string;
  availableHours: string;
  availableHoursHi: string;
}

export interface Tehsil {
  id: string;
  name: string;
  nameHi: string;
  districtId: string;
  districtName: string;
  districtNameHi: string;
  sdmName: string;
  sdmNameHi: string;
  tehsildarName: string;
  tehsildarNameHi: string;
  contactNumber: string;
  totalPatwarMandals: number;
  totalVillages: number;
  subdivisionOffice: string;
  subdivisionOfficeHi: string;
}

export interface DeficiencyAuditItem {
  id: string;
  samitiName: string;
  samitiNameHi: string;
  tehsilName: string;
  tehsilNameHi: string;
  panchayatName: string;
  panchayatNameHi: string;
  villageName: string;
  villageNameHi: string;
  category: 'water_jjm' | 'road_connectivity' | 'health_staff' | 'power_voltage' | 'education_lab' | 'irrigation_drainage';
  categoryHi: string;
  deficiencyTitle: string;
  deficiencyTitleHi: string;
  impactDescription: string;
  impactDescriptionHi: string;
  affectedPopulation: number;
  severity: 'high' | 'medium' | 'critical';
  severityHi: string;
  currentStatus: string;
  currentStatusHi: string;
  actionTakenOrPlanned: string;
  actionTakenOrPlannedHi: string;
  sanctionTimeline: string;
}

export interface DistrictOfficial {
  id: string;
  designation: string;
  designationHi: string;
  name: string;
  nameHi: string;
  stdCode: string;
  officeContact: string;
  mobile: string;
  department: string;
  departmentHi: string;
  category: 'admin' | 'subdivision' | 'tehsildar' | 'bdo' | 'police' | 'health' | 'phed' | 'pwd' | 'discom' | 'education' | 'other';
}

export interface GrievanceTicket {
  id: string;
  ticketNo: string;
  panchayatId: string;
  panchayatName: string;
  panchayatNameHi: string;
  villageName: string;
  wardNo: string;
  category: 'water_leakage' | 'street_light' | 'cleanliness' | 'road_damage' | 'scheme_benefit' | 'other';
  categoryHi: string;
  description: string;
  citizenName: string;
  citizenPhone: string;
  reportedDate: string;
  status: 'submitted' | 'under_review' | 'resolved';
  statusHi: string;
  adminRemark?: string;
}

export interface SchoolTeacherDeficiency {
  id: string;
  udiseCode: string;
  schoolName: string;
  schoolNameHi: string;
  schoolCategory: 'GSSS' | 'GUPS' | 'GPS' | 'MGGS';
  schoolCategoryHi: string;
  blockName: string;
  blockNameHi: string;
  panchayatName: string;
  panchayatNameHi: string;
  villageName: string;
  villageNameHi: string;
  totalSanctioned: number;
  workingStaff: number;
  vacantStaff: number;
  vacantKeyPosts: string[];
  vacantKeyPostsHi: string[];
  enrolledStudents: number;
  deficiencySeverity: 'critical' | 'high' | 'medium';
  actionStatus: string;
  actionStatusHi: string;
  cbeoContact: string;
}

export interface BlockEducationStats {
  blockName: string;
  blockNameHi: string;
  cbeoName: string;
  cbeoNameHi: string;
  cbeoContact: string;
  totalSchools: number;
  sanctionedPosts: number;
  workingTeachers: number;
  vacantPosts: number;
  vacancyPercentage: number;
  primaryLevel1Vacant: number;
  upperPrimaryLevel2Vacant: number;
  seniorTeacherGr2Vacant: number;
  lecturerGr1Vacant: number;
  principalHMVacant: number;
}

export interface HealthFacility {
  id: string;
  name: string;
  nameHi: string;
  category: 'medical_college' | 'sub_district' | 'chc' | 'phc' | 'blood_bank';
  categoryHi: string;
  location: string;
  locationHi: string;
  tehsil: string;
  tehsilHi: string;
  bedsCount: number;
  inchargeDoctor: string;
  inchargeDoctorHi: string;
  contactNumber: string;
  emergencyAvailable24x7: boolean;
  facilities: string[];
  facilitiesHi: string[];
  ambulanceContact: string;
}

export interface AgricultureMandiItem {
  id: string;
  mandiName: string;
  mandiNameHi: string;
  location: string;
  locationHi: string;
  secretaryContact: string;
  cropName: string;
  cropNameHi: string;
  commodityType: 'citrus_orange' | 'soybean' | 'coriander' | 'garlic' | 'mustard' | 'wheat';
  variety: string;
  dailyArrivalQuintal: number;
  modalPricePerQuintal: number;
  minPrice: number;
  maxPrice: number;
  specialityRemarkHi: string;
  specialityRemarkEn: string;
}

export interface IrrigationDam {
  id: string;
  name: string;
  nameHi: string;
  river: string;
  riverHi: string;
  location: string;
  locationHi: string;
  totalCapacityMcft: number;
  currentLevelMetres: number;
  fullReservoirLevelMetres: number;
  gatesCount: number;
  beneficiaryTehsils: string[];
  beneficiaryTehsilsHi: string[];
  canalLengthKm: number;
  irrigatedAreaHectares: number;
  controlRoomContact: string;
}

export interface TourismSpot {
  id: string;
  name: string;
  nameHi: string;
  category: 'unesco_heritage' | 'ancient_temple' | 'buddhist_caves' | 'historic_theatre' | 'nature_wildlife' | 'fair_festival';
  categoryHi: string;
  location: string;
  locationHi: string;
  distanceFromHQKm: number;
  historicalSignificance: string;
  historicalSignificanceHi: string;
  timing: string;
  timingHi: string;
  entryFee: string;
  entryFeeHi: string;
  highlights: string[];
  highlightsHi: string[];
  nearestStation: string;
  nearestStationHi: string;
}

export interface TransportEmergencyService {
  id: string;
  category: 'police_disaster' | 'railway' | 'bus_depot' | 'rto' | 'women_child';
  categoryHi: string;
  title: string;
  titleHi: string;
  location: string;
  locationHi: string;
  phone: string;
  tollFree?: string;
  operationalHours: string;
  operationalHoursHi: string;
  details: string;
  detailsHi: string;
}

