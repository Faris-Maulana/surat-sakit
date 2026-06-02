import { PenSquare } from 'lucide-react'
import { useState, useCallback } from 'react'

interface Props {
  doctorName: string
  sip: string
  onSignatureChange?: (url: string) => void
}

// Seeded pseudo-random for consistency based on doctor name
function seededRandom(seed: string): () => number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return () => {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff
    return hash / 0x7fffffff
  }
}

type SigMode = 'realistic' | 'text'

function drawTextSignature(ctx: CanvasRenderingContext2D, name: string) {
  const w = ctx.canvas.width
  const h = ctx.canvas.height
  ctx.clearRect(0, 0, w, h)

  ctx.beginPath()
  ctx.moveTo(20, h - 18)
  ctx.lineTo(w - 20, h - 18)
  ctx.strokeStyle = '#bbb'
  ctx.lineWidth = 0.5
  ctx.stroke()

  const displayName = name || 'dr. Andi Pratama'
  const fontSize = displayName.length > 20 ? 26 : 30

  ctx.font = `italic ${fontSize}px "Brush Script MT", "Snell Roundhand", "Apple Chancery", cursive`
  ctx.fillStyle = '#1a3a6b'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(displayName, w / 2 + (Math.random() - 0.5) * 6, h / 2 + 4)

  ctx.beginPath()
  const tw = ctx.measureText(displayName).width
  const sx = w / 2 - tw / 2 - 10
  const ex = w / 2 + tw / 2 + 10
  ctx.moveTo(sx, h / 2 + 16)
  ctx.quadraticCurveTo((sx + ex) / 2, h / 2 + 24, ex, h / 2 + 16)
  ctx.strokeStyle = '#1a3a6b'
  ctx.lineWidth = 0.8
  ctx.stroke()
}

function drawSignature(ctx: CanvasRenderingContext2D, name: string) {
  const w = ctx.canvas.width
  const h = ctx.canvas.height
  const rand = seededRandom(name || 'default')
  const r = () => rand()

  const styleIdx = Math.floor(r() * 5)

  ctx.clearRect(0, 0, w, h)

  ctx.beginPath()
  ctx.moveTo(20, h - 18)
  ctx.lineTo(w - 20, h - 18)
  ctx.strokeStyle = '#bbb'
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.strokeStyle = '#1a3a6b'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  const cx = w / 2
  const baseY = h - 26
  const amp = 7 + r() * 4

  const drawStroke = (points: [number, number][], width: number) => {
    if (points.length < 2) return
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    for (let i = 1; i < points.length; i++) {
      const xc = (points[i][0] + points[i - 1][0]) / 2
      const yc = (points[i][1] + points[i - 1][1]) / 2
      ctx.quadraticCurveTo(points[i - 1][0], points[i - 1][1], xc, yc)
    }
    ctx.lineTo(points[points.length - 1][0], points[points.length - 1][1])
    ctx.lineWidth = width
    ctx.stroke()
  }

  if (styleIdx === 0) {
    const ox = cx - 50 + r() * 20
    const points: [number, number][] = []
    for (let i = 0; i < 40; i++) {
      const t = i / 40
      const x = ox + t * 120 + Math.sin(t * 12) * 8
      const y = baseY - amp * Math.sin(t * 5 + 0.3) + Math.sin(t * 8) * 3 - t * t * 15
      points.push([x, y])
    }
    drawStroke(points, 2 + r() * 0.5)
    ctx.beginPath()
    ctx.moveTo(ox + 120, baseY - amp * Math.sin(5 + 0.3) - 15)
    ctx.quadraticCurveTo(ox + 140, baseY - 40, ox + 130, baseY - 25)
    ctx.quadraticCurveTo(ox + 120, baseY - 10, ox + 135, baseY - 20)
    ctx.quadraticCurveTo(ox + 150, baseY - 35, ox + 140, baseY - 15)
    ctx.lineWidth = 1.8
    ctx.stroke()
    ctx.beginPath()
    for (let i = 0; i < 20; i++) {
      const t = i / 20
      const x = ox + t * 140
      const y = (baseY - 18) + Math.sin(t * 15) * 2
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.lineWidth = 0.8
    ctx.stroke()
  } else if (styleIdx === 1) {
    const ox = cx - 40 + r() * 20
    const points: [number, number][] = []
    for (let i = 0; i < 35; i++) {
      const t = i / 35
      const x = ox + t * 100 + (i % 7 === 3 ? 5 : 0)
      const y = baseY - amp * Math.sin(t * 6 + 1.2) - t * (1 - t) * 20
      points.push([x, y])
    }
    drawStroke(points, 2.5 + r() * 0.5)
    ctx.beginPath()
    ctx.moveTo(ox + 100, baseY - 10)
    ctx.lineTo(ox + 115, baseY - 45)
    ctx.lineTo(ox + 108, baseY - 38)
    ctx.lineTo(ox + 120, baseY - 42)
    ctx.lineWidth = 2
    ctx.stroke()
  } else if (styleIdx === 2) {
    const ox = cx - 60 + r() * 20
    const points: [number, number][] = []
    for (let i = 0; i < 50; i++) {
      const t = i / 50
      const x = ox + t * 130 + Math.sin(t * 10) * 5
      const slope = (1 - t) * 8
      const y = baseY - amp * Math.sin(t * 4.5 + 0.8) + Math.sin(t * 12) * 2 - slope
      points.push([x, y])
    }
    drawStroke(points, 1.8 + r() * 0.3)
    ctx.beginPath()
    ctx.moveTo(ox + 130, baseY - amp * Math.sin(4.5 + 0.8) - 8)
    for (let i = 0; i < 20; i++) {
      const t = i / 20
      const a = t * Math.PI * 2.5
      ctx.lineTo(ox + 130 + Math.cos(a) * 15, baseY - 30 + Math.sin(a) * 10)
    }
    ctx.lineWidth = 1.5
    ctx.stroke()
  } else if (styleIdx === 3) {
    const ox = cx - 30 + r() * 20
    for (let s = 0; s < 2; s++) {
      const offsetX = s * 35 + r() * 8
      const points: [number, number][] = []
      for (let i = 0; i < 15; i++) {
        const t = i / 15
        const x = ox + offsetX + t * 25 + Math.sin(t * 8) * 3
        const y = baseY - amp * (1 - t) * Math.sin(t * 3 + s) - t * 3
        points.push([x, y])
      }
      drawStroke(points, 2.2 + r() * 0.3)
    }
    ctx.beginPath()
    ctx.moveTo(ox + 70, baseY - 5)
    ctx.quadraticCurveTo(ox + 85, baseY - 35, ox + 105, baseY - 20)
    ctx.quadraticCurveTo(ox + 120, baseY - 5, ox + 140, baseY - 30)
    ctx.quadraticCurveTo(ox + 155, baseY - 50, ox + 145, baseY - 35)
    ctx.lineWidth = 2
    ctx.stroke()
  } else {
    const ox = cx - 45 + r() * 20
    const pts: [number, number][] = []
    for (let i = 0; i < 30; i++) {
      const t = i / 30
      const x = ox + t * 110 + Math.sin(t * 9) * 6
      const y = baseY - amp * (Math.sin(t * 4 + 0.5) + Math.sin(t * 3) * 0.5) + Math.sin(t * 10) * 2
      pts.push([x, y])
    }
    drawStroke(pts, 2 + r() * 0.4)
    ctx.beginPath()
    ctx.arc(ox + 115, baseY - 20, 18 + r() * 5, 0, Math.PI * 1.5 + r() * 0.5)
    ctx.lineWidth = 1.5
    ctx.stroke()
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(ox + 20 + i * 40 + r() * 5, baseY - amp - 8 + r() * 4, 1.5 + r() * 1, 0, Math.PI * 2)
      ctx.fillStyle = '#1a3a6b'
      ctx.fill()
    }
  }

  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.arc(cx - 30 + r() * 80, baseY - 10 + r() * 20 - r() * 20, 0.3 + r() * 0.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(26, 58, 107, ${0.1 + r() * 0.2})`
    ctx.fill()
  }
}

function textFallbackSignature(name: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="100" viewBox="0 0 300 100">
    <text x="150" y="60" font-family="serif" font-size="20" fill="#1a3a6b" text-anchor="middle" font-style="italic">${name}</text>
    <line x1="40" y1="75" x2="260" y2="75" stroke="#bbb" stroke-width="0.5"/>
    <path d="M 50 78 Q 150 88 250 78" fill="none" stroke="#1a3a6b" stroke-width="0.8"/>
  </svg>`
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

export default function SignaturePad({ doctorName, sip, onSignatureChange }: Props) {
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null)
  const [mode, setMode] = useState<SigMode>('realistic')

  const generateSignature = useCallback(() => {
    const dr = doctorName || 'dr. Andi Pratama, Sp.PD'

    try {
      const canvas = document.createElement('canvas')
      canvas.width = 300
      canvas.height = 100
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        const url = textFallbackSignature(dr)
        setSignatureDataUrl(url)
        onSignatureChange?.(url)
        return
      }

      if (mode === 'text') {
        drawTextSignature(ctx, dr)
      } else {
        drawSignature(ctx, dr)
      }
      const url = canvas.toDataURL('image/png')
      setSignatureDataUrl(url)
      onSignatureChange?.(url)
    } catch {
      const url = textFallbackSignature(dr)
      setSignatureDataUrl(url)
      onSignatureChange?.(url)
    }
  }, [doctorName, onSignatureChange, mode])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <PenSquare className="w-5 h-5" />
        <h3 className="font-semibold">Tanda Tangan Dokter</h3>
      </div>

      <div className="p-3 bg-gray-50 rounded-xl text-sm">
        <p className="text-gray-700">
          <strong>Dokter:</strong> {doctorName || '—'}
        </p>
        <p className="text-gray-500 text-xs mt-0.5">
          <strong>SIP:</strong> {sip || '—'}
        </p>
      </div>

      <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => { setMode('realistic'); setSignatureDataUrl(null) }}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            mode === 'realistic' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Goresan Tangan
        </button>
        <button
          onClick={() => { setMode('text'); setSignatureDataUrl(null) }}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            mode === 'text' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Teks Nama
        </button>
      </div>

      <button
        onClick={generateSignature}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        <PenSquare className="w-4 h-4" />
        Generate Tanda Tangan
      </button>

      {signatureDataUrl && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="flex justify-center">
            <img src={signatureDataUrl} alt="Tanda tangan dokter" className="h-24 object-contain" />
          </div>
          <div className="text-center mt-2">
            <p className="text-xs text-gray-600 font-medium">{doctorName || 'dr. Andi Pratama'}</p>
            <p className="text-xs text-gray-400">SIP. {sip || '12345/2026'}</p>
          </div>
          <button
            onClick={generateSignature}
            className="mt-2 w-full text-xs text-blue-600 hover:text-blue-800"
          >
            ↻ Generate ulang{mode === 'realistic' ? ' (gaya berbeda)' : ''}
          </button>
        </div>
      )}
    </div>
  )
}
