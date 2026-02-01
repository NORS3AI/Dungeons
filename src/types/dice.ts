/**
 * Standard D&D dice types
 * Supports d3 through d1000 for flexibility
 */
export type StandardDie = 'd3' | 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100' | 'd1000'

/**
 * Any valid die size (d3 to d1000)
 */
export type DieSize = number // 3 to 1000

/**
 * A single die in a roll
 */
export interface Die {
  sides: DieSize
  count: number
}

/**
 * Modifier type
 */
export type ModifierType =
  | 'flat'
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma'
  | 'proficiency'

/**
 * Roll modifier
 */
export interface RollModifier {
  type: ModifierType
  value: number
  label?: string
}

/**
 * Individual die result
 */
export interface DieResult {
  sides: DieSize
  value: number
  isMax: boolean // Rolled maximum (critical-like)
  isMin: boolean // Rolled minimum (fumble-like)
}

/**
 * Complete roll result
 */
export interface DiceRoll {
  id: string
  timestamp: Date

  // Original notation
  notation: string

  // Dice rolled
  dice: Die[]

  // Individual results
  results: DieResult[]

  // Modifiers applied
  modifiers: RollModifier[]

  // Totals
  diceTotal: number
  modifierTotal: number
  grandTotal: number

  // Context
  label?: string // e.g., "Attack Roll", "Damage"
  characterId?: string
  advantage?: boolean
  disadvantage?: boolean
}

/**
 * Roll history entry
 */
export interface RollHistoryEntry {
  roll: DiceRoll
  characterName?: string
  rollType?: 'attack' | 'damage' | 'save' | 'check' | 'other'
}

/**
 * Dice notation regex pattern
 * Matches: 2d6, 1d20+5, 4d6-2, 12d10, d100, etc.
 * Supports d3 through d1000
 */
export const DICE_NOTATION_PATTERN = /^(\d*)d(\d+)([+-]\d+)?$/i

/**
 * Parse dice notation string
 * Supports: "2d6", "1d20+5", "4d6-2", "d100", "12d10+3", "1d1000"
 */
export function parseDiceNotation(notation: string): { dice: Die[]; modifier: number } | null {
  const trimmed = notation.trim().toLowerCase()
  const match = trimmed.match(DICE_NOTATION_PATTERN)

  if (!match) return null

  const count = match[1] ? parseInt(match[1], 10) : 1
  const sides = parseInt(match[2], 10)
  const modifier = match[3] ? parseInt(match[3], 10) : 0

  // Validate die size (d3 to d1000)
  if (sides < 3 || sides > 1000) return null
  if (count < 1 || count > 100) return null // Reasonable limit

  return {
    dice: [{ sides, count }],
    modifier,
  }
}

/**
 * Roll a single die
 */
export function rollDie(sides: DieSize): number {
  return Math.floor(Math.random() * sides) + 1
}

/**
 * Roll dice with notation string
 */
export function rollDice(notation: string, modifiers: RollModifier[] = []): DiceRoll | null {
  const parsed = parseDiceNotation(notation)
  if (!parsed) return null

  const results: DieResult[] = []

  for (const die of parsed.dice) {
    for (let i = 0; i < die.count; i++) {
      const value = rollDie(die.sides)
      results.push({
        sides: die.sides,
        value,
        isMax: value === die.sides,
        isMin: value === 1,
      })
    }
  }

  const diceTotal = results.reduce((sum, r) => sum + r.value, 0)
  const modifierTotal = modifiers.reduce((sum, m) => sum + m.value, 0) + parsed.modifier

  return {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    notation,
    dice: parsed.dice,
    results,
    modifiers: parsed.modifier !== 0
      ? [...modifiers, { type: 'flat', value: parsed.modifier }]
      : modifiers,
    diceTotal,
    modifierTotal,
    grandTotal: diceTotal + modifierTotal,
  }
}

/**
 * Roll with advantage (roll twice, take higher)
 */
export function rollWithAdvantage(notation: string, modifiers: RollModifier[] = []): DiceRoll | null {
  const roll1 = rollDice(notation, modifiers)
  const roll2 = rollDice(notation, modifiers)

  if (!roll1 || !roll2) return null

  const chosen = roll1.diceTotal >= roll2.diceTotal ? roll1 : roll2
  return { ...chosen, advantage: true }
}

/**
 * Roll with disadvantage (roll twice, take lower)
 */
export function rollWithDisadvantage(notation: string, modifiers: RollModifier[] = []): DiceRoll | null {
  const roll1 = rollDice(notation, modifiers)
  const roll2 = rollDice(notation, modifiers)

  if (!roll1 || !roll2) return null

  const chosen = roll1.diceTotal <= roll2.diceTotal ? roll1 : roll2
  return { ...chosen, disadvantage: true }
}

/**
 * Calculate ability modifier
 */
export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2)
}

/**
 * Calculate proficiency bonus by level
 */
export function calculateProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2
}
