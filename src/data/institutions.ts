import type { Institution, InstitutionType } from '@/types'

export const cities = [
  { id: 'bogor', name: 'Kota Bogor' },
  { id: 'jakarta-selatan', name: 'Jakarta Selatan' },
  { id: 'jakarta-pusat', name: 'Jakarta Pusat' },
  { id: 'bandung', name: 'Kota Bandung' },
  { id: 'depok', name: 'Kota Depok' },
  { id: 'tangerang', name: 'Kota Tangerang' },
  { id: 'bekasi', name: 'Kota Bekasi' },
]

export const institutionTypes: { value: InstitutionType; label: string; icon: string }[] = [
  { value: 'puskesmas', label: 'Puskesmas', icon: '🏥' },
  { value: 'rumah_sakit', label: 'Rumah Sakit', icon: '🏨' },
  { value: 'klinik', label: 'Klinik 24 Jam', icon: '🏪' },
]

export const institutions: Institution[] = [
  // === RUMAH SAKIT ===
  {
    id: 'rs-1', type: 'rumah_sakit', city: 'bogor',
    name: 'RSUD Kota Bogor',
    address: 'Jl. dr. Sumeru No.120, Kel. Menteng, Kec. Bogor Barat, Kota Bogor',
    mapsUrl: 'https://maps.google.com/?q=RSUD+Kota+Bogor',
    logoUrl: '', phone: '(0251) 8324251',
  },
  {
    id: 'rs-2', type: 'rumah_sakit', city: 'bogor',
    name: 'RSHS Bogor (Salak)',
    address: 'Jl. Jenderal Sudirman No.89, Ciwaringin, Kec. Bogor Tengah',
    mapsUrl: 'https://maps.google.com/?q=RS+Salak+Bogor',
    logoUrl: '', phone: '(0251) 8320583',
  },
  {
    id: 'rs-3', type: 'rumah_sakit', city: 'bogor',
    name: 'RS Hermina Bogor',
    address: 'Jl. Siliwangi No.2, Paledang, Kec. Bogor Tengah',
    mapsUrl: 'https://maps.google.com/?q=RS+Hermina+Bogor',
    logoUrl: '', phone: '(0251) 8344444',
  },
  {
    id: 'rs-4', type: 'rumah_sakit', city: 'jakarta-selatan',
    name: 'RSUP Fatmawati',
    address: 'Jl. RS Fatmawati Raya No.4, Cilandak Barat, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com/?q=RSUP+Fatmawati',
    logoUrl: '', phone: '(021) 7501524',
  },
  {
    id: 'rs-5', type: 'rumah_sakit', city: 'jakarta-selatan',
    name: 'RS Pondok Indah',
    address: 'Jl. Metro Duta No.3, Pondok Indah, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com/?q=RS+Pondok+Indah',
    logoUrl: '', phone: '(021) 7657525',
  },
  {
    id: 'rs-6', type: 'rumah_sakit', city: 'jakarta-pusat',
    name: 'RSUPN Dr. Cipto Mangunkusumo (RSCM)',
    address: 'Jl. Pangeran Diponegoro No.71, Senen, Jakarta Pusat',
    mapsUrl: 'https://maps.google.com/?q=RSCM+Jakarta',
    logoUrl: '', phone: '(021) 1500515',
  },
  {
    id: 'rs-7', type: 'rumah_sakit', city: 'bandung',
    name: 'RSUP Dr. Hasan Sadikin',
    address: 'Jl. Pasteur No.38, Pasteur, Kec. Sukajadi, Bandung',
    mapsUrl: 'https://maps.google.com/?q=RS+Hasan+Sadikin',
    logoUrl: '', phone: '(022) 2034953',
  },
  {
    id: 'rs-8', type: 'rumah_sakit', city: 'bandung',
    name: 'RS Borromeus',
    address: 'Jl. Kopo No.41, Cigondewah Kaler, Kec. Bandung Kulon',
    mapsUrl: 'https://maps.google.com/?q=RS+Borromeus+Bandung',
    logoUrl: '', phone: '(022) 5205000',
  },
  {
    id: 'rs-9', type: 'rumah_sakit', city: 'depok',
    name: 'RS Bhayangkara Brimob',
    address: 'Jl. Akses UI No.1, Kelapa Dua, Kec. Cimanggis, Depok',
    mapsUrl: 'https://maps.google.com/?q=RS+Bhayangkara+Brimob+Depok',
    logoUrl: '', phone: '(021) 8724678',
  },
  {
    id: 'rs-10', type: 'rumah_sakit', city: 'tangerang',
    name: 'RS Siloam Tangerang',
    address: 'Jl. MH. Thamrin No.1, Cikokol, Kec. Tangerang',
    mapsUrl: 'https://maps.google.com/?q=RS+Siloam+Tangerang',
    logoUrl: '', phone: '(021) 5589000',
  },
  {
    id: 'rs-11', type: 'rumah_sakit', city: 'bekasi',
    name: 'RS Anna Medika',
    address: 'Jl. Raya Narogong No.76, Bojong Menteng, Kec. Rawalumbu, Bekasi',
    mapsUrl: 'https://maps.google.com/?q=RS+Anna+Medika+Bekasi',
    logoUrl: '', phone: '(021) 82607777',
  },
  // === PUSKESMAS ===
  {
    id: 'pkm-1', type: 'puskesmas', city: 'bogor',
    name: 'Puskesmas Bogor Tengah',
    address: 'Jl. Merdeka No.116, Babakan, Kec. Bogor Tengah, Kota Bogor',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bogor+Tengah',
    logoUrl: '', phone: '(0251) 8322250',
  },
  {
    id: 'pkm-2', type: 'puskesmas', city: 'bogor',
    name: 'Puskesmas Bogor Utara',
    address: 'Jl. Raya Pajajaran No.99, Bantarjati, Kec. Bogor Utara',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bogor+Utara',
    logoUrl: '', phone: '(0251) 8322251',
  },
  {
    id: 'pkm-3', type: 'puskesmas', city: 'bogor',
    name: 'Puskesmas Bogor Barat',
    address: 'Jl. Batu Tulis No.33, Batu Tulis, Kec. Bogor Barat',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bogor+Barat',
    logoUrl: '', phone: '(0251) 8322252',
  },
  {
    id: 'pkm-4', type: 'puskesmas', city: 'bogor',
    name: 'Puskesmas Bogor Selatan',
    address: 'Jl. Pahlawan No.55, Empang, Kec. Bogor Selatan',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bogor+Selatan',
    logoUrl: '', phone: '(0251) 8322253',
  },
  {
    id: 'pkm-5', type: 'puskesmas', city: 'jakarta-selatan',
    name: 'Puskesmas Kecamatan Kebayoran Baru',
    address: 'Jl. KH. Ahmad Dahlan No.18, Kramat Pela, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Kebayoran+Baru',
    logoUrl: '', phone: '(021) 7392245',
  },
  {
    id: 'pkm-6', type: 'puskesmas', city: 'jakarta-pusat',
    name: 'Puskesmas Kecamatan Senen',
    address: 'Jl. Kramat Raya No.23, Senen, Jakarta Pusat',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Senen',
    logoUrl: '', phone: '(021) 3865567',
  },
  {
    id: 'pkm-7', type: 'puskesmas', city: 'bandung',
    name: 'Puskesmas Kecamatan Bandung Wetan',
    address: 'Jl. Tamansari No.84, Tamansari, Kec. Bandung Wetan',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bandung+Wetan',
    logoUrl: '', phone: '(022) 4201555',
  },
  {
    id: 'pkm-8', type: 'puskesmas', city: 'depok',
    name: 'Puskesmas Kecamatan Pancoran Mas',
    address: 'Jl. Raya Sawangan No.21, Pancoran Mas, Depok',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Pancoran+Mas',
    logoUrl: '', phone: '(021) 77885678',
  },
  {
    id: 'pkm-9', type: 'puskesmas', city: 'tangerang',
    name: 'Puskesmas Kecamatan Tangerang',
    address: 'Jl. Bhayangkara No.17, Sukasari, Tangerang',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Kecamatan+Tangerang',
    logoUrl: '', phone: '(021) 5582345',
  },
  {
    id: 'pkm-10', type: 'puskesmas', city: 'bekasi',
    name: 'Puskesmas Kecamatan Bekasi Timur',
    address: 'Jl. Pramuka No.44, Margahayu, Bekasi Timur',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bekasi+Timur',
    logoUrl: '', phone: '(021) 8805678',
  },
  // === KLINIK 24 JAM ===
  {
    id: 'kl-1', type: 'klinik', city: 'bogor',
    name: 'Klinik 24 Jam Sehat Farma Bogor',
    address: 'Jl. Siliwangi No.10, Babakan, Kec. Bogor Tengah',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Sehat+Farma+Bogor',
    logoUrl: '', phone: '(0251) 8586677',
  },
  {
    id: 'kl-2', type: 'klinik', city: 'bogor',
    name: 'Klinik 24 Jam Medika Bogor',
    address: 'Jl. Raya Tajur No.89, Muara Sari, Kec. Bogor Selatan',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Medika+Bogor',
    logoUrl: '', phone: '(0251) 8344556',
  },
  {
    id: 'kl-3', type: 'klinik', city: 'bogor',
    name: 'Klinik 24 Jam Kimia Farma Bogor',
    address: 'Jl. Ir. H. Juanda No.33, Kedung Halang, Kec. Bogor Utara',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Kimia+Farma+Bogor',
    logoUrl: '', phone: '(0251) 8332211',
  },
  {
    id: 'kl-4', type: 'klinik', city: 'jakarta-selatan',
    name: 'Klinik 24 Jam Pondok Indah',
    address: 'Jl. Margaguna Raya No.1, Pondok Indah, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Pondok+Indah',
    logoUrl: '', phone: '(021) 7667788',
  },
  {
    id: 'kl-5', type: 'klinik', city: 'jakarta-pusat',
    name: 'Klinik 24 Jam Menteng',
    address: 'Jl. Hos Cokroaminoto No.45, Menteng, Jakarta Pusat',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Menteng',
    logoUrl: '', phone: '(021) 3145566',
  },
  {
    id: 'kl-6', type: 'klinik', city: 'bandung',
    name: 'Klinik 24 Jam Bandung Medika',
    address: 'Jl. Asia Afrika No.55, Braga, Kec. Sumur Bandung',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Bandung+Medika',
    logoUrl: '', phone: '(022) 4234567',
  },
  {
    id: 'kl-7', type: 'klinik', city: 'depok',
    name: 'Klinik 24 Jam Depok Sehat',
    address: 'Jl. Margonda Raya No.378, Kemiri Muka, Kec. Beji, Depok',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Depok+Sehat',
    logoUrl: '', phone: '(021) 7865567',
  },
  {
    id: 'kl-8', type: 'klinik', city: 'tangerang',
    name: 'Klinik 24 Jam Tangerang Medika',
    address: 'Jl. Daan Mogot No.22, Batu Ceper, Tangerang',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Tangerang+Medika',
    logoUrl: '', phone: '(021) 55712345',
  },
  {
    id: 'kl-9', type: 'klinik', city: 'bekasi',
    name: 'Klinik 24 Jam Bekasi Utama',
    address: 'Jl. Ahmad Yani No.100, Marga Jaya, Bekasi Selatan',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Bekasi+Utama',
    logoUrl: '', phone: '(021) 88905678',
  },
]

export function getInstitutionsByCityAndType(cityId: string, type: InstitutionType): Institution[] {
  return institutions.filter(i => i.city === cityId && i.type === type)
}

export function getInstitutionById(id: string): Institution | undefined {
  return institutions.find(i => i.id === id)
}
