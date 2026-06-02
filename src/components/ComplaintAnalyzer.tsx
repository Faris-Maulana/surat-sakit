import { useState } from 'react'
import { autoDiagnose } from '@/utils/diagnosis'
import { Stethoscope, Sparkles, FileText, ChevronRight, Plus, X } from 'lucide-react'
import type { SingleDiagnosis } from '@/types'

interface Props {
  keluhan: string
  diagnosis: string
  icdCode: string
  secondaryDiagnoses: SingleDiagnosis[]
  onKeluhanChange: (v: string) => void
  onDiagnosisChange: (v: string) => void
  onIcdCodeChange: (v: string) => void
  onSecondaryChange: (v: SingleDiagnosis[]) => void
}

export default function ComplaintAnalyzer({
  keluhan, diagnosis, icdCode, secondaryDiagnoses,
  onKeluhanChange, onDiagnosisChange, onIcdCodeChange, onSecondaryChange,
}: Props) {
  const [analyzed, setAnalyzed] = useState(false)
  const [alternatives, setAlternatives] = useState<{ diagnosis: string; icdCode: string; matchCount: number }[]>([])

  const handleAnalyze = () => {
    if (!keluhan.trim()) return
    const result = autoDiagnose(keluhan)
    onDiagnosisChange(result.primary.diagnosis)
    onIcdCodeChange(result.primary.icdCode)
    setAlternatives(result.alternatives)
    setAnalyzed(true)
  }

  const handleSelectAlt = (diag: string, icd: string) => {
    onDiagnosisChange(diag)
    onIcdCodeChange(icd)
  }

  const addSecondary = () => {
    onSecondaryChange([...secondaryDiagnoses, { diagnosis: '', icdCode: '' }])
  }

  const updateSecondary = (idx: number, field: keyof SingleDiagnosis, value: string) => {
    const updated = secondaryDiagnoses.map((d, i) =>
      i === idx ? { ...d, [field]: value } : d
    )
    onSecondaryChange(updated)
  }

  const removeSecondary = (idx: number) => {
    onSecondaryChange(secondaryDiagnoses.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <Stethoscope className="w-5 h-5" />
        <h3 className="font-semibold">Keluhan & Diagnosis</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Keluhan Pasien</label>
        <textarea
          value={keluhan}
          onChange={(e) => { onKeluhanChange(e.target.value); setAnalyzed(false) }}
          className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Contoh: Demam sejak 2 hari, batuk berdahak kuning, sakit kepala, dan badan lemas"
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!keluhan.trim()}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Analisa Keluhan & Generate Diagnosis
      </button>

      {analyzed && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-2 text-green-700 mb-2">
            <FileText className="w-4 h-4" />
            <span className="font-medium text-sm">Hasil Analisa</span>
          </div>
          <p className="text-sm text-green-800"><strong>Diagnosis Utama:</strong> {diagnosis}</p>
          <p className="text-sm text-green-800"><strong>Kode ICD:</strong> {icdCode}</p>

          {alternatives.length > 0 && (
            <div className="mt-3 pt-3 border-t border-green-200">
              <p className="text-xs text-green-600 mb-2 font-medium">Diagnosis alternatif:</p>
              <div className="flex flex-wrap gap-1.5">
                {alternatives.map((alt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAlt(alt.diagnosis, alt.icdCode)}
                    className="px-2.5 py-1.5 bg-white border border-green-300 rounded-lg text-xs text-green-700 hover:bg-green-100 transition-colors"
                  >
                    {alt.diagnosis} <span className="opacity-60">({alt.icdCode})</span>
                    <ChevronRight className="w-3 h-3 inline ml-1" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis Utama</label>
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => onDiagnosisChange(e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Diagnosis utama"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kode ICD-10 Utama</label>
          <input
            type="text"
            value={icdCode}
            onChange={(e) => onIcdCodeChange(e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Kode ICD"
          />
        </div>
      </div>

      {/* Secondary diagnoses */}
      {secondaryDiagnoses.map((sec, idx) => (
        <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-xl relative">
          <button
            onClick={() => removeSecondary(idx)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-xs font-medium text-gray-500 mb-3">Diagnosis Tambahan #{idx + 1}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={sec.diagnosis}
              onChange={(e) => updateSecondary(idx, 'diagnosis', e.target.value)}
              className="w-full rounded-xl border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Diagnosis tambahan"
            />
            <input
              type="text"
              value={sec.icdCode}
              onChange={(e) => updateSecondary(idx, 'icdCode', e.target.value)}
              className="w-full rounded-xl border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Kode ICD"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addSecondary}
        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-colors w-full justify-center"
      >
        <Plus className="w-4 h-4" />
        Tambah Diagnosis Lain
      </button>
    </div>
  )
}
