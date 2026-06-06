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

  const inputCls = (hasError: boolean, hasWarning?: boolean): string =>
    hasError ? 'w-full rounded-xl border border-red-300 bg-red-50/50 px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all duration-200' : hasWarning ? 'w-full rounded-xl border border-green-300 bg-green-50/50 px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all duration-200' : 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200'

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-halo-600 mb-4">
        <User className="w-5 h-5" aria-hidden="true" />
        <h3 className="font-semibold">Data Pasien</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label htmlFor="patient-name" className="block text-sm font-medium text-gray-600 mb-1.5">
            Nama Lengkap <span className="text-red-400">*</span>
          </label>
          <input
            id="patient-name"
            type="text"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => blur('name')}
            className={inputCls(!!fieldError('name'))}
            placeholder="Nama lengkap pasien"
            aria-required="true"
            aria-invalid={!!fieldError('name')}
          />
          {fieldError('name') && (
            <div className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{fieldError('name')}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="patient-nik" className="block text-sm font-medium text-gray-600 mb-1.5">
            NIK <span className="text-red-400">*</span>
          </label>
          <input
            id="patient-nik"
            type="text"
            value={data.nik}
            onChange={(e) => update('nik', e.target.value.replace(/\D/g, '').slice(0, 16))}
            onBlur={() => blur('nik')}
            className={
              nikError || (nikValidation && !nikValidation.valid)
                ? 'w-full rounded-xl border border-red-300 bg-red-50/50 px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all duration-200'
                : nikValidation && nikValidation.valid
                  ? 'w-full rounded-xl border border-green-300 bg-green-50/50 px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-all duration-200'
                  : 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200'
            }
            placeholder="16 digit NIK"
            maxLength={16}
            inputMode="numeric"
            aria-required="true"
            aria-invalid={!!(nikError || (nikValidation && !nikValidation.valid))}
            aria-describedby={nikValidation ? 'nik-validation-msg' : undefined}
          />
          {nikError && (
            <div className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{nikError}</span>
            </div>
          )}
          {nikValidation && (
            <div
              id="nik-validation-msg"
              className={`flex items-center gap-1.5 mt-1.5 text-xs ${nikValidation.valid ? 'text-green-600' : 'text-red-500'}`}
              role="status"
            >
              {nikValidation.valid ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />}
              <span>{nikValidation.error || 'NIK valid'}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="patient-gender" className="block text-sm font-medium text-gray-600 mb-1.5">Jenis Kelamin</label>
          <select
            id="patient-gender"
            value={data.gender}
            onChange={(e) => update('gender', e.target.value as 'Laki-laki' | 'Perempuan')}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200 appearance-none"
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div>
          <label htmlFor="patient-birthplace" className="block text-sm font-medium text-gray-600 mb-1.5">Tempat Lahir</label>
          <input
            id="patient-birthplace"
            type="text"
            value={data.birthPlace}
            onChange={(e) => update('birthPlace', e.target.value)}
            className="input"
            placeholder="Tempat lahir"
          />
        </div>

        <div>
          <label htmlFor="patient-birthdate" className="block text-sm font-medium text-gray-600 mb-1.5">
            Tanggal Lahir <span className="text-red-400">*</span>
          </label>
          <input
            id="patient-birthdate"
            type="date"
            value={data.birthDate}
            onChange={(e) => update('birthDate', e.target.value)}
            onBlur={() => blur('birthDate')}
            className={inputCls(!!fieldError('birthDate'))}
            aria-required="true"
            aria-invalid={!!fieldError('birthDate')}
          />
          {fieldError('birthDate') && (
            <div className="flex items-center gap-1 mt-1.5 text-xs text-red-500">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{fieldError('birthDate')}</span>
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="patient-address" className="block text-sm font-medium text-gray-600 mb-1.5">Alamat</label>
          <textarea
            id="patient-address"
            value={data.address}
            onChange={(e) => update('address', e.target.value)}
            className="input"
            rows={2}
            placeholder="Alamat lengkap pasien"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="patient-occupation" className="block text-sm font-medium text-gray-600 mb-1.5">Pekerjaan</label>
          <input
            id="patient-occupation"
            type="text"
            value={data.occupation}
            onChange={(e) => update('occupation', e.target.value)}
            className="input"
            placeholder="Pekerjaan pasien"
          />
        </div>
      </div>
    </div>
  )
}
