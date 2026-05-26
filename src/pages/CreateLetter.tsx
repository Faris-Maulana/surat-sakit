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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Stethoscope className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Generator Surat Keterangan Sakit</h1>
          </div>
          <p className="text-sm text-gray-500">Buat surat sakit resmi dari berbagai fasilitas kesehatan</p>
        </div>

        <StepIndicator currentStep={step} steps={steps} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
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

          {step === 3 && (
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartChange={setStartDate}
              onEndChange={setEndDate}
            />
          )}

          {step === 4 && (
            <div className="space-y-6">
              <SignaturePad
                doctorName={doctorName}
                sip={sip}
                onDoctorNameChange={setDoctorName}
                onSipChange={setSip}
                onSignatureChange={setSignatureUrl}
              />
              {institution && (
                <StampGenerator
                  institutionName={institution.name}
                  onStampChange={setStampUrl}
                />
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => step > 0 ? setStep(step - 1) : null}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white"
          >
            <ArrowLeft className="w-4 h-4" /> Sebelumnya
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Selanjutnya <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" /> Lihat Preview Surat
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
