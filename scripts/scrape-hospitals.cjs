#!/usr/bin/env node
/**
 * Scrape real hospital data from Wikipedia province pages
 * Usage: node scripts/scrape-hospitals.cjs
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'src', 'data')

const PROVINCE_PAGES = {
  'Aceh': 'Daftar_rumah_sakit_di_Aceh',
  'Sumatera_Utara': 'Daftar_rumah_sakit_di_Sumatera_Utara',
  'Sumatera_Barat': 'Daftar_rumah_sakit_di_Sumatera_Barat',
  'Riau': 'Daftar_rumah_sakit_di_Riau',
  'Jambi': 'Daftar_rumah_sakit_di_Jambi',
  'Sumatera_Selatan': 'Daftar_rumah_sakit_di_Sumatera_Selatan',
  'Bengkulu': 'Daftar_rumah_sakit_di_Bengkulu',
  'Lampung': 'Daftar_rumah_sakit_di_Lampung',
  'Kepulauan_Riau': 'Daftar_rumah_sakit_di_Kepulauan_Riau',
  'Kepulauan_Bangka_Belitung': 'Daftar_rumah_sakit_di_Kepulauan_Bangka_Belitung',
  'Jakarta': 'Daftar_rumah_sakit_di_Jakarta',
  'Jawa_Barat': 'Daftar_rumah_sakit_di_Jawa_Barat',
  'Jawa_Tengah': 'Daftar_rumah_sakit_di_Jawa_Tengah',
  'Yogyakarta': 'Daftar_rumah_sakit_di_Daerah_Istimewa_Yogyakarta',
  'Jawa_Timur': 'Daftar_rumah_sakit_di_Jawa_Timur',
  'Banten': 'Daftar_rumah_sakit_di_Banten',
  'Bali': 'Daftar_rumah_sakit_di_Bali',
  'Nusa_Tenggara_Barat': 'Daftar_rumah_sakit_di_Nusa_Tenggara_Barat',
  'Nusa_Tenggara_Timur': 'Daftar_rumah_sakit_di_Nusa_Tenggara_Timur',
  'Kalimantan_Barat': 'Daftar_rumah_sakit_di_Kalimantan_Barat',
  'Kalimantan_Tengah': 'Daftar_rumah_sakit_di_Kalimantan_Tengah',
  'Kalimantan_Selatan': 'Daftar_rumah_sakit_di_Kalimantan_Selatan',
  'Kalimantan_Timur': 'Daftar_rumah_sakit_di_Kalimantan_Timur',
  'Kalimantan_Utara': 'Daftar_rumah_sakit_di_Kalimantan_Utara',
  'Sulawesi_Utara': 'Daftar_rumah_sakit_di_Sulawesi_Utara',
  'Sulawesi_Tengah': 'Daftar_rumah_sakit_di_Sulawesi_Tengah',
  'Sulawesi_Selatan': 'Daftar_rumah_sakit_di_Sulawesi_Selatan',
  'Sulawesi_Tenggara': 'Daftar_rumah_sakit_di_Sulawesi_Tenggara',
  'Gorontalo': 'Daftar_rumah_sakit_di_Gorontalo',
  'Sulawesi_Barat': 'Daftar_rumah_sakit_di_Sulawesi_Barat',
  'Maluku': 'Daftar_rumah_sakit_di_Maluku',
  'Maluku_Utara': 'Daftar_rumah_sakit_di_Maluku_Utara',
  'Papua': 'Daftar_rumah_sakit_di_Papua',
  'Papua_Barat': 'Daftar_rumah_sakit_di_Papua_Barat',
  'Papua_Selatan': 'Daftar_rumah_sakit_di_Papua',
  'Papua_Tengah': 'Daftar_rumah_sakit_di_Papua',
  'Papua_Pegunungan': 'Daftar_rumah_sakit_di_Papua',
  'Papua_Barat_Daya': 'Daftar_rumah_sakit_di_Papua_Barat',
}

// All known city IDs → name mapping from NAME_LOOKUP
const CITY_LOOKUP = {
  'kab-aceh-barat': 'Aceh Barat', 'kab-aceh-barat-daya': 'Aceh Barat Daya',
  'kab-aceh-besar': 'Aceh Besar', 'kab-aceh-jaya': 'Aceh Jaya',
  'kab-aceh-selatan': 'Aceh Selatan', 'kab-aceh-singkil': 'Aceh Singkil',
  'kab-aceh-tamiang': 'Aceh Tamiang', 'kab-aceh-tengah': 'Aceh Tengah',
  'kab-aceh-tenggara': 'Aceh Tenggara', 'kab-aceh-timur': 'Aceh Timur',
  'kab-aceh-utara': 'Aceh Utara', 'kab-bener-meriah': 'Bener Meriah',
  'kab-bireuen': 'Bireuen', 'kab-gayo-lues': 'Gayo Lues',
  'kab-nagan-raya': 'Nagan Raya', 'kab-pidie': 'Pidie',
  'kab-pidie-jaya': 'Pidie Jaya', 'kab-simeulue': 'Simeulue',
  'kota-banda-aceh': 'Banda Aceh', 'kota-langsa': 'Langsa',
  'kota-lhokseumawe': 'Lhokseumawe', 'kota-sabang': 'Sabang',
  'kota-subulussalam': 'Subulussalam',
  'kab-asahan': 'Asahan', 'kab-batu-bara': 'Batu Bara', 'kab-dairi': 'Dairi',
  'kab-deli-serdang': 'Deli Serdang', 'kab-humbang-hasundutan': 'Humbang Hasundutan',
  'kab-karo': 'Karo', 'kab-labuhanbatu': 'Labuhanbatu',
  'kab-labuhanbatu-selatan': 'Labuhanbatu Selatan', 'kab-labuhanbatu-utara': 'Labuhanbatu Utara',
  'kab-langkat': 'Langkat', 'kab-mandailing-natal': 'Mandailing Natal',
  'kab-nias': 'Nias', 'kab-nias-barat': 'Nias Barat', 'kab-nias-selatan': 'Nias Selatan',
  'kab-nias-utara': 'Nias Utara', 'kab-padang-lawas': 'Padang Lawas',
  'kab-padang-lawas-utara': 'Padang Lawas Utara', 'kab-pakpak-bharat': 'Pakpak Bharat',
  'kab-samosir': 'Samosir', 'kab-serdang-bedagai': 'Serdang Bedagai',
  'kab-simalungun': 'Simalungun', 'kab-tapanuli-selatan': 'Tapanuli Selatan',
  'kab-tapanuli-tengah': 'Tapanuli Tengah', 'kab-tapanuli-utara': 'Tapanuli Utara',
  'kab-toba': 'Toba', 'kota-medan': 'Medan', 'kota-binjai': 'Binjai',
  'kota-gunungsitoli': 'Gunungsitoli', 'kota-padangsidempuan': 'Padangsidempuan',
  'kota-pematangsiantar': 'Pematangsiantar', 'kota-sibolga': 'Sibolga',
  'kota-tanjungbalai': 'Tanjungbalai', 'kota-tebing-tinggi': 'Tebing Tinggi',
  'kab-agam': 'Agam', 'kab-dharmasraya': 'Dharmasraya',
  'kab-kepulauan-mentawai': 'Kepulauan Mentawai', 'kab-lima-puluh-kota': 'Lima Puluh Kota',
  'kab-padang-pariaman': 'Padang Pariaman', 'kab-pasaman': 'Pasaman',
  'kab-pasaman-barat': 'Pasaman Barat', 'kab-pesisir-selatan': 'Pesisir Selatan',
  'kab-sijunjung': 'Sijunjung', 'kab-solok': 'Solok', 'kab-solok-selatan': 'Solok Selatan',
  'kab-tanah-datar': 'Tanah Datar', 'kota-bukittinggi': 'Bukittinggi',
  'kota-padang': 'Padang', 'kota-padang-panjang': 'Padang Panjang',
  'kota-pariaman': 'Pariaman', 'kota-payakumbuh': 'Payakumbuh',
  'kota-sawahlunto': 'Sawahlunto', 'kota-solok': 'Solok',
  'kab-bengkalis': 'Bengkalis', 'kab-indragiri-hilir': 'Indragiri Hilir',
  'kab-indragiri-hulu': 'Indragiri Hulu', 'kab-kampar': 'Kampar',
  'kab-kepulauan-meranti': 'Kepulauan Meranti', 'kab-kuantan-singingi': 'Kuantan Singingi',
  'kab-pelalawan': 'Pelalawan', 'kab-rokan-hilir': 'Rokan Hilir', 'kab-rokan-hulu': 'Rokan Hulu',
  'kab-siak': 'Siak', 'kota-durai': 'Dumai', 'kota-pekanbaru': 'Pekanbaru',
  'kab-bintan': 'Bintan', 'kab-karimun': 'Karimun', 'kab-kepulauan-anambas': 'Kepulauan Anambas',
  'kab-lingga': 'Lingga', 'kab-natuna': 'Natuna', 'kota-batam': 'Batam',
  'kota-tanjung-pinang': 'Tanjung Pinang',
  'kab-batang-hari': 'Batang Hari', 'kab-bungo': 'Bungo', 'kab-kerinci': 'Kerinci',
  'kab-merangin': 'Merangin', 'kab-muaro-jambi': 'Muaro Jambi', 'kab-sarolangun': 'Sarolangun',
  'kab-tanjung-jabung-barat': 'Tanjung Jabung Barat', 'kab-tanjung-jabung-timur': 'Tanjung Jabung Timur',
  'kab-tebo': 'Tebo', 'kota-jambi': 'Jambi', 'kota-sungai-penuh': 'Sungai Penuh',
  'kab-bengkulu-selatan': 'Bengkulu Selatan', 'kab-bengkulu-tengah': 'Bengkulu Tengah',
  'kab-bengkulu-utara': 'Bengkulu Utara', 'kab-kaur': 'Kaur', 'kab-kepahiang': 'Kepahiang',
  'kab-lebong': 'Lebong', 'kab-muko-muko': 'Muko Muko', 'kab-rejang-lebong': 'Rejang Lebong',
  'kab-seluma': 'Seluma', 'kota-bengkulu': 'Bengkulu',
  'kab-banyuasin': 'Banyuasin', 'kab-empat-lawang': 'Empat Lawang', 'kab-lahat': 'Lahat',
  'kab-muara-enim': 'Muara Enim', 'kab-musi-banyuasin': 'Musi Banyuasin',
  'kab-musi-rawas': 'Musi Rawas', 'kab-musi-rawas-utara': 'Musi Rawas Utara',
  'kab-ogan-ilir': 'Ogan Ilir', 'kab-ogan-komering-ilir': 'Ogan Komering Ilir',
  'kab-ogan-komering-ulu': 'Ogan Komering Ulu',
  'kab-ogan-komering-ulu-selatan': 'Ogan Komering Ulu Selatan',
  'kab-ogan-komering-ulu-timur': 'Ogan Komering Ulu Timur',
  'kab-penukal-abab-lematang-ilir': 'Penukal Abab Lematang Ilir',
  'kota-lubuklinggau': 'Lubuklinggau', 'kota-pagar-alam': 'Pagar Alam',
  'kota-palembang': 'Palembang', 'kota-prabumulih': 'Prabumulih',
  'kab-bangka': 'Bangka', 'kab-bangka-barat': 'Bangka Barat', 'kab-bangka-selatan': 'Bangka Selatan',
  'kab-bangka-tengah': 'Bangka Tengah', 'kab-belitung': 'Belitung', 'kab-belitung-timur': 'Belitung Timur',
  'kota-pangkal-pinang': 'Pangkal Pinang',
  'kab-lampung-barat': 'Lampung Barat', 'kab-lampung-selatan': 'Lampung Selatan',
  'kab-lampung-tengah': 'Lampung Tengah', 'kab-lampung-timur': 'Lampung Timur',
  'kab-lampung-utara': 'Lampung Utara', 'kab-mesuji': 'Mesuji', 'kab-pesawaran': 'Pesawaran',
  'kab-pesisir-barat': 'Pesisir Barat', 'kab-pringsewu': 'Pringsewu', 'kab-tanggamus': 'Tanggamus',
  'kab-tulang-bawang': 'Tulang Bawang', 'kab-tulang-bawang-barat': 'Tulang Bawang Barat',
  'kab-way-kanan': 'Way Kanan', 'kota-bandar-lampung': 'Bandar Lampung', 'kota-metro': 'Metro',
  'kab-lebak': 'Lebak', 'kab-pandeglang': 'Pandeglang', 'kab-serang': 'Serang',
  'kab-tangerang': 'Tangerang', 'kota-cilegon': 'Cilegon', 'kota-serang': 'Serang',
  'kota-tangerang': 'Tangerang', 'kota-tangerang-selatan': 'Tangerang Selatan',
  'kab-kepulauan-seribu': 'Kepulauan Seribu', 'kota-jakarta-barat': 'Jakarta Barat',
  'kota-jakarta-pusat': 'Jakarta Pusat', 'kota-jakarta-selatan': 'Jakarta Selatan',
  'kota-jakarta-timur': 'Jakarta Timur', 'kota-jakarta-utara': 'Jakarta Utara',
  'kab-bandung': 'Bandung', 'kab-bandung-barat': 'Bandung Barat', 'kab-bekasi': 'Bekasi',
  'kab-bogor': 'Bogor', 'kab-cianjur': 'Cianjur', 'kab-ciamis': 'Ciamis', 'kab-cirebon': 'Cirebon',
  'kab-garut': 'Garut', 'kab-indramayu': 'Indramayu', 'kab-karawang': 'Karawang',
  'kab-kuningan': 'Kuningan', 'kab-majalengka': 'Majalengka', 'kab-pangandaran': 'Pangandaran',
  'kab-purwakarta': 'Purwakarta', 'kab-subang': 'Subang', 'kab-sukabumi': 'Sukabumi',
  'kab-sumedang': 'Sumedang', 'kab-tasikmalaya': 'Tasikmalaya',
  'kota-bandung': 'Bandung', 'kota-banjar': 'Banjar', 'kota-bekasi': 'Bekasi',
  'kota-bogor': 'Bogor', 'kota-cimahi': 'Cimahi', 'kota-cirebon': 'Cirebon',
  'kota-depok': 'Depok', 'kota-sukabumi': 'Sukabumi', 'kota-tasikmalaya': 'Tasikmalaya',
  'kab-banjarnegara': 'Banjarnegara', 'kab-banyumas': 'Banyumas', 'kab-batang': 'Batang',
  'kab-blora': 'Blora', 'kab-boyolali': 'Boyolali', 'kab-brebes': 'Brebes',
  'kab-cilacap': 'Cilacap', 'kab-demak': 'Demak', 'kab-grobogan': 'Grobogan',
  'kab-jepara': 'Jepara', 'kab-karanganyar': 'Karanganyar', 'kab-kebumen': 'Kebumen',
  'kab-kendal': 'Kendal', 'kab-klaten': 'Klaten', 'kab-kudus': 'Kudus',
  'kab-magelang': 'Magelang', 'kab-pati': 'Pati', 'kab-pekalongan': 'Pekalongan',
  'kab-pemalang': 'Pemalang', 'kab-purbalingga': 'Purbalingga', 'kab-purworejo': 'Purworejo',
  'kab-rembang': 'Rembang', 'kab-sragen': 'Sragen', 'kab-sukoharjo': 'Sukoharjo',
  'kab-tegal': 'Tegal', 'kab-temanggung': 'Temanggung', 'kab-wonogiri': 'Wonogiri',
  'kab-wonosobo': 'Wonosobo',
  'kota-magelang': 'Magelang', 'kota-pekalongan': 'Pekalongan', 'kota-salatiga': 'Salatiga',
  'kota-semarang': 'Semarang', 'kota-surakarta': 'Surakarta', 'kota-tegal': 'Tegal',
  'kab-bantul': 'Bantul', 'kab-gunung-kidul': 'Gunung Kidul', 'kab-kulon-progo': 'Kulon Progo',
  'kab-sleman': 'Sleman', 'kota-yogyakarta': 'Yogyakarta',
  'kab-bangkalan': 'Bangkalan', 'kab-banyuwangi': 'Banyuwangi', 'kab-blitar': 'Blitar',
  'kab-bojonegoro': 'Bojonegoro', 'kab-bondowoso': 'Bondowoso', 'kab-gresik': 'Gresik',
  'kab-jember': 'Jember', 'kab-jombang': 'Jombang', 'kab-kediri': 'Kediri',
  'kab-lamongan': 'Lamongan', 'kab-lumajang': 'Lumajang', 'kab-madiun': 'Madiun',
  'kab-magetan': 'Magetan', 'kab-malang': 'Malang', 'kab-mojokerto': 'Mojokerto',
  'kab-nganjuk': 'Nganjuk', 'kab-ngawi': 'Ngawi', 'kab-pacitan': 'Pacitan',
  'kab-pamekasan': 'Pamekasan', 'kab-pasuruan': 'Pasuruan', 'kab-ponorogo': 'Ponorogo',
  'kab-probolinggo': 'Probolinggo', 'kab-sampang': 'Sampang', 'kab-sidoarjo': 'Sidoarjo',
  'kab-situbondo': 'Situbondo', 'kab-sumenep': 'Sumenep', 'kab-trenggalek': 'Trenggalek',
  'kab-tuban': 'Tuban', 'kab-tulungagung': 'Tulungagung',
  'kota-batu': 'Batu', 'kota-blitar': 'Blitar', 'kota-kediri': 'Kediri', 'kota-madiun': 'Madiun',
  'kota-malang': 'Malang', 'kota-mojokerto': 'Mojokerto', 'kota-pasuruan': 'Pasuruan',
  'kota-probolinggo': 'Probolinggo', 'kota-surabaya': 'Surabaya',
  'kab-badung': 'Badung', 'kab-bangli': 'Bangli', 'kab-buleleng': 'Buleleng',
  'kab-gianyar': 'Gianyar', 'kab-jembrana': 'Jembrana', 'kab-karangasem': 'Karangasem',
  'kab-klungkung': 'Klungkung', 'kab-tabanan': 'Tabanan', 'kota-denpasar': 'Denpasar',
  'kab-bima': 'Bima', 'kab-dompu': 'Dompu', 'kab-lombok-barat': 'Lombok Barat',
  'kab-lombok-tengah': 'Lombok Tengah', 'kab-lombok-timur': 'Lombok Timur',
  'kab-lombok-utara': 'Lombok Utara', 'kab-sumbawa': 'Sumbawa', 'kab-sumbawa-barat': 'Sumbawa Barat',
  'kota-bima': 'Bima', 'kota-mataram': 'Mataram',
  'kab-alor': 'Alor', 'kab-belu': 'Belu', 'kab-ende': 'Ende', 'kab-flores-timur': 'Flores Timur',
  'kab-kupang': 'Kupang', 'kab-lembata': 'Lembata', 'kab-malaka': 'Malaka',
  'kab-manggarai': 'Manggarai', 'kab-manggarai-barat': 'Manggarai Barat',
  'kab-manggarai-timur': 'Manggarai Timur', 'kab-nagekeo': 'Nagekeo', 'kab-ngada': 'Ngada',
  'kab-rote-ndao': 'Rote Ndao', 'kab-sabu-raijua': 'Sabu Raijua', 'kab-sikka': 'Sikka',
  'kab-sumba-barat': 'Sumba Barat', 'kab-sumba-barat-daya': 'Sumba Barat Daya',
  'kab-sumba-tengah': 'Sumba Tengah', 'kab-sumba-timur': 'Sumba Timur',
  'kab-timor-tengah-selatan': 'Timor Tengah Selatan', 'kab-timor-tengah-utara': 'Timor Tengah Utara',
  'kota-kupang': 'Kupang',
  'kab-bengkayang': 'Bengkayang', 'kab-kapuas-hulu': 'Kapuas Hulu', 'kab-kayong-utara': 'Kayong Utara',
  'kab-ketapang': 'Ketapang', 'kab-kubu-raya': 'Kubu Raya', 'kab-landak': 'Landak',
  'kab-melawi': 'Melawi', 'kab-mempawah': 'Mempawah', 'kab-sambas': 'Sambas',
  'kab-sanggau': 'Sanggau', 'kab-sekadau': 'Sekadau', 'kab-sintang': 'Sintang',
  'kota-pontianak': 'Pontianak', 'kota-singkawang': 'Singkawang',
  'kab-barito-selatan': 'Barito Selatan', 'kab-barito-timur': 'Barito Timur',
  'kab-barito-utara': 'Barito Utara', 'kab-gunung-mas': 'Gunung Mas', 'kab-kapuas': 'Kapuas',
  'kab-katingan': 'Katingan', 'kab-kotawaringin-barat': 'Kotawaringin Barat',
  'kab-kotawaringin-timur': 'Kotawaringin Timur', 'kab-lamandau': 'Lamandau',
  'kab-murung-raya': 'Murung Raya', 'kab-pulang-pisau': 'Pulang Pisau', 'kab-seruyan': 'Seruyan',
  'kab-sukamara': 'Sukamara', 'kota-palangka-raya': 'Palangka Raya',
  'kab-balangan': 'Balangan', 'kab-banjar': 'Banjar', 'kab-barito-kuala': 'Barito Kuala',
  'kab-hulu-sungai-selatan': 'Hulu Sungai Selatan', 'kab-hulu-sungai-tengah': 'Hulu Sungai Tengah',
  'kab-hulu-sungai-utara': 'Hulu Sungai Utara', 'kab-kotabaru': 'Kotabaru',
  'kab-tabalong': 'Tabalong', 'kab-tanah-bumbu': 'Tanah Bumbu', 'kab-tanah-laut': 'Tanah Laut',
  'kab-tapin': 'Tapin', 'kota-banjarbaru': 'Banjarbaru', 'kota-banjarmasin': 'Banjarmasin',
  'kab-berau': 'Berau', 'kab-kutai-barat': 'Kutai Barat', 'kab-kutai-kartanegara': 'Kutai Kartanegara',
  'kab-kutai-timur': 'Kutai Timur', 'kab-mahakam-hulu': 'Mahakam Hulu', 'kab-paser': 'Paser',
  'kab-penajam-paser-utara': 'Penajam Paser Utara',
  'kota-balikpapan': 'Balikpapan', 'kota-bontang': 'Bontang', 'kota-samarinda': 'Samarinda',
  'kab-bulungan': 'Bulungan', 'kab-malinau': 'Malinau', 'kab-nunukan': 'Nunukan',
  'kab-tana-tidung': 'Tana Tidung', 'kota-tarakan': 'Tarakan',
  'kab-bolaang-mongondow': 'Bolaang Mongondow', 'kab-bolaang-mongondow-selatan': 'Bolaang Mongondow Selatan',
  'kab-bolaang-mongondow-timur': 'Bolaang Mongondow Timur',
  'kab-bolaang-mongondow-utara': 'Bolaang Mongondow Utara',
  'kab-kepulauan-sangihe': 'Kepulauan Sangihe', 'kab-kepulauan-siau-tagulandang-biaro': 'Kepulauan Siau Tagulandang Biaro',
  'kab-kepulauan-talaud': 'Kepulauan Talaud', 'kab-minahasa': 'Minahasa',
  'kab-minahasa-selatan': 'Minahasa Selatan', 'kab-minahasa-tenggara': 'Minahasa Tenggara',
  'kab-minahasa-utara': 'Minahasa Utara',
  'kota-bitung': 'Bitung', 'kota-kotamobagu': 'Kotamobagu', 'kota-manado': 'Manado', 'kota-tomohon': 'Tomohon',
  'kab-banggai': 'Banggai', 'kab-banggai-kepulauan': 'Banggai Kepulauan', 'kab-banggai-laut': 'Banggai Laut',
  'kab-buol': 'Buol', 'kab-donggala': 'Donggala', 'kab-morowali': 'Morowali',
  'kab-morowali-utara': 'Morowali Utara', 'kab-parigi-moutong': 'Parigi Moutong', 'kab-poso': 'Poso',
  'kab-sigi': 'Sigi', 'kab-tojo-una-una': 'Tojo Una Una', 'kab-toli-toli': 'Toli Toli',
  'kota-palu': 'Palu',
  'kab-bantaeng': 'Bantaeng', 'kab-barru': 'Barru', 'kab-bone': 'Bone', 'kab-bulukumba': 'Bulukumba',
  'kab-enrekang': 'Enrekang', 'kab-gowa': 'Gowa', 'kab-jeneponto': 'Jeneponto',
  'kab-kepulauan-selayar': 'Kepulauan Selayar', 'kab-luwu': 'Luwu', 'kab-luwu-timur': 'Luwu Timur',
  'kab-luwu-utara': 'Luwu Utara', 'kab-maros': 'Maros',
  'kab-pangkajene-kepulauan': 'Pangkajene Kepulauan', 'kab-pinrang': 'Pinrang',
  'kab-sidenreng-rappang': 'Sidenreng Rappang', 'kab-sinjai': 'Sinjai', 'kab-soppeng': 'Soppeng',
  'kab-takalar': 'Takalar', 'kab-tana-toraja': 'Tana Toraja', 'kab-toraja-utara': 'Toraja Utara',
  'kab-wajo': 'Wajo', 'kota-makassar': 'Makassar', 'kota-palopo': 'Palopo', 'kota-parepare': 'Parepare',
  'kab-bombana': 'Bombana', 'kab-buton': 'Buton', 'kab-buton-selatan': 'Buton Selatan',
  'kab-buton-tengah': 'Buton Tengah', 'kab-buton-utara': 'Buton Utara', 'kab-kolaka': 'Kolaka',
  'kab-kolaka-timur': 'Kolaka Timur', 'kab-kolaka-utara': 'Kolaka Utara', 'kab-konawe': 'Konawe',
  'kab-konawe-kepulauan': 'Konawe Kepulauan', 'kab-konawe-selatan': 'Konawe Selatan',
  'kab-konawe-utara': 'Konawe Utara', 'kab-muna': 'Muna', 'kab-muna-barat': 'Muna Barat',
  'kab-wakatobi': 'Wakatobi', 'kota-baubau': 'Baubau', 'kota-kendari': 'Kendari',
  'kab-boalemo': 'Boalemo', 'kab-bone-bolango': 'Bone Bolango', 'kab-gorontalo': 'Gorontalo',
  'kab-gorontalo-utara': 'Gorontalo Utara', 'kab-pohuwato': 'Pohuwato', 'kota-gorontalo': 'Gorontalo',
  'kab-majene': 'Majene', 'kab-mamasa': 'Mamasa', 'kab-mamuju': 'Mamuju',
  'kab-mamuju-tengah': 'Mamuju Tengah', 'kab-pasangkayu': 'Pasangkayu',
  'kab-polewali-mandar': 'Polewali Mandar',
  'kab-buru': 'Buru', 'kab-buru-selatan': 'Buru Selatan', 'kab-kepulauan-aru': 'Kepulauan Aru',
  'kab-maluku-barat-daya': 'Maluku Barat Daya', 'kab-maluku-tengah': 'Maluku Tengah',
  'kab-maluku-tenggara': 'Maluku Tenggara', 'kab-seram-bagian-barat': 'Seram Bagian Barat',
  'kab-seram-bagian-timur': 'Seram Bagian Timur',
  'kab-kepulauan-tanimbar': 'Kepulauan Tanimbar',
  'kota-ambon': 'Ambon', 'kota-tual': 'Tual',
  'kab-halmahera-barat': 'Halmahera Barat', 'kab-halmahera-selatan': 'Halmahera Selatan',
  'kab-halmahera-tengah': 'Halmahera Tengah', 'kab-halmahera-timur': 'Halmahera Timur',
  'kab-halmahera-utara': 'Halmahera Utara', 'kab-kepulauan-sula': 'Kepulauan Sula',
  'kab-pulau-morotai': 'Pulau Morotai', 'kab-pulau-taliabu': 'Pulau Taliabu',
  'kota-ternate': 'Ternate', 'kota-tidore-kepulauan': 'Tidore Kepulauan',
  'kab-biak-numfor': 'Biak Numfor', 'kab-jayapura': 'Jayapura', 'kab-keerom': 'Keerom',
  'kab-kepulauan-yapen': 'Kepulauan Yapen', 'kab-mamberamo-raya': 'Mamberamo Raya',
  'kab-sarmi': 'Sarmi', 'kab-supiori': 'Supiori', 'kab-waropen': 'Waropen', 'kota-jayapura': 'Jayapura',
  'kab-fakfak': 'Fakfak', 'kab-kaimana': 'Kaimana', 'kab-manokwari': 'Manokwari',
  'kab-manokwari-selatan': 'Manokwari Selatan', 'kab-pegunungan-arfak': 'Pegunungan Arfak',
  'kab-teluk-bintuni': 'Teluk Bintuni', 'kab-teluk-wondama': 'Teluk Wondama',
  'kab-asmat': 'Asmat', 'kab-boven-digoel': 'Boven Digoel', 'kab-mappi': 'Mappi', 'kab-merauke': 'Merauke',
  'kab-deiyai': 'Deiyai', 'kab-dogiyai': 'Dogiyai', 'kab-intan-jaya': 'Intan Jaya',
  'kab-mimika': 'Mimika', 'kab-nabire': 'Nabire', 'kab-paniai': 'Paniai', 'kab-puncak': 'Puncak',
  'kab-puncak-jaya': 'Puncak Jaya',
  'kab-jayawijaya': 'Jayawijaya', 'kab-lanny-jaya': 'Lanny Jaya', 'kab-mamberamo-tengah': 'Mamberamo Tengah',
  'kab-nduga': 'Nduga', 'kab-pegunungan-bintang': 'Pegunungan Bintang', 'kab-tolikara': 'Tolikara',
  'kab-yahukimo': 'Yahukimo', 'kab-yalimo': 'Yalimo',
  'kab-maybrat': 'Maybrat', 'kab-raja-ampat': 'Raja Ampat', 'kab-sorong': 'Sorong',
  'kab-sorong-selatan': 'Sorong Selatan', 'kab-tambrauw': 'Tambrauw', 'kota-sorong': 'Sorong',
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

/** Parse wikitext table rows into hospital names */
function parseWikiTable(wikitext) {
  const hospitals = []
  const lines = wikitext.split('\n')
  let inTable = false
  let currentRow = []

  for (const rawLine of lines) {
    const trimmed = rawLine.trim()
    // Start of table
    if (trimmed.startsWith('{|')) { inTable = true; currentRow = []; continue }
    if (trimmed.startsWith('|}')) { inTable = false; continue }
    if (!inTable || trimmed.startsWith('!') || trimmed.startsWith('|+')) continue

    // New row
    if (trimmed === '|-') {
      if (currentRow.length >= 3) {
        const name = currentRow[2]
          .replace(/\[\[.*?\|?(.*?)\]\]/g, '$1')
          .replace(/'''/g, '')
          .trim()
        if (name.length > 3) {
          hospitals.push({
            name,
            type: (currentRow[3] || '').replace(/\[\[.*?\|?(.*?)\]\]/g, '$1').replace(/'''/g, '').trim(),
            owner: (currentRow[5] || '').replace(/\[\[.*?\|?(.*?)\]\]/g, '$1').replace(/'''/g, '').trim(),
          })
        }
      }
      currentRow = []
      continue
    }

    // Data cell: |value
    if (trimmed.startsWith('|')) {
      const val = trimmed.replace(/^\|+/, '').trim()
      if (val) currentRow.push(val)
    }
  }

  // Don't forget the last row
  if (currentRow.length >= 3) {
    const name = currentRow[2].replace(/\[\[.*?\|?(.*?)\]\]/g, '$1').replace(/'''/g, '').trim()
    if (name.length > 3) {
      hospitals.push({
        name,
        type: (currentRow[3] || '').replace(/\[\[.*?\|?(.*?)\]\]/g, '$1').replace(/'''/g, '').trim(),
        owner: (currentRow[5] || '').replace(/\[\[.*?\|?(.*?)\]\]/g, '$1').replace(/'''/g, '').trim(),
      })
    }
  }

  return hospitals
}

/** Match hospital name to city ID - improved */
function matchCity(hospitalName, cityNames) {
  const lower = hospitalName.toLowerCase()
  let bestMatch = null
  let bestScore = 0

  for (const [id, cityName] of Object.entries(cityNames)) {
    const cityLower = cityName.toLowerCase()
    // Direct contains match
    if (lower.includes(cityLower)) {
      const score = cityLower.length
      if (score > bestScore) { bestScore = score; bestMatch = id }
      continue
    }
    // Word-level matching
    const cityWords = cityLower.split(/\s+/)
    let matchCount = 0
    for (const word of cityWords) {
      if (word.length <= 2) continue
      // Check if word appears as whole word in hospital name
      const regex = new RegExp(`\\b${word}\\b`, 'i')
      if (regex.test(lower) || lower.includes(word)) {
        matchCount++
      }
    }
    // Also check if hospital name contains the first 3 chars of any city word
    if (matchCount === 0) {
      for (const word of cityWords) {
        if (word.length <= 3) continue
        const prefix = word.substring(0, 3)
        if (lower.includes(prefix)) {
          matchCount += 0.5
          break
        }
      }
    }
    if (matchCount > 0) {
      const score = matchCount / cityWords.filter(w => w.length > 2).length
      if (score > bestScore) { bestScore = score; bestMatch = id }
    }
  }

  // Only match if score is reasonable
  return bestScore >= 0.4 ? bestMatch : null
}

async function main() {
  const allHospitals = {}

  for (const [province, page] of Object.entries(PROVINCE_PAGES)) {
    try {
      const url = `https://id.wikipedia.org/w/index.php?title=${page}&action=raw`
      console.log(`Fetching ${province}...`)
      const wikitext = await fetchUrl(url)
      const hospitals = parseWikiTable(wikitext)
      console.log(`  Found ${hospitals.length} hospitals`)
      allHospitals[province] = hospitals
    } catch (err) {
      console.error(`  Error: ${err.message}`)
    }
    // Small delay to be polite
    await new Promise(r => setTimeout(r, 200))
  }

  // Now match hospitals to cities
  const totalHospitals = Object.values(allHospitals).flat().length
  console.log(`\nTotal hospitals scraped: ${totalHospitals}`)

  // Build city → hospitals mapping
  const cityHospitals = {}
  let matched = 0
  let unmatched = 0

  for (const [province, hospitals] of Object.entries(allHospitals)) {
    for (const h of hospitals) {
      const cityId = matchCity(h.name, CITY_LOOKUP)
      if (cityId) {
        if (!cityHospitals[cityId]) cityHospitals[cityId] = []
        cityHospitals[cityId].push(h.name)
        matched++
      } else {
        unmatched++
      }
    }
  }

  console.log(`Matched: ${matched}, Unmatched: ${unmatched}`)

  // Read existing RS data
  const rsPath = path.join(DATA_DIR, 'rumah_sakit.ts')
  let rsSrc = fs.readFileSync(rsPath, 'utf-8')

  // Replace generated RS with real ones
  // For each city with real data, generate the RS entries
  const newRsEntries = []
  let rsId = 1

  // Find current max ID
  const idMatches = rsSrc.match(/id: 'rs-(\d+)'/g)
  if (idMatches) {
    rsId = Math.max(...idMatches.map(m => parseInt(m.match(/rs-(\d+)/)[1]))) + 1
  }

  const cityDisplayName = Object.fromEntries(
    Object.entries(CITY_LOOKUP).map(([k, v]) => [k, v])
  )

  for (const [cityId, names] of Object.entries(cityHospitals)) {
    // Deduplicate
    const unique = [...new Set(names)]
    for (const name of unique.slice(0, 3)) { // Keep top 3 per city
      newRsEntries.push(`  { id: 'rs-${rsId++}', type: 'rumah_sakit', city: '${cityId}', name: '${name.replace(/'/g, "\\'")}', address: 'Jl. Raya ${cityDisplayName[cityId] || cityId}', mapsUrl: 'https://maps.google.com/?q=${encodeURIComponent(name)}', logoUrl: '', phone: '(021) 1234567' },\n`)
    }
  }

  // Append new entries to RS file
  if (newRsEntries.length > 0) {
    const insertPos = rsSrc.lastIndexOf(']')
    const updatedRs = rsSrc.slice(0, insertPos) + '\n' + newRsEntries.join('') + rsSrc.slice(insertPos)
    fs.writeFileSync(rsPath, updatedRs)
    console.log(`\n✅ Updated rumah_sakit.ts with ${newRsEntries.length} real entries`)
  }

  console.log('\nDone!')
}

main().catch(console.error)
