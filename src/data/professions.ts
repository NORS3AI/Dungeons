/**
 * Daily income professions for D&D 5e
 * Players roll 2d100 (2–200) to determine daily earnings based on their profession/lifestyle
 */

export type CurrencyType = 'copper' | 'silver' | 'gold' | 'platinum'

export interface ProfessionFlavour {
  duties: string[]
  perks: string[]
}

export interface Profession {
  id: string
  name: string
  category: 'wretched' | 'poverty' | 'poor' | 'lower-modest' | 'modest' | 'comfortable' | 'wealthy' | 'land-owner' | 'nobility'
  dailyIncome: {
    amount: number
    currency: CurrencyType
  }
  description: string
  d100Range: [number, number] // Min and max roll on 2d100 (2–200)
  flavour: ProfessionFlavour
}

// Cost ladder for purchasing additional professions (up to 10)
export const PROFESSION_COST_LADDER = [
  100, 300, 500, 700, 1_000, 2_000, 3_000, 5_000, 7_500, 10_000,
] as const

// =====================================================================
// WRETCHED — 1–15 cp/day (2d100: 2–23)
// =====================================================================

const WRETCHED_PROFESSIONS: Profession[] = [
  {
    id: 'outcast',
    name: 'Outcast',
    category: 'wretched',
    dailyIncome: { amount: 1, currency: 'copper' },
    description: 'Banished from society, scraping survival from refuse and charity.',
    d100Range: [2, 3],
    flavour: {
      duties: ['Scavenge food scraps from gutters and refuse piles', 'Avoid town guards who would move you along', 'Find shelter from weather each night'],
      perks: ['Invisible to the powerful — you overhear everything', 'Intimate knowledge of the city\'s underbelly'],
    },
  },
  {
    id: 'urchin',
    name: 'Street Urchin',
    category: 'wretched',
    dailyIncome: { amount: 1, currency: 'copper' },
    description: 'Homeless children surviving on the streets by their wits.',
    d100Range: [4, 5],
    flavour: {
      duties: ['Run errands for a copper or two', 'Pickpocket when desperate', 'Stay one step ahead of orphanage catchers'],
      perks: ['Small enough to fit through gaps and windows', 'Street smarts — advantage on Stealth in urban areas'],
    },
  },
  {
    id: 'beggar',
    name: 'Beggar',
    category: 'wretched',
    dailyIncome: { amount: 2, currency: 'copper' },
    description: 'Those who survive by begging for coin at crossroads and temple steps.',
    d100Range: [6, 7],
    flavour: {
      duties: ['Find a good begging spot before dawn', 'Perform small acts of piety to earn temple alms', 'Share information with other beggars'],
      perks: ['Network of fellow beggars who share news', 'Temples will offer a meal and a bed in winter'],
    },
  },
  {
    id: 'mudlark',
    name: 'Mudlark',
    category: 'wretched',
    dailyIncome: { amount: 3, currency: 'copper' },
    description: 'Scavengers who wade through river mud and sewers searching for lost coins and valuables.',
    d100Range: [8, 9],
    flavour: {
      duties: ['Wade through tidal flats and drainage channels at low water', 'Sort through muck for coins, nails, and scrap metal', 'Sell findings to junk dealers'],
      perks: ['Occasional lucky find — a ring, a gem, a sealed bottle', 'Immune to the smell — advantage on Con saves vs. stench'],
    },
  },
  {
    id: 'rag-picker',
    name: 'Rag Picker',
    category: 'wretched',
    dailyIncome: { amount: 4, currency: 'copper' },
    description: 'Collectors of discarded cloth, rags, and scraps sold to paper mills and textile workers.',
    d100Range: [10, 11],
    flavour: {
      duties: ['Walk city streets collecting discarded cloth and fibre', 'Sort rags by material and quality', 'Deliver bundles to paper mills or weavers'],
      perks: ['First pick of discarded clothing — always warmly dressed', 'Know every alley and back street in the city'],
    },
  },
  {
    id: 'dung-collector',
    name: 'Dung Collector',
    category: 'wretched',
    dailyIncome: { amount: 5, currency: 'copper' },
    description: 'Those who collect animal dung from streets and stables to sell as fuel and fertiliser.',
    d100Range: [12, 13],
    flavour: {
      duties: ['Follow carts and livestock through city streets', 'Shovel dung into baskets before rivals claim it', 'Deliver loads to tanners, farmers, and brick-makers'],
      perks: ['Steady demand — everyone needs fertiliser', 'Know every stable master and farmer within ten miles'],
    },
  },
  {
    id: 'plague-burier',
    name: 'Plague Burier',
    category: 'wretched',
    dailyIncome: { amount: 8, currency: 'copper' },
    description: 'Grim workers who collect and bury the dead during outbreaks. Feared and avoided.',
    d100Range: [14, 15],
    flavour: {
      duties: ['Collect the dead from marked houses', 'Drive the cart to the plague pits', 'Burn linens and belongings of the deceased'],
      perks: ['Higher pay than most wretched work', 'People give you a wide berth — useful for privacy'],
    },
  },
  {
    id: 'tosher',
    name: 'Tosher',
    category: 'wretched',
    dailyIncome: { amount: 10, currency: 'copper' },
    description: 'Sewer explorers who wade through city sewers hunting for dropped coins, jewellery, and salvage.',
    d100Range: [16, 17],
    flavour: {
      duties: ['Enter the sewers before dawn with a lantern and a long pole', 'Sift through sediment for valuables', 'Map new tunnels and avoid cave-ins'],
      perks: ['Intimate knowledge of the sewer network', 'Occasional valuable find — advantage on Investigation in sewers'],
    },
  },
  {
    id: 'bone-grubber',
    name: 'Bone Grubber',
    category: 'wretched',
    dailyIncome: { amount: 12, currency: 'copper' },
    description: 'Collectors of animal bones from butchers and streets, sold to glue-makers, knife-handle carvers, and fertiliser dealers.',
    d100Range: [18, 20],
    flavour: {
      duties: ['Visit butcher shops and slaughterhouses for offcuts', 'Scour rubbish heaps for bones and horns', 'Clean, sort, and bundle bones for sale'],
      perks: ['Free offcuts of meat from grateful butchers', 'Connections in the tanning and crafting trades'],
    },
  },
  {
    id: 'lamplighter-apprentice',
    name: 'Lamplighter Apprentice',
    category: 'wretched',
    dailyIncome: { amount: 15, currency: 'copper' },
    description: 'Junior assistants who light and extinguish street lamps at dusk and dawn.',
    d100Range: [21, 23],
    flavour: {
      duties: ['Light oil lamps at dusk along assigned streets', 'Extinguish lamps at dawn', 'Refill oil reservoirs and replace wicks'],
      perks: ['Free oil for personal use', 'Know every street and corner in your district — advantage on Navigation in your city'],
    },
  },
]

// =====================================================================
// POVERTY — 35–75 cp/day (2d100: 24–43)
// =====================================================================

const POVERTY_PROFESSIONS: Profession[] = [
  {
    id: 'rat-catcher',
    name: 'Rat Catcher',
    category: 'poverty',
    dailyIncome: { amount: 35, currency: 'copper' },
    description: 'Pest controllers who eliminate vermin from homes, warehouses, and ships.',
    d100Range: [24, 25],
    flavour: {
      duties: ['Hunt rats in cellars, granaries, and sewers', 'Maintain traps, terriers, and poison stocks', 'Dispose of carcasses safely'],
      perks: ['Proficiency with traps and snares', 'Welcome in any building with a rat problem — free meals included'],
    },
  },
  {
    id: 'gravedigger',
    name: 'Gravedigger',
    category: 'poverty',
    dailyIncome: { amount: 38, currency: 'copper' },
    description: 'Those who dig graves and maintain cemeteries for the parish.',
    d100Range: [26, 27],
    flavour: {
      duties: ['Dig graves to regulation depth', 'Maintain cemetery grounds and fences', 'Assist at funerals and guard against grave robbers'],
      perks: ['Free housing in the cemetery cottage', 'Clergy consider you a friend — shelter at any temple'],
    },
  },
  {
    id: 'charcoal-burner',
    name: 'Charcoal Burner',
    category: 'poverty',
    dailyIncome: { amount: 40, currency: 'copper' },
    description: 'Forest workers who slowly burn wood into charcoal for smiths and smelters.',
    d100Range: [28, 29],
    flavour: {
      duties: ['Build and tend charcoal kilns in the forest', 'Monitor burn temperature day and night', 'Bag and transport charcoal to market'],
      perks: ['Free firewood and warmth year-round', 'Knowledge of the deep forest — advantage on Survival in woodland'],
    },
  },
  {
    id: 'washerwoman',
    name: 'Washer',
    category: 'poverty',
    dailyIncome: { amount: 42, currency: 'copper' },
    description: 'Laundry workers who scrub clothes at riverside stations or noble households.',
    d100Range: [30, 31],
    flavour: {
      duties: ['Collect, wash, dry, and return laundry', 'Treat stains with lye, sand, and soap', 'Iron and fold for noble households'],
      perks: ['Access to noble households — overhear gossip', 'Free soap and cleaning supplies'],
    },
  },
  {
    id: 'torch-bearer',
    name: 'Torch Bearer',
    category: 'poverty',
    dailyIncome: { amount: 45, currency: 'copper' },
    description: 'Hired hands who carry torches and lanterns for travellers moving through dangerous areas at night.',
    d100Range: [32, 33],
    flavour: {
      duties: ['Meet clients at city gates or tavern doors at dusk', 'Light the way through dangerous streets or wilderness trails', 'Ward off muggers and beasts with fire'],
      perks: ['Tips from wealthy clients', 'Know every shortcut and danger zone — advantage on Perception at night in your territory'],
    },
  },
  {
    id: 'tanner-apprentice',
    name: 'Tanner Apprentice',
    category: 'poverty',
    dailyIncome: { amount: 50, currency: 'copper' },
    description: 'Junior workers in tanning yards, scraping hides and mixing foul chemicals.',
    d100Range: [34, 35],
    flavour: {
      duties: ['Scrape fat and hair from raw hides', 'Soak hides in lime and tannin baths', 'Stretch and dry finished leather'],
      perks: ['Learning a skilled trade — path to Craftsman', 'Free leather scraps for personal use'],
    },
  },
  {
    id: 'water-carrier',
    name: 'Water Carrier',
    category: 'poverty',
    dailyIncome: { amount: 55, currency: 'copper' },
    description: 'Workers who haul fresh water from wells and rivers to homes and businesses.',
    d100Range: [36, 37],
    flavour: {
      duties: ['Fill water barrels at the well before dawn', 'Deliver to homes, taverns, and workshops', 'Maintain barrels and yokes'],
      perks: ['Know every household in the neighbourhood', 'Welcome everywhere — everyone needs water'],
    },
  },
  {
    id: 'crier',
    name: 'Town Crier',
    category: 'poverty',
    dailyIncome: { amount: 60, currency: 'copper' },
    description: 'Official announcers who shout news, decrees, and advertisements through the streets.',
    d100Range: [38, 39],
    flavour: {
      duties: ['Memorise and proclaim official announcements', 'Walk a daily route through market squares and junctions', 'Ring the bell to gather crowds'],
      perks: ['First to know all news and rumours', 'Minor official status — guards leave you alone'],
    },
  },
  {
    id: 'link-boy',
    name: 'Link Boy',
    category: 'poverty',
    dailyIncome: { amount: 65, currency: 'copper' },
    description: 'Young guides who carry links (torches) and lead wealthy patrons through city streets at night.',
    d100Range: [40, 41],
    flavour: {
      duties: ['Wait outside theatres, taverns, and noble houses for clients', 'Lead clients safely through dark streets', 'Protect the flame in wind and rain'],
      perks: ['Generous tips from nobles', 'Connections with theatre owners and tavern keepers'],
    },
  },
  {
    id: 'peat-cutter',
    name: 'Peat Cutter',
    category: 'poverty',
    dailyIncome: { amount: 75, currency: 'copper' },
    description: 'Labourers who cut and dry peat bricks from bogs for use as fuel.',
    d100Range: [42, 43],
    flavour: {
      duties: ['Cut peat blocks from the bog with a slane', 'Stack and dry peat bricks in the wind', 'Cart dried peat to market'],
      perks: ['Free fuel for your own hearth', 'Knowledge of bogland — advantage on Survival in marshes'],
    },
  },
]

// =====================================================================
// POOR — 2–10 sp/day (2d100: 44–73)
// =====================================================================

const POOR_PROFESSIONS: Profession[] = [
  {
    id: 'street-vendor',
    name: 'Street Vendor',
    category: 'poor',
    dailyIncome: { amount: 2, currency: 'silver' },
    description: 'Peddlers and street sellers of small goods — fruits, trinkets, and candles.',
    d100Range: [44, 46],
    flavour: {
      duties: ['Set up stall before market opens', 'Hawk wares to passers-by', 'Pack up and guard stock overnight'],
      perks: ['Finger on the pulse of street-level commerce', 'First pick of interesting goods that come to market'],
    },
  },
  {
    id: 'fisherman',
    name: 'Fisherman',
    category: 'poor',
    dailyIncome: { amount: 3, currency: 'silver' },
    description: 'Those who fish rivers, lakes, and coastal waters for a living.',
    d100Range: [47, 49],
    flavour: {
      duties: ['Maintain nets, lines, and boat', 'Fish from dawn to midday', 'Clean and sell the catch at market'],
      perks: ['Fresh fish daily for your own table', 'Knowledge of waterways and weather patterns'],
    },
  },
  {
    id: 'farmer',
    name: 'Farmer',
    category: 'poor',
    dailyIncome: { amount: 3, currency: 'silver' },
    description: 'Peasant farmers who work the land, growing crops and raising livestock.',
    d100Range: [50, 53],
    flavour: {
      duties: ['Plough, sow, tend, and harvest fields', 'Feed and care for livestock', 'Maintain fences, tools, and outbuildings'],
      perks: ['Self-sufficient in food', 'Own or rent land — a place to call home'],
    },
  },
  {
    id: 'laborer',
    name: 'Laborer',
    category: 'poor',
    dailyIncome: { amount: 4, currency: 'silver' },
    description: 'Unskilled workers who do heavy manual labour — hauling, digging, and lifting.',
    d100Range: [54, 57],
    flavour: {
      duties: ['Report to the foreman at dawn for daily assignment', 'Carry, dig, haul, or demolish as directed', 'Work until dusk'],
      perks: ['Always work available — cities always need strong backs', 'Build impressive physical strength over time'],
    },
  },
  {
    id: 'servant',
    name: 'Servant',
    category: 'poor',
    dailyIncome: { amount: 4, currency: 'silver' },
    description: 'Household servants and domestic workers in wealthy homes.',
    d100Range: [58, 60],
    flavour: {
      duties: ['Clean, cook, serve, and attend to the household', 'Maintain discretion about the family\'s affairs', 'Be available at all hours'],
      perks: ['Room and board provided', 'Overhear noble gossip and secrets'],
    },
  },
  {
    id: 'stablehand',
    name: 'Stablehand',
    category: 'poor',
    dailyIncome: { amount: 5, currency: 'silver' },
    description: 'Workers who care for horses and livestock at stables and coaching inns.',
    d100Range: [61, 63],
    flavour: {
      duties: ['Feed, groom, and exercise horses', 'Muck out stalls and maintain tack', 'Assist travellers with their mounts'],
      perks: ['Proficiency with vehicles (land)', 'Free riding lessons — you can ride well'],
    },
  },
  {
    id: 'miner',
    name: 'Miner',
    category: 'poor',
    dailyIncome: { amount: 6, currency: 'silver' },
    description: 'Those who extract ore, gems, and stone from the earth in dangerous shafts.',
    d100Range: [64, 66],
    flavour: {
      duties: ['Descend into mine shafts at dawn', 'Break rock with pick and hammer', 'Haul ore to the surface in carts'],
      perks: ['Occasional gem find you can pocket', 'Darkvision-like comfort in darkness — advantage on Perception underground'],
    },
  },
  {
    id: 'messenger',
    name: 'Messenger',
    category: 'poor',
    dailyIncome: { amount: 7, currency: 'silver' },
    description: 'Runners who deliver messages and small packages between towns and nobles.',
    d100Range: [67, 69],
    flavour: {
      duties: ['Memorise or carry sealed messages', 'Run or ride between destinations quickly', 'Maintain confidentiality'],
      perks: ['Travel widely — know the roads', 'Tips from grateful recipients'],
    },
  },
  {
    id: 'lamplighter',
    name: 'Lamplighter',
    category: 'poor',
    dailyIncome: { amount: 8, currency: 'silver' },
    description: 'City workers who light and maintain street lamps each evening.',
    d100Range: [70, 71],
    flavour: {
      duties: ['Light all street lamps on your route at dusk', 'Extinguish them at dawn', 'Report broken lamps and suspicious activity'],
      perks: ['City employee — minor official status', 'Know every street and alley in your district'],
    },
  },
  {
    id: 'chandler',
    name: 'Chandler',
    category: 'poor',
    dailyIncome: { amount: 10, currency: 'silver' },
    description: 'Candle and soap makers who render tallow and mix wax for household goods.',
    d100Range: [72, 73],
    flavour: {
      duties: ['Render animal fat into tallow', 'Dip or mould candles and soap bars', 'Sell at market or deliver to shops'],
      perks: ['Free candles and soap for your household', 'Steady demand — everyone needs light'],
    },
  },
]

// =====================================================================
// LOWER MODEST — 35–75 sp/day (2d100: 74–93)
// =====================================================================

const LOWER_MODEST_PROFESSIONS: Profession[] = [
  {
    id: 'herbalist',
    name: 'Herbalist',
    category: 'lower-modest',
    dailyIncome: { amount: 35, currency: 'silver' },
    description: 'Those who gather, dry, and sell medicinal herbs and poultices.',
    d100Range: [74, 75],
    flavour: {
      duties: ['Forage for herbs in meadows, forests, and marshes', 'Dry, grind, and mix herbal remedies', 'Advise customers on dosages and uses'],
      perks: ['Proficiency with herbalism kit', 'Free healing poultices for personal use'],
    },
  },
  {
    id: 'alchemist-assistant',
    name: 'Alchemist Assistant',
    category: 'lower-modest',
    dailyIncome: { amount: 38, currency: 'silver' },
    description: 'Helpers in alchemical shops who prepare reagents and tend distillation equipment.',
    d100Range: [76, 77],
    flavour: {
      duties: ['Prepare reagents and clean glassware', 'Monitor distillation and fermentation processes', 'Catalogue ingredients and maintain stock'],
      perks: ['Learning alchemy — path to a lucrative trade', 'Access to rare alchemical ingredients'],
    },
  },
  {
    id: 'farrier',
    name: 'Farrier',
    category: 'lower-modest',
    dailyIncome: { amount: 40, currency: 'silver' },
    description: 'Specialists who shoe horses and treat their hoof ailments.',
    d100Range: [78, 79],
    flavour: {
      duties: ['Trim hooves and fit horseshoes', 'Diagnose and treat hoof diseases', 'Travel to farms and stables for house calls'],
      perks: ['Proficiency with smith\'s tools', 'Welcome at every stable and farm — free meals on the road'],
    },
  },
  {
    id: 'dyer',
    name: 'Dyer',
    category: 'lower-modest',
    dailyIncome: { amount: 45, currency: 'silver' },
    description: 'Textile workers who dye cloth and yarn in vibrant colours using natural pigments.',
    d100Range: [80, 81],
    flavour: {
      duties: ['Mix dye baths from plants, minerals, and insects', 'Soak and turn cloth in dye vats', 'Dry and press finished fabrics'],
      perks: ['Know the value of rare pigments — advantage on Appraisal of textiles', 'Colourful hands mark you as a skilled worker'],
    },
  },
  {
    id: 'fence-builder',
    name: 'Fence Builder',
    category: 'lower-modest',
    dailyIncome: { amount: 48, currency: 'silver' },
    description: 'Skilled labourers who build and repair fences, palisades, and stockades.',
    d100Range: [82, 83],
    flavour: {
      duties: ['Cut and prepare timber posts', 'Dig post holes and set fences', 'Repair storm damage and rot'],
      perks: ['Proficiency with carpenter\'s tools', 'Work outdoors — strong constitution'],
    },
  },
  {
    id: 'wheelwright',
    name: 'Wheelwright',
    category: 'lower-modest',
    dailyIncome: { amount: 52, currency: 'silver' },
    description: 'Craftsmen who build and repair wooden wheels for carts, wagons, and carriages.',
    d100Range: [84, 85],
    flavour: {
      duties: ['Shape spokes, hubs, and felloes from seasoned wood', 'Fit iron tyres to wheel rims', 'Repair broken wheels on the roadside'],
      perks: ['Essential trade — always in demand', 'Proficiency with woodcarver\'s and smith\'s tools'],
    },
  },
  {
    id: 'rope-maker',
    name: 'Rope Maker',
    category: 'lower-modest',
    dailyIncome: { amount: 55, currency: 'silver' },
    description: 'Workers who twist and braid hemp, sisal, and flax into rope and cordage.',
    d100Range: [86, 87],
    flavour: {
      duties: ['Prepare raw fibres — comb, spin, and twist', 'Operate the rope walk to lay strands', 'Splice and finish rope ends'],
      perks: ['Expert knot-tier — advantage on checks involving rope', 'Naval contracts pay well in port cities'],
    },
  },
  {
    id: 'fuller',
    name: 'Fuller',
    category: 'lower-modest',
    dailyIncome: { amount: 60, currency: 'silver' },
    description: 'Workers who clean and thicken freshly woven cloth by trampling it in tubs of water and clay.',
    d100Range: [88, 89],
    flavour: {
      duties: ['Tread cloth in fulling troughs', 'Stretch and dry cloth on tenter frames', 'Brush and finish the nap'],
      perks: ['Strong legs — advantage on Athletics for kicking and jumping', 'Guild membership in textile trades'],
    },
  },
  {
    id: 'potters-journeyman',
    name: 'Potter\'s Journeyman',
    category: 'lower-modest',
    dailyIncome: { amount: 65, currency: 'silver' },
    description: 'Trained potters who shape clay into bowls, jugs, tiles, and pipes.',
    d100Range: [90, 91],
    flavour: {
      duties: ['Throw pots on the wheel', 'Load and fire the kiln', 'Glaze and decorate finished wares'],
      perks: ['Proficiency with potter\'s tools', 'Can make watertight containers anywhere you find clay'],
    },
  },
  {
    id: 'apothecary-assistant',
    name: 'Apothecary Assistant',
    category: 'lower-modest',
    dailyIncome: { amount: 75, currency: 'silver' },
    description: 'Trained assistants who mix medicines, salves, and tinctures under a master apothecary.',
    d100Range: [92, 93],
    flavour: {
      duties: ['Grind ingredients with mortar and pestle', 'Mix prescriptions accurately', 'Maintain the shop and serve customers'],
      perks: ['Knowledge of poisons and antidotes', 'Path to becoming a full Physician'],
    },
  },
]

// =====================================================================
// MODEST — 1–10 gp/day (2d100: 94–121)
// =====================================================================

const MODEST_PROFESSIONS: Profession[] = [
  {
    id: 'scribe',
    name: 'Scribe',
    category: 'modest',
    dailyIncome: { amount: 1, currency: 'gold' },
    description: 'Professional writers who copy documents, draft contracts, and maintain records.',
    d100Range: [94, 96],
    flavour: {
      duties: ['Copy legal documents and official records', 'Draft letters for the illiterate', 'Maintain ledgers and inventories'],
      perks: ['Literacy is power — you can read anything', 'Access to official records and archives'],
    },
  },
  {
    id: 'cook',
    name: 'Cook',
    category: 'modest',
    dailyIncome: { amount: 2, currency: 'gold' },
    description: 'Cooks and kitchen staff who prepare meals at taverns, inns, and noble houses.',
    d100Range: [97, 99],
    flavour: {
      duties: ['Plan menus and source ingredients', 'Prepare meals for guests or the household', 'Maintain a clean and efficient kitchen'],
      perks: ['Never go hungry — free meals daily', 'Know the best food suppliers and their secrets'],
    },
  },
  {
    id: 'entertainer',
    name: 'Entertainer',
    category: 'modest',
    dailyIncome: { amount: 2, currency: 'gold' },
    description: 'Musicians, actors, jesters, and performers who earn coin through artistry.',
    d100Range: [100, 102],
    flavour: {
      duties: ['Perform at taverns, fairs, and noble courts', 'Practise and learn new material', 'Travel between venues'],
      perks: ['Free room and board at performance venues', 'Fame and adoring fans — advantage on Persuasion with commoners'],
    },
  },
  {
    id: 'craftsman',
    name: 'Craftsman',
    category: 'modest',
    dailyIncome: { amount: 3, currency: 'gold' },
    description: 'Skilled tradespeople — blacksmiths, carpenters, weavers, and cobblers.',
    d100Range: [103, 105],
    flavour: {
      duties: ['Produce goods to order and standard', 'Maintain tools, forge, or workshop', 'Train apprentices in the craft'],
      perks: ['Proficiency with relevant artisan\'s tools', 'Guild membership — legal protection and wholesale pricing'],
    },
  },
  {
    id: 'sailor',
    name: 'Sailor',
    category: 'modest',
    dailyIncome: { amount: 3, currency: 'gold' },
    description: 'Crew members who work aboard merchant ships and naval vessels.',
    d100Range: [106, 108],
    flavour: {
      duties: ['Maintain rigging, sails, and hull', 'Stand watch and navigate by stars', 'Operate ship\'s equipment in battle'],
      perks: ['Proficiency with navigator\'s tools and water vehicles', 'Free passage on most merchant vessels'],
    },
  },
  {
    id: 'soldier',
    name: 'Soldier',
    category: 'modest',
    dailyIncome: { amount: 4, currency: 'gold' },
    description: 'Professional soldiers, city guards, and militia members under arms.',
    d100Range: [109, 111],
    flavour: {
      duties: ['Patrol assigned routes and guard posts', 'Train daily with arms and formation', 'Obey orders from commanding officers'],
      perks: ['Proficiency with martial weapons', 'Military rank — guards show deference'],
    },
  },
  {
    id: 'teacher',
    name: 'Teacher',
    category: 'modest',
    dailyIncome: { amount: 5, currency: 'gold' },
    description: 'Tutors, schoolmasters, and instructors who educate the young.',
    d100Range: [112, 114],
    flavour: {
      duties: ['Prepare and deliver lessons', 'Mark assignments and assess progress', 'Maintain discipline in the classroom'],
      perks: ['Respected in the community', 'Access to school libraries and resources'],
    },
  },
  {
    id: 'barkeep',
    name: 'Barkeep',
    category: 'modest',
    dailyIncome: { amount: 6, currency: 'gold' },
    description: 'Those who serve drinks and manage the bar at taverns and alehouses.',
    d100Range: [115, 116],
    flavour: {
      duties: ['Serve drinks and maintain order', 'Stock barrels and clean tankards', 'Listen to patrons and keep secrets'],
      perks: ['Hear every rumour in town', 'Free drinks and tips from regulars'],
    },
  },
  {
    id: 'hunter',
    name: 'Hunter',
    category: 'modest',
    dailyIncome: { amount: 7, currency: 'gold' },
    description: 'Those who hunt game in the wilderness for food, hides, and trophies.',
    d100Range: [117, 118],
    flavour: {
      duties: ['Track, stalk, and take game', 'Prepare and sell hides, meat, and trophies', 'Know the territory and seasonal patterns'],
      perks: ['Proficiency with ranged weapons', 'Advantage on Survival checks in the wild'],
    },
  },
  {
    id: 'guide',
    name: 'Guide',
    category: 'modest',
    dailyIncome: { amount: 10, currency: 'gold' },
    description: 'Local guides who lead travellers through dangerous wilderness and mountain passes.',
    d100Range: [119, 121],
    flavour: {
      duties: ['Scout safe routes through wilderness', 'Protect clients from natural hazards', 'Set up camp and forage for food'],
      perks: ['Favoured terrain — your guiding grounds', 'Contacts among travellers, rangers, and innkeepers'],
    },
  },
]

// =====================================================================
// COMFORTABLE — 15–35 gp/day (2d100: 122–151)
// =====================================================================

const COMFORTABLE_PROFESSIONS: Profession[] = [
  {
    id: 'innkeeper',
    name: 'Innkeeper',
    category: 'comfortable',
    dailyIncome: { amount: 15, currency: 'gold' },
    description: 'Owners of taverns, inns, and boarding houses who provide food, drink, and shelter.',
    d100Range: [122, 123],
    flavour: {
      duties: ['Manage staff, supplies, and bookings', 'Greet guests and resolve disputes', 'Maintain the building and grounds'],
      perks: ['Own a business — steady income and property', 'Hear every rumour and meet every traveller'],
    },
  },
  {
    id: 'officer',
    name: 'Military Officer',
    category: 'comfortable',
    dailyIncome: { amount: 17, currency: 'gold' },
    description: 'Commissioned military officers and guard captains who command troops.',
    d100Range: [124, 125],
    flavour: {
      duties: ['Command and train subordinate soldiers', 'Plan patrols, defences, and operations', 'Report to superior officers and nobility'],
      perks: ['Military authority and rank insignia', 'Access to military supply depots and fortifications'],
    },
  },
  {
    id: 'priest',
    name: 'Priest',
    category: 'comfortable',
    dailyIncome: { amount: 18, currency: 'gold' },
    description: 'Religious leaders and temple clergy who tend to the spiritual needs of the faithful.',
    d100Range: [126, 127],
    flavour: {
      duties: ['Lead religious ceremonies and rites', 'Counsel and comfort the faithful', 'Maintain the temple and collect tithes'],
      perks: ['Advantage on Religion checks', 'Shelter and aid at any temple of your faith'],
    },
  },
  {
    id: 'merchant',
    name: 'Merchant',
    category: 'comfortable',
    dailyIncome: { amount: 20, currency: 'gold' },
    description: 'Shop owners and established traders who buy and sell goods for profit.',
    d100Range: [128, 130],
    flavour: {
      duties: ['Source and purchase goods at competitive prices', 'Manage inventory, staff, and accounts', 'Negotiate deals with suppliers and buyers'],
      perks: ['Network of buyers and sellers across the region', 'Advantage on Insight to detect dishonest deals'],
    },
  },
  {
    id: 'scholar',
    name: 'Scholar',
    category: 'comfortable',
    dailyIncome: { amount: 22, currency: 'gold' },
    description: 'Academics, researchers, and university professors who advance knowledge.',
    d100Range: [131, 133],
    flavour: {
      duties: ['Research topics and compile findings', 'Teach students and mentor apprentices', 'Publish papers and advise institutions'],
      perks: ['Access to university libraries and rare manuscripts', 'Advantage on History and Arcana checks'],
    },
  },
  {
    id: 'jeweller',
    name: 'Jeweller',
    category: 'comfortable',
    dailyIncome: { amount: 23, currency: 'gold' },
    description: 'Artisans who cut gems and craft fine jewellery for the wealthy.',
    d100Range: [134, 135],
    flavour: {
      duties: ['Cut, polish, and set gemstones', 'Design and craft rings, necklaces, and brooches', 'Appraise gems and precious metals'],
      perks: ['Expert gem appraisal — advantage on checks to value gems', 'Access to rare stones and precious metals'],
    },
  },
  {
    id: 'cartographer',
    name: 'Cartographer',
    category: 'comfortable',
    dailyIncome: { amount: 24, currency: 'gold' },
    description: 'Map makers who chart territories, coastlines, and dungeon layouts.',
    d100Range: [136, 137],
    flavour: {
      duties: ['Survey terrain and take measurements', 'Draft accurate maps and sea charts', 'Update maps with new discoveries'],
      perks: ['Proficiency with cartographer\'s tools', 'Commissioned by nobles and adventuring guilds'],
    },
  },
  {
    id: 'architect',
    name: 'Architect',
    category: 'comfortable',
    dailyIncome: { amount: 25, currency: 'gold' },
    description: 'Designers of buildings, fortifications, bridges, and monuments.',
    d100Range: [138, 139],
    flavour: {
      duties: ['Design structures and draw blueprints', 'Supervise construction projects', 'Ensure structural integrity and beauty'],
      perks: ['Commissioned by nobility and the crown', 'Your buildings stand for centuries — lasting legacy'],
    },
  },
  {
    id: 'ship-captain',
    name: 'Ship Captain',
    category: 'comfortable',
    dailyIncome: { amount: 27, currency: 'gold' },
    description: 'Captains of trading vessels and merchant ships who command crew and cargo.',
    d100Range: [140, 141],
    flavour: {
      duties: ['Command the crew and set the ship\'s course', 'Manage cargo manifests and trade agreements', 'Navigate safely through storms and shallows'],
      perks: ['Legal authority over crew aboard your vessel', 'Established trade contacts in multiple ports'],
    },
  },
  {
    id: 'master-smith',
    name: 'Master Smith',
    category: 'comfortable',
    dailyIncome: { amount: 28, currency: 'gold' },
    description: 'Elite blacksmiths who forge weapons, armour, and fine metalwork of exceptional quality.',
    d100Range: [142, 143],
    flavour: {
      duties: ['Forge custom weapons and armour to order', 'Train journeymen and apprentices', 'Source rare metals and alloys'],
      perks: ['Craft masterwork items', 'Noble and military contracts pay premium prices'],
    },
  },
  {
    id: 'spy-master',
    name: 'Spy Master',
    category: 'comfortable',
    dailyIncome: { amount: 30, currency: 'gold' },
    description: 'Intelligence operatives who manage networks of informants for nobles or governments.',
    d100Range: [144, 145],
    flavour: {
      duties: ['Recruit, train, and manage informants', 'Gather and analyse intelligence', 'Report findings to your patron discreetly'],
      perks: ['Know secrets about everyone important', 'Advantage on Deception and Insight checks'],
    },
  },
  {
    id: 'master-brewer',
    name: 'Master Brewer',
    category: 'comfortable',
    dailyIncome: { amount: 32, currency: 'gold' },
    description: 'Expert brewers and vintners who craft fine ales, wines, and spirits.',
    d100Range: [146, 147],
    flavour: {
      duties: ['Select and prepare grains, hops, and grapes', 'Monitor fermentation and ageing', 'Develop new recipes and blends'],
      perks: ['Free drink for life', 'Taverns compete for your product — leverage in every town'],
    },
  },
  {
    id: 'court-minstrel',
    name: 'Court Minstrel',
    category: 'comfortable',
    dailyIncome: { amount: 33, currency: 'gold' },
    description: 'Musicians and poets retained by noble courts to provide entertainment and compose ballads.',
    d100Range: [148, 149],
    flavour: {
      duties: ['Perform at banquets, hunts, and ceremonies', 'Compose songs praising your patron', 'Accompany the court on travels'],
      perks: ['Live in the castle — luxury room and board', 'Ear of the lord — influence through song'],
    },
  },
  {
    id: 'master-artisan',
    name: 'Master Artisan',
    category: 'comfortable',
    dailyIncome: { amount: 35, currency: 'gold' },
    description: 'Master craftsmen who create exceptional, sought-after goods — furniture, instruments, clocks.',
    d100Range: [150, 151],
    flavour: {
      duties: ['Create commissioned masterwork pieces', 'Maintain guild standards and train apprentices', 'Source the finest materials'],
      perks: ['Guild master status — political influence', 'Your creations are famous and command top prices'],
    },
  },
]

// =====================================================================
// WEALTHY — 40–75 gp/day (2d100: 152–176)
// =====================================================================

const WEALTHY_PROFESSIONS: Profession[] = [
  {
    id: 'barrister',
    name: 'Barrister',
    category: 'wealthy',
    dailyIncome: { amount: 40, currency: 'gold' },
    description: 'Legal advocates and lawyers who argue cases in court and advise the powerful.',
    d100Range: [152, 153],
    flavour: {
      duties: ['Research case law and prepare arguments', 'Represent clients in court', 'Draft contracts and legal documents'],
      perks: ['Knowledge of the law — advantage on checks involving legal matters', 'Wealthy and noble clientele'],
    },
  },
  {
    id: 'physician',
    name: 'Physician',
    category: 'wealthy',
    dailyIncome: { amount: 42, currency: 'gold' },
    description: 'Trained doctors who diagnose and treat illness, perform surgery, and prescribe medicines.',
    d100Range: [154, 155],
    flavour: {
      duties: ['Diagnose and treat injuries and ailments', 'Perform surgery when necessary', 'Prescribe medicines and advise on health'],
      perks: ['Advantage on Medicine checks', 'Clients in wealthy and noble circles'],
    },
  },
  {
    id: 'high-merchant',
    name: 'High Merchant',
    category: 'wealthy',
    dailyIncome: { amount: 45, currency: 'gold' },
    description: 'Wealthy trade magnates and guild masters who control major commerce routes.',
    d100Range: [156, 157],
    flavour: {
      duties: ['Manage trade caravans and shipping routes', 'Negotiate exclusive contracts with producers', 'Lobby the crown for favourable trade laws'],
      perks: ['Vast wealth and political influence', 'Trade contacts across multiple kingdoms'],
    },
  },
  {
    id: 'war-engineer',
    name: 'War Engineer',
    category: 'wealthy',
    dailyIncome: { amount: 47, currency: 'gold' },
    description: 'Military engineers who design and build siege engines, fortifications, and field works.',
    d100Range: [158, 159],
    flavour: {
      duties: ['Design trebuchets, battering rams, and siege towers', 'Plan and oversee construction of fortifications', 'Direct siege operations in the field'],
      perks: ['Commissioned by kings and generals', 'Respected and protected — too valuable to risk in combat'],
    },
  },
  {
    id: 'court-wizard',
    name: 'Court Wizard',
    category: 'wealthy',
    dailyIncome: { amount: 50, currency: 'gold' },
    description: 'Arcane advisors retained by noble courts to provide magical counsel and services.',
    d100Range: [160, 161],
    flavour: {
      duties: ['Advise the lord on magical matters', 'Identify magical items and detect enchantments', 'Ward the castle and investigate arcane threats'],
      perks: ['Tower laboratory and research budget', 'Access to rare spell components and libraries'],
    },
  },
  {
    id: 'guild-master',
    name: 'Guild Master',
    category: 'wealthy',
    dailyIncome: { amount: 52, currency: 'gold' },
    description: 'Leaders of trade guilds who regulate commerce, set prices, and control their industry.',
    d100Range: [162, 163],
    flavour: {
      duties: ['Set guild policies and membership standards', 'Arbitrate disputes between guild members', 'Negotiate with the crown and rival guilds'],
      perks: ['Control an entire industry in your city', 'Political influence rivalling minor nobility'],
    },
  },
  {
    id: 'royal-herald',
    name: 'Royal Herald',
    category: 'wealthy',
    dailyIncome: { amount: 55, currency: 'gold' },
    description: 'Official representatives of the crown who deliver royal decrees and manage heraldry.',
    d100Range: [164, 165],
    flavour: {
      duties: ['Deliver royal proclamations and summons', 'Record and verify coats of arms', 'Officiate at tournaments and ceremonies'],
      perks: ['Diplomatic immunity while on royal business', 'Direct access to the court and crown'],
    },
  },
  {
    id: 'master-alchemist',
    name: 'Master Alchemist',
    category: 'wealthy',
    dailyIncome: { amount: 58, currency: 'gold' },
    description: 'Expert alchemists who brew potions, transmute materials, and push the boundaries of natural philosophy.',
    d100Range: [166, 167],
    flavour: {
      duties: ['Research and develop new formulae', 'Brew potions, elixirs, and acids', 'Supply the wealthy and military with alchemical goods'],
      perks: ['Fully equipped laboratory', 'Can brew potions others can only dream of'],
    },
  },
  {
    id: 'admiral',
    name: 'Admiral',
    category: 'wealthy',
    dailyIncome: { amount: 60, currency: 'gold' },
    description: 'Naval commanders who lead fleets of warships and control maritime strategy.',
    d100Range: [168, 169],
    flavour: {
      duties: ['Command a fleet of warships', 'Plan naval strategy and deployments', 'Maintain discipline and supply across the fleet'],
      perks: ['Command authority over all naval personnel', 'Flagship and personal quarters aboard ship'],
    },
  },
  {
    id: 'bishop',
    name: 'Bishop',
    category: 'wealthy',
    dailyIncome: { amount: 62, currency: 'gold' },
    description: 'Senior clergy who oversee multiple temples and wield significant religious authority.',
    d100Range: [170, 171],
    flavour: {
      duties: ['Oversee all temples in your diocese', 'Ordain priests and settle theological disputes', 'Advise the crown on matters of faith'],
      perks: ['Luxury residence and servants', 'Spiritual authority over thousands of faithful'],
    },
  },
  {
    id: 'master-assassin',
    name: 'Master Assassin',
    category: 'wealthy',
    dailyIncome: { amount: 65, currency: 'gold' },
    description: 'Elite killers-for-hire who command vast fees for discreet, professional work.',
    d100Range: [172, 173],
    flavour: {
      duties: ['Accept and plan contracts', 'Execute targets with precision and discretion', 'Manage a network of lesser operatives'],
      perks: ['Feared by the powerful', 'Advantage on Stealth and Deception — reputation precedes you'],
    },
  },
  {
    id: 'archmage-advisor',
    name: 'Archmage Advisor',
    category: 'wealthy',
    dailyIncome: { amount: 68, currency: 'gold' },
    description: 'Powerful mages who serve as strategic advisors to kings and councils.',
    d100Range: [174, 175],
    flavour: {
      duties: ['Advise the ruler on magical and strategic matters', 'Maintain magical defences of the realm', 'Research threats and counter enemy magic'],
      perks: ['Tower, library, and unlimited research budget', 'Influence at the highest levels of government'],
    },
  },
  {
    id: 'trade-prince',
    name: 'Trade Prince',
    category: 'wealthy',
    dailyIncome: { amount: 75, currency: 'gold' },
    description: 'Merchant princes who control entire trade empires spanning multiple kingdoms.',
    d100Range: [176, 176],
    flavour: {
      duties: ['Manage a vast commercial empire', 'Negotiate treaties and trade agreements between nations', 'Fund expeditions to discover new markets'],
      perks: ['Wealth rivalling royalty', 'Private army of guards and agents'],
    },
  },
]

// =====================================================================
// LAND OWNER — 1–10 pp/day (2d100: 177–191)
// =====================================================================

const LAND_OWNER_PROFESSIONS: Profession[] = [
  {
    id: 'landed-knight',
    name: 'Landed Knight',
    category: 'land-owner',
    dailyIncome: { amount: 1, currency: 'platinum' },
    description: 'Knights who have been granted a manor and lands in exchange for military service to their liege.',
    d100Range: [177, 178],
    flavour: {
      duties: ['Defend your lands and the realm when called', 'Administer justice in your manor', 'Collect taxes and maintain roads and bridges'],
      perks: ['Own a manor house and surrounding lands', 'Command a retinue of men-at-arms'],
    },
  },
  {
    id: 'baronet',
    name: 'Baronet',
    category: 'land-owner',
    dailyIncome: { amount: 2, currency: 'platinum' },
    description: 'Minor hereditary nobles who hold a small estate and the title "Sir" or "Dame."',
    d100Range: [179, 179],
    flavour: {
      duties: ['Manage your estate and its tenants', 'Attend court when summoned', 'Contribute soldiers to your lord\'s levy'],
      perks: ['Hereditary title — passes to your heirs', 'Seat at the minor court'],
    },
  },
  {
    id: 'baron',
    name: 'Baron / Baroness',
    category: 'land-owner',
    dailyIncome: { amount: 3, currency: 'platinum' },
    description: 'Lords who hold a barony — a fortified estate with multiple villages owing fealty.',
    d100Range: [180, 181],
    flavour: {
      duties: ['Govern your barony and dispense justice', 'Maintain a fortified keep', 'Muster troops for your liege lord'],
      perks: ['Fortified keep and a garrison', 'Authority over villages and their people'],
    },
  },
  {
    id: 'viscount',
    name: 'Viscount / Viscountess',
    category: 'land-owner',
    dailyIncome: { amount: 4, currency: 'platinum' },
    description: 'Nobles who administer a viscounty on behalf of a count, governing towns and trade routes.',
    d100Range: [182, 183],
    flavour: {
      duties: ['Administer a viscounty — towns, roads, and trade', 'Serve as deputy to the Count in their absence', 'Hold court and settle disputes'],
      perks: ['Town residence and country estate', 'Influence at the count\'s court'],
    },
  },
  {
    id: 'count',
    name: 'Count / Countess',
    category: 'land-owner',
    dailyIncome: { amount: 5, currency: 'platinum' },
    description: 'Powerful nobles who rule a county — a large territory with multiple towns and baronies.',
    d100Range: [184, 185],
    flavour: {
      duties: ['Rule your county and its vassal lords', 'Maintain a castle and a standing army', 'Sit on the king\'s council when summoned'],
      perks: ['Castle, army, and political influence', 'Command over barons and knights'],
    },
  },
  {
    id: 'marquess',
    name: 'Marquess / Marchioness',
    category: 'land-owner',
    dailyIncome: { amount: 6, currency: 'platinum' },
    description: 'Border lords who defend the realm\'s frontier marches against invasion.',
    d100Range: [186, 187],
    flavour: {
      duties: ['Defend the border marches from invasion', 'Maintain a larger army than inland lords', 'Negotiate or fight with neighbouring realms'],
      perks: ['Greater military authority than a count', 'Fortified border castles and extra crown funding'],
    },
  },
  {
    id: 'earl',
    name: 'Earl',
    category: 'land-owner',
    dailyIncome: { amount: 7, currency: 'platinum' },
    description: 'Ancient hereditary lords who rule vast traditional territories with deep-rooted authority.',
    d100Range: [188, 188],
    flavour: {
      duties: ['Govern an earldom with ancient rights and customs', 'Preside over regional courts of law', 'Contribute significantly to the crown\'s army'],
      perks: ['Ancient lineage — deep respect and loyalty from your people', 'Multiple castles and estates'],
    },
  },
  {
    id: 'duke',
    name: 'Duke / Duchess',
    category: 'land-owner',
    dailyIncome: { amount: 8, currency: 'platinum' },
    description: 'The highest-ranking nobles below royalty, ruling a duchy that may rival a small kingdom.',
    d100Range: [189, 190],
    flavour: {
      duties: ['Rule a duchy — a territory rivalling a small kingdom', 'Command a substantial army', 'Serve as the king\'s chief advisor or regent'],
      perks: ['Wealth and power second only to the crown', 'Multiple castles, towns, and a personal court'],
    },
  },
  {
    id: 'lord-regent',
    name: 'Lord Regent',
    category: 'land-owner',
    dailyIncome: { amount: 9, currency: 'platinum' },
    description: 'A noble appointed to rule in the monarch\'s absence or during a minor king\'s youth.',
    d100Range: [191, 191],
    flavour: {
      duties: ['Rule the kingdom in the monarch\'s stead', 'Maintain stability and prevent civil war', 'Prepare the heir for the throne'],
      perks: ['Royal authority without the crown', 'Access to the full power and treasury of the realm'],
    },
  },
]

// =====================================================================
// NOBILITY — 12–25 pp/day (2d100: 192–200)
// =====================================================================

const NOBILITY_PROFESSIONS: Profession[] = [
  {
    id: 'prince',
    name: 'Prince / Princess',
    category: 'nobility',
    dailyIncome: { amount: 12, currency: 'platinum' },
    description: 'Children of the reigning monarch, heirs to the throne or granted their own provinces.',
    d100Range: [192, 193],
    flavour: {
      duties: ['Govern your granted province or city', 'Represent the crown at diplomatic functions', 'Train for eventual rule — study war, law, and statecraft'],
      perks: ['Direct line to the throne', 'Personal guard, tutors, and luxury beyond measure'],
    },
  },
  {
    id: 'grand-duke',
    name: 'Grand Duke / Grand Duchess',
    category: 'nobility',
    dailyIncome: { amount: 14, currency: 'platinum' },
    description: 'Rulers of a grand duchy — sovereign or semi-sovereign territories that function as small nations.',
    d100Range: [194, 194],
    flavour: {
      duties: ['Rule a grand duchy as its sovereign', 'Maintain diplomatic relations with neighbouring kingdoms', 'Command a national army and navy'],
      perks: ['Near-royal authority within your lands', 'Sovereign court and international recognition'],
    },
  },
  {
    id: 'high-chancellor',
    name: 'High Chancellor',
    category: 'nobility',
    dailyIncome: { amount: 15, currency: 'platinum' },
    description: 'The chief minister of the realm who manages the kingdom\'s administration and law.',
    d100Range: [195, 195],
    flavour: {
      duties: ['Manage the kingdom\'s bureaucracy and laws', 'Advise the monarch on all matters of state', 'Oversee the royal treasury and courts'],
      perks: ['Second most powerful person in the kingdom', 'Control over appointments, law, and policy'],
    },
  },
  {
    id: 'arch-bishop',
    name: 'Arch-Bishop',
    category: 'nobility',
    dailyIncome: { amount: 16, currency: 'platinum' },
    description: 'Supreme religious leader who commands all clergy in the realm and crowns monarchs.',
    d100Range: [196, 196],
    flavour: {
      duties: ['Lead the faith across the entire realm', 'Crown and anoint monarchs', 'Sit on the royal council and advise on spiritual matters'],
      perks: ['Spiritual authority over millions', 'Cathedral, palace, and vast church wealth'],
    },
  },
  {
    id: 'queen-consort',
    name: 'Queen Consort / King Consort',
    category: 'nobility',
    dailyIncome: { amount: 18, currency: 'platinum' },
    description: 'The spouse of the reigning monarch, wielding enormous influence and managing the royal household.',
    d100Range: [197, 197],
    flavour: {
      duties: ['Manage the royal household and court', 'Produce heirs and represent the crown', 'Oversee charitable works and patronage'],
      perks: ['Royal title and all its privileges', 'Influence over the monarch and court'],
    },
  },
  {
    id: 'king',
    name: 'King / Queen Regnant',
    category: 'nobility',
    dailyIncome: { amount: 20, currency: 'platinum' },
    description: 'The reigning sovereign — the ultimate authority in the realm, ruling by divine right or conquest.',
    d100Range: [198, 199],
    flavour: {
      duties: ['Rule the kingdom — ultimate authority on all matters', 'Command all armies and navies', 'Dispense justice, declare war, and make peace'],
      perks: ['Absolute power within your realm', 'Crown, throne, and the wealth of a nation'],
    },
  },
  {
    id: 'emperor',
    name: 'Emperor / Empress',
    category: 'nobility',
    dailyIncome: { amount: 25, currency: 'platinum' },
    description: 'Ruler of an empire spanning multiple kingdoms, cultures, and continents.',
    d100Range: [200, 200],
    flavour: {
      duties: ['Rule an empire of multiple kingdoms', 'Maintain unity across cultures and continents', 'Command the greatest army in the known world'],
      perks: ['Supreme authority — kings bow to you', 'Wealth, power, and legacy beyond comprehension'],
    },
  },
]

// =====================================================================
// Combined exports
// =====================================================================

export const PROFESSIONS = [
  ...WRETCHED_PROFESSIONS,
  ...POVERTY_PROFESSIONS,
  ...POOR_PROFESSIONS,
  ...LOWER_MODEST_PROFESSIONS,
  ...MODEST_PROFESSIONS,
  ...COMFORTABLE_PROFESSIONS,
  ...WEALTHY_PROFESSIONS,
  ...LAND_OWNER_PROFESSIONS,
  ...NOBILITY_PROFESSIONS,
]

export const ALL_PROFESSIONS = PROFESSIONS

export function getProfessionByRoll(roll: number): Profession {
  for (const profession of PROFESSIONS) {
    const [min, max] = profession.d100Range
    if (roll >= min && roll <= max) {
      return profession
    }
  }
  return PROFESSIONS.find((p) => p.id === 'laborer')!
}

export function getProfessionsByCategory(category: Profession['category']): Profession[] {
  return PROFESSIONS.filter((p) => p.category === category)
}

export const CATEGORY_INFO: Record<Profession['category'], { name: string; color: string }> = {
  wretched: { name: 'Wretched', color: 'text-red-400' },
  poverty: { name: 'Poverty', color: 'text-orange-400' },
  poor: { name: 'Poor', color: 'text-gray-400' },
  'lower-modest': { name: 'Lower Modest', color: 'text-cyan-400' },
  modest: { name: 'Modest', color: 'text-blue-400' },
  comfortable: { name: 'Comfortable', color: 'text-green-400' },
  wealthy: { name: 'Wealthy', color: 'text-yellow-400' },
  'land-owner': { name: 'Land Owner', color: 'text-amber-400' },
  nobility: { name: 'Nobility', color: 'text-purple-400' },
}

export function formatIncome(income: Profession['dailyIncome']): string {
  const { amount, currency } = income
  const symbol = currency === 'platinum' ? 'pp' : currency === 'gold' ? 'gp' : currency === 'silver' ? 'sp' : 'cp'
  return `${amount.toLocaleString()} ${symbol}`
}
