import type { Character } from '../types'
import { DEFAULT_ABILITY_SCORES, EMPTY_CURRENCY } from '../types'
import { calculateCarryingCapacity } from '../types/character'

/**
 * Migrates a character from old data format to new format
 * Adds any missing fields with sensible defaults
 *
 * @param character - The character to migrate
 * @returns The migrated character with all required fields
 */
export function migrateCharacter(character: Partial<Character>): Character {
  const now = new Date().toISOString()

  // Create a fully migrated character with all required fields
  const migrated: Character = {
    // Identity - required
    id: character.id || `char-${Date.now()}`,
    name: character.name || 'Unnamed Character',
    playerName: character.playerName || '',

    // Basic info
    age: character.age || '',
    height: character.height || '',
    weight: character.weight || '',
    backstory: character.backstory || '',

    // Core stats
    level: character.level || 1,
    experiencePoints: character.experiencePoints || 0,

    // Race, Class & Background
    race: character.race || null,
    class: character.class || null,
    subclass: character.subclass || null,
    background: character.background || null,
    alignment: character.alignment || null,

    // Abilities
    abilityScores: character.abilityScores || { ...DEFAULT_ABILITY_SCORES },
    skills: character.skills || {
      athletics: 'none',
      acrobatics: 'none',
      sleightOfHand: 'none',
      stealth: 'none',
      arcana: 'none',
      history: 'none',
      investigation: 'none',
      nature: 'none',
      religion: 'none',
      animalHandling: 'none',
      insight: 'none',
      medicine: 'none',
      perception: 'none',
      survival: 'none',
      deception: 'none',
      intimidation: 'none',
      performance: 'none',
      persuasion: 'none',
    },
    savingThrows: character.savingThrows || {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: false,
      charisma: false,
    },
    languages: character.languages || [],

    // Combat
    hitPoints: character.hitPoints || {
      current: 10,
      maximum: 10,
      temporary: 0,
    },
    armorClass: character.armorClass || 10,
    initiative: character.initiative || 0,
    speed: character.speed || 30,
    deathSaves: character.deathSaves || {
      successes: 0,
      failures: 0,
    },
    conditions: character.conditions || [],

    // Features & Spellcasting
    featureCharges: character.featureCharges || [],
    itemFeatures: character.itemFeatures || [], // NEW: Features from magical items
    resourcePools: character.resourcePools || [], // NEW: Class-specific resource tracking
    spellSlots: character.spellSlots || {
      level1: { used: 0, max: 0 },
      level2: { used: 0, max: 0 },
      level3: { used: 0, max: 0 },
      level4: { used: 0, max: 0 },
      level5: { used: 0, max: 0 },
      level6: { used: 0, max: 0 },
      level7: { used: 0, max: 0 },
      level8: { used: 0, max: 0 },
      level9: { used: 0, max: 0 },
    },
    knownSpells: character.knownSpells || [],
    preparedSpells: character.preparedSpells || [],

    // Equipment
    equipment: character.equipment || [],
    currency: character.currency || { ...EMPTY_CURRENCY },
    materials: character.materials || [], // NEW: Crafting materials array

    // Carrying Capacity & Supplies
    carryingCapacity: character.carryingCapacity || {
      current: 0,
      maximum: calculateCarryingCapacity(character.abilityScores?.strength || 10),
    },
    foodRations: character.foodRations ?? 0, // NEW: Use ?? to handle 0 as valid
    waterSupply: character.waterSupply ?? 0, // NEW: Use ?? to handle 0 as valid

    // Daily Income
    dailyIncome: character.dailyIncome || undefined,

    // Fighter-specific
    fightingStance: character.fightingStance || undefined,

    // Meta
    createdAt: character.createdAt || now,
    updatedAt: now,
  }

  return migrated
}

/**
 * Checks if a character needs migration
 * Returns true if any required fields are missing
 *
 * @param character - The character to check
 * @returns true if migration is needed
 */
export function needsMigration(character: any): boolean {
  if (!character) return false

  // Check for missing fields that were added in updates
  const checks = [
    character.materials === undefined,
    character.itemFeatures === undefined,
    character.resourcePools === undefined,
    character.carryingCapacity === undefined,
    character.foodRations === undefined,
    character.waterSupply === undefined,
    !character.skills || typeof character.skills !== 'object',
    !character.savingThrows || typeof character.savingThrows !== 'object',
    !character.featureCharges || !Array.isArray(character.featureCharges),
  ]

  return checks.some((check) => check === true)
}

/**
 * Batch migrate all characters in an array
 *
 * @param characters - Array of characters to migrate
 * @returns Array of migrated characters
 */
export function migrateAllCharacters(characters: Partial<Character>[]): Character[] {
  return characters.map((char) => migrateCharacter(char))
}
