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

export const DRAGONBORN: Race = {
  id: 'dragonborn',
  name: 'Dragonborn',
  icon: (
    <svg className="w-12 h-12 text-red-500/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="30" rx="18" ry="22" />
      <path d="M32 50 L50 52 L68 50" />
      <rect x="32" y="50" width="36" height="40" rx="6" />
      <rect x="24" y="52" width="10" height="30" rx="4" />
      <rect x="66" y="52" width="10" height="30" rx="4" />
      <path d="M36 90 L36 98 M64 90 L64 98" strokeWidth="7" stroke="currentColor" fill="none" />
      <path d="M35 20 L25 15 Q20 18 25 22 M65 20 L75 15 Q80 18 75 22" className="text-orange-600" fill="currentColor" />
      <circle cx="42" cy="26" r="3" className="text-yellow-400" fill="currentColor" />
      <circle cx="58" cy="26" r="3" className="text-yellow-400" fill="currentColor" />
      <path d="M40 35 Q50 30 60 35" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  ),
  category: 'common',
  description: 'Dragonborn look very much like dragons standing erect in humanoid form, though they lack wings or a tail. They are tall and strongly built, with dragon-like scales.',
  sourceBook: { ...SOURCE_BOOKS.PHB2024, page: 156 },
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

export const GOLIATH: Race = {
  id: 'goliath',
  name: 'Goliath',
  icon: (
    <svg className="w-12 h-12 text-slate-500/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="28" rx="20" ry="24" />
      <path d="M30 50 Q50 70 70 50 L70 92 L30 92 Z" />
      <rect x="20" y="52" width="12" height="35" rx="4" />
      <rect x="68" y="52" width="12" height="35" rx="4" />
      <path d="M34 92 L34 98 M66 92 L66 98" strokeWidth="8" stroke="currentColor" fill="none" />
      <path d="M35 20 L25 12 M65 20 L75 12" strokeWidth="4" stroke="currentColor" fill="none" />
      <rect x="42" y="24" width="16" height="8" rx="2" className="text-gray-700" fill="currentColor" />
      <circle cx="43" cy="25" r="3" className="text-amber-600" fill="currentColor" />
      <circle cx="57" cy="25" r="3" className="text-amber-600" fill="currentColor" />
    </svg>
  ),
  category: 'exotic',
  description: 'Goliaths are massive humanoids who live in the highest mountain peaks. Competitive and fair-minded, they value personal achievement and self-sufficiency.',
  sourceBook: { ...SOURCE_BOOKS.PHB2024, page: 163 },
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
  icon: (
    <svg className="w-12 h-12 text-violet-400/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="33" rx="16" ry="19" />
      <path d="M34 50 Q50 60 66 50 L66 88 L34 88 Z" />
      <rect x="27" y="52" width="8" height="24" rx="3" />
      <rect x="65" y="52" width="8" height="24" rx="3" />
      <path d="M38 88 L38 95 M62 88 L62 95" strokeWidth="6" stroke="currentColor" fill="none" />
      <circle cx="44" cy="31" r="2.5" />
      <circle cx="56" cy="31" r="2.5" />
      <path d="M32 30 Q28 25 30 20 M68 30 Q72 25 70 20" strokeWidth="2" stroke="currentColor" fill="none" className="text-cyan-400" />
      <path d="M38 40 Q42 38 46 40 M54 40 Q58 38 62 40" strokeWidth="2" stroke="currentColor" fill="none" className="text-orange-400" opacity="0.5" />
      <circle cx="35" cy="55" r="3" className="text-green-500" fill="currentColor" opacity="0.4" />
      <circle cx="65" cy="55" r="3" className="text-red-500" fill="currentColor" opacity="0.4" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-orange-400/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="30" rx="16" ry="18" />
      <path d="M34 46 Q50 56 66 46 L66 86 L34 86 Z" />
      <rect x="26" y="48" width="8" height="25" rx="3" />
      <rect x="66" y="48" width="8" height="25" rx="3" />
      <path d="M38 86 L38 94 M62 86 L62 94" strokeWidth="6" stroke="currentColor" fill="none" />
      <path d="M30 18 L25 8 Q25 15 28 18 M70 18 L75 8 Q75 15 72 18" />
      <ellipse cx="43" cy="28" rx="3" ry="4" className="text-green-400" fill="currentColor" />
      <ellipse cx="57" cy="28" rx="3" ry="4" className="text-green-400" fill="currentColor" />
      <path d="M50 32 L47 36 L50 38 L53 36 Z" className="text-pink-400" fill="currentColor" />
      <path d="M38 35 L30 35 M62 35 L70 35 M45 40 L42 44 M55 40 L58 44" strokeWidth="1.5" stroke="currentColor" fill="none" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-green-700/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="35" rx="14" ry="16" />
      <ellipse cx="50" cy="60" rx="28" ry="24" className="text-green-800" fill="currentColor" />
      <path d="M22 55 L12 60 L18 65 M78 55 L88 60 L82 65" />
      <path d="M35 84 L32 94 M65 84 L68 94" strokeWidth="6" stroke="currentColor" fill="none" />
      <circle cx="44" cy="33" r="2.5" />
      <circle cx="56" cy="33" r="2.5" />
      <path d="M30 58 Q35 56 40 58 M45 60 Q50 58 55 60 M60 58 Q65 56 70 58" strokeWidth="2" stroke="currentColor" fill="none" className="text-yellow-700" opacity="0.6" />
      <path d="M25 68 Q30 65 35 68 M40 70 Q45 68 50 70 M55 68 Q60 65 65 68" strokeWidth="2" stroke="currentColor" fill="none" className="text-yellow-700" opacity="0.6" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-emerald-600/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="30" rx="18" ry="22" />
      <path d="M32 50 Q50 65 68 50 L68 90 L32 90 Z" />
      <rect x="22" y="52" width="11" height="32" rx="4" />
      <rect x="67" y="52" width="11" height="32" rx="4" />
      <path d="M35 90 L35 98 M65 90 L65 98" strokeWidth="7" stroke="currentColor" fill="none" />
      <ellipse cx="50" cy="22" rx="22" ry="18" className="text-green-700" fill="currentColor" opacity="0.4" />
      <path d="M35 18 L30 10 Q28 12 30 15 M65 18 L70 10 Q72 12 70 15" className="text-green-600" fill="currentColor" />
      <circle cx="43" cy="28" r="2.5" className="text-green-300" fill="currentColor" />
      <circle cx="57" cy="28" r="2.5" className="text-green-300" fill="currentColor" />
      <path d="M40 34 Q50 30 60 34" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-gray-800/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="32" rx="14" ry="17" />
      <path d="M36 47 Q50 57 64 47 L64 85 L36 85 Z" />
      <rect x="30" y="49" width="7" height="23" rx="3" />
      <rect x="63" y="49" width="7" height="23" rx="3" />
      <path d="M39 85 L39 93 M61 85 L61 93" strokeWidth="5" stroke="currentColor" fill="none" />
      <path d="M50 25 L45 15 Q48 17 50 20 Q52 17 55 15 Z" className="text-yellow-600" fill="currentColor" />
      <circle cx="44" cy="30" r="3" className="text-yellow-500" fill="currentColor" />
      <circle cx="56" cy="30" r="3" className="text-yellow-500" fill="currentColor" />
      <path d="M22 50 L15 55 L18 60 M78 50 L85 55 L82 60" className="text-gray-700" fill="currentColor" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-lime-600/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="32" rx="16" ry="19" />
      <path d="M34 49 Q50 60 66 49 L66 88 L34 88 Z" />
      <rect x="28" y="51" width="8" height="25" rx="3" />
      <rect x="64" y="51" width="8" height="25" rx="3" />
      <path d="M38 88 L38 95 M62 88 L62 95" strokeWidth="6" stroke="currentColor" fill="none" />
      <path d="M50 20 L50 10 Q52 12 54 14 Q56 10 58 12" className="text-lime-700" fill="currentColor" />
      <ellipse cx="43" cy="30" rx="3.5" ry="5" className="text-yellow-400" fill="currentColor" />
      <ellipse cx="57" cy="30" rx="3.5" ry="5" className="text-yellow-400" fill="currentColor" />
      <path d="M40 38 L50 40 L60 38" strokeWidth="2" stroke="currentColor" fill="none" />
      <path d="M50 50 L55 48 L60 50 L65 48 L70 50" strokeWidth="2" stroke="currentColor" fill="none" className="text-lime-700" opacity="0.5" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-sky-500/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="35" rx="13" ry="16" />
      <path d="M37 49 Q50 58 63 49 L63 82 L37 82 Z" />
      <rect x="32" y="51" width="7" height="20" rx="3" />
      <rect x="61" y="51" width="7" height="20" rx="3" />
      <path d="M40 82 L40 90 M60 82 L60 90" strokeWidth="5" stroke="currentColor" fill="none" />
      <path d="M15 45 Q20 35 30 40 Q25 45 25 50 M85 45 Q80 35 70 40 Q75 45 75 50" className="text-amber-400" fill="currentColor" />
      <path d="M50 28 L46 20 Q48 22 50 25 Q52 22 54 20 Z" className="text-yellow-600" fill="currentColor" />
      <circle cx="44" cy="33" r="2.5" className="text-yellow-500" fill="currentColor" />
      <circle cx="56" cy="33" r="2.5" className="text-yellow-500" fill="currentColor" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-amber-700/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="36" rx="18" ry="20" />
      <path d="M32 54 Q50 64 68 54 L68 86 L32 86 Z" />
      <rect x="26" y="56" width="8" height="22" rx="3" />
      <rect x="66" y="56" width="8" height="22" rx="3" />
      <path d="M36 86 L36 94 M64 86 L64 94" strokeWidth="6" stroke="currentColor" fill="none" />
      <path d="M18 50 Q22 42 28 48 Q24 52 24 56 M82 50 Q78 42 72 48 Q76 52 76 56" className="text-amber-600" fill="currentColor" />
      <circle cx="42" cy="34" r="6" className="text-yellow-400" fill="currentColor" />
      <circle cx="58" cy="34" r="6" className="text-yellow-400" fill="currentColor" />
      <circle cx="42" cy="34" r="3" className="text-gray-900" fill="currentColor" />
      <circle cx="58" cy="34" r="3" className="text-gray-900" fill="currentColor" />
      <path d="M50 42 L46 48 L50 50 L54 48 Z" className="text-yellow-600" fill="currentColor" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-pink-400/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="48" rx="10" ry="12" />
      <path d="M40 58 Q50 65 60 58 L60 85 L40 85 Z" />
      <rect x="37" y="60" width="5" height="15" rx="2" />
      <rect x="58" y="60" width="5" height="15" rx="2" />
      <path d="M43 85 L43 92 M57 85 L57 92" strokeWidth="4" stroke="currentColor" fill="none" />
      <path d="M30 50 Q25 40 30 35 Q35 38 32 45 M70 50 Q75 40 70 35 Q65 38 68 45" className="text-purple-400" fill="currentColor" opacity="0.6" />
      <path d="M28 55 Q22 48 26 42 Q30 45 28 50 M72 55 Q78 48 74 42 Q70 45 72 50" className="text-cyan-400" fill="currentColor" opacity="0.5" />
      <circle cx="47" cy="46" r="2" />
      <circle cx="53" cy="46" r="2" />
      <circle cx="50" cy="30" r="6" className="text-yellow-300" fill="currentColor" opacity="0.4" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-cyan-500/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="30" rx="15" ry="18" />
      <path d="M35 46 Q50 56 65 46 L65 75 Q50 85 35 75 Z" />
      <rect x="28" y="48" width="8" height="18" rx="3" />
      <rect x="64" y="48" width="8" height="18" rx="3" />
      <path d="M30 72 L25 80 L35 78 M70 72 L75 80 L65 78" className="text-teal-600" fill="currentColor" />
      <path d="M35 85 Q40 90 45 92 Q50 95 55 92 Q60 90 65 85" className="text-teal-500" fill="currentColor" />
      <circle cx="45" cy="28" r="2" />
      <circle cx="55" cy="28" r="2" />
      <path d="M38 24 L34 16 Q36 18 38 20 M62 24 L66 16 Q64 18 62 20" className="text-teal-400" fill="currentColor" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-blue-500/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="34" rx="16" ry="19" />
      <path d="M34 51 Q50 61 66 51 L66 86 L34 86 Z" />
      <rect x="28" y="53" width="8" height="22" rx="3" />
      <rect x="64" y="53" width="8" height="22" rx="3" />
      <path d="M38 86 L38 93 M62 86 L62 93" strokeWidth="6" stroke="currentColor" fill="none" />
      <ellipse cx="44" cy="32" rx="4" ry="5" className="text-yellow-400" fill="currentColor" />
      <ellipse cx="56" cy="32" rx="4" ry="5" className="text-yellow-400" fill="currentColor" />
      <path d="M50 20 L48 12 Q50 14 52 12 Z" className="text-blue-600" fill="currentColor" />
      <path d="M30 55 L35 58 L30 61 M70 55 L65 58 L70 61" className="text-blue-600" fill="currentColor" />
      <path d="M40 60 L45 58 L50 60 L55 58 L60 60" strokeWidth="2" stroke="currentColor" fill="none" className="text-blue-400" opacity="0.5" />
    </svg>
  ),
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

export const HOBGOBLIN: Race = {
  id: 'hobgoblin',
  name: 'Hobgoblin',
  icon: (
    <svg className="w-12 h-12 text-red-600/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="32" rx="17" ry="20" />
      <path d="M33 50 Q50 62 67 50 L67 88 L33 88 Z" />
      <rect x="24" y="52" width="10" height="28" rx="4" />
      <rect x="66" y="52" width="10" height="28" rx="4" />
      <path d="M37 88 L37 96 M63 88 L63 96" strokeWidth="7" stroke="currentColor" fill="none" />
      <rect x="42" y="24" width="16" height="6" rx="2" className="text-gray-700" fill="currentColor" />
      <ellipse cx="43" cy="30" rx="3" ry="4" className="text-orange-500" fill="currentColor" />
      <ellipse cx="57" cy="30" rx="3" ry="4" className="text-orange-500" fill="currentColor" />
      <path d="M45 38 L48 42 L51 38 M55 38 L52 42" strokeWidth="2" stroke="currentColor" fill="none" />
      <rect x="40" y="60" width="20" height="15" rx="2" className="text-gray-600" fill="currentColor" opacity="0.3" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-amber-800/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="34" rx="19" ry="22" />
      <path d="M31 54 Q50 68 69 54 L69 90 L31 90 Z" />
      <rect x="21" y="56" width="11" height="30" rx="4" />
      <rect x="68" y="56" width="11" height="30" rx="4" />
      <path d="M35 90 L35 98 M65 90 L65 98" strokeWidth="7" stroke="currentColor" fill="none" />
      <circle cx="32" cy="25" r="8" className="text-amber-700" fill="currentColor" />
      <circle cx="68" cy="25" r="8" className="text-amber-700" fill="currentColor" />
      <ellipse cx="43" cy="32" rx="3" ry="4" className="text-yellow-700" fill="currentColor" />
      <ellipse cx="57" cy="32" rx="3" ry="4" className="text-yellow-700" fill="currentColor" />
      <path d="M44 40 L47 45 L50 40 M56 40 L53 45" strokeWidth="3" stroke="currentColor" fill="none" />
    </svg>
  ),
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

export const MINOTAUR: Race = {
  id: 'minotaur',
  name: 'Minotaur',
  icon: (
    <svg className="w-12 h-12 text-stone-600/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="36" rx="20" ry="23" />
      <path d="M30 57 Q50 70 70 57 L70 90 L30 90 Z" />
      <rect x="20" y="59" width="11" height="28" rx="4" />
      <rect x="69" y="59" width="11" height="28" rx="4" />
      <path d="M34 90 L34 98 M66 90 L66 98" strokeWidth="7" stroke="currentColor" fill="none" />
      <path d="M30 28 Q25 20 22 25 Q20 28 22 32 M70 28 Q75 20 78 25 Q80 28 78 32" className="text-gray-700" fill="currentColor" />
      <ellipse cx="43" cy="34" rx="4" ry="5" className="text-red-600" fill="currentColor" />
      <ellipse cx="57" cy="34" rx="4" ry="5" className="text-red-600" fill="currentColor" />
      <ellipse cx="50" cy="44" rx="4" ry="3" className="text-stone-800" fill="currentColor" />
      <path d="M48 47 L48 52 M52 47 L52 52" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-amber-700/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="28" rx="14" ry="17" />
      <path d="M36 43 Q50 52 64 43" />
      <rect x="30" y="45" width="8" height="15" rx="3" />
      <rect x="62" y="45" width="8" height="15" rx="3" />
      <ellipse cx="50" cy="70" rx="24" ry="18" className="text-amber-800" fill="currentColor" />
      <rect x="34" y="88" width="6" height="10" rx="2" />
      <rect x="42" y="88" width="6" height="10" rx="2" />
      <rect x="52" y="88" width="6" height="10" rx="2" />
      <rect x="60" y="88" width="6" height="10" rx="2" />
      <circle cx="45" cy="26" r="2" />
      <circle cx="55" cy="26" r="2" />
      <path d="M46 18 Q50 10 54 18" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-green-600/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="33" rx="15" ry="18" />
      <path d="M35 49 Q50 59 65 49 L65 86 L35 86 Z" />
      <rect x="28" y="51" width="8" height="24" rx="3" />
      <rect x="64" y="51" width="8" height="24" rx="3" />
      <path d="M38 86 L38 93 M62 86 L62 93" strokeWidth="6" stroke="currentColor" fill="none" />
      <ellipse cx="43" cy="31" rx="4.5" ry="6" className="text-yellow-400" fill="currentColor" />
      <ellipse cx="57" cy="31" rx="4.5" ry="6" className="text-yellow-400" fill="currentColor" />
      <ellipse cx="43" cy="31" rx="1.5" ry="4" className="text-gray-900" fill="currentColor" />
      <ellipse cx="57" cy="31" rx="1.5" ry="4" className="text-gray-900" fill="currentColor" />
      <path d="M40 40 Q50 38 60 40" strokeWidth="2" stroke="currentColor" fill="none" />
      <path d="M45 45 L48 47 L51 45" strokeWidth="1.5" stroke="currentColor" fill="none" className="text-red-500" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-orange-600/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="38" rx="15" ry="17" />
      <path d="M35 53 Q50 62 65 53 L65 83 L35 83 Z" />
      <rect x="29" y="55" width="7" height="19" rx="3" />
      <rect x="64" y="55" width="7" height="19" rx="3" />
      <path d="M38 83 L38 91 M62 83 L62 91" strokeWidth="5" stroke="currentColor" fill="none" />
      <path d="M50 28 L47 20 Q49 22 51 22 Q53 22 55 20 Z" className="text-orange-700" fill="currentColor" />
      <ellipse cx="43" cy="36" rx="4" ry="5" className="text-yellow-500" fill="currentColor" />
      <ellipse cx="57" cy="36" rx="4" ry="5" className="text-yellow-500" fill="currentColor" />
      <ellipse cx="43" cy="36" rx="2" ry="3" className="text-gray-900" fill="currentColor" />
      <ellipse cx="57" cy="36" rx="2" ry="3" className="text-gray-900" fill="currentColor" />
      <path d="M43 44 L46 47 L49 44 M51 44 L54 47 L57 44" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-gray-400/40" viewBox="0 0 100 100" fill="currentColor">
      <rect x="35" y="25" width="30" height="30" rx="3" />
      <rect x="35" y="55" width="30" height="35" rx="4" />
      <rect x="25" y="57" width="10" height="28" rx="2" />
      <rect x="65" y="57" width="10" height="28" rx="2" />
      <rect x="38" y="90" width="10" height="8" rx="1" />
      <rect x="52" y="90" width="10" height="8" rx="1" />
      <circle cx="43" cy="38" r="3" className="text-cyan-400" fill="currentColor" />
      <circle cx="57" cy="38" r="3" className="text-cyan-400" fill="currentColor" />
      <rect x="46" y="44" width="8" height="3" rx="1" className="text-red-500" fill="currentColor" />
      <path d="M35 62 L40 62 M60 62 L65 62 M40 70 L48 70 M52 70 L60 70" strokeWidth="2" stroke="currentColor" fill="none" className="text-gray-600" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-purple-400/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="35" cy="35" rx="13" ry="16" opacity="0.5" />
      <ellipse cx="65" cy="35" rx="13" ry="16" />
      <path d="M22 49 Q35 58 48 49 L48 82 L22 82 Z" opacity="0.5" />
      <path d="M52 49 Q65 58 78 49 L78 82 L52 82 Z" />
      <rect x="18" y="51" width="6" height="20" rx="2" opacity="0.5" />
      <rect x="42" y="51" width="6" height="20" rx="2" opacity="0.5" />
      <rect x="52" y="51" width="6" height="20" rx="2" />
      <rect x="76" y="51" width="6" height="20" rx="2" />
      <path d="M26 82 L26 90 M44 82 L44 90" strokeWidth="5" stroke="currentColor" fill="none" opacity="0.5" />
      <path d="M56 82 L56 90 M74 82 L74 90" strokeWidth="5" stroke="currentColor" fill="none" />
      <circle cx="31" cy="33" r="2" opacity="0.5" />
      <circle cx="39" cy="33" r="2" opacity="0.5" />
      <circle cx="61" cy="33" r="2" />
      <circle cx="69" cy="33" r="2" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-indigo-400/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="32" rx="15" ry="18" />
      <path d="M35 48 Q50 58 65 48 L65 88 L35 88 Z" />
      <rect x="28" y="50" width="8" height="25" rx="3" />
      <rect x="64" y="50" width="8" height="25" rx="3" />
      <path d="M38 88 L38 96 M62 88 L62 96" strokeWidth="6" stroke="currentColor" fill="none" />
      <ellipse cx="50" cy="32" rx="18" ry="16" className="text-purple-400" fill="currentColor" opacity="0.3" />
      <circle cx="50" cy="18" r="7" className="text-indigo-300" fill="currentColor" opacity="0.5" />
      <path d="M40 20 Q35 15 32 18 M60 20 Q65 15 68 18" strokeWidth="2" stroke="currentColor" fill="none" className="text-purple-300" opacity="0.6" />
      <circle cx="45" cy="30" r="2" />
      <circle cx="55" cy="30" r="2" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-amber-600/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="30" rx="17" ry="19" />
      <path d="M33 47 Q50 58 67 47 L67 87 L33 87 Z" />
      <rect x="26" y="49" width="9" height="26" rx="3" />
      <rect x="65" y="49" width="9" height="26" rx="3" />
      <path d="M37 87 L37 95 M63 87 L63 95" strokeWidth="6" stroke="currentColor" fill="none" />
      <path d="M35 22 L28 12 Q30 16 33 19 M65 22 L72 12 Q70 16 67 19" />
      <ellipse cx="43" cy="28" rx="3" ry="4" className="text-yellow-500" fill="currentColor" />
      <ellipse cx="57" cy="28" rx="3" ry="4" className="text-yellow-500" fill="currentColor" />
      <path d="M45 35 L48 38 L51 35 M55 35 L52 38" strokeWidth="2" stroke="currentColor" fill="none" />
      <path d="M50 38 L50 42" strokeWidth="2" stroke="currentColor" fill="none" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-gray-500/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="32" rx="20" ry="24" />
      <path d="M30 54 Q50 68 70 54 L70 90 L30 90 Z" />
      <rect x="20" y="56" width="11" height="30" rx="4" />
      <rect x="69" y="56" width="11" height="30" rx="4" />
      <path d="M34 90 L34 98 M66 90 L66 98" strokeWidth="7" stroke="currentColor" fill="none" />
      <path d="M35 18 L25 10 Q27 15 30 18 M65 18 L75 10 Q73 15 70 18" />
      <circle cx="42" cy="28" r="3" className="text-gray-700" fill="currentColor" />
      <circle cx="58" cy="28" r="3" className="text-gray-700" fill="currentColor" />
      <path d="M50 35 L50 48 Q48 52 50 54 Q52 52 50 48" strokeWidth="3" stroke="currentColor" fill="none" />
      <path d="M40 60 L45 58 L50 60 L55 58 L60 60" strokeWidth="2" stroke="currentColor" fill="none" className="text-gray-600" opacity="0.4" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-blue-400/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="32" rx="16" ry="19" />
      <path d="M34 49 Q50 59 66 49 L66 88 L34 88 Z" />
      <rect x="27" y="51" width="8" height="25" rx="3" />
      <rect x="65" y="51" width="8" height="25" rx="3" />
      <path d="M38 88 L38 96 M62 88 L62 96" strokeWidth="6" stroke="currentColor" fill="none" />
      <circle cx="44" cy="30" r="4" className="text-cyan-300" fill="currentColor" />
      <circle cx="56" cy="30" r="4" className="text-cyan-300" fill="currentColor" />
      <circle cx="44" cy="30" r="2" className="text-blue-600" fill="currentColor" />
      <circle cx="56" cy="30" r="2" className="text-blue-600" fill="currentColor" />
      <path d="M40 20 L35 15 M45 18 L42 12 M55 18 L58 12 M60 20 L65 15" strokeWidth="2" stroke="currentColor" fill="none" className="text-blue-300" opacity="0.5" />
    </svg>
  ),
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
  icon: (
    <svg className="w-12 h-12 text-teal-500/40" viewBox="0 0 100 100" fill="currentColor">
      <ellipse cx="50" cy="32" rx="15" ry="18" />
      <path d="M35 48 Q50 58 65 48 L65 88 L35 88 Z" />
      <rect x="28" y="50" width="8" height="25" rx="3" />
      <rect x="64" y="50" width="8" height="25" rx="3" />
      <path d="M38 88 L38 96 M62 88 L62 96" strokeWidth="6" stroke="currentColor" fill="none" />
      <circle cx="45" cy="30" r="2.5" />
      <circle cx="55" cy="30" r="2.5" />
      <path d="M32 52 L28 55 L32 58 M68 52 L72 55 L68 58" className="text-green-500" fill="currentColor" />
      <path d="M40 60 Q35 62 35 67 M60 60 Q65 62 65 67" strokeWidth="2" stroke="currentColor" fill="none" className="text-teal-400" opacity="0.6" />
      <path d="M45 70 L48 73 L51 70 M49 73 L49 78" strokeWidth="2" stroke="currentColor" fill="none" className="text-green-400" />
    </svg>
  ),
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
