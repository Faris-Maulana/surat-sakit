const COUNTER_KEY = 'surat-sakit-counter'

export function generateLetterNumber(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const key = `${COUNTER_KEY}-${year}-${month}`

  let counter = 1
  try {
    const stored = localStorage.getItem(key)
    if (stored) counter = parseInt(stored, 10) + 1
  } catch { /* noop */ }

  try {
    localStorage.setItem(key, String(counter))
  } catch { /* noop */ }

  const seq = String(counter).padStart(4, '0')
  return `440/${seq}/SKS/${month}/${year}`
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ]
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export function getDayDifference(start: string, end: string): number {
  const s = new Date(start)
  const e = new Date(end)
  const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
  return diff + 1
}

const cityNames: Record<string, string> = {
  'bogor': 'Bogor',
  'jakarta-selatan': 'Jakarta Selatan',
  'jakarta-pusat': 'Jakarta Pusat',
  'bandung': 'Bandung',
  'depok': 'Depok',
  'tangerang': 'Tangerang',
  'bekasi': 'Bekasi',
  'surabaya': 'Surabaya',
  'semarang': 'Semarang',
}

export function getCityName(cityId: string): string {
  return cityNames[cityId] || cityId
}
