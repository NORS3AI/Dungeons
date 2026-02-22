import type { FightingStance, FightingStanceInfo } from '../types/character'

/**
 * Fighter fighting stance options (homebrew)
 * Based on DM-approved weapon configurations
 */
export const FIGHTING_STANCES: Record<FightingStance, FightingStanceInfo> = {
  'two-handed': {
    id: 'two-handed',
    name: 'Two-Handed',
    description: 'Standard two-handed weapon (greatsword, greataxe, etc.)',
    damage: '2d6 or 1d12',
    acModifier: 0,
  },
  'dual-two-handed': {
    id: 'dual-two-handed',
    name: 'Dual Two-Handed',
    description: 'Wield two greatswords or similar two-handed weapons simultaneously',
    damage: '4d6',
    acModifier: -4,
  },
  'sword-and-board': {
    id: 'sword-and-board',
    name: 'Sword & Board',
    description: 'Simple weapon with shield',
    damage: '1d6 or 1d8',
    acModifier: 2,
  },
}

export const FIGHTING_STANCE_LIST: FightingStanceInfo[] = Object.values(FIGHTING_STANCES)
