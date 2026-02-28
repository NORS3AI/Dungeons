import type { Spell } from '../../types'

/**
 * Demon Hunter Spells
 * WoW/Diablo-inspired fel and shadow magic for the Demon Hunter class.
 * Demon Hunter is a half-caster (DEX) with no cantrips and spells up to 5th level.
 * Spell progression: 1st at L2, 2nd at L5, 3rd at L9, 4th at L13, 5th at L17
 */

// Demon Hunter Level 1 Spells (available at character level 2)
export const DEMON_HUNTER_LEVEL_1_SPELLS: Spell[] = [
  {
    id: 'fel-rush',
    name: 'Fel Rush',
    description:
      'You surge forward in a 20-foot line with fel-infused speed, passing through any creatures in your path. Each creature in the line must make a Dexterity saving throw, taking 1d8 fire damage on a failed save, or half as much on a success. You end the movement in the nearest unoccupied space at the end of the line. This movement does not provoke opportunity attacks.',
    level: 1,
    school: 'transmutation',
    castingTime: { amount: 1, unit: 'bonusAction' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '1d8', type: 'fire' },
    savingThrow: { ability: 'dexterity', effect: 'half damage' },
    ritual: false,
    concentration: false,
    classes: ['demon-hunter'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.',
  },
  {
    id: 'vault',
    name: 'Vault',
    description:
      'You perform a supernatural acrobatic leap, vaulting over a creature within 5 feet of you. You move up to 20 feet in any direction, ignoring difficult terrain for this movement and not provoking opportunity attacks. If you land within melee range of an enemy after the vault, your next melee attack before the end of your turn has advantage.',
    level: 1,
    school: 'transmutation',
    castingTime: { amount: 1, unit: 'bonusAction' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'round' },
    ritual: false,
    concentration: false,
    classes: ['demon-hunter'],
  },
  {
    id: 'immolation-aura',
    name: 'Immolation Aura',
    description:
      'You ignite your body with demonic fel fire, creating a 5-foot aura of searing flames around yourself. For the duration, any creature that starts its turn within 5 feet of you takes 1d4 fire damage. When a creature hits you with a melee attack while this spell is active, that creature takes 1d4 fire damage.',
    level: 1,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'bonusAction' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'concentration', amount: 1, unit: 'minute' },
    damage: { dice: '1d4', type: 'fire' },
    ritual: false,
    concentration: true,
    classes: ['demon-hunter'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 2nd level or higher, the aura damage increases by 1d4 for each slot level above 1st.',
  },
]

// Demon Hunter Level 2 Spells (available at character level 5)
export const DEMON_HUNTER_LEVEL_2_SPELLS: Spell[] = [
  {
    id: 'eye-beam',
    name: 'Eye Beam',
    description:
      'You unleash a devastating beam of fel energy from your spectral eyes in a 40-foot line that is 5 feet wide. Each creature in that line must make a Dexterity saving throw, taking 4d6 fire damage on a failed save, or half as much on a success. Creatures that fail the save are also blinded until the end of your next turn.',
    level: 2,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '4d6', type: 'fire' },
    savingThrow: { ability: 'dexterity', effect: 'half damage and not blinded' },
    ritual: false,
    concentration: false,
    classes: ['demon-hunter'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.',
  },
  {
    id: 'blade-dance',
    name: 'Blade Dance',
    description:
      'You spin in a lethal dance of blades, striking all creatures within 5 feet of you. Each creature within range must make a Dexterity saving throw, taking 2d6 slashing damage on a failed save, or half as much on a success. Until the start of your next turn, the first time any creature hits you with an attack, that creature takes 1d6 slashing damage.',
    level: 2,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'round' },
    damage: { dice: '2d6', type: 'slashing' },
    savingThrow: { ability: 'dexterity', effect: 'half damage' },
    ritual: false,
    concentration: false,
    classes: ['demon-hunter'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 3rd level or higher, the initial damage increases by 1d6 for each slot level above 2nd.',
  },
]

// Demon Hunter Level 3 Spells (available at character level 9)
export const DEMON_HUNTER_LEVEL_3_SPELLS: Spell[] = [
  {
    id: 'metamorphosis',
    name: 'Metamorphosis',
    description:
      'You tap into your demonic heritage and partially transform into a demon lord. For the duration, you gain the following benefits: your AC increases by 1, you gain a flying speed of 30 feet, your melee attacks deal an extra 1d6 fire damage, and you have advantage on Strength checks and saving throws. When the spell ends, you revert to your normal form.',
    level: 3,
    school: 'transmutation',
    castingTime: { amount: 1, unit: 'bonusAction' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'concentration', amount: 1, unit: 'minute' },
    damage: { dice: '1d6', type: 'fire' },
    ritual: false,
    concentration: true,
    classes: ['demon-hunter'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 4th level or higher, the duration increases to 10 minutes. At 5th level or higher, you also gain resistance to fire and necrotic damage for the duration.',
  },
  {
    id: 'shadow-power',
    name: 'Shadow Power',
    description:
      'You cloak yourself in shadow and strike from the darkness. As part of the action used to cast this spell, you can take the Hide action. If you are successfully hidden, the next weapon attack you make before the end of your turn deals an extra 1d8 necrotic damage and the target must make a Constitution saving throw or become frightened of you until the end of its next turn.',
    level: 3,
    school: 'illusion',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'round' },
    damage: { dice: '1d8', type: 'necrotic' },
    savingThrow: { ability: 'constitution', effect: 'negates frightened' },
    ritual: false,
    concentration: false,
    classes: ['demon-hunter'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 4th level or higher, the extra damage increases by 1d8 for each slot level above 3rd.',
  },
]

// Demon Hunter Level 4 Spells (available at character level 13)
export const DEMON_HUNTER_LEVEL_4_SPELLS: Spell[] = [
  {
    id: 'rain-of-vengeance',
    name: 'Rain of Vengeance',
    description:
      'You call down a storm of fel-charged blades and shadow bolts in a 20-foot-radius, 30-foot-high cylinder centered on a point within range. Each creature in the cylinder must make a Dexterity saving throw, taking 6d6 fire damage on a failed save, or half as much on a success. The area becomes difficult terrain for 1 minute, as smoldering shards litter the ground.',
    level: 4,
    school: 'conjuration',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 120 },
    components: { verbal: true, somatic: true, material: false },
    duration: { type: 'timed', amount: 1, unit: 'minute' },
    damage: { dice: '6d6', type: 'fire' },
    savingThrow: { ability: 'dexterity', effect: 'half damage' },
    ritual: false,
    concentration: false,
    classes: ['demon-hunter'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 5th level or higher, the damage increases by 2d6 for each slot level above 4th.',
  },
  {
    id: 'infernal-strike',
    name: 'Infernal Strike',
    description:
      'You launch yourself through the air in a streak of fel fire, crashing down on a point you can see within 20 feet. Each creature within 5 feet of where you land must make a Dexterity saving throw, taking 2d6 fire damage on a failed save, or half as much on a success. You can make one melee weapon attack against a creature within 5 feet as part of this action. This movement does not provoke opportunity attacks.',
    level: 4,
    school: 'evocation',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'ranged', distance: 20 },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '2d6', type: 'fire' },
    savingThrow: { ability: 'dexterity', effect: 'half damage' },
    ritual: false,
    concentration: false,
    classes: ['demon-hunter'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 5th level or higher, the damage increases by 1d6 for each slot level above 4th.',
  },
]

// Demon Hunter Level 5 Spells (available at character level 17)
export const DEMON_HUNTER_LEVEL_5_SPELLS: Spell[] = [
  {
    id: 'multishot',
    name: 'Multishot',
    description:
      'You fire a cone of projectiles in a 15-foot cone originating from you. Each creature in the cone must make a Dexterity saving throw, taking 3d6 piercing damage on a failed save, or half as much on a success. Creatures that fail the save by 5 or more are also pushed back 10 feet.',
    level: 5,
    school: 'conjuration',
    castingTime: { amount: 1, unit: 'action' },
    range: { type: 'self' },
    components: { verbal: false, somatic: true, material: false },
    duration: { type: 'instantaneous' },
    damage: { dice: '3d6', type: 'piercing' },
    savingThrow: { ability: 'dexterity', effect: 'half damage and not pushed' },
    ritual: false,
    concentration: false,
    classes: ['demon-hunter'],
    atHigherLevels:
      'When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d6 and the cone length increases by 5 feet for each slot level above 5th.',
  },
]
