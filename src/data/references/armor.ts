/**
 * Armor reference data
 * Light, medium, heavy armor and shields
 */
import type { ArmorRef } from './types'

export const ARMOR: Record<string, ArmorRef> = {
  'leather': {
    id: 'leather',
    name: 'Leather Armor',
    category: 'light',
    ac: '11 + Dex modifier',
    stealthDisadvantage: false,
    weight: '10 lb.',
    cost: '10 gp',
    description: 'Made from toughened leather, this armor provides basic protection while remaining flexible.',
  },
  'studded-leather': {
    id: 'studded-leather',
    name: 'Studded Leather',
    category: 'light',
    ac: '12 + Dex modifier',
    stealthDisadvantage: false,
    weight: '13 lb.',
    cost: '45 gp',
    description: 'Leather armor reinforced with metal studs or rivets, offering improved protection.',
  },
  'chain-shirt': {
    id: 'chain-shirt',
    name: 'Chain Shirt',
    category: 'medium',
    ac: '13 + Dex modifier (max 2)',
    stealthDisadvantage: false,
    weight: '20 lb.',
    cost: '50 gp',
    description: 'A shirt of interlocking metal rings worn between layers of clothing. Provides good protection without encumbrance.',
  },
  'half-plate': {
    id: 'half-plate',
    name: 'Half Plate',
    category: 'medium',
    ac: '15 + Dex modifier (max 2)',
    stealthDisadvantage: true,
    weight: '40 lb.',
    cost: '750 gp',
    description: 'Plate armor covering the vital areas with lighter protection on the limbs. Provides excellent defense at the cost of stealth.',
  },
  'chain-mail': {
    id: 'chain-mail',
    name: 'Chain Mail',
    category: 'heavy',
    ac: '16',
    strength: 13,
    stealthDisadvantage: true,
    weight: '55 lb.',
    cost: '75 gp',
    description: 'Full-body armor of interlocking metal rings. Offers solid protection but requires strength and impedes stealth.',
  },
  'plate': {
    id: 'plate',
    name: 'Plate Armor',
    category: 'heavy',
    ac: '18',
    strength: 15,
    stealthDisadvantage: true,
    weight: '65 lb.',
    cost: '1,500 gp',
    description: 'The finest heavy armor, consisting of shaped, interlocking metal plates. Provides unparalleled protection.',
  },
}

