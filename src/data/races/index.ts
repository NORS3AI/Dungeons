import type { Race } from '../../types/race'
import { SOURCE_BOOKS } from '../../types/race'

// ============================================================================
// COMMON RACES
// ============================================================================

export const HUMAN: Race = {
  id: 'human',
  name: 'Human',
  icon: '👤',
  category: 'common',
  description: 'The most adaptable and ambitious people, humans are remarkably diverse in their talents and ambitions. Whatever drives them, humans are the innovators and achievers of the multiverse.',
  sourceBook: { ...SOURCE_BOOKS.PHB2024, page: 166 },
  abilityBonuses: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common'],
  traits: [
    { id: 'resourceful', name: 'Resourceful', description: 'You gain Inspiration whenever you finish a Long Rest.' },
    { id: 'skillful', name: 'Skillful', description: 'You gain proficiency in one skill of your choice.' },
    { id: 'versatile', name: 'Versatile', description: 'You gain an Origin feat of your choice.' },
  ],
  skillProficiencies: ['any'],
}

export const DWARF: Race = {
  id: 'dwarf',
  name: 'Dwarf',
  icon: '⛏️',
  category: 'common',
  description: 'Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. They stand around 4 to 5 feet tall but are so broad and compact that they weigh as much as a human standing nearly two feet taller.',
  sourceBook: { ...SOURCE_BOOKS.PHB2024, page: 158 },
  abilityBonuses: { constitution: 2 },
  size: 'medium',
  speed: 25,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Dwarvish'],
  traits: [
    { id: 'dwarven-resilience', name: 'Dwarven Resilience', description: 'You have advantage on saving throws against poison, and you have resistance against poison damage.' },
    { id: 'dwarven-toughness', name: 'Dwarven Toughness', description: 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.' },
    { id: 'stonecunning', name: 'Stonecunning', description: 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient and add double your proficiency bonus.' },
  ],
  damageResistances: ['poison'],
  weaponProficiencies: ['battleaxe', 'handaxe', 'light-hammer', 'warhammer'],
  subraces: [
    {
      id: 'hill-dwarf',
      name: 'Hill Dwarf',
      icon: '🏔️',
      description: 'Hill dwarves have keen senses, deep intuition, and remarkable resilience. The gold dwarves of Faerûn are hill dwarves.',
      abilityBonuses: { constitution: 2, wisdom: 1 },
      size: 'medium',
      speed: 25,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Dwarvish'],
      traits: [
        { id: 'dwarven-toughness', name: 'Dwarven Toughness', description: 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.' },
      ],
    },
    {
      id: 'mountain-dwarf',
      name: 'Mountain Dwarf',
      icon: '⛰️',
      description: 'Mountain dwarves are strong and hardy, accustomed to a difficult life in rugged terrain. The shield dwarves of Faerûn are mountain dwarves.',
      abilityBonuses: { constitution: 2, strength: 2 },
      size: 'medium',
      speed: 25,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Dwarvish'],
      traits: [
        { id: 'dwarven-armor-training', name: 'Dwarven Armor Training', description: 'You have proficiency with light and medium armor.' },
      ],
      armorProficiencies: ['light', 'medium'],
    },
    {
      id: 'duergar',
      name: 'Duergar (Gray Dwarf)',
      icon: '🌑',
      description: 'Gray dwarves dwell in the Underdark. Their sunlight sensitivity and innate magical abilities reflect their adaptation to life in the depths.',
      abilityBonuses: { constitution: 2, strength: 1 },
      size: 'medium',
      speed: 25,
      vision: 'superiorDarkvision',
      visionRange: 120,
      languages: ['Common', 'Dwarvish', 'Undercommon'],
      traits: [
        { id: 'duergar-resilience', name: 'Duergar Resilience', description: 'You have advantage on saving throws against illusions and against being charmed or paralyzed.' },
        { id: 'sunlight-sensitivity', name: 'Sunlight Sensitivity', description: 'You have disadvantage on attack rolls and Perception checks in direct sunlight.' },
      ],
      spells: [
        { spellId: 'enlarge-reduce', spellName: 'Enlarge/Reduce', levelGained: 3, castingAbility: 'intelligence', usesPerDay: 1 },
        { spellId: 'invisibility', spellName: 'Invisibility', levelGained: 5, castingAbility: 'intelligence', usesPerDay: 1 },
      ],
    },
  ],
}

export const ELF: Race = {
  id: 'elf',
  name: 'Elf',
  icon: '🧝',
  category: 'common',
  description: 'Elves are a magical people of otherworldly grace, living in places of ethereal beauty. They love nature and magic, art and artistry, music and poetry.',
  abilityBonuses: { dexterity: 2 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Elvish'],
  traits: [
    { id: 'fey-ancestry', name: 'Fey Ancestry', description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.' },
    { id: 'trance', name: 'Trance', description: 'Elves don\'t need to sleep. Instead, they meditate deeply for 4 hours a day.' },
    { id: 'keen-senses', name: 'Keen Senses', description: 'You have proficiency in the Perception skill.' },
  ],
  skillProficiencies: ['perception'],
  subraces: [
    {
      id: 'high-elf',
      name: 'High Elf',
      icon: '✨',
      description: 'High elves have a keen mind and a mastery of at least the basics of magic. They are often haughty but not usually to the point of being rude.',
      abilityBonuses: { dexterity: 2, intelligence: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Elvish'],
      traits: [
        { id: 'cantrip', name: 'Cantrip', description: 'You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.' },
        { id: 'extra-language', name: 'Extra Language', description: 'You can speak, read, and write one extra language of your choice.' },
      ],
      weaponProficiencies: ['longsword', 'shortsword', 'longbow', 'shortbow'],
    },
    {
      id: 'wood-elf',
      name: 'Wood Elf',
      icon: '🌲',
      description: 'Wood elves are reclusive and distrustful of non-elves. They have keen senses and intuition, and their fleet feet carry them quickly through their native forests.',
      abilityBonuses: { dexterity: 2, wisdom: 1 },
      size: 'medium',
      speed: 35,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Elvish'],
      traits: [
        { id: 'fleet-of-foot', name: 'Fleet of Foot', description: 'Your base walking speed increases to 35 feet.' },
        { id: 'mask-of-the-wild', name: 'Mask of the Wild', description: 'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.' },
      ],
      weaponProficiencies: ['longsword', 'shortsword', 'longbow', 'shortbow'],
    },
    {
      id: 'drow',
      name: 'Drow (Dark Elf)',
      icon: '🌙',
      description: 'Descended from an earlier subrace of elves, the drow were banished from the surface world for following the goddess Lolth down the path to evil.',
      abilityBonuses: { dexterity: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'superiorDarkvision',
      visionRange: 120,
      languages: ['Common', 'Elvish', 'Undercommon'],
      traits: [
        { id: 'sunlight-sensitivity', name: 'Sunlight Sensitivity', description: 'You have disadvantage on attack rolls and Perception checks in direct sunlight.' },
        { id: 'drow-magic', name: 'Drow Magic', description: 'You know the Dancing Lights cantrip. At 3rd level, Faerie Fire. At 5th level, Darkness.' },
      ],
      spells: [
        { spellId: 'dancing-lights', spellName: 'Dancing Lights', levelGained: 1, castingAbility: 'charisma', usesPerDay: 'atwill' },
        { spellId: 'faerie-fire', spellName: 'Faerie Fire', levelGained: 3, castingAbility: 'charisma', usesPerDay: 1 },
        { spellId: 'darkness', spellName: 'Darkness', levelGained: 5, castingAbility: 'charisma', usesPerDay: 1 },
      ],
      weaponProficiencies: ['rapier', 'shortsword', 'hand-crossbow'],
    },
    {
      id: 'eladrin',
      name: 'Eladrin',
      icon: '🦋',
      description: 'Eladrin are elves native to the Feywild, a realm of beauty, unpredictable emotion, and boundless magic. Their appearance changes with their emotional state.',
      abilityBonuses: { dexterity: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Elvish', 'Sylvan'],
      traits: [
        { id: 'fey-step', name: 'Fey Step', description: 'As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. You can use this trait once per short or long rest.' },
        { id: 'shifting-seasons', name: 'Shifting Seasons', description: 'Your mood influences your appearance. Choose a season: autumn, winter, spring, or summer. You can change your season at the end of a long rest.' },
      ],
    },
    {
      id: 'sea-elf',
      name: 'Sea Elf',
      icon: '🌊',
      category: 'aquatic',
      description: 'Sea elves fell in love with the wild beauty of the ocean in the earliest days of the multiverse. They adapted to life in the depths and can breathe underwater.',
      abilityBonuses: { dexterity: 2, constitution: 1 },
      size: 'medium',
      speed: 30,
      swimSpeed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Elvish', 'Aquan'],
      traits: [
        { id: 'child-of-the-sea', name: 'Child of the Sea', description: 'You can breathe air and water, and you have a swimming speed equal to your walking speed.' },
        { id: 'friend-of-the-sea', name: 'Friend of the Sea', description: 'You can communicate simple ideas with beasts that can breathe water.' },
      ],
      weaponProficiencies: ['spear', 'trident', 'light-crossbow', 'net'],
    },
    {
      id: 'shadar-kai',
      name: 'Shadar-kai',
      icon: '💀',
      description: 'Shadar-kai are elves who serve the Raven Queen in the Shadowfell. They\'ve become cold and stoic, bleached of color by the shadowy realm.',
      abilityBonuses: { dexterity: 2, constitution: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Elvish'],
      traits: [
        { id: 'necrotic-resistance', name: 'Necrotic Resistance', description: 'You have resistance to necrotic damage.' },
        { id: 'blessing-of-the-raven-queen', name: 'Blessing of the Raven Queen', description: 'As a bonus action, you can magically teleport up to 30 feet. You gain resistance to all damage until the start of your next turn.' },
      ],
      damageResistances: ['necrotic'],
    },
  ],
}

export const HALFLING: Race = {
  id: 'halfling',
  name: 'Halfling',
  icon: '🦶',
  category: 'common',
  description: 'The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense. Standing about 3 feet tall, they appear relatively harmless.',
  abilityBonuses: { dexterity: 2 },
  size: 'small',
  speed: 25,
  vision: 'normal',
  languages: ['Common', 'Halfling'],
  traits: [
    { id: 'lucky', name: 'Lucky', description: 'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.' },
    { id: 'brave', name: 'Brave', description: 'You have advantage on saving throws against being frightened.' },
    { id: 'halfling-nimbleness', name: 'Halfling Nimbleness', description: 'You can move through the space of any creature that is of a size larger than yours.' },
  ],
  subraces: [
    {
      id: 'lightfoot-halfling',
      name: 'Lightfoot Halfling',
      icon: '👣',
      description: 'Lightfoot halflings are more prone to wanderlust than other halflings. They are the most common halfling variety.',
      abilityBonuses: { dexterity: 2, charisma: 1 },
      size: 'small',
      speed: 25,
      vision: 'normal',
      languages: ['Common', 'Halfling'],
      traits: [
        { id: 'naturally-stealthy', name: 'Naturally Stealthy', description: 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.' },
      ],
    },
    {
      id: 'stout-halfling',
      name: 'Stout Halfling',
      icon: '🍺',
      description: 'Stout halflings are hardier than average and have some resistance to poison. Some say stouts have dwarven blood.',
      abilityBonuses: { dexterity: 2, constitution: 1 },
      size: 'small',
      speed: 25,
      vision: 'normal',
      languages: ['Common', 'Halfling'],
      traits: [
        { id: 'stout-resilience', name: 'Stout Resilience', description: 'You have advantage on saving throws against poison, and you have resistance against poison damage.' },
      ],
      damageResistances: ['poison'],
    },
    {
      id: 'ghostwise-halfling',
      name: 'Ghostwise Halfling',
      icon: '👁️',
      description: 'Ghostwise halflings trace their ancestry back to a war among halfling tribes that drove them to become reclusive. They possess a talent for telepathy.',
      abilityBonuses: { dexterity: 2, wisdom: 1 },
      size: 'small',
      speed: 25,
      vision: 'normal',
      languages: ['Common', 'Halfling'],
      traits: [
        { id: 'silent-speech', name: 'Silent Speech', description: 'You can speak telepathically to any creature within 30 feet of you. The creature understands you only if you share a language.' },
      ],
    },
  ],
}

export const GNOME: Race = {
  id: 'gnome',
  name: 'Gnome',
  icon: '🧙',
  category: 'common',
  description: 'A gnome\'s energy and enthusiasm for living shines through every inch of their tiny body. They take delight in life, enjoying every moment of invention, exploration, and creation.',
  sourceBook: { ...SOURCE_BOOKS.PHB2024, page: 162 },
  abilityBonuses: { intelligence: 2 },
  size: 'small',
  speed: 25,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Gnomish'],
  traits: [
    { id: 'gnome-cunning', name: 'Gnome Cunning', description: 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.' },
  ],
  subraces: [
    {
      id: 'forest-gnome',
      name: 'Forest Gnome',
      icon: '🍄',
      description: 'Forest gnomes have a knack for illusion and an affinity with small animals. They are the most reclusive of gnomes.',
      sourceBook: { ...SOURCE_BOOKS.PHB, page: 37 },
      abilityBonuses: { intelligence: 2, dexterity: 1 },
      size: 'small',
      speed: 25,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Gnomish'],
      traits: [
        { id: 'natural-illusionist', name: 'Natural Illusionist', description: 'You know the Minor Illusion cantrip. Intelligence is your spellcasting ability for it.' },
        { id: 'speak-with-small-beasts', name: 'Speak with Small Beasts', description: 'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts.' },
      ],
    },
    {
      id: 'rock-gnome',
      name: 'Rock Gnome',
      icon: '⚙️',
      description: 'Rock gnomes are natural inventors and are the most common gnome variety. They are endlessly curious and innovative.',
      sourceBook: { ...SOURCE_BOOKS.PHB, page: 37 },
      abilityBonuses: { intelligence: 2, constitution: 1 },
      size: 'small',
      speed: 25,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Gnomish'],
      traits: [
        { id: 'artificers-lore', name: 'Artificer\'s Lore', description: 'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, add twice your proficiency bonus.' },
        { id: 'tinker', name: 'Tinker', description: 'You can create tiny clockwork devices that last 24 hours. Clockwork Toy, Fire Starter, or Music Box.' },
      ],
      toolProficiencies: ['tinker\'s tools'],
    },
    {
      id: 'deep-gnome',
      name: 'Deep Gnome (Svirfneblin)',
      icon: '💎',
      description: 'Deep gnomes, or svirfneblin, live in the Underdark. They are masters of stealth and have superior darkvision.',
      sourceBook: { ...SOURCE_BOOKS.MPMM, page: 11 },
      abilityBonuses: { intelligence: 2, dexterity: 1 },
      size: 'small',
      speed: 25,
      vision: 'superiorDarkvision',
      visionRange: 120,
      languages: ['Common', 'Gnomish', 'Undercommon'],
      traits: [
        { id: 'stone-camouflage', name: 'Stone Camouflage', description: 'You have advantage on Dexterity (Stealth) checks to hide in rocky terrain.' },
        { id: 'svirfneblin-magic', name: 'Svirfneblin Magic', description: 'You can cast Nondetection on yourself at will, without needing a material component.' },
      ],
    },
  ],
}

export const HALF_ELF: Race = {
  id: 'half-elf',
  name: 'Half-Elf',
  icon: '🧝‍♂️',
  category: 'common',
  description: 'Half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition, tempered by the refined senses, love of nature, and artistic tastes of the elves.',
  abilityBonuses: { charisma: 2, constitution: 1, wisdom: 1 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Elvish'],
  traits: [
    { id: 'fey-ancestry', name: 'Fey Ancestry', description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.' },
    { id: 'skill-versatility', name: 'Skill Versatility', description: 'You gain proficiency in two skills of your choice.' },
  ],
}

export const HALF_ORC: Race = {
  id: 'half-orc',
  name: 'Half-Orc',
  icon: '👹',
  category: 'common',
  description: 'Half-orcs exhibit a blend of orcish and human characteristics. They are not as bestial as full orcs but still have gray skin, sloping foreheads, and prominent teeth.',
  abilityBonuses: { strength: 2, constitution: 1 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Orc'],
  traits: [
    { id: 'relentless-endurance', name: 'Relentless Endurance', description: 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can\'t use this feature again until you finish a long rest.' },
    { id: 'savage-attacks', name: 'Savage Attacks', description: 'When you score a critical hit with a melee weapon attack, you can roll one of the weapon\'s damage dice one additional time and add it to the extra damage.' },
    { id: 'menacing', name: 'Menacing', description: 'You gain proficiency in the Intimidation skill.' },
  ],
  skillProficiencies: ['intimidation'],
}

export const DRAGONBORN: Race = {
  id: 'dragonborn',
  name: 'Dragonborn',
  icon: '🐉',
  category: 'common',
  description: 'Dragonborn look very much like dragons standing erect in humanoid form, though they lack wings or a tail. They are tall and strongly built, with dragon-like scales.',
  abilityBonuses: { strength: 2, charisma: 1 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common', 'Draconic'],
  traits: [
    { id: 'breath-weapon', name: 'Breath Weapon', description: 'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type. DC = 8 + Constitution modifier + proficiency bonus.' },
    { id: 'damage-resistance', name: 'Damage Resistance', description: 'You have resistance to the damage type associated with your draconic ancestry.' },
  ],
  subraces: [
    {
      id: 'black-dragonborn',
      name: 'Black Dragonborn',
      icon: '🖤',
      description: 'Black dragonborn breathe acid in a 5 by 30 ft. line.',
      abilityBonuses: { strength: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Draconic'],
      traits: [
        { id: 'acid-breath', name: 'Acid Breath', description: '5 by 30 ft. line (Dex. save). 2d6 acid damage, increases with level.' },
      ],
      damageResistances: ['acid'],
    },
    {
      id: 'blue-dragonborn',
      name: 'Blue Dragonborn',
      icon: '💙',
      description: 'Blue dragonborn breathe lightning in a 5 by 30 ft. line.',
      abilityBonuses: { strength: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Draconic'],
      traits: [
        { id: 'lightning-breath', name: 'Lightning Breath', description: '5 by 30 ft. line (Dex. save). 2d6 lightning damage, increases with level.' },
      ],
      damageResistances: ['lightning'],
    },
    {
      id: 'brass-dragonborn',
      name: 'Brass Dragonborn',
      icon: '🟤',
      description: 'Brass dragonborn breathe fire in a 5 by 30 ft. line.',
      abilityBonuses: { strength: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Draconic'],
      traits: [
        { id: 'fire-breath-line', name: 'Fire Breath', description: '5 by 30 ft. line (Dex. save). 2d6 fire damage, increases with level.' },
      ],
      damageResistances: ['fire'],
    },
    {
      id: 'bronze-dragonborn',
      name: 'Bronze Dragonborn',
      icon: '🟠',
      description: 'Bronze dragonborn breathe lightning in a 5 by 30 ft. line.',
      abilityBonuses: { strength: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Draconic'],
      traits: [
        { id: 'lightning-breath', name: 'Lightning Breath', description: '5 by 30 ft. line (Dex. save). 2d6 lightning damage, increases with level.' },
      ],
      damageResistances: ['lightning'],
    },
    {
      id: 'copper-dragonborn',
      name: 'Copper Dragonborn',
      icon: '🧡',
      description: 'Copper dragonborn breathe acid in a 5 by 30 ft. line.',
      abilityBonuses: { strength: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Draconic'],
      traits: [
        { id: 'acid-breath', name: 'Acid Breath', description: '5 by 30 ft. line (Dex. save). 2d6 acid damage, increases with level.' },
      ],
      damageResistances: ['acid'],
    },
    {
      id: 'gold-dragonborn',
      name: 'Gold Dragonborn',
      icon: '💛',
      description: 'Gold dragonborn breathe fire in a 15 ft. cone.',
      abilityBonuses: { strength: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Draconic'],
      traits: [
        { id: 'fire-breath-cone', name: 'Fire Breath', description: '15 ft. cone (Dex. save). 2d6 fire damage, increases with level.' },
      ],
      damageResistances: ['fire'],
    },
    {
      id: 'green-dragonborn',
      name: 'Green Dragonborn',
      icon: '💚',
      description: 'Green dragonborn breathe poison in a 15 ft. cone.',
      abilityBonuses: { strength: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Draconic'],
      traits: [
        { id: 'poison-breath', name: 'Poison Breath', description: '15 ft. cone (Con. save). 2d6 poison damage, increases with level.' },
      ],
      damageResistances: ['poison'],
    },
    {
      id: 'red-dragonborn',
      name: 'Red Dragonborn',
      icon: '❤️',
      description: 'Red dragonborn breathe fire in a 15 ft. cone.',
      abilityBonuses: { strength: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Draconic'],
      traits: [
        { id: 'fire-breath-cone', name: 'Fire Breath', description: '15 ft. cone (Dex. save). 2d6 fire damage, increases with level.' },
      ],
      damageResistances: ['fire'],
    },
    {
      id: 'silver-dragonborn',
      name: 'Silver Dragonborn',
      icon: '🤍',
      description: 'Silver dragonborn breathe cold in a 15 ft. cone.',
      abilityBonuses: { strength: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Draconic'],
      traits: [
        { id: 'cold-breath', name: 'Cold Breath', description: '15 ft. cone (Con. save). 2d6 cold damage, increases with level.' },
      ],
      damageResistances: ['cold'],
    },
    {
      id: 'white-dragonborn',
      name: 'White Dragonborn',
      icon: '🩶',
      description: 'White dragonborn breathe cold in a 15 ft. cone.',
      abilityBonuses: { strength: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Draconic'],
      traits: [
        { id: 'cold-breath', name: 'Cold Breath', description: '15 ft. cone (Con. save). 2d6 cold damage, increases with level.' },
      ],
      damageResistances: ['cold'],
    },
  ],
}

export const TIEFLING: Race = {
  id: 'tiefling',
  name: 'Tiefling',
  icon: '😈',
  category: 'common',
  description: 'Tieflings are derived from human bloodlines touched by the power of the Nine Hells. They might look like humans, but their infernal heritage has left a clear imprint.',
  abilityBonuses: { charisma: 2, intelligence: 1 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Infernal'],
  traits: [
    { id: 'hellish-resistance', name: 'Hellish Resistance', description: 'You have resistance to fire damage.' },
  ],
  damageResistances: ['fire'],
  spells: [
    { spellId: 'thaumaturgy', spellName: 'Thaumaturgy', levelGained: 1, castingAbility: 'charisma', usesPerDay: 'atwill' },
    { spellId: 'hellish-rebuke', spellName: 'Hellish Rebuke', levelGained: 3, castingAbility: 'charisma', usesPerDay: 1 },
    { spellId: 'darkness', spellName: 'Darkness', levelGained: 5, castingAbility: 'charisma', usesPerDay: 1 },
  ],
  subraces: [
    {
      id: 'asmodeus-tiefling',
      name: 'Asmodeus Tiefling',
      icon: '👿',
      description: 'The tieflings connected to Nessus command the power of fire and darkness.',
      abilityBonuses: { charisma: 2, intelligence: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Infernal'],
      traits: [
        { id: 'infernal-legacy', name: 'Infernal Legacy', description: 'Thaumaturgy cantrip. Hellish Rebuke at 3rd level. Darkness at 5th level.' },
      ],
    },
    {
      id: 'zariel-tiefling',
      name: 'Zariel Tiefling',
      icon: '⚔️',
      description: 'Tieflings with a blood tie to Zariel are stronger and have a legacy of martial might.',
      abilityBonuses: { charisma: 2, strength: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Infernal'],
      traits: [
        { id: 'legacy-of-avernus', name: 'Legacy of Avernus', description: 'Thaumaturgy cantrip. Searing Smite at 3rd level. Branding Smite at 5th level.' },
      ],
    },
    {
      id: 'levistus-tiefling',
      name: 'Levistus Tiefling',
      icon: '❄️',
      description: 'Tieflings tied to the archdevil Levistus wield cold magic and ice.',
      abilityBonuses: { charisma: 2, constitution: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Infernal'],
      traits: [
        { id: 'legacy-of-stygia', name: 'Legacy of Stygia', description: 'Ray of Frost cantrip. Armor of Agathys at 3rd level. Darkness at 5th level.' },
      ],
    },
  ],
}

// ============================================================================
// EXOTIC RACES
// ============================================================================

export const GOLIATH: Race = {
  id: 'goliath',
  name: 'Goliath',
  icon: '🗿',
  category: 'exotic',
  description: 'Goliaths are massive humanoids who live in the highest mountain peaks. Competitive and fair-minded, they value personal achievement and self-sufficiency.',
  abilityBonuses: { strength: 2, constitution: 1 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common', 'Giant'],
  traits: [
    { id: 'natural-athlete', name: 'Natural Athlete', description: 'You have proficiency in the Athletics skill.' },
    { id: 'stones-endurance', name: 'Stone\'s Endurance', description: 'You can use your reaction to roll a d12 and add your Constitution modifier to reduce incoming damage. Once per short or long rest.' },
    { id: 'powerful-build', name: 'Powerful Build', description: 'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.' },
    { id: 'mountain-born', name: 'Mountain Born', description: 'You have resistance to cold damage. You\'re acclimated to high altitude.' },
  ],
  damageResistances: ['cold'],
  skillProficiencies: ['athletics'],
}

export const AASIMAR: Race = {
  id: 'aasimar',
  name: 'Aasimar',
  icon: '😇',
  category: 'planar',
  description: 'Aasimar bear within their souls the light of the heavens. They are descended from humans with a touch of the power of Mount Celestia, the divine realm of many lawful good deities.',
  sourceBook: { ...SOURCE_BOOKS.MPMM, page: 7 },
  abilityBonuses: { charisma: 2 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Celestial'],
  traits: [
    { id: 'celestial-resistance', name: 'Celestial Resistance', description: 'You have resistance to necrotic damage and radiant damage.' },
    { id: 'healing-hands', name: 'Healing Hands', description: 'As an action, you can touch a creature and heal hit points equal to your level. Once per long rest.' },
    { id: 'light-bearer', name: 'Light Bearer', description: 'You know the Light cantrip. Charisma is your spellcasting ability for it.' },
  ],
  damageResistances: ['necrotic', 'radiant'],
  subraces: [
    {
      id: 'protector-aasimar',
      name: 'Protector Aasimar',
      icon: '🛡️',
      description: 'Protector aasimar are charged by the powers of good to guard the weak and strike at evil.',
      sourceBook: { ...SOURCE_BOOKS.VGM, page: 105 },
      abilityBonuses: { charisma: 2, wisdom: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Celestial'],
      traits: [
        { id: 'radiant-soul', name: 'Radiant Soul', description: 'Starting at 3rd level, you can unleash divine energy, gaining flying speed and dealing extra radiant damage.' },
      ],
    },
    {
      id: 'scourge-aasimar',
      name: 'Scourge Aasimar',
      icon: '🔥',
      description: 'Scourge aasimar are imbued with a divine energy that blazes intensely within them.',
      sourceBook: { ...SOURCE_BOOKS.VGM, page: 105 },
      abilityBonuses: { charisma: 2, constitution: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Celestial'],
      traits: [
        { id: 'radiant-consumption', name: 'Radiant Consumption', description: 'Starting at 3rd level, you can unleash divine energy, dealing radiant damage to yourself and nearby enemies.' },
      ],
    },
    {
      id: 'fallen-aasimar',
      name: 'Fallen Aasimar',
      icon: '🖤',
      description: 'An aasimar who was touched by dark powers as a youth or who turns to evil in early adulthood can become one of the fallen.',
      sourceBook: { ...SOURCE_BOOKS.VGM, page: 105 },
      abilityBonuses: { charisma: 2, strength: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Celestial'],
      traits: [
        { id: 'necrotic-shroud', name: 'Necrotic Shroud', description: 'Starting at 3rd level, you can unleash divine energy, frightening nearby creatures and dealing extra necrotic damage.' },
      ],
    },
  ],
}

export const GENASI: Race = {
  id: 'genasi',
  name: 'Genasi',
  icon: '🌀',
  category: 'planar',
  description: 'Genasi carry the power of the Elemental Planes in their blood. They are the offspring of genies and mortals, inheriting some elemental traits.',
  abilityBonuses: { constitution: 2 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common', 'Primordial'],
  traits: [],
  subraces: [
    {
      id: 'air-genasi',
      name: 'Air Genasi',
      icon: '💨',
      category: 'aerial',
      description: 'Air genasi are proud and aloof, believing themselves superior to other genasi. They can hold their breath indefinitely.',
      abilityBonuses: { constitution: 2, dexterity: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Primordial'],
      traits: [
        { id: 'unending-breath', name: 'Unending Breath', description: 'You can hold your breath indefinitely while you\'re not incapacitated.' },
        { id: 'mingle-with-the-wind', name: 'Mingle with the Wind', description: 'You can cast Levitate once per long rest without material components. Constitution is your spellcasting ability.' },
      ],
    },
    {
      id: 'earth-genasi',
      name: 'Earth Genasi',
      icon: '🪨',
      description: 'Earth genasi are patient and stubborn. Their skin can be the color of stone or earth, sometimes with small gems embedded.',
      abilityBonuses: { constitution: 2, strength: 1 },
      size: 'medium',
      speed: 30,
      vision: 'normal',
      languages: ['Common', 'Primordial'],
      traits: [
        { id: 'earth-walk', name: 'Earth Walk', description: 'You can move across difficult terrain made of earth or stone without expending extra movement.' },
        { id: 'merge-with-stone', name: 'Merge with Stone', description: 'You can cast Pass without Trace once per long rest without material components.' },
      ],
    },
    {
      id: 'fire-genasi',
      name: 'Fire Genasi',
      icon: '🔥',
      description: 'Fire genasi are hot-tempered and quick to anger. Flames flicker through their hair and their skin glows like embers.',
      abilityBonuses: { constitution: 2, intelligence: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common', 'Primordial'],
      traits: [
        { id: 'fire-resistance', name: 'Fire Resistance', description: 'You have resistance to fire damage.' },
        { id: 'reach-to-the-blaze', name: 'Reach to the Blaze', description: 'You know the Produce Flame cantrip. At 3rd level, you can cast Burning Hands once per long rest.' },
      ],
      damageResistances: ['fire'],
    },
    {
      id: 'water-genasi',
      name: 'Water Genasi',
      icon: '💧',
      category: 'aquatic',
      description: 'Water genasi are patient and independent. Their skin has a bluish tint and they can breathe underwater.',
      abilityBonuses: { constitution: 2, wisdom: 1 },
      size: 'medium',
      speed: 30,
      swimSpeed: 30,
      vision: 'normal',
      languages: ['Common', 'Primordial'],
      traits: [
        { id: 'amphibious', name: 'Amphibious', description: 'You can breathe air and water.' },
        { id: 'swim', name: 'Swim', description: 'You have a swimming speed of 30 feet.' },
        { id: 'call-to-the-wave', name: 'Call to the Wave', description: 'You know the Shape Water cantrip. At 3rd level, you can cast Create or Destroy Water once per long rest.' },
      ],
    },
  ],
}

export const TABAXI: Race = {
  id: 'tabaxi',
  name: 'Tabaxi',
  icon: '🐱',
  category: 'exotic',
  description: 'Tabaxi are cat-like humanoids driven by curiosity to collect interesting artifacts, gather tales, and lay eyes on all the world\'s wonders.',
  abilityBonuses: { dexterity: 2, charisma: 1 },
  size: 'medium',
  speed: 30,
  climbSpeed: 20,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common'],
  traits: [
    { id: 'feline-agility', name: 'Feline Agility', description: 'When you move on your turn in combat, you can double your speed until the end of the turn. You can\'t use this again until you move 0 feet on one of your turns.' },
    { id: 'cats-claws', name: 'Cat\'s Claws', description: 'You have a climbing speed of 20 feet. Your claws are natural weapons dealing 1d4 slashing damage.' },
    { id: 'cats-talent', name: 'Cat\'s Talent', description: 'You have proficiency in the Perception and Stealth skills.' },
  ],
  skillProficiencies: ['perception', 'stealth'],
}

export const TORTLE: Race = {
  id: 'tortle',
  name: 'Tortle',
  icon: '🐢',
  category: 'exotic',
  description: 'Tortles are turtle-like humanoids with a walking pace and sedentary nature. They carry their homes on their backs and are naturally armored.',
  abilityBonuses: { strength: 2, wisdom: 1 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common', 'Aquan'],
  traits: [
    { id: 'natural-armor', name: 'Natural Armor', description: 'Your shell provides a base AC of 17 (your Dexterity modifier doesn\'t affect this number). You can\'t wear armor, but shields work normally.' },
    { id: 'shell-defense', name: 'Shell Defense', description: 'You can withdraw into your shell as an action. Until you emerge, you gain +4 AC, and you have advantage on Strength and Constitution saving throws. While in your shell, you are prone and your speed is 0.' },
    { id: 'hold-breath', name: 'Hold Breath', description: 'You can hold your breath for up to 1 hour at a time.' },
    { id: 'claws', name: 'Claws', description: 'Your claws are natural weapons dealing 1d4 slashing damage.' },
  ],
}

export const FIRBOLG: Race = {
  id: 'firbolg',
  name: 'Firbolg',
  icon: '🌿',
  category: 'exotic',
  description: 'Firbolgs are gentle giants who live in remote forest strongholds. They are reclusive fey-like creatures who prefer peace and nature.',
  abilityBonuses: { wisdom: 2, strength: 1 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common', 'Elvish', 'Giant'],
  traits: [
    { id: 'firbolg-magic', name: 'Firbolg Magic', description: 'You can cast Detect Magic and Disguise Self once each per short or long rest. When you use Disguise Self, you can seem up to 3 feet shorter.' },
    { id: 'hidden-step', name: 'Hidden Step', description: 'As a bonus action, you can turn invisible until the start of your next turn. Once per short or long rest.' },
    { id: 'powerful-build', name: 'Powerful Build', description: 'You count as one size larger when determining your carrying capacity.' },
    { id: 'speech-of-beast-and-leaf', name: 'Speech of Beast and Leaf', description: 'You can communicate in a limited manner with beasts and plants.' },
  ],
}

export const KENKU: Race = {
  id: 'kenku',
  name: 'Kenku',
  icon: '🐦',
  category: 'exotic',
  description: 'Kenku are cursed crow-like humanoids who lost their ability to fly and their creative voice. They can only mimic sounds they have heard.',
  abilityBonuses: { dexterity: 2, wisdom: 1 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common', 'Auran'],
  traits: [
    { id: 'expert-forgery', name: 'Expert Forgery', description: 'You can duplicate other creatures\' handwriting and craftwork. You have advantage on all checks made to produce forgeries or duplicates.' },
    { id: 'kenku-training', name: 'Kenku Training', description: 'You are proficient in your choice of two of the following skills: Acrobatics, Deception, Stealth, and Sleight of Hand.' },
    { id: 'mimicry', name: 'Mimicry', description: 'You can mimic sounds you have heard, including voices. A creature that hears the sounds can tell they are imitations with a successful Wisdom (Insight) check.' },
  ],
}

export const LIZARDFOLK: Race = {
  id: 'lizardfolk',
  name: 'Lizardfolk',
  icon: '🦎',
  category: 'exotic',
  description: 'Lizardfolk are cold-blooded reptilian humanoids who view the world through a survival-focused lens. They are alien in thought and emotion to most humanoids.',
  abilityBonuses: { constitution: 2, wisdom: 1 },
  size: 'medium',
  speed: 30,
  swimSpeed: 30,
  vision: 'normal',
  languages: ['Common', 'Draconic'],
  traits: [
    { id: 'bite', name: 'Bite', description: 'Your fanged maw is a natural weapon dealing 1d6 piercing damage.' },
    { id: 'cunning-artisan', name: 'Cunning Artisan', description: 'During a short rest, you can harvest bone and hide from a slain creature to create a shield, club, javelin, or 1d4 darts or blowgun needles.' },
    { id: 'hold-breath', name: 'Hold Breath', description: 'You can hold your breath for up to 15 minutes at a time.' },
    { id: 'natural-armor', name: 'Natural Armor', description: 'When you aren\'t wearing armor, your AC is 13 + your Dexterity modifier.' },
    { id: 'hungry-jaws', name: 'Hungry Jaws', description: 'In battle, you can throw yourself into a feeding frenzy. As a bonus action, make a bite attack. If you hit, you gain temporary hit points equal to your Constitution modifier.' },
  ],
  skillProficiencies: ['survival', 'nature'],
}

// ============================================================================
// AERIAL RACES
// ============================================================================

export const AARAKOCRA: Race = {
  id: 'aarakocra',
  name: 'Aarakocra',
  icon: '🦅',
  category: 'aerial',
  description: 'Aarakocra are bird-like humanoids native to the Elemental Plane of Air. They have powerful wings that allow them to fly at incredible speeds.',
  abilityBonuses: { dexterity: 2, wisdom: 1 },
  size: 'medium',
  speed: 25,
  flySpeed: 50,
  vision: 'normal',
  languages: ['Common', 'Aarakocra', 'Auran'],
  traits: [
    { id: 'flight', name: 'Flight', description: 'You have a flying speed of 50 feet. To use this speed, you can\'t be wearing medium or heavy armor.' },
    { id: 'talons', name: 'Talons', description: 'Your talons are natural weapons dealing 1d4 slashing damage on unarmed strikes.' },
  ],
}

export const OWLIN: Race = {
  id: 'owlin',
  name: 'Owlin',
  icon: '🦉',
  category: 'aerial',
  description: 'Owlins are owl-like humanoids who hail from the Feywild. They are known for their wisdom and their ability to fly silently through the night sky.',
  sourceBook: { ...SOURCE_BOOKS.SAC, page: 29 },
  abilityBonuses: { wisdom: 2, dexterity: 1 },
  size: 'medium',
  speed: 30,
  flySpeed: 30,
  vision: 'darkvision',
  visionRange: 120,
  languages: ['Common'],
  traits: [
    { id: 'flight', name: 'Flight', description: 'You have a flying speed equal to your walking speed. To use this speed, you can\'t be wearing medium or heavy armor.' },
    { id: 'silent-feathers', name: 'Silent Feathers', description: 'You have proficiency in the Stealth skill.' },
  ],
  skillProficiencies: ['stealth'],
}

export const FAIRY: Race = {
  id: 'fairy',
  name: 'Fairy',
  icon: '🧚',
  category: 'aerial',
  description: 'Fairies are small fey creatures from the Feywild, known for their mischievous nature and innate magical abilities.',
  sourceBook: { ...SOURCE_BOOKS.WBTW, page: 12 },
  abilityBonuses: { charisma: 2, dexterity: 1 },
  size: 'small',
  speed: 30,
  flySpeed: 30,
  vision: 'normal',
  languages: ['Common', 'Sylvan'],
  traits: [
    { id: 'fairy-magic', name: 'Fairy Magic', description: 'You know the Druidcraft cantrip. At 3rd level, you can cast Faerie Fire. At 5th level, you can cast Enlarge/Reduce on yourself.' },
    { id: 'flight', name: 'Flight', description: 'You have a flying speed equal to your walking speed. You can\'t use this flying speed while wearing medium or heavy armor.' },
  ],
}

// ============================================================================
// AQUATIC RACES
// ============================================================================

export const TRITON: Race = {
  id: 'triton',
  name: 'Triton',
  icon: '🧜',
  category: 'aquatic',
  description: 'Tritons are proud aquatic humanoids who hail from the Elemental Plane of Water. They view themselves as guardians of the ocean depths.',
  abilityBonuses: { strength: 1, constitution: 1, charisma: 1 },
  size: 'medium',
  speed: 30,
  swimSpeed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Primordial'],
  traits: [
    { id: 'amphibious', name: 'Amphibious', description: 'You can breathe air and water.' },
    { id: 'control-air-and-water', name: 'Control Air and Water', description: 'At 1st level, you can cast Fog Cloud. At 3rd level, Gust of Wind. At 5th level, Wall of Water. Charisma is your spellcasting ability.' },
    { id: 'emissary-of-the-sea', name: 'Emissary of the Sea', description: 'Aquatic beasts can understand your speech.' },
    { id: 'guardians-of-the-depths', name: 'Guardians of the Depths', description: 'You have resistance to cold damage and ignore any drawbacks from deep, underwater environments.' },
  ],
  damageResistances: ['cold'],
}

export const LOCATHAH: Race = {
  id: 'locathah',
  name: 'Locathah',
  icon: '🐟',
  category: 'aquatic',
  description: 'Locathah are fish-like humanoids who live in underwater communities. They are known for their resilience and determination.',
  abilityBonuses: { strength: 2, dexterity: 1 },
  size: 'medium',
  speed: 30,
  swimSpeed: 30,
  vision: 'normal',
  languages: ['Common', 'Aquan'],
  traits: [
    { id: 'natural-armor', name: 'Natural Armor', description: 'You have tough, scaly skin. When you aren\'t wearing armor, your AC is 12 + your Dexterity modifier.' },
    { id: 'observant-and-athletic', name: 'Observant & Athletic', description: 'You have proficiency in the Athletics and Perception skills.' },
    { id: 'leviathan-will', name: 'Leviathan Will', description: 'You have advantage on saving throws against being charmed, frightened, paralyzed, poisoned, stunned, or put to sleep.' },
    { id: 'limited-amphibiousness', name: 'Limited Amphibiousness', description: 'You can breathe air and water, but you need to be submerged in water once every 4 hours or you begin to suffocate.' },
  ],
  skillProficiencies: ['athletics', 'perception'],
}

// ============================================================================
// MONSTROUS RACES
// ============================================================================

export const GOBLIN: Race = {
  id: 'goblin',
  name: 'Goblin',
  icon: '👺',
  category: 'monstrous',
  description: 'Goblins are small, black-hearted humanoids that lair in despoiled dungeons and other dismal settings. They are crafty and tricky.',
  abilityBonuses: { dexterity: 2, constitution: 1 },
  size: 'small',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Goblin'],
  traits: [
    { id: 'fury-of-the-small', name: 'Fury of the Small', description: 'When you damage a creature with an attack or spell that is of a larger size, you can deal extra damage equal to your level. Once per short or long rest.' },
    { id: 'nimble-escape', name: 'Nimble Escape', description: 'You can take the Disengage or Hide action as a bonus action on each of your turns.' },
  ],
}

export const HOBGOBLIN: Race = {
  id: 'hobgoblin',
  name: 'Hobgoblin',
  icon: '⚔️',
  category: 'monstrous',
  description: 'Hobgoblins are larger and more disciplined than their goblin cousins. They are militaristic and organized, valuing honor and martial prowess.',
  abilityBonuses: { constitution: 2, intelligence: 1 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Goblin'],
  traits: [
    { id: 'martial-training', name: 'Martial Training', description: 'You are proficient with two martial weapons of your choice and with light armor.' },
    { id: 'saving-face', name: 'Saving Face', description: 'When you miss with an attack roll or fail an ability check or saving throw, you can gain a bonus equal to the number of allies you can see within 30 feet (max +5). Once per short or long rest.' },
  ],
  armorProficiencies: ['light'],
}

export const BUGBEAR: Race = {
  id: 'bugbear',
  name: 'Bugbear',
  icon: '🐻',
  category: 'monstrous',
  description: 'Bugbears are the hulking cousins of goblins and hobgoblins. They are stealthy and brutal, perfect ambush predators.',
  abilityBonuses: { strength: 2, dexterity: 1 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Goblin'],
  traits: [
    { id: 'long-limbed', name: 'Long-Limbed', description: 'When you make a melee attack on your turn, your reach for it is 5 feet greater than normal.' },
    { id: 'powerful-build', name: 'Powerful Build', description: 'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.' },
    { id: 'sneaky', name: 'Sneaky', description: 'You are proficient in the Stealth skill.' },
    { id: 'surprise-attack', name: 'Surprise Attack', description: 'If you hit a creature that is surprised, that hit deals an extra 2d6 damage.' },
  ],
  skillProficiencies: ['stealth'],
}

export const ORC: Race = {
  id: 'orc',
  name: 'Orc',
  icon: '👾',
  category: 'monstrous',
  description: 'Orcs are savage raiders and pillagers with stooped postures, low foreheads, and piggish faces with prominent lower canines.',
  abilityBonuses: { strength: 2, constitution: 1 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Orc'],
  traits: [
    { id: 'aggressive', name: 'Aggressive', description: 'As a bonus action, you can move up to your speed toward an enemy you can see or hear. You must end this move closer to the enemy.' },
    { id: 'primal-intuition', name: 'Primal Intuition', description: 'You have proficiency in two of: Animal Handling, Insight, Intimidation, Medicine, Nature, Perception, and Survival.' },
    { id: 'powerful-build', name: 'Powerful Build', description: 'You count as one size larger when determining your carrying capacity.' },
  ],
}

export const MINOTAUR: Race = {
  id: 'minotaur',
  name: 'Minotaur',
  icon: '🐂',
  category: 'monstrous',
  description: 'Minotaurs are barrel-chested humanoids with heads resembling those of bulls. They are known for their fierce temper and formidable presence.',
  abilityBonuses: { strength: 2, constitution: 1 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common', 'Minotaur'],
  traits: [
    { id: 'horns', name: 'Horns', description: 'Your horns are natural melee weapons dealing 1d6 piercing damage. When you use the Dash action and move at least 20 feet, you can make one melee attack with your horns as a bonus action.' },
    { id: 'goring-rush', name: 'Goring Rush', description: 'Immediately after you use the Dash action and move at least 20 feet, you can make one melee attack with your horns as a bonus action.' },
    { id: 'hammering-horns', name: 'Hammering Horns', description: 'Immediately after you hit a creature with a melee attack as part of the Attack action, you can attempt to push that target. The target must succeed on a Strength saving throw (DC 8 + Prof + STR mod) or be pushed up to 10 feet away.' },
    { id: 'labyrinthine-recall', name: 'Labyrinthine Recall', description: 'You can perfectly recall any path you have traveled.' },
  ],
}

export const CENTAUR: Race = {
  id: 'centaur',
  name: 'Centaur',
  icon: '🏇',
  category: 'monstrous',
  description: 'Centaurs have the upper body of a humanoid and the lower body of a large horse. They are swift and strong, roaming wild places in thundering herds.',
  abilityBonuses: { strength: 2, wisdom: 1 },
  size: 'medium',
  speed: 40,
  vision: 'normal',
  languages: ['Common', 'Sylvan'],
  traits: [
    { id: 'fey', name: 'Fey', description: 'Your creature type is fey, rather than humanoid.' },
    { id: 'charge', name: 'Charge', description: 'If you move at least 30 feet straight toward a target and then hit it with a melee weapon attack, you deal an extra 1d6 damage.' },
    { id: 'equine-build', name: 'Equine Build', description: 'You count as one size larger when determining your carrying capacity. Climbing costs you 4 feet per 1 foot moved.' },
    { id: 'hooves', name: 'Hooves', description: 'Your hooves are natural melee weapons dealing 1d4 bludgeoning damage.' },
  ],
}

export const YUAN_TI: Race = {
  id: 'yuan-ti',
  name: 'Yuan-ti Pureblood',
  icon: '🐍',
  category: 'monstrous',
  description: 'Yuan-ti are serpentine humanoids created through dark rituals. Purebloods appear mostly human but have subtle serpentine features.',
  abilityBonuses: { charisma: 2, intelligence: 1 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Abyssal', 'Draconic'],
  traits: [
    { id: 'innate-spellcasting', name: 'Innate Spellcasting', description: 'You know the Poison Spray cantrip. At 3rd level, you can cast Animal Friendship on snakes at will. At 3rd level, you can also cast Suggestion once per long rest.' },
    { id: 'magic-resistance', name: 'Magic Resistance', description: 'You have advantage on saving throws against spells and other magical effects.' },
    { id: 'poison-immunity', name: 'Poison Immunity', description: 'You are immune to poison damage and the poisoned condition.' },
  ],
  damageResistances: ['poison'],
  conditionImmunities: ['poisoned'],
}

export const KOBOLD: Race = {
  id: 'kobold',
  name: 'Kobold',
  icon: '🦴',
  category: 'monstrous',
  description: 'Kobolds are small reptilian humanoids who often serve dragons. They are crafty and use traps and ambush tactics.',
  abilityBonuses: { dexterity: 2 },
  size: 'small',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common', 'Draconic'],
  traits: [
    { id: 'draconic-cry', name: 'Draconic Cry', description: 'As a bonus action, you let out a cry. Until the start of your next turn, you and your allies have advantage on attack rolls against enemies within 10 feet of you. You can use this a number of times equal to your proficiency bonus.' },
    { id: 'kobold-legacy', name: 'Kobold Legacy', description: 'Choose one: Craftiness (proficiency in one skill), Defiance (advantage vs. frightened), or Draconic Sorcery (one sorcerer cantrip).' },
  ],
}

// ============================================================================
// OTHER FANTASY RACES
// ============================================================================

export const WARFORGED: Race = {
  id: 'warforged',
  name: 'Warforged',
  icon: '🤖',
  category: 'exotic',
  description: 'Warforged are sentient constructs created as weapons of war. They struggle to find their purpose in a world at peace.',
  abilityBonuses: { constitution: 2 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common'],
  traits: [
    { id: 'constructed-resilience', name: 'Constructed Resilience', description: 'You have advantage on saving throws against being poisoned, and you have resistance to poison damage. You don\'t need to eat, drink, or breathe. You are immune to disease. You don\'t need to sleep.' },
    { id: 'sentry-rest', name: 'Sentry\'s Rest', description: 'When you take a long rest, you must spend at least six hours in an inactive, motionless state. You appear inert but remain conscious.' },
    { id: 'integrated-protection', name: 'Integrated Protection', description: 'Your body has built-in defensive layers, which can be enhanced with armor. You gain a +1 bonus to AC. You can don only armor with which you have proficiency.' },
  ],
  damageResistances: ['poison'],
}

export const CHANGELING: Race = {
  id: 'changeling',
  name: 'Changeling',
  icon: '🎭',
  category: 'exotic',
  description: 'Changelings can shift their appearance to match any humanoid they have seen. They are often mistrusted but make excellent spies and performers.',
  abilityBonuses: { charisma: 2 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common'],
  traits: [
    { id: 'shapechanger', name: 'Shapechanger', description: 'As an action, you can change your appearance and voice to match any humanoid you have seen. You decide what you look like, including your height, weight, facial features, voice, coloring, hair length, and sex.' },
    { id: 'changeling-instincts', name: 'Changeling Instincts', description: 'You gain proficiency in two skills: Deception, Insight, Intimidation, or Persuasion.' },
  ],
}

export const KALASHTAR: Race = {
  id: 'kalashtar',
  name: 'Kalashtar',
  icon: '🧘',
  category: 'exotic',
  description: 'Kalashtar are humans bonded with spirits from the plane of dreams. They have telepathic abilities and are naturally resistant to psychic damage.',
  abilityBonuses: { wisdom: 2, charisma: 1 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common', 'Quori'],
  traits: [
    { id: 'dual-mind', name: 'Dual Mind', description: 'You have advantage on all Wisdom saving throws.' },
    { id: 'mental-discipline', name: 'Mental Discipline', description: 'You have resistance to psychic damage.' },
    { id: 'mind-link', name: 'Mind Link', description: 'You can speak telepathically to any creature you can see within 10 feet × your level. You don\'t need to share a language, but the creature must understand at least one language.' },
    { id: 'severed-from-dreams', name: 'Severed from Dreams', description: 'You are immune to spells and effects that require you to dream, like Dream, but you can still benefit from long rests.' },
  ],
  damageResistances: ['psychic'],
}

export const SHIFTER: Race = {
  id: 'shifter',
  name: 'Shifter',
  icon: '🐺',
  category: 'exotic',
  description: 'Shifters are descendants of humans and lycanthropes. They can partially transform, gaining bestial features.',
  sourceBook: { ...SOURCE_BOOKS.MPMM, page: 32 },
  abilityBonuses: { constitution: 1, wisdom: 1 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common'],
  traits: [
    { id: 'shifting', name: 'Shifting', description: 'As a bonus action, you can assume a more bestial appearance. This lasts for 1 minute or until you end it as a bonus action. You gain temporary hit points equal to your level + your Constitution modifier. Once per short or long rest.' },
  ],
  subraces: [
    {
      id: 'beasthide-shifter',
      name: 'Beasthide Shifter',
      icon: '🦏',
      description: 'Beasthide shifters are tough and durable, gaining extra toughness when they shift.',
      abilityBonuses: { constitution: 2, strength: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common'],
      traits: [
        { id: 'beasthide-shifting', name: 'Beasthide Shifting', description: 'While shifted, you gain 1d6 additional temporary hit points and +1 AC.' },
        { id: 'natural-athlete', name: 'Natural Athlete', description: 'You have proficiency in the Athletics skill.' },
      ],
      skillProficiencies: ['athletics'],
    },
    {
      id: 'longtooth-shifter',
      name: 'Longtooth Shifter',
      icon: '🦷',
      description: 'Longtooth shifters grow elongated fangs when they shift and are fierce in combat.',
      abilityBonuses: { strength: 2, dexterity: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common'],
      traits: [
        { id: 'longtooth-shifting', name: 'Longtooth Shifting', description: 'While shifted, you can make a bite attack as a bonus action. The bite deals 1d6 + Strength modifier piercing damage.' },
        { id: 'fierce', name: 'Fierce', description: 'You have proficiency in the Intimidation skill.' },
      ],
      skillProficiencies: ['intimidation'],
    },
    {
      id: 'swiftstride-shifter',
      name: 'Swiftstride Shifter',
      icon: '💨',
      description: 'Swiftstride shifters are fast and elusive, able to dart away from enemies.',
      abilityBonuses: { dexterity: 2, charisma: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common'],
      traits: [
        { id: 'swiftstride-shifting', name: 'Swiftstride Shifting', description: 'While shifted, your walking speed increases by 10 feet. You can move up to 10 feet as a reaction when an enemy ends its turn within 5 feet of you.' },
        { id: 'graceful', name: 'Graceful', description: 'You have proficiency in the Acrobatics skill.' },
      ],
      skillProficiencies: ['acrobatics'],
    },
    {
      id: 'wildhunt-shifter',
      name: 'Wildhunt Shifter',
      icon: '🎯',
      description: 'Wildhunt shifters have keen senses and can track prey with supernatural precision.',
      abilityBonuses: { wisdom: 2, dexterity: 1 },
      size: 'medium',
      speed: 30,
      vision: 'darkvision',
      visionRange: 60,
      languages: ['Common'],
      traits: [
        { id: 'wildhunt-shifting', name: 'Wildhunt Shifting', description: 'While shifted, you have advantage on Wisdom checks, and no creature within 30 feet of you can make an attack roll with advantage against you unless you\'re incapacitated.' },
        { id: 'natural-tracker', name: 'Natural Tracker', description: 'You have proficiency in the Survival skill.' },
      ],
      skillProficiencies: ['survival'],
    },
  ],
}

export const LOXODON: Race = {
  id: 'loxodon',
  name: 'Loxodon',
  icon: '🐘',
  category: 'exotic',
  description: 'Loxodons are elephant-like humanoids known for their incredible memory, loyalty, and calming presence.',
  abilityBonuses: { constitution: 2, wisdom: 1 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common', 'Loxodon'],
  traits: [
    { id: 'loxodon-serenity', name: 'Loxodon Serenity', description: 'You have advantage on saving throws against being charmed or frightened.' },
    { id: 'natural-armor', name: 'Natural Armor', description: 'Your thick, leathery skin gives you AC 12 + Constitution modifier when not wearing armor.' },
    { id: 'trunk', name: 'Trunk', description: 'You can grasp things with your trunk. It has a reach of 5 feet and can lift weight equal to 5 × your Strength score. You can use it to do simple tasks.' },
    { id: 'keen-smell', name: 'Keen Smell', description: 'You have advantage on Wisdom (Perception), Wisdom (Survival), and Intelligence (Investigation) checks that involve smell.' },
  ],
}

export const VEDALKEN: Race = {
  id: 'vedalken',
  name: 'Vedalken',
  icon: '🔬',
  category: 'exotic',
  description: 'Vedalken are tall, blue-skinned humanoids who are obsessed with improving and perfecting everything they do. They are rational and detail-oriented.',
  abilityBonuses: { intelligence: 2, wisdom: 1 },
  size: 'medium',
  speed: 30,
  vision: 'normal',
  languages: ['Common', 'Vedalken'],
  traits: [
    { id: 'vedalken-dispassion', name: 'Vedalken Dispassion', description: 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws.' },
    { id: 'tireless-precision', name: 'Tireless Precision', description: 'You are proficient in one tool and one skill of your choice. Whenever you make an ability check with the chosen skill or tool, roll a d4 and add it to the total.' },
    { id: 'partially-amphibious', name: 'Partially Amphibious', description: 'You can breathe underwater for up to 1 hour. Once you\'ve used this, you can\'t use it again until you finish a long rest.' },
  ],
}

export const SIMIC_HYBRID: Race = {
  id: 'simic-hybrid',
  name: 'Simic Hybrid',
  icon: '🧬',
  category: 'exotic',
  description: 'Simic hybrids are the result of magical experimentation, combining humanoid and animal traits into new forms.',
  abilityBonuses: { constitution: 2 },
  size: 'medium',
  speed: 30,
  vision: 'darkvision',
  visionRange: 60,
  languages: ['Common'],
  traits: [
    { id: 'animal-enhancement', name: 'Animal Enhancement', description: 'Choose one of: Manta Glide (gliding wings), Nimble Climber (climbing speed), or Underwater Adaptation (swimming speed and water breathing).' },
    { id: 'animal-enhancement-5', name: 'Animal Enhancement (5th Level)', description: 'At 5th level, choose an additional enhancement: Grappling Appendages (extra grapple attacks), Carapace (+1 AC), or Acid Spit (ranged acid attack).' },
  ],
}

// ============================================================================
// ALL RACES EXPORT
// ============================================================================

export const ALL_RACES: Race[] = [
  // Common
  HUMAN,
  DWARF,
  ELF,
  HALFLING,
  GNOME,
  HALF_ELF,
  HALF_ORC,
  DRAGONBORN,
  TIEFLING,
  // Exotic
  GOLIATH,
  AASIMAR,
  GENASI,
  TABAXI,
  TORTLE,
  FIRBOLG,
  KENKU,
  LIZARDFOLK,
  // Aerial
  AARAKOCRA,
  OWLIN,
  FAIRY,
  // Aquatic
  TRITON,
  LOCATHAH,
  // Monstrous
  GOBLIN,
  HOBGOBLIN,
  BUGBEAR,
  ORC,
  MINOTAUR,
  CENTAUR,
  YUAN_TI,
  KOBOLD,
  // Other Fantasy
  WARFORGED,
  CHANGELING,
  KALASHTAR,
  SHIFTER,
  LOXODON,
  VEDALKEN,
  SIMIC_HYBRID,
]

export const RACE_CATEGORIES = {
  common: 'Common Races',
  exotic: 'Exotic Races',
  aerial: 'Aerial Races',
  aquatic: 'Aquatic Races',
  monstrous: 'Monstrous Races',
  planar: 'Planar Races',
}

export function getRacesByCategory(category: string): Race[] {
  return ALL_RACES.filter((race) => race.category === category)
}

export function getAllRacesWithSubraces(): Race[] {
  const races: Race[] = []
  for (const race of ALL_RACES) {
    races.push(race)
    if (race.subraces) {
      races.push(...race.subraces)
    }
  }
  return races
}
