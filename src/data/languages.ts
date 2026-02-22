/**
 * D&D 5e Languages
 */

export interface Language {
  id: string
  name: string
  script?: string
  speakers: string[]
  type: 'standard' | 'exotic' | 'secret'
}

export const STANDARD_LANGUAGES: Language[] = [
  {
    id: 'common',
    name: 'Common',
    script: 'Common',
    speakers: ['Humans', 'Most humanoids'],
    type: 'standard',
  },
  {
    id: 'dwarvish',
    name: 'Dwarvish',
    script: 'Dwarvish',
    speakers: ['Dwarves'],
    type: 'standard',
  },
  {
    id: 'elvish',
    name: 'Elvish',
    script: 'Elvish',
    speakers: ['Elves'],
    type: 'standard',
  },
  {
    id: 'giant',
    name: 'Giant',
    script: 'Dwarvish',
    speakers: ['Giants', 'Ogres'],
    type: 'standard',
  },
  {
    id: 'gnomish',
    name: 'Gnomish',
    script: 'Dwarvish',
    speakers: ['Gnomes'],
    type: 'standard',
  },
  {
    id: 'goblin',
    name: 'Goblin',
    script: 'Dwarvish',
    speakers: ['Goblinoids'],
    type: 'standard',
  },
  {
    id: 'halfling',
    name: 'Halfling',
    script: 'Common',
    speakers: ['Halflings'],
    type: 'standard',
  },
  {
    id: 'orc',
    name: 'Orc',
    script: 'Dwarvish',
    speakers: ['Orcs'],
    type: 'standard',
  },
]

export const EXOTIC_LANGUAGES: Language[] = [
  {
    id: 'abyssal',
    name: 'Abyssal',
    script: 'Infernal',
    speakers: ['Demons'],
    type: 'exotic',
  },
  {
    id: 'celestial',
    name: 'Celestial',
    script: 'Celestial',
    speakers: ['Celestials'],
    type: 'exotic',
  },
  {
    id: 'deep-speech',
    name: 'Deep Speech',
    script: undefined,
    speakers: ['Mind flayers', 'Beholders'],
    type: 'exotic',
  },
  {
    id: 'draconic',
    name: 'Draconic',
    script: 'Draconic',
    speakers: ['Dragons', 'Dragonborn'],
    type: 'exotic',
  },
  {
    id: 'infernal',
    name: 'Infernal',
    script: 'Infernal',
    speakers: ['Devils'],
    type: 'exotic',
  },
  {
    id: 'primordial',
    name: 'Primordial',
    script: 'Dwarvish',
    speakers: ['Elementals'],
    type: 'exotic',
  },
  {
    id: 'sylvan',
    name: 'Sylvan',
    script: 'Elvish',
    speakers: ['Fey creatures'],
    type: 'exotic',
  },
  {
    id: 'undercommon',
    name: 'Undercommon',
    script: 'Elvish',
    speakers: ['Underdark traders'],
    type: 'exotic',
  },
]

export const SECRET_LANGUAGES: Language[] = [
  {
    id: 'druidic',
    name: 'Druidic',
    script: undefined,
    speakers: ['Druids only'],
    type: 'secret',
  },
  {
    id: 'thieves-cant',
    name: "Thieves' Cant",
    script: undefined,
    speakers: ['Rogues'],
    type: 'secret',
  },
]

export const ALL_LANGUAGES = [...STANDARD_LANGUAGES, ...EXOTIC_LANGUAGES, ...SECRET_LANGUAGES]

/**
 * Get suggested languages based on character options
 */
export function getSuggestedLanguages(params: {
  raceName?: string
  className?: string
  backgroundName?: string
}): string[] {
  const { raceName, className, backgroundName } = params
  const suggestions: string[] = []

  // Race-based suggestions
  if (raceName) {
    const raceLC = raceName.toLowerCase()
    if (raceLC.includes('dwarf')) suggestions.push('dwarvish')
    if (raceLC.includes('elf') || raceLC.includes('drow')) suggestions.push('elvish')
    if (raceLC.includes('halfling')) suggestions.push('halfling')
    if (raceLC.includes('gnome')) suggestions.push('gnomish')
    if (raceLC.includes('dragonborn')) suggestions.push('draconic')
    if (raceLC.includes('tiefling')) suggestions.push('infernal')
    if (raceLC.includes('half-orc')) suggestions.push('orc')
    if (raceLC.includes('aasimar')) suggestions.push('celestial')
  }

  // Class-based suggestions
  if (className) {
    const classLC = className.toLowerCase()
    if (classLC.includes('druid')) suggestions.push('druidic', 'sylvan')
    if (classLC.includes('cleric') || classLC.includes('paladin')) suggestions.push('celestial')
    if (classLC.includes('warlock')) suggestions.push('infernal', 'abyssal')
    if (classLC.includes('rogue')) suggestions.push('thieves-cant')
  }

  // Background-based suggestions
  if (backgroundName) {
    const bgLC = backgroundName.toLowerCase()
    if (bgLC.includes('sage') || bgLC.includes('scholar')) suggestions.push('draconic', 'elvish')
    if (bgLC.includes('outlander')) suggestions.push('goblin', 'orc')
    if (bgLC.includes('sailor')) suggestions.push('primordial')
    if (bgLC.includes('soldier')) suggestions.push('goblin', 'orc')
    if (bgLC.includes('criminal') || bgLC.includes('charlatan')) suggestions.push('thieves-cant')
  }

  // Remove duplicates
  return [...new Set(suggestions)]
}

/**
 * Get language by ID
 */
export function getLanguageById(id: string): Language | undefined {
  return ALL_LANGUAGES.find((lang) => lang.id === id)
}
