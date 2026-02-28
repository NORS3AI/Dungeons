/**
 * Race-based name tables for the random name generator.
 * First names are split by gender (male/female); surnames are gender-neutral.
 */

export type NameGender = 'male' | 'female' | 'neutral'

export interface RaceNames {
  raceId: string
  label: string
  male: string[]
  female: string[]
  surnames: string[]
  nicknameHints?: string[] // Optional nickname suggestions
}

export const RACE_NAME_TABLES: RaceNames[] = [
  {
    raceId: 'human',
    label: 'Human',
    male: [
      'Aldric', 'Beren', 'Cael', 'Darian', 'Edmund', 'Faelen', 'Gareth',
      'Hadwin', 'Idris', 'Jareth', 'Kael', 'Leoric', 'Maren', 'Nolan',
      'Oswin', 'Percival', 'Quinlan', 'Rodric', 'Savin', 'Theron',
      'Uther', 'Vance', 'Warden', 'Xander', 'Yorick', 'Zane',
    ],
    female: [
      'Aelith', 'Brynn', 'Celia', 'Dara', 'Elowen', 'Faye', 'Gwyn',
      'Hana', 'Isla', 'Jessa', 'Kira', 'Liora', 'Mira', 'Nessa',
      'Orla', 'Petra', 'Quinn', 'Rona', 'Sable', 'Tara',
      'Una', 'Vera', 'Wren', 'Xyla', 'Yara', 'Zoe',
    ],
    surnames: [
      'Ashvale', 'Blackwood', 'Caldwell', 'Dunmore', 'Eastwood', 'Fairfield',
      'Greystone', 'Harwick', 'Irondale', 'Jasper', 'Kirkland', 'Lorne',
      'Morrow', 'Northgate', 'Oakhurst', 'Penrose', 'Redfield', 'Stonewall',
      'Thatcher', 'Underwood', 'Vane', 'Westbridge', 'Yarwick',
    ],
    nicknameHints: ['Quickhand', 'Ironjaw', 'the Bold', 'Silvertongue', 'Three-Fingers'],
  },
  {
    raceId: 'elf',
    label: 'Elf',
    male: [
      'Aelindra', 'Caladwen', 'Erevan', 'Faelas', 'Galenodel', 'Hadarai',
      'Immeral', 'Jelenneth', 'Keyleth', 'Laerel', 'Mirthal', 'Naivara',
      'Quarion', 'Riardon', 'Soveliss', 'Thamior', 'Varis', 'Zannifer',
      'Adran', 'Berrian', 'Carric', 'Dayereth', 'Enialis', 'Fivin',
    ],
    female: [
      'Adrie', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Bethrynna',
      'Birel', 'Caelynn', 'Drusilia', 'Enna', 'Felosial', 'Ielenia',
      'Ilanis', 'Irann', 'Keyleth', 'Leshanna', 'Lia', 'Mialee',
      'Naivara', 'Quelenna', 'Quillathe', 'Sariel', 'Shava', 'Silaqui',
    ],
    surnames: [
      'Amakiir', 'Amastacia', 'Galanodel', 'Holimion', 'Ilphelkiir',
      'Liadon', 'Meliamne', 'Naïlo', 'Siannodel', 'Xiloscient',
      'Moonwhisper', 'Starweaver', 'Dawnbringer', 'Silverleaf', 'Goldenfern',
    ],
    nicknameHints: ['Moonshadow', 'Swiftarrow', 'Dawnseeker', 'Leafdancer'],
  },
  {
    raceId: 'dwarf',
    label: 'Dwarf',
    male: [
      'Adrik', 'Alberich', 'Baern', 'Barendd', 'Brottor', 'Bruenor',
      'Dain', 'Darrak', 'Delg', 'Eberk', 'Einkil', 'Fargrim',
      'Flint', 'Gardain', 'Harbek', 'Kildrak', 'Morgran', 'Orsik',
      'Oskar', 'Rangrim', 'Rurik', 'Taklinn', 'Thoradin', 'Thorin',
      'Tordek', 'Traubon', 'Travok', 'Ulfgar', 'Veit', 'Vondal',
    ],
    female: [
      'Amber', 'Artin', 'Audhild', 'Bardryn', 'Dagnal', 'Diesa',
      'Eldeth', 'Falkrunn', 'Finellen', 'Gunnloda', 'Gurdis', 'Helja',
      'Hlin', 'Kathra', 'Kristryd', 'Ilde', 'Liftrasa', 'Mardred',
      'Riswynn', 'Sannl', 'Torbera', 'Torgga', 'Vistra',
    ],
    surnames: [
      'Balderk', 'Dankil', 'Gorunn', 'Holderhek', 'Loderr', 'Lutgehr',
      'Rumnaheim', 'Strakeln', 'Torunn', 'Ungart', 'Copperforge',
      'Goldmantle', 'Ironbrew', 'Stonebrow', 'Hammerfall', 'Anvilheart',
    ],
    nicknameHints: ['Stoneaxe', 'Ironbeard', 'Goldvein', 'Coppernose', 'Keg-drinker'],
  },
  {
    raceId: 'halfling',
    label: 'Halfling',
    male: [
      'Alton', 'Ander', 'Bernie', 'Bobbin', 'Cade', 'Callus', 'Corrin',
      'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal', 'Lyle', 'Merric',
      'Milo', 'Osborn', 'Posco', 'Pullman', 'Quentis', 'Rosco',
      'Tomlin', 'Wellby',
    ],
    female: [
      'Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri',
      'Lavinia', 'Lidda', 'Merla', 'Nedda', 'Paela', 'Portia',
      'Seraphina', 'Shaena', 'Tamsin', 'Vani', 'Verna', 'Wenna',
    ],
    surnames: [
      'Brushgather', 'Goodbarrel', 'Greenbottle', 'High-hill', 'Hilltopple',
      'Leagallow', 'Tealeaf', 'Thorngage', 'Tosscobble', 'Underbough',
      'Brightwater', 'Farhill', 'Meadowfoot',
    ],
    nicknameHints: ['Nimblefingers', 'Quickstep', 'Luckycharm', 'Barefoot', 'Pebbleskip'],
  },
  {
    raceId: 'gnome',
    label: 'Gnome',
    male: [
      'Alston', 'Alvyn', 'Boddynock', 'Brocc', 'Burgell', 'Dimble',
      'Eldon', 'Erky', 'Fonkin', 'Frug', 'Gerbo', 'Gimble',
      'Glim', 'Jebeddo', 'Kellen', 'Namfoodle', 'Orryn', 'Roondar',
      'Seebo', 'Sindri', 'Warryn', 'Wrenn', 'Zook',
    ],
    female: [
      'Bimpnottin', 'Breena', 'Caramip', 'Carlin', 'Donella', 'Duvamil',
      'Ella', 'Ellyjobell', 'Ellywick', 'Lilli', 'Loopmottin',
      'Lorilla', 'Mardnab', 'Nissa', 'Nyx', 'Oda', 'Orla',
      'Roywyn', 'Shamil', 'Tana', 'Waywocket', 'Zanna',
    ],
    surnames: [
      'Beren', 'Boffin', 'Burbur', 'Chubbs', 'Daergel', 'Folkor',
      'Garrick', 'Nackle', 'Murnig', 'Ningel', 'Raulnor', 'Scheppen',
      'Turen', 'Wrenchbolt', 'Cogsworth', 'Tinklewick', 'Springcoil',
    ],
    nicknameHints: ['Fizzpop', 'Whirligig', 'Sparks', 'Tinkertoe', 'Boomgear'],
  },
  {
    raceId: 'half-elf',
    label: 'Half-Elf',
    male: [
      'Aramil', 'Arannis', 'Aust', 'Beiro', 'Berrian', 'Carric',
      'Dayereth', 'Enialis', 'Erdan', 'Erevan', 'Galinndan', 'Hadarai',
      'Heian', 'Himo', 'Immeral', 'Ivellios', 'Laucian', 'Mindartis',
    ],
    female: [
      'Adrie', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Bethrynna',
      'Birel', 'Caelynn', 'Drusilia', 'Enna', 'Felosial', 'Ielenia',
      'Ilanis', 'Irann', 'Jessa', 'Leshanna', 'Lia', 'Mialee',
    ],
    surnames: [
      'Ashvale', 'Moonwhisper', 'Thornwood', 'Silverleaf', 'Goldenfern',
      'Blackwood', 'Liadon', 'Siannodel', 'Oakdale', 'Rivermark',
    ],
    nicknameHints: ['Twiceborn', 'the Wanderer', 'Bridgewalker', 'Halfblood'],
  },
  {
    raceId: 'half-orc',
    label: 'Half-Orc',
    male: [
      'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth',
      'Krusk', 'Mhurren', 'Ront', 'Shump', 'Thokk', 'Zorgar',
      'Brug', 'Garuk', 'Morag', 'Trusk', 'Vorn',
    ],
    female: [
      'Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega',
      'Ovak', 'Ownka', 'Shautha', 'Sutha', 'Vola', 'Volen', 'Yevelda',
      'Ghera', 'Harka', 'Morra',
    ],
    surnames: [
      'Bloodaxe', 'Grimjaw', 'Ironhide', 'Rageclaw', 'Stonefist',
      'Darkmoor', 'Grimstone', 'Thunderfist', 'Blackthorn', 'Skullsplitter',
    ],
    nicknameHints: ['Bonecrusher', 'Scarface', 'Two-Tusks', 'Gravevoice', 'the Hammer'],
  },
  {
    raceId: 'tiefling',
    label: 'Tiefling',
    male: [
      'Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados',
      'Kairon', 'Leucis', 'Melech', 'Mordai', 'Morthos', 'Pelaios',
      'Skamos', 'Therai', 'Zafiro', 'Izar', 'Embrix',
    ],
    female: [
      'Akta', 'Anakis', 'Bryseis', 'Criella', 'Damaia', 'Ea',
      'Kallista', 'Lerissa', 'Makaria', 'Nemeia', 'Orianna', 'Phelaia',
      'Rieta', 'Zafira', 'Vesper', 'Ash', 'Cinder',
    ],
    surnames: [
      'Art', 'Carrion', 'Chant', 'Creed', 'Despair', 'Dolor',
      'Doom', 'Dread', 'Fate', 'Fear', 'Fell', 'Flame', 'Gloom',
      'Glower', 'Haunt', 'Honor', 'Hope', 'Infamy', 'Lament',
      'Light', 'Malice', 'Mire', 'Penance', 'Ruin', 'Scorn',
      'Torment', 'Vengeance', 'Vice', 'Woe', 'Wrath',
    ],
    nicknameHints: ['Hellborn', 'the Fallen', 'Ashblood', 'Embervein', 'Duskchild'],
  },
  {
    raceId: 'aasimar',
    label: 'Aasimar',
    male: [
      'Adolar', 'Aelar', 'Aewin', 'Amriel', 'Arael', 'Caelum',
      'Dawniel', 'Elias', 'Emriel', 'Eremiel', 'Ezrael', 'Gabriel',
      'Hadrial', 'Ithuriel', 'Laerel', 'Lumiel', 'Mithriel', 'Oriel',
      'Raphiel', 'Sariel', 'Uriel', 'Zoriel',
    ],
    female: [
      'Adara', 'Aelindra', 'Aeli', 'Caela', 'Celestia', 'Dawna',
      'Elara', 'Emriel', 'Eresa', 'Iolara', 'Irielle', 'Laeticia',
      'Lumina', 'Miriel', 'Naerial', 'Radiance', 'Seraph', 'Solara',
      'Stariel', 'Uriela', 'Valeria',
    ],
    surnames: [
      'Brightmantle', 'Dawnborn', 'Goldenhalo', 'Heavensworn', 'Holyblood',
      'Lightborn', 'Luminara', 'Silverblessed', 'Sunwalker', 'Starblessed',
    ],
    nicknameHints: ['Dawnbearer', 'the Blessed', 'Lightbringer', 'Haloworn', 'Goldwing'],
  },
  {
    raceId: 'goblin',
    label: 'Goblin',
    male: [
      'Bik', 'Blark', 'Brug', 'Dak', 'Droop', 'Finn', 'Gix',
      'Grub', 'Guts', 'Iggs', 'Krix', 'Nix', 'Plug', 'Ripp',
      'Skig', 'Splug', 'Stink', 'Wirt', 'Zags', 'Zix',
    ],
    female: [
      'Bek', 'Brix', 'Drix', 'Frix', 'Grix', 'Hexx', 'Ixxi',
      'Jixx', 'Kixx', 'Mixx', 'Nixx', 'Pixx', 'Rixx', 'Sixx',
      'Vix', 'Wixx', 'Yixx',
    ],
    surnames: [
      'Biteback', 'Bograt', 'Dirtgrub', 'Foulstench', 'Kneecapper',
      'Mudgobber', 'Rotbiter', 'Scratchback', 'Sharpnail', 'Smallthorn',
    ],
    nicknameHints: ['Stinky', 'Sneakfoot', 'Bignose', 'Lucky', 'Toothache'],
  },
  {
    raceId: 'orc',
    label: 'Orc',
    male: [
      'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth',
      'Krusk', 'Mhurren', 'Ront', 'Shump', 'Thokk',
      'Brug', 'Garuk', 'Morag', 'Trusk', 'Vorn', 'Gorash', 'Urgak',
    ],
    female: [
      'Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega',
      'Ovak', 'Ownka', 'Shautha', 'Sutha', 'Vola', 'Volen',
      'Yevelda', 'Ghera', 'Harka', 'Morra', 'Ulka',
    ],
    surnames: [
      'Bloodaxe', 'Grimjaw', 'Ironhide', 'Rageclaw', 'Stonefist',
      'Darkmoor', 'Grimstone', 'Thunderfist', 'Blackthorn',
    ],
    nicknameHints: ['Bonecrusher', 'Bloodhand', 'Two-Tusks', 'Warchief', 'the Brutal'],
  },
]

/** Returns names for a given race id, falling back to Human if not found. */
export function getNamesForRace(raceId: string): RaceNames {
  return RACE_NAME_TABLES.find((r) => r.raceId === raceId) ?? RACE_NAME_TABLES[0]
}

/** Picks a random element from an array. */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Generate a random name for a given race and gender. */
export function generateRandomName(
  raceId: string,
  gender: 'male' | 'female' | 'neutral' = 'neutral',
): { firstName: string; surname: string } {
  const table = getNamesForRace(raceId)
  const firstName =
    gender === 'female'
      ? pick(table.female)
      : gender === 'male'
      ? pick(table.male)
      : pick([...table.male, ...table.female])
  const surname = pick(table.surnames)
  return { firstName, surname }
}
