import { useState, useMemo } from 'react'
import type { Spell, Class, Subclass } from '../types'
import { SpellCard } from './SpellCard'
import {
  BARD_CANTRIPS,
  BARD_LEVEL_1_SPELLS,
  BARD_LEVEL_2_SPELLS,
  BARD_LEVEL_3_SPELLS,
  BARD_LEVEL_4_SPELLS,
  BARD_LEVEL_5_SPELLS,
  BARD_LEVEL_6_SPELLS,
  BARD_LEVEL_7_SPELLS,
  BARD_LEVEL_8_SPELLS,
  BARD_LEVEL_9_SPELLS,
  CLERIC_CANTRIPS,
  CLERIC_LEVEL_1_SPELLS,
  CLERIC_LEVEL_2_SPELLS,
  CLERIC_LEVEL_3_SPELLS,
  CLERIC_LEVEL_4_SPELLS,
  CLERIC_LEVEL_5_SPELLS,
  CLERIC_LEVEL_6_SPELLS,
  CLERIC_LEVEL_7_SPELLS,
  CLERIC_LEVEL_8_SPELLS,
  CLERIC_LEVEL_9_SPELLS,
  DEATH_KNIGHT_CANTRIPS,
  DEATH_KNIGHT_LEVEL_1_SPELLS,
  DEATH_KNIGHT_LEVEL_3_SPELLS,
  DEATH_KNIGHT_LEVEL_5_SPELLS,
  DEATH_KNIGHT_LEVEL_7_SPELLS,
  DEATH_KNIGHT_LEVEL_9_SPELLS,
  DRUID_CANTRIPS,
  DRUID_LEVEL_1_SPELLS,
  DRUID_LEVEL_2_SPELLS,
  DRUID_LEVEL_3_SPELLS,
  DRUID_LEVEL_4_SPELLS,
  DRUID_LEVEL_5_SPELLS,
  DRUID_LEVEL_6_SPELLS,
  DRUID_LEVEL_7_SPELLS,
  DRUID_LEVEL_8_SPELLS,
  DRUID_LEVEL_9_SPELLS,
  NECROMANCER_CANTRIPS,
  NECROMANCER_LEVEL_1_SPELLS,
  NECROMANCER_LEVEL_2_SPELLS,
  NECROMANCER_LEVEL_3_SPELLS,
  NECROMANCER_LEVEL_4_SPELLS,
  NECROMANCER_LEVEL_5_SPELLS,
  NECROMANCER_LEVEL_6_SPELLS,
  NECROMANCER_LEVEL_7_SPELLS,
  NECROMANCER_LEVEL_8_SPELLS,
  NECROMANCER_LEVEL_9_SPELLS,
  PALADIN_LEVEL_1_SPELLS,
  PALADIN_LEVEL_2_SPELLS,
  PALADIN_LEVEL_3_SPELLS,
  PALADIN_LEVEL_4_SPELLS,
  PALADIN_LEVEL_5_SPELLS,
  RANGER_LEVEL_1_SPELLS,
  RANGER_LEVEL_2_SPELLS,
  RANGER_LEVEL_3_SPELLS,
  RANGER_LEVEL_4_SPELLS,
  RANGER_LEVEL_5_SPELLS,
  SORCERER_CANTRIPS,
  SORCERER_LEVEL_1_SPELLS,
  SORCERER_LEVEL_2_SPELLS,
  SORCERER_LEVEL_3_SPELLS,
  SORCERER_LEVEL_4_SPELLS,
  SORCERER_LEVEL_5_SPELLS,
  SORCERER_LEVEL_6_SPELLS,
  SORCERER_LEVEL_7_SPELLS,
  SORCERER_LEVEL_8_SPELLS,
  SORCERER_LEVEL_9_SPELLS,
  WARLOCK_CANTRIPS,
  WARLOCK_LEVEL_1_SPELLS,
  WARLOCK_LEVEL_2_SPELLS,
  WARLOCK_LEVEL_3_SPELLS,
  WARLOCK_LEVEL_4_SPELLS,
  WARLOCK_LEVEL_5_SPELLS,
  WARLOCK_LEVEL_6_SPELLS,
  WARLOCK_LEVEL_7_SPELLS,
  WARLOCK_LEVEL_8_SPELLS,
  WARLOCK_LEVEL_9_SPELLS,
  WIZARD_CANTRIPS,
  WIZARD_LEVEL_1_SPELLS,
  WIZARD_LEVEL_2_SPELLS,
  WIZARD_LEVEL_3_SPELLS,
  WIZARD_LEVEL_4_SPELLS,
  WIZARD_LEVEL_5_SPELLS,
  WIZARD_LEVEL_6_SPELLS,
  WIZARD_LEVEL_7_SPELLS,
  WIZARD_LEVEL_8_SPELLS,
  WIZARD_LEVEL_9_SPELLS,
  GOO_EXPANDED_SPELLS,
  AMAZON_CANTRIPS,
  AMAZON_LEVEL_1_SPELLS,
  AMAZON_LEVEL_2_SPELLS,
  AMAZON_LEVEL_3_SPELLS,
  AMAZON_LEVEL_4_SPELLS,
  AMAZON_LEVEL_5_SPELLS,
  DEMON_HUNTER_LEVEL_1_SPELLS,
  DEMON_HUNTER_LEVEL_2_SPELLS,
  DEMON_HUNTER_LEVEL_3_SPELLS,
  DEMON_HUNTER_LEVEL_4_SPELLS,
  DEMON_HUNTER_LEVEL_5_SPELLS,
} from '../data/spells'

interface SpellSelectorProps {
  characterClass?: Class | null
  subclass?: Subclass | null
  level?: number
  onSubmit: (cantrips: Spell[], spells: Spell[]) => void
  onBack: () => void
  isCharacterCreation?: boolean // If true, shows "Next: Equipment", if false shows "Done"
  existingSpells?: Spell[] // Spells the character already knows — excluded from the selectable list
}

/**
 * Spell Selector Component
 * Allows selection of cantrips and spells based on class
 */
export function SpellSelector({
  characterClass,
  subclass,
  level = 1,
  onSubmit,
  onBack,
  isCharacterCreation = true,
  existingSpells = [],
}: SpellSelectorProps) {
  const [selectedCantrips, setSelectedCantrips] = useState<Spell[]>([])
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>([])
  const [schoolFilter, setSchoolFilter] = useState<string>('all')
  const [classFilter, setClassFilter] = useState<string>('mine')

  // Build a set of already-known spell IDs for fast lookup
  const existingSpellIds = useMemo(
    () => new Set(existingSpells.map((s) => s.id)),
    [existingSpells],
  )

  // Determine available spells based on class
  const availableCantrips = useMemo(() => {
    if (characterClass?.id === 'amazon') return AMAZON_CANTRIPS
    if (characterClass?.id === 'bard') return BARD_CANTRIPS
    if (characterClass?.id === 'cleric') return CLERIC_CANTRIPS
    if (characterClass?.id === 'death-knight') return DEATH_KNIGHT_CANTRIPS
    if (characterClass?.id === 'druid') return DRUID_CANTRIPS
    if (characterClass?.id === 'necromancer') return NECROMANCER_CANTRIPS
    if (characterClass?.id === 'sorcerer') return SORCERER_CANTRIPS
    if (characterClass?.id === 'warlock') return WARLOCK_CANTRIPS
    if (characterClass?.id === 'wizard') return WIZARD_CANTRIPS
    return []
  }, [characterClass])

  // Filter out cantrips and spells the character already knows
  const selectableCantrips = useMemo(
    () => availableCantrips.filter((s) => !existingSpellIds.has(s.id)),
    [availableCantrips, existingSpellIds],
  )

  const availableSpells = useMemo(() => {
    const spells: Spell[] = []

    // Bard spells - full caster with level-based progression
    if (characterClass?.id === 'bard') {
      spells.push(...BARD_LEVEL_1_SPELLS)
      if (level >= 3) {
        spells.push(...BARD_LEVEL_2_SPELLS)
      }
      if (level >= 5) {
        spells.push(...BARD_LEVEL_3_SPELLS)
      }
      if (level >= 7) {
        spells.push(...BARD_LEVEL_4_SPELLS)
      }
      if (level >= 9) {
        spells.push(...BARD_LEVEL_5_SPELLS)
      }
      if (level >= 11) {
        spells.push(...BARD_LEVEL_6_SPELLS)
      }
      if (level >= 13) {
        spells.push(...BARD_LEVEL_7_SPELLS)
      }
      if (level >= 15) {
        spells.push(...BARD_LEVEL_8_SPELLS)
      }
      if (level >= 17) {
        spells.push(...BARD_LEVEL_9_SPELLS)
      }
      return spells
    }

    // Paladin spells - half-caster with level-based progression
    if (characterClass?.id === 'paladin') {
      if (level >= 2) {
        spells.push(...PALADIN_LEVEL_1_SPELLS)
      }
      if (level >= 5) {
        spells.push(...PALADIN_LEVEL_2_SPELLS)
      }
      if (level >= 9) {
        spells.push(...PALADIN_LEVEL_3_SPELLS)
      }
      if (level >= 13) {
        spells.push(...PALADIN_LEVEL_4_SPELLS)
      }
      if (level >= 17) {
        spells.push(...PALADIN_LEVEL_5_SPELLS)
      }
      return spells
    }

    // Ranger spells - half-caster with level-based progression
    if (characterClass?.id === 'ranger') {
      if (level >= 2) {
        spells.push(...RANGER_LEVEL_1_SPELLS)
      }
      if (level >= 5) {
        spells.push(...RANGER_LEVEL_2_SPELLS)
      }
      if (level >= 9) {
        spells.push(...RANGER_LEVEL_3_SPELLS)
      }
      if (level >= 13) {
        spells.push(...RANGER_LEVEL_4_SPELLS)
      }
      if (level >= 17) {
        spells.push(...RANGER_LEVEL_5_SPELLS)
      }
      return spells
    }

    // Warlock spells with subclass expanded spells - Pact Magic progression
    if (characterClass?.id === 'warlock') {
      spells.push(...WARLOCK_LEVEL_1_SPELLS)
      if (level >= 3) {
        spells.push(...WARLOCK_LEVEL_2_SPELLS)
      }
      if (level >= 5) {
        spells.push(...WARLOCK_LEVEL_3_SPELLS)
      }
      if (level >= 7) {
        spells.push(...WARLOCK_LEVEL_4_SPELLS)
      }
      if (level >= 9) {
        spells.push(...WARLOCK_LEVEL_5_SPELLS)
      }
      if (level >= 11) {
        spells.push(...WARLOCK_LEVEL_6_SPELLS)
      }
      if (level >= 13) {
        spells.push(...WARLOCK_LEVEL_7_SPELLS)
      }
      if (level >= 15) {
        spells.push(...WARLOCK_LEVEL_8_SPELLS)
      }
      if (level >= 17) {
        spells.push(...WARLOCK_LEVEL_9_SPELLS)
      }
      // Add expanded spells from subclass
      if (subclass?.id === 'great-old-one') {
        spells.push(...GOO_EXPANDED_SPELLS)
      }
      return spells
    }

    // Druid spells - full caster with level-based progression
    if (characterClass?.id === 'druid') {
      spells.push(...DRUID_LEVEL_1_SPELLS)
      if (level >= 3) {
        spells.push(...DRUID_LEVEL_2_SPELLS)
      }
      if (level >= 5) {
        spells.push(...DRUID_LEVEL_3_SPELLS)
      }
      if (level >= 7) {
        spells.push(...DRUID_LEVEL_4_SPELLS)
      }
      if (level >= 9) {
        spells.push(...DRUID_LEVEL_5_SPELLS)
      }
      if (level >= 11) {
        spells.push(...DRUID_LEVEL_6_SPELLS)
      }
      if (level >= 13) {
        spells.push(...DRUID_LEVEL_7_SPELLS)
      }
      if (level >= 15) {
        spells.push(...DRUID_LEVEL_8_SPELLS)
      }
      if (level >= 17) {
        spells.push(...DRUID_LEVEL_9_SPELLS)
      }
      return spells
    }

    // Death Knight spells - third caster progression
    if (characterClass?.id === 'death-knight') {
      spells.push(...DEATH_KNIGHT_LEVEL_1_SPELLS)
      if (level >= 7) {
        spells.push(...DEATH_KNIGHT_LEVEL_3_SPELLS)
      }
      if (level >= 13) {
        spells.push(...DEATH_KNIGHT_LEVEL_5_SPELLS)
      }
      if (level >= 17) {
        spells.push(...DEATH_KNIGHT_LEVEL_7_SPELLS)
      }
      if (level >= 19) {
        spells.push(...DEATH_KNIGHT_LEVEL_9_SPELLS)
      }
      return spells
    }

    // Cleric spells - full caster with level-based progression
    if (characterClass?.id === 'cleric') {
      spells.push(...CLERIC_LEVEL_1_SPELLS)
      if (level >= 3) {
        spells.push(...CLERIC_LEVEL_2_SPELLS)
      }
      if (level >= 5) {
        spells.push(...CLERIC_LEVEL_3_SPELLS)
      }
      if (level >= 7) {
        spells.push(...CLERIC_LEVEL_4_SPELLS)
      }
      if (level >= 9) {
        spells.push(...CLERIC_LEVEL_5_SPELLS)
      }
      if (level >= 11) {
        spells.push(...CLERIC_LEVEL_6_SPELLS)
      }
      if (level >= 13) {
        spells.push(...CLERIC_LEVEL_7_SPELLS)
      }
      if (level >= 15) {
        spells.push(...CLERIC_LEVEL_8_SPELLS)
      }
      if (level >= 17) {
        spells.push(...CLERIC_LEVEL_9_SPELLS)
      }
      return spells
    }

    // Necromancer spells - full caster with level-based progression
    if (characterClass?.id === 'necromancer') {
      spells.push(...NECROMANCER_LEVEL_1_SPELLS)
      if (level >= 3) {
        spells.push(...NECROMANCER_LEVEL_2_SPELLS)
      }
      if (level >= 5) {
        spells.push(...NECROMANCER_LEVEL_3_SPELLS)
      }
      if (level >= 7) {
        spells.push(...NECROMANCER_LEVEL_4_SPELLS)
      }
      if (level >= 9) {
        spells.push(...NECROMANCER_LEVEL_5_SPELLS)
      }
      if (level >= 11) {
        spells.push(...NECROMANCER_LEVEL_6_SPELLS)
      }
      if (level >= 13) {
        spells.push(...NECROMANCER_LEVEL_7_SPELLS)
      }
      if (level >= 15) {
        spells.push(...NECROMANCER_LEVEL_8_SPELLS)
      }
      if (level >= 17) {
        spells.push(...NECROMANCER_LEVEL_9_SPELLS)
      }
      return spells
    }

    // Sorcerer spells - full caster with level-based progression
    if (characterClass?.id === 'sorcerer') {
      spells.push(...SORCERER_LEVEL_1_SPELLS)
      if (level >= 3) {
        spells.push(...SORCERER_LEVEL_2_SPELLS)
      }
      if (level >= 5) {
        spells.push(...SORCERER_LEVEL_3_SPELLS)
      }
      if (level >= 7) {
        spells.push(...SORCERER_LEVEL_4_SPELLS)
      }
      if (level >= 9) {
        spells.push(...SORCERER_LEVEL_5_SPELLS)
      }
      if (level >= 11) {
        spells.push(...SORCERER_LEVEL_6_SPELLS)
      }
      if (level >= 13) {
        spells.push(...SORCERER_LEVEL_7_SPELLS)
      }
      if (level >= 15) {
        spells.push(...SORCERER_LEVEL_8_SPELLS)
      }
      if (level >= 17) {
        spells.push(...SORCERER_LEVEL_9_SPELLS)
      }
      return spells
    }

    // Wizard spells - full caster with level-based progression
    if (characterClass?.id === 'wizard') {
      spells.push(...WIZARD_LEVEL_1_SPELLS)
      if (level >= 3) {
        spells.push(...WIZARD_LEVEL_2_SPELLS)
      }
      if (level >= 5) {
        spells.push(...WIZARD_LEVEL_3_SPELLS)
      }
      if (level >= 7) {
        spells.push(...WIZARD_LEVEL_4_SPELLS)
      }
      if (level >= 9) {
        spells.push(...WIZARD_LEVEL_5_SPELLS)
      }
      if (level >= 11) {
        spells.push(...WIZARD_LEVEL_6_SPELLS)
      }
      if (level >= 13) {
        spells.push(...WIZARD_LEVEL_7_SPELLS)
      }
      if (level >= 15) {
        spells.push(...WIZARD_LEVEL_8_SPELLS)
      }
      if (level >= 17) {
        spells.push(...WIZARD_LEVEL_9_SPELLS)
      }
      return spells
    }

    // Amazon spells - half-caster with level-based progression
    if (characterClass?.id === 'amazon') {
      if (level >= 2) {
        spells.push(...AMAZON_LEVEL_1_SPELLS)
      }
      if (level >= 5) {
        spells.push(...AMAZON_LEVEL_2_SPELLS)
      }
      if (level >= 9) {
        spells.push(...AMAZON_LEVEL_3_SPELLS)
      }
      if (level >= 13) {
        spells.push(...AMAZON_LEVEL_4_SPELLS)
      }
      if (level >= 17) {
        spells.push(...AMAZON_LEVEL_5_SPELLS)
      }
      return spells
    }

    // Demon Hunter spells - half-caster with level-based progression
    if (characterClass?.id === 'demon-hunter') {
      if (level >= 2) {
        spells.push(...DEMON_HUNTER_LEVEL_1_SPELLS)
      }
      if (level >= 5) {
        spells.push(...DEMON_HUNTER_LEVEL_2_SPELLS)
      }
      if (level >= 9) {
        spells.push(...DEMON_HUNTER_LEVEL_3_SPELLS)
      }
      if (level >= 13) {
        spells.push(...DEMON_HUNTER_LEVEL_4_SPELLS)
      }
      if (level >= 17) {
        spells.push(...DEMON_HUNTER_LEVEL_5_SPELLS)
      }
      return spells
    }

    return []
  }, [characterClass, subclass, level])

  const selectableSpells = useMemo(
    () => availableSpells.filter((s) => !existingSpellIds.has(s.id)),
    [availableSpells, existingSpellIds],
  )

  // Determine limits based on class
  const cantripsKnown = characterClass?.cantripsKnown?.[level - 1] || 0
  const spellsKnown = characterClass?.spellsKnown?.[level - 1] || 0

  // Account for spells the character already knows when determining remaining open slots.
  // This ensures limits are enforced both in character creation (existingSpells=[]) and
  // when adding spells from the character sheet (existingSpells=current known spells).
  const existingCantripCount = existingSpells.filter((s) => s.level === 0).length
  const existingSpellCount = existingSpells.filter((s) => s.level > 0).length
  const remainingCantripSlots = Math.max(0, cantripsKnown - existingCantripCount)
  const remainingSpellSlots = Math.max(0, spellsKnown - existingSpellCount)

  const SPELL_SCHOOLS = ['abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'illusion', 'necromancy', 'transmutation'] as const

  const myClassId = characterClass?.id?.toLowerCase() ?? ''

  const sortByClass = (spells: Spell[]) => {
    if (classFilter === 'mine' && myClassId) {
      const mine: Spell[] = []
      const others: Spell[] = []
      spells.forEach(s => {
        if (s.classes?.some(c => c.toLowerCase() === myClassId)) {
          mine.push(s)
        } else {
          others.push(s)
        }
      })
      return [...mine, ...others]
    }
    if (classFilter !== 'all' && classFilter !== 'mine') {
      const matched: Spell[] = []
      const rest: Spell[] = []
      spells.forEach(s => {
        if (s.classes?.some(c => c.toLowerCase() === classFilter.toLowerCase())) {
          matched.push(s)
        } else {
          rest.push(s)
        }
      })
      return [...matched, ...rest]
    }
    return spells
  }

  const filterBySchool = (spells: Spell[]) => {
    if (schoolFilter === 'all') return spells
    return spells.filter(s => s.school?.toLowerCase() === schoolFilter.toLowerCase())
  }

  const filteredCantrips = useMemo(
    () => sortByClass(filterBySchool(selectableCantrips)),
    [selectableCantrips, schoolFilter, classFilter, myClassId],
  )

  const filteredSpells = useMemo(
    () => sortByClass(filterBySchool(selectableSpells)),
    [selectableSpells, schoolFilter, classFilter, myClassId],
  )

  const allClassIds = useMemo(() => {
    const classSet = new Set<string>()
    ;[...selectableCantrips, ...selectableSpells].forEach(s => {
      s.classes?.forEach(c => classSet.add(c.toLowerCase()))
    })
    return Array.from(classSet).sort()
  }, [selectableCantrips, selectableSpells])

  // Handle cantrip toggle
  const handleCantripToggle = (spell: Spell) => {
    setSelectedCantrips((prev: Spell[]) => {
      if (prev.find((s: Spell) => s.id === spell.id)) {
        return prev.filter((s: Spell) => s.id !== spell.id)
      }
      if (prev.length < remainingCantripSlots) {
        return [...prev, spell]
      }
      return prev
    })
  }

  // Handle spell toggle
  const handleSpellToggle = (spell: Spell) => {
    setSelectedSpells((prev: Spell[]) => {
      if (prev.find((s: Spell) => s.id === spell.id)) {
        return prev.filter((s: Spell) => s.id !== spell.id)
      }
      if (prev.length < remainingSpellSlots) {
        return [...prev, spell]
      }
      return prev
    })
  }

  // During character creation, require exact slot fill. Mid-game (DM adding spells), allow any selection.
  const isComplete = isCharacterCreation
    ? selectedCantrips.length === cantripsKnown && selectedSpells.length === spellsKnown
    : selectedCantrips.length > 0 || selectedSpells.length > 0

  const handleSubmit = () => {
    onSubmit(selectedCantrips, selectedSpells)
  }

  // Handle non-spellcasting classes
  if (!characterClass || characterClass.spellcasting === 'none') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dnd-gold mb-2">Spells</h2>
          <p className="text-gray-400">
            {characterClass?.name || 'Your class'} does not use spellcasting.
          </p>
        </div>

        <div className="p-8 bg-gray-800/50 rounded-lg text-center mb-8">
          <p className="text-gray-400">
            Fighters rely on martial prowess rather than magic. You can skip this step.
          </p>
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-700">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                     hover:border-gray-500 rounded-lg transition-colors duration-200"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => onSubmit([], [])}
            className="px-8 py-3 bg-dnd-gold text-gray-900 rounded-lg font-semibold
                     hover:bg-yellow-500 transition-colors duration-200"
          >
            {isCharacterCreation ? 'Next: Equipment' : 'Done'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dnd-gold mb-2">Select Spells</h2>
        <p className="text-gray-400">
          Choose your cantrips and spells. {characterClass.name}s use {characterClass.spellcastingAbility} for spellcasting.
        </p>
      </div>

      {/* Subclass Expanded Spells Note */}
      {subclass?.expandedSpells && (
        <div className="mb-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
          <span className="text-purple-400 font-medium">{subclass.name} Expanded Spells: </span>
          <span className="text-gray-300">
            You have access to additional spells from your patron.
          </span>
        </div>
      )}

      {/* Already-known spells info banner (mid-game only) */}
      {!isCharacterCreation && existingSpells.length > 0 && (
        <div className="mb-6 p-3 bg-blue-900/20 border border-blue-600/40 rounded-lg">
          <p className="text-sm text-blue-300">
            <span className="font-medium">{existingSpells.length} spell{existingSpells.length !== 1 ? 's' : ''} already known</span>
            {' '}— already-known spells are hidden. Select new spells to add.
          </p>
        </div>
      )}

      {/* Filter Bar */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">School:</label>
          <select
            value={schoolFilter}
            onChange={(e) => setSchoolFilter(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-gray-300 focus:outline-none focus:border-dnd-gold capitalize"
          >
            <option value="all">All Schools</option>
            {SPELL_SCHOOLS.map(s => (
              <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Sort by class:</label>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-gray-300 focus:outline-none focus:border-dnd-gold capitalize"
          >
            <option value="mine">{characterClass?.name ?? 'My Class'} First</option>
            <option value="all">No Sorting</option>
            {allClassIds.filter(c => c !== myClassId).map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)} First</option>
            ))}
          </select>
        </div>
        {(schoolFilter !== 'all' || classFilter !== 'mine') && (
          <button
            onClick={() => { setSchoolFilter('all'); setClassFilter('mine') }}
            className="text-xs text-red-400 hover:text-red-300 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Cantrips Section - Only show if class has cantrips */}
      {(cantripsKnown > 0 || !isCharacterCreation) && filteredCantrips.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              Cantrips
              {isCharacterCreation && (
                <span className="text-sm font-normal text-gray-400 ml-2">
                  (Choose {cantripsKnown})
                </span>
              )}
            </h3>
            <span className={`text-sm ${isCharacterCreation && selectedCantrips.length === cantripsKnown ? 'text-green-400' : 'text-dnd-gold'}`}>
              {selectedCantrips.length}{cantripsKnown > 0 ? ` / ${cantripsKnown}` : ''} selected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCantrips.map((spell) => (
              <SpellCard
                key={spell.id}
                spell={spell}
                isSelected={selectedCantrips.some((s) => s.id === spell.id)}
                onToggle={handleCantripToggle}
                disabled={
                  selectedCantrips.length >= remainingCantripSlots &&
                  !selectedCantrips.some((s) => s.id === spell.id)
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Half-caster early level message */}
      {characterClass.spellcasting === 'half' && level < 2 && (
        <div className="mb-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">{characterClass.name} Spellcasting</h3>
          <p className="text-gray-400">
            {characterClass.name}s gain the Spellcasting feature at <span className="text-dnd-gold font-medium">level 2</span>.
            You'll learn your first spells when you reach that level.
          </p>
        </div>
      )}

      {/* Spells Section - Group by level */}
      {(spellsKnown > 0 || !isCharacterCreation) && filteredSpells.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              Spells
              {isCharacterCreation && (
                <span className="text-sm font-normal text-gray-400 ml-2">
                  (Choose {spellsKnown} total)
                </span>
              )}
            </h3>
            <span className={`text-sm ${isCharacterCreation && selectedSpells.length === spellsKnown ? 'text-green-400' : 'text-dnd-gold'}`}>
              {selectedSpells.length}{spellsKnown > 0 ? ` / ${spellsKnown}` : ''} selected
            </span>
          </div>

          {/* Group spells by level and display each level separately */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((spellLevel) => {
            const spellsOfLevel = filteredSpells.filter((s) => s.level === spellLevel)
            if (spellsOfLevel.length === 0) return null

            return (
              <div key={spellLevel} className="mb-6">
                <h4 className="text-lg font-semibold text-dnd-gold mb-3">
                  {spellLevel === 1 ? '1st' : spellLevel === 2 ? '2nd' : spellLevel === 3 ? '3rd' : `${spellLevel}th`} Level Spells
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {spellsOfLevel.map((spell) => {
              const isExpanded = subclass?.expandedSpells?.some((es) =>
                es.spells.includes(spell.id)
              )
              return (
                <div key={spell.id} className="relative">
                  {isExpanded && (
                    <div className="absolute -top-2 -right-2 z-10 px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                      Expanded
                    </div>
                  )}
                  <SpellCard
                    spell={spell}
                    isSelected={selectedSpells.some((s) => s.id === spell.id)}
                    onToggle={handleSpellToggle}
                    disabled={
                      selectedSpells.length >= remainingSpellSlots &&
                      !selectedSpells.some((s) => s.id === spell.id)
                    }
                  />
                </div>
              )
            })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pact Magic Info */}
      {characterClass.spellcasting === 'pact' && (
        <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <h4 className="font-semibold text-white mb-2">Pact Magic</h4>
          <p className="text-sm text-gray-400">
            At level 1, you have <span className="text-dnd-gold font-medium">1 spell slot</span> that
            refreshes on a short rest. All your spells are cast at 1st level.
          </p>
        </div>
      )}

      {/* Selected Summary */}
      {(selectedCantrips.length > 0 || selectedSpells.length > 0) && (
        <div className="mb-8 p-6 bg-gray-800 rounded-xl border border-dnd-gold/30">
          <h3 className="text-lg font-bold text-dnd-gold mb-4">
            Selected Spells ({selectedCantrips.length + selectedSpells.length})
          </h3>

          {selectedCantrips.length > 0 && (
            <div className="mb-2">
              <span className="text-sm text-gray-400">Cantrips: </span>
              <span className="text-white">
                {selectedCantrips.map((s) => s.name).join(', ')}
              </span>
            </div>
          )}

          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => {
            const spellsAtLvl = selectedSpells.filter(s => s.level === lvl)
            if (spellsAtLvl.length === 0) return null
            return (
              <div key={lvl} className="mb-1">
                <span className="text-sm text-gray-400">
                  {lvl === 1 ? '1st' : lvl === 2 ? '2nd' : lvl === 3 ? '3rd' : `${lvl}th`} Level:{' '}
                </span>
                <span className="text-white">
                  {spellsAtLvl.map((s) => s.name).join(', ')}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* No results for current filter */}
      {(filteredCantrips.length === 0 && filteredSpells.length === 0) && (selectableCantrips.length > 0 || selectableSpells.length > 0) && schoolFilter !== 'all' && (
        <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700 text-center">
          <p className="text-gray-400">No spells match the current filter.</p>
          <button onClick={() => { setSchoolFilter('all'); setClassFilter('mine') }} className="mt-2 text-sm text-dnd-gold hover:text-yellow-400 underline">
            Clear filters
          </button>
        </div>
      )}

      {/* No spells available message */}
      {availableCantrips.length === 0 && availableSpells.length === 0 && (
        <div className="mb-8 p-6 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
          <p className="text-yellow-400 font-medium mb-2">Spell Selection Unavailable</p>
          <p className="text-gray-400 text-sm">
            Spell data for {characterClass.name} is still being added. You can skip this step
            and come back later, or continue without spells for now.
          </p>
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

        <div className="flex gap-3">
          {/* Skip button - always available */}
          <button
            type="button"
            onClick={() => onSubmit([], [])}
            className="px-6 py-3 text-gray-300 hover:text-white border border-gray-600
                     hover:border-gray-500 rounded-lg transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Skip for Now
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isComplete}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2
                       focus:ring-offset-gray-900
                       ${
                         isComplete
                           ? 'bg-dnd-gold text-gray-900 hover:bg-yellow-500'
                           : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                       }`}
          >
            {isCharacterCreation
              ? 'Next: Equipment'
              : `Add ${selectedCantrips.length + selectedSpells.length} Spell${selectedCantrips.length + selectedSpells.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  )
}
