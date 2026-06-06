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
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-halo-600 mb-1">
        <CalendarDays className="w-5 h-5" />
        <h3 className="font-semibold">Rekomendasi Istirahat</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Dari Tanggal</label>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => onStartChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Sampai Tanggal</label>
          <input
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={(e) => onEndChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200"
          />
        </div>
      </div>

      {days !== null && days > 0 && (
        <div className="p-4 bg-halo-50 border border-halo-100 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-halo-100">
            <CalendarDays className="w-5 h-5 text-halo-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-halo-800">{days} hari</p>
            <p className="text-xs text-halo-600">rekomendasi waktu istirahat</p>
          </div>
        </div>
      )}
    </div>
  )
}
