import type { InstitutionType, PatientData, SingleDiagnosis, LetterType } from '@/types'

const DRAFT_KEY = 'surat-sakit-draft'

export interface DraftData {
  letterType: LetterType
  step: number
  institutionType: InstitutionType | ''
  city: string
  institutionId: string | null
  patient: PatientData
  keluhan: string
  diagnosis: string
  icdCode: string
  startDate: string
  endDate: string
  doctorName: string
  sip: string
  secondaryDiagnoses: SingleDiagnosis[]
}

export function saveDraft(data: DraftData): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
  } catch {
    // localStorage full or blocked — silently fail
  }
}

export function loadDraft(): DraftData | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as DraftData
  } catch {
    return null
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch { /* noop */ }
}

// Reconstruct institution from ID after restoring draft
// (institutions are static so we can look up by ID)
export function restoreInstitution(
  institutions: { id: string; type: InstitutionType; city: string; name: string; address: string; mapsUrl: string; logoUrl: string; phone: string }[],
  id: string | null,
) {
  if (!id) return null
  return institutions.find((i) => i.id === id) || null
}
