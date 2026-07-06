import type { Character } from '../types'
import type { CombatEnemy, CombatState, CombatTurnEntry, RollResult } from '../types/adventure'
import { calculateModifier, calculateProficiencyBonus } from './calculations'

function roll(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

function rollNotation(notation: string): { total: number; rolls: number[]; modifier: number } {
  const match = notation.match(/^(\d+)d(\d+)\s*([+-]\s*\d+)?$/)
  if (!match) return { total: 0, rolls: [], modifier: 0 }

  const count = parseInt(match[1])
  const sides = parseInt(match[2])
  const modifier = match[3] ? parseInt(match[3].replace(/\s/g, '')) : 0
  const rolls: number[] = []

  for (let i = 0; i < count; i++) {
    rolls.push(roll(sides))
  }

  const sum = rolls.reduce((a, b) => a + b, 0)
  return { total: sum + modifier, rolls, modifier }
}

export function rollInitiative(dexMod: number): number {
  return roll(20) + dexMod
}

export function rollAttack(
  attackBonus: number,
  targetAC: number,
  advantage = false,
  disadvantage = false,
): RollResult {
  let d20 = roll(20)

  if (advantage && !disadvantage) {
    const second = roll(20)
    d20 = Math.max(d20, second)
  } else if (disadvantage && !advantage) {
    const second = roll(20)
    d20 = Math.min(d20, second)
  }

  const total = d20 + attackBonus
  const critical = d20 === 20
  const fumble = d20 === 1
  const success = critical || (!fumble && total >= targetAC)

  return {
    notation: `1d20+${attackBonus}`,
    total,
    rolls: [d20],
    modifier: attackBonus,
    label: 'Attack Roll',
    success,
    critical,
    fumble,
  }
}

export function rollDamage(notation: string, critical = false): RollResult {
  const result = rollNotation(notation)

  if (critical) {
    const critExtra = rollNotation(notation)
    return {
      notation: `${notation} (CRIT)`,
      total: result.total + critExtra.total - critExtra.modifier,
      rolls: [...result.rolls, ...critExtra.rolls],
      modifier: result.modifier,
      label: 'Damage (Critical!)',
      critical: true,
    }
  }

  return {
    notation,
    total: result.total,
    rolls: result.rolls,
    modifier: result.modifier,
    label: 'Damage',
  }
}

export function rollSkillCheck(
  abilityScore: number,
  proficient: boolean,
  level: number,
  dc: number,
  advantage = false,
  disadvantage = false,
): RollResult {
  const abilityMod = calculateModifier(abilityScore)
  const profBonus = proficient ? calculateProficiencyBonus(level) : 0
  const totalMod = abilityMod + profBonus

  let d20 = roll(20)
  if (advantage && !disadvantage) {
    d20 = Math.max(d20, roll(20))
  } else if (disadvantage && !advantage) {
    d20 = Math.min(d20, roll(20))
  }

  const total = d20 + totalMod

  return {
    notation: `1d20+${totalMod}`,
    total,
    rolls: [d20],
    modifier: totalMod,
    label: 'Skill Check',
    success: total >= dc,
    critical: d20 === 20,
    fumble: d20 === 1,
  }
}

export function rollSavingThrow(
  abilityScore: number,
  proficient: boolean,
  level: number,
  dc: number,
): RollResult {
  const abilityMod = calculateModifier(abilityScore)
  const profBonus = proficient ? calculateProficiencyBonus(level) : 0
  const totalMod = abilityMod + profBonus
  const d20 = roll(20)
  const total = d20 + totalMod

  return {
    notation: `1d20+${totalMod}`,
    total,
    rolls: [d20],
    modifier: totalMod,
    label: 'Saving Throw',
    success: total >= dc,
    critical: d20 === 20,
    fumble: d20 === 1,
  }
}

export function rollDeathSave(): RollResult {
  const d20 = roll(20)
  return {
    notation: '1d20',
    total: d20,
    rolls: [d20],
    modifier: 0,
    label: 'Death Save',
    success: d20 >= 10,
    critical: d20 === 20,
    fumble: d20 === 1,
  }
}

export function getPlayerAttackBonus(character: Character): number {
  const profBonus = calculateProficiencyBonus(character.level)
  const equipped = character.equipment.find(
    (e) => e.equipped && (e.category === 'weapon' || (e as any).weaponCategory),
  )

  let abilityMod: number
  if (equipped && (equipped as any).properties?.includes('finesse')) {
    const strMod = calculateModifier(character.abilityScores.strength)
    const dexMod = calculateModifier(character.abilityScores.dexterity)
    abilityMod = Math.max(strMod, dexMod)
  } else if (equipped && (equipped as any).weaponCategory === 'ranged') {
    abilityMod = calculateModifier(character.abilityScores.dexterity)
  } else {
    abilityMod = calculateModifier(character.abilityScores.strength)
  }

  const itemBonus = equipped?.attackBonus ?? 0
  return profBonus + abilityMod + itemBonus
}

export function getPlayerDamageNotation(character: Character): { notation: string; type: string } {
  const equipped = character.equipment.find(
    (e) => e.equipped && (e.category === 'weapon' || (e as any).weaponCategory),
  )

  if (!equipped) {
    const strMod = calculateModifier(character.abilityScores.strength)
    return { notation: `1d1+${strMod}`, type: 'bludgeoning' }
  }

  const weapon = equipped as any
  const dice = weapon.damage?.dice ?? '1d4'
  const damageType = weapon.damage?.type ?? 'bludgeoning'

  let abilityMod: number
  if (weapon.properties?.includes('finesse')) {
    const strMod = calculateModifier(character.abilityScores.strength)
    const dexMod = calculateModifier(character.abilityScores.dexterity)
    abilityMod = Math.max(strMod, dexMod)
  } else if (weapon.weaponCategory === 'ranged') {
    abilityMod = calculateModifier(character.abilityScores.dexterity)
  } else {
    abilityMod = calculateModifier(character.abilityScores.strength)
  }

  const dmgBonus = (weapon.weaponDamageBonus ?? 0) + abilityMod
  const sign = dmgBonus >= 0 ? '+' : ''
  return { notation: `${dice}${sign}${dmgBonus}`, type: damageType }
}

export function buildInitiativeOrder(
  character: Character,
  enemies: CombatEnemy[],
): CombatState {
  const dexMod = calculateModifier(character.abilityScores.dexterity)
  const playerInit = rollInitiative(dexMod)

  const entries: CombatTurnEntry[] = [
    { id: 'player', name: character.name || 'Player', initiative: playerInit, isPlayer: true },
  ]

  for (const enemy of enemies) {
    entries.push({
      id: enemy.id,
      name: enemy.name,
      initiative: enemy.initiative,
      isPlayer: false,
      enemyId: enemy.id,
    })
  }

  entries.sort((a, b) => b.initiative - a.initiative)

  return {
    enemies,
    turnOrder: entries,
    currentTurnIndex: 0,
    round: 1,
    playerInitiative: playerInit,
    isPlayerTurn: entries[0].isPlayer,
  }
}

export function advanceTurn(combat: CombatState): CombatState {
  const activeEntries = combat.turnOrder.filter((entry) => {
    if (entry.isPlayer) return true
    const enemy = combat.enemies.find((e) => e.id === entry.enemyId)
    return enemy && enemy.isActive && enemy.currentHP > 0
  })

  if (activeEntries.length === 0) return combat

  let nextIndex = combat.currentTurnIndex + 1
  let nextRound = combat.round

  if (nextIndex >= combat.turnOrder.length) {
    nextIndex = 0
    nextRound += 1
  }

  while (!activeEntries.some((e) => e.id === combat.turnOrder[nextIndex].id)) {
    nextIndex += 1
    if (nextIndex >= combat.turnOrder.length) {
      nextIndex = 0
      nextRound += 1
    }
  }

  return {
    ...combat,
    currentTurnIndex: nextIndex,
    round: nextRound,
    isPlayerTurn: combat.turnOrder[nextIndex].isPlayer,
  }
}

export function applyDamageToEnemy(combat: CombatState, enemyId: string, damage: number): CombatState {
  const enemies = combat.enemies.map((e) => {
    if (e.id !== enemyId) return e
    const newHP = Math.max(0, e.currentHP - damage)
    return { ...e, currentHP: newHP, isActive: newHP > 0 }
  })

  return { ...combat, enemies }
}

export function isCombatOver(combat: CombatState): { over: boolean; victory: boolean } {
  const aliveEnemies = combat.enemies.filter((e) => e.currentHP > 0 && e.isActive)
  if (aliveEnemies.length === 0) return { over: true, victory: true }
  return { over: false, victory: false }
}

export function buildCharacterSummary(character: Character): string {
  const profBonus = calculateProficiencyBonus(character.level)
  const strMod = calculateModifier(character.abilityScores.strength)
  const dexMod = calculateModifier(character.abilityScores.dexterity)
  const conMod = calculateModifier(character.abilityScores.constitution)
  const intMod = calculateModifier(character.abilityScores.intelligence)
  const wisMod = calculateModifier(character.abilityScores.wisdom)
  const chaMod = calculateModifier(character.abilityScores.charisma)

  const equipped = character.equipment.filter((e) => e.equipped)
  const weapons = equipped.filter((e) => e.category === 'weapon' || (e as any).weaponCategory)
  const armor = equipped.filter((e) => e.category === 'armor' || (e as any).armorType)

  const spellSlotSummary = Object.entries(character.spellSlots || {})
    .filter(([, v]) => (v as any).max > 0)
    .map(([lvl, v]) => `L${lvl}: ${(v as any).max - ((v as any).used || 0)}/${(v as any).max}`)
    .join(', ')

  const conditions = (character.conditions ?? []).length > 0 ? character.conditions.join(', ') : 'none'

  return [
    `Name: ${character.name}`,
    `Race: ${character.race?.name ?? 'Unknown'}`,
    `Class: ${character.class?.name ?? 'Unknown'}${character.subclass ? ` (${character.subclass.name})` : ''}`,
    `Level: ${character.level}`,
    `HP: ${character.hitPoints.current}/${character.hitPoints.maximum}${character.hitPoints.temporary ? ` +${character.hitPoints.temporary} temp` : ''}`,
    `AC: ${character.acOverride ?? character.armorClass}`,
    `Speed: ${character.speed} ft`,
    `Proficiency Bonus: +${profBonus}`,
    `STR: ${character.abilityScores.strength} (${strMod >= 0 ? '+' : ''}${strMod})`,
    `DEX: ${character.abilityScores.dexterity} (${dexMod >= 0 ? '+' : ''}${dexMod})`,
    `CON: ${character.abilityScores.constitution} (${conMod >= 0 ? '+' : ''}${conMod})`,
    `INT: ${character.abilityScores.intelligence} (${intMod >= 0 ? '+' : ''}${intMod})`,
    `WIS: ${character.abilityScores.wisdom} (${wisMod >= 0 ? '+' : ''}${wisMod})`,
    `CHA: ${character.abilityScores.charisma} (${chaMod >= 0 ? '+' : ''}${chaMod})`,
    `Weapons: ${weapons.length > 0 ? weapons.map((w) => w.name).join(', ') : 'unarmed'}`,
    `Armor: ${armor.length > 0 ? armor.map((a) => a.name).join(', ') : 'none'}`,
    `Conditions: ${conditions}`,
    spellSlotSummary ? `Spell Slots: ${spellSlotSummary}` : '',
    character.knownSpells.length > 0
      ? `Known Spells: ${character.knownSpells.map((s) => `${s.name} (L${s.level})`).join(', ')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n')
}
