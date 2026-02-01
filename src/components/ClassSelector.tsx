import { useState } from 'react'
import type { Class, Subclass } from '../types'
import { FIGHTER, WARLOCK, GREAT_OLD_ONE } from '../types'
import { ClassCard } from './ClassCard'

// Available classes
const AVAILABLE_CLASSES: Class[] = [FIGHTER, WARLOCK]

// Available subclasses mapped by parent class ID
const SUBCLASSES: Record<string, Subclass[]> = {
  fighter: [], // No subclasses defined yet for Fighter
  warlock: [GREAT_OLD_ONE],
}

interface ClassSelectorProps {
  initialClass?: Class | null
  initialSubclass?: Subclass | null
  onSelect: (classData: Class, subclass?: Subclass) => void
  onBack: () => void
}

/**
 * Format ability name for display
 */
function formatAbilityName(key: string): string {
  const names: Record<string, string> = {
    strength: 'Strength',
    dexterity: 'Dexterity',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    wisdom: 'Wisdom',
    charisma: 'Charisma',
  }
  return names[key] || key
}

/**
 * Class Selector Component
 * Displays available classes and subclasses with detailed features
 */
export function ClassSelector({
  initialClass,
  initialSubclass,
  onSelect,
  onBack,
}: ClassSelectorProps) {
  const [selectedClass, setSelectedClass] = useState<Class | null>(initialClass || null)
  const [selectedSubclass, setSelectedSubclass] = useState<Subclass | null>(initialSubclass || null)

  const handleClassSelect = (classData: Class) => {
    setSelectedClass(classData)
    // Reset subclass when class changes
    if (selectedClass?.id !== classData.id) {
      setSelectedSubclass(null)
    }
  }

  const handleSubclassSelect = (subclass: Subclass) => {
    setSelectedSubclass(subclass)
  }

  const handleSubmit = () => {
    if (selectedClass) {
      onSelect(selectedClass, selectedSubclass || undefined)
    }
  }

  const availableSubclasses = selectedClass ? SUBCLASSES[selectedClass.id] || [] : []
  const needsSubclass = selectedClass && selectedClass.subclassLevel === 1 && availableSubclasses.length > 0

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">Choose Your Class</h2>
        <p className="text-gray-400">
          Select a class that defines your character's abilities, combat style, and role in the party.
        </p>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {AVAILABLE_CLASSES.map((classData) => (
          <ClassCard
            key={classData.id}
            classData={classData}
            isSelected={selectedClass?.id === classData.id}
            onSelect={handleClassSelect}
          />
        ))}
      </div>

      {/* Coming Soon Note */}
      <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400 text-center">
          More classes coming soon: Wizard, Cleric, Rogue, Ranger, Paladin, Barbarian, Bard, Druid, Monk, Sorcerer
        </p>
      </div>

      {/* Selected Class Details */}
      {selectedClass && (
        <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-dnd-gold/30">
          <h3 className="text-2xl font-bold text-dnd-gold mb-4">{selectedClass.name} Features</h3>

          {/* Primary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Hit Die</div>
              <div className="text-white font-bold text-lg">{selectedClass.hitDie.toUpperCase()}</div>
            </div>
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Primary</div>
              <div className="text-white font-medium text-sm">
                {selectedClass.primaryAbility.map((a) => formatAbilityName(a)).join(' / ')}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">Saves</div>
              <div className="text-white font-medium text-sm uppercase">
                {selectedClass.savingThrows.map((s) => s.slice(0, 3)).join(' & ')}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-700/30 rounded-lg">
              <div className="text-xs text-gray-500 uppercase">{selectedClass.subclassName}</div>
              <div className="text-white font-medium text-sm">Level {selectedClass.subclassLevel}</div>
            </div>
          </div>

          {/* Proficiencies */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Proficiencies
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-700/30 rounded-lg">
                <span className="text-xs text-gray-500">Armor: </span>
                <span className="text-gray-300 text-sm capitalize">
                  {selectedClass.armorProficiencies.join(', ') || 'None'}
                </span>
              </div>
              <div className="p-3 bg-gray-700/30 rounded-lg">
                <span className="text-xs text-gray-500">Weapons: </span>
                <span className="text-gray-300 text-sm capitalize">
                  {selectedClass.weaponProficiencies.join(', ') || 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Skill Choices (Choose {selectedClass.skillChoices.choose})
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedClass.skillChoices.from.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full capitalize"
                >
                  {skill.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Level 1 Features */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Starting Features
            </h4>
            <div className="space-y-3">
              {selectedClass.features
                .filter((f) => f.level === 1)
                .map((feature) => (
                  <div key={feature.id} className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-white font-semibold">{feature.name}</h5>
                      {feature.charges && (
                        <span className="text-xs text-dnd-gold">
                          {typeof feature.charges.amount === 'number' ? feature.charges.amount : feature.charges.amount} / {feature.charges.rechargeOn}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Fighting Styles (for Fighter) */}
          {selectedClass.fightingStyles && selectedClass.fightingStyles.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Fighting Style Options
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedClass.fightingStyles.map((style) => (
                  <div key={style.id} className="p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-white font-medium">{style.name}: </span>
                    <span className="text-gray-400 text-sm">{style.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subclass Selection (if required at level 1) */}
      {needsSubclass && (
        <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-purple-500/30">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">
            Choose Your {selectedClass.subclassName}
          </h3>
          <p className="text-gray-400 mb-6">
            As a {selectedClass.name}, you must choose your {selectedClass.subclassName.toLowerCase()} at level 1.
          </p>

          <div className="space-y-4">
            {availableSubclasses.map((subclass) => (
              <button
                key={subclass.id}
                type="button"
                onClick={() => handleSubclassSelect(subclass)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                           ${
                             selectedSubclass?.id === subclass.id
                               ? 'border-purple-500 bg-purple-900/20'
                               : 'border-gray-700 bg-gray-700/30 hover:border-gray-600'
                           }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-bold ${selectedSubclass?.id === subclass.id ? 'text-purple-400' : 'text-white'}`}>
                    {subclass.name}
                  </h4>
                  {selectedSubclass?.id === subclass.id && (
                    <div className="flex items-center justify-center w-5 h-5 bg-purple-500 rounded-full">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-3">{subclass.description}</p>

                {/* Subclass Features */}
                {selectedSubclass?.id === subclass.id && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <p className="text-xs text-gray-500 uppercase mb-2">Level 1 Feature</p>
                    {subclass.features
                      .filter((f) => f.level === 1)
                      .map((feature) => (
                        <div key={feature.id} className="p-3 bg-gray-800/50 rounded">
                          <span className="text-purple-300 font-medium">{feature.name}: </span>
                          <span className="text-gray-400 text-sm">{feature.description}</span>
                        </div>
                      ))}

                    {/* Expanded Spells */}
                    {subclass.expandedSpells && subclass.expandedSpells.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 uppercase mb-2">Expanded Spell List</p>
                        <div className="flex flex-wrap gap-1">
                          {subclass.expandedSpells.flatMap((es) =>
                            es.spells.map((spell) => (
                              <span
                                key={spell}
                                className="px-2 py-0.5 bg-purple-900/30 text-purple-300 text-xs rounded capitalize"
                              >
                                {spell.replace(/-/g, ' ')}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </button>
            ))}
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
          disabled={!selectedClass || (!!needsSubclass && !selectedSubclass)}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2
                     focus:ring-offset-gray-900
                     ${
                       selectedClass && (!needsSubclass || selectedSubclass)
                         ? 'bg-dnd-gold text-gray-900 hover:bg-yellow-500'
                         : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                     }`}
        >
          Next: Allocate Stats
        </button>
      </div>

      {/* Tip */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">
          <span className="text-dnd-gold font-medium">Tip:</span>{' '}
          Your class determines your hit points, proficiencies, and special abilities.
          {needsSubclass && ' Warlocks must choose their Otherworldly Patron at level 1.'}
        </p>
      </div>
    </div>
  )
}
