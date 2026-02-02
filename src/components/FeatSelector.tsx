import { useState } from 'react'
import type { Feat } from '../types/feat'
import { ORIGIN_FEATS, COMBAT_FEATS, UTILITY_FEATS, ALL_FEATS } from '../types/feat'
import type { Character } from '../types/character'

interface FeatSelectorProps {
  character?: Character | null
  initialFeat?: Feat | null
  onSelect: (feat: Feat) => void
  onBack: () => void
  allowedCategories?: ('origin' | 'combat' | 'utility' | 'all')[]
  title?: string
  subtitle?: string
}

type FeatCategory = 'all' | 'origin' | 'combat' | 'utility'

/**
 * Format ability name for display
 */
function formatAbility(ability: string): string {
  return ability.charAt(0).toUpperCase() + ability.slice(1)
}

/**
 * Check if character meets feat prerequisites
 */
function meetsPrerequisites(feat: Feat, character?: Character | null): { met: boolean; reason?: string } {
  if (!feat.prerequisites || feat.prerequisites.length === 0) {
    return { met: true }
  }

  if (!character) {
    return { met: false, reason: 'Character data required' }
  }

  for (const prereq of feat.prerequisites) {
    switch (prereq.type) {
      case 'ability':
        const abilityScore = character.abilityScores[prereq.value as keyof typeof character.abilityScores]
        if (prereq.minimum && abilityScore < prereq.minimum) {
          return { met: false, reason: `Requires ${formatAbility(prereq.value as string)} ${prereq.minimum}+` }
        }
        break
      case 'level':
        if (character.level < (prereq.value as number)) {
          return { met: false, reason: `Requires level ${prereq.value}+` }
        }
        break
      case 'spellcasting':
        if (!character.class?.spellcasting || character.class.spellcasting === 'none') {
          return { met: false, reason: 'Requires spellcasting ability' }
        }
        break
      case 'proficiency':
        // Would need to check proficiencies - simplified for now
        break
      case 'race':
        if (character.race?.id !== prereq.value) {
          return { met: false, reason: `Requires ${prereq.value} race` }
        }
        break
      case 'class':
        if (character.class?.id !== prereq.value) {
          return { met: false, reason: `Requires ${prereq.value} class` }
        }
        break
    }
  }

  return { met: true }
}

/**
 * Feat Card Component
 */
function FeatCard({
  feat,
  isSelected,
  onSelect,
  character,
}: {
  feat: Feat
  isSelected: boolean
  onSelect: (feat: Feat) => void
  character?: Character | null
}) {
  const prereqCheck = meetsPrerequisites(feat, character)
  const isDisabled = !prereqCheck.met && character !== null

  return (
    <button
      onClick={() => !isDisabled && onSelect(feat)}
      disabled={isDisabled}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200
        ${
          isSelected
            ? 'border-dnd-gold bg-dnd-gold/10 ring-2 ring-dnd-gold/50'
            : isDisabled
            ? 'border-gray-700 bg-gray-800/50 opacity-50 cursor-not-allowed'
            : 'border-gray-700 bg-gray-800 hover:border-gray-500 hover:bg-gray-750'
        }
        focus:outline-none focus:ring-2 focus:ring-dnd-gold`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-bold text-lg ${isSelected ? 'text-dnd-gold' : 'text-white'}`}>
          {feat.name}
        </h3>
        {feat.abilityScoreIncrease && (
          <span className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded-full">
            +{feat.abilityScoreIncrease.amount} ASI
          </span>
        )}
      </div>
      <p className="text-sm text-gray-400 line-clamp-2">{feat.description}</p>
      {isDisabled && prereqCheck.reason && (
        <p className="text-xs text-red-400 mt-2">{prereqCheck.reason}</p>
      )}
    </button>
  )
}

/**
 * Feat Selector Component
 * Displays available feats organized by category with detailed information
 */
export function FeatSelector({
  character,
  initialFeat,
  onSelect,
  onBack,
  allowedCategories = ['all'],
  title = 'Choose a Feat',
  subtitle = 'Feats represent special talents or training that give your character new capabilities.',
}: FeatSelectorProps) {
  const [selectedFeat, setSelectedFeat] = useState<Feat | null>(initialFeat || null)
  const [activeCategory, setActiveCategory] = useState<FeatCategory>(
    allowedCategories.includes('all') ? 'all' : allowedCategories[0]
  )

  // Get feats based on active category
  const getFeatsForCategory = (category: FeatCategory): Feat[] => {
    switch (category) {
      case 'origin':
        return ORIGIN_FEATS
      case 'combat':
        return COMBAT_FEATS
      case 'utility':
        return UTILITY_FEATS
      case 'all':
      default:
        return ALL_FEATS
    }
  }

  const displayedFeats = getFeatsForCategory(activeCategory)

  const handleFeatSelect = (feat: Feat) => {
    setSelectedFeat(feat)
  }

  const handleSubmit = () => {
    if (selectedFeat) {
      onSelect(selectedFeat)
    }
  }

  const allCategories: { id: FeatCategory; label: string }[] = [
    { id: 'all', label: 'All Feats' },
    { id: 'origin', label: 'Origin Feats' },
    { id: 'combat', label: 'Combat Feats' },
    { id: 'utility', label: 'Utility Feats' },
  ]

  const categories = allCategories.filter(
    (cat) => allowedCategories.includes('all') || allowedCategories.includes(cat.id as 'origin' | 'combat' | 'utility')
  )

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">{title}</h2>
        <p className="text-gray-400">{subtitle}</p>
      </div>

      {/* Category Tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors
                ${
                  activeCategory === category.id
                    ? 'bg-dnd-gold text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-75">
                ({getFeatsForCategory(category.id).length})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Feat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {displayedFeats.map((feat) => (
          <FeatCard
            key={feat.id}
            feat={feat}
            isSelected={selectedFeat?.id === feat.id}
            onSelect={handleFeatSelect}
            character={character}
          />
        ))}
      </div>

      {/* Selected Feat Details */}
      {selectedFeat && (
        <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-dnd-gold/30">
          <h3 className="text-2xl font-bold text-dnd-gold mb-4">{selectedFeat.name}</h3>

          {/* Description */}
          <p className="text-gray-300 mb-6">{selectedFeat.description}</p>

          {/* Prerequisites */}
          {selectedFeat.prerequisites && selectedFeat.prerequisites.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Prerequisites
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedFeat.prerequisites.map((prereq, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-red-900/30 text-red-300 text-sm rounded-full"
                  >
                    {prereq.type === 'ability' && `${formatAbility(prereq.value as string)} ${prereq.minimum}+`}
                    {prereq.type === 'level' && `Level ${prereq.value}+`}
                    {prereq.type === 'spellcasting' && 'Spellcasting ability'}
                    {prereq.type === 'race' && `${prereq.value} race`}
                    {prereq.type === 'class' && `${prereq.value} class`}
                    {prereq.type === 'proficiency' && `${prereq.value} proficiency`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ability Score Increase */}
          {selectedFeat.abilityScoreIncrease && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Ability Score Increase
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedFeat.abilityScoreIncrease.choose ? (
                  <span className="px-3 py-1 bg-blue-900/30 text-blue-300 text-sm rounded-full">
                    Choose {selectedFeat.abilityScoreIncrease.choose}:{' '}
                    {selectedFeat.abilityScoreIncrease.abilities.map(formatAbility).join(', ')} +{selectedFeat.abilityScoreIncrease.amount}
                  </span>
                ) : (
                  selectedFeat.abilityScoreIncrease.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="px-3 py-1 bg-blue-900/30 text-blue-300 text-sm rounded-full"
                    >
                      {formatAbility(ability)} +{selectedFeat.abilityScoreIncrease?.amount}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Benefits
            </h4>
            <ul className="space-y-3">
              {selectedFeat.benefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-dnd-gold flex-shrink-0">*</span>
                  <span className="text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
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
          disabled={!selectedFeat}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2
                     focus:ring-offset-gray-900
                     ${
                       selectedFeat
                         ? 'bg-dnd-gold text-gray-900 hover:bg-yellow-500'
                         : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                     }`}
        >
          Confirm Feat
        </button>
      </div>

      {/* Info Tip */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">
          <span className="text-dnd-gold font-medium">Tip:</span>{' '}
          Origin feats are typically available at 1st level through certain backgrounds.
          Other feats can be selected when your class grants an Ability Score Improvement (ASI),
          usually at levels 4, 8, 12, 16, and 19.
        </p>
      </div>
    </div>
  )
}
