import { PenSquare } from 'lucide-react'
import { useState, useCallback } from 'react'

interface Props {
  doctorName: string
  sip: string
  onSignatureChange?: (url: string) => void
}

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

function noise2(x: number, seed: number) {
  const n = Math.sin(x * 12.9898 + seed * 78.233) * 43758.5453
  return n - Math.floor(n)
}

function drawPressureStroke(
  ctx: CanvasRenderingContext2D,
  points: [number, number, number][],
  color: string,
) {
  if (points.length < 2) return
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1, w1] = points[i]
    const [x2, y2, w2] = points[i + 1]
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = w1 * 0.5 + w2 * 0.5
    ctx.stroke()
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
  ctx.strokeStyle = '#ccc'
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
  const S = seededRandom(name || 'default')
  const r = () => S()

  ctx.clearRect(0, 0, w, h)

  ctx.beginPath()
  ctx.moveTo(20, h - 18)
  ctx.lineTo(w - 20, h - 18)
  ctx.strokeStyle = '#ddd'
  ctx.lineWidth = 0.5
  ctx.stroke()

  const cx = w / 2
  const baseY = h - 26
  const color = '#1a3a6b'
  const seedNum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)

  const styleIdx = Math.floor(r() * 7)

  if (styleIdx === 0) {
    const ox = cx - 55 + r() * 15
    const pts: [number, number, number][] = []
    for (let i = 0; i < 70; i++) {
      const t = i / 70
      const x = ox + t * 130 + Math.sin(t * 14 + r() * 2) * 6
      const wobble = Math.sin(t * 25 + seedNum) * 1.2
      const pressure = 1.5 + Math.sin(t * 3) * 0.8 + 0.5
      const y = baseY - 8 * Math.sin(t * 5.5 + 0.3) - t * (1 - t) * 18 + wobble
      pts.push([x, y, pressure])
    }
    drawPressureStroke(ctx, pts, color)
    ctx.beginPath()
    ctx.moveTo(ox + 130, baseY - 5)
    ctx.quadraticCurveTo(ox + 145, baseY - 38, ox + 155, baseY - 20)
    ctx.quadraticCurveTo(ox + 165, baseY - 5, ox + 150, baseY - 15)
    ctx.lineWidth = 1.5
    ctx.strokeStyle = color
    ctx.stroke()
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(ox + 10 + i * 45 + r() * 8, baseY - 6 + r() * 4, 1.2 + r() * 1, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
    }
  } else if (styleIdx === 1) {
    const ox = cx - 45 + r() * 15
    const pts: [number, number, number][] = []
    for (let i = 0; i < 55; i++) {
      const t = i / 55
      const seg = Math.floor(t * 4)
      const segT = (t * 4) - seg
      let x = ox + t * 110 + noise2(t * 8, seedNum) * 4
      let y = baseY
      if (seg === 0) y = baseY - 12 * segT + noise2(t * 10, seedNum + 1) * 2
      else if (seg === 1) y = baseY - 12 + 14 * segT + noise2(t * 8, seedNum + 2) * 1.5
      else if (seg === 2) y = baseY + 2 - 16 * segT + noise2(t * 12, seedNum + 3) * 2
      else y = baseY - 14 + 10 * segT + noise2(t * 9, seedNum + 4) * 1.5
      const pressure = 2.5 + Math.sin(t * 5 + seg) * 0.6 + 0.3
      pts.push([x, y, pressure])
    }
    drawPressureStroke(ctx, pts, color)
    ctx.beginPath()
    const endX = ox + 110
    ctx.moveTo(endX - 5, baseY - 5)
    ctx.lineTo(endX + 15, baseY - 42)
    ctx.lineTo(endX + 10, baseY - 35)
    ctx.lineWidth = 2.2
    ctx.strokeStyle = color
    ctx.stroke()
  } else if (styleIdx === 2) {
    const ox = cx - 60 + r() * 15
    const pts: [number, number, number][] = []
    for (let i = 0; i < 80; i++) {
      const t = i / 80
      const x = ox + t * 125 + Math.sin(t * 12 + r() * 1) * 5
      const wobble = Math.sin(t * 20 + seedNum * 0.5) * 1.5
      const dip = t < 0.5
        ? Math.pow(t * 2, 2) * 10
        : 10 - Math.pow((t - 0.5) * 2, 2) * 10
      const y = baseY - 7 * Math.sin(t * 4 + 0.8) + wobble - dip
      const pressure = 1.8 + Math.sin(t * 3.5) * 0.5 + 0.3
      pts.push([x, y, pressure])
    }
    drawPressureStroke(ctx, pts, color)
    ctx.beginPath()
    ctx.moveTo(ox + 125, baseY - 6)
    for (let i = 0; i < 30; i++) {
      const t = i / 30
      const a = t * Math.PI * 3
      const sx = ox + 125 + Math.cos(a) * (14 + t * 5)
      const sy = baseY - 28 + Math.sin(a) * (8 + t * 3)
      i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy)
    }
    ctx.lineWidth = 1.3
    ctx.strokeStyle = color
    ctx.stroke()
    for (let i = 0; i < 6; i++) {
      ctx.beginPath()
      ctx.arc(cx - 40 + r() * 80, baseY - 15 + r() * 20 - r() * 20, 0.5 + r() * 0.8, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(26, 58, 107, ${0.1 + r() * 0.25})`
      ctx.fill()
    }
  } else if (styleIdx === 3) {
    const ox = cx - 35 + r() * 12
    for (let s = 0; s < 2; s++) {
      const offsetX = s * 38 + r() * 6
      const pts: [number, number, number][] = []
      for (let i = 0; i < 25; i++) {
        const t = i / 25
        const x = ox + offsetX + t * 28 + Math.sin(t * 9) * 3
        const arch = (1 - t) * (1 - t) * 14
        const wobble = noise2(t * 15 + s * 7, seedNum) * 2
        const y = baseY - arch + wobble - t * 2
        const pressure = 2 + Math.sin(t * 4 + s) * 0.4 + 0.3
        pts.push([x, y, pressure])
      }
      drawPressureStroke(ctx, pts, color)
    }
    ctx.beginPath()
    ctx.moveTo(ox + 72, baseY - 4)
    ctx.quadraticCurveTo(ox + 88, baseY - 32, ox + 110, baseY - 18)
    ctx.quadraticCurveTo(ox + 128, baseY - 4, ox + 145, baseY - 28)
    ctx.quadraticCurveTo(ox + 158, baseY - 48, ox + 148, baseY - 32)
    ctx.lineWidth = 1.8
    ctx.strokeStyle = color
    ctx.stroke()
  } else if (styleIdx === 4) {
    const ox = cx - 50 + r() * 12
    const pts: [number, number, number][] = []
    for (let i = 0; i < 65; i++) {
      const t = i / 65
      const loops = Math.sin(t * 10) * 6
      const x = ox + t * 120 + loops
      const loopUp = Math.abs(Math.sin(t * 8)) * 10
      const wobble = noise2(t * 14, seedNum) * 2.5
      const y = baseY - 8 * Math.sin(t * 3.5 + 0.5) - loopUp + wobble
      const pressure = 1.5 + Math.sin(t * 2.5) * 0.6 + 0.4
      pts.push([x, y, pressure])
    }
    drawPressureStroke(ctx, pts, color)
    ctx.beginPath()
    ctx.moveTo(ox + 120, baseY - 4)
    ctx.quadraticCurveTo(ox + 140, baseY - 44, ox + 130, baseY - 28)
    ctx.lineWidth = 1.5
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const dotX = ox + 20 + i * 22 + r() * 4
      const dotY = baseY + 3 + r() * 3
      ctx.arc(dotX, dotY, 0.8 + r() * 0.6, 0, Math.PI * 2)
    }
    ctx.fillStyle = color
    ctx.fill()
  } else if (styleIdx === 5) {
    const ox = cx - 40 + r() * 12
    const pts: [number, number, number][] = []
    for (let i = 0; i < 45; i++) {
      const t = i / 45
      const x = ox + t * 95 + Math.sin(t * 11 + r() * 1.5) * 4
      const burst = Math.sin(t * 20) * (1 - t) * 3
      const wobble = noise2(t * 18, seedNum + 5) * 2
      const y = baseY - 9 * Math.sin(t * 5 + 1) + burst + wobble - t * 4
      const pressure = 2.8 + Math.sin(t * 4 + 1) * 0.5 - t * 0.3
      pts.push([x, y, Math.max(pressure, 0.5)])
    }
    drawPressureStroke(ctx, pts, color)
    ctx.beginPath()
    const midX = ox + 48
    ctx.moveTo(midX - 12, baseY - 16)
    ctx.lineTo(midX + 12, baseY - 30)
    ctx.lineWidth = 3.5
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ox + 95, baseY - 10)
    ctx.lineTo(ox + 110, baseY + 6)
    ctx.lineWidth = 2
    ctx.stroke()
  } else {
    const ox = cx - 55 + r() * 12
    const pts: [number, number, number][] = []
    for (let i = 0; i < 60; i++) {
      const t = i / 60
      let x = ox + t * 130
      let y = baseY
      const phase = Math.sin(t * 6 + 0.3)
      const sweep = (1 - Math.abs(t - 0.5) * 2) * 12
      if (t < 0.3) {
        x += Math.sin(t * 20) * 4
        y = baseY - 10 * (t / 0.3) + sweep * 0.5 + noise2(t * 12, seedNum) * 1.5
      } else if (t < 0.7) {
        x += Math.sin(t * 8) * 5
        y = baseY - 10 + 8 * ((t - 0.3) / 0.4) + sweep * 0.3 + noise2(t * 10, seedNum + 2) * 2
      } else {
        x += Math.sin(t * 15) * 3
        y = baseY - 2 - 7 * ((t - 0.7) / 0.3) + phase * 3 + noise2(t * 14, seedNum + 4) * 1
      }
      const pressure = 1.8 + Math.sin(t * 3 + 0.5) * 0.5 + 0.3
      pts.push([x, y, pressure])
    }
    drawPressureStroke(ctx, pts, color)
    ctx.beginPath()
    const hlx = ox + 135
    const hly = baseY - 18
    ctx.arc(hlx, hly, 16 + r() * 4, 0, Math.PI * 1.6 + r() * 0.4)
    ctx.lineWidth = 1.5
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(hlx - 6, hly - 4, 2, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  }

  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.arc(cx - 25 + r() * 70, baseY - 8 + r() * 16 - r() * 16, 0.3 + r() * 0.4, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(26, 58, 107, ${0.08 + r() * 0.15})`
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
