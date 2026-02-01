import { useState, useEffect } from 'react'
import type { Race } from '../types'

// Extended race lore and data
export interface RaceLoreData {
  imageUrl: string
  lore: string[]
  physicalTraits: string[]
  culture: string[]
  adventurers: string
  nameExamples: {
    male: string[]
    female: string[]
    surnames?: string[]
  }
}

// Spell data for tooltips
export interface SpellQuickRef {
  id: string
  name: string
  school: string
  level: number | 'cantrip'
  castingTime: string
  range: string
  components: string
  duration: string
  description: string
}

// Extended lore for each race
const RACE_LORE: Record<string, RaceLoreData> = {
  drow: {
    imageUrl: '/images/races/drow.png',
    lore: [
      'The Drow, also known as dark elves, are a subrace of elves that live in the Underdark, a vast network of underground caverns and tunnels. They are known for their jet-black skin, white or silver hair, and eyes that glow with shades of red, purple, or pale blue.',
      'Long ago, the drow were surface elves who followed the goddess Lolth into the depths of the earth. Over millennia, they adapted to their sunless realm, developing superior darkvision and innate magical abilities.',
      'Drow society is matriarchal and ruthless, ruled by priestesses of Lolth, the Spider Queen. Their cities are wonders of dark architecture, illuminated by bioluminescent fungi and magical lights.',
    ],
    physicalTraits: [
      'Obsidian-black skin that ranges from dark grey to pure black',
      'White, silver, or pale yellow hair, often worn long',
      'Eyes that glow in shades of red, amber, or pale lilac',
      'Slender and graceful build, typically 5-6 feet tall',
      'Pointed ears characteristic of all elves',
      'Lifespan of 700+ years',
    ],
    culture: [
      'Matriarchal society dominated by priestesses of Lolth',
      'Value cunning, ambition, and magical prowess',
      'Houses (noble families) constantly vie for power',
      'Exceptional craftsmanship, especially with weapons and armor',
      'Practice of slavery is common in traditional drow cities',
      'Some drow reject their dark heritage and live on the surface',
    ],
    adventurers: 'Drow adventurers are often outcasts or exiles from their society, whether by choice or circumstance. Some flee the cruelty of Lolth\'s worship, while others seek power and knowledge beyond the Underdark. Surface-dwellers often view drow with suspicion, making trust hard-won but valuable.',
    nameExamples: {
      male: ['Drizzt', 'Jarlaxle', 'Zaknafein', 'Pharaun', 'Ryld'],
      female: ['Quenthel', 'Viconia', 'Liriel', 'Malice', 'Triel'],
      surnames: ['Do\'Urden', 'Baenre', 'Oblodra', 'Xorlarrin', 'Melarn'],
    },
  },
  tiefling: {
    imageUrl: '/images/races/tiefling.png',
    lore: [
      'Tieflings are humans whose bloodlines carry the touch of the Nine Hells. Whether through ancient pacts, diabolic ancestry, or magical corruption, infernal power courses through their veins, manifesting in their distinctive appearance.',
      'The infernal heritage of tieflings is not a choice but a birthright, passed down through generations. Even tieflings born to human parents can manifest these traits if the bloodline carries the infernal taint.',
      'Despite their fearsome appearance, tieflings are not inherently evil. Many struggle against the prejudice of those who see only their diabolic features, striving to prove their worth through heroic deeds.',
    ],
    physicalTraits: [
      'Skin ranging from human tones to shades of red, purple, or blue',
      'Horns of various shapes: ram-like, straight, or curved',
      'Solid-colored eyes: black, red, white, silver, or gold (no visible pupil)',
      'Pointed teeth, especially prominent canines',
      'A thick, non-prehensile tail 4-5 feet long',
      'Some have hooves or cloven feet',
      'Normal human lifespan, though some live slightly longer',
    ],
    culture: [
      'No unified tiefling culture; they integrate into other societies',
      'Often face discrimination and suspicion from others',
      'Some embrace their heritage, others hide or reject it',
      'Tend to be self-reliant due to societal rejection',
      'May feel a pull toward both good and evil impulses',
      'Often drawn to professions where their appearance is an asset',
    ],
    adventurers: 'Tiefling adventurers often take to the road to escape prejudice, find acceptance, or prove themselves. Some embrace their infernal nature, using fear as a tool, while others work tirelessly to demonstrate that heritage does not determine destiny. Their natural charisma and resilience make them natural leaders and performers.',
    nameExamples: {
      male: ['Amnon', 'Mordecai', 'Damakos', 'Kairon', 'Leucis'],
      female: ['Akta', 'Bryseis', 'Kallista', 'Orianna', 'Rieta'],
      surnames: ['Virtue names are common: Glory, Hope, Fear, Despair, Poetry'],
    },
  },
  human: {
    imageUrl: '/images/races/human.png',
    lore: [
      'Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.',
      'In the reckonings of most worlds, humans are the youngest of the common races, late to arrive on the world scene and short-lived in comparison to dwarves, elves, and dragons. Perhaps it is because of their shorter lives that they strive to achieve as much as they can in the years they are given.',
      'Humans are more physically diverse than other common races. Their skin shades range from nearly black to very pale, hair from black to blond, and facial hair from sparse to thick. A human can live to be around 100 years old.',
    ],
    physicalTraits: [
      'Height ranges from barely 5 feet to well over 6 feet tall',
      'Skin tones from pale to dark brown',
      'Hair colors including black, brown, blond, and red',
      'Average build varies widely by region and lifestyle',
      'Lifespan of about 80-100 years',
      'Reach physical adulthood in late teens',
    ],
    culture: [
      'Humans build lasting institutions and leave legacies',
      'Diverse customs, religion, and governance across regions',
      'Known for adaptability and ambition',
      'Often serve as bridges between other races',
      'Value individual achievement and freedom',
      'Quick to form alliances and organizations',
    ],
    adventurers: 'Human adventurers are driven by countless motivations: glory, wealth, knowledge, or simply wanderlust. Their short lifespans push them to make their mark quickly, leading to bold decisions and daring exploits. Humans fit into any adventuring role with ease.',
    nameExamples: {
      male: ['Marcus', 'Erik', 'Roland', 'Gareth', 'Thomas'],
      female: ['Elena', 'Mira', 'Sarah', 'Diana', 'Rose'],
      surnames: ['Blackwood', 'Ashford', 'Greenfield', 'Stormwind', 'Brightblade'],
    },
  },
  'half-elf': {
    imageUrl: '/images/races/half-elf.png',
    lore: [
      'Half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition tempered by the refined senses, love of nature, and artistic tastes of the elves.',
      'Some half-elves live among humans, set apart by their emotional and physical differences. Others live with elves, growing restless as they reach adulthood while their peers continue to live as children.',
      'Many half-elves, unable to fit into either society, choose lives of solitary wandering or join with other misfits and outcasts in the adventuring life.',
    ],
    physicalTraits: [
      'Height similar to humans, typically 5 to 6 feet',
      'More slender than humans but heavier than elves',
      'Pointed ears, though less prominent than full elves',
      'Often strikingly attractive by both human and elven standards',
      'Lifespan of about 180 years',
      'Mature at roughly the same rate as humans',
    ],
    culture: [
      'No lands of their own; live in human or elven settlements',
      'Often serve as diplomats between races',
      'Value both elven artistry and human progress',
      'May feel like outsiders in both parent cultures',
      'Form strong bonds with other half-elves',
      'Adaptable social chameleons',
    ],
    adventurers: 'Half-elves often become adventurers because they don\'t truly belong anywhere else. They combine elven patience with human drive, making them excellent at long-term plans while remaining adaptable. Their natural charisma makes them effective leaders and negotiators.',
    nameExamples: {
      male: ['Aramil', 'Kerwyn', 'Therion', 'Elaris', 'Daelen'],
      female: ['Aerith', 'Lyria', 'Seraphina', 'Evelyn', 'Celeste'],
      surnames: ['Moonwhisper', 'Starling', 'Dawnbreaker', 'Silverleaf'],
    },
  },
  dwarf: {
    imageUrl: '/images/races/dwarf.png',
    lore: [
      'Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. They stand well under 5 feet tall but are so broad and compact that they can weigh as much as a human standing nearly two feet taller.',
      'Dwarven kingdoms stretch deep beneath the mountains where the dwarves mine gems and precious metals and forge items of wonder. They love the beauty and artistry of precious metals and fine jewelry.',
      'Dwarves who take up the adventuring life might be motivated by a desire to recover lost treasures of their ancestors, to experience the wonders of the world, or to seek glory in battle.',
    ],
    physicalTraits: [
      'Height averages 4 to 4.5 feet',
      'Broad and compact, weighing as much as taller humans',
      'Skin ranges from deep brown to pale, often ruddy',
      'Hair typically black, gray, or brown, worn long',
      'Males (and some females) have elaborate beards',
      'Lifespan of 350+ years',
    ],
    culture: [
      'Deep respect for elders and ancestors',
      'Organized into clans with long histories',
      'Master craftspeople, especially in stone and metal',
      'Value honor, tradition, and hard work',
      'Grudges can last generations',
      'Strong sense of justice and fairness',
    ],
    adventurers: 'Dwarves who leave their mountain homes often do so to reclaim lost artifacts, avenge ancient wrongs, or fulfill oaths made to allies. Their resilience and combat training make them stalwart companions. A dwarf\'s word is their bond, and they never abandon their friends.',
    nameExamples: {
      male: ['Thorin', 'Bruenor', 'Gimli', 'Balin', 'Dwalin'],
      female: ['Amber', 'Helga', 'Dagnal', 'Gurdis', 'Mardred'],
      surnames: ['Ironfist', 'Stonehammer', 'Fireforge', 'Battlebeard', 'Goldvein'],
    },
  },
}

// Spell quick reference data
const SPELL_DATA: Record<string, SpellQuickRef> = {
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
    description: 'Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice). Any creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed dim light in a 10-foot radius. Any attack roll against an affected creature or object has advantage if the attacker can see it, and the affected creature or object can\'t benefit from being invisible.',
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
    description: 'Magical darkness spreads from a point you choose within range to fill a 15-foot-radius sphere for the duration. The darkness spreads around corners. A creature with darkvision can\'t see through this darkness, and nonmagical light can\'t illuminate it. Completely covering the source of the darkness with an opaque object blocks the darkness.',
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
    description: 'You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects: Your voice booms up to three times as loud, you cause flames to flicker, brighten, dim, or change color, you cause harmless tremors in the ground, you create an instantaneous sound, you cause an unlocked door or window to fly open or slam shut, or you alter the appearance of your eyes for 1 minute.',
  },
  'hellish-rebuke': {
    id: 'hellish-rebuke',
    name: 'Hellish Rebuke',
    school: 'Evocation',
    level: 1,
    castingTime: '1 reaction (when damaged by a creature within 60 feet)',
    range: '60 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'You point your finger, and the creature that damaged you is momentarily surrounded by hellish flames. The creature must make a Dexterity saving throw. It takes 2d10 fire damage on a failed save, or half as much damage on a successful one. At Higher Levels: When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st.',
  },
}

interface RaceDetailModalProps {
  race: Race
  isOpen: boolean
  onClose: () => void
}

interface SpellTooltipProps {
  spell: SpellQuickRef
  onClose: () => void
}

/**
 * Spell Tooltip Component
 */
function SpellTooltip({ spell, onClose }: SpellTooltipProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-gray-900 border-2 border-purple-500 rounded-xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-xl font-bold text-purple-400">{spell.name}</h4>
            <p className="text-sm text-gray-400">
              {spell.level === 'cantrip' ? 'Cantrip' : `Level ${spell.level}`} {spell.school}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            aria-label="Close spell details"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Spell Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="p-2 bg-gray-800 rounded">
            <span className="text-gray-500">Casting Time:</span>
            <span className="text-white ml-1">{spell.castingTime}</span>
          </div>
          <div className="p-2 bg-gray-800 rounded">
            <span className="text-gray-500">Range:</span>
            <span className="text-white ml-1">{spell.range}</span>
          </div>
          <div className="p-2 bg-gray-800 rounded col-span-2">
            <span className="text-gray-500">Components:</span>
            <span className="text-white ml-1">{spell.components}</span>
          </div>
          <div className="p-2 bg-gray-800 rounded col-span-2">
            <span className="text-gray-500">Duration:</span>
            <span className="text-white ml-1">{spell.duration}</span>
          </div>
        </div>

        {/* Description */}
        <div className="p-3 bg-gray-800/50 rounded-lg">
          <p className="text-gray-300 text-sm leading-relaxed">{spell.description}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Format ability name for display
 */
function formatAbilityName(key: string): string {
  const names: Record<string, string> = {
    strength: 'Strength',
    dexterity: 'Dexterity',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    wisdom: 'Wisdom',
    charisma: 'Charisma',
  }
  return names[key] || key
}

/**
 * Get school color
 */
function getSchoolColor(school: string): string {
  const colors: Record<string, string> = {
    Evocation: 'text-red-400',
    Transmutation: 'text-yellow-400',
    Conjuration: 'text-blue-400',
    Abjuration: 'text-cyan-400',
    Divination: 'text-purple-400',
    Enchantment: 'text-pink-400',
    Illusion: 'text-indigo-400',
    Necromancy: 'text-green-400',
  }
  return colors[school] || 'text-gray-400'
}

/**
 * Race Detail Modal Component
 * Full-screen modal with comprehensive race information
 */
export function RaceDetailModal({ race, isOpen, onClose }: RaceDetailModalProps) {
  const [activeSpell, setActiveSpell] = useState<SpellQuickRef | null>(null)
  const loreData = RACE_LORE[race.id]

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeSpell) {
          setActiveSpell(null)
        } else {
          onClose()
        }
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, activeSpell, onClose])

  if (!isOpen) return null

  const handleSpellClick = (spellId: string) => {
    const spell = SPELL_DATA[spellId]
    if (spell) {
      setActiveSpell(spell)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative bg-gray-900 rounded-2xl border border-dnd-gold/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image */}
        <div className="relative h-64 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl overflow-hidden">
          {/* Race Image or Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            {race.id === 'drow' ? (
              <svg className="w-48 h-48 text-purple-500/30" viewBox="0 0 100 100" fill="currentColor">
                {/* Stylized Drow silhouette */}
                <ellipse cx="50" cy="25" rx="20" ry="25" />
                <path d="M30 50 L50 90 L70 50 Q50 70 30 50" />
                <path d="M25 20 L15 10 M75 20 L85 10" stroke="currentColor" strokeWidth="3" fill="none" />
                <circle cx="42" cy="22" r="3" className="text-red-500" fill="currentColor" />
                <circle cx="58" cy="22" r="3" className="text-red-500" fill="currentColor" />
              </svg>
            ) : race.id === 'tiefling' ? (
              <svg className="w-48 h-48 text-red-500/30" viewBox="0 0 100 100" fill="currentColor">
                {/* Stylized Tiefling silhouette */}
                <ellipse cx="50" cy="30" rx="18" ry="22" />
                <path d="M32 50 L50 95 L68 50 Q50 70 32 50" />
                {/* Horns */}
                <path d="M35 15 Q25 0 20 5 Q30 15 35 20" />
                <path d="M65 15 Q75 0 80 5 Q70 15 65 20" />
                {/* Tail */}
                <path d="M50 90 Q70 85 75 95 Q78 98 82 95" stroke="currentColor" strokeWidth="3" fill="none" />
                <circle cx="44" cy="27" r="3" className="text-yellow-500" fill="currentColor" />
                <circle cx="56" cy="27" r="3" className="text-yellow-500" fill="currentColor" />
              </svg>
            ) : (
              <div className="text-gray-600 text-6xl">?</div>
            )}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Race name overlay */}
          <div className="absolute bottom-4 left-6">
            <h2 className="text-4xl font-bold text-dnd-gold">{race.name}</h2>
            <p className="text-gray-400 capitalize">{race.size} humanoid</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-800/50 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-dnd-gold">{race.speed} ft</div>
              <div className="text-xs text-gray-500 uppercase">Speed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dnd-gold">{race.visionRange || '-'} ft</div>
              <div className="text-xs text-gray-500 uppercase">
                {race.vision === 'superiorDarkvision' ? 'Superior Darkvision' : race.vision === 'darkvision' ? 'Darkvision' : 'Vision'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dnd-gold">{race.languages.length}</div>
              <div className="text-xs text-gray-500 uppercase">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dnd-gold">{race.spells?.length || 0}</div>
              <div className="text-xs text-gray-500 uppercase">Innate Spells</div>
            </div>
          </div>

          {/* Ability Score Increases */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Ability Score Increases
            </h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(race.abilityBonuses)
                .filter(([, value]) => value !== undefined && value !== 0)
                .map(([ability, bonus]) => (
                  <div
                    key={ability}
                    className="flex items-center gap-3 px-5 py-3 bg-dnd-gold/10 border border-dnd-gold/30 rounded-lg"
                  >
                    <span className="text-white font-medium text-lg">{formatAbilityName(ability)}</span>
                    <span className="text-dnd-gold font-bold text-2xl">+{bonus}</span>
                  </div>
                ))}
            </div>
          </section>

          {/* Lore Section */}
          {loreData && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Lore & History
              </h3>
              <div className="space-y-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                {loreData.lore.map((paragraph, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {/* Physical Traits */}
          {loreData && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Physical Characteristics
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {loreData.physicalTraits.map((trait, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 bg-gray-800/30 rounded-lg">
                    <span className="text-dnd-gold mt-1">&#8226;</span>
                    <span className="text-gray-300">{trait}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Racial Traits */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Racial Abilities
            </h3>
            <div className="space-y-3">
              {race.traits.map((trait) => (
                <div key={trait.id} className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-dnd-gold/30 transition-colors">
                  <h4 className="text-lg font-semibold text-dnd-gold mb-2">{trait.name}</h4>
                  <p className="text-gray-300">{trait.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Innate Spellcasting */}
          {race.spells && race.spells.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Innate Spellcasting
                <span className="text-sm font-normal text-gray-400">(Click spells for details)</span>
              </h3>
              <div className="space-y-2">
                {race.spells.map((spell) => {
                  const spellData = SPELL_DATA[spell.spellId]
                  return (
                    <button
                      key={spell.spellId}
                      onClick={() => handleSpellClick(spell.spellId)}
                      className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500/50 hover:bg-gray-800/80 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-purple-900/30 rounded-lg group-hover:bg-purple-900/50 transition-colors">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium group-hover:text-purple-300 transition-colors">
                              {spell.spellName}
                            </span>
                            {spellData && (
                              <span className={`text-xs ${getSchoolColor(spellData.school)}`}>
                                {spellData.school}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-400">
                            Unlocked at level {spell.levelGained}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full">
                          {spell.usesPerDay === 'atwill' ? 'At Will' : `${spell.usesPerDay}/day`}
                        </span>
                        <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {/* Weapon Proficiencies */}
          {race.weaponProficiencies && race.weaponProficiencies.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Weapon Proficiencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {race.weaponProficiencies.map((weapon) => (
                  <span
                    key={weapon}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg capitalize border border-gray-700"
                  >
                    {weapon.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Damage Resistances */}
          {race.damageResistances && race.damageResistances.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Damage Resistances
              </h3>
              <div className="flex flex-wrap gap-2">
                {race.damageResistances.map((resistance) => (
                  <span
                    key={resistance}
                    className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg capitalize border border-red-900/50"
                  >
                    {resistance}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {race.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700"
                >
                  {lang}
                </span>
              ))}
            </div>
          </section>

          {/* Culture */}
          {loreData && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Society & Culture
              </h3>
              <ul className="space-y-2">
                {loreData.culture.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-dnd-gold mt-0.5">&#8226;</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Adventurers */}
          {loreData && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                As Adventurers
              </h3>
              <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                <p className="text-gray-300 leading-relaxed italic">{loreData.adventurers}</p>
              </div>
            </section>
          )}

          {/* Name Examples */}
          {loreData && (
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-dnd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Example Names
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/30 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Male Names</h4>
                  <p className="text-gray-300">{loreData.nameExamples.male.join(', ')}</p>
                </div>
                <div className="p-4 bg-gray-800/30 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Female Names</h4>
                  <p className="text-gray-300">{loreData.nameExamples.female.join(', ')}</p>
                </div>
                {loreData.nameExamples.surnames && (
                  <div className="p-4 bg-gray-800/30 rounded-xl md:col-span-2">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Surnames / Family Names</h4>
                    <p className="text-gray-300">{loreData.nameExamples.surnames.join(', ')}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Close Button */}
          <div className="pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-dnd-gold text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-dnd-gold focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Spell Tooltip */}
      {activeSpell && (
        <SpellTooltip spell={activeSpell} onClose={() => setActiveSpell(null)} />
      )}
    </div>
  )
}
