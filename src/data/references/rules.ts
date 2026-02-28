/**
 * Game rules and mechanics reference data
 * Combat, spellcasting, movement, and general rules
 */
import type { RuleRef } from './types'

// RULES DATA
export const RULES: Record<string, RuleRef> = {
  // Spellcasting Basics
  'spell-levels': {
    id: 'spell-levels',
    name: 'Spell Levels',
    category: 'spellcasting',
    summary: 'Spells range from level 0 (cantrips) to level 9. This is different from your character level!',
    description: 'Every spell has a level from 0 to 9. A spell\'s level indicates how powerful it is. Level 0 spells are called cantrips and can be cast at will. Spell levels 1-9 require spell slots to cast. Higher-level spells are more powerful but require higher-level spell slots. IMPORTANT: Spell level is NOT the same as character level! A level 5 character might only have access to level 3 spells.',
    examples: [
      'Fire Bolt is a cantrip (level 0) - cast it unlimited times',
      'Magic Missile is a 1st-level spell - requires a 1st-level slot or higher',
      'Fireball is a 3rd-level spell - very powerful, requires a 3rd-level slot',
      'Wish is a 9th-level spell - the most powerful magic available'
    ],
    relatedRules: ['spell-slots', 'cantrips', 'character-spell-progression'],
  },
  'character-spell-progression': {
    id: 'character-spell-progression',
    name: 'When You Learn Higher Spells',
    category: 'spellcasting',
    summary: 'Your character level determines what spell levels you can access.',
    description: 'As your character gains levels, you unlock access to more powerful spells. Full casters (Wizard, Cleric, Druid, Bard, Sorcerer) gain spell levels faster than half casters (Paladin, Ranger). You gain access to the highest spell level (9th) at character level 17.',
    table: {
      headers: ['Character Level', 'Highest Spell Level', 'Example Spells'],
      rows: [
        ['1-2', '1st', 'Magic Missile, Cure Wounds, Shield'],
        ['3-4', '2nd', 'Hold Person, Misty Step, Invisibility'],
        ['5-6', '3rd', 'Fireball, Counterspell, Revivify'],
        ['7-8', '4th', 'Polymorph, Banishment, Dimension Door'],
        ['9-10', '5th', 'Raise Dead, Cone of Cold, Wall of Force'],
        ['11-12', '6th', 'Disintegrate, True Seeing, Heal'],
        ['13-14', '7th', 'Teleport, Resurrection, Plane Shift'],
        ['15-16', '8th', 'Power Word Stun, Mind Blank, Maze'],
        ['17-20', '9th', 'Wish, Power Word Kill, Meteor Swarm']
      ]
    },
    relatedRules: ['spell-levels', 'spell-slots'],
  },
  'spell-slots': {
    id: 'spell-slots',
    name: 'Spell Slots',
    category: 'spellcasting',
    summary: 'Spell slots are your daily magical energy. You spend them to cast spells.',
    description: 'Spell slots represent your capacity to cast spells. Each slot can be used once per long rest. To cast a spell, you must expend a slot of that spell\'s level or higher. For example, casting a 1st-level spell uses a 1st-level slot. You can use a higher-level slot to cast a lower-level spell, often making it more powerful (called "upcasting"). You regain all spell slots after a long rest.',
    examples: [
      'You have three 1st-level slots and two 2nd-level slots',
      'Casting Shield (1st level) uses one 1st-level slot',
      'Casting Cure Wounds with a 2nd-level slot heals more HP',
      'When you run out of slots, you can only cast cantrips until you rest'
    ],
    relatedRules: ['spell-levels', 'upcasting', 'long-rest', 'cantrips'],
  },
  'cantrips': {
    id: 'cantrips',
    name: 'Cantrips',
    category: 'spellcasting',
    summary: 'Level 0 spells that can be cast unlimited times without using spell slots.',
    description: 'Cantrips are minor spells that casters have practiced so much they can cast them at will. They don\'t use spell slots and can be cast as many times as you want. Most cantrips deal damage that scales with your character level (not spell level), making them useful throughout the game. Common combat cantrips include Fire Bolt, Eldritch Blast, and Sacred Flame.',
    examples: [
      'Fire Bolt: 1d10 fire damage, increases at levels 5, 11, and 17',
      'Light: Make an object glow - useful for humans in dark dungeons',
      'Mage Hand: Create a spectral hand to manipulate objects at range',
      'Prestidigitation: Minor magical tricks and effects'
    ],
    relatedRules: ['spell-levels', 'cantrip-scaling'],
  },
  'cantrip-scaling': {
    id: 'cantrip-scaling',
    name: 'Cantrip Damage Scaling',
    category: 'spellcasting',
    summary: 'Damage cantrips get stronger as your character levels up.',
    description: 'Unlike leveled spells, cantrips automatically become more powerful as you gain character levels. At levels 5, 11, and 17, most damage-dealing cantrips add extra damage dice. This keeps cantrips relevant as reliable damage options throughout your adventure.',
    table: {
      headers: ['Character Level', 'Cantrip Damage Dice', 'Fire Bolt Example'],
      rows: [
        ['1-4', '1 die', '1d10 fire damage'],
        ['5-10', '2 dice', '2d10 fire damage'],
        ['11-16', '3 dice', '3d10 fire damage'],
        ['17-20', '4 dice', '4d10 fire damage']
      ]
    },
    relatedRules: ['cantrips', 'spell-levels'],
  },
  'spell-components': {
    id: 'spell-components',
    name: 'Spell Components (V, S, M)',
    category: 'spellcasting',
    summary: 'Spells require verbal (V), somatic (S), and/or material (M) components.',
    description: 'Most spells require specific components to cast. V (Verbal) means you must speak words of power - you can\'t cast if silenced. S (Somatic) means you must gesture with at least one free hand. M (Material) means you need specific items, usually held in a component pouch or replaced by a spellcasting focus. If a material has a gold cost listed, you must have that specific item.',
    examples: [
      'V only: Power Word Kill - just speak the word',
      'V, S: Fireball - speak and gesture',
      'V, S, M (a feather): Feather Fall - need an actual feather OR a focus',
      'V, S, M (diamond worth 300 gp): Revivify - MUST have the diamond'
    ],
    relatedRules: ['spellcasting-focus', 'component-pouch'],
  },
  'spellcasting-focus': {
    id: 'spellcasting-focus',
    name: 'Spellcasting Focus',
    category: 'spellcasting',
    summary: 'A focus can replace material components that don\'t have a gold cost.',
    description: 'A spellcasting focus is an item that channels your magic. It can replace material components that don\'t have a listed cost. Different classes use different focuses: Wizards use wands, orbs, or staffs. Clerics use holy symbols. Druids use druidic focuses like wooden staffs or yew wands. Bards use musical instruments. The focus must be held in hand when casting.',
    examples: [
      'Wizard with a wand can cast Fireball without carrying bat guano',
      'Cleric\'s holy symbol replaces material components for their spells',
      'You still need a 300 gp diamond for Revivify - a focus won\'t work'
    ],
    relatedRules: ['spell-components'],
  },
  'concentration': {
    id: 'concentration',
    name: 'Concentration',
    category: 'spellcasting',
    summary: 'Some spells require concentration to maintain. You can only concentrate on one spell at a time.',
    description: 'Spells marked "Concentration" require your ongoing mental focus. You can only concentrate on ONE spell at a time. If you cast another concentration spell, the first one ends immediately. Taking damage forces a Constitution saving throw (DC 10 or half the damage, whichever is higher) to maintain concentration. Being incapacitated or killed also breaks concentration.',
    examples: [
      'You\'re concentrating on Fly - casting Hold Person ends Fly',
      'You take 22 damage while concentrating - DC 11 CON save to maintain',
      'Bless and Spirit Guardians both need concentration - pick one',
      'You can cast non-concentration spells freely while concentrating'
    ],
    relatedRules: ['saving-throws'],
  },
  'upcasting': {
    id: 'upcasting',
    name: 'Casting Spells at Higher Levels',
    category: 'spellcasting',
    summary: 'Using a higher-level spell slot often makes spells more powerful.',
    description: 'Many spells become stronger when cast using a higher-level spell slot than required. The spell description\'s "At Higher Levels" section explains the benefit. Not all spells gain bonuses from upcasting - some just work at their base power regardless of slot used.',
    examples: [
      'Cure Wounds (1st): +1d8 healing per slot level above 1st',
      'Fireball (3rd): +1d6 damage per slot level above 3rd',
      'Hold Person (2nd): +1 target per slot level above 2nd',
      'Shield (1st): No upcasting benefit - always gives +5 AC'
    ],
    relatedRules: ['spell-slots', 'spell-levels'],
  },
  'ritual-casting': {
    id: 'ritual-casting',
    name: 'Ritual Casting',
    category: 'spellcasting',
    summary: 'Some spells can be cast as rituals, taking 10 extra minutes but using no spell slot.',
    description: 'Spells with the ritual tag can be cast normally using a spell slot, OR as a ritual by adding 10 minutes to the casting time. Ritual casting doesn\'t expend a spell slot, making it perfect for utility spells when you\'re not in a hurry. Not all classes can ritual cast - check your class features. Wizards can ritual cast any ritual spell in their spellbook, even if not prepared.',
    examples: [
      'Detect Magic as ritual: 11 minutes, but saves a spell slot',
      'Identify as ritual: Perfect for identifying items during downtime',
      'Find Familiar as ritual: 1 hour 10 minutes, no slot needed',
      'Fireball: No ritual tag, must always use a spell slot'
    ],
    relatedRules: ['spell-slots'],
  },
  'prepared-vs-known': {
    id: 'prepared-vs-known',
    name: 'Prepared vs Known Spells',
    category: 'spellcasting',
    summary: 'Some casters prepare spells daily; others know a fixed list.',
    description: 'Casters fall into two categories. PREPARED casters (Cleric, Druid, Paladin, Wizard) choose which spells to prepare after each long rest from their full spell list or spellbook. KNOWN casters (Bard, Ranger, Sorcerer, Warlock) have a fixed list of spells they know and can\'t change them except when leveling up. Prepared casters are more flexible; known casters are simpler to manage.',
    examples: [
      'Wizard: Prepares INT + wizard level spells from spellbook each day',
      'Cleric: Prepares WIS + cleric level spells from full cleric list',
      'Sorcerer: Knows a fixed number of spells, changes one when leveling',
      'Bard: Knows spells permanently, can swap one spell per level-up'
    ],
    relatedRules: ['long-rest'],
  },
  'spell-attack-rolls': {
    id: 'spell-attack-rolls',
    name: 'Spell Attack Rolls',
    category: 'spellcasting',
    summary: 'Some spells require you to roll to hit, just like weapon attacks.',
    description: 'Spells that say "make a spell attack" require a d20 roll to hit the target. Your spell attack modifier = your spellcasting ability modifier + proficiency bonus. Melee spell attacks are made at touch range. Ranged spell attacks can have disadvantage if an enemy is within 5 feet of you (just like ranged weapons).',
    examples: [
      'Fire Bolt: Ranged spell attack, roll d20 + INT + proficiency (Wizard)',
      'Shocking Grasp: Melee spell attack, touch the target',
      'Guiding Bolt: Roll to hit, deals 4d6 radiant on a hit',
      'Fireball: No attack roll - targets make a DEX save instead'
    ],
    relatedRules: ['spell-save-dc', 'advantage-disadvantage'],
  },
  'spell-save-dc': {
    id: 'spell-save-dc',
    name: 'Spell Save DC',
    category: 'spellcasting',
    summary: 'Your Spell Save DC is what enemies must beat to resist your spells.',
    description: 'Many spells force targets to make saving throws. Your Spell Save DC = 8 + proficiency bonus + spellcasting ability modifier. When a creature makes a save against your spell, they roll a d20 + their relevant ability modifier. If they meet or beat your DC, they typically take reduced or no effect. If they fail, they suffer the full spell effect.',
    examples: [
      'Level 5 Wizard with 18 INT: DC = 8 + 3 + 4 = 15',
      'You cast Hold Person (WIS save DC 15) on a goblin',
      'Goblin rolls d20 + WIS modifier - needs 15+ to break free',
      'Roll of 14 or less: Goblin is paralyzed!'
    ],
    relatedRules: ['spell-attack-rolls', 'saving-throws'],
  },
  'saving-throws': {
    id: 'saving-throws',
    name: 'Saving Throws',
    category: 'combat',
    summary: 'Saves let you resist or reduce harmful effects using your abilities.',
    description: 'When something dangerous happens - a spell, trap, or effect - you often make a saving throw to resist it. Roll d20 + ability modifier + proficiency (if proficient in that save). Each class grants proficiency in two saving throw types. Meeting or exceeding the DC means you succeed. Different effects target different saves: DEX for dodging, CON for enduring, WIS for mental effects.',
    examples: [
      'Fireball: DEX save - dodge to take half damage',
      'Hold Person: WIS save - resist mental control',
      'Poison: CON save - resist the toxin',
      'Disintegrate: DEX save - avoid being reduced to dust'
    ],
    table: {
      headers: ['Save Type', 'Common Uses', 'Classes Proficient'],
      rows: [
        ['Strength', 'Resisting being pushed, grappled, or restrained', 'Fighter, Barbarian, Ranger, Monk'],
        ['Dexterity', 'Dodging area effects like Fireball', 'Rogue, Ranger, Monk, Bard'],
        ['Constitution', 'Resisting poison, disease, maintaining concentration', 'Fighter, Barbarian, Sorcerer'],
        ['Intelligence', 'Resisting mental intrusion, illusions', 'Wizard, Druid, Rogue'],
        ['Wisdom', 'Resisting charm, fear, mind control', 'Cleric, Druid, Paladin, Warlock, Wizard, Monk'],
        ['Charisma', 'Resisting banishment, possession', 'Bard, Sorcerer, Paladin, Warlock']
      ]
    },
    relatedRules: ['spell-save-dc', 'ability-checks'],
  },
  'advantage-disadvantage': {
    id: 'advantage-disadvantage',
    name: 'Advantage & Disadvantage',
    category: 'combat',
    summary: 'Roll 2d20 and take the higher (advantage) or lower (disadvantage) result.',
    description: 'Advantage means favorable circumstances - roll two d20s and use the HIGHER result. Disadvantage means unfavorable circumstances - roll two d20s and use the LOWER result. Multiple sources of advantage don\'t stack (still just 2d20). If you have both advantage AND disadvantage from any sources, they cancel out - roll normally.',
    examples: [
      'Attacking an unseen enemy: Disadvantage',
      'Attacking while hidden: Advantage',
      'Faerie Fire on target: Attacks have advantage',
      'Prone target: Melee attacks have advantage, ranged have disadvantage'
    ],
    relatedRules: ['attack-rolls'],
  },
  'attack-rolls': {
    id: 'attack-rolls',
    name: 'Making Attack Rolls',
    category: 'combat',
    summary: 'Roll d20 + modifiers vs target\'s AC. Meet or beat AC to hit.',
    description: 'To attack, roll d20 + ability modifier (STR for melee, DEX for ranged/finesse) + proficiency bonus (if proficient with weapon). Compare to target\'s Armor Class (AC). If your total meets or beats the AC, you hit and roll damage. A natural 20 always hits and is a critical hit (double damage dice). A natural 1 always misses.',
    examples: [
      'Fighter attacks with longsword: d20 + STR + proficiency vs AC',
      'Rogue with rapier (finesse): Can use DEX instead of STR',
      'Roll total of 15 vs AC 15: HIT!',
      'Natural 20: Critical hit - roll damage dice twice!'
    ],
    relatedRules: ['advantage-disadvantage', 'critical-hits'],
  },
  'critical-hits': {
    id: 'critical-hits',
    name: 'Critical Hits',
    category: 'combat',
    summary: 'Natural 20 on attack = double all damage dice!',
    description: 'When you roll a natural 20 on an attack roll, you score a critical hit. Roll all damage dice twice and add them together, then add your normal modifiers. This applies to weapon damage dice AND any extra dice (like Sneak Attack or smites). Some features expand crit range (19-20) or add effects on crits.',
    examples: [
      'Longsword crit: 2d8 + STR instead of 1d8 + STR',
      'Rogue crit with Sneak Attack: Double ALL the d6s too',
      'Paladin smite crit: Double the smite dice as well',
      'Champion Fighter: Crits on 19-20 (later 18-20)'
    ],
    relatedRules: ['attack-rolls'],
  },
  'long-rest': {
    id: 'long-rest',
    name: 'Long Rest',
    category: 'rest',
    summary: '8 hours of rest - regain all HP, spell slots, and most abilities.',
    description: 'A long rest is at least 8 hours long, with at least 6 hours sleeping and no more than 2 hours of light activity (reading, keeping watch). You regain all lost HP, all spell slots, and most class features that say "recharges on long rest." You can only benefit from one long rest per 24-hour period. Interruptions of 1 hour or more require restarting.',
    examples: [
      'Sleep at an inn: Full HP and all spell slots restored',
      'Wizard regains all prepared spells for the day',
      'Fighter regains all Action Surge and Second Wind uses',
      'Hit Dice: Regain half your total (minimum 1) for healing'
    ],
    relatedRules: ['short-rest', 'hit-dice'],
  },
  'short-rest': {
    id: 'short-rest',
    name: 'Short Rest',
    category: 'rest',
    summary: '1 hour of rest - spend Hit Dice to heal, some abilities recharge.',
    description: 'A short rest is at least 1 hour of downtime - eating, reading, tending wounds. You can spend Hit Dice to heal: roll the die + CON modifier per Hit Die spent. Some class features recharge on short rests: Warlock spell slots, Fighter\'s Second Wind and Action Surge, Monk\'s Ki points. Short rests are vital for these classes!',
    examples: [
      'Spend 2 Hit Dice: Roll 2d10 + CON mod twice (Fighter)',
      'Warlock: Regain ALL spell slots (Pact Magic)',
      'Fighter: Regain Second Wind and Action Surge',
      'Monk: Regain all Ki points'
    ],
    relatedRules: ['long-rest', 'hit-dice'],
  },
  'hit-dice': {
    id: 'hit-dice',
    name: 'Hit Dice',
    category: 'rest',
    summary: 'Dice you can spend during short rests to heal yourself.',
    description: 'You have one Hit Die per character level. The die type matches your class (d6 for Wizard, d10 for Fighter, etc.). During a short rest, you can spend any number of Hit Dice. For each one spent, roll the die and add your CON modifier - you regain that many HP. You regain half your total Hit Dice (minimum 1) after a long rest.',
    table: {
      headers: ['Class', 'Hit Die', 'Average Healing per Die'],
      rows: [
        ['Barbarian', 'd12', '6.5 + CON'],
        ['Fighter, Paladin, Ranger', 'd10', '5.5 + CON'],
        ['Bard, Cleric, Druid, Monk, Rogue, Warlock', 'd8', '4.5 + CON'],
        ['Sorcerer, Wizard', 'd6', '3.5 + CON']
      ]
    },
    relatedRules: ['short-rest', 'long-rest'],
  },
  'ability-checks': {
    id: 'ability-checks',
    name: 'Ability Checks',
    category: 'general',
    summary: 'Roll d20 + ability modifier (+ proficiency if skilled) vs DC.',
    description: 'When you attempt something with uncertain outcome, the DM calls for an ability check. Roll d20 + the relevant ability modifier. If you have proficiency in a related skill, add your proficiency bonus too. The DM sets a Difficulty Class (DC) - meet or beat it to succeed. Expertise doubles your proficiency bonus.',
    examples: [
      'Climb a wall: Athletics (STR) check',
      'Pick a lock: Sleight of Hand or Thieves\' Tools (DEX) check',
      'Recall lore: History or Arcana (INT) check',
      'Detect a lie: Insight (WIS) check'
    ],
    table: {
      headers: ['Difficulty', 'DC', 'Example'],
      rows: [
        ['Very Easy', '5', 'Climb a rope ladder'],
        ['Easy', '10', 'Hear an approaching patrol'],
        ['Medium', '15', 'Pick a standard lock'],
        ['Hard', '20', 'Swim in stormy waters'],
        ['Very Hard', '25', 'Pick an exceptional lock'],
        ['Nearly Impossible', '30', 'Leap across a 30-foot chasm']
      ]
    },
    relatedRules: ['saving-throws'],
  },
  'proficiency-bonus': {
    id: 'proficiency-bonus',
    name: 'Proficiency Bonus',
    category: 'general',
    summary: 'A bonus that scales with level, added to things you\'re trained in.',
    description: 'Your proficiency bonus represents your training and experience. It increases as you level up and applies to: attack rolls with proficient weapons, saving throws you\'re proficient in, skill checks for proficient skills, spell attacks and save DCs, and tool checks with proficient tools. Everyone at the same level has the same proficiency bonus.',
    table: {
      headers: ['Character Level', 'Proficiency Bonus'],
      rows: [
        ['1-4', '+2'],
        ['5-8', '+3'],
        ['9-12', '+4'],
        ['13-16', '+5'],
        ['17-20', '+6']
      ]
    },
    relatedRules: ['ability-checks', 'attack-rolls', 'spell-save-dc'],
  },
  'armor-class': {
    id: 'armor-class',
    name: 'Armor Class (AC)',
    category: 'combat',
    summary: 'How hard you are to hit. Higher AC means enemies need to roll higher to damage you.',
    description: 'Armor Class (AC) represents how difficult you are to hit in combat. When an enemy attacks you, they roll 1d20 and add modifiers — if their total meets or beats your AC, they hit. Your AC is automatically calculated from everything you have equipped: Unarmored = 10 + DEX modifier. Light armor = armor base AC + full DEX modifier. Medium armor = armor base AC + DEX (capped at +2). Heavy armor = armor base AC (no DEX). Shields and magical cloaks add their AC bonus on top. Fighter stances also affect AC: Sword & Board (+2), Dual Two-Handed (-4). The Enraged condition applies a -1 AC penalty.',
    examples: [
      'Unarmored (DEX +3): 10 + 3 = AC 13',
      'Leather Armor (AC 11) + DEX +3 = AC 14',
      'Chainmail (AC 16) + Shield (+2) = AC 18',
      'Mithril Plate (AC 20) + Cloak of Protection (+1) = AC 21',
      'Fighter, Sword & Board stance: +2 AC on top of armor',
      'Fighter, Dual Two-Handed stance: -4 AC (tradeoff for 4d6 damage)',
      'Enraged (Barbarian): -1 AC while condition is active'
    ],
    relatedRules: ['attack-rolls', 'damage-resistance'],
  },
  'initiative': {
    id: 'initiative',
    name: 'Initiative',
    category: 'combat',
    summary: 'Determines turn order in combat. Roll 1d20 + your DEX modifier at the start of battle.',
    description: 'Initiative determines the order in which creatures act during combat. When combat begins, everyone rolls 1d20 and adds their Dexterity modifier (and any other initiative bonuses). Higher rolls go first. Ties are broken by comparing DEX scores (or DM decides). You keep the same initiative throughout the entire combat encounter.',
    examples: [
      'Fighter (DEX +1) rolls 14 → Initiative 15',
      'Wizard (DEX +3) rolls 12 → Initiative 15 (tied)',
      'Rogue (DEX +4) rolls 18 → Initiative 22 (goes first!)',
      'Turn order: Rogue → Fighter/Wizard (DM decides) → Goblin',
      'Alert feat: +5 bonus to initiative!'
    ],
    relatedRules: ['combat', 'surprised'],
  },
  'hit-die': {
    id: 'hit-die',
    name: 'Hit Dice',
    category: 'general',
    summary: 'Dice used to determine HP and regain HP during short rests. Class determines die size.',
    description: 'Hit Dice represent your character\'s vitality and resilience. Each class has a specific Hit Die (d6, d8, d10, or d12). At 1st level, you get maximum HP = max hit die + CON modifier. At each new level, roll your Hit Die and add CON modifier for HP gained (or take the average). You have a number of Hit Dice equal to your level. During a short rest, you can spend Hit Dice to regain HP by rolling and adding your CON modifier. You regain half your spent Hit Dice (minimum 1) after a long rest.',
    examples: [
      'Wizard (d6): Frail but magical',
      'Fighter (d10): Tough and durable',
      'Barbarian (d12): Incredibly hardy',
      'Level 5 Fighter: Has 5d10 Hit Dice',
      'Short rest: Spend 2 Hit Dice, roll 2d10+CON each for healing'
    ],
    table: {
      headers: ['Class', 'Hit Die'],
      rows: [
        ['Wizard, Sorcerer', 'd6'],
        ['Bard, Cleric, Druid, Monk, Rogue, Warlock', 'd8'],
        ['Fighter, Paladin, Ranger', 'd10'],
        ['Barbarian', 'd12']
      ]
    },
    relatedRules: ['short-rest', 'long-rest', 'leveling-up'],
  },
  'speed': {
    id: 'speed',
    name: 'Speed',
    category: 'general',
    summary: 'How far you can move on your turn, measured in feet. Most races have 30 ft speed.',
    description: 'Speed determines how far you can move on your turn in combat or exploration. The number shown is the distance in feet you can travel with your movement. Most races have a base walking speed of 30 feet. Some have special speeds like flying, swimming, or climbing. You can split your movement before and after your action (move 15 ft → attack → move 15 ft). Difficult terrain costs 2 feet for every 1 foot moved. Dash action: Double your movement for that turn.',
    examples: [
      'Human: 30 ft walking speed (standard)',
      'Wood Elf: 35 ft walking speed (faster!)',
      'Dwarf: 25 ft, but not slowed by heavy armor',
      'Aarakocra: 25 ft walk, 50 ft fly',
      'Move 20 ft → Attack → Move 10 ft (total 30 ft)',
      'Dash action: Move 60 ft total (30 × 2)'
    ],
    relatedRules: ['dash', 'difficult-terrain', 'combat'],
  },
  'darkvision': {
    id: 'darkvision',
    name: 'Darkvision',
    category: 'general',
    summary: 'See in darkness up to a certain distance. Darkness appears as dim light (black and white).',
    description: 'Many creatures have darkvision, allowing them to see in dim light within a specific range (usually 60 feet) as if it were bright light, and in darkness as if it were dim light. In darkness, you can\'t discern color, only shades of gray. Darkvision doesn\'t let you see through magical darkness or invisible creatures. Common races with darkvision: Dwarves (60 ft), Elves (60 ft), Half-Orcs (60 ft), Tieflings (60 ft), Drow (120 ft).',
    examples: [
      'Elf in dark cave: Can see 60 ft as if dimly lit',
      'Beyond 60 ft: Pitch black, can\'t see',
      'Drow in darkness: Can see 120 ft (superior darkvision)',
      'Colors: Everything appears in shades of gray',
      'Magical darkness: Darkvision doesn\'t work'
    ],
    relatedRules: ['superior-darkvision', 'light'],
  },
  'superior-darkvision': {
    id: 'superior-darkvision',
    name: 'Superior Darkvision',
    category: 'general',
    summary: 'Enhanced darkvision allowing you to see twice as far in darkness (typically 120 feet).',
    description: 'Superior darkvision is an enhanced version of darkvision that extends the range to 120 feet instead of the standard 60 feet. This trait is most commonly found in creatures that live in complete darkness, such as the Drow (dark elves) who inhabit the Underdark. Like normal darkvision, you see in dim light within this range as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray. Superior darkvision does not allow you to see through magical darkness.',
    examples: [
      'Drow in pitch-black cave: Can see 120 ft clearly (in grayscale)',
      'Drow vs Elf sight: Drow sees 120 ft, Elf sees only 60 ft',
      'Surface world: Superior darkvision provides no benefit in daylight',
      'Magical darkness: Superior darkvision doesn\'t work',
      'Color perception: Everything appears in shades of gray in darkness'
    ],
    relatedRules: ['darkvision', 'light', 'sunlight-sensitivity'],
  },
  'vision': {
    id: 'vision',
    name: 'Normal Vision',
    category: 'general',
    summary: 'Standard sight that relies on light sources. Cannot see in complete darkness.',
    description: 'Normal vision is the standard way most humanoid creatures perceive the world. Unlike darkvision, normal vision requires a light source to see clearly. In bright light, you can see normally and identify colors, details, and distance accurately. In dim light (such as torchlight or twilight), you have disadvantage on Wisdom (Perception) checks that rely on sight. In complete darkness, you are effectively blinded and cannot see at all. Most humans and halflings have normal vision and must rely on torches, lanterns, or spells like Light to navigate dark areas.',
    examples: [
      'Human in sunlight: Can see clearly, full color vision',
      'Human with torch: 20 ft bright light, 20 ft additional dim light',
      'Human in darkness: Completely blind, cannot see',
      'Dim light: Disadvantage on Perception checks relying on sight',
      'Navigating dungeons: Humans need light sources'
    ],
    relatedRules: ['darkvision', 'light', 'blinded'],
  },
  'alignment': {
    id: 'alignment',
    name: 'Alignment',
    category: 'general',
    summary: 'Your character\'s moral and ethical stance. Describes how they approach good vs evil, law vs chaos.',
    description: 'Alignment represents your character\'s moral compass and worldview. It\'s a combination of two axes: Good vs Evil (morality) and Lawful vs Chaotic (order). The nine alignments are: Lawful Good (crusader), Neutral Good (benefactor), Chaotic Good (rebel), Lawful Neutral (judge), True Neutral (undecided), Chaotic Neutral (free spirit), Lawful Evil (dominator), Neutral Evil (malefactor), Chaotic Evil (destroyer). Alignment can change based on your actions and experiences.',
    examples: [
      'Lawful Good: Superman, Paladins defending the innocent',
      'Chaotic Good: Robin Hood, breaking laws for the greater good',
      'Lawful Evil: Tyrants who use law to oppress',
      'Chaotic Evil: Demons, pure destruction and malice',
      'True Neutral: Druids maintaining balance',
      'Alignment shift: A good character who commits evil acts may become neutral or evil'
    ],
    table: {
      headers: ['Alignment', 'Description', 'Example'],
      rows: [
        ['Lawful Good', 'Honor, compassion, order', 'Noble paladin'],
        ['Neutral Good', 'Kindness without bias', 'Benevolent cleric'],
        ['Chaotic Good', 'Freedom and kindness', 'Robin Hood'],
        ['Lawful Neutral', 'Order above all', 'Judge, soldier'],
        ['True Neutral', 'Balance, pragmatism', 'Druid, merchant'],
        ['Chaotic Neutral', 'Personal freedom', 'Wandering rogue'],
        ['Lawful Evil', 'Tyranny, control', 'Cruel dictator'],
        ['Neutral Evil', 'Selfishness, malice', 'Mercenary killer'],
        ['Chaotic Evil', 'Destruction, chaos', 'Demon lord']
      ]
    },
    relatedRules: ['role-playing', 'character-creation'],
  },
  'languages': {
    id: 'languages',
    name: 'Languages',
    category: 'general',
    summary: 'Languages your character can speak, read, and write. Determined by race, class, and background.',
    description: 'All characters know Common, the trade language of most civilized lands. Your race grants additional languages (Elves know Elvish, Dwarves know Dwarvish, etc.). Your background may grant more languages. High Intelligence characters can choose bonus languages during creation. Exotic languages (Draconic, Infernal, Celestial) require special training. Some creatures understand languages but can\'t speak (like beasts). Speaking the same language allows full communication; without it, you can only use gestures and simple pantomime.',
    examples: [
      'Human Fighter: Common, Dwarvish (from background)',
      'Elf Wizard (INT 16): Common, Elvish, Draconic, Sylvan',
      'Tiefling Warlock: Common, Infernal (racial)',
      'Can\'t understand Goblin: Need an interpreter or magic',
      'Comprehend Languages spell: Understand any spoken language'
    ],
    table: {
      headers: ['Language', 'Typical Speakers'],
      rows: [
        ['Common', 'Humans, most civilized races'],
        ['Dwarvish', 'Dwarves'],
        ['Elvish', 'Elves'],
        ['Giant', 'Ogres, giants'],
        ['Gnomish', 'Gnomes'],
        ['Goblin', 'Goblinoids'],
        ['Halfling', 'Halflings'],
        ['Orc', 'Orcs'],
        ['Draconic', 'Dragons, dragonborn, kobolds'],
        ['Infernal', 'Devils, tieflings'],
        ['Celestial', 'Angels, aasimar'],
        ['Abyssal', 'Demons'],
        ['Sylvan', 'Fey creatures']
      ]
    },
    relatedRules: ['character-creation', 'role-playing'],
  },
  'death-saves': {
    id: 'death-saves',
    name: 'Death Saving Throws',
    category: 'combat',
    summary: 'At 0 HP, roll d20 each turn. 3 successes = stable, 3 failures = death.',
    description: 'When you drop to 0 HP, you fall unconscious and start making death saves. At the start of each turn, roll d20 (no modifiers). 10+ is a success, 9 or less is a failure. Three successes = you stabilize (still unconscious, but no longer dying). Three failures = your character dies. Rolling a 1 counts as TWO failures. Rolling a 20 = you regain 1 HP and wake up! Taking damage at 0 HP = automatic failure (crit = 2 failures).',
    examples: [
      'Roll 12: One success, need two more',
      'Roll 7: One failure, two more and you die',
      'Roll 1: TWO failures at once!',
      'Roll 20: Wake up with 1 HP!',
      'Ally casts Healing Word: You wake up with HP!'
    ],
    relatedRules: ['stabilizing'],
  },
  'stabilizing': {
    id: 'stabilizing',
    name: 'Stabilizing a Creature',
    category: 'combat',
    summary: 'Use an action to make a DC 10 Medicine check to stop someone from dying.',
    description: 'When an ally is at 0 HP and making death saves, you can use your action to stabilize them with a DC 10 Wisdom (Medicine) check. A stabilized creature is still unconscious at 0 HP but no longer makes death saves. They regain 1 HP after 1d4 hours. Any magical healing immediately wakes them with that HP instead.',
    examples: [
      'Cleric\'s turn: "I use my action to stabilize the Fighter"',
      'Medicine check: Roll 11+ to succeed',
      'Alternative: Cast any healing spell (even 1 HP wakes them)',
      'Spare the Dying cantrip: Automatically stabilizes'
    ],
    relatedRules: ['death-saves'],
  },
  'opportunity-attacks': {
    id: 'opportunity-attacks',
    name: 'Opportunity Attacks',
    category: 'combat',
    summary: 'When an enemy leaves your reach, you can use your reaction to attack them.',
    description: 'When a hostile creature you can see moves out of your reach, you can use your reaction to make one melee attack against them. This happens BEFORE they complete their movement. The Disengage action prevents opportunity attacks. Some features grant special opportunity attack abilities (like Sentinel feat) or immunity to them (like mobile feat, or the spell Misty Step).',
    examples: [
      'Goblin runs past your Fighter - you swing at it!',
      'Enemy Disengages - no opportunity attack allowed',
      'Wizard casts Misty Step to teleport away - no opportunity attack',
      'You already used your reaction this round - can\'t opportunity attack'
    ],
    relatedRules: ['reactions', 'disengage'],
  },
  'reactions': {
    id: 'reactions',
    name: 'Reactions',
    category: 'combat',
    summary: 'You get ONE reaction per round to respond to triggers.',
    description: 'A reaction is a special response to a trigger. You get one reaction per round, which refreshes at the start of your turn. Common reactions include: opportunity attacks, casting Shield or Counterspell, using class features like Uncanny Dodge. You can take a reaction on your turn or others\' turns, but only one total until your next turn starts.',
    examples: [
      'Enemy casts Fireball: Reaction to cast Counterspell',
      'Enemy attacks you: Reaction to cast Shield (+5 AC)',
      'Enemy runs away: Reaction for opportunity attack',
      'Rogue takes damage: Reaction for Uncanny Dodge (half damage)'
    ],
    relatedRules: ['opportunity-attacks'],
  },
  'bonus-actions': {
    id: 'bonus-actions',
    name: 'Bonus Actions',
    category: 'combat',
    summary: 'An extra action you can take if you have a feature or spell that grants one.',
    description: 'You can only take a bonus action if a feature, spell, or ability specifically says it uses a bonus action. You get at most ONE bonus action per turn. Common bonus actions: casting a bonus action spell (like Healing Word or Misty Step), Two-Weapon Fighting\'s off-hand attack, certain class features (Cunning Action, Rage). You cannot "downgrade" a bonus action spell to an action.',
    examples: [
      'Rogue: Cunning Action to Dash, Disengage, or Hide as bonus action',
      'Cleric: Cast Healing Word (bonus action), then attack or cantrip',
      'Two-weapon fighting: Attack with main hand, bonus action attack with off-hand',
      'Barbarian: Bonus action to enter Rage'
    ],
    relatedRules: ['actions'],
  },
  'actions': {
    id: 'actions',
    name: 'Actions in Combat',
    category: 'combat',
    summary: 'On your turn, you can move and take one action.',
    description: 'Each turn you have movement (usually 30 feet) and one action. Standard actions include: Attack (make weapon attacks), Cast a Spell (most spells), Dash (double movement), Disengage (avoid opportunity attacks), Dodge (attacks against you have disadvantage), Help (give ally advantage), Hide (attempt to become hidden), Ready (prepare an action for a trigger), Use an Object.',
    examples: [
      'Attack: Make one attack (more with Extra Attack)',
      'Cast a Spell: Cast Fireball',
      'Dash: Move extra distance (60 ft total with 30 ft speed)',
      'Dodge: All attacks against you have disadvantage until next turn'
    ],
    relatedRules: ['bonus-actions', 'reactions'],
  },
  'cover': {
    id: 'cover',
    name: 'Cover',
    category: 'combat',
    summary: 'Obstacles provide +2 or +5 to AC and DEX saves.',
    description: 'Cover represents physical obstacles between you and an attacker. Half cover (+2 AC, +2 DEX saves) includes things like another creature, low walls, or furniture. Three-quarters cover (+5 AC, +5 DEX saves) includes things like arrow slits, thick tree trunks, or creatures much larger than you. Total cover blocks all direct attacks and targeted spells.',
    examples: [
      'Behind a low wall: Half cover (+2 AC)',
      'Peeking around a corner: Three-quarters cover (+5 AC)',
      'Behind a friend: They provide half cover',
      'Completely behind a pillar: Total cover, can\'t be targeted'
    ],
    relatedRules: ['attack-rolls'],
  },
  'resistance': {
    id: 'resistance',
    name: 'Damage Resistance',
    category: 'combat',
    summary: 'Take half damage from specific damage types.',
    description: 'Resistance means you take half damage from a specific damage type. Many races and class features grant resistance to certain damage types (like fire, cold, poison, etc.). If you have resistance to a damage type, you take half damage from that source, rounding down. Resistance from multiple sources doesn\'t stack - you either have it or you don\'t. Resistance is applied after all other damage modifiers.',
    examples: [
      'Tiefling with Hellish Resistance takes 20 fire damage → takes 10 damage',
      'Dwarf with poison resistance takes 15 poison damage → takes 7 damage (rounds down)',
      'Bear Totem Barbarian raging: Resistance to all damage except psychic',
      'Fire Elemental hits with 12 fire damage, but target has fire resistance → takes 6 damage'
    ],
    table: {
      headers: ['Damage Type', 'Common Sources of Resistance'],
      rows: [
        ['Fire', 'Tiefling racial trait, Fire Elemental'],
        ['Cold', 'Some Dragonborn, Frost Giant heritage'],
        ['Poison', 'Dwarf racial trait, Warforged, Stout Halfling'],
        ['Acid', 'Black/Copper Dragonborn'],
        ['Lightning', 'Blue/Bronze Dragonborn'],
        ['Thunder', 'Storm Sorcerer features'],
        ['Psychic', 'Thought Shield (Warlock), Kalashtar'],
        ['Necrotic', 'Aasimar, Shadow Sorcerer'],
        ['Radiant', 'Aasimar, Divine Soul Sorcerer'],
        ['Slashing/Piercing/Bludgeoning', 'Raging Barbarian (non-magical)']
      ]
    },
    relatedRules: ['damage-types', 'vulnerability', 'immunity'],
  },
  'difficult-terrain': {
    id: 'difficult-terrain',
    name: 'Difficult Terrain',
    category: 'movement',
    summary: 'Moving through difficult terrain costs double movement.',
    description: 'Difficult terrain includes rubble, undergrowth, stairs, snow, shallow water, or any surface that\'s hard to move across. Every foot of movement in difficult terrain costs 2 feet. This means with 30 feet of speed, you can only move 15 feet through difficult terrain. Some features ignore difficult terrain (like Land\'s Stride for Rangers).',
    examples: [
      '30 ft speed in difficult terrain = 15 ft actual movement',
      'Web spell creates difficult terrain',
      'Spike Growth is difficult terrain + deals damage',
      'Freedom of Movement ignores difficult terrain'
    ],
    relatedRules: ['movement-speed'],
  },
  'movement-speed': {
    id: 'movement-speed',
    name: 'Movement & Speed',
    category: 'movement',
    summary: 'Your speed determines how far you can move on your turn.',
    description: 'Your speed is how many feet you can move on your turn. Most races have 30 feet. You can split your movement before, during, and after actions. Some effects give different movement types: fly speed, swim speed, climb speed, burrow speed. Without a swim or climb speed, those movements count as difficult terrain.',
    examples: [
      'Move 15 ft, attack, move 15 ft more (30 ft total)',
      'Dash action: Move up to 60 ft (double speed)',
      'Fly spell: Gain 60 ft fly speed',
      'Climbing without climb speed: 2 ft per 1 ft of movement'
    ],
    relatedRules: ['difficult-terrain', 'actions'],
  },
  'conditions-overview': {
    id: 'conditions-overview',
    name: 'Common Conditions',
    category: 'combat',
    summary: 'Status effects that modify what a creature can do.',
    description: 'Conditions are status effects applied by spells, abilities, or hazards. Multiple conditions can affect a creature at once. Common conditions include: Blinded (can\'t see, disadvantage on attacks), Charmed (can\'t attack the charmer), Frightened (disadvantage when source visible), Paralyzed (incapacitated, auto-fail STR/DEX saves, attacks auto-crit), Poisoned (disadvantage on attacks and checks), Prone (disadvantage on attacks, melee attacks have advantage against you), Restrained (speed 0, disadvantage on attacks and DEX saves), Stunned (incapacitated, auto-fail STR/DEX saves), Unconscious (like paralyzed but unaware).',
    relatedRules: ['paralyzed', 'stunned', 'prone'],
  },
  'wild-magic-surge-table': {
    id: 'wild-magic-surge-table',
    name: 'Wild Magic Surge Table',
    category: 'general',
    summary: 'Roll d100 when Wild Magic Surge triggers for chaotic magical effects.',
    description: 'When a Wild Magic Sorcerer triggers a Wild Magic Surge (after casting a spell of 1st level or higher and rolling a 1 on d20, or when the DM triggers it via Tides of Chaos), roll d100 on this table to determine the wild magical effect. Effects last for the duration specified or until dispelled. Some effects are beneficial, some harmful, and some just strange!',
    table: {
      headers: ['d100', 'Effect'],
      rows: [
        ['01-02', 'Roll on this table at the start of each turn for 1 minute'],
        ['03-04', 'You teleport up to 60 feet to an unoccupied space you can see'],
        ['05-06', 'Cast Fireball (3rd level) centered on yourself'],
        ['07-08', 'Cast Magic Missile (1st level) targeting random creatures within 60 feet'],
        ['09-10', 'Roll a d10. Your height changes by that many inches (50% taller, 50% shorter) for 1d4 hours'],
        ['11-12', 'Cast Confusion centered on yourself'],
        ['13-14', 'Regain 5 HP per turn for 1 minute'],
        ['15-16', 'You grow a long beard (any race/gender). Beard shouts whenever you cast a spell. Lasts until shaved'],
        ['17-18', 'Cast Grease centered on yourself'],
        ['19-20', 'Random creatures within 60 feet must make CHA save or become charmed by you for 1 minute'],
        ['21-22', 'Your skin turns bright blue for 1d4 days (no other effect)'],
        ['23-24', 'An eye appears on your forehead for 1 minute. Gain advantage on Perception checks'],
        ['25-26', 'Spells you cast have verbal components for 1 minute (even if they normally don\'t)'],
        ['27-28', 'Cast Levitate on yourself'],
        ['29-30', 'Random creature within 60 feet becomes poisoned for 1d4 hours'],
        ['31-32', 'You are surrounded by faint music for 1 minute'],
        ['33-34', 'Immediately take 2d10 necrotic damage'],
        ['35-36', 'You smell like a random food for 1d4 hours'],
        ['37-38', 'Regain 1d3 expended sorcery points'],
        ['39-40', 'You teleport up to 60 feet to an unoccupied space you can see'],
        ['41-42', 'Cast Invisibility on yourself'],
        ['43-44', 'Random creatures within 30 feet take 1d10 fire damage'],
        ['45-46', 'Your hair falls out but grows back within 24 hours'],
        ['47-48', 'Cast Fog Cloud centered on yourself'],
        ['49-50', 'Maximize damage on next spell that deals damage within 1 minute'],
        ['51-52', 'Cast Silence centered on yourself'],
        ['53-54', 'You glow with bright light (30 ft radius) for 1 minute'],
        ['55-56', 'Your age changes by 1d10 years (50% younger, 50% older). Dispel Magic reverses'],
        ['57-58', 'You and all creatures within 30 feet gain vulnerability to piercing damage for 1 minute'],
        ['59-60', '1d6 flumphs appear within 60 feet. Frightened of you. Vanish after 1 minute'],
        ['61-62', 'Regain HP equal to your sorcerer level'],
        ['63-64', 'For 1 minute, you must shout when speaking'],
        ['65-66', 'Cast Entangle centered on yourself'],
        ['67-68', 'You speak only in rhymes for 1 minute'],
        ['69-70', 'Roll 1d10. You are pushed that many × 10 feet in a random direction'],
        ['71-72', 'Cast Mirror Image on yourself'],
        ['73-74', 'Cast Fly on a random creature within 60 feet'],
        ['75-76', 'You become invisible for 1 minute or until you attack/cast a spell'],
        ['77-78', 'Random creatures within 30 feet gain resistance to all damage for 1 minute'],
        ['79-80', 'Your size increases by one category for 1 minute'],
        ['81-82', 'Your size decreases by one category for 1 minute'],
        ['83-84', 'You can\'t speak for 1 minute. Sound produces bubbles instead of words'],
        ['85-86', 'A spectral shield hovers near you for 1 minute (+2 AC)'],
        ['87-88', 'You are immune to intoxication for 5d6 days'],
        ['89-90', 'Your eyes become tiny beads. Vision unaffected. Lasts 1d4 hours'],
        ['91-92', 'Cast Daylight centered on yourself'],
        ['93-94', 'Random creatures within 30 feet grow beards that last until shaved'],
        ['95-96', 'Cast Polymorph on yourself (random beast CR 1 or lower). No concentration required. Lasts 1 hour'],
        ['97-98', 'You and all creatures within 30 feet gain vulnerability to radiant damage for 1 minute'],
        ['99-00', 'Roll twice and apply both effects (reroll if you get this result again)']
      ]
    },
    relatedRules: [],
  },
}
