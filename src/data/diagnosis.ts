export interface DiagnosisEntry {
  keywords: string[]
  diagnosis: string
  icdCode: string
  notes?: string
}

export const diagnosisDatabase: DiagnosisEntry[] = [
  { keywords: ['demam', 'panas', 'meriang', 'menggigil', 'suhu tinggi'], diagnosis: 'Febris (Demam)', icdCode: 'R50.9' },
  { keywords: ['batuk', 'pilek', 'flu', 'influenza', 'bersin', 'hidung tersumbat'], diagnosis: 'ISPA (Infeksi Saluran Pernapasan Akut)', icdCode: 'J06.9' },
  { keywords: ['sakit kepala', 'pusing', 'kepala pusing', 'migrain', 'nyeri kepala', 'vertigo', 'kliyengan'], diagnosis: 'Cephalgia (Sakit Kepala)', icdCode: 'R51' },
  { keywords: ['sakit perut', 'mual', 'muntah', 'diare', 'mencret', 'perut kembung', 'mules'], diagnosis: 'Gastroenteritis Akut', icdCode: 'A09' },
  { keywords: ['maag', 'lambung', 'nyeri ulu hati', 'asam lambung', 'GERD', 'perih'], diagnosis: 'Dyspepsia / Gastritis', icdCode: 'K30' },
  { keywords: ['sakit gigi', 'gigi berlubang', 'gusi bengkak', 'gusi berdarah', 'sakit gusi'], diagnosis: 'Karies Gigi / Pulpitis', icdCode: 'K02.9' },
  { keywords: ['sakit tenggorokan', 'tenggorokan sakit', 'radang tenggorok', 'susah menelan', 'nyeri telan'], diagnosis: 'Faringitis Akut', icdCode: 'J02.9' },
  { keywords: ['alergi', 'biduran', 'ruam', 'gatal', 'kemerahan', 'bentol'], diagnosis: 'Reaksi Alergi / Urtikaria', icdCode: 'L50.9' },
  { keywords: ['lemas', 'capek', 'lesu', 'letih', 'tidak bertenaga', 'mudah lelah'], diagnosis: 'Asthenia (Kelelahan)', icdCode: 'R53.83' },
  { keywords: ['sesak napas', 'ngos-ngosan', 'napas berat', 'asma', 'mengi'], diagnosis: 'Asma Bronkiale / Sesak Napas', icdCode: 'J45.9' },
  { keywords: ['sakit pinggang', 'nyeri punggung', 'pegal pinggang', 'linu'], diagnosis: 'Low Back Pain (LBP) / Myalgia', icdCode: 'M54.5' },
  { keywords: ['sakit mata', 'mata merah', 'belekan', 'konjungtivitis', 'mata gatal'], diagnosis: 'Konjungtivitis', icdCode: 'H10.9' },
  { keywords: ['sakit telinga', 'telinga sakit', 'congek', 'berair', 'telinga berdengung'], diagnosis: 'Otitis Media Akut', icdCode: 'H66.9' },
  { keywords: ['hipertensi', 'darah tinggi', 'tekanan darah naik'], diagnosis: 'Hipertensi Esensial', icdCode: 'I10' },
  { keywords: ['kencing manis', 'diabetes', 'gula darah', 'kencing banyak', 'sering haus'], diagnosis: 'Diabetes Mellitus Tipe 2', icdCode: 'E11.9' },
  { keywords: ['nyeri sendi', 'rematik', 'asam urat', 'encok', 'pegel linu'], diagnosis: 'Gout Arthritis / Rematik', icdCode: 'M10.9' },
  { keywords: ['luka', 'teriris', 'tertusuk', 'lecet', 'memar', 'luka robek'], diagnosis: 'Vulnus Laceratum / Kontusio', icdCode: 'S01.9' },
  { keywords: ['patah tulang', 'fraktur', 'retak tulang', 'keseleo', 'terkilir'], diagnosis: 'Fraktur / Sprain', icdCode: 'T14.2' },
  { keywords: ['covid', 'sars', 'corona', 'covid-19'], diagnosis: 'COVID-19 (Konfirmasi)', icdCode: 'U07.1' },
  { keywords: ['anemia', 'kurang darah', 'pucat', 'muka pucat'], diagnosis: 'Anemia', icdCode: 'D64.9' },
  { keywords: ['insomnia', 'susah tidur', 'tidur tidak nyenyak', 'sering terbangun'], diagnosis: 'Insomnia', icdCode: 'G47.0' },
  { keywords: ['tipes', 'tifoid', 'demam tifoid'], diagnosis: 'Demam Tifoid (Tipes)', icdCode: 'A01.0' },
  { keywords: ['demam berdarah', 'dbd', 'dengue'], diagnosis: 'Demam Berdarah Dengue (DBD)', icdCode: 'A97' },
  { keywords: ['cacingan', 'perut buncit', 'kurus', 'sering sakit perut'], diagnosis: 'Helmintiasis (Cacingan)', icdCode: 'B82.9' },
  { keywords: ['sinusitis', 'hidung tersumbat', 'wajah terasa berat', 'ingus kental'], diagnosis: 'Sinusitis Akut', icdCode: 'J01.9' },
  { keywords: ['bronkitis', 'batuk berdahak', 'dahak kuning'], diagnosis: 'Bronkitis Akut', icdCode: 'J20.9' },
  { keywords: ['wasir', 'ambeien', 'bab berdarah', 'sakit saat bab'], diagnosis: 'Wasir / Hemoroid', icdCode: 'K64.9' },
  { keywords: ['sariawan', 'stomatitis', 'sariawan mulut'], diagnosis: 'Stomatitis Aftosa Rekuren', icdCode: 'K12.0' },
  { keywords: ['kejang', 'step', 'ayan', 'epilepsi'], diagnosis: 'Epilepsi / Kejang Demam', icdCode: 'G40.9' },
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
