export interface DiagnosisEntry {
  keywords: string[]
  diagnosis: string
  icdCode: string
  notes?: string
}

export const diagnosisDatabase: DiagnosisEntry[] = [
  { keywords: ['demam', 'panas', 'meriang', 'menggigil'], diagnosis: 'Febris (Demam)', icdCode: 'R50.9' },
  { keywords: ['batuk', 'pilek', 'flu', 'influenza', 'bersin'], diagnosis: 'ISPA (Infeksi Saluran Pernapasan Akut)', icdCode: 'J06.9' },
  { keywords: ['sakit kepala', 'pusing', 'kepala pusing', 'migrain', 'nyeri kepala'], diagnosis: 'Cephalgia (Sakit Kepala)', icdCode: 'R51' },
  { keywords: ['sakit perut', 'mual', 'muntah', 'diare', 'mencret', 'perut kembung'], diagnosis: 'Gastroenteritis Akut', icdCode: 'A09' },
  { keywords: ['sakit gigi', 'gigi berlubang', 'gusi bengkak'], diagnosis: 'Karies Gigi / Pulpitis', icdCode: 'K02.9' },
  { keywords: ['sakit tenggorokan', 'tenggorokan sakit', 'radang tenggorok', 'susah menelan'], diagnosis: 'Faringitis Akut', icdCode: 'J02.9' },
  { keywords: ['alergi', 'biduran', 'ruam', 'gatal', 'kemerahan'], diagnosis: 'Reaksi Alergi / Urtikaria', icdCode: 'L50.9' },
  { keywords: ['lemas', 'capek', 'lesu', 'letih', 'tidak bertenaga'], diagnosis: 'Asthenia (Kelelahan)', icdCode: 'R53.83' },
  { keywords: ['sesak napas', 'ngos-ngosan', 'napas berat', 'asma'], diagnosis: 'Asma Bronkiale / Sesak Napas', icdCode: 'J45.9' },
  { keywords: ['sakit pinggang', 'nyeri punggung', 'pegal pinggang'], diagnosis: 'Low Back Pain (LBP) / Myalgia', icdCode: 'M54.5' },
  { keywords: ['sakit mata', 'mata merah', 'belekan', 'konjungtivitis'], diagnosis: 'Konjungtivitis', icdCode: 'H10.9' },
  { keywords: ['sakit telinga', 'telinga sakit', 'congek', 'berair'], diagnosis: 'Otitis Media Akut', icdCode: 'H66.9' },
  { keywords: ['hipertensi', 'darah tinggi', 'tekanan darah naik'], diagnosis: 'Hipertensi Esensial', icdCode: 'I10' },
  { keywords: ['kencing manis', 'diabetes', 'gula darah', 'kencing banyak'], diagnosis: 'Diabetes Mellitus Tipe 2', icdCode: 'E11.9' },
  { keywords: ['nyeri sendi', 'rematik', 'asam urat', 'encok'], diagnosis: 'Gout Arthritis / Rematik', icdCode: 'M10.9' },
  { keywords: ['luka', 'teriris', 'tertusuk', 'lecet', 'memar'], diagnosis: 'Vulnus Laceratum / Kontusio', icdCode: 'S01.9' },
  { keywords: ['patah tulang', 'fraktur', 'retak tulang', 'keseleo'], diagnosis: 'Fraktur / Sprain', icdCode: 'T14.2' },
  { keywords: ['covid', 'sars', 'corona'], diagnosis: 'COVID-19 (Konfirmasi)', icdCode: 'U07.1' },
  { keywords: ['anemia', 'kurang darah', 'pucat', 'mudah lelah'], diagnosis: 'Anemia', icdCode: 'D64.9' },
  { keywords: ['insomnia', 'susah tidur', 'tidur tidak nyenyak'], diagnosis: 'Insomnia', icdCode: 'G47.0' },
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
