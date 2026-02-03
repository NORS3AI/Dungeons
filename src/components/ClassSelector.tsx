import { useState } from 'react'
import type { Class, Subclass } from '../types'
import {
  // PHB Classes
  FIGHTER, WARLOCK, ROGUE, WIZARD, CLERIC, BARBARIAN,
  BARD, DRUID, MONK, PALADIN, RANGER, SORCERER,
  // Custom Classes (WoW/Diablo)
  DEATH_KNIGHT, NECROMANCER, DEMON_HUNTER, AMAZON,
  // Fighter subclasses
  CHAMPION, BATTLE_MASTER, ELDRITCH_KNIGHT,
  // Warlock subclasses
  GREAT_OLD_ONE, FIEND, ARCHFEY, HEXBLADE, CELESTIAL,
  // Rogue subclasses
  THIEF, ASSASSIN,
  // Wizard subclasses
  SCHOOL_OF_EVOCATION, SCHOOL_OF_ABJURATION,
  // Cleric subclasses
  LIFE_DOMAIN, LIGHT_DOMAIN,
  // Barbarian subclasses
  PATH_OF_THE_BERSERKER, PATH_OF_THE_TOTEM_WARRIOR,
  // Bard subclasses
  COLLEGE_OF_LORE, COLLEGE_OF_VALOR,
  // Druid subclasses
  CIRCLE_OF_THE_LAND, CIRCLE_OF_THE_MOON,
  // Monk subclasses
  WAY_OF_THE_OPEN_HAND, WAY_OF_SHADOW,
  // Paladin subclasses
  OATH_OF_DEVOTION, OATH_OF_VENGEANCE,
  // Ranger subclasses
  HUNTER, BEAST_MASTER,
  // Sorcerer subclasses
  DRACONIC_BLOODLINE, WILD_MAGIC,
  // Death Knight subclasses
  BLOOD_DEATH_KNIGHT, FROST_DEATH_KNIGHT, UNHOLY_DEATH_KNIGHT,
  // Necromancer subclasses
  BONE_NECROMANCER, BLOOD_NECROMANCER, SUMMONER_NECROMANCER,
  // Demon Hunter subclasses
  VENGEANCE_DEMON_HUNTER, HAVOC_DEMON_HUNTER, SHADOW_DEMON_HUNTER,
  // Amazon subclasses
  JAVELIN_AMAZON, BOW_AMAZON, PASSIVE_MAGIC_AMAZON,
} from '../types'
import { ClassCard } from './ClassCard'
import { QuickRefTooltip } from './QuickRefTooltip'

// All 16 available classes (12 PHB + 4 Custom)
const AVAILABLE_CLASSES: Class[] = [
  // Custom Classes featured first
  AMAZON, DEATH_KNIGHT, DEMON_HUNTER, NECROMANCER,
  // PHB Classes
  BARBARIAN, BARD, CLERIC, DRUID, FIGHTER, MONK,
  PALADIN, RANGER, ROGUE, SORCERER, WARLOCK, WIZARD,
]

// All subclasses mapped by parent class ID
const SUBCLASSES: Record<string, Subclass[]> = {
  // PHB subclasses
  fighter: [CHAMPION, BATTLE_MASTER, ELDRITCH_KNIGHT],
  warlock: [GREAT_OLD_ONE, FIEND, ARCHFEY, HEXBLADE, CELESTIAL],
  rogue: [THIEF, ASSASSIN],
  wizard: [SCHOOL_OF_EVOCATION, SCHOOL_OF_ABJURATION],
  cleric: [LIFE_DOMAIN, LIGHT_DOMAIN],
  barbarian: [PATH_OF_THE_BERSERKER, PATH_OF_THE_TOTEM_WARRIOR],
  bard: [COLLEGE_OF_LORE, COLLEGE_OF_VALOR],
  druid: [CIRCLE_OF_THE_LAND, CIRCLE_OF_THE_MOON],
  monk: [WAY_OF_THE_OPEN_HAND, WAY_OF_SHADOW],
  paladin: [OATH_OF_DEVOTION, OATH_OF_VENGEANCE],
  ranger: [HUNTER, BEAST_MASTER],
  sorcerer: [DRACONIC_BLOODLINE, WILD_MAGIC],
  // Custom subclasses
  'death-knight': [BLOOD_DEATH_KNIGHT, FROST_DEATH_KNIGHT, UNHOLY_DEATH_KNIGHT],
  necromancer: [BONE_NECROMANCER, BLOOD_NECROMANCER, SUMMONER_NECROMANCER],
  'demon-hunter': [VENGEANCE_DEMON_HUNTER, HAVOC_DEMON_HUNTER, SHADOW_DEMON_HUNTER],
  amazon: [JAVELIN_AMAZON, BOW_AMAZON, PASSIVE_MAGIC_AMAZON],
}

interface ClassSelectorProps {
  initialClass?: Class | null
  initialSubclass?: Subclass | null
  initialSkills?: string[]
  initialFightingStyle?: string | null
  onSelect: (classData: Class, subclass?: Subclass, skills?: string[], fightingStyle?: string) => void
  onBack: () => void
}

/**
 * Convert skill ID to display name
 */
function formatSkillName(skill: string): string {
  // Convert camelCase to Title Case with spaces
  return skill
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (str) => str.toUpperCase())
}

/**
 * Convert skill name to ID for quick reference lookup
 */
function skillToId(skill: string): string {
  return skill
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
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
  initialSkills = [],
  initialFightingStyle = null,
  onSelect,
  onBack,
}: ClassSelectorProps) {
  const [selectedClass, setSelectedClass] = useState<Class | null>(initialClass || null)
  const [selectedSubclass, setSelectedSubclass] = useState<Subclass | null>(initialSubclass || null)
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialSkills)
  const [selectedFightingStyle, setSelectedFightingStyle] = useState<string | null>(initialFightingStyle)

  const handleClassSelect = (classData: Class) => {
    setSelectedClass(classData)
    // Reset subclass, skills, and fighting style when class changes
    if (selectedClass?.id !== classData.id) {
      setSelectedSubclass(null)
      setSelectedSkills([])
      setSelectedFightingStyle(null)
    }
  }

  const handleSubclassSelect = (subclass: Subclass) => {
    setSelectedSubclass(subclass)
  }

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      // Deselect the skill
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else if (selectedClass && selectedSkills.length < selectedClass.skillChoices.choose) {
      // Select the skill (if we haven't reached the limit)
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleFightingStyleSelect = (styleId: string) => {
    setSelectedFightingStyle(styleId === selectedFightingStyle ? null : styleId)
  }

  const handleSubmit = () => {
    if (selectedClass) {
      onSelect(
        selectedClass,
        selectedSubclass || undefined,
        selectedSkills.length > 0 ? selectedSkills : undefined,
        selectedFightingStyle || undefined
      )
    }
  }

  const availableSubclasses = selectedClass ? SUBCLASSES[selectedClass.id] || [] : []
  const needsSubclass = selectedClass && selectedClass.subclassLevel === 1 && availableSubclasses.length > 0
  const skillsRemaining = selectedClass ? selectedClass.skillChoices.choose - selectedSkills.length : 0
  const hasFightingStyles = selectedClass?.fightingStyles && selectedClass.fightingStyles.length > 0
  const needsFightingStyle = hasFightingStyles && !selectedFightingStyle

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

      {/* Custom Classes Note */}
      <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-dnd-gold/30">
        <p className="text-sm text-gray-400 text-center">
          <span className="text-dnd-gold font-medium">Featured:</span> Amazon, Death Knight, Demon Hunter, and Necromancer are custom classes inspired by World of Warcraft and Diablo.
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

          {/* Skills Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Select Your Skills
              </h4>
              <span className={`text-sm font-medium ${skillsRemaining > 0 ? 'text-dnd-gold' : 'text-green-400'}`}>
                {skillsRemaining > 0 ? `${skillsRemaining} remaining` : 'All selected!'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Choose {selectedClass.skillChoices.choose} skills. Click to select, click again to deselect.
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedClass.skillChoices.from.map((skill) => {
                const isSelected = selectedSkills.includes(skill)
                const canSelect = selectedSkills.length < selectedClass.skillChoices.choose
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    disabled={!isSelected && !canSelect}
                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200
                               flex items-center gap-2 border-2
                               ${
                                 isSelected
                                   ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                                   : canSelect
                                     ? 'bg-gray-700 text-gray-300 border-gray-600 hover:border-blue-500 hover:text-white'
                                     : 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                               }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {formatSkillName(skill)}
                  </button>
                )
              })}
            </div>
            {/* Quick reference for selected skills */}
            {selectedSkills.length > 0 && (
              <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-xs text-blue-300 mb-2">Selected skills (click for details):</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <QuickRefTooltip key={skill} type="skill" id={skillToId(skill)}>
                      {formatSkillName(skill)}
                    </QuickRefTooltip>
                  ))}
                </div>
              </div>
            )}
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

          {/* Fighting Styles Selection (for Fighter) */}
          {selectedClass.fightingStyles && selectedClass.fightingStyles.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Choose Your Fighting Style
                </h4>
                {selectedFightingStyle ? (
                  <span className="text-sm font-medium text-green-400">Selected!</span>
                ) : (
                  <span className="text-sm font-medium text-dnd-gold">Required</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Select one fighting style that defines your combat specialization.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedClass.fightingStyles.map((style) => {
                  const isSelected = selectedFightingStyle === style.id
                  const isDualTwoHanded = style.id === 'dual-two-handed'
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => handleFightingStyleSelect(style.id)}
                      className={`text-left p-4 rounded-lg border-2 transition-all duration-200
                                 ${
                                   isSelected
                                     ? 'bg-red-900/20 border-red-500 shadow-lg shadow-red-500/10'
                                     : 'bg-gray-700/30 border-gray-600 hover:border-red-500/50'
                                 }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-semibold ${isSelected ? 'text-red-400' : 'text-white'}`}>
                          {style.name}
                        </span>
                        {isSelected && (
                          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{style.description}</p>
                      {isDualTwoHanded && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-400 text-xs rounded font-medium">
                            Homebrew
                          </span>
                          <span className="px-2 py-0.5 bg-red-900/30 text-red-400 text-xs rounded">
                            -4 AC
                          </span>
                        </div>
                      )}
                    </button>
                  )
                })}
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
                    <p className="text-xs text-gray-500 uppercase mb-2">
                      Level 1 Feature
                      <span className="text-gray-600 ml-2">(click feature name for details)</span>
                    </p>
                    {subclass.features
                      .filter((f) => f.level === 1)
                      .map((feature) => (
                        <div key={feature.id} className="p-3 bg-gray-800/50 rounded">
                          <QuickRefTooltip type="trait" id={feature.id}>
                            <span className="font-medium">{feature.name}</span>
                          </QuickRefTooltip>
                          <span className="text-gray-400 text-sm">: {feature.description}</span>
                        </div>
                      ))}

                    {/* Expanded Spells */}
                    {subclass.expandedSpells && subclass.expandedSpells.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 uppercase mb-2">
                          Expanded Spell List
                          <span className="text-gray-600 ml-2">(click spells for details)</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {subclass.expandedSpells.flatMap((es) =>
                            es.spells.map((spell) => (
                              <QuickRefTooltip key={spell} type="spell" id={spell}>
                                <span className="px-2 py-1 bg-purple-900/30 text-sm rounded capitalize">
                                  {spell.replace(/-/g, ' ')}
                                </span>
                              </QuickRefTooltip>
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
          disabled={!selectedClass || (!!needsSubclass && !selectedSubclass) || skillsRemaining > 0 || !!needsFightingStyle}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2
                     focus:ring-offset-gray-900
                     ${
                       selectedClass && (!needsSubclass || selectedSubclass) && skillsRemaining === 0 && !needsFightingStyle
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
          {' '}Select your {selectedClass?.skillChoices.choose || 2} skill proficiencies to continue.
        </p>
      </div>
    </div>
  )
}
