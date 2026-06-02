import type { DoctorEntry, InstitutionType } from '@/types'
import { allDoctors } from '@/data/doctors'
import { generateSip } from '@/utils/sip'

const API_BASE = '/api'
let staticDoctors = [...allDoctors]
let nextSeq: Record<string, number> = {
  rumah_sakit: maxSeq(staticDoctors, 'rumah_sakit') + 1,
  puskesmas: maxSeq(staticDoctors, 'puskesmas') + 1,
  klinik: maxSeq(staticDoctors, 'klinik') + 1,
}

function maxSeq(list: DoctorEntry[], type: string): number {
  let max = 0
  for (const d of list) {
    if (d.institutionType !== type) continue
    const parts = d.sip.split('/')
    const seq = parseInt(parts[1], 10)
    if (seq > max) max = seq
  }
  return max
}

async function apiCall<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
    if (!res.ok) return null
    const body = await res.json() as { success: boolean; data: T }
    return body.data
  } catch {
    return null
  }
}

export const doctorService = {
  async getDoctors(type: InstitutionType | ''): Promise<DoctorEntry[]> {
    const params = type ? `?type=${type}` : ''
    const apiResult = await apiCall<DoctorEntry[]>(`/doctors${params}`)
    if (apiResult) return apiResult

    if (!type) return [...staticDoctors]
    return staticDoctors.filter(d => d.institutionType === type)
  },

  async getDoctorById(id: string): Promise<DoctorEntry | undefined> {
    const apiResult = await apiCall<DoctorEntry>(`/doctors/${id}`)
    if (apiResult) return apiResult
    return staticDoctors.find(d => d.id === id)
  },

  async searchDoctors(type: InstitutionType | '', query: string): Promise<DoctorEntry[]> {
    const params = new URLSearchParams()
    if (type) params.set('type', type)
    if (query) params.set('q', query)
    const apiResult = await apiCall<DoctorEntry[]>(`/doctors?${params}`)
    if (apiResult) return apiResult

    const list = type ? staticDoctors.filter(d => d.institutionType === type) : staticDoctors
    const q = query.toLowerCase()
    return list.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.specialization.toLowerCase().includes(q) ||
      d.sip.toLowerCase().includes(q)
    )
  },

  async addDoctor(data: {
    name: string
    str: string
    specialization: string
    institutionType: InstitutionType
  }): Promise<DoctorEntry | undefined> {
    const apiResult = await apiCall<DoctorEntry>('/doctors', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (apiResult) return apiResult

    const seq = nextSeq[data.institutionType]
    const sip = generateSip(data.institutionType, seq, new Date().getFullYear())
    const id = `dr-manual-${Date.now()}`
    const expiryDate = new Date(new Date().getFullYear() + 5, 0, 1).toISOString().split('T')[0]
    const entry: DoctorEntry = {
      id, name: data.name, sip, str: data.str,
      specialization: data.specialization, institutionType: data.institutionType,
      createdAt: new Date().toISOString().split('T')[0], expiryDate,
    }
    nextSeq[data.institutionType] = seq + 1
    staticDoctors.push(entry)
    return entry
  },

  async updateDoctor(id: string, updates: Partial<DoctorEntry>): Promise<DoctorEntry | undefined> {
    const apiResult = await apiCall<DoctorEntry>(`/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
    if (apiResult) return apiResult

    const idx = staticDoctors.findIndex(d => d.id === id)
    if (idx === -1) return undefined
    staticDoctors[idx] = { ...staticDoctors[idx], ...updates }
    return staticDoctors[idx]
  },

  async deleteDoctor(id: string): Promise<boolean> {
    const apiResult = await apiCall<null>(`/doctors/${id}`, { method: 'DELETE' })
    if (apiResult !== null) return true

    const before = staticDoctors.length
    staticDoctors = staticDoctors.filter(d => d.id !== id)
    return staticDoctors.length < before
  },
}
