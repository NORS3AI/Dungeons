import { useState, useMemo } from 'react'
import type { Spell, Class, Subclass } from '../types'
import { ELDRITCH_BLAST } from '../types'
import { SpellCard } from './SpellCard'

// Sample Warlock Cantrips
const WARLOCK_CANTRIPS: Spell[] = [
  ELDRITCH_BLAST,
  {
    id: 'chill-touch',
    name: 'Chill Touch',
    description: 'Create a ghostly skeletal hand that assails a creature with the chill of the grave.',
    level: 0,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 120 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'round' },
    damage: { dice: '1d8', type: 'necrotic' },
    attackRoll: true,
    ritual: false,
    concentration: false,
    classes: ['warlock', 'wizard', 'sorcerer'],
  },
  {
    id: 'minor-illusion',
    name: 'Minor Illusion',
    description: 'Create a sound or image of an object within range that lasts for 1 minute.',
    level: 0,
    school: 'illusion',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: false, somatic: true, material: true, materialDescription: 'a bit of fleece' },
    duration: { type: 'timed', amount: 1, unit: 'minute' },
    ritual: false,
    concentration: false,
    classes: ['warlock', 'wizard', 'sorcerer', 'bard'],
  },
  {
    id: 'prestidigitation',
    name: 'Prestidigitation',
    description: 'A minor magical trick used for practice or entertainment.',
    level: 0,
    school: 'transmutation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 10 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'hour' },
    ritual: false,
    concentration: false,
    classes: ['warlock', 'wizard', 'sorcerer', 'bard'],
  },
  {
    id: 'mage-hand',
    name: 'Mage Hand',
    description: 'A spectral floating hand appears to manipulate objects at range.',
    level: 0,
    school: 'conjuration',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'minute' },
    ritual: false,
    concentration: false,
    classes: ['warlock', 'wizard', 'sorcerer', 'bard'],
  },
]

// Necromancer Cantrips
const NECROMANCER_CANTRIPS: Spell[] = [
  {
    id: 'chill-touch',
    name: 'Chill Touch',
    description: 'Create a ghostly skeletal hand that assails a creature with the chill of the grave.',
    level: 0,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 120 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'round' },
    damage: { dice: '1d8', type: 'necrotic' },
    attackRoll: true,
    ritual: false,
    concentration: false,
    classes: ['necromancer', 'warlock', 'wizard', 'sorcerer'],
  },
  {
    id: 'toll-the-dead',
    name: 'Toll the Dead',
    description: 'Point at one creature you can see within range and the sound of a dolorous bell fills the air around it. Target must succeed on a Wisdom saving throw or take 1d8 necrotic damage (1d12 if the target is missing hit points).',
    level: 0,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 60 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d8', type: 'necrotic' },
    savingThrow: { ability: 'wisdom', effect: 'takes 1d8 necrotic damage' },
    ritual: false,
    concentration: false,
    classes: ['necromancer', 'cleric', 'warlock', 'wizard'],
  },
  {
    id: 'spare-the-dying',
    name: 'Spare the Dying',
    description: 'You touch a living creature that has 0 hit points. The creature becomes stable.',
    level: 0,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'touch' },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    ritual: false,
    concentration: false,
    classes: ['necromancer', 'cleric'],
  },
  {
    id: 'mage-hand',
    name: 'Mage Hand',
    description: 'A spectral floating hand appears to manipulate objects at range.',
    level: 0,
    school: 'conjuration',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'minute' },
    ritual: false,
    concentration: false,
    classes: ['necromancer', 'warlock', 'wizard', 'sorcerer', 'bard'],
  },
]

// Necromancer 1st Level Spells
const NECROMANCER_LEVEL_1_SPELLS: Spell[] = [
  {
    id: 'inflict-wounds',
    name: 'Inflict Wounds',
    description: 'Make a melee spell attack against a creature. On a hit, the target takes 3d10 necrotic damage.',
    level: 1,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'touch' },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '3d10', type: 'necrotic' },
    attackRoll: true,
    ritual: false,
    concentration: false,
    classes: ['necromancer', 'cleric'],
  },
  {
    id: 'ray-of-sickness',
    name: 'Ray of Sickness',
    description: 'A ray of sickening greenish energy lashes out. On a hit, target takes 2d8 poison damage and must make a Constitution saving throw or be poisoned until the end of your next turn.',
    level: 1,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 60 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '2d8', type: 'poison' },
    attackRoll: true,
    savingThrow: { ability: 'constitution', effect: 'poisoned until end of next turn' },
    ritual: false,
    concentration: false,
    classes: ['necromancer', 'wizard', 'sorcerer'],
  },
  {
    id: 'false-life',
    name: 'False Life',
    description: 'Bolster yourself with a necromantic facsimile of life, gaining 1d4+4 temporary hit points for 1 hour.',
    level: 1,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'self' },
    components: { verbal: true, somatic: true, material: true, materialDescription: 'a small amount of alcohol or distilled spirits' },
    duration: { type: 'timed', amount: 1, unit: 'hour' },
    ritual: false,
    concentration: false,
    classes: ['necromancer', 'wizard', 'sorcerer'],
  },
  {
    id: 'detect-magic',
    name: 'Detect Magic',
    description: 'For the duration, you sense the presence of magic within 30 feet of you.',
    level: 1,
    school: 'divination',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'self' },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'concentration', amount: 10, unit: 'minute' },
    ritual: true,
    concentration: true,
    classes: ['necromancer', 'wizard', 'cleric', 'bard', 'druid', 'paladin', 'ranger', 'sorcerer'],
  },
]

// Sample Warlock 1st Level Spells
const WARLOCK_LEVEL_1_SPELLS: Spell[] = [
  {
    id: 'hex',
    name: 'Hex',
    description: 'Curse a creature to take extra necrotic damage and have disadvantage on one ability check.',
    level: 1,
    school: 'enchantment',
    castingTime: { amount: 1, unit: 'bonusAction' },
    range: { type: 'ranged', distance: 90 },
    components: { verbal: true, somatic: true, material: true, materialDescription: 'the petrified eye of a newt' },
    duration: { type: 'concentration', amount: 1, unit: 'hour' },
    damage: { dice: '1d6', type: 'necrotic' },
    ritual: false,
    concentration: true,
    classes: ['warlock'],
    atHigherLevels: 'Duration increases at higher spell slot levels.',
  },
  {
    id: 'armor-of-agathys',
    name: 'Armor of Agathys',
    description: 'Gain 5 temporary HP. Creatures that hit you with melee attacks take 5 cold damage.',
    level: 1,
    school: 'abjuration',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'self' },
    components: { verbal: true, somatic: true, material: true, materialDescription: 'a cup of water' },
    duration: { type: 'timed', amount: 1, unit: 'hour' },
    ritual: false,
    concentration: false,
    classes: ['warlock'],
    atHigherLevels: 'Both the temp HP and cold damage increase by 5 for each slot level above 1st.',
  },
  {
    id: 'hellish-rebuke',
    name: 'Hellish Rebuke',
    description: 'React to being damaged by surrounding yourself in hellish flames.',
    level: 1,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'reaction', reactionTrigger: 'being damaged by a creature within 60 feet' },
    range: { type: 'ranged', distance: 60 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '2d10', type: 'fire' },
    savingThrow: { ability: 'dexterity', effect: 'half damage' },
    ritual: false,
    concentration: false,
    classes: ['warlock'],
  },
  {
    id: 'charm-person',
    name: 'Charm Person',
    description: 'Attempt to charm a humanoid you can see within range.',
    level: 1,
    school: 'enchantment',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'hour' },
    savingThrow: { ability: 'wisdom', effect: 'negates' },
    ritual: false,
    concentration: false,
    classes: ['warlock', 'wizard', 'sorcerer', 'bard'],
  },
  {
    id: 'witch-bolt',
    name: 'Witch Bolt',
    description: 'A beam of crackling blue energy lances toward a creature, dealing lightning damage.',
    level: 1,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: true, materialDescription: 'a twig from a lightning-struck tree' },
    duration: { type: 'concentration', amount: 1, unit: 'minute' },
    damage: { dice: '1d12', type: 'lightning' },
    attackRoll: true,
    ritual: false,
    concentration: true,
    classes: ['warlock', 'wizard', 'sorcerer'],
  },
]

// Great Old One expanded spells (level 1)
const GOO_EXPANDED_SPELLS: Spell[] = [
  {
    id: 'dissonant-whispers',
    name: 'Dissonant Whispers',
    description: 'Whisper a discordant melody only one creature can hear, causing psychic damage.',
    level: 1,
    school: 'enchantment',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 60 },
    components: { verbal: true, somatic: false, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '3d6', type: 'psychic' },
    savingThrow: { ability: 'wisdom', effect: 'half damage, no flee' },
    ritual: false,
    concentration: false,
    classes: ['bard', 'warlock'],
  },
  {
    id: 'tashas-hideous-laughter',
    name: "Tasha's Hideous Laughter",
    description: 'A creature falls prone in fits of laughter, incapacitated.',
    level: 1,
    school: 'enchantment',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: true, materialDescription: 'tiny tarts and a feather' },
    duration: { type: 'concentration', amount: 1, unit: 'minute' },
    savingThrow: { ability: 'wisdom', effect: 'negates' },
    ritual: false,
    concentration: true,
    classes: ['wizard', 'bard', 'warlock'],
  },
]

interface SpellSelectorProps {
  characterClass?: Class | null
  subclass?: Subclass | null
  level?: number
  onSubmit: (cantrips: Spell[], spells: Spell[]) => void
  onBack: () => void
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
}: SpellSelectorProps) {
  const [selectedCantrips, setSelectedCantrips] = useState<Spell[]>([])
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>([])

  // Determine available spells based on class
  const availableCantrips = useMemo(() => {
    if (characterClass?.id === 'warlock') return WARLOCK_CANTRIPS
    if (characterClass?.id === 'necromancer') return NECROMANCER_CANTRIPS
    return []
  }, [characterClass])

  const availableSpells = useMemo(() => {
    if (characterClass?.id === 'warlock') {
      const spells = [...WARLOCK_LEVEL_1_SPELLS]
      // Add expanded spells from subclass
      if (subclass?.id === 'great-old-one') {
        spells.push(...GOO_EXPANDED_SPELLS)
      }
      return spells
    }
    if (characterClass?.id === 'necromancer') {
      return [...NECROMANCER_LEVEL_1_SPELLS]
    }
    return []
  }, [characterClass, subclass])

  // Determine limits based on class
  const cantripsKnown = characterClass?.cantripsKnown?.[level - 1] || 0
  const spellsKnown = characterClass?.spellsKnown?.[level - 1] || 0

  // Handle cantrip toggle
  const handleCantripToggle = (spell: Spell) => {
    setSelectedCantrips((prev) => {
      if (prev.find((s) => s.id === spell.id)) {
        return prev.filter((s) => s.id !== spell.id)
      }
      if (prev.length < cantripsKnown) {
        return [...prev, spell]
      }
      return prev
    })
  }

  // Handle spell toggle
  const handleSpellToggle = (spell: Spell) => {
    setSelectedSpells((prev) => {
      if (prev.find((s) => s.id === spell.id)) {
        return prev.filter((s) => s.id !== spell.id)
      }
      if (prev.length < spellsKnown) {
        return [...prev, spell]
      }
      return prev
    })
  }

  const isComplete =
    selectedCantrips.length === cantripsKnown && selectedSpells.length === spellsKnown

  const handleSubmit = () => {
    if (isComplete) {
      onSubmit(selectedCantrips, selectedSpells)
    }
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
            Next: Equipment
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

      {/* Cantrips Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">
            Cantrips
            <span className="text-sm font-normal text-gray-400 ml-2">
              (Choose {cantripsKnown})
            </span>
          </h3>
          <span className={`text-sm ${selectedCantrips.length === cantripsKnown ? 'text-green-400' : 'text-dnd-gold'}`}>
            {selectedCantrips.length} / {cantripsKnown} selected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableCantrips.map((spell) => (
            <SpellCard
              key={spell.id}
              spell={spell}
              isSelected={selectedCantrips.some((s) => s.id === spell.id)}
              onToggle={handleCantripToggle}
              disabled={
                selectedCantrips.length >= cantripsKnown &&
                !selectedCantrips.some((s) => s.id === spell.id)
              }
            />
          ))}
        </div>
      </div>

      {/* Level 1 Spells Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">
            1st Level Spells
            <span className="text-sm font-normal text-gray-400 ml-2">
              (Choose {spellsKnown})
            </span>
          </h3>
          <span className={`text-sm ${selectedSpells.length === spellsKnown ? 'text-green-400' : 'text-dnd-gold'}`}>
            {selectedSpells.length} / {spellsKnown} selected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableSpells.map((spell) => {
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
                    selectedSpells.length >= spellsKnown &&
                    !selectedSpells.some((s) => s.id === spell.id)
                  }
                />
              </div>
            )
          })}
        </div>
      </div>

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
          <h3 className="text-lg font-bold text-dnd-gold mb-4">Selected Spells</h3>

          {selectedCantrips.length > 0 && (
            <div className="mb-4">
              <span className="text-sm text-gray-400">Cantrips: </span>
              <span className="text-white">
                {selectedCantrips.map((s) => s.name).join(', ')}
              </span>
            </div>
          )}

          {selectedSpells.length > 0 && (
            <div>
              <span className="text-sm text-gray-400">1st Level: </span>
              <span className="text-white">
                {selectedSpells.map((s) => s.name).join(', ')}
              </span>
            </div>
          )}
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
            Next: Equipment
          </button>
        </div>
      </div>
    </div>
  )
}
