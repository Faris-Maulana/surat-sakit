#!/usr/bin/env node
/**
 * Finalize data: merge scraped real hospital names with generated placeholders
 * Usage: node scripts/finalize-data.cjs
 */
const fs = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')

const DATA_DIR = path.join(__dirname, '..', 'src', 'data')

// Read current data
const rsPath = path.join(DATA_DIR, 'rumah_sakit.ts')
const pkmPath = path.join(DATA_DIR, 'puskesmas.ts')
const klPath = path.join(DATA_DIR, 'klinik.ts')
const instPath = path.join(DATA_DIR, 'institutions.ts')

// Read scraped real hospital names (from the append at end of RS file)
const rsSrc = fs.readFileSync(rsPath, 'utf-8')

// Extract ALL entries from current RS file
const entryRegex = /\{\s*id:\s*'([^']*)'[^}]*city:\s*'([^']*)'[^}]*name:\s*'([^']*)'/g
const allEntries = []
let m
while ((m = entryRegex.exec(rsSrc)) !== null) {
  allEntries.push({ id: m[1], city: m[2], name: m[3] })
}

console.log(`Total RS entries found: ${allEntries.length}`)

// Group by city, keeping only the last entries (which are scraped real data)
// But identify scraped vs generated: scraped entries are those that were APPENDED
// We can identify them as entries with higher IDs (> 1276 since that was the count before scraping)
const originalGeneratedIds = 1276  // RS count before scraping

const scrapedByCity = {}
const generatedByCity = {}

for (const e of allEntries) {
  const idNum = parseInt(e.id.replace('rs-', ''))
  if (idNum > originalGeneratedIds) {
    // This is a scraped entry
    if (!scrapedByCity[e.city]) scrapedByCity[e.city] = []
    scrapedByCity[e.city].push(e.name)
  } else {
    // Original generated entry
    if (!generatedByCity[e.city]) generatedByCity[e.city] = []
    generatedByCity[e.city].push(e.name)
  }
}

console.log(`Cities with scraped data: ${Object.keys(scrapedByCity).length}`)
console.log(`Cities with generated data: ${Object.keys(generatedByCity).length}`)

// For each city, use scraped data if available, otherwise keep generated
const finalByCity = {}
const allCityIds = new Set([...Object.keys(scrapedByCity), ...Object.keys(generatedByCity)])

for (const cityId of allCityIds) {
  if (scrapedByCity[cityId]) {
    // Use scraped (deduplicated, max 5 per city)
    const unique = [...new Set(scrapedByCity[cityId])]
    finalByCity[cityId] = unique.slice(0, 5)
  } else {
    // Keep generated (deduplicated, max 2 per city)
    const unique = [...new Set(generatedByCity[cityId])]
    finalByCity[cityId] = unique.slice(0, 2)
  }
}

// Also read institutions.ts to get all city IDs
const instSrc = fs.readFileSync(instPath, 'utf-8')
const cityRegex = /id:\s*'([^']+)'/g
const allCityIdsFromFile = []
let cm
while ((cm = cityRegex.exec(instSrc)) !== null) {
  allCityIdsFromFile.push(cm[1])
}
console.log(`All cities in institutions.ts: ${allCityIdsFromFile.length}`)

// Generate complete RS file
let rsOutput = `import type { Institution } from '@/types'\n\nexport const rsList: Institution[] = [\n`
let rsCounter = 1
const addresses = [
  'Jl. Kesehatan No. 1',
  'Jl. Raya Puskesmas No. 10',
  'Jl. Merdeka No. 55',
  'Jl. Dr. Soetomo No. 22',
  'Jl. Sudirman No. 110',
  'Jl. Ahmad Yani No. 33',
]
const phones = ['(021) 1234567', '(022) 7654321', '(031) 5551234', '(061) 3334567', '(0411) 2223456', '(0361) 4445678']

for (const cityId of allCityIdsFromFile) {
  const names = finalByCity[cityId] || [`RSUD ${cityId.replace('kab-', '').replace('kota-', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`]
  const addr = addresses[rsCounter % addresses.length]
  const phone = phones[rsCounter % phones.length]
  for (const name of names.slice(0, 2)) {
    const noBrackets = name.replace(/\[{2}/g, '').replace(/\]{2}/g, '')
    const noHtml = noBrackets.replace(/<[^>]*>/g, ' ')
    const noBackslash = noHtml.replace(/\\/g, '').trim()
    const cleanName = noBackslash.replace(/\s{2,}/g, ' ').trim()
    rsOutput += `  { id: 'rs-${rsCounter}', type: 'rumah_sakit', city: '${cityId}', name: '${cleanName.replace(/'/g, "\\'")}', address: '${addr}', mapsUrl: 'https://maps.google.com/?q=${encodeURIComponent(cleanName)}', logoUrl: '', phone: '${phone}' },\n`
    rsCounter++
  }
  // Ensure every city has at least 1 RS
  if (!names || names.length === 0) {
    const fallbackName = `RSUD ${cityId.replace(/^(kab-|kota-)/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`
    rsOutput += `  { id: 'rs-${rsCounter}', type: 'rumah_sakit', city: '${cityId}', name: '${fallbackName}', address: '${addr}', mapsUrl: 'https://maps.google.com/?q=${encodeURIComponent(fallbackName)}', logoUrl: '', phone: '${phone}' },\n`
    rsCounter++
  }
}
rsOutput += `]\n`
fs.writeFileSync(rsPath, rsOutput)
console.log(`✅ Written ${rsCounter - 1} RS entries`)

// Generate Puskesmas file (1 per city)
let pkmOutput = `import type { Institution } from '@/types'\n\nexport const puskesmasList: Institution[] = [\n`
for (let i = 0; i < allCityIdsFromFile.length; i++) {
  const cityId = allCityIdsFromFile[i]
  const displayName = cityId.replace(/^(kab-|kota-)/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const addr = addresses[i % addresses.length]
  const phone = phones[i % phones.length]
  pkmOutput += `  { id: 'pkm-${i + 1}', type: 'puskesmas', city: '${cityId}', name: 'Puskesmas ${displayName}', address: '${addr}', mapsUrl: 'https://maps.google.com/?q=Puskesmas+${encodeURIComponent(displayName)}', logoUrl: '', phone: '${phone}' },\n`
}
pkmOutput += `]\n`
fs.writeFileSync(pkmPath, pkmOutput)
console.log(`✅ Written ${allCityIdsFromFile.length} Puskesmas entries`)

// Generate Klinik file (for kota cities only)
let klOutput = `import type { Institution } from '@/types'\n\nexport const klinikList: Institution[] = [\n`
let klCounter = 1
for (let i = 0; i < allCityIdsFromFile.length; i++) {
  const cityId = allCityIdsFromFile[i]
  if (!cityId.startsWith('kota-')) continue
  const displayName = cityId.replace('kota-', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const addr = addresses[i % addresses.length]
  const phone = phones[i % phones.length]
  klOutput += `  { id: 'kl-${klCounter}', type: 'klinik', city: '${cityId}', name: 'Klinik 24 Jam ${displayName}', address: '${addr}', mapsUrl: 'https://maps.google.com/?q=Klinik+24+Jam+${encodeURIComponent(displayName)}', logoUrl: '', phone: '${phone}' },\n`
  klCounter++
}
klOutput += `]\n`
fs.writeFileSync(klPath, klOutput)
console.log(`✅ Written ${klCounter - 1} Klinik entries`)

console.log('\n🎉 Done! Data files regenerated with real+generated data.')
