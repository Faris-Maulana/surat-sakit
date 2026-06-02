import type { Institution, InstitutionType } from '@/types'
import { rsList } from './rumah_sakit'
import { puskesmasList } from './puskesmas'
import { klinikList } from './klinik'

export const cities = [
  { id: 'bogor', name: 'Kota Bogor' },
  { id: 'jakarta-selatan', name: 'Jakarta Selatan' },
  { id: 'jakarta-pusat', name: 'Jakarta Pusat' },
  { id: 'jakarta-timur', name: 'Jakarta Timur' },
  { id: 'jakarta-barat', name: 'Jakarta Barat' },
  { id: 'jakarta-utara', name: 'Jakarta Utara' },
  { id: 'bandung', name: 'Kota Bandung' },
  { id: 'depok', name: 'Kota Depok' },
  { id: 'tangerang', name: 'Kota Tangerang' },
  { id: 'bekasi', name: 'Kota Bekasi' },
  { id: 'surabaya', name: 'Kota Surabaya' },
  { id: 'semarang', name: 'Kota Semarang' },
  { id: 'yogyakarta', name: 'Kota Yogyakarta' },
  { id: 'malang', name: 'Kota Malang' },
  { id: 'makassar', name: 'Kota Makassar' },
  { id: 'medan', name: 'Kota Medan' },
  { id: 'palembang', name: 'Kota Palembang' },
  { id: 'batam', name: 'Kota Batam' },
  { id: 'denpasar', name: 'Kota Denpasar' },
  { id: 'manado', name: 'Kota Manado' },
  { id: 'pontianak', name: 'Kota Pontianak' },
  { id: 'banjarmasin', name: 'Kota Banjarmasin' },
  { id: 'pekanbaru', name: 'Kota Pekanbaru' },
  { id: 'lampung', name: 'Kota Bandar Lampung' },
  { id: 'padang', name: 'Kota Padang' },
  { id: 'samarinda', name: 'Kota Samarinda' },
  { id: 'solo', name: 'Kota Solo / Surakarta' },
  { id: 'balikpapan', name: 'Kota Balikpapan' },
  { id: 'cirebon', name: 'Kota Cirebon' },

  // ═══════════════════════════════════════════
  //  KOTA BARU — Putaran 2
  // ═══════════════════════════════════════════
  { id: 'banda-aceh', name: 'Kota Banda Aceh' },
  { id: 'lhokseumawe', name: 'Kota Lhokseumawe' },
  { id: 'bukittinggi', name: 'Kota Bukittinggi' },
  { id: 'dumai', name: 'Kota Dumai' },
  { id: 'tanjung-pinang', name: 'Kota Tanjung Pinang' },
  { id: 'jambi', name: 'Kota Jambi' },
  { id: 'bengkulu', name: 'Kota Bengkulu' },
  { id: 'pangkal-pinang', name: 'Kota Pangkal Pinang' },
  { id: 'metro', name: 'Kota Metro' },
  { id: 'serang', name: 'Kota Serang' },
  { id: 'cilegon', name: 'Kota Cilegon' },
  { id: 'tangerang-selatan', name: 'Kota Tangerang Selatan' },
  { id: 'sukabumi', name: 'Kota Sukabumi' },
  { id: 'tasikmalaya', name: 'Kota Tasikmalaya' },
  { id: 'pekalongan', name: 'Kota Pekalongan' },
  { id: 'tegal', name: 'Kota Tegal' },
  { id: 'purwokerto', name: 'Kota Purwokerto' },
  { id: 'salatiga', name: 'Kota Salatiga' },
  { id: 'kediri', name: 'Kota Kediri' },
  { id: 'madiun', name: 'Kota Madiun' },
  { id: 'mataram', name: 'Kota Mataram' },
  { id: 'kupang', name: 'Kota Kupang' },
  { id: 'palangka-raya', name: 'Kota Palangka Raya' },
  { id: 'tarakan', name: 'Kota Tarakan' },
  { id: 'palu', name: 'Kota Palu' },
  { id: 'kendari', name: 'Kota Kendari' },
  { id: 'gorontalo', name: 'Kota Gorontalo' },
  { id: 'ambon', name: 'Kota Ambon' },
  { id: 'ternate', name: 'Kota Ternate' },
  { id: 'jayapura', name: 'Kota Jayapura' },
]

export const institutionTypes: { value: InstitutionType; label: string; icon: string }[] = [
  { value: 'rumah_sakit', label: 'Rumah Sakit', icon: '🏨' },
  { value: 'puskesmas', label: 'Puskesmas', icon: '🏥' },
  { value: 'klinik', label: 'Klinik 24 Jam', icon: '🏪' },
]

export const institutions: Institution[] = [...rsList, ...puskesmasList, ...klinikList]

export function getInstitutionsByCityAndType(cityId: string, type: InstitutionType): Institution[] {
  return institutions.filter(i => i.city === cityId && i.type === type)
}

export function getInstitutionById(id: string): Institution | undefined {
  return institutions.find(i => i.id === id)
}
