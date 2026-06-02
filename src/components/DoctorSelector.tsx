import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Stethoscope, Search, Check, UserRound, X, Clock, AlertTriangle, Loader2 } from 'lucide-react'
import { doctorService } from '@/services/doctorService'
import { parseSip } from '@/utils/sip'
import type { InstitutionType, DoctorEntry } from '@/types'

interface Props {
  institutionType: InstitutionType | ''
  doctorName: string
  sip: string
  onDoctorNameChange: (v: string) => void
  onSipChange: (v: string) => void
}

export default function DoctorSelector({
  institutionType,
  doctorName,
  sip,
  onDoctorNameChange,
  onSipChange,
}: Props) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [doctors, setDoctors] = useState<DoctorEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!institutionType) { setDoctors([]); return }
    setLoading(true)
    setError('')
    doctorService.getDoctors(institutionType).then(data => {
      setDoctors(data)
      setLoading(false)
    }).catch(err => {
      setError(err instanceof Error ? err.message : 'Gagal memuat dokter')
      setLoading(false)
    })
  }, [institutionType])

  const sorted = useMemo(() => {
    return [...doctors].sort((a, b) => {
      const aActive = new Date(a.expiryDate) > new Date()
      const bActive = new Date(b.expiryDate) > new Date()
      if (aActive && !bActive) return -1
      if (!aActive && bActive) return 1
      return a.name.localeCompare(b.name)
    })
  }, [doctors])

  const filtered = useMemo(() => {
    if (!search.trim()) return sorted
    const q = search.toLowerCase()
    return sorted.filter(
      d => d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q) || d.sip.toLowerCase().includes(q)
    )
  }, [sorted, search])

  const handleSelect = useCallback((doc: DoctorEntry) => {
    onDoctorNameChange(doc.name)
    onSipChange(doc.sip)
    setSearch(doc.name)
    setSelected(true)
    setActiveIndex(-1)
  }, [onDoctorNameChange, onSipChange])

  const handleClear = () => {
    onDoctorNameChange('')
    onSipChange('')
    setSearch('')
    setSelected(false)
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  const showDropdown = !selected && filtered.length > 0

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && activeIndex < filtered.length) {
          handleSelect(filtered[activeIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setSearch('')
        setActiveIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const expiryBadge = (doc: DoctorEntry) => {
    const info = parseSip(doc.sip)
    if (!info) return null
    if (!info.isActive) {
      return (
        <span className="inline-flex items-center gap-0.5 text-[10px] text-red-500 font-medium">
          <AlertTriangle className="w-3 h-3" /> Expired
        </span>
      )
    }
    if (info.monthsUntilExpiry <= 6) {
      return (
        <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-500 font-medium">
          <Clock className="w-3 h-3" /> {info.monthsUntilExpiry} bln
        </span>
      )
    }
    return null
  }

  const selectedInfo = selected && doctorName ? parseSip(sip) : null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 mb-1">
          <UserRound className="w-5 h-5" aria-hidden="true" />
          <h3 className="font-semibold">Pilih Dokter Pemeriksa</h3>
        </div>
      </div>

      {!institutionType ? (
        <p className="text-sm text-gray-400 italic" role="status">Pilih institusi terlebih dahulu untuk melihat daftar dokter.</p>
      ) : loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-400 py-4" role="status">
          <Loader2 className="w-4 h-4 animate-spin" /> Memuat daftar dokter...
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600" role="alert">
          {error}
        </div>
      ) : (
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSelected(false); setActiveIndex(-1) }}
              onKeyDown={handleKeyDown}
              placeholder={`Cari dokter ${institutionType === 'rumah_sakit' ? 'spesialis' : 'umum'}...`}
              role="combobox"
              aria-expanded={showDropdown}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              aria-controls="doctor-listbox"
              aria-activedescendant={activeIndex >= 0 ? `doctor-option-${activeIndex}` : undefined}
              aria-label="Cari dokter"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {search && (
              <button
                onClick={() => { setSearch(''); setSelected(false); setActiveIndex(-1); inputRef.current?.focus() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Hapus pencarian"
                tabIndex={-1}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {showDropdown && (
            <div
              id="doctor-listbox"
              ref={listRef}
              role="listbox"
              aria-label="Daftar dokter"
              aria-multiselectable={false}
              className="max-sm:static sm:absolute sm:z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-y-auto"
            >
              {filtered.length !== sorted.length && (
                <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100 bg-gray-50" role="status" aria-live="polite">
                  Menampilkan {filtered.length} dari {sorted.length} dokter
                </div>
              )}
              {filtered.map((doc, idx) => (
                <button
                  key={doc.id}
                  id={`doctor-option-${idx}`}
                  role="option"
                  aria-selected={activeIndex === idx}
                  onClick={() => handleSelect(doc)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full flex items-start gap-3 px-4 py-3 border-b border-gray-50 text-left transition-colors ${
                    activeIndex === idx ? 'bg-blue-50' : 'hover:bg-blue-50'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                      {expiryBadge(doc)}
                    </div>
                    <p className="text-xs text-gray-400">{doc.specialization}</p>
                    <p className="text-[10px] text-gray-300 mt-0.5 font-mono">{doc.sip}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                    <span className="text-[10px] text-gray-400">{doc.str}</span>
                    {activeIndex === idx && <Check className="w-4 h-4 text-blue-500" aria-hidden="true" />}
                  </div>
                </button>
              ))}
            </div>
          )}

          {!selected && search.trim() && filtered.length === 0 && (
            <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center" role="status">
              <p className="text-sm text-gray-400">Tidak ditemukan dokter dengan nama "{search}"</p>
            </div>
          )}
        </div>
      )}

      {selected && doctorName && selectedInfo && (
        <div className={`p-4 rounded-xl border ${
          selectedInfo.isActive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`} role="status" aria-live="polite">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                selectedInfo.isActive ? 'bg-green-100' : 'bg-red-100'
              }`} aria-hidden="true">
                <Check className={`w-5 h-5 ${selectedInfo.isActive ? 'text-green-600' : 'text-red-500'}`} />
              </div>
              <div>
                <p className={`font-medium text-sm ${selectedInfo.isActive ? 'text-green-800' : 'text-red-800'}`}>{doctorName}</p>
                <p className={`text-xs font-mono mt-0.5 ${selectedInfo.isActive ? 'text-green-600' : 'text-red-500'}`}>{sip}</p>
                <p className="text-[10px] text-gray-500 mt-1">
                  Berlaku hingga: {selectedInfo.expiryDate}
                  {!selectedInfo.isActive && ' (EXPIRED)'}
                  {selectedInfo.isActive && selectedInfo.monthsUntilExpiry <= 6 && ` — ${selectedInfo.monthsUntilExpiry} bulan lagi`}
                </p>
              </div>
            </div>
            <button
              onClick={handleClear}
              className="text-xs text-gray-400 hover:text-gray-600 underline flex-shrink-0"
              aria-label={`Ganti dokter ${doctorName}`}
            >
              Ganti
            </button>
          </div>
        </div>
      )}

      {doctors.length > 0 && !selected && (
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-xs text-blue-600 mb-2 font-medium" id="quick-doctor-label">
            Tersedia {doctors.length} dokter untuk{' '}
            {institutionType === 'rumah_sakit' ? 'Rumah Sakit' : institutionType === 'puskesmas' ? 'Puskesmas' : 'Klinik'}
            :
          </p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="quick-doctor-label">
            {sorted.slice(0, 10).map((doc) => (
              <button
                key={doc.id}
                onClick={() => handleSelect(doc)}
                className="px-2.5 py-1.5 sm:py-1.5 bg-white border border-blue-200 rounded-lg text-xs text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-colors text-left min-h-[36px]"
                aria-label={`Pilih dokter ${doc.name}`}
              >
                <span className="whitespace-nowrap">{doc.name}</span>
              </button>
            ))}
            {doctors.length > 10 && (
              <span className="px-2.5 py-1.5 text-xs text-gray-400" aria-hidden="true">
                +{doctors.length - 10} lainnya
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
