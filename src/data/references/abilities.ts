/**
 * Ability reference data
 * The six core abilities: STR, DEX, CON, INT, WIS, CHA
 */
import type { AbilityRef } from './types'

export const ABILITIES: Record<string, AbilityRef> = {
  'strength': {
    id: 'strength',
    name: 'Strength',
    abbreviation: 'STR',
    description: 'Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force.',
    skills: ['Athletics'],
    commonUses: ['Attack and damage rolls with melee weapons', 'Carrying capacity', 'Lifting, pushing, and dragging', 'Breaking objects'],
  },
  'dexterity': {
    id: 'dexterity',
    name: 'Dexterity',
    abbreviation: 'DEX',
    description: 'Dexterity measures agility, reflexes, and balance.',
    skills: ['Acrobatics', 'Sleight of Hand', 'Stealth'],
    commonUses: ['Attack and damage with finesse/ranged weapons', 'Armor Class', 'Initiative', 'Dexterity saving throws'],
  },
  'constitution': {
    id: 'constitution',
    name: 'Constitution',
    abbreviation: 'CON',
    description: 'Constitution measures health, stamina, and vital force.',
    skills: [],
    commonUses: ['Hit points', 'Constitution saving throws', 'Concentration checks', 'Holding breath'],
  },
  'intelligence': {
    id: 'intelligence',
    name: 'Intelligence',
    abbreviation: 'INT',
    description: 'Intelligence measures mental acuity, accuracy of recall, and the ability to reason.',
    skills: ['Arcana', 'History', 'Investigation', 'Nature', 'Religion'],
    commonUses: ['Wizard spellcasting', 'Wizard spell save DC', 'Knowledge checks'],
  },
  'wisdom': {
    id: 'wisdom',
    name: 'Wisdom',
    abbreviation: 'WIS',
    description: 'Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition.',
    skills: ['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'],
    commonUses: ['Cleric/Druid/Ranger spellcasting', 'Passive Perception', 'Wisdom saving throws'],
  },
  'charisma': {
    id: 'charisma',
    name: 'Charisma',
    abbreviation: 'CHA',
    description: 'Charisma measures your ability to interact effectively with others, including confidence and eloquence.',
    skills: ['Deception', 'Intimidation', 'Performance', 'Persuasion'],
    commonUses: ['Bard/Paladin/Sorcerer/Warlock spellcasting', 'Social interaction', 'Charisma saving throws'],
  },
}

