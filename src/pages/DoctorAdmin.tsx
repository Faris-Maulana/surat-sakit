import { useState, useEffect, useMemo, useCallback } from 'react'
import { doctorService } from '@/services/doctorService'
import { generateSip, validateSip, formatSip } from '@/utils/sip'
import { Plus, Edit3, Trash2, Check, X, AlertTriangle, Loader2, ShieldAlert, LogIn, UserRound } from 'lucide-react'
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

const AUTHORIZED_EMAILS = [
  'maulanafaris016@gmail.com',
  '4519210102@univpancasila.ac.id',
]

function AuthGate({ onAuthorized }: { onAuthorized: () => void }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (AUTHORIZED_EMAILS.includes(email.trim().toLowerCase())) {
        sessionStorage.setItem('doctor-admin-auth', email.trim().toLowerCase())
        onAuthorized()
      } else {
        setError('Email tidak terdaftar sebagai admin dokter.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-md w-full text-center">
        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7 text-amber-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-1">Akses Terbatas</h1>
        <p className="text-sm text-gray-400 mb-6">
          Masukkan email developer untuk melanjutkan.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            autoFocus
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200"
          />
          {error && <p className="text-xs text-red-500 text-left">{error}</p>}
          <button
            type="submit"
            disabled={!email.trim() || loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-halo-500 text-white rounded-xl text-sm font-semibold hover:bg-halo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] w-full"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            <span>{loading ? 'Memverifikasi...' : 'Masuk'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default function DoctorAdmin() {
  const [authorized, setAuthorized] = useState(
    () => !!sessionStorage.getItem('doctor-admin-auth')
  )
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

  if (!authorized) return <AuthGate onAuthorized={() => setAuthorized(true)} />

  return (
    <main className="max-w-5xl mx-auto px-4 pt-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Data Dokter</h1>
          <p className="text-sm text-gray-400 mt-0.5">Kelola data dokter dan nomor SIP</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-halo-500 text-white rounded-xl text-sm font-semibold hover:bg-halo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]">
          <Plus className="w-4 h-4" /> Tambah Dokter
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(['all', ...types.map(t => t.value)] as const).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === key
                ? 'bg-halo-500 text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-200 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-200'
            }`}
          >
            {key === 'all' ? 'Semua' : types.find(t => t.value === key)?.label}{' '}
            <span className={`text-xs ml-1 ${filter === key ? 'text-halo-200' : 'text-gray-400'}`}>
              ({countByType[key as keyof typeof countByType] || 0})
            </span>
          </button>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                {editId ? 'Edit Dokter' : 'Tambah Dokter Baru'}
              </h2>
              <button onClick={() => setShowForm(false)} className="inline-flex items-center justify-center gap-2 px-3 py-2 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 p-1.5" aria-label="Tutup">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Nama Lengkap <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200"
                  placeholder="dr. ... Sp. ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Tipe Institusi</label>
                <select
                  value={form.institutionType}
                  onChange={e => handleTypeChange(e.target.value as InstitutionType)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200 appearance-none"
                >
                  {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Spesialisasi</label>
                <input
                  type="text"
                  value={form.specialization}
                  onChange={e => setForm(prev => ({ ...prev, specialization: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200"
                  placeholder="Dokter Umum / Spesialis ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">STR</label>
                <input
                  type="text"
                  value={form.str}
                  onChange={e => setForm(prev => ({ ...prev, str: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-halo-300 focus:border-halo-400 transition-all duration-200"
                  placeholder="STR. XXXXX/KKI/2026"
                />
              </div>

              {!editId && (
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Nomor SIP yang akan dibuat:</p>
                  <p className="text-sm font-mono text-halo-700">{formatSip(sipPreview)}</p>
                  <button
                    onClick={handleSipCheck}
                    className="mt-2 text-xs text-halo-500 hover:text-halo-600 font-medium"
                  >
                    Validasi
                  </button>
                  {sipValid && (
                    <div className={`flex items-center gap-1 mt-1.5 text-xs ${sipValid.valid ? 'text-green-600' : 'text-red-500'}`}>
                      {sipValid.valid ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      <span>{sipValid.valid ? 'SIP valid' : sipValid.error}</span>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={!form.name.trim() || submitting}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-halo-500 text-white rounded-xl text-sm font-semibold hover:bg-halo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] w-full"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {editId ? 'Simpan Perubahan' : 'Tambah Dokter'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Doctor List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {loading ? (
          <div className="p-10 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" /> Memuat data dokter...
          </div>
        ) : doctors.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">
            <UserRound className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            Tidak ada dokter untuk filter ini.
          </div>
        ) : (
          doctors.map(doc => {
            const expired = new Date(doc.expiryDate) <= new Date()
            const nearExpiry = !expired && new Date(doc.expiryDate) <= new Date(new Date().setMonth(new Date().getMonth() + 6))
            return (
              <div key={doc.id} className="flex items-start gap-4 p-4 sm:p-5 hover:bg-gray-50/50 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                  expired ? 'bg-red-50 text-red-600' : nearExpiry ? 'bg-amber-50 text-amber-600' : 'bg-halo-50 text-halo-600'
                }`}>
                  {doc.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm text-gray-800">{doc.name}</p>
                    {expired && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-700">Expired</span>}
                    {nearExpiry && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700">Segera Expired</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <p className="text-xs text-gray-400">{doc.specialization}</p>
                    <p className="text-xs font-mono text-gray-300">{doc.sip}</p>
                    <p className="text-xs text-gray-400">{doc.str}</p>
                  </div>
                  <p className="text-[10px] text-gray-300 mt-1">
                    Berlaku hingga: {doc.expiryDate}
                  </p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => openEdit(doc)}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 p-2 text-gray-400 hover:text-halo-500"
                    aria-label={`Edit ${doc.name}`}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id, doc.name)}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 p-2 text-gray-400 hover:text-red-500"
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
    </main>
  )
}
