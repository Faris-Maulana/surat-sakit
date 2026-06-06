import { Check } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
  steps: { label: string; icon: string }[]
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => {
        const done = i < currentStep
        const active = i === currentStep
        return (
          <div key={i} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  done
                    ? 'bg-halo-500 text-white'
                    : active
                      ? 'bg-halo-500 text-white shadow-md shadow-halo-200'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : <span>{step.icon}</span>}
              </div>
              <span className={`text-[10px] mt-1.5 font-medium whitespace-nowrap transition-colors ${
                active ? 'text-halo-600' : done ? 'text-halo-500' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            {/* Connecting line */}
            {i < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 rounded-full transition-colors duration-300 ${
                i < currentStep ? 'bg-halo-400' : 'bg-gray-200'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
