export interface DiagnosisEntry {
  keywords: string[]
  diagnosis: string
  icdCode: string
}

export const diagnosisDatabase: DiagnosisEntry[] = [
  // Demam & Infeksi
  { keywords: ['demam', 'panas', 'meriang', 'menggigil', 'suhu tinggi', 'badan panas'], diagnosis: 'Febris (Demam)', icdCode: 'R50.9' },
  { keywords: ['batuk', 'pilek', 'flu', 'influenza', 'bersin', 'hidung tersumbat', 'selesma'], diagnosis: 'ISPA (Infeksi Saluran Pernapasan Akut)', icdCode: 'J06.9' },
  { keywords: ['tipes', 'tifoid', 'demam tifoid', 'tifus'], diagnosis: 'Demam Tifoid (Tipes)', icdCode: 'A01.0' },
  { keywords: ['demam berdarah', 'dbd', 'dengue', 'demam dengue'], diagnosis: 'Demam Berdarah Dengue (DBD)', icdCode: 'A97' },
  { keywords: ['covid', 'sars', 'corona', 'covid-19'], diagnosis: 'COVID-19 (Konfirmasi)', icdCode: 'U07.1' },
  { keywords: ['bronkitis', 'batuk berdahak', 'dahak kuning', 'dahak hijau'], diagnosis: 'Bronkitis Akut', icdCode: 'J20.9' },
  { keywords: ['sinusitis', 'sinus', 'wajah terasa berat', 'ingus kental'], diagnosis: 'Sinusitis Akut', icdCode: 'J01.9' },

  // Kepala & Syaraf
  { keywords: ['sakit kepala', 'pusing', 'kepala', 'migrain', 'nyeri kepala', 'vertigo', 'kliyengan', 'pusing berputar'], diagnosis: 'Cephalgia (Sakit Kepala)', icdCode: 'R51' },
  { keywords: ['insomnia', 'susah tidur', 'tidur tidak nyenyak', 'sering terbangun', 'sulit tidur'], diagnosis: 'Insomnia', icdCode: 'G47.0' },
  { keywords: ['kejang', 'step', 'ayan', 'epilepsi', 'kejang demam'], diagnosis: 'Epilepsi / Kejang Demam', icdCode: 'G40.9' },

  // Tenggorokan & Mulut
  { keywords: ['sakit tenggorokan', 'tenggorokan', 'radang tenggorok', 'susah menelan', 'nyeri telan', 'tenggorokan merah'], diagnosis: 'Faringitis Akut', icdCode: 'J02.9' },
  { keywords: ['sariawan', 'stomatitis', 'sariawan mulut', 'gusi sariawan'], diagnosis: 'Stomatitis Aftosa Rekuren', icdCode: 'K12.0' },
  { keywords: ['gondok', 'gondongan', 'bengkak leher', 'parotitis'], diagnosis: 'Parotitis (Gondongan)', icdCode: 'B26.9' },

  // Gigi
  { keywords: ['sakit gigi', 'gigi berlubang', 'gusi bengkak', 'gusi berdarah', 'sakit gusi', 'gigi ngilu'], diagnosis: 'Karies Gigi / Pulpitis', icdCode: 'K02.9' },

  // Mata & Telinga
  { keywords: ['sakit mata', 'mata merah', 'belekan', 'konjungtivitis', 'mata gatal', 'mata berair'], diagnosis: 'Konjungtivitis', icdCode: 'H10.9' },
  { keywords: ['sakit telinga', 'telinga sakit', 'congek', 'telinga berair', 'telinga berdengung', 'tinitus'], diagnosis: 'Otitis Media Akut', icdCode: 'H66.9' },

  // Pernapasan
  { keywords: ['sesak napas', 'sesak', 'ngos-ngosan', 'napas berat', 'asma', 'mengi', 'napas bunyi'], diagnosis: 'Asma Bronkiale / Sesak Napas', icdCode: 'J45.9' },
  { keywords: ['alergi', 'biduran', 'ruam', 'gatal', 'kemerahan', 'bentol', 'urtikaria'], diagnosis: 'Reaksi Alergi / Urtikaria', icdCode: 'L50.9' },

  // Lambung & Pencernaan
  { keywords: ['sakit perut', 'mual', 'muntah', 'diare', 'mencret', 'perut kembung', 'mules', 'bab cair'], diagnosis: 'Gastroenteritis Akut', icdCode: 'A09' },
  { keywords: ['maag', 'lambung', 'nyeri ulu hati', 'asam lambung', 'gerd', 'perih', 'mual asam', 'lambung perih'], diagnosis: 'Dyspepsia / Gastritis', icdCode: 'K30' },
  { keywords: ['wasir', 'ambeien', 'bab berdarah', 'sakit saat bab', 'benjolan dubur'], diagnosis: 'Wasir / Hemoroid', icdCode: 'K64.9' },
  { keywords: ['cacingan', 'perut buncit', 'kurus', 'cacing', 'sering sakit perut anak'], diagnosis: 'Helmintiasis (Cacingan)', icdCode: 'B82.9' },

  // Otot & Sendi
  { keywords: ['sakit pinggang', 'nyeri punggung', 'pegal pinggang', 'linu', 'nyeri pinggang'], diagnosis: 'Low Back Pain (LBP) / Myalgia', icdCode: 'M54.5' },
  { keywords: ['nyeri sendi', 'rematik', 'asam urat', 'encok', 'pegel linu', 'sendi bengkak'], diagnosis: 'Gout Arthritis / Rematik', icdCode: 'M10.9' },

  // Jantung & Pembuluh Darah
  { keywords: ['hipertensi', 'darah tinggi', 'tekanan darah naik', 'tensi tinggi'], diagnosis: 'Hipertensi Esensial', icdCode: 'I10' },
  { keywords: ['kencing manis', 'diabetes', 'gula darah', 'kencing banyak', 'sering haus', 'cepat lapar'], diagnosis: 'Diabetes Mellitus Tipe 2', icdCode: 'E11.9' },

  // Darah
  { keywords: ['anemia', 'kurang darah', 'pucat', 'muka pucat', 'mudah lelah', 'lesu'], diagnosis: 'Anemia', icdCode: 'D64.9' },

  // Umum
  { keywords: ['lemas', 'capek', 'lesu', 'letih', 'tidak bertenaga', 'badan lemas'], diagnosis: 'Asthenia (Kelelahan)', icdCode: 'R53.83' },
  { keywords: ['leher kaku', 'tengkuk kaku', 'kaku leher', 'nyeri leher'], diagnosis: 'Cervicalgia (Nyeri Leher)', icdCode: 'M54.2' },

  // Luka & Cedera
  { keywords: ['luka', 'teriris', 'tertusuk', 'lecet', 'memar', 'luka robek', 'kecelakaan'], diagnosis: 'Vulnus Laceratum / Kontusio', icdCode: 'S01.9' },
  { keywords: ['patah tulang', 'fraktur', 'retak tulang', 'keseleo', 'terkilir', 'sprain'], diagnosis: 'Fraktur / Sprain', icdCode: 'T14.2' },
  { keywords: ['luka bakar', 'terbakar', 'kena api', 'kena air panas'], diagnosis: 'Combustio (Luka Bakar)', icdCode: 'T30.0' },

  // Kulit
  { keywords: ['panu', 'kurap', 'jamur', 'gatal jamur', 'panitia alba'], diagnosis: 'Dermatofitosis (Jamur Kulit)', icdCode: 'B35.9' },
  { keywords: ['bisul', 'furunkel', 'benjolan bernanah'], diagnosis: 'Furunkel / Bisul', icdCode: 'L02.9' },

  // Anak & Balita
  { keywords: ['campak', 'rubella', 'bintik merah', 'demam bintik'], diagnosis: 'Campak / Rubella', icdCode: 'B05.9' },
  { keywords: ['cacar air', 'varicella', 'cacar', 'gelembung air'], diagnosis: 'Varicella (Cacar Air)', icdCode: 'B01.9' },
  { keywords: ['malaria', 'demam menggigil', 'panas dingin berkala'], diagnosis: 'Malaria', icdCode: 'B54' },

  // Psikologis
  { keywords: ['cemas', 'gelisah', 'panik', 'ansietas', 'stres'], diagnosis: 'Gangguan Ansietas (Kecemasan)', icdCode: 'F41.9' },
  { keywords: ['depresi', 'murung', 'sedih', 'putus asa', 'hilang semangat'], diagnosis: 'Gangguan Depresi', icdCode: 'F32.9' },
]

export function autoDiagnose(keluhan: string): { diagnosis: string; icdCode: string } {
  const lower = keluhan.toLowerCase()
  const matched: { entry: DiagnosisEntry; score: number }[] = []

  for (const entry of diagnosisDatabase) {
    let score = 0
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        score += kw.length
      }
    }
    if (score > 0) {
      matched.push({ entry, score })
    }
  }

  if (matched.length === 0) {
    return {
      diagnosis: 'Observasi / Belum dapat ditegakkan',
      icdCode: 'Z03.8',
    }
  }

  matched.sort((a, b) => b.score - a.score)
  return {
    diagnosis: matched[0].entry.diagnosis,
    icdCode: matched[0].entry.icdCode,
  }
}
