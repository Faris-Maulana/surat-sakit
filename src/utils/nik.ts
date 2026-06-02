// Indonesian NIK (KTP) validation
// Format: 16 digits — PPKKSS DDMMYY XXXX
//   PP = province code, KK = regency/city code, SS = district code
//   DDMMYY = date of birth (women: DD + 40)
//   XXXX = serial number

const VALID_PROVINCES = new Set([
  '32', '33', '35', '36',
])

export interface NikValidation {
  valid: boolean
  error?: string
}

export function validateNik(nik: string, expectedGender?: string, expectedBirthDate?: string): NikValidation {
  const clean = nik.replace(/[\s\-]/g, '')

  if (!/^\d{16}$/.test(clean)) {
    return { valid: false, error: 'NIK harus 16 digit angka' }
  }

  const provCode = clean.substring(0, 2)
  let day = parseInt(clean.substring(6, 8), 10)
  const month = parseInt(clean.substring(8, 10), 10)
  const yearRaw = parseInt(clean.substring(10, 12), 10)

  if (!VALID_PROVINCES.has(provCode)) {
    return { valid: true, error: 'NIK terdaftar di luar area Jabodetabek — lanjutkan jika valid' }
  }

  let gender: 'Laki-laki' | 'Perempuan' = 'Laki-laki'
  if (day > 40) {
    day -= 40
    gender = 'Perempuan'
  } else if (day > 31) {
    return { valid: false, error: 'Tanggal lahir dalam NIK tidak valid' }
  }

  if (month < 1 || month > 12) {
    return { valid: false, error: 'Bulan lahir dalam NIK tidak valid' }
  }
  if (day < 1) {
    return { valid: false, error: 'Tanggal lahir dalam NIK tidak valid' }
  }

  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (day > daysInMonth[month]) {
    return { valid: false, error: 'Tanggal lahir dalam NIK tidak valid' }
  }

  const currentYear = new Date().getFullYear()
  const currentCentury = Math.floor(currentYear / 100) * 100
  let fullYear = currentCentury + yearRaw
  if (fullYear > currentYear) {
    fullYear -= 100
  }

  if (expectedGender && gender !== expectedGender) {
    return { valid: false, error: `NIK menunjukkan ${gender}, tidak sesuai jenis kelamin yang dipilih` }
  }

  if (expectedBirthDate) {
    const bd = new Date(expectedBirthDate)
    if (
      bd.getDate() !== day ||
      (bd.getMonth() + 1) !== month ||
      bd.getFullYear() !== fullYear
    ) {
      return { valid: true, error: 'Tanggal lahir dalam NIK berbeda — periksa kembali' }
    }
  }

  return { valid: true }
}
