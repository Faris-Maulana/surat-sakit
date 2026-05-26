export type InstitutionType = 'rumah_sakit' | 'puskesmas' | 'klinik'

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

export interface Diagnosis {
  keluhan: string
  diagnosis: string
  icdCode: string
  catatan?: string
}

export interface RestPeriod {
  startDate: string
  endDate: string
}

export interface DoctorData {
  name: string
  sip: string
}

export interface LetterData {
  institution: Institution | null
  patient: PatientData
  diagnosis: Diagnosis
  restPeriod: RestPeriod
  doctor: DoctorData
  letterNumber: string
  createdAt: string
}
