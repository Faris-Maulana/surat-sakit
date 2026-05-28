import type { Institution, InstitutionType } from '@/types'

export const cities = [
  { id: 'bogor', name: 'Kota Bogor' },
  { id: 'jakarta-selatan', name: 'Jakarta Selatan' },
  { id: 'jakarta-pusat', name: 'Jakarta Pusat' },
  { id: 'bandung', name: 'Kota Bandung' },
  { id: 'depok', name: 'Kota Depok' },
  { id: 'tangerang', name: 'Kota Tangerang' },
  { id: 'bekasi', name: 'Kota Bekasi' },
  { id: 'surabaya', name: 'Kota Surabaya' },
  { id: 'semarang', name: 'Kota Semarang' },
]

export const institutionTypes: { value: InstitutionType; label: string; icon: string }[] = [
  { value: 'rumah_sakit', label: 'Rumah Sakit', icon: '🏨' },
  { value: 'puskesmas', label: 'Puskesmas', icon: '🏥' },
  { value: 'klinik', label: 'Klinik 24 Jam', icon: '🏪' },
]

export const institutions: Institution[] = [
  // ═══════════════════════════════════════════
  //  RUMAH SAKIT
  // ═══════════════════════════════════════════

  // --- Bogor ---
  {
    id: 'rs-1', type: 'rumah_sakit', city: 'bogor',
    name: 'RSUD Kota Bogor',
    address: 'Jl. dr. Sumeru No.120, Menteng, Bogor Barat 16112',
    mapsUrl: 'https://maps.google.com/?q=RSUD+Kota+Bogor', logoUrl: '', phone: '(0251) 8324251',
  },
  {
    id: 'rs-2', type: 'rumah_sakit', city: 'bogor',
    name: 'RSHS Bogor (Salak)',
    address: 'Jl. Jenderal Sudirman No.89, Ciwaringin, Bogor Tengah 16121',
    mapsUrl: 'https://maps.google.com/?q=RS+Salak+Bogor', logoUrl: '', phone: '(0251) 8320583',
  },
  {
    id: 'rs-3', type: 'rumah_sakit', city: 'bogor',
    name: 'RS Hermina Bogor',
    address: 'Jl. Siliwangi No.2, Paledang, Bogor Tengah 16122',
    mapsUrl: 'https://maps.google.com/?q=RS+Hermina+Bogor', logoUrl: '', phone: '(0251) 8344444',
  },
  {
    id: 'rs-4', type: 'rumah_sakit', city: 'bogor',
    name: 'RS PMI Bogor',
    address: 'Jl. Jenderal Sudirman No.50, Ciwaringin, Bogor Tengah 16121',
    mapsUrl: 'https://maps.google.com/?q=RS+PMI+Bogor', logoUrl: '', phone: '(0251) 8321144',
  },

  // --- Jakarta Selatan ---
  {
    id: 'rs-5', type: 'rumah_sakit', city: 'jakarta-selatan',
    name: 'RSUP Fatmawati',
    address: 'Jl. RS Fatmawati Raya No.4, Cilandak Barat 12430',
    mapsUrl: 'https://maps.google.com/?q=RSUP+Fatmawati', logoUrl: '', phone: '(021) 7501524',
  },
  {
    id: 'rs-6', type: 'rumah_sakit', city: 'jakarta-selatan',
    name: 'RS Pondok Indah',
    address: 'Jl. Metro Duta No.3, Pondok Indah 12310',
    mapsUrl: 'https://maps.google.com/?q=RS+Pondok+Indah', logoUrl: '', phone: '(021) 7657525',
  },
  {
    id: 'rs-7', type: 'rumah_sakit', city: 'jakarta-selatan',
    name: 'RS Mayapada Jakarta',
    address: 'Jl. Lebak Bulus I No.29, Cilandak Barat 12440',
    mapsUrl: 'https://maps.google.com/?q=RS+Mayapada+Jakarta', logoUrl: '', phone: '(021) 75911600',
  },
  {
    id: 'rs-8', type: 'rumah_sakit', city: 'jakarta-selatan',
    name: 'RS Medistra',
    address: 'Jl. Jenderal Gatot Subroto Kav. 59, Kuningan 12950',
    mapsUrl: 'https://maps.google.com/?q=RS+Medistra', logoUrl: '', phone: '(021) 5250201',
  },
  {
    id: 'rs-9', type: 'rumah_sakit', city: 'jakarta-selatan',
    name: 'RS Siloam Semanggi',
    address: 'Jl. Garnisiun No.1, Karet Semanggi 12930',
    mapsUrl: 'https://maps.google.com/?q=RS+Siloam+Semanggi', logoUrl: '', phone: '(021) 29962888',
  },

  // --- Jakarta Pusat ---
  {
    id: 'rs-10', type: 'rumah_sakit', city: 'jakarta-pusat',
    name: 'RSUPN Dr. Cipto Mangunkusumo (RSCM)',
    address: 'Jl. Pangeran Diponegoro No.71, Kenari, Senen 10430',
    mapsUrl: 'https://maps.google.com/?q=RSCM+Jakarta', logoUrl: '', phone: '(021) 1500515',
  },
  {
    id: 'rs-11', type: 'rumah_sakit', city: 'jakarta-pusat',
    name: 'RS Pelni Petamburan',
    address: 'Jl. Petamburan IV No.1, Petamburan, Tanah Abang 10260',
    mapsUrl: 'https://maps.google.com/?q=RS+Pelni+Petamburan', logoUrl: '', phone: '(021) 5703006',
  },
  {
    id: 'rs-12', type: 'rumah_sakit', city: 'jakarta-pusat',
    name: 'RS St. Carolus',
    address: 'Jl. Salemba Raya No.41, Senen 10440',
    mapsUrl: 'https://maps.google.com/?q=RS+St+Carolus+Jakarta', logoUrl: '', phone: '(021) 3929111',
  },
  {
    id: 'rs-13', type: 'rumah_sakit', city: 'jakarta-pusat',
    name: 'RS Jakarta Eye Center',
    address: 'Jl. Teuku Cik Ditiro No.46, Menteng 10310',
    mapsUrl: 'https://maps.google.com/?q=RS+Jakarta+Eye+Center', logoUrl: '', phone: '(021) 3906363',
  },

  // --- Bandung ---
  {
    id: 'rs-14', type: 'rumah_sakit', city: 'bandung',
    name: 'RSUP Dr. Hasan Sadikin',
    address: 'Jl. Pasteur No.38, Pasteur, Sukajadi 40161',
    mapsUrl: 'https://maps.google.com/?q=RS+Hasan+Sadikin', logoUrl: '', phone: '(022) 2034953',
  },
  {
    id: 'rs-15', type: 'rumah_sakit', city: 'bandung',
    name: 'RS Borromeus',
    address: 'Jl. Ir. H. Juanda No.100, Dago, Coblong 40132',
    mapsUrl: 'https://maps.google.com/?q=RS+Borromeus+Bandung', logoUrl: '', phone: '(022) 2505060',
  },
  {
    id: 'rs-16', type: 'rumah_sakit', city: 'bandung',
    name: 'RS Santo Yusup',
    address: 'Jl. Cikutra No.5, Cikutra, Cibeunying Kidul 40124',
    mapsUrl: 'https://maps.google.com/?q=RS+Santo+Yusup+Bandung', logoUrl: '', phone: '(022) 7207777',
  },
  {
    id: 'rs-17', type: 'rumah_sakit', city: 'bandung',
    name: 'RS Kebon Jati',
    address: 'Jl. Kebon Jati No.18, Kramat, Andir 40181',
    mapsUrl: 'https://maps.google.com/?q=RS+Kebon+Jati+Bandung', logoUrl: '', phone: '(022) 6076777',
  },

  // --- Depok ---
  {
    id: 'rs-18', type: 'rumah_sakit', city: 'depok',
    name: 'RS Bhayangkara Brimob',
    address: 'Jl. Akses UI No.1, Kelapa Dua, Cimanggis 16951',
    mapsUrl: 'https://maps.google.com/?q=RS+Bhayangkara+Brimob+Depok', logoUrl: '', phone: '(021) 8724678',
  },
  {
    id: 'rs-19', type: 'rumah_sakit', city: 'depok',
    name: 'RS Universitas Indonesia',
    address: 'Kampus UI Depok, Pondok Cina, Beji 16424',
    mapsUrl: 'https://maps.google.com/?q=RS+Universitas+Indonesia', logoUrl: '', phone: '(021) 78849118',
  },
  {
    id: 'rs-20', type: 'rumah_sakit', city: 'depok',
    name: 'RS Citra Medika Depok',
    address: 'Jl. Raya Bogor Km.36, Sukamaju, Cilodong 16415',
    mapsUrl: 'https://maps.google.com/?q=RS+Citra+Medika+Depok', logoUrl: '', phone: '(021) 8741234',
  },

  // --- Tangerang ---
  {
    id: 'rs-21', type: 'rumah_sakit', city: 'tangerang',
    name: 'RS Siloam Tangerang',
    address: 'Jl. MH. Thamrin No.1, Cikokol 15117',
    mapsUrl: 'https://maps.google.com/?q=RS+Siloam+Tangerang', logoUrl: '', phone: '(021) 5589000',
  },
  {
    id: 'rs-22', type: 'rumah_sakit', city: 'tangerang',
    name: 'RS Sari Asih Tangerang',
    address: 'Jl. Raya Daan Mogot Km.16, Cimone 15114',
    mapsUrl: 'https://maps.google.com/?q=RS+Sari+Asih+Tangerang', logoUrl: '', phone: '(021) 5519999',
  },
  {
    id: 'rs-23', type: 'rumah_sakit', city: 'tangerang',
    name: 'RS EMC Tangerang',
    address: 'Jl. Raya Serpong Km.7, Pakulonan, Serpong Utara 15325',
    mapsUrl: 'https://maps.google.com/?q=RS+EMC+Tangerang', logoUrl: '', phone: '(021) 7562891',
  },

  // --- Bekasi ---
  {
    id: 'rs-24', type: 'rumah_sakit', city: 'bekasi',
    name: 'RS Anna Medika',
    address: 'Jl. Raya Narogong No.76, Bojong Menteng, Rawalumbu 17117',
    mapsUrl: 'https://maps.google.com/?q=RS+Anna+Medika+Bekasi', logoUrl: '', phone: '(021) 82607777',
  },
  {
    id: 'rs-25', type: 'rumah_sakit', city: 'bekasi',
    name: 'RS Mitra Keluarga Bekasi',
    address: 'Jl. Jenderal Ahmad Yani No.1, Marga Jaya, Bekasi Selatan 17141',
    mapsUrl: 'https://maps.google.com/?q=RS+Mitra+Keluarga+Bekasi', logoUrl: '', phone: '(021) 8842000',
  },
  {
    id: 'rs-26', type: 'rumah_sakit', city: 'bekasi',
    name: 'RS Permata Bekasi',
    address: 'Jl. Chairil Anwar No.55, Margahayu, Bekasi Timur 17113',
    mapsUrl: 'https://maps.google.com/?q=RS+Permata+Bekasi', logoUrl: '', phone: '(021) 8808888',
  },

  // --- Surabaya ---
  {
    id: 'rs-27', type: 'rumah_sakit', city: 'surabaya',
    name: 'RSUD Dr. Soetomo',
    address: 'Jl. Mayjen Prof. Dr. Moestopo No.6-8, Airlangga, Gubeng 60286',
    mapsUrl: 'https://maps.google.com/?q=RSUD+Dr+Soetomo', logoUrl: '', phone: '(031) 5501000',
  },
  {
    id: 'rs-28', type: 'rumah_sakit', city: 'surabaya',
    name: 'RS Siloam Surabaya',
    address: 'Jl. Raya Gubeng No.70, Gubeng 60281',
    mapsUrl: 'https://maps.google.com/?q=RS+Siloam+Surabaya', logoUrl: '', phone: '(031) 5015777',
  },
  {
    id: 'rs-29', type: 'rumah_sakit', city: 'surabaya',
    name: 'RS Dr. Ramelan',
    address: 'Jl. Gadung No.1, Jagir, Wonokromo 60244',
    mapsUrl: 'https://maps.google.com/?q=RS+Dr+Ramelan', logoUrl: '', phone: '(031) 8412424',
  },
  {
    id: 'rs-30', type: 'rumah_sakit', city: 'surabaya',
    name: 'RS William Booth',
    address: 'Jl. Diponegoro No.34, Darmo, Wonokromo 60241',
    mapsUrl: 'https://maps.google.com/?q=RS+William+Booth+Surabaya', logoUrl: '', phone: '(031) 5672040',
  },

  // --- Semarang ---
  {
    id: 'rs-31', type: 'rumah_sakit', city: 'semarang',
    name: 'RSUP Dr. Kariadi',
    address: 'Jl. Dr. Sutomo No.16, Randusari, Semarang Selatan 50243',
    mapsUrl: 'https://maps.google.com/?q=RSUP+Dr+Kariadi', logoUrl: '', phone: '(024) 8413471',
  },
  {
    id: 'rs-32', type: 'rumah_sakit', city: 'semarang',
    name: 'RS Telogorejo',
    address: 'Jl. KH. Ahmad Dahlan No.11, Pekunden, Semarang Tengah 50131',
    mapsUrl: 'https://maps.google.com/?q=RS+Telogorejo', logoUrl: '', phone: '(024) 86448110',
  },
  {
    id: 'rs-33', type: 'rumah_sakit', city: 'semarang',
    name: 'RS Elisabeth Semarang',
    address: 'Jl. Imam Bonjol No.139, Sekayu, Semarang Tengah 50131',
    mapsUrl: 'https://maps.google.com/?q=RS+Elisabeth+Semarang', logoUrl: '', phone: '(024) 8412545',
  },

  // ═══════════════════════════════════════════
  //  PUSKESMAS
  // ═══════════════════════════════════════════

  // --- Bogor ---
  {
    id: 'pkm-1', type: 'puskesmas', city: 'bogor',
    name: 'Puskesmas Bogor Tengah',
    address: 'Jl. Merdeka No.116, Babakan, Bogor Tengah 16122',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bogor+Tengah', logoUrl: '', phone: '(0251) 8322250',
  },
  {
    id: 'pkm-2', type: 'puskesmas', city: 'bogor',
    name: 'Puskesmas Bogor Utara',
    address: 'Jl. Raya Pajajaran No.99, Bantarjati, Bogor Utara 16153',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bogor+Utara', logoUrl: '', phone: '(0251) 8322251',
  },
  {
    id: 'pkm-3', type: 'puskesmas', city: 'bogor',
    name: 'Puskesmas Bogor Barat',
    address: 'Jl. Batu Tulis No.33, Batu Tulis, Bogor Barat 16113',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bogor+Barat', logoUrl: '', phone: '(0251) 8322252',
  },
  {
    id: 'pkm-4', type: 'puskesmas', city: 'bogor',
    name: 'Puskesmas Bogor Selatan',
    address: 'Jl. Pahlawan No.55, Empang, Bogor Selatan 16132',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bogor+Selatan', logoUrl: '', phone: '(0251) 8322253',
  },
  {
    id: 'pkm-5', type: 'puskesmas', city: 'bogor',
    name: 'Puskesmas Bogor Timur',
    address: 'Jl. Raya Cibinong No.68, Katulampa, Bogor Timur 16114',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bogor+Timur', logoUrl: '', phone: '(0251) 8322254',
  },
  {
    id: 'pkm-6', type: 'puskesmas', city: 'bogor',
    name: 'Puskesmas Tanah Sareal',
    address: 'Jl. Tanah Sareal No.44, Tanah Sareal, Bogor 16161',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Tanah+Sareal', logoUrl: '', phone: '(0251) 8312345',
  },

  // --- Jakarta Selatan ---
  {
    id: 'pkm-7', type: 'puskesmas', city: 'jakarta-selatan',
    name: 'Puskesmas Kecamatan Kebayoran Baru',
    address: 'Jl. KH. Ahmad Dahlan No.18, Kramat Pela 12130',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Kebayoran+Baru', logoUrl: '', phone: '(021) 7392245',
  },
  {
    id: 'pkm-8', type: 'puskesmas', city: 'jakarta-selatan',
    name: 'Puskesmas Kelurahan Cilandak',
    address: 'Jl. Cilandak KKO No.12, Cilandak Timur 12560',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Cilandak', logoUrl: '', phone: '(021) 7801234',
  },
  {
    id: 'pkm-9', type: 'puskesmas', city: 'jakarta-selatan',
    name: 'Puskesmas Kecamatan Pancoran',
    address: 'Jl. Pengadegan Timur No.5, Pancoran 12770',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Pancoran', logoUrl: '', phone: '(021) 7971234',
  },
  {
    id: 'pkm-10', type: 'puskesmas', city: 'jakarta-selatan',
    name: 'Puskesmas Kecamatan Mampang Prapatan',
    address: 'Jl. Mampang Prapatan XV No.2, Mampang 12790',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Mampang+Prapatan', logoUrl: '', phone: '(021) 7945678',
  },

  // --- Jakarta Pusat ---
  {
    id: 'pkm-11', type: 'puskesmas', city: 'jakarta-pusat',
    name: 'Puskesmas Kecamatan Senen',
    address: 'Jl. Kramat Raya No.23, Senen 10450',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Senen', logoUrl: '', phone: '(021) 3865567',
  },
  {
    id: 'pkm-12', type: 'puskesmas', city: 'jakarta-pusat',
    name: 'Puskesmas Kecamatan Menteng',
    address: 'Jl. Cikini II No.5, Menteng 10310',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Menteng', logoUrl: '', phone: '(021) 31924567',
  },
  {
    id: 'pkm-13', type: 'puskesmas', city: 'jakarta-pusat',
    name: 'Puskesmas Kecamatan Tanah Abang',
    address: 'Jl. Karet Bivak No.2, Karet Tengsin 10220',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Tanah+Abang', logoUrl: '', phone: '(021) 5703456',
  },
  {
    id: 'pkm-14', type: 'puskesmas', city: 'jakarta-pusat',
    name: 'Puskesmas Kecamatan Gambir',
    address: 'Jl. K.H. Hasyim Ashari No.1, Gambir 10110',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Gambir', logoUrl: '', phone: '(021) 3523456',
  },

  // --- Bandung ---
  {
    id: 'pkm-15', type: 'puskesmas', city: 'bandung',
    name: 'Puskesmas Kecamatan Bandung Wetan',
    address: 'Jl. Tamansari No.84, Tamansari, Bandung Wetan 40116',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bandung+Wetan', logoUrl: '', phone: '(022) 4201555',
  },
  {
    id: 'pkm-16', type: 'puskesmas', city: 'bandung',
    name: 'Puskesmas Kecamatan Cibeunying Kidul',
    address: 'Jl. Cikutra No.174, Cikutra, Cibeunying Kidul 40124',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Cibeunying+Kidul', logoUrl: '', phone: '(022) 7201789',
  },
  {
    id: 'pkm-17', type: 'puskesmas', city: 'bandung',
    name: 'Puskesmas Kecamatan Sukajadi',
    address: 'Jl. Sukajadi No.154, Sukawarna, Sukajadi 40162',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Sukajadi', logoUrl: '', phone: '(022) 2032345',
  },
  {
    id: 'pkm-18', type: 'puskesmas', city: 'bandung',
    name: 'Puskesmas Kecamatan Cicendo',
    address: 'Jl. Pajajaran No.22, Pasirkaliki, Cicendo 40173',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Cicendo', logoUrl: '', phone: '(022) 6012345',
  },

  // --- Depok ---
  {
    id: 'pkm-19', type: 'puskesmas', city: 'depok',
    name: 'Puskesmas Kecamatan Pancoran Mas',
    address: 'Jl. Raya Sawangan No.21, Pancoran Mas 16431',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Pancoran+Mas', logoUrl: '', phone: '(021) 77885678',
  },
  {
    id: 'pkm-20', type: 'puskesmas', city: 'depok',
    name: 'Puskesmas Kecamatan Beji',
    address: 'Jl. Kober No.32, Beji 16421',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Kecamatan+Beji', logoUrl: '', phone: '(021) 77212211',
  },
  {
    id: 'pkm-21', type: 'puskesmas', city: 'depok',
    name: 'Puskesmas Kecamatan Cimanggis',
    address: 'Jl. Raya Bogor Km.35, Tugu, Cimanggis 16451',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Cimanggis', logoUrl: '', phone: '(021) 8745678',
  },
  {
    id: 'pkm-22', type: 'puskesmas', city: 'depok',
    name: 'Puskesmas Kecamatan Sukmajaya',
    address: 'Jl. Kartini No.58, Sukmajaya 16412',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Sukmajaya', logoUrl: '', phone: '(021) 7871234',
  },

  // --- Tangerang ---
  {
    id: 'pkm-23', type: 'puskesmas', city: 'tangerang',
    name: 'Puskesmas Kecamatan Tangerang',
    address: 'Jl. Bhayangkara No.17, Sukasari 15118',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Kecamatan+Tangerang', logoUrl: '', phone: '(021) 5582345',
  },
  {
    id: 'pkm-24', type: 'puskesmas', city: 'tangerang',
    name: 'Puskesmas Kecamatan Cipondoh',
    address: 'Jl. Raya Cipondoh No.23, Cipondoh Makmur 15148',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Cipondoh', logoUrl: '', phone: '(021) 55745678',
  },
  {
    id: 'pkm-25', type: 'puskesmas', city: 'tangerang',
    name: 'Puskesmas Kecamatan Karang Tengah',
    address: 'Jl. Raya Karang Tengah No.10, Karang Tengah 15157',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Karang+Tengah', logoUrl: '', phone: '(021) 55712345',
  },
  {
    id: 'pkm-26', type: 'puskesmas', city: 'tangerang',
    name: 'Puskesmas Kecamatan Batuceper',
    address: 'Jl. Daan Mogot No.88, Batuceper 15122',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Batuceper', logoUrl: '', phone: '(021) 5501234',
  },

  // --- Bekasi ---
  {
    id: 'pkm-27', type: 'puskesmas', city: 'bekasi',
    name: 'Puskesmas Kecamatan Bekasi Timur',
    address: 'Jl. Pramuka No.44, Margahayu, Bekasi Timur 17113',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bekasi+Timur', logoUrl: '', phone: '(021) 8805678',
  },
  {
    id: 'pkm-28', type: 'puskesmas', city: 'bekasi',
    name: 'Puskesmas Kecamatan Bekasi Selatan',
    address: 'Jl. Raya Pekayon No.88, Pekayon Jaya, Bekasi Selatan 17148',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bekasi+Selatan', logoUrl: '', phone: '(021) 88906789',
  },
  {
    id: 'pkm-29', type: 'puskesmas', city: 'bekasi',
    name: 'Puskesmas Kecamatan Bekasi Utara',
    address: 'Jl. Raya Perjuangan No.33, Marga Mulya, Bekasi Utara 17123',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Bekasi+Utara', logoUrl: '', phone: '(021) 8856789',
  },
  {
    id: 'pkm-30', type: 'puskesmas', city: 'bekasi',
    name: 'Puskesmas Kecamatan Jatiasih',
    address: 'Jl. Jatiasih Raya No.12, Jatiasih 17421',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Jatiasih', logoUrl: '', phone: '(021) 8223456',
  },

  // --- Surabaya ---
  {
    id: 'pkm-31', type: 'puskesmas', city: 'surabaya',
    name: 'Puskesmas Kecamatan Gubeng',
    address: 'Jl. Gubeng Pojok No.1, Gubeng 60281',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Gubeng', logoUrl: '', phone: '(031) 5034567',
  },
  {
    id: 'pkm-32', type: 'puskesmas', city: 'surabaya',
    name: 'Puskesmas Kecamatan Wonokromo',
    address: 'Jl. Ngagel Jaya Tengah No.8, Wonokromo 60244',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Wonokromo', logoUrl: '', phone: '(031) 8415678',
  },
  {
    id: 'pkm-33', type: 'puskesmas', city: 'surabaya',
    name: 'Puskesmas Kecamatan Sukomanunggal',
    address: 'Jl. Raya Sukomanunggal No.44, Sukomanunggal 60188',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Sukomanunggal', logoUrl: '', phone: '(031) 7312345',
  },
  {
    id: 'pkm-34', type: 'puskesmas', city: 'surabaya',
    name: 'Puskesmas Kecamatan Tambaksari',
    address: 'Jl. Raya Kertomenanggal No.77, Tambaksari 60136',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Tambaksari', logoUrl: '', phone: '(031) 3764567',
  },

  // --- Semarang ---
  {
    id: 'pkm-35', type: 'puskesmas', city: 'semarang',
    name: 'Puskesmas Kecamatan Semarang Tengah',
    address: 'Jl. Pemuda No.52, Semarang Tengah 50131',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Semarang+Tengah', logoUrl: '', phone: '(024) 3545678',
  },
  {
    id: 'pkm-36', type: 'puskesmas', city: 'semarang',
    name: 'Puskesmas Kecamatan Semarang Utara',
    address: 'Jl. Taman Tlogosari Raya No.5, Semarang Utara 50173',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Semarang+Utara', logoUrl: '', phone: '(024) 6712345',
  },
  {
    id: 'pkm-37', type: 'puskesmas', city: 'semarang',
    name: 'Puskesmas Kecamatan Pedurungan',
    address: 'Jl. Brigjen Sudiarto No.88, Pedurungan 50192',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Pedurungan', logoUrl: '', phone: '(024) 6789012',
  },
  {
    id: 'pkm-38', type: 'puskesmas', city: 'semarang',
    name: 'Puskesmas Kecamatan Tembalang',
    address: 'Jl. Tembalang Raya No.18, Tembalang 50271',
    mapsUrl: 'https://maps.google.com/?q=Puskesmas+Tembalang', logoUrl: '', phone: '(024) 7654321',
  },

  // ═══════════════════════════════════════════
  //  KLINIK 24 JAM
  // ═══════════════════════════════════════════

  // --- Bogor ---
  {
    id: 'kl-1', type: 'klinik', city: 'bogor',
    name: 'Klinik 24 Jam Sehat Farma Bogor',
    address: 'Jl. Siliwangi No.10, Babakan, Bogor Tengah 16122',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Sehat+Farma+Bogor', logoUrl: '', phone: '(0251) 8586677',
  },
  {
    id: 'kl-2', type: 'klinik', city: 'bogor',
    name: 'Klinik 24 Jam Medika Bogor',
    address: 'Jl. Raya Tajur No.89, Muara Sari, Bogor Selatan 16134',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Medika+Bogor', logoUrl: '', phone: '(0251) 8344556',
  },
  {
    id: 'kl-3', type: 'klinik', city: 'bogor',
    name: 'Klinik 24 Jam Kimia Farma Bogor',
    address: 'Jl. Ir. H. Juanda No.33, Kedung Halang, Bogor Utara 16158',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Kimia+Farma+Bogor', logoUrl: '', phone: '(0251) 8332211',
  },
  {
    id: 'kl-4', type: 'klinik', city: 'bogor',
    name: 'Klinik 24 Jam Bogor Indah',
    address: 'Jl. Pajajaran Indah No.5, Baranangsiang, Bogor Timur 16143',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Bogor+Indah', logoUrl: '', phone: '(0251) 8399887',
  },

  // --- Jakarta Selatan ---
  {
    id: 'kl-5', type: 'klinik', city: 'jakarta-selatan',
    name: 'Klinik 24 Jam Pondok Indah',
    address: 'Jl. Margaguna Raya No.1, Pondok Indah 12140',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Pondok+Indah', logoUrl: '', phone: '(021) 7667788',
  },
  {
    id: 'kl-6', type: 'klinik', city: 'jakarta-selatan',
    name: 'Klinik 24 Jam Fatmawati Medika',
    address: 'Jl. RS Fatmawati Raya No.28, Cilandak Barat 12430',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Fatmawati+Medika', logoUrl: '', phone: '(021) 7506789',
  },
  {
    id: 'kl-7', type: 'klinik', city: 'jakarta-selatan',
    name: 'Klinik 24 Jam Tebet',
    address: 'Jl. Tebet Timur Dalam Raya No.15, Tebet 12810',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Tebet', logoUrl: '', phone: '(021) 83745678',
  },
  {
    id: 'kl-8', type: 'klinik', city: 'jakarta-selatan',
    name: 'Klinik 24 Jam Mampang',
    address: 'Jl. Mampang Prapatan Raya No.27, Mampang 12790',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Mampang', logoUrl: '', phone: '(021) 79123456',
  },

  // --- Jakarta Pusat ---
  {
    id: 'kl-9', type: 'klinik', city: 'jakarta-pusat',
    name: 'Klinik 24 Jam Menteng',
    address: 'Jl. Hos Cokroaminoto No.45, Menteng 10310',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Menteng', logoUrl: '', phone: '(021) 3145566',
  },
  {
    id: 'kl-10', type: 'klinik', city: 'jakarta-pusat',
    name: 'Klinik 24 Jam Salemba',
    address: 'Jl. Salemba Raya No.33, Senen 10440',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Salemba', logoUrl: '', phone: '(021) 39845678',
  },
  {
    id: 'kl-11', type: 'klinik', city: 'jakarta-pusat',
    name: 'Klinik 24 Jam Kramat',
    address: 'Jl. Kramat Raya No.79, Senen 10450',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Kramat', logoUrl: '', phone: '(021) 39912345',
  },

  // --- Bandung ---
  {
    id: 'kl-12', type: 'klinik', city: 'bandung',
    name: 'Klinik 24 Jam Bandung Medika',
    address: 'Jl. Asia Afrika No.55, Braga, Sumur Bandung 40111',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Bandung+Medika', logoUrl: '', phone: '(022) 4234567',
  },
  {
    id: 'kl-13', type: 'klinik', city: 'bandung',
    name: 'Klinik 24 Jam Cihampelas',
    address: 'Jl. Cihampelas No.72, Cipaganti, Coblong 40131',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Cihampelas', logoUrl: '', phone: '(022) 2045789',
  },
  {
    id: 'kl-14', type: 'klinik', city: 'bandung',
    name: 'Klinik 24 Jam Dago',
    address: 'Jl. Ir. H. Juanda No.155, Dago, Coblong 40135',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Dago', logoUrl: '', phone: '(022) 2506789',
  },

  // --- Depok ---
  {
    id: 'kl-15', type: 'klinik', city: 'depok',
    name: 'Klinik 24 Jam Depok Sehat',
    address: 'Jl. Margonda Raya No.378, Kemiri Muka, Beji 16423',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Depok+Sehat', logoUrl: '', phone: '(021) 7865567',
  },
  {
    id: 'kl-16', type: 'klinik', city: 'depok',
    name: 'Klinik 24 Jam Citayam Medika',
    address: 'Jl. Raya Citayam No.55, Bojonggede 16951',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Citayam+Medika', logoUrl: '', phone: '(021) 87734567',
  },
  {
    id: 'kl-17', type: 'klinik', city: 'depok',
    name: 'Klinik 24 Jam Sawangan',
    address: 'Jl. Raya Sawangan No.88, Pancoran Mas 16431',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Sawangan', logoUrl: '', phone: '(021) 77889900',
  },

  // --- Tangerang ---
  {
    id: 'kl-18', type: 'klinik', city: 'tangerang',
    name: 'Klinik 24 Jam Tangerang Medika',
    address: 'Jl. Daan Mogot No.22, Batuceper 15122',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Tangerang+Medika', logoUrl: '', phone: '(021) 55712345',
  },
  {
    id: 'kl-19', type: 'klinik', city: 'tangerang',
    name: 'Klinik 24 Jam Ciledug',
    address: 'Jl. HOS Cokroaminoto No.25, Ciledug 15153',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Ciledug', logoUrl: '', phone: '(021) 55678901',
  },
  {
    id: 'kl-20', type: 'klinik', city: 'tangerang',
    name: 'Klinik 24 Jam Serpong',
    address: 'Jl. Raya Serpong No.62, Serpong 15310',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Serpong', logoUrl: '', phone: '(021) 75612345',
  },

  // --- Bekasi ---
  {
    id: 'kl-21', type: 'klinik', city: 'bekasi',
    name: 'Klinik 24 Jam Bekasi Utama',
    address: 'Jl. Ahmad Yani No.100, Marga Jaya, Bekasi Selatan 17141',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Bekasi+Utama', logoUrl: '', phone: '(021) 88905678',
  },
  {
    id: 'kl-22', type: 'klinik', city: 'bekasi',
    name: 'Klinik 24 Jam Galaxy',
    address: 'Jl. Galaxy Raya No.12, Jati Makmur, Pondok Gede 17411',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Galaxy', logoUrl: '', phone: '(021) 88123456',
  },
  {
    id: 'kl-23', type: 'klinik', city: 'bekasi',
    name: 'Klinik 24 Jam Kranji',
    address: 'Jl. Raya Kranji No.66, Kranji, Bekasi Barat 17137',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Kranji', logoUrl: '', phone: '(021) 88765432',
  },

  // --- Surabaya ---
  {
    id: 'kl-24', type: 'klinik', city: 'surabaya',
    name: 'Klinik 24 Jam Surabaya Medika',
    address: 'Jl. Raya Darmo No.50, Darmo, Wonokromo 60241',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Surabaya+Medika', logoUrl: '', phone: '(031) 5678901',
  },
  {
    id: 'kl-25', type: 'klinik', city: 'surabaya',
    name: 'Klinik 24 Jam Gubeng',
    address: 'Jl. Gubeng Kertajaya No.28, Gubeng 60282',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Gubeng', logoUrl: '', phone: '(031) 5023456',
  },
  {
    id: 'kl-26', type: 'klinik', city: 'surabaya',
    name: 'Klinik 24 Jam Rungkut',
    address: 'Jl. Raya Rungkut Industri No.15, Rungkut 60293',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Rungkut', logoUrl: '', phone: '(031) 8723456',
  },

  // --- Semarang ---
  {
    id: 'kl-27', type: 'klinik', city: 'semarang',
    name: 'Klinik 24 Jam Semarang Medika',
    address: 'Jl. Pandanaran No.44, Pekunden, Semarang Tengah 50131',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Semarang+Medika', logoUrl: '', phone: '(024) 8412345',
  },
  {
    id: 'kl-28', type: 'klinik', city: 'semarang',
    name: 'Klinik 24 Jam Tlogosari',
    address: 'Jl. Tlogosari Raya No.33, Tlogosari, Semarang Timur 50176',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Tlogosari', logoUrl: '', phone: '(024) 6723456',
  },
  {
    id: 'kl-29', type: 'klinik', city: 'semarang',
    name: 'Klinik 24 Jam Banyumanik',
    address: 'Jl. Prof. Soedarto No.12, Banyumanik 50268',
    mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+Banyumanik', logoUrl: '', phone: '(024) 7654321',
  },
]

export function getInstitutionsByCityAndType(cityId: string, type: InstitutionType): Institution[] {
  return institutions.filter(i => i.city === cityId && i.type === type)
}

export function getInstitutionById(id: string): Institution | undefined {
  return institutions.find(i => i.id === id)
}
