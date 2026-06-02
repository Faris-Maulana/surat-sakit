import type { DoctorEntry } from '../_lib/data/schemas.js'
import docData from '../_lib/data/doctors.js'
import { ok, badRequest, notFound, serverError } from '../_lib/response.js'

let doctors: DoctorEntry[] = [...(docData as DoctorEntry[])]

export function setDoctors(d: DoctorEntry[]) {
  doctors = d
}

export default async function handler(req: any, res: any) {
  try {
    const id = req.query.id as string | undefined
    if (!id) return badRequest(res, 'ID dokter diperlukan')

    const idx = doctors.findIndex(d => d.id === id)
    if (idx === -1) return notFound(res, 'Dokter tidak ditemukan')

    if (req.method === 'GET') {
      return ok(res, doctors[idx])
    }

    if (req.method === 'PUT') {
      const bodyRecord = (req.body || {}) as Record<string, unknown>
      const updates: Partial<DoctorEntry> = {}

      if ((bodyRecord.name as string)?.trim()) updates.name = (bodyRecord.name as string).trim()
      if ((bodyRecord.str as string)?.trim()) updates.str = (bodyRecord.str as string).trim()
      if ((bodyRecord.specialization as string)?.trim()) updates.specialization = (bodyRecord.specialization as string).trim()
      if (bodyRecord.institutionType) updates.institutionType = bodyRecord.institutionType as DoctorEntry['institutionType']
      if ((bodyRecord.sip as string)?.trim()) updates.sip = (bodyRecord.sip as string).trim()

      doctors[idx] = { ...doctors[idx], ...updates }
      return ok(res, doctors[idx])
    }

    if (req.method === 'DELETE') {
      doctors.splice(idx, 1)
      return res.status(204).end()
    }

    return badRequest(res, 'Method not allowed')
  } catch (err: any) {
    return serverError(res, err)
  }
}
