import html2pdf from 'html2pdf.js'

export async function exportToPDF(elementId: string, filename: string = 'surat-sakit.pdf'): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) throw new Error('Element not found')

  const opt = {
    margin: [0, 0, 0, 0] as [number, number, number, number],
    filename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
    },
    pagebreak: { mode: 'avoid-all' as const },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait' as const,
    },
  }

  await html2pdf().set(opt).from(element).save()
}
