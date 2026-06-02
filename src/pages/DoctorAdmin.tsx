import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { doctorService } from '@/services/doctorService'
import { generateSip, validateSip, formatSip } from '@/utils/sip'
import { ArrowLeft, Plus, Edit3, Trash2, Check, X, AlertTriangle, Loader2 } from 'lucide-react'
import type { DoctorEntry, InstitutionType } from '@/types'

const types: { value: InstitutionType; label: string }[] = [
  { value: 'rumah_sakit', label: 'Rumah Sakit' },
  { value: 'puskesmas', label: 'Puskesmas' },
  { value: 'klinik', label: 'Klinik' },
]

interface FormData {
  name: string
  str: string
  specialization: string
  institutionType: InstitutionType
}

const emptyForm: FormData = { name: '', str: '', specialization: '', institutionType: 'rumah_sakit' }

export default function DoctorAdmin() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<InstitutionType | 'all'>('all')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [sipPreview, setSipPreview] = useState('')
  const [sipValid, setSipValid] = useState<{ valid: boolean; error?: string } | null>(null)
  const [allDoctors, setAllDoctors] = useState<DoctorEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const loadDoctors = useCallback(async () => {
    setLoading(true)
    try {
      const data = await doctorService.getDoctors('')
      setAllDoctors(data)
    } catch {
      // fallback handled inside service
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDoctors()
  }, [loadDoctors])

  const doctors = useMemo(() => {
    if (filter === 'all') return [...allDoctors].sort((a, b) => a.name.localeCompare(b.name))
    return allDoctors.filter(d => d.institutionType === filter).sort((a, b) => a.name.localeCompare(b.name))
  }, [allDoctors, filter])

  const countByType = useMemo(() => ({
    all: allDoctors.length,
    rumah_sakit: allDoctors.filter(d => d.institutionType === 'rumah_sakit').length,
    puskesmas: allDoctors.filter(d => d.institutionType === 'puskesmas').length,
    klinik: allDoctors.filter(d => d.institutionType === 'klinik').length,
  }), [allDoctors])

  const openAdd = () => {
    setEditId(null)
    setForm(emptyForm)
    setSipPreview(generateSip('rumah_sakit'))
    setSipValid(null)
    setShowForm(true)
  }

  const openEdit = (doc: DoctorEntry) => {
    setEditId(doc.id)
    setForm({
      name: doc.name,
      str: doc.str,
      specialization: doc.specialization,
      institutionType: doc.institutionType,
    })
    setSipPreview(doc.sip)
    const v = validateSip(doc.sip)
    setSipValid(v)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) return
    setSubmitting(true)
    try {
      if (editId) {
        await doctorService.updateDoctor(editId, {
          name: form.name.trim(),
          str: form.str.trim(),
          specialization: form.specialization.trim(),
        })
      } else {
        await doctorService.addDoctor({
          name: form.name.trim(),
          str: form.str.trim(),
          specialization: form.specialization.trim(),
          institutionType: form.institutionType,
        })
      }
      setShowForm(false)
      await loadDoctors()
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Hapus dokter ${name}?`)) return
    await doctorService.deleteDoctor(id)
    await loadDoctors()
  }

  const handleTypeChange = (type: InstitutionType) => {
    setForm(prev => ({ ...prev, institutionType: type }))
    const newSip = generateSip(type)
    setSipPreview(newSip)
    setSipValid(null)
  }

  const handleSipCheck = () => {
    const v = validateSip(sipPreview)
    setSipValid(v)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              aria-label="Kembali ke beranda"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Data Dokter</h1>
              <p className="text-xs text-gray-400">Kelola data dokter dan nomor SIP</p>
            </div>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Tambah Dokter
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {(['all', ...types.map(t => t.value)] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {key === 'all' ? 'Semua' : types.find(t => t.value === key)?.label}{' '}
              <span className={`text-xs ml-1 ${filter === key ? 'text-blue-200' : 'text-gray-400'}`}>
                ({countByType[key as keyof typeof countByType] || 0})
              </span>
            </button>
          ))}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editId ? 'Edit Dokter' : 'Tambah Dokter Baru'}
                </h2>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-lg" aria-label="Tutup">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="dr. ... Sp. ..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Institusi</label>
                  <select
                    value={form.institutionType}
                    onChange={e => handleTypeChange(e.target.value as InstitutionType)}
                    className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Spesialisasi</label>
                  <input
                    type="text"
                    value={form.specialization}
                    onChange={e => setForm(prev => ({ ...prev, specialization: e.target.value }))}
                    className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Dokter Umum / Spesialis ..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">STR</label>
                  <input
                    type="text"
                    value={form.str}
                    onChange={e => setForm(prev => ({ ...prev, str: e.target.value }))}
                    className="w-full rounded-xl border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="STR. XXXXX/KKI/2026"
                  />
                </div>

                {!editId && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Nomor SIP yang akan dibuat:</p>
                    <p className="text-sm font-mono text-gray-800">{formatSip(sipPreview)}</p>
                    <button
                      onClick={handleSipCheck}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                    >
                      Validasi
                    </button>
                    {sipValid && (
                      <div className={`flex items-center gap-1 mt-1 text-xs ${sipValid.valid ? 'text-green-600' : 'text-red-600'}`}>
                        {sipValid.valid ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        <span>{sipValid.valid ? 'SIP valid' : sipValid.error}</span>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handleSave}
                  disabled={!form.name.trim() || submitting}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editId ? 'Simpan Perubahan' : 'Tambah Dokter'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Doctor List */}
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {loading ? (
            <div className="p-8 flex items-center justify-center gap-2 text-sm text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" /> Memuat data dokter...
            </div>
          ) : doctors.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400">
              Tidak ada dokter untuk filter ini.
            </div>
          ) : (
            doctors.map(doc => {
              const expired = new Date(doc.expiryDate) <= new Date()
              const nearExpiry = !expired && new Date(doc.expiryDate) <= new Date(new Date().setMonth(new Date().getMonth() + 6))
              return (
                <div key={doc.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                    expired ? 'bg-red-100 text-red-600' : nearExpiry ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {doc.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm text-gray-800">{doc.name}</p>
                      {expired && <span className="text-[10px] font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded">EXPIRED</span>}
                      {nearExpiry && <span className="text-[10px] font-medium text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">SEGARA EXPIRED</span>}
                    </div>
                    <p className="text-xs text-gray-400">{doc.specialization}</p>
                    <p className="text-xs font-mono text-gray-400 mt-0.5">{doc.sip}</p>
                    <p className="text-xs text-gray-400">{doc.str}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Berlaku hingga: {doc.expiryDate} | Dibuat: {doc.createdAt}
                    </p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => openEdit(doc)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      aria-label={`Edit ${doc.name}`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id, doc.name)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label={`Hapus ${doc.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </main>
  )
}
