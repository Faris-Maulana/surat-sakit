import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, WidthType, BorderStyle, Header,
} from 'docx'
import { saveAs } from 'file-saver'
import type { LetterData } from '@/types'
import { formatDate, getDayDifference } from './helpers'

function createLabelCell(label: string): TableCell {
  return new TableCell({
    width: { size: 30, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        children: [new TextRun({ text: label, size: 20, font: 'Times New Roman', bold: true })],
        spacing: { before: 40, after: 40 },
      }),
    ],
    borders: {
      top: { style: BorderStyle.NONE, size: 0 },
      bottom: { style: BorderStyle.NONE, size: 0 },
      left: { style: BorderStyle.NONE, size: 0 },
      right: { style: BorderStyle.NONE, size: 0 },
    },
  })
}

function createValueCell(text: string): TableCell {
  return new TableCell({
    width: { size: 70, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        children: [new TextRun({ text: `: ${text}`, size: 20, font: 'Times New Roman' })],
        spacing: { before: 40, after: 40 },
      }),
    ],
    borders: {
      top: { style: BorderStyle.NONE, size: 0 },
      bottom: { style: BorderStyle.NONE, size: 0 },
      left: { style: BorderStyle.NONE, size: 0 },
      right: { style: BorderStyle.NONE, size: 0 },
    },
  })
}

export async function exportToDOCX(data: LetterData, filename: string = 'surat-sakit.docx'): Promise<void> {
  if (!data.institution) return

  const days = getDayDifference(data.restPeriod.startDate, data.restPeriod.endDate)

  const patientRows = [
    ['Nama', data.patient.name],
    ['NIK', data.patient.nik],
    ['Tempat / Tgl Lahir', `${data.patient.birthPlace} / ${formatDate(data.patient.birthDate)}`],
    ['Jenis Kelamin', data.patient.gender],
    ['Pekerjaan', data.patient.occupation],
    ['Alamat', data.patient.address],
  ]

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 22 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1400,
              right: 1400,
              bottom: 1400,
              left: 1400,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: data.institution.name, bold: true, size: 26, font: 'Times New Roman' }),
                ],
                spacing: { after: 60 },
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: data.institution.address, size: 18, font: 'Times New Roman' }),
                ],
                spacing: { after: 40 },
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: `Telp: ${data.institution.phone}`, size: 18, font: 'Times New Roman' }),
                ],
                spacing: { after: 120 },
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                border: {
                  bottom: { style: BorderStyle.SINGLE, size: 6 },
                },
                children: [],
                spacing: { after: 200 },
              }),
            ],
          }),
        },
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: 'SURAT KETERANGAN SAKIT', bold: true, size: 26, font: 'Times New Roman', underline: { type: 'single' } }),
            ],
          }),

          // Letter number
          new Paragraph({
            spacing: { after: 200 },
            children: [new TextRun({ text: `Nomor: ${data.letterNumber}`, size: 20, font: 'Times New Roman' })],
          }),

          // Opening
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Yang bertanda tangan di bawah ini, Dokter pada ${data.institution.name}, menerangkan bahwa:`,
                size: 20, font: 'Times New Roman',
              }),
            ],
          }),

          // Patient data table
          new Table({
            rows: patientRows.map(([label, value]) =>
              new TableRow({
                children: [createLabelCell(label), createValueCell(value)],
              })
            ),
          }),

          // Empty paragraph
          new Paragraph({ spacing: { after: 200 }, children: [] }),

          // Hasil Pemeriksaan
          new Paragraph({
            spacing: { after: 100 },
            children: [new TextRun({ text: 'Hasil Pemeriksaan:', bold: true, size: 20, font: 'Times New Roman' })],
          }),

          new Table({
            rows: [
              ['Keluhan', data.diagnosis.keluhan],
              ['Diagnosis', data.diagnosis.diagnosis],
              ['Kode ICD-10', data.diagnosis.icdCode],
            ].map(([label, value]) =>
              new TableRow({
                children: [createLabelCell(label), createValueCell(value)],
              })
            ),
          }),

          new Paragraph({ spacing: { after: 200 }, children: [] }),

          // Rekomendasi
          new Paragraph({
            spacing: { after: 100 },
            children: [new TextRun({ text: 'Rekomendasi:', bold: true, size: 20, font: 'Times New Roman' })],
          }),

          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Berdasarkan hasil pemeriksaan, pasien dianjurkan untuk beristirahat selama ${days} hari, terhitung mulai tanggal ${formatDate(data.restPeriod.startDate)} sampai dengan tanggal ${formatDate(data.restPeriod.endDate)}.`,
                size: 20, font: 'Times New Roman',
              }),
            ],
          }),

          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'Demikian surat keterangan sakit ini dibuat untuk dipergunakan sebagaimana mestinya.',
                size: 20, font: 'Times New Roman',
              }),
            ],
          }),

          // Signature area
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: `${data.institution.city === 'bogor' ? 'Bogor' : data.institution.city}, ${formatDate(data.createdAt)}`,
                size: 20, font: 'Times New Roman',
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { after: 400 },
            children: [
              new TextRun({ text: 'Dokter Pemeriksa,', size: 20, font: 'Times New Roman' }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { after: 100 },
            children: [
              new TextRun({ text: '', size: 20, font: 'Times New Roman' }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { after: 60 },
            children: [
              new TextRun({ text: `(${data.doctor.name})`, bold: true, size: 20, font: 'Times New Roman' }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: `SIP. ${data.doctor.sip}`, size: 18, font: 'Times New Roman', italics: true }),
            ],
          }),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, filename)
}
