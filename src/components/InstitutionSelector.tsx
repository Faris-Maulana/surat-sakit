import { useState, useRef, useEffect, useMemo } from 'react'
import { institutionTypes, cities, getInstitutionsByCityAndType } from '@/data/institutions'
import { getLogoById } from '@/data/logos'
import type { Institution, InstitutionType } from '@/types'
import { MapPin, Building2, ChevronRight, Search, X } from 'lucide-react'

interface Props {
  selectedType: InstitutionType | ''
  selectedCity: string
  selectedInstitution: Institution | null
  onTypeChange: (t: InstitutionType) => void
  onCityChange: (c: string) => void
  onInstitutionChange: (i: Institution | null) => void
}

export default function InstitutionSelector({
  selectedType, selectedCity, selectedInstitution,
  onTypeChange, onCityChange, onInstitutionChange,
}: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filtered = selectedType && selectedCity
    ? getInstitutionsByCityAndType(selectedCity, selectedType)
    : []

  const matchedCities = useMemo(() => {
    if (!query) return cities
    const q = query.toLowerCase()
    return cities.filter(c => c.name.toLowerCase().includes(q))
  }, [query])

  const selectedCityName = useMemo(() => {
    if (!selectedCity) return ''
    return cities.find(c => c.id === selectedCity)?.name ?? ''
  }, [selectedCity])

  useEffect(() => {
    if (!open) setActiveIndex(-1)
  }, [open])

  useEffect(() => {
    if (open && activeIndex >= 0 && listRef.current) {
      const el = listRef.current.children[activeIndex] as HTMLElement
      if (el) el.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex, open])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(cityId: string) {
    onCityChange(cityId)
    onInstitutionChange(null)
    setQuery('')
    setOpen(false)
  }

  function handleClear() {
    onCityChange('')
    onInstitutionChange(null)
    setQuery('')
    setOpen(false)
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === 'ArrowDown') { setOpen(true); setActiveIndex(0); e.preventDefault() }
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        setActiveIndex(i => Math.min(i + 1, matchedCities.length - 1))
        e.preventDefault()
        break
      case 'ArrowUp':
        setActiveIndex(i => Math.max(i - 1, 0))
        e.preventDefault()
        break
      case 'Enter':
        if (activeIndex >= 0 && matchedCities[activeIndex]) {
          handleSelect(matchedCities[activeIndex].id)
        }
        e.preventDefault()
        break
      case 'Escape':
        setOpen(false)
        e.preventDefault()
        break
    }
  }

  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Jenis Fasilitas Kesehatan">
        <label className="block text-sm font-medium text-gray-700 mb-3">Jenis Fasilitas Kesehatan</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {institutionTypes.map((t) => (
            <button
              key={t.value}
              role="radio"
              aria-checked={selectedType === t.value}
              onClick={() => { onTypeChange(t.value); onInstitutionChange(null) }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                selectedType === t.value
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center text-2xl bg-gray-50 rounded-lg" aria-hidden="true">
                {t.icon}
              </div>
              <span className="font-medium text-sm">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedType && (
        <div className="relative" ref={containerRef}>
          <label htmlFor="city-search" className="block text-sm font-medium text-gray-700 mb-2">Pilih Kota</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            <input
              ref={inputRef}
              id="city-search"
              type="text"
              role="combobox"
              aria-expanded={open}
              aria-controls="city-listbox"
              aria-activedescendant={activeIndex >= 0 ? `city-option-${matchedCities[activeIndex]?.id}` : undefined}
              aria-autocomplete="list"
              placeholder={selectedCityName || 'Ketik nama kota...'}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIndex(-1) }}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-xl border-gray-300 border p-3 pl-10 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {(query || selectedCity) && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Hapus pilihan kota"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {open && (
            <div
              ref={listRef}
              id="city-listbox"
              role="listbox"
              aria-label="Daftar kota"
              className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto"
            >
              {matchedCities.length === 0 ? (
                <div className="p-3 text-sm text-gray-400 text-center" role="status">Kota tidak ditemukan</div>
              ) : (
                matchedCities.map((c, i) => (
                  <button
                    key={c.id}
                    id={`city-option-${c.id}`}
                    role="option"
                    aria-selected={selectedCity === c.id}
                    onClick={() => handleSelect(c.id)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      i === activeIndex ? 'bg-blue-50' : ''
                    } ${selectedCity === c.id ? 'font-medium text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {c.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {selectedCity && selectedType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih {institutionTypes.find(t => t.value === selectedType)?.label}
          </label>
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 italic" role="status">
              Tidak ada {selectedType === 'rumah_sakit' ? 'rumah sakit' : selectedType} di kota ini.
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto" role="listbox" aria-label="Daftar institusi">
              {filtered.map((inst) => (
                <button
                  key={inst.id}
                  role="option"
                  aria-selected={selectedInstitution?.id === inst.id}
                  onClick={() => onInstitutionChange(inst)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    selectedInstitution?.id === inst.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div
                    className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: getLogoById(inst.id, inst.type, inst.name) }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{inst.name}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      <span className="truncate">{inst.address}</span>
                    </div>
                    <a
                      href={inst.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                      aria-label={`Lihat ${inst.name} di Google Maps`}
                    >
                      <MapPin className="w-3 h-3" aria-hidden="true" /> Lihat di Google Maps
                    </a>
                  </div>
                  <ChevronRight className={`w-5 h-5 mt-2 ${selectedInstitution?.id === inst.id ? 'text-blue-500' : 'text-gray-300'}`} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedInstitution && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3" role="status" aria-live="polite">
          <Building2 className="w-5 h-5 text-green-600 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium text-green-800 text-sm">{selectedInstitution.name}</p>
            <p className="text-xs text-green-600">{selectedInstitution.address}</p>
            <p className="text-xs text-green-600">{selectedInstitution.phone}</p>
          </div>
        </div>
      )}
    </div>
  )
}
