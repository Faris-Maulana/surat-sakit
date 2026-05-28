import { Stamp } from 'lucide-react'
import { useState } from 'react'
import type { InstitutionType } from '@/types'

interface Props {
  institutionName: string
  institutionType: InstitutionType
  doctorName?: string
  sip?: string
  onStampChange?: (url: string) => void
}

function drawCurvedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number, cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const n = text.length
  if (n < 2) return
  const angleStep = (endAngle - startAngle) / (n - 1)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < n; i++) {
    const angle = startAngle + i * angleStep
    const x = cx + radius * Math.cos(angle)
    const y = cy + radius * Math.sin(angle)
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle + Math.PI / 2)
    ctx.fillText(text[i], 0, 0)
    ctx.restore()
  }
}

/** Realistic doctor personal stamp — ~30mm diameter, blue ink, IDI-like logo */
function generateRSStamp(docName: string, sip: string, color: string): string {
  const S = 300 // canvas size
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  ctx.clearRect(0, 0, S, S)

  const cx = S / 2
  const cy = S / 2
  const R = 130           // outer ring radius
  const rInner = 118      // inner ring radius
  const rText = R - 14    // curved text radius

  // Outer double ring
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.strokeStyle = color
  ctx.lineWidth = 3.5
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(cx, cy, rInner, 0, Math.PI * 2)
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Curved text: doctor name on top
  ctx.fillStyle = color
  const shortName = docName.length > 28 ? docName.substring(0, 26) + '..' : docName
  ctx.font = 'bold 11px Arial, sans-serif'
  drawCurvedText(ctx, shortName, cx, cy, rText, Math.PI * 0.65, Math.PI * 0.35)

  // Curved text: specialization bottom
  ctx.font = '8px Arial, sans-serif'
  const bottomText = 'DOKTER PRAKTEK'
  drawCurvedText(ctx, bottomText, cx, cy, rText, Math.PI * 1.65, Math.PI * 1.35)

  // IDI-style logo (snake + staff)
  const logoSize = 26
  const lx = cx
  const ly = cy - 8

  // Staff (vertical line)
  ctx.beginPath()
  ctx.moveTo(lx, ly - logoSize)
  ctx.lineTo(lx, ly + logoSize)
  ctx.strokeStyle = color
  ctx.lineWidth = 2.5
  ctx.stroke()

  // Snake winding around staff
  ctx.beginPath()
  for (let i = 0; i <= 20; i++) {
    const t = i / 20
    const angle = t * Math.PI * 4
    const x = lx + Math.sin(angle) * 5
    const y = ly - logoSize + t * logoSize * 2
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.lineWidth = 2
  ctx.stroke()

  // Snake head
  ctx.beginPath()
  ctx.arc(lx, ly - logoSize + 2, 4, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()

  // Wings at top
  ctx.beginPath()
  ctx.moveTo(lx - 12, ly - logoSize + 4)
  ctx.quadraticCurveTo(lx - 18, ly - logoSize - 6, lx - 6, ly - logoSize - 3)
  ctx.moveTo(lx + 12, ly - logoSize + 4)
  ctx.quadraticCurveTo(lx + 18, ly - logoSize - 6, lx + 6, ly - logoSize - 3)
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Doctor name in center
  const centerName = docName.replace(/^dr\.\s*/, '').replace(/,.*$/, '').trim()
  const firstName = centerName.split(' ')[0] || ''
  ctx.font = '10px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillStyle = color
  ctx.fillText(firstName, cx, cy + 18)

  // SIP number at bottom
  ctx.font = 'bold 8px Arial, sans-serif'
  ctx.fillText(sip || 'SIP. 12345/2026', cx, cy + 34)

  // Small dots as decorative elements
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6
    const d = rInner - 6
    ctx.beginPath()
    ctx.arc(cx + d * Math.cos(a), cy + d * Math.sin(a), 1.5, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  }

  return canvas.toDataURL('image/png')
}

/** Puskesmas stamp — green, government style with Puskesmas name */
function generatePKMStamp(name: string, docName: string, sip: string): string {
  const S = 300
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  ctx.clearRect(0, 0, S, S)

  const cx = S / 2, cy = S / 2, R = 135, rI = 122, color = '#1b5e20'

  // Outer ring (thicker for government stamp)
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(cx, cy, rI, 0, Math.PI * 2)
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Nama Puskesmas curved top
  ctx.fillStyle = color
  const short = name.length > 26 ? name.substring(0, 24) + '..' : name
  ctx.font = 'bold 10px Arial, sans-serif'
  drawCurvedText(ctx, short.toUpperCase(), cx, cy, rI - 10, Math.PI * 0.65, Math.PI * 0.35)

  // "KESEHATAN" curved bottom
  ctx.font = '9px Arial, sans-serif'
  drawCurvedText(ctx, 'KESEHATAN', cx, cy, rI - 10, Math.PI * 1.65, Math.PI * 1.35)

  // Green cross (Puskesmas emblem)
  const cs = 24
  ctx.fillStyle = color
  ctx.fillRect(cx - 3, cy - cs - 6, 6, cs * 2 + 12)
  ctx.fillRect(cx - cs - 4, cy - 4, cs * 2 + 8, 8)

  // White inner cross
  ctx.fillStyle = '#fff'
  ctx.fillRect(cx - 1.5, cy - cs - 3, 3, cs * 2 + 6)
  ctx.fillRect(cx - cs - 1, cy - 1.5, cs * 2 + 2, 3)

  // Doctor name
  ctx.fillStyle = color
  ctx.font = 'bold 9px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(docName || 'dr. Hendra Pratama', cx, cy + 26)

  // SIP
  ctx.font = '7px Arial, sans-serif'
  ctx.fillText(sip || 'SIP. 12345/PMK/2026', cx, cy + 42)

  return canvas.toDataURL('image/png')
}

/** Klinik stamp — teal/blue, modern clinic design */
function generateKlinikStamp(name: string, docName: string, sip: string): string {
  const S = 300
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  ctx.clearRect(0, 0, S, S)

  const cx = S / 2, cy = S / 2, R = 130, rI = 118, color = '#00695c'

  // Double ring
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.strokeStyle = color
  ctx.lineWidth = 3
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(cx, cy, rI, 0, Math.PI * 2)
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Klinik name curved
  ctx.fillStyle = color
  ctx.font = 'bold 10px Arial, sans-serif'
  const short = name.length > 26 ? name.substring(0, 24) + '..' : name
  drawCurvedText(ctx, short.toUpperCase(), cx, cy, rI - 10, Math.PI * 0.65, Math.PI * 0.35)

  // Bottom text
  ctx.font = '9px Arial, sans-serif'
  drawCurvedText(ctx, 'KLINIK PRATAMA', cx, cy, rI - 10, Math.PI * 1.65, Math.PI * 1.35)

  // Medical cross
  const cs = 20
  ctx.fillStyle = color
  ctx.fillRect(cx - 3, cy - cs - 4, 6, cs * 2 + 8)
  ctx.fillRect(cx - cs - 2, cy - 3, cs * 2 + 4, 6)

  // 24 badge
  ctx.beginPath()
  ctx.arc(cx + 28, cy - 16, 14, 0, Math.PI * 2)
  ctx.fillStyle = '#e53935'
  ctx.fill()
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 10px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('24', cx + 28, cy - 16)

  ctx.textBaseline = 'alphabetic'

  // Doctor name
  ctx.fillStyle = color
  ctx.font = 'bold 9px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(docName || 'dr. Dimas Pratama', cx, cy + 24)

  ctx.font = '7px Arial, sans-serif'
  ctx.fillText(sip || 'SIP. 12345/KS/2026', cx, cy + 38)

  return canvas.toDataURL('image/png')
}

export default function StampGenerator({ institutionName, institutionType, doctorName = '', sip: propSip = '', onStampChange }: Props) {
  const [stampDataUrl, setStampDataUrl] = useState<string | null>(null)

  const handleGenerate = () => {
    const dr = doctorName || 'dr. Andi Pratama'
    const sip = propSip || 'SIP. 12345/2026'

    let url = ''
    if (institutionType === 'puskesmas') {
      url = generatePKMStamp(institutionName, dr, sip)
    } else if (institutionType === 'klinik') {
      url = generateKlinikStamp(institutionName, dr, sip)
    } else {
      // RS or default — doctor personal stamp with IDI-style logo
      url = generateRSStamp(dr, sip, '#1a3a6b')
    }

    setStampDataUrl(url)
    onStampChange?.(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <Stamp className="w-5 h-5" />
        <h3 className="font-semibold">Cap Stempel Dokter</h3>
        <span className="text-[10px] text-gray-400 italic">(Stempel dokter ~30mm, tinta biru)</span>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        Stempel akan menggunakan nama dan SIP dokter yang diisi di atas.
        {institutionType === 'puskesmas'
          ? ' Menggunakan format stempel Puskesmas (hijau).'
          : institutionType === 'klinik'
            ? ' Menggunakan format stempel Klinik (teal).'
            : ' Menggunakan format stempel dokter RS (biru) dengan logo IDI.'}
      </p>

      <button
        onClick={handleGenerate}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        <Stamp className="w-4 h-4" />
        Generate Stempel Dokter
      </button>

      {stampDataUrl && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center">
          <img src={stampDataUrl} alt="Stempel dokter" className="w-28 h-28 object-contain" />
          <p className="text-xs text-gray-500 mt-2">{doctorName || 'dr. Andi Pratama'}</p>
          <p className="text-[10px] text-gray-400">{propSip || 'SIP. 12345/2026'}</p>
          <button
            onClick={handleGenerate}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800"
          >
            ↻ Generate ulang
          </button>
        </div>
      )}
    </div>
  )
}
