import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CreateLetter from '@/pages/CreateLetter'
import PreviewLetter from '@/pages/PreviewLetter'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateLetter />} />
        <Route path="/preview" element={<PreviewLetter />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
