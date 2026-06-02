import type { DoctorEntry } from '../_lib/data/schemas.js'
import docData from '../_lib/data/doctors.js'
import { ok, serverError } from '../_lib/response.js'

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, error: 'Method not allowed' })
    }

    const result = [...(docData as DoctorEntry[])].sort((a, b) => a.name.localeCompare(b.name))

    return ok(res, {
      total: result.length,
      syncedFrom: 'static',
      doctors: result,
    })
  } catch (err: any) {
    return serverError(res, err)
  }
}
