import type { Condition } from './character'

export type GameState = 'exploring' | 'combat' | 'dialogue' | 'rest' | 'shopping' | 'death'

export type MessageRole = 'dm' | 'player' | 'system' | 'roll'

export interface AdventureMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: number
  rollData?: RollResult
  gameActions?: GameAction[]
}

export interface RollResult {
  notation: string
  total: number
  rolls: number[]
  modifier: number
  label: string
  success?: boolean
  critical?: boolean
  fumble?: boolean
}

export type GameAction =
  | { type: 'damage'; target: 'player' | string; amount: number; damageType: string }
  | { type: 'heal'; target: 'player' | string; amount: number }
  | { type: 'skill_check'; skill: string; dc: number; ability: string }
  | { type: 'saving_throw'; ability: string; dc: number }
  | { type: 'attack_roll'; targetAC: number; attackBonus: number; damageNotation: string; damageType: string }
  | { type: 'combat_start'; enemies: CombatEnemy[] }
  | { type: 'combat_end'; victory: boolean; xpReward?: number }
  | { type: 'loot'; gold?: number; items?: string[] }
  | { type: 'condition_add'; condition: Condition; target: 'player' | string }
  | { type: 'condition_remove'; condition: Condition; target: 'player' | string }
  | { type: 'rest_opportunity'; restType: 'short' | 'long' }
  | { type: 'state_change'; newState: GameState }
  | { type: 'use_spell_slot'; level: number }
  | { type: 'death_save' }
  | { type: 'location_change'; location: string; description?: string }

export interface CombatEnemy {
  id: string
  name: string
  ac: number
  maxHP: number
  currentHP: number
  initiative: number
  attackBonus: number
  damage: string
  damageType: string
  abilities?: string[]
  conditions: Condition[]
  isActive: boolean
}

export interface CombatState {
  enemies: CombatEnemy[]
  turnOrder: CombatTurnEntry[]
  currentTurnIndex: number
  round: number
  playerInitiative: number
  isPlayerTurn: boolean
}

export interface CombatTurnEntry {
  id: string
  name: string
  initiative: number
  isPlayer: boolean
  enemyId?: string
}

export interface AdventureState {
  isActive: boolean
  characterId: string | null
  gameState: GameState
  messages: AdventureMessage[]
  combatState: CombatState | null
  currentLocation: string
  questLog: QuestEntry[]
  adventureSeed: number
  isAIResponding: boolean
  conversationContext: ConversationEntry[]
  totalXPEarned: number
}

export interface QuestEntry {
  id: string
  title: string
  description: string
  isComplete: boolean
  timestamp: number
}

export interface ConversationEntry {
  role: 'user' | 'assistant'
  content: string
}

export interface AIToolCall {
  name: string
  input: Record<string, unknown>
}
