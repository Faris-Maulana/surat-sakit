export interface DoctorEntry {
  name: string
  sip: string
  specialization: string
}

// Realistic Indonesian doctor data grouped by institution type
const rsDoctors: DoctorEntry[] = [
  { name: 'dr. Andi Pratama, Sp.PD', sip: 'SIP. 503.1.2.2/0456/DKK/2026', specialization: 'Spesialis Penyakit Dalam' },
  { name: 'dr. Bambang Wijaya, Sp.PD', sip: 'SIP. 503.1.2.2/0789/DKK/2025', specialization: 'Spesialis Penyakit Dalam' },
  { name: 'dr. Siti Rahmawati, Sp.A', sip: 'SIP. 503.1.2.2/1122/DKK/2026', specialization: 'Spesialis Anak' },
  { name: 'dr. Hendra Gunawan, Sp.P', sip: 'SIP. 503.1.2.2/3344/DKK/2025', specialization: 'Spesialis Paru' },
  { name: 'dr. Dewi Sartika, Sp.A', sip: 'SIP. 503.1.2.2/5566/DKK/2026', specialization: 'Spesialis Anak' },
  { name: 'dr. Agus Wibowo, Sp.PD', sip: 'SIP. 503.1.2.2/7788/DKK/2025', specialization: 'Spesialis Penyakit Dalam' },
  { name: 'dr. Ratna Kusuma, Sp.PD', sip: 'SIP. 503.1.2.2/9900/DKK/2026', specialization: 'Spesialis Penyakit Dalam' },
  { name: 'dr. Irwan Setiawan, Sp.P', sip: 'SIP. 503.1.2.2/2233/DKK/2025', specialization: 'Spesialis Paru' },
  { name: 'dr. Maya Indriani', sip: 'SIP. 503.1.2.2/4455/DKK/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Fitriani Nur', sip: 'SIP. 503.1.3.2/6677/DKK/2025', specialization: 'Dokter Umum' },
  { name: 'dr. Lestari Dewi, Sp.A', sip: 'SIP. 503.1.2.2/8899/DKK/2026', specialization: 'Spesialis Anak' },
  { name: 'dr. Rudi Hartono, Sp.PD', sip: 'SIP. 503.1.2.2/1010/DKK/2025', specialization: 'Spesialis Penyakit Dalam' },
  { name: 'dr. Dimas Aditya', sip: 'SIP. 503.1.2.2/1112/DKK/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Arief Setiawan, Sp.PD', sip: 'SIP. 503.1.2.2/1314/DKK/2025', specialization: 'Spesialis Penyakit Dalam' },
  { name: 'dr. Sari Melinda, Sp.KJ', sip: 'SIP. 503.1.2.2/1516/DKK/2026', specialization: 'Spesialis Kesehatan Jiwa' },
]

const pkmDoctors: DoctorEntry[] = [
  { name: 'dr. Hendra Pratama', sip: 'SIP. 503.1.2.2/1718/PMK/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Maya Lestari', sip: 'SIP. 503.1.2.2/1920/PMK/2025', specialization: 'Dokter Umum' },
  { name: 'dr. Rudi Hartono', sip: 'SIP. 503.1.2.2/2122/PMK/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Dewi Sartika', sip: 'SIP. 503.1.2.2/2324/PMK/2025', specialization: 'Dokter Umum' },
  { name: 'dr. Agus Wibowo', sip: 'SIP. 503.1.2.2/2526/PMK/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Fitriani Nur', sip: 'SIP. 503.1.2.2/2728/PMK/2025', specialization: 'Dokter Umum' },
  { name: 'dr. Bambang Wijaya', sip: 'SIP. 503.1.2.2/2930/PMK/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Siti Rahmawati', sip: 'SIP. 503.1.2.2/3132/PMK/2025', specialization: 'Dokter Umum' },
  { name: 'dr. Dimas Aditya', sip: 'SIP. 503.1.2.2/3334/PMK/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Ratna Kusuma', sip: 'SIP. 503.1.2.2/3536/PMK/2025', specialization: 'Dokter Umum' },
]

const klinikDoctors: DoctorEntry[] = [
  { name: 'dr. Dimas Pratama', sip: 'SIP. 503.1.2.2/3738/KS/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Ratna Kusuma', sip: 'SIP. 503.1.2.2/3940/KS/2025', specialization: 'Dokter Umum' },
  { name: 'dr. Andi Pratama', sip: 'SIP. 503.1.2.2/4142/KS/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Maya Indriani', sip: 'SIP. 503.1.2.2/4344/KS/2025', specialization: 'Dokter Umum' },
  { name: 'dr. Hendra Gunawan', sip: 'SIP. 503.1.2.2/4546/KS/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Lestari Dewi', sip: 'SIP. 503.1.2.2/4748/KS/2025', specialization: 'Dokter Umum' },
  { name: 'dr. Dewi Sartika', sip: 'SIP. 503.1.2.2/4950/KS/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Arief Setiawan', sip: 'SIP. 503.1.2.2/5152/KS/2025', specialization: 'Dokter Umum' },
  { name: 'dr. Sari Melinda', sip: 'SIP. 503.1.2.2/5354/KS/2026', specialization: 'Dokter Umum' },
  { name: 'dr. Rudi Hartono', sip: 'SIP. 503.1.2.2/5556/KS/2025', specialization: 'Dokter Umum' },
]

const allDoctors = [...rsDoctors, ...pkmDoctors, ...klinikDoctors]

export function getDoctorsByType(type: string): DoctorEntry[] {
  switch (type) {
    case 'rumah_sakit': return rsDoctors
    case 'puskesmas': return pkmDoctors
    case 'klinik': return klinikDoctors
    default: return allDoctors
  }
}

export function getRandomDoctorByType(type: string): DoctorEntry {
  const doctors = getDoctorsByType(type)
  return doctors[Math.floor(Math.random() * doctors.length)]
}
