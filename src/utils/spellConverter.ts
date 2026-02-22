import type { SpellRef } from '../data/quickReference'
import type { Spell, SpellSchool, CastingTime, SpellRange, SpellComponents, SpellDuration } from '../types/spell'

/**
 * Parse components string (e.g., "V, S, M (material description)")
 */
function parseComponents(componentsStr: string): SpellComponents {
  const components: SpellComponents = {
    verbal: componentsStr.includes('V'),
    somatic: componentsStr.includes('S'),
    material: componentsStr.includes('M'),
  }

  // Extract material description if present
  const materialMatch = componentsStr.match(/M \(([^)]+)\)/)
  if (materialMatch) {
    components.materialDescription = materialMatch[1]

    // Check if material is consumed
    if (components.materialDescription.toLowerCase().includes('consumed')) {
      components.materialConsumed = true
    }

    // Extract cost if present
    const costMatch = components.materialDescription.match(/(\d+,?\d*)\s*gp/)
    if (costMatch) {
      components.materialCost = parseInt(costMatch[1].replace(',', ''))
    }
  }

  return components
}

/**
 * Parse casting time string (e.g., "1 action", "1 bonus action", "1 minute")
 */
function parseCastingTime(castingTimeStr: string): CastingTime {
  const str = castingTimeStr.toLowerCase()

  if (str.includes('bonus action')) {
    return { amount: 1, unit: 'bonusAction' }
  }
  if (str.includes('reaction')) {
    const triggerMatch = castingTimeStr.match(/reaction(?:\s*\(([^)]+)\))?/)
    return {
      amount: 1,
      unit: 'reaction',
      reactionTrigger: triggerMatch?.[1],
    }
  }
  if (str.includes('action')) {
    return { amount: 1, unit: 'action' }
  }
  if (str.includes('minute')) {
    const amount = parseInt(str.match(/(\d+)/)?.[1] || '1')
    return { amount, unit: 'minute' }
  }
  if (str.includes('hour')) {
    const amount = parseInt(str.match(/(\d+)/)?.[1] || '1')
    return { amount, unit: 'hour' }
  }

  return { amount: 1, unit: 'action' }
}

/**
 * Parse range string (e.g., "60 feet", "Self", "Touch", "Sight")
 */
function parseRange(rangeStr: string): SpellRange {
  const str = rangeStr.toLowerCase()

  if (str.includes('self')) {
    return { type: 'self' }
  }
  if (str.includes('touch')) {
    return { type: 'touch' }
  }
  if (str.includes('sight')) {
    return { type: 'sight' }
  }
  if (str.includes('unlimited')) {
    return { type: 'unlimited' }
  }

  // Parse distance
  const distanceMatch = rangeStr.match(/(\d+)\s*(?:feet|ft)/i)
  if (distanceMatch) {
    return {
      type: 'ranged',
      distance: parseInt(distanceMatch[1]),
    }
  }

  const mileMatch = rangeStr.match(/(\d+)\s*mile/i)
  if (mileMatch) {
    return {
      type: 'ranged',
      distance: parseInt(mileMatch[1]) * 5280,
    }
  }

  return { type: 'special' }
}

/**
 * Parse duration string (e.g., "Instantaneous", "Concentration, up to 1 minute", "8 hours")
 */
function parseDuration(durationStr: string): SpellDuration {
  const str = durationStr.toLowerCase()

  if (str.includes('instantaneous')) {
    return { type: 'instantaneous' }
  }
  if (str.includes('until dispelled')) {
    return { type: 'untilDispelled' }
  }
  if (str.includes('special')) {
    return { type: 'special' }
  }

  const isConcentration = str.includes('concentration')

  // Parse time amount
  const roundMatch = str.match(/(\d+)\s*round/)
  if (roundMatch) {
    return {
      type: isConcentration ? 'concentration' : 'timed',
      amount: parseInt(roundMatch[1]),
      unit: 'round',
    }
  }

  const minuteMatch = str.match(/(\d+)\s*minute/)
  if (minuteMatch) {
    return {
      type: isConcentration ? 'concentration' : 'timed',
      amount: parseInt(minuteMatch[1]),
      unit: 'minute',
    }
  }

  const hourMatch = str.match(/(\d+)\s*hour/)
  if (hourMatch) {
    return {
      type: isConcentration ? 'concentration' : 'timed',
      amount: parseInt(hourMatch[1]),
      unit: 'hour',
    }
  }

  const dayMatch = str.match(/(\d+)\s*day/)
  if (dayMatch) {
    return {
      type: isConcentration ? 'concentration' : 'timed',
      amount: parseInt(dayMatch[1]),
      unit: 'day',
    }
  }

  return { type: 'instantaneous' }
}

/**
 * Convert SpellRef to Spell
 */
export function convertSpellRefToSpell(spellRef: SpellRef): Spell {
  const level = typeof spellRef.level === 'number' ? spellRef.level : 0

  return {
    id: spellRef.id,
    name: spellRef.name,
    description: spellRef.description,
    level,
    school: spellRef.school.toLowerCase() as SpellSchool,
    castingTime: parseCastingTime(spellRef.castingTime),
    range: parseRange(spellRef.range),
    components: parseComponents(spellRef.components),
    duration: parseDuration(spellRef.duration),
    ritual: false, // SpellRef doesn't track this
    concentration: spellRef.duration.toLowerCase().includes('concentration'),
    classes: spellRef.classes,
    atHigherLevels: spellRef.higherLevels,
  }
}
