import type { DoctorEntry } from './_lib/data/schemas.js'
import docData from './_lib/data/doctors.js'
import { ok, created, badRequest, serverError } from './_lib/response.js'
import { generateSip } from './_lib/sip.js'

const seedDoctors = docData as DoctorEntry[]

let doctors: DoctorEntry[] = [...seedDoctors]
let seq: Record<string, number> = {}

function initSeq() {
  if (Object.keys(seq).length > 0) return
  for (const d of doctors) {
    const parts = d.sip.split('/')
    const num = parseInt(parts[1], 10)
    const issuer = parts[2]
    if (!seq[issuer] || num > seq[issuer]) seq[issuer] = num
  }
}
initSeq()

function issuerForType(type: string): string {
  if (type === 'rumah_sakit') return 'DKK'
  if (type === 'puskesmas') return 'PMK'
  return 'KS'
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const type = req.query.type as string | undefined
      const q = req.query.q as string | undefined

      let results = type ? doctors.filter(d => d.institutionType === type) : [...doctors]

      if (q) {
        const query = q.toLowerCase()
        results = results.filter(d =>
          d.name.toLowerCase().includes(query) ||
          d.specialization.toLowerCase().includes(query) ||
          d.sip.toLowerCase().includes(query)
        )
      }

      results.sort((a, b) => a.name.localeCompare(b.name))
      return ok(res, results)
    }

    if (req.method === 'POST') {
      const bodyRecord = (req.body || {}) as Record<string, unknown>
      if (!(bodyRecord.name as string)?.trim()) return badRequest(res, 'Nama dokter wajib diisi')

      const instType = (bodyRecord.institutionType as string) || 'rumah_sakit'
      const issuer = issuerForType(instType)
      const nextNum = (seq[issuer] || 0) + 1
      const year = new Date().getFullYear()
      const sip = generateSip(instType, nextNum, year)
      seq[issuer] = nextNum

      const entry: DoctorEntry = {
        id: `dr-${Date.now()}`,
        name: (bodyRecord.name as string).trim(),
        sip,
        str: ((bodyRecord.str as string) || '').trim(),
        specialization: ((bodyRecord.specialization as string) || 'Dokter Umum').trim(),
        institutionType: instType as DoctorEntry['institutionType'],
        createdAt: new Date().toISOString().split('T')[0],
        expiryDate: new Date(year + 5, 0, 1).toISOString().split('T')[0],
      }

      doctors.push(entry)
      return created(res, entry)
    }

    return badRequest(res, 'Method not allowed')
  } catch (err: any) {
    return serverError(res, err)
  }
}
