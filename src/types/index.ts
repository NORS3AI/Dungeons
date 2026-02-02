// Character types
export type {
  AbilityScores,
  ProficiencyLevel,
  Skills,
  SavingThrows,
  HitPoints,
  DeathSaves,
  SpellSlots,
  FeatureCharge,
  Condition,
  Character,
} from './character'

export {
  DEFAULT_ABILITY_SCORES,
  STANDARD_ARRAY,
  POINT_BUY_COSTS,
  POINT_BUY_TOTAL,
} from './character'

// Race types
export type {
  AbilityBonus,
  RacialTrait,
  RacialSpell,
  VisionType,
  Race,
} from './race'

export { DROW, TIEFLING, HUMAN, HALF_ELF, DWARF } from './race'

// Class types
export type {
  HitDie,
  Ability,
  SpellcastingType,
  ClassFeature,
  FightingStyle,
  Class,
  Subclass,
} from './class'

export { FIGHTER, WARLOCK, GREAT_OLD_ONE, FIEND, ARCHFEY, CHAMPION, BATTLE_MASTER } from './class'

// Spell types
export type {
  SpellSchool,
  SpellComponents,
  CastingTime,
  SpellDuration,
  SpellRange,
  SpellScaling,
  Spell,
} from './spell'

export { ELDRITCH_BLAST } from './spell'

// Equipment types
export type {
  Currency,
  EquipmentCategory,
  WeaponProperty,
  WeaponType,
  WeaponCategory,
  DamageType,
  ArmorType,
  BaseEquipment,
  Weapon,
  Armor,
  Shield,
  GenericEquipment,
  Equipment,
  WeaponMasteryStyle,
  WeaponMastery,
} from './equipment'

export {
  EMPTY_CURRENCY,
  CURRENCY_TO_COPPER,
  isWeapon,
  isArmor,
  isShield,
  WEAPON_MASTERY_OPTIONS,
  GREATSWORD,
  LONGSWORD,
} from './equipment'

// Background types
export type {
  BackgroundFeature,
  SuggestedCharacteristic,
  Background,
} from './background'

export {
  ACOLYTE,
  CRIMINAL,
  FOLK_HERO,
  NOBLE,
  SAGE,
  SOLDIER,
  AVAILABLE_BACKGROUNDS,
} from './background'

// Dice types
export type {
  StandardDie,
  DieSize,
  Die,
  ModifierType,
  RollModifier,
  DieResult,
  DiceRoll,
  RollHistoryEntry,
} from './dice'

export {
  DICE_NOTATION_PATTERN,
  parseDiceNotation,
  rollDie,
  rollDice,
  rollWithAdvantage,
  rollWithDisadvantage,
  calculateModifier,
  calculateProficiencyBonus,
} from './dice'
