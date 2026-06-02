import type { LetterData } from '@/types'
import { getLogoById } from '@/data/logos'
import { formatDate, getDayDifference, getCityName } from '@/utils/helpers'

interface Props {
  data: LetterData
  signatureUrl?: string
  stampUrl?: string
}

export default function SuratSakit({ data, signatureUrl, stampUrl }: Props) {
  const { institution, patient, diagnosis, restPeriod, doctor, letterNumber, createdAt } = data
  if (!institution) return null

  const logo = getLogoById(institution.id, institution.type, institution.name)
  const days = getDayDifference(restPeriod.startDate, restPeriod.endDate)

  return (
    <div id="surat-sakit-template" className="surat-container font-serif">
      {/* Kop Surat */}
      <div className="surat-header">
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3">
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
            dangerouslySetInnerHTML={{ __html: logo }}
          />
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold uppercase tracking-wide leading-tight">{institution.name}</h1>
            <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{institution.address}</p>
            <p className="text-[10px] sm:text-xs text-gray-600">Telp: {institution.phone}</p>
          </div>
        </div>
      </div>

      <div className="surat-line" />

      {/* Judul Surat */}
      <h2 className="text-center font-bold text-sm sm:text-base mb-4 sm:mb-6 underline underline-offset-4">
        SURAT KETERANGAN SAKIT
      </h2>

      <p className="text-[11px] sm:text-sm mb-2">Nomor: {letterNumber}</p>

      <p className="text-[11px] sm:text-sm mb-4 sm:mb-6 leading-relaxed">
        Yang bertanda tangan di bawah ini, Dokter pada {institution.name}, menerangkan bahwa:
      </p>

      {/* Data Pasien */}
      <table className="w-full text-[11px] sm:text-sm mb-4 sm:mb-6">
        <tbody>
          <tr><td className="py-0.5 sm:py-1 w-32 sm:w-44 align-top">Nama</td><td className="py-0.5 sm:py-1">: {patient.name}</td></tr>
          <tr><td className="py-0.5 sm:py-1 align-top">NIK</td><td className="py-0.5 sm:py-1">: {patient.nik}</td></tr>
          <tr><td className="py-0.5 sm:py-1 align-top">Tempat / Tgl Lahir</td><td className="py-0.5 sm:py-1">: {patient.birthPlace} / {formatDate(patient.birthDate)}</td></tr>
          <tr><td className="py-0.5 sm:py-1 align-top">Jenis Kelamin</td><td className="py-0.5 sm:py-1">: {patient.gender}</td></tr>
          <tr><td className="py-0.5 sm:py-1 align-top">Pekerjaan</td><td className="py-0.5 sm:py-1">: {patient.occupation}</td></tr>
          <tr><td className="py-0.5 sm:py-1 align-top">Alamat</td><td className="py-0.5 sm:py-1">: {patient.address}</td></tr>
        </tbody>
      </table>

      {/* Hasil Pemeriksaan */}
      <p className="text-[11px] sm:text-sm mb-1 sm:mb-2 font-semibold">Hasil Pemeriksaan:</p>
      <table className="w-full text-[11px] sm:text-sm mb-4 sm:mb-6">
        <tbody>
          <tr><td className="py-0.5 sm:py-1 w-32 sm:w-44 align-top">Keluhan</td><td className="py-0.5 sm:py-1">: {diagnosis.keluhan}</td></tr>
          <tr><td className="py-0.5 sm:py-1 align-top">Diagnosis Utama</td><td className="py-0.5 sm:py-1">: {diagnosis.diagnosis}</td></tr>
          <tr><td className="py-0.5 sm:py-1 align-top">Kode ICD-10</td><td className="py-0.5 sm:py-1">: {diagnosis.icdCode}</td></tr>
          {diagnosis.secondary?.map((s, i) => (
            <tr key={i}>
              <td className="py-0.5 sm:py-1 align-top">Diagnosis #{i + 2}</td>
              <td className="py-0.5 sm:py-1">: {s.diagnosis} {s.icdCode ? `(${s.icdCode})` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rekomendasi */}
      <p className="text-[11px] sm:text-sm mb-1 sm:mb-2 font-semibold">Rekomendasi:</p>
      <p className="text-[11px] sm:text-sm mb-4 sm:mb-6 leading-relaxed">
        Berdasarkan hasil pemeriksaan, pasien dianjurkan untuk beristirahat selama{' '}
        <strong>{days} hari</strong>, terhitung mulai tanggal{' '}
        <strong>{formatDate(restPeriod.startDate)}</strong> sampai dengan tanggal{' '}
        <strong>{formatDate(restPeriod.endDate)}</strong>.
      </p>

      {/* Catatan */}
      <p className="text-[11px] sm:text-sm mb-4 sm:mb-6 leading-relaxed">
        Demikian surat keterangan sakit ini dibuat untuk dipergunakan sebagaimana mestinya.
      </p>

      {/* TTD + Stempel — stamp OVERLAPS signature (real Indonesian style) */}
      <div className="flex justify-end mt-6 sm:mt-8">
        <div className="text-center min-w-[160px] sm:min-w-[220px]">
          <p className="text-[11px] sm:text-sm mb-1 sm:mb-2">{getCityName(institution.city)}, {formatDate(createdAt)}</p>
          <p className="text-[11px] sm:text-sm mb-4 sm:mb-6">Dokter Pemeriksa,</p>

          <div className="relative inline-flex items-end justify-center mb-1">
            {/* Signature */}
            {signatureUrl && (
              <div className="relative z-0">
                <img src={signatureUrl} alt="TTD" className="h-10 sm:h-14 object-contain" />
              </div>
            )}
            {/* Stamp — positioned overlapping the right portion of signature */}
            {stampUrl && (
              <div className="relative z-10 -ml-8 sm:-ml-10 -mb-3 sm:-mb-4">
                <img src={stampUrl} alt="Stempel" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
              </div>
            )}
          </div>

          <p className="text-[11px] sm:text-sm font-semibold mt-1">({doctor.name})</p>
          <p className="text-[10px] sm:text-xs text-gray-500">SIP. {doctor.sip}</p>
        </div>
      </div>
    </div>
  )
}
