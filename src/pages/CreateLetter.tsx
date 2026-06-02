import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Send, Stethoscope } from 'lucide-react'
import StepIndicator from '@/components/StepIndicator'
import InstitutionSelector from '@/components/InstitutionSelector'
import PatientForm from '@/components/PatientForm'
import ComplaintAnalyzer from '@/components/ComplaintAnalyzer'
import DateRangePicker from '@/components/DateRangePicker'
import DoctorSelector from '@/components/DoctorSelector'
import SignaturePad from '@/components/SignaturePad'
import StampGenerator from '@/components/StampGenerator'
import LetterHistory from '@/components/LetterHistory'
import { generateLetterNumber } from '@/utils/helpers'
import { saveDraft, loadDraft, clearDraft, restoreInstitution } from '@/utils/draft'
import { saveLetter } from '@/services/letterService'
import { institutions } from '@/data/institutions'
import type { Institution, InstitutionType, PatientData, LetterData, SingleDiagnosis, ReferralData, LetterType } from '@/types'

function getSteps(lt: LetterType): { label: string; icon: string }[] {
  const common = [
    { label: 'Institusi', icon: '🏥' },
    { label: 'Pasien', icon: '👤' },
  ]
  if (lt === 'sehat') return [...common, { label: 'TTD & Cap', icon: '✍️' }]
  const diag = { label: 'Diagnosis', icon: '🔬' }
  if (lt === 'rujukan') return [...common, diag, { label: 'Rujukan', icon: '📋' }, { label: 'TTD & Cap', icon: '✍️' }]
  return [...common, diag, { label: 'Istirahat', icon: '📅' }, { label: 'TTD & Cap', icon: '✍️' }]
}

const emptyPatient: PatientData = {
  name: '', nik: '', birthPlace: '', birthDate: '',
  gender: 'Laki-laki', address: '', occupation: '',
}

const emptyReferral: ReferralData = {
  destinationInstitution: '', destinationDoctor: '', reason: '',
}

export default function CreateLetter() {
  const navigate = useNavigate()
  const [letterType, setLetterType] = useState<LetterType>('sakit')
  const steps = getSteps(letterType)
  const lastStep = steps.length - 1

  const [step, setStep] = useState(0)
  const [institutionType, setInstitutionType] = useState<InstitutionType | ''>('')
  const [city, setCity] = useState('')
  const [institution, setInstitution] = useState<Institution | null>(null)
  const [patient, setPatient] = useState<PatientData>(emptyPatient)
  const [keluhan, setKeluhan] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [icdCode, setIcdCode] = useState('')
  const [secondaryDiagnoses, setSecondaryDiagnoses] = useState<SingleDiagnosis[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [referral, setReferral] = useState<ReferralData>(emptyReferral)
  const [doctorName, setDoctorName] = useState('')
  const [sip, setSip] = useState('')
  const [signatureUrl, setSignatureUrl] = useState('')
  const [stampUrl, setStampUrl] = useState('')
  const [draftLoaded, setDraftLoaded] = useState(false)

  // Restore draft from localStorage on mount
  useEffect(() => {
    if (draftLoaded) return
    const draft = loadDraft()
    if (draft) {
      if (draft.letterType) setLetterType(draft.letterType)
      setStep(draft.step)
      setInstitutionType(draft.institutionType)
      setCity(draft.city)
      const inst = restoreInstitution(institutions, draft.institutionId)
      if (inst) setInstitution(inst)
      setPatient(draft.patient)
      setKeluhan(draft.keluhan)
      setDiagnosis(draft.diagnosis)
      setIcdCode(draft.icdCode)
      setStartDate(draft.startDate)
      setEndDate(draft.endDate)
      setDoctorName(draft.doctorName)
      setSip(draft.sip)
      if (draft.secondaryDiagnoses) setSecondaryDiagnoses(draft.secondaryDiagnoses)
    }
    setDraftLoaded(true)
  }, [draftLoaded])

  // Reset step when letter type changes
  useEffect(() => {
    setStep(0)
  }, [letterType])

  // Auto-save to localStorage on every state change
  useEffect(() => {
    if (!draftLoaded) return
    saveDraft({
      letterType, step, institutionType, city,
      institutionId: institution?.id || null,
      patient, keluhan, diagnosis, icdCode,
      startDate, endDate, doctorName, sip, secondaryDiagnoses,
    })
  }, [letterType, step, institutionType, city, institution, patient, keluhan, diagnosis, icdCode, startDate, endDate, doctorName, sip, secondaryDiagnoses, draftLoaded])

  const canProceed = () => {
    if (step === lastStep) return !!doctorName
    switch (step) {
      case 0: return !!institution
      case 1: {
        const nikOk = patient.nik.length === 0 || patient.nik.length === 16
        return patient.name && patient.nik && patient.birthDate && nikOk
      }
      case 2:
        if (letterType === 'sakit') return !!diagnosis
        if (letterType === 'rujukan') return !!diagnosis
        return false
      case 3:
        if (letterType === 'sakit') return !!(startDate && endDate)
        if (letterType === 'rujukan') return !!(referral.destinationInstitution && referral.reason)
        return false
      default: return false
    }
  }

  const handleSubmit = async () => {
    const sec = secondaryDiagnoses.filter(d => d.diagnosis || d.icdCode)
    const letterData: LetterData = {
      letterType,
      institution,
      patient,
      diagnosis: { keluhan, diagnosis, icdCode, ...(sec.length > 0 ? { secondary: sec } : {}) },
      restPeriod: { startDate, endDate },
      doctor: { name: doctorName, sip },
      ...(letterType === 'rujukan' ? { referral } : {}),
      letterNumber: generateLetterNumber(),
      createdAt: new Date().toISOString(),
    }
    clearDraft()
    await saveLetter(letterData)
    navigate('/preview', { state: { letterData, signatureUrl, stampUrl } })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-2xl">
              <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Generator Surat Keterangan Sakit</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Buat surat sakit resmi dari berbagai fasilitas kesehatan di Indonesia</p>
          <a
            href="/admin/doctors"
            onClick={(e) => { e.preventDefault(); navigate('/admin/doctors') }}
            className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 mt-1 transition-colors"
          >
            Kelola Data Dokter →
          </a>
        </div>

        {/* Letter Type Selector */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-2">Jenis Surat</label>
          <div className="flex gap-2" role="radiogroup" aria-label="Jenis surat">
            {([
              { value: 'sakit', label: 'Sakit', icon: '🤒' },
              { value: 'sehat', label: 'Sehat', icon: '💪' },
              { value: 'rujukan', label: 'Rujukan', icon: '📋' },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLetterType(opt.value)}
                role="radio"
                aria-checked={letterType === opt.value}
                aria-label={`${opt.label}${letterType === opt.value ? ' (terpilih)' : ''}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  letterType === opt.value
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-50 text-gray-500 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <StepIndicator currentStep={step} steps={steps} />

        {/* Step Content */}
        <div role="form" aria-label={steps[step]?.label ? `Form: ${steps[step].label}` : 'Form surat'} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300">
          {step === 0 && (
            <InstitutionSelector
              selectedType={institutionType}
              selectedCity={city}
              selectedInstitution={institution}
              onTypeChange={setInstitutionType}
              onCityChange={setCity}
              onInstitutionChange={setInstitution}
            />
          )}

          {step === 1 && <PatientForm data={patient} onChange={setPatient} />}

          {/* Diagnosis step — for sakit & rujukan */}
          {step === 2 && letterType !== 'sehat' && (
            <ComplaintAnalyzer
              keluhan={keluhan}
              diagnosis={diagnosis}
              icdCode={icdCode}
              secondaryDiagnoses={secondaryDiagnoses}
              onKeluhanChange={setKeluhan}
              onDiagnosisChange={setDiagnosis}
              onIcdCodeChange={setIcdCode}
              onSecondaryChange={setSecondaryDiagnoses}
            />
          )}

          {/* Rest period or Referral — step 3 */}
          {step === 3 && (
            <>
              {letterType === 'sakit' && (
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartChange={setStartDate}
                  onEndChange={setEndDate}
                />
              )}
              {letterType === 'rujukan' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <span className="text-xl">📋</span>
                    <h3 className="font-semibold">Data Rujukan</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Rumah Sakit / Faskes</label>
                    <input
                      type="text"
                      value={referral.destinationInstitution}
                      onChange={(e) => setReferral({ ...referral, destinationInstitution: e.target.value })}
                      className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nama RS / Puskesmas / Klinik tujuan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dokter Tujuan (opsional)</label>
                    <input
                      type="text"
                      value={referral.destinationDoctor}
                      onChange={(e) => setReferral({ ...referral, destinationDoctor: e.target.value })}
                      className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="dr. ... Sp. ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alasan / Indikasi Rujukan</label>
                    <textarea
                      value={referral.reason}
                      onChange={(e) => setReferral({ ...referral, reason: e.target.value })}
                      className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Alasan merujuk pasien"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* TTD & Cap — last step */}
          {step === lastStep && (
            <div className="space-y-6">
              <DoctorSelector
                institutionType={institutionType}
                doctorName={doctorName}
                sip={sip}
                onDoctorNameChange={setDoctorName}
                onSipChange={setSip}
              />

              {doctorName && (
                <>
                  <SignaturePad
                    doctorName={doctorName}
                    sip={sip}
                    onSignatureChange={setSignatureUrl}
                  />

                  {institution && (
                    <StampGenerator
                      institutionName={institution.name}
                      institutionType={institutionType as InstitutionType}
                      doctorName={doctorName}
                      sip={sip}
                      onStampChange={setStampUrl}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => step > 0 ? setStep(step - 1) : null}
            disabled={step === 0}
            aria-label={steps[step - 1]?.label ? `Kembali ke ${steps[step - 1].label}` : 'Sebelumnya'}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <div className="flex items-center gap-2" role="navigation" aria-label="Navigasi langkah">
            <span className="text-xs text-gray-400 hidden sm:inline" aria-live="polite">
              Langkah {step + 1} dari {steps.length}
            </span>

            {step < lastStep ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                aria-label={`Lanjut ke ${steps[step + 1]?.label || 'langkah berikutnya'}`}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <span className="hidden sm:inline">Selanjutnya</span> <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                aria-label="Preview dan export surat"
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" aria-hidden="true" /> <span className="hidden sm:inline">Preview Surat</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 sm:mt-6 bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <LetterHistory />
      </div>
    </main>
  )
}
