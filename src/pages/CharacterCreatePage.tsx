import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../stores/characterStore'
import { WizardSteps, CHARACTER_CREATION_STEPS } from '../components/WizardSteps'
import { CharacterDetailsForm } from '../components/CharacterDetailsForm'

/**
 * Map creation step to step number for WizardSteps component
 */
const STEP_TO_NUMBER: Record<string, number> = {
  details: 1,
  race: 2,
  class: 3,
  stats: 4,
  spells: 5,
  equipment: 6,
  review: 7,
}

export function CharacterCreatePage() {
  const navigate = useNavigate()
  const {
    currentCharacter,
    creationStep,
    createNewCharacter,
    updateCharacterDetails,
    nextStep,
    prevStep,
    setCreationStep,
    saveCharacter,
  } = useCharacterStore()

  // Initialize new character if none exists
  useEffect(() => {
    if (!currentCharacter) {
      createNewCharacter()
    }
  }, [currentCharacter, createNewCharacter])

  const currentStepNumber = STEP_TO_NUMBER[creationStep] ?? 1

  const handleStepClick = (stepId: number) => {
    const stepName = Object.entries(STEP_TO_NUMBER).find(([, num]) => num === stepId)?.[0]
    if (stepName) {
      setCreationStep(stepName as typeof creationStep)
    }
  }

  const handleDetailsSubmit = (details: {
    name: string
    age: string
    height: string
    weight: string
    backstory: string
    playerName: string
  }) => {
    updateCharacterDetails(details)
    nextStep()
  }

  const handleBack = () => {
    if (creationStep === 'details') {
      navigate('/')
    } else {
      prevStep()
    }
  }

  const handleFinalize = () => {
    saveCharacter()
    if (currentCharacter) {
      navigate(`/character/${currentCharacter.id}`)
    }
  }

  // Render the current step content
  const renderStep = () => {
    switch (creationStep) {
      case 'details':
        return (
          <CharacterDetailsForm
            initialValues={currentCharacter ? {
              name: currentCharacter.name,
              age: currentCharacter.age,
              height: currentCharacter.height,
              weight: currentCharacter.weight,
              backstory: currentCharacter.backstory,
              playerName: currentCharacter.playerName,
            } : undefined}
            onSubmit={handleDetailsSubmit}
            onBack={() => navigate('/')}
          />
        )

      case 'race':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-dnd-gold mb-2">Choose Your Race</h2>
              <p className="text-gray-400">
                Select a race for your character. Each race provides unique traits and abilities.
              </p>
            </div>
            <div className="card bg-gray-800 border border-gray-700 p-8 text-center">
              <p className="text-gray-400 mb-4">Race selection coming in Phase 3</p>
              <p className="text-gray-500 text-sm">Available races: Drow, Tiefling (more coming soon)</p>
            </div>
            <div className="flex justify-between pt-6 mt-6 border-t border-gray-700">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                         hover:border-gray-500 rounded-lg transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-dnd-gold text-gray-900 rounded-lg font-semibold
                         hover:bg-yellow-500 transition-colors duration-200"
              >
                Next: Choose Class
              </button>
            </div>
          </div>
        )

      case 'class':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-dnd-gold mb-2">Choose Your Class</h2>
              <p className="text-gray-400">
                Select a class that defines your character's abilities and role.
              </p>
            </div>
            <div className="card bg-gray-800 border border-gray-700 p-8 text-center">
              <p className="text-gray-400 mb-4">Class selection coming in Phase 4</p>
              <p className="text-gray-500 text-sm">Available classes: Fighter, Warlock (more coming soon)</p>
            </div>
            <div className="flex justify-between pt-6 mt-6 border-t border-gray-700">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                         hover:border-gray-500 rounded-lg transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-dnd-gold text-gray-900 rounded-lg font-semibold
                         hover:bg-yellow-500 transition-colors duration-200"
              >
                Next: Allocate Stats
              </button>
            </div>
          </div>
        )

      case 'stats':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-dnd-gold mb-2">Allocate Ability Scores</h2>
              <p className="text-gray-400">
                Determine your character's core abilities using one of three methods.
              </p>
            </div>
            <div className="card bg-gray-800 border border-gray-700 p-8 text-center">
              <p className="text-gray-400 mb-4">Stat allocation coming in Phase 5</p>
              <p className="text-gray-500 text-sm">Methods: Standard Array, Point Buy, Roll (4d6 drop lowest)</p>
            </div>
            <div className="flex justify-between pt-6 mt-6 border-t border-gray-700">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                         hover:border-gray-500 rounded-lg transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-dnd-gold text-gray-900 rounded-lg font-semibold
                         hover:bg-yellow-500 transition-colors duration-200"
              >
                Next: Choose Spells
              </button>
            </div>
          </div>
        )

      case 'spells':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-dnd-gold mb-2">Select Spells</h2>
              <p className="text-gray-400">
                Choose cantrips and spells for your character (if applicable).
              </p>
            </div>
            <div className="card bg-gray-800 border border-gray-700 p-8 text-center">
              <p className="text-gray-400 mb-4">Spell selection coming in Phase 6</p>
              <p className="text-gray-500 text-sm">Includes: Cantrips, Leveled Spells, Expanded Spell Lists</p>
            </div>
            <div className="flex justify-between pt-6 mt-6 border-t border-gray-700">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                         hover:border-gray-500 rounded-lg transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-dnd-gold text-gray-900 rounded-lg font-semibold
                         hover:bg-yellow-500 transition-colors duration-200"
              >
                Next: Equipment
              </button>
            </div>
          </div>
        )

      case 'equipment':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-dnd-gold mb-2">Choose Equipment</h2>
              <p className="text-gray-400">
                Select your starting equipment, weapons, and armor.
              </p>
            </div>
            <div className="card bg-gray-800 border border-gray-700 p-8 text-center">
              <p className="text-gray-400 mb-4">Equipment selection coming in Phase 7</p>
              <p className="text-gray-500 text-sm">Includes: Starting Packs, Weapons, Armor, Gear</p>
            </div>
            <div className="flex justify-between pt-6 mt-6 border-t border-gray-700">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                         hover:border-gray-500 rounded-lg transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-dnd-gold text-gray-900 rounded-lg font-semibold
                         hover:bg-yellow-500 transition-colors duration-200"
              >
                Next: Review
              </button>
            </div>
          </div>
        )

      case 'review':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-dnd-gold mb-2">Review & Finalize</h2>
              <p className="text-gray-400">
                Review your character before finalizing.
              </p>
            </div>

            {/* Character Summary */}
            {currentCharacter && (
              <div className="card bg-gray-800 border border-gray-700 p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {currentCharacter.name || 'Unnamed Character'}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Player:</span>{' '}
                    <span className="text-gray-300">
                      {currentCharacter.playerName || 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Age:</span>{' '}
                    <span className="text-gray-300">
                      {currentCharacter.age || 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Height:</span>{' '}
                    <span className="text-gray-300">
                      {currentCharacter.height || 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Weight:</span>{' '}
                    <span className="text-gray-300">
                      {currentCharacter.weight || 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Race:</span>{' '}
                    <span className="text-gray-300">
                      {currentCharacter.race?.name || 'Not selected'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Class:</span>{' '}
                    <span className="text-gray-300">
                      {currentCharacter.class?.name || 'Not selected'}
                    </span>
                  </div>
                </div>

                {currentCharacter.backstory && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <span className="text-gray-500 text-sm">Backstory:</span>
                    <p className="text-gray-300 mt-1 text-sm whitespace-pre-wrap">
                      {currentCharacter.backstory}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="card bg-gray-800 border border-gray-700 p-8 text-center mb-6">
              <p className="text-gray-400 mb-4">Full character sheet preview coming in Phase 8</p>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-700">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                         hover:border-gray-500 rounded-lg transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={handleFinalize}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold
                         hover:bg-green-500 transition-colors duration-200"
              >
                Save Character
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!currentCharacter) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <WizardSteps
        steps={CHARACTER_CREATION_STEPS}
        currentStep={currentStepNumber}
        onStepClick={handleStepClick}
        allowNavigation={true}
      />

      {/* Step Content */}
      {renderStep()}
    </div>
  )
}
