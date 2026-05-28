// SVG logos for Indonesian medical facilities

export const LOGO_PUSKESMAS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <!-- Green circle background like real Puskesmas logo -->
  <circle cx="100" cy="100" r="95" fill="#e8f5e9" stroke="#2e7d32" stroke-width="4"/>
  <!-- Cross (plus sign) -->
  <rect x="90" y="40" width="20" height="58" rx="3" fill="#2e7d32"/>
  <rect x="65" y="65" width="70" height="18" rx="3" fill="#2e7d32"/>
  <!-- Inner white cross -->
  <rect x="93" y="46" width="14" height="46" rx="2" fill="white"/>
  <rect x="70" y="68" width="60" height="12" rx="2" fill="white"/>
  <text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#2e7d32">PUSKESMAS</text>
  <text x="100" y="165" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#2e7d32">KOTA BOGOR</text>
</svg>`

export const LOGO_RUMAH_SAKIT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <!-- Blue shield shape like many RS logos -->
  <path d="M100 10 L185 55 L185 120 Q185 170 100 195 Q15 170 15 120 L15 55 Z" fill="#e3f2fd" stroke="#0d47a1" stroke-width="4"/>
  <!-- H symbol for hospital -->
  <rect x="85" y="50" width="12" height="55" rx="2" fill="#0d47a1"/>
  <rect x="103" y="50" width="12" height="55" rx="2" fill="#0d47a1"/>
  <rect x="78" y="70" width="44" height="12" rx="2" fill="#0d47a1"/>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="#0d47a1">RUMAH SAKIT</text>
  <text x="100" y="156" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#0d47a1">UMUM DAERAH</text>
  <text x="100" y="172" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="#0d47a1">KOTA BOGOR</text>
</svg>`

export const LOGO_KLINIK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <!-- Teal circle -->
  <circle cx="100" cy="100" r="95" fill="#e0f2f1" stroke="#00695c" stroke-width="4"/>
  <!-- Cross -->
  <rect x="90" y="42" width="20" height="55" rx="3" fill="#00695c"/>
  <rect x="67" y="64" width="66" height="16" rx="3" fill="#00695c"/>
  <rect x="93" y="47" width="14" height="45" rx="2" fill="white"/>
  <rect x="72" y="67" width="56" height="10" rx="2" fill="white"/>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#00695c">KLINIK 24 JAM</text>
  <text x="100" y="158" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#00695c">SEHAT FARMA</text>
  <circle cx="100" cy="178" r="9" fill="#e53935"/>
  <text x="100" y="182" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">24</text>
</svg>`

export const LOGO_DEFAULT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="95" fill="#eceff1" stroke="#546e7a" stroke-width="4"/>
  <rect x="90" y="45" width="20" height="55" rx="3" fill="#546e7a"/>
  <rect x="67" y="67" width="66" height="16" rx="3" fill="#546e7a"/>
  <text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#546e7a">FASILITAS</text>
  <text x="100" y="165" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#546e7a">KESEHATAN</text>
</svg>`

export function getLogoByType(type: string): string {
  switch (type) {
    case 'puskesmas': return LOGO_PUSKESMAS
    case 'rumah_sakit': return LOGO_RUMAH_SAKIT
    case 'klinik': return LOGO_KLINIK
    default: return LOGO_DEFAULT
  }
}
