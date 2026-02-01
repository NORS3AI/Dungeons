import { useState } from 'react'
import type { Background } from '../types/background'
import { AVAILABLE_BACKGROUNDS } from '../types/background'
import { BackgroundCard } from './BackgroundCard'
import { QuickRefTooltip } from './QuickRefTooltip'

interface BackgroundSelectorProps {
  initialBackground?: Background | null
  onSelect: (background: Background) => void
  onBack: () => void
}

/**
 * Format skill name for display
 */
function formatSkillName(skill: string): string {
  const names: Record<string, string> = {
    'acrobatics': 'Acrobatics',
    'animal-handling': 'Animal Handling',
    'arcana': 'Arcana',
    'athletics': 'Athletics',
    'deception': 'Deception',
    'history': 'History',
    'insight': 'Insight',
    'intimidation': 'Intimidation',
    'investigation': 'Investigation',
    'medicine': 'Medicine',
    'nature': 'Nature',
    'perception': 'Perception',
    'performance': 'Performance',
    'persuasion': 'Persuasion',
    'religion': 'Religion',
    'sleight-of-hand': 'Sleight of Hand',
    'stealth': 'Stealth',
    'survival': 'Survival',
  }
  return names[skill] || skill.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * Background Selector Component
 * Displays available backgrounds as cards and shows detailed info when selected
 */
export function BackgroundSelector({ initialBackground, onSelect, onBack }: BackgroundSelectorProps) {
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(initialBackground || null)

  const handleBackgroundSelect = (background: Background) => {
    setSelectedBackground(background)
  }

  const handleSubmit = () => {
    if (selectedBackground) {
      onSelect(selectedBackground)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">Choose Your Background</h2>
        <p className="text-gray-400">
          Your background reveals where you came from and how you became an adventurer.
          It provides skill proficiencies, tools, languages, and a special feature.
        </p>
      </div>

      {/* Background Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {AVAILABLE_BACKGROUNDS.map((background) => (
          <BackgroundCard
            key={background.id}
            background={background}
            isSelected={selectedBackground?.id === background.id}
            onSelect={handleBackgroundSelect}
          />
        ))}
      </div>

      {/* Coming Soon Note */}
      <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400 text-center">
          More backgrounds coming soon: Charlatan, Entertainer, Guild Artisan, Hermit, Outlander, Urchin
        </p>
      </div>

      {/* Selected Background Details */}
      {selectedBackground && (
        <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-dnd-gold/30">
          <h3 className="text-2xl font-bold text-dnd-gold mb-4">{selectedBackground.name}</h3>

          {/* Full Description */}
          <p className="text-gray-300 mb-6">{selectedBackground.description}</p>

          {/* Skill Proficiencies */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Skill Proficiencies
              <span className="text-xs font-normal text-gray-500 ml-2">(click skill names to learn more)</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {selectedBackground.skillProficiencies.map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-2 bg-purple-900/30 rounded-lg"
                >
                  <QuickRefTooltip type="skill" id={skill}>
                    <span className="font-medium text-purple-300">{formatSkillName(skill)}</span>
                  </QuickRefTooltip>
                </div>
              ))}
            </div>
          </div>

          {/* Tool Proficiencies */}
          {selectedBackground.toolProficiencies && selectedBackground.toolProficiencies.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Tool Proficiencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedBackground.toolProficiencies.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-gray-700 text-sm rounded-full capitalize"
                  >
                    {tool.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {selectedBackground.languages && selectedBackground.languages > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Languages
              </h4>
              <p className="text-gray-300">
                You can speak, read, and write {selectedBackground.languages} additional language{selectedBackground.languages > 1 ? 's' : ''} of your choice.
              </p>
            </div>
          )}

          {/* Starting Equipment */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Starting Equipment
            </h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {selectedBackground.startingEquipment.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
              <li>{selectedBackground.startingGold} gp</li>
            </ul>
          </div>

          {/* Feature */}
          <div className="mb-6 p-4 bg-dnd-gold/10 rounded-lg border border-dnd-gold/30">
            <h4 className="text-lg font-bold text-dnd-gold mb-2">
              Feature: {selectedBackground.feature.name}
            </h4>
            <p className="text-gray-300">{selectedBackground.feature.description}</p>
          </div>

          {/* Suggested Characteristics */}
          {selectedBackground.personalityTraits && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Suggested Personality Traits
                <span className="text-xs font-normal text-gray-500 ml-2">(roll d8 or choose)</span>
              </h4>
              <div className="max-h-32 overflow-y-auto pr-2 space-y-2">
                {selectedBackground.personalityTraits.map((trait) => (
                  <div key={trait.roll} className="flex gap-2 text-sm">
                    <span className="text-dnd-gold font-mono w-4">{trait.roll}.</span>
                    <span className="text-gray-300">{trait.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedBackground.ideals && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Suggested Ideals
                <span className="text-xs font-normal text-gray-500 ml-2">(roll d6 or choose)</span>
              </h4>
              <div className="max-h-32 overflow-y-auto pr-2 space-y-2">
                {selectedBackground.ideals.map((ideal) => (
                  <div key={ideal.roll} className="flex gap-2 text-sm">
                    <span className="text-dnd-gold font-mono w-4">{ideal.roll}.</span>
                    <span className="text-gray-300">{ideal.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-700">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                   hover:border-gray-500 rounded-lg transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-dnd-gold"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedBackground}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2
                     focus:ring-offset-gray-900
                     ${
                       selectedBackground
                         ? 'bg-dnd-gold text-gray-900 hover:bg-yellow-500'
                         : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                     }`}
        >
          Next: Allocate Stats
        </button>
      </div>

      {/* New Player Tip */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">
          <span className="text-dnd-gold font-medium">New to D&D?</span>{' '}
          Your background is your character's history before becoming an adventurer.
          It determines what skills you're good at and provides a unique feature.
          Click on <span className="text-purple-400">skill names</span> to learn what each skill does!
        </p>
      </div>
    </div>
  )
}
