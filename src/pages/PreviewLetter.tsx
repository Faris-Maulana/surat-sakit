import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Printer } from 'lucide-react'
import SuratSakit from '@/templates/SuratSakit'
import ExportButtons from '@/components/ExportButtons'
import type { LetterData } from '@/types'

interface PreviewState {
  letterData: LetterData
  signatureUrl?: string
  stampUrl?: string
}

export default function PreviewLetter() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as PreviewState | null
  const letterData = state?.letterData
  const signatureUrl = state?.signatureUrl
  const stampUrl = state?.stampUrl

  if (!letterData || !letterData.institution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Data surat tidak ditemukan.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm"
          >
            Buat Surat Baru
          </button>
        </div>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 hide-on-print">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <ExportButtons data={letterData} letterNumber={letterData.letterNumber} />
          </div>
        </div>

        {/* Surat Preview */}
        <div className="flex justify-center">
          <SuratSakit
            data={letterData}
            signatureUrl={signatureUrl}
            stampUrl={stampUrl}
          />
        </div>

        <p className="text-center text-xs text-gray-400 mt-4 hide-on-print">
          Gunakan tombol Export PDF atau Export DOCX untuk menyimpan surat ini.
        </p>
      </div>
    </div>
  )
}
