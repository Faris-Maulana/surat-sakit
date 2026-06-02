import type { DoctorEntry, InstitutionType } from '@/types'
import { generateSip } from '@/utils/sip'

function makeEntry(
  id: string,
  name: string,
  specialization: string,
  type: InstitutionType,
  str: string,
  sipSeq: number,
  sipYear?: number,
): DoctorEntry {
  const year = sipYear || 2026
  const sip = generateSip(type, sipSeq, year)
  const expiryDate = new Date(year + 5, 0, 1).toISOString().split('T')[0]
  return {
    id,
    name,
    sip,
    str,
    specialization,
    institutionType: type,
    createdAt: `${year}-01-01`,
    expiryDate,
  }
}

const rsDoctors: DoctorEntry[] = [
  makeEntry('dr-rs-001', 'dr. Andi Pratama, Sp.PD', 'Spesialis Penyakit Dalam', 'rumah_sakit', 'STR. 100001/KKI/2021', 1),
  makeEntry('dr-rs-002', 'dr. Bambang Wijaya, Sp.PD', 'Spesialis Penyakit Dalam', 'rumah_sakit', 'STR. 100002/KKI/2020', 2),
  makeEntry('dr-rs-003', 'dr. Siti Rahmawati, Sp.A', 'Spesialis Anak', 'rumah_sakit', 'STR. 100003/KKI/2021', 3),
  makeEntry('dr-rs-004', 'dr. Hendra Gunawan, Sp.P', 'Spesialis Paru', 'rumah_sakit', 'STR. 100004/KKI/2020', 4),
  makeEntry('dr-rs-005', 'dr. Dewi Sartika, Sp.A', 'Spesialis Anak', 'rumah_sakit', 'STR. 100005/KKI/2021', 5),
  makeEntry('dr-rs-006', 'dr. Agus Wibowo, Sp.PD', 'Spesialis Penyakit Dalam', 'rumah_sakit', 'STR. 100006/KKI/2020', 6),
  makeEntry('dr-rs-007', 'dr. Ratna Kusuma, Sp.PD', 'Spesialis Penyakit Dalam', 'rumah_sakit', 'STR. 100007/KKI/2021', 7),
  makeEntry('dr-rs-008', 'dr. Irwan Setiawan, Sp.P', 'Spesialis Paru', 'rumah_sakit', 'STR. 100008/KKI/2020', 8),
  makeEntry('dr-rs-009', 'dr. Maya Indriani, Sp.PD', 'Spesialis Penyakit Dalam', 'rumah_sakit', 'STR. 100009/KKI/2021', 9),
  makeEntry('dr-rs-010', 'dr. Fitriani Nur, Sp.PD', 'Spesialis Penyakit Dalam', 'rumah_sakit', 'STR. 100010/KKI/2020', 10),
  makeEntry('dr-rs-011', 'dr. Lestari Dewi, Sp.A', 'Spesialis Anak', 'rumah_sakit', 'STR. 100011/KKI/2021', 11),
  makeEntry('dr-rs-012', 'dr. Rudi Hartono, Sp.PD', 'Spesialis Penyakit Dalam', 'rumah_sakit', 'STR. 100012/KKI/2020', 12),
  makeEntry('dr-rs-013', 'dr. Dimas Aditya, Sp.PD', 'Spesialis Penyakit Dalam', 'rumah_sakit', 'STR. 100013/KKI/2021', 13),
  makeEntry('dr-rs-014', 'dr. Arief Setiawan, Sp.PD', 'Spesialis Penyakit Dalam', 'rumah_sakit', 'STR. 100014/KKI/2020', 14),
  makeEntry('dr-rs-015', 'dr. Sari Melinda, Sp.PD', 'Spesialis Penyakit Dalam', 'rumah_sakit', 'STR. 100015/KKI/2021', 15),
  makeEntry('dr-rs-016', 'dr. Fajar Nugroho, Sp.B', 'Spesialis Bedah', 'rumah_sakit', 'STR. 100016/KKI/2020', 16),
  makeEntry('dr-rs-017', 'dr. Intan Permata Sari, Sp.A', 'Spesialis Anak', 'rumah_sakit', 'STR. 100017/KKI/2021', 17),
  makeEntry('dr-rs-018', 'dr. Toni Gunardi, Sp.JP', 'Spesialis Jantung', 'rumah_sakit', 'STR. 100018/KKI/2020', 18),
  makeEntry('dr-rs-019', 'dr. Indah Permatasari, Sp.M', 'Spesialis Mata', 'rumah_sakit', 'STR. 100019/KKI/2021', 19),
  makeEntry('dr-rs-020', 'dr. Yudhistira Nugraha, Sp.S', 'Spesialis Saraf', 'rumah_sakit', 'STR. 100020/KKI/2020', 20),
  makeEntry('dr-rs-021', 'dr. Maria Ulfah, Sp.KK', 'Spesialis Kulit & Kelamin', 'rumah_sakit', 'STR. 100021/KKI/2021', 21),
  makeEntry('dr-rs-022', 'dr. Denny Kusuma, Sp.THT', 'Spesialis THT', 'rumah_sakit', 'STR. 100022/KKI/2020', 22),
]

const pkmDoctors: DoctorEntry[] = [
  makeEntry('dr-pkm-001', 'dr. Hendra Pratama', 'Dokter Umum', 'puskesmas', 'STR. 200001/KKI/2021', 1),
  makeEntry('dr-pkm-002', 'dr. Maya Lestari', 'Dokter Umum', 'puskesmas', 'STR. 200002/KKI/2020', 2),
  makeEntry('dr-pkm-003', 'dr. Rudi Hermawan', 'Dokter Umum', 'puskesmas', 'STR. 200003/KKI/2021', 3),
  makeEntry('dr-pkm-004', 'dr. Dewi Anggraini', 'Dokter Umum', 'puskesmas', 'STR. 200004/KKI/2020', 4),
  makeEntry('dr-pkm-005', 'dr. Agus Salim', 'Dokter Umum', 'puskesmas', 'STR. 200005/KKI/2021', 5),
  makeEntry('dr-pkm-006', 'dr. Fitri Handayani', 'Dokter Umum', 'puskesmas', 'STR. 200006/KKI/2020', 6),
  makeEntry('dr-pkm-007', 'dr. Bambang Santoso', 'Dokter Umum', 'puskesmas', 'STR. 200007/KKI/2021', 7),
  makeEntry('dr-pkm-008', 'dr. Siti Nurhaliza', 'Dokter Umum', 'puskesmas', 'STR. 200008/KKI/2020', 8),
  makeEntry('dr-pkm-009', 'dr. Dimas Ardiansyah', 'Dokter Umum', 'puskesmas', 'STR. 200009/KKI/2021', 9),
  makeEntry('dr-pkm-010', 'dr. Ratna Dewi', 'Dokter Umum', 'puskesmas', 'STR. 200010/KKI/2020', 10),
  makeEntry('dr-pkm-011', 'dr. Slamet Riyadi', 'Dokter Umum', 'puskesmas', 'STR. 200011/KKI/2021', 11),
  makeEntry('dr-pkm-012', 'dr. Rahmawati Putri', 'Dokter Umum', 'puskesmas', 'STR. 200012/KKI/2020', 12),
  makeEntry('dr-pkm-013', 'dr. Adi Wijaya', 'Dokter Umum', 'puskesmas', 'STR. 200013/KKI/2021', 13),
  makeEntry('dr-pkm-014', 'dr. Haryanti Kusuma', 'Dokter Umum', 'puskesmas', 'STR. 200014/KKI/2020', 14),
  makeEntry('dr-pkm-015', 'dr. Eko Prasetyo', 'Dokter Umum', 'puskesmas', 'STR. 200015/KKI/2021', 15),
  makeEntry('dr-pkm-016', 'dr. Rina Marlina', 'Dokter Umum', 'puskesmas', 'STR. 200016/KKI/2020', 16),
  makeEntry('dr-pkm-017', 'dr. Taufik Hidayat', 'Dokter Gigi', 'puskesmas', 'STR. 200017/KKI/2021', 17),
  makeEntry('dr-pkm-018', 'drg. Anita Dewi', 'Dokter Gigi', 'puskesmas', 'STR. 200018/KKI/2020', 18),
]

const klinikDoctors: DoctorEntry[] = [
  makeEntry('dr-kln-001', 'dr. Dimas Pratama', 'Dokter Umum', 'klinik', 'STR. 300001/KKI/2021', 1),
  makeEntry('dr-kln-002', 'dr. Ratna Sari', 'Dokter Umum', 'klinik', 'STR. 300002/KKI/2020', 2),
  makeEntry('dr-kln-003', 'dr. Andika Putra', 'Dokter Umum', 'klinik', 'STR. 300003/KKI/2021', 3),
  makeEntry('dr-kln-004', 'dr. Maya Anggraini', 'Dokter Umum', 'klinik', 'STR. 300004/KKI/2020', 4),
  makeEntry('dr-kln-005', 'dr. Hendra Kurniawan', 'Dokter Umum', 'klinik', 'STR. 300005/KKI/2021', 5),
  makeEntry('dr-kln-006', 'dr. Lestari Wulandari', 'Dokter Umum', 'klinik', 'STR. 300006/KKI/2020', 6),
  makeEntry('dr-kln-007', 'dr. Dewi Sartika Putri', 'Dokter Umum', 'klinik', 'STR. 300007/KKI/2021', 7),
  makeEntry('dr-kln-008', 'dr. Arief Rahman', 'Dokter Umum', 'klinik', 'STR. 300008/KKI/2020', 8),
  makeEntry('dr-kln-009', 'dr. Sari Puspita', 'Dokter Umum', 'klinik', 'STR. 300009/KKI/2021', 9),
  makeEntry('dr-kln-010', 'dr. Rudi Firmansyah', 'Dokter Umum', 'klinik', 'STR. 300010/KKI/2020', 10),
  makeEntry('dr-kln-011', 'dr. Nova Adriana', 'Dokter Umum', 'klinik', 'STR. 300011/KKI/2021', 11),
  makeEntry('dr-kln-012', 'dr. Indra Lesmana', 'Dokter Umum', 'klinik', 'STR. 300012/KKI/2020', 12),
  makeEntry('dr-kln-013', 'dr. Putri Wulandari', 'Dokter Umum', 'klinik', 'STR. 300013/KKI/2021', 13),
  makeEntry('dr-kln-014', 'dr. Reza Fahlevi', 'Dokter Umum', 'klinik', 'STR. 300014/KKI/2020', 14),
  makeEntry('dr-kln-015', 'dr. Nia Ramadhani', 'Dokter Umum', 'klinik', 'STR. 300015/KKI/2021', 15),
  makeEntry('dr-kln-016', 'dr. Arif Budiman', 'Dokter Umum', 'klinik', 'STR. 300016/KKI/2020', 16),
  makeEntry('dr-kln-017', 'dr. Cindy Permata', 'Dokter Umum', 'klinik', 'STR. 300017/KKI/2021', 17),
  makeEntry('dr-kln-018', 'dr. Gilang Pratama', 'Dokter Umum', 'klinik', 'STR. 300018/KKI/2020', 18),
]

export const allDoctors: DoctorEntry[] = [...rsDoctors, ...pkmDoctors, ...klinikDoctors]

const doctorMap: Record<string, DoctorEntry[]> = {
  rumah_sakit: rsDoctors,
  puskesmas: pkmDoctors,
  klinik: klinikDoctors,
}

export function getDoctorsByType(type: string): DoctorEntry[] {
  const doctors = doctorMap[type] || allDoctors
  return [...doctors].sort((a, b) => {
    if (a.expiryDate !== b.expiryDate) return a.expiryDate.localeCompare(b.expiryDate)
    return a.name.localeCompare(b.name)
  })
}
