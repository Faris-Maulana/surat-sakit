import { CalendarDays } from 'lucide-react'

interface Props {
  startDate: string
  endDate: string
  onStartChange: (v: string) => void
  onEndChange: (v: string) => void
}

export default function DateRangePicker({ startDate, endDate, onStartChange, onEndChange }: Props) {
  const today = new Date().toISOString().split('T')[0]

  const calcDays = () => {
    if (!startDate || !endDate) return null
    const s = new Date(startDate)
    const e = new Date(endDate)
    const diff = Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return diff > 0 ? diff : 0
  }

  const days = calcDays()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <CalendarDays className="w-5 h-5" />
        <h3 className="font-semibold">Rekomendasi Istirahat</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => onStartChange(e.target.value)}
            aria-label="Tanggal mulai istirahat"
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={(e) => onEndChange(e.target.value)}
            aria-label="Tanggal akhir istirahat"
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {days !== null && days > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>{days} hari</strong> rekomendasi waktu istirahat
          </p>
        </div>
      )}
    </div>
  )
}
