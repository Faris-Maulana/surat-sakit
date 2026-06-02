import { config } from './config.js'
import type { DoctorEntry } from './data/schemas.js'

const mockDoctors: DoctorEntry[] = []

export async function initMockData(docs: DoctorEntry[]) {
  mockDoctors.length = 0
  mockDoctors.push(...docs)
}

type SatusehatSearchParams = {
  identifier?: string
  name?: string
  birthdate?: string
  gender?: string
}

type SatusehatBundle = {
  resourceType: 'Bundle'
  type: 'searchset'
  total: number
  entry?: Array<{
    resource: {
      resourceType: 'Practitioner'
      id: string
      identifier: Array<{
        system: string
        value: string
      }>
      name: Array<{
        text: string
        given?: string[]
        family?: string
        prefix?: string[]
      }>
      gender?: string
      birthDate?: string
    }
  }>
}

function doctorToFhir(doc: DoctorEntry): SatusehatBundle['entry'][0]['resource'] {
  const nameParts = doc.name.split(', ')
  const givenName = nameParts[1] || nameParts[0]
  const familyName = nameParts[1] ? nameParts[0].replace(/^dr\.\s*/i, '') : ''
  const prefix = doc.name.match(/^dr(?:g)?\./i)?.[0] ? [doc.name.match(/^dr(?:g)?\./i)![0]] : []

  return {
    resourceType: 'Practitioner',
    id: doc.id,
    identifier: [
      { system: 'http://sys-ids.kemkes.go.id/practitioner/NIK', value: `NIK-MOCK-${doc.id}` },
      { system: 'http://sys-ids.kemkes.go.id/practitioner/SIP', value: doc.sip },
      { system: 'http://sys-ids.kemkes.go.id/practitioner/STR', value: doc.str },
    ],
    name: [
      {
        text: doc.name,
        given: [givenName],
        family: familyName || undefined,
        prefix,
      },
    ],
    birthDate: '1980-01-01',
  }
}

function searchMock(params: SatusehatSearchParams): DoctorEntry[] {
  let results = [...mockDoctors]

  if (params.identifier) {
    const nikPart = params.identifier.replace(/^NIK-MOCK-/, '')
    results = results.filter(d => d.id === nikPart || d.sip.includes(params.identifier!))
  }

  if (params.name) {
    const q = params.name.toLowerCase()
    results = results.filter(d => d.name.toLowerCase().includes(q))
  }

  return results
}

async function realSearchPractitioners(params: SatusehatSearchParams): Promise<SatusehatBundle> {
  const tokenRes = await fetch(
    `${config.satusehat.baseUrl}/oauth2/v1/accesstoken?grant_type=client_credentials`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: config.satusehat.clientId,
        client_secret: config.satusehat.clientSecret,
      }),
    },
  )
  if (!tokenRes.ok) {
    const text = await tokenRes.text()
    throw new Error(`SATUSEHAT auth failed (${tokenRes.status}): ${text}`)
  }
  const tokenData = await tokenRes.json() as { access_token: string }

  const query = new URLSearchParams()
  if (params.identifier) query.set('identifier', params.identifier)
  if (params.name) query.set('name', params.name)
  if (params.birthdate) query.set('birthdate', params.birthdate)
  if (params.gender) query.set('gender', params.gender)

  const res = await fetch(
    `${config.satusehat.baseUrl}/fhir-r4/v1/Practitioner?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'X-Organization-Id': config.satusehat.orgId,
      },
    },
  )
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`SATUSEHAT FHIR failed (${res.status}): ${text}`)
  }
  return res.json() as Promise<SatusehatBundle>
}

export async function searchPractitioners(params: SatusehatSearchParams): Promise<SatusehatBundle> {
  if (config.useMock) {
    await new Promise(r => setTimeout(r, 200 + Math.random() * 300))

    const results = searchMock(params)
    return {
      resourceType: 'Bundle',
      type: 'searchset',
      total: results.length,
      entry: results.map(doc => ({
        resource: doctorToFhir(doc),
      })),
    }
  }

  return realSearchPractitioners(params)
}

export function fhirToDoctorEntry(resource: SatusehatBundle['entry'][0]['resource']): DoctorEntry | null {
  const name = resource.name?.[0]?.text || ''
  const sipIdentifier = resource.identifier.find(i => i.system.includes('SIP'))
  const strIdentifier = resource.identifier.find(i => i.system.includes('STR'))

  if (!name || !sipIdentifier) return null

  const institutionType = sipIdentifier.value.includes('DKK')
    ? 'rumah_sakit'
    : sipIdentifier.value.includes('PMK')
      ? 'puskesmas'
      : sipIdentifier.value.includes('KS')
        ? 'klinik'
        : 'rumah_sakit'

  const yearStr = sipIdentifier.value.split('/').pop()
  const year = yearStr ? parseInt(yearStr, 10) : 2026
  const expiryDate = new Date(year + 5, 0, 1).toISOString().split('T')[0]

  return {
    id: resource.id,
    name,
    sip: sipIdentifier.value,
    str: strIdentifier?.value || '',
    specialization: name.includes('Sp.') ? name.split(', ')[1] || 'Dokter' : 'Dokter Umum',
    institutionType,
    createdAt: new Date().toISOString().split('T')[0],
    expiryDate,
  }
}
