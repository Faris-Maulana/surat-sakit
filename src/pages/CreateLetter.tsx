import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Send, Stethoscope, Activity, HeartPulse, Cross } from 'lucide-react'
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

const letterTypes = [
  { value: 'sakit' as LetterType, label: 'Surat Sakit', desc: 'Surat keterangan sakit untuk pasien rawat jalan', icon: Activity },
  { value: 'sehat' as LetterType, label: 'Surat Sehat', desc: 'Surat keterangan sehat jasmani dan rohani', icon: HeartPulse },
  { value: 'rujukan' as LetterType, label: 'Surat Rujukan', desc: 'Surat rujukan ke fasilitas kesehatan lain', icon: Cross },
]

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
  const [showForm, setShowForm] = useState(false)

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

  useEffect(() => {
    setStep(0)
    setShowForm(false)
  }, [letterType])

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

  // Letter type selection screen
  if (!showForm) {
    return (
      <main className="max-w-2xl mx-auto px-4 pt-8 sm:pt-12 pb-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-halo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-halo-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">Buat Surat Keterangan</h1>
          <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
            Pilih jenis surat yang ingin dibuat. Isi data pasien, diagnosis, dan dapatkan dokumen siap cetak.
          </p>
        </div>

        <div className="grid gap-4">
          {letterTypes.map(lt => {
            const Icon = lt.icon
            const selected = letterType === lt.value
            return (
              <button
                key={lt.value}
                onClick={() => { setLetterType(lt.value); setShowForm(true) }}
                className={`bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-200 flex items-start gap-4 sm:gap-5 p-5 sm:p-6 text-left ${
                  selected ? 'bg-white rounded-2xl border border-halo-400 shadow-sm ring-2 ring-halo-200 bg-halo-50/30' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selected ? 'bg-halo-500 text-white' : 'bg-halo-50 text-halo-500'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-base">{lt.label}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">{lt.desc}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-2 ${
                  selected ? 'border-halo-500 bg-halo-500' : 'border-gray-200'
                }`}>
                  {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/admin/doctors')}
            className="text-sm text-halo-500 hover:text-halo-600 transition-colors font-medium"
          >
            Kelola Data Dokter →
          </button>
        </div>

        <LetterHistory />
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-4 pt-6 pb-12">
      {/* Back button */}
      <button
        onClick={() => setShowForm(false)}
        className="inline-flex items-center justify-center gap-2 px-3 py-2 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Ganti Jenis Surat
      </button>

      <StepIndicator currentStep={step} steps={steps} />

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7 mb-5 transition-all duration-300">
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
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Tujuan Rumah Sakit / Faskes</label>
                  <input
                    type="text"
                    value={referral.destinationInstitution}
                    onChange={(e) => setReferral({ ...referral, destinationInstitution: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200"
                    placeholder="Nama RS / Puskesmas / Klinik tujuan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Dokter Tujuan <span className="text-gray-400 font-normal">(opsional)</span></label>
                  <input
                    type="text"
                    value={referral.destinationDoctor}
                    onChange={(e) => setReferral({ ...referral, destinationDoctor: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200"
                    placeholder="dr. ... Sp. ..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Alasan / Indikasi Rujukan</label>
                  <textarea
                    value={referral.reason}
                    onChange={(e) => setReferral({ ...referral, reason: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200"
                    rows={3}
                    placeholder="Alasan merujuk pasien"
                  />
                </div>
              </div>
            )}
          </>
        )}

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
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:inline">
            Langkah {step + 1} dari {steps.length}
          </span>

          {step < lastStep ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-halo-500 text-white rounded-xl text-sm font-semibold hover:bg-halo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
            >
              <span className="hidden sm:inline">Selanjutnya</span> <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-halo-500 text-white rounded-xl text-sm font-semibold hover:bg-halo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
            >
              <Send className="w-4 h-4" /> <span className="hidden sm:inline">Preview Surat</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5 bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-halo-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
    </main>
  )
}
