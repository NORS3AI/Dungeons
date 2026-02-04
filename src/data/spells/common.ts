import type { Spell } from '../../types'

/**
 * Common spells shared across multiple classes
 */

export const CHILL_TOUCH: Spell = {
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
}

export const MAGE_HAND: Spell = {
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
}

export const MINOR_ILLUSION: Spell = {
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
}

export const PRESTIDIGITATION: Spell = {
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
}

export const CHARM_PERSON: Spell = {
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
}

export const DETECT_MAGIC: Spell = {
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
}
