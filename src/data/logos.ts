// Dummy official SVG logos for each institution type
// In production, these would come from Supabase Storage

export const LOGO_PUSKESMAS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="20" fill="#1a73e8"/>
  <circle cx="100" cy="85" r="40" fill="white"/>
  <path d="M85 65 h30 v40 M75 85 h50" stroke="#1a73e8" stroke-width="5" stroke-linecap="round"/>
  <text x="100" y="150" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="white">PUSKESMAS</text>
  <text x="100" y="168" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="white">Kota Bogor</text>
</svg>`

export const LOGO_RUMAH_SAKIT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="20" fill="#0d47a1"/>
  <rect x="60" y="50" width="80" height="100" rx="8" fill="white"/>
  <path d="M75 100 h50 M100 75 v50" stroke="#0d47a1" stroke-width="6" stroke-linecap="round"/>
  <text x="100" y="170" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="white">RUMAH SAKIT</text>
  <text x="100" y="186" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="white">UMUM DAERAH</text>
</svg>`

export const LOGO_KLINIK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="20" fill="#00897b"/>
  <circle cx="100" cy="80" r="35" fill="white"/>
  <path d="M85 80 h30 M100 65 v30" stroke="#00897b" stroke-width="5" stroke-linecap="round"/>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="white">KLINIK 24 JAM</text>
  <text x="100" y="158" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="white">SEHAT FARMA</text>
  <circle cx="100" cy="178" r="8" fill="#e53935"/>
  <text x="100" y="182" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" font-weight="bold" fill="white">24</text>
</svg>`

export const LOGO_DEFAULT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="20" fill="#37474f"/>
  <circle cx="100" cy="80" r="35" fill="white"/>
  <path d="M85 80 h30 M100 65 v30" stroke="#37474f" stroke-width="5" stroke-linecap="round"/>
  <text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="white">FASILITAS</text>
  <text x="100" y="162" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="white">KESEHATAN</text>
</svg>`

export function getLogoByType(type: string): string {
  switch (type) {
    case 'puskesmas': return LOGO_PUSKESMAS
    case 'rumah_sakit': return LOGO_RUMAH_SAKIT
    case 'klinik': return LOGO_KLINIK
    default: return LOGO_DEFAULT
  }
}
