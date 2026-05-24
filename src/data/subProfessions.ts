export type DynamicFieldType = 'text' | 'number' | 'text-long';

export interface DynamicFieldConfig {
  key: string;
  label: string;
  type: DynamicFieldType;
  placeholder?: string;
  min?: number;
  info?: string;
}

export interface SubProfessionFlavour {
  id: string;
  label: string;
  icon: string;
  description: string;
  fields: DynamicFieldConfig[];
}

export const SUB_PROFESSIONS_REGISTRY: Record<string, SubProfessionFlavour[]> = {
  // WRETCHED
  outcast: [
    {
      id: 'exile',
      label: 'Exile',
      icon: '⚖️',
      description: 'Banished due to crime or politics, marked by your past.',
      fields: [
        { key: 'formerHomeland', label: 'Former Homeland', type: 'text', placeholder: 'e.g., Cormyr' },
        { key: 'banishReason', label: 'Reason for Banishment', type: 'text', placeholder: 'e.g., Treason' },
        { key: 'bounty', label: 'Bounty on Head (gp)', type: 'number', min: 0 },
        { key: 'bountyIssuer', label: 'Bounty Issuer', type: 'text' }
      ]
    },
    {
      id: 'hermit',
      label: 'Hermit',
      icon: '⛺',
      description: 'Living off the grid in absolute seclusion.',
      fields: [
        { key: 'isolationLoc', label: 'Isolation Location', type: 'text', placeholder: 'e.g., Spine of the World' },
        { key: 'yearsIsolated', label: 'Years in Solitude', type: 'number', min: 0 },
        { key: 'survivalTool', label: 'Primary Survival Tool', type: 'text' }
      ]
    }
  ],
  urchin: [
    {
      id: 'cutpurse',
      label: 'Cutpurse',
      icon: '🗡️',
      description: 'Sleight of hand is your survival tool.',
      fields: [
        { key: 'gangName', label: 'Gang Name', type: 'text' },
        { key: 'territory', label: 'Street Territory', type: 'text' },
        { key: 'notableMark', label: 'Notable Mark Tracker', type: 'text' }
      ]
    },
    {
      id: 'runner',
      label: 'Runner',
      icon: '🏃',
      description: 'Delivering sensitive information across sketchy locations.',
      fields: [
        { key: 'employer', label: 'Employer Name', type: 'text' },
        { key: 'dropoff', label: 'Drop-off Zone', type: 'text' },
        { key: 'bribes', label: 'Guard Bribes Paid (cp)', type: 'number', min: 0 }
      ]
    }
  ],
  beggar: [
    {
      id: 'solicitor',
      label: 'Crossroad Solicitor',
      icon: '🪙',
      description: 'Scouting high-traffic paths for local pity.',
      fields: [
        { key: 'location', label: 'Crossroad Location', type: 'text' },
        { key: 'pityStory', label: 'Best Pity Story', type: 'text' },
        { key: 'dislikeRating', label: 'Guard Dislike Status (1-10)', type: 'number', min: 1 }
      ]
    },
    {
      id: 'alms',
      label: 'Temple Alms-Seeker',
      icon: '🧎',
      description: 'Earning daily divine charity directly at holy sites.',
      fields: [
        { key: 'templeName', label: 'Temple Name', type: 'text' },
        { key: 'deity', label: 'Patron Deity', type: 'text' },
        { key: 'priestName', label: 'Head Priest Name', type: 'text' }
      ]
    }
  ],
  mudlark: [
    {
      id: 'scavenger',
      label: 'River Scavenger',
      icon: '🛶',
      description: 'Sifting through treacherous riverbeds and dynamic shorelines.',
      fields: [
        { key: 'waterway', label: 'Waterway Name', type: 'text' },
        { key: 'bestFind', label: 'Best Recent Find', type: 'text' },
        { key: 'buyerContact', label: 'Junk Dealer Contact', type: 'text' }
      ]
    },
    {
      id: 'drainer',
      label: 'Drain Comber',
      icon: '🪠',
      description: 'Climbing directly down sewer runoffs at low tide cycles.',
      fields: [
        { key: 'drainLoc', label: 'Drain Sector Location', type: 'text' },
        { key: 'oilHours', label: 'Lantern Oil Remaining (hrs)', type: 'number', min: 0 },
        { key: 'bootCondition', label: 'Heavy Boot Condition', type: 'text' }
      ]
    }
  ],
  'rag-picker': [
    {
      id: 'collector',
      label: 'Street Collector',
      icon: '🧺',
      description: 'Gathering fibers, cloth, and scraps block-by-block.',
      fields: [
        { key: 'district', label: 'Assigned District', type: 'text' },
        { key: 'weight', label: 'Weight Collected (lbs)', type: 'number', min: 0 },
        { key: 'rivals', label: 'Rival Collector Group', type: 'text' }
      ]
    },
    {
      id: 'supplier',
      label: 'Mill Supplier',
      icon: '🏭',
      description: 'Contracted directly to deliver bundles to operations processing plants.',
      fields: [
        { key: 'millName', label: 'Contracted Paper Mill', type: 'text' },
        { key: 'pricePerLb', label: 'Price per Pound (cp)', type: 'number', min: 0 },
        { key: 'nextDelivery', label: 'Next Delivery Date', type: 'text' }
      ]
    }
  ],
  'dung-collector': [
    {
      id: 'sweeper',
      label: 'Street Sweeper',
      icon: '🧹',
      description: 'Clearing dynamic animal paths before rivals claim stock.',
      fields: [
        { key: 'route', label: 'Route Name', type: 'text' },
        { key: 'capacity', label: 'Daily Basket Capacity', type: 'number', min: 0 },
        { key: 'permitId', label: 'Sanitation Permit ID', type: 'text' }
      ]
    },
    {
      id: 'transporter',
      label: 'Tanner Transporter',
      icon: '🛞',
      description: 'Fulfilling high-volume agricultural and tanning orders.',
      fields: [
        { key: 'tanyard', label: 'Destination Tanning Yard', type: 'text' },
        { key: 'wagonCap', label: 'Wagon Capacity (lbs)', type: 'number', min: 0 },
        { key: 'tollPaid', label: 'Olfactory Toll Paid (cp)', type: 'number', min: 0 }
      ]
    }
  ],
  'plague-burier': [
    {
      id: 'driver',
      label: 'Cart Driver',
      icon: '🐎',
      description: 'Transporting the fallen from quarantined wards.',
      fields: [
        { key: 'cartId', label: 'Cart Identifier', type: 'text' },
        { key: 'beastName', label: 'Beast of Burden Name', type: 'text' },
        { key: 'bodyCount', label: 'Daily Mass Balance Count', type: 'number', min: 0 }
      ]
    },
    {
      id: 'digger',
      label: 'Pit Digger',
      icon: '🪦',
      description: 'Preparing massive final resting operations.',
      fields: [
        { key: 'pitSector', label: 'Plague Pit Sector', type: 'text' },
        { key: 'holyWater', label: 'Holy Water Units Left', type: 'number', min: 0 },
        { key: 'overseer', label: 'Clergy Overseer', type: 'text' }
      ]
    }
  ],
  tosher: [
    {
      id: 'explorer',
      label: 'Sewer Explorer',
      icon: '🔦',
      description: 'Navigating deep stone underground tunnels for rare artifacts.',
      fields: [
        { key: 'sewerSector', label: 'Sewer Sector ID', type: 'text' },
        { key: 'gasLevel', label: 'Toxic Gas Level (Low/Med/High)', type: 'text' },
        { key: 'poleMaterial', label: 'Long Pole Material', type: 'text' }
      ]
    },
    {
      id: 'vaulter',
      label: 'Vault Scavenger',
      icon: '🧱',
      description: 'Locating sealed hidden underground caches.',
      fields: [
        { key: 'junctionId', label: 'Subterranean Junction ID', type: 'text' },
        { key: 'grateStatus', label: 'Locked Grate Status', type: 'text' },
        { key: 'monsterSighting', label: 'Monster Sightings Tracker', type: 'text' }
      ]
    }
  ],
  'bone-grubber': [
    {
      id: 'slaughterhouse',
      label: 'Slaughterhouse Collector',
      icon: '🥩',
      description: 'Sourcing materials from meat cutters and trade houses.',
      fields: [
        { key: 'butcherName', label: 'Butcher Shop Source', type: 'text' },
        { key: 'massWeekly', label: 'Weekly Bone Mass (lbs)', type: 'number', min: 0 },
        { key: 'glueContact', label: 'Glue Mill Contact Name', type: 'text' }
      ]
    },
    {
      id: 'gleaner',
      label: 'Battlefield Gleaner',
      icon: '⚔️',
      description: 'Gathering historical bone resources under strict schedules.',
      fields: [
        { key: 'battleSite', label: 'Historic Battle Site', type: 'text' },
        { key: 'patrolSchedule', label: 'Guard Patrol Window', type: 'text' },
        { key: 'buyerName', label: 'Underworld Artisan Buyer', type: 'text' }
      ]
    }
  ],
  'lamplighter-apprentice': [
    {
      id: 'dusk',
      label: 'Dusk Lighter',
      icon: '🔥',
      description: 'Racing against sunset to provide illumination.',
      fields: [
        { key: 'masterName', label: 'Master Lamplighter Name', type: 'text' },
        { key: 'route', label: 'Assigned Street Route', type: 'text' },
        { key: 'flasksCarried', label: 'Oil Flasks Carried', type: 'number', min: 0 }
      ]
    },
    {
      id: 'dawn',
      label: 'Dawn Extinguisher',
      icon: '☀️',
      description: 'Extinguishing lines and reclaiming operational resources.',
      fields: [
        { key: 'route', label: 'Assigned Street Route', type: 'text' },
        { key: 'snufferLength', label: 'Snuffer Pole Length (ft)', type: 'number', min: 0 },
        { key: 'incidents', label: 'Night Watch Events Witnessed', type: 'text' }
      ]
    }
  ],

  // POVERTY
  'rat-catcher': [
    {
      id: 'terrier',
      label: 'Terrier Handler',
      icon: '🐕',
      description: 'Working alongside trained animals to flush out pests.',
      fields: [
        { key: 'dogName', label: 'Lead Terrier Name', type: 'text' },
        { key: 'dogBreed', label: 'Terrier Breed', type: 'text' },
        { key: 'killCount', label: 'Weekly Kill Count', type: 'number', min: 0 }
      ]
    },
    {
      id: 'trapper',
      label: 'Trap Specialist',
      icon: '🪤',
      description: 'Deploying strategic placements across critical zones.',
      fields: [
        { key: 'warehouse', label: 'Warehouse Target Name', type: 'text' },
        { key: 'activeTraps', label: 'Total Active Traps', type: 'number', min: 0 },
        { key: 'infestation', label: 'Infestation Rating (1-10)', type: 'number', min: 1 }
      ]
    }
  ],
  gravedigger: [
    {
      id: 'parish',
      label: 'Parish Digger',
      icon: '⛏️',
      description: 'Maintaining local plots and serving standard rites.',
      fields: [
        { key: 'cemetery', label: 'Cemetery Name', type: 'text' },
        { key: 'plotsLeft', label: 'Open Plots Remaining', type: 'number', min: 0 },
        { key: 'priest', label: 'Parish Priest Name', type: 'text' }
      ]
    },
    {
      id: 'crypt',
      label: 'Crypt Keeper',
      icon: '🗝️',
      description: 'Securing complex high-value mausoleums against layout risks.',
      fields: [
        { key: 'cryptName', label: 'Mausoleum Name', type: 'text' },
        { key: 'nobleWards', label: 'Noble Wards Active', type: 'text' },
        { key: 'ghoulReport', label: 'Ghoul Activity Status', type: 'text' }
      ]
    }
  ],
  'charcoal-burner': [
    {
      id: 'kiln',
      label: 'Forest Kiln Tender',
      icon: '🪵',
      description: 'Managing dynamic temperature thresholds deeply in wild forests.',
      fields: [
        { key: 'forestSector', label: 'Forest Sector', type: 'text' },
        { key: 'burnTemp', label: 'Burn Temperature (°C)', type: 'number', min: 0 },
        { key: 'woodSource', label: 'Timber Source Type', type: 'text' }
      ]
    },
    {
      id: 'market_hauler',
      label: 'Market Hauler',
      icon: '🚛',
      description: 'Transporting products down trade veins safely.',
      fields: [
        { key: 'licenseId', label: 'Wagon License ID', type: 'text' },
        { key: 'sacksLoaded', label: 'Sacks Loaded', type: 'number', min: 0 },
        { key: 'targetSmith', label: 'Target Blacksmith Shop', type: 'text' }
      ]
    }
  ],
  washer: [
    {
      id: 'riverside',
      label: 'Riverside Washer',
      icon: '🌊',
      description: 'Scrubbing industrial loads along running public currents.',
      fields: [
        { key: 'stationNum', label: 'River Station Number', type: 'text' },
        { key: 'lyeStock', label: 'Lye Stock (lbs)', type: 'number', min: 0 },
        { key: 'waterQuality', label: 'Water Quality Rating', type: 'text' }
      ]
    },
    {
      id: 'estate_laundress',
      label: 'Estate Laundress',
      icon: '👗',
      description: 'Serving elite fabrics within high households.',
      fields: [
        { key: 'estateName', label: 'Noble House Name', type: 'text' },
        { key: 'manager', label: 'Head Housekeeper Name', type: 'text' },
        { key: 'laundryKey', label: 'Laundry Room Key ID', type: 'text' }
      ]
    }
  ],
  'torch-bearer': [
    {
      id: 'city_night',
      label: 'City Night-Guide',
      icon: '🌆',
      description: 'Guiding citizens safely through winding alleys post-dusk.',
      fields: [
        { key: 'postLoc', label: 'Tavern Post Location', type: 'text' },
        { key: 'passId', label: 'Guard Escort Pass ID', type: 'text' },
        { key: 'torchesLeft', label: 'Torch Count Remaining', type: 'number', min: 0 }
      ]
    },
    {
      id: 'wilderness_trail',
      label: 'Wilderness Trail-Blazer',
      icon: '🌲',
      description: 'Lighting caravan configurations inside beast-heavy terrain.',
      fields: [
        { key: 'caravan', label: 'Caravan/Expedition Name', type: 'text' },
        { key: 'destination', label: 'Route Destination', type: 'text' },
        { key: 'pitchSupply', label: 'Pitch/Tar Supply (lbs)', type: 'number', min: 0 }
      ]
    }
  ],
  'tanner-apprentice': [
    {
      id: 'scraper',
      label: 'Hide Scraper',
      icon: '🔪',
      description: 'Manual processing of raw products before processing chemical passes.',
      fields: [
        { key: 'yardName', label: 'Tanning Yard Name', type: 'text' },
        { key: 'masterName', label: 'Master Tanner Name', type: 'text' },
        { key: 'hideCount', label: 'Daily Hide Count', type: 'number', min: 0 }
      ]
    },
    {
      id: 'vat_tender',
      label: 'Vat Tender',
      icon: '🧪',
      description: 'Monitoring chemical balances across soaking structures.',
      fields: [
        { key: 'vatId', label: 'Vat ID Number', type: 'text' },
        { key: 'chemicalMix', label: 'Tannin/Lime Mix Profile', type: 'text' },
        { key: 'batchGrade', label: 'Leather Batch Quality', type: 'text' }
      ]
    }
  ],
  'water-carrier': [
    {
      id: 'well_hauler',
      label: 'Well Hauler',
      icon: '🪣',
      description: 'Manually pulling and distributing gallons to structural zones.',
      fields: [
        { key: 'wellLoc', label: 'Town Well Location', type: 'text' },
        { key: 'yokeCondition', label: 'Yoke Condition Profile', type: 'text' },
        { key: 'gallonsDaily', label: 'Daily Gallons Delivered', type: 'number', min: 0 }
      ]
    },
    {
      id: 'tavern_supplier',
      label: 'Tavern Supplier',
      icon: '🍺',
      description: 'Fulfilling specialized high-demand liquid orders for hospitality networks.',
      fields: [
        { key: 'tavernName', label: 'Contracted Tavern Name', type: 'text' },
        { key: 'barrelCap', label: 'Barrel Capacity (gal)', type: 'number', min: 0 },
        { key: 'purityRating', label: 'Water Purity Grade', type: 'text' }
      ]
    }
  ],
  'crier': [
    {
      id: 'royal_decree',
      label: 'Royal Decreer',
      icon: '📜',
      description: 'Proclaiming official state rulings and alerts directly from magistrates.',
      fields: [
        { key: 'overseer', label: 'Magistrate Overseer', type: 'text' },
        { key: 'scrollCaseId', label: 'Scroll Case ID', type: 'text' },
        { key: 'bellMaterial', label: 'Bell Material Type', type: 'text' }
      ]
    },
    {
      id: 'commercial_hawker',
      label: 'Commercial Hawker',
      icon: '📢',
      description: 'Driving high customer focus to merchant storefront setups.',
      fields: [
        { key: 'merchantShop', label: 'Sponsoring Store Name', type: 'text' },
        { key: 'scriptTopic', label: 'Advertisement Main Topic', type: 'text' },
        { key: 'payoutCp', label: 'Paid Earnings (cp)', type: 'number', min: 0 }
      ]
    }
  ],
  'link-boy': [
    {
      id: 'theatre',
      label: 'Theatre Escort',
      icon: '🎭',
      description: 'Guiding affluent nightlife patrons out of performance structures.',
      fields: [
        { key: 'theatreName', label: 'Theatre House Name', type: 'text' },
        { key: 'patronName', label: 'Patron Name Tracker', type: 'text' },
        { key: 'tipsCp', label: 'Tips Accumulated (cp)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'lantern_guide',
      label: 'Tavern Lantern-Guide',
      icon: '🏮',
      description: 'Securing safe midnight tracks out of local ale houses.',
      fields: [
        { key: 'hostInn', label: 'Host Inn Name', type: 'text' },
        { key: 'shiftHours', label: 'Night Shift Duration', type: 'number', min: 0 },
        { key: 'oilCap', label: 'Oil Reservoir Capacity', type: 'text' }
      ]
    }
  ],
  'peat-cutter': [
    {
      id: 'slicer',
      label: 'Bog Slicer',
      icon: '🗺️',
      description: 'Extracting valuable fuel bricks from deep wetland grids.',
      fields: [
        { key: 'bogName', label: 'Bogland Territory Name', type: 'text' },
        { key: 'toolStatus', label: 'Slane Blade Quality', type: 'text' },
        { key: 'bricksCut', label: 'Bricks Harvested', type: 'number', min: 0 }
      ]
    },
    {
      id: 'dryer',
      label: 'Stack Drying Monitor',
      icon: '☀️',
      description: 'Tracking structural dehydration patterns across wind exposures.',
      fields: [
        { key: 'yardSector', label: 'Drying Yard Sector ID', type: 'text' },
        { key: 'moisturePct', label: 'Target Moisture %', type: 'number', min: 0 },
        { key: 'securityDetail', label: 'Security Detail Assignment', type: 'text' }
      ]
    }
  ],

  // POOR
  'street-vendor': [
    {
      id: 'food_peddler',
      label: 'Food Peddler',
      icon: '🍿',
      description: 'Serving hot culinary options out of cart configurations.',
      fields: [
        { key: 'stallName', label: 'Cart/Stall Name', type: 'text' },
        { key: 'dishSignature', label: 'Signature Dish Item', type: 'text' },
        { key: 'licenseId', label: 'Market Stall License ID', type: 'text' }
      ]
    },
    {
      id: 'trinket_seller',
      label: 'Trinket Seller',
      icon: '🔮',
      description: 'Selling curious assets, small tools, and candles.',
      fields: [
        { key: 'category', label: 'Wares Main Category', type: 'text' },
        { key: 'supplier', label: 'Wholesale Supplier Name', type: 'text' },
        { key: 'inventoryCount', label: 'Curio Count Tracked', type: 'number', min: 0 }
      ]
    }
  ],
  fisherman: [
    {
      id: 'net_caster',
      label: 'Net Caster (Boat)',
      icon: '🛶',
      description: 'Deploying high-yield equipment systems aboard light lake craft.',
      fields: [
        { key: 'vesselName', label: 'Vessel Name', type: 'text' },
        { key: 'hullHp', label: 'Hull Integrity Points', type: 'number', min: 0 },
        { key: 'fishType', label: 'Primary Harvest Focus', type: 'text' }
      ]
    },
    {
      id: 'shore_angler',
      label: 'Shore Angler',
      icon: '🎣',
      description: 'Utilizing long line techniques tracking coastal targets.',
      fields: [
        { key: 'sector', label: 'Shoreline Sector Line', type: 'text' },
        { key: 'baitStock', label: 'Bait Box Supply Count', type: 'number', min: 0 },
        { key: 'catchWeight', label: 'Daily Catch Weight (lbs)', type: 'number', min: 0 }
      ]
    }
  ],
  farmer: [
    {
      id: 'crop_cultivator',
      label: 'Crop Cultivator',
      icon: '🌾',
      description: 'Managing soil variables and planting cycles over land assets.',
      fields: [
        { key: 'farmName', label: 'Farm Property Name', type: 'text' },
        { key: 'acreage', label: 'Total Acreage Worked', type: 'number', min: 0 },
        { key: 'mainCrop', label: 'Primary Crop Focus', type: 'text' }
      ]
    },
    {
      id: 'herd_master',
      label: 'Livestock Herder',
      icon: '🐑',
      description: 'Guarding grazing groups over regional sectors.',
      fields: [
        { key: 'herdType', label: 'Livestock Animal Type', type: 'text' },
        { key: 'headCount', label: 'Total Herd Count', type: 'number', min: 0 },
        { key: 'dogName', label: 'Herd Dog Identity', type: 'text' }
      ]
    }
  ],
  laborer: [
    {
      id: 'masonry_hauler',
      label: 'Masonry Hauler',
      icon: '🧱',
      description: 'Moving dynamic structural stone items for building crews.',
      fields: [
        { key: 'siteName', label: 'Construction Site Name', type: 'text' },
        { key: 'foreman', label: 'Head Mason Foreman', type: 'text' },
        { key: 'blockWeight', label: 'Max Block Weight (lbs)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'dock_hand',
      label: 'Dock Hand',
      icon: '⚓',
      description: 'Loading incoming shipping frameworks directly at waterfront quays.',
      fields: [
        { key: 'pierNum', label: 'Pier/Quay Hub Number', type: 'text' },
        { key: 'partnerCompany', label: 'Shipping Enterprise', type: 'text' },
        { key: 'cargoType', label: 'Cargo Type Handled', type: 'text' }
      ]
    }
  ],
  servant: [
    {
      id: 'scullery',
      label: 'Scullery Attendant',
      icon: '🍽️',
      description: 'Managing dynamic cleanup tasks in central kitchen backrooms.',
      fields: [
        { key: 'kitchen', label: 'Kitchen Area Assignment', type: 'text' },
        { key: 'headCook', label: 'Head Cook Name', type: 'text' },
        { key: 'fluidSupply', label: 'Cleaning Supply Vol', type: 'text' }
      ]
    },
    {
      id: 'valet',
      label: 'Personal Valet',
      icon: '🤵',
      description: 'Providing elite administrative and wardrobe tracking directly to an employer.',
      fields: [
        { key: 'employer', label: 'Employer Name', type: 'text' },
        { key: 'wardrobeKey', label: 'Wardrobe Key ID Code', type: 'text' },
        { key: 'discretionOath', label: 'Oath Status (True/False)', type: 'text' }
      ]
    }
  ],
  stablehand: [
    {
      id: 'groomer',
      label: 'Groomer',
      icon: '🐴',
      description: 'Maintaining mount safety and conditioning inside assigned bays.',
      fields: [
        { key: 'stableName', label: 'Stable Name', type: 'text' },
        { key: 'stallsCount', label: 'Assigned Stalls Count', type: 'number', min: 0 },
        { key: 'feedStock', label: 'Feed Stock Balance (lbs)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'coach_hostler',
      label: 'Coach Hostler',
      icon: '🛞',
      description: 'Providing fast repair, grease, and rigging support to incoming transports.',
      fields: [
        { key: 'innsAttached', label: 'Connected Inns', type: 'text' },
        { key: 'carriageTypes', label: 'Carriage Models Serviced', type: 'text' },
        { key: 'greaseSupply', label: 'Wheel Grease Status', type: 'text' }
      ]
    }
  ],
  miner: [
    {
      id: 'pick_breaker',
      label: 'Pick Breaker',
      icon: '⛏️',
      description: 'Extracting elements directly at deep rock face channels.',
      fields: [
        { key: 'shaftId', label: 'Mine Shaft ID Code', type: 'text' },
        { key: 'oreYield', label: 'Daily Ore Yield (lbs)', type: 'number', min: 0 },
        { key: 'canaryStatus', label: 'Canary Health Status', type: 'text' }
      ]
    },
    {
      id: 'ore_hauler',
      label: 'Ore Hauler',
      icon: '🛒',
      description: 'Managing cart tracks and shipping raw materials up to smelting infrastructure.',
      fields: [
        { key: 'cartCap', label: 'Cart Capacity Max (lbs)', type: 'number', min: 0 },
        { key: 'trackSegment', label: 'Active Track Segment', type: 'text' },
        { key: 'dropPoint', label: 'Smelter Drop Point', type: 'text' }
      ]
    }
  ],
  messenger: [
    {
      id: 'town_runner',
      label: 'Town Runner',
      icon: '👟',
      description: 'Sprinting across urban districts utilizing highly complex shortcuts.',
      fields: [
        { key: 'postOffice', label: 'Courier Post Base', type: 'text' },
        { key: 'deliveriesMade', label: 'Daily Deliveries Tracker', type: 'number', min: 0 },
        { key: 'soleWear', label: 'Boot Sole Wear Level %', type: 'number', min: 0 }
      ]
    },
    {
      id: 'mounted_carrier',
      label: 'Mounted Postal Carrier',
      icon: '🏇',
      description: 'Riding down highway paths between distant outposts and fortifications.',
      fields: [
        { key: 'mountName', label: 'Mount Identity', type: 'text' },
        { key: 'bagLockKey', label: 'Saddlebag Lock Key ID', type: 'text' },
        { key: 'routeTowns', label: 'Target Route Matrix', type: 'text' }
      ]
    }
  ],
  lamplighter: [
    {
      id: 'ward_captain',
      label: 'Ward Captain',
      icon: '🛡️',
      description: 'Directing district deployment allocations and fuel distributions.',
      fields: [
        { key: 'wardName', label: 'City Ward Name', type: 'text' },
        { key: 'budgetSp', label: 'District Budget (sp)', type: 'number', min: 0 },
        { key: 'crewSize', label: 'Active Crew Size', type: 'number', min: 0 }
      ]
    },
    {
      id: 'maintenance',
      label: 'Maintenance Specialist',
      icon: '🔧',
      description: 'Fixing shattered glass systems and updating wicks across networks.',
      fields: [
        { key: 'panesCarried', label: 'Glass Panes Carried', type: 'number', min: 0 },
        { key: 'wickLength', label: 'Wick Length Carried (ft)', type: 'number', min: 0 },
        { key: 'backlog', label: 'Repair Backlog Items', type: 'number', min: 0 }
      ]
    }
  ],
  chandler: [
    {
      id: 'tallow_renderer',
      label: 'Tallow Renderer',
      icon: '🧪',
      description: 'Processing animal fats down within heavy rendering environments.',
      fields: [
        { key: 'workshop', label: 'Workshop Location', type: 'text' },
        { key: 'cauldronVol', label: 'Cauldron Max Volume', type: 'number', min: 0 },
        { key: 'oilMasking', label: 'Masking Agent Stock', type: 'text' }
      ]
    },
    {
      id: 'wax_chandler',
      label: 'Wax Chandler',
      icon: '🕯️',
      description: 'Forming luxury scented items using premium beeswax arrays.',
      fields: [
        { key: 'beeswaxLbs', label: 'Beeswax Stock (lbs)', type: 'number', min: 0 },
        { key: 'mouldTypes', label: 'Mould Patterns Used', type: 'text' },
        { key: 'royalSeal', label: 'Royal Seal Authorization ID', type: 'text' }
      ]
    }
  ],

  // LOWER MODEST
  herbalist: [
    {
      id: 'forager',
      label: 'Wilderness Forager',
      icon: '🌿',
      description: 'Tracking dangerous flora signatures across deep marsh configurations.',
      fields: [
        { key: 'region', label: 'Foraging Region Name', type: 'text' },
        { key: 'rareFlora', label: 'Target Rare Flora Line', type: 'text' },
        { key: 'satchelTier', label: 'Satchel Upgrade Tier', type: 'text' }
      ]
    },
    {
      id: 'shop_supplier',
      label: 'Apothecary Shop Supplier',
      icon: '🏪',
      description: 'Managing drying frameworks and tracking wholesale inventory lines.',
      fields: [
        { key: 'partnerShop', label: 'Partner Storefront Name', type: 'text' },
        { key: 'rackCap', label: 'Drying Rack Capacity', type: 'number', min: 0 },
        { key: 'weeklySp', label: 'Weekly Gross Value (sp)', type: 'number', min: 0 }
      ]
    }
  ],
  'alchemist-assistant': [
    {
      id: 'apparatus',
      label: 'Apparatus Tender',
      icon: '🧪',
      description: 'Tracking thermal limits over condensers and distillation racks.',
      fields: [
        { key: 'ownerName', label: 'Lab Principal Owner', type: 'text' },
        { key: 'condenserModel', label: 'Condenser Unit Model', type: 'text' },
        { key: 'neutralizerVol', label: 'Neutralizer Supply Vol', type: 'text' }
      ]
    },
    {
      id: 'reagent_stocker',
      label: 'Reagent Stocker',
      icon: '📦',
      description: 'Sourcing components and evaluating sample purity thresholds.',
      fields: [
        { key: 'cabinetId', label: 'Cabinet Assignment ID', type: 'text' },
        { key: 'blackMarketLink', label: 'Underworld Contact Code', type: 'text' },
        { key: 'purityPct', label: 'Average Essence Purity %', type: 'number', min: 0 }
      ]
    }
  ],
  farrier: [
    {
      id: 'forge_shoer',
      label: 'Forge Shoer',
      icon: '🔨',
      description: 'Shaping structural iron footwear systems directly at fixed anvils.',
      fields: [
        { key: 'anvilWeight', label: 'Anvil Weight (lbs)', type: 'number', min: 0 },
        { key: 'ironStock', label: 'Raw Iron Hoops Stock', type: 'number', min: 0 },
        { key: 'coalLbs', label: 'Coal Fuel Supply (lbs)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'traveling_doctor',
      label: 'Traveling Hoof-Doctor',
      icon: '🐴',
      description: 'Providing field treatment layouts to distant farming setups.',
      fields: [
        { key: 'beastName', label: 'Pack Animal Identity', type: 'text' },
        { key: 'farmRoute', label: 'Regional Sector Track', type: 'text' },
        { key: 'splintCount', label: 'Splint Elements Carried', type: 'number', min: 0 }
      ]
    }
  ],
  dyer: [
    {
      id: 'vat_master',
      label: 'Vat Master',
      icon: '⚗️',
      description: 'Managing chemical mordants and monitoring active liquid vats.',
      fields: [
        { key: 'dyehouse', label: 'Dyehouse Complex Name', type: 'text' },
        { key: 'vatColor', label: 'Active Vat Fluid Color', type: 'text' },
        { key: 'fixativeStock', label: 'Fixative Agent Stock', type: 'text' }
      ]
    },
    {
      id: 'fabric_finisher',
      label: 'Fabric Finisher',
      icon: '🧣',
      description: 'Stretching and evaluating textile properties to design standards.',
      fields: [
        { key: 'batchType', label: 'Active Cloth Batch Type', type: 'text' },
        { key: 'grade', label: 'Texture Quality Grade', type: 'text' },
        { key: 'designerName', label: 'Client Designer Name', type: 'text' }
      ]
    }
  ],
  'fence-builder': [
    {
      id: 'agricultural',
      label: 'Agricultural Fencer',
      icon: '🪵',
      description: 'Securing farmland borders and field lines.',
      fields: [
        { key: 'clientEstate', label: 'Client Estate Name', type: 'text' },
        { key: 'lumberSource', label: 'Lumber Wholesaler Source', type: 'text' },
        { key: 'linearFeet', label: 'Linear Feet Completed', type: 'number', min: 0 }
      ]
    },
    {
      id: 'palisade',
      label: 'Palisade Fortifier',
      icon: '🏰',
      description: 'Building heavy defensive barriers for outposts and garrisons.',
      fields: [
        { key: 'garrisonName', label: 'Garrison Base Name', type: 'text' },
        { key: 'timberThickness', label: 'Timber Diameter (in)', type: 'number', min: 0 },
        { key: 'commander', label: 'Guard Commander Name', type: 'text' }
      ]
    }
  ],
  wheelwright: [
    {
      id: 'hub_shaper',
      label: 'Cartwright Hub-Shaper',
      icon: '🪓',
      description: 'Turning hubs and cutting layout configurations over oak components.',
      fields: [
        { key: 'shopName', label: 'Wood Shop Name', type: 'text' },
        { key: 'spokeCount', label: 'Spoke Element Stock', type: 'number', min: 0 },
        { key: 'latheGrade', label: 'Lathe Tool Condition', type: 'text' }
      ]
    },
    {
      id: 'tire_fitter',
      label: 'Tire Fitter (Metalwork)',
      icon: '⚙️',
      description: 'Heating and cooling metal tires onto wood frames.',
      fields: [
        { key: 'hoopStock', label: 'Iron Hoop Inventory', type: 'number', min: 0 },
        { key: 'hearthTemp', label: 'Hearth Expansion Target Temp', type: 'number', min: 0 },
        { key: 'sledgeBrand', label: 'Heavy Sledge Tool Brand', type: 'text' }
      ]
    }
  ],
  'rope-maker': [
    {
      id: 'rope_walk',
      label: 'Rope Walk Spinner',
      icon: '🪢',
      description: 'Braiding strands along massive horizontal line platforms.',
      fields: [
        { key: 'walkLength', label: 'Rope Walk Length (ft)', type: 'number', min: 0 },
        { key: 'fiberBales', label: 'Hemp Fiber Bales Count', type: 'number', min: 0 },
        { key: 'tensileRating', label: 'Tensile Strength Profile', type: 'text' }
      ]
    },
    {
      id: 'rigging_splicer',
      label: 'Rigging Splicer',
      icon: '⚓',
      description: 'Delivering custom marine knots directly inside active shipyards.',
      fields: [
        { key: 'shipyard', label: 'Target Shipyard Hub', type: 'text' },
        { key: 'marlinspike', label: 'Marlinspike Tool Brand', type: 'text' },
        { key: 'contractId', label: 'Naval Contract ID Code', type: 'text' }
      ]
    }
  ],
  fuller: [
    {
      id: 'trampler',
      label: 'Trough Trampler',
      icon: '👣',
      description: 'Cleansing woven stock by crushing fibers across clay lines.',
      fields: [
        { key: 'millName', label: 'Fulling Mill Venue', type: 'text' },
        { key: 'clayType', label: 'Clay Batch Formula Profile', type: 'text' },
        { key: 'yardsDaily', label: 'Daily Trample Volume (yds)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'tensioner',
      label: 'Tenter Frame Tensioner',
      icon: '🖼️',
      description: 'Aligning fabrics along drying rows to fix exact dimension metrics.',
      fields: [
        { key: 'fieldRow', label: 'Tenter Field Row ID', type: 'text' },
        { key: 'hookCount', label: 'Active Hook Inventory', type: 'number', min: 0 },
        { key: 'shrinkageMetric', label: 'Weather Shrinkage Metric', type: 'text' }
      ]
    }
  ],
  'potters-journeyman': [
    {
      id: 'thrower',
      label: 'Wheel Thrower',
      icon: '🏺',
      description: 'Shaping wet elements directly into vessel forms on spinning platforms.',
      fields: [
        { key: 'studioName', label: 'Pottery Studio Venue', type: 'text' },
        { key: 'clayGrade', label: 'Clay Type Material Grade', type: 'text' },
        { key: 'targetGreenware', label: 'Daily Greenware Target', type: 'number', min: 0 }
      ]
    },
    {
      id: 'firemaster',
      label: 'Kiln Firemaster',
      icon: '🔥',
      description: 'Managing thermal countdown profiles within structural furnaces.',
      fields: [
        { key: 'kilnId', label: 'Kiln Unit Code ID', type: 'text' },
        { key: 'fuelType', label: 'Fuel Model (Wood/Charcoal)', type: 'text' },
        { key: 'coneTarget', label: 'Pyrometric Cone Target', type: 'text' }
      ]
    }
  ],
  'apothecary-assistant': [
    {
      id: 'compounder',
      label: 'Compounder',
      icon: '🧪',
      description: 'Grinding raw components down using specialized manual tooling arrays.',
      fields: [
        { key: 'masterName', label: 'Master Apothecary Principal', type: 'text' },
        { key: 'mortarMaterial', label: 'Mortar & Pestle Material', type: 'text' },
        { key: 'scalesGrade', label: 'Scales Precision Grade', type: 'text' }
      ]
    },
    {
      id: 'clerk',
      label: 'Counter Clerk',
      icon: '📖',
      description: 'Logging patient tracking sheets and verifying regulated toxic assets.',
      fields: [
        { key: 'ledgerPage', label: 'Shop Ledger Page Offset', type: 'text' },
        { key: 'registerId', label: 'Poison Register Document ID', type: 'text' },
        { key: 'cashBoxSp', label: 'Daily Cash Box Content (sp)', type: 'number', min: 0 }
      ]
    }
  ],

  // MODEST
  scribe: [
    {
      id: 'copyist',
      label: 'Legal Copyist',
      icon: '✒️',
      description: 'Transcribing long litigation records and agreements.',
      fields: [
        { key: 'venue', label: 'Courthouse/Guildhall Venue', type: 'text' },
        { key: 'parchmentGrade', label: 'Parchment Quality Grade', type: 'text' },
        { key: 'caseId', label: 'Current Contract Case ID', type: 'text' }
      ]
    },
    {
      id: 'public_writer',
      label: 'Public Letter Writer',
      icon: '📜',
      description: 'Writing custom correspondence strings for illiterate regional workers.',
      fields: [
        { key: 'boothLoc', label: 'Market Booth Location', type: 'text' },
        { key: 'languages', label: 'Languages Spoken List', type: 'text' },
        { key: 'clientCount', label: 'Daily Client Traffic', type: 'number', min: 0 }
      ]
    }
  ],
  cook: [
    {
      id: 'tavern_chef',
      label: 'Tavern Chef',
      icon: '🍳',
      description: 'Serving large volumes of food quickly out of inn infrastructures.',
      fields: [
        { key: 'kitchenName', label: 'Tavern Kitchen Name', type: 'text' },
        { key: 'stewPotSize', label: 'Signature Stew Pot Size (gal)', type: 'number', min: 0 },
        { key: 'crewList', label: 'Prep Cook Staff Names', type: 'text' }
      ]
    },
    {
      id: 'estate_cook',
      label: 'Private Estate Cook',
      icon: '🥩',
      description: 'Configuring precise banquet configurations under custom budgets.',
      fields: [
        { key: 'household', label: 'Noble Family Household', type: 'text' },
        { key: 'bangetBudget', label: 'Banquet Budget (gp)', type: 'number', min: 0 },
        { key: 'restrictions', label: 'Dietary Restrictions Log', type: 'text' }
      ]
    }
  ],
  entertainer: [
    {
      id: 'bard',
      label: 'Tavern Bard',
      icon: '🪕',
      description: 'Playing targeted performances down across rowdy common venues.',
      fields: [
        { key: 'instrument', label: 'Primary Instrument', type: 'text' },
        { key: 'condition', label: 'Instrument Structural Quality', type: 'text' },
        { key: 'heckleResist', label: 'Heckle Resistance Score', type: 'number', min: 0 }
      ]
    },
    {
      id: 'actor',
      label: 'Troupe Actor',
      icon: '🎭',
      description: 'Portraying historical or dramatic roles inside local theater casts.',
      fields: [
        { key: 'troupeName', label: 'Theater Troupe Name', type: 'text' },
        { key: 'playTitle', label: 'Current Play Title', type: 'text' },
        { key: 'roleName', label: 'Cast Character Role', type: 'text' }
      ]
    }
  ],
  craftsman: [
    {
      id: 'blacksmith',
      label: 'Blacksmith',
      icon: '🔥',
      description: 'Forging iron tools and everyday hardware.',
      fields: [
        { key: 'forgeName', label: 'Forge Name', type: 'text' },
        { key: 'anvilQuality', label: 'Anvil Quality Tier', type: 'text' },
        { key: 'coalReserve', label: 'Fuel Coke Reserve (lbs)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'carpenter',
      label: 'Carpenter',
      icon: '🪵',
      description: 'Crafting building timber structures and furniture lines.',
      fields: [
        { key: 'workshop', label: 'Workshop Location Line', type: 'text' },
        { key: 'timberBoardFt', label: 'Timber Stored (board-feet)', type: 'number', min: 0 },
        { key: 'projectName', label: 'Masterwork Project Name', type: 'text' }
      ]
    }
  ],
  sailor: [
    {
      id: 'captain',
      label: 'Captain',
      icon: '⚓',
      description: 'You own your vessel and command your crew. The ship is yours.',
      fields: [
        { key: 'name', label: 'Ship Name', type: 'text', placeholder: 'The Iron Wyvern' },
        { key: 'hullPoints', label: 'Hull Hit Points', type: 'number', min: 0 },
        { key: 'armorClass', label: 'Armor Class', type: 'number', min: 0 },
        { key: 'speed', label: 'Speed (ft)', type: 'number', min: 0 },
        { key: 'crew', label: 'Crew (minimum)', type: 'number', min: 0 },
        { key: 'cannons', label: 'Cannons', type: 'number', min: 0 },
        { key: 'cargoCapacity', label: 'Cargo (tonnes)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'crew',
      label: 'Crew Member',
      icon: '🪝',
      description: 'You sail under another captain. Someone else calls the shots.',
      fields: [
        { key: 'name', label: 'Ship Name', type: 'text' },
        { key: 'captainFirstName', label: "Captain's First Name", type: 'text' },
        { key: 'captainSurname', label: "Captain's Surname", type: 'text' },
        { key: 'hullPoints', label: 'Hull Hit Points', type: 'number', min: 0 },
        { key: 'armorClass', label: 'Armor Class', type: 'number', min: 0 },
        { key: 'speed', label: 'Speed (ft)', type: 'number', min: 0 },
        { key: 'crew', label: 'Crew (minimum)', type: 'number', min: 0 },
        { key: 'cannons', label: 'Cannons', type: 'number', min: 0 },
        { key: 'cargoCapacity', label: 'Cargo (tonnes)', type: 'number', min: 0 }
      ]
    }
  ],
  soldier: [
    {
      id: 'watchman',
      label: 'City Watchman',
      icon: '🛡️',
      description: 'Patrolling civil borders and guarding public gates.',
      fields: [
        { key: 'assignedGate', label: 'Assigned Ward/Gate', type: 'text' },
        { key: 'guardhouseId', label: 'Guardhouse ID Code', type: 'text' },
        { key: 'captainName', label: 'Watch Captain Name', type: 'text' }
      ]
    },
    {
      id: 'mercenary',
      label: 'Mercenary Hireling',
      icon: '⚔️',
      description: 'Trading blade prowess across varying military operations.',
      fields: [
        { key: 'companyName', label: 'Company Organization Name', type: 'text' },
        { key: 'retainerGp', label: 'Retainer Fee (gp)', type: 'number', min: 0 },
        { key: 'bannerEmblem', label: 'War Banner Emblem Spec', type: 'text' }
      ]
    }
  ],
  teacher: [
    {
      id: 'tutor',
      label: 'Private Tutor',
      icon: '📚',
      description: 'Instructing specific family heirs directly on academic structures.',
      fields: [
        { key: 'studentName', label: 'Student Core Identity', type: 'text' },
        { key: 'specialty', label: 'Subject Specialty', type: 'text' },
        { key: 'accreditation', label: 'Academy Accreditation', type: 'text' }
      ]
    },
    {
      id: 'schoolmaster',
      label: 'Parish Schoolmaster',
      icon: '🔔',
      description: 'Managing class behaviors inside regional community schoolhouses.',
      fields: [
        { key: 'schoolhouse', label: 'Schoolhouse Location', type: 'text' },
        { key: 'classSize', label: 'Active Class Size', type: 'number', min: 0 },
        { key: 'caneCondition', label: 'Disciplinary Cane Condition', type: 'text' }
      ]
    }
  ],
  barkeep: [
    {
      id: 'server',
      label: 'Alehouse Server',
      icon: '🍺',
      description: 'Tracking draft lines and handling floor security issues.',
      fields: [
        { key: 'tavernName', label: 'Tavern Property Name', type: 'text' },
        { key: 'kegCount', label: 'Cellar Keg Count', type: 'number', min: 0 },
        { key: 'bouncerContact', label: 'Bouncer Contact Info', type: 'text' }
      ]
    },
    {
      id: 'inn_manager',
      label: 'Inn Manager',
      icon: '🔑',
      description: 'Handling check-ins and logging asset provisions.',
      fields: [
        { key: 'propertyName', label: 'Inn Property Name', type: 'text' },
        { key: 'keyCount', label: 'Room Key Inventory Count', type: 'number', min: 0 },
        { key: 'linensSupplier', label: 'Linens Supplier Entity', type: 'text' }
      ]
    }
  ],
  hunter: [
    {
      id: 'tracker',
      label: 'Big Game Tracker',
      icon: '🏹',
      description: 'Sighting apex threats across wild forest corridors.',
      fields: [
        { key: 'grounds', label: 'Hunting Grounds Zone', type: 'text' },
        { key: 'weapon', label: 'Primary Ranged Weapon', type: 'text' },
        { key: 'trapsCount', label: 'Active Trap/Snare Count', type: 'number', min: 0 }
      ]
    },
    {
      id: 'butcher',
      label: 'Pelt Butcher',
      icon: '🔪',
      description: 'Processing hides safely for merchant trade channels.',
      fields: [
        { key: 'knifeBrand', label: 'Skinning Knife Brand', type: 'text' },
        { key: 'tannerLink', label: 'Tanner Wholesaler Link', type: 'text' },
        { key: 'grade', label: 'Hide Quality Grade Scale', type: 'text' }
      ]
    }
  ],
  guide: [
    {
      id: 'pathfinder',
      label: 'Wilderness Pathfinder',
      icon: '🧭',
      description: 'Leading exploration groups across uncharted environments.',
      fields: [
        { key: 'terrainType', label: 'Favored Terrain Type', type: 'text' },
        { key: 'partyName', label: 'Client Party Designation', type: 'text' },
        { key: 'rationsLeft', label: 'Survival Rations Count', type: 'number', min: 0 }
      ]
    },
    {
      id: 'escort',
      label: 'Mountain Pass Escort',
      icon: '🏔️',
      description: 'Securing hazardous climbing operations through canyon paths.',
      fields: [
        { key: 'rangeName', label: 'Mountain Range Identity', type: 'text' },
        { key: 'elevation', label: 'Current Pass Elevation (ft)', type: 'number', min: 0 },
        { key: 'gearStatus', label: 'Climbing Gear Safety Rating', type: 'text' }
      ]
    }
  ],

  // COMFORTABLE
  innkeeper: [
    {
      id: 'hotelier',
      label: 'City Hotel Proprietor',
      icon: '🏢',
      description: 'Managing vast urban housing operations for high-status guests.',
      fields: [
        { key: 'hotelName', label: 'Hotel Corporate Name', type: 'text' },
        { key: 'roomsCount', label: 'Total Guest Rooms', type: 'number', min: 0 },
        { key: 'vaultBalanceGp', label: 'Vault Balance (gp)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'roadhouse_owner',
      label: 'Highway Roadhouse Owner',
      icon: '🧱',
      description: 'Running heavily secure waystations flanking bandit border arteries.',
      fields: [
        { key: 'houseName', label: 'Roadhouse Business Name', type: 'text' },
        { key: 'stableCap', label: 'Stable Unit Capacity', type: 'number', min: 0 },
        { key: 'truceAgreement', label: 'Local Bandit Truce Code', type: 'text' }
      ]
    }
  ],
  officer: [
    {
      id: 'guard_captain',
      label: 'Guard Captain',
      icon: '🎖️',
      description: 'Directing garrison formations and managing district safety indices.',
      fields: [
        { key: 'barracksDistrict', label: 'Barracks District Ward', type: 'text' },
        { key: 'complementCount', label: 'Guard Complement Count', type: 'number', min: 0 },
        { key: 'crimeIndex', label: 'Crime Index Rating (1-10)', type: 'number', min: 1 }
      ]
    },
    {
      id: 'army_commander',
      label: 'Army Commander',
      icon: '🚩',
      description: 'Commanding elite companies along campaign march targets.',
      fields: [
        { key: 'regimentId', label: 'Regiment Unit Code ID', type: 'text' },
        { key: 'soldierCount', label: 'Active Soldier Count', type: 'number', min: 0 },
        { key: 'objective', label: 'Next Strategic Objective', type: 'text' }
      ]
    }
  ],
  priest: [
    {
      id: 'temple_admin',
      label: 'Temple Administrator',
      icon: '📿',
      description: 'Overseeing tithe registries and tracking monastic assets.',
      fields: [
        { key: 'sanctuaryName', label: 'Temple Sanctuary Name', type: 'text' },
        { key: 'weeklyTitheGp', label: 'Weekly Tithe Balance (gp)', type: 'number', min: 0 },
        { key: 'rosterCount', label: 'Clergy Roster Count', type: 'number', min: 0 }
      ]
    },
    {
      id: 'chaplain',
      label: 'Parish Chaplain',
      icon: '⛪',
      description: 'Serving community needs while stewarding ancient relics.',
      fields: [
        { key: 'villageName', label: 'Parish Village Assignment', type: 'text' },
        { key: 'relicName', label: 'Sacred Relic Tracked', type: 'text' },
        { key: 'fontCap', label: 'Holy Water Font Cap (gal)', type: 'number', min: 0 }
      ]
    }
  ],
  merchant: [
    {
      id: 'shop_owner',
      label: 'Shop Owner',
      icon: '🏪',
      description: 'Managing a structural storefront and maintaining supply profiles.',
      fields: [
        { key: 'storeName', label: 'Storefront Trading Name', type: 'text' },
        { key: 'merchandiseLine', label: 'Main Merchandise Line', type: 'text' },
        { key: 'ledgerBalance', label: 'Store Ledger Balance (gp)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'caravan_master',
      label: 'Caravan Master',
      icon: '🐪',
      description: 'Directing line transportation structures safely across trade arteries.',
      fields: [
        { key: 'caravanId', label: 'Caravan Registry Code ID', type: 'text' },
        { key: 'wagonCount', label: 'Wagon Element Count', type: 'number', min: 0 },
        { key: 'destinationCity', label: 'Destination Market City', type: 'text' }
      ]
    }
  ],
  scholar: [
    {
      id: 'professor',
      label: 'University Professor',
      icon: '🎓',
      description: 'Holding academic domains and lecturing elite student rosters.',
      fields: [
        { key: 'department', label: 'University Department', type: 'text' },
        { key: 'paperTitle', label: 'Active Research Paper Title', type: 'text' },
        { key: 'hallAssignment', label: 'Lecture Hall Assignment', type: 'text' }
      ]
    },
    {
      id: 'archivist',
      label: 'Royal Archivist',
      icon: '📜',
      description: 'Sifting through locked library wings tracking historical records.',
      fields: [
        { key: 'libraryAnnex', label: 'Great Library Annex Wing', type: 'text' },
        { key: 'accessLevel', label: 'Vault Access Clearance Level', type: 'text' },
        { key: 'languageSpecialty', label: 'Ancient Language Specialty', type: 'text' }
      ]
    }
  ],
  jeweller: [
    {
      id: 'gem_cutter',
      label: 'Gem Cutter',
      icon: '💎',
      description: 'Evaluating facets and grinding precious elements down precisely.',
      fields: [
        { key: 'latheBrand', label: 'Workshop Gem Lathe Brand', type: 'text' },
        { key: 'loupeMag', label: 'Diamond Loupe Magnification', type: 'text' },
        { key: 'dustStockOz', label: 'Diamond Dust Stock (oz)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'goldsmith',
      label: 'Precious Metal Goldsmith',
      icon: '🪙',
      description: 'Smelting high-value bullion into jewelry systems.',
      fields: [
        { key: 'crucibleMaxTemp', label: 'Crucible Max Temperature (°C)', type: 'number', min: 0 },
        { key: 'ingotWeightOz', label: 'Gold/Silver Ingot Stock (oz)', type: 'number', min: 0 },
        { key: 'stampId', label: 'Hallmarking Stamp ID', type: 'text' }
      ]
    }
  ],
  cartographer: [
    {
      id: 'topographical',
      label: 'Topographical Surveyor',
      icon: '🗺️',
      description: 'Charting land elevations and logging grid border variances.',
      fields: [
        { key: 'charterOrg', label: 'Chartering Organization', type: 'text' },
        { key: 'astrolabeModel', label: 'Astrolabe Equipment Model', type: 'text' },
        { key: 'hexesCharted', label: 'Wilderness Hexes Charted', type: 'number', min: 0 }
      ]
    },
    {
      id: 'nautical',
      label: 'Nautical Chart Maker',
      icon: '🧭',
      description: 'Drafting depth parameters and secret marine shipping lines.',
      fields: [
        { key: 'fleetPartner', label: 'Naval Fleet Partner Entity', type: 'text' },
        { key: 'sectorMap', label: 'Coastal Sector Designation', type: 'text' },
        { key: 'routeIndexCode', label: 'Secret Trade Route Index Code', type: 'text' }
      ]
    }
  ],
  architect: [
    {
      id: 'civic_engineer',
      label: 'Civic Engineer',
      icon: '🏗️',
      description: 'Designing municipal structures under state safety specifications.',
      fields: [
        { key: 'boardName', label: 'Civic Infrastructure Board', type: 'text' },
        { key: 'blueprintId', label: 'Blueprint Tracking Code ID', type: 'text' },
        { key: 'wholesaler', label: 'Material Wholesaler Entity', type: 'text' }
      ]
    },
    {
      id: 'fortification',
      label: 'Fortification Designer',
      icon: '🏰',
      description: 'Calculating masonry defensive parameters against heavy artillery targets.',
      fields: [
        { key: 'patronLord', label: 'Patron Lord Identity', type: 'text' },
        { key: 'keepId', label: 'Keep Castle Registry Code', type: 'text' },
        { key: 'masonryHp', label: 'Structural Masonry Base HP', type: 'number', min: 0 }
      ]
    }
  ],
  'ship-captain': [
    {
      id: 'merchant_galleon',
      label: 'Merchant Galleon Master',
      icon: '🚢',
      description: 'Commanding massive enterprise crafts down international sea lanes.',
      fields: [
        { key: 'vesselName', label: 'Vessel Fleet Identity', type: 'text' },
        { key: 'manifestValueGp', label: 'Cargo Manifest Value (gp)', type: 'number', min: 0 },
        { key: 'subCommanders', label: 'Fleet Sub-Commanders Count', type: 'number', min: 0 }
      ]
    },
    {
      id: 'privateer',
      label: 'Privateer Commander',
      icon: '🏴‍☠️',
      description: 'Operating warship elements holding state-approved offensive waivers.',
      fields: [
        { key: 'vesselName', label: 'Warship Fleet Identity', type: 'text' },
        { key: 'marqueId', label: 'Royal Letter of Marque ID', type: 'text' },
        { key: 'targetNation', label: 'Target Adversary Fleet Nation', type: 'text' }
      ]
    }
  ],
  'master-smith': [
    {
      id: 'weaponsmith',
      label: 'Weaponsmith',
      icon: '⚔️',
      description: 'Forging masterwork blade tools for high-status commanders.',
      fields: [
        { key: 'forgeName', label: 'Forge Center Identity', type: 'text' },
        { key: 'signatureMark', label: 'Signature Blade Mark ID', type: 'text' },
        { key: 'nobleBacklog', label: 'Noble Backlog Order Lines', type: 'number', min: 0 }
      ]
    },
    {
      id: 'armorsmith',
      label: 'Armorsmith',
      icon: '🛡️',
      description: 'Forming custom layered plating calibrated to high force vectors.',
      fields: [
        { key: 'suitProject', label: 'Master Suit Active Project', type: 'text' },
        { key: 'pressurePsi', label: 'Forge Furnace Pressure', type: 'number', min: 0 },
        { key: 'platingDurability', label: 'Armor Plating Base HP', type: 'number', min: 0 }
      ]
    }
  ],
  'spy-master': [
    {
      id: 'court_spy',
      label: 'Court Spymaster',
      icon: '👥',
      description: 'Directing informational lines for central rulers.',
      fields: [
        { key: 'patronRuler', label: 'Patron Ruler Identity', type: 'text' },
        { key: 'cipherIndex', label: 'Informant Cipher Index Code', type: 'text' },
        { key: 'dossierCount', label: 'Blackmail Dossier Total Count', type: 'number', min: 0 }
      ]
    },
    {
      id: 'shadow_director',
      label: 'Shadow Guild Director',
      icon: '🥷',
      description: 'Managing underground network elements across hidden layouts.',
      fields: [
        { key: 'networkName', label: 'Underworld Network Name', type: 'text' },
        { key: 'safehousesCount', label: 'Safehouse Locations Count', type: 'number', min: 0 },
        { key: 'hitListCount', label: 'Rogue Agent Hit List Count', type: 'number', min: 0 }
      ]
    },
    {
      id: 'deep_cover',
      label: 'Deep Cover Agent (Special Case)',
      icon: '🎭',
      description: 'Operating down completely inside enemy organizational matrices.',
      fields: [
        { key: 'alias', label: 'Assigned Active Alias', type: 'text' },
        { key: 'targetCell', label: 'Target Infiltration Cell', type: 'text' },
        { key: 'burnTimerDays', label: 'True Identity Burn Timer (days)', type: 'number', min: 0 }
      ]
    }
  ],
  'master-brewer': [
    {
      id: 'brewmaster',
      label: 'Head Brewmaster',
      icon: '🍺',
      description: 'Formulating secret industrial scaling recipes for merchant guilds.',
      fields: [
        { key: 'plantName', label: 'Brewery Plant Name', type: 'text' },
        { key: 'yeastStrain', label: 'Secret Yeast Strain ID', type: 'text' },
        { key: 'kettleCap', label: 'Copper Kettle Capacity (gal)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'vintner',
      label: 'Vineyard Vintner',
      icon: '🍷',
      description: 'Managing grape fields and cellaring high-tier vintage expressions.',
      fields: [
        { key: 'vineyardName', label: 'Chateau Vineyard Name', type: 'text' },
        { key: 'varietalLine', label: 'Grape Varietal Line Spec', type: 'text' },
        { key: 'ratingIndex', label: 'Vintage Year Quality Rating', type: 'text' }
      ]
    }
  ],
  'court-minstrel': [
    {
      id: 'composer',
      label: 'Royal Composer',
      icon: '🎼',
      description: 'Forming massive sovereign score systems for crown pageantry.',
      fields: [
        { key: 'monarchPatron', label: 'Monarch Patron Identity', type: 'text' },
        { key: 'symphonyTitle', label: 'Masterpiece Symphony Title', type: 'text' },
        { key: 'privilegeRank', label: 'Court Privilege Rank Status', type: 'text' }
      ]
    },
    {
      id: 'troubadour',
      label: 'Master Troubadour',
      icon: '🎵',
      description: 'Navigating elite territorial castles driving faction favor indices.',
      fields: [
        { key: 'circuitRange', label: 'Noble House Circuit Range', type: 'text' },
        { key: 'favorRating', label: 'Patron Favor Rating (1-10)', type: 'number', min: 1 },
        { key: 'rivalName', label: 'Rival Performer Identity', type: 'text' }
      ]
    }
  ],
  'master-artisan': [
    {
      id: 'luthier',
      label: 'Master Luthier (Instruments)',
      icon: '🎻',
      description: 'Selecting tone wood lines to form elite acoustics.',
      fields: [
        { key: 'atelierLoc', label: 'Atelier Work Location', type: 'text' },
        { key: 'woodStockBf', label: 'Resonance Wood Stock (bf)', type: 'number', min: 0 },
        { key: 'licenseId', label: 'Guild Master License Code', type: 'text' }
      ]
    },
    {
      id: 'horologist',
      label: 'Master Horologist (Clocks)',
      icon: '🕰️',
      description: 'Assembling high-precision gears and chronometer automata frameworks.',
      fields: [
        { key: 'shopName', label: 'Clock Shop Brand Name', type: 'text' },
        { key: 'blueprintTarget', label: 'Active Automaton Blueprint', type: 'text' },
        { key: 'permitCode', label: 'Royal Escapement Permit Code', type: 'text' }
      ]
    }
  ],

  // WEALTHY
  barrister: [
    {
      id: 'litigator',
      label: 'High Court Litigator',
      icon: '⚖️',
      description: 'Arguing critical noble disputes directly inside magistrate halls.',
      fields: [
        { key: 'firmName', label: 'Law Firm Corporate Title', type: 'text' },
        { key: 'activeCases', label: 'Active High Court Cases', type: 'number', min: 0 },
        { key: 'systemSealId', label: 'Legal System Seal ID', type: 'text' }
      ]
    },
    {
      id: 'corporate_counsel',
      label: 'Corporate Counsel',
      icon: '📜',
      description: 'Structuring treaty protections over merchant union empires.',
      fields: [
        { key: 'guildName', label: 'Retaining Merchant Guild', type: 'text' },
        { key: 'registryId', label: 'Treaty Blueprint Registry ID', type: 'text' },
        { key: 'councilSeat', label: 'Advisory Council Seat Code', type: 'text' }
      ]
    }
  ],
  physician: [
    {
      id: 'surgeon',
      label: 'Royal Surgeon',
      icon: '🩺',
      description: 'Stewarding high palace safety and preserving elite health parameters.',
      fields: [
        { key: 'infirmaryWing', label: 'Palace Wing Infirmary ID', type: 'text' },
        { key: 'toolkitGrade', label: 'Surgical Toolkit Quality Grade', type: 'text' },
        { key: 'insuranceCode', label: 'Royal Life Insurance Code', type: 'text' }
      ]
    },
    {
      id: 'plague_specialist',
      label: 'Plague Doctor Specialist',
      icon: '👺',
      description: 'Deploying direct chemical blockades across quarantined city zones.',
      fields: [
        { key: 'quarantineSector', label: 'Quarantine Sector ID Code', type: 'text' },
        { key: 'potionStrains', label: 'Preventive Potion Strains Count', type: 'number', min: 0 },
        { key: 'maskType', label: 'Specialized Mask Model Type', type: 'text' }
      ]
    }
  ],
  'high-merchant': [
    {
      id: 'magnate',
      label: 'Guild Magnate',
      icon: '🏢',
      description: 'Holding regional monopolies across specific core enterprise sectors.',
      fields: [
        { key: 'guildTitle', label: 'Guild Corporation Title', type: 'text' },
        { key: 'capitalGp', label: 'Total Enterprise Capital (gp)', type: 'number', min: 0 },
        { key: 'monopolySector', label: 'Monopoly Product Line Sector', type: 'text' }
      ]
    },
    {
      id: 'shipping_tycoon',
      label: 'Shipping Tycoon',
      icon: '🚢',
      description: 'Commanding international docks and directing heavy marine logistics networks.',
      fields: [
        { key: 'shippingLine', label: 'Fleet Shipping Line Brand', type: 'text' },
        { key: 'docksCount', label: 'Commercial Docks Controlled', type: 'number', min: 0 },
        { key: 'insuranceLedger', label: 'Cargo Insurance Ledger Code', type: 'text' }
      ]
    }
  ],
  'war-engineer': [
    {
      id: 'battery_commander',
      label: 'Siege Battery Commander',
      icon: '💥',
      description: 'Calculating trajectory breakdowns to fracture structural target boundaries.',
      fields: [
        { key: 'corpsId', label: 'Army Corps Division ID', type: 'text' },
        { key: 'artilleryCount', label: 'Active Siege Engines Count', type: 'number', min: 0 },
        { key: 'calculationLog', label: 'Wall Breach Calculation Log ID', type: 'text' }
      ]
    },
    {
      id: 'citadel_def',
      label: 'Citadel Defense Engineer',
      icon: '🏰',
      description: 'Formulating structural failsafes over state fortress walls.',
      fields: [
        { key: 'fortressCode', label: 'City Fortress Code Reference', type: 'text' },
        { key: 'counterminesCount', label: 'Sappe Countermine Matrices', type: 'number', min: 0 },
        { key: 'vaultId', label: 'Defensive Blueprint Vault ID', type: 'text' }
      ]
    }
  ],
  'court-wizard': [
    {
      id: 'diviner',
      label: 'Grand Diviner Advisor',
      icon: '🔮',
      description: 'Utilizing long scanning mechanics to project security outcomes for thrones.',
      fields: [
        { key: 'towerId', label: 'Royal Astronomical Tower ID', type: 'text' },
        { key: 'focusItem', label: 'Primary Scrying Focus Item', type: 'text' },
        { key: 'rangeMiles', label: 'Arcane Sight Range (miles)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'abjurer',
      label: 'Castle Abjurer',
      icon: '🌀',
      description: 'Securing structural wards and setting dimensional alert layouts.',
      fields: [
        { key: 'matrixId', label: 'Keep Rune Matrix ID Code', type: 'text' },
        { key: 'activeWards', label: 'Active Spell Wards Count', type: 'number', min: 0 },
        { key: 'alarmLogId', label: 'Planar Breach Alarm Log ID', type: 'text' }
      ]
    },
    {
      id: 'necromancer',
      label: 'Necromantic Advisor (Special Case)',
      icon: '💀',
      description: 'Managing forbidden, unrecorded operations inside hidden vault wings.',
      fields: [
        { key: 'phylacteryRoom', label: 'Secret Phylactery Vault Room', type: 'text' },
        { key: 'thrallCount', label: 'Undead Thrall Units Tracked', type: 'number', min: 0 },
        { key: 'corruptionLevel', label: 'Arcane Corruption Level (1-100)', type: 'number', min: 1 }
      ]
    }
  ],
  'guild-master': [
    {
      id: 'union_master',
      label: 'Trade Union Master',
      icon: '📜',
      description: 'Enforcing rate structures and maintaining trade industry protections.',
      fields: [
        { key: 'unionName', label: 'Craft Guild/Union Name', type: 'text' },
        { key: 'memberCount', label: 'Active Certified Member Count', type: 'number', min: 0 },
        { key: 'fixingChartId', label: 'Price-Fixing Chart Index Code', type: 'text' }
      ]
    },
    {
      id: 'merchant_gm',
      label: 'Merchant Guild Master',
      icon: '⚖️',
      description: 'Negotiating high shipping pacts and executing trade treaties.',
      fields: [
        { key: 'hallName', label: 'Guildhall Headquarters Title', type: 'text' },
        { key: 'treatyId', label: 'Foreign Trade Treaty ID Code', type: 'text' },
        { key: 'lobbyStatus', label: 'High Court Lobbying Clearance', type: 'text' }
      ]
    }
  ],
  'royal-herald': [
    {
      id: 'herald_arms',
      label: 'Grand Herald of Arms',
      icon: '🛡️',
      description: 'Managing sovereign family trees and authorizing official crest updates.',
      fields: [
        { key: 'annexCode', label: 'College of Arms Annex Code', type: 'text' },
        { key: 'registryKey', label: 'Noble Lineage Tree Key Code', type: 'text' },
        { key: 'protocolId', label: 'Tournament Protocol Log ID', type: 'text' }
      ]
    },
    {
      id: 'envoy',
      label: 'High Diplomatic Envoy',
      icon: '🤝',
      description: 'Representing crown interests deep inside foreign assembly setups.',
      fields: [
        { key: 'targetKingdom', label: 'Target Foreign Kingdom Nation', type: 'text' },
        { key: 'passportId', label: 'Diplomatic Passport ID Reference', type: 'text' },
        { key: 'retinueSize', label: 'Envoy Retinue Personnel Size', type: 'number', min: 0 }
      ]
    }
  ],
  'master-alchemist': [
    {
      id: 'manufacturer',
      label: 'Potion Manufacturer',
      icon: '🧪',
      description: 'Scaling magical distillation batches down inside massive lab assets.',
      fields: [
        { key: 'complexLoc', label: 'Laboratory Complex Location', type: 'text' },
        { key: 'formulaRegistry', label: 'Master Formula Registry Index', type: 'text' },
        { key: 'weeklyOutput', label: 'Weekly Potion Output Batches', type: 'number', min: 0 }
      ]
    },
    {
      id: 'philosopher',
      label: 'Transmutation Philosopher',
      icon: '🪙',
      description: 'Evaluating conversion ratios over base metal allocations.',
      fields: [
        { key: 'crucibleId', label: 'Philosopher Stone Crucible ID', type: 'text' },
        { key: 'catalystPurity', label: 'Mercury Catalyst Purity %', type: 'number', min: 0 },
        { key: 'mutationLogId', label: 'Alchemical Mutation Log Reference', type: 'text' }
      ]
    }
  ],
  admiral: [
    {
      id: 'flagship',
      label: 'Fleet Flagship Commander',
      icon: '🚢',
      description: 'Directing fleet strategy from your central flag craft setup.',
      fields: [
        { key: 'name', label: 'Flagship Name', type: 'text' },
        { key: 'fleetCount', label: 'Total Fleet Hull Count', type: 'number', min: 0 },
        { key: 'strategicCodes', label: 'War Room Strategic Codes', type: 'text' }
      ]
    },
    {
      id: 'strategist',
      label: 'Naval Warfare Strategist',
      icon: '🗺️',
      description: 'Calibrating maritime defense setups from central operational hubs.',
      fields: [
        { key: 'commandHq', label: 'Admiralty Command HQ Hub', type: 'text' },
        { key: 'theatreBoundaries', label: 'Maritime Theatre Boundaries', type: 'text' },
        { key: 'garrisonLinks', label: 'Coastal Garrison Interlinks', type: 'text' }
      ]
    }
  ],
  bishop: [
    {
      id: 'diocesan',
      label: 'Cathedral Diocesan Ruler',
      icon: '👑',
      description: 'Governing territorial parish lines and coordinating regional assets.',
      fields: [
        { key: 'cathedralName', label: 'Cathedral Center Name', type: 'text' },
        { key: 'priestsCount', label: 'Total Ordained Priests Managed', type: 'number', min: 0 },
        { key: 'treasuryIndex', label: 'Holy Treasury Index Ref (gp)', type: 'text' }
      ]
    },
    {
      id: 'cardinal',
      label: 'Cardinal Elector',
      icon: '⛪',
      description: 'Holding high seats inside central sovereign faith councils.',
      fields: [
        { key: 'councilSeatId', label: 'High Papal Council Seat ID', type: 'text' },
        { key: 'voteWeight', label: 'Conclave Electoral Voting Weight', type: 'number', min: 0 },
        { key: 'oversightCode', label: 'Inquisitorial Oversight Code', type: 'text' }
      ]
    }
  ],
  'master-assassin': [
    {
      id: 'director',
      label: 'Shadow Contract Director',
      icon: '💀',
      description: 'Coordinating high-value containment vectors over elite targets.',
      fields: [
        { key: 'cellName', label: 'Assassin Creed Cell Name', type: 'text' },
        { key: 'targetRegisterId', label: 'High-Value Target Register ID', type: 'text' },
        { key: 'matrixId', label: 'Safehouse Matrix ID Code', type: 'text' }
      ]
    },
    {
      id: 'executioner',
      label: 'Royal Executioner Elite',
      icon: '🪓',
      description: 'Executing regulated sovereign verdicts on maximum prison assets.',
      fields: [
        { key: 'complexName', label: 'Imperial Prison Complex', type: 'text' },
        { key: 'weaponArtifact', label: 'Execution Weapon Artifact Title', type: 'text' },
        { key: 'warrantLogId', label: 'Royal Execution Warrant Log ID', type: 'text' }
      ]
    }
  ],
  'archmage-advisor': [
    {
      id: 'general',
      label: 'Imperial Battlemage General',
      icon: '🔥',
      description: 'Directing spellbook strike divisions across theater warfronts.',
      fields: [
        { key: 'divisionId', label: 'Arcane Strike Division ID', type: 'text' },
        { key: 'spellbookRegistry', label: 'War Spellbook Registry Index', type: 'text' },
        { key: 'targetCoords', label: 'Strategic Target Coordinates', type: 'text' }
      ]
    },
    {
      id: 'council_head',
      label: 'Royal Council Arcane Head',
      icon: '🔮',
      description: 'Securing kingdom defense grids directly at the highest levels.',
      fields: [
        { key: 'vaultKeyId', label: 'Privy Council Vault Key ID', type: 'text' },
        { key: 'gridStatus', label: 'Planar Defense Grid Status', type: 'text' },
        { key: 'secretFileId', label: 'Sovereign Secret Files Registry', type: 'text' }
      ]
    }
  ],
  'trade-prince': [
    {
      id: 'cartel_leader',
      label: 'Sovereign Cartel Leader',
      icon: '👑',
      description: 'Running independent private milities backing trade city systems.',
      fields: [
        { key: 'cartelName', label: 'Cartel Empire Name', type: 'text' },
        { key: 'regimentId', label: 'Private Army Regiment ID Code', type: 'text' },
        { key: 'debtLedgerId', label: 'International Debt Ledger ID', type: 'text' }
      ]
    },
    {
      id: 'monopolist',
      label: 'Continental Trade Monopolist',
      icon: '🗺️',
      description: 'Squeezing multi-kingdom markets down through asset dominance.',
      fields: [
        { key: 'sectorName', label: 'Monopoly Trade Sector Domain', type: 'text' },
        { key: 'accountsMatrixId', label: 'Bank Accounts Matrix ID Code', type: 'text' },
        { key: 'callSign', label: 'Mercenary Fleet Call-Sign', type: 'text' }
      ]
    }
  ],

  // LAND OWNER
  'landed-knight': [
    {
      id: 'manor_lord',
      label: 'Manor Lord',
      icon: '🏰',
      description: 'Administering regional village networks and holding ancestral deeds.',
      fields: [
        { key: 'estateName', label: 'Manor Estate Name', type: 'text' },
        { key: 'serfCount', label: 'Serf Population Count', type: 'number', min: 0 },
        { key: 'deedId', label: 'Land Title Deed ID Reference', type: 'text' }
      ]
    },
    {
      id: 'border_captain',
      label: 'Border March Captain',
      icon: '🛡️',
      description: 'Manning perimeter outposts shielding against outer wilderness threats.',
      fields: [
        { key: 'watchtowerId', label: 'March Watchtower ID Code', type: 'text' },
        { key: 'troopCount', label: 'Garrison Troop Count', type: 'number', min: 0 },
        { key: 'keepHp', label: 'Keep Defenses Base HP', type: 'number', min: 0 }
      ]
    }
  ],
  baronet: [
    {
      id: 'hereditary',
      label: 'Hereditary Estate Holder',
      icon: '📜',
      description: 'Stewarding multi-generational land assets and tracking tenant lines.',
      fields: [
        { key: 'estateName', label: 'Hereditary Estate Title Name', type: 'text' },
        { key: 'registryId', label: 'Tenancy Agreements Registry ID', type: 'text' },
        { key: 'acreage', label: 'Estate Land Net Acreage', type: 'number', min: 0 }
      ]
    },
    {
      id: 'levy_contributor',
      label: 'Crown Levy Contributor',
      icon: '🚩',
      description: 'Funding and training knight units responding directly to high commands.',
      fields: [
        { key: 'stationName', label: 'Muster Garrison Station', type: 'text' },
        { key: 'levyCount', label: 'Required Knight Levy Count', type: 'number', min: 0 },
        { key: 'fundBudgetGp', label: 'Military Levy Budget (gp)', type: 'number', min: 0 }
      ]
    }
  ],
  baron: [
    {
      id: 'barony_ruler',
      label: 'Barony Ruler',
      icon: '🏰',
      description: 'Dispensing local justice systems inside fortified seat assets.',
      fields: [
        { key: 'territoryName', label: 'Barony Territory Name', type: 'text' },
        { key: 'keepTitle', label: 'Fortified Keep Title Name', type: 'text' },
        { key: 'courtLogId', label: 'Barony Court Sessional Log ID', type: 'text' }
      ]
    },
    {
      id: 'citadel_commander',
      label: 'Citadel Garrison Commander',
      icon: '🛡️',
      description: 'Securing massive supply lines and tracking localized munitions vaults.',
      fields: [
        { key: 'citadelCode', label: 'Citadel Keep Code Reference', type: 'text' },
        { key: 'manpowerCount', label: 'Garrison Manpower Count', type: 'number', min: 0 },
        { key: 'armoryStockId', label: 'Armory Weapon Stockpile ID', type: 'text' }
      ]
    }
  ],
  viscount: [
    {
      id: 'administrator',
      label: 'County Administrator',
      icon: '🏛️',
      description: 'Tracking customs operations and securing regional fiscal tax vaults.',
      fields: [
        { key: 'districtName', label: 'Viscounty Admin District', type: 'text' },
        { key: 'customsCount', label: 'Customs Stations Count', type: 'number', min: 0 },
        { key: 'vaultCode', label: 'Tax Collection Vault Code', type: 'text' }
      ]
    },
    {
      id: 'deputy_justice',
      label: "Count's Deputy Justice",
      icon: '⚖️',
      description: 'Executing high execution mandates over regional court calendars.',
      fields: [
        { key: 'courtName', label: 'Regional Court Venue Name', type: 'text' },
        { key: 'judgesCount', label: 'Active Sessional Judges Count', type: 'number', min: 0 },
        { key: 'decreesRegistryId', label: 'Judicial Decrees Registry ID', type: 'text' }
      ]
    }
  ],
  count: [
    {
      id: 'provincial',
      label: 'Provincial Ruler',
      icon: '👑',
      description: 'Commanding local standing armies over extensive territory holdings.',
      fields: [
        { key: 'countyName', label: 'County Territory Name', type: 'text' },
        { key: 'seatCastle', label: 'Seat Castle Title Name', type: 'text' },
        { key: 'armySize', label: 'Standing Comitatus Army Size', type: 'number', min: 0 }
      ]
    },
    {
      id: 'privy_man',
      label: 'Royal Privy Councillor',
      icon: '📜',
      description: 'Drafting high state frameworks directly inside advisory councils.',
      fields: [
        { key: 'councilSeat', label: 'Imperial High Council Seat ID', type: 'text' },
        { key: 'policyDraftId', label: 'National Policy Draft ID Code', type: 'text' },
        { key: 'sealAccessLevel', label: "King's Seal Access Clearance", type: 'text' }
      ]
    }
  ],
  marquess: [
    {
      id: 'frontier_guard',
      label: 'Frontier Guard Ruler',
      icon: '🛡️',
      description: 'Deploying heavy army assets blocking critical adversary nations.',
      fields: [
        { key: 'marchTerritory', label: 'Border March Territory Name', type: 'text' },
        { key: 'fortressesCount', label: 'Defensive Line Fortresses Count', type: 'number', min: 0 },
        { key: 'enemyKingdomId', label: 'Enemy Border Kingdom Nation', type: 'text' }
      ]
    },
    {
      id: 'negotiator',
      label: 'Foreign March Negotiator',
      icon: '🤝',
      description: 'Tracking tariff updates and deploying frontier diagnostic networks.',
      fields: [
        { key: 'treatiesRegistryId', label: 'Border Treaties Registry ID', type: 'text' },
        { key: 'tariffsTableId', label: 'Border Tariffs Table Index', type: 'text' },
        { key: 'skirmishLogId', label: 'Frontier Skirmish Log Reference', type: 'text' }
      ]
    }
  ],
  earl: [
    {
      id: 'dynastic_lord',
      label: 'High Dynastic Lord',
      icon: '👑',
      description: 'Leveraging traditional generational fealty patterns over ancient keeps.',
      fields: [
        { key: 'dynastyName', label: 'Earldom Dynasty House Title', type: 'text' },
        { key: 'castleHolds', label: 'Sovereign Castle Holds Count', type: 'number', min: 0 },
        { key: 'fealtyRegisterId', label: 'Fealty Oaths Register Reference', type: 'text' }
      ]
    },
    {
      id: 'force_marshal',
      label: 'Crown Force Marshal',
      icon: '🚩',
      description: 'Directing grand royal war cavalry groups inside campaign grids.',
      fields: [
        { key: 'divisionTitle', label: 'Royal War Host Division Title', type: 'text' },
        { key: 'manpower', label: 'Field Army Manpower Count', type: 'number', min: 0 },
        { key: 'ordersSheetId', label: 'Royal Military Orders Sheet ID', type: 'text' }
      ]
    }
  ],
  duke: [
    {
      id: 'sovereign_duchy',
      label: 'Sovereign Duchy Ruler',
      icon: '🏰',
      description: 'Directing multi-town structures holding massive separate cash assets.',
      fields: [
        { key: 'duchyName', label: 'Duchy Sovereign Name', type: 'text' },
        { key: 'capitalCastle', label: 'Ducal Capital Castle Title', type: 'text' },
        { key: 'treasuryBalanceGp', label: 'Ducal Treasury Balance (gp)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'lord_executor',
      label: 'Lord Regent Executor',
      icon: '📜',
      description: 'Managing national army activations while shielding lineage heirs.',
      fields: [
        { key: 'regencyCouncilId', label: 'Regency Council Registry ID', type: 'text' },
        { key: 'heirLogId', label: 'Royal Heir Guardianship Log ID', type: 'text' },
        { key: 'mobilizationRights', label: 'Mobilization Rights Clearance', type: 'text' }
      ]
    }
  ],
  'lord-regent': [
    {
      id: 'realm_protector',
      label: 'Realm Protector',
      icon: '🛡️',
      description: 'Holding full absolute command over national treasury systems.',
      fields: [
        { key: 'kingdomName', label: 'Kingdom Under Regency Title', type: 'text' },
        { key: 'masterVaultCode', label: 'Master Treasury Vault Code', type: 'text' },
        { key: 'decreeLogId', label: 'Sovereign Decree Log Reference', type: 'text' }
      ]
    },
    {
      id: 'royal_guardian',
      label: 'Royal Guardian',
      icon: '👑',
      description: 'Managing palace defense lines to isolate dangerous internal traitor setups.',
      fields: [
        { key: 'monarchName', label: 'Underage Monarch Target Identity', type: 'text' },
        { key: 'successionPlanId', label: 'Succession Protection Plan ID', type: 'text' },
        { key: 'blacklistId', label: 'Traitor House Blacklist Code', type: 'text' }
      ]
    }
  ],

  // NOBILITY
  prince: [
    {
      id: 'crown_heir',
      label: 'Crown Prince Heir',
      icon: '👑',
      description: 'Studying imperial war law flanked by elite protector divisions.',
      fields: [
        { key: 'accessionOrder', label: 'Kingdom Accession Order Position', type: 'number', min: 1 },
        { key: 'guardDetachment', label: 'Imperial Guard Detachment ID', type: 'text' },
        { key: 'budgetGp', label: 'Crown Prince Budget (gp)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'provincial_regent',
      label: 'Provincial Prince Regent',
      icon: '🏰',
      description: 'Governing assigned outer provinces on behalf of central crowns.',
      fields: [
        { key: 'provinceTitle', label: 'Granted Vice-Province Title', type: 'text' },
        { key: 'seatCastle', label: 'Provincial Seat Castle Name', type: 'text' },
        { key: 'armyStrength', label: 'Provincial Army Personnel Strength', type: 'number', min: 0 }
      ]
    }
  ],
  'grand-duke': [
    {
      id: 'sovereign_country',
      label: 'Sovereign Country Ruler',
      icon: '🗺️',
      description: 'Managing foreign pact frameworks and leading sovereign national regiments.',
      fields: [
        { key: 'sovereignName', label: 'Grand Duchy Sovereign Name', type: 'text' },
        { key: 'palaceCity', label: 'Capital Palace City Name', type: 'text' },
        { key: 'treatiesMatrixId', label: 'Foreign Treaties Matrix ID Code', type: 'text' }
      ]
    },
    {
      id: 'imperial_elector',
      label: 'High Imperial Elector',
      icon: '⚖️',
      description: 'Wielding high alliance vote patterns across global dynastic tracks.',
      fields: [
        { key: 'voteId', label: 'Imperial Electoral Vote ID Code', type: 'text' },
        { key: 'chamberSeatId', label: 'Council Chamber Seat ID Reference', type: 'text' },
        { key: 'claimsIndexId', label: 'High Dynastic Claims Index ID', type: 'text' }
      ]
    }
  ],
  'high-chancellor': [
    {
      id: 'bureaucracy_head',
      label: 'Imperial Bureaucracy Head head',
      icon: '🏛️',
      description: 'Stewarding state databases and deploying administrative appointments.',
      fields: [
        { key: 'corpsCount', label: 'Administrative Corps Size', type: 'number', min: 0 },
        { key: 'archiveVaultId', label: 'Royal Seal Archive Vault ID', type: 'text' },
        { key: 'appointmentMatrixId', label: 'State Appointment Matrix ID', type: 'text' }
      ]
    },
    {
      id: 'treasury_minister',
      label: 'Chief Treasury Minister',
      icon: '🪙',
      description: 'Managing national tax assessments and verifying sovereign currency licenses.',
      fields: [
        { key: 'exchequerVaultId', label: 'Exchequer Central Vault ID Code', type: 'text' },
        { key: 'debtLedgerId', label: 'Kingdom Debt/Credit Ledger ID', type: 'text' },
        { key: 'mintLicenseCode', label: 'Royal Mint License Code Reference', type: 'text' }
      ]
    }
  ],
  'arch-bishop': [
    {
      id: 'primate',
      label: 'High Primate of the Realm',
      icon: '📿',
      description: 'Anointing incoming monarchs and tracking kingdom-wide church books.',
      fields: [
        { key: 'cathedralTitle', label: 'Metropolitan Cathedral Title', type: 'text' },
        { key: 'clergyRegistryId', label: 'National Clergy Registry ID Code', type: 'text' },
        { key: 'coronationsLogId', label: 'Coronations Sessional Records ID', type: 'text' }
      ]
    },
    {
      id: 'see_world',
      label: 'Holy See Councillor',
      icon: '⛪',
      description: 'Directing inquisitorial tribunals and deploying high crusade parameters.',
      fields: [
        { key: 'tribunalRecordsId', label: 'Inquisition High Tribunal Records ID', type: 'text' },
        { key: 'crusadeOrdersId', label: 'Holy War Crusade Orders ID Code', type: 'text' },
        { key: 'decreeLedgerId', label: 'Holy Papal Decree Ledger ID', type: 'text' }
      ]
    }
  ],
  'queen-consort': [
    {
      id: 'household_director',
      label: 'Royal Household Director',
      icon: '🏰',
      description: 'Supervising palace staff allocations and directing internal stipends.',
      fields: [
        { key: 'householdCount', label: 'Domestic Household Staff Size', type: 'number', min: 0 },
        { key: 'patronageLedgerId', label: 'Royal Court Patronage Ledger ID', type: 'text' },
        { key: 'treasuryStipend', label: 'Royal Treasury Stipend Max (gp)', type: 'number', min: 0 }
      ]
    },
    {
      id: 'diplomatic_matriarch',
      label: 'Court Diplomatic Matriarch',
      icon: '🤝',
      description: 'Deploying strategic marital alliance tree networks across foreign kingdoms.',
      fields: [
        { key: 'allianceTreeId', label: 'Marriage Alliance Tree Key Code', type: 'text' },
        { key: 'influenceIndexId', label: 'Faction Influence Index ID Code', type: 'text' },
        { key: 'charitableRegId', label: 'Charitable Foundations Register ID', type: 'text' }
      ]
    }
  ],
  king: [
    {
      id: 'absolute_monarch',
      label: 'Absolute Sovereign Monarch',
      icon: '👑',
      description: 'Ultimate strategic commander of all regional asset blocks by divine conquest.',
      fields: [
        { key: 'reignTitle', label: 'Kingdom Reign Title Code', type: 'text' },
        { key: 'capitalPalace', label: 'Royal Capital Palace Title', type: 'text' },
        { key: 'masterVaultId', label: 'Realm Treasury Master Vault ID', type: 'text' }
      ]
    },
    {
      id: 'war_conqueror',
      label: 'War Conqueror King',
      icon: '⚔️',
      description: 'Pushing expansion paths and monitoring frontline strike force lines.',
      fields: [
        { key: 'campaignName', label: 'Active Expansion Campaign Title', type: 'text' },
        { key: 'provincesLedgerId', label: 'Conquered Provinces Ledger ID', type: 'text' },
        { key: 'vanguardCount', label: 'Vanguard War Host Personnel Size', type: 'number', min: 0 }
      ]
    }
  ],
  emperor: [
    {
      id: 'autocrat',
      label: 'High Imperial Autocrat',
      icon: '👑',
      description: 'Supreme ruler over multiple integrated vassal kingdoms and empires.',
      fields: [
        { key: 'empireName', label: 'Empire Realm System Title', type: 'text' },
        { key: 'goldenPalace', label: 'Golden Capital Palace Location', type: 'text' },
        { key: 'legionsMatrixId', label: 'Imperial Legions Command Matrix ID', type: 'text' }
      ]
    },
    {
      id: 'dynastic_emperor',
      label: 'Continental Dynastic Ruler',
      icon: '🗺️',
      description: 'Managing hegemony indices and locking down global artifact vaults.',
      fields: [
        { key: 'dynastyRegistryId', label: 'Imperial Dynasty Registry Code', type: 'text' },
        { key: 'hegemonyIndex', label: 'Hegemony Control Index Score', type: 'number', min: 0 },
        { key: 'artifactVaultId', label: 'Legendary Artifact Vault Code ID', type: 'text' }
      ]
    },
    {
      id: 'god_emperor',
      label: 'Divine God-Emperor (Ultimate Case)',
      icon: '✨',
      description: 'Ascended divine presence commanding global cult adoration cells.',
      fields: [
        { key: 'cultName', label: 'Deification Cult Temple Order', type: 'text' },
        { key: 'favorMetric', label: 'Divine Favor Resource Metric', type: 'number', min: 0 },
        { key: 'faithTithePp', label: 'Faith Tithe Net Income (pp)', type: 'number', min: 0 }
      ]
    }
  ]
};

export function getSubProfessionsForId(professionId: string): SubProfessionFlavour[] {
  return SUB_PROFESSIONS_REGISTRY[professionId] || [];
}