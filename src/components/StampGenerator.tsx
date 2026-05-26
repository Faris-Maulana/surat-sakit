import { Stamp } from 'lucide-react'
import { useState } from 'react'

interface Props {
  institutionName: string
}

export default function StampGenerator({ institutionName }: Props) {
  const [stampDataUrl, setStampDataUrl] = useState<string | null>(null)

  const generateStamp = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, 200, 200)

    // Outer circle
    ctx.beginPath()
    ctx.arc(100, 100, 85, 0, Math.PI * 2)
    ctx.strokeStyle = '#c62828'
    ctx.lineWidth = 4
    ctx.stroke()

    // Inner circle
    ctx.beginPath()
    ctx.arc(100, 100, 78, 0, Math.PI * 2)
    ctx.strokeStyle = '#c62828'
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Top text (curved)
    ctx.font = 'bold 11px Arial'
    ctx.fillStyle = '#c62828'
    ctx.textAlign = 'center'

    // Center star
    ctx.font = '18px Arial'
    ctx.fillText('★', 100, 97)

    // Bottom text
    ctx.font = 'bold 11px Arial'
    ctx.fillStyle = '#c62828'
    const shortName = institutionName.length > 20
      ? institutionName.substring(0, 18) + '..'
      : institutionName
    ctx.fillText(shortName, 100, 170)

    // Inner text
    ctx.font = 'bold 10px Arial'
    ctx.fillText('DOKTER', 100, 135)
    ctx.font = '8px Arial'
    ctx.fillText('Praktek Umum', 100, 148)

    // Stamp center
    ctx.font = 'bold 9px Arial'
    ctx.fillStyle = '#c62828'
    ctx.fillText('SIP: 12345/2026', 100, 118)

    setStampDataUrl(canvas.toDataURL('image/png'))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <Stamp className="w-5 h-5" />
        <h3 className="font-semibold">Cap / Stempel</h3>
      </div>

      <button
        onClick={generateStamp}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        <Stamp className="w-4 h-4" />
        Generate Cap Resmi
      </button>

      {stampDataUrl && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex justify-center">
          <img src={stampDataUrl} alt="Official Stamp" className="w-32 h-32 object-contain" />
        </div>
      )}
    </div>
  )
}
