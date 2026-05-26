interface StepIndicatorProps {
  currentStep: number
  steps: { label: string; icon: string }[]
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              i <= currentStep
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <span>{step.icon}</span>
            <span className="hidden sm:inline">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 h-0.5 ${i < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
