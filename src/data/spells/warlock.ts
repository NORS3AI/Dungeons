import type { Spell } from '../../types'
import { ELDRITCH_BLAST } from '../../types'
import { CHILL_TOUCH, MAGE_HAND, MINOR_ILLUSION, PRESTIDIGITATION, CHARM_PERSON } from './common'

/**
 * Warlock Spells
 */

// Warlock Cantrips
export const WARLOCK_CANTRIPS: Spell[] = [
  ELDRITCH_BLAST,
  CHILL_TOUCH,
  MINOR_ILLUSION,
  PRESTIDIGITATION,
  MAGE_HAND,
]

// Warlock 1st Level Spells
export const WARLOCK_LEVEL_1_SPELLS: Spell[] = [
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
  CHARM_PERSON,
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
