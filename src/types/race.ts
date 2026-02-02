import type { AbilityScores } from './character'

/**
 * Ability score bonus from a race
 */
export type AbilityBonus = Partial<AbilityScores>

/**
 * Racial trait/feature
 */
export interface RacialTrait {
  id: string
  name: string
  description: string
  level?: number // Level at which this trait is gained (default: 1)
}

/**
 * Racial spellcasting ability
 */
export interface RacialSpell {
  spellId: string
  spellName: string
  levelGained: number
  castingAbility: 'intelligence' | 'wisdom' | 'charisma'
  usesPerDay: number | 'atwill'
}

/**
 * Vision type
 */
export type VisionType = 'normal' | 'darkvision' | 'superiorDarkvision' | 'blindsight' | 'truesight'

/**
 * Source book reference
 */
export interface SourceBook {
  name: string
  abbreviation: string
  page?: number
}

/**
 * Common D&D source books
 */
export const SOURCE_BOOKS = {
  PHB: { name: "Player's Handbook", abbreviation: 'PHB' },
  PHB2024: { name: "Player's Handbook (2024)", abbreviation: 'PHB24' },
  MM: { name: "Monster Manual", abbreviation: 'MM' },
  DMG: { name: "Dungeon Master's Guide", abbreviation: 'DMG' },
  MPMM: { name: "Mordenkainen Presents: Monsters of the Multiverse", abbreviation: 'MPMM' },
  VGM: { name: "Volo's Guide to Monsters", abbreviation: 'VGM' },
  XGTE: { name: "Xanathar's Guide to Everything", abbreviation: 'XGtE' },
  TCOE: { name: "Tasha's Cauldron of Everything", abbreviation: 'TCoE' },
  SCAG: { name: "Sword Coast Adventurer's Guide", abbreviation: 'SCAG' },
  ERLW: { name: "Eberron: Rising from the Last War", abbreviation: 'ERLW' },
  GGR: { name: "Guildmaster's Guide to Ravnica", abbreviation: 'GGR' },
  SAIS: { name: "Spelljammer: Adventures in Space", abbreviation: 'SJ:AiS' },
  SAC: { name: "Strixhaven: A Curriculum of Chaos", abbreviation: 'SCC' },
  WBTW: { name: "The Wild Beyond the Witchlight", abbreviation: 'WBtW' },
  EGW: { name: "Explorer's Guide to Wildemount", abbreviation: 'EGW' },
} as const

/**
 * D&D Race/Species
 */
export interface Race {
  id: string
  name: string
  description: string

  // Visual icon (emoji or SVG identifier)
  icon?: string

  // Category for organization
  category?: 'common' | 'exotic' | 'monstrous' | 'planar' | 'aquatic' | 'aerial'

  // Source book reference
  sourceBook?: SourceBook

  // Ability bonuses
  abilityBonuses: AbilityBonus

  // Size
  size: 'tiny' | 'small' | 'medium' | 'large'

  // Speed
  speed: number
  flySpeed?: number
  swimSpeed?: number
  climbSpeed?: number

  // Vision
  vision: VisionType
  visionRange?: number // in feet

  // Languages
  languages: string[]

  // Traits
  traits: RacialTrait[]

  // Racial spellcasting
  spells?: RacialSpell[]

  // Proficiencies
  weaponProficiencies?: string[]
  armorProficiencies?: string[]
  toolProficiencies?: string[]
  skillProficiencies?: string[]

  // Resistances & Immunities
  damageResistances?: string[]
  conditionImmunities?: string[]

  // Subraces
  subraces?: Race[]
}

/**
 * Drow race definition
 */
export const DROW: Race = {
  id: 'drow',
  name: 'Drow',
  description: 'Dark elves who dwell in the Underdark, known for their superior darkvision and innate magic.',
  abilityBonuses: {
    dexterity: 2,
    charisma: 1,
  },
  size: 'medium',
  speed: 30,
  vision: 'superiorDarkvision',
  visionRange: 120,
  languages: ['Common', 'Elvish', 'Undercommon'],
  traits: [
    {
      id: 'fey-ancestry',
      name: 'Fey Ancestry',
      description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
    },
    {
      id: 'trance',
      name: 'Trance',
      description: 'You don\'t need to sleep. Instead, you meditate deeply for 4 hours a day.',
    },
    {
      id: 'sunlight-sensitivity',
      name: 'Sunlight Sensitivity',
      description: 'You have disadvantage on attack rolls and Perception checks that rely on sight when you, the target, or what you\'re trying to perceive is in direct sunlight.',
    },
  ],
  spells: [
    { spellId: 'dancing-lights', spellName: 'Dancing Lights', levelGained: 1, castingAbility: 'charisma', usesPerDay: 'atwill' },
    { spellId: 'faerie-fire', spellName: 'Faerie Fire', levelGained: 3, castingAbility: 'charisma', usesPerDay: 1 },
    { spellId: 'darkness', spellName: 'Darkness', levelGained: 5, castingAbility: 'charisma', usesPerDay: 1 },
  ],
  weaponProficiencies: ['rapier', 'shortsword', 'hand-crossbow'],
}

/**
 * Tiefling race definition
 */
export const TIEFLING: Race = {
  id: 'tiefling',
  name: 'Tiefling',
  description: 'Tieflings are derived from human bloodlines touched by the power of the Nine Hells.',
  abilityBonuses: {
    charisma: 2,
    intelligence: 1,
  },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Infernal'],
  traits: [
    {
      id: 'hellish-resistance',
      name: 'Hellish Resistance',
      description: 'You have resistance to fire damage.',
    },
  ],
  damageResistances: ['fire'],
  spells: [
    { spellId: 'thaumaturgy', spellName: 'Thaumaturgy', levelGained: 1, castingAbility: 'charisma', usesPerDay: 'atwill' },
    { spellId: 'hellish-rebuke', spellName: 'Hellish Rebuke', levelGained: 3, castingAbility: 'charisma', usesPerDay: 1 },
    { spellId: 'darkness', spellName: 'Darkness', levelGained: 5, castingAbility: 'charisma', usesPerDay: 1 },
  ],
}

/**
 * Human race definition (2024 PHB)
 */
export const HUMAN: Race = {
  id: 'human',
  name: 'Human',
  description: 'Humans are the most adaptable and ambitious people among the common races. They are also the most numerous.',
  abilityBonuses: {
    // 2024 PHB: Humans get +2 to one ability and +1 to another (player choice)
    // For simplicity, we default to common choices, but this could be made dynamic
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
  },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common'],
  traits: [
    {
      id: 'resourceful',
      name: 'Resourceful',
      description: 'You gain Inspiration whenever you finish a Long Rest.',
    },
    {
      id: 'skillful',
      name: 'Skillful',
      description: 'You gain proficiency in one skill of your choice.',
    },
    {
      id: 'versatile',
      name: 'Versatile',
      description: 'You gain an Origin feat of your choice (Skilled feat recommended for new players).',
    },
  ],
  skillProficiencies: ['any'], // Player chooses one skill
}

/**
 * Half-Elf race definition
 */
export const HALF_ELF: Race = {
  id: 'half-elf',
  name: 'Half-Elf',
  description: 'Half-elves combine what some say are the best qualities of their elf and human parents.',
  abilityBonuses: {
    charisma: 2,
    // +1 to two other abilities of choice - using common defaults
    constitution: 1,
    wisdom: 1,
  },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Elvish'],
  traits: [
    {
      id: 'fey-ancestry',
      name: 'Fey Ancestry',
      description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
    },
    {
      id: 'skill-versatility',
      name: 'Skill Versatility',
      description: 'You gain proficiency in two skills of your choice.',
    },
  ],
  conditionImmunities: ['magical sleep'],
}

/**
 * Dwarf race definition
 */
export const DWARF: Race = {
  id: 'dwarf',
  name: 'Dwarf',
  description: 'Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.',
  abilityBonuses: {
    constitution: 2,
    wisdom: 1,
  },
  size: 'medium',
  speed: 25, // Not reduced by heavy armor
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Dwarvish'],
  traits: [
    {
      id: 'dwarven-resilience',
      name: 'Dwarven Resilience',
      description: 'You have advantage on saving throws against poison, and you have resistance against poison damage.',
    },
    {
      id: 'dwarven-combat-training',
      name: 'Dwarven Combat Training',
      description: 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.',
    },
    {
      id: 'stonecunning',
      name: 'Stonecunning',
      description: 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient and add double your proficiency bonus.',
    },
  ],
  damageResistances: ['poison'],
  weaponProficiencies: ['battleaxe', 'handaxe', 'light-hammer', 'warhammer'],
}
