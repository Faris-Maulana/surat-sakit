export type InstitutionType = 'rumah_sakit' | 'puskesmas' | 'klinik'

export interface DoctorEntry {
  id: string
  name: string
  sip: string
  str: string
  specialization: string
  institutionType: InstitutionType
  createdAt: string
  expiryDate: string
}
