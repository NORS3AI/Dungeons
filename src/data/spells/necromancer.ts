import type { Spell } from '../../types'
import { CHILL_TOUCH, MAGE_HAND, DETECT_MAGIC } from './common'

/**
 * Necromancer Spells
 */

// Necromancer Cantrips
export const NECROMANCER_CANTRIPS: Spell[] = [
  CHILL_TOUCH,
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
  MAGE_HAND,
]

// Necromancer 1st Level Spells
export const NECROMANCER_LEVEL_1_SPELLS: Spell[] = [
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
  DETECT_MAGIC,
]
