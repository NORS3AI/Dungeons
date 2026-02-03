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

export {
  // PHB Classes
  FIGHTER,
  WARLOCK,
  ROGUE,
  WIZARD,
  CLERIC,
  BARBARIAN,
  BARD,
  DRUID,
  MONK,
  PALADIN,
  RANGER,
  SORCERER,
  // Custom Classes (WoW/Diablo)
  DEATH_KNIGHT,
  NECROMANCER,
  DEMON_HUNTER,
  AMAZON,
  // Fighter subclasses
  CHAMPION,
  BATTLE_MASTER,
  ELDRITCH_KNIGHT,
  // Warlock subclasses
  GREAT_OLD_ONE,
  FIEND,
  ARCHFEY,
  HEXBLADE,
  CELESTIAL,
  // Rogue subclasses
  THIEF,
  ASSASSIN,
  // Wizard subclasses
  SCHOOL_OF_EVOCATION,
  SCHOOL_OF_ABJURATION,
  // Cleric subclasses
  LIFE_DOMAIN,
  LIGHT_DOMAIN,
  // Barbarian subclasses
  PATH_OF_THE_BERSERKER,
  PATH_OF_THE_TOTEM_WARRIOR,
  // Bard subclasses
  COLLEGE_OF_LORE,
  COLLEGE_OF_VALOR,
  // Druid subclasses
  CIRCLE_OF_THE_LAND,
  CIRCLE_OF_THE_MOON,
  // Monk subclasses
  WAY_OF_THE_OPEN_HAND,
  WAY_OF_SHADOW,
  // Paladin subclasses
  OATH_OF_DEVOTION,
  OATH_OF_VENGEANCE,
  // Ranger subclasses
  HUNTER,
  BEAST_MASTER,
  // Sorcerer subclasses
  DRACONIC_BLOODLINE,
  WILD_MAGIC,
  // Death Knight subclasses
  BLOOD_DEATH_KNIGHT,
  FROST_DEATH_KNIGHT,
  UNHOLY_DEATH_KNIGHT,
  // Necromancer subclasses
  BONE_NECROMANCER,
  BLOOD_NECROMANCER,
  SUMMONER_NECROMANCER,
  // Demon Hunter subclasses
  VENGEANCE_DEMON_HUNTER,
  HAVOC_DEMON_HUNTER,
  SHADOW_DEMON_HUNTER,
  // Amazon subclasses
  JAVELIN_AMAZON,
  BOW_AMAZON,
  PASSIVE_MAGIC_AMAZON,
} from './class'

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

// Feat types
export type { FeatPrerequisite, Feat } from './feat'

export {
  ALERT,
  SKILLED,
  TOUGH,
  LUCKY,
  GREAT_WEAPON_MASTER,
  SHARPSHOOTER,
  SENTINEL,
  POLEARM_MASTER,
  WAR_CASTER,
  RESILIENT,
  MOBILE,
  CROSSBOW_EXPERT,
  DUAL_WIELDER,
  SHIELD_MASTER,
  MAGE_SLAYER,
  ACTOR,
  OBSERVANT,
  ORIGIN_FEATS,
  COMBAT_FEATS,
  UTILITY_FEATS,
  ALL_FEATS,
} from './feat'

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
