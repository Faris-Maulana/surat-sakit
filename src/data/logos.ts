// Institution-specific logo data — each RS/Puskesmas/Klinik gets its own logo
// Real recognizable chains get distinctive designs; others use type-based variants

export type LogoMap = Record<string, string>

// ─── RUMAH SAKIT ───────────────────────────────────────────────────

const RS_GOVT = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#1565c0"/><stop offset="100%" style="stop-color:#0d47a1"/></linearGradient></defs>
  <path d="M100 8 L180 50 L180 120 Q180 170 100 195 Q20 170 20 120 L20 50 Z" fill="url(#g)" stroke="#0d47a1" stroke-width="3"/>
  <rect x="86" y="48" width="12" height="56" rx="2" fill="white"/><rect x="102" y="48" width="12" height="56" rx="2" fill="white"/><rect x="78" y="70" width="44" height="14" rx="2" fill="white"/>
  <rect x="89" y="53" width="6" height="46" rx="1" fill="#1565c0"/><rect x="105" y="53" width="6" height="46" rx="1" fill="#1565c0"/><rect x="82" y="73" width="36" height="8" rx="1" fill="#1565c0"/>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RUMAH SAKIT</text>
  <text x="100" y="154" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">UMUM DAERAH</text>
</svg>`

const RS_HERMINA = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="h" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#e91e63"/><stop offset="100%" style="stop-color:#ad1457"/></linearGradient></defs>
  <rect x="10" y="10" width="180" height="180" rx="30" fill="url(#h)"/>
  <path d="M145 50 L145 150 L55 150 L55 50 Z" fill="white" opacity="0.2"/>
  <circle cx="100" cy="80" r="35" fill="white"/>
  <path d="M100 58 L100 102 M78 80 L122 80" stroke="#e91e63" stroke-width="6" stroke-linecap="round"/>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">HERMINA</text>
  <text x="100" y="158" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.8)">HOSPITAL</text>
</svg>`

const RS_SILOAM = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="s" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1a237e"/><stop offset="100%" style="stop-color:#283593"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#s)"/>
  <path d="M60 70 Q100 30 140 70 L130 130 Q100 160 70 130 Z" fill="white" opacity="0.15"/>
  <text x="100" y="90" text-anchor="middle" font-family="Georgia,serif" font-size="28" font-weight="bold" fill="white" font-style="italic">S</text>
  <text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="white">SILOAM</text>
  <text x="100" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">HOSPITALS</text>
</svg>`

const RS_MAYAPADA = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="m" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#b8860b"/><stop offset="100%" style="stop-color:#8b6914"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#m)"/>
  <path d="M80 50 L120 50 L120 150 L80 150 Z" fill="white" opacity="0.2"/>
  <path d="M50 80 L150 80 L150 120 L50 120 Z" fill="white" opacity="0.2"/>
  <text x="100" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-weight="bold" fill="white">MP</text>
  <text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">MAYAPADA</text>
  <text x="100" y="146" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">HEALTHCARE</text>
</svg>`

const RS_PONDOK_INDAH = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="pi" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#00695c"/><stop offset="100%" style="stop-color:#004d40"/></linearGradient></defs>
  <rect x="15" y="15" width="170" height="170" rx="20" fill="url(#pi)"/>
  <path d="M100 35 L155 65 L155 120 L100 150 L45 120 L45 65 Z" fill="none" stroke="white" stroke-width="2.5" opacity="0.3"/>
  <circle cx="100" cy="82" r="28" fill="white"/>
  <path d="M100 62 L100 102 M82 82 L118 82" stroke="#00695c" stroke-width="5" stroke-linecap="round"/>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">PONDOK INDAH</text>
</svg>`

const RS_BORROMEUS = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#6a1b9a"/><stop offset="100%" style="stop-color:#4a148c"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#b)"/>
  <path d="M100 35 L100 165 M35 100 L165 100" stroke="white" stroke-width="5" opacity="0.3"/>
  <circle cx="100" cy="100" r="30" fill="white"/>
  <path d="M100 78 L100 122 M78 100 L122 100" stroke="#6a1b9a" stroke-width="5" stroke-linecap="round"/>
  <text x="100" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">BORROMEUS</text>
</svg>`

const RS_CAROLUS = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="c" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#c62828"/><stop offset="100%" style="stop-color:#8e0000"/></linearGradient></defs>
  <rect x="10" y="10" width="180" height="180" rx="30" fill="url(#c)"/>
  <text x="100" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="36" font-weight="bold" fill="white">SC</text>
  <text x="100" y="120" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">ST. CAROLUS</text>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">RS KATOLIK</text>
</svg>`

const RS_MEDISTRA = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="med" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#37474f"/><stop offset="100%" style="stop-color:#263238"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#med)"/>
  <path d="M70 60 L100 45 L130 60 L130 100 Q130 130 100 140 Q70 130 70 100 Z" fill="none" stroke="white" stroke-width="2.5"/>
  <text x="100" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="white">M</text>
  <text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">MEDISTRA</text>
</svg>`

const RS_EMC = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="emc" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d47a1"/><stop offset="100%" style="stop-color:#1565c0"/></linearGradient></defs>
  <rect x="15" y="15" width="170" height="170" rx="15" fill="url(#emc)"/>
  <text x="100" y="80" text-anchor="middle" font-family="Arial,sans-serif" font-size="32" font-weight="bold" fill="white">EMC</text>
  <text x="100" y="105" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.6)">EMERGENCY MEDICAL</text>
  <rect x="75" y="118" width="50" height="4" rx="2" fill="white" opacity="0.4"/>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">EMC HOSPITAL</text>
</svg>`

const RS_MITRA_KELUARGA = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="mk" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#ef6c00"/><stop offset="100%" style="stop-color:#e65100"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#mk)"/>
  <path d="M70 60 Q100 50 130 60 L130 100 Q100 110 70 100 Z" fill="white" opacity="0.2"/>
  <text x="100" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">MITRA</text>
  <text x="100" y="105" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="white">K</text>
  <text x="100" y="135" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">KELUARGA</text>
</svg>`

const RS_PERMATA = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="per" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#4a148c"/><stop offset="100%" style="stop-color:#6a1b9a"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#per)"/>
  <path d="M100 30 L160 80 L140 160 L60 160 L40 80 Z" fill="none" stroke="white" stroke-width="2.5" opacity="0.3"/>
  <circle cx="100" cy="65" r="20" fill="white"/>
  <path d="M100 52 L100 78 M88 65 L112 65" stroke="#4a148c" stroke-width="4" stroke-linecap="round"/>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">PERMATA</text>
  <text x="100" y="156" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">HOSPITAL</text>
</svg>`

const RS_SARI_ASIH = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="sa" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2e7d32"/><stop offset="100%" style="stop-color:#1b5e20"/></linearGradient></defs>
  <rect x="15" y="15" width="170" height="170" rx="15" fill="url(#sa)"/>
  <text x="100" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="white">SA</text>
  <text x="100" y="120" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">SARI ASIH</text>
  <text x="100" y="138" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">RUMAH SAKIT</text>
</svg>`

const RS_YUSUP = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="sy" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1565c0"/><stop offset="100%" style="stop-color:#0d47a1"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#sy)"/>
  <path d="M60 40 Q100 35 140 40 L140 160 Q100 165 60 160 Z" fill="white" opacity="0.12"/>
  <text x="100" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-weight="bold" fill="white">SY</text>
  <text x="100" y="120" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">ST. YUSUP</text>
</svg>`

const RS_KEBON_JATI = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="kj" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#37474f"/><stop offset="100%" style="stop-color:#455a64"/></linearGradient></defs>
  <rect x="15" y="15" width="170" height="170" rx="20" fill="url(#kj)"/>
  <text x="100" y="80" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RS</text>
  <text x="100" y="105" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="white">KJ</text>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">KEBON JATI</text>
</svg>`

const RS_PELNI = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="pel" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d47a1"/><stop offset="100%" style="stop-color:#1565c0"/></linearGradient></defs>
  <rect x="10" y="10" width="180" height="180" rx="25" fill="url(#pel)"/>
  <path d="M60 35 L140 35 L140 165 L60 165 Z" fill="none" stroke="white" stroke-width="3" opacity="0.15"/>
  <circle cx="100" cy="85" r="25" fill="white"/>
  <text x="100" y="92" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="#0d47a1">P</text>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">RS PELNI</text>
</svg>`

const RS_CITRA_MEDIKA = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="cm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#00838f"/><stop offset="100%" style="stop-color:#006064"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#cm)"/>
  <circle cx="100" cy="100" r="30" fill="white"/>
  <path d="M100 80 L100 120 M80 100 L120 100" stroke="#00838f" stroke-width="5" stroke-linecap="round"/>
  <text x="100" y="155" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">CITRA MEDIKA</text>
</svg>`

const RS_SOETOMO = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="st" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#b71c1c"/><stop offset="100%" style="stop-color:#880e4f"/></linearGradient></defs>
  <path d="M100 10 L185 55 L185 120 Q185 170 100 195 Q15 170 15 120 L15 55 Z" fill="url(#st)"/>
  <text x="100" y="95" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">RSUD</text>
  <text x="100" y="125" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="white" font-style="italic">Dr. Soetomo</text>
</svg>`

const RS_RAMELAN = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="rm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#283593"/><stop offset="100%" style="stop-color:#1a237e"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#rm)"/>
  <text x="100" y="90" text-anchor="middle" font-family="Georgia,serif" font-size="18" font-weight="bold" fill="white" font-style="italic">R</text>
  <text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">Dr. RAMELAN</text>
</svg>`

const RS_WILLIAM_BOOTH = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="wb" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#c62828"/><stop offset="100%" style="stop-color:#b71c1c"/></linearGradient></defs>
  <rect x="15" y="15" width="170" height="170" rx="15" fill="url(#wb)"/>
  <text x="100" y="80" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="white">WB</text>
  <text x="100" y="108" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">WILLIAM</text>
  <text x="100" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">BOOTH</text>
  <text x="100" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.6)">HOSPITAL</text>
</svg>`

const RS_KARIADI = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="kr" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#0d47a1"/><stop offset="100%" style="stop-color:#1565c0"/></linearGradient></defs>
  <path d="M100 10 L185 55 L185 120 Q185 170 100 195 Q15 170 15 120 L15 55 Z" fill="url(#kr)"/>
  <text x="100" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RSUP</text>
  <text x="100" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="bold" fill="white" font-style="italic">Dr. Kariadi</text>
</svg>`

const RS_TELOGOREJO = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#4e342e"/><stop offset="100%" style="stop-color:#3e2723"/></linearGradient></defs>
  <rect x="15" y="15" width="170" height="170" rx="15" fill="url(#tg)"/>
  <text x="100" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="white">T</text>
  <text x="100" y="115" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">TELOGOREJO</text>
</svg>`

const RS_ELISABETH = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="el" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6a1b9a"/><stop offset="100%" style="stop-color:#4a148c"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#el)"/>
  <path d="M100 40 L160 80 L140 155 L60 155 L40 80 Z" fill="none" stroke="white" stroke-width="2.5" opacity="0.25"/>
  <text x="100" y="90" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="white">E</text>
  <text x="100" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">ELISABETH</text>
</svg>`

const RS_UI = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="ui" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#ff8f00"/><stop offset="100%" style="stop-color:#ff6f00"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#ui)"/>
  <circle cx="100" cy="85" r="30" fill="white"/>
  <text x="100" y="92" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#ff8f00">UI</text>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RS UI</text>
</svg>`

const RS_JEC = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="jec" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0277bd"/><stop offset="100%" style="stop-color:#01579b"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#jec)"/>
  <ellipse cx="100" cy="80" rx="28" ry="20" fill="white"/>
  <circle cx="100" cy="80" r="10" fill="#0277bd"/>
  <text x="100" y="130" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">JAKARTA</text>
  <text x="100" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">EYE CENTER</text>
</svg>`

const RS_SALAK = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="sk" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#2e7d32"/><stop offset="100%" style="stop-color:#1b5e20"/></linearGradient></defs>
  <rect x="15" y="15" width="170" height="170" rx="20" fill="url(#sk)"/>
  <path d="M100 40 L145 70 L145 120 L100 150 L55 120 L55 70 Z" fill="none" stroke="white" stroke-width="2.5" opacity="0.25"/>
  <text x="100" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">RSHS</text>
  <text x="100" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="bold" fill="white">Salak</text>
</svg>`

const RS_PMI = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="pmi" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#b71c1c"/><stop offset="100%" style="stop-color:#c62828"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#pmi)"/>
  <path d="M100 35 L165 80 L140 160 L60 160 L35 80 Z" fill="white" opacity="0.15"/>
  <text x="100" y="95" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="white">PMI</text>
  <text x="100" y="135" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RS PMI</text>
</svg>`

const RS_BHAYANGKARA = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="bh" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#1a237e"/><stop offset="100%" style="stop-color:#283593"/></linearGradient></defs>
  <path d="M100 10 L185 55 L185 120 Q185 170 100 195 Q15 170 15 120 L15 55 Z" fill="url(#bh)"/>
  <text x="100" y="95" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">BHAYANGKARA</text>
  <text x="100" y="120" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="white" font-style="italic">Brimob</text>
</svg>`

const RS_FATMAWATI = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="ft" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#0d47a1"/><stop offset="100%" style="stop-color:#1565c0"/></linearGradient></defs>
  <path d="M100 10 L185 55 L185 120 Q185 170 100 195 Q15 170 15 120 L15 55 Z" fill="url(#ft)"/>
  <text x="100" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">RSUP</text>
  <text x="100" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="bold" fill="white" font-style="italic">Fatmawati</text>
</svg>`

const RS_RSCM = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="rcm" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#b71c1c"/><stop offset="100%" style="stop-color:#880e4f"/></linearGradient></defs>
  <path d="M100 10 L185 55 L185 120 Q185 170 100 195 Q15 170 15 120 L15 55 Z" fill="url(#rcm)"/>
  <text x="100" y="85" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">RSUPN</text>
  <text x="100" y="108" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">Dr. Cipto</text>
  <text x="100" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">Mangunkusumo</text>
</svg>`

const RS_HASAN_SADIKIN = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="hs" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#0d47a1"/><stop offset="100%" style="stop-color:#1565c0"/></linearGradient></defs>
  <path d="M100 10 L185 55 L185 120 Q185 170 100 195 Q15 170 15 120 L15 55 Z" fill="url(#hs)"/>
  <text x="100" y="88" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">RSUP</text>
  <text x="100" y="112" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="white" font-style="italic">Hasan Sadikin</text>
</svg>`

const RS_ANNA_MEDIKA = (_name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="ann" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#ad1457"/><stop offset="100%" style="stop-color:#880e4f"/></linearGradient></defs>
  <rect x="15" y="15" width="170" height="170" rx="20" fill="url(#ann)"/>
  <text x="100" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="20" font-weight="bold" fill="white">A</text>
  <text x="100" y="118" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" font-weight="bold" fill="white">ANNA MEDIKA</text>
</svg>`

// ─── PUSKESMAS ──────────────────────────────────────────────────────
// Standard Dinas Kesehatan logo with different accent colors per region

const PKM_GENERIC = (_name: string, accent: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="pkm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${accent}"/><stop offset="100%" style="stop-color:${adjustColor(accent, -30)}"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#pkm)" stroke="${adjustColor(accent, -40)}" stroke-width="3"/>
  <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <rect x="88" y="35" width="24" height="62" rx="5" fill="white"/>
  <rect x="62" y="63" width="76" height="20" rx="5" fill="white"/>
  <rect x="92" y="42" width="16" height="48" rx="4" fill="${accent}"/>
  <rect x="68" y="67" width="64" height="12" rx="4" fill="${accent}"/>
  <text x="100" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="white">PUSKESMAS</text>
</svg>`

// ─── KLINIK ─────────────────────────────────────────────────────────
// Modern clinic logos with varied color schemes

const KLINIK_GENERIC = (_name: string, bg: string, _fg: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs><linearGradient id="kl" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${bg}"/><stop offset="100%" style="stop-color:${adjustColor(bg, -30)}"/></linearGradient></defs>
  <circle cx="100" cy="100" r="95" fill="url(#kl)" stroke="${adjustColor(bg, -40)}" stroke-width="3"/>
  <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
  <rect x="89" y="38" width="22" height="58" rx="5" fill="white"/>
  <rect x="65" y="62" width="70" height="16" rx="5" fill="white"/>
  <rect x="93" y="44" width="14" height="46" rx="4" fill="${bg}"/>
  <rect x="70" y="66" width="60" height="8" rx="4" fill="${bg}"/>
  <text x="100" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="white">KLINIK 24 JAM</text>
  <text x="100" y="158" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.7)">PRATAMA</text>
  <circle cx="100" cy="178" r="9" fill="#e53935"/>
  <circle cx="100" cy="178" r="7" fill="none" stroke="white" stroke-width="1"/>
  <text x="100" y="182" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="white">24</text>
</svg>`

// ─── HELPERS ────────────────────────────────────────────────────────

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount))
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

// ─── LOGO MAP ───────────────────────────────────────────────────────
// Maps institution ID → SVG generator function

const rsLogos: Record<string, (name: string) => string> = {
  'rs-1': RS_GOVT,       // RSUD Kota Bogor
  'rs-2': RS_SALAK,      // RSHS Salak
  'rs-3': RS_HERMINA,    // RS Hermina Bogor
  'rs-4': RS_PMI,        // RS PMI Bogor
  'rs-5': RS_FATMAWATI,  // RSUP Fatmawati
  'rs-6': RS_PONDOK_INDAH, // RS Pondok Indah
  'rs-7': RS_MAYAPADA,   // RS Mayapada Jakarta
  'rs-8': RS_MEDISTRA,   // RS Medistra
  'rs-9': RS_SILOAM,     // RS Siloam Semanggi
  'rs-10': RS_RSCM,      // RSCM
  'rs-11': RS_PELNI,     // RS Pelni
  'rs-12': RS_CAROLUS,   // RS St. Carolus
  'rs-13': RS_JEC,       // RS Jakarta Eye Center
  'rs-14': RS_HASAN_SADIKIN, // RSUP Hasan Sadikin
  'rs-15': RS_BORROMEUS, // RS Borromeus
  'rs-16': RS_YUSUP,     // RS St. Yusup
  'rs-17': RS_KEBON_JATI, // RS Kebon Jati
  'rs-18': RS_BHAYANGKARA, // RS Bhayangkara Brimob
  'rs-19': RS_UI,        // RS UI
  'rs-20': RS_CITRA_MEDIKA, // RS Citra Medika
  'rs-21': RS_SILOAM,    // RS Siloam Tangerang
  'rs-22': RS_SARI_ASIH, // RS Sari Asih
  'rs-23': RS_EMC,       // RS EMC Tangerang
  'rs-24': RS_ANNA_MEDIKA, // RS Anna Medika
  'rs-25': RS_MITRA_KELUARGA, // RS Mitra Keluarga
  'rs-26': RS_PERMATA,   // RS Permata Bekasi
  'rs-27': RS_SOETOMO,   // RSUD Dr. Soetomo
  'rs-28': RS_SILOAM,    // RS Siloam Surabaya
  'rs-29': RS_RAMELAN,   // RS Dr. Ramelan
  'rs-30': RS_WILLIAM_BOOTH, // RS William Booth
  'rs-31': RS_KARIADI,   // RSUP Dr. Kariadi
  'rs-32': RS_TELOGOREJO, // RS Telogorejo
  'rs-33': RS_ELISABETH, // RS Elisabeth
}

const pkmColors = [
  '#2e7d32', '#1b5e20', '#00695c', '#00897b',
  '#33691e', '#558b2f', '#004d40', '#1b5e20',
]
const klinikColors: [string, string][] = [
  ['#00695c', '#004d40'], ['#00838f', '#006064'], ['#0277bd', '#01579b'],
  ['#4e342e', '#3e2723'], ['#37474f', '#263238'], ['#5d4037', '#4e342e'],
  ['#1565c0', '#0d47a1'], ['#2e7d32', '#1b5e20'], ['#6a1b9a', '#4a148c'],
  ['#e65100', '#bf360c'], ['#37474f', '#455a64'], ['#00897b', '#00695c'],
]

export function getLogoByType(_type: string): string {
  // Fallback generic
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="95" fill="#546e7a" stroke="#37474f" stroke-width="3"/>
    <rect x="88" y="40" width="24" height="55" rx="4" fill="white"/>
    <rect x="65" y="62" width="70" height="16" rx="4" fill="white"/>
    <text x="100" y="150" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="white">KESEHATAN</text>
  </svg>`
}

export function getLogoById(id: string, type: string, name: string): string {
  if (type === 'rumah_sakit') {
    const gen = rsLogos[id]
    if (gen) return gen(name)
    // Fallback: government RS style
    return RS_GOVT(name)
  }

  if (type === 'puskesmas') {
    // Use a color based on index of ID
    const idx = parseInt(id.replace(/\D/g, '')) || 0
    const color = pkmColors[idx % pkmColors.length]
    return PKM_GENERIC(name, color)
  }

  if (type === 'klinik') {
    const idx = parseInt(id.replace(/\D/g, '')) || 0
    const [bg, fg] = klinikColors[idx % klinikColors.length]
    return KLINIK_GENERIC(name, bg, fg)
  }

  return getLogoByType(type)
}
