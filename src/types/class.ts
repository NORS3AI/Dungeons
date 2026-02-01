/**
 * Hit die type for a class
 */
export type HitDie = 'd6' | 'd8' | 'd10' | 'd12'

/**
 * Ability type
 */
export type Ability = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'

/**
 * Spellcasting type
 */
export type SpellcastingType = 'none' | 'full' | 'half' | 'third' | 'pact'

/**
 * Class feature
 */
export interface ClassFeature {
  id: string
  name: string
  description: string
  level: number
  charges?: {
    amount: number | 'proficiencyBonus' | 'abilityModifier'
    abilityModifier?: Ability
    rechargeOn: 'shortRest' | 'longRest' | 'dawn'
  }
}

/**
 * Fighting style option
 */
export interface FightingStyle {
  id: string
  name: string
  description: string
}

/**
 * D&D Class
 */
export interface Class {
  id: string
  name: string
  description: string

  // Core
  hitDie: HitDie
  primaryAbility: Ability[]

  // Saving throws
  savingThrows: [Ability, Ability]

  // Proficiencies
  armorProficiencies: string[]
  weaponProficiencies: string[]
  toolProficiencies: string[]
  skillChoices: {
    choose: number
    from: string[]
  }

  // Spellcasting
  spellcasting: SpellcastingType
  spellcastingAbility?: Ability
  cantripsKnown?: number[]
  spellsKnown?: number[]

  // Features by level
  features: ClassFeature[]

  // Fighting styles (for martial classes)
  fightingStyles?: FightingStyle[]

  // Available subclasses
  subclassLevel: number
  subclassName: string // e.g., "Martial Archetype", "Otherworldly Patron"
}

/**
 * Subclass definition
 */
export interface Subclass {
  id: string
  name: string
  description: string
  parentClassId: string

  // Features
  features: ClassFeature[]

  // Expanded spell list (for casters)
  expandedSpells?: {
    level: number
    spells: string[]
  }[]
}

/**
 * Fighter class definition
 */
export const FIGHTER: Class = {
  id: 'fighter',
  name: 'Fighter',
  description: 'A master of martial combat, skilled with a variety of weapons and armor.',
  hitDie: 'd10',
  primaryAbility: ['strength', 'dexterity'],
  savingThrows: ['strength', 'constitution'],
  armorProficiencies: ['light', 'medium', 'heavy', 'shields'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
  },
  spellcasting: 'none',
  features: [
    {
      id: 'fighting-style',
      name: 'Fighting Style',
      description: 'You adopt a particular style of fighting as your specialty.',
      level: 1,
    },
    {
      id: 'second-wind',
      name: 'Second Wind',
      description: 'You have a limited well of stamina that you can draw on to recover 1d10 + fighter level HP.',
      level: 1,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'action-surge',
      name: 'Action Surge',
      description: 'You can push yourself beyond your normal limits for a moment to take one additional action.',
      level: 2,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'extra-attack',
      name: 'Extra Attack',
      description: 'You can attack twice when you take the Attack action on your turn.',
      level: 5,
    },
    {
      id: 'extra-attack-2',
      name: 'Extra Attack (2)',
      description: 'You can attack three times when you take the Attack action.',
      level: 11,
    },
    {
      id: 'extra-attack-3',
      name: 'Extra Attack (3)',
      description: 'You can attack four times when you take the Attack action.',
      level: 20,
    },
  ],
  fightingStyles: [
    { id: 'archery', name: 'Archery', description: '+2 bonus to attack rolls with ranged weapons.' },
    { id: 'defense', name: 'Defense', description: '+1 bonus to AC while wearing armor.' },
    { id: 'dueling', name: 'Dueling', description: '+2 bonus to damage with one-handed melee weapon and no other weapons.' },
    { id: 'great-weapon', name: 'Great Weapon Fighting', description: 'Reroll 1s and 2s on damage dice for two-handed weapons.' },
    { id: 'protection', name: 'Protection', description: 'Use reaction to impose disadvantage on attack against adjacent ally.' },
    { id: 'two-weapon', name: 'Two-Weapon Fighting', description: 'Add ability modifier to off-hand attack damage.' },
    { id: 'dual-two-handed', name: 'Dual Two-Handed', description: 'Wield two two-handed weapons simultaneously (e.g., two greatswords). -4 AC penalty but roll damage for both weapons.' },
  ],
  subclassLevel: 3,
  subclassName: 'Martial Archetype',
}

/**
 * Warlock class definition
 */
export const WARLOCK: Class = {
  id: 'warlock',
  name: 'Warlock',
  description: 'A wielder of magic derived from a bargain with an extraplanar entity.',
  hitDie: 'd8',
  primaryAbility: ['charisma'],
  savingThrows: ['wisdom', 'charisma'],
  armorProficiencies: ['light'],
  weaponProficiencies: ['simple'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
  },
  spellcasting: 'pact',
  spellcastingAbility: 'charisma',
  cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  spellsKnown: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
  features: [
    {
      id: 'pact-magic',
      name: 'Pact Magic',
      description: 'Your arcane research has granted you the ability to cast spells using Pact Magic.',
      level: 1,
    },
    {
      id: 'eldritch-invocations',
      name: 'Eldritch Invocations',
      description: 'You uncover eldritch secrets that imbue you with magical abilities.',
      level: 2,
    },
    {
      id: 'pact-boon',
      name: 'Pact Boon',
      description: 'Your patron bestows a gift upon you for your loyal service.',
      level: 3,
    },
    {
      id: 'mystic-arcanum-6',
      name: 'Mystic Arcanum (6th level)',
      description: 'Your patron bestows upon you a magical secret called an arcanum.',
      level: 11,
    },
    {
      id: 'mystic-arcanum-7',
      name: 'Mystic Arcanum (7th level)',
      description: 'You gain a 7th-level arcanum.',
      level: 13,
    },
    {
      id: 'mystic-arcanum-8',
      name: 'Mystic Arcanum (8th level)',
      description: 'You gain an 8th-level arcanum.',
      level: 15,
    },
    {
      id: 'mystic-arcanum-9',
      name: 'Mystic Arcanum (9th level)',
      description: 'You gain a 9th-level arcanum.',
      level: 17,
    },
    {
      id: 'eldritch-master',
      name: 'Eldritch Master',
      description: 'You can regain all Pact Magic spell slots by spending 1 minute entreating your patron.',
      level: 20,
      charges: { amount: 1, rechargeOn: 'longRest' },
    },
  ],
  subclassLevel: 1,
  subclassName: 'Otherworldly Patron',
}

/**
 * Great Old One subclass
 */
export const GREAT_OLD_ONE: Subclass = {
  id: 'great-old-one',
  name: 'The Great Old One',
  description: 'Your patron is a mysterious entity from the Far Realm or beyond the stars.',
  parentClassId: 'warlock',
  features: [
    {
      id: 'awakened-mind',
      name: 'Awakened Mind',
      description: 'You can telepathically speak to any creature within 30 feet.',
      level: 1,
    },
    {
      id: 'entropic-ward',
      name: 'Entropic Ward',
      description: 'Use reaction to impose disadvantage on an attack; if it misses, gain advantage on next attack.',
      level: 6,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'thought-shield',
      name: 'Thought Shield',
      description: 'Your thoughts can\'t be read, you have resistance to psychic damage, and reflect damage on telepathic contact.',
      level: 10,
    },
    {
      id: 'create-thrall',
      name: 'Create Thrall',
      description: 'You can charm an incapacitated humanoid indefinitely.',
      level: 14,
    },
  ],
  expandedSpells: [
    { level: 1, spells: ['dissonant-whispers', 'tashas-hideous-laughter'] },
    { level: 2, spells: ['detect-thoughts', 'phantasmal-force'] },
    { level: 3, spells: ['clairvoyance', 'sending'] },
    { level: 4, spells: ['dominate-beast', 'evards-black-tentacles'] },
    { level: 5, spells: ['dominate-person', 'telekinesis'] },
  ],
}
