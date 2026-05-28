import { useState } from 'react'
import { FileDown, FileText } from 'lucide-react'
import { exportToPDF } from '@/utils/pdf'
import { exportToDOCX } from '@/utils/docx'
import type { LetterData } from '@/types'

interface Props {
  data: LetterData
  letterNumber: string
  signatureUrl?: string
  stampUrl?: string
}

export default function ExportButtons({ data, letterNumber, signatureUrl, stampUrl }: Props) {
  const [exporting, setExporting] = useState<'pdf' | 'docx' | null>(null)

  const handlePDF = async () => {
    setExporting('pdf')
    try {
      await exportToPDF('surat-sakit-template', `Surat_Sakit_${letterNumber.replace(/\//g, '-')}.pdf`)
    } catch (err) {
      console.error('PDF export failed:', err)
    } finally {
      setExporting(null)
    }
  }

  const handleDOCX = async () => {
    setExporting('docx')
    try {
      await exportToDOCX(
        data,
        `Surat_Sakit_${letterNumber.replace(/\//g, '-')}.docx`,
        signatureUrl,
        stampUrl,
      )
    } catch (err) {
      console.error('DOCX export failed:', err)
    } finally {
      setExporting(null)
    }
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={handlePDF}
        disabled={exporting !== null}
        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        <FileText className="w-5 h-5" />
        {exporting === 'pdf' ? 'Mengexport...' : 'Export PDF'}
      </button>

      <button
        onClick={handleDOCX}
        disabled={exporting !== null}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        <FileDown className="w-5 h-5" />
        {exporting === 'docx' ? 'Mengexport...' : 'Export DOCX'}
      </button>
    </div>
  )
}
