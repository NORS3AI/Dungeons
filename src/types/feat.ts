/**
 * D&D 5e Feats
 */

import type { Ability } from './class'

/**
 * Feat prerequisite
 */
export interface FeatPrerequisite {
  type: 'ability' | 'proficiency' | 'spellcasting' | 'level' | 'race' | 'class'
  value: string | number
  minimum?: number
}

/**
 * Feat definition
 */
export interface Feat {
  id: string
  name: string
  description: string
  prerequisites?: FeatPrerequisite[]
  abilityScoreIncrease?: {
    abilities: Ability[]
    amount: number
    choose?: number
  }
  benefits: string[]
}

// =============================================================================
// ORIGIN FEATS (Available at level 1 for some backgrounds)
// =============================================================================

export const ALERT: Feat = {
  id: 'alert',
  name: 'Alert',
  description: 'Always on the lookout for danger, you gain the following benefits.',
  benefits: [
    'You gain a +5 bonus to initiative.',
    'You can\'t be surprised while you are conscious.',
    'Other creatures don\'t gain advantage on attack rolls against you as a result of being unseen by you.',
  ],
}

export const SKILLED: Feat = {
  id: 'skilled',
  name: 'Skilled',
  description: 'You gain proficiency in any combination of three skills or tools of your choice.',
  benefits: [
    'You gain proficiency in three skills or tools of your choice.',
  ],
}

export const TOUGH: Feat = {
  id: 'tough',
  name: 'Tough',
  description: 'Your hit point maximum increases by an amount equal to twice your level when you gain this feat.',
  benefits: [
    'Your hit point maximum increases by an amount equal to twice your level.',
    'Whenever you gain a level thereafter, your hit point maximum increases by an additional 2 hit points.',
  ],
}

export const LUCKY: Feat = {
  id: 'lucky',
  name: 'Lucky',
  description: 'You have inexplicable luck that seems to kick in at just the right moment.',
  benefits: [
    'You have 3 luck points.',
    'Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20.',
    'You can also spend a luck point when an attack roll is made against you. Roll a d20, and choose whether the attack uses your roll or the attacker\'s.',
    'You regain your expended luck points when you finish a long rest.',
  ],
}

// =============================================================================
// GENERAL FEATS
// =============================================================================

export const GREAT_WEAPON_MASTER: Feat = {
  id: 'great-weapon-master',
  name: 'Great Weapon Master',
  description: 'You\'ve learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes.',
  benefits: [
    'On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action.',
    'Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack\'s damage.',
  ],
}

export const SHARPSHOOTER: Feat = {
  id: 'sharpshooter',
  name: 'Sharpshooter',
  description: 'You have mastered ranged weapons and can make shots that others find impossible.',
  benefits: [
    'Attacking at long range doesn\'t impose disadvantage on your ranged weapon attack rolls.',
    'Your ranged weapon attacks ignore half cover and three-quarters cover.',
    'Before you make an attack with a ranged weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack\'s damage.',
  ],
}

export const SENTINEL: Feat = {
  id: 'sentinel',
  name: 'Sentinel',
  description: 'You have mastered techniques to take advantage of every drop in any enemy\'s guard.',
  benefits: [
    'When you hit a creature with an opportunity attack, the creature\'s speed becomes 0 for the rest of the turn.',
    'Creatures provoke opportunity attacks from you even if they take the Disengage action before leaving your reach.',
    'When a creature within 5 feet of you makes an attack against a target other than you, you can use your reaction to make a melee weapon attack against the attacking creature.',
  ],
}

export const POLEARM_MASTER: Feat = {
  id: 'polearm-master',
  name: 'Polearm Master',
  description: 'You can keep your enemies at bay with reach weapons.',
  benefits: [
    'When you take the Attack action with a glaive, halberd, quarterstaff, or spear, you can use a bonus action to make a melee attack with the opposite end of the weapon (1d4 bludgeoning damage).',
    'While you are wielding a glaive, halberd, pike, quarterstaff, or spear, other creatures provoke an opportunity attack from you when they enter your reach.',
  ],
}

export const WAR_CASTER: Feat = {
  id: 'war-caster',
  name: 'War Caster',
  description: 'You have practiced casting spells in the midst of combat.',
  prerequisites: [
    { type: 'spellcasting', value: 'any' },
  ],
  benefits: [
    'You have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage.',
    'You can perform the somatic components of spells even when you have weapons or a shield in one or both hands.',
    'When a hostile creature\'s movement provokes an opportunity attack from you, you can use your reaction to cast a spell at the creature, rather than making an opportunity attack.',
  ],
}

export const RESILIENT: Feat = {
  id: 'resilient',
  name: 'Resilient',
  description: 'Choose one ability score. You gain proficiency in saving throws using that ability.',
  abilityScoreIncrease: {
    abilities: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    amount: 1,
    choose: 1,
  },
  benefits: [
    'Increase the chosen ability score by 1, to a maximum of 20.',
    'You gain proficiency in saving throws using the chosen ability.',
  ],
}

export const MOBILE: Feat = {
  id: 'mobile',
  name: 'Mobile',
  description: 'You are exceptionally speedy and agile.',
  benefits: [
    'Your speed increases by 10 feet.',
    'When you use the Dash action, difficult terrain doesn\'t cost you extra movement on that turn.',
    'When you make a melee attack against a creature, you don\'t provoke opportunity attacks from that creature for the rest of the turn, whether you hit or not.',
  ],
}

export const CROSSBOW_EXPERT: Feat = {
  id: 'crossbow-expert',
  name: 'Crossbow Expert',
  description: 'Thanks to extensive practice with the crossbow, you gain the following benefits.',
  benefits: [
    'You ignore the loading property of crossbows with which you are proficient.',
    'Being within 5 feet of a hostile creature doesn\'t impose disadvantage on your ranged attack rolls.',
    'When you use the Attack action and attack with a one-handed weapon, you can use a bonus action to attack with a hand crossbow you are holding.',
  ],
}

export const DUAL_WIELDER: Feat = {
  id: 'dual-wielder',
  name: 'Dual Wielder',
  description: 'You master fighting with two weapons.',
  benefits: [
    'You gain a +1 bonus to AC while you are wielding a separate melee weapon in each hand.',
    'You can use two-weapon fighting even when the one-handed melee weapons you are wielding aren\'t light.',
    'You can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.',
  ],
}

export const SHIELD_MASTER: Feat = {
  id: 'shield-master',
  name: 'Shield Master',
  description: 'You use shields not just for protection but also for offense.',
  benefits: [
    'If you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you with your shield.',
    'If you aren\'t incapacitated, you can add your shield\'s AC bonus to any Dexterity saving throw you make against a spell or other harmful effect that targets only you.',
    'If you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can use your reaction to take no damage if you succeed on the saving throw, interposing your shield between yourself and the source of the effect.',
  ],
}

export const MAGE_SLAYER: Feat = {
  id: 'mage-slayer',
  name: 'Mage Slayer',
  description: 'You have practiced techniques useful in melee combat against spellcasters.',
  benefits: [
    'When a creature within 5 feet of you casts a spell, you can use your reaction to make a melee weapon attack against that creature.',
    'When you damage a creature that is concentrating on a spell, that creature has disadvantage on the saving throw it makes to maintain its concentration.',
    'You have advantage on saving throws against spells cast by creatures within 5 feet of you.',
  ],
}

export const ACTOR: Feat = {
  id: 'actor',
  name: 'Actor',
  description: 'Skilled at mimicry and dramatics, you gain the following benefits.',
  abilityScoreIncrease: {
    abilities: ['charisma'],
    amount: 1,
  },
  benefits: [
    'Increase your Charisma score by 1, to a maximum of 20.',
    'You have advantage on Deception and Performance checks when trying to pass yourself off as a different person.',
    'You can mimic the speech of another person or the sounds made by other creatures. Listeners require a Wisdom (Insight) check contested by your Charisma (Deception) check to determine the sound is faked.',
  ],
}

export const OBSERVANT: Feat = {
  id: 'observant',
  name: 'Observant',
  description: 'Quick to notice details of your environment.',
  abilityScoreIncrease: {
    abilities: ['intelligence', 'wisdom'],
    amount: 1,
    choose: 1,
  },
  benefits: [
    'Increase your Intelligence or Wisdom by 1, to a maximum of 20.',
    'If you can see a creature\'s mouth while it is speaking a language you understand, you can interpret what it\'s saying by reading its lips.',
    'You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.',
  ],
}

// =============================================================================
// FEAT COLLECTIONS
// =============================================================================

export const ORIGIN_FEATS = [ALERT, SKILLED, TOUGH, LUCKY]

export const COMBAT_FEATS = [
  GREAT_WEAPON_MASTER,
  SHARPSHOOTER,
  SENTINEL,
  POLEARM_MASTER,
  CROSSBOW_EXPERT,
  DUAL_WIELDER,
  SHIELD_MASTER,
  MAGE_SLAYER,
]

export const UTILITY_FEATS = [WAR_CASTER, RESILIENT, MOBILE, ACTOR, OBSERVANT]

export const ALL_FEATS = [...ORIGIN_FEATS, ...COMBAT_FEATS, ...UTILITY_FEATS]
