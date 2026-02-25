# Actionable Class Features for Actions Tab

This document catalogs all class features that should appear in the Actions tab as actionable buttons/cards.

## Feature Categories

### 1. **Active Features** (require player action)
- Features with charges (Second Wind, Action Surge, Rage, etc.)
- Features that cost resources (Ki Points, Spell Slots, etc.)
- Features with cooldowns or limited uses

### 2. **Reactive Features** (trigger in specific situations)
- Reactions (Uncanny Dodge, Shield spell, etc.)
- Conditional abilities (Sneak Attack, Divine Smite, etc.)

### 3. **Passive Reminders** (always on, but players should know about)
- Combat modifiers (Reckless Attack option, Advantage situations)
- Special conditions (Rage benefits, Evasion, etc.)

---

## ROGUE

### Base Class Features
- **Sneak Attack** (Level 1) - Passive reminder, shows damage dice
  - Display current damage: 1d6 at L1, scales to 10d6 at L19
  - Conditions: Advantage OR ally within 5 ft of target
  - Finesse/ranged weapon only

- **Cunning Action** (Level 2) - Bonus Action options
  - Dash, Disengage, or Hide as bonus action
  - Always available, no charges

- **Uncanny Dodge** (Level 5) - Reaction
  - When hit by attack, use reaction to halve damage
  - Always available, costs reaction

- **Evasion** (Level 7) - Passive reminder
  - DEX save: Success = no damage, Fail = half damage
  - Always on

- **Reliable Talent** (Level 11) - Passive reminder
  - Treat d20 rolls of 1-9 as 10 for proficient checks
  - Always on

- **Blindsense** (Level 14) - Passive reminder
  - Detect hidden/invisible creatures within 10 ft (if can hear)
  - Always on

- **Slippery Mind** (Level 15) - Passive reminder
  - Proficiency in WIS saves
  - Always on

- **Elusive** (Level 18) - Passive reminder
  - No attack rolls have advantage against you
  - Always on

- **Stroke of Luck** (Level 20) - Active choice
  - Turn miss into hit OR failed check into nat 20
  - 1/short rest

### Thief Subclass
- **Fast Hands** (Level 3) - Expands Cunning Action
  - Add: Sleight of Hand, Use Object, use thieves' tools
  - Always available

### Assassin Subclass
- **Assassinate** (Level 3) - Passive reminder
  - Advantage vs creatures that haven't acted
  - Auto-crit on surprised creatures
  - Always on

---

## FIGHTER

### Base Class Features
- **Second Wind** (Level 1) - Bonus Action
  - Regain 1d10 + fighter level HP
  - 1/short rest

- **Action Surge** (Level 2) - Active
  - Take one additional action on your turn
  - 1/short rest (2/short rest at L17)

- **Extra Attack** (Level 5) - Passive reminder
  - Make 2 attacks with Attack action
  - Always on (3 attacks at L11, 4 at L20)

### Champion Subclass
- **Improved Critical** (Level 3) - Passive reminder
  - Crit on 19-20
  - Always on

- **Remarkable Athlete** (Level 7) - Passive reminder
  - Add half proficiency to STR/DEX/CON checks
  - Always on

### Battle Master Subclass
- **Combat Superiority** (Level 3) - Active
  - 4 superiority dice (d8)
  - 3 maneuvers learned
  - Regain on short rest

- **Maneuvers** - Various (each different)
  - Trip Attack, Disarming Attack, Riposte, etc.
  - Cost 1 superiority die each

---

## BARBARIAN

### Base Class Features
- **Rage** (Level 1) - Bonus Action
  - +2 damage, resistance to physical damage, advantage on STR checks
  - 2/long rest (scales up with level)
  - Duration: 1 minute

- **Reckless Attack** (Level 2) - Active choice each turn
  - Gain advantage on melee attacks, attacks against you have advantage
  - Always available

- **Danger Sense** (Level 2) - Passive reminder
  - Advantage on DEX saves against seen effects
  - Always on

- **Extra Attack** (Level 5) - Passive reminder
  - 2 attacks with Attack action
  - Always on

- **Fast Movement** (Level 5) - Passive reminder
  - +10 ft speed (when not wearing heavy armor)
  - Always on

- **Feral Instinct** (Level 7) - Passive reminder
  - Advantage on initiative
  - Always on

- **Brutal Critical** (Level 9) - Passive reminder
  - Add extra weapon damage die on crit
  - Always on

- **Relentless Rage** (Level 11) - Reactive
  - When dropped to 0 HP while raging, make DC 10 CON save to stay at 1 HP
  - DC increases by 5 each use, resets on short rest

- **Persistent Rage** (Level 15) - Passive reminder
  - Rage only ends if you fall unconscious or choose to end it
  - Always on

- **Indomitable Might** (Level 18) - Passive reminder
  - Treat STR checks lower than STR score as equal to STR score
  - Always on

- **Primal Champion** (Level 20) - Passive reminder
  - +4 STR and CON, max 24
  - Always on

---

## MONK

### Base Class Features
- **Martial Arts** (Level 1) - Passive reminder
  - Use DEX for unarmed/monk weapons
  - Unarmed strike damage: 1d4 (scales up)
  - Bonus action unarmed strike after Attack action
  - Always on

- **Ki** (Level 2) - Resource pool
  - Pool = monk level
  - Regain all on short rest

- **Flurry of Blows** (Level 2) - Bonus Action
  - Make 2 unarmed strikes as bonus action
  - Costs 1 ki point

- **Patient Defense** (Level 2) - Bonus Action
  - Take Dodge action as bonus action
  - Costs 1 ki point

- **Step of the Wind** (Level 2) - Bonus Action
  - Dash or Disengage as bonus action, jump distance doubled
  - Costs 1 ki point

- **Deflect Missiles** (Level 3) - Reaction
  - Reduce ranged attack damage by 1d10 + DEX mod + monk level
  - If reduced to 0, can spend 1 ki to throw it back (ranged attack, d20 + prof, damage: missile damage + martial arts die)
  - Always available (reaction), optional ki cost

- **Slow Fall** (Level 4) - Reaction
  - Reduce falling damage by 5 × monk level
  - Always available (reaction)

- **Stunning Strike** (Level 5) - On hit
  - When you hit with melee weapon attack, spend 1 ki
  - Target makes CON save or is stunned until end of your next turn
  - DC = 8 + prof + WIS mod

- **Extra Attack** (Level 5) - Passive reminder
  - 2 attacks with Attack action
  - Always on

- **Stillness of Mind** (Level 7) - Action
  - End charmed or frightened effect on yourself
  - Always available (action)

- **Evasion** (Level 7) - Passive reminder
  - DEX save: Success = no damage, Fail = half damage
  - Always on

---

## PALADIN

### Base Class Features
- **Divine Sense** (Level 1) - Action
  - Detect celestials, fiends, undead within 60 ft
  - 1 + CHA modifier uses/long rest

- **Lay on Hands** (Level 1) - Action
  - Heal HP equal to 5 × paladin level (pool)
  - Can cure one disease or poison (costs 5 HP from pool)
  - Pool recharges on long rest

- **Fighting Style** (Level 2) - Passive reminder
  - Various bonuses (Defense +1 AC, Dueling +2 damage, etc.)
  - Always on

- **Divine Smite** (Level 2) - On hit (after hit confirmed)
  - Expend spell slot to deal 2d8 + 1d8/slot level radiant damage
  - +1d8 vs undead/fiends
  - Costs spell slot

- **Divine Health** (Level 3) - Passive reminder
  - Immune to disease
  - Always on

- **Extra Attack** (Level 5) - Passive reminder
  - 2 attacks with Attack action
  - Always on

- **Aura of Protection** (Level 6) - Passive reminder
  - You and allies within 10 ft add your CHA mod to saves
  - Always on (30 ft at L18)

- **Aura of Courage** (Level 10) - Passive reminder
  - You and allies within 10 ft can't be frightened
  - Always on

- **Cleansing Touch** (Level 14) - Action
  - End one spell on yourself or willing creature
  - CHA modifier uses/long rest

---

## RANGER

### Base Class Features
- **Favored Enemy** (Level 1) - Passive reminder
  - Advantage on tracking/recall for chosen enemy types
  - Always on

- **Natural Explorer** (Level 1) - Passive reminder
  - Benefits in chosen terrain
  - Always on

- **Fighting Style** (Level 2) - Passive reminder
  - Various bonuses
  - Always on

- **Primeval Awareness** (Level 3) - Action
  - Sense presence of creature types within 1 mile (6 miles in favored terrain)
  - Costs spell slot

- **Extra Attack** (Level 5) - Passive reminder
  - 2 attacks with Attack action
  - Always on

- **Land's Stride** (Level 8) - Passive reminder
  - Move through nonmagical difficult terrain without penalty
  - Always on

- **Hide in Plain Sight** (Level 10) - Action (1 minute setup)
  - +10 to Stealth checks while staying still
  - Always available

- **Vanish** (Level 14) - Passive reminder
  - Can't be tracked except by magical means
  - Can Hide as bonus action
  - Always on

- **Feral Senses** (Level 18) - Passive reminder
  - Attack invisible creatures without disadvantage
  - Detect invisible within 30 ft
  - Always on

---

## WIZARD

### Base Class Features
- **Arcane Recovery** (Level 1) - Special
  - Recover spell slots (total level ≤ half wizard level, rounded up)
  - 1/day during short rest

- **Spell Mastery** (Level 18) - Passive reminder
  - Cast one 1st level and one 2nd level spell at will
  - Always on

- **Signature Spells** (Level 20) - Passive reminder
  - Two 3rd level spells always prepared, cast once without slot
  - 1/short rest each

---

## CLERIC

### Base Class Features
- **Channel Divinity** (Level 2) - Active
  - Domain-specific effects
  - 1/short rest (2/short rest at L6, 3 at L18)

- **Destroy Undead** (Level 5) - Part of Turn Undead
  - Undead of CR X or lower are destroyed
  - CR threshold increases with level

- **Divine Intervention** (Level 10) - Action
  - Roll d100, succeed if ≤ cleric level
  - Ask deity for help
  - If successful, can't use again for 7 days
  - If failed, can try again after long rest

---

## Implementation Priority

### Phase 3: Rogue (FIRST)
- Sneak Attack display
- Cunning Action buttons
- Uncanny Dodge indicator
- Evasion reminder
- Reliable Talent reminder
- Stroke of Luck button (L20)

### Phase 4a: Martial Classes
- Fighter: Second Wind, Action Surge, Extra Attack
- Barbarian: Rage, Reckless Attack
- Monk: Ki abilities (Flurry, Patient Defense, Step of Wind, Stunning Strike)

### Phase 4b: Half-Casters
- Paladin: Divine Sense, Lay on Hands, Divine Smite
- Ranger: Primeval Awareness, Hide in Plain Sight

### Phase 4c: Full Casters
- Wizard: Arcane Recovery
- Cleric: Channel Divinity, Divine Intervention
- Warlock: Specific patron abilities with charges

### Phase 5: Subclass Features
- Battle Master maneuvers
- Thief Fast Hands
- Assassin Assassinate
- Champion Improved Critical
- Etc.
