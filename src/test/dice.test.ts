import { describe, it, expect } from 'vitest'
import {
  parseDiceNotation,
  rollDie,
  rollDice,
  calculateModifier,
  calculateProficiencyBonus,
} from '../types/dice'

describe('parseDiceNotation', () => {
  it('parses basic notation like "1d20"', () => {
    const result = parseDiceNotation('1d20')
    expect(result).toEqual({
      dice: [{ sides: 20, count: 1 }],
      modifier: 0,
    })
  })

  it('parses notation without count like "d6"', () => {
    const result = parseDiceNotation('d6')
    expect(result).toEqual({
      dice: [{ sides: 6, count: 1 }],
      modifier: 0,
    })
  })

  it('parses multiple dice like "4d6"', () => {
    const result = parseDiceNotation('4d6')
    expect(result).toEqual({
      dice: [{ sides: 6, count: 4 }],
      modifier: 0,
    })
  })

  it('parses positive modifier like "1d20+5"', () => {
    const result = parseDiceNotation('1d20+5')
    expect(result).toEqual({
      dice: [{ sides: 20, count: 1 }],
      modifier: 5,
    })
  })

  it('parses negative modifier like "2d6-2"', () => {
    const result = parseDiceNotation('2d6-2')
    expect(result).toEqual({
      dice: [{ sides: 6, count: 2 }],
      modifier: -2,
    })
  })

  it('parses d3 (minimum die size)', () => {
    const result = parseDiceNotation('1d3')
    expect(result).toEqual({
      dice: [{ sides: 3, count: 1 }],
      modifier: 0,
    })
  })

  it('parses d100', () => {
    const result = parseDiceNotation('1d100')
    expect(result).toEqual({
      dice: [{ sides: 100, count: 1 }],
      modifier: 0,
    })
  })

  it('parses d1000 (maximum die size)', () => {
    const result = parseDiceNotation('1d1000')
    expect(result).toEqual({
      dice: [{ sides: 1000, count: 1 }],
      modifier: 0,
    })
  })

  it('parses 12d10 (large count)', () => {
    const result = parseDiceNotation('12d10')
    expect(result).toEqual({
      dice: [{ sides: 10, count: 12 }],
      modifier: 0,
    })
  })

  it('returns null for invalid notation', () => {
    expect(parseDiceNotation('invalid')).toBeNull()
    expect(parseDiceNotation('')).toBeNull()
    expect(parseDiceNotation('d2')).toBeNull() // d2 is below minimum
    expect(parseDiceNotation('d1001')).toBeNull() // d1001 is above maximum
  })
})

describe('rollDie', () => {
  it('returns value between 1 and sides', () => {
    for (let i = 0; i < 100; i++) {
      const result = rollDie(20)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(20)
    }
  })

  it('works with d3', () => {
    for (let i = 0; i < 50; i++) {
      const result = rollDie(3)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(3)
    }
  })

  it('works with d1000', () => {
    for (let i = 0; i < 50; i++) {
      const result = rollDie(1000)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(1000)
    }
  })
})

describe('rollDice', () => {
  it('returns a valid DiceRoll object', () => {
    const result = rollDice('2d6+3')
    expect(result).not.toBeNull()
    expect(result?.notation).toBe('2d6+3')
    expect(result?.results).toHaveLength(2)
    expect(result?.grandTotal).toBeGreaterThanOrEqual(5) // min: 1+1+3
    expect(result?.grandTotal).toBeLessThanOrEqual(15) // max: 6+6+3
  })

  it('returns null for invalid notation', () => {
    const result = rollDice('invalid')
    expect(result).toBeNull()
  })

  it('correctly identifies max/min rolls', () => {
    // Roll many times to check isMax/isMin logic
    for (let i = 0; i < 100; i++) {
      const result = rollDice('1d6')
      if (result) {
        const die = result.results[0]
        expect(die.isMax).toBe(die.value === 6)
        expect(die.isMin).toBe(die.value === 1)
      }
    }
  })
})

describe('calculateModifier', () => {
  it('calculates correct modifiers', () => {
    expect(calculateModifier(1)).toBe(-5)
    expect(calculateModifier(8)).toBe(-1)
    expect(calculateModifier(9)).toBe(-1)
    expect(calculateModifier(10)).toBe(0)
    expect(calculateModifier(11)).toBe(0)
    expect(calculateModifier(12)).toBe(1)
    expect(calculateModifier(13)).toBe(1)
    expect(calculateModifier(14)).toBe(2)
    expect(calculateModifier(15)).toBe(2)
    expect(calculateModifier(16)).toBe(3)
    expect(calculateModifier(18)).toBe(4)
    expect(calculateModifier(20)).toBe(5)
    expect(calculateModifier(30)).toBe(10)
  })
})

describe('calculateProficiencyBonus', () => {
  it('calculates correct proficiency bonus by level', () => {
    expect(calculateProficiencyBonus(1)).toBe(2)
    expect(calculateProficiencyBonus(4)).toBe(2)
    expect(calculateProficiencyBonus(5)).toBe(3)
    expect(calculateProficiencyBonus(8)).toBe(3)
    expect(calculateProficiencyBonus(9)).toBe(4)
    expect(calculateProficiencyBonus(12)).toBe(4)
    expect(calculateProficiencyBonus(13)).toBe(5)
    expect(calculateProficiencyBonus(16)).toBe(5)
    expect(calculateProficiencyBonus(17)).toBe(6)
    expect(calculateProficiencyBonus(20)).toBe(6)
  })
})
