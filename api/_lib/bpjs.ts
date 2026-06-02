import { config } from './config.js'
import type { DoctorEntry } from './data/schemas.js'
import { createHmac } from 'node:crypto'

const mockDoctors: DoctorEntry[] = []

export function initMockBpjsData(docs: DoctorEntry[]) {
  mockDoctors.length = 0
  mockDoctors.push(...docs)
}

type BpjsResponse = {
  metaData: { code: string; message: string }
  response?: {
    list: Array<{
      kodeDokter: string
      namaDokter: string
      kodePoli: string
      poli: string
    }>
  }
}

function bpjsSignature(): { consId: string; timestamp: string; signature: string } {
  const consId = config.bpjs.consId
  const timestamp = new Date().toISOString().replace(/[:-]/g, '').slice(0, 14)
  const hmac = createHmac('sha256', config.bpjs.secretKey)
  hmac.update(`${consId}&${timestamp}`)
  const signature = Buffer.from(hmac.digest('hex')).toString('base64')
  return { consId, timestamp, signature }
}

async function realGetDpjpDoctors(poli?: string): Promise<BpjsResponse> {
  const { consId, timestamp, signature } = bpjsSignature()
  const params = new URLSearchParams()
  if (poli) params.set('poli', poli)
  params.set('tanggal', new Date().toISOString().split('T')[0])

  const res = await fetch(
    `${config.bpjs.baseUrl}/referensi/dokter/dpjp?${params.toString()}`,
    {
      headers: {
        'X-cons-id': consId,
        'X-timestamp': timestamp,
        'X-signature': signature,
        'X-authorization': `Bearer ${config.bpjs.userKey}`,
      },
    },
  )
  return res.json() as Promise<BpjsResponse>
}

const mockPoliMap: Record<string, string> = {
  INT: 'Penyakit Dalam',
  ANA: 'Anak',
  PAR: 'Paru',
  BED: 'Bedah',
  JAN: 'Jantung',
  MATA: 'Mata',
  SAR: 'Saraf',
  KUL: 'Kulit',
  THT: 'THT',
  UMUM: 'Umum',
  GIGI: 'Gigi',
}

function mockGetDpjpDoctors(poli?: string): BpjsResponse {
  const filtered = poli
    ? mockDoctors.filter(d => {
        const spec = d.specialization.toLowerCase()
        const poliLabel = (mockPoliMap[poli] || '').toLowerCase()
        return spec.includes(poliLabel) || poliLabel.includes(spec)
      })
    : mockDoctors

  return {
    metaData: { code: '200', message: 'OK' },
    response: filtered.length > 0 ? {
      list: filtered.map(d => {
        const foundPoli = Object.entries(mockPoliMap).find(([, label]) =>
          d.specialization.toLowerCase().includes(label.toLowerCase())
        )
        return {
          kodeDokter: d.id,
          namaDokter: d.name,
          kodePoli: foundPoli?.[0] || 'UMUM',
          poli: foundPoli?.[1] || 'Umum',
        }
      }),
    } : undefined,
  }
}

export async function getDpjpDoctors(poli?: string): Promise<BpjsResponse> {
  if (config.useMock) {
    await new Promise(r => setTimeout(r, 150 + Math.random() * 200))
    return mockGetDpjpDoctors(poli)
  }
  return realGetDpjpDoctors(poli)
}

export function bpjsToDoctorEntry(item: BpjsResponse['response']['list'][0]): DoctorEntry | null {
  return {
    id: `bpjs-${item.kodeDokter}`,
    name: item.namaDokter,
    sip: '',
    str: '',
    specialization: item.poli,
    institutionType: 'rumah_sakit',
    createdAt: new Date().toISOString().split('T')[0],
    expiryDate: '',
  }
}
