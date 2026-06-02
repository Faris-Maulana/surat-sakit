export interface SipInfo {
  raw: string
  formatted: string
  prefix: string
  sequence: string
  issuerCode: string
  year: number
  valid: boolean
  error?: string
  expiryDate: string
  isActive: boolean
  monthsUntilExpiry: number
}

const ISSUER_LABELS: Record<string, string> = {
  DKK: 'Dinas Kesehatan Kota',
  PMK: 'Puskesmas',
  KS: 'Klinik Swasta',
}

export function parseSip(sip: string): SipInfo | null {
  const cleaned = sip.replace(/^SIP\.\s*/i, '').trim()
  const match = cleaned.match(/^(\d+(?:\.\d+)*)\/(\d{6})\/(\w{3})\/(\d{4})$/)
  if (!match) return null

  const [, prefix, sequence, issuerCode, yearStr] = match
  const year = parseInt(yearStr, 10)
  const now = new Date()
  const expiryDate = new Date(year + 5, 0, 1)
  const diffMonths = (expiryDate.getFullYear() - now.getFullYear()) * 12 + (expiryDate.getMonth() - now.getMonth())

  const valid = year >= 2020 && year <= now.getFullYear() + 1
    && ['DKK', 'PMK', 'KS'].includes(issuerCode)
    && /^\d{6}$/.test(sequence)
    && /^\d+(\.\d+)*$/.test(prefix)

  return {
    raw: sip,
    formatted: `SIP. ${prefix}/${sequence}/${issuerCode}/${yearStr}`,
    prefix,
    sequence,
    issuerCode,
    year,
    valid,
    error: valid ? undefined : 'Format SIP tidak valid. Format: SIP. X.X.X/XXXXXX/XXX/YYYY',
    expiryDate: expiryDate.toISOString().split('T')[0],
    isActive: valid && expiryDate > now,
    monthsUntilExpiry: diffMonths,
  }
}

export function validateSip(sip: string): { valid: boolean; error?: string; info?: SipInfo } {
  const info = parseSip(sip)
  if (!info) return { valid: false, error: 'Format SIP tidak dikenali. Gunakan format: SIP. 503.1.2.2/000001/PMK/2026' }
  if (!info.valid) return { valid: false, error: info.error }
  if (!info.isActive) return { valid: false, error: `SIP sudah kadaluarsa (${info.expiryDate})`, info }
  return { valid: true, info }
}

let sequenceCounters: Record<string, number> = {}
try {
  const stored = localStorage.getItem('sip-sequence-counters')
  if (stored) sequenceCounters = JSON.parse(stored)
} catch { /* ignore */ }

function saveCounters() {
  try { localStorage.setItem('sip-sequence-counters', JSON.stringify(sequenceCounters)) } catch { /* ignore */ }
}

export function generateSip(type: 'rumah_sakit' | 'puskesmas' | 'klinik', customSequence?: number, year?: number): string {
  const yearStr = String(year || new Date().getFullYear())
  const issuerMap: Record<string, string> = { rumah_sakit: 'DKK', puskesmas: 'PMK', klinik: 'KS' }
  const issuer = issuerMap[type]

  if (!sequenceCounters[issuer]) {
    sequenceCounters[issuer] = 1
  }

  const seq = customSequence ?? sequenceCounters[issuer]
  const seqStr = String(seq).padStart(6, '0')

  if (!customSequence) {
    sequenceCounters[issuer]++
    saveCounters()
  }

  return `SIP. 503.1.2.2/${seqStr}/${issuer}/${yearStr}`
}

export function formatSip(sip: string): string {
  const cleaned = sip.replace(/^SIP\.\s*/i, '').trim()
  const parts = cleaned.split('/')
  if (parts.length === 4) {
    return `SIP. ${parts[0]}/${parts[1]}/${parts[2]}/${parts[3]}`
  }
  return `SIP. ${cleaned}`
}

export function getIssuerLabel(code: string): string {
  return ISSUER_LABELS[code] || code
}
