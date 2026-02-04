import type { Spell } from '../../../types'

/**
 * Great Old One Patron Expanded Spells
 * These spells are automatically added to a Great Old One Warlock's spell list
 */

export const GOO_EXPANDED_SPELLS: Spell[] = [
  {
    id: 'dissonant-whispers',
    name: 'Dissonant Whispers',
    description: 'Whisper a discordant melody only one creature can hear, causing psychic damage.',
    level: 1,
    school: 'enchantment',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 60 },
    components: { verbal: true, somatic: false, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '3d6', type: 'psychic' },
    savingThrow: { ability: 'wisdom', effect: 'half damage, no flee' },
    ritual: false,
    concentration: false,
    classes: ['bard', 'warlock'],
  },
  {
    id: 'tashas-hideous-laughter',
    name: "Tasha's Hideous Laughter",
    description: 'A creature falls prone in fits of laughter, incapacitated.',
    level: 1,
    school: 'enchantment',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: true, materialDescription: 'tiny tarts and a feather' },
    duration: { type: 'concentration', amount: 1, unit: 'minute' },
    savingThrow: { ability: 'wisdom', effect: 'negates' },
    ritual: false,
    concentration: true,
    classes: ['wizard', 'bard', 'warlock'],
  },
]
