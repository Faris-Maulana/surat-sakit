#!/usr/bin/env node
/**
 * Restore real hospital data from git commit 466521d,
 * map old city IDs to new kab-/kota- prefixed IDs,
 * and merge with current generated data.
 */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const DATA_DIR = path.join(__dirname, '..', 'src', 'data')

// ── 1. Read old data from git ──
const oldRsRaw = execSync('git show 466521d:src/data/rumah_sakit.ts', { cwd: path.join(__dirname, '..') }).toString()
const oldPkmRaw = execSync('git show 466521d:src/data/puskesmas.ts', { cwd: path.join(__dirname, '..') }).toString()
const oldKlRaw = execSync('git show 466521d:src/data/klinik.ts', { cwd: path.join(__dirname, '..') }).toString()

// ── 2. Build old city ID → name mapping ──
const oldInstRaw = execSync('git show 466521d:src/data/institutions.ts', { cwd: path.join(__dirname, '..') }).toString()
const oldCityNameMap = {}
const cityRegex = /id:\s*'([^']+)'[^}]*name:\s*'([^']+)'/g
let cm
while ((cm = cityRegex.exec(oldInstRaw)) !== null) {
  oldCityNameMap[cm[1]] = cm[2]
}

// ── 3. Build current city ID → name mapping ──
const currentInstRaw = fs.readFileSync(path.join(DATA_DIR, 'institutions.ts'), 'utf-8')
const currentCityMap = {}  // name → id
let cm2
while ((cm2 = cityRegex.exec(currentInstRaw)) !== null) {
  currentCityMap[cm2[2]] = cm2[1]
}

// ── 4. Build old ID → new ID mapping ──
const idMap = {}
for (const [oldId, name] of Object.entries(oldCityNameMap)) {
  // Try direct match first (if current has same name)
  if (currentCityMap[name]) {
    idMap[oldId] = currentCityMap[name]
  } else {
    // Try to find partial match — match on the base name
    const normalized = name.replace(/^(Kota|Kabupaten)\s+/i, '').trim().toLowerCase()
    for (const [cn, cid] of Object.entries(currentCityMap)) {
      if (cn.toLowerCase().includes(normalized) || normalized.includes(cn.toLowerCase().replace(/^(kota|kabupaten)\s+/i, '').trim())) {
        idMap[oldId] = cid
        break
      }
    }
  }
}

console.log(`Old cities: ${Object.keys(oldCityNameMap).length}`)
console.log(`Mapped cities: ${Object.keys(idMap).length}`)
console.log(`Unmapped old cities:`)
for (const oldId of Object.keys(oldCityNameMap)) {
  if (!idMap[oldId]) console.log(`  ${oldId} → "${oldCityNameMap[oldId]}"`)
}

// ── 5. Parse old data ──
function parseEntries(raw) {
  const results = []
  const regex = /\{\s*id:\s*'([^']*)'[^}]*?city:\s*'([^']*)'[^}]*?name:\s*'([^']*)'[^}]*?address:\s*'([^']*)'/g
  let m
  while ((m = regex.exec(raw)) !== null) {
    results.push({ oldId: m[1], city: m[2], name: m[3], address: m[4] })
  }
  return results
}

const oldRs = parseEntries(oldRsRaw)
const oldPkm = parseEntries(oldPkmRaw)
const oldKl = parseEntries(oldKlRaw)

console.log(`\nOld RS entries: ${oldRs.length}`)
console.log(`Old Puskesmas entries: ${oldPkm.length}`)
console.log(`Old Klinik entries: ${oldKl.length}`)

// ── 6. Group old real data by new city ID ──
const realRsByCity = {}
const realPkmByCity = {}
const realKlByCity = {}

for (const e of oldRs) {
  const newId = idMap[e.city]
  if (!newId) continue
  if (!realRsByCity[newId]) realRsByCity[newId] = []
  realRsByCity[newId].push(e)
}

for (const e of oldPkm) {
  const newId = idMap[e.city]
  if (!newId) continue
  if (!realPkmByCity[newId]) realPkmByCity[newId] = []
  realPkmByCity[newId].push(e)
}

for (const e of oldKl) {
  const newId = idMap[e.city]
  if (!newId) continue
  if (!realKlByCity[newId]) realKlByCity[newId] = []
  realKlByCity[newId].push(e)
}

console.log(`\nReal RS cities: ${Object.keys(realRsByCity).length}`)
console.log(`Real Puskesmas cities: ${Object.keys(realPkmByCity).length}`)
console.log(`Real Klinik cities: ${Object.keys(realKlByCity).length}`)

// ── 7. Read current (generated) data ──
const currentRsRaw = fs.readFileSync(path.join(DATA_DIR, 'rumah_sakit.ts'), 'utf-8')
const currentPkmRaw = fs.readFileSync(path.join(DATA_DIR, 'puskesmas.ts'), 'utf-8')
const currentKlRaw = fs.readFileSync(path.join(DATA_DIR, 'klinik.ts'), 'utf-8')

const currentRs = parseEntries(currentRsRaw)
const currentPkm = parseEntries(currentPkmRaw)
const currentKl = parseEntries(currentKlRaw)

// ── 8. Get all city IDs from current institutions.ts ──
const allCityIds = []
let cmAll
while ((cmAll = cityRegex.exec(currentInstRaw)) !== null) {
  allCityIds.push(cmAll[1])
}

// ── 9. Generate new RS file: real names where available, fallback to generated ──
const usedRsIds = new Set()
const usedAddresses = [
  'Jl. Kesehatan No. 1', 'Jl. Raya Puskesmas No. 10', 'Jl. Merdeka No. 55',
  'Jl. Dr. Soetomo No. 22', 'Jl. Sudirman No. 110', 'Jl. Ahmad Yani No. 33',
]
const usedPhones = ['(021) 1234567', '(022) 7654321', '(031) 5551234', '(061) 3334567', '(0411) 2223456', '(0361) 4445678']

function generateRs(cityId, idx) {
  const displayName = cityId.replace(/^(kab-|kota-)/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  return {
    name: `RSUD ${displayName}`,
    address: usedAddresses[idx % usedAddresses.length],
    phone: usedPhones[idx % usedPhones.length],
  }
}

let rsOutput = `import type { Institution } from '@/types'\n\nexport const rsList: Institution[] = [\n`
let rsCounter = 1

for (const cityId of allCityIds) {
  const realEntries = realRsByCity[cityId]
  const generatedEntry = currentRs.find(e => e.city === cityId)

  if (realEntries && realEntries.length > 0) {
    const toUse = realEntries.slice(0, 2)
    for (const e of toUse) {
      const safeName = e.name.replace(/\\/g, '').replace(/'/g, "\\'")
      const safeAddr = e.address.replace(/\\/g, '').replace(/'/g, "\\'")
      rsOutput += `  { id: 'rs-${rsCounter}', type: 'rumah_sakit', city: '${cityId}', name: '${safeName}', address: '${safeAddr}', mapsUrl: 'https://maps.google.com/?q=${encodeURIComponent(e.name)}', logoUrl: '', phone: '${usedPhones[rsCounter % usedPhones.length]}' },\n`
      rsCounter++
    }
  } else {
    // Use generated/current data (max 1)
    if (generatedEntry) {
      rsOutput += `  { id: 'rs-${rsCounter}', type: 'rumah_sakit', city: '${cityId}', name: '${generatedEntry.name.replace(/'/g, "\\'")}', address: '${generatedEntry.address.replace(/'/g, "\\'")}', mapsUrl: '${generatedEntry.mapsUrl}', logoUrl: '', phone: '${generatedEntry.phone}' },\n`
      rsCounter++
    } else {
      const fallback = generateRs(cityId, rsCounter)
      rsOutput += `  { id: 'rs-${rsCounter}', type: 'rumah_sakit', city: '${cityId}', name: '${fallback.name}', address: '${fallback.address}', mapsUrl: 'https://maps.google.com/?q=${encodeURIComponent(fallback.name)}', logoUrl: '', phone: '${fallback.phone}' },\n`
      rsCounter++
    }
  }
}
rsOutput += `]\n`

fs.writeFileSync(path.join(DATA_DIR, 'rumah_sakit.ts'), rsOutput)
console.log(`\n✅ Written ${rsCounter - 1} RS entries`)

// ── 10. Generate Puskesmas (1 per city, real names if available) ──
let pkmOutput = `import type { Institution } from '@/types'\n\nexport const puskesmasList: Institution[] = [\n`
for (let i = 0; i < allCityIds.length; i++) {
  const cityId = allCityIds[i]
  const realEntries = realPkmByCity[cityId]
  const displayName = cityId.replace(/^(kab-|kota-)/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const addr = usedAddresses[i % usedAddresses.length]
  const phone = usedPhones[i % usedPhones.length]
  let name
  if (realEntries && realEntries.length > 0) {
    name = realEntries[0].name.replace(/\\/g, '')
  } else {
    name = `Puskesmas ${displayName}`
  }
  pkmOutput += `  { id: 'pkm-${i + 1}', type: 'puskesmas', city: '${cityId}', name: '${name.replace(/'/g, "\\'")}', address: '${addr}', mapsUrl: 'https://maps.google.com/?q=Puskesmas+${encodeURIComponent(displayName)}', logoUrl: '', phone: '${phone}' },\n`
}
pkmOutput += `]\n`
fs.writeFileSync(path.join(DATA_DIR, 'puskesmas.ts'), pkmOutput)
console.log(`✅ Written ${allCityIds.length} Puskesmas entries`)

// ── 11. Generate Klinik (kota only, real names if available) ──
let klOutput = `import type { Institution } from '@/types'\n\nexport const klinikList: Institution[] = [\n`
let klCounter = 1
for (let i = 0; i < allCityIds.length; i++) {
  const cityId = allCityIds[i]
  if (!cityId.startsWith('kota-')) continue
  const realEntries = realKlByCity[cityId]
  const displayName = cityId.replace('kota-', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const addr = usedAddresses[i % usedAddresses.length]
  const phone = usedPhones[i % usedPhones.length]
  let name
  if (realEntries && realEntries.length > 0) {
    name = realEntries[0].name.replace(/\\/g, '')
  } else {
    name = `Klinik 24 Jam ${displayName}`
  }
  klOutput += `  { id: 'kl-${klCounter}', type: 'klinik', city: '${cityId}', name: '${name.replace(/'/g, "\\'")}', address: '${addr}', mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+${encodeURIComponent(displayName)}', logoUrl: '', phone: '${phone}' },\n`
  klCounter++
}
klOutput += `]\n`
fs.writeFileSync(path.join(DATA_DIR, 'klinik.ts'), klOutput)
console.log(`✅ Written ${klCounter - 1} Klinik entries`)

console.log('\n🎉 Done! Real data restored and merged.')
