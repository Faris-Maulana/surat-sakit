export type InstitutionType = 'rumah_sakit' | 'puskesmas' | 'klinik'
export type LetterType = 'sakit' | 'sehat' | 'rujukan'

export interface Institution {
  id: string
  type: InstitutionType
  name: string
  address: string
  city: string
  mapsUrl: string
  logoUrl: string
  phone: string
}

export interface PatientData {
  name: string
  nik: string
  birthPlace: string
  birthDate: string
  gender: 'Laki-laki' | 'Perempuan'
  address: string
  occupation: string
}

export interface SingleDiagnosis {
  diagnosis: string
  icdCode: string
}

export interface Diagnosis {
  keluhan: string
  diagnosis: string
  icdCode: string
  catatan?: string
  secondary?: SingleDiagnosis[]
}

export interface RestPeriod {
  startDate: string
  endDate: string
}

export interface DoctorData {
  name: string
  sip: string
}

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

export interface ReferralData {
  destinationInstitution: string
  destinationDoctor: string
  reason: string
}

export interface LetterData {
  letterType: LetterType
  institution: Institution | null
  patient: PatientData
  diagnosis: Diagnosis
  restPeriod: RestPeriod
  doctor: DoctorData
  referral?: ReferralData
  letterNumber: string
  createdAt: string
}
