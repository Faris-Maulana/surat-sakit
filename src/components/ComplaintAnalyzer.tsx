import { useState } from 'react'
import { autoDiagnose } from '@/utils/diagnosis'
import { Stethoscope, Sparkles, FileText } from 'lucide-react'

interface Props {
  keluhan: string
  diagnosis: string
  icdCode: string
  onKeluhanChange: (v: string) => void
  onDiagnosisChange: (v: string) => void
  onIcdCodeChange: (v: string) => void
}

export default function ComplaintAnalyzer({
  keluhan, diagnosis, icdCode,
  onKeluhanChange, onDiagnosisChange, onIcdCodeChange,
}: Props) {
  const [analyzed, setAnalyzed] = useState(false)

  const handleAnalyze = () => {
    if (!keluhan.trim()) return
    const result = autoDiagnose(keluhan)
    onDiagnosisChange(result.diagnosis)
    onIcdCodeChange(result.icdCode)
    setAnalyzed(true)
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
          placeholder="Contoh: Demam sejak 2 hari, batuk, pilek, dan sakit kepala"
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!keluhan.trim()}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Generate Diagnosis Otomatis
      </button>

      {analyzed && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-2 text-green-700 mb-2">
            <FileText className="w-4 h-4" />
            <span className="font-medium text-sm">Hasil Analisa</span>
          </div>
          <p className="text-sm text-green-800"><strong>Diagnosis:</strong> {diagnosis}</p>
          <p className="text-sm text-green-800"><strong>Kode ICD:</strong> {icdCode}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis (dapat diedit)</label>
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => onDiagnosisChange(e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Diagnosis"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kode ICD-10</label>
          <input
            type="text"
            value={icdCode}
            onChange={(e) => onIcdCodeChange(e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Kode ICD"
          />
        </div>
      </div>
    </div>
  )
}
