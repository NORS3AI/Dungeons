/**
 * Character creation wizard step definitions
 */

export interface Step {
  id: number
  name: string
  shortName?: string
}

/**
 * Default character creation steps
 */
export const CHARACTER_CREATION_STEPS: Step[] = [
  { id: 1, name: 'Details', shortName: 'Details' },
  { id: 2, name: 'Race', shortName: 'Race' },
  { id: 3, name: 'Class', shortName: 'Class' },
  { id: 4, name: 'Background', shortName: 'BG' },
  { id: 5, name: 'Stats', shortName: 'Stats' },
  { id: 6, name: 'Spells', shortName: 'Spells' },
  { id: 7, name: 'Equipment', shortName: 'Equip' },
  { id: 8, name: 'Review', shortName: 'Review' },
]
