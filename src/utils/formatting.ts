/**
 * Formatting utility functions
 * Shared across components to reduce code duplication
 */

/**
 * Format ability score key to display name
 */
export function formatAbilityName(key: string): string {
  const names: Record<string, string> = {
    strength: 'Strength',
    dexterity: 'Dexterity',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    wisdom: 'Wisdom',
    charisma: 'Charisma',
  }
  return names[key] || key
}

/**
 * Format ability score key to abbreviation
 */
export function formatAbilityAbbr(key: string): string {
  const abbrs: Record<string, string> = {
    strength: 'STR',
    dexterity: 'DEX',
    constitution: 'CON',
    intelligence: 'INT',
    wisdom: 'WIS',
    charisma: 'CHA',
  }
  return abbrs[key] || key.toUpperCase().slice(0, 3)
}

/**
 * Format skill name from camelCase to Title Case
 */
export function formatSkillName(skill: string): string {
  // Convert camelCase to Title Case with spaces
  return skill
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (str) => str.toUpperCase())
}

/**
 * Format class name for display
 */
export function formatClassName(className: string): string {
  return className
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Format race name for display
 */
export function formatRaceName(raceName: string): string {
  return raceName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Format background name for display
 */
export function formatBackgroundName(backgroundName: string): string {
  return backgroundName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Format currency amount with comma separators
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString()
}

/**
 * Format weight with proper decimal places
 */
export function formatWeight(weight: number): string {
  return weight.toFixed(1)
}

/**
 * Format spell level for display
 */
export function formatSpellLevel(level: number): string {
  if (level === 0) return 'Cantrip'
  if (level === 1) return '1st Level'
  if (level === 2) return '2nd Level'
  if (level === 3) return '3rd Level'
  return `${level}th Level`
}
