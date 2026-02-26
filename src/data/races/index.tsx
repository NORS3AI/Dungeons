import type { Race } from '../../types/race'
import { SOURCE_BOOKS } from '../../types/race'

// ============================================================================
// COMMON RACES
// ============================================================================

export const HUMAN: Race = {
  id: 'human',
  name: 'Human',
  icon: (
    <svg className="w-12 h-12 text-amber-400/40" viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="30" r="15" />
      <rect x="35" y="47" width="30" height="35" rx="5" />
      <rect x="25" y="50" width="10" height="25" rx="3" />
      <rect x="65" y="50" width="10" height="25" rx="3" />
      <rect x="38" y="82" width="10" height="15" rx="2" />
      <rect x="52" y="82" width="10" height="15" rx="2" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-stone-400/40" viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="35" r="16" />
      <path d="M34 50 Q50 60 66 50 L66 85 L34 85 Z" />
      <rect x="28" y="52" width="8" height="22" rx="3" />
      <rect x="64" y="52" width="8" height="22" rx="3" />
      <path d="M36 85 L36 95 L44 95 L44 85 M56 85 L56 95 L64 95 L64 85" />
      <ellipse cx="50" cy="47" rx="18" ry="8" className="text-amber-700" fill="currentColor" />
      <rect x="42" y="30" width="16" height="6" rx="3" className="text-gray-600" fill="currentColor" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-emerald-400/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="32" rx="14" ry="18" />
      <path d="M36 48 Q50 58 64 48 L64 88 L36 88 Z" />
      <path d="M30 48 L30 72 M70 48 L70 72" strokeWidth="6" stroke="currentColor" fill="none" />
      <path d="M36 28 L30 18 M64 28 L70 18" strokeWidth="3" stroke="currentColor" fill="none" />
      <ellipse cx="44" cy="30" rx="2" ry="3" className="text-cyan-400" fill="currentColor" />
      <ellipse cx="56" cy="30" rx="2" ry="3" className="text-cyan-400" fill="currentColor" />
      <path d="M40 88 L40 97 M60 88 L60 97" strokeWidth="5" stroke="currentColor" fill="none" />
    </svg>
  ),
  category: 'common',
  description: 'Elves are a magical people of otherworldly grace, living in places of ethereal beauty. They love nature and magic, art and artistry, music and poetry.',
  sourceBook: { ...SOURCE_BOOKS.PHB2024, page: 160 },
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
  icon: (
    <svg className="w-12 h-12 text-yellow-600/40" viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="40" r="13" />
      <ellipse cx="50" cy="65" rx="12" ry="18" />
      <rect x="38" y="60" width="7" height="15" rx="3" />
      <rect x="55" y="60" width="7" height="15" rx="3" />
      <rect x="42" y="83" width="7" height="12" rx="2" />
      <rect x="51" y="83" width="7" height="12" rx="2" />
      <circle cx="45" cy="38" r="2" />
      <circle cx="55" cy="38" r="2" />
      <path d="M45 45 Q50 47 55 45" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  ),
  category: 'common',
  description: 'The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense. Standing about 3 feet tall, they appear relatively harmless.',
  sourceBook: { ...SOURCE_BOOKS.PHB2024, page: 164 },
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
  icon: (
    <svg className="w-12 h-12 text-blue-400/40" viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="42" r="14" />
      <path d="M36 55 Q50 65 64 55 L64 85 L36 85 Z" />
      <rect x="32" y="58" width="7" height="18" rx="3" />
      <rect x="61" y="58" width="7" height="18" rx="3" />
      <path d="M38 85 L38 95 M62 85 L62 95" strokeWidth="6" stroke="currentColor" fill="none" />
      <path d="M38 25 Q50 15 62 25" className="text-red-500" fill="currentColor" />
      <circle cx="45" cy="40" r="2.5" />
      <circle cx="55" cy="40" r="2.5" />
      <ellipse cx="50" cy="32" rx="18" ry="12" className="text-red-600" fill="currentColor" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-teal-400/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="33" rx="15" ry="17" />
      <path d="M35 48 Q50 58 65 48 L65 88 L35 88 Z" />
      <rect x="28" y="50" width="8" height="25" rx="3" />
      <rect x="64" y="50" width="8" height="25" rx="3" />
      <path d="M38 88 L38 96 M62 88 L62 96" strokeWidth="6" stroke="currentColor" fill="none" />
      <path d="M38 28 L34 22 M62 28 L66 22" strokeWidth="2" stroke="currentColor" fill="none" />
      <circle cx="45" cy="31" r="2" />
      <circle cx="55" cy="31" r="2" />
    </svg>
  ),
  category: 'common',
  description: 'Half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition, tempered by the refined senses, love of nature, and artistic tastes of the elves.',
  sourceBook: { ...SOURCE_BOOKS.PHB, page: 38 },
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
  icon: (
    <svg className="w-12 h-12 text-green-600/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="35" rx="18" ry="20" />
      <path d="M32 52 Q50 65 68 52 L68 90 L32 90 Z" />
      <rect x="24" y="54" width="10" height="28" rx="4" />
      <rect x="66" y="54" width="10" height="28" rx="4" />
      <path d="M36 90 L36 98 M64 90 L64 98" strokeWidth="7" stroke="currentColor" fill="none" />
      <ellipse cx="43" cy="32" rx="3" ry="4" className="text-yellow-600" fill="currentColor" />
      <ellipse cx="57" cy="32" rx="3" ry="4" className="text-yellow-600" fill="currentColor" />
      <path d="M42 42 L45 48 M58 42 L55 48" strokeWidth="3" stroke="currentColor" fill="none" />
    </svg>
  ),
  category: 'common',
  description: 'Half-orcs exhibit a blend of orcish and human characteristics. They are not as bestial as full orcs but still have gray skin, sloping foreheads, and prominent teeth.',
  sourceBook: { ...SOURCE_BOOKS.PHB2024, page: 168 },
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

export const TIEFLING: Race = {
  id: 'tiefling',
  name: 'Tiefling',
  icon: (
    <svg className="w-12 h-12 text-purple-500/30" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="25" rx="20" ry="25" />
      <path d="M30 50 L50 90 L70 50 Q50 70 30 50" />
      <path d="M25 20 L15 10 M75 20 L85 10" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="42" cy="22" r="3" className="text-red-500" fill="currentColor" />
      <circle cx="58" cy="22" r="3" className="text-red-500" fill="currentColor" />
      <path d="M50 90 Q55 95 60 100 M50 90 Q45 95 40 100" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
  ),
  category: 'common',
  description: 'Tieflings are derived from human bloodlines touched by the power of the Nine Hells. They might look like humans, but their infernal heritage has left a clear imprint.',
  sourceBook: { ...SOURCE_BOOKS.PHB2024, page: 170 },
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

export const AASIMAR: Race = {
  id: 'aasimar',
  name: 'Aasimar',
  icon: (
    <svg className="w-12 h-12 text-yellow-300/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="32" rx="15" ry="18" />
      <path d="M35 48 Q50 58 65 48 L65 88 L35 88 Z" />
      <rect x="28" y="50" width="8" height="25" rx="3" />
      <rect x="64" y="50" width="8" height="25" rx="3" />
      <path d="M38 88 L38 96 M62 88 L62 96" strokeWidth="6" stroke="currentColor" fill="none" />
      <path d="M25 28 Q20 22 15 25 Q18 20 22 22 M75 28 Q80 22 85 25 Q82 20 78 22" className="text-amber-300" fill="currentColor" />
      <circle cx="50" cy="15" r="8" className="text-yellow-400" fill="currentColor" opacity="0.5" />
      <circle cx="45" cy="30" r="2" />
      <circle cx="55" cy="30" r="2" />
    </svg>
  ),
  category: 'exotic',
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

// ============================================================================
// AERIAL RACES
// ============================================================================

// ============================================================================
// AQUATIC RACES
// ============================================================================

// ============================================================================
// MONSTROUS RACES
// ============================================================================

export const GOBLIN: Race = {
  id: 'goblin',
  name: 'Goblin',
  icon: (
    <svg className="w-12 h-12 text-green-500/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="40" rx="16" ry="18" />
      <path d="M34 56 Q50 65 66 56 L66 84 L34 84 Z" />
      <rect x="28" y="58" width="7" height="18" rx="3" />
      <rect x="65" y="58" width="7" height="18" rx="3" />
      <path d="M38 84 L38 92 M62 84 L62 92" strokeWidth="5" stroke="currentColor" fill="none" />
      <path d="M32 35 L26 28 Q28 32 30 34 M68 35 L74 28 Q72 32 70 34" />
      <ellipse cx="43" cy="38" rx="4" ry="5" className="text-yellow-400" fill="currentColor" />
      <ellipse cx="57" cy="38" rx="4" ry="5" className="text-yellow-400" fill="currentColor" />
      <path d="M42 46 L45 50 L48 46 M52 46 L55 50 L58 46" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  ),
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

export const ORC: Race = {
  id: 'orc',
  name: 'Orc',
  icon: (
    <svg className="w-12 h-12 text-green-700/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="34" rx="18" ry="21" />
      <path d="M32 53 Q50 66 68 53 L68 89 L32 89 Z" />
      <rect x="23" y="55" width="10" height="28" rx="4" />
      <rect x="67" y="55" width="10" height="28" rx="4" />
      <path d="M36 89 L36 97 M64 89 L64 97" strokeWidth="7" stroke="currentColor" fill="none" />
      <path d="M36 26 L30 18 Q32 22 34 24 M64 26 L70 18 Q68 22 66 24" />
      <ellipse cx="43" cy="32" rx="3" ry="4" className="text-red-500" fill="currentColor" />
      <ellipse cx="57" cy="32" rx="3" ry="4" className="text-red-500" fill="currentColor" />
      <path d="M40 42 L43 48 L46 42 M54 42 L57 48 L60 42" strokeWidth="2" stroke="currentColor" fill="none" />
      <path d="M48 46 L48 50 L52 50 L52 46" className="text-white" fill="currentColor" />
    </svg>
  ),
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

// ============================================================================
// OTHER FANTASY RACES
// ============================================================================

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
  TIEFLING,
  // Exotic
  AASIMAR,
  // Monstrous
  GOBLIN,
  ORC,
]

export const RACE_CATEGORIES = {
  common: 'Common Races',
  exotic: 'Exotic Races',
  monstrous: 'Monstrous Races',
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
