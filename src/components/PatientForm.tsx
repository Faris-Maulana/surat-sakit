import { useMemo, useState } from 'react'
import type { PatientData } from '@/types'
import { User, AlertCircle, CheckCircle } from 'lucide-react'
import { validateNik } from '@/utils/nik'

interface Props {
  data: PatientData
  onChange: (d: PatientData) => void
}

export default function PatientForm({ data, onChange }: Props) {
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const update = <K extends keyof PatientData>(key: K, value: PatientData[K]) => {
    onChange({ ...data, [key]: value })
  }

  const blur = (field: string) => {
    setTouched(prev => new Set(prev).add(field))
  }

  const nikValidation = useMemo(() => {
    if (data.nik.length < 16) return null
    return validateNik(data.nik, data.gender, data.birthDate)
  }, [data.nik, data.gender, data.birthDate])

  const fieldError = (key: keyof PatientData): string | null => {
    if (!touched.has(key)) return null
    if (!data[key] || (typeof data[key] === 'string' && !(data[key] as string).trim())) {
      if (key === 'name') return 'Nama pasien wajib diisi'
      if (key === 'nik') return 'NIK wajib diisi (16 digit)'
      if (key === 'birthDate') return 'Tanggal lahir wajib diisi'
    }
    return null
  }

  const nikError = touched.has('nik') && data.nik.length > 0 && data.nik.length < 16
    ? 'NIK harus 16 digit'
    : null

  const inputClass = (hasError: boolean, hasWarning?: boolean): string =>
    `w-full rounded-xl border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
      hasError ? 'border-red-300 bg-red-50' : hasWarning ? 'border-green-300 bg-green-50' : 'border-gray-300'
    }`

  const errorText = (msg: string) => (
    <div className="flex items-center gap-1 mt-1.5 text-xs text-red-600">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{msg}</span>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <User className="w-5 h-5" aria-hidden="true" />
        <h3 className="font-semibold">Data Pasien</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="patient-name" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            id="patient-name"
            type="text"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => blur('name')}
            className={inputClass(!!fieldError('name'))}
            placeholder="Nama pasien"
            aria-required="true"
            aria-invalid={!!fieldError('name')}
          />
          {fieldError('name') && errorText(fieldError('name')!)}
        </div>

        <div>
          <label htmlFor="patient-nik" className="block text-sm font-medium text-gray-700 mb-1">
            NIK <span className="text-red-500">*</span>
          </label>
          <input
            id="patient-nik"
            type="text"
            value={data.nik}
            onChange={(e) => update('nik', e.target.value.replace(/\D/g, '').slice(0, 16))}
            onBlur={() => blur('nik')}
            className={`w-full rounded-xl border p-3 text-sm focus:ring-2 focus:ring-blue-500 ${
              nikError || (nikValidation && !nikValidation.valid)
                ? 'border-red-300 bg-red-50'
                : nikValidation && nikValidation.valid
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300'
            }`}
            placeholder="16 digit NIK"
            maxLength={16}
            inputMode="numeric"
            aria-required="true"
            aria-invalid={!!(nikError || (nikValidation && !nikValidation.valid))}
            aria-describedby={nikValidation ? 'nik-validation-msg' : undefined}
          />
          {nikError && errorText(nikError)}
          {nikValidation && (
            <div
              id="nik-validation-msg"
              className={`flex items-center gap-1.5 mt-1.5 text-xs ${
                nikValidation.valid ? 'text-green-600' : 'text-red-600'
              }`}
              role="status"
            >
              {nikValidation.valid ? (
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              )}
              <span>{nikValidation.error || 'NIK valid'}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="patient-gender" className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
          <select
            id="patient-gender"
            value={data.gender}
            onChange={(e) => update('gender', e.target.value as 'Laki-laki' | 'Perempuan')}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div>
          <label htmlFor="patient-birthplace" className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
          <input
            id="patient-birthplace"
            type="text"
            value={data.birthPlace}
            onChange={(e) => update('birthPlace', e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tempat lahir"
          />
        </div>

        <div>
          <label htmlFor="patient-birthdate" className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Lahir <span className="text-red-500">*</span>
          </label>
          <input
            id="patient-birthdate"
            type="date"
            value={data.birthDate}
            onChange={(e) => update('birthDate', e.target.value)}
            onBlur={() => blur('birthDate')}
            className={inputClass(!!fieldError('birthDate'))}
            aria-required="true"
            aria-invalid={!!fieldError('birthDate')}
          />
          {fieldError('birthDate') && errorText(fieldError('birthDate')!)}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="patient-address" className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
          <textarea
            id="patient-address"
            value={data.address}
            onChange={(e) => update('address', e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
            placeholder="Alamat lengkap"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="patient-occupation" className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
          <input
            id="patient-occupation"
            type="text"
            value={data.occupation}
            onChange={(e) => update('occupation', e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Pekerjaan"
          />
        </div>
      </div>
    </div>
  )
}
