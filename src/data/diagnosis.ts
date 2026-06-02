export interface DiagnosisEntry {
  keywords: string[]
  diagnosis: string
  icdCode: string
}

export const diagnosisDatabase: DiagnosisEntry[] = [
  // ═══ DEMAM & INFEKSI ═══
  { keywords: ['demam', 'panas', 'meriang', 'menggigil', 'suhu tinggi', 'badan panas', 'panas dingin'], diagnosis: 'Febris (Demam)', icdCode: 'R50.9' },
  { keywords: ['batuk', 'pilek', 'flu', 'influenza', 'bersin', 'hidung tersumbat', 'selesma', 'common cold'], diagnosis: 'ISPA (Infeksi Saluran Pernapasan Akut)', icdCode: 'J06.9' },
  { keywords: ['tipes', 'tifoid', 'demam tifoid', 'tifus', 'demam mingguan'], diagnosis: 'Demam Tifoid (Tipes)', icdCode: 'A01.0' },
  { keywords: ['demam berdarah', 'dbd', 'dengue', 'demam dengue', 'bintik merah dbd'], diagnosis: 'Demam Berdarah Dengue (DBD)', icdCode: 'A97' },
  { keywords: ['covid', 'sars', 'corona', 'covid-19', 'virus corona'], diagnosis: 'COVID-19 (Konfirmasi)', icdCode: 'U07.1' },
  { keywords: ['malaria', 'demam menggigil berkala', 'panas dingin bergantian', 'klima'], diagnosis: 'Malaria', icdCode: 'B54' },
  { keywords: ['chikungunya', 'nyeri sendi demam', 'tunggi', 'demam sendi'], diagnosis: 'Chikungunya', icdCode: 'A92.0' },
  { keywords: ['cacar air', 'varicella', 'cacar', 'gelembung air', 'lepuh'], diagnosis: 'Varicella (Cacar Air)', icdCode: 'B01.9' },
  { keywords: ['campak', 'rubella', 'bintik merah', 'demam bintik merah', 'morbili'], diagnosis: 'Campak / Morbili', icdCode: 'B05.9' },

  // ═══ SALURAN NAPAS ═══
  { keywords: ['bronkitis', 'batuk berdahak', 'dahak kuning', 'dahak hijau', 'batuk berdahak kental'], diagnosis: 'Bronkitis Akut', icdCode: 'J20.9' },
  { keywords: ['sinusitis', 'sinus', 'wajah terasa berat', 'ingus kental', 'nyeri wajah', 'hidung tersumbat kronis'], diagnosis: 'Sinusitis Akut', icdCode: 'J01.9' },
  { keywords: ['sesak napas', 'sesak', 'ngos-ngosan', 'napas berat', 'asma', 'mengi', 'napas bunyi', 'wheezing'], diagnosis: 'Asma Bronkiale / Sesak Napas', icdCode: 'J45.9' },
  { keywords: ['pneumonia', 'radang paru', 'infeksi paru', 'batuk demam sesak'], diagnosis: 'Pneumonia / Bronkopneumonia', icdCode: 'J18.9' },
  { keywords: ['tbc', 'tb paru', 'tuberkulosis', 'batuk lama', 'batuk berdarah', 'batuk sebulan'], diagnosis: 'Tuberkulosis Paru', icdCode: 'A15.0' },
  { keywords: ['faringitis', 'radang tenggorokan', 'sakit tenggorokan', 'nyeri telan', 'tenggorokan merah'], diagnosis: 'Faringitis Akut', icdCode: 'J02.9' },
  { keywords: ['tonsilitis', 'amandel', 'radang amandel', 'amandel bengkak', 'tonsil'], diagnosis: 'Tonsilitis Akut', icdCode: 'J03.9' },
  { keywords: ['laringitis', 'radang pita suara', 'suara serak', 'kehilangan suara', 'parau'], diagnosis: 'Laringitis Akut', icdCode: 'J04.0' },

  // ═══ KEPALA & SARAF ═══
  { keywords: ['sakit kepala', 'pusing', 'kepala', 'migrain', 'nyeri kepala', 'kepala berat'], diagnosis: 'Cephalgia (Sakit Kepala Tegang)', icdCode: 'R51' },
  { keywords: ['vertigo', 'kliyengan', 'pusing berputar', 'semua berputar', 'mabuk darat'], diagnosis: 'Vertigo Perifer', icdCode: 'H81.9' },
  { keywords: ['insomnia', 'susah tidur', 'tidur tidak nyenyak', 'sering terbangun', 'sulit tidur', 'susah memejamkan mata'], diagnosis: 'Insomnia Primer', icdCode: 'G47.0' },
  { keywords: ['kejang', 'step', 'ayan', 'epilepsi', 'kejang demam', 'kejang-kejang'], diagnosis: 'Epilepsi / Kejang Demam', icdCode: 'G40.9' },
  { keywords: ['leher kaku', 'tengkuk kaku', 'kaku leher', 'nyeri leher', 'cervicalgia'], diagnosis: 'Cervicalgia (Nyeri Leher)', icdCode: 'M54.2' },
  { keywords: ['kesemutan', 'baal', 'mati rasa', 'kebas', 'tebal', 'tangan kesemutan'], diagnosis: 'Parestesi / Neuropati Perifer', icdCode: 'G64' },

  // ═══ MATA ═══
  { keywords: ['sakit mata', 'mata merah', 'belekan', 'konjungtivitis', 'mata gatal', 'mata berair', 'belekan mata'], diagnosis: 'Konjungtivitis Akut', icdCode: 'H10.9' },
  { keywords: ['mata kering', 'kering', 'mata perih', 'silau', 'mata lelah'], diagnosis: 'Dry Eye Syndrome (Mata Kering)', icdCode: 'H04.1' },
  { keywords: ['timbilan', 'tembel', 'biton', 'benjolan kelopak', 'hordeolum'], diagnosis: 'Hordeolum (Timbilan)', icdCode: 'H00.0' },

  // ═══ TELINGA ═══
  { keywords: ['sakit telinga', 'telinga sakit', 'congek', 'telinga berair', 'telinga berdengung', 'tinitus'], diagnosis: 'Otitis Media Akut', icdCode: 'H66.9' },
  { keywords: ['telinga berdenging', 'denging', 'tinitus', 'telinga bunyi'], diagnosis: 'Tinnitus', icdCode: 'H93.1' },
  { keywords: ['kotoran telinga', 'telinga tersumbat', 'serumen', 'ear wax'], diagnosis: 'Serumen Prop (Kotoran Telinga)', icdCode: 'H61.2' },

  // ═══ MULUT & GIGI ═══
  { keywords: ['sariawan', 'stomatitis', 'sariawan mulut', 'gusi sariawan', 'luka mulut'], diagnosis: 'Stomatitis Aftosa Rekuren', icdCode: 'K12.0' },
  { keywords: ['gondok', 'gondongan', 'bengkak leher', 'parotitis'], diagnosis: 'Parotitis (Gondongan)', icdCode: 'B26.9' },
  { keywords: ['sakit gigi', 'gigi berlubang', 'gusi bengkak', 'gusi berdarah', 'sakit gusi', 'gigi ngilu', 'berlubang'], diagnosis: 'Karies Gigi / Pulpitis', icdCode: 'K02.9' },
  { keywords: ['candidiasis', 'jamur mulut', 'sariawan putih', 'bintik putih mulut', 'thrush'], diagnosis: 'Kandidiasis Oral', icdCode: 'B37.0' },
  { keywords: ['bau mulut', 'halitosis', 'nafas tidak segar'], diagnosis: 'Halitosis (Bau Mulut)', icdCode: 'R19.6' },

  // ═══ LAMBUNG & PENCERNAAN ═══
  { keywords: ['sakit perut', 'mual', 'muntah', 'diare', 'mencret', 'perut kembung', 'mules', 'bab cair', 'buang air terus'], diagnosis: 'Gastroenteritis Akut', icdCode: 'A09' },
  { keywords: ['maag', 'lambung', 'nyeri ulu hati', 'asam lambung', 'gerd', 'perih', 'mual asam', 'lambung perih', 'nyeri lambung'], diagnosis: 'Dyspepsia / Gastritis', icdCode: 'K30' },
  { keywords: ['wasir', 'ambeien', 'bab berdarah', 'sakit saat bab', 'benjolan dubur', 'hemoroid'], diagnosis: 'Wasir / Hemoroid Internal', icdCode: 'K64.9' },
  { keywords: ['sembelit', 'konstipasi', 'susah bab', 'susah buang air', 'tidak bab'], diagnosis: 'Konstipasi (Sembelit)', icdCode: 'K59.0' },
  { keywords: ['cacingan', 'perut buncit', 'cacing', 'sering sakit perut anak', 'gatal dubur'], diagnosis: 'Helmintiasis (Cacingan)', icdCode: 'B82.9' },
  { keywords: ['apendisitis', 'usus buntu', 'nyeri perut kanan bawah'], diagnosis: 'Apendisitis Akut (Observasi)', icdCode: 'K35.9' },
  { keywords: ['intoleransi laktosa', 'perut kembung susu', 'mual minum susu'], diagnosis: 'Intoleransi Laktosa', icdCode: 'E73.9' },

  // ═══ OTOT & SENDI ═══
  { keywords: ['sakit pinggang', 'nyeri punggung', 'pegal pinggang', 'linu', 'nyeri pinggang', 'low back pain', 'lbp'], diagnosis: 'Low Back Pain (LBP) / Myalgia', icdCode: 'M54.5' },
  { keywords: ['nyeri sendi', 'rematik', 'asam urat', 'encok', 'pegel linu', 'sendi bengkak', 'nyeri jari kaki'], diagnosis: 'Gout Arthritis (Asam Urat)', icdCode: 'M10.9' },
  { keywords: ['keseleo', 'terkilir', 'sprain', 'salah urat', 'salah bantal', 'pergelangan sakit'], diagnosis: 'Sprain / Keseleo', icdCode: 'S93.6' },
  { keywords: ['nyeri bahu', 'sakit bahu', 'bahu kaku', 'frozen shoulder', 'bahu nyeri'], diagnosis: 'Bursitis / Frozen Shoulder', icdCode: 'M75.5' },
  { keywords: ['rematik sendi', 'rheumatoid', 'sendi kaku pagi', 'nyeri sendi tangan'], diagnosis: 'Rheumatoid Arthritis (Rematik)', icdCode: 'M06.9' },

  // ═══ KULIT ═══
  { keywords: ['alergi', 'biduran', 'ruam', 'gatal', 'kemerahan', 'bentol', 'urtikaria', 'kaligata'], diagnosis: 'Reaksi Alergi / Urtikaria', icdCode: 'L50.9' },
  { keywords: ['panu', 'kurap', 'jamur', 'gatal jamur', 'panitia alba', 'bercak putih'], diagnosis: 'Dermatofitosis (Jamur Kulit)', icdCode: 'B35.9' },
  { keywords: ['bisul', 'furunkel', 'benjolan bernanah', 'barah', 'jerawat besar'], diagnosis: 'Furunkel / Bisul', icdCode: 'L02.9' },
  { keywords: ['eksim', 'dermatitis', 'kulit kering', 'gatal merah', 'bercak merah gatal'], diagnosis: 'Dermatitis Atopik / Eksim', icdCode: 'L20.9' },
  { keywords: ['herpes', 'cacar ular', 'gelembung nyeri', 'shingles', 'zoster'], diagnosis: 'Herpes Zoster (Cacar Ular)', icdCode: 'B02.9' },
  { keywords: ['kudis', 'scabies', 'gatal malam', 'gatal sela jari', 'koreng'], diagnosis: 'Skabies (Kudis)', icdCode: 'B86' },
  { keywords: ['jerawat', 'acne', 'wajah jerawatan', 'bintik hitam', 'komedo'], diagnosis: 'Acne Vulgaris (Jerawat)', icdCode: 'L70.0' },

  // ═══ JANTUNG & PEMBULUH ═══
  { keywords: ['hipertensi', 'darah tinggi', 'tekanan darah naik', 'tensi tinggi'], diagnosis: 'Hipertensi Esensial', icdCode: 'I10' },
  { keywords: ['hipotensi', 'darah rendah', 'tekanan darah rendah', 'tensi rendah', 'mata berkunang'], diagnosis: 'Hipotensi', icdCode: 'I95.9' },
  { keywords: ['jantung berdebar', 'palpitasi', 'berdebar', 'detak jantung cepat', 'deg-degan'], diagnosis: 'Palpitasi / Disritmia', icdCode: 'R00.2' },
  { keywords: ['nyeri dada', 'dada sakit', 'dada tertekan', 'angina', 'dada kiri nyeri'], diagnosis: 'Angina Pektoris (Observasi)', icdCode: 'I20.9' },
  { keywords: ['kolesterol', 'lemak darah', 'kolesterol tinggi', 'dislipidemia'], diagnosis: 'Dislipidemia (Kolesterol Tinggi)', icdCode: 'E78.5' },

  // ═══ METABOLIK ═══
  { keywords: ['kencing manis', 'diabetes', 'gula darah', 'kencing banyak', 'sering haus', 'cepat lapar', 'gula tinggi'], diagnosis: 'Diabetes Mellitus Tipe 2', icdCode: 'E11.9' },
  { keywords: ['anemia', 'kurang darah', 'pucat', 'muka pucat', 'mudah lelah', 'lesu', 'pusing berdiri'], diagnosis: 'Anemia', icdCode: 'D64.9' },
  { keywords: ['obesitas', 'kelebihan berat', 'gemuk', 'berat berlebih', 'bmi tinggi'], diagnosis: 'Obesitas', icdCode: 'E66.9' },
  { keywords: ['kekurangan cairan', 'dehidrasi', 'haus terus', 'badan lemas dehidrasi'], diagnosis: 'Dehidrasi Ringan – Sedang', icdCode: 'E86' },

  // ═══ PSIKOLOGIS ═══
  { keywords: ['cemas', 'gelisah', 'panik', 'ansietas', 'stres', 'khawatir berlebih'], diagnosis: 'Gangguan Ansietas (Kecemasan)', icdCode: 'F41.9' },
  { keywords: ['depresi', 'murung', 'sedih', 'putus asa', 'hilang semangat', 'tidak bahagia'], diagnosis: 'Gangguan Depresi', icdCode: 'F32.9' },
  { keywords: ['panic attack', 'serangan panik', 'jantung berdebar cemas', 'takut tiba-tiba'], diagnosis: 'Serangan Panik (Panic Attack)', icdCode: 'F41.0' },
  { keywords: ['burnout', 'lelah kerja', 'jenuh', 'kelelahan mental', 'stres kerja'], diagnosis: 'Burnout Sindrom', icdCode: 'Z73.0' },

  // ═══ LUKA & CEDERA ═══
  { keywords: ['luka', 'teriris', 'tertusuk', 'lecet', 'memar', 'luka robek', 'kecelakaan', 'terluka'], diagnosis: 'Vulnus Laceratum / Kontusio', icdCode: 'S01.9' },
  { keywords: ['patah tulang', 'fraktur', 'retak tulang', 'tulang patah', 'kecelakaan patah'], diagnosis: 'Fraktur Tertutup', icdCode: 'T14.2' },
  { keywords: ['luka bakar', 'terbakar', 'kena api', 'kena air panas', 'tersiram', 'melepuh'], diagnosis: 'Combustio (Luka Bakar)', icdCode: 'T30.0' },
  { keywords: ['benturan', 'jatuh', 'terpukul', 'kecelakaan jatuh'], diagnosis: 'Kontusio (Memar Jaringan Lunak)', icdCode: 'S00.9' },

  // ═══ PEDIATRI ═══
  { keywords: ['kejang demam anak', 'step anak', 'anak demam kejang'], diagnosis: 'Kejang Demam Sederhana', icdCode: 'G40.3' },
  { keywords: ['diare anak', 'anak mencret', 'bab cair anak'], diagnosis: 'Gastroenteritis Akut Anak', icdCode: 'A09' },
  { keywords: ['imunisasi', 'vaksinasi', 'vaksin anak', 'imunisasi dasar'], diagnosis: 'Imunisasi / Vaksinasi', icdCode: 'Z23' },

  // ═══ UMUM ═══
  { keywords: ['lemas', 'capek', 'lesu', 'letih', 'tidak bertenaga', 'badan lemas', 'lelah terus'], diagnosis: 'Asthenia (Kelelahan)', icdCode: 'R53.83' },
  { keywords: ['mabuk perjalanan', 'mabuk darat', 'mabuk laut', 'mabuk kendaraan'], diagnosis: 'Motion Sickness (Mabuk Perjalanan)', icdCode: 'T75.3' },
  { keywords: ['keracunan makanan', 'keracunan', 'makanan basi', 'mual muntah diare'], diagnosis: 'Keracunan Makanan', icdCode: 'T62.9' },
]

// Conversational fillers to strip before matching
const FILLERS = /\bsaya\b|pasien|sudah|selama|sejak|telah|yang|dan|atau|juga|dengan|tidak|ada|hari\b|jam\b|bulan\b|tahun\b|\d+/gi

export interface AutoDiagnoseResult {
  primary: { diagnosis: string; icdCode: string }
  alternatives: { diagnosis: string; icdCode: string; matchCount: number }[]
}

export function autoDiagnose(keluhan: string): AutoDiagnoseResult {
  // Normalize: lowercase, strip fillers
  const normalized = keluhan.toLowerCase().replace(FILLERS, '').replace(/\s+/g, ' ').trim()
  const words = normalized.split(' ').filter(Boolean)

  const scored: { entry: DiagnosisEntry; matchCount: number; totalLength: number }[] = []

  for (const entry of diagnosisDatabase) {
    let matchCount = 0
    let totalLength = 0

    for (const kw of entry.keywords) {
      if (normalized.includes(kw)) {
        matchCount++
        totalLength += kw.length
      }
    }

    // Also check individual words for short keyword matching
    for (const word of words) {
      if (word.length >= 3) {
        for (const kw of entry.keywords) {
          if (kw === word || (kw.includes(word) && word.length >= 5)) {
            matchCount++
            totalLength += word.length
          }
        }
      }
    }

    if (matchCount > 0) {
      scored.push({ entry, matchCount, totalLength })
    }
  }

  // Deduplicate: keep entry with highest match count per ICD code
  const byIcd = new Map<string, typeof scored[0]>()
  for (const s of scored) {
    const existing = byIcd.get(s.entry.icdCode)
    if (!existing || s.matchCount > existing.matchCount) {
      byIcd.set(s.entry.icdCode, s)
    }
  }

  const unique = Array.from(byIcd.values())

  // Sort: most keyword matches first, then by total matched length
  unique.sort((a, b) => b.matchCount - a.matchCount || b.totalLength - a.totalLength)

  if (unique.length === 0) {
    return {
      primary: { diagnosis: 'Observasi / Belum dapat ditegakkan', icdCode: 'Z03.8' },
      alternatives: [],
    }
  }

  return {
    primary: { diagnosis: unique[0].entry.diagnosis, icdCode: unique[0].entry.icdCode },
    alternatives: unique.slice(1, 4).map((s) => ({
      diagnosis: s.entry.diagnosis,
      icdCode: s.entry.icdCode,
      matchCount: s.matchCount,
    })),
  }
}
