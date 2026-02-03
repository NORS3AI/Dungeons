import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '../stores/characterStore'
import { WizardSteps, CHARACTER_CREATION_STEPS } from '../components/WizardSteps'
import { CharacterDetailsForm } from '../components/CharacterDetailsForm'
import { RaceSelector } from '../components/RaceSelector'
import { ClassSelector } from '../components/ClassSelector'
import { BackgroundSelector } from '../components/BackgroundSelector'
import { StatAllocator } from '../components/StatAllocator'
import { SpellSelector } from '../components/SpellSelector'
import { EquipmentSelector } from '../components/EquipmentSelector'
import type { Race, Class, Subclass, AbilityScores, Spell, Background, Equipment } from '../types'
import { calculateModifier } from '../types'
import { rollDice } from '../types/dice'

/**
 * Map creation step to step number for WizardSteps component
 */
const STEP_TO_NUMBER: Record<string, number> = {
  details: 1,
  race: 2,
  class: 3,
  background: 4,
  stats: 5,
  spells: 6,
  equipment: 7,
  review: 8,
}

export function CharacterCreatePage() {
  const navigate = useNavigate()
  const {
    currentCharacter,
    creationStep,
    createNewCharacter,
    updateCharacterDetails,
    setRace,
    setClass,
    setSubclass,
    setBackground,
    setAbilityScores,
    addSpell,
    addEquipment,
    nextStep,
    prevStep,
    setCreationStep,
    saveCharacter,
    initializeHP,
  } = useCharacterStore()

  // HP rolling state
  const [hpRoll, setHpRoll] = useState<{ result: number; isRolling: boolean } | null>(null)

  // Initialize new character if none exists
  useEffect(() => {
    if (!currentCharacter) {
      createNewCharacter()
    }
  }, [currentCharacter, createNewCharacter])

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [creationStep])

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

  const handleRaceSelect = (race: Race) => {
    setRace(race)
    nextStep()
  }

  const handleClassSelect = (classData: Class, subclass?: Subclass, _skills?: string[], _fightingStyle?: string) => {
    setClass(classData)
    if (subclass) {
      setSubclass(subclass)
    }
    // Note: skills and fightingStyle would be stored in character - add to store if needed
    // For now we'll just move forward
    nextStep()
  }

  const handleBackgroundSelect = (background: Background) => {
    setBackground(background)
    nextStep()
  }

  const handleStatsSubmit = (scores: AbilityScores) => {
    setAbilityScores(scores)
    nextStep()
  }

  const handleSpellsSubmit = (cantrips: Spell[], spells: Spell[]) => {
    // Add all selected spells to character
    cantrips.forEach((spell) => addSpell(spell))
    spells.forEach((spell) => addSpell(spell))
    nextStep()
  }

  const handleEquipmentSubmit = (equipment: Equipment[]) => {
    // Add all selected equipment to character
    equipment.forEach((item) => addEquipment(item))
    nextStep()
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
          <RaceSelector
            initialRace={currentCharacter?.race}
            onSelect={handleRaceSelect}
            onBack={handleBack}
          />
        )

      case 'class':
        return (
          <ClassSelector
            initialClass={currentCharacter?.class}
            initialSubclass={currentCharacter?.subclass}
            onSelect={handleClassSelect}
            onBack={handleBack}
          />
        )

      case 'background':
        return (
          <BackgroundSelector
            initialBackground={currentCharacter?.background}
            onSelect={handleBackgroundSelect}
            onBack={handleBack}
          />
        )

      case 'stats':
        return (
          <StatAllocator
            initialScores={currentCharacter?.abilityScores}
            race={currentCharacter?.race}
            background={currentCharacter?.background}
            onSubmit={handleStatsSubmit}
            onBack={handleBack}
          />
        )

      case 'spells':
        return (
          <SpellSelector
            characterClass={currentCharacter?.class}
            subclass={currentCharacter?.subclass}
            level={currentCharacter?.level || 1}
            onSubmit={handleSpellsSubmit}
            onBack={handleBack}
          />
        )

      case 'equipment':
        return (
          <EquipmentSelector
            characterClass={currentCharacter?.class || undefined}
            onSubmit={handleEquipmentSubmit}
            onBack={handleBack}
          />
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
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="card bg-gray-800 border border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-dnd-gold mb-4">
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
                      <span className="text-gray-500">Level:</span>{' '}
                      <span className="text-gray-300">{currentCharacter.level}</span>
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
                        {currentCharacter.subclass && ` (${currentCharacter.subclass.name})`}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Background:</span>{' '}
                      <span className="text-gray-300">
                        {currentCharacter.background?.name || 'Not selected'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ability Scores */}
                <div className="card bg-gray-800 border border-gray-700 p-6">
                  <h4 className="font-semibold text-white mb-4">Ability Scores</h4>
                  <div className="grid grid-cols-6 gap-4 text-center">
                    {(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const).map((ability) => (
                      <div key={ability}>
                        <div className="text-xs text-gray-500 uppercase">{ability.slice(0, 3)}</div>
                        <div className="text-xl font-bold text-white">
                          {currentCharacter.abilityScores[ability]}
                        </div>
                        <div className="text-sm text-dnd-gold">
                          {calculateModifier(currentCharacter.abilityScores[ability]) >= 0 ? '+' : ''}
                          {calculateModifier(currentCharacter.abilityScores[ability])}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Starting HP Roll */}
                <div className="card bg-gray-800 border border-red-900/50 p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-red-400">❤️</span>
                    Starting Hit Points
                  </h4>

                  {currentCharacter.hitPoints.maximum > 0 ? (
                    // HP already rolled
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-400 mb-2">
                        {currentCharacter.hitPoints.maximum} HP
                      </div>
                      <p className="text-gray-400 text-sm">
                        {currentCharacter.class?.hitDie || '1d8'} roll + {calculateModifier(currentCharacter.abilityScores.constitution) >= 0 ? '+' : ''}{calculateModifier(currentCharacter.abilityScores.constitution)} CON
                      </p>
                      <button
                        onClick={() => {
                          setHpRoll(null)
                          initializeHP(0) // Reset to allow re-roll
                        }}
                        className="mt-3 text-sm text-gray-500 hover:text-gray-300 underline"
                      >
                        Re-roll HP
                      </button>
                    </div>
                  ) : (
                    // Need to roll HP
                    <div className="text-center">
                      <p className="text-gray-400 mb-4">
                        Roll your hit die to determine starting health!
                      </p>
                      <div className="flex flex-col items-center gap-4">
                        <div className="text-lg text-gray-300">
                          Hit Die: <span className="text-dnd-gold font-bold">{currentCharacter.class?.hitDie || '1d8'}</span>
                          {' + '}
                          <span className="text-blue-400">
                            {calculateModifier(currentCharacter.abilityScores.constitution) >= 0 ? '+' : ''}
                            {calculateModifier(currentCharacter.abilityScores.constitution)} CON
                          </span>
                        </div>

                        {hpRoll?.isRolling ? (
                          <div className="text-2xl text-dnd-gold animate-bounce">🎲</div>
                        ) : hpRoll?.result ? (
                          <div className="space-y-3">
                            <div className="text-3xl font-bold text-white">
                              Rolled: <span className="text-dnd-gold">{hpRoll.result}</span>
                            </div>
                            <div className="text-xl text-gray-400">
                              Total HP: <span className="text-red-400 font-bold">
                                {Math.max(1, hpRoll.result + calculateModifier(currentCharacter.abilityScores.constitution))}
                              </span>
                            </div>
                            <div className="flex gap-3 justify-center">
                              <button
                                onClick={() => {
                                  initializeHP(hpRoll.result)
                                }}
                                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => setHpRoll(null)}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                              >
                                Roll Again
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setHpRoll({ result: 0, isRolling: true })
                              setTimeout(() => {
                                const hitDie = currentCharacter.class?.hitDie || '1d8'
                                const roll = rollDice(hitDie)
                                if (roll) {
                                  setHpRoll({ result: roll.grandTotal, isRolling: false })
                                }
                              }, 500)
                            }}
                            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold text-lg transition-colors flex items-center gap-2"
                          >
                            <span>🎲</span>
                            Roll for HP
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Spells (if any) */}
                {currentCharacter.knownSpells.length > 0 && (
                  <div className="card bg-gray-800 border border-gray-700 p-6">
                    <h4 className="font-semibold text-white mb-4">Known Spells</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentCharacter.knownSpells.map((spell) => (
                        <span
                          key={spell.id}
                          className="px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full"
                        >
                          {spell.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Backstory */}
                {currentCharacter.backstory && (
                  <div className="card bg-gray-800 border border-gray-700 p-6">
                    <h4 className="font-semibold text-white mb-2">Backstory</h4>
                    <p className="text-gray-300 text-sm whitespace-pre-wrap">
                      {currentCharacter.backstory}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between pt-6 mt-6 border-t border-gray-700">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                         hover:border-gray-500 rounded-lg transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={handleFinalize}
                disabled={!currentCharacter || currentCharacter.hitPoints.maximum === 0}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  !currentCharacter || currentCharacter.hitPoints.maximum === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-500'
                }`}
              >
                {!currentCharacter || currentCharacter.hitPoints.maximum === 0 ? 'Roll HP First' : 'Save Character'}
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
