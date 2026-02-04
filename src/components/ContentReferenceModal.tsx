import { useEffect, useState } from 'react'
import { QuickRefTooltip } from './QuickRefTooltip'

interface ContentReferenceModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'class' | 'race' | null
  name: string | null
}

interface ClassFeature {
  name: string
  id?: string // Optional ID for clickable features
}

interface SubclassInfo {
  name: string
  description: string
  features: ClassFeature[]
  expandedSpells?: string[] // Spell IDs
}

interface ClassInfo {
  description: string
  hitDie: string
  primaryAbility: string
  saves: string
  features: ClassFeature[]
  spellcaster?: boolean
  sampleSpells?: string[] // Sample spell IDs to showcase
  subclasses?: SubclassInfo[] // Available subclasses
}

// Class information database
const CLASS_INFO: Record<string, ClassInfo> = {
  Barbarian: {
    description: 'A fierce warrior of primitive background who can enter a battle rage.',
    hitDie: 'd12',
    primaryAbility: 'Strength',
    saves: 'Strength & Constitution',
    features: [
      { name: 'Rage - Enter a fury that grants bonus damage and resistance to physical damage' },
      { name: 'Unarmored Defense - AC = 10 + DEX + CON when not wearing armor' },
      { name: 'Reckless Attack - Gain advantage on attacks but enemies get advantage on you' },
      { name: 'Danger Sense - Advantage on DEX saves you can see coming' },
      { name: 'Extra Attack - Attack twice with one Attack action' },
      { name: 'Fast Movement - +10 feet speed when not wearing heavy armor' },
    ],
  },
  Bard: {
    description: 'An inspiring magician whose power echoes the music of creation.',
    hitDie: 'd8',
    primaryAbility: 'Charisma',
    saves: 'Dexterity & Charisma',
    features: [
      { name: 'Spellcasting - Cast spells using Charisma' },
      { name: 'Bardic Inspiration - Grant allies a d6 bonus die they can add to rolls' },
      { name: 'Jack of All Trades - Add half proficiency to all ability checks' },
      { name: 'Song of Rest - Heal allies extra hit points during short rests' },
      { name: 'Expertise - Double proficiency bonus on two skills' },
      { name: 'Font of Inspiration - Regain Bardic Inspiration on short rest' },
    ],
    spellcaster: true,
    sampleSpells: ['vicious-mockery', 'healing-word', 'faerie-fire', 'shatter', 'hypnotic-pattern', 'polymorph', 'mass-cure-wounds'],
  },
  Cleric: {
    description: 'A priestly champion who wields divine magic in service of a higher power.',
    hitDie: 'd8',
    primaryAbility: 'Wisdom',
    saves: 'Wisdom & Charisma',
    features: [
      { name: 'Spellcasting - Prepare and cast divine spells using Wisdom' },
      { name: 'Divine Domain - Choose a deity domain (Life, Light, War, etc.)' },
      { name: 'Channel Divinity - Channel divine energy 1/short rest' },
      { name: 'Destroy Undead - Turn undead creatures, destroying low CR ones' },
      { name: 'Divine Intervention - Ask your deity to intervene on your behalf' },
    ],
    spellcaster: true,
    sampleSpells: ['sacred-flame', 'cure-wounds', 'guiding-bolt', 'spiritual-weapon', 'revivify', 'spirit-guardians', 'flame-strike'],
  },
  Druid: {
    description: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
    hitDie: 'd8',
    primaryAbility: 'Wisdom',
    saves: 'Intelligence & Wisdom',
    features: [
      { name: 'Spellcasting - Prepare and cast nature spells using Wisdom' },
      { name: 'Wild Shape - Transform into beasts you have seen' },
      { name: 'Druid Circle - Join Circle of the Land or Moon at level 2' },
      { name: 'Timeless Body - Age slower and cannot be magically aged' },
      { name: 'Beast Spells - Cast spells while in Wild Shape form' },
    ],
    spellcaster: true,
    sampleSpells: ['shillelagh', 'produce-flame', 'healing-word', 'spider-climb', 'conjure-elemental', 'polymorph', 'animal-shapes'],
  },
  Fighter: {
    description: 'A master of martial combat, skilled with a variety of weapons and armor.',
    hitDie: 'd10',
    primaryAbility: 'Strength or Dexterity',
    saves: 'Strength & Constitution',
    features: [
      { name: 'Fighting Style - Choose archery, defense, dueling, or two-weapon fighting', id: 'fighting-style' },
      { name: 'Second Wind - Heal 1d10 + Fighter level as bonus action', id: 'second-wind' },
      { name: 'Action Surge - Take an additional action once per short rest', id: 'action-surge' },
      { name: 'Extra Attack - Attack twice (or more at higher levels) per action' },
      { name: 'Indomitable - Reroll a failed saving throw once per long rest' },
    ],
  },
  Monk: {
    description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.',
    hitDie: 'd8',
    primaryAbility: 'Dexterity & Wisdom',
    saves: 'Strength & Dexterity',
    features: [
      { name: 'Unarmored Defense - AC = 10 + DEX + WIS when not wearing armor' },
      { name: 'Martial Arts - Unarmed strikes scale with level (d4 to d10)' },
      { name: 'Ki - Spend ki points for Flurry of Blows, Patient Defense, Step of Wind' },
      { name: 'Unarmored Movement - Gain bonus speed when not wearing armor' },
      { name: 'Deflect Missiles - Reduce and catch ranged weapon attacks' },
      { name: 'Stunning Strike - Spend ki to stun enemies with unarmed strikes' },
    ],
  },
  Paladin: {
    description: 'A holy warrior bound to a sacred oath, wielding divine magic and martial prowess.',
    hitDie: 'd10',
    primaryAbility: 'Strength & Charisma',
    saves: 'Wisdom & Charisma',
    features: [
      { name: 'Divine Sense - Detect celestials, fiends, and undead within 60 feet' },
      { name: 'Lay on Hands - Heal up to 5 × your level HP per long rest' },
      { name: 'Fighting Style - Choose defense, dueling, or great weapon fighting' },
      { name: 'Spellcasting - Cast divine spells using Charisma' },
      { name: 'Divine Smite - Spend spell slots to add radiant damage to attacks' },
      { name: 'Sacred Oath - Swear Oath of Devotion, Vengeance, or Ancients' },
    ],
    spellcaster: true,
    sampleSpells: ['bless', 'cure-wounds', 'sanctuary', 'revivify', 'banishment', 'destructive-wave', 'holy-aura'],
  },
  Ranger: {
    description: 'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.',
    hitDie: 'd10',
    primaryAbility: 'Dexterity & Wisdom',
    saves: 'Strength & Dexterity',
    features: [
      { name: 'Favored Enemy - Advantage on tracking and recall info about chosen enemy type' },
      { name: 'Natural Explorer - Expertise navigating and surviving in favored terrain' },
      { name: 'Fighting Style - Choose archery, defense, dueling, or two-weapon fighting' },
      { name: 'Spellcasting - Cast nature spells using Wisdom' },
      { name: "Hunter's Mark - Mark a target for bonus damage on every hit" },
      { name: 'Extra Attack - Attack twice per action' },
    ],
    spellcaster: true,
    sampleSpells: ['guided-arrow', 'cure-wounds', 'freezing-arrow', 'conjure-elemental', 'swift-quiver', 'tree-stride'],
  },
  Rogue: {
    description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
    hitDie: 'd8',
    primaryAbility: 'Dexterity',
    saves: 'Dexterity & Intelligence',
    features: [
      { name: 'Expertise - Double proficiency on two skills (four at level 6)' },
      { name: 'Sneak Attack - Deal extra damage (d6s) when you have advantage or an ally nearby' },
      { name: 'Cunning Action - Dash, Disengage, or Hide as bonus action' },
      { name: 'Uncanny Dodge - Halve damage from one attack you can see' },
      { name: 'Evasion - Take no damage on successful DEX saves (half on failure)' },
      { name: 'Reliable Talent - Treat any d20 roll of 9 or lower as a 10 for checks' },
    ],
  },
  Sorcerer: {
    description: 'A spellcaster who draws on inherent magic from a gift or bloodline.',
    hitDie: 'd6',
    primaryAbility: 'Charisma',
    saves: 'Constitution & Charisma',
    features: [
      { name: 'Spellcasting - Cast spells using innate Charisma' },
      { name: 'Sorcerous Origin - Choose Draconic Bloodline or Wild Magic origin' },
      { name: 'Font of Magic - Convert spell slots to sorcery points and vice versa' },
      { name: 'Metamagic - Alter spells with Twinned Spell, Quickened Spell, etc.' },
      { name: 'Sorcerous Restoration - Regain 4 sorcery points on short rest' },
    ],
    spellcaster: true,
    sampleSpells: ['fire-bolt', 'chromatic-orb', 'magic-missile', 'scorching-ray', 'fireball', 'polymorph', 'chain-lightning'],
  },
  Warlock: {
    description: 'A wielder of magic derived from a bargain with an extraplanar entity.',
    hitDie: 'd8',
    primaryAbility: 'Charisma',
    saves: 'Wisdom & Charisma',
    features: [
      { name: 'Otherworldly Patron - Forge pact with Archfey, Fiend, Great Old One, etc.', id: 'otherworldly-patron' },
      { name: 'Pact Magic - Cast spells with few slots that recharge on short rest', id: 'pact-magic' },
      { name: 'Eldritch Invocations - Gain supernatural abilities like Agonizing Blast' },
      { name: 'Pact Boon - Gain a Pact of Chain, Blade, or Tome at level 3' },
      { name: 'Mystic Arcanum - Learn high-level spells (6th-9th) once per long rest' },
    ],
    spellcaster: true,
    sampleSpells: ['eldritch-blast', 'hex', 'armor-of-agathys', 'darkness', 'hunger-of-hadar', 'dimension-door', 'hold-monster'],
    subclasses: [
      {
        name: 'The Great Old One',
        description: 'Your patron is a mysterious entity from the Far Realm or beyond the stars.',
        features: [
          { name: 'Awakened Mind - Telepathically speak to creatures within 30 feet', id: 'awakened-mind' },
          { name: 'Entropic Ward - Impose disadvantage on attacks, gain advantage when they miss', id: 'entropic-ward' },
          { name: 'Thought Shield - Resist psychic damage and reflect telepathic probes', id: 'thought-shield' },
          { name: 'Create Thrall - Charm an incapacitated humanoid indefinitely', id: 'create-thrall' },
        ],
        expandedSpells: ['dissonant-whispers', 'tashas-hideous-laughter', 'detect-thoughts', 'phantasmal-force', 'dominate-person'],
      },
      {
        name: 'The Fiend',
        description: 'You have made a pact with a fiend from the lower planes of existence.',
        features: [
          { name: "Dark One's Blessing - Gain temp HP when reducing a hostile creature to 0", id: 'dark-ones-blessing' },
          { name: "Dark One's Own Luck - Add d10 to ability check or saving throw" },
          { name: 'Fiendish Resilience - Gain resistance to one damage type per rest' },
          { name: 'Hurl Through Hell - Send creature through lower planes dealing 10d10 psychic' },
        ],
        expandedSpells: ['burning-hands', 'command', 'scorching-ray', 'fireball', 'fire-storm'],
      },
      {
        name: 'The Archfey',
        description: 'Your patron is a lord or lady of the fey, a creature of legend.',
        features: [
          { name: 'Fey Presence - Charm or frighten creatures in 10-ft cube', id: 'fey-presence' },
          { name: 'Misty Escape - Turn invisible and teleport when taking damage' },
          { name: 'Beguiling Defenses - Immune to charm, reflect charm attempts' },
          { name: 'Dark Delirium - Charm a creature and trap in illusory realm' },
        ],
        expandedSpells: ['faerie-fire', 'sleep', 'phantasmal-force', 'dominate-monster'],
      },
      {
        name: 'The Hexblade',
        description: 'You have made your pact with a mysterious entity from the Shadowfell.',
        features: [
          { name: "Hexblade's Curse - Curse a target for bonus damage and crit on 19-20" },
          { name: 'Hex Warrior - Use CHA for weapon attacks with one weapon' },
          { name: 'Accursed Specter - Raise a specter from a humanoid you kill' },
          { name: 'Master of Hexes - Transfer your curse when target dies' },
        ],
        expandedSpells: ['shield', 'blur', 'blink', 'banishment'],
      },
      {
        name: 'The Celestial',
        description: 'Your patron is a powerful being of the Upper Planes.',
        features: [
          { name: 'Healing Light - Heal creatures using d6s as bonus action' },
          { name: 'Radiant Soul - Add CHA to fire and radiant damage, resist radiant' },
          { name: 'Celestial Resilience - Gain temp HP on short/long rest' },
          { name: 'Searing Vengeance - Explode with radiant light when stabilizing' },
        ],
        expandedSpells: ['cure-wounds', 'guiding-bolt', 'revivify', 'flame-strike'],
      },
    ],
  },
  Wizard: {
    description: 'A scholarly magic-user capable of manipulating the structures of reality.',
    hitDie: 'd6',
    primaryAbility: 'Intelligence',
    saves: 'Intelligence & Wisdom',
    features: [
      { name: 'Spellcasting - Prepare and cast arcane spells using Intelligence' },
      { name: 'Arcane Recovery - Recover spell slots equal to half wizard level on short rest' },
      { name: 'Arcane Tradition - Choose school of magic (Evocation, Abjuration, etc.)' },
      { name: 'Spell Mastery - Cast one 1st and one 2nd level spell at will' },
      { name: 'Signature Spells - Cast two 3rd level spells once per short rest' },
    ],
    spellcaster: true,
    sampleSpells: ['mage-hand', 'shield', 'magic-missile', 'misty-step', 'fireball', 'counterspell', 'wall-of-force', 'wish'],
  },
  'Death Knight': {
    description: 'A fallen champion raised by dark powers, wielding runic magic and commanding the forces of death itself.',
    hitDie: 'd10',
    primaryAbility: 'Strength & Constitution',
    saves: 'Strength & Constitution',
    features: [
      { name: 'Runic Power - Resource pool equal to level + CON for dark abilities' },
      { name: 'Rune Weapon - Infuse weapon with necrotic energy for +1d6 damage' },
      { name: 'Death Strike - Deal massive necrotic damage with weapon attacks' },
      { name: 'Anti-Magic Shell - Create protective barrier against spells' },
      { name: 'Raise Dead - Command undead minions to fight for you' },
    ],
    spellcaster: true,
    sampleSpells: ['chill-touch', 'inflict-wounds', 'death-coil', 'raise-dead', 'death-strike', 'cloudkill', 'death-and-decay'],
  },
  Necromancer: {
    description: 'Master of the dark arts who commands undead minions and wields devastating curse magic.',
    hitDie: 'd6',
    primaryAbility: 'Intelligence',
    saves: 'Intelligence & Wisdom',
    features: [
      { name: 'Essence - Resource pool (10 + level) that regenerates from death' },
      { name: 'Raise Skeleton - Summon skeleton warriors (max = INT modifier)' },
      { name: 'Bone Spear - Launch piercing bone projectiles at enemies' },
      { name: 'Corpse Explosion - Detonate corpses for massive AoE damage' },
      { name: 'Army of the Dead - Summon massive horde of undead temporarily' },
    ],
    spellcaster: true,
    sampleSpells: ['chill-touch', 'inflict-wounds', 'bone-spear', 'corpse-explosion', 'create-undead', 'finger-of-death', 'army-of-the-dead'],
    subclasses: [
      {
        name: 'Bone Necromancer',
        description: 'Master of skeletal magic and bone manipulation.',
        features: [
          { name: 'Bone Armor - Summon protective bone plating for damage reduction' },
          { name: 'Bone Prison - Trap enemies in cages of bone' },
          { name: 'Bone Spirit - Launch homing bone projectile that explodes' },
          { name: 'Bone Wall - Create impassable wall of bones' },
        ],
        expandedSpells: ['bone-spear', 'bone-prison', 'bone-shield', 'bone-wall', 'bone-spirit'],
      },
      {
        name: 'Blood Necromancer',
        description: 'Harness the power of blood magic and life drain.',
        features: [
          { name: 'Blood Nova - Detonate corpses dealing massive damage' },
          { name: 'Drain Life - Siphon life force from enemies to heal yourself' },
          { name: 'Iron Maiden - Reflect damage back to attackers' },
          { name: 'Blood Golem - Summon a powerful blood construct' },
        ],
        expandedSpells: ['drain-life', 'blood-nova', 'iron-maiden', 'inflict-wounds'],
      },
      {
        name: 'Summoner Necromancer',
        description: 'Command vast armies of undead servants.',
        features: [
          { name: 'Skeletal Mages - Summon ranged skeleton mages' },
          { name: 'Revive - Bring back fallen undead minions' },
          { name: 'Golem Mastery - Create clay, blood, iron, or fire golems' },
          { name: 'Army of the Dead - Summon massive temporary undead horde' },
        ],
        expandedSpells: ['create-undead', 'army-of-the-dead', 'revive', 'land-of-the-dead'],
      },
    ],
  },
  'Demon Hunter': {
    description: 'A relentless slayer who sacrificed part of their humanity to gain demonic powers.',
    hitDie: 'd10',
    primaryAbility: 'Dexterity',
    saves: 'Dexterity & Charisma',
    features: [
      { name: 'Spectral Sight - See invisible creatures and into the Ethereal Plane' },
      { name: 'Fel Rush - Dash 30 feet dealing 2d8 fire damage to enemies you pass' },
      { name: 'Metamorphosis - Transform into demon form with wings and enhanced power' },
      { name: 'Blade Dance - Whirl through enemies dealing damage to all around you' },
      { name: 'Demonic Wards - Gain resistance to fire and necrotic damage' },
    ],
    spellcaster: true,
    sampleSpells: ['hellish-rebuke', 'burning-hands', 'fel-bolt', 'fel-rush', 'fireball', 'metamorphosis', 'eye-beam'],
  },
  Amazon: {
    description: 'A warrior from the Skovos Isles, master of javelin, bow, and spear combat with elemental magic.',
    hitDie: 'd10',
    primaryAbility: 'Dexterity & Strength',
    saves: 'Dexterity & Wisdom',
    features: [
      { name: 'Fighting Style - Choose archery or thrown weapon fighting' },
      { name: 'Power Strike - Infuse attacks with elemental damage' },
      { name: 'Lightning Fury - Throw weapons that split into multiple bolts' },
      { name: 'Dodge - Gain enhanced defensive capabilities' },
      { name: 'Valkyrie - Summon a celestial warrior ally to fight beside you' },
    ],
    spellcaster: true,
    sampleSpells: ['magic-arrow', 'thunderwave', 'charged-strike', 'lightning-bolt', 'lightning-fury', 'chain-lightning', 'valkyrie'],
  },
}

// Race trait interface
interface RaceTrait {
  name: string
  id?: string // Optional ID for clickable traits
}

// Race information database
const RACE_INFO: Record<string, { description: string; size: string; speed: string; vision: string; traits: RaceTrait[]; abilityScores: string[] }> = {
  Human: {
    description: 'Versatile and ambitious, humans are the most adaptable and driven of the common races.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Ability Score Increase (+1 to all)' },
      { name: 'Resourceful - Gain Inspiration after each Long Rest', id: 'resourceful' },
      { name: 'Skillful - Gain 1 additional skill proficiency', id: 'skillful' },
      { name: 'Versatile - Gain 1 Origin feat at creation', id: 'versatile' },
    ],
    abilityScores: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
  },
  Elf: {
    description: 'Graceful and long-lived, elves are masters of magic and marksmanship.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Keen Senses - Proficiency in Perception' },
      { name: 'Fey Ancestry - Advantage on charm saves, immune to magical sleep', id: 'fey-ancestry' },
      { name: 'Trance - 4 hours meditation = 8 hours sleep', id: 'trance' },
    ],
    abilityScores: ['DEX'],
  },
  Dwarf: {
    description: 'Bold and hardy, dwarves are skilled warriors, miners, and workers of stone and metal.',
    size: 'Medium',
    speed: '25 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Dwarven Resilience - Advantage on poison saves, resistance to poison', id: 'dwarven-resilience' },
      { name: 'Dwarven Combat Training - Proficiency with battleaxe, handaxe, warhammer' },
      { name: 'Stonecunning - Double proficiency on History checks related to stonework' },
    ],
    abilityScores: ['CON'],
  },
  Halfling: {
    description: 'Small and practical, halflings are adept at fitting into communities of other races.',
    size: 'Small',
    speed: '25 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Lucky - Reroll natural 1s on d20 rolls', id: 'lucky' },
      { name: 'Brave - Advantage on saves vs. frightened', id: 'brave' },
      { name: 'Halfling Nimbleness - Move through space of larger creatures', id: 'halfling-nimbleness' },
      { name: 'Naturally Stealthy - Can hide behind larger creatures' },
    ],
    abilityScores: ['DEX'],
  },
  Gnome: {
    description: 'Energetic and inventive, gnomes are tinkerers and explorers with a zest for life.',
    size: 'Small',
    speed: '25 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Gnome Cunning - Advantage on INT/WIS/CHA saves vs. magic', id: 'gnome-cunning' },
      { name: 'Natural Illusionist - Know Minor Illusion cantrip' },
      { name: 'Speak with Small Beasts - Communicate simple ideas with Small beasts' },
    ],
    abilityScores: ['INT'],
  },
  'Half-Elf': {
    description: 'Walking in two worlds but belonging to neither, half-elves combine human and elven traits.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Fey Ancestry - Advantage on charm saves, immune to magical sleep', id: 'fey-ancestry' },
      { name: 'Skill Versatility - Gain 2 additional skill proficiencies', id: 'skill-versatility' },
    ],
    abilityScores: ['CHA'],
  },
  'Half-Orc': {
    description: 'Born of human and orc heritage, half-orcs possess remarkable strength and endurance.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Menacing - Proficiency in Intimidation' },
      { name: 'Relentless Endurance - Once per long rest, drop to 1 HP instead of 0', id: 'relentless-endurance' },
      { name: 'Savage Attacks - Extra weapon die on melee critical hits', id: 'savage-attacks' },
    ],
    abilityScores: ['STR', 'CON'],
  },
  Tiefling: {
    description: 'Bearing an infernal bloodline, tieflings are often met with suspicion but possess innate magic.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Hellish Resistance - Resistance to fire damage', id: 'hellish-resistance' },
      { name: 'Infernal Legacy - Know Thaumaturgy, cast Hellish Rebuke & Darkness', id: 'infernal-legacy' },
    ],
    abilityScores: ['CHA', 'INT'],
  },
  Dragonborn: {
    description: 'Proud dragon-kin who walk as humanoids, breathing destructive energy.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Draconic Ancestry - Choose dragon type for breath weapon & resistance', id: 'draconic-ancestry' },
      { name: 'Breath Weapon - Exhale destructive energy based on ancestry', id: 'breath-weapon' },
      { name: 'Damage Resistance - Resistance to damage type of your draconic ancestry' },
    ],
    abilityScores: ['STR', 'CHA'],
  },
  Drow: {
    description: 'Dark elves from the Underdark, wielding innate magic and superior darkvision.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Superior Darkvision 120 ft',
    traits: [
      { name: 'Superior Darkvision (120 ft)', id: 'superior-darkvision' },
      { name: 'Sunlight Sensitivity - Disadvantage on attacks & Perception in sunlight', id: 'sunlight-sensitivity' },
      { name: 'Drow Magic - Know Dancing Lights, cast Faerie Fire & Darkness', id: 'drow-magic' },
      { name: 'Drow Weapon Training - Proficiency with rapiers, shortswords, hand crossbows' },
    ],
    abilityScores: ['DEX', 'CHA'],
  },
  Aasimar: {
    description: 'Mortals touched by celestial power, aasimar are guided by divine beings. Aasimar carry the light of the heavens in their souls, descended from humans touched by the power of Mount Celestia. They are born to serve as champions of the gods, their births hailed as blessed events.\n\nAasimar appear mostly human, with lustrous hair, flawless skin, and piercing eyes. They possess an otherworldly beauty that makes them stand out in any crowd. Most aasimar have a link to an angelic guide who offers advice and urges them toward their divine purpose.\n\nNot all aasimar embrace their destiny—some struggle with their calling, while others may be tempted toward darkness. The celestial spark within them can manifest as Protector (guardians of others), Scourge (divine avengers), or Fallen (those who have turned from their path).\n\nAasimar adventurers are often driven by divine visions or the need to combat specific evils threatening the world. They walk the line between the mortal and divine realms, forever marked by their celestial heritage.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Celestial Resistance - Resistance to necrotic & radiant damage', id: 'celestial-resistance' },
      { name: 'Healing Hands - Heal creatures equal to your level once per long rest', id: 'healing-hands' },
      { name: 'Light Bearer - Know the Light cantrip' },
    ],
    abilityScores: ['CHA'],
  },
  Goliath: {
    description: 'Towering mountain dwellers known for their strength and competitive nature. Goliaths are massive humanoids who dwell among the highest mountain peaks, standing between 7 and 8 feet tall and weighing 280 to 340 pounds. Their skin is mottled with dark and light patches.\n\nEvery day brings a new challenge to a goliath. Food, water, and shelter are rare in the uppermost mountain reaches, and a single mistake can bring doom to an entire tribe. Goliaths thus place a premium on self-sufficiency and individual skill.\n\nGoliath society is fiercely competitive. From birth, they are taught that they must earn their place through displays of strength and prowess. This competitive nature represents their fundamental drive to improve themselves and their communities.\n\nGoliath adventurers often leave their mountain homes to prove themselves in the wider world. They view adventuring as the ultimate competition, a chance to prove their worth against the greatest threats.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: "Stone's Endurance - Reduce damage once per short rest", id: 'stones-endurance' },
      { name: "Powerful Build - Count as Large for carrying capacity", id: 'powerful-build' },
      { name: 'Mountain Born - Acclimated to high altitude and cold' },
      { name: 'Natural Athlete - Proficiency in Athletics' },
    ],
    abilityScores: ['STR', 'CON'],
  },
  Tabaxi: {
    description: 'Feline humanoids driven by curiosity and wanderlust. Hailing from a strange and distant land, wandering tabaxi are catlike humanoids driven by curiosity to collect interesting artifacts, gather tales and stories, and lay eyes on all the world has to offer.\n\nTabaxi have feline heads, sleek bodies covered in spotted or striped fur, and long tails. Their claws are retractable, and they possess an innate climbing ability. They stand roughly human height but are more slender and graceful.\n\nTabaxi treasure knowledge rather than material things. A chest filled with gold coins might be useful for buying food or a coil of rope, but it is not intrinsically interesting. They are driven by an insatiable curiosity about everything, seeking out stories, legends, and lore.\n\nMost tabaxi remain in their distant homeland, but a rare few become wanderers who journey to the far corners of the world. Tabaxi adventurers are driven by their obsessive curiosity, collecting stories and knowledge to bring back to their clans.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Feline Agility - Double speed until end of turn', id: 'feline-agility' },
      { name: "Cat's Claws - Unarmed strikes deal 1d6 slashing, climbing speed = walking speed" },
      { name: "Cat's Talent - Proficiency in Perception and Stealth" },
    ],
    abilityScores: ['DEX', 'CHA'],
  },
  Kenku: {
    description: 'Cursed bird-folk who have lost their wings and their voices. Haunted by an ancient crime that robbed them of their wings, the flightless kenku wander the world as vagabonds and burglars who live at the edge of human society. They are unable to speak in their own voices, instead mimicking the sounds and voices they hear.\n\nKenku are covered in russet-brown to black feathers, roughly humanoid-shaped with bird-like talons for hands and feet. They are slightly shorter than humans, averaging 5 feet tall. Their beaks give them a natural unarmed strike weapon.\n\nKenku suffer from a sinister reputation that is not wholly unearned, but they can prove to be valuable allies. They are supremely talented mimics, able to reproduce any sound they hear with perfect accuracy, which makes them excellent spies and infiltrators.\n\nKenku adventurers often seek to regain what was taken from their people - the power of flight and the ability to create. Others simply try to earn enough coin to survive in a world that views them with suspicion and fear.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Expert Forgery - Advantage on checks to produce forgeries' },
      { name: 'Kenku Training - Proficiency in two skills of your choice' },
      { name: 'Mimicry - Can mimic sounds and voices heard', id: 'mimicry' },
    ],
    abilityScores: ['DEX'],
  },
  Firbolg: {
    description: 'Gentle forest guardians with innate magic and a connection to nature. Firbolgs are distant kin of the giants who dwell in secluded forest strongholds, preferring to spend their days in quiet harmony with the woods. They are natural druids and rangers, viewing themselves as caretakers of the forest.\n\nFirbolgs stand between 7 and 8 feet tall and weigh between 240 and 300 pounds. They have fey ancestry which shows in their pointed ears and slightly angular features. Their skin tends toward pink, brick red, or light blue colors, and their hair is usually gray, brown, or blonde.\n\nFirbolg tribes cloister in remote forest strongholds, preferring to spend their days in quiet harmony with the woods. When provoked, firbolgs demonstrate formidable skills with weapons and druidic magic, but they would rather live in peace. They see themselves as stewards and protectors of the forest, working to preserve the natural balance.\n\nFirbolgs have a strong, innate talent for druidic magic, which stems from their fey ancestry. They can turn invisible, detect magic, and disguise themselves. They rarely reveal themselves to other civilized races, preferring to remain hidden observers of the forest.\n\nFirbolgs who become adventurers usually do so because their clan has been threatened, their forest destroyed, or they have been exiled for crimes against nature. They bring with them a deep connection to the wilds and powerful protective instincts.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Firbolg Magic - Cast Detect Magic & Disguise Self', id: 'firbolg-magic' },
      { name: 'Hidden Step - Bonus action to turn invisible until next turn', id: 'hidden-step' },
      { name: "Powerful Build - Count as Large for carrying capacity", id: 'powerful-build' },
      { name: 'Speech of Beast and Leaf - Limited communication with beasts & plants' },
    ],
    abilityScores: ['WIS', 'STR'],
  },
  Lizardfolk: {
    description: 'Reptilian humanoids with alien thought processes and natural weapons. Lizardfolk possess an alien and inscrutable mindset, their desires and thoughts driven by a different set of basic principles than those of warm-blooded creatures. Their dismal swamp homes might lie hundreds of miles from the nearest human settlement, but the gap between their way of thinking and that of the smooth-skins is far greater.\n\nLizardfolk stand 6 to 7 feet tall, their bodies covered in tough, scaly hide ranging from dark green to gray to brown. Their tails add another 3 to 4 feet to their length. They have powerful jaws filled with sharp teeth and claws that serve as natural weapons. Their eyes are cold and emotionless.\n\nDespite their alien outlook, some lizardfolk make an effort to understand and, in their own manner, befriend people of other races. Such lizardfolk make faithful and skilled allies. They are supremely practical, viewing emotions as a hindrance. They assess everyone and everything in terms of utility—what can it do, is it edible, can I use it to protect my tribe?\n\nLizardfolk rarely choose to leave their tribes, but those who do often become rangers, druids, or barbarians. They bring their practical, survival-focused mindset to adventuring parties, viewing each challenge through the lens of basic necessities and tribal survival.\n\nTo lizardfolk, other races seem unnecessarily emotional and driven by strange motivations. They find mammalian concerns about honor, dignity, and morality to be curious wastes of energy that could be better spent ensuring survival.',
    size: 'Medium',
    speed: '30 feet (swim 30 feet)',
    vision: 'Normal vision',
    traits: [
      { name: 'Bite - Unarmed strike deals 1d6 + STR piercing damage' },
      { name: 'Hold Breath - Can hold breath for 15 minutes' },
      { name: 'Natural Armor - AC = 13 + DEX modifier when unarmored', id: 'natural-armor' },
      { name: "Hunter's Lore - Proficiency in two skills from Animal Handling, Nature, Perception, Stealth, Survival" },
    ],
    abilityScores: ['CON', 'WIS'],
  },
  Triton: {
    description: 'Aquatic guardians from the Elemental Plane of Water. Tritons guard the ocean depths, building small settlements beside deep trenches, portals to the elemental planes, and other dangerous spots far from the eyes of land-bound folk. Long-established guardians of the deep ocean floor, tritons have slowly become increasingly active in the world above.\n\nTritons have humanoid bodies with blue or green skin, darker blue or green hair, and long legs that end in webbed feet. Their hands are partially webbed. They stand about 5 feet tall and have strong, athletic builds. Most tritons have silvery or white eyes and fine, silver-white or blue-green scales on their bodies.\n\nTritons have traditionally been isolationists, convinced of their superiority and the weakness of surface races. However, the growing threat of evil from the depths has forced tritons to venture beyond their ancestral homes. They now seek allies among land-dwellers and work to protect the surface world from underwater threats.\n\nTriton society is highly organized and militaristic, divided into strict hierarchies. Every triton knows their place and role in defending the ocean depths. They value discipline, duty, and honor above all else. Surface dwellers often find tritons aloof and arrogant, but tritons view this as justified confidence born from their critical protective role.\n\nTritons who become adventurers are often emissaries sent to the surface world to forge alliances, scouts investigating threats to the ocean depths, or exiles seeking redemption for failures in their duties.',
    size: 'Medium',
    speed: '30 feet (swim 30 feet)',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Amphibious - Can breathe air and water' },
      { name: 'Control Air and Water - Cast Fog Cloud, Gust of Wind, Wall of Water' },
      { name: 'Emissary of the Sea - Communicate simple ideas with beasts that breathe water' },
      { name: 'Guardians of the Depths - Resistance to cold damage, ignore deep water pressure' },
    ],
    abilityScores: ['STR', 'CON', 'CHA'],
  },
  Tortle: {
    description: 'Turtle-like humanoids with natural armor and a contemplative nature. Tortles have a saying: "We wear our homes on our backs." These turtle-like humanoids wander the world with their shells serving as both armor and shelter, seeking simple pleasures and enlightenment through experience.\n\nTortles stand between 5 and 6 feet tall and weigh between 400 and 450 pounds, with shells accounting for much of their weight. A tortle\'s shell is as hard as stone and just as heavy, providing exceptional natural armor. Their skin is leathery and ranges from olive-green to blue-green in hue. Tortles have no hair, and their eyes are typically yellow, orange, or red.\n\nTortles have a saying: "When in doubt, extend your head." They are curious creatures who love to explore and experience the world. Most tortles spend their lives traveling, seeing new lands, meeting new people, and collecting stories and wisdom. They avoid violence when possible but will defend themselves and their allies ferociously if threatened.\n\nTortle society is largely nomadic. Young tortles leave home shortly after hatching and spend their lives wandering. They rarely form permanent settlements, instead living solitary lives or in small groups. Tortles value personal freedom and exploration above material wealth or power.\n\nTortles become adventurers naturally, as wanderlust is part of their nature. They seek to experience all the world has to offer, collecting stories and wisdom to pass on to the next generation of tortles they encounter.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Natural Armor - AC = 17 when unarmored (cannot wear armor)', id: 'natural-armor' },
      { name: 'Shell Defense - Action to withdraw into shell, +4 AC, disadvantage on DEX saves', id: 'shell-defense' },
      { name: 'Hold Breath - Can hold breath for 1 hour' },
      { name: 'Survival Instinct - Proficiency in Survival' },
    ],
    abilityScores: ['STR', 'WIS'],
  },
  'Yuan-ti Pureblood': {
    description: 'Descended from ancient serpent empires, yuan-ti purebloods are resistant to magic and poisonous. The serpent creatures known as yuan-ti are all that remains of an ancient, decadent human empire. Ages ago their dark gods taught them profane, cannibalistic rituals to mix their flesh with that of snakes, producing a caste-based society of hybrids in which the most snakelike are the leaders and the most humanlike are spies and agents.\n\nPurebloods appear mostly human, with minor reptilian features such as snake eyes, a forked tongue, patches of scales on their skin, or pointed teeth. These subtle features allow them to pass as human in most circumstances, making them ideal spies and infiltrators for yuan-ti plots.\n\nYuan-ti purebloods are devoid of emotion as other races know it, particularly compassion. They follow cold logic and pragmatism, utterly ruthless in pursuit of power. They view other races as potential slaves or food, though they can act friendly and trustworthy when it serves their goals.\n\nRare yuan-ti purebloods have found themselves cut off from their evil society, or chose to flee it. These individuals may develop consciences and learn to feel emotions, though doing so is a long and difficult process. Such outcasts often become adventurers, seeking redemption or a new purpose away from their serpentine heritage.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Innate Spellcasting - Know Poison Spray, cast Animal Friendship (snakes), Suggestion' },
      { name: 'Magic Resistance - Advantage on saves vs. spells and magical effects', id: 'magic-resistance' },
      { name: 'Poison Immunity - Immune to poison damage and poisoned condition' },
    ],
    abilityScores: ['CHA', 'INT'],
  },
  Kobold: {
    description: 'Small reptilian humanoids who excel at working together and setting traps. Kobolds are craven reptilian humanoids that worship evil dragons as demigods and serve them as minions and toadies. Kobolds inhabit dragons\' lairs when they can but more commonly infest dungeons, gathering treasures and trinkets to add to their own tiny hoards.\n\nKobolds are between 2 and 3 feet tall and weigh between 25 and 35 pounds. They have draconic features including scales, horns, and reptilian eyes. Their scaly skin ranges from dark rusty brown to a rusty black color. They smell of damp dogs and stagnant water.\n\nKobolds are naturally servile, yet clever and hardworking. They love traps, ambushes, and working together. Despite their physical weakness, kobolds are surprisingly effective when working in groups, using coordinated tactics to overwhelm larger foes. They believe that dragons are the greatest creatures in existence and aspire to be the most dragonlike they can be.\n\nKobold adventurers are often outcasts from their clans, seeking to prove themselves worthy of their draconic heritage. Others may serve a dragon patron who has sent them on a quest. Freed from the tyranny of their clans, kobold adventurers discover their own potential for heroism, though they never quite lose their cowardly and obsequious nature.',
    size: 'Small',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Grovel, Cower, and Beg - Grant advantage to allies on attacks', id: 'grovel-cower-beg' },
      { name: 'Pack Tactics - Advantage on attacks if ally within 5 feet of target', id: 'pack-tactics' },
      { name: 'Sunlight Sensitivity - Disadvantage on attacks & Perception in sunlight', id: 'sunlight-sensitivity' },
    ],
    abilityScores: ['DEX'],
  },
  Aarakocra: {
    description: 'Avian humanoids from the Elemental Plane of Air with the gift of flight. Sequestered in high mountains atop tall trees, the aarakocra evoke fear and wonder. Many of these birdfolk hail from the boundless vistas of the Elemental Plane of Air. They are immigrants, refugees, scouts, and explorers, their outposts functioning as footholds in a world both strange and alien.\n\nAarakocra are about 5 feet tall with thin, lightweight bodies that weigh between 80 and 100 pounds. They have both arms and wings, with their wings serving as their arms—their hands are talons that emerge from the midpoint of their wings. Their plumage typically includes red, orange, yellow, brown, and gray.\n\nFrom below, aarakocra look much like large birds. Only when they descend to roost on a branch or walk across the ground does their humanoid appearance reveal itself. They have no concept of political borders or property ownership, viewing the world from above where such distinctions fade away.\n\nMost aarakocra are good and rarely choose sides when it comes to law and chaos. Tribal leaders and warriors might be lawful, while explorers and adventurers might tend toward chaotic. Aarakocra adventurers often serve as scouts, messengers, or strike forces. They adapt slowly to life on the ground, often homesick for the open sky.',
    size: 'Medium',
    speed: '25 feet (fly 50 feet)',
    vision: 'Normal vision',
    traits: [
      { name: 'Flight - Fly speed of 50 feet (cannot fly in medium or heavy armor)' },
      { name: 'Talons - Unarmed strikes deal 1d4 slashing damage' },
      { name: 'Wind Caller - Know the Gust of Wind spell' },
    ],
    abilityScores: ['DEX', 'WIS'],
  },
  Eladrin: {
    description: 'Elves native to the Feywild whose emotions manifest as seasonal magic and physical transformations. Eladrin are elves native to the Feywild, a realm of beauty, unpredictable emotion, and boundless magic. An eladrin is associated with one of the four seasons and has coloration reminiscent of that season, which can also affect the eladrin\'s mood.\n\nEladrin can change their season after completing a long rest. An eladrin might choose the season that is present in the world or perhaps a season that most closely matches their current emotional state. Their appearance changes to reflect their chosen season: hair color shifts, skin tone adjusts, and even their clothing seems to transform to match.\n\nAutumn eladrin are marked by peace and goodwill, as the autumn harvest. Winter eladrin are contemplative and sorrowful, shrouded in sadness and retreat. Spring eladrin are cheerful and celebratory, marked by gaiety and merriment. Summer eladrin are aggressive and bold, fueled by wrath and fury.\n\nEladrin possess powerful fey magic that allows them to teleport short distances. Each season grants them a unique additional magical ability when they use this teleportation. Autumn eladrin charm nearby creatures, winter eladrin frighten them, spring eladrin grant temporary hit points to allies, and summer eladrin deal fire damage to enemies.\n\nEladrin adventurers are often emissaries from the Feywild or exiles seeking to understand the Material Plane. They bring with them the wild, emotional magic of the fey realm and must learn to navigate a world less mutable than their home.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Fey Ancestry - Advantage on charm saves, immune to magical sleep', id: 'fey-ancestry' },
      { name: 'Fey Step - Teleport up to 30 feet as bonus action (recharge on short/long rest)', id: 'fey-step' },
      { name: 'Shifting Seasons - Your emotional state manifests as a season (Autumn=peace, Winter=sorrow, Spring=joy, Summer=wrath). Each season grants different magical abilities. Change season after long rest.' },
      { name: 'Trance - 4 hours meditation = 8 hours sleep', id: 'trance' },
    ],
    abilityScores: ['DEX', 'CHA'],
  },
  'Sea Elf': {
    description: 'Aquatic elves who dwell in the shallows and coral reefs of the ocean. Sea elves fell in love with the wild beauty of the ocean in the earliest days of the multiverse. While other elves traveled from realm to realm, sea elves navigated the currents and explored the waters across a hundred worlds. Today, they live in small, hidden communities in the ocean shallows and among the coral reefs.\n\nSea elves have the same range of complexions as humans, though they lean toward blues and greens. Their hair is usually stylish but practical, and they favor jewelry made of shell and pearl. Unlike other elves, sea elves spend as much time beneath the waves as on land. Their skin tends toward silvery-blue or deep green.\n\nWhere other sea folk might view the surface world with suspicion, sea elves navigate both realms with ease. They trade stories, music, and  crafts with land dwellers while exploring the mysterious depths below. They form colonies in coral reefs and kelp forests, building beautiful structures from living coral and shell.\n\nSea elves are skilled hunters and fisher-folk. They have developed special weapon training for tridents, light crossbows, and nets—all suited for underwater combat. They can breathe both air and water, swimming as easily as walking and possessing a natural affinity for aquatic beasts.\n\nSea elf adventurers often serve as guides, diplomats, or explorers. They bring knowledge of both land and sea, able to navigate treacherous waters and forge alliances between surface and undersea civilizations.',
    size: 'Medium',
    speed: '30 feet (swim 30 feet)',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Amphibious - Can breathe air and water' },
      { name: 'Sea Elf Training - Proficiency with trident, light crossbow, and net' },
      { name: 'Child of the Sea - Swim speed equals walking speed' },
      { name: 'Fey Ancestry - Advantage on charm saves, immune to magical sleep', id: 'fey-ancestry' },
      { name: 'Trance - 4 hours meditation = 8 hours sleep', id: 'trance' },
      { name: 'Friend of the Sea - Communicate simple ideas with beasts that breathe water' },
    ],
    abilityScores: ['DEX', 'CON'],
  },
  Warforged: {
    description: 'Living constructs created for war, warforged are tireless sentinels with integrated armor plating. The warforged were built to fight in the Last War. While the first warforged were mindless automatons, House Cannith devoted vast resources to improving these steel soldiers. An unexpected breakthrough produced sapient soldiers, giving rise to what some have only grudgingly accepted as a new species.\n\nWarforged are formed from a blend of organic and inorganic materials. Root-like cords infused with alchemical fluids serve as their muscles, wrapped around a framework of steel, darkwood, or stone. Armored plates form a protective outer shell and reinforce joints. All warforged share a common facial design, with a hinged jaw and crystal eyes embedded beneath a reinforced brow ridge.\n\nThe warforged were built to serve and to fight. For most of their existence, they had a clearly defined function and were encouraged to focus purely on that role. The Treaty of Thronehold gave them freedom, but many warforged struggle to find a place in a world that views them as weapons.\n\nWarforged have no biological sex. Some adopt pronouns they prefer, while others take none, referring to themselves only by their designations or new names. Most warforged have simple names, either numerical designations given by their creators or nicknames adopted later.\n\nWarforged adventurers often seek purpose and meaning beyond war. Some embrace new identities and forge new destinies, while others seek to understand their creation or reunite with comrades from the war. All must navigate a world uncertain whether to treat them as people or property.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Constructed Resilience - Advantage on saves vs. poison, resistance to poison, immune to disease, no need to eat/drink/breathe', id: 'constructed-resilience' },
      { name: 'Sentry\'s Rest - Rest 6 hours motionless, remain semiconscious' },
      { name: 'Integrated Protection - AC = 11 + DEX + proficiency when unarmored, cannot wear armor' },
      { name: 'Specialized Design - Gain one skill proficiency and one tool proficiency' },
    ],
    abilityScores: ['CON', 'STR'],
  },
  Changeling: {
    description: 'Masters of disguise and deception, changelings can alter their appearance at will. Changelings can shift their forms with a thought. Many changelings use this gift as a form of artistic and emotional expression, but it is an invaluable tool for grifters, spies, and others who wish to deceive. This leads many people to treat changelings with suspicion.\n\nA changeling can alter their physical appearance at will. While they can look like anyone, they prefer to adopt personas—identities with histories and personalities. A changeling adventurer might have personas for many situations, from a courtly noble to a guttersnipe rogue. Each persona is a separate identity with its own name, mannerisms, and even gender.\n\nChangelings have a fluid approach to gender and identity. A changeling might be one gender in their true form, another in one persona, and a third in another persona. Their shapeshifting abilities allow them to express different aspects of their identity physically. Some changelings embrace all personas equally, while others maintain a single "true" self.\n\nMost changelings are natural performers, drawn to become rogues, bards, or other classes that rely on guile and wit. Their talents make them exceptional spies, diplomats, and con artists. However, the constant masks they wear can make it difficult for changelings to form genuine emotional connections.\n\nChangeling adventurers often seek acceptance and understanding. Some embrace their unique nature fully, while others try to maintain a single stable identity. All must navigate a world that views their gift as dangerous and untrustworthy.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Shapechanger - Action to change appearance and voice (not equipment)', id: 'shapechanger' },
      { name: 'Changeling Instincts - Proficiency in two skills: Deception, Insight, Intimidation, or Persuasion' },
      { name: 'Unsettling Visage - React to impose disadvantage on attack roll once per short rest' },
      { name: 'Divergent Persona - Create multiple personas with different identities' },
    ],
    abilityScores: ['CHA'],
  },
  Kalashtar: {
    description: 'Bound to dream spirits from the Plane of Dreams, kalashtar possess telepathic abilities. The kalashtar are a compound race:  formed from the union of humanity with renegade spirits from the plane of dreams. Kalashtar are often seen as wise, spiritual people with great compassion for others. There is an unmistakable alien quality to the kalashtar, though—they see the world through two sets of eyes, with mortal and immortal perspectives interwoven.\n\nKalashtar appear human, though they are typically taller and have a more angular build. Their faces have a serene quality, and their eyes often seem to see beyond the Material Plane. They move with uncanny grace, and their voices have a gentle, almost musical quality.\n\nAll kalashtar are born with a connection to a dream spirit called a quori. This bond shapes their personality and grants them powerful psychic abilities. The quori does not control the kalashtar—instead, the two are a single unified being, though the quori remains a separate consciousness that guides and advises.\n\nKalashtar are naturally empathetic and telepathic. They communicate silently with others of their kind and can extend this telepathy to other creatures at close range. This makes them excellent diplomats and mediators, though their alien perspective can sometimes leave them confused by more mundane concerns.\n\nKalashtar adventurers often seek to protect the innocent and oppose those who would abuse psychic power. Many are hunted by the sinister Dreaming Dark, agents of evil quori who view kalashtar as traitors and threats that must be eliminated.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Dual Mind - Advantage on Wisdom saving throws' },
      { name: 'Mental Discipline - Resistance to psychic damage' },
      { name: 'Mind Link - Telepathic communication up to 60 feet times your level' },
      { name: 'Severed from Dreams - Immune to spells and effects requiring dreams' },
    ],
    abilityScores: ['WIS', 'CHA'],
  },
  Shifter: {
    description: 'Descended from lycanthropes, shifters can temporarily enhance their animalistic features.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Keen Senses - Proficiency in Perception', id: 'keen-senses' },
      { name: 'Shifting - Bonus action to shift for 1 minute, gain temp HP = level + CON, special benefits based on subrace, ends at 0 HP', id: 'shifting' },
    ],
    abilityScores: ['DEX'],
  },
  'Beasthide Shifter': {
    description: 'Shifters with stoic, bear-like resilience and thick, toughened skin.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Keen Senses - Proficiency in Perception', id: 'keen-senses' },
      { name: 'Shifting - Bonus action to shift, gain temp HP + 1d6, +1 AC, ends at 0 HP', id: 'shifting' },
      { name: 'Natural Athlete - Proficiency in Athletics' },
    ],
    abilityScores: ['STR', 'CON'],
  },
  'Longtooth Shifter': {
    description: 'Fierce shifters with prominent fangs and predatory instincts.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Keen Senses - Proficiency in Perception', id: 'keen-senses' },
      { name: 'Shifting - Bonus action to shift, gain temp HP, can bite as bonus action (1d6 + STR), ends at 0 HP', id: 'shifting' },
      { name: 'Fierce - Proficiency in Intimidation' },
    ],
    abilityScores: ['STR', 'DEX'],
  },
  'Swiftstride Shifter': {
    description: 'Graceful and quick shifters embodying the speed of hunting cats.',
    size: 'Medium',
    speed: '35 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Keen Senses - Proficiency in Perception', id: 'keen-senses' },
      { name: 'Shifting - Bonus action to shift, gain temp HP, walking speed +10 feet, can move 10 feet as reaction when hit, ends at 0 HP', id: 'shifting' },
      { name: 'Graceful - Proficiency in Acrobatics' },
    ],
    abilityScores: ['DEX', 'CHA'],
  },
  'Wildhunt Shifter': {
    description: 'Shifters attuned to nature with heightened senses and tracking abilities.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Keen Senses - Proficiency in Perception', id: 'keen-senses' },
      { name: 'Shifting - Bonus action to shift, gain temp HP, advantage on WIS checks/saves, no advantage on attacks against you, ends at 0 HP', id: 'shifting' },
      { name: 'Natural Tracker - Proficiency in Survival' },
    ],
    abilityScores: ['WIS', 'DEX'],
  },
  'Simic Hybrid': {
    description: 'Magically enhanced humanoids with biological adaptations from the Simic Combine.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Animal Enhancement - Choose one enhancement at 1st level and another at 5th level' },
      { name: 'Enhancement Options - Manta Glide (glide when falling), Nimble Climber (climb = walk speed), Underwater Adaptation (swim 30ft, breathe water), Grappling Appendages (grapple as bonus action), Carapace (+1 AC), Acid Spit (2d10 acid damage 30ft)' },
    ],
    abilityScores: ['CON'],
  },
  Vedalken: {
    description: 'Tall, blue-skinned humanoids known for their logic, curiosity, and tireless pursuit of perfection.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Vedalken Dispassion - Advantage on INT, WIS, and CHA saves' },
      { name: 'Tireless Precision - Add 1d4 to attack rolls, ability checks, and saving throws using INT, WIS, or CHA (once per short rest)' },
      { name: 'Partially Amphibious - Can breathe water for 1 hour at a time' },
    ],
    abilityScores: ['INT', 'WIS'],
  },
  Loxodon: {
    description: 'Elephant-headed humanoids with immense strength, wisdom, and unwavering loyalty.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Powerful Build - Count as Large for carrying capacity', id: 'powerful-build' },
      { name: 'Loxodon Serenity - Advantage on saves vs. charmed or frightened' },
      { name: 'Natural Armor - AC = 12 + CON modifier when unarmored', id: 'natural-armor' },
      { name: 'Trunk - Can grapple with trunk, use as snorkel, lift/carry objects' },
      { name: 'Keen Smell - Advantage on Perception, Survival, and Investigation checks involving smell' },
    ],
    abilityScores: ['CON', 'WIS'],
  },
  Centaur: {
    description: 'Half-human, half-horse beings who roam the wild with the speed of the wind.',
    size: 'Medium',
    speed: '40 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Fey - Creature type is Fey, not Humanoid' },
      { name: 'Charge - Move 30+ feet straight, then melee attack to deal extra 1d6 damage' },
      { name: 'Hooves - Unarmed strikes with hooves deal 1d4 + STR bludgeoning' },
      { name: 'Equine Build - Climbing costs 4x movement, Medium or smaller creatures can ride you' },
      { name: 'Survivor - Proficiency in one skill: Animal Handling, Medicine, Nature, or Survival' },
    ],
    abilityScores: ['STR', 'WIS'],
  },
  Minotaur: {
    description: 'Powerful bull-headed warriors with horns that can gore enemies.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Horns - Melee weapon attack: 1d6 + STR piercing damage' },
      { name: 'Goring Rush - Move 20+ feet straight, then bonus action horn attack' },
      { name: 'Hammering Horns - Hit with melee attack, bonus action to shove target 5 feet' },
      { name: 'Labyrinthine Recall - Always know direction to travel in direction you came from' },
    ],
    abilityScores: ['STR', 'CON'],
  },
  Orc: {
    description: 'Fierce warriors with powerful builds and an innate connection to the fury of battle.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Aggressive - Bonus action to move up to your speed toward hostile creature' },
      { name: 'Primal Intuition - Proficiency in two skills: Animal Handling, Insight, Intimidation, Medicine, Nature, or Perception' },
      { name: 'Powerful Build - Count as Large for carrying capacity', id: 'powerful-build' },
    ],
    abilityScores: ['STR', 'CON'],
  },
  Bugbear: {
    description: 'Hairy goblinoids with long limbs and a talent for stealth and ambush.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Long-Limbed - Reach is 5 feet greater on melee attacks on your turn' },
      { name: 'Powerful Build - Count as Large for carrying capacity', id: 'powerful-build' },
      { name: 'Sneaky - Proficiency in Stealth' },
      { name: 'Surprise Attack - Hit surprised creature to deal extra 2d6 damage (once per turn)' },
    ],
    abilityScores: ['STR', 'DEX'],
  },
  Hobgoblin: {
    description: 'Disciplined and militaristic goblinoids who value honor and martial prowess.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Martial Training - Proficiency with two martial weapons and light armor' },
      { name: 'Saving Face - Bonus to missed attack/failed check/failed save equal to number of allies within 30ft (max +5, once per short rest)' },
    ],
    abilityScores: ['CON', 'INT'],
  },
  Goblin: {
    description: 'Small, cunning creatures who use their size and agility to survive.',
    size: 'Small',
    speed: '30 feet',
    vision: 'Darkvision 60 ft',
    traits: [
      { name: 'Darkvision (60 ft)' },
      { name: 'Fury of the Small - Damage creature larger than you for extra damage = your level (once per short rest)' },
      { name: 'Nimble Escape - Bonus action to Disengage or Hide' },
    ],
    abilityScores: ['DEX', 'CON'],
  },
  Locathah: {
    description: 'Fish-like humanoids from the ocean depths with colorful scales and fins.',
    size: 'Medium',
    speed: '30 feet (swim 30 feet)',
    vision: 'Normal vision',
    traits: [
      { name: 'Limited Amphibiousness - Can breathe air and water, must submerge once every 4 hours or suffer exhaustion' },
      { name: 'Leviathan Will - Advantage on saves vs. charmed, frightened, paralyzed, poisoned, stunned' },
      { name: 'Natural Armor - AC = 12 + DEX modifier when unarmored', id: 'natural-armor' },
      { name: 'Observant & Athletic - Proficiency in Athletics and Perception' },
    ],
    abilityScores: ['STR', 'DEX'],
  },
  Fairy: {
    description: 'Tiny magical beings from the Feywild with colorful wings and innate spellcasting.',
    size: 'Small',
    speed: '30 feet',
    vision: 'Normal vision',
    traits: [
      { name: 'Fairy Magic - Know Druidcraft cantrip, cast Faerie Fire and Enlarge/Reduce' },
      { name: 'Flight - Fly speed equal to walking speed' },
      { name: 'Fey - Creature type is Fey, not Humanoid' },
    ],
    abilityScores: ['DEX', 'CHA'],
  },
  Owlin: {
    description: 'Owl-like humanoids with keen senses, silent flight, and nocturnal wisdom.',
    size: 'Medium',
    speed: '30 feet',
    vision: 'Darkvision 120 ft',
    traits: [
      { name: 'Darkvision (120 ft)' },
      { name: 'Flight - Fly speed equal to walking speed (cannot fly in medium/heavy armor)' },
      { name: 'Silent Feathers - Proficiency in Stealth' },
    ],
    abilityScores: ['DEX', 'WIS'],
  },
}

export function ContentReferenceModal({ isOpen, onClose, type, name }: ContentReferenceModalProps) {
  const [expandedSubclass, setExpandedSubclass] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen || !type || !name) return null

  const classInfo = type === 'class' ? CLASS_INFO[name] : null
  const raceInfo = type === 'race' ? RACE_INFO[name] : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700
                   animate-in fade-in slide-in-from-bottom-4 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reference-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <div className="flex items-center gap-3">
              <h2 id="reference-title" className="text-3xl font-bold text-gold-500">
                {name}
              </h2>
              {type === 'class' && ['Death Knight', 'Necromancer', 'Demon Hunter', 'Amazon'].includes(name) && (
                <span className="px-3 py-1 bg-purple-900/30 text-purple-400 text-sm rounded font-medium border border-purple-500/30">
                  Custom Class
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {type === 'class' ? (
                ['Death Knight', 'Necromancer', 'Demon Hunter', 'Amazon'].includes(name)
                  ? 'Custom Character Class (WoW/Diablo)'
                  : 'PHB 2024 Character Class'
              ) : (
                'Playable Race'
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700
                     transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
            aria-label="Close reference"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {classInfo && (
            <>
              <div>
                <p className="text-lg text-gray-300 leading-relaxed italic">
                  "{classInfo.description}"
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Hit Die</div>
                  <div className="text-2xl font-bold text-gold-400">{classInfo.hitDie}</div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Primary Ability</div>
                  <div className="text-lg font-semibold text-white">{classInfo.primaryAbility}</div>
                </div>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Saving Throw Proficiencies</div>
                <div className="text-lg font-semibold text-white">{classInfo.saves}</div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gold-500 mb-3 flex items-center gap-2">
                  <span>⚡</span>
                  Key Features
                </h3>
                <p className="text-xs text-gray-400 mb-3 italic">
                  {classInfo.features.some(f => f.id) ? 'Click features with trait IDs for more details' : 'Core abilities and powers of this class'}
                </p>
                <div className="grid gap-2">
                  {classInfo.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-lg border border-gray-700
                               hover:border-gold-500/50 transition-colors"
                    >
                      <span className="text-gold-500">•</span>
                      {feature.id ? (
                        <QuickRefTooltip type="trait" id={feature.id}>
                          <span className="text-gray-300 hover:text-gold-400 cursor-pointer underline decoration-dotted">
                            {feature.name}
                          </span>
                        </QuickRefTooltip>
                      ) : (
                        <span className="text-gray-300">{feature.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Spells Section */}
              {classInfo.spellcaster && classInfo.sampleSpells && (
                <div>
                  <h3 className="text-xl font-bold text-purple-500 mb-3 flex items-center gap-2">
                    <span>✨</span>
                    Signature Spells
                  </h3>
                  <p className="text-xs text-gray-400 mb-3 italic">
                    Click any spell to see full details including damage, range, and casting time
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {classInfo.sampleSpells.map((spellId) => (
                      <QuickRefTooltip key={spellId} type="spell" id={spellId}>
                        <div className="px-3 py-2 bg-purple-900/20 border border-purple-500/30 text-purple-300
                                      rounded-lg hover:bg-purple-900/40 hover:border-purple-400/50 cursor-pointer
                                      transition-all duration-200 transform hover:scale-105">
                          <span className="capitalize font-medium">
                            {spellId.replace(/-/g, ' ')}
                          </span>
                        </div>
                      </QuickRefTooltip>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-gray-500 italic">
                    {classInfo.sampleSpells.length} sample spells shown • This class has access to many more
                  </p>
                </div>
              )}

              {/* Subclasses Section */}
              {classInfo.subclasses && classInfo.subclasses.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-cyan-500 mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    Available Subclasses ({classInfo.subclasses.length})
                  </h3>
                  <p className="text-xs text-gray-400 mb-3 italic">
                    Click any subclass to see features and expanded spells
                  </p>
                  <div className="space-y-3">
                    {classInfo.subclasses.map((subclass, index) => {
                      const isExpanded = expandedSubclass === subclass.name
                      return (
                        <div
                          key={index}
                          className="border border-gray-700 rounded-lg overflow-hidden
                                   hover:border-cyan-500/50 transition-colors"
                        >
                          <button
                            onClick={() => setExpandedSubclass(isExpanded ? null : subclass.name)}
                            className="w-full p-4 text-left bg-gray-900/30 hover:bg-gray-900/50
                                     transition-colors flex items-center justify-between"
                          >
                            <div>
                              <div className="font-bold text-cyan-400 text-lg mb-1">
                                {subclass.name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {subclass.description}
                              </div>
                            </div>
                            <svg
                              className={`w-5 h-5 text-cyan-400 transform transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {isExpanded && (
                            <div className="p-4 bg-gray-900/20 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                              {/* Subclass Features */}
                              <div>
                                <h4 className="text-sm font-semibold text-cyan-400 uppercase mb-2">
                                  Subclass Features
                                </h4>
                                <div className="space-y-2">
                                  {subclass.features.map((feature, fIndex) => (
                                    <div
                                      key={fIndex}
                                      className="flex items-start gap-2 p-2 bg-gray-900/30 rounded-lg"
                                    >
                                      <span className="text-cyan-400 mt-1">→</span>
                                      {feature.id ? (
                                        <QuickRefTooltip type="trait" id={feature.id}>
                                          <span className="text-gray-300 hover:text-cyan-400 cursor-pointer underline decoration-dotted">
                                            {feature.name}
                                          </span>
                                        </QuickRefTooltip>
                                      ) : (
                                        <span className="text-gray-300">{feature.name}</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Expanded Spells */}
                              {subclass.expandedSpells && subclass.expandedSpells.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-purple-400 uppercase mb-2">
                                    Expanded Spell List
                                  </h4>
                                  <p className="text-xs text-gray-500 mb-2">
                                    Click any spell for details
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {subclass.expandedSpells.map((spellId) => (
                                      <QuickRefTooltip key={spellId} type="spell" id={spellId}>
                                        <div className="px-2 py-1 bg-purple-900/20 border border-purple-500/30 text-purple-300
                                                      text-sm rounded hover:bg-purple-900/40 cursor-pointer transition-colors">
                                          <span className="capitalize">
                                            {spellId.replace(/-/g, ' ')}
                                          </span>
                                        </div>
                                      </QuickRefTooltip>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {raceInfo && (
            <>
              <div>
                <p className="text-lg text-gray-300 leading-relaxed italic">
                  "{raceInfo.description}"
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Size</div>
                  <div className="text-lg font-semibold text-white">{raceInfo.size}</div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Speed</div>
                  <div className="text-lg font-semibold text-white">{raceInfo.speed}</div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Vision</div>
                  <div className="text-lg font-semibold text-white">{raceInfo.vision}</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gold-500 mb-3 flex items-center gap-2">
                  <span>✨</span>
                  Racial Traits
                </h3>
                <p className="text-xs text-gray-400 mb-3 italic">
                  Click traits with underlines to learn more details
                </p>
                <div className="grid gap-2">
                  {raceInfo.traits.map((trait, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-lg border border-gray-700
                               hover:border-gold-500/50 transition-colors"
                    >
                      <span className="text-gold-500">•</span>
                      {trait.id ? (
                        <QuickRefTooltip type="trait" id={trait.id}>
                          <span className="text-gray-300 hover:text-gold-400 cursor-pointer underline decoration-dotted">
                            {trait.name}
                          </span>
                        </QuickRefTooltip>
                      ) : (
                        <span className="text-gray-300">{trait.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-gold-600 to-yellow-600 text-white font-semibold rounded-lg
                     shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
