import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Printer } from 'lucide-react'
import SuratSakit from '@/templates/SuratSakit'
import SuratSehat from '@/templates/SuratSehat'
import SuratRujukan from '@/templates/SuratRujukan'
import ExportButtons from '@/components/ExportButtons'
import type { LetterData } from '@/types'

interface PreviewState {
  letterData: LetterData
  signatureUrl?: string
  stampUrl?: string
}

const templateLabels: Record<string, { title: string; icon: string }> = {
  sakit: { title: 'Surat Keterangan Sakit', icon: '🤒' },
  sehat: { title: 'Surat Keterangan Sehat', icon: '💪' },
  rujukan: { title: 'Surat Rujukan', icon: '📋' },
}

export default function PreviewLetter() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as PreviewState | null
  const letterData = state?.letterData
  const signatureUrl = state?.signatureUrl
  const stampUrl = state?.stampUrl
  const lt = letterData?.letterType || 'sakit'

  if (!letterData || !letterData.institution) {
    return (
      <main className="max-w-lg mx-auto px-4 pt-20 pb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-gray-500 mb-6">Data surat tidak ditemukan.</p>
          <button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-halo-500 text-white rounded-xl text-sm font-semibold hover:bg-halo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]">
            Buat Surat Baru
          </button>
        </div>
      </main>
    )
  }

  const handlePrint = () => {
    setTimeout(() => window.print(), 0)
  }

  const templateId = `surat-${lt}-template`

  return (
    <main className="max-w-4xl mx-auto px-4 pt-6 pb-12">
      {/* Actions toolbar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 mb-6 flex flex-wrap items-center justify-between gap-3 hide-on-print">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center gap-2 px-3 py-2 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-100 hover:text-gray-700 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Kembali</span>
        </button>
        <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-halo-50 text-halo-700">
            <span>{templateLabels[lt]?.icon}</span>
            <span className="font-medium">{templateLabels[lt]?.title}</span>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Print</span>
          </button>
          <ExportButtons
            data={letterData}
            letterNumber={letterData.letterNumber}
            templateId={templateId}
            signatureUrl={signatureUrl}
            stampUrl={stampUrl}
          />
        </div>
      </div>

      {/* Surat Preview */}
      <div className="flex justify-center">
        <div className="w-full max-w-[210mm] overflow-x-auto">
          {lt === 'sehat' && <SuratSehat data={letterData} signatureUrl={signatureUrl} stampUrl={stampUrl} />}
          {lt === 'rujukan' && <SuratRujukan data={letterData} signatureUrl={signatureUrl} stampUrl={stampUrl} />}
          {lt === 'sakit' && <SuratSakit data={letterData} signatureUrl={signatureUrl} stampUrl={stampUrl} />}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4 hide-on-print">
        Gunakan tombol Export PDF atau Export DOCX untuk menyimpan surat ini.
      </p>
    </main>
  )
}
