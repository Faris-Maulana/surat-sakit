import { isSupabaseConfigured, getClient } from './supabase'
import type { LetterData } from '@/types'

export async function saveLetter(data: LetterData): Promise<{ ok: boolean; id?: string }> {
  const localKey = `saved-letter-${data.letterNumber}`
  localStorage.setItem(localKey, JSON.stringify({
    letterNumber: data.letterNumber,
    letterType: data.letterType,
    institutionName: data.institution?.name || '',
    patientName: data.patient.name,
    patientNik: data.patient.nik,
    diagnosis: data.diagnosis.diagnosis,
    icdCode: data.diagnosis.icdCode,
    doctorName: data.doctor.name,
    createdAt: data.createdAt,
  }))

  if (!isSupabaseConfigured) return { ok: true }

  try {
    const supabase = getClient()
    const { data: result, error } = await (supabase.from('letters') as any)
      .insert({
        letter_number: data.letterNumber,
        letter_type: data.letterType,
        institution_name: data.institution?.name || '',
        patient_name: data.patient.name,
        patient_nik: data.patient.nik,
        patient_birth_place: data.patient.birthPlace,
        patient_birth_date: data.patient.birthDate,
        patient_gender: data.patient.gender,
        patient_address: data.patient.address,
        patient_occupation: data.patient.occupation,
        keluhan: data.diagnosis.keluhan,
        diagnosis: data.diagnosis.diagnosis,
        icd_code: data.diagnosis.icdCode,
        rest_start_date: data.restPeriod?.startDate || null,
        rest_end_date: data.restPeriod?.endDate || null,
        doctor_name: data.doctor.name,
        doctor_sip: data.doctor.sip,
        letter_json: JSON.stringify(data),
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase save error:', error)
      return { ok: true }
    }

    const saved = result as { id: string } | null
    return { ok: true, id: saved?.id }
  } catch (err) {
    console.error('Failed to save to Supabase:', err)
    return { ok: true }
  }
}

export interface LetterHistoryItem {
  letterNumber: string
  letterType: string
  institutionName: string
  patientName: string
  diagnosis: string
  createdAt: string
}

export function getLocalHistory(): LetterHistoryItem[] {
  const items: LetterHistoryItem[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('saved-letter-')) {
      try {
        const parsed = JSON.parse(localStorage.getItem(key) || '{}')
        items.push(parsed)
      } catch { /* skip */ }
    }
  }
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}


