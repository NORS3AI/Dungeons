/**
 * Quick Reference Data for D&D Content
 * Centralized data for tooltips and popups throughout the app
 */

// Spell Reference
export interface SpellRef {
  id: string
  name: string
  school: 'Abjuration' | 'Conjuration' | 'Divination' | 'Enchantment' | 'Evocation' | 'Illusion' | 'Necromancy' | 'Transmutation'
  level: number | 'cantrip'
  castingTime: string
  range: string
  components: string
  duration: string
  description: string
  higherLevels?: string
  classes: string[]
}

// Skill Reference
export interface SkillRef {
  id: string
  name: string
  ability: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'
  description: string
  examples: string[]
}

// Ability Reference
export interface AbilityRef {
  id: string
  name: string
  abbreviation: string
  description: string
  skills: string[]
  commonUses: string[]
}

// Weapon Reference
export interface WeaponRef {
  id: string
  name: string
  category: 'simple' | 'martial'
  type: 'melee' | 'ranged'
  damage: string
  damageType: string
  properties: string[]
  weight: string
  cost: string
  description?: string
}

// Armor Reference
export interface ArmorRef {
  id: string
  name: string
  category: 'light' | 'medium' | 'heavy' | 'shield'
  ac: string
  strength?: number
  stealthDisadvantage: boolean
  weight: string
  cost: string
  description?: string
}

// Condition Reference
export interface ConditionRef {
  id: string
  name: string
  effects: string[]
  endCondition?: string
}

// Trait/Feature Reference
export interface TraitRef {
  id: string
  name: string
  source: string
  description: string
  mechanics?: string
}

// SPELLS DATA
export const SPELLS: Record<string, SpellRef> = {
  'dancing-lights': {
    id: 'dancing-lights',
    name: 'Dancing Lights',
    school: 'Evocation',
    level: 'cantrip',
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S, M (a bit of phosphorus or wychwood, or a glowworm)',
    duration: 'Concentration, up to 1 minute',
    description: 'You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. You can combine the four lights into one glowing vaguely humanoid form of Medium size. Each light sheds dim light in a 10-foot radius.',
    classes: ['Bard', 'Sorcerer', 'Wizard', 'Artificer'],
  },
  'faerie-fire': {
    id: 'faerie-fire',
    name: 'Faerie Fire',
    school: 'Evocation',
    level: 1,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V',
    duration: 'Concentration, up to 1 minute',
    description: 'Each object in a 20-foot cube within range is outlined in blue, green, or violet light. Any creature in the area when the spell is cast is also outlined if it fails a Dexterity saving throw. Attack rolls against affected creatures have advantage, and the creatures can\'t benefit from being invisible.',
    classes: ['Bard', 'Druid', 'Artificer'],
  },
  'darkness': {
    id: 'darkness',
    name: 'Darkness',
    school: 'Evocation',
    level: 2,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, M (bat fur and a drop of pitch or piece of coal)',
    duration: 'Concentration, up to 10 minutes',
    description: 'Magical darkness spreads from a point you choose within range to fill a 15-foot-radius sphere. Creatures with darkvision can\'t see through this darkness, and nonmagical light can\'t illuminate it.',
    classes: ['Sorcerer', 'Warlock', 'Wizard'],
  },
  'thaumaturgy': {
    id: 'thaumaturgy',
    name: 'Thaumaturgy',
    school: 'Transmutation',
    level: 'cantrip',
    castingTime: '1 action',
    range: '30 feet',
    components: 'V',
    duration: 'Up to 1 minute',
    description: 'You manifest a minor wonder, a sign of supernatural power: your voice booms, flames flicker, you cause tremors, create sounds, slam doors, or alter the appearance of your eyes.',
    classes: ['Cleric'],
  },
  'hellish-rebuke': {
    id: 'hellish-rebuke',
    name: 'Hellish Rebuke',
    school: 'Evocation',
    level: 1,
    castingTime: '1 reaction (when damaged)',
    range: '60 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'The creature that damaged you is surrounded by hellish flames. It must make a Dexterity saving throw, taking 2d10 fire damage on a failed save, or half on success.',
    higherLevels: 'Damage increases by 1d10 for each slot level above 1st.',
    classes: ['Warlock'],
  },
  'eldritch-blast': {
    id: 'eldritch-blast',
    name: 'Eldritch Blast',
    school: 'Evocation',
    level: 'cantrip',
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack. On hit, the target takes 1d10 force damage. The spell creates additional beams at higher levels: 2 beams at 5th, 3 at 11th, 4 at 17th.',
    classes: ['Warlock'],
  },
  'hex': {
    id: 'hex',
    name: 'Hex',
    school: 'Enchantment',
    level: 1,
    castingTime: '1 bonus action',
    range: '90 feet',
    components: 'V, S, M (petrified eye of a newt)',
    duration: 'Concentration, up to 1 hour',
    description: 'You curse a creature. Until the spell ends, you deal an extra 1d6 necrotic damage when you hit it with an attack. Choose one ability; the target has disadvantage on checks with that ability. If the target drops to 0 HP, you can use a bonus action to curse a new creature.',
    higherLevels: 'Duration increases: 8 hours at 3rd level, 24 hours at 5th level.',
    classes: ['Warlock'],
  },
  'armor-of-agathys': {
    id: 'armor-of-agathys',
    name: 'Armor of Agathys',
    school: 'Abjuration',
    level: 1,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S, M (a cup of water)',
    duration: '1 hour',
    description: 'Spectral frost covers you. You gain 5 temporary HP. If a creature hits you with a melee attack while you have these HP, it takes 5 cold damage.',
    higherLevels: 'Both the temp HP and cold damage increase by 5 for each slot level above 1st.',
    classes: ['Warlock'],
  },
}

// SKILLS DATA
export const SKILLS: Record<string, SkillRef> = {
  'acrobatics': {
    id: 'acrobatics',
    name: 'Acrobatics',
    ability: 'dexterity',
    description: 'Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you\'re trying to run across ice, balance on a tightrope, or stay upright on a rocking ship\'s deck.',
    examples: ['Balance on a tightrope', 'Stay upright on a rocking surface', 'Perform acrobatic stunts'],
  },
  'animal-handling': {
    id: 'animal-handling',
    name: 'Animal Handling',
    ability: 'wisdom',
    description: 'When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal\'s intentions, you might need to make a Wisdom (Animal Handling) check.',
    examples: ['Calm a spooked horse', 'Intuit an animal\'s intentions', 'Control your mount in battle'],
  },
  'arcana': {
    id: 'arcana',
    name: 'Arcana',
    ability: 'intelligence',
    description: 'Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.',
    examples: ['Identify a spell being cast', 'Recall magical lore', 'Recognize magical symbols'],
  },
  'athletics': {
    id: 'athletics',
    name: 'Athletics',
    ability: 'strength',
    description: 'Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming.',
    examples: ['Climb a cliff', 'Jump an unusual distance', 'Swim in rough water', 'Grapple a creature'],
  },
  'deception': {
    id: 'deception',
    name: 'Deception',
    ability: 'charisma',
    description: 'Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions.',
    examples: ['Mislead someone', 'Fast-talk a guard', 'Disguise your intentions', 'Maintain a false identity'],
  },
  'history': {
    id: 'history',
    name: 'History',
    ability: 'intelligence',
    description: 'Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.',
    examples: ['Recall historical events', 'Identify ancient artifacts', 'Know about noble lineages'],
  },
  'insight': {
    id: 'insight',
    name: 'Insight',
    ability: 'wisdom',
    description: 'Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone\'s next move.',
    examples: ['Detect a lie', 'Predict behavior', 'Read body language'],
  },
  'intimidation': {
    id: 'intimidation',
    name: 'Intimidation',
    ability: 'charisma',
    description: 'When you attempt to influence someone through overt threats, hostile actions, and physical violence, you make a Charisma (Intimidation) check.',
    examples: ['Threaten someone', 'Pry information through threats', 'Scare off enemies'],
  },
  'investigation': {
    id: 'investigation',
    name: 'Investigation',
    ability: 'intelligence',
    description: 'When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check.',
    examples: ['Search for clues', 'Deduce hidden information', 'Find hidden doors'],
  },
  'medicine': {
    id: 'medicine',
    name: 'Medicine',
    ability: 'wisdom',
    description: 'A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness.',
    examples: ['Stabilize a dying creature', 'Diagnose an illness', 'Treat a wound'],
  },
  'nature': {
    id: 'nature',
    name: 'Nature',
    ability: 'intelligence',
    description: 'Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.',
    examples: ['Identify plants', 'Recall animal behavior', 'Predict weather'],
  },
  'perception': {
    id: 'perception',
    name: 'Perception',
    ability: 'wisdom',
    description: 'Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings.',
    examples: ['Spot hidden creatures', 'Hear approaching enemies', 'Notice subtle details'],
  },
  'performance': {
    id: 'performance',
    name: 'Performance',
    ability: 'charisma',
    description: 'Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment.',
    examples: ['Play an instrument', 'Dance', 'Act in a play', 'Tell a compelling story'],
  },
  'persuasion': {
    id: 'persuasion',
    name: 'Persuasion',
    ability: 'charisma',
    description: 'When you attempt to influence someone through good nature, tact, or social graces, you make a Charisma (Persuasion) check.',
    examples: ['Negotiate a deal', 'Convince someone', 'Make a good impression'],
  },
  'religion': {
    id: 'religion',
    name: 'Religion',
    ability: 'intelligence',
    description: 'Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and practices of secret cults.',
    examples: ['Identify religious symbols', 'Recall deity lore', 'Recognize cult practices'],
  },
  'sleight-of-hand': {
    id: 'sleight-of-hand',
    name: 'Sleight of Hand',
    ability: 'dexterity',
    description: 'Whenever you attempt an act of legerdemain or manual trickery, you make a Dexterity (Sleight of Hand) check.',
    examples: ['Pick a pocket', 'Conceal an object', 'Plant something on someone'],
  },
  'stealth': {
    id: 'stealth',
    name: 'Stealth',
    ability: 'dexterity',
    description: 'Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, or slip away without being noticed.',
    examples: ['Hide from enemies', 'Move silently', 'Tail someone'],
  },
  'survival': {
    id: 'survival',
    name: 'Survival',
    ability: 'wisdom',
    description: 'The DM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through terrain, or predict the weather.',
    examples: ['Track creatures', 'Hunt game', 'Navigate wilderness', 'Identify natural hazards'],
  },
}

// ABILITIES DATA
export const ABILITIES: Record<string, AbilityRef> = {
  'strength': {
    id: 'strength',
    name: 'Strength',
    abbreviation: 'STR',
    description: 'Strength measures bodily power, athletic training, and the extent to which you can exert raw physical force.',
    skills: ['Athletics'],
    commonUses: ['Attack and damage rolls with melee weapons', 'Carrying capacity', 'Lifting, pushing, and dragging', 'Breaking objects'],
  },
  'dexterity': {
    id: 'dexterity',
    name: 'Dexterity',
    abbreviation: 'DEX',
    description: 'Dexterity measures agility, reflexes, and balance.',
    skills: ['Acrobatics', 'Sleight of Hand', 'Stealth'],
    commonUses: ['Attack and damage with finesse/ranged weapons', 'Armor Class', 'Initiative', 'Dexterity saving throws'],
  },
  'constitution': {
    id: 'constitution',
    name: 'Constitution',
    abbreviation: 'CON',
    description: 'Constitution measures health, stamina, and vital force.',
    skills: [],
    commonUses: ['Hit points', 'Constitution saving throws', 'Concentration checks', 'Holding breath'],
  },
  'intelligence': {
    id: 'intelligence',
    name: 'Intelligence',
    abbreviation: 'INT',
    description: 'Intelligence measures mental acuity, accuracy of recall, and the ability to reason.',
    skills: ['Arcana', 'History', 'Investigation', 'Nature', 'Religion'],
    commonUses: ['Wizard spellcasting', 'Wizard spell save DC', 'Knowledge checks'],
  },
  'wisdom': {
    id: 'wisdom',
    name: 'Wisdom',
    abbreviation: 'WIS',
    description: 'Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition.',
    skills: ['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'],
    commonUses: ['Cleric/Druid/Ranger spellcasting', 'Passive Perception', 'Wisdom saving throws'],
  },
  'charisma': {
    id: 'charisma',
    name: 'Charisma',
    abbreviation: 'CHA',
    description: 'Charisma measures your ability to interact effectively with others, including confidence and eloquence.',
    skills: ['Deception', 'Intimidation', 'Performance', 'Persuasion'],
    commonUses: ['Bard/Paladin/Sorcerer/Warlock spellcasting', 'Social interaction', 'Charisma saving throws'],
  },
}

// WEAPONS DATA
export const WEAPONS: Record<string, WeaponRef> = {
  'rapier': {
    id: 'rapier',
    name: 'Rapier',
    category: 'martial',
    type: 'melee',
    damage: '1d8',
    damageType: 'piercing',
    properties: ['Finesse'],
    weight: '2 lb.',
    cost: '25 gp',
    description: 'A slender, sharply pointed sword designed for thrusting attacks. Favored by duelists and those who rely on speed over brute strength.',
  },
  'shortsword': {
    id: 'shortsword',
    name: 'Shortsword',
    category: 'martial',
    type: 'melee',
    damage: '1d6',
    damageType: 'piercing',
    properties: ['Finesse', 'Light'],
    weight: '2 lb.',
    cost: '10 gp',
    description: 'A versatile blade that works well for both slashing and stabbing. Its light weight makes it ideal for dual wielding.',
  },
  'hand-crossbow': {
    id: 'hand-crossbow',
    name: 'Hand Crossbow',
    category: 'martial',
    type: 'ranged',
    damage: '1d6',
    damageType: 'piercing',
    properties: ['Ammunition (range 30/120)', 'Light', 'Loading'],
    weight: '3 lb.',
    cost: '75 gp',
    description: 'A small crossbow that can be fired with one hand, favored by rogues and drow for its concealability.',
  },
  'longsword': {
    id: 'longsword',
    name: 'Longsword',
    category: 'martial',
    type: 'melee',
    damage: '1d8',
    damageType: 'slashing',
    properties: ['Versatile (1d10)'],
    weight: '3 lb.',
    cost: '15 gp',
    description: 'The classic knight\'s weapon. Can be wielded with one or two hands for additional damage.',
  },
  'greatsword': {
    id: 'greatsword',
    name: 'Greatsword',
    category: 'martial',
    type: 'melee',
    damage: '2d6',
    damageType: 'slashing',
    properties: ['Heavy', 'Two-Handed'],
    weight: '6 lb.',
    cost: '50 gp',
    description: 'A massive blade requiring both hands to wield effectively. Deals devastating damage but leaves no hand free for a shield.',
  },
  'longbow': {
    id: 'longbow',
    name: 'Longbow',
    category: 'martial',
    type: 'ranged',
    damage: '1d8',
    damageType: 'piercing',
    properties: ['Ammunition (range 150/600)', 'Heavy', 'Two-Handed'],
    weight: '2 lb.',
    cost: '50 gp',
    description: 'A tall bow with exceptional range. Requires both hands and considerable strength to draw.',
  },
  'dagger': {
    id: 'dagger',
    name: 'Dagger',
    category: 'simple',
    type: 'melee',
    damage: '1d4',
    damageType: 'piercing',
    properties: ['Finesse', 'Light', 'Thrown (range 20/60)'],
    weight: '1 lb.',
    cost: '2 gp',
    description: 'A small blade useful for both close combat and throwing. Easy to conceal and often carried as a backup weapon.',
  },
}

// ARMOR DATA
export const ARMOR: Record<string, ArmorRef> = {
  'leather': {
    id: 'leather',
    name: 'Leather Armor',
    category: 'light',
    ac: '11 + Dex modifier',
    stealthDisadvantage: false,
    weight: '10 lb.',
    cost: '10 gp',
    description: 'Made from toughened leather, this armor provides basic protection while remaining flexible.',
  },
  'studded-leather': {
    id: 'studded-leather',
    name: 'Studded Leather',
    category: 'light',
    ac: '12 + Dex modifier',
    stealthDisadvantage: false,
    weight: '13 lb.',
    cost: '45 gp',
    description: 'Leather armor reinforced with metal studs or rivets, offering improved protection.',
  },
  'chain-shirt': {
    id: 'chain-shirt',
    name: 'Chain Shirt',
    category: 'medium',
    ac: '13 + Dex modifier (max 2)',
    stealthDisadvantage: false,
    weight: '20 lb.',
    cost: '50 gp',
    description: 'A shirt of interlocking metal rings worn between layers of clothing. Provides good protection without encumbrance.',
  },
  'half-plate': {
    id: 'half-plate',
    name: 'Half Plate',
    category: 'medium',
    ac: '15 + Dex modifier (max 2)',
    stealthDisadvantage: true,
    weight: '40 lb.',
    cost: '750 gp',
    description: 'Plate armor covering the vital areas with lighter protection on the limbs. Provides excellent defense at the cost of stealth.',
  },
  'chain-mail': {
    id: 'chain-mail',
    name: 'Chain Mail',
    category: 'heavy',
    ac: '16',
    strength: 13,
    stealthDisadvantage: true,
    weight: '55 lb.',
    cost: '75 gp',
    description: 'Full-body armor of interlocking metal rings. Offers solid protection but requires strength and impedes stealth.',
  },
  'plate': {
    id: 'plate',
    name: 'Plate Armor',
    category: 'heavy',
    ac: '18',
    strength: 15,
    stealthDisadvantage: true,
    weight: '65 lb.',
    cost: '1,500 gp',
    description: 'The finest heavy armor, consisting of shaped, interlocking metal plates. Provides unparalleled protection.',
  },
  'shield': {
    id: 'shield',
    name: 'Shield',
    category: 'shield',
    ac: '+2',
    stealthDisadvantage: false,
    weight: '6 lb.',
    cost: '10 gp',
    description: 'A shield is made from wood or metal and is carried in one hand. Adds +2 to your AC.',
  },
}

// CONDITIONS DATA
export const CONDITIONS: Record<string, ConditionRef> = {
  'blinded': {
    id: 'blinded',
    name: 'Blinded',
    effects: [
      'A blinded creature can\'t see and automatically fails any ability check that requires sight.',
      'Attack rolls against the creature have advantage, and the creature\'s attack rolls have disadvantage.',
    ],
  },
  'charmed': {
    id: 'charmed',
    name: 'Charmed',
    effects: [
      'A charmed creature can\'t attack the charmer or target the charmer with harmful abilities or magical effects.',
      'The charmer has advantage on any ability check to interact socially with the creature.',
    ],
  },
  'deafened': {
    id: 'deafened',
    name: 'Deafened',
    effects: [
      'A deafened creature can\'t hear and automatically fails any ability check that requires hearing.',
    ],
  },
  'frightened': {
    id: 'frightened',
    name: 'Frightened',
    effects: [
      'A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.',
      'The creature can\'t willingly move closer to the source of its fear.',
    ],
  },
  'grappled': {
    id: 'grappled',
    name: 'Grappled',
    effects: [
      'A grappled creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.',
      'The condition ends if the grappler is incapacitated or if an effect removes the grappled creature from the grappler\'s reach.',
    ],
  },
  'incapacitated': {
    id: 'incapacitated',
    name: 'Incapacitated',
    effects: [
      'An incapacitated creature can\'t take actions or reactions.',
    ],
  },
  'invisible': {
    id: 'invisible',
    name: 'Invisible',
    effects: [
      'An invisible creature is impossible to see without the aid of magic or a special sense.',
      'The creature\'s location can be detected by noise it makes or tracks it leaves.',
      'Attack rolls against the creature have disadvantage, and the creature\'s attack rolls have advantage.',
    ],
  },
  'paralyzed': {
    id: 'paralyzed',
    name: 'Paralyzed',
    effects: [
      'A paralyzed creature is incapacitated and can\'t move or speak.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'Attack rolls against the creature have advantage.',
      'Any attack that hits the creature is a critical hit if the attacker is within 5 feet.',
    ],
  },
  'petrified': {
    id: 'petrified',
    name: 'Petrified',
    effects: [
      'A petrified creature is transformed into a solid inanimate substance. Its weight increases by a factor of ten.',
      'The creature is incapacitated, can\'t move or speak, and is unaware of its surroundings.',
      'Attack rolls against the creature have advantage.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'The creature has resistance to all damage and is immune to poison and disease.',
    ],
  },
  'poisoned': {
    id: 'poisoned',
    name: 'Poisoned',
    effects: [
      'A poisoned creature has disadvantage on attack rolls and ability checks.',
    ],
  },
  'prone': {
    id: 'prone',
    name: 'Prone',
    effects: [
      'A prone creature\'s only movement option is to crawl, unless it stands up.',
      'The creature has disadvantage on attack rolls.',
      'An attack roll against the creature has advantage if the attacker is within 5 feet. Otherwise, the attack roll has disadvantage.',
    ],
  },
  'restrained': {
    id: 'restrained',
    name: 'Restrained',
    effects: [
      'A restrained creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.',
      'Attack rolls against the creature have advantage, and the creature\'s attack rolls have disadvantage.',
      'The creature has disadvantage on Dexterity saving throws.',
    ],
  },
  'stunned': {
    id: 'stunned',
    name: 'Stunned',
    effects: [
      'A stunned creature is incapacitated, can\'t move, and can speak only falteringly.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'Attack rolls against the creature have advantage.',
    ],
  },
  'unconscious': {
    id: 'unconscious',
    name: 'Unconscious',
    effects: [
      'An unconscious creature is incapacitated, can\'t move or speak, and is unaware of its surroundings.',
      'The creature drops whatever it\'s holding and falls prone.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'Attack rolls against the creature have advantage.',
      'Any attack that hits the creature is a critical hit if the attacker is within 5 feet.',
    ],
  },
}

// RACIAL/CLASS TRAITS DATA
export const TRAITS: Record<string, TraitRef> = {
  'fey-ancestry': {
    id: 'fey-ancestry',
    name: 'Fey Ancestry',
    source: 'Elf / Half-Elf / Drow',
    description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
    mechanics: 'Advantage on saves vs. charm effects. Immunity to magical sleep.',
  },
  'trance': {
    id: 'trance',
    name: 'Trance',
    source: 'Elf / Drow',
    description: 'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. This rest provides the same benefit as 8 hours of sleep.',
    mechanics: '4 hours of meditation = 8 hours of sleep. Semiconscious during trance.',
  },
  'sunlight-sensitivity': {
    id: 'sunlight-sensitivity',
    name: 'Sunlight Sensitivity',
    source: 'Drow',
    description: 'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
    mechanics: 'Disadvantage on attacks and Perception in sunlight.',
  },
  'hellish-resistance': {
    id: 'hellish-resistance',
    name: 'Hellish Resistance',
    source: 'Tiefling',
    description: 'You have resistance to fire damage.',
    mechanics: 'Take half damage from fire.',
  },
  'second-wind': {
    id: 'second-wind',
    name: 'Second Wind',
    source: 'Fighter',
    description: 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.',
    mechanics: 'Bonus action: Heal 1d10 + Fighter level. Recharges on short/long rest.',
  },
  'action-surge': {
    id: 'action-surge',
    name: 'Action Surge',
    source: 'Fighter (Level 2)',
    description: 'On your turn, you can take one additional action. Once you use this feature, you must finish a short or long rest before you can use it again. Starting at 17th level, you can use it twice before a rest, but only once per turn.',
    mechanics: 'Gain one additional action. Recharges on short/long rest.',
  },
  'awakened-mind': {
    id: 'awakened-mind',
    name: 'Awakened Mind',
    source: 'Warlock (Great Old One)',
    description: 'Starting at 1st level, your alien knowledge gives you the ability to touch the minds of other creatures. You can communicate telepathically with any creature you can see within 30 feet of you. You don\'t need to share a language with the creature for it to understand your telepathic utterances, but the creature must be able to understand at least one language.',
    mechanics: 'Telepathic communication with creatures within 30 feet.',
  },
  'pact-magic': {
    id: 'pact-magic',
    name: 'Pact Magic',
    source: 'Warlock',
    description: 'Your arcane research and the magic bestowed on you by your patron have given you facility with spells. You regain all expended spell slots when you finish a short or long rest.',
    mechanics: 'Spell slots recharge on short rest. All slots are the same level.',
  },
}

// Helper function to get any reference by type and ID
export type RefType = 'spell' | 'skill' | 'ability' | 'weapon' | 'armor' | 'condition' | 'trait'

export function getReference(type: RefType, id: string): SpellRef | SkillRef | AbilityRef | WeaponRef | ArmorRef | ConditionRef | TraitRef | null {
  switch (type) {
    case 'spell':
      return SPELLS[id] || null
    case 'skill':
      return SKILLS[id] || null
    case 'ability':
      return ABILITIES[id] || null
    case 'weapon':
      return WEAPONS[id] || null
    case 'armor':
      return ARMOR[id] || null
    case 'condition':
      return CONDITIONS[id] || null
    case 'trait':
      return TRAITS[id] || null
    default:
      return null
  }
}
