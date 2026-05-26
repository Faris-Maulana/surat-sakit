import { Stamp } from 'lucide-react'
import { useState } from 'react'

interface Props {
  institutionName: string
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
  const angleStep = (endAngle - startAngle) / (text.length - 1 || 1)
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < text.length; i++) {
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

function generateStampCanvas(name: string, sip: string): string {
  const canvas = document.createElement('canvas')
  canvas.width = 250
  canvas.height = 250
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  ctx.clearRect(0, 0, 250, 250)

  const cx = 125
  const cy = 125
  const outerR = 100
  const innerR = 90

  // Outer ring
  ctx.beginPath()
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2)
  ctx.strokeStyle = '#b71c1c'
  ctx.lineWidth = 4.5
  ctx.stroke()

  // Inner ring
  ctx.beginPath()
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2)
  ctx.strokeStyle = '#b71c1c'
  ctx.lineWidth = 2
  ctx.stroke()

  // Top curved text: institution name
  ctx.fillStyle = '#b71c1c'
  ctx.font = 'bold 10px Arial'
  const shortName = name.length > 22 ? name.substring(0, 20) + '..' : name
  drawCurvedText(ctx, shortName, cx, cy, outerR - 10, Math.PI * 0.6, Math.PI * 0.4)

  // Bottom curved text: KOTA/DAERAH
  ctx.font = '8px Arial'
  const bottomText = 'KESEHATAN'
  drawCurvedText(ctx, bottomText, cx, cy, outerR - 10, Math.PI * 1.6, Math.PI * 1.4)

  // === Center design ===
  // Red cross / health symbol
  ctx.fillStyle = '#b71c1c'
  // Vertical bar
  ctx.fillRect(cx - 4, cy - 22, 8, 44)
  // Horizontal bar
  ctx.fillRect(cx - 18, cy - 8, 36, 16)

  // Small cross inside
  ctx.fillStyle = '#fff'
  ctx.fillRect(cx - 2, cy - 12, 4, 24)
  ctx.fillRect(cx - 10, cy - 4, 20, 8)

  // Text below cross
  ctx.fillStyle = '#b71c1c'
  ctx.font = 'bold 10px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('DOKTER', cx, cy + 32)

  ctx.font = '8px Arial, sans-serif'
  ctx.fillText('Praktek Umum', cx, cy + 46)

  // SIP number at bottom inner
  ctx.font = 'bold 8px Arial'
  ctx.fillText(sip || 'SIP. 12345/2026', cx, cy + 62)

  // National emblem outline (small Garuda-like shape on top)
  const starSize = 6
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    const x = cx + starSize * Math.cos(angle)
    const y = cy - innerR + 14 + starSize * Math.sin(angle)
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.strokeStyle = '#b71c1c'
  ctx.lineWidth = 1.2
  ctx.stroke()

  // Ink bleeding effect (subtle random dots)
  for (let i = 0; i < 8; i++) {
    const angle = Math.random() * Math.PI * 2
    const dist = 85 + Math.random() * 18
    ctx.beginPath()
    ctx.arc(cx + dist * Math.cos(angle), cy + dist * Math.sin(angle), 0.4 + Math.random() * 0.6, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(183, 28, 28, ${0.08 + Math.random() * 0.1})`
    ctx.fill()
  }

  return canvas.toDataURL('image/png')
}

export default function StampGenerator({ institutionName, onStampChange }: Props) {
  const [stampDataUrl, setStampDataUrl] = useState<string | null>(null)
  const [sip, setSip] = useState('')

  const handleGenerate = () => {
    const url = generateStampCanvas(institutionName, sip)
    setStampDataUrl(url)
    onStampChange?.(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <Stamp className="w-5 h-5" />
        <h3 className="font-semibold">Cap / Stempel</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor SIP (untuk cap)</label>
        <input
          type="text"
          value={sip}
          onChange={(e) => setSip(e.target.value)}
          className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="SIP. 12345/2026"
        />
      </div>

      <button
        onClick={handleGenerate}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        <Stamp className="w-4 h-4" />
        Generate Cap Resmi
      </button>

      {stampDataUrl && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center">
          <img src={stampDataUrl} alt="Cap resmi" className="w-36 h-36 object-contain" />
          <p className="text-xs text-gray-500 mt-2">{institutionName}</p>
        </div>
      )}
    </div>
  )
}
