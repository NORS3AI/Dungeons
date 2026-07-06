import type { AmmoType, Ship, ShipCondition, ShipFaction } from '../types/naval'

export function roll(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

export function rollMultiple(count: number, sides: number): { rolls: number[]; total: number } {
  const rolls: number[] = []
  for (let i = 0; i < count; i++) {
    rolls.push(roll(sides))
  }
  return { rolls, total: rolls.reduce((a, b) => a + b, 0) }
}

export function rollReload(totalCannons: number): {
  roll: number
  functionalCannons: number
  fumble: boolean
  critical: boolean
  selfDamage: number
} {
  const d20 = roll(20)
  const fumble = d20 === 1
  const critical = d20 === 20

  let percentage: number
  if (d20 <= 5) {
    percentage = 0.20
  } else if (d20 <= 10) {
    percentage = 0.45
  } else if (d20 <= 15) {
    percentage = 0.75
  } else {
    percentage = 1.0
  }

  const functionalCannons = Math.max(1, Math.ceil(totalCannons * percentage))
  const selfDamage = 0

  return { roll: d20, functionalCannons, fumble, critical, selfDamage }
}

export function rollToHit(targetAC: number, bonus = 0): {
  roll: number
  total: number
  hit: boolean
  critical: boolean
  fumble: boolean
} {
  const d20 = roll(20)
  const total = d20 + bonus
  const critical = d20 === 20
  const fumble = d20 === 1
  const hit = critical || (!fumble && total >= targetAC)

  return { roll: d20, total, hit, critical, fumble }
}

export function getDamageNotation(loadedCannons: number): string {
  if (loadedCannons <= 8) return '1d8'
  if (loadedCannons <= 15) return '2d8'
  if (loadedCannons <= 25) return '3d8'
  if (loadedCannons <= 40) return '4d8'
  if (loadedCannons <= 58) return '5d8'
  return '6d8'
}

export function rollCannonDamage(
  loadedCannons: number,
  ammoType: AmmoType,
  critical: boolean,
  notationOverride?: string,
): { notation: string; total: number; rolls: number[]; hullDamage: number; conditionApplied: ShipCondition | null } {
  const rawNotation = notationOverride || getDamageNotation(loadedCannons)
  const match = rawNotation.match(/^(\d+)d(\d+)$/)
  if (!match) {
    return rollCannonDamage(loadedCannons, ammoType, critical)
  }
  const notation = rawNotation
  const count = parseInt(match[1])
  const sides = parseInt(match[2])

  let result = rollMultiple(critical ? count * 2 : count, sides)

  if (ammoType === 'chain') {
    const hullDamage = Math.floor(result.total / 2)
    const conditionRoll = roll(6)
    const conditionApplied: ShipCondition = conditionRoll <= 3 ? 'mast_damaged' : 'crew_swept'
    return {
      notation: critical ? `${count * 2}d${sides} (CRIT chain)` : `${notation} (chain)`,
      total: result.total,
      rolls: result.rolls,
      hullDamage,
      conditionApplied,
    }
  }

  return {
    notation: critical ? `${count * 2}d${sides} (CRIT)` : notation,
    total: result.total,
    rolls: result.rolls,
    hullDamage: result.total,
    conditionApplied: null,
  }
}

export function rollRepairDuration(): { roll: number; turns: number } {
  const d4 = roll(4)
  return { roll: d4, turns: d4 }
}

export function getHealingAmount(d20: number): number {
  if (d20 === 1) return 5
  if (d20 <= 5) return 10
  if (d20 <= 14) return 15
  if (d20 <= 19) return 20
  return 25
}

export function rollRepairResult(): { roll: number; healAmount: number } {
  const d20 = roll(20)
  return { roll: d20, healAmount: getHealingAmount(d20) }
}

export function applyConditionEffects(ship: Ship): { damage: number; messages: string[]; removedConditions: ShipCondition[] } {
  let damage = 0
  const messages: string[] = []
  const removedConditions: ShipCondition[] = []

  if (ship.conditions.includes('on_fire')) {
    const fireDmg = roll(6)
    damage += fireDmg
    const extinguishRoll = roll(20)
    if (extinguishRoll >= 12) {
      removedConditions.push('on_fire')
      messages.push(`Fire deals ${fireDmg} damage but the crew extinguishes it! (rolled ${extinguishRoll})`)
    } else {
      messages.push(`Fire deals ${fireDmg} damage! Crew fails to extinguish (rolled ${extinguishRoll}, needed 12+)`)
    }
  }

  if (ship.conditions.includes('taking_water')) {
    const waterDmg = roll(4)
    damage += waterDmg
    messages.push(`Taking on water deals ${waterDmg} damage! Ship AC reduced by 2`)
  }

  return { damage, messages, removedConditions }
}

export function getACWithConditions(ship: Ship): number {
  let ac = ship.ac
  if (ship.conditions.includes('taking_water')) ac -= 2
  if (ship.conditions.includes('bracing')) ac += 2
  return ac
}

export function getFunctionalCannonsWithConditions(functionalCannons: number, conditions: ShipCondition[]): number {
  if (conditions.includes('crew_swept')) {
    return Math.max(1, Math.floor(functionalCannons * 0.5))
  }
  return functionalCannons
}

export function isFleetDefeated(ships: Ship[], faction: ShipFaction): boolean {
  return ships
    .filter(s => s.faction === faction)
    .every(s => s.currentHP <= 0 || s.status === 'sunk')
}

export function buildTurnOrder(ships: Ship[]): string[] {
  const active = ships.filter(s => s.status !== 'sunk' && s.currentHP > 0)
  const allies = active.filter(s => s.faction === 'player')
  const enemies = active.filter(s => s.faction === 'enemy')
  return [...allies.map(s => s.id), ...enemies.map(s => s.id)]
}
