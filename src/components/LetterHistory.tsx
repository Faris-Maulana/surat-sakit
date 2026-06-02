import { useState, useEffect } from 'react'
import { Clock, ChevronRight, Trash2 } from 'lucide-react'
import { getLocalHistory } from '@/services/letterService'
import type { LetterHistoryItem } from '@/services/letterService'

export default function LetterHistory() {
  const [history, setHistory] = useState<LetterHistoryItem[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      setHistory(getLocalHistory())
    }
  }, [open])

  const clear = (e: React.MouseEvent, key: string) => {
    e.stopPropagation()
    localStorage.removeItem(`saved-letter-${key}`)
    setHistory(prev => prev.filter(h => h.letterNumber !== key))
  }

  const iconMap: Record<string, string> = {
    sakit: '🤒',
    sehat: '💪',
    rujukan: '📋',
  }

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors w-full"
        aria-expanded={open}
        aria-controls="letter-history"
      >
        <Clock className="w-4 h-4" />
        <span>Riwayat Surat ({history.length || getLocalHistory().length})</span>
        <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>

      {open && (
        <div id="letter-history" className="mt-3 space-y-2">
          {history.length === 0 ? (
            <p className="text-xs text-gray-400 italic px-2">Belum ada surat tersimpan.</p>
          ) : (
            history.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl text-sm"
              >
                <span className="text-lg">{iconMap[item.letterType] || '📄'}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{item.patientName}</p>
                  <p className="text-xs text-gray-400 truncate">{item.institutionName}</p>
                  <p className="text-xs text-gray-400">
                    {item.letterNumber} — {new Date(item.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <button
                  onClick={(e) => clear(e, item.letterNumber)}
                  className="p-1.5 text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
                  aria-label={`Hapus surat ${item.letterNumber}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
