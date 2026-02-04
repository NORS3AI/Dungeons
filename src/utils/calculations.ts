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

/**
 * Get racial ability bonus for a specific ability
 */
export function getRacialBonus(race: { abilityBonuses?: Record<string, number> } | null | undefined, ability: string): number {
  if (!race?.abilityBonuses) return 0
  return race.abilityBonuses[ability] || 0
}

/**
 * Get background ability bonus for a specific ability
 */
export function getBackgroundBonus(
  background: { abilityBonuses?: Array<{ ability: string; bonus: number }> } | null | undefined,
  ability: string
): number {
  if (!background?.abilityBonuses) return 0
  const bonus = background.abilityBonuses.find((b) => b.ability === ability)
  return bonus?.bonus || 0
}

/**
 * Calculate initiative modifier
 */
export function calculateInitiative(dexterity: number): number {
  return calculateModifier(dexterity)
}

/**
 * Calculate armor class
 */
export function calculateArmorClass(
  baseAC: number,
  dexterity: number,
  maxDexBonus?: number
): number {
  const dexMod = calculateModifier(dexterity)
  const dexBonus = maxDexBonus !== undefined ? Math.min(dexMod, maxDexBonus) : dexMod
  return baseAC + dexBonus
}

/**
 * Validate weight value (ensure it's a number and non-negative)
 */
export function validateWeight(weight: unknown): number {
  if (typeof weight === 'number' && !isNaN(weight) && weight >= 0) {
    return weight
  }
  return 0
}

/**
 * Calculate total weight from equipment array
 */
export function calculateTotalWeight(
  equipment: Array<{ weight: number; quantity: number }>
): number {
  return equipment.reduce((sum, item) => {
    const itemWeight = validateWeight(item.weight)
    const quantity = validateWeight(item.quantity)
    return sum + itemWeight * quantity
  }, 0)
}
