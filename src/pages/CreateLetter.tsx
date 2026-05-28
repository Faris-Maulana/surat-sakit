import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Send, Stethoscope } from 'lucide-react'
import StepIndicator from '@/components/StepIndicator'
import InstitutionSelector from '@/components/InstitutionSelector'
import PatientForm from '@/components/PatientForm'
import ComplaintAnalyzer from '@/components/ComplaintAnalyzer'
import DateRangePicker from '@/components/DateRangePicker'
import SignaturePad from '@/components/SignaturePad'
import StampGenerator from '@/components/StampGenerator'
import { generateLetterNumber } from '@/utils/helpers'
import type { Institution, InstitutionType, PatientData, LetterData } from '@/types'

const steps = [
  { label: 'Institusi', icon: '🏥' },
  { label: 'Pasien', icon: '👤' },
  { label: 'Diagnosis', icon: '🔬' },
  { label: 'Istirahat', icon: '📅' },
  { label: 'TTD & Cap', icon: '✍️' },
]

const emptyPatient: PatientData = {
  name: '', nik: '', birthPlace: '', birthDate: '',
  gender: 'Laki-laki', address: '', occupation: '',
}

const doctorSuggestions = [
  'dr. Andi Pratama, Sp.PD',
  'dr. Bambang Wijaya, Sp.PD',
  'dr. Siti Rahmawati, Sp.PD',
  'dr. Dewi Sartika, Sp.A',
  'dr. Rudi Hartono, Sp.PD',
  'dr. Maya Indriani',
  'dr. Hendra Gunawan, Sp.P',
  'dr. Ratna Kusuma, Sp.PD',
  'dr. Agus Wibowo',
  'dr. Fitriani Nur',
  'dr. Irwan Setiawan, Sp.PD',
  'dr. Lestari Dewi, Sp.A',
]

export default function CreateLetter() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [institutionType, setInstitutionType] = useState<InstitutionType | ''>('')
  const [city, setCity] = useState('')
  const [institution, setInstitution] = useState<Institution | null>(null)
  const [patient, setPatient] = useState<PatientData>(emptyPatient)
  const [keluhan, setKeluhan] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [icdCode, setIcdCode] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [sip, setSip] = useState('')
  const [signatureUrl, setSignatureUrl] = useState('')
  const [stampUrl, setStampUrl] = useState('')
  const [showDoctorSuggestions, setShowDoctorSuggestions] = useState(false)

  const canProceed = () => {
    switch (step) {
      case 0: return !!institution
      case 1: return patient.name && patient.nik && patient.birthDate
      case 2: return diagnosis
      case 3: return startDate && endDate
      case 4: return !!doctorName
      default: return false
    }
  }

  const handleSubmit = () => {
    const letterData: LetterData = {
      institution,
      patient,
      diagnosis: { keluhan, diagnosis, icdCode },
      restPeriod: { startDate, endDate },
      doctor: { name: doctorName, sip },
      letterNumber: generateLetterNumber(),
      createdAt: new Date().toISOString(),
    }
    navigate('/preview', { state: { letterData, signatureUrl, stampUrl } })
  }

  const handleDoctorSelect = (name: string) => {
    setDoctorName(name)
    setShowDoctorSuggestions(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-6 sm:py-10 px-3 sm:px-4">
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
        </div>

        <StepIndicator currentStep={step} steps={steps} />

        {/* Step Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300">
          <div className={`transition-opacity duration-300 ${step === 0 ? 'opacity-100' : ''}`}>
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
          </div>

          <div className={`transition-opacity duration-300 ${step === 1 ? 'opacity-100' : ''}`}>
            {step === 1 && <PatientForm data={patient} onChange={setPatient} />}
          </div>

          <div className={`transition-opacity duration-300 ${step === 2 ? 'opacity-100' : ''}`}>
            {step === 2 && (
              <ComplaintAnalyzer
                keluhan={keluhan}
                diagnosis={diagnosis}
                icdCode={icdCode}
                onKeluhanChange={setKeluhan}
                onDiagnosisChange={setDiagnosis}
                onIcdCodeChange={setIcdCode}
              />
            )}
          </div>

          <div className={`transition-opacity duration-300 ${step === 3 ? 'opacity-100' : ''}`}>
            {step === 3 && (
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartChange={setStartDate}
                onEndChange={setEndDate}
              />
            )}
          </div>

          <div className={`transition-opacity duration-300 ${step === 4 ? 'opacity-100' : ''}`}>
            {step === 4 && (
              <div className="space-y-6">
                {/* Doctor name with suggestions */}
                <div className="relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Dokter</label>
                      <input
                        type="text"
                        value={doctorName}
                        onChange={(e) => { setDoctorName(e.target.value); setShowDoctorSuggestions(true) }}
                        onFocus={() => setShowDoctorSuggestions(true)}
                        className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nama dokter pemeriksa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nomor SIP</label>
                      <input
                        type="text"
                        value={sip}
                        onChange={(e) => setSip(e.target.value)}
                        className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="SIP. 12345/DKK/2026"
                      />
                    </div>
                  </div>

                  {showDoctorSuggestions && doctorName.length < 2 && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                      <p className="text-xs text-blue-600 mb-2 font-medium">Pilih nama dokter (contoh):</p>
                      <div className="flex flex-wrap gap-1.5">
                        {doctorSuggestions.map((name) => (
                          <button
                            key={name}
                            onClick={() => handleDoctorSelect(name)}
                            className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-colors whitespace-nowrap"
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <SignaturePad
                  doctorName={doctorName}
                  sip={sip}
                  onDoctorNameChange={(v) => { setDoctorName(v); setShowDoctorSuggestions(v.length < 2) }}
                  onSipChange={setSip}
                  onSignatureChange={setSignatureUrl}
                />

                {institution && (
                  <StampGenerator
                    institutionName={institution.name}
                    sip={sip}
                    onStampChange={setStampUrl}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => step > 0 ? setStep(step - 1) : null}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">
              Langkah {step + 1} dari {steps.length}
            </span>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <span className="hidden sm:inline">Selanjutnya</span> <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" /> <span className="hidden sm:inline">Preview Surat</span>
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
      </div>
    </div>
  )
}
