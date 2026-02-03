import type { Step } from '../constants/characterCreation'

interface WizardStepsProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (stepId: number) => void
  allowNavigation?: boolean
}

/**
 * Wizard Steps Progress Indicator
 * Shows the user's progress through the character creation flow
 */
export function WizardSteps({
  steps,
  currentStep,
  onStepClick,
  allowNavigation = false,
}: WizardStepsProps) {
  const handleStepClick = (stepId: number) => {
    if (allowNavigation && onStepClick && stepId < currentStep) {
      onStepClick(stepId)
    }
  }

  return (
    <nav aria-label="Character creation progress" className="mb-8">
      {/* Desktop view */}
      <ol className="hidden md:flex items-center justify-center space-x-4">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep
          const isClickable = allowNavigation && isCompleted

          return (
            <li key={step.id} className="flex items-center">
              {index > 0 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    isCompleted ? 'bg-dnd-gold' : 'bg-gray-700'
                  }`}
                />
              )}
              <button
                type="button"
                onClick={() => handleStepClick(step.id)}
                disabled={!isClickable}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2 focus:ring-offset-gray-900
                           ${isClickable ? 'cursor-pointer hover:bg-gray-800' : 'cursor-default'}
                           ${isCurrent ? 'bg-gray-800 border border-dnd-gold' : ''}
                           ${isCompleted && !isCurrent ? 'opacity-80' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                             ${isCompleted ? 'bg-dnd-gold text-gray-900' : ''}
                             ${isCurrent ? 'bg-dnd-gold text-gray-900' : ''}
                             ${!isCompleted && !isCurrent ? 'bg-gray-700 text-gray-400' : ''}`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </span>
                <span
                  className={`text-sm font-medium ${
                    isCurrent ? 'text-dnd-gold' : isCompleted ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      {/* Mobile view - compact */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm font-medium text-dnd-gold">
            {steps.find((s) => s.id === currentStep)?.name}
          </span>
        </div>
        <div className="flex space-x-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 h-2 rounded-full transition-colors duration-200 ${
                step.id <= currentStep ? 'bg-dnd-gold' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

// Re-export for backward compatibility
export { CHARACTER_CREATION_STEPS } from '../constants/characterCreation'
export type { Step } from '../constants/characterCreation'
