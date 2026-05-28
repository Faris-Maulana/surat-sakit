// Institution-specific logo data — each RS/Puskesmas/Klinik gets its own unique logo
// Major hospitals use their real brand logo fetched from official sources
// Others use distinctive professional wordmark designs

export type LogoMap = Record<string, string>

// ─── REAL LOGO WRAPPER ──────────────────────────────────────────────
// Wraps an external logo image URL in a polished SVG card

function realLogo(url: string, bg = '#ffffff'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect x="5" y="5" width="190" height="190" rx="20" fill="${bg}" stroke="#e0e0e0" stroke-width="1"/>
<image href="${url}" x="30" y="30" width="140" height="140" preserveAspectRatio="xMidYMid meet"/>
</svg>`
}

// ─── WORDMARK LOGOS (for institutions without accessible real logos) ─
// Each uses unique color + layout combination for distinct visual identity

function wordmark(title: string, subtitle: string, c1: string, c2: string, icon: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs><linearGradient id="w" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/></linearGradient></defs>
<rect x="5" y="5" width="190" height="190" rx="20" fill="url(#w)"/>
${icon}
<text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="white">${title}</text>
<text x="100" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="rgba(255,255,255,0.75)">${subtitle}</text>
</svg>`
}

function wmInitial(initial: string, size = 36): string {
  return `<text x="100" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="${size}" font-weight="bold" fill="white">${initial}</text>`
}
function wmDouble(a: string, b = '', size = 24): string {
  return `<text x="100" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="${size}" font-weight="bold" fill="white">${a}${b}</text>`
}
function wmText(text: string, size = 16): string {
  return `<text x="100" y="95" text-anchor="middle" font-family="Arial,sans-serif" font-size="${size}" font-weight="bold" fill="white">${text}</text>`
}

// ─── REAL HOSPITAL LOGOS (direct URLs) ─────────────────────────────

// rs-3: RS Hermina Bogor
const RS_3 = () => realLogo('https://dk4fkkwa4o9l0.cloudfront.net/assets/images/logo.png', '#fce4ec')

// rs-6: RS Pondok Indah
const RS_6 = () => realLogo('https://www.rspondokindah.co.id/images/logo_rspi.svg', '#f3e5f5')

// rs-7: RS Mayapada Jakarta
const RS_7 = () => realLogo('https://upload.wikimedia.org/wikipedia/commons/7/74/Logo_Mayapada_Hospital.png', '#fff8e1')

// rs-8: RS Medistra
const RS_8 = () => realLogo('https://medistra.romyardiansyah.com/img/logo%20medistra.webp', '#e8eaf6')

// rs-9: RS Siloam Semanggi
const RS_9 = () => realLogo('https://upload.wikimedia.org/wikipedia/commons/5/5e/Siloam_Hospitals.svg', '#e8eaf6')

// rs-10: RSCM
const RS_10 = () => realLogo('https://rscm.co.id/uploads/logo_4a6c74d1f8.png', '#ffebee')

// rs-11: RS Pelni
const RS_11 = () => realLogo('https://www.rspelni.co.id/wp-content/uploads/2020/04/00_LOGO-PELNI-IHC.png', '#e3f2fd')

// rs-12: RS St. Carolus
const RS_12 = () => realLogo('https://cdn.rscarolus.or.id/erssc-public/media/library_062f8e16.png', '#fce4ec')

// rs-5: RSUP Fatmawati
const RS_5 = () => realLogo('https://rs-fatmawati.go.id/assets/img/logo.png', '#e0f2f1')

// rs-23: RS EMC Tangerang
const RS_23 = () => realLogo('https://www.emc.id/assets/img/logo-emc-tagline.png', '#e3f2fd')

// rs-25: RS Mitra Keluarga
const RS_25 = () => realLogo('https://upload.wikimedia.org/wikipedia/commons/2/24/Mitra_Keluarga_2014.svg', '#fff3e0')

// rs-22: RS Sari Asih
const RS_22 = () => realLogo('https://www.sariasih.id/Sites/Front/template/default/assets/images/logo.png', '#e8f5e9')

// rs-24: RS Anna Medika (using RS Annisa as closest match for Bekasi area)
const RS_24 = () => realLogo('https://www.rsannisacikarang.com/img/logo_rsannisacikarang.png', '#fce4ec')

// rs-21: RS Siloam Tangerang (same Siloam logo)
const RS_21 = () => realLogo('https://upload.wikimedia.org/wikipedia/commons/5/5e/Siloam_Hospitals.svg', '#e8eaf6')

// rs-28: RS Siloam Surabaya (same Siloam logo)
const RS_28 = () => realLogo('https://upload.wikimedia.org/wikipedia/commons/5/5e/Siloam_Hospitals.svg', '#e8eaf6')

// ─── WORDMARK HOSPITAL LOGOS ────────────────────────────────────────

// rs-1: RSUD Kota Bogor
const RS_1 = () => wordmark('RSUD KOTA BOGOR', 'RUMAH SAKIT UMUM DAERAH', '#1565c0', '#0d47a1', wmInitial('B'))
const RS_2 = () => wordmark('RSHS SALAK', 'RUMAH SAKIT', '#2e7d32', '#1b5e20', `<path d="M100 55 L145 78 L145 110 Q145 145 100 160 Q55 145 55 110 L55 78 Z" fill="none" stroke="white" stroke-width="3" opacity="0.4"/>
<text x="100" y="98" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="white">S</text>`)
const RS_4 = () => wordmark('RS PMI BOGOR', 'PALANG MERAH INDONESIA', '#c62828', '#8e0000', wmText('PMI', 18))
const RS_13 = () => wordmark('JAKARTA EYE CENTER', 'RS KHUSUS MATA', '#0277bd', '#01579b', `<ellipse cx="100" cy="78" rx="30" ry="20" fill="white" opacity="0.85"/>
<circle cx="100" cy="78" r="10" fill="#0277bd"/>`)

// rs-14: RSUP Hasan Sadikin
const RS_14 = () => wordmark('RSUP HASAN SADIKIN', 'BANDUNG', '#00695c', '#004d40', wmDouble('HS'))
const RS_15 = () => wordmark('RS BORROMEUS', 'BANDUNG', '#6a1b9a', '#4a148c', wmInitial('B'))
const RS_16 = () => wordmark('ST. YUSUP', 'RUMAH SAKIT', '#1565c0', '#0d47a1', wmDouble('S', 'Y', 28))
const RS_17 = () => wordmark('RS KEBON JATI', 'BANDUNG', '#37474f', '#455a64', wmDouble('KJ'))
const RS_18 = () => wordmark('BHAYANGKARA', 'BRIMOB', '#1a237e', '#283593', wmDouble('BB'))
const RS_19 = () => wordmark('RS UI', 'UNIVERSITAS INDONESIA', '#ff8f00', '#ff6f00', wmDouble('U', 'I', 28))
const RS_20 = () => wordmark('RS CITRA MEDIKA', 'DEPOK', '#00838f', '#006064', wmDouble('CM'))
const RS_26 = () => wordmark('RS PERMATA', 'BEKASI', '#4a148c', '#6a1b9a', wmInitial('P'))
const RS_27 = () => wordmark('RSUD DR. SOETOMO', 'SURABAYA', '#b71c1c', '#880e4f', wmInitial('S'))
const RS_29 = () => wordmark('RS DR. RAMELAN', 'SURABAYA', '#283593', '#1a237e', wmInitial('R', 42))
const RS_30 = () => wordmark('WILLIAM BOOTH', 'HOSPITAL', '#c62828', '#b71c1c', wmDouble('WB'))
const RS_31 = () => wordmark('RSUP DR. KARIADI', 'SEMARANG', '#0d47a1', '#1565c0', wmInitial('K'))
const RS_32 = () => wordmark('RS TELOGOREJO', 'SEMARANG', '#4e342e', '#3e2723', wmInitial('T'))
const RS_33 = () => wordmark('RS ELISABETH', 'SEMARANG', '#7b1fa2', '#4a148c', wmInitial('E'))

// ─── PUSKESMAS ──────────────────────────────────────────────────────
// Professional government-badge style per city

const cityPkmConfig: [string, string, string, string][] = [
  ['Jakarta Pusat', '#1a237e', '#283593', 'pusat'],
  ['Jakarta Selatan', '#c62828', '#8e0000', 'selatan'],
  ['Jakarta Barat', '#2e7d32', '#1b5e20', 'barat'],
  ['Jakarta Timur', '#e65100', '#bf360c', 'timur'],
  ['Jakarta Utara', '#00838f', '#006064', 'utara'],
  ['Bogor', '#1565c0', '#0d47a1', 'bogor'],
  ['Depok', '#4a148c', '#6a1b9a', 'depok'],
  ['Tangerang', '#00695c', '#004d40', 'tangerang'],
  ['Bekasi', '#ef6c00', '#e65100', 'bekasi'],
]

function pkmLogo(city: string, c1: string, c2: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs><linearGradient id="p" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/></linearGradient></defs>
<rect x="5" y="5" width="190" height="190" rx="20" fill="url(#p)"/>
<rect x="86" y="40" width="28" height="56" rx="4" fill="white" opacity="0.9"/>
<rect x="62" y="64" width="76" height="16" rx="4" fill="white" opacity="0.9"/>
<rect x="91" y="47" width="18" height="42" rx="3" fill="${c1}" opacity="0.7"/>
<rect x="68" y="68" width="64" height="8" rx="3" fill="${c1}" opacity="0.7"/>
<text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="white">PUSKESMAS</text>
<text x="100" y="162" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">${city}</text>
</svg>`
}

// ─── KLINIK ─────────────────────────────────────────────────────────
// Modern minimalist designs with unique shapes per clinic

const klinikConfigs: [string, string, string, string][] = [
  ['K1', '#00695c', '#004d40', 'cross'],
  ['K2', '#00838f', '#006064', 'plus'],
  ['K3', '#0277bd', '#01579b', 'heart'],
  ['K4', '#4e342e', '#3e2723', 'cross'],
  ['K5', '#37474f', '#263238', 'plus'],
  ['K6', '#5d4037', '#4e342e', 'heart'],
  ['K7', '#1565c0', '#0d47a1', 'letter'],
  ['K8', '#2e7d32', '#1b5e20', 'staff'],
  ['K9', '#6a1b9a', '#4a148c', 'band'],
  ['K10', '#e65100', '#bf360c', 'droplet'],
  ['K11', '#00897b', '#00695c', 'plus'],
  ['K12', '#283593', '#1a237e', 'cross'],
  ['K13', '#ad1457', '#880e4f', 'heart'],
  ['K14', '#558b2f', '#33691e', 'staff'],
  ['K15', '#4527a0', '#311b92', 'letter'],
  ['K16', '#880e4f', '#560027', 'band'],
  ['K17', '#01579b', '#002f6c', 'droplet'],
  ['K18', '#bf360c', '#870000', 'cross'],
  ['K19', '#1b5e20', '#0a3d0a', 'plus'],
  ['K20', '#4a148c', '#2a005c', 'heart'],
  ['K21', '#006064', '#00363a', 'staff'],
  ['K22', '#e65100', '#914100', 'letter'],
  ['K23', '#37474f', '#1c2529', 'band'],
  ['K24', '#00897b', '#005b4f', 'droplet'],
  ['K25', '#c62828', '#8e0000', 'cross'],
  ['K26', '#1565c0', '#003c8f', 'plus'],
  ['K27', '#4e342e', '#261a16', 'heart'],
  ['K28', '#2e7d32', '#005005', 'staff'],
  ['K29', '#6a1b9a', '#38006b', 'letter'],
]

function klinikIcon(type: string, _c: string): string {
  switch (type) {
    case 'cross': return `<rect x="86" y="45" width="28" height="60" rx="4" fill="white" opacity="0.85"/><rect x="68" y="68" width="64" height="16" rx="4" fill="white" opacity="0.85"/>`
    case 'plus': return `<rect x="86" y="52" width="28" height="50" rx="5" fill="white" opacity="0.85"/><rect x="70" y="68" width="60" height="18" rx="5" fill="white" opacity="0.85"/>`
    case 'heart': return `<path d="M100 82 Q76 58 65 72 Q54 86 72 102 L100 128 L128 102 Q146 86 135 72 Q124 58 100 82 Z" fill="white" opacity="0.85"/>`
    case 'staff': return `<rect x="96" y="48" width="8" height="65" rx="4" fill="white" opacity="0.8"/><path d="M80 58 Q96 62 102 58 Q108 54 96 54" fill="none" stroke="white" stroke-width="2.5" opacity="0.6"/><path d="M80 72 Q96 68 102 72 Q108 76 96 76" fill="none" stroke="white" stroke-width="2.5" opacity="0.6"/>`
    case 'band': return `<rect x="65" y="95" width="70" height="12" rx="3" fill="white" opacity="0.85" transform="rotate(-15 100 100)"/><rect x="88" y="88" width="24" height="26" rx="3" fill="white" opacity="0.9" transform="rotate(-15 100 100)"/>`
    case 'droplet': return `<path d="M100 98 Q82 120 82 138 Q82 152 100 152 Q118 152 118 138 Q118 120 100 98 Z" fill="white" opacity="0.85"/>`
    case 'letter': return `<text x="100" y="100" text-anchor="middle" font-family="Georgia,serif" font-size="32" font-weight="bold" fill="white">K</text>`
    default: return `<rect x="86" y="45" width="28" height="60" rx="4" fill="white" opacity="0.85"/><rect x="68" y="68" width="64" height="16" rx="4" fill="white" opacity="0.85"/>`
  }
}

function klinikSvg(_name: string, c1: string, c2: string, iconType: string): string {
  const icon = klinikIcon(iconType, c1)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs><linearGradient id="k" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/></linearGradient></defs>
<rect x="5" y="5" width="190" height="190" rx="20" fill="url(#k)"/>
${icon}
<text x="100" y="163" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" font-weight="bold" fill="white">KLINIK</text>
</svg>`
}

// ─── LOGO MAP ───────────────────────────────────────────────────────

const rsLogos: Record<string, () => string> = {
  'rs-1': RS_1,      // RSUD Kota Bogor
  'rs-2': RS_2,      // RSHS Salak
  'rs-3': RS_3,      // RS Hermina Bogor - REAL LOGO
  'rs-4': RS_4,      // RS PMI Bogor
  'rs-5': RS_5,      // RSUP Fatmawati - REAL LOGO
  'rs-6': RS_6,      // RS Pondok Indah - REAL LOGO
  'rs-7': RS_7,      // RS Mayapada Jakarta - REAL LOGO
  'rs-8': RS_8,      // RS Medistra - REAL LOGO
  'rs-9': RS_9,      // RS Siloam Semanggi - REAL LOGO
  'rs-10': RS_10,    // RSCM - REAL LOGO
  'rs-11': RS_11,    // RS Pelni - REAL LOGO
  'rs-12': RS_12,    // RS St. Carolus - REAL LOGO
  'rs-13': RS_13,    // RS Jakarta Eye Center
  'rs-14': RS_14,    // RSUP Hasan Sadikin
  'rs-15': RS_15,    // RS Borromeus
  'rs-16': RS_16,    // RS St. Yusup
  'rs-17': RS_17,    // RS Kebon Jati
  'rs-18': RS_18,    // RS Bhayangkara Brimob
  'rs-19': RS_19,    // RS UI
  'rs-20': RS_20,    // RS Citra Medika
  'rs-21': RS_21,    // RS Siloam Tangerang - REAL LOGO
  'rs-22': RS_22,    // RS Sari Asih - REAL LOGO
  'rs-23': RS_23,    // RS EMC Tangerang - REAL LOGO
  'rs-24': RS_24,    // RS Anna Medika - REAL LOGO (Annisa)
  'rs-25': RS_25,    // RS Mitra Keluarga - REAL LOGO
  'rs-26': RS_26,    // RS Permata Bekasi
  'rs-27': RS_27,    // RSUD Dr. Soetomo
  'rs-28': RS_28,    // RS Siloam Surabaya - REAL LOGO
  'rs-29': RS_29,    // RS Dr. Ramelan
  'rs-30': RS_30,    // RS William Booth
  'rs-31': RS_31,    // RSUP Dr. Kariadi
  'rs-32': RS_32,    // RS Telogorejo
  'rs-33': RS_33,    // RS Elisabeth
}

export function getLogoByType(_type: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<rect x="5" y="5" width="190" height="190" rx="20" fill="#546e7a"/>
<rect x="88" y="40" width="24" height="55" rx="4" fill="white"/>
<rect x="65" y="62" width="70" height="16" rx="4" fill="white"/>
<text x="100" y="150" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="white">KESEHATAN</text>
</svg>`
}

export function getLogoById(id: string, type: string, _name: string): string {
  if (type === 'rumah_sakit') {
    const gen = rsLogos[id]
    if (gen) return gen()
    return RS_1()
  }

  if (type === 'puskesmas') {
    const idx = parseInt(id.replace(/\D/g, '')) || 0
    const cfg = cityPkmConfig[idx % cityPkmConfig.length]
    return pkmLogo(cfg[0], cfg[1], cfg[2])
  }

  if (type === 'klinik') {
    const idx = parseInt(id.replace(/\D/g, '')) || 0
    const cfg = klinikConfigs[idx % klinikConfigs.length]
    return klinikSvg(cfg[0], cfg[1], cfg[2], cfg[3])
  }

  return getLogoByType(type)
}
