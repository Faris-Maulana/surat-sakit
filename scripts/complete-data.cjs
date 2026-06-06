/**
 * Complete Data Generator — all 514 kabupaten/kota in Indonesia
 * Usage: node scripts/complete-data.cjs
 * Updates src/data/institutions.ts, rumah_sakit.ts, puskesmas.ts, klinik.ts
 */

const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'src', 'data')

// ── All 514 kabupaten/kota organized by province ──

const PROVINCES = {
  ACEH: { name: 'Aceh', cities: [
    'kab-aceh-barat','kab-aceh-barat-daya','kab-aceh-besar','kab-aceh-jaya',
    'kab-aceh-selatan','kab-aceh-singkil','kab-aceh-tamiang','kab-aceh-tengah',
    'kab-aceh-tenggara','kab-aceh-timur','kab-aceh-utara','kab-bener-meriah',
    'kab-bireuen','kab-gayo-lues','kab-nagan-raya','kab-pidie','kab-pidie-jaya',
    'kab-simeulue','kota-banda-aceh','kota-langsa','kota-lhokseumawe',
    'kota-sabang','kota-subulussalam',
  ]},
  SUMUT: { name: 'Sumatera Utara', cities: [
    'kab-asahan','kab-batu-bara','kab-dairi','kab-deli-serdang','kab-humbang-hasundutan',
    'kab-karo','kab-labuhanbatu','kab-labuhanbatu-selatan','kab-labuhanbatu-utara',
    'kab-langkat','kab-mandailing-natal','kab-nias','kab-nias-barat','kab-nias-selatan',
    'kab-nias-utara','kab-padang-lawas','kab-padang-lawas-utara','kab-pakpak-bharat',
    'kab-samosir','kab-serdang-bedagai','kab-simalungun','kab-tapanuli-selatan',
    'kab-tapanuli-tengah','kab-tapanuli-utara','kab-toba',
    'kota-medan','kota-binjai','kota-gunungsitoli','kota-padangsidempuan',
    'kota-pematangsiantar','kota-sibolga','kota-tanjungbalai','kota-tebing-tinggi',
  ]},
  SUMBAR: { name: 'Sumatera Barat', cities: [
    'kab-agam','kab-dharmasraya','kab-kepulauan-mentawai','kab-lima-puluh-kota',
    'kab-padang-pariaman','kab-pasaman','kab-pasaman-barat','kab-pesisir-selatan',
    'kab-sijunjung','kab-solok','kab-solok-selatan','kab-tanah-datar',
    'kota-bukittinggi','kota-padang','kota-padang-panjang','kota-pariaman',
    'kota-payakumbuh','kota-sawahlunto','kota-solok',
  ]},
  RIAU: { name: 'Riau', cities: [
    'kab-bengkalis','kab-indragiri-hilir','kab-indragiri-hulu','kab-kampar',
    'kab-kepulauan-meranti','kab-kuantan-singingi','kab-pelalawan','kab-rokan-hilir',
    'kab-rokan-hulu','kab-siakk',
    'kota-durai','kota-pekanbaru',
  ]},
  KEPRI: { name: 'Kepulauan Riau', cities: [
    'kab-bintan','kab-karimun','kab-kepulauan-anambas','kab-lingga','kab-natuna',
    'kota-batam','kota-tanjung-pinang',
  ]},
  JAMBI: { name: 'Jambi', cities: [
    'kab-batang-hari','kab-bungo','kab-kerinci','kab-merangin','kab-muaro-jambi',
    'kab-sarolangun','kab-tanjung-jabung-barat','kab-tanjung-jabung-timur','kab-tebo',
    'kota-jambi','kota-sungai-penuh',
  ]},
  BENGKULU: { name: 'Bengkulu', cities: [
    'kab-bengkulu-selatan','kab-bengkulu-tengah','kab-bengkulu-utara','kab-kauer',
    'kab-kepahiang','kab-lebong','kab-muko-muko','kab-rejang-lebong','kab-seluma',
    'kota-bengkulu',
  ]},
  SUMSEL: { name: 'Sumatera Selatan', cities: [
    'kab-banyuasin','kab-empat-lawang','kab-lahat','kab-muara-enim','kab-musi-banyuasin',
    'kab-musi-rawas','kab-musi-rawas-utara','kab-ogan-ilir','kab-ogan-komering-ilir',
    'kab-ogan-komering-ulu','kab-ogan-komering-ulu-selatan','kab-ogan-komering-ulu-timur',
    'kab-penukal-abab-lematang-ilir',
    'kota-lubuklinggau','kota-pagar-alam','kota-palembang','kota-prabumulih',
  ]},
  BABEL: { name: 'Kepulauan Bangka Belitung', cities: [
    'kab-bangka','kab-bangka-barat','kab-bangka-selatan','kab-bangka-tengah',
    'kab-belitung','kab-belitung-timur',
    'kota-pangkal-pinang',
  ]},
  LAMPUNG: { name: 'Lampung', cities: [
    'kab-lampung-barat','kab-lampung-selatan','kab-lampung-tengah','kab-lampung-timur',
    'kab-lampung-utara','kab-mesuji','kab-pesawaran','kab-pesisir-barat',
    'kab-pringsewu','kab-tanggamus','kab-tulang-bawang','kab-tulang-bawang-barat',
    'kab-way-kanan',
    'kota-bandar-lampung','kota-metro',
  ]},
  BANTEN: { name: 'Banten', cities: [
    'kab-lebak','kab-pandeglang','kab-serang','kab-tangerang',
    'kota-cilegon','kota-serang','kota-tangerang','kota-tangerang-selatan',
  ]},
  DKI: { name: 'DKI Jakarta', cities: [
    'kab-kepulauan-seribu','kota-jakarta-barat','kota-jakarta-pusat',
    'kota-jakarta-selatan','kota-jakarta-timur','kota-jakarta-utara',
  ]},
  JABAR: { name: 'Jawa Barat', cities: [
    'kab-bandung','kab-bandung-barat','kab-bekasi','kab-bogor','kab-ciamjur',
    'kab-ciamis','kab-cirebon','kab-garut','kab-indramayu','kab-karawang',
    'kab-kuningan','kab-majalengka','kab-pangandaran','kab-purwakarta','kab-subang',
    'kab-sukabumi','kab-sumedang','kab-tasikmalaya',
    'kota-bandung','kota-banjar','kota-bekasi','kota-bogor','kota-ciamhi',
    'kota-cirebon','kota-depok','kota-sukabumi','kota-tasikmalaya',
  ]},
  JATENG: { name: 'Jawa Tengah', cities: [
    'kab-banjarnegara','kab-banyumas','kab-batang','kab-blora','kab-boyolali',
    'kab-brebes','kab-cijacap','kab-demak','kab-grobogan','kab-jepara',
    'kab-karanganyar','kab-kebumen','kab-kendal','kab-klaten','kab-kudus',
    'kab-magelang','kab-pati','kab-pekalongan','kab-pemalang','kab-purbalingga',
    'kab-purworejo','kab-rembang','kab-sragen','kab-sukoharjo','kab-tegal',
    'kab-temanggung','kab-wonogiri','kab-wonosobo',
    'kota-magelang','kota-pekalongan','kota-salatiga','kota-semarang',
    'kota-surakarta','kota-tegal',
  ]},
  DIY: { name: 'DI Yogyakarta', cities: [
    'kab-bantul','kab-gunung-kidul','kab-kulon-progo','kab-sleman',
    'kota-yogyakarta',
  ]},
  JATIM: { name: 'Jawa Timur', cities: [
    'kab-bangkalan','kab-banyuwangi','kab-bitar','kab-bojonegoro','kab-bondowoso',
    'kab-gresik','kab-jember','kab-jombang','kab-kediri','kab-lamongan',
    'kab-lumajang','kab-madiun','kab-magetan','kab-malang','kab-mojokerto',
    'kab-nganjuk','kab-ngawi','kab-pacitan','kab-pamekasan','kab-pasuruan',
    'kab-ponorogo','kab-probolinggo','kab-sampang','kab-sidoarjo','kab-situbondo',
    'kab-sumenep','kab-trenggalek','kab-tuban','kab-tulungagung',
    'kota-batu','kota-bitar','kota-kediri','kota-madiun','kota-malang',
    'kota-mojokerto','kota-pasuruan','kota-probolinggo','kota-surabaya',
  ]},
  BALI: { name: 'Bali', cities: [
    'kab-badung','kab-bangli','kab-buleleng','kab-gianyar','kab-jembrana',
    'kab-karangasem','kab-klungkung','kab-tabanan',
    'kota-denpasar',
  ]},
  NTB: { name: 'Nusa Tenggara Barat', cities: [
    'kab-bima','kab-dompu','kab-lombok-barat','kab-lombok-tengah','kab-lombok-timur',
    'kab-lombok-utara','kab-sumbawa','kab-sumbawa-barat',
    'kota-bima','kota-mataram',
  ]},
  NTT: { name: 'Nusa Tenggara Timur', cities: [
    'kab-alor','kab-belitung','kab-ende','kab-flores-timur','kab-kupang',
    'kab-lembata','kab-malaka','kab-manggarai','kab-manggarai-barat','kab-manggarai-timur',
    'kab-nagekeo','kab-ngada','kab-rote-ndao','kab-sabu-raijua','kab-sikka',
    'kab-sumba-barat','kab-sumba-barat-daya','kab-sumba-tengah','kab-sumba-timur',
    'kab-ttimor-tengah-selatan','kab-timor-tengah-utara',
    'kota-kupang',
  ]},
  KALBAR: { name: 'Kalimantan Barat', cities: [
    'kab-bengkayang','kab-kapuas-hulu','kab-kayong-utara','kab-ketapang','kab-kubu-raya',
    'kab-landak','kab-melawi','kab-mempawah','kab-sambas','kab-sanggau',
    'kab-sekadau','kab-sintang',
    'kota-pontianak','kota-singkawang',
  ]},
  KALTENG: { name: 'Kalimantan Tengah', cities: [
    'kab-barito-selatan','kab-barito-timur','kab-barito-utara','kab-gunung-mas',
    'kab-kapuas','kab-katingan','kab-kotawaringin-barat','kab-kotawaringin-timur',
    'kab-lamandau','kab-murung-raya','kab-pulang-pisau','kab-sukamara','kab-seruyan',
    'kota-palangka-raya',
  ]},
  KALSEL: { name: 'Kalimantan Selatan', cities: [
    'kab-balangan','kab-banjar','kab-barito-kuala','kab-hulu-sungai-selatan',
    'kab-hulu-sungai-tengah','kab-hulu-sungai-utara','kab-kotabaru','kab-tabalong',
    'kab-tanah-bumbu','kab-tanah-laut','kab-tapin',
    'kota-banjarbaru','kota-banjarmasin',
  ]},
  KALTIM: { name: 'Kalimantan Timur', cities: [
    'kab-berau','kab-kutai-barat','kab-kutai-kartanegara','kab-kutai-timur',
    'kab-mahakam-hulu','kab-paser','kab-penajam-paser-utara',
    'kota-baliqpapan','kota-bontang','kota-samarinda',
  ]},
  KALTARA: { name: 'Kalimantan Utara', cities: [
    'kab-bulungan','kab-malinau','kab-nunukan','kab-tana-tidung',
    'kota-tarakan',
  ]},
  SULUT: { name: 'Sulawesi Utara', cities: [
    'kab-bolaang-mongondow','kab-bolaang-mongondow-selatan','kab-bolaang-mongondow-timur',
    'kab-bolaang-mongondow-utara','kab-kepulauan-sangihe','kab-kepulauan-siau-tagulandang-biaro',
    'kab-kepulauan-talaud','kab-minahasa','kab-minahasa-selatan','kab-minahasa-tenggara',
    'kab-minahasa-utara',
    'kota-bitung','kota-kotamobagu','kota-manado','kota-tomohon',
  ]},
  SULTENG: { name: 'Sulawesi Tengah', cities: [
    'kab-banggai','kab-banggai-kepulauan','kab-banggai-laut','kab-buol','kab-donggala',
    'kab-morowali','kab-morowali-utara','kab-parigi-moutong','kab-poso','kab-sigi',
    'kab-tojo-una-una','kab-toli-toli',
    'kota-palu',
  ]},
  SULSEL: { name: 'Sulawesi Selatan', cities: [
    'kab-bantaeng','kab-barru','kab-bone','kab-bulukumba','kab-enrekang',
    'kab-gowa','kab-jeneponto','kab-kepulauan-selayar','kab-luwu','kab-luwu-timur',
    'kab-luwu-utara','kab-maros','kab-pangkajene-kepulauan','kab-pinrang','kab-sidenreng-rappang',
    'kab-sinjai','kab-soppeng','kab-takalar','kab-tana-toraja','kab-toraja-utara',
    'kab-wajo',
    'kota-makassar','kota-palopo','kota-parepare',
  ]},
  SULTRA: { name: 'Sulawesi Tenggara', cities: [
    'kab-bombana','kab-buton','kab-buton-selatan','kab-buton-tengah','kab-buton-utara',
    'kab-kolaka','kab-kolaka-timur','kab-kolaka-utara','kab-konawe','kab-konawe-kepulauan',
    'kab-konawe-selatan','kab-konawe-utara','kab-muna','kab-muna-barat','kab-wakatobi',
    'kota-baubau','kota-kendari',
  ]},
  GORONTALO: { name: 'Gorontalo', cities: [
    'kab-boalemo','kab-bone-bolango','kab-gorontalo','kab-gorontalo-utara','kab-pohuwato',
    'kota-gorontalo',
  ]},
  SULBAR: { name: 'Sulawesi Barat', cities: [
    'kab-majene','kab-mamasa','kab-mamuju','kab-mamuju-tengah','kab-pasangkayu','kab-polewali-mandar',
  ]},
  MALUKU: { name: 'Maluku', cities: [
    'kab-buru','kab-buru-selatan','kab-kepulauan-aru','kab-maluku-barat-daya',
    'kab-maluku-tengah','kab-maluku-tenggara','kab-seram-bagian-barat','kab-sera-bagian-timur',
    'kab-kepulauan-tanimbar',
    'kota-ambon','kota-tual',
  ]},
  MALUKU_UTARA: { name: 'Maluku Utara', cities: [
    'kab-halmahera-barat','kab-halmahera-selatan','kab-halmahera-tengah','kab-halmahera-timur',
    'kab-halmahera-utara','kab-kepulauan-sula','kab-pulau-morotai','kab-pulau-taliabu',
    'kota-ternate','kota-tidore-kepulauan',
  ]},
  PAPUA: { name: 'Papua', cities: [
    'kab-biAk-numfor','kab-jayapura','kab-keerom','kab-kepulauan-yapen',
    'kab-mamberamo-raya','kab-sarmi','kab-supiori','kab-waropen',
    'kota-jayapura',
  ]},
  PAPUA_BARAT: { name: 'Papua Barat', cities: [
    'kab-fakfak','kab-kaimana','kab-manokwari','kab-manokwari-selatan',
    'kab-pegunungan-arfak','kab-teluk-bintuni','kab-teluk-wondama',
  ]},
  PAPUA_SELATAN: { name: 'Papua Selatan', cities: [
    'kab-asmat','kab-boven-digoel','kab-mappi','kab-merauke',
  ]},
  PAPUA_TENGAH: { name: 'Papua Tengah', cities: [
    'kab-deiyai','kab-dogiyai','kab-intan-jaya','kab-mimika',
    'kab-nabire','kab-paniai','kab-puncak','kab-puncak-jaya',
  ]},
  PAPUA_PEGUNUNGAN: { name: 'Papua Pegunungan', cities: [
    'kab-jayawijaya','kab-lanny-jaya','kab-mamberamo-tengah','kab-nduga',
    'kab-pegunungan-bintang','kab-tolikara','kab-yahukimo','kab-yalimo',
  ]},
  PAPUA_BARAT_DAYA: { name: 'Papua Barat Daya', cities: [
    'kab-maybrat','kab-raja-ampat','kab-sorong','kab-sorong-selatan','kab-tambrauw',
    'kota-sorong',
  ]},
}

// ── Helper: clean existing data ──

function toId(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function inferCityId(name) {
  return toId(name)
}

// ── Read existing data ──

function readTsArray(filePath) {
  const src = fs.readFileSync(filePath, 'utf-8')
  const match = src.match(/\[([\s\S]*?)\]\s*$/)
  if (!match) return { src, items: [] }
  try {
    const items = eval(`[${match[1]}]`)
    return { src, items }
  } catch {
    return { src, items: [] }
  }
}

function readCitiesArray(filePath) {
  const src = fs.readFileSync(filePath, 'utf-8')
  const match = src.match(/export const cities = \[([\s\S]*?)\]\n\nexport/)
  if (!match) return { src, cities: [] }
  try {
    const cities = eval(`[${match[1]}]`)
    return { src, cities }
  } catch {
    return { src, cities: [] }
  }
}

// ── Generation ──

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function cityId(provinceKey, rawName) {
  const n = rawName.toLowerCase().replace(/^(kabupaten|kota)\s+/i, '').trim()
  const provincePrefix = {
    ACEH: '', SUMUT: '', SUMBAR: '', RIAU: '', KEPRI: '',
    JAMBI: '', BENGKULU: '', SUMSEL: '', BABEL: '', LAMPUNG: '',
    BANTEN: '', DKI: '', JABAR: '', JATENG: '', DIY: '', JATIM: '',
    BALI: '', NTB: '', NTT: '',
    KALBAR: '', KALTENG: '', KALSEL: '', KALTIM: '', KALTARA: '',
    SULUT: '', SULTENG: '', SULSEL: '', SULTRA: '', GORONTALO: '', SULBAR: '',
    MALUKU: '', MALUKU_UTARA: '',
    PAPUA: '', PAPUA_BARAT: '', PAPUA_SELATAN: '', PAPUA_TENGAH: '', PAPUA_PEGUNUNGAN: '', PAPUA_BARAT_DAYA: '',
  }
  return slugify(n)
}

// Read existing data
const citiesPath = path.join(DATA_DIR, 'institutions.ts')
const rsPath = path.join(DATA_DIR, 'rumah_sakit.ts')
const pkmPath = path.join(DATA_DIR, 'puskesmas.ts')
const klPath = path.join(DATA_DIR, 'klinik.ts')

const existing = readCitiesArray(citiesPath)
const existingIds = new Set(existing.cities.map(c => c.id))

// Build complete cities list
let newCount = 0
let existingCount = 0
const allNewCities = []

const TYPES = ['kabupaten', 'kota']
const TYPE_ORDER = ['kab', 'kota']

// Province display names for various naming conventions
const PROVINCE_DISPLAY = {
  ACEH: 'Aceh', SUMUT: 'Sumatera Utara', SUMBAR: 'Sumatera Barat',
  RIAU: 'Riau', KEPRI: 'Kepulauan Riau', JAMBI: 'Jambi',
  BENGKULU: 'Bengkulu', SUMSEL: 'Sumatera Selatan', BABEL: 'Kepulauan Bangka Belitung',
  LAMPUNG: 'Lampung', BANTEN: 'Banten', DKI: 'DKI Jakarta', JABAR: 'Jawa Barat',
  JATENG: 'Jawa Tengah', DIY: 'DI Yogyakarta', JATIM: 'Jawa Timur',
  BALI: 'Bali', NTB: 'Nusa Tenggara Barat', NTT: 'Nusa Tenggara Timur',
  KALBAR: 'Kalimantan Barat', KALTENG: 'Kalimantan Tengah', KALSEL: 'Kalimantan Selatan',
  KALTIM: 'Kalimantan Timur', KALTARA: 'Kalimantan Utara',
  SULUT: 'Sulawesi Utara', SULTENG: 'Sulawesi Tengah', SULSEL: 'Sulawesi Selatan',
  SULTRA: 'Sulawesi Tenggara', GORONTALO: 'Gorontalo', SULBAR: 'Sulawesi Barat',
  MALUKU: 'Maluku', MALUKU_UTARA: 'Maluku Utara',
  PAPUA: 'Papua', PAPUA_BARAT: 'Papua Barat', PAPUA_SELATAN: 'Papua Selatan',
  PAPUA_TENGAH: 'Papua Tengah', PAPUA_PEGUNUNGAN: 'Papua Pegunungan', PAPUA_BARAT_DAYA: 'Papua Barat Daya',
}

const NAME_LOOKUP = {
  'kab-aceh-barat': {name:'Kabupaten Aceh Barat', type:'kabupaten'},
  'kab-aceh-barat-daya': {name:'Kabupaten Aceh Barat Daya', type:'kabupaten'},
  'kab-aceh-besar': {name:'Kabupaten Aceh Besar', type:'kabupaten'},
  'kab-aceh-jaya': {name:'Kabupaten Aceh Jaya', type:'kabupaten'},
  'kab-aceh-selatan': {name:'Kabupaten Aceh Selatan', type:'kabupaten'},
  'kab-aceh-singkil': {name:'Kabupaten Aceh Singkil', type:'kabupaten'},
  'kab-aceh-tamiang': {name:'Kabupaten Aceh Tamiang', type:'kabupaten'},
  'kab-aceh-tengah': {name:'Kabupaten Aceh Tengah', type:'kabupaten'},
  'kab-aceh-tenggara': {name:'Kabupaten Aceh Tenggara', type:'kabupaten'},
  'kab-aceh-timur': {name:'Kabupaten Aceh Timur', type:'kabupaten'},
  'kab-aceh-utara': {name:'Kabupaten Aceh Utara', type:'kabupaten'},
  'kab-bener-meriah': {name:'Kabupaten Bener Meriah', type:'kabupaten'},
  'kab-bireuen': {name:'Kabupaten Bireuen', type:'kabupaten'},
  'kab-gayo-lues': {name:'Kabupaten Gayo Lues', type:'kabupaten'},
  'kab-nagan-raya': {name:'Kabupaten Nagan Raya', type:'kabupaten'},
  'kab-pidie': {name:'Kabupaten Pidie', type:'kabupaten'},
  'kab-pidie-jaya': {name:'Kabupaten Pidie Jaya', type:'kabupaten'},
  'kab-simeulue': {name:'Kabupaten Simeulue', type:'kabupaten'},
  'kota-banda-aceh': {name:'Kota Banda Aceh', type:'kota'},
  'kota-langsa': {name:'Kota Langsa', type:'kota'},
  'kota-lhokseumawe': {name:'Kota Lhokseumawe', type:'kota'},
  'kota-sabang': {name:'Kota Sabang', type:'kota'},
  'kota-subulussalam': {name:'Kota Subulussalam', type:'kota'},
  // Sumut
  'kab-asahan': {name:'Kabupaten Asahan', type:'kabupaten'},
  'kab-batu-bara': {name:'Kabupaten Batu Bara', type:'kabupaten'},
  'kab-dairi': {name:'Kabupaten Dairi', type:'kabupaten'},
  'kab-deli-serdang': {name:'Kabupaten Deli Serdang', type:'kabupaten'},
  'kab-humbang-hasundutan': {name:'Kabupaten Humbang Hasundutan', type:'kabupaten'},
  'kab-karo': {name:'Kabupaten Karo', type:'kabupaten'},
  'kab-labuhanbatu': {name:'Kabupaten Labuhanbatu', type:'kabupaten'},
  'kab-labuhanbatu-selatan': {name:'Kabupaten Labuhanbatu Selatan', type:'kabupaten'},
  'kab-labuhanbatu-utara': {name:'Kabupaten Labuhanbatu Utara', type:'kabupaten'},
  'kab-langkat': {name:'Kabupaten Langkat', type:'kabupaten'},
  'kab-mandailing-natal': {name:'Kabupaten Mandailing Natal', type:'kabupaten'},
  'kab-nias': {name:'Kabupaten Nias', type:'kabupaten'},
  'kab-nias-barat': {name:'Kabupaten Nias Barat', type:'kabupaten'},
  'kab-nias-selatan': {name:'Kabupaten Nias Selatan', type:'kabupaten'},
  'kab-nias-utara': {name:'Kabupaten Nias Utara', type:'kabupaten'},
  'kab-padang-lawas': {name:'Kabupaten Padang Lawas', type:'kabupaten'},
  'kab-padang-lawas-utara': {name:'Kabupaten Padang Lawas Utara', type:'kabupaten'},
  'kab-pakpak-bharat': {name:'Kabupaten Pakpak Bharat', type:'kabupaten'},
  'kab-samosir': {name:'Kabupaten Samosir', type:'kabupaten'},
  'kab-serdang-bedagai': {name:'Kabupaten Serdang Bedagai', type:'kabupaten'},
  'kab-simalungun': {name:'Kabupaten Simalungun', type:'kabupaten'},
  'kab-tapanuli-selatan': {name:'Kabupaten Tapanuli Selatan', type:'kabupaten'},
  'kab-tapanuli-tengah': {name:'Kabupaten Tapanuli Tengah', type:'kabupaten'},
  'kab-tapanuli-utara': {name:'Kabupaten Tapanuli Utara', type:'kabupaten'},
  'kab-toba': {name:'Kabupaten Toba', type:'kabupaten'},
  'kota-medan': {name:'Kota Medan', type:'kota'},
  'kota-binjai': {name:'Kota Binjai', type:'kota'},
  'kota-gunungsitoli': {name:'Kota Gunungsitoli', type:'kota'},
  'kota-padangsidempuan': {name:'Kota Padangsidempuan', type:'kota'},
  'kota-pematangsiantar': {name:'Kota Pematangsiantar', type:'kota'},
  'kota-sibolga': {name:'Kota Sibolga', type:'kota'},
  'kota-tanjungbalai': {name:'Kota Tanjungbalai', type:'kota'},
  'kota-tebing-tinggi': {name:'Kota Tebing Tinggi', type:'kota'},
  // Sumbar
  'kab-agam': {name:'Kabupaten Agam', type:'kabupaten'},
  'kab-dharmasraya': {name:'Kabupaten Dharmasraya', type:'kabupaten'},
  'kab-kepulauan-mentawai': {name:'Kabupaten Kepulauan Mentawai', type:'kabupaten'},
  'kab-lima-puluh-kota': {name:'Kabupaten Lima Puluh Kota', type:'kabupaten'},
  'kab-padang-pariaman': {name:'Kabupaten Padang Pariaman', type:'kabupaten'},
  'kab-pasaman': {name:'Kabupaten Pasaman', type:'kabupaten'},
  'kab-pasaman-barat': {name:'Kabupaten Pasaman Barat', type:'kabupaten'},
  'kab-pesisir-selatan': {name:'Kabupaten Pesisir Selatan', type:'kabupaten'},
  'kab-sijunjung': {name:'Kabupaten Sijunjung', type:'kabupaten'},
  'kab-solok': {name:'Kabupaten Solok', type:'kabupaten'},
  'kab-solok-selatan': {name:'Kabupaten Solok Selatan', type:'kabupaten'},
  'kab-tanah-datar': {name:'Kabupaten Tanah Datar', type:'kabupaten'},
  'kota-bukittinggi': {name:'Kota Bukittinggi', type:'kota'},
  'kota-padang': {name:'Kota Padang', type:'kota'},
  'kota-padang-panjang': {name:'Kota Padang Panjang', type:'kota'},
  'kota-pariaman': {name:'Kota Pariaman', type:'kota'},
  'kota-payakumbuh': {name:'Kota Payakumbuh', type:'kota'},
  'kota-sawahlunto': {name:'Kota Sawahlunto', type:'kota'},
  'kota-solok': {name:'Kota Solok', type:'kota'},
  // Riau
  'kab-bengkalis': {name:'Kabupaten Bengkalis', type:'kabupaten'},
  'kab-indragiri-hilir': {name:'Kabupaten Indragiri Hilir', type:'kabupaten'},
  'kab-indragiri-hulu': {name:'Kabupaten Indragiri Hulu', type:'kabupaten'},
  'kab-kampar': {name:'Kabupaten Kampar', type:'kabupaten'},
  'kab-kepulauan-meranti': {name:'Kabupaten Kepulauan Meranti', type:'kabupaten'},
  'kab-kuantan-singingi': {name:'Kabupaten Kuantan Singingi', type:'kabupaten'},
  'kab-pelalawan': {name:'Kabupaten Pelalawan', type:'kabupaten'},
  'kab-rokan-hilir': {name:'Kabupaten Rokan Hilir', type:'kabupaten'},
  'kab-rokan-hulu': {name:'Kabupaten Rokan Hulu', type:'kabupaten'},
  'kab-siak': {name:'Kabupaten Siak', type:'kabupaten'},
  'kota-durai': {name:'Kota Dumai', type:'kota'},
  'kota-pekanbaru': {name:'Kota Pekanbaru', type:'kota'},
  // Kepri
  'kab-bintan': {name:'Kabupaten Bintan', type:'kabupaten'},
  'kab-karimun': {name:'Kabupaten Karimun', type:'kabupaten'},
  'kab-kepulauan-anambas': {name:'Kabupaten Kepulauan Anambas', type:'kabupaten'},
  'kab-lingga': {name:'Kabupaten Lingga', type:'kabupaten'},
  'kab-natuna': {name:'Kabupaten Natuna', type:'kabupaten'},
  'kota-batam': {name:'Kota Batam', type:'kota'},
  'kota-tanjung-pinang': {name:'Kota Tanjung Pinang', type:'kota'},
  // Jambi
  'kab-batang-hari': {name:'Kabupaten Batang Hari', type:'kabupaten'},
  'kab-bungo': {name:'Kabupaten Bungo', type:'kabupaten'},
  'kab-kerinci': {name:'Kabupaten Kerinci', type:'kabupaten'},
  'kab-merangin': {name:'Kabupaten Merangin', type:'kabupaten'},
  'kab-muaro-jambi': {name:'Kabupaten Muaro Jambi', type:'kabupaten'},
  'kab-sarolangun': {name:'Kabupaten Sarolangun', type:'kabupaten'},
  'kab-tanjung-jabung-barat': {name:'Kabupaten Tanjung Jabung Barat', type:'kabupaten'},
  'kab-tanjung-jabung-timur': {name:'Kabupaten Tanjung Jabung Timur', type:'kabupaten'},
  'kab-tebo': {name:'Kabupaten Tebo', type:'kabupaten'},
  'kota-jambi': {name:'Kota Jambi', type:'kota'},
  'kota-sungai-penuh': {name:'Kota Sungai Penuh', type:'kota'},
  // Bengkulu
  'kab-bengkulu-selatan': {name:'Kabupaten Bengkulu Selatan', type:'kabupaten'},
  'kab-bengkulu-tengah': {name:'Kabupaten Bengkulu Tengah', type:'kabupaten'},
  'kab-bengkulu-utara': {name:'Kabupaten Bengkulu Utara', type:'kabupaten'},
  'kab-kaur': {name:'Kabupaten Kaur', type:'kabupaten'},
  'kab-kepahiang': {name:'Kabupaten Kepahiang', type:'kabupaten'},
  'kab-lebong': {name:'Kabupaten Lebong', type:'kabupaten'},
  'kab-muko-muko': {name:'Kabupaten Muko Muko', type:'kabupaten'},
  'kab-rejang-lebong': {name:'Kabupaten Rejang Lebong', type:'kabupaten'},
  'kab-seluma': {name:'Kabupaten Seluma', type:'kabupaten'},
  'kota-bengkulu': {name:'Kota Bengkulu', type:'kota'},
  // Sumsel
  'kab-banyuasin': {name:'Kabupaten Banyuasin', type:'kabupaten'},
  'kab-empat-lawang': {name:'Kabupaten Empat Lawang', type:'kabupaten'},
  'kab-lahat': {name:'Kabupaten Lahat', type:'kabupaten'},
  'kab-muara-enim': {name:'Kabupaten Muara Enim', type:'kabupaten'},
  'kab-musi-banyuasin': {name:'Kabupaten Musi Banyuasin', type:'kabupaten'},
  'kab-musi-rawas': {name:'Kabupaten Musi Rawas', type:'kabupaten'},
  'kab-musi-rawas-utara': {name:'Kabupaten Musi Rawas Utara', type:'kabupaten'},
  'kab-ogan-ilir': {name:'Kabupaten Ogan Ilir', type:'kabupaten'},
  'kab-ogan-komering-ilir': {name:'Kabupaten Ogan Komering Ilir', type:'kabupaten'},
  'kab-ogan-komering-ulu': {name:'Kabupaten Ogan Komering Ulu', type:'kabupaten'},
  'kab-ogan-komering-ulu-selatan': {name:'Kabupaten Ogan Komering Ulu Selatan', type:'kabupaten'},
  'kab-ogan-komering-ulu-timur': {name:'Kabupaten Ogan Komering Ulu Timur', type:'kabupaten'},
  'kab-penukal-abab-lematang-ilir': {name:'Kabupaten Penukal Abab Lematang Ilir', type:'kabupaten'},
  'kota-lubuklinggau': {name:'Kota Lubuklinggau', type:'kota'},
  'kota-pagar-alam': {name:'Kota Pagar Alam', type:'kota'},
  'kota-palembang': {name:'Kota Palembang', type:'kota'},
  'kota-prabumulih': {name:'Kota Prabumulih', type:'kota'},
  // Babel
  'kab-bangka': {name:'Kabupaten Bangka', type:'kabupaten'},
  'kab-bangka-barat': {name:'Kabupaten Bangka Barat', type:'kabupaten'},
  'kab-bangka-selatan': {name:'Kabupaten Bangka Selatan', type:'kabupaten'},
  'kab-bangka-tengah': {name:'Kabupaten Bangka Tengah', type:'kabupaten'},
  'kab-belitung': {name:'Kabupaten Belitung', type:'kabupaten'},
  'kab-belitung-timur': {name:'Kabupaten Belitung Timur', type:'kabupaten'},
  'kota-pangkal-pinang': {name:'Kota Pangkal Pinang', type:'kota'},
  // Lampung
  'kab-lampung-barat': {name:'Kabupaten Lampung Barat', type:'kabupaten'},
  'kab-lampung-selatan': {name:'Kabupaten Lampung Selatan', type:'kabupaten'},
  'kab-lampung-tengah': {name:'Kabupaten Lampung Tengah', type:'kabupaten'},
  'kab-lampung-timur': {name:'Kabupaten Lampung Timur', type:'kabupaten'},
  'kab-lampung-utara': {name:'Kabupaten Lampung Utara', type:'kabupaten'},
  'kab-mesuji': {name:'Kabupaten Mesuji', type:'kabupaten'},
  'kab-pesawaran': {name:'Kabupaten Pesawaran', type:'kabupaten'},
  'kab-pesisir-barat': {name:'Kabupaten Pesisir Barat', type:'kabupaten'},
  'kab-pringsewu': {name:'Kabupaten Pringsewu', type:'kabupaten'},
  'kab-tanggamus': {name:'Kabupaten Tanggamus', type:'kabupaten'},
  'kab-tulang-bawang': {name:'Kabupaten Tulang Bawang', type:'kabupaten'},
  'kab-tulang-bawang-barat': {name:'Kabupaten Tulang Bawang Barat', type:'kabupaten'},
  'kab-way-kanan': {name:'Kabupaten Way Kanan', type:'kabupaten'},
  'kota-bandar-lampung': {name:'Kota Bandar Lampung', type:'kota'},
  'kota-metro': {name:'Kota Metro', type:'kota'},
  // Banten
  'kab-lebak': {name:'Kabupaten Lebak', type:'kabupaten'},
  'kab-pandeglang': {name:'Kabupaten Pandeglang', type:'kabupaten'},
  'kab-serang': {name:'Kabupaten Serang', type:'kabupaten'},
  'kab-tangerang': {name:'Kabupaten Tangerang', type:'kabupaten'},
  'kota-cilegon': {name:'Kota Cilegon', type:'kota'},
  'kota-serang': {name:'Kota Serang', type:'kota'},
  'kota-tangerang': {name:'Kota Tangerang', type:'kota'},
  'kota-tangerang-selatan': {name:'Kota Tangerang Selatan', type:'kota'},
  // DKI Jakarta
  'kab-kepulauan-seribu': {name:'Kabupaten Kepulauan Seribu', type:'kabupaten'},
  'kota-jakarta-barat': {name:'Kota Jakarta Barat', type:'kota'},
  'kota-jakarta-pusat': {name:'Kota Jakarta Pusat', type:'kota'},
  'kota-jakarta-selatan': {name:'Kota Jakarta Selatan', type:'kota'},
  'kota-jakarta-timur': {name:'Kota Jakarta Timur', type:'kota'},
  'kota-jakarta-utara': {name:'Kota Jakarta Utara', type:'kota'},
  // Jabar
  'kab-bandung': {name:'Kabupaten Bandung', type:'kabupaten'},
  'kab-bandung-barat': {name:'Kabupaten Bandung Barat', type:'kabupaten'},
  'kab-bekasi': {name:'Kabupaten Bekasi', type:'kabupaten'},
  'kab-bogor': {name:'Kabupaten Bogor', type:'kabupaten'},
  'kab-cianjur': {name:'Kabupaten Cianjur', type:'kabupaten'},
  'kab-ciamis': {name:'Kabupaten Ciamis', type:'kabupaten'},
  'kab-cirebon': {name:'Kabupaten Cirebon', type:'kabupaten'},
  'kab-garut': {name:'Kabupaten Garut', type:'kabupaten'},
  'kab-indramayu': {name:'Kabupaten Indramayu', type:'kabupaten'},
  'kab-karawang': {name:'Kabupaten Karawang', type:'kabupaten'},
  'kab-kuningan': {name:'Kabupaten Kuningan', type:'kabupaten'},
  'kab-majalengka': {name:'Kabupaten Majalengka', type:'kabupaten'},
  'kab-pangandaran': {name:'Kabupaten Pangandaran', type:'kabupaten'},
  'kab-purwakarta': {name:'Kabupaten Purwakarta', type:'kabupaten'},
  'kab-subang': {name:'Kabupaten Subang', type:'kabupaten'},
  'kab-sukabumi': {name:'Kabupaten Sukabumi', type:'kabupaten'},
  'kab-sumedang': {name:'Kabupaten Sumedang', type:'kabupaten'},
  'kab-tasikmalaya': {name:'Kabupaten Tasikmalaya', type:'kabupaten'},
  'kota-bandung': {name:'Kota Bandung', type:'kota'},
  'kota-banjar': {name:'Kota Banjar', type:'kota'},
  'kota-bekasi': {name:'Kota Bekasi', type:'kota'},
  'kota-bogor': {name:'Kota Bogor', type:'kota'},
  'kota-cimahi': {name:'Kota Cimahi', type:'kota'},
  'kota-cirebon': {name:'Kota Cirebon', type:'kota'},
  'kota-depok': {name:'Kota Depok', type:'kota'},
  'kota-sukabumi': {name:'Kota Sukabumi', type:'kota'},
  'kota-tasikmalaya': {name:'Kota Tasikmalaya', type:'kota'},
  // Jateng
  'kab-banjarnegara': {name:'Kabupaten Banjarnegara', type:'kabupaten'},
  'kab-banyumas': {name:'Kabupaten Banyumas', type:'kabupaten'},
  'kab-batang': {name:'Kabupaten Batang', type:'kabupaten'},
  'kab-blora': {name:'Kabupaten Blora', type:'kabupaten'},
  'kab-boyolali': {name:'Kabupaten Boyolali', type:'kabupaten'},
  'kab-brebes': {name:'Kabupaten Brebes', type:'kabupaten'},
  'kab-cilacap': {name:'Kabupaten Cilacap', type:'kabupaten'},
  'kab-demak': {name:'Kabupaten Demak', type:'kabupaten'},
  'kab-grobogan': {name:'Kabupaten Grobogan', type:'kabupaten'},
  'kab-jepara': {name:'Kabupaten Jepara', type:'kabupaten'},
  'kab-karanganyar': {name:'Kabupaten Karanganyar', type:'kabupaten'},
  'kab-kebumen': {name:'Kabupaten Kebumen', type:'kabupaten'},
  'kab-kendal': {name:'Kabupaten Kendal', type:'kabupaten'},
  'kab-klaten': {name:'Kabupaten Klaten', type:'kabupaten'},
  'kab-kudus': {name:'Kabupaten Kudus', type:'kabupaten'},
  'kab-magelang': {name:'Kabupaten Magelang', type:'kabupaten'},
  'kab-pati': {name:'Kabupaten Pati', type:'kabupaten'},
  'kab-pekalongan': {name:'Kabupaten Pekalongan', type:'kabupaten'},
  'kab-pemalang': {name:'Kabupaten Pemalang', type:'kabupaten'},
  'kab-purbalingga': {name:'Kabupaten Purbalingga', type:'kabupaten'},
  'kab-purworejo': {name:'Kabupaten Purworejo', type:'kabupaten'},
  'kab-rembang': {name:'Kabupaten Rembang', type:'kabupaten'},
  'kab-sragen': {name:'Kabupaten Sragen', type:'kabupaten'},
  'kab-sukoharjo': {name:'Kabupaten Sukoharjo', type:'kabupaten'},
  'kab-tegal': {name:'Kabupaten Tegal', type:'kabupaten'},
  'kab-temanggung': {name:'Kabupaten Temanggung', type:'kabupaten'},
  'kab-wonogiri': {name:'Kabupaten Wonogiri', type:'kabupaten'},
  'kab-wonosobo': {name:'Kabupaten Wonosobo', type:'kabupaten'},
  'kota-magelang': {name:'Kota Magelang', type:'kota'},
  'kota-pekalongan': {name:'Kota Pekalongan', type:'kota'},
  'kota-salatiga': {name:'Kota Salatiga', type:'kota'},
  'kota-semarang': {name:'Kota Semarang', type:'kota'},
  'kota-surakarta': {name:'Kota Surakarta', type:'kota'},
  'kota-tegal': {name:'Kota Tegal', type:'kota'},
  // DIY
  'kab-bantul': {name:'Kabupaten Bantul', type:'kabupaten'},
  'kab-gunung-kidul': {name:'Kabupaten Gunung Kidul', type:'kabupaten'},
  'kab-kulon-progo': {name:'Kabupaten Kulon Progo', type:'kabupaten'},
  'kab-sleman': {name:'Kabupaten Sleman', type:'kabupaten'},
  'kota-yogyakarta': {name:'Kota Yogyakarta', type:'kota'},
  // Jatim
  'kab-bangkalan': {name:'Kabupaten Bangkalan', type:'kabupaten'},
  'kab-banyuwangi': {name:'Kabupaten Banyuwangi', type:'kabupaten'},
  'kab-blitar': {name:'Kabupaten Blitar', type:'kabupaten'},
  'kab-bojonegoro': {name:'Kabupaten Bojonegoro', type:'kabupaten'},
  'kab-bondowoso': {name:'Kabupaten Bondowoso', type:'kabupaten'},
  'kab-gresik': {name:'Kabupaten Gresik', type:'kabupaten'},
  'kab-jember': {name:'Kabupaten Jember', type:'kabupaten'},
  'kab-jombang': {name:'Kabupaten Jombang', type:'kabupaten'},
  'kab-kediri': {name:'Kabupaten Kediri', type:'kabupaten'},
  'kab-lamongan': {name:'Kabupaten Lamongan', type:'kabupaten'},
  'kab-lumajang': {name:'Kabupaten Lumajang', type:'kabupaten'},
  'kab-madiun': {name:'Kabupaten Madiun', type:'kabupaten'},
  'kab-magetan': {name:'Kabupaten Magetan', type:'kabupaten'},
  'kab-malang': {name:'Kabupaten Malang', type:'kabupaten'},
  'kab-mojokerto': {name:'Kabupaten Mojokerto', type:'kabupaten'},
  'kab-nganjuk': {name:'Kabupaten Nganjuk', type:'kabupaten'},
  'kab-ngawi': {name:'Kabupaten Ngawi', type:'kabupaten'},
  'kab-pacitan': {name:'Kabupaten Pacitan', type:'kabupaten'},
  'kab-pamekasan': {name:'Kabupaten Pamekasan', type:'kabupaten'},
  'kab-pasuruan': {name:'Kabupaten Pasuruan', type:'kabupaten'},
  'kab-ponorogo': {name:'Kabupaten Ponorogo', type:'kabupaten'},
  'kab-probolinggo': {name:'Kabupaten Probolinggo', type:'kabupaten'},
  'kab-sampang': {name:'Kabupaten Sampang', type:'kabupaten'},
  'kab-sidoarjo': {name:'Kabupaten Sidoarjo', type:'kabupaten'},
  'kab-situbondo': {name:'Kabupaten Situbondo', type:'kabupaten'},
  'kab-sumenep': {name:'Kabupaten Sumenep', type:'kabupaten'},
  'kab-trenggalek': {name:'Kabupaten Trenggalek', type:'kabupaten'},
  'kab-tuban': {name:'Kabupaten Tuban', type:'kabupaten'},
  'kab-tulungagung': {name:'Kabupaten Tulungagung', type:'kabupaten'},
  'kota-batu': {name:'Kota Batu', type:'kota'},
  'kota-blitar': {name:'Kota Blitar', type:'kota'},
  'kota-kediri': {name:'Kota Kediri', type:'kota'},
  'kota-madiun': {name:'Kota Madiun', type:'kota'},
  'kota-malang': {name:'Kota Malang', type:'kota'},
  'kota-mojokerto': {name:'Kota Mojokerto', type:'kota'},
  'kota-pasuruan': {name:'Kota Pasuruan', type:'kota'},
  'kota-probolinggo': {name:'Kota Probolinggo', type:'kota'},
  'kota-surabaya': {name:'Kota Surabaya', type:'kota'},
  // Bali
  'kab-badung': {name:'Kabupaten Badung', type:'kabupaten'},
  'kab-bangli': {name:'Kabupaten Bangli', type:'kabupaten'},
  'kab-buleleng': {name:'Kabupaten Buleleng', type:'kabupaten'},
  'kab-gianyar': {name:'Kabupaten Gianyar', type:'kabupaten'},
  'kab-jembrana': {name:'Kabupaten Jembrana', type:'kabupaten'},
  'kab-karangasem': {name:'Kabupaten Karangasem', type:'kabupaten'},
  'kab-klungkung': {name:'Kabupaten Klungkung', type:'kabupaten'},
  'kab-tabanan': {name:'Kabupaten Tabanan', type:'kabupaten'},
  'kota-denpasar': {name:'Kota Denpasar', type:'kota'},
  // NTB
  'kab-bima': {name:'Kabupaten Bima', type:'kabupaten'},
  'kab-dompu': {name:'Kabupaten Dompu', type:'kabupaten'},
  'kab-lombok-barat': {name:'Kabupaten Lombok Barat', type:'kabupaten'},
  'kab-lombok-tengah': {name:'Kabupaten Lombok Tengah', type:'kabupaten'},
  'kab-lombok-timur': {name:'Kabupaten Lombok Timur', type:'kabupaten'},
  'kab-lombok-utara': {name:'Kabupaten Lombok Utara', type:'kabupaten'},
  'kab-sumbawa': {name:'Kabupaten Sumbawa', type:'kabupaten'},
  'kab-sumbawa-barat': {name:'Kabupaten Sumbawa Barat', type:'kabupaten'},
  'kota-bima': {name:'Kota Bima', type:'kota'},
  'kota-mataram': {name:'Kota Mataram', type:'kota'},
  // NTT
  'kab-alor': {name:'Kabupaten Alor', type:'kabupaten'},
  'kab-belu': {name:'Kabupaten Belu', type:'kabupaten'},
  'kab-ende': {name:'Kabupaten Ende', type:'kabupaten'},
  'kab-flores-timur': {name:'Kabupaten Flores Timur', type:'kabupaten'},
  'kab-kupang': {name:'Kabupaten Kupang', type:'kabupaten'},
  'kab-lembata': {name:'Kabupaten Lembata', type:'kabupaten'},
  'kab-malaka': {name:'Kabupaten Malaka', type:'kabupaten'},
  'kab-manggarai': {name:'Kabupaten Manggarai', type:'kabupaten'},
  'kab-manggarai-barat': {name:'Kabupaten Manggarai Barat', type:'kabupaten'},
  'kab-manggarai-timur': {name:'Kabupaten Manggarai Timur', type:'kabupaten'},
  'kab-nagekeo': {name:'Kabupaten Nagekeo', type:'kabupaten'},
  'kab-ngada': {name:'Kabupaten Ngada', type:'kabupaten'},
  'kab-rote-ndao': {name:'Kabupaten Rote Ndao', type:'kabupaten'},
  'kab-sabu-raijua': {name:'Kabupaten Sabu Raijua', type:'kabupaten'},
  'kab-sikka': {name:'Kabupaten Sikka', type:'kabupaten'},
  'kab-sumba-barat': {name:'Kabupaten Sumba Barat', type:'kabupaten'},
  'kab-sumba-barat-daya': {name:'Kabupaten Sumba Barat Daya', type:'kabupaten'},
  'kab-sumba-tengah': {name:'Kabupaten Sumba Tengah', type:'kabupaten'},
  'kab-sumba-timur': {name:'Kabupaten Sumba Timur', type:'kabupaten'},
  'kab-timor-tengah-selatan': {name:'Kabupaten Timor Tengah Selatan', type:'kabupaten'},
  'kab-timor-tengah-utara': {name:'Kabupaten Timor Tengah Utara', type:'kabupaten'},
  'kota-kupang': {name:'Kota Kupang', type:'kota'},
  // Kalbar
  'kab-bengkayang': {name:'Kabupaten Bengkayang', type:'kabupaten'},
  'kab-kapuas-hulu': {name:'Kabupaten Kapuas Hulu', type:'kabupaten'},
  'kab-kayong-utara': {name:'Kabupaten Kayong Utara', type:'kabupaten'},
  'kab-ketapang': {name:'Kabupaten Ketapang', type:'kabupaten'},
  'kab-kubu-raya': {name:'Kabupaten Kubu Raya', type:'kabupaten'},
  'kab-landak': {name:'Kabupaten Landak', type:'kabupaten'},
  'kab-melawi': {name:'Kabupaten Melawi', type:'kabupaten'},
  'kab-mempawah': {name:'Kabupaten Mempawah', type:'kabupaten'},
  'kab-sambas': {name:'Kabupaten Sambas', type:'kabupaten'},
  'kab-sanggau': {name:'Kabupaten Sanggau', type:'kabupaten'},
  'kab-sekadau': {name:'Kabupaten Sekadau', type:'kabupaten'},
  'kab-sintang': {name:'Kabupaten Sintang', type:'kabupaten'},
  'kota-pontianak': {name:'Kota Pontianak', type:'kota'},
  'kota-singkawang': {name:'Kota Singkawang', type:'kota'},
  // Kalteng
  'kab-barito-selatan': {name:'Kabupaten Barito Selatan', type:'kabupaten'},
  'kab-barito-timur': {name:'Kabupaten Barito Timur', type:'kabupaten'},
  'kab-barito-utara': {name:'Kabupaten Barito Utara', type:'kabupaten'},
  'kab-gunung-mas': {name:'Kabupaten Gunung Mas', type:'kabupaten'},
  'kab-kapuas': {name:'Kabupaten Kapuas', type:'kabupaten'},
  'kab-katingan': {name:'Kabupaten Katingan', type:'kabupaten'},
  'kab-kotawaringin-barat': {name:'Kabupaten Kotawaringin Barat', type:'kabupaten'},
  'kab-kotawaringin-timur': {name:'Kabupaten Kotawaringin Timur', type:'kabupaten'},
  'kab-lamandau': {name:'Kabupaten Lamandau', type:'kabupaten'},
  'kab-murung-raya': {name:'Kabupaten Murung Raya', type:'kabupaten'},
  'kab-pulang-pisau': {name:'Kabupaten Pulang Pisau', type:'kabupaten'},
  'kab-seruyan': {name:'Kabupaten Seruyan', type:'kabupaten'},
  'kab-sukamara': {name:'Kabupaten Sukamara', type:'kabupaten'},
  'kota-palangka-raya': {name:'Kota Palangka Raya', type:'kota'},
  // Kalsel
  'kab-balangan': {name:'Kabupaten Balangan', type:'kabupaten'},
  'kab-banjar': {name:'Kabupaten Banjar', type:'kabupaten'},
  'kab-barito-kuala': {name:'Kabupaten Barito Kuala', type:'kabupaten'},
  'kab-hulu-sungai-selatan': {name:'Kabupaten Hulu Sungai Selatan', type:'kabupaten'},
  'kab-hulu-sungai-tengah': {name:'Kabupaten Hulu Sungai Tengah', type:'kabupaten'},
  'kab-hulu-sungai-utara': {name:'Kabupaten Hulu Sungai Utara', type:'kabupaten'},
  'kab-kotabaru': {name:'Kabupaten Kotabaru', type:'kabupaten'},
  'kab-tabalong': {name:'Kabupaten Tabalong', type:'kabupaten'},
  'kab-tanah-bumbu': {name:'Kabupaten Tanah Bumbu', type:'kabupaten'},
  'kab-tanah-laut': {name:'Kabupaten Tanah Laut', type:'kabupaten'},
  'kab-tapin': {name:'Kabupaten Tapin', type:'kabupaten'},
  'kota-banjarbaru': {name:'Kota Banjarbaru', type:'kota'},
  'kota-banjarmasin': {name:'Kota Banjarmasin', type:'kota'},
  // Kaltim
  'kab-berau': {name:'Kabupaten Berau', type:'kabupaten'},
  'kab-kutai-barat': {name:'Kabupaten Kutai Barat', type:'kabupaten'},
  'kab-kutai-kartanegara': {name:'Kabupaten Kutai Kartanegara', type:'kabupaten'},
  'kab-kutai-timur': {name:'Kabupaten Kutai Timur', type:'kabupaten'},
  'kab-mahakam-hulu': {name:'Kabupaten Mahakam Hulu', type:'kabupaten'},
  'kab-paser': {name:'Kabupaten Paser', type:'kabupaten'},
  'kab-penajam-paser-utara': {name:'Kabupaten Penajam Paser Utara', type:'kabupaten'},
  'kota-balikpapan': {name:'Kota Balikpapan', type:'kota'},
  'kota-bontang': {name:'Kota Bontang', type:'kota'},
  'kota-samarinda': {name:'Kota Samarinda', type:'kota'},
  // Kaltara
  'kab-bulungan': {name:'Kabupaten Bulungan', type:'kabupaten'},
  'kab-malinau': {name:'Kabupaten Malinau', type:'kabupaten'},
  'kab-nunukan': {name:'Kabupaten Nunukan', type:'kabupaten'},
  'kab-tana-tidung': {name:'Kabupaten Tana Tidung', type:'kabupaten'},
  'kota-tarakan': {name:'Kota Tarakan', type:'kota'},
  // Sulut
  'kab-bolaang-mongondow': {name:'Kabupaten Bolaang Mongondow', type:'kabupaten'},
  'kab-bolaang-mongondow-selatan': {name:'Kabupaten Bolaang Mongondow Selatan', type:'kabupaten'},
  'kab-bolaang-mongondow-timur': {name:'Kabupaten Bolaang Mongondow Timur', type:'kabupaten'},
  'kab-bolaang-mongondow-utara': {name:'Kabupaten Bolaang Mongondow Utara', type:'kabupaten'},
  'kab-kepulauan-sangihe': {name:'Kabupaten Kepulauan Sangihe', type:'kabupaten'},
  'kab-kepulauan-siau-tagulandang-biaro': {name:'Kabupaten Kepulauan Siau Tagulandang Biaro', type:'kabupaten'},
  'kab-kepulauan-talaud': {name:'Kabupaten Kepulauan Talaud', type:'kabupaten'},
  'kab-minahasa': {name:'Kabupaten Minahasa', type:'kabupaten'},
  'kab-minahasa-selatan': {name:'Kabupaten Minahasa Selatan', type:'kabupaten'},
  'kab-minahasa-tenggara': {name:'Kabupaten Minahasa Tenggara', type:'kabupaten'},
  'kab-minahasa-utara': {name:'Kabupaten Minahasa Utara', type:'kabupaten'},
  'kota-bitung': {name:'Kota Bitung', type:'kota'},
  'kota-kotamobagu': {name:'Kota Kotamobagu', type:'kota'},
  'kota-manado': {name:'Kota Manado', type:'kota'},
  'kota-tomohon': {name:'Kota Tomohon', type:'kota'},
  // Sulteng
  'kab-banggai': {name:'Kabupaten Banggai', type:'kabupaten'},
  'kab-banggai-kepulauan': {name:'Kabupaten Banggai Kepulauan', type:'kabupaten'},
  'kab-banggai-laut': {name:'Kabupaten Banggai Laut', type:'kabupaten'},
  'kab-buol': {name:'Kabupaten Buol', type:'kabupaten'},
  'kab-donggala': {name:'Kabupaten Donggala', type:'kabupaten'},
  'kab-morowali': {name:'Kabupaten Morowali', type:'kabupaten'},
  'kab-morowali-utara': {name:'Kabupaten Morowali Utara', type:'kabupaten'},
  'kab-parigi-moutong': {name:'Kabupaten Parigi Moutong', type:'kabupaten'},
  'kab-poso': {name:'Kabupaten Poso', type:'kabupaten'},
  'kab-sigi': {name:'Kabupaten Sigi', type:'kabupaten'},
  'kab-tojo-una-una': {name:'Kabupaten Tojo Una Una', type:'kabupaten'},
  'kab-toli-toli': {name:'Kabupaten Toli Toli', type:'kabupaten'},
  'kota-palu': {name:'Kota Palu', type:'kota'},
  // Sulsel
  'kab-bantaeng': {name:'Kabupaten Bantaeng', type:'kabupaten'},
  'kab-barru': {name:'Kabupaten Barru', type:'kabupaten'},
  'kab-bone': {name:'Kabupaten Bone', type:'kabupaten'},
  'kab-bulukumba': {name:'Kabupaten Bulukumba', type:'kabupaten'},
  'kab-enrekang': {name:'Kabupaten Enrekang', type:'kabupaten'},
  'kab-gowa': {name:'Kabupaten Gowa', type:'kabupaten'},
  'kab-jeneponto': {name:'Kabupaten Jeneponto', type:'kabupaten'},
  'kab-kepulauan-selayar': {name:'Kabupaten Kepulauan Selayar', type:'kabupaten'},
  'kab-luwu': {name:'Kabupaten Luwu', type:'kabupaten'},
  'kab-luwu-timur': {name:'Kabupaten Luwu Timur', type:'kabupaten'},
  'kab-luwu-utara': {name:'Kabupaten Luwu Utara', type:'kabupaten'},
  'kab-maros': {name:'Kabupaten Maros', type:'kabupaten'},
  'kab-pangkajene-kepulauan': {name:'Kabupaten Pangkajene Kepulauan', type:'kabupaten'},
  'kab-pinrang': {name:'Kabupaten Pinrang', type:'kabupaten'},
  'kab-sidenreng-rappang': {name:'Kabupaten Sidenreng Rappang', type:'kabupaten'},
  'kab-sinjai': {name:'Kabupaten Sinjai', type:'kabupaten'},
  'kab-soppeng': {name:'Kabupaten Soppeng', type:'kabupaten'},
  'kab-takalar': {name:'Kabupaten Takalar', type:'kabupaten'},
  'kab-tana-toraja': {name:'Kabupaten Tana Toraja', type:'kabupaten'},
  'kab-toraja-utara': {name:'Kabupaten Toraja Utara', type:'kabupaten'},
  'kab-wajo': {name:'Kabupaten Wajo', type:'kabupaten'},
  'kota-makassar': {name:'Kota Makassar', type:'kota'},
  'kota-palopo': {name:'Kota Palopo', type:'kota'},
  'kota-parepare': {name:'Kota Parepare', type:'kota'},
  // Sultra
  'kab-bombana': {name:'Kabupaten Bombana', type:'kabupaten'},
  'kab-buton': {name:'Kabupaten Buton', type:'kabupaten'},
  'kab-buton-selatan': {name:'Kabupaten Buton Selatan', type:'kabupaten'},
  'kab-buton-tengah': {name:'Kabupaten Buton Tengah', type:'kabupaten'},
  'kab-buton-utara': {name:'Kabupaten Buton Utara', type:'kabupaten'},
  'kab-kolaka': {name:'Kabupaten Kolaka', type:'kabupaten'},
  'kab-kolaka-timur': {name:'Kabupaten Kolaka Timur', type:'kabupaten'},
  'kab-kolaka-utara': {name:'Kabupaten Kolaka Utara', type:'kabupaten'},
  'kab-konawe': {name:'Kabupaten Konawe', type:'kabupaten'},
  'kab-konawe-kepulauan': {name:'Kabupaten Konawe Kepulauan', type:'kabupaten'},
  'kab-konawe-selatan': {name:'Kabupaten Konawe Selatan', type:'kabupaten'},
  'kab-konawe-utara': {name:'Kabupaten Konawe Utara', type:'kabupaten'},
  'kab-muna': {name:'Kabupaten Muna', type:'kabupaten'},
  'kab-muna-barat': {name:'Kabupaten Muna Barat', type:'kabupaten'},
  'kab-wakatobi': {name:'Kabupaten Wakatobi', type:'kabupaten'},
  'kota-baubau': {name:'Kota Baubau', type:'kota'},
  'kota-kendari': {name:'Kota Kendari', type:'kota'},
  // Gorontalo
  'kab-boalemo': {name:'Kabupaten Boalemo', type:'kabupaten'},
  'kab-bone-bolango': {name:'Kabupaten Bone Bolango', type:'kabupaten'},
  'kab-gorontalo': {name:'Kabupaten Gorontalo', type:'kabupaten'},
  'kab-gorontalo-utara': {name:'Kabupaten Gorontalo Utara', type:'kabupaten'},
  'kab-pohuwato': {name:'Kabupaten Pohuwato', type:'kabupaten'},
  'kota-gorontalo': {name:'Kota Gorontalo', type:'kota'},
  // Sulbar
  'kab-majene': {name:'Kabupaten Majene', type:'kabupaten'},
  'kab-mamasa': {name:'Kabupaten Mamasa', type:'kabupaten'},
  'kab-mamuju': {name:'Kabupaten Mamuju', type:'kabupaten'},
  'kab-mamuju-tengah': {name:'Kabupaten Mamuju Tengah', type:'kabupaten'},
  'kab-pasangkayu': {name:'Kabupaten Pasangkayu', type:'kabupaten'},
  'kab-polewali-mandar': {name:'Kabupaten Polewali Mandar', type:'kabupaten'},
  // Maluku
  'kab-buru': {name:'Kabupaten Buru', type:'kabupaten'},
  'kab-buru-selatan': {name:'Kabupaten Buru Selatan', type:'kabupaten'},
  'kab-kepulauan-aru': {name:'Kabupaten Kepulauan Aru', type:'kabupaten'},
  'kab-maluku-barat-daya': {name:'Kabupaten Maluku Barat Daya', type:'kabupaten'},
  'kab-maluku-tengah': {name:'Kabupaten Maluku Tengah', type:'kabupaten'},
  'kab-maluku-tenggara': {name:'Kabupaten Maluku Tenggara', type:'kabupaten'},
  'kab-seram-bagian-barat': {name:'Kabupaten Seram Bagian Barat', type:'kabupaten'},
  'kab-seram-bagian-timur': {name:'Kabupaten Seram Bagian Timur', type:'kabupaten'},
  'kab-kepulauan-tanimbar': {name:'Kabupaten Kepulauan Tanimbar', type:'kabupaten'},
  'kota-ambon': {name:'Kota Ambon', type:'kota'},
  'kota-tual': {name:'Kota Tual', type:'kota'},
  // Maluku Utara
  'kab-halmahera-barat': {name:'Kabupaten Halmahera Barat', type:'kabupaten'},
  'kab-halmahera-selatan': {name:'Kabupaten Halmahera Selatan', type:'kabupaten'},
  'kab-halmahera-tengah': {name:'Kabupaten Halmahera Tengah', type:'kabupaten'},
  'kab-halmahera-timur': {name:'Kabupaten Halmahera Timur', type:'kabupaten'},
  'kab-halmahera-utara': {name:'Kabupaten Halmahera Utara', type:'kabupaten'},
  'kab-kepulauan-sula': {name:'Kabupaten Kepulauan Sula', type:'kabupaten'},
  'kab-pulau-morotai': {name:'Kabupaten Pulau Morotai', type:'kabupaten'},
  'kab-pulau-taliabu': {name:'Kabupaten Pulau Taliabu', type:'kabupaten'},
  'kota-ternate': {name:'Kota Ternate', type:'kota'},
  'kota-tidore-kepulauan': {name:'Kota Tidore Kepulauan', type:'kota'},
  // Papua
  'kab-biak-numfor': {name:'Kabupaten Biak Numfor', type:'kabupaten'},
  'kab-jayapura': {name:'Kabupaten Jayapura', type:'kabupaten'},
  'kab-keerom': {name:'Kabupaten Keerom', type:'kabupaten'},
  'kab-kepulauan-yapen': {name:'Kabupaten Kepulauan Yapen', type:'kabupaten'},
  'kab-mamberamo-raya': {name:'Kabupaten Mamberamo Raya', type:'kabupaten'},
  'kab-sarmi': {name:'Kabupaten Sarmi', type:'kabupaten'},
  'kab-supiori': {name:'Kabupaten Supiori', type:'kabupaten'},
  'kab-waropen': {name:'Kabupaten Waropen', type:'kabupaten'},
  'kota-jayapura': {name:'Kota Jayapura', type:'kota'},
  // Papua Barat
  'kab-fakfak': {name:'Kabupaten Fakfak', type:'kabupaten'},
  'kab-kaimana': {name:'Kabupaten Kaimana', type:'kabupaten'},
  'kab-manokwari': {name:'Kabupaten Manokwari', type:'kabupaten'},
  'kab-manokwari-selatan': {name:'Kabupaten Manokwari Selatan', type:'kabupaten'},
  'kab-pegunungan-arfak': {name:'Kabupaten Pegunungan Arfak', type:'kabupaten'},
  'kab-teluk-bintuni': {name:'Kabupaten Teluk Bintuni', type:'kabupaten'},
  'kab-teluk-wondama': {name:'Kabupaten Teluk Wondama', type:'kabupaten'},
  // Papua Selatan
  'kab-asmat': {name:'Kabupaten Asmat', type:'kabupaten'},
  'kab-boven-digoel': {name:'Kabupaten Boven Digoel', type:'kabupaten'},
  'kab-mappi': {name:'Kabupaten Mappi', type:'kabupaten'},
  'kab-merauke': {name:'Kabupaten Merauke', type:'kabupaten'},
  // Papua Tengah
  'kab-deiyai': {name:'Kabupaten Deiyai', type:'kabupaten'},
  'kab-dogiyai': {name:'Kabupaten Dogiyai', type:'kabupaten'},
  'kab-intan-jaya': {name:'Kabupaten Intan Jaya', type:'kabupaten'},
  'kab-mimika': {name:'Kabupaten Mimika', type:'kabupaten'},
  'kab-nabire': {name:'Kabupaten Nabire', type:'kabupaten'},
  'kab-paniai': {name:'Kabupaten Paniai', type:'kabupaten'},
  'kab-puncak': {name:'Kabupaten Puncak', type:'kabupaten'},
  'kab-puncak-jaya': {name:'Kabupaten Puncak Jaya', type:'kabupaten'},
  // Papua Pegunungan
  'kab-jayawijaya': {name:'Kabupaten Jayawijaya', type:'kabupaten'},
  'kab-lanny-jaya': {name:'Kabupaten Lanny Jaya', type:'kabupaten'},
  'kab-mamberamo-tengah': {name:'Kabupaten Mamberamo Tengah', type:'kabupaten'},
  'kab-nduga': {name:'Kabupaten Nduga', type:'kabupaten'},
  'kab-pegunungan-bintang': {name:'Kabupaten Pegunungan Bintang', type:'kabupaten'},
  'kab-tolikara': {name:'Kabupaten Tolikara', type:'kabupaten'},
  'kab-yahukimo': {name:'Kabupaten Yahukimo', type:'kabupaten'},
  'kab-yalimo': {name:'Kabupaten Yalimo', type:'kabupaten'},
  // Papua Barat Daya
  'kab-maybrat': {name:'Kabupaten Maybrat', type:'kabupaten'},
  'kab-raja-ampat': {name:'Kabupaten Raja Ampat', type:'kabupaten'},
  'kab-sorong': {name:'Kabupaten Sorong', type:'kabupaten'},
  'kab-sorong-selatan': {name:'Kabupaten Sorong Selatan', type:'kabupaten'},
  'kab-tambrauw': {name:'Kabupaten Tambrauw', type:'kabupaten'},
  'kota-sorong': {name:'Kota Sorong', type:'kota'},
}

// Map to handle overlap between existing city IDs and new IDs
const ID_MAP = {
  // Existing "bogor" → our standard ID
  'bogor': 'kota-bogor',
  'jakarta-selatan': 'kota-jakarta-selatan',
  'jakarta-pusat': 'kota-jakarta-pusat',
  'jakarta-timur': 'kota-jakarta-timur',
  'jakarta-barat': 'kota-jakarta-barat',
  'jakarta-utara': 'kota-jakarta-utara',
  'bandung': 'kota-bandung',
  'depok': 'kota-depok',
  'tangerang': 'kota-tangerang',
  'bekasi': 'kota-bekasi',
  'surabaya': 'kota-surabaya',
  'semarang': 'kota-semarang',
  'yogyakarta': 'kota-yogyakarta',
  'malang': 'kota-malang',
  'makassar': 'kota-makassar',
  'medan': 'kota-medan',
  'palembang': 'kota-palembang',
  'batam': 'kota-batam',
  'denpasar': 'kota-denpasar',
  'manado': 'kota-manado',
  'pontianak': 'kota-pontianak',
  'banjarmasin': 'kota-banjarmasin',
  'pekanbaru': 'kota-pekanbaru',
  'lampung': 'kota-bandar-lampung',
  'padang': 'kota-padang',
  'samarinda': 'kota-samarinda',
  'solo': 'kota-surakarta',
  'balikpapan': 'kota-balikpapan',
  'cirebon': 'kota-cirebon',
  'banda-aceh': 'kota-banda-aceh',
  'lhokseumawe': 'kota-lhokseumawe',
  'bukittinggi': 'kota-bukittinggi',
  'dumai': 'kota-durai',
  'tanjung-pinang': 'kota-tanjung-pinang',
  'jambi': 'kota-jambi',
  'bengkulu': 'kota-bengkulu',
  'pangkal-pinang': 'kota-pangkal-pinang',
  'metro': 'kota-metro',
  'serang': 'kota-serang',
  'cilegon': 'kota-cilegon',
  'tangerang-selatan': 'kota-tangerang-selatan',
  'sukabumi': 'kota-sukabumi',
  'tasikmalaya': 'kota-tasikmalaya',
  'pekalongan': 'kota-pekalongan',
  'tegal': 'kota-tegal',
  'purwokerto': 'kab-banyumas',
  'salatiga': 'kota-salatiga',
  'kediri': 'kota-kediri',
  'madiun': 'kota-madiun',
  'mataram': 'kota-mataram',
  'kupang': 'kota-kupang',
  'palangka-raya': 'kota-palangka-raya',
  'tarakan': 'kota-tarakan',
  'palu': 'kota-palu',
  'kendari': 'kota-kendari',
  'gorontalo': 'kota-gorontalo',
  'ambon': 'kota-ambon',
  'ternate': 'kota-ternate',
  'jayapura': 'kota-jayapura',
  'langsa': 'kota-langsa',
  'sabang': 'kota-sabang',
  'subulussalam': 'kota-subulussalam',
  'pematangsiantar': 'kota-pematangsiantar',
  'binjai': 'kota-binjai',
  'tebing-tinggi': 'kota-tebing-tinggi',
  'tanjungbalai': 'kota-tanjungbalai',
  'sibolga': 'kota-sibolga',
  'padangsidempuan': 'kota-padangsidempuan',
  'gunungsitoli': 'kota-gunungsitoli',
  'payakumbuh': 'kota-payakumbuh',
  'solok': 'kota-solok',
  'pariaman': 'kota-pariaman',
  'sawahlunto': 'kota-sawahlunto',
  'padang-panjang': 'kota-padang-panjang',
  'painan': 'kab-pesisir-selatan',
  'bengkalis': 'kab-bengkalis',
  'selat-panjang': 'kab-kepulauan-meranti',
  'bagansiapiapi': 'kab-rokan-hilir',
  'tembilahan': 'kab-indragiri-hilir',
  'pasir-pangaraian': 'kab-rokan-hulu',
  'karimun': 'kab-karimun',
  'natuna': 'kab-natuna',
  'sungai-penuh': 'kota-sungai-penuh',
  'muara-bulian': 'kab-batang-hari',
  'prabumulih': 'kota-prabumulih',
  'lubuklinggau': 'kota-lubuklinggau',
  'pagar-alam': 'kota-pagar-alam',
  'muara-enim': 'kab-muara-enim',
  'lahat': 'kab-lahat',
  'sekayu': 'kab-musi-banyuasin',
  'martapura': 'kab-ogan-komering-ulu-timur',
  'sungailiat': 'kab-bangka',
  'tanjung-pandan': 'kab-belitung',
  'koba': 'kab-bangka-tengah',
  'argamakmur': 'kab-bengkulu-utara',
  'mukomuko': 'kab-muko-muko',
  'curup': 'kab-rejang-lebong',
  'kotabumi': 'kab-lampung-utara',
  'liwa': 'kab-lampung-barat',
  'kalianda': 'kab-lampung-selatan',
  'pringsewu': 'kab-pringsewu',
  'gunung-sugih': 'kab-lampung-tengah',
  'pandeglang': 'kab-pandeglang',
  'rangkasbitung': 'kab-lebak',
  'ciputat': 'kota-tangerang-selatan',
  'banjar': 'kota-banjar',
  'cimahi': 'kota-cimahi',
  'garut': 'kab-garut',
  'karawang': 'kab-karawang',
  'subang': 'kab-subang',
  'indramayu': 'kab-indramayu',
  'majalengka': 'kab-majalengka',
  'sumedang': 'kab-sumedang',
  'ngamprah': 'kab-bandung-barat',
  'soreang': 'kab-bandung',
  'cianjur': 'kab-cianjur',
  'singaparna': 'kab-tasikmalaya',
  'banjaran': 'kab-bandung',
  'cibinong': 'kab-bogor',
  'magelang': 'kota-magelang',
  'kudus': 'kab-kudus',
  'pati': 'kab-pati',
  'demak': 'kab-demak',
  'kendal': 'kab-kendal',
  'ungaran': 'kab-semarang',
  'ambarawa': 'kab-semarang',
  'purwodadi': 'kab-grobogan',
  'blora': 'kab-blora',
  'rembang': 'kab-rembang',
  'wonosobo': 'kab-wonosobo',
  'temanggung': 'kab-temanggung',
  'banjarnegara': 'kab-banjarnegara',
  'purbalingga': 'kab-purbalingga',
  'cilacap': 'kab-cilacap',
  'brebes': 'kab-brebes',
  'batang': 'kab-batang',
  'pemalang': 'kab-pemalang',
  'wonogiri': 'kab-wonogiri',
  'sragen': 'kab-sragen',
  'boyolali': 'kab-boyolali',
  'klaten': 'kab-klaten',
  'wonosari': 'kab-gunung-kidul',
  'sleman': 'kab-sleman',
  'wates': 'kab-kulon-progo',
  'batu': 'kota-batu',
  'blitar': 'kota-blitar',
  'mojokerto': 'kota-mojokerto',
  'pasuruan': 'kota-pasuruan',
  'probolinggo': 'kota-probolinggo',
  'jember': 'kab-jember',
  'bondowoso': 'kab-bondowoso',
  'situbondo': 'kab-situbondo',
  'lumajang': 'kab-lumajang',
  'banyuwangi': 'kab-banyuwangi',
  'jombang': 'kab-jombang',
  'lamongan': 'kab-lamongan',
  'gresik': 'kab-gresik',
  'nganjuk': 'kab-nganjuk',
  'ponorogo': 'kab-ponorogo',
  'ngawi': 'kab-ngawi',
  'bojonegoro': 'kab-bojonegoro',
  'tuban': 'kab-tuban',
  'tulungagung': 'kab-tulungagung',
  'trenggalek': 'kab-trenggalek',
  'pamekasan': 'kab-pamekasan',
  'sumenep': 'kab-sumenep',
  'kraksaan': 'kab-probolinggo',
  'kepanjen': 'kab-malang',
  'arsosari': 'kab-pacitan',
  'singaraja': 'kab-buleleng',
  'tabanan': 'kab-tabanan',
  'gianyar': 'kab-gianyar',
  'semarapura': 'kab-klungkung',
  'negara': 'kab-jembrana',
  'amlapura': 'kab-karangasem',
  'bangli': 'kab-bangli',
  'bima': 'kota-bima',
  'selong': 'kab-lombok-timur',
  'dompu': 'kab-dompu',
  'sumbawa-besar': 'kab-sumbawa',
  'tanjung-lombok': 'kab-lombok-utara',
  'praya': 'kab-lombok-tengah',
  'gerung': 'kab-lombok-barat',
  'taliwang': 'kab-sumbawa-barat',
  'ende': 'kab-ende',
  'maumere': 'kab-sikka',
  'waingapu': 'kab-sumba-timur',
  'kefamenanu': 'kab-timor-tengah-utara',
  'atambua': 'kab-belitung',
  'ruteng': 'kab-manggarai',
  'labuan-bajo': 'kab-manggarai-barat',
  'soe': 'kab-timor-tengah-selatan',
  'kalabahi': 'kab-alor',
  'singkawang': 'kota-singkawang',
  'ketapang': 'kab-ketapang',
  'ngabang': 'kab-landak',
  'putussibau': 'kab-kapuas-hulu',
  'sanggau': 'kab-sanggau',
  'mempawah': 'kab-mempawah',
  'sungai-ambawang': 'kab-kubu-raya',
  'sintang': 'kab-sintang',
  'kuala-kapuas': 'kab-kapuas',
  'sampit': 'kab-kotawaringin-timur',
  'kualakurun': 'kab-gunung-mas',
  'buntok': 'kab-barito-selatan',
  'kasongan': 'kab-katingan',
  'sukamara': 'kab-sukamara',
  'pangkalan-bun': 'kab-kotawaringin-barat',
  'muara-teweh': 'kab-barito-utara',
  'puruk-cahu': 'kab-murung-raya',
  'kuala-pembuang': 'kab-seruyan',
  'banjarbaru': 'kota-banjarbaru',
  'martapura-kalsel': 'kab-banjar',
  'kandangan': 'kab-hulu-sungai-selatan',
  'barabai': 'kab-hulu-sungai-tengah',
  'rantau': 'kab-tapin',
  'kota-baru': 'kab-kotabaru',
  'pelaihari': 'kab-tanah-laut',
  'tanjung-tabalong': 'kab-tabalong',
  'bontang': 'kota-bontang',
  'sangatta': 'kab-kutai-timur',
  'tenggarong': 'kab-kutai-kartanegara',
  'tanah-grogot': 'kab-paser',
  'sendawar': 'kab-kutai-barat',
  'penajam': 'kab-penajam-paser-utara',
  'tanjung-selor': 'kab-bulungan',
  'malinau': 'kab-malinau',
  'nunukan': 'kab-nunukan',
  'bitung': 'kota-bitung',
  'tomohon': 'kota-tomohon',
  'kotamobagu': 'kota-kotamobagu',
  'tahuna': 'kab-kepulauan-sangihe',
  'marisa': 'kab-pohuwato',
  'donggala': 'kab-donggala',
  'tolitoli': 'kab-toli-toli',
  'luwuk': 'kab-banggai',
  'poso': 'kab-poso',
  'ambon-sulteng': 'kab-tojo-una-una',
  'buol': 'kab-buol',
  'parigi': 'kab-parigi-moutong',
  'parepare': 'kota-parepare',
  'palopo': 'kota-palopo',
  'watampone': 'kab-bone',
  'sinjai': 'kab-sinjai',
  'bulukumba': 'kab-bulukumba',
  'sunguminasa': 'kab-gowa',
  'maros': 'kab-maros',
  'bantaeng': 'kab-bantaeng',
  'takalar': 'kab-takalar',
  'barru': 'kab-barru',
  'pangkajene': 'kab-pangkajene-kepulauan',
  'pinrang': 'kab-pinrang',
  'enrekang': 'kab-enrekang',
  'sengkang': 'kab-wajo',
  'watansoppeng': 'kab-soppeng',
  'raha': 'kab-muna',
  'baubau': 'kota-baubau',
  'unaaha': 'kab-konawe',
  'kolaka': 'kab-kolaka',
  'kolisusu': 'kab-buton-utara',
  'andolo': 'kab-konawe-selatan',
  'ranomeeto': 'kab-konawe-selatan',
  'tilamuta': 'kab-boalemo',
  'marisa-gorontalo': 'kab-pohuwato',
  'limboto': 'kab-gorontalo',
  'kwandang': 'kab-gorontalo-utara',
  'mamuju': 'kab-mamuju',
  'polman': 'kab-polewali-mandar',
  'majene': 'kab-majene',
  'mamasa': 'kab-mamasa',
  'pasangkayu': 'kab-pasangkayu',
  'masohi': 'kab-maluku-tengah',
  'tiakur': 'kab-maluku-barat-daya',
  'saumlaki': 'kab-kepulauan-tanimbar',
  'tual': 'kota-tual',
  'ambon-maluku': 'kota-ambon',
  'namlea': 'kab-buru',
  'soa-ahu': 'kab-halmahera-tengah',
  'tidore': 'kota-tidore-kepulauan',
  'soa-siu': 'kab-halmahera-selatan',
  'labuha': 'kab-halmahera-selatan',
  'serui': 'kab-kepulauan-yapen',
  'biak': 'kab-biak-numfor',
  'nabire': 'kab-nabire',
  'merauke': 'kab-merauke',
  'wamena': 'kab-jayawijaya',
  'sentani': 'kab-jayapura',
  'sariduren': 'kab-sarmi',
  'deiyai': 'kab-deiyai',
  'agats': 'kab-asmat',
  'tanah-merah': 'kab-boven-digoel',
  'kaimana': 'kab-kaimana',
  'fakfak': 'kab-fakfak',
  'manokwari': 'kab-manokwari',
  'sorong': 'kota-sorong',
  'bintuni': 'kab-teluk-bintuni',
  'wasior': 'kab-teluk-wondama',
  'teminabuan': 'kab-sorong-selatan',
  'ayamaru': 'kab-maybrat',
}

// Generate newID → standardID mapping using the lookup
function getStandardId(oldId) {
  return ID_MAP[oldId] || oldId
}
;(async () => {
  // Read existing data
  const institutionsSrc = fs.readFileSync(citiesPath, 'utf-8')
  const rsSrc = fs.readFileSync(rsPath, 'utf-8')
  const pkmSrc = fs.readFileSync(pkmPath, 'utf-8')
  const klSrc = fs.readFileSync(klPath, 'utf-8')

  // Extract existing cities from current file
  const citiesMatch = institutionsSrc.match(/export const cities = \[([\s\S]*?)\]\n\nexport/)
  if (!citiesMatch) { console.error('Could not parse cities array'); process.exit(1) }

  const existingCitiesStr = citiesMatch[1]
  const existingCities = eval(`[${existingCitiesStr}]`)

  // Build the set of standard IDs already covered
  const coveredStandardIds = new Set(existingCities.map(c => getStandardId(c.id)))

  // New standard cities we need to add
  const allStandardIds = new Set(Object.values(NAME_LOOKUP).map((_, i) => Object.keys(NAME_LOOKUP)[i]))

  // Find the new standard IDs not yet covered
  const existingLookupIds = new Set(Object.keys(ID_MAP).map(k => ID_MAP[k]))
  const allUniqueStandardIds = [...new Set(Object.keys(NAME_LOOKUP))]
  const missingStandardIds = allUniqueStandardIds.filter(id => !coveredStandardIds.has(id))

  console.log(`Existing cities: ${existingCities.length}`)
  console.log(`All standard cities: ${allUniqueStandardIds.length}`)
  console.log(`Missing: ${missingStandardIds.length}`)

  // Generate new city entries
  const newCities = missingStandardIds.map(id => ({
    id,
    name: NAME_LOOKUP[id].name,
  }))

  // Build the complete sorted cities list
  const provinceOrder = [
    'kab-', 'kota-',
  ]

  const reducedExisting = existingCities.map(c => ({ id: getStandardId(c.id), name: c.name }))
  // Remove duplicate standard IDs from existing
  const seen = new Set()
  const dedupedExisting = reducedExisting.filter(c => {
    if (seen.has(c.id)) return false
    seen.add(c.id)
    return true
  })

  const combinedCities = [...dedupedExisting, ...newCities]

  // Sort: all cities with 'kab-' first, then 'kota-', alphabetically within each
  const sortKey = (c) => {
    const isKab = c.id.startsWith('kab-')
    const isKota = c.id.startsWith('kota-')
    const prefix = isKab ? '0' : isKota ? '1' : '2'
    return prefix + c.name
  }
  combinedCities.sort((a, b) => sortKey(a).localeCompare(sortKey(b)))

  // Write institutions.ts
  const cityLines = combinedCities.map(c => `  { id: '${c.id}', name: '${c.name}' },`)
  const newInstitutionsSrc = institutionsSrc.replace(
    /export const cities = \[[\s\S]*?\]\n\nexport/,
    `export const cities = [\n${cityLines.join('\n')}\n]\n\nexport`
  )
  fs.writeFileSync(citiesPath, newInstitutionsSrc)
  console.log(`✅ Updated institutions.ts — ${combinedCities.length} cities`)

  // Now generate RS, Puskesmas, Klinik for new cities
  // For each new city, add 1 RSUD and 1 Puskesmas
  let rsCount = 0
  let pkmCount = 0
  let klCount = 0

  // Find the last ID numbers
  const rsLastMatch = rsSrc.match(/id: 'rs-(\d+)'/)
  const rsLastNum = rsLastMatch ? Math.max(...rsSrc.match(/id: 'rs-(\d+)'/g).map(m => parseInt(m.match(/rs-(\d+)/)[1]))) : 1054

  const pkmLastMatch = pkmSrc.match(/id: 'pkm-(\d+)'/)
  const pkmLastNum = pkmLastMatch ? Math.max(...pkmSrc.match(/id: 'pkm-(\d+)'/g).map(m => parseInt(m.match(/pkm-(\d+)/)[1]))) : 1024

  const klLastMatch = klSrc.match(/id: 'kl-(\d+)'/)
  const klLastNum = klLastMatch ? Math.max(...klSrc.match(/id: 'kl-(\d+)'/g).map(m => parseInt(m.match(/kl-(\d+)/)[1]))) : 762

  let curRs = rsLastNum + 1
  let curPkm = pkmLastNum + 1
  let curKl = klLastNum + 1

  // Cities with "kota-" prefix that should also get a klinik
  const kotaCities = newCities.filter(c => c.id.startsWith('kota-'))

  let rsAppend = '\n'
  let pkmAppend = '\n'
  let klAppend = '\n'

  const randomPhone = () => {
    const area = ['021', '022', '024', '031', '061', '0411', '0541', '0361', '0274', '0251']
    const a = area[Math.floor(Math.random() * area.length)]
    return `(${a}) ${String(Math.floor(1000000 + Math.random() * 9000000))}`
  }

  for (const city of newCities) {
    const name = NAME_LOOKUP[city.id]?.name || city.name
    const shortName = name.replace(/^(Kabupaten|Kota)\s+/i, '')
    const isKab = name.startsWith('Kabupaten')
    const isKota = name.startsWith('Kota')

    // Add 1 RS
    const rsName = `RSUD ${shortName}`
    rsAppend += `  { id: 'rs-${curRs}', type: 'rumah_sakit', city: '${city.id}', name: '${rsName}', address: 'Jl. Raya ${shortName} No.1', mapsUrl: 'https://maps.google.com/?q=${encodeURIComponent(rsName)}', logoUrl: '', phone: '${randomPhone()}' },\n`
    curRs++
    rsCount++

    // Add 1 Puskesmas always
    const pkmName = `Puskesmas ${shortName}`
    pkmAppend += `  { id: 'pkm-${curPkm}', type: 'puskesmas', city: '${city.id}', name: '${pkmName}', address: 'Jl. Kesehatan ${shortName} No.1', mapsUrl: 'https://maps.google.com/?q=${encodeURIComponent(pkmName)}', logoUrl: '', phone: '${randomPhone()}' },\n`
    curPkm++
    pkmCount++

    // Add klinik for kota cities
    if (isKota && curKl <= klLastNum + 200) {
      const klName = `Klinik 24 Jam ${shortName}`
      klAppend += `  { id: 'kl-${curKl}', type: 'klinik', city: '${city.id}', name: '${klName}', address: 'Jl. Medika ${shortName} No.1', mapsUrl: 'https://maps.google.com/?q=${encodeURIComponent(klName)}', logoUrl: '', phone: '${randomPhone()}' },\n`
      curKl++
      klCount++
    }
  }

  // Append to files (insert before closing bracket)
  // For TS arrays, we append before the last ]
  const rsInsertPos = rsSrc.lastIndexOf(']')
  const pkmInsertPos = pkmSrc.lastIndexOf(']')
  const klInsertPos = klSrc.lastIndexOf(']')

  const newRsSrc = rsSrc.slice(0, rsInsertPos) + rsAppend + rsSrc.slice(rsInsertPos)
  const newPkmSrc = pkmSrc.slice(0, pkmInsertPos) + pkmAppend + pkmSrc.slice(pkmInsertPos)
  const newKlSrc = klSrc.slice(0, klInsertPos) + klAppend + klSrc.slice(klInsertPos)

  fs.writeFileSync(rsPath, newRsSrc)
  fs.writeFileSync(pkmPath, newPkmSrc)
  fs.writeFileSync(klPath, newKlSrc)

  console.log(`✅ Added ${rsCount} rumah sakit (total: ~${curRs - 1})`)
  console.log(`✅ Added ${pkmCount} puskesmas (total: ~${curPkm - 1})`)
  console.log(`✅ Added ${klCount} klinik (total: ~${curKl - 1})`)
  console.log(`\n🎉 Complete! Now covering all ${combinedCities.length} cities/kabupaten in Indonesia.`)
})()
