import { Component } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-[300px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-14 h-14 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Terjadi Kesalahan</h2>
            <p className="text-sm text-gray-500 mb-4">
              {this.state.error?.message || 'Terjadi kesalahan yang tidak terduga.'}
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-halo-500 text-white rounded-xl text-sm font-semibold hover:bg-halo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
            >
              <RefreshCw className="w-4 h-4" /> Coba Lagi
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
