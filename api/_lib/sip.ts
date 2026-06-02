const ISSUER_MAP: Record<string, string> = {
  rumah_sakit: 'DKK',
  puskesmas: 'PMK',
  klinik: 'KS',
}

export function generateSip(institutionType: string, seq: number, year: number): string {
  const issuer = ISSUER_MAP[institutionType] || 'DKK'
  const seqStr = String(seq).padStart(6, '0')
  return `SIP. 503.1.2.2/${seqStr}/${issuer}/${year}`
}

export function validateSip(sip: string): { valid: boolean; error?: string } {
  const re = /^SIP\.\s*503\.1\.2\.2\/(\d{6})\/(DKK|PMK|KS)\/(\d{4})$/
  if (!re.test(sip.trim())) {
    return { valid: false, error: 'Format SIP tidak sesuai (contoh: SIP. 503.1.2.2/000001/DKK/2026)' }
  }
  return { valid: true }
}
