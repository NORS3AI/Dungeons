/**
 * Daily income professions for D&D 5e
 * Players can roll d100 to determine daily earnings based on their profession/lifestyle
 */

export type CurrencyType = 'copper' | 'silver' | 'gold'

export interface Profession {
  id: string
  name: string
  category: 'nobility' | 'wealthy' | 'comfortable' | 'modest' | 'poor' | 'wretched'
  dailyIncome: {
    amount: number
    currency: CurrencyType
  }
  description: string
  d100Range: [number, number] // Min and max roll for random profession
}

// Professions sorted by income (highest to lowest)
export const PROFESSIONS: Profession[] = [
  // Nobility / Aristocracy (10gp/day)
  {
    id: 'nobility',
    name: 'Nobility',
    category: 'nobility',
    dailyIncome: { amount: 10, currency: 'gold' },
    description: 'Lords, ladies, and those of noble birth living off estates and titles.',
    d100Range: [98, 100],
  },
  {
    id: 'high-merchant',
    name: 'High Merchant',
    category: 'nobility',
    dailyIncome: { amount: 10, currency: 'gold' },
    description: 'Wealthy trade magnates and guild masters who control major commerce.',
    d100Range: [96, 97],
  },

  // Wealthy (4gp/day)
  {
    id: 'physician',
    name: 'Physician',
    category: 'wealthy',
    dailyIncome: { amount: 4, currency: 'gold' },
    description: 'Trained doctors who treat the wealthy and noble.',
    d100Range: [93, 95],
  },
  {
    id: 'barrister',
    name: 'Barrister',
    category: 'wealthy',
    dailyIncome: { amount: 4, currency: 'gold' },
    description: 'Legal advocates and lawyers who argue cases in court.',
    d100Range: [90, 92],
  },
  {
    id: 'master-artisan',
    name: 'Master Artisan',
    category: 'wealthy',
    dailyIncome: { amount: 4, currency: 'gold' },
    description: 'Master craftsmen who create exceptional goods.',
    d100Range: [87, 89],
  },
  {
    id: 'ship-captain',
    name: 'Ship Captain',
    category: 'wealthy',
    dailyIncome: { amount: 4, currency: 'gold' },
    description: 'Captains of trading vessels and merchant ships.',
    d100Range: [84, 86],
  },

  // Comfortable (2gp/day)
  {
    id: 'scholar',
    name: 'Scholar',
    category: 'comfortable',
    dailyIncome: { amount: 2, currency: 'gold' },
    description: 'Academics, researchers, and university professors.',
    d100Range: [80, 83],
  },
  {
    id: 'merchant',
    name: 'Merchant',
    category: 'comfortable',
    dailyIncome: { amount: 2, currency: 'gold' },
    description: 'Shop owners and established traders.',
    d100Range: [76, 79],
  },
  {
    id: 'priest',
    name: 'Priest',
    category: 'comfortable',
    dailyIncome: { amount: 2, currency: 'gold' },
    description: 'Religious leaders and temple clergy.',
    d100Range: [72, 75],
  },
  {
    id: 'officer',
    name: 'Military Officer',
    category: 'comfortable',
    dailyIncome: { amount: 2, currency: 'gold' },
    description: 'Commissioned military officers and guard captains.',
    d100Range: [68, 71],
  },
  {
    id: 'innkeeper',
    name: 'Innkeeper',
    category: 'comfortable',
    dailyIncome: { amount: 2, currency: 'gold' },
    description: 'Owners of taverns, inns, and boarding houses.',
    d100Range: [64, 67],
  },

  // Modest (1gp/day)
  {
    id: 'teacher',
    name: 'Teacher',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Tutors, schoolmasters, and instructors.',
    d100Range: [60, 63],
  },
  {
    id: 'soldier',
    name: 'Soldier',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Professional soldiers, guards, and militia members.',
    d100Range: [55, 59],
  },
  {
    id: 'sailor',
    name: 'Sailor',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Crew members on ships and boats.',
    d100Range: [50, 54],
  },
  {
    id: 'craftsman',
    name: 'Craftsman',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Skilled tradespeople like blacksmiths, carpenters, and weavers.',
    d100Range: [45, 49],
  },
  {
    id: 'entertainer',
    name: 'Entertainer',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Musicians, actors, and performers.',
    d100Range: [40, 44],
  },
  {
    id: 'cook',
    name: 'Cook',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Cooks and kitchen staff at taverns and noble houses.',
    d100Range: [36, 39],
  },
  {
    id: 'scribe',
    name: 'Scribe',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Professional writers and document copyists.',
    d100Range: [32, 35],
  },

  // Poor (2sp/day = 20cp)
  {
    id: 'servant',
    name: 'Servant',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Household servants and domestic workers.',
    d100Range: [28, 31],
  },
  {
    id: 'laborer',
    name: 'Laborer',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Unskilled workers doing manual labor.',
    d100Range: [22, 27],
  },
  {
    id: 'farmer',
    name: 'Farmer',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Peasant farmers working the land.',
    d100Range: [16, 21],
  },
  {
    id: 'fisherman',
    name: 'Fisherman',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Those who fish for a living.',
    d100Range: [12, 15],
  },
  {
    id: 'street-vendor',
    name: 'Street Vendor',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Peddlers and street sellers of small goods.',
    d100Range: [8, 11],
  },

  // Wretched (1cp/day)
  {
    id: 'beggar',
    name: 'Beggar',
    category: 'wretched',
    dailyIncome: { amount: 1, currency: 'copper' },
    description: 'Those who survive by begging for coin.',
    d100Range: [4, 7],
  },
  {
    id: 'urchin',
    name: 'Street Urchin',
    category: 'wretched',
    dailyIncome: { amount: 1, currency: 'copper' },
    description: 'Homeless children surviving on the streets.',
    d100Range: [1, 3],
  },
]

// Additional specialized professions (1gp/day default)
export const SPECIALIZED_PROFESSIONS: Profession[] = [
  {
    id: 'herbalist',
    name: 'Herbalist',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Those who gather and sell medicinal herbs.',
    d100Range: [0, 0], // Not in random table
  },
  {
    id: 'alchemist-assistant',
    name: 'Alchemist Assistant',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Helpers in alchemical shops and laboratories.',
    d100Range: [0, 0],
  },
  {
    id: 'stablehand',
    name: 'Stablehand',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Workers who care for horses and livestock.',
    d100Range: [0, 0],
  },
  {
    id: 'miner',
    name: 'Miner',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Those who extract ore and gems from the earth.',
    d100Range: [0, 0],
  },
  {
    id: 'messenger',
    name: 'Messenger',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Runners who deliver messages and small packages.',
    d100Range: [0, 0],
  },
  {
    id: 'hunter',
    name: 'Hunter',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Those who hunt game for food and furs.',
    d100Range: [0, 0],
  },
  {
    id: 'guide',
    name: 'Guide',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Local guides who lead travelers through dangerous areas.',
    d100Range: [0, 0],
  },
  {
    id: 'barkeep',
    name: 'Barkeep',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Those who serve drinks at taverns.',
    d100Range: [0, 0],
  },
  {
    id: 'gravedigger',
    name: 'Gravedigger',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Those who dig graves and maintain cemeteries.',
    d100Range: [0, 0],
  },
  {
    id: 'rat-catcher',
    name: 'Rat Catcher',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Pest controllers who eliminate vermin.',
    d100Range: [0, 0],
  },
]

// All professions combined
export const ALL_PROFESSIONS = [...PROFESSIONS, ...SPECIALIZED_PROFESSIONS]

// Get profession by d100 roll
export function getProfessionByRoll(roll: number): Profession {
  for (const profession of PROFESSIONS) {
    const [min, max] = profession.d100Range
    if (roll >= min && roll <= max) {
      return profession
    }
  }
  // Default to laborer if somehow no match
  return PROFESSIONS.find((p) => p.id === 'laborer')!
}

// Get professions by category
export function getProfessionsByCategory(category: Profession['category']): Profession[] {
  return ALL_PROFESSIONS.filter((p) => p.category === category)
}

// Category display names and colors
export const CATEGORY_INFO: Record<Profession['category'], { name: string; color: string }> = {
  nobility: { name: 'Nobility', color: 'text-purple-400' },
  wealthy: { name: 'Wealthy', color: 'text-yellow-400' },
  comfortable: { name: 'Comfortable', color: 'text-green-400' },
  modest: { name: 'Modest', color: 'text-blue-400' },
  poor: { name: 'Poor', color: 'text-gray-400' },
  wretched: { name: 'Wretched', color: 'text-red-400' },
}

// Format income for display
export function formatIncome(income: Profession['dailyIncome']): string {
  const { amount, currency } = income
  const symbol = currency === 'gold' ? 'gp' : currency === 'silver' ? 'sp' : 'cp'
  return `${amount} ${symbol}`
}
