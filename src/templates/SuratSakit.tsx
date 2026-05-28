import type { LetterData } from '@/types'
import { getLogoByType } from '@/data/logos'
import { formatDate, getDayDifference, getCityName } from '@/utils/helpers'

interface Props {
  data: LetterData
  signatureUrl?: string
  stampUrl?: string
}

export default function SuratSakit({ data, signatureUrl, stampUrl }: Props) {
  const { institution, patient, diagnosis, restPeriod, doctor, letterNumber, createdAt } = data
  if (!institution) return null

  const logo = getLogoByType(institution.type)
  const days = getDayDifference(restPeriod.startDate, restPeriod.endDate)

  return (
    <div id="surat-sakit-template" className="surat-container font-serif">
      {/* Kop Surat */}
      <div className="surat-header">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div
            className="w-16 h-16 flex-shrink-0"
            dangerouslySetInnerHTML={{ __html: logo }}
          />
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wide">{institution.name}</h1>
            <p className="text-xs text-gray-600">{institution.address}</p>
            <p className="text-xs text-gray-600">Telp: {institution.phone}</p>
          </div>
        </div>
      </div>

      <div className="surat-line" />

      {/* Judul Surat */}
      <h2 className="text-center font-bold text-base mb-6 underline underline-offset-4">
        SURAT KETERANGAN SAKIT
      </h2>

      <p className="text-sm mb-2">Nomor: {letterNumber}</p>

      <p className="text-sm mb-6">
        Yang bertanda tangan di bawah ini, Dokter pada {institution.name}, menerangkan bahwa:
      </p>

      {/* Data Pasien */}
      <table className="w-full text-sm mb-6">
        <tbody>
          <tr><td className="py-1 w-44">Nama</td><td className="py-1">: {patient.name}</td></tr>
          <tr><td className="py-1">NIK</td><td className="py-1">: {patient.nik}</td></tr>
          <tr><td className="py-1">Tempat / Tgl Lahir</td><td className="py-1">: {patient.birthPlace} / {formatDate(patient.birthDate)}</td></tr>
          <tr><td className="py-1">Jenis Kelamin</td><td className="py-1">: {patient.gender}</td></tr>
          <tr><td className="py-1">Pekerjaan</td><td className="py-1">: {patient.occupation}</td></tr>
          <tr><td className="py-1">Alamat</td><td className="py-1">: {patient.address}</td></tr>
        </tbody>
      </table>

      {/* Hasil Pemeriksaan */}
      <p className="text-sm mb-2 font-semibold">Hasil Pemeriksaan:</p>
      <table className="w-full text-sm mb-6">
        <tbody>
          <tr><td className="py-1 w-44">Keluhan</td><td className="py-1">: {diagnosis.keluhan}</td></tr>
          <tr><td className="py-1">Diagnosis</td><td className="py-1">: {diagnosis.diagnosis}</td></tr>
          <tr><td className="py-1">Kode ICD-10</td><td className="py-1">: {diagnosis.icdCode}</td></tr>
        </tbody>
      </table>

      {/* Rekomendasi */}
      <p className="text-sm mb-2 font-semibold">Rekomendasi:</p>
      <p className="text-sm mb-6">
        Berdasarkan hasil pemeriksaan, pasien dianjurkan untuk beristirahat selama{' '}
        <strong>{days} hari</strong>, terhitung mulai tanggal{' '}
        <strong>{formatDate(restPeriod.startDate)}</strong> sampai dengan tanggal{' '}
        <strong>{formatDate(restPeriod.endDate)}</strong>.
      </p>

      {/* Catatan */}
      <p className="text-sm mb-6">
        Demikian surat keterangan sakit ini dibuat untuk dipergunakan sebagaimana mestinya.
      </p>

      {/* TTD */}
      <div className="flex justify-end mt-8">
        <div className="text-center min-w-[200px]">
          <p className="text-sm mb-2">{getCityName(institution.city)}, {formatDate(createdAt)}</p>
          <p className="text-sm mb-8">Dokter Pemeriksa,</p>

          <div className="flex items-end justify-center gap-4 mb-1">
            {signatureUrl && (
              <img src={signatureUrl} alt="TTD" className="h-14 object-contain" />
            )}
            {stampUrl && (
              <div className="relative">
                <img src={stampUrl} alt="Cap" className="w-[72px] h-[72px] object-contain" />
              </div>
            )}
          </div>

          <p className="text-sm font-semibold mt-1">({doctor.name})</p>
          <p className="text-xs text-gray-500">SIP. {doctor.sip}</p>
        </div>
      </div>
    </div>
  )
}
