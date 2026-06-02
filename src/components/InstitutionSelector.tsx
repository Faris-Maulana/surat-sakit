import { institutionTypes, cities, getInstitutionsByCityAndType } from '@/data/institutions'
import { getLogoById } from '@/data/logos'
import type { Institution, InstitutionType } from '@/types'
import { MapPin, Building2, ChevronRight } from 'lucide-react'

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
  const filtered = selectedType && selectedCity
    ? getInstitutionsByCityAndType(selectedCity, selectedType)
    : []

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
        <div>
          <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-2">Pilih Kota</label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => { onCityChange(e.target.value); onInstitutionChange(null) }}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Pilih Kota --</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
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
