// SVG logos — designed to resemble official Indonesian medical facility logos
// Each uses national colours and standard Indonesian medical emblem conventions

export const LOGO_PUSKESMAS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="pkmBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2e7d32"/>
      <stop offset="100%" style="stop-color:#1b5e20"/>
    </linearGradient>
  </defs>
  <!-- Outer circle -->
  <circle cx="100" cy="100" r="95" fill="url(#pkmBg)" stroke="#1b5e20" stroke-width="3"/>
  <!-- Inner circle -->
  <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <!-- White outer cross -->
  <rect x="88" y="35" width="24" height="62" rx="4" fill="white"/>
  <rect x="62" y="63" width="76" height="20" rx="4" fill="white"/>
  <!-- Green inner cross -->
  <rect x="92" y="42" width="16" height="48" rx="3" fill="#2e7d32"/>
  <rect x="68" y="67" width="64" height="12" rx="3" fill="#2e7d32"/>
  <!-- White center dot -->
  <circle cx="100" cy="82" r="6" fill="white"/>
  <!-- Text -->
  <text x="100" y="150" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="white">PUSKESMAS</text>
  <text x="100" y="167" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="rgba(255,255,255,0.8)">KESEHATAN</text>
</svg>`

export const LOGO_RUMAH_SAKIT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="rsBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1565c0"/>
      <stop offset="100%" style="stop-color:#0d47a1"/>
    </linearGradient>
  </defs>
  <!-- Shield shape (typical for RS logos) -->
  <path d="M100 8 L180 50 L180 120 Q180 170 100 195 Q20 170 20 120 L20 50 Z" fill="url(#rsBg)" stroke="#0d47a1" stroke-width="3"/>
  <!-- H symbol -->
  <rect x="86" y="48" width="12" height="56" rx="2" fill="white"/>
  <rect x="102" y="48" width="12" height="56" rx="2" fill="white"/>
  <rect x="78" y="70" width="44" height="14" rx="2" fill="white"/>
  <!-- Inner blue H -->
  <rect x="89" y="53" width="6" height="46" rx="1" fill="#1565c0"/>
  <rect x="105" y="53" width="6" height="46" rx="1" fill="#1565c0"/>
  <rect x="82" y="73" width="36" height="8" rx="1" fill="#1565c0"/>
  <!-- Text -->
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">RUMAH SAKIT</text>
  <text x="100" y="156" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="rgba(255,255,255,0.8)">UMUM DAERAH</text>
  <text x="100" y="172" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.6)">KOTA</text>
</svg>`

export const LOGO_KLINIK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="klBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00897b"/>
      <stop offset="100%" style="stop-color:#00695c"/>
    </linearGradient>
  </defs>
  <!-- Double circle -->
  <circle cx="100" cy="100" r="95" fill="url(#klBg)" stroke="#004d40" stroke-width="3"/>
  <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
  <!-- Cross -->
  <rect x="89" y="38" width="22" height="58" rx="4" fill="white"/>
  <rect x="65" y="62" width="70" height="16" rx="4" fill="white"/>
  <!-- Inner teal cross -->
  <rect x="93" y="44" width="14" height="46" rx="3" fill="#00897b"/>
  <rect x="70" y="66" width="60" height="8" rx="3" fill="#00897b"/>
  <!-- Text -->
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="white">KLINIK 24 JAM</text>
  <text x="100" y="158" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="rgba(255,255,255,0.8)">MEDIKA PRATAMA</text>
  <!-- 24 badge -->
  <circle cx="100" cy="178" r="10" fill="#e53935"/>
  <circle cx="100" cy="178" r="8" fill="none" stroke="white" stroke-width="1"/>
  <text x="100" y="182" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">24</text>
</svg>`

export const LOGO_DEFAULT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="defBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#546e7a"/>
      <stop offset="100%" style="stop-color:#37474f"/>
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="95" fill="url(#defBg)" stroke="#263238" stroke-width="3"/>
  <rect x="88" y="40" width="24" height="55" rx="4" fill="white"/>
  <rect x="65" y="62" width="70" height="16" rx="4" fill="white"/>
  <text x="100" y="150" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="white">FASILITAS</text>
  <text x="100" y="168" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="rgba(255,255,255,0.7)">KESEHATAN</text>
</svg>`

export function getLogoByType(type: string): string {
  switch (type) {
    case 'puskesmas': return LOGO_PUSKESMAS
    case 'rumah_sakit': return LOGO_RUMAH_SAKIT
    case 'klinik': return LOGO_KLINIK
    default: return LOGO_DEFAULT
  }
}
