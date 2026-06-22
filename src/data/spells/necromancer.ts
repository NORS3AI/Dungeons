import type { Spell } from '../../types'
import { CHILL_TOUCH, MAGE_HAND, MINOR_ILLUSION, DETECT_MAGIC } from './common'

/**
 * Necromancer Spells
 */

// Necromancer Cantrips
export const NECROMANCER_CANTRIPS: Spell[] = [
  CHILL_TOUCH,
  {
    id: 'toll-the-dead',
    name: 'Toll the Dead',
    description: 'Point at one creature you can see within range and the sound of a dolorous bell fills the air around it. Target must succeed on a Wisdom saving throw or take 1d8 necrotic damage (1d12 if the target is missing hit points). The spell\'s damage increases by one die when you reach 5th level (2d8/2d12), 11th level (3d8/3d12), and 17th level (4d8/4d12).',
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
  MINOR_ILLUSION,
  {
    id: 'poison-spray',
    name: 'Poison Spray',
    description: 'You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. The creature must succeed on a Constitution saving throw or take 1d12 poison damage. The spell\'s damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12).',
    level: 0,
    school: 'conjuration',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 10 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d12', type: 'poison' },
    savingThrow: { ability: 'constitution', effect: 'negates' },
    ritual: false,
    concentration: false,
    classes: ['necromancer', 'sorcerer', 'druid', 'warlock', 'wizard'],
  },
  {
    id: 'sapping-sting',
    name: 'Sapping Sting',
    description: 'You sap the vitality of one creature you can see in range. The target must succeed on a Constitution saving throw or take 1d4 necrotic damage and fall prone. The spell\'s damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).',
    level: 0,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d4', type: 'necrotic' },
    savingThrow: { ability: 'constitution', effect: 'negates' },
    ritual: false,
    concentration: false,
    classes: ['necromancer', 'wizard'],
  },
  // Diablo-inspired cantrips
  {
    id: 'bone-splinter',
    name: 'Bone Splinter',
    description: 'You conjure a shard of sharpened bone and hurl it at a creature within range. Make a ranged spell attack. On a hit, the target takes 1d8 piercing damage. If the target is a corpse or undead, the bone shard splinters on impact and one other creature within 5 feet of the target takes 1d4 piercing damage. The spell\'s damage increases by 1d8 (and 1d4 splash) when you reach 5th level (2d8/2d4), 11th level (3d8/3d4), and 17th level (4d8/4d4).',
    level: 0,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 60 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d8', type: 'piercing' },
    attackRoll: true,
    ritual: false,
    concentration: false,
    classes: ['necromancer'],
  },
  {
    id: 'corpse-burst',
    name: 'Corpse Burst',
    description: 'You point at a corpse of a Small or larger creature within range, causing it to pop with necrotic energy. Each creature within 5 feet of the corpse must succeed on a Dexterity saving throw or take 1d6 necrotic damage. The corpse is destroyed. If no corpse is available, the spell fails. The spell\'s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).',
    level: 0,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d6', type: 'necrotic' },
    savingThrow: { ability: 'dexterity', effect: 'negates' },
    ritual: false,
    concentration: false,
    classes: ['necromancer'],
  },
  {
    id: 'grasp-of-the-dead',
    name: 'Grasp of the Dead',
    description: 'Skeletal hands claw up from the ground beneath a creature you can see within range. The target must succeed on a Strength saving throw or take 1d6 necrotic damage and have its speed reduced by 10 feet until the end of its next turn. The spell\'s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).',
    level: 0,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 60 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d6', type: 'necrotic' },
    savingThrow: { ability: 'strength', effect: 'negates' },
    ritual: false,
    concentration: false,
    classes: ['necromancer'],
  },
  {
    id: 'blood-siphon',
    name: 'Blood Siphon',
    description: 'You reach out with dark magic and pull at the life force of a creature you can see within range. The target must succeed on a Constitution saving throw or take 1d6 necrotic damage. If the target fails the save, you gain temporary hit points equal to half the damage dealt (minimum 1). The spell\'s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).',
    level: 0,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d6', type: 'necrotic' },
    savingThrow: { ability: 'constitution', effect: 'negates' },
    ritual: false,
    concentration: false,
    classes: ['necromancer'],
  },
  {
    id: 'spectral-scythe',
    name: 'Spectral Scythe',
    description: 'You sweep your hand in an arc and a ghostly scythe blade materializes, slashing at a creature within range. Make a melee spell attack. On a hit, the target takes 1d10 necrotic damage. If this damage reduces the target to 0 hit points, you gain 1d4 temporary hit points as their departing life energy flows into you. The spell\'s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).',
    level: 0,
    school: 'necromancy',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'touch' },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d10', type: 'necrotic' },
    attackRoll: true,
    ritual: false,
    concentration: false,
    classes: ['necromancer'],
  },
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

// Necromancer 2nd Level Spells
export const NECROMANCER_LEVEL_2_SPELLS: Spell[] = []

// Necromancer 3rd Level Spells
export const NECROMANCER_LEVEL_3_SPELLS: Spell[] = []

// Necromancer 4th Level Spells
export const NECROMANCER_LEVEL_4_SPELLS: Spell[] = []

// Necromancer 5th Level Spells
export const NECROMANCER_LEVEL_5_SPELLS: Spell[] = []

// Necromancer 6th Level Spells
export const NECROMANCER_LEVEL_6_SPELLS: Spell[] = []

// Necromancer 7th Level Spells
export const NECROMANCER_LEVEL_7_SPELLS: Spell[] = []

// Necromancer 8th Level Spells
export const NECROMANCER_LEVEL_8_SPELLS: Spell[] = []

// Necromancer 9th Level Spells
export const NECROMANCER_LEVEL_9_SPELLS: Spell[] = []
