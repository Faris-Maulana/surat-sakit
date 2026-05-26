import type { PatientData } from '@/types'
import { User } from 'lucide-react'

interface Props {
  data: PatientData
  onChange: (d: PatientData) => void
}

export default function PatientForm({ data, onChange }: Props) {
  const update = <K extends keyof PatientData>(key: K, value: PatientData[K]) => {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-600 mb-4">
        <User className="w-5 h-5" />
        <h3 className="font-semibold">Data Pasien</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nama pasien"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
          <input
            type="text"
            value={data.nik}
            onChange={(e) => update('nik', e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="16 digit NIK"
            maxLength={16}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
          <select
            value={data.gender}
            onChange={(e) => update('gender', e.target.value as 'Laki-laki' | 'Perempuan')}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
          <input
            type="text"
            value={data.birthPlace}
            onChange={(e) => update('birthPlace', e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tempat lahir"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
          <input
            type="date"
            value={data.birthDate}
            onChange={(e) => update('birthDate', e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
          <textarea
            value={data.address}
            onChange={(e) => update('address', e.target.value)}
            className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
            placeholder="Alamat lengkap"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
          <input
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
