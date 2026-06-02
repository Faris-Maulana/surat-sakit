import { useState } from 'react'
import { FileDown, FileText, Loader2 } from 'lucide-react'
import { toast } from './Toast'
import type { LetterData } from '@/types'

interface Props {
  data: LetterData
  letterNumber: string
  templateId: string
  signatureUrl?: string
  stampUrl?: string
}

const prefixMap: Record<string, string> = {
  'surat-sakit-template': 'Surat_Sakit',
  'surat-sehat-template': 'Surat_Sehat',
  'surat-rujukan-template': 'Surat_Rujukan',
}

export default function ExportButtons({ data, letterNumber, templateId, signatureUrl, stampUrl }: Props) {
  const [exporting, setExporting] = useState<'pdf' | 'docx' | null>(null)

  const prefix = prefixMap[templateId] || 'Surat_Sakit'

  const handlePDF = async () => {
    setExporting('pdf')
    try {
      const { exportToPDF } = await import('@/utils/pdf')
      await exportToPDF(templateId, `${prefix}_${letterNumber.replace(/\//g, '-')}.pdf`)
    } catch (err) {
      toast('error', 'Gagal mengexport PDF. Silakan coba lagi.')
      console.error('PDF export failed:', err)
    } finally {
      setExporting(null)
    }
  }

  const handleDOCX = async () => {
    setExporting('docx')
    try {
      const { exportToDOCX } = await import('@/utils/docx')
      await exportToDOCX(
        data,
        `${prefix}_${letterNumber.replace(/\//g, '-')}.docx`,
        signatureUrl,
        stampUrl,
      )
    } catch (err) {
      toast('error', 'Gagal mengexport DOCX. Silakan coba lagi.')
      console.error('DOCX export failed:', err)
    } finally {
      setExporting(null)
    }
  }

  const pdfLoading = exporting === 'pdf'
  const docxLoading = exporting === 'docx'
  const anyLoading = exporting !== null

  return (
    <div className="flex flex-wrap gap-3 justify-center" role="group" aria-label="Opsi export surat">
      <button
        onClick={handlePDF}
        disabled={anyLoading}
        aria-busy={pdfLoading}
        aria-label={pdfLoading ? 'Mengexport PDF...' : 'Export surat ke PDF'}
        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {pdfLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <FileText className="w-5 h-5" />
        )}
        {pdfLoading ? 'Mengexport PDF...' : 'Export PDF'}
      </button>

      <button
        onClick={handleDOCX}
        disabled={anyLoading}
        aria-busy={docxLoading}
        aria-label={docxLoading ? 'Mengexport DOCX...' : 'Export surat ke DOCX'}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {docxLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <FileDown className="w-5 h-5" />
        )}
        {docxLoading ? 'Mengexport DOCX...' : 'Export DOCX'}
      </button>
    </div>
  )
}
