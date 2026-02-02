/**
 * Calculate ability modifier from ability score
 */
export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2)
}

/**
 * Calculate proficiency bonus from character level
 */
export function calculateProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2
}

/**
 * Format modifier with + or - sign
 */
export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`
}

/**
 * Calculate passive score (10 + modifier)
 */
export function calculatePassive(abilityScore: number, proficient: boolean = false, level: number = 1): number {
  const mod = calculateModifier(abilityScore)
  const profBonus = proficient ? calculateProficiencyBonus(level) : 0
  return 10 + mod + profBonus
}

/**
 * Calculate spell save DC
 */
export function calculateSpellSaveDC(spellcastingAbility: number, proficiencyBonus: number): number {
  return 8 + calculateModifier(spellcastingAbility) + proficiencyBonus
}

/**
 * Calculate spell attack bonus
 */
export function calculateSpellAttackBonus(spellcastingAbility: number, proficiencyBonus: number): number {
  return calculateModifier(spellcastingAbility) + proficiencyBonus
}
