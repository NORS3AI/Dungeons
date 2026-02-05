/**
 * Hit die type for a class
 */
export type HitDie = 'd6' | 'd8' | 'd10' | 'd12'

/**
 * Ability type
 */
export type Ability = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'

/**
 * Spellcasting type
 */
export type SpellcastingType = 'none' | 'full' | 'half' | 'third' | 'pact'

/**
 * Class feature
 */
export interface ClassFeature {
  id: string
  name: string
  description: string
  level: number
  charges?: {
    amount: number | 'proficiencyBonus' | 'abilityModifier'
    abilityModifier?: Ability
    rechargeOn: 'shortRest' | 'longRest' | 'dawn'
  }
}

/**
 * Fighting style option
 */
export interface FightingStyle {
  id: string
  name: string
  description: string
}

/**
 * D&D Class
 */
export interface Class {
  id: string
  name: string
  description: string

  // Core
  hitDie: HitDie
  primaryAbility: Ability[]

  // Saving throws
  savingThrows: [Ability, Ability]

  // Proficiencies
  armorProficiencies: string[]
  weaponProficiencies: string[]
  toolProficiencies: string[]
  skillChoices: {
    choose: number
    from: string[]
  }

  // Spellcasting
  spellcasting: SpellcastingType
  spellcastingAbility?: Ability
  cantripsKnown?: number[]
  spellsKnown?: number[]

  // Features by level
  features: ClassFeature[]

  // Fighting styles (for martial classes)
  fightingStyles?: FightingStyle[]

  // Available subclasses
  subclassLevel: number
  subclassName: string // e.g., "Martial Archetype", "Otherworldly Patron"
}

/**
 * Subclass definition
 */
export interface Subclass {
  id: string
  name: string
  description: string
  parentClassId: string

  // Features
  features: ClassFeature[]

  // Expanded spell list (for casters)
  expandedSpells?: {
    level: number
    spells: string[]
  }[]
}

/**
 * Fighter class definition
 */
export const FIGHTER: Class = {
  id: 'fighter',
  name: 'Fighter',
  description: 'A master of martial combat, skilled with a variety of weapons and armor.',
  hitDie: 'd10',
  primaryAbility: ['strength', 'dexterity'],
  savingThrows: ['strength', 'constitution'],
  armorProficiencies: ['light', 'medium', 'heavy', 'shields'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
  },
  spellcasting: 'none',
  features: [
    {
      id: 'fighting-style',
      name: 'Fighting Style',
      description: 'You adopt a particular style of fighting as your specialty.',
      level: 1,
    },
    {
      id: 'second-wind',
      name: 'Second Wind',
      description: 'You have a limited well of stamina that you can draw on to recover 1d10 + fighter level HP.',
      level: 1,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'action-surge',
      name: 'Action Surge',
      description: 'You can push yourself beyond your normal limits for a moment to take one additional action.',
      level: 2,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'extra-attack',
      name: 'Extra Attack',
      description: 'You can attack twice when you take the Attack action on your turn.',
      level: 5,
    },
    {
      id: 'extra-attack-2',
      name: 'Extra Attack (2)',
      description: 'You can attack three times when you take the Attack action.',
      level: 11,
    },
    {
      id: 'extra-attack-3',
      name: 'Extra Attack (3)',
      description: 'You can attack four times when you take the Attack action.',
      level: 20,
    },
  ],
  fightingStyles: [
    { id: 'archery', name: 'Archery', description: '+2 bonus to attack rolls with ranged weapons.' },
    { id: 'defense', name: 'Defense', description: '+1 bonus to AC while wearing armor.' },
    { id: 'dueling', name: 'Dueling', description: '+2 bonus to damage with one-handed melee weapon and no other weapons.' },
    { id: 'great-weapon', name: 'Great Weapon Fighting', description: 'Reroll 1s and 2s on damage dice for two-handed weapons.' },
    { id: 'protection', name: 'Protection', description: 'Use reaction to impose disadvantage on attack against adjacent ally.' },
    { id: 'two-weapon', name: 'Two-Weapon Fighting', description: 'Add ability modifier to off-hand attack damage.' },
    { id: 'dual-two-handed', name: 'Dual Two-Handed', description: 'Wield two two-handed weapons simultaneously (e.g., two greatswords). -4 AC penalty but roll damage for both weapons.' },
  ],
  subclassLevel: 3,
  subclassName: 'Martial Archetype',
}

/**
 * Warlock class definition
 */
export const WARLOCK: Class = {
  id: 'warlock',
  name: 'Warlock',
  description: 'A wielder of magic derived from a bargain with an extraplanar entity.',
  hitDie: 'd8',
  primaryAbility: ['charisma'],
  savingThrows: ['wisdom', 'charisma'],
  armorProficiencies: ['light'],
  weaponProficiencies: ['simple'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
  },
  spellcasting: 'pact',
  spellcastingAbility: 'charisma',
  cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  spellsKnown: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
  features: [
    {
      id: 'pact-magic',
      name: 'Pact Magic',
      description: 'Your arcane research has granted you the ability to cast spells using Pact Magic.',
      level: 1,
    },
    {
      id: 'eldritch-invocations',
      name: 'Eldritch Invocations',
      description: 'You uncover eldritch secrets that imbue you with magical abilities.',
      level: 2,
    },
    {
      id: 'pact-boon',
      name: 'Pact Boon',
      description: 'Your patron bestows a gift upon you for your loyal service.',
      level: 3,
    },
    {
      id: 'mystic-arcanum-6',
      name: 'Mystic Arcanum (6th level)',
      description: 'Your patron bestows upon you a magical secret called an arcanum.',
      level: 11,
    },
    {
      id: 'mystic-arcanum-7',
      name: 'Mystic Arcanum (7th level)',
      description: 'You gain a 7th-level arcanum.',
      level: 13,
    },
    {
      id: 'mystic-arcanum-8',
      name: 'Mystic Arcanum (8th level)',
      description: 'You gain an 8th-level arcanum.',
      level: 15,
    },
    {
      id: 'mystic-arcanum-9',
      name: 'Mystic Arcanum (9th level)',
      description: 'You gain a 9th-level arcanum.',
      level: 17,
    },
    {
      id: 'eldritch-master',
      name: 'Eldritch Master',
      description: 'You can regain all Pact Magic spell slots by spending 1 minute entreating your patron.',
      level: 20,
      charges: { amount: 1, rechargeOn: 'longRest' },
    },
  ],
  subclassLevel: 1,
  subclassName: 'Otherworldly Patron',
}

/**
 * Great Old One subclass
 */
export const GREAT_OLD_ONE: Subclass = {
  id: 'great-old-one',
  name: 'The Great Old One',
  description: 'Your patron is a mysterious entity from the Far Realm or beyond the stars.',
  parentClassId: 'warlock',
  features: [
    {
      id: 'awakened-mind',
      name: 'Awakened Mind',
      description: 'You can telepathically speak to any creature within 30 feet.',
      level: 1,
    },
    {
      id: 'entropic-ward',
      name: 'Entropic Ward',
      description: 'Use reaction to impose disadvantage on an attack; if it misses, gain advantage on next attack.',
      level: 6,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'thought-shield',
      name: 'Thought Shield',
      description: 'Your thoughts can\'t be read, you have resistance to psychic damage, and reflect damage on telepathic contact.',
      level: 10,
    },
    {
      id: 'create-thrall',
      name: 'Create Thrall',
      description: 'You can charm an incapacitated humanoid indefinitely.',
      level: 14,
    },
  ],
  expandedSpells: [
    { level: 1, spells: ['dissonant-whispers', 'tashas-hideous-laughter'] },
    { level: 2, spells: ['detect-thoughts', 'phantasmal-force'] },
    { level: 3, spells: ['clairvoyance', 'sending'] },
    { level: 4, spells: ['dominate-beast', 'evards-black-tentacles'] },
    { level: 5, spells: ['dominate-person', 'telekinesis'] },
  ],
}

/**
 * Champion subclass for Fighter
 */
export const CHAMPION: Subclass = {
  id: 'champion',
  name: 'Champion',
  description: 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection.',
  parentClassId: 'fighter',
  features: [
    {
      id: 'improved-critical',
      name: 'Improved Critical',
      description: 'Your weapon attacks score a critical hit on a roll of 19 or 20.',
      level: 3,
    },
    {
      id: 'remarkable-athlete',
      name: 'Remarkable Athlete',
      description: 'Add half your proficiency bonus (round up) to any STR, DEX, or CON check that doesn\'t already use your proficiency bonus. Running long jump distance increases by feet equal to your STR modifier.',
      level: 7,
    },
    {
      id: 'additional-fighting-style',
      name: 'Additional Fighting Style',
      description: 'You can choose a second Fighting Style option.',
      level: 10,
    },
    {
      id: 'superior-critical',
      name: 'Superior Critical',
      description: 'Your weapon attacks score a critical hit on a roll of 18-20.',
      level: 15,
    },
    {
      id: 'survivor',
      name: 'Survivor',
      description: 'At the start of each of your turns, you regain HP equal to 5 + CON modifier if you have no more than half your HP remaining. This doesn\'t work if you have 0 HP.',
      level: 18,
    },
  ],
}

/**
 * Battle Master subclass for Fighter
 */
export const BATTLE_MASTER: Subclass = {
  id: 'battle-master',
  name: 'Battle Master',
  description: 'Battle Masters employ martial techniques passed down through generations, using superiority dice to fuel powerful maneuvers.',
  parentClassId: 'fighter',
  features: [
    {
      id: 'combat-superiority',
      name: 'Combat Superiority',
      description: 'You learn three maneuvers and gain four superiority dice (d8). You regain all expended dice on a short or long rest.',
      level: 3,
      charges: { amount: 4, rechargeOn: 'shortRest' },
    },
    {
      id: 'student-of-war',
      name: 'Student of War',
      description: 'You gain proficiency with one type of artisan\'s tools of your choice.',
      level: 3,
    },
    {
      id: 'know-your-enemy',
      name: 'Know Your Enemy',
      description: 'If you spend 1 minute observing a creature, you can learn certain information about its capabilities compared to your own.',
      level: 7,
    },
    {
      id: 'improved-combat-superiority',
      name: 'Improved Combat Superiority',
      description: 'Your superiority dice turn into d10s.',
      level: 10,
    },
    {
      id: 'relentless',
      name: 'Relentless',
      description: 'When you roll initiative and have no superiority dice remaining, you regain one superiority die.',
      level: 15,
    },
  ],
}

/**
 * Fiend patron subclass for Warlock
 */
export const FIEND: Subclass = {
  id: 'fiend',
  name: 'The Fiend',
  description: 'You have made a pact with a fiend from the lower planes of existence. Devils, demons, and other dark powers grant you abilities fueled by fire and destruction.',
  parentClassId: 'warlock',
  features: [
    {
      id: 'dark-ones-blessing',
      name: 'Dark One\'s Blessing',
      description: 'When you reduce a hostile creature to 0 HP, you gain temporary HP equal to your CHA modifier + your warlock level (minimum 1).',
      level: 1,
    },
    {
      id: 'dark-ones-own-luck',
      name: 'Dark One\'s Own Luck',
      description: 'When you make an ability check or saving throw, you can add a d10 to your roll. Once used, you can\'t use this again until a short or long rest.',
      level: 6,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'fiendish-resilience',
      name: 'Fiendish Resilience',
      description: 'You can choose one damage type when you finish a short or long rest. You gain resistance to that damage type until you choose a different one.',
      level: 10,
    },
    {
      id: 'hurl-through-hell',
      name: 'Hurl Through Hell',
      description: 'When you hit a creature with an attack, you can instantly transport it through the lower planes. The creature takes 10d10 psychic damage if it isn\'t a fiend.',
      level: 14,
      charges: { amount: 1, rechargeOn: 'longRest' },
    },
  ],
  expandedSpells: [
    { level: 1, spells: ['burning-hands', 'command'] },
    { level: 2, spells: ['blindness-deafness', 'scorching-ray'] },
    { level: 3, spells: ['fireball', 'stinking-cloud'] },
    { level: 4, spells: ['fire-shield', 'wall-of-fire'] },
    { level: 5, spells: ['flame-strike', 'hallow'] },
  ],
}

/**
 * Archfey patron subclass for Warlock
 */
export const ARCHFEY: Subclass = {
  id: 'archfey',
  name: 'The Archfey',
  description: 'Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before mortal races were born.',
  parentClassId: 'warlock',
  features: [
    {
      id: 'fey-presence',
      name: 'Fey Presence',
      description: 'As an action, cause each creature in a 10-foot cube originating from you to make a WIS save or become charmed or frightened (your choice) until the end of your next turn.',
      level: 1,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'misty-escape',
      name: 'Misty Escape',
      description: 'When you take damage, you can use your reaction to turn invisible and teleport up to 60 feet. You remain invisible until the start of your next turn.',
      level: 6,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'beguiling-defenses',
      name: 'Beguiling Defenses',
      description: 'You are immune to being charmed. When another creature attempts to charm you, you can use your reaction to turn the charm back on them.',
      level: 10,
    },
    {
      id: 'dark-delirium',
      name: 'Dark Delirium',
      description: 'As an action, choose a creature within 60 feet. It must make a WIS save or be charmed or frightened for 1 minute, perceiving a dreamlike world.',
      level: 14,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
  ],
  expandedSpells: [
    { level: 1, spells: ['faerie-fire', 'sleep'] },
    { level: 2, spells: ['calm-emotions', 'phantasmal-force'] },
    { level: 3, spells: ['blink', 'plant-growth'] },
    { level: 4, spells: ['dominate-beast', 'greater-invisibility'] },
    { level: 5, spells: ['dominate-person', 'seeming'] },
  ],
}

/**
 * Hexblade patron subclass for Warlock
 */
export const HEXBLADE: Subclass = {
  id: 'hexblade',
  name: 'The Hexblade',
  description: 'You have made your pact with a mysterious entity from the Shadowfell, a force that manifests in sentient magic weapons carved from the stuff of shadow.',
  parentClassId: 'warlock',
  features: [
    {
      id: 'hexblades-curse',
      name: 'Hexblade\'s Curse',
      description: 'As a bonus action, curse a creature within 30 feet. You gain bonus damage equal to proficiency bonus, crit on 19-20, and regain HP equal to warlock level + CHA modifier if the target dies.',
      level: 1,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'hex-warrior',
      name: 'Hex Warrior',
      description: 'You gain proficiency with medium armor, shields, and martial weapons. You can use CHA instead of STR or DEX for attack and damage with one weapon.',
      level: 1,
    },
    {
      id: 'accursed-specter',
      name: 'Accursed Specter',
      description: 'When you slay a humanoid, you can curse its soul to rise as a specter that serves you until your next long rest.',
      level: 6,
    },
    {
      id: 'armor-of-hexes',
      name: 'Armor of Hexes',
      description: 'If the target of your Hexblade\'s Curse hits you with an attack, roll a d6. On a 4 or higher, the attack misses.',
      level: 10,
    },
    {
      id: 'master-of-hexes',
      name: 'Master of Hexes',
      description: 'When the creature cursed by your Hexblade\'s Curse dies, you can apply the curse to a different creature without expending a use.',
      level: 14,
    },
  ],
  expandedSpells: [
    { level: 1, spells: ['shield', 'wrathful-smite'] },
    { level: 2, spells: ['blur', 'branding-smite'] },
    { level: 3, spells: ['blink', 'elemental-weapon'] },
    { level: 4, spells: ['phantasmal-killer', 'staggering-smite'] },
    { level: 5, spells: ['banishing-smite', 'cone-of-cold'] },
  ],
}

/**
 * Celestial patron subclass for Warlock
 */
export const CELESTIAL: Subclass = {
  id: 'celestial',
  name: 'The Celestial',
  description: 'Your patron is a powerful being of the Upper Planes, such as an empyrean, solar, ki-rin, or unicorn. You have a connection to sacred light and radiance.',
  parentClassId: 'warlock',
  features: [
    {
      id: 'healing-light',
      name: 'Healing Light',
      description: 'You have a pool of d6s equal to 1 + warlock level. As a bonus action, you can heal a creature within 60 feet by spending dice from the pool.',
      level: 1,
      charges: { amount: 'proficiencyBonus', rechargeOn: 'longRest' },
    },
    {
      id: 'radiant-soul',
      name: 'Radiant Soul',
      description: 'You gain resistance to radiant damage. When you cast a spell that deals radiant or fire damage, add your CHA modifier to one damage roll.',
      level: 6,
    },
    {
      id: 'celestial-resilience',
      name: 'Celestial Resilience',
      description: 'You gain temporary HP equal to your warlock level + CHA modifier whenever you finish a short or long rest. Up to 5 allies within 30 feet also gain temporary HP equal to half your warlock level + CHA modifier.',
      level: 10,
    },
    {
      id: 'searing-vengeance',
      name: 'Searing Vengeance',
      description: 'When you make a death saving throw at the start of your turn, you can instead spring back with half your HP, then stand and deal radiant damage to enemies within 30 feet.',
      level: 14,
      charges: { amount: 1, rechargeOn: 'longRest' },
    },
  ],
  expandedSpells: [
    { level: 1, spells: ['cure-wounds', 'guiding-bolt'] },
    { level: 2, spells: ['flaming-sphere', 'lesser-restoration'] },
    { level: 3, spells: ['daylight', 'revivify'] },
    { level: 4, spells: ['guardian-of-faith', 'wall-of-fire'] },
    { level: 5, spells: ['flame-strike', 'greater-restoration'] },
  ],
}

/**
 * Eldritch Knight subclass for Fighter
 */
export const ELDRITCH_KNIGHT: Subclass = {
  id: 'eldritch-knight',
  name: 'Eldritch Knight',
  description: 'The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic.',
  parentClassId: 'fighter',
  features: [
    {
      id: 'spellcasting',
      name: 'Spellcasting',
      description: 'You learn to cast wizard spells. You know three cantrips and learn spells from the evocation and abjuration schools primarily.',
      level: 3,
    },
    {
      id: 'weapon-bond',
      name: 'Weapon Bond',
      description: 'You learn a ritual to bond with up to two weapons. Bonded weapons cannot be disarmed and you can summon them as a bonus action.',
      level: 3,
    },
    {
      id: 'war-magic',
      name: 'War Magic',
      description: 'When you use your action to cast a cantrip, you can make one weapon attack as a bonus action.',
      level: 7,
    },
    {
      id: 'eldritch-strike',
      name: 'Eldritch Strike',
      description: 'When you hit a creature with a weapon attack, that creature has disadvantage on its next saving throw against a spell you cast before the end of your next turn.',
      level: 10,
    },
    {
      id: 'arcane-charge',
      name: 'Arcane Charge',
      description: 'When you use Action Surge, you can teleport up to 30 feet to an unoccupied space before or after the additional action.',
      level: 15,
    },
    {
      id: 'improved-war-magic',
      name: 'Improved War Magic',
      description: 'When you use your action to cast a spell, you can make one weapon attack as a bonus action.',
      level: 18,
    },
  ],
}

// =============================================================================
// ROGUE CLASS
// =============================================================================

export const ROGUE: Class = {
  id: 'rogue',
  name: 'Rogue',
  description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
  hitDie: 'd8',
  primaryAbility: ['dexterity'],
  savingThrows: ['dexterity', 'intelligence'],
  armorProficiencies: ['light'],
  weaponProficiencies: ['simple', 'hand-crossbow', 'longsword', 'rapier', 'shortsword'],
  toolProficiencies: ['thieves-tools'],
  skillChoices: {
    choose: 4,
    from: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleightOfHand', 'stealth'],
  },
  spellcasting: 'none',
  features: [
    {
      id: 'expertise',
      name: 'Expertise',
      description: 'Choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.',
      level: 1,
    },
    {
      id: 'sneak-attack',
      name: 'Sneak Attack',
      description: 'Once per turn, you can deal extra damage to one creature you hit with an attack if you have advantage or an ally is within 5 feet of the target.',
      level: 1,
    },
    {
      id: 'thieves-cant',
      name: 'Thieves\' Cant',
      description: 'You know thieves\' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation.',
      level: 1,
    },
    {
      id: 'cunning-action',
      name: 'Cunning Action',
      description: 'You can use a bonus action to Dash, Disengage, or Hide.',
      level: 2,
    },
    {
      id: 'uncanny-dodge',
      name: 'Uncanny Dodge',
      description: 'When an attacker you can see hits you with an attack, you can use your reaction to halve the attack\'s damage against you.',
      level: 5,
    },
    {
      id: 'evasion',
      name: 'Evasion',
      description: 'When you are subjected to an effect that allows a DEX save for half damage, you take no damage on a success and half damage on a failure.',
      level: 7,
    },
    {
      id: 'reliable-talent',
      name: 'Reliable Talent',
      description: 'Whenever you make an ability check that uses your proficiency, treat a d20 roll of 9 or lower as a 10.',
      level: 11,
    },
    {
      id: 'blindsense',
      name: 'Blindsense',
      description: 'If you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.',
      level: 14,
    },
    {
      id: 'slippery-mind',
      name: 'Slippery Mind',
      description: 'You gain proficiency in Wisdom saving throws.',
      level: 15,
    },
    {
      id: 'elusive',
      name: 'Elusive',
      description: 'No attack roll has advantage against you while you aren\'t incapacitated.',
      level: 18,
    },
    {
      id: 'stroke-of-luck',
      name: 'Stroke of Luck',
      description: 'If your attack misses, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20.',
      level: 20,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
  ],
  subclassLevel: 3,
  subclassName: 'Roguish Archetype',
}

export const THIEF: Subclass = {
  id: 'thief',
  name: 'Thief',
  description: 'You hone your skills in the larcenous arts. Burglars, bandits, cutpurses, and other criminals typically follow this archetype.',
  parentClassId: 'rogue',
  features: [
    {
      id: 'fast-hands',
      name: 'Fast Hands',
      description: 'You can use Cunning Action to make a Sleight of Hand check, use thieves\' tools to disarm a trap or open a lock, or take the Use an Object action.',
      level: 3,
    },
    {
      id: 'second-story-work',
      name: 'Second-Story Work',
      description: 'You climb faster than normal, and running jumps cover extra distance equal to your DEX modifier in feet.',
      level: 3,
    },
    {
      id: 'supreme-sneak',
      name: 'Supreme Sneak',
      description: 'You have advantage on a Stealth check if you move no more than half your speed on the same turn.',
      level: 9,
    },
    {
      id: 'use-magic-device',
      name: 'Use Magic Device',
      description: 'You ignore all class, race, and level requirements on the use of magic items.',
      level: 13,
    },
    {
      id: 'thiefs-reflexes',
      name: 'Thief\'s Reflexes',
      description: 'You can take two turns during the first round of any combat. You take your first turn at your normal initiative and your second turn at your initiative minus 10.',
      level: 17,
    },
  ],
}

export const ASSASSIN: Subclass = {
  id: 'assassin',
  name: 'Assassin',
  description: 'You focus your training on the grim art of death. You are an expert in disguise and deception, as well as sudden, lethal strikes.',
  parentClassId: 'rogue',
  features: [
    {
      id: 'bonus-proficiencies',
      name: 'Bonus Proficiencies',
      description: 'You gain proficiency with the disguise kit and the poisoner\'s kit.',
      level: 3,
    },
    {
      id: 'assassinate',
      name: 'Assassinate',
      description: 'You have advantage on attack rolls against creatures that haven\'t taken a turn in combat yet. Any hit you score against a surprised creature is a critical hit.',
      level: 3,
    },
    {
      id: 'infiltration-expertise',
      name: 'Infiltration Expertise',
      description: 'You can unfailingly create false identities for yourself with documentation, established acquaintances, and disguises.',
      level: 9,
    },
    {
      id: 'impostor',
      name: 'Impostor',
      description: 'You gain the ability to unerringly mimic another person\'s speech, writing, and behavior.',
      level: 13,
    },
    {
      id: 'death-strike',
      name: 'Death Strike',
      description: 'When you attack and hit a surprised creature, it must make a CON save (DC 8 + DEX modifier + proficiency bonus). On a failed save, double the damage.',
      level: 17,
    },
  ],
}

// =============================================================================
// WIZARD CLASS
// =============================================================================

export const WIZARD: Class = {
  id: 'wizard',
  name: 'Wizard',
  description: 'A scholarly magic-user capable of manipulating the structures of reality through careful study.',
  hitDie: 'd6',
  primaryAbility: ['intelligence'],
  savingThrows: ['intelligence', 'wisdom'],
  armorProficiencies: ['light'],
  weaponProficiencies: ['dagger', 'dart', 'sling', 'quarterstaff', 'light-crossbow'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'],
  },
  spellcasting: 'full',
  spellcastingAbility: 'intelligence',
  cantripsKnown: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  spellsKnown: [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44], // Spellbook size: 6 at level 1, +2 per level
  features: [
    {
      id: 'spellcasting',
      name: 'Spellcasting',
      description: 'You can cast wizard spells using Intelligence as your spellcasting ability. You can prepare spells from your spellbook.',
      level: 1,
    },
    {
      id: 'arcane-recovery',
      name: 'Arcane Recovery',
      description: 'Once per day during a short rest, you can recover spell slots with a combined level equal to or less than half your wizard level (rounded up).',
      level: 1,
      charges: { amount: 1, rechargeOn: 'longRest' },
    },
    {
      id: 'spell-mastery',
      name: 'Spell Mastery',
      description: 'Choose a 1st-level and a 2nd-level spell in your spellbook. You can cast those spells at their lowest level without expending a spell slot.',
      level: 18,
    },
    {
      id: 'signature-spells',
      name: 'Signature Spells',
      description: 'Choose two 3rd-level spells in your spellbook. You always have them prepared, they don\'t count against prepared spells, and you can cast each once without a slot.',
      level: 20,
    },
  ],
  subclassLevel: 2,
  subclassName: 'Arcane Tradition',
}

export const SCHOOL_OF_EVOCATION: Subclass = {
  id: 'evocation',
  name: 'School of Evocation',
  description: 'You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid.',
  parentClassId: 'wizard',
  features: [
    {
      id: 'evocation-savant',
      name: 'Evocation Savant',
      description: 'The gold and time you must spend to copy an evocation spell into your spellbook is halved.',
      level: 2,
    },
    {
      id: 'sculpt-spells',
      name: 'Sculpt Spells',
      description: 'When you cast an evocation spell that affects other creatures, you can choose a number of them equal to 1 + the spell\'s level. Those creatures automatically succeed on their saves and take no damage.',
      level: 2,
    },
    {
      id: 'potent-cantrip',
      name: 'Potent Cantrip',
      description: 'When a creature succeeds on a saving throw against your cantrip, the creature takes half the cantrip\'s damage but suffers no additional effect.',
      level: 6,
    },
    {
      id: 'empowered-evocation',
      name: 'Empowered Evocation',
      description: 'You can add your Intelligence modifier to one damage roll of any wizard evocation spell you cast.',
      level: 10,
    },
    {
      id: 'overchannel',
      name: 'Overchannel',
      description: 'When you cast a wizard spell of 1st through 5th level that deals damage, you can deal maximum damage with that spell. After the first use, you take necrotic damage for each subsequent use.',
      level: 14,
    },
  ],
}

export const SCHOOL_OF_ABJURATION: Subclass = {
  id: 'abjuration',
  name: 'School of Abjuration',
  description: 'The School of Abjuration emphasizes magic that blocks, banishes, or protects. You specialize in protective magic.',
  parentClassId: 'wizard',
  features: [
    {
      id: 'abjuration-savant',
      name: 'Abjuration Savant',
      description: 'The gold and time you must spend to copy an abjuration spell into your spellbook is halved.',
      level: 2,
    },
    {
      id: 'arcane-ward',
      name: 'Arcane Ward',
      description: 'When you cast an abjuration spell of 1st level or higher, you create a magical ward that has HP equal to twice your wizard level + INT modifier. It absorbs damage you take.',
      level: 2,
    },
    {
      id: 'projected-ward',
      name: 'Projected Ward',
      description: 'When a creature within 30 feet takes damage, you can use your reaction to cause your Arcane Ward to absorb that damage instead.',
      level: 6,
    },
    {
      id: 'improved-abjuration',
      name: 'Improved Abjuration',
      description: 'When you cast an abjuration spell requiring an ability check (like counterspell or dispel magic), you add your proficiency bonus to that check.',
      level: 10,
    },
    {
      id: 'spell-resistance',
      name: 'Spell Resistance',
      description: 'You have advantage on saving throws against spells. You have resistance against the damage of spells.',
      level: 14,
    },
  ],
}

// =============================================================================
// CLERIC CLASS
// =============================================================================

export const CLERIC: Class = {
  id: 'cleric',
  name: 'Cleric',
  description: 'A priestly champion who wields divine magic in service of a higher power.',
  hitDie: 'd8',
  primaryAbility: ['wisdom'],
  savingThrows: ['wisdom', 'charisma'],
  armorProficiencies: ['light', 'medium', 'shields'],
  weaponProficiencies: ['simple'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
  },
  spellcasting: 'full',
  spellcastingAbility: 'wisdom',
  cantripsKnown: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  spellsKnown: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], // Prepared spells: WIS mod + level (assumes 14-16 WIS)
  features: [
    {
      id: 'spellcasting',
      name: 'Spellcasting',
      description: 'You can cast cleric spells using Wisdom as your spellcasting ability. You prepare spells from the entire cleric spell list.',
      level: 1,
    },
    {
      id: 'channel-divinity',
      name: 'Channel Divinity',
      description: 'You gain the ability to channel divine energy directly from your deity. You start with Turn Undead and gain additional options from your domain.',
      level: 2,
      charges: { amount: 1, rechargeOn: 'shortRest' },
    },
    {
      id: 'destroy-undead',
      name: 'Destroy Undead',
      description: 'When an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed if its CR is at or below a certain threshold.',
      level: 5,
    },
    {
      id: 'divine-intervention',
      name: 'Divine Intervention',
      description: 'You can call on your deity to intervene on your behalf. Roll a d100; if the number is equal to or lower than your cleric level, your deity intervenes.',
      level: 10,
    },
    {
      id: 'improved-divine-intervention',
      name: 'Improved Divine Intervention',
      description: 'Your call for divine intervention succeeds automatically.',
      level: 20,
    },
  ],
  subclassLevel: 1,
  subclassName: 'Divine Domain',
}

export const LIFE_DOMAIN: Subclass = {
  id: 'life-domain',
  name: 'Life Domain',
  description: 'The Life domain focuses on the vibrant positive energy that sustains all life. Gods of life promote vitality and health through healing the sick and wounded.',
  parentClassId: 'cleric',
  features: [
    {
      id: 'bonus-proficiency',
      name: 'Bonus Proficiency',
      description: 'You gain proficiency with heavy armor.',
      level: 1,
    },
    {
      id: 'disciple-of-life',
      name: 'Disciple of Life',
      description: 'When you use a spell of 1st level or higher to restore hit points, the creature regains additional HP equal to 2 + the spell\'s level.',
      level: 1,
    },
    {
      id: 'channel-divinity-preserve-life',
      name: 'Channel Divinity: Preserve Life',
      description: 'As an action, present your holy symbol and restore HP equal to 5x your cleric level, divided as you choose among creatures within 30 feet.',
      level: 2,
    },
    {
      id: 'blessed-healer',
      name: 'Blessed Healer',
      description: 'When you cast a spell of 1st level or higher that restores HP to another creature, you regain HP equal to 2 + the spell\'s level.',
      level: 6,
    },
    {
      id: 'divine-strike',
      name: 'Divine Strike',
      description: 'Once on each of your turns when you hit a creature with a weapon attack, you deal an extra 1d8 radiant damage (2d8 at 14th level).',
      level: 8,
    },
    {
      id: 'supreme-healing',
      name: 'Supreme Healing',
      description: 'When you would normally roll one or more dice to restore HP with a spell, you instead use the highest number possible for each die.',
      level: 17,
    },
  ],
  expandedSpells: [
    { level: 1, spells: ['bless', 'cure-wounds'] },
    { level: 2, spells: ['lesser-restoration', 'spiritual-weapon'] },
    { level: 3, spells: ['beacon-of-hope', 'revivify'] },
    { level: 4, spells: ['death-ward', 'guardian-of-faith'] },
    { level: 5, spells: ['mass-cure-wounds', 'raise-dead'] },
  ],
}

export const LIGHT_DOMAIN: Subclass = {
  id: 'light-domain',
  name: 'Light Domain',
  description: 'Gods of light promote the ideals of rebirth and renewal, truth, vigilance, and beauty. Their clerics are aggressive enemies of undead.',
  parentClassId: 'cleric',
  features: [
    {
      id: 'bonus-cantrip',
      name: 'Bonus Cantrip',
      description: 'You gain the light cantrip if you don\'t already know it.',
      level: 1,
    },
    {
      id: 'warding-flare',
      name: 'Warding Flare',
      description: 'When attacked by a creature within 30 feet that you can see, use your reaction to impose disadvantage on the attack roll. Uses WIS modifier per long rest.',
      level: 1,
      charges: { amount: 'abilityModifier', abilityModifier: 'wisdom', rechargeOn: 'longRest' },
    },
    {
      id: 'channel-divinity-radiance',
      name: 'Channel Divinity: Radiance of the Dawn',
      description: 'As an action, dispel magical darkness within 30 feet. Hostile creatures within 30 feet must make CON save or take 2d10 + cleric level radiant damage.',
      level: 2,
    },
    {
      id: 'improved-flare',
      name: 'Improved Flare',
      description: 'You can use Warding Flare when a creature attacks a different creature within 30 feet of you.',
      level: 6,
    },
    {
      id: 'potent-spellcasting',
      name: 'Potent Spellcasting',
      description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.',
      level: 8,
    },
    {
      id: 'corona-of-light',
      name: 'Corona of Light',
      description: 'As an action, activate an aura of sunlight that sheds bright light in a 60-foot radius and dim light for an additional 30 feet. Enemies have disadvantage on saves against fire or radiant damage.',
      level: 17,
    },
  ],
  expandedSpells: [
    { level: 1, spells: ['burning-hands', 'faerie-fire'] },
    { level: 2, spells: ['flaming-sphere', 'scorching-ray'] },
    { level: 3, spells: ['daylight', 'fireball'] },
    { level: 4, spells: ['guardian-of-faith', 'wall-of-fire'] },
    { level: 5, spells: ['flame-strike', 'scrying'] },
  ],
}

// =============================================================================
// BARBARIAN CLASS
// =============================================================================

export const BARBARIAN: Class = {
  id: 'barbarian',
  name: 'Barbarian',
  description: 'A fierce warrior who can enter a battle rage.',
  hitDie: 'd12',
  primaryAbility: ['strength'],
  savingThrows: ['strength', 'constitution'],
  armorProficiencies: ['light', 'medium', 'shields'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['animalHandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
  },
  spellcasting: 'none',
  features: [
    {
      id: 'rage',
      name: 'Rage',
      description: 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action, gaining bonus damage and resistance to physical damage.',
      level: 1,
      charges: { amount: 2, rechargeOn: 'longRest' },
    },
    {
      id: 'unarmored-defense',
      name: 'Unarmored Defense',
      description: 'While not wearing armor, your AC equals 10 + DEX modifier + CON modifier. You can use a shield.',
      level: 1,
    },
    {
      id: 'reckless-attack',
      name: 'Reckless Attack',
      description: 'When you make your first attack on your turn, you can choose to gain advantage on melee weapon attack rolls, but attack rolls against you have advantage until your next turn.',
      level: 2,
    },
    {
      id: 'danger-sense',
      name: 'Danger Sense',
      description: 'You have advantage on DEX saving throws against effects you can see, such as traps and spells.',
      level: 2,
    },
    {
      id: 'extra-attack',
      name: 'Extra Attack',
      description: 'You can attack twice when you take the Attack action on your turn.',
      level: 5,
    },
    {
      id: 'fast-movement',
      name: 'Fast Movement',
      description: 'Your speed increases by 10 feet while you aren\'t wearing heavy armor.',
      level: 5,
    },
    {
      id: 'feral-instinct',
      name: 'Feral Instinct',
      description: 'You have advantage on initiative rolls. Additionally, if you are surprised, you can act normally if you enter your rage first.',
      level: 7,
    },
    {
      id: 'brutal-critical',
      name: 'Brutal Critical',
      description: 'You can roll one additional weapon damage die when determining extra damage for a critical hit.',
      level: 9,
    },
    {
      id: 'relentless-rage',
      name: 'Relentless Rage',
      description: 'If you drop to 0 HP while raging, you can make a DC 10 CON save to drop to 1 HP instead. DC increases by 5 each time.',
      level: 11,
    },
    {
      id: 'persistent-rage',
      name: 'Persistent Rage',
      description: 'Your rage ends early only if you fall unconscious or choose to end it.',
      level: 15,
    },
    {
      id: 'indomitable-might',
      name: 'Indomitable Might',
      description: 'If your total for a Strength check is less than your Strength score, you can use that score in place of the total.',
      level: 18,
    },
    {
      id: 'primal-champion',
      name: 'Primal Champion',
      description: 'Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.',
      level: 20,
    },
  ],
  subclassLevel: 3,
  subclassName: 'Primal Path',
}

export const PATH_OF_THE_BERSERKER: Subclass = {
  id: 'berserker',
  name: 'Path of the Berserker',
  description: 'For some barbarians, rage is a means to an end—that end being violence. The Path of the Berserker is a path of untrammeled fury.',
  parentClassId: 'barbarian',
  features: [
    {
      id: 'frenzy',
      name: 'Frenzy',
      description: 'You can go into a frenzy when you rage. You can make a single melee weapon attack as a bonus action on each turn. When your rage ends, you suffer one level of exhaustion.',
      level: 3,
    },
    {
      id: 'mindless-rage',
      name: 'Mindless Rage',
      description: 'You can\'t be charmed or frightened while raging. If charmed or frightened when you enter rage, the effect is suspended for the duration.',
      level: 6,
    },
    {
      id: 'intimidating-presence',
      name: 'Intimidating Presence',
      description: 'You can use your action to frighten someone with your menacing presence. WIS save or frightened until end of your next turn.',
      level: 10,
    },
    {
      id: 'retaliation',
      name: 'Retaliation',
      description: 'When you take damage from a creature within 5 feet, you can use your reaction to make a melee weapon attack against that creature.',
      level: 14,
    },
  ],
}

export const PATH_OF_THE_TOTEM_WARRIOR: Subclass = {
  id: 'totem-warrior',
  name: 'Path of the Totem Warrior',
  description: 'The Path of the Totem Warrior is a spiritual journey, as the barbarian accepts a spirit animal as guide, protector, and inspiration.',
  parentClassId: 'barbarian',
  features: [
    {
      id: 'spirit-seeker',
      name: 'Spirit Seeker',
      description: 'You gain the ability to cast the beast sense and speak with animals spells, but only as rituals.',
      level: 3,
    },
    {
      id: 'totem-spirit',
      name: 'Totem Spirit',
      description: 'When you adopt this path, you choose a totem spirit (Bear, Eagle, Elk, Tiger, or Wolf) that grants you a feature while raging.',
      level: 3,
    },
    {
      id: 'aspect-of-the-beast',
      name: 'Aspect of the Beast',
      description: 'You gain a magical benefit based on the totem animal of your choice (Bear, Eagle, Elk, Tiger, or Wolf).',
      level: 6,
    },
    {
      id: 'spirit-walker',
      name: 'Spirit Walker',
      description: 'You can cast the commune with nature spell, but only as a ritual.',
      level: 10,
    },
    {
      id: 'totemic-attunement',
      name: 'Totemic Attunement',
      description: 'You gain a magical benefit based on a totem animal of your choice.',
      level: 14,
    },
  ],
}

// =============================================================================
// BARD CLASS
// =============================================================================

export const BARD: Class = {
  id: 'bard',
  name: 'Bard',
  description: 'An inspiring magician whose power echoes the music of creation.',
  hitDie: 'd8',
  primaryAbility: ['charisma'],
  savingThrows: ['dexterity', 'charisma'],
  armorProficiencies: ['light'],
  weaponProficiencies: ['simple', 'hand-crossbow', 'longsword', 'rapier', 'shortsword'],
  toolProficiencies: ['three-musical-instruments'],
  skillChoices: {
    choose: 3,
    from: ['acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleightOfHand', 'stealth', 'survival'],
  },
  spellcasting: 'full',
  spellcastingAbility: 'charisma',
  cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  spellsKnown: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
  features: [
    {
      id: 'spellcasting',
      name: 'Spellcasting',
      description: 'You can cast bard spells using Charisma as your spellcasting ability.',
      level: 1,
    },
    {
      id: 'bardic-inspiration',
      name: 'Bardic Inspiration',
      description: 'You can inspire others through stirring words or music. A creature can add a d6 to one ability check, attack roll, or saving throw.',
      level: 1,
      charges: { amount: 'abilityModifier', abilityModifier: 'charisma', rechargeOn: 'longRest' },
    },
    {
      id: 'jack-of-all-trades',
      name: 'Jack of All Trades',
      description: 'You can add half your proficiency bonus, rounded down, to any ability check you make that doesn\'t already include your proficiency bonus.',
      level: 2,
    },
    {
      id: 'song-of-rest',
      name: 'Song of Rest',
      description: 'You can use soothing music or oration during a short rest to help revitalize your wounded allies. They regain an extra 1d6 HP.',
      level: 2,
    },
    {
      id: 'expertise',
      name: 'Expertise',
      description: 'Choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.',
      level: 3,
    },
    {
      id: 'font-of-inspiration',
      name: 'Font of Inspiration',
      description: 'You regain all expended uses of Bardic Inspiration when you finish a short or long rest.',
      level: 5,
    },
    {
      id: 'countercharm',
      name: 'Countercharm',
      description: 'As an action, you can start a performance that lasts until the end of your next turn. You and friendly creatures within 30 feet have advantage on saves against being frightened or charmed.',
      level: 6,
    },
    {
      id: 'magical-secrets',
      name: 'Magical Secrets',
      description: 'You learn two spells of your choice from any class. They count as bard spells for you.',
      level: 10,
    },
    {
      id: 'superior-inspiration',
      name: 'Superior Inspiration',
      description: 'When you roll initiative and have no uses of Bardic Inspiration left, you regain one use.',
      level: 20,
    },
  ],
  subclassLevel: 3,
  subclassName: 'Bard College',
}

export const COLLEGE_OF_LORE: Subclass = {
  id: 'lore',
  name: 'College of Lore',
  description: 'Bards of the College of Lore know something about most things, collecting bits of knowledge from diverse sources.',
  parentClassId: 'bard',
  features: [
    {
      id: 'bonus-proficiencies',
      name: 'Bonus Proficiencies',
      description: 'You gain proficiency with three skills of your choice.',
      level: 3,
    },
    {
      id: 'cutting-words',
      name: 'Cutting Words',
      description: 'When a creature within 60 feet makes an attack roll, ability check, or damage roll, you can use your reaction to expend one Bardic Inspiration die and subtract the number rolled.',
      level: 3,
    },
    {
      id: 'additional-magical-secrets',
      name: 'Additional Magical Secrets',
      description: 'You learn two spells of your choice from any class. They must be of a level you can cast.',
      level: 6,
    },
    {
      id: 'peerless-skill',
      name: 'Peerless Skill',
      description: 'When you make an ability check, you can expend one Bardic Inspiration die and add the number rolled to your ability check.',
      level: 14,
    },
  ],
}

export const COLLEGE_OF_VALOR: Subclass = {
  id: 'valor',
  name: 'College of Valor',
  description: 'Bards of the College of Valor are daring skalds whose tales keep alive the memory of the great heroes of the past.',
  parentClassId: 'bard',
  features: [
    {
      id: 'bonus-proficiencies',
      name: 'Bonus Proficiencies',
      description: 'You gain proficiency with medium armor, shields, and martial weapons.',
      level: 3,
    },
    {
      id: 'combat-inspiration',
      name: 'Combat Inspiration',
      description: 'A creature using your Bardic Inspiration can add the die to a weapon damage roll or to its AC against one attack.',
      level: 3,
    },
    {
      id: 'extra-attack',
      name: 'Extra Attack',
      description: 'You can attack twice when you take the Attack action on your turn.',
      level: 6,
    },
    {
      id: 'battle-magic',
      name: 'Battle Magic',
      description: 'When you use your action to cast a bard spell, you can make one weapon attack as a bonus action.',
      level: 14,
    },
  ],
}

// =============================================================================
// DRUID CLASS
// =============================================================================

export const DRUID: Class = {
  id: 'druid',
  name: 'Druid',
  description: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
  hitDie: 'd8',
  primaryAbility: ['wisdom'],
  savingThrows: ['intelligence', 'wisdom'],
  armorProficiencies: ['light', 'medium', 'shields'],
  weaponProficiencies: ['club', 'dagger', 'dart', 'javelin', 'mace', 'quarterstaff', 'scimitar', 'sickle', 'sling', 'spear'],
  toolProficiencies: ['herbalism-kit'],
  skillChoices: {
    choose: 2,
    from: ['arcana', 'animalHandling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'],
  },
  spellcasting: 'full',
  spellcastingAbility: 'wisdom',
  cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  features: [
    {
      id: 'druidic',
      name: 'Druidic',
      description: 'You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages.',
      level: 1,
    },
    {
      id: 'spellcasting',
      name: 'Spellcasting',
      description: 'You can cast druid spells using Wisdom as your spellcasting ability.',
      level: 1,
    },
    {
      id: 'wild-shape',
      name: 'Wild Shape',
      description: 'You can use your action to magically assume the shape of a beast that you have seen before.',
      level: 2,
      charges: { amount: 2, rechargeOn: 'shortRest' },
    },
    {
      id: 'timeless-body',
      name: 'Timeless Body',
      description: 'The primal magic you wield causes you to age more slowly. For every 10 years that pass, your body ages only 1 year.',
      level: 18,
    },
    {
      id: 'beast-spells',
      name: 'Beast Spells',
      description: 'You can cast many of your druid spells in any shape you assume using Wild Shape.',
      level: 18,
    },
    {
      id: 'archdruid',
      name: 'Archdruid',
      description: 'You can use your Wild Shape an unlimited number of times. You can ignore verbal and somatic components of druid spells.',
      level: 20,
    },
  ],
  subclassLevel: 2,
  subclassName: 'Druid Circle',
}

export const CIRCLE_OF_THE_LAND: Subclass = {
  id: 'land',
  name: 'Circle of the Land',
  description: 'The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through oral tradition.',
  parentClassId: 'druid',
  features: [
    {
      id: 'bonus-cantrip',
      name: 'Bonus Cantrip',
      description: 'You learn one additional druid cantrip of your choice.',
      level: 2,
    },
    {
      id: 'natural-recovery',
      name: 'Natural Recovery',
      description: 'During a short rest, you can recover spell slots with a combined level equal to or less than half your druid level (rounded up).',
      level: 2,
      charges: { amount: 1, rechargeOn: 'longRest' },
    },
    {
      id: 'circle-spells',
      name: 'Circle Spells',
      description: 'Your mystical connection to the land infuses you with the ability to cast certain spells based on your chosen land type.',
      level: 3,
    },
    {
      id: 'lands-stride',
      name: 'Land\'s Stride',
      description: 'Moving through nonmagical difficult terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed or taking damage.',
      level: 6,
    },
    {
      id: 'natures-ward',
      name: 'Nature\'s Ward',
      description: 'You can\'t be charmed or frightened by elementals or fey. You are also immune to poison and disease.',
      level: 10,
    },
    {
      id: 'natures-sanctuary',
      name: 'Nature\'s Sanctuary',
      description: 'Creatures of the natural world sense your connection to nature and become hesitant to attack you.',
      level: 14,
    },
  ],
}

export const CIRCLE_OF_THE_MOON: Subclass = {
  id: 'moon',
  name: 'Circle of the Moon',
  description: 'Druids of the Circle of the Moon are fierce guardians of the wilds, shifting into powerful animal forms.',
  parentClassId: 'druid',
  features: [
    {
      id: 'combat-wild-shape',
      name: 'Combat Wild Shape',
      description: 'You can use Wild Shape as a bonus action. While transformed, you can expend a spell slot to regain 1d8 HP per slot level.',
      level: 2,
    },
    {
      id: 'circle-forms',
      name: 'Circle Forms',
      description: 'You can transform into beasts with a higher CR than normal (CR 1 at 2nd level, increasing with druid level).',
      level: 2,
    },
    {
      id: 'primal-strike',
      name: 'Primal Strike',
      description: 'Your attacks in beast form count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks.',
      level: 6,
    },
    {
      id: 'elemental-wild-shape',
      name: 'Elemental Wild Shape',
      description: 'You can expend two uses of Wild Shape to transform into an air elemental, earth elemental, fire elemental, or water elemental.',
      level: 10,
    },
    {
      id: 'thousand-forms',
      name: 'Thousand Forms',
      description: 'You can cast the alter self spell at will.',
      level: 14,
    },
  ],
}

// =============================================================================
// MONK CLASS
// =============================================================================

export const MONK: Class = {
  id: 'monk',
  name: 'Monk',
  description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.',
  hitDie: 'd8',
  primaryAbility: ['dexterity', 'wisdom'],
  savingThrows: ['strength', 'dexterity'],
  armorProficiencies: [],
  weaponProficiencies: ['simple', 'shortsword'],
  toolProficiencies: ['one-artisan-tool-or-musical-instrument'],
  skillChoices: {
    choose: 2,
    from: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
  },
  spellcasting: 'none',
  features: [
    {
      id: 'unarmored-defense',
      name: 'Unarmored Defense',
      description: 'While not wearing armor or a shield, your AC equals 10 + DEX modifier + WIS modifier.',
      level: 1,
    },
    {
      id: 'martial-arts',
      name: 'Martial Arts',
      description: 'Your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons.',
      level: 1,
    },
    {
      id: 'ki',
      name: 'Ki',
      description: 'Your training allows you to harness the mystic energy of ki. You have a number of ki points equal to your monk level.',
      level: 2,
      charges: { amount: 'proficiencyBonus', rechargeOn: 'shortRest' },
    },
    {
      id: 'unarmored-movement',
      name: 'Unarmored Movement',
      description: 'Your speed increases by 10 feet while you are not wearing armor or wielding a shield. This bonus increases as you gain monk levels.',
      level: 2,
    },
    {
      id: 'deflect-missiles',
      name: 'Deflect Missiles',
      description: 'You can use your reaction to deflect or catch a missile when you are hit by a ranged weapon attack.',
      level: 3,
    },
    {
      id: 'slow-fall',
      name: 'Slow Fall',
      description: 'You can use your reaction to reduce any falling damage you take by an amount equal to five times your monk level.',
      level: 4,
    },
    {
      id: 'extra-attack',
      name: 'Extra Attack',
      description: 'You can attack twice when you take the Attack action on your turn.',
      level: 5,
    },
    {
      id: 'stunning-strike',
      name: 'Stunning Strike',
      description: 'When you hit a creature with a melee weapon attack, you can spend 1 ki point to attempt to stun the target.',
      level: 5,
    },
    {
      id: 'ki-empowered-strikes',
      name: 'Ki-Empowered Strikes',
      description: 'Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.',
      level: 6,
    },
    {
      id: 'evasion',
      name: 'Evasion',
      description: 'When you are subjected to an effect that allows a DEX save for half damage, you take no damage on a success and half damage on a failure.',
      level: 7,
    },
    {
      id: 'stillness-of-mind',
      name: 'Stillness of Mind',
      description: 'You can use your action to end one effect on yourself that is causing you to be charmed or frightened.',
      level: 7,
    },
    {
      id: 'purity-of-body',
      name: 'Purity of Body',
      description: 'You are immune to disease and poison.',
      level: 10,
    },
    {
      id: 'tongue-of-sun-and-moon',
      name: 'Tongue of the Sun and Moon',
      description: 'You learn to touch the ki of other minds so that you understand all spoken languages. Any creature that can understand a language can understand what you say.',
      level: 13,
    },
    {
      id: 'diamond-soul',
      name: 'Diamond Soul',
      description: 'You gain proficiency in all saving throws. Additionally, when you fail a saving throw, you can spend 1 ki point to reroll it.',
      level: 14,
    },
    {
      id: 'timeless-body',
      name: 'Timeless Body',
      description: 'Your ki sustains you so that you suffer none of the frailty of old age. You can\'t be aged magically, and you no longer need food or water.',
      level: 15,
    },
    {
      id: 'empty-body',
      name: 'Empty Body',
      description: 'You can spend 4 ki points to become invisible for 1 minute. During that time, you have resistance to all damage but force damage.',
      level: 18,
    },
    {
      id: 'perfect-self',
      name: 'Perfect Self',
      description: 'When you roll initiative and have no ki points remaining, you regain 4 ki points.',
      level: 20,
    },
  ],
  subclassLevel: 3,
  subclassName: 'Monastic Tradition',
}

export const WAY_OF_THE_OPEN_HAND: Subclass = {
  id: 'open-hand',
  name: 'Way of the Open Hand',
  description: 'Monks of the Way of the Open Hand are the ultimate masters of martial arts combat.',
  parentClassId: 'monk',
  features: [
    {
      id: 'open-hand-technique',
      name: 'Open Hand Technique',
      description: 'When you hit a creature with a Flurry of Blows attack, you can impose one of several effects: knock it prone, push it 15 feet away, or prevent it from taking reactions.',
      level: 3,
    },
    {
      id: 'wholeness-of-body',
      name: 'Wholeness of Body',
      description: 'As an action, you can regain HP equal to three times your monk level.',
      level: 6,
      charges: { amount: 1, rechargeOn: 'longRest' },
    },
    {
      id: 'tranquility',
      name: 'Tranquility',
      description: 'At the end of a long rest, you gain the effect of a sanctuary spell that lasts until the start of your next long rest.',
      level: 11,
    },
    {
      id: 'quivering-palm',
      name: 'Quivering Palm',
      description: 'When you hit a creature with an unarmed strike, you can spend 3 ki points to start imperceptible vibrations. You can then use an action to deal 10d10 necrotic damage or reduce the target to 0 HP.',
      level: 17,
    },
  ],
}

export const WAY_OF_SHADOW: Subclass = {
  id: 'shadow',
  name: 'Way of Shadow',
  description: 'Monks of the Way of Shadow follow a tradition that values stealth and subterfuge.',
  parentClassId: 'monk',
  features: [
    {
      id: 'shadow-arts',
      name: 'Shadow Arts',
      description: 'You can use your ki to duplicate the effects of certain spells. You can spend 2 ki points to cast darkness, darkvision, pass without trace, or silence.',
      level: 3,
    },
    {
      id: 'shadow-step',
      name: 'Shadow Step',
      description: 'When you are in dim light or darkness, you can use a bonus action to teleport up to 60 feet to an unoccupied space you can see that is also in dim light or darkness.',
      level: 6,
    },
    {
      id: 'cloak-of-shadows',
      name: 'Cloak of Shadows',
      description: 'When you are in an area of dim light or darkness, you can use your action to become invisible. You remain invisible until you make an attack, cast a spell, or are in an area of bright light.',
      level: 11,
    },
    {
      id: 'opportunist',
      name: 'Opportunist',
      description: 'When a creature within 5 feet of you is hit by an attack made by a creature other than you, you can use your reaction to make a melee attack against that creature.',
      level: 17,
    },
  ],
}

// =============================================================================
// PALADIN CLASS
// =============================================================================

export const PALADIN: Class = {
  id: 'paladin',
  name: 'Paladin',
  description: 'A holy warrior bound to a sacred oath.',
  hitDie: 'd10',
  primaryAbility: ['strength', 'charisma'],
  savingThrows: ['wisdom', 'charisma'],
  armorProficiencies: ['light', 'medium', 'heavy', 'shields'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'],
  },
  spellcasting: 'half',
  spellcastingAbility: 'charisma',
  features: [
    {
      id: 'divine-sense',
      name: 'Divine Sense',
      description: 'As an action, you can detect the location of any celestial, fiend, or undead within 60 feet that is not behind total cover.',
      level: 1,
      charges: { amount: 'abilityModifier', abilityModifier: 'charisma', rechargeOn: 'longRest' },
    },
    {
      id: 'lay-on-hands',
      name: 'Lay on Hands',
      description: 'You have a pool of healing power equal to 5 × your paladin level. As an action, you can touch a creature and restore HP from this pool.',
      level: 1,
    },
    {
      id: 'fighting-style',
      name: 'Fighting Style',
      description: 'You adopt a particular style of fighting as your specialty.',
      level: 2,
    },
    {
      id: 'spellcasting',
      name: 'Spellcasting',
      description: 'You can cast paladin spells using Charisma as your spellcasting ability.',
      level: 2,
    },
    {
      id: 'divine-smite',
      name: 'Divine Smite',
      description: 'When you hit a creature with a melee weapon attack, you can expend a spell slot to deal extra radiant damage (2d8 + 1d8 per slot level above 1st).',
      level: 2,
    },
    {
      id: 'divine-health',
      name: 'Divine Health',
      description: 'You are immune to disease.',
      level: 3,
    },
    {
      id: 'extra-attack',
      name: 'Extra Attack',
      description: 'You can attack twice when you take the Attack action on your turn.',
      level: 5,
    },
    {
      id: 'aura-of-protection',
      name: 'Aura of Protection',
      description: 'You and friendly creatures within 10 feet gain a bonus to saving throws equal to your CHA modifier (minimum of +1).',
      level: 6,
    },
    {
      id: 'aura-of-courage',
      name: 'Aura of Courage',
      description: 'You and friendly creatures within 10 feet can\'t be frightened while you are conscious.',
      level: 10,
    },
    {
      id: 'improved-divine-smite',
      name: 'Improved Divine Smite',
      description: 'Whenever you hit a creature with a melee weapon, the creature takes an extra 1d8 radiant damage.',
      level: 11,
    },
    {
      id: 'cleansing-touch',
      name: 'Cleansing Touch',
      description: 'As an action, you can end one spell on yourself or on one willing creature that you touch.',
      level: 14,
      charges: { amount: 'abilityModifier', abilityModifier: 'charisma', rechargeOn: 'longRest' },
    },
  ],
  fightingStyles: [
    { id: 'defense', name: 'Defense', description: '+1 bonus to AC while wearing armor.' },
    { id: 'dueling', name: 'Dueling', description: '+2 bonus to damage with one-handed melee weapon and no other weapons.' },
    { id: 'great-weapon', name: 'Great Weapon Fighting', description: 'Reroll 1s and 2s on damage dice for two-handed weapons.' },
    { id: 'protection', name: 'Protection', description: 'Use reaction to impose disadvantage on attack against adjacent ally.' },
  ],
  subclassLevel: 3,
  subclassName: 'Sacred Oath',
}

export const OATH_OF_DEVOTION: Subclass = {
  id: 'devotion',
  name: 'Oath of Devotion',
  description: 'The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order.',
  parentClassId: 'paladin',
  features: [
    {
      id: 'sacred-weapon',
      name: 'Channel Divinity: Sacred Weapon',
      description: 'As an action, imbue one weapon you are holding with positive energy. For 1 minute, you add your CHA modifier to attack rolls and the weapon emits bright light.',
      level: 3,
    },
    {
      id: 'turn-the-unholy',
      name: 'Channel Divinity: Turn the Unholy',
      description: 'As an action, each fiend or undead within 30 feet must make a WIS save or be turned for 1 minute.',
      level: 3,
    },
    {
      id: 'aura-of-devotion',
      name: 'Aura of Devotion',
      description: 'You and friendly creatures within 10 feet can\'t be charmed while you are conscious.',
      level: 7,
    },
    {
      id: 'purity-of-spirit',
      name: 'Purity of Spirit',
      description: 'You are always under the effects of a protection from evil and good spell.',
      level: 15,
    },
    {
      id: 'holy-nimbus',
      name: 'Holy Nimbus',
      description: 'As an action, you can emanate an aura of sunlight. For 1 minute, bright light shines from you in a 30-foot radius and enemies in it take 10 radiant damage at the start of each of their turns.',
      level: 20,
      charges: { amount: 1, rechargeOn: 'longRest' },
    },
  ],
  expandedSpells: [
    { level: 1, spells: ['protection-from-evil-and-good', 'sanctuary'] },
    { level: 2, spells: ['lesser-restoration', 'zone-of-truth'] },
    { level: 3, spells: ['beacon-of-hope', 'dispel-magic'] },
    { level: 4, spells: ['freedom-of-movement', 'guardian-of-faith'] },
    { level: 5, spells: ['commune', 'flame-strike'] },
  ],
}

export const OATH_OF_VENGEANCE: Subclass = {
  id: 'vengeance',
  name: 'Oath of Vengeance',
  description: 'The Oath of Vengeance is a solemn commitment to punish those who have committed grievous sins.',
  parentClassId: 'paladin',
  features: [
    {
      id: 'abjure-enemy',
      name: 'Channel Divinity: Abjure Enemy',
      description: 'As an action, choose one creature within 60 feet. It must make a WIS save or be frightened for 1 minute. Fiends and undead have disadvantage on this save.',
      level: 3,
    },
    {
      id: 'vow-of-enmity',
      name: 'Channel Divinity: Vow of Enmity',
      description: 'As a bonus action, you gain advantage on attack rolls against a creature within 10 feet for 1 minute.',
      level: 3,
    },
    {
      id: 'relentless-avenger',
      name: 'Relentless Avenger',
      description: 'When you hit a creature with an opportunity attack, you can move up to half your speed immediately after the attack as part of the same reaction.',
      level: 7,
    },
    {
      id: 'soul-of-vengeance',
      name: 'Soul of Vengeance',
      description: 'When a creature under your Vow of Enmity makes an attack, you can use your reaction to make a melee weapon attack against it.',
      level: 15,
    },
    {
      id: 'avenging-angel',
      name: 'Avenging Angel',
      description: 'As an action, you undergo a transformation. For 1 hour, you have a flying speed of 60 feet and emanate a menacing aura.',
      level: 20,
      charges: { amount: 1, rechargeOn: 'longRest' },
    },
  ],
  expandedSpells: [
    { level: 1, spells: ['bane', 'hunters-mark'] },
    { level: 2, spells: ['hold-person', 'misty-step'] },
    { level: 3, spells: ['haste', 'protection-from-energy'] },
    { level: 4, spells: ['banishment', 'dimension-door'] },
    { level: 5, spells: ['hold-monster', 'scrying'] },
  ],
}

// =============================================================================
// RANGER CLASS
// =============================================================================

export const RANGER: Class = {
  id: 'ranger',
  name: 'Ranger',
  description: 'A warrior who combats threats on the edges of civilization.',
  hitDie: 'd10',
  primaryAbility: ['dexterity', 'wisdom'],
  savingThrows: ['strength', 'dexterity'],
  armorProficiencies: ['light', 'medium', 'shields'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  skillChoices: {
    choose: 3,
    from: ['animalHandling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival'],
  },
  spellcasting: 'half',
  spellcastingAbility: 'wisdom',
  spellsKnown: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11],
  features: [
    {
      id: 'favored-enemy',
      name: 'Favored Enemy',
      description: 'You have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.',
      level: 1,
    },
    {
      id: 'natural-explorer',
      name: 'Natural Explorer',
      description: 'You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions.',
      level: 1,
    },
    {
      id: 'fighting-style',
      name: 'Fighting Style',
      description: 'You adopt a particular style of fighting as your specialty.',
      level: 2,
    },
    {
      id: 'spellcasting',
      name: 'Spellcasting',
      description: 'You can cast ranger spells using Wisdom as your spellcasting ability.',
      level: 2,
    },
    {
      id: 'primeval-awareness',
      name: 'Primeval Awareness',
      description: 'You can use an action and expend a spell slot to focus your awareness on the region around you.',
      level: 3,
    },
    {
      id: 'extra-attack',
      name: 'Extra Attack',
      description: 'You can attack twice when you take the Attack action on your turn.',
      level: 5,
    },
    {
      id: 'lands-stride',
      name: 'Land\'s Stride',
      description: 'Moving through nonmagical difficult terrain costs you no extra movement.',
      level: 8,
    },
    {
      id: 'hide-in-plain-sight',
      name: 'Hide in Plain Sight',
      description: 'You can spend 1 minute creating camouflage for yourself. You gain a +10 bonus to Stealth checks while remaining there without moving.',
      level: 10,
    },
    {
      id: 'vanish',
      name: 'Vanish',
      description: 'You can use the Hide action as a bonus action. Also, you can\'t be tracked by nonmagical means, unless you choose to leave a trail.',
      level: 14,
    },
    {
      id: 'feral-senses',
      name: 'Feral Senses',
      description: 'You gain preternatural senses that help you fight creatures you can\'t see. You don\'t have disadvantage on attacks against creatures you can\'t see within 30 feet.',
      level: 18,
    },
    {
      id: 'foe-slayer',
      name: 'Foe Slayer',
      description: 'You become an unparalleled hunter. Once per turn, you can add your WIS modifier to the attack roll or damage roll against a favored enemy.',
      level: 20,
    },
  ],
  fightingStyles: [
    { id: 'archery', name: 'Archery', description: '+2 bonus to attack rolls with ranged weapons.' },
    { id: 'defense', name: 'Defense', description: '+1 bonus to AC while wearing armor.' },
    { id: 'dueling', name: 'Dueling', description: '+2 bonus to damage with one-handed melee weapon and no other weapons.' },
    { id: 'two-weapon', name: 'Two-Weapon Fighting', description: 'Add ability modifier to off-hand attack damage.' },
  ],
  subclassLevel: 3,
  subclassName: 'Ranger Conclave',
}

export const HUNTER: Subclass = {
  id: 'hunter',
  name: 'Hunter',
  description: 'Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wilderness.',
  parentClassId: 'ranger',
  features: [
    {
      id: 'hunters-prey',
      name: 'Hunter\'s Prey',
      description: 'You gain one of the following features: Colossus Slayer, Giant Killer, or Horde Breaker.',
      level: 3,
    },
    {
      id: 'defensive-tactics',
      name: 'Defensive Tactics',
      description: 'You gain one of the following features: Escape the Horde, Multiattack Defense, or Steel Will.',
      level: 7,
    },
    {
      id: 'multiattack',
      name: 'Multiattack',
      description: 'You gain one of the following features: Volley or Whirlwind Attack.',
      level: 11,
    },
    {
      id: 'superior-hunters-defense',
      name: 'Superior Hunter\'s Defense',
      description: 'You gain one of the following features: Evasion, Stand Against the Tide, or Uncanny Dodge.',
      level: 15,
    },
  ],
}

export const BEAST_MASTER: Subclass = {
  id: 'beast-master',
  name: 'Beast Master',
  description: 'The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world.',
  parentClassId: 'ranger',
  features: [
    {
      id: 'rangers-companion',
      name: 'Ranger\'s Companion',
      description: 'You gain a beast companion that accompanies you on your adventures and fights alongside you.',
      level: 3,
    },
    {
      id: 'exceptional-training',
      name: 'Exceptional Training',
      description: 'Your beast companion can take the Dash, Disengage, or Help action on its turn. Its attacks count as magical.',
      level: 7,
    },
    {
      id: 'bestial-fury',
      name: 'Bestial Fury',
      description: 'Your companion can make two attacks when you command it to use the Attack action.',
      level: 11,
    },
    {
      id: 'share-spells',
      name: 'Share Spells',
      description: 'When you cast a spell targeting yourself, you can also affect your beast companion if it is within 30 feet.',
      level: 15,
    },
  ],
}

// =============================================================================
// SORCERER CLASS
// =============================================================================

export const SORCERER: Class = {
  id: 'sorcerer',
  name: 'Sorcerer',
  description: 'A spellcaster who draws on inherent magic from a gift or bloodline.',
  hitDie: 'd6',
  primaryAbility: ['charisma'],
  savingThrows: ['constitution', 'charisma'],
  armorProficiencies: [],
  weaponProficiencies: ['dagger', 'dart', 'sling', 'quarterstaff', 'light-crossbow'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
  },
  spellcasting: 'full',
  spellcastingAbility: 'charisma',
  cantripsKnown: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  spellsKnown: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
  features: [
    {
      id: 'spellcasting',
      name: 'Spellcasting',
      description: 'You can cast sorcerer spells using Charisma as your spellcasting ability.',
      level: 1,
    },
    {
      id: 'font-of-magic',
      name: 'Font of Magic',
      description: 'You tap into a deep wellspring of magic within yourself. You have sorcery points equal to your sorcerer level.',
      level: 2,
    },
    {
      id: 'metamagic',
      name: 'Metamagic',
      description: 'You gain the ability to twist your spells to suit your needs. You learn two Metamagic options of your choice.',
      level: 3,
    },
    {
      id: 'sorcerous-restoration',
      name: 'Sorcerous Restoration',
      description: 'You regain 4 expended sorcery points whenever you finish a short rest.',
      level: 20,
    },
  ],
  subclassLevel: 1,
  subclassName: 'Sorcerous Origin',
}

export const DRACONIC_BLOODLINE: Subclass = {
  id: 'draconic',
  name: 'Draconic Bloodline',
  description: 'Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors.',
  parentClassId: 'sorcerer',
  features: [
    {
      id: 'dragon-ancestor',
      name: 'Dragon Ancestor',
      description: 'You choose one type of dragon as your ancestor. You gain proficiency in Draconic and a bonus when interacting with dragons.',
      level: 1,
    },
    {
      id: 'draconic-resilience',
      name: 'Draconic Resilience',
      description: 'Your hit point maximum increases by 1 for each sorcerer level. Your AC equals 13 + DEX modifier when not wearing armor.',
      level: 1,
    },
    {
      id: 'elemental-affinity',
      name: 'Elemental Affinity',
      description: 'When you cast a spell that deals damage of the type associated with your draconic ancestry, add your CHA modifier to that damage.',
      level: 6,
    },
    {
      id: 'dragon-wings',
      name: 'Dragon Wings',
      description: 'You gain the ability to sprout a pair of dragon wings from your back, gaining a flying speed equal to your current speed.',
      level: 14,
    },
    {
      id: 'draconic-presence',
      name: 'Draconic Presence',
      description: 'As an action, you can spend 5 sorcery points to draw on your draconic presence. Each creature of your choice within 60 feet must succeed on a WIS save or become charmed or frightened for 1 minute.',
      level: 18,
    },
  ],
}

export const WILD_MAGIC: Subclass = {
  id: 'wild-magic',
  name: 'Wild Magic',
  description: 'Your innate magic comes from the wild forces of chaos that underlie the order of existence.',
  parentClassId: 'sorcerer',
  features: [
    {
      id: 'wild-magic-surge',
      name: 'Wild Magic Surge',
      description: 'After you cast a sorcerer spell of 1st level or higher, the DM can have you roll a d20. If you roll a 1, roll on the Wild Magic Surge table.',
      level: 1,
    },
    {
      id: 'tides-of-chaos',
      name: 'Tides of Chaos',
      description: 'You can gain advantage on one attack roll, ability check, or saving throw. Once you do, you must finish a long rest before using this feature again, unless a Wild Magic Surge occurs.',
      level: 1,
      charges: { amount: 1, rechargeOn: 'longRest' },
    },
    {
      id: 'bend-luck',
      name: 'Bend Luck',
      description: 'When another creature makes an attack roll, ability check, or saving throw, you can use your reaction and spend 2 sorcery points to roll 1d4 and apply the number as a bonus or penalty.',
      level: 6,
    },
    {
      id: 'controlled-chaos',
      name: 'Controlled Chaos',
      description: 'When you roll on the Wild Magic Surge table, you can roll twice and use either number.',
      level: 14,
    },
    {
      id: 'spell-bombardment',
      name: 'Spell Bombardment',
      description: 'When you roll damage for a spell and roll the highest number possible on any of the dice, you can roll that die again and add it to the damage.',
      level: 18,
    },
  ],
}

// ============================================
// CUSTOM CLASSES (WoW/Diablo Inspired)
// ============================================

/**
 * Death Knight - World of Warcraft inspired (BALANCED)
 */
export const DEATH_KNIGHT: Class = {
  id: 'death-knight',
  name: 'Death Knight',
  description: 'A fallen champion raised by dark powers, wielding runic magic and commanding the forces of death itself.',
  hitDie: 'd10',
  primaryAbility: ['strength', 'constitution'],
  savingThrows: ['strength', 'constitution'],
  armorProficiencies: ['light', 'medium', 'heavy', 'shields'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['athletics', 'intimidation', 'religion', 'arcana', 'perception', 'survival'],
  },
  subclassLevel: 3,
  subclassName: 'Death Knight Specialization',
  spellcasting: 'third',
  spellcastingAbility: 'constitution',
  features: [
    { id: 'runic-power', name: 'Runic Power', description: 'Pool of 4 + level. Regain half on short rest, all on long rest. Regenerate 1 point on critical hit.', level: 1 },
    { id: 'rune-weapon', name: 'Rune Weapon', description: 'Costs 2 Runic Power. Bonus action: infuse weapon for 1 minute, +1d4 necrotic damage.', level: 1 },
    { id: 'death-grip', name: 'Death Grip', description: 'Costs 3 Runic Power. Pull Large or smaller creature within 20ft. STR save or pulled and speed 0 until end of your next turn.', level: 2 },
    { id: 'extra-attack-dk', name: 'Extra Attack', description: 'Attack twice when you take the Attack action.', level: 5 },
    { id: 'lichborne', name: 'Lichborne', description: 'Immune to charm and fear. Advantage on saves vs disease and poison.', level: 7 },
    { id: 'army-of-the-dead', name: 'Army of the Dead', description: 'Costs 5 Runic Power. Summon 4 ghouls for 1 minute.', level: 14, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

export const BLOOD_DEATH_KNIGHT: Subclass = {
  id: 'blood-death-knight',
  name: 'Blood',
  description: 'Vampiric tanks that sustain themselves through the lifeforce of enemies.',
  parentClassId: 'death-knight',
  features: [
    { id: 'blood-boil', name: 'Blood Boil', description: 'Costs 3 Runic Power. Bonus action: enemies within 10ft take 1d8 necrotic, gain temp HP = half damage dealt. CON save for half damage.', level: 3 },
    { id: 'vampiric-blood', name: 'Vampiric Blood', description: 'Costs 4 Runic Power. Gain temp HP = level + CON modifier for 1 minute, heal 10% of melee damage dealt.', level: 6 },
    { id: 'dancing-rune-weapon', name: 'Dancing Rune Weapon', description: 'Costs 5 Runic Power. Summon spectral weapon that mirrors your attacks for 1 minute, dealing half damage.', level: 14, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

export const FROST_DEATH_KNIGHT: Subclass = {
  id: 'frost-death-knight',
  name: 'Frost',
  description: 'Wield the power of ice and cold, devastating enemies with frozen strikes.',
  parentClassId: 'death-knight',
  features: [
    { id: 'frost-strike', name: 'Frost Strike', description: 'Costs 2 Runic Power. Add +1d8 cold damage and reduce target speed by 10ft until end of your next turn.', level: 3 },
    { id: 'killing-machine', name: 'Killing Machine', description: 'Once per short rest: gain advantage on next attack roll. On crit, regain 2 Runic Power.', level: 6, charges: { amount: 1, rechargeOn: 'shortRest' } },
    { id: 'breath-of-sindragosa', name: 'Breath of Sindragosa', description: 'Costs 6 Runic Power. 30ft cone, 6d8 cold damage, CON save for half. Failed save = speed halved for 1 round.', level: 14, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

export const UNHOLY_DEATH_KNIGHT: Subclass = {
  id: 'unholy-death-knight',
  name: 'Unholy',
  description: 'Spread disease and command undead minions.',
  parentClassId: 'death-knight',
  features: [
    { id: 'raise-dead', name: 'Raise Dead', description: 'Costs 4 Runic Power. Raise ghoul from corpse for 1 hour. Max ghouls = 1 (increases to 2 at level 11).', level: 3 },
    { id: 'festering-wound', name: 'Festering Wound', description: 'Costs 2 Runic Power. Target bleeds for 1d4 necrotic per turn for 1 minute. Max 3 wounds. CON save ends effect.', level: 6 },
    { id: 'summon-gargoyle', name: 'Summon Gargoyle', description: 'Costs 5 Runic Power. Summon gargoyle for 1 minute with 2d8 necrotic ranged attacks.', level: 14, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

/**
 * Necromancer - Diablo Series inspired (BALANCED)
 */
export const NECROMANCER: Class = {
  id: 'necromancer',
  name: 'Necromancer',
  description: 'Master of the dark arts who commands undead minions and wields devastating curse magic.',
  hitDie: 'd6',
  primaryAbility: ['intelligence'],
  savingThrows: ['intelligence', 'wisdom'],
  armorProficiencies: ['light'],
  weaponProficiencies: ['dagger', 'dart', 'sling', 'quarterstaff', 'light-crossbow'],
  toolProficiencies: [],
  skillChoices: {
    choose: 2,
    from: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'],
  },
  subclassLevel: 2,
  subclassName: 'Path of the Necromancer',
  spellcasting: 'full',
  spellcastingAbility: 'intelligence',
  features: [
    { id: 'essence', name: 'Essence', description: 'Pool of 5 + level. Regain half on short rest, all on long rest. Regenerates 1 point when minions deal damage or creatures die within 30ft.', level: 1 },
    { id: 'raise-skeleton', name: 'Raise Skeleton', description: 'Costs 3 Essence. Raise skeleton warrior from corpse. Max skeletons = 1 (increases to 2 at level 11). Lasts 1 hour.', level: 1 },
    { id: 'corpse-explosion', name: 'Corpse Explosion', description: 'Costs 2 Essence. Explode corpse for 2d8 necrotic in 10ft radius. DEX save for half damage.', level: 2 },
    { id: 'bone-armor', name: 'Bone Armor', description: 'Costs 3 Essence. Gain temp HP = level + INT modifier for 1 minute.', level: 3 },
    { id: 'summon-golem', name: 'Summon Golem', description: 'Costs 5 Essence. Summon bone/blood/iron golem for 1 hour. Only one golem at a time.', level: 11, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

export const BONE_NECROMANCER: Subclass = {
  id: 'bone-necromancer',
  name: 'Path of Bone',
  description: 'Focus on offensive bone magic, using remains as deadly weapons.',
  parentClassId: 'necromancer',
  features: [
    { id: 'bone-spear', name: 'Bone Spear', description: 'Costs 2 Essence. Launch bone spear for 2d10 piercing, pierces to second target for 1d10.', level: 2 },
    { id: 'bone-spirit', name: 'Bone Spirit', description: 'Costs 4 Essence. Homing skull explodes for 5d6 necrotic.', level: 6 },
    { id: 'bone-storm', name: 'Bone Storm', description: 'Costs 5 Essence. Vortex of bones deals 3d6 slashing to creatures within 10ft for 3 rounds.', level: 14 },
  ],
}

export const BLOOD_NECROMANCER: Subclass = {
  id: 'blood-necromancer',
  name: 'Path of Blood',
  description: 'Manipulate lifeforce, draining enemies and empowering yourself.',
  parentClassId: 'necromancer',
  features: [
    { id: 'blood-surge', name: 'Blood Surge', description: 'Costs 2 Essence. Drain blood from creatures within 15ft for 2d6 necrotic, heal half damage dealt.', level: 2 },
    { id: 'siphon-blood', name: 'Siphon Blood', description: 'Passive: Heal for 25% of necrotic spell damage dealt.', level: 6 },
    { id: 'hemorrhage', name: 'Hemorrhage', description: 'Costs 5 Essence. Target bleeds for 3d8 + 1d8/turn for 1 minute. CON save ends effect.', level: 14 },
  ],
}

export const SUMMONER_NECROMANCER: Subclass = {
  id: 'summoner-necromancer',
  name: 'Path of the Summoner',
  description: 'Command vast armies of undead.',
  parentClassId: 'necromancer',
  features: [
    { id: 'skeleton-mastery', name: 'Skeleton Mastery', description: 'Increase skeleton limit by 1. Skeletons gain +1 attack and damage.', level: 2 },
    { id: 'revive', name: 'Revive', description: 'Costs 4 Essence. Revive any Medium or smaller creature that died within 1 minute as undead for 10 minutes.', level: 6 },
    { id: 'death-lord', name: 'Death Lord', description: 'Passive: Undead minions gain +2 AC, +10 HP, and +1d6 necrotic damage.', level: 14 },
  ],
}

/**
 * Demon Hunter - World of Warcraft + Diablo inspired (BALANCED)
 */
export const DEMON_HUNTER: Class = {
  id: 'demon-hunter',
  name: 'Demon Hunter',
  description: 'A relentless slayer who sacrificed part of their humanity to gain demonic powers.',
  hitDie: 'd10',
  primaryAbility: ['dexterity'],
  savingThrows: ['dexterity', 'charisma'],
  armorProficiencies: ['light', 'medium'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  skillChoices: {
    choose: 3,
    from: ['acrobatics', 'athletics', 'insight', 'intimidation', 'investigation', 'perception', 'stealth', 'survival'],
  },
  subclassLevel: 3,
  subclassName: 'Demon Hunter Specialization',
  spellcasting: 'half',
  spellcastingAbility: 'charisma',
  features: [
    { id: 'spectral-sight', name: 'Spectral Sight', description: 'See invisible creatures within 30ft. Darkvision extends by 30ft.', level: 1 },
    { id: 'fel-rush', name: 'Fel Rush', description: 'Dash 20ft, creatures you pass take 1d8 fire damage. DEX save for half.', level: 3, charges: { amount: 2, rechargeOn: 'shortRest' } },
    { id: 'extra-attack-dh', name: 'Extra Attack', description: 'Attack twice when you take the Attack action.', level: 5 },
    { id: 'blade-dance', name: 'Blade Dance', description: 'All creatures within 5ft take 2d6 slashing. DEX save for half.', level: 6, charges: { amount: 2, rechargeOn: 'shortRest' } },
    { id: 'metamorphosis', name: 'Metamorphosis', description: 'Transform for 1 minute: +1 AC, 30ft fly, +1d6 fire damage on attacks.', level: 9, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

export const VENGEANCE_DEMON_HUNTER: Subclass = {
  id: 'vengeance-demon-hunter',
  name: 'Vengeance',
  description: 'Tanks who use pain to fuel demonic powers.',
  parentClassId: 'demon-hunter',
  features: [
    { id: 'demon-spikes', name: 'Demon Spikes', description: '+1 AC, attackers take 1d4 piercing for 1 minute.', level: 3, charges: { amount: 2, rechargeOn: 'shortRest' } },
    { id: 'infernal-strike', name: 'Infernal Strike', description: 'Leap 20ft, 2d6 fire damage on landing. DEX save or prone.', level: 6, charges: { amount: 2, rechargeOn: 'shortRest' } },
    { id: 'fel-devastation', name: 'Fel Devastation', description: '20ft cone, 2d6 fire/round for 2 rounds. Heal 10% of damage dealt.', level: 14, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

export const HAVOC_DEMON_HUNTER: Subclass = {
  id: 'havoc-demon-hunter',
  name: 'Havoc',
  description: 'Melee DPS specialists dealing massive chaotic fel damage.',
  parentClassId: 'demon-hunter',
  features: [
    { id: 'eye-beam', name: 'Eye Beam', description: '40ft line, 4d6 fire damage. DEX save for half.', level: 3, charges: { amount: 2, rechargeOn: 'shortRest' } },
    { id: 'momentum', name: 'Momentum', description: 'After Fel Rush, next attack deals +1d6 damage.', level: 6 },
    { id: 'demonic', name: 'Demonic', description: 'Once per long rest: Eye Beam triggers Metamorphosis for 1 minute.', level: 14, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

export const SHADOW_DEMON_HUNTER: Subclass = {
  id: 'shadow-demon-hunter',
  name: 'Shadow',
  description: 'Blend stealth and ranged attacks, striking from darkness.',
  parentClassId: 'demon-hunter',
  features: [
    { id: 'shadow-power', name: 'Shadow Power', description: 'Hide as bonus action once per short rest. First attack from hiding deals +1d8.', level: 3, charges: { amount: 1, rechargeOn: 'shortRest' } },
    { id: 'multishot', name: 'Multishot', description: '15ft cone, 3d6 piercing. DEX save for half.', level: 6, charges: { amount: 2, rechargeOn: 'shortRest' } },
    { id: 'rain-of-vengeance', name: 'Rain of Vengeance', description: '20ft radius, 6d6 piercing. DEX save for half.', level: 14, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

/**
 * Amazon - Diablo 2 inspired (BALANCED)
 */
export const AMAZON: Class = {
  id: 'amazon',
  name: 'Amazon',
  description: 'A warrior from the Skovos Isles, master of javelin, bow, and spear combat with elemental magic.',
  hitDie: 'd10',
  primaryAbility: ['dexterity', 'strength'],
  savingThrows: ['dexterity', 'wisdom'],
  armorProficiencies: ['light', 'medium', 'shields'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  skillChoices: {
    choose: 3,
    from: ['acrobatics', 'athletics', 'insight', 'nature', 'perception', 'stealth', 'survival'],
  },
  subclassLevel: 3,
  subclassName: 'Amazon Discipline',
  spellcasting: 'half',
  spellcastingAbility: 'wisdom',
  fightingStyles: [
    { id: 'archery', name: 'Archery', description: '+2 bonus to ranged attack rolls.' },
    { id: 'thrown-weapon-fighting', name: 'Thrown Weapon Fighting', description: '+2 damage with thrown weapons, draw as part of attack.' },
    { id: 'spear-fighting', name: 'Spear Fighting', description: '+1 attack and damage with spear/javelin + shield.' },
  ],
  features: [
    { id: 'inner-sight', name: 'Inner Sight', description: 'Bonus action: target cannot benefit from invisible/hidden against you for 1 minute. Once per short rest.', level: 1, charges: { amount: 1, rechargeOn: 'shortRest' } },
    { id: 'critical-strike', name: 'Critical Strike', description: 'Once per short rest: gain advantage on next attack roll.', level: 1, charges: { amount: 1, rechargeOn: 'shortRest' } },
    { id: 'dodge-reaction', name: 'Dodge', description: 'Reaction: impose disadvantage on attack against you.', level: 2, charges: { amount: 2, rechargeOn: 'shortRest' } },
    { id: 'extra-attack-amazon', name: 'Extra Attack', description: 'Attack twice when you take the Attack action.', level: 5 },
    { id: 'avoid', name: 'Avoid', description: 'Advantage on DEX saves.', level: 7 },
    { id: 'summon-valkyrie', name: 'Summon Valkyrie', description: 'Summon Valkyrie (AC 16, HP = 2x level + 10) for 1 minute.', level: 11, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

export const JAVELIN_AMAZON: Subclass = {
  id: 'javelin-amazon',
  name: 'Javelin and Spear',
  description: 'Lightning-infused thrown weapons and devastating charged strikes.',
  parentClassId: 'amazon',
  features: [
    { id: 'power-strike', name: 'Power Strike', description: 'Add 1d6 lightning damage to javelin/spear attacks.', level: 3, charges: { amount: 3, rechargeOn: 'shortRest' } },
    { id: 'charged-strike', name: 'Charged Strike', description: 'On hit, release bolt hitting 1 additional creature within 10ft for 2d6 lightning.', level: 6, charges: { amount: 2, rechargeOn: 'shortRest' } },
    { id: 'lightning-fury', name: 'Lightning Fury', description: '15ft radius, 6d6 lightning damage. DEX save for half.', level: 14, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

export const BOW_AMAZON: Subclass = {
  id: 'bow-amazon',
  name: 'Bow and Crossbow',
  description: 'Master elemental arrows infused with fire, ice, and magical energy.',
  parentClassId: 'amazon',
  features: [
    { id: 'magic-arrow', name: 'Magic Arrow', description: 'Ranged attacks deal +1d4 force damage (increases to +1d6 at 11th).', level: 3 },
    { id: 'immolation-arrow', name: 'Immolation Arrow', description: 'Arrow explodes for 3d6 fire in 10ft radius. DEX save for half.', level: 6, charges: { amount: 2, rechargeOn: 'shortRest' } },
    { id: 'strafe', name: 'Strafe', description: 'Fire at up to 4 creatures, each takes normal weapon damage. DEX save or disadvantage on next attack.', level: 14, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}

export const PASSIVE_MAGIC_AMAZON: Subclass = {
  id: 'passive-magic-amazon',
  name: 'Passive and Magic',
  description: 'Focus on defensive techniques and summoning abilities.',
  parentClassId: 'amazon',
  features: [
    { id: 'decoy', name: 'Decoy', description: 'Create illusory duplicate within 30ft for 1 minute. WIS save to distinguish.', level: 3, charges: { amount: 2, rechargeOn: 'shortRest' } },
    { id: 'improved-dodge', name: 'Improved Dodge', description: 'Dodge has 3 charges per short rest. Move 5ft when you dodge.', level: 6, charges: { amount: 3, rechargeOn: 'shortRest' } },
    { id: 'blade-guardian', name: 'Blade Guardian', description: 'Spectral blades give +1 AC for 1 minute, auto-attack melee attackers for 1d8 force.', level: 14, charges: { amount: 1, rechargeOn: 'longRest' } },
  ],
}
