import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, WidthType, BorderStyle, ImageRun,
} from 'docx'
import { saveAs } from 'file-saver'
import type { LetterData } from '@/types'
import { formatDate, getDayDifference, getCityName } from './helpers'

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

async function dataUrlToBuffer(dataUrl: string): Promise<Uint8Array> {
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  const buf = await blob.arrayBuffer()
  return new Uint8Array(buf)
}

function headerSection(data: LetterData): (Paragraph | Table)[] {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: data.institution!.name, bold: true, size: 28, font: 'Times New Roman' }),
      ],
      spacing: { after: 60 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: data.institution!.address, size: 20, font: 'Times New Roman' }),
      ],
      spacing: { after: 40 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `Telp: ${data.institution!.phone}`, size: 20, font: 'Times New Roman' }),
      ],
      spacing: { after: 120 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6 } },
      spacing: { after: 200 },
    }),
  ]
}

function patientTable(data: LetterData): Table {
  const rows = [
    ['Nama', data.patient.name],
    ['NIK', data.patient.nik],
    ['Tempat / Tgl Lahir', `${data.patient.birthPlace} / ${formatDate(data.patient.birthDate)}`],
    ['Jenis Kelamin', data.patient.gender],
    ['Pekerjaan', data.patient.occupation],
    ['Alamat', data.patient.address],
  ]
  return new Table({
    rows: rows.map(([label, value]) =>
      new TableRow({ children: [createLabelCell(label), createValueCell(value)] }),
    ),
  })
}

async function sigStampSection(signatureUrl?: string, stampUrl?: string): Promise<Paragraph[]> {
  const out: Paragraph[] = []
  if (signatureUrl || stampUrl) {
    const paras: (Paragraph | undefined)[] = []
    if (signatureUrl) {
      try {
        const sigBytes = await dataUrlToBuffer(signatureUrl)
        paras.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new ImageRun({ data: sigBytes, transformation: { width: 120, height: 40 }, type: 'png' })],
            spacing: { after: 40 },
          }),
        )
      } catch { /* skip */ }
    }
    if (stampUrl) {
      try {
        const stampBytes = await dataUrlToBuffer(stampUrl)
        paras.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new ImageRun({ data: stampBytes, transformation: { width: 90, height: 90 }, type: 'png' })],
            spacing: { after: 40 },
          }),
        )
      } catch { /* skip */ }
    }
    out.push(...paras.filter((p): p is Paragraph => !!p))
  }
  return out
}

function doctorFooter(data: LetterData): Paragraph[] {
  return [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: 60 },
      children: [new TextRun({ text: `(${data.doctor.name})`, bold: true, size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: `SIP. ${data.doctor.sip}`, size: 20, font: 'Times New Roman', italics: true })],
    }),
  ]
}

function buildSakit(data: LetterData): (Paragraph | Table)[] {
  const days = data.restPeriod ? getDayDifference(data.restPeriod.startDate, data.restPeriod.endDate) : 1
  const diag = data.diagnosis

  return [
    ...headerSection(data),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: 'SURAT KETERANGAN SAKIT', bold: true, size: 28, font: 'Times New Roman', underline: { type: 'single' } })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: `Nomor: ${data.letterNumber}`, size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: `Yang bertanda tangan di bawah ini, Dokter pada ${data.institution!.name}, menerangkan bahwa:`, size: 22, font: 'Times New Roman' })],
    }),
    patientTable(data),
    new Paragraph({ spacing: { after: 200 }, children: [] }),
    new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({ text: 'Hasil Pemeriksaan:', bold: true, size: 22, font: 'Times New Roman' })],
    }),
    new Table({
      rows: [
        ['Keluhan', diag.keluhan],
        ['Diagnosis Utama', diag.diagnosis],
        ['Kode ICD-10', diag.icdCode],
        ...(diag.secondary || []).map((s) => ['Diagnosis Tambahan', s.icdCode ? `${s.diagnosis} (${s.icdCode})` : s.diagnosis] as [string, string]),
      ].map(([label, value]) => new TableRow({ children: [createLabelCell(label), createValueCell(value)] })),
    }),
    new Paragraph({ spacing: { after: 200 }, children: [] }),
    new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({ text: 'Rekomendasi:', bold: true, size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: `Berdasarkan hasil pemeriksaan, pasien dianjurkan untuk beristirahat selama ${days} hari, terhitung mulai tanggal ${formatDate(data.restPeriod.startDate)} sampai dengan tanggal ${formatDate(data.restPeriod.endDate)}.`, size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: 'Demikian surat keterangan sakit ini dibuat untuk dipergunakan sebagaimana mestinya.', size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT, spacing: { after: 100 },
      children: [new TextRun({ text: `${getCityName(data.institution!.city)}, ${formatDate(data.createdAt)}`, size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT, spacing: { after: 400 },
      children: [new TextRun({ text: 'Dokter Pemeriksa,', size: 22, font: 'Times New Roman' })],
    }),
  ]
}

function buildSehat(data: LetterData): (Paragraph | Table)[] {
  return [
    ...headerSection(data),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: 'SURAT KETERANGAN SEHAT', bold: true, size: 28, font: 'Times New Roman', underline: { type: 'single' } })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: `Nomor: ${data.letterNumber}`, size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: `Yang bertanda tangan di bawah ini, Dokter pada ${data.institution!.name}, menerangkan bahwa:`, size: 22, font: 'Times New Roman' })],
    }),
    patientTable(data),
    new Paragraph({ spacing: { after: 200 }, children: [] }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: 'Berdasarkan hasil pemeriksaan kesehatan yang telah dilakukan, yang bersangkutan dinyatakan dalam keadaan sehat jasmani dan rohani, serta tidak ditemukan kelainan atau penyakit yang berarti.', size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: 'Surat keterangan sehat ini diberikan untuk dipergunakan sebagaimana mestinya.', size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT, spacing: { after: 100 },
      children: [new TextRun({ text: `${getCityName(data.institution!.city)}, ${formatDate(data.createdAt)}`, size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT, spacing: { after: 400 },
      children: [new TextRun({ text: 'Dokter Pemeriksa,', size: 22, font: 'Times New Roman' })],
    }),
  ]
}

function buildRujukan(data: LetterData): (Paragraph | Table)[] {
  const diag = data.diagnosis
  const ref = data.referral
  return [
    ...headerSection(data),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: 'SURAT RUJUKAN', bold: true, size: 28, font: 'Times New Roman', underline: { type: 'single' } })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: `Nomor: ${data.letterNumber}`, size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: `Yang bertanda tangan di bawah ini, Dokter pada ${data.institution!.name}, dengan ini merujuk pasien:`, size: 22, font: 'Times New Roman' })],
    }),
    patientTable(data),
    new Paragraph({ spacing: { after: 200 }, children: [] }),
    new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({ text: 'Diagnosis:', bold: true, size: 22, font: 'Times New Roman' })],
    }),
    new Table({
      rows: [
        ['Diagnosis', diag.diagnosis],
        ['Kode ICD-10', diag.icdCode],
        ...(diag.secondary || []).map((s) => ['Diagnosis Tambahan', s.icdCode ? `${s.diagnosis} (${s.icdCode})` : s.diagnosis] as [string, string]),
      ].map(([label, value]) => new TableRow({ children: [createLabelCell(label), createValueCell(value)] })),
    }),
    new Paragraph({ spacing: { after: 200 }, children: [] }),
    new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({ text: 'Tujuan Rujukan:', bold: true, size: 22, font: 'Times New Roman' })],
    }),
    new Table({
      rows: [
        ['Faskes Tujuan', ref?.destinationInstitution || '—'],
        ['Dokter Tujuan', ref?.destinationDoctor || '—'],
        ['Alasan Rujukan', ref?.reason || '—'],
      ].map(([label, value]) => new TableRow({ children: [createLabelCell(label), createValueCell(value)] })),
    }),
    new Paragraph({ spacing: { after: 200 }, children: [] }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: 'Demikian surat rujukan ini dibuat untuk dipergunakan sebagaimana mestinya.', size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT, spacing: { after: 100 },
      children: [new TextRun({ text: `${getCityName(data.institution!.city)}, ${formatDate(data.createdAt)}`, size: 22, font: 'Times New Roman' })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT, spacing: { after: 400 },
      children: [new TextRun({ text: 'Dokter Pengirim,', size: 22, font: 'Times New Roman' })],
    }),
  ]
}

export async function exportToDOCX(
  data: LetterData,
  filename: string = 'surat-sakit.docx',
  signatureUrl?: string,
  stampUrl?: string,
): Promise<void> {
  if (!data.institution) return

  let body: (Paragraph | Table)[]
  switch (data.letterType) {
    case 'sehat':
      body = buildSehat(data)
      break
    case 'rujukan':
      body = buildRujukan(data)
      break
    default:
      body = buildSakit(data)
  }

  const sigStampParags = await sigStampSection(signatureUrl, stampUrl)

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 24 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1500, right: 1500, bottom: 1500, left: 1500 },
          },
        },
        children: [
          ...body,
          ...sigStampParags,
          ...doctorFooter(data),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, filename)
}
