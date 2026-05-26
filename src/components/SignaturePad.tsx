import { PenSquare } from 'lucide-react'
import { useState } from 'react'

interface Props {
  doctorName: string
  sip: string
  onDoctorNameChange: (v: string) => void
  onSipChange: (v: string) => void
}

export default function SignaturePad({ doctorName, sip, onDoctorNameChange, onSipChange }: Props) {
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null)

  const generateSignature = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 300
    canvas.height = 80
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, 300, 80)

    // Signature line
    ctx.beginPath()
    ctx.moveTo(20, 60)
    ctx.lineTo(280, 60)
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 1
    ctx.stroke()

    // Generate a random cursive-like signature
    const name = doctorName || 'dr. Andi Pratama'
    ctx.font = 'italic 28px "Brush Script MT", "Snell Roundhand", cursive'
    ctx.fillStyle = '#1a56db'
    ctx.textAlign = 'center'

    // Simulate slight variation for different doctors
    const xOffset = Math.random() * 10
    ctx.fillText(name, 150 + xOffset, 48)

    setSignatureDataUrl(canvas.toDataURL('image/png'))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <PenSquare className="w-5 h-5" />
        <h3 className="font-semibold">Tanda Tangan Dokter</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Dokter</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => onDoctorNameChange(e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="dr. Andi Pratama, Sp.PD"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor SIP</label>
          <input
            type="text"
            value={sip}
            onChange={(e) => onSipChange(e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="SIP. 12345/2026"
          />
        </div>
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
          <img src={signatureDataUrl} alt="Signature" className="h-20 object-contain" />
          <p className="text-xs text-gray-500 mt-2">{doctorName || 'dr. Andi Pratama'} — {sip || 'SIP. 12345/2026'}</p>
        </div>
      )}
    </div>
  )
}
