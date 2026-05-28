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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-gray-500 mb-4">Data surat tidak ditemukan.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
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
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6 hide-on-print">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Kembali</span>
          </button>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Print</span>
            </button>
            <ExportButtons data={letterData} letterNumber={letterData.letterNumber} signatureUrl={signatureUrl} stampUrl={stampUrl} />
          </div>
        </div>

        {/* Surat Preview */}
        <div className="flex justify-center">
          <div className="w-full max-w-[210mm] overflow-x-auto">
            <SuratSakit
              data={letterData}
              signatureUrl={signatureUrl}
              stampUrl={stampUrl}
            />
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4 hide-on-print">
          Gunakan tombol Export PDF atau Export DOCX untuk menyimpan surat ini.
        </p>
      </div>
    </div>
  )
}
