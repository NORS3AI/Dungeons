import type { Spell } from '../../types'

/**
 * Amazon Spells
 * Diablo 2-inspired javelin, bow, and elemental magic for the Amazon class.
 * Amazon is a half-caster (DEX/STR) with one cantrip and spells up to 5th level.
 * Spell progression: 1st at L2, 2nd at L5, 3rd at L9, 4th at L13, 5th at L17
 */

// Amazon Cantrips
export const AMAZON_CANTRIPS: Spell[] = [
  {
    id: 'magic-arrow',
    name: 'Magic Arrow',
    description:
      'You conjure a glowing magical arrow and hurl it at a target. Make a ranged spell attack. On a hit, the target takes 1d4 force damage. The arrow passes through nonmagical shields and ignores cover from mundane obstacles. The damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).',
    level: 0,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 120 },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d4', type: 'force' },
    attackRoll: true,
    ritual: false,
    concentration: false,
    classes: ['amazon'],
  },
]

// Amazon Level 1 Spells (available at character level 2)
export const AMAZON_LEVEL_1_SPELLS: Spell[] = [
  {
    id: 'inner-sight',
    name: 'Inner Sight',
    description:
      'You attune your senses to the unseen. Choose one creature you can see within 60 feet. Until the start of your next turn, the target loses the benefits of invisibility and cannot hide. If the target is currently hidden or invisible, it is revealed in your sight. On a failed Wisdom saving throw, the effect also reveals the target\'s location to all allies within 30 feet of you.',
    level: 1,
    school: 'divination',
    castingTime: { amount: 1, unit: 'bonusAction' },
    range: { type: 'ranged', distance: 60 },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'round' },
    savingThrow: { ability: 'wisdom', effect: 'negates reveal to allies' },
    ritual: false,
    concentration: false,
    classes: ['amazon'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.',
  },
  {
    id: 'power-strike',
    name: 'Power Strike',
    description:
      'You channel lightning through your weapon. As part of the action used to cast this spell, make one melee weapon attack. On a hit, the attack deals an extra 1d6 lightning damage. The lightning can arc to one creature of your choice within 5 feet of the original target, dealing 1d6 lightning damage (no attack roll required).',
    level: 1,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d6', type: 'lightning' },
    ritual: false,
    concentration: false,
    classes: ['amazon'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 2nd level or higher, the extra lightning damage increases by 1d6 for each slot level above 1st.',
  },
  {
    id: 'guided-arrow',
    name: 'Guided Arrow',
    description:
      'You infuse your next ranged attack with divine guidance. The next ranged weapon attack you make before the end of your turn is guided — it automatically hits. The attack still deals normal damage. If the attack would have been a critical hit on the dice roll, the automatic hit is treated as a critical hit.',
    level: 1,
    school: 'transmutation',
    castingTime: { amount: 1, unit: 'bonusAction' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'round' },
    ritual: false,
    concentration: false,
    classes: ['amazon'],
  },
]

// Amazon Level 2 Spells (available at character level 5)
export const AMAZON_LEVEL_2_SPELLS: Spell[] = [
  {
    id: 'charged-strike',
    name: 'Charged Strike',
    description:
      'You overcharge your weapon with crackling electricity and slam it into an enemy. Make a melee weapon attack against a creature within reach. On a hit, the creature takes an extra 2d6 lightning damage, and the lightning leaps to up to two creatures of your choice within 10 feet of it, dealing 1d6 lightning damage to each (Dexterity saving throw for half).',
    level: 2,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '2d6', type: 'lightning' },
    savingThrow: { ability: 'dexterity', effect: 'half damage on chain targets' },
    ritual: false,
    concentration: false,
    classes: ['amazon'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 3rd level or higher, the initial extra damage increases by 1d6 and the chain damage increases by 1d6 for each slot level above 2nd.',
  },
  {
    id: 'slow-missiles',
    name: 'Slow Missiles',
    description:
      'You create a shimmering field that catches and slows incoming ranged attacks in a 20-foot-radius sphere centered on a point you can see within range. While within the sphere, creatures have resistance to piercing damage from ranged weapon attacks. Additionally, ranged weapon attacks made through the sphere have disadvantage.',
    level: 2,
    school: 'transmutation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 60 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'concentration', amount: 1, unit: 'minute' },
    ritual: false,
    concentration: true,
    classes: ['amazon'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 3rd level or higher, the radius increases by 10 feet for each slot level above 2nd.',
  },
]

// Amazon Level 3 Spells (available at character level 9)
export const AMAZON_LEVEL_3_SPELLS: Spell[] = [
  {
    id: 'lightning-fury',
    name: 'Lightning Fury',
    description:
      'You hurl a supercharged lightning javelin that explodes in a 15-foot-radius burst. Each creature in the area must make a Dexterity saving throw. On a failed save, a creature takes 6d6 lightning damage, or half as much on a success. The javelin splits on impact — for each creature that fails the save, a bolt of lightning arcs to one additional creature of your choice within 15 feet of the explosion that has not yet been targeted.',
    level: 3,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 90 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '6d6', type: 'lightning' },
    savingThrow: { ability: 'dexterity', effect: 'half damage' },
    ritual: false,
    concentration: false,
    classes: ['amazon'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.',
  },
  {
    id: 'freezing-arrow',
    name: 'Freezing Arrow',
    description:
      'You loose an arrow tipped with shards of magical ice. Make a ranged spell attack. On a hit, the target takes 3d8 cold damage and must make a Constitution saving throw. On a failed save, the target\'s speed is reduced to 0 and it is restrained until the end of your next turn as ice encases its limbs. On a success, the target\'s speed is halved until the end of its next turn.',
    level: 3,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 120 },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'round' },
    damage: { dice: '3d8', type: 'cold' },
    attackRoll: true,
    savingThrow: { ability: 'constitution', effect: 'restrained or speed halved' },
    ritual: false,
    concentration: false,
    classes: ['amazon'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 4th level or higher, the cold damage increases by 1d8 for each slot level above 3rd.',
  },
]

// Amazon Level 4 Spells (available at character level 13)
export const AMAZON_LEVEL_4_SPELLS: Spell[] = [
  {
    id: 'immolation-arrow',
    name: 'Immolation Arrow',
    description:
      'You fire an arrow wreathed in consuming magical fire. Make a ranged spell attack. On a hit, the target takes 3d6 fire damage and the arrow detonates — all creatures within 10 feet of the target must make a Dexterity saving throw, taking 3d6 fire damage on a failed save, or half as much on a success. The ground in that area becomes difficult terrain, burning for 1 minute and dealing 1d6 fire damage to any creature that starts its turn there.',
    level: 4,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 120 },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'minute' },
    damage: { dice: '3d6', type: 'fire' },
    attackRoll: true,
    savingThrow: { ability: 'dexterity', effect: 'half damage on explosion' },
    ritual: false,
    concentration: false,
    classes: ['amazon'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 5th level or higher, both the initial damage and explosion damage each increase by 1d6.',
  },
  {
    id: 'strafe',
    name: 'Strafe',
    description:
      'You loose a rapid volley of arrows in a sweeping arc, targeting up to four creatures you can see within range. Make a separate ranged spell attack against each target. On a hit, a target takes 2d6 piercing damage. You can target the same creature more than once; resolve each attack separately.',
    level: 4,
    school: 'conjuration',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 120 },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '2d6', type: 'piercing' },
    attackRoll: true,
    ritual: false,
    concentration: false,
    classes: ['amazon'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 5th level or higher, you can target one additional creature for each slot level above 4th.',
  },
]

// Amazon Level 5 Spells (available at character level 17)
export const AMAZON_LEVEL_5_SPELLS: Spell[] = [
  {
    id: 'decoy',
    name: 'Decoy',
    description:
      'You conjure an illusory duplicate of yourself that appears in an unoccupied space within 30 feet of you. The decoy has your appearance, AC, and movement speed, but 1 hit point. As a bonus action on each of your turns, you can move the decoy up to 30 feet. Enemies that can see the decoy and fail a Wisdom saving throw believe it to be real and may target it with attacks. The decoy vanishes when it takes any damage, when you dismiss it, or when the spell ends.',
    level: 5,
    school: 'illusion',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'concentration', amount: 1, unit: 'minute' },
    savingThrow: { ability: 'wisdom', effect: 'negates belief in decoy' },
    ritual: false,
    concentration: true,
    classes: ['amazon'],
  },
  {
    id: 'summon-valkyrie',
    name: 'Summon Valkyrie',
    description:
      'You call upon the warrior spirit of a Valkyrie to fight at your side. The Valkyrie appears in an unoccupied space within 30 feet of you. It uses the Valkyrie stat block: AC 16, hit points equal to twice your character level + 10, speed 30 ft. The Valkyrie acts on your initiative immediately after you, following your commands. It attacks with a spear (+5 to hit, 1d8+3 piercing). When the Valkyrie drops to 0 hit points or the spell ends, it vanishes.',
    level: 5,
    school: 'conjuration',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 30 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'concentration', amount: 1, unit: 'hour' },
    ritual: false,
    concentration: true,
    classes: ['amazon'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 6th level or higher, the Valkyrie gains +2 to its attack and damage rolls and +10 hit points for each slot level above 5th.',
  },
]
