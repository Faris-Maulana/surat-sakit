import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ToastContainer from '@/components/Toast'
import ErrorBoundary from '@/components/ErrorBoundary'
import Layout from '@/components/Layout'

const CreateLetter = lazy(() => import('@/pages/CreateLetter'))
const PreviewLetter = lazy(() => import('@/pages/PreviewLetter'))
const DoctorAdmin = lazy(() => import('@/pages/DoctorAdmin'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-halo-200 border-t-halo-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-400">Memuat...</p>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<CreateLetter />} />
          <Route path="/preview" element={<PreviewLetter />} />
          <Route path="/admin/doctors" element={<DoctorAdmin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  )
}
