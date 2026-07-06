export type AmmoType = 'ball' | 'chain'
export type ShipFaction = 'player' | 'enemy'
export type ShipStatus = 'active' | 'repairing' | 'sinking' | 'sunk'
export type ShipCondition = 'on_fire' | 'taking_water' | 'mast_damaged' | 'crew_swept'

export interface ShipAbility {
  id: string
  name: string
  description: string
}

export interface Ship {
  id: string
  name: string
  faction: ShipFaction
  ac: number
  maxHP: number
  currentHP: number
  speed: number
  crew: number
  totalCannons: number
  functionalCannons: number
  loadedCannons: number
  ammoType: AmmoType
  damageOverride?: string
  abilities: ShipAbility[]
  status: ShipStatus
  repairTurnsRemaining: number
  conditions: ShipCondition[]
}

export interface BattleLogEntry {
  id: string
  round: number
  shipId: string
  shipName: string
  message: string
  type: 'attack' | 'reload' | 'repair' | 'ability' | 'status' | 'damage' | 'heal' | 'info' | 'critical' | 'fumble' | 'miss'
  rolls?: { notation: string; result: number; details?: string }[]
  damage?: number
  targetShipName?: string
  timestamp: number
}

export interface Projectile {
  id: string
  fromShipId: string
  toShipId: string
  ammoType: AmmoType
  hit: boolean
  damage: number
  startTime: number
}

export type CombatTurnPhase = 'reload' | 'load' | 'aim' | 'fire' | 'resolve' | 'dm_actions'

export interface NavalBattleState {
  ships: Ship[]
  turnOrder: string[]
  currentTurnIndex: number
  round: number
  phase: 'setup' | 'combat' | 'finished'
  turnPhase: CombatTurnPhase
  battleLog: BattleLogEntry[]
  victor: ShipFaction | 'draw' | null
}
