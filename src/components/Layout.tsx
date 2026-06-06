import { useNavigate, useLocation } from 'react-router-dom'
import { FileText, Stethoscope, Users, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', label: 'Buat Surat', icon: FileText },
  { path: '/admin/doctors', label: 'Data Dokter', icon: Users },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenu, setMobileMenu] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 bg-halo-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800 tracking-tight">Sehat<span className="text-halo-500">Kita</span></span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-halo-50 text-halo-600'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="sm:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label={mobileMenu ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenu && (
          <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setMobileMenu(false) }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-halo-50 text-halo-600'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              )
            })}
          </div>
        )}
      </header>

      {/* Page content */}
      {children}

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Stethoscope className="w-4 h-4 text-halo-400" />
            <span>SehatKita — Generator Surat Keterangan Sehat & Sakit</span>
          </div>
          <p className="text-xs text-gray-400">
            Data dummy untuk simulasi — bukan surat resmi
          </p>
        </div>
      </footer>
    </div>
  )
}
