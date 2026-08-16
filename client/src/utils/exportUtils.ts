import { GramPanchayat, Language } from '../types';

export function exportPanchayatToCSV(panchayat: GramPanchayat, lang: Language) {
  const isHi = lang === 'hi';
  const rows: string[][] = [];

  rows.push(['GRAM PANCHAYAT DOSSIER & VERIFICATION REPORT']);
  rows.push(['Generated Date', new Date().toLocaleDateString()]);
  rows.push([]);
  rows.push(['Panchayat Name', panchayat.name, panchayat.nameHi]);
  rows.push(['LGD Code', panchayat.lgdCode]);
  rows.push(['District', panchayat.districtName, panchayat.districtNameHi]);
  rows.push(['Panchayat Samiti (Block)', panchayat.samitiName, panchayat.samitiNameHi]);
  rows.push(['State', panchayat.state, panchayat.stateHi]);
  rows.push(['Total Population', panchayat.totalPopulation.toString()]);
  rows.push(['Total Households', panchayat.totalHouseholds.toString()]);
  rows.push(['Total Wards', panchayat.totalWards.toString()]);
  rows.push(['Office Address', panchayat.panchayatBhawanAddress]);
  rows.push([]);

  // Representatives
  rows.push(['ELECTED REPRESENTATIVES & ADMINISTRATIVE OFFICERS']);
  rows.push(['Designation', 'Name', 'Contact', 'Since']);
  panchayat.representatives.forEach((r) => {
    rows.push([r.designation, r.name, r.contact || '', r.since || '']);
  });
  rows.push([]);

  // Villages
  rows.push(['REVENUE VILLAGES & INFRASTRUCTURE AMENITIES']);
  rows.push(['Village Name', 'LGD Code', 'Population', 'Households', 'PIN', 'Primary School', 'Health Center', 'Tap Water (JJM)', 'Paved Road', '24x7 Power', 'CSC Internet']);
  panchayat.villages.forEach((v) => {
    rows.push([
      v.name,
      v.lgdCode,
      v.population.toString(),
      v.households.toString(),
      v.pincode,
      v.facilities.primarySchool ? 'YES' : 'NO',
      v.facilities.healthCenter ? 'YES' : 'NO',
      v.facilities.drinkingWaterTap ? 'YES' : 'NO',
      v.facilities.pavedRoad ? 'YES' : 'NO',
      v.facilities.electricity24x7 ? 'YES' : 'NO',
      v.facilities.internetCSC ? 'YES' : 'NO',
    ]);
  });
  rows.push([]);

  // Schemes
  rows.push(['DEVELOPMENT SCHEMES & PROGRESS STATUS']);
  rows.push(['Scheme Name', 'Budget Allocated', 'Status', 'Completion Year', 'Description']);
  panchayat.schemes.forEach((s) => {
    rows.push([
      s.schemeName,
      s.budgetAllocated,
      s.status.toUpperCase(),
      s.completionYear,
      s.description,
    ]);
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + rows.map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${panchayat.name}_LGD_${panchayat.lgdCode}_Dossier.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportAllPanchayatsDirectoryCSV(panchayats: GramPanchayat[]) {
  const rows: string[][] = [];
  rows.push(['LGD Code', 'Gram Panchayat', 'District', 'Block / Samiti', 'Population', 'Wards', 'Villages Count', 'Sarpanch Name', 'VDO Contact', 'Verified']);

  panchayats.forEach((gp) => {
    const sarpanch = gp.representatives.find((r) => r.designation === 'Sarpanch')?.name || 'N/A';
    const vdoContact = gp.representatives.find((r) => r.designation === 'VDO')?.contact || 'N/A';
    rows.push([
      gp.lgdCode,
      gp.name,
      gp.districtName,
      gp.samitiName,
      gp.totalPopulation.toString(),
      gp.totalWards.toString(),
      gp.villages.length.toString(),
      sarpanch,
      vdoContact,
      gp.verified ? 'YES' : 'NO',
    ]);
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + rows.map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Panchayat_Directory_Master_Export_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
