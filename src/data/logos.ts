// Institution-specific logo data — each RS/Puskesmas/Klinik gets its own unique logo
// Real recognizable chains use their actual brand identity; others get distinctive designs

export type LogoMap = Record<string, string>

// ─── SHAPE HELPERS ───────────────────────────────────────────────────

function shield(grad: string): string {
  return `<path d="M100 10 L185 55 L185 120 Q185 170 100 195 Q15 170 15 120 L15 55 Z" fill="url(#${grad})" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>`
}
function circle(grad: string): string {
  return `<circle cx="100" cy="100" r="95" fill="url(#${grad})" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`
}
function rrect(grad: string): string {
  return `<rect x="12" y="12" width="176" height="176" rx="28" fill="url(#${grad})" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`
}
function hexagon(grad: string): string {
  return `<path d="M100 8 L182 54 L182 146 L100 192 L18 146 L18 54 Z" fill="url(#${grad})" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`
}
function diamond(grad: string): string {
  return `<path d="M100 10 L185 100 L100 190 L15 100 Z" fill="url(#${grad})" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`
}
function pill(grad: string): string {
  return `<rect x="25" y="20" width="150" height="160" rx="75" fill="url(#${grad})" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`
}
function octagon(grad: string): string {
  return `<path d="M70 15 L130 15 L175 70 L175 130 L130 175 L70 175 L25 130 L25 70 Z" fill="url(#${grad})" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`
}
function heartShape(grad: string): string {
  return `<path d="M100 175 Q20 120 20 70 Q20 25 60 25 Q85 25 100 50 Q115 25 140 25 Q180 25 180 70 Q180 120 100 175 Z" fill="url(#${grad})" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`
}
function leafShape(grad: string): string {
  return `<path d="M100 10 Q175 60 175 120 Q175 170 100 195 Q25 170 25 120 Q25 60 100 10 Z" fill="url(#${grad})" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`
}
function teardrop(grad: string): string {
  return `<path d="M100 10 Q175 90 175 140 Q175 185 100 190 Q25 185 25 140 Q25 90 100 10 Z" fill="url(#${grad})" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`
}
function arch(grad: string): string {
  return `<path d="M20 100 L20 180 L180 180 L180 100 Q180 15 100 15 Q20 15 20 100 Z" fill="url(#${grad})" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`
}

// ─── SVG WRAPPER ────────────────────────────────────────────────────

const gradDefs = (id: string, c1: string, c2: string) =>
  `<linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${c1}"/><stop offset="100%" style="stop-color:${c2}"/></linearGradient>`

const wrap = (body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">${body}</svg>`

function logo(shape: (g: string) => string, icon: string, c1: string, c2: string, gid: string): string {
  const defs = gradDefs(gid, c1, c2)
  return wrap(`${defs}${shape(gid)}${icon}`)
}

// ─── ICON PRIMITIVES (placed at center of shape) ────────────────────

// Medical cross
const crossIcon = `<rect x="86" y="48" width="28" height="68" rx="4" fill="white" opacity="0.9"/>
<rect x="66" y="68" width="68" height="28" rx="4" fill="white" opacity="0.9"/>
<rect x="90" y="56" width="20" height="52" rx="3" fill="rgba(0,0,0,0.08)"/>
<rect x="74" y="74" width="52" height="16" rx="3" fill="rgba(0,0,0,0.08)"/>`

// Plus sign
const plusIcon = `<rect x="86" y="55" width="28" height="54" rx="5" fill="white" opacity="0.9"/>
<rect x="68" y="72" width="64" height="20" rx="5" fill="white" opacity="0.9"/>`

// Heart
const heartIcon = `<path d="M100 88 Q72 60 60 76 Q48 92 68 110 L100 140 L132 110 Q152 92 140 76 Q128 60 100 88 Z" fill="white" opacity="0.9"/>`

// Single letter
const letterIcon = (letter: string, size = 36) =>
  `<text x="100" y="110" text-anchor="middle" font-family="Georgia,serif" font-size="${size}" font-weight="bold" fill="white">${letter}</text>`

const staffIcon = `<rect x="96" y="45" width="8" height="74" rx="4" fill="white" opacity="0.85"/>
<path d="M78 55 Q96 60 104 55 Q112 50 96 50" fill="none" stroke="white" stroke-width="2.5" opacity="0.7"/>
<path d="M78 70 Q96 65 104 70 Q112 75 96 75" fill="none" stroke="white" stroke-width="2.5" opacity="0.7"/>
<circle cx="96" cy="45" r="7" fill="none" stroke="white" stroke-width="2" opacity="0.8"/>
<circle cx="104" cy="119" r="4" fill="none" stroke="white" stroke-width="1.5" opacity="0.6"/>`

// Stethoscope
const stethIcon = `<path d="M70 60 Q70 40 100 40 Q130 40 130 60 L130 100 Q130 120 115 125" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
<circle cx="115" cy="130" r="10" fill="none" stroke="white" stroke-width="4" opacity="0.85"/>`

// Shield/medical
const shieldIcon = `<path d="M100 55 L145 78 L145 110 Q145 145 100 160 Q55 145 55 110 L55 78 Z" fill="none" stroke="white" stroke-width="4" opacity="0.7"/>
<path d="M100 75 L100 125 M75 100 L125 100" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.85"/>`

// Droplet
const dropletIcon = `<path d="M100 105 Q80 130 80 148 Q80 165 100 165 Q120 165 120 148 Q120 130 100 105 Z" fill="white" opacity="0.85"/>
<path d="M100 60 Q100 60 80 105" fill="none" stroke="white" stroke-width="3" opacity="0.4"/>`

// Building
const buildingIcon = `<rect x="75" y="65" width="50" height="85" rx="3" fill="white" opacity="0.85"/>
<rect x="82" y="72" width="12" height="14" rx="2" fill="rgba(0,0,0,0.08)"/>
<rect x="106" y="72" width="12" height="14" rx="2" fill="rgba(0,0,0,0.08)"/>
<rect x="82" y="95" width="12" height="14" rx="2" fill="rgba(0,0,0,0.08)"/>
<rect x="106" y="95" width="12" height="14" rx="2" fill="rgba(0,0,0,0.08)"/>
<rect x="94" y="118" width="12" height="32" rx="2" fill="rgba(0,0,0,0.08)"/>`

// Bandage
const bandIcon = `<rect x="60" y="95" width="80" height="14" rx="3" fill="white" opacity="0.85" transform="rotate(-20 100 100)"/>
<rect x="88" y="88" width="24" height="28" rx="3" fill="white" opacity="0.9" transform="rotate(-20 100 100)"/>
<rect x="93" y="88" width="14" height="28" rx="2" fill="rgba(0,0,0,0.06)" transform="rotate(-20 100 100)"/>`

// ─── RUMAH SAKIT LOGOS (each unique per institution) ───────────────

// rs-1: RSUD Kota Bogor → government shield, blue, cross
const RS_1 = () => logo(shield, `<text x="100" y="88" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RSUD</text>
<text x="100" y="110" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="bold" fill="white" font-style="italic">Bogor</text>${crossIcon}`, '#1565c0', '#0d47a1', 'g1')

// rs-2: RSHS Salak → hexagon, green, leaf shape
const RS_2 = () => logo(hexagon, `<path d="M100 55 L145 78 L145 110 Q145 145 100 160 Q55 145 55 110 L55 78 Z" fill="none" stroke="white" stroke-width="3.5" opacity="0.5"/>
<text x="100" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-weight="bold" fill="white">S</text>
<text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RSHS SALAK</text>`, '#2e7d32', '#1b5e20', 'g2')

// rs-3: RS Hermina Bogor → rrect, pink, H letter (Hermina brand)
const RS_3 = () => logo(rrect, `<path d="M145 50 L145 150 L55 150 L55 50 Z" fill="white" opacity="0.15"/>
<circle cx="100" cy="80" r="32" fill="white"/>
<path d="M100 62 L100 98 M80 80 L120 80" stroke="#e91e63" stroke-width="5" stroke-linecap="round"/>
<text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">HERMINA</text>
<text x="100" y="156" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">BOGOR</text>`, '#e91e63', '#ad1457', 'g3')

// rs-4: RS PMI Bogor → circle, red, PMI letters
const RS_4 = () => logo(circle, `<path d="M100 40 L160 85 L140 155 L60 155 L40 85 Z" fill="white" opacity="0.12"/>
<text x="100" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="white">PMI</text>
<text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RS PMI BOGOR</text>`, '#c62828', '#8e0000', 'g4')

// rs-5: RSUP Fatmawati → shield, blue-green, letter F
const RS_5 = () => logo(shield, `<text x="100" y="88" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">RSUP</text>
<text x="100" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="20" font-weight="bold" fill="white" font-style="italic">F</text>
<text x="100" y="142" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.8)">Fatmawati</text>`, '#00897b', '#00695c', 'g5')

// rs-6: RS Pondok Indah → diamond, maroon, PI
const RS_6 = () => logo(diamond, `<path d="M100 50 L150 100 L100 150 L50 100 Z" fill="white" opacity="0.12"/>
<text x="100" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="white">PI</text>
<text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">PONDOK INDAH</text>
<text x="100" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="6" fill="rgba(255,255,255,0.6)">GROUP</text>`, '#6a1b9a', '#4a148c', 'g6')

// rs-7: RS Mayapada Jakarta → circle, gold, M
const RS_7 = () => logo(circle, `<path d="M80 50 L120 50 L120 150 L80 150 Z" fill="white" opacity="0.12"/>
<path d="M50 80 L150 80 L150 120 L50 120 Z" fill="white" opacity="0.12"/>
<text x="100" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="white">M</text>
<text x="100" y="135" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">MAYAPADA</text>`, '#b8860b', '#8b6914', 'g7')

// rs-8: RS Medistra → pill, dark blue, cross
const RS_8 = () => logo(pill, `<circle cx="100" cy="85" r="28" fill="white" opacity="0.9"/>
<path d="M100 65 L100 105 M82 85 L118 85" stroke="#1a237e" stroke-width="5" stroke-linecap="round"/>
<text x="100" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="white">M</text>
<text x="100" y="165" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">MEDISTRA</text>`, '#1a237e', '#283593', 'g8')

// rs-9: RS Siloam Semanggi → circle, blue-yellow, S wrapped around cross
const RS_9 = () => logo(circle, `<path d="M60 70 Q100 35 140 70 Q160 100 130 130 Q100 160 70 130 Q50 110 70 85" fill="none" stroke="white" stroke-width="4" opacity="0.5"/>
<text x="100" y="92" text-anchor="middle" font-family="Georgia,serif" font-size="28" font-weight="bold" fill="white" font-style="italic">S</text>
<text x="100" y="135" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">SILOAM</text>
<text x="100" y="152" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">SEMANGGI</text>`, '#1a237e', '#fdd835', 'g9')

// rs-10: RSCM → shield, red, Cipto
const RS_10 = () => logo(shield, `<text x="100" y="80" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RSUPN</text>
<text x="100" y="105" text-anchor="middle" font-family="Georgia,serif" font-size="11" font-weight="bold" fill="white">Dr. Cipto</text>
<text x="100" y="125" text-anchor="middle" font-family="Georgia,serif" font-size="11" font-weight="bold" fill="white">Mangunkusumo</text>`, '#b71c1c', '#880e4f', 'g10')

// rs-11: RS Pelni → octagon, blue, ship wheel
const RS_11 = () => logo(octagon, `<circle cx="100" cy="80" r="28" fill="white" opacity="0.85"/>
<text x="100" y="88" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="#0d47a1">P</text>
<text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">RS PELNI</text>
<text x="100" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.6)">JAKARTA</text>`, '#0d47a1', '#1565c0', 'g11')

// rs-12: RS St. Carolus → rrect, red, SC letters
const RS_12 = () => logo(rrect, `<text x="100" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-weight="bold" fill="white">SC</text>
<text x="100" y="120" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">ST. CAROLUS</text>
<text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">RS KATOLIK</text>`, '#c62828', '#8e0000', 'g12')

// rs-13: RS Jakarta Eye Center → circle, light blue, eye
const RS_13 = () => logo(circle, `<ellipse cx="100" cy="78" rx="30" ry="20" fill="white" opacity="0.9"/>
<circle cx="100" cy="78" r="10" fill="#0277bd"/>
<text x="100" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">JAKARTA</text>
<text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">EYE CENTER</text>`, '#0277bd', '#01579b', 'g13')

// rs-14: RSUP Hasan Sadikin → shield, green, HS
const RS_14 = () => logo(shield, `<text x="100" y="82" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">RSUP</text>
<text x="100" y="110" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="white" font-style="italic">HS</text>
<text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.8)">Hasan Sadikin</text>`, '#00695c', '#004d40', 'g14')

// rs-15: RS Borromeus → heart, purple, cross
const RS_15 = () => logo(heartShape, `<text x="100" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="white">B</text>
<text x="100" y="120" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">BORROMEUS</text>
<text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">RUMAH SAKIT</text>`, '#6a1b9a', '#4a148c', 'g15')

// rs-16: RS St. Yusup → leaf, dark blue, cross
const RS_16 = () => logo(leafShape, `<circle cx="100" cy="80" r="28" fill="white" opacity="0.9"/>
<path d="M100 62 L100 98 M82 80 L118 80" stroke="#1565c0" stroke-width="4" stroke-linecap="round"/>
<text x="100" y="135" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="white">SY</text>
<text x="100" y="155" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">ST. YUSUP</text>`, '#1565c0', '#0d47a1', 'g16')

// rs-17: RS Kebon Jati → diamond, dark gray, KJ
const RS_17 = () => logo(diamond, `<circle cx="100" cy="75" r="30" fill="white" opacity="0.85"/>
<text x="100" y="82" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#37474f">KJ</text>
<text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">KEBON JATI</text>
<text x="100" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.6)">BANDUNG</text>`, '#37474f', '#455a64', 'g17')

// rs-18: RS Bhayangkara Brimob → teardrop, dark blue, shield
const RS_18 = () => logo(teardrop, `<text x="100" y="82" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">BHAYANGKARA</text>
<path d="M100 55 L145 78 L145 110 Q145 145 100 160 Q55 145 55 110 L55 78 Z" fill="none" stroke="white" stroke-width="3" opacity="0.5"/>
<text x="100" y="122" text-anchor="middle" font-family="Georgia,serif" font-size="12" font-weight="bold" fill="white" font-style="italic">Brimob</text>`, '#1a237e', '#283593', 'g18')

// rs-19: RS UI → teardrop, yellow, UI
const RS_19 = () => logo(teardrop, `<circle cx="100" cy="78" r="28" fill="white" opacity="0.9"/>
<text x="100" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#ff8f00">UI</text>
<text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RS UI</text>
<text x="100" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.6)">UNIVERSITAS</text>`, '#ff8f00', '#ff6f00', 'g19')

// rs-20: RS Citra Medika → pill, teal, cross
const RS_20 = () => logo(pill, `${crossIcon}
<text x="100" y="155" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">CITRA MEDIKA</text>
<text x="100" y="170" text-anchor="middle" font-family="Arial,sans-serif" font-size="6" fill="rgba(255,255,255,0.6)">DEPOK</text>`, '#00838f', '#006064', 'g20')

// rs-21: RS Siloam Tangerang → circle, blue-yellow, S
const RS_21 = () => logo(circle, `<circle cx="100" cy="100" r="38" fill="white" opacity="0.15"/>
<text x="100" y="88" text-anchor="middle" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="white" font-style="italic">S</text>
<text x="100" y="128" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">SILOAM</text>
<text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">TANGERANG</text>`, '#283593', '#fdd835', 'g21')

// rs-22: RS Sari Asih → arch, green, SA
const RS_22 = () => logo(arch, `<text x="100" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="white">SA</text>
<text x="100" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">SARI ASIH</text>
<text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">RUMAH SAKIT</text>`, '#2e7d32', '#1b5e20', 'g22')

// rs-23: RS EMC Tangerang → hexagon, blue, EMC
const RS_23 = () => logo(hexagon, `<text x="100" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="bold" fill="white">EMC</text>
<text x="100" y="115" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.5)">EMERGENCY MEDICAL</text>
<rect x="75" y="125" width="50" height="3" rx="1.5" fill="white" opacity="0.35"/>
<text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">TANGERANG</text>`, '#0d47a1', '#1565c0', 'g23')

// rs-24: RS Anna Medika → diamond, rose, A
const RS_24 = () => logo(diamond, `<path d="M100 50 L140 100 L100 150 L60 100 Z" fill="white" opacity="0.1"/>
<text x="100" y="90" text-anchor="middle" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="white">A</text>
<text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">ANNA MEDIKA</text>
<text x="100" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.6)">BEKASI</text>`, '#ad1457', '#880e4f', 'g24')

// rs-25: RS Mitra Keluarga → circle, orange, K
const RS_25 = () => logo(circle, `<path d="M70 60 Q100 50 130 60 L130 100 Q100 110 70 100 Z" fill="white" opacity="0.15"/>
<text x="100" y="82" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">MITRA</text>
<text x="100" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="white">K</text>
<text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">KELUARGA</text>`, '#ef6c00', '#e65100', 'g25')

// rs-26: RS Permata Bekasi → diamond, purple, diamond shape
const RS_26 = () => logo(diamond, `<path d="M100 40 L155 95 L130 160 L70 160 L45 95 Z" fill="none" stroke="white" stroke-width="2.5" opacity="0.35"/>
<circle cx="100" cy="75" r="22" fill="white" opacity="0.9"/>
<path d="M100 60 L100 90 M88 75 L112 75" stroke="#4a148c" stroke-width="4" stroke-linecap="round"/>
<text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">PERMATA</text>
<text x="100" y="158" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">HOSPITAL</text>`, '#4a148c', '#6a1b9a', 'g26')

// rs-27: RSUD Dr. Soetomo → shield, red gradient, Soetomo
const RS_27 = () => logo(shield, `<text x="100" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RSUD</text>
<text x="100" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="white" font-style="italic">Dr. Soetomo</text>
<text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">SURABAYA</text>`, '#b71c1c', '#880e4f', 'g27')

// rs-28: RS Siloam Surabaya → circle, blue-yellow, stylized S
const RS_28 = () => logo(circle, `<path d="M100 50 Q140 60 140 100 Q140 140 100 150 Q60 140 60 100 Q60 60 100 50" fill="none" stroke="white" stroke-width="3" opacity="0.35"/>
<text x="100" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="white" font-style="italic">S</text>
<text x="100" y="138" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">SILOAM SBY</text>`, '#1a237e', '#fbc02d', 'g28')

// rs-29: RS Dr. Ramelan → octagon, navy, R
const RS_29 = () => logo(octagon, `<text x="100" y="90" text-anchor="middle" font-family="Georgia,serif" font-size="28" font-weight="bold" fill="white" font-style="italic">R</text>
<text x="100" y="135" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">Dr. RAMELAN</text>
<text x="100" y="153" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.6)">SURABAYA</text>`, '#283593', '#1a237e', 'g29')

// rs-30: RS William Booth → pill, red, WB
const RS_30 = () => logo(pill, `<text x="100" y="82" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-weight="bold" fill="white">WB</text>
<text x="100" y="115" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">WILLIAM BOOTH</text>
<text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.6)">HOSPITAL</text>`, '#c62828', '#b71c1c', 'g30')

// rs-31: RSUP Dr. Kariadi → leaf, blue, K
const RS_31 = () => logo(leafShape, `<text x="100" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">RSUP</text>
<text x="100" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-weight="bold" fill="white" font-style="italic">K</text>
<text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.8)">Dr. Kariadi</text>`, '#0d47a1', '#1565c0', 'g31')

// rs-32: RS Telogorejo → arch, brown, T
const RS_32 = () => logo(arch, `<text x="100" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="white">T</text>
<text x="100" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">TELOGOREJO</text>
<text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.6)">SEMARANG</text>`, '#4e342e', '#3e2723', 'g32')

// rs-33: RS Elisabeth → heart, purple, E
const RS_33 = () => logo(heartShape, `<path d="M100 50 L150 100 L130 155 L70 155 L50 100 Z" fill="none" stroke="white" stroke-width="2.5" opacity="0.3"/>
<text x="100" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="20" font-weight="bold" fill="white">E</text>
<text x="100" y="135" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">ELISABETH</text>`, '#7b1fa2', '#4a148c', 'g33')

// ─── PUSKESMAS ──────────────────────────────────────────────────────
// Each city gets a unique Puskesmas design with consistent city identity

const PKM_KOTA = (_name: string, city: string, color: string, shape: string) => {
  const gid = `p-${city}`
  const defs = gradDefs(gid, color, adjustColor(color, -25))
  let s: string
  switch (shape) {
    case 'circle': s = circle(gid); break
    case 'rrect': s = rrect(gid); break
    case 'hex': s = hexagon(gid); break
    case 'oct': s = octagon(gid); break
    default: s = circle(gid)
  }
  return wrap(`${defs}${s}<rect x="88" y="38" width="24" height="56" rx="4" fill="white" opacity="0.9"/>
<rect x="65" y="62" width="70" height="16" rx="4" fill="white" opacity="0.9"/>
<rect x="92" y="44" width="16" height="44" rx="3" fill="${color}" opacity="0.85"/>
<rect x="70" y="66" width="60" height="8" rx="3" fill="${color}" opacity="0.85"/>
<text x="100" y="145" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">PUSKESMAS</text>
<text x="100" y="162" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">${city}</text>`)
}

// City configs [cityName, color, shape]
const cityPkmConfig: [string, string, string][] = [
  ['Jakarta Pusat', '#1a237e', 'circle'],
  ['Jakarta Selatan', '#c62828', 'rrect'],
  ['Jakarta Barat', '#2e7d32', 'hex'],
  ['Jakarta Timur', '#e65100', 'oct'],
  ['Jakarta Utara', '#00838f', 'circle'],
  ['Bogor', '#1565c0', 'rrect'],
  ['Depok', '#4a148c', 'hex'],
  ['Tangerang', '#00695c', 'oct'],
  ['Bekasi', '#ef6c00', 'circle'],
]

// ─── KLINIK ──────────────────────────────────────────────────────────
// Each klinik gets a unique design with varied shapes and colors

const KLINIK_VARIANTS = [
  // [bg color, shape type, icon type]
  ['#00695c', 'circle', 'cross'],
  ['#00838f', 'rrect', 'plus'],
  ['#0277bd', 'hex', 'heart'],
  ['#4e342e', 'diamond', 'letter'],
  ['#37474f', 'oct', 'staff'],
  ['#5d4037', 'teardrop', 'steth'],
  ['#1565c0', 'pill', 'band'],
  ['#2e7d32', 'circle', 'droplet'],
  ['#6a1b9a', 'rrect', 'shield'],
  ['#e65100', 'hex', 'building'],
  ['#00897b', 'diamond', 'plus'],
  ['#283593', 'oct', 'cross'],
  ['#ad1457', 'teardrop', 'heart'],
  ['#558b2f', 'pill', 'staff'],
  ['#37474f', 'circle', 'letter'],
  ['#880e4f', 'rrect', 'steth'],
  ['#01579b', 'hex', 'band'],
  ['#bf360c', 'diamond', 'droplet'],
  ['#1b5e20', 'oct', 'shield'],
  ['#4a148c', 'teardrop', 'building'],
  ['#006064', 'pill', 'cross'],
  ['#e65100', 'circle', 'heart'],
  ['#4527a0', 'rrect', 'plus'],
  ['#00897b', 'hex', 'staff'],
  ['#c62828', 'diamond', 'band'],
  ['#37474f', 'oct', 'droplet'],
  ['#1565c0', 'teardrop', 'shield'],
  ['#4e342e', 'pill', 'steth'],
  ['#2e7d32', 'circle', 'building'],
] as [string, string, string][]

// ─── HELPERS ────────────────────────────────────────────────────────

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount))
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

function klinikLogo(bg: string, shape: string, iconType: string, idx: number): string {
  const gid = `k-${idx}`
  const defs = gradDefs(gid, bg, adjustColor(bg, -25))
  let s: string
  switch (shape) {
    case 'circle': s = circle(gid); break
    case 'rrect': s = rrect(gid); break
    case 'hex': s = hexagon(gid); break
    case 'diamond': s = diamond(gid); break
    case 'oct': s = octagon(gid); break
    case 'pill': s = pill(gid); break
    case 'teardrop': s = teardrop(gid); break
    default: s = circle(gid)
  }
  let icon: string
  switch (iconType) {
    case 'cross': icon = crossIcon; break
    case 'plus': icon = plusIcon; break
    case 'heart': icon = heartIcon; break
    case 'staff': icon = staffIcon; break
    case 'steth': icon = stethIcon; break
    case 'band': icon = bandIcon; break
    case 'droplet': icon = dropletIcon; break
    case 'shield': icon = shieldIcon; break
    case 'building': icon = buildingIcon; break
    case 'letter': icon = letterIcon('K', 28); break
    default: icon = crossIcon
  }
  return wrap(`${defs}${s}${icon}<text x="100" y="162" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" font-weight="bold" fill="white">KLINIK</text>`)
}

// ─── LOGO MAP ───────────────────────────────────────────────────────

const rsLogos: Record<string, () => string> = {
  'rs-1': RS_1,      // RSUD Kota Bogor
  'rs-2': RS_2,      // RSHS Salak
  'rs-3': RS_3,      // RS Hermina Bogor
  'rs-4': RS_4,      // RS PMI Bogor
  'rs-5': RS_5,      // RSUP Fatmawati
  'rs-6': RS_6,      // RS Pondok Indah
  'rs-7': RS_7,      // RS Mayapada Jakarta
  'rs-8': RS_8,      // RS Medistra
  'rs-9': RS_9,      // RS Siloam Semanggi
  'rs-10': RS_10,    // RSCM
  'rs-11': RS_11,    // RS Pelni
  'rs-12': RS_12,    // RS St. Carolus
  'rs-13': RS_13,    // RS Jakarta Eye Center
  'rs-14': RS_14,    // RSUP Hasan Sadikin
  'rs-15': RS_15,    // RS Borromeus
  'rs-16': RS_16,    // RS St. Yusup
  'rs-17': RS_17,    // RS Kebon Jati
  'rs-18': RS_18,    // RS Bhayangkara Brimob
  'rs-19': RS_19,    // RS UI
  'rs-20': RS_20,    // RS Citra Medika
  'rs-21': RS_21,    // RS Siloam Tangerang
  'rs-22': RS_22,    // RS Sari Asih
  'rs-23': RS_23,    // RS EMC Tangerang
  'rs-24': RS_24,    // RS Anna Medika
  'rs-25': RS_25,    // RS Mitra Keluarga
  'rs-26': RS_26,    // RS Permata Bekasi
  'rs-27': RS_27,    // RSUD Dr. Soetomo
  'rs-28': RS_28,    // RS Siloam Surabaya
  'rs-29': RS_29,    // RS Dr. Ramelan
  'rs-30': RS_30,    // RS William Booth
  'rs-31': RS_31,    // RSUP Dr. Kariadi
  'rs-32': RS_32,    // RS Telogorejo
  'rs-33': RS_33,    // RS Elisabeth
}

export function getLogoByType(_type: string): string {
  return wrap(`<circle cx="100" cy="100" r="95" fill="#546e7a"/>
<rect x="88" y="40" width="24" height="55" rx="4" fill="white"/>
<rect x="65" y="62" width="70" height="16" rx="4" fill="white"/>
<text x="100" y="150" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="white">KESEHATAN</text>`)
}

export function getLogoById(id: string, type: string, _name: string): string {
  if (type === 'rumah_sakit') {
    const gen = rsLogos[id]
    if (gen) return gen()
    return RS_1()
  }

  if (type === 'puskesmas') {
    const idx = parseInt(id.replace(/\D/g, '')) || 0
    const cityIdx = idx % cityPkmConfig.length
    const [city, color, shape] = cityPkmConfig[cityIdx]
    return PKM_KOTA(id, city, color, shape)
  }

  if (type === 'klinik') {
    const idx = parseInt(id.replace(/\D/g, '')) || 0
    const vi = idx % KLINIK_VARIANTS.length
    const [bg, shape, iconType] = KLINIK_VARIANTS[vi]
    return klinikLogo(bg, shape, iconType, idx)
  }

  return getLogoByType(type)
}
