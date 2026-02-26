/**
 * Racial and class traits reference data
 * Features from classes, subclasses, and races
 */
import type { TraitRef } from './types'

// RACIAL/CLASS TRAITS DATA
export const TRAITS: Record<string, TraitRef> = {
  'fey-ancestry': {
    id: 'fey-ancestry',
    name: 'Fey Ancestry',
    source: 'Elf / Half-Elf / Drow',
    description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
    mechanics: 'Advantage on saves vs. charm effects. Immunity to magical sleep.',
  },
  'keen-senses': {
    id: 'keen-senses',
    name: 'Keen Senses',
    source: 'Elf',
    description: 'You have proficiency in the Perception skill. Your heightened senses allow you to notice details that others might miss.',
    mechanics: 'Gain proficiency in Perception. If already proficient, gain expertise (double proficiency bonus).',
  },
  'constructed-resilience': {
    id: 'constructed-resilience',
    name: 'Constructed Resilience',
    source: 'Warforged',
    description: 'You were created to have remarkable fortitude. You have advantage on saving throws against being poisoned, and you have resistance to poison damage. You are immune to disease. You don\'t need to eat, drink, or breathe.',
    mechanics: 'Advantage on saves vs. poison. Resistance to poison damage. Immune to disease. No need to eat, drink, or breathe.',
  },
  'shapechanger': {
    id: 'shapechanger',
    name: 'Shapechanger',
    source: 'Changeling',
    description: 'As an action, you can change your appearance and your voice. You determine the specifics of the changes, including your coloration, hair length, and sex. You can also adjust your height and weight, but not so much that your size changes. You can make yourself appear as a member of another race, though none of your game statistics change. You can\'t duplicate the appearance of a creature you\'ve never seen, and you must adopt a form that has the same basic arrangement of limbs. Your clothing and equipment aren\'t changed by this trait. You stay in the new form until you use an action to revert to your true form or until you die.',
    mechanics: 'Action: Change appearance, voice, height, weight. Equipment unchanged. Lasts until you change again or die.',
  },
  'shifting': {
    id: 'shifting',
    name: 'Shifting',
    source: 'Shifter',
    description: 'As a bonus action, you can assume a more bestial appearance. This transformation lasts indefinitely. You can shift as a bonus action. While shifted, you gain temporary hit points equal to your level + your Constitution modifier (minimum of 1). You also gain additional benefits that depend on your shifter subrace. When you drop to 0 hit points, your shifting form ends and you revert to your humanoid form.',
    mechanics: 'Bonus action: Shift to gain temp HP = level + CON modifier. Gain subrace benefits. Lasts indefinitely until you reach 0 HP.',
  },
  'trance': {
    id: 'trance',
    name: 'Trance',
    source: 'Elf / Drow',
    description: 'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. This rest provides the same benefit as 8 hours of sleep.',
    mechanics: '4 hours of meditation = 8 hours of sleep. Semiconscious during trance.',
  },
  'sunlight-sensitivity': {
    id: 'sunlight-sensitivity',
    name: 'Sunlight Sensitivity',
    source: 'Drow',
    description: 'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
    mechanics: 'Disadvantage on attacks and Perception in sunlight.',
  },
  'hellish-resistance': {
    id: 'hellish-resistance',
    name: 'Hellish Resistance',
    source: 'Tiefling',
    description: 'You have resistance to fire damage.',
    mechanics: 'Take half damage from fire.',
  },
  'second-wind': {
    id: 'second-wind',
    name: 'Second Wind',
    source: 'Fighter',
    description: 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.',
    mechanics: 'Bonus action: Heal 1d10 + Fighter level. Recharges on short/long rest.',
  },
  'action-surge': {
    id: 'action-surge',
    name: 'Action Surge',
    source: 'Fighter (Level 2)',
    description: 'On your turn, you can take one additional action. Once you use this feature, you must finish a short or long rest before you can use it again. Starting at 17th level, you can use it twice before a rest, but only once per turn.',
    mechanics: 'Gain one additional action. Recharges on short/long rest.',
  },
  'divine-sense': {
    id: 'divine-sense',
    name: 'Divine Sense',
    source: 'Paladin (Level 1)',
    description: 'The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type (celestial, fiend, or undead) of any being whose presence you sense, but not its identity. Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated. You can use this feature a number of times equal to 1 + your Charisma modifier. When you finish a long rest, you regain all expended uses.',
    mechanics: 'Action: Detect celestials, fiends, and undead within 60 feet for 1 round. Uses = 1 + CHA modifier. Recharges on long rest.',
  },
  'lay-on-hands': {
    id: 'lay-on-hands',
    name: 'Lay on Hands',
    source: 'Paladin (Level 1)',
    description: 'Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5. As an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool. Alternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.',
    mechanics: 'Action: Heal HP from pool (Paladin level × 5). OR expend 5 HP to cure disease/poison. Recharges on long rest.',
  },
  'divine-smite': {
    id: 'divine-smite',
    name: 'Divine Smite',
    source: 'Paladin (Level 2)',
    description: 'When you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon\'s damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8. The damage increases by 1d8 if the target is an undead or a fiend, to a maximum of 6d8.',
    mechanics: 'On hit with melee weapon: Expend spell slot for 2d8 + 1d8 per slot level radiant damage (max 5d8, or 6d8 vs undead/fiend).',
  },
  'divine-health': {
    id: 'divine-health',
    name: 'Divine Health',
    source: 'Paladin (Level 3)',
    description: 'The divine magic flowing through you makes you immune to disease.',
    mechanics: 'Immune to all diseases.',
  },
  'awakened-mind': {
    id: 'awakened-mind',
    name: 'Awakened Mind',
    source: 'Warlock (Great Old One)',
    description: 'Starting at 1st level, your alien knowledge gives you the ability to touch the minds of other creatures. You can communicate telepathically with any creature you can see within 30 feet of you. You don\'t need to share a language with the creature for it to understand your telepathic utterances, but the creature must be able to understand at least one language.',
    mechanics: 'Telepathic communication with creatures within 30 feet.',
  },
  'entropic-ward': {
    id: 'entropic-ward',
    name: 'Entropic Ward',
    source: 'Warlock (Great Old One)',
    description: 'At 6th level, you learn to magically ward yourself against attack and to turn an enemy\'s failed strike into good luck for yourself. When a creature makes an attack roll against you, you can use your reaction to impose disadvantage on that roll. If the attack misses you, your next attack roll against the creature has advantage if you make it before the end of your next turn. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
    mechanics: 'Reaction: Impose disadvantage on attack against you. If it misses, gain advantage on your next attack against them. Recharges on short/long rest.',
  },
  'thought-shield': {
    id: 'thought-shield',
    name: 'Thought Shield',
    source: 'Warlock (Great Old One)',
    description: 'Starting at 10th level, your thoughts can\'t be read by telepathy or other means unless you allow it. You also have resistance to psychic damage, and whenever a creature deals psychic damage to you, that creature takes the same amount of damage that you do.',
    mechanics: 'Immune to thought reading. Resistance to psychic damage. Reflect psychic damage back to attacker.',
  },
  'create-thrall': {
    id: 'create-thrall',
    name: 'Create Thrall',
    source: 'Warlock (Great Old One)',
    description: 'At 14th level, you gain the ability to infect a humanoid\'s mind with the alien magic of your patron. You can use your action to touch an incapacitated humanoid. That creature is then charmed by you until a remove curse spell is cast on it, the charmed condition is removed from it, or you use this feature again. You can communicate telepathically with the charmed creature as long as the two of you are on the same plane of existence.',
    mechanics: 'Action: Touch incapacitated humanoid to permanently charm them. Telepathic link across any distance on same plane.',
  },
  'pact-magic': {
    id: 'pact-magic',
    name: 'Pact Magic',
    source: 'Warlock',
    description: 'Your arcane research and the magic bestowed on you by your patron have given you facility with spells. You regain all expended spell slots when you finish a short or long rest.',
    mechanics: 'Spell slots recharge on short rest. All slots are the same level.',
  },
  'dark-ones-blessing': {
    id: 'dark-ones-blessing',
    name: "Dark One's Blessing",
    source: 'Warlock (The Fiend)',
    description: 'Starting at 1st level, when you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1).',
    mechanics: 'Gain temp HP = CHA mod + Warlock level when you kill an enemy.',
  },
  'fey-presence': {
    id: 'fey-presence',
    name: 'Fey Presence',
    source: 'Warlock (The Archfey)',
    description: 'Starting at 1st level, your patron bestows upon you the ability to project the beguiling and fearsome presence of the fey. As an action, you can cause each creature in a 10-foot cube to make a Wisdom saving throw. Creatures that fail are charmed or frightened by you (your choice) until the end of your next turn.',
    mechanics: 'Action: 10-ft cube, WIS save or charmed/frightened. Recharges on short/long rest.',
  },
  'improved-critical': {
    id: 'improved-critical',
    name: 'Improved Critical',
    source: 'Fighter (Champion)',
    description: 'Beginning when you choose this archetype at 3rd level, your weapon attacks score a critical hit on a roll of 19 or 20.',
    mechanics: 'Critical hits on 19-20 instead of just 20.',
  },
  'combat-superiority': {
    id: 'combat-superiority',
    name: 'Combat Superiority',
    source: 'Fighter (Battle Master)',
    description: 'When you choose this archetype at 3rd level, you learn maneuvers that are fueled by special dice called superiority dice. You have four superiority dice, which are d8s. A superiority die is expended when you use it.',
    mechanics: '4 d8 superiority dice. Learn 3 maneuvers. Recharges on short/long rest.',
  },
  'resourceful': {
    id: 'resourceful',
    name: 'Resourceful',
    source: 'Human',
    description: 'You gain Inspiration whenever you finish a Long Rest.',
    mechanics: 'Automatic Inspiration after each Long Rest.',
  },
  'skillful': {
    id: 'skillful',
    name: 'Skillful',
    source: 'Human',
    description: 'You gain proficiency in one skill of your choice.',
    mechanics: 'Gain 1 additional skill proficiency.',
  },
  'versatile': {
    id: 'versatile',
    name: 'Versatile',
    source: 'Human',
    description: 'You gain an Origin feat of your choice. The Skilled feat is recommended for new players.',
    mechanics: 'Gain 1 Origin feat at character creation.',
  },
  'dwarven-resilience': {
    id: 'dwarven-resilience',
    name: 'Dwarven Resilience',
    source: 'Dwarf',
    description: 'You have advantage on saving throws against poison, and you have resistance against poison damage.',
    mechanics: 'Advantage on poison saves. Resistance to poison damage.',
  },
  'skill-versatility': {
    id: 'skill-versatility',
    name: 'Skill Versatility',
    source: 'Half-Elf',
    description: 'You gain proficiency in two skills of your choice.',
    mechanics: 'Gain 2 additional skill proficiencies.',
  },
  // === ELDRITCH INVOCATIONS (Warlock) ===
  'agonizing-blast': {
    id: 'agonizing-blast',
    name: 'Agonizing Blast',
    source: 'Warlock (Eldritch Invocation)',
    description: 'When you cast eldritch blast, add your Charisma modifier to the damage it deals on a hit.',
    mechanics: 'Eldritch Blast damage + CHA modifier per beam.',
  },
  'armor-of-shadows': {
    id: 'armor-of-shadows',
    name: 'Armor of Shadows',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can cast mage armor on yourself at will, without expending a spell slot or material components.',
    mechanics: 'At-will Mage Armor (AC = 13 + DEX modifier).',
  },
  'beast-speech': {
    id: 'beast-speech',
    name: 'Beast Speech',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can cast speak with animals at will, without expending a spell slot.',
    mechanics: 'At-will Speak with Animals.',
  },
  'beguiling-influence': {
    id: 'beguiling-influence',
    name: 'Beguiling Influence',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You gain proficiency in the Deception and Persuasion skills.',
    mechanics: 'Proficiency in Deception and Persuasion.',
  },
  'book-of-ancient-secrets': {
    id: 'book-of-ancient-secrets',
    name: 'Book of Ancient Secrets',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can now inscribe magical rituals in your Book of Shadows. Choose two 1st-level spells that have the ritual tag from any class\'s spell list. You can cast those spells as rituals.',
    mechanics: 'Requires Pact of the Tome. Learn and cast ritual spells from any class.',
  },
  'devils-sight': {
    id: 'devils-sight',
    name: "Devil's Sight",
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can see normally in darkness, both magical and nonmagical, to a distance of 120 feet.',
    mechanics: '120 feet of vision in all darkness, including magical darkness.',
  },
  'eldritch-sight': {
    id: 'eldritch-sight',
    name: 'Eldritch Sight',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can cast detect magic at will, without expending a spell slot.',
    mechanics: 'At-will Detect Magic.',
  },
  'eldritch-spear': {
    id: 'eldritch-spear',
    name: 'Eldritch Spear',
    source: 'Warlock (Eldritch Invocation)',
    description: 'When you cast eldritch blast, its range is 300 feet.',
    mechanics: 'Eldritch Blast range increased to 300 feet.',
  },
  'eyes-of-the-rune-keeper': {
    id: 'eyes-of-the-rune-keeper',
    name: 'Eyes of the Rune Keeper',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can read all writing.',
    mechanics: 'Read any written language.',
  },
  'fiendish-vigor': {
    id: 'fiendish-vigor',
    name: 'Fiendish Vigor',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can cast false life on yourself at will as a 1st-level spell, without expending a spell slot or material components.',
    mechanics: 'At-will False Life (1d4+4 temp HP).',
  },
  'gaze-of-two-minds': {
    id: 'gaze-of-two-minds',
    name: 'Gaze of Two Minds',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can use your action to touch a willing humanoid and perceive through its senses until the end of your next turn.',
    mechanics: 'Share senses with a willing humanoid via touch.',
  },
  'mask-of-many-faces': {
    id: 'mask-of-many-faces',
    name: 'Mask of Many Faces',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can cast disguise self at will, without expending a spell slot.',
    mechanics: 'At-will Disguise Self.',
  },
  'misty-visions': {
    id: 'misty-visions',
    name: 'Misty Visions',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can cast silent image at will, without expending a spell slot or material components.',
    mechanics: 'At-will Silent Image.',
  },
  'repelling-blast': {
    id: 'repelling-blast',
    name: 'Repelling Blast',
    source: 'Warlock (Eldritch Invocation)',
    description: 'When you hit a creature with eldritch blast, you can push the creature up to 10 feet away from you in a straight line.',
    mechanics: 'Eldritch Blast pushes target 10 feet per hit.',
  },
  'thirsting-blade': {
    id: 'thirsting-blade',
    name: 'Thirsting Blade',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can attack with your pact weapon twice, instead of once, whenever you take the Attack action on your turn.',
    mechanics: 'Requires Pact of the Blade, 5th level. Extra Attack with pact weapon.',
  },
  'voice-of-the-chain-master': {
    id: 'voice-of-the-chain-master',
    name: 'Voice of the Chain Master',
    source: 'Warlock (Eldritch Invocation)',
    description: 'You can communicate telepathically with your familiar and perceive through your familiar\'s senses as long as you are on the same plane of existence.',
    mechanics: 'Requires Pact of the Chain. Telepathy and shared senses with familiar.',
  },
  // === FIGHTING STYLES (Fighter/Paladin/Ranger) ===
  'archery-style': {
    id: 'archery-style',
    name: 'Archery',
    source: 'Fighter/Ranger Fighting Style',
    description: 'You gain a +2 bonus to attack rolls you make with ranged weapons.',
    mechanics: '+2 to attack rolls with ranged weapons.',
  },
  'defense-style': {
    id: 'defense-style',
    name: 'Defense',
    source: 'Fighter/Paladin/Ranger Fighting Style',
    description: 'While you are wearing armor, you gain a +1 bonus to AC.',
    mechanics: '+1 AC while wearing armor.',
  },
  'dueling-style': {
    id: 'dueling-style',
    name: 'Dueling',
    source: 'Fighter/Paladin/Ranger Fighting Style',
    description: 'When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.',
    mechanics: '+2 damage when using one melee weapon with free off-hand.',
  },
  'great-weapon-fighting-style': {
    id: 'great-weapon-fighting-style',
    name: 'Great Weapon Fighting',
    source: 'Fighter/Paladin Fighting Style',
    description: 'When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll.',
    mechanics: 'Reroll 1s and 2s on damage dice with two-handed melee weapons.',
  },
  'protection-style': {
    id: 'protection-style',
    name: 'Protection',
    source: 'Fighter/Paladin Fighting Style',
    description: 'When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.',
    mechanics: 'Reaction to give disadvantage to attacks on nearby allies. Requires shield.',
  },
  'two-weapon-fighting-style': {
    id: 'two-weapon-fighting-style',
    name: 'Two-Weapon Fighting',
    source: 'Fighter/Ranger Fighting Style',
    description: 'When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.',
    mechanics: 'Add ability modifier to off-hand weapon damage.',
  },
  'blind-fighting-style': {
    id: 'blind-fighting-style',
    name: 'Blind Fighting',
    source: 'Fighter/Paladin/Ranger Fighting Style',
    description: 'You have blindsight with a range of 10 feet. Within that range, you can effectively see anything that isn\'t behind total cover.',
    mechanics: '10 feet blindsight.',
  },
  'interception-style': {
    id: 'interception-style',
    name: 'Interception',
    source: 'Fighter/Paladin Fighting Style',
    description: 'When a creature you can see hits a target within 5 feet of you with an attack, you can use your reaction to reduce the damage by 1d10 + your proficiency bonus.',
    mechanics: 'Reaction to reduce damage to ally by 1d10 + proficiency.',
  },
  'thrown-weapon-fighting-style': {
    id: 'thrown-weapon-fighting-style',
    name: 'Thrown Weapon Fighting',
    source: 'Fighter/Ranger Fighting Style',
    description: 'You can draw a weapon that has the thrown property as part of the attack you make with the weapon. In addition, when you hit with a ranged attack using a thrown weapon, you gain a +2 bonus to the damage roll.',
    mechanics: 'Quick draw thrown weapons. +2 damage with thrown weapons.',
  },
  'unarmed-fighting-style': {
    id: 'unarmed-fighting-style',
    name: 'Unarmed Fighting',
    source: 'Fighter Fighting Style',
    description: 'Your unarmed strikes can deal bludgeoning damage equal to 1d6 + your Strength modifier on a hit. If you aren\'t wielding any weapons or a shield when you make the attack roll, the d6 becomes a d8.',
    mechanics: 'Unarmed strikes deal 1d6 (or 1d8 empty-handed) + STR.',
  },
  'superior-technique-style': {
    id: 'superior-technique-style',
    name: 'Superior Technique',
    source: 'Fighter Fighting Style',
    description: 'You learn one maneuver of your choice from among those available to the Battle Master archetype. You gain one superiority die, which is a d6. This die is used to fuel your maneuvers.',
    mechanics: 'Learn 1 Battle Master maneuver with 1 d6 superiority die.',
  },
  // === BATTLE MASTER MANEUVERS ===
  'commanders-strike': {
    id: 'commanders-strike',
    name: "Commander's Strike",
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you take the Attack action on your turn, you can forgo one of your attacks and use a bonus action to direct one of your companions to strike. When you do so, choose a friendly creature who can see or hear you and expend one superiority die. That creature can immediately use its reaction to make one weapon attack, adding the superiority die to the attack\'s damage roll.',
    mechanics: 'Forgo attack + bonus action: Ally attacks with reaction, +superiority die damage.',
  },
  'disarming-attack': {
    id: 'disarming-attack',
    name: 'Disarming Attack',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you hit a creature with a weapon attack, you can expend one superiority die to attempt to disarm the target. You add the superiority die to the attack\'s damage roll, and the target must make a Strength saving throw. On a failed save, it drops one object of your choice that it\'s holding.',
    mechanics: 'On hit: +superiority die damage. Target STR save or drops held item.',
  },
  'evasive-footwork': {
    id: 'evasive-footwork',
    name: 'Evasive Footwork',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you move, you can expend one superiority die, rolling the die and adding the number rolled to your AC until you stop moving.',
    mechanics: 'While moving: +superiority die to AC.',
  },
  'feinting-attack': {
    id: 'feinting-attack',
    name: 'Feinting Attack',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'You can expend one superiority die and use a bonus action on your turn to feint, choosing one creature within 5 feet of you as your target. You have advantage on your next attack roll against that creature this turn. If that attack hits, add the superiority die to the attack\'s damage roll.',
    mechanics: 'Bonus action: Advantage on next attack vs target within 5 ft, +superiority die damage.',
  },
  'goading-attack': {
    id: 'goading-attack',
    name: 'Goading Attack',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you hit a creature with a weapon attack, you can expend one superiority die to attempt to goad the target into attacking you. You add the superiority die to the attack\'s damage roll, and the target must make a Wisdom saving throw. On a failed save, the target has disadvantage on all attack rolls against targets other than you until the end of your next turn.',
    mechanics: 'On hit: +superiority die damage. Target WIS save or disadvantage attacking others.',
  },
  'lunging-attack': {
    id: 'lunging-attack',
    name: 'Lunging Attack',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you make a melee weapon attack on your turn, you can expend one superiority die to increase your reach for that attack by 5 feet. If you hit, you add the superiority die to the attack\'s damage roll.',
    mechanics: '+5 feet reach for one attack, +superiority die damage on hit.',
  },
  'maneuvering-attack': {
    id: 'maneuvering-attack',
    name: 'Maneuvering Attack',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you hit a creature with a weapon attack, you can expend one superiority die to maneuver one of your comrades into a more advantageous position. You add the superiority die to the attack\'s damage roll, and you choose a friendly creature who can see or hear you. That creature can use its reaction to move up to half its speed without provoking opportunity attacks from the target of your attack.',
    mechanics: 'On hit: +superiority die damage. Ally can move half speed without AoO from target.',
  },
  'menacing-attack': {
    id: 'menacing-attack',
    name: 'Menacing Attack',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you hit a creature with a weapon attack, you can expend one superiority die to attempt to frighten the target. You add the superiority die to the attack\'s damage roll, and the target must make a Wisdom saving throw. On a failed save, it is frightened of you until the end of your next turn.',
    mechanics: 'On hit: +superiority die damage. Target WIS save or frightened.',
  },
  'parry': {
    id: 'parry',
    name: 'Parry',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When another creature damages you with a melee attack, you can use your reaction and expend one superiority die to reduce the damage by the number you roll on your superiority die + your Dexterity modifier.',
    mechanics: 'Reaction when hit by melee: Reduce damage by superiority die + DEX modifier.',
  },
  'precision-attack': {
    id: 'precision-attack',
    name: 'Precision Attack',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you make a weapon attack roll against a creature, you can expend one superiority die to add it to the roll. You can use this maneuver before or after making the attack roll, but before any effects of the attack are applied.',
    mechanics: 'Add superiority die to attack roll.',
  },
  'pushing-attack': {
    id: 'pushing-attack',
    name: 'Pushing Attack',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you hit a creature with a weapon attack, you can expend one superiority die to attempt to drive the target back. You add the superiority die to the attack\'s damage roll, and if the target is Large or smaller, it must make a Strength saving throw. On a failed save, you push the target up to 15 feet away from you.',
    mechanics: 'On hit: +superiority die damage. Target STR save or pushed 15 feet.',
  },
  'rally': {
    id: 'rally',
    name: 'Rally',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'On your turn, you can use a bonus action and expend one superiority die to bolster the resolve of one of your companions. When you do so, choose a friendly creature who can see or hear you. That creature gains temporary hit points equal to the superiority die roll + your Charisma modifier.',
    mechanics: 'Bonus action: Ally gains temp HP = superiority die + CHA modifier.',
  },
  'riposte': {
    id: 'riposte',
    name: 'Riposte',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When a creature misses you with a melee attack, you can use your reaction and expend one superiority die to make a melee weapon attack against the creature. If you hit, you add the superiority die to the attack\'s damage roll.',
    mechanics: 'Reaction when enemy misses with melee: Counter-attack with +superiority die damage.',
  },
  'sweeping-attack': {
    id: 'sweeping-attack',
    name: 'Sweeping Attack',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you hit a creature with a melee weapon attack, you can expend one superiority die to attempt to damage another creature with the same attack. Choose another creature within 5 feet of the original target and within your reach. If the original attack roll would hit the second creature, it takes damage equal to the number you roll on your superiority die.',
    mechanics: 'On hit: Another creature within 5 ft takes superiority die damage.',
  },
  'trip-attack': {
    id: 'trip-attack',
    name: 'Trip Attack',
    source: 'Fighter (Battle Master Maneuver)',
    description: 'When you hit a creature with a weapon attack, you can expend one superiority die to attempt to knock the target down. You add the superiority die to the attack\'s damage roll, and if the target is Large or smaller, it must make a Strength saving throw. On a failed save, you knock the target prone.',
    mechanics: 'On hit: +superiority die damage. Target STR save or knocked prone.',
  },
  // === MORE RACIAL TRAITS ===
  'superior-darkvision': {
    id: 'superior-darkvision',
    name: 'Superior Darkvision',
    source: 'Drow',
    description: 'Your darkvision has a radius of 120 feet, allowing you to see in complete darkness as if it were dim light.',
    mechanics: '120 feet darkvision instead of standard 60 feet.',
  },
  'drow-magic': {
    id: 'drow-magic',
    name: 'Drow Magic',
    source: 'Drow',
    description: 'You know the Dancing Lights cantrip. At 3rd level, you can cast Faerie Fire once per long rest. At 5th level, you can cast Darkness once per long rest. Charisma is your spellcasting ability for these spells.',
    mechanics: 'Innate spellcasting: Dancing Lights (at will), Faerie Fire (3rd level), Darkness (5th level).',
  },
  'drow-weapon-training': {
    id: 'drow-weapon-training',
    name: 'Drow Weapon Training',
    source: 'Drow',
    description: 'You have proficiency with rapiers, shortswords, and hand crossbows.',
    mechanics: 'Proficiency with rapiers, shortswords, and hand crossbows.',
  },
  'infernal-legacy': {
    id: 'infernal-legacy',
    name: 'Infernal Legacy',
    source: 'Tiefling',
    description: 'You know the Thaumaturgy cantrip. At 3rd level, you can cast Hellish Rebuke once per long rest as a 2nd-level spell. At 5th level, you can cast Darkness once per long rest. Charisma is your spellcasting ability for these spells.',
    mechanics: 'Innate spellcasting: Thaumaturgy (at will), Hellish Rebuke (3rd level), Darkness (5th level).',
  },
  'stonecunning': {
    id: 'stonecunning',
    name: 'Stonecunning',
    source: 'Dwarf',
    description: 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check.',
    mechanics: 'Expertise on History checks related to stonework.',
  },
  'dwarven-combat-training': {
    id: 'dwarven-combat-training',
    name: 'Dwarven Combat Training',
    source: 'Dwarf',
    description: 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.',
    mechanics: 'Proficiency with battleaxe, handaxe, light hammer, warhammer.',
  },
  'expertise': {
    id: 'expertise',
    name: 'Expertise',
    source: 'Rogue (Level 1)',
    description: 'Choose two of your skill proficiencies, or one skill proficiency and your proficiency with thieves\' tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies. At 6th level, you can choose two more of your proficiencies to gain this benefit.',
    mechanics: 'Double proficiency bonus for 2 skills at level 1, 2 more at level 6.',
  },
  'sneak-attack': {
    id: 'sneak-attack',
    name: 'Sneak Attack',
    source: 'Rogue (Level 1)',
    description: 'Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon. You don\'t need advantage if another enemy of the target is within 5 feet of it, that enemy isn\'t incapacitated, and you don\'t have disadvantage. The damage increases as you level up: 2d6 at 3rd, 3d6 at 5th, 4d6 at 7th, 5d6 at 9th, 6d6 at 11th, 7d6 at 13th, 8d6 at 15th, 9d6 at 17th, and 10d6 at 19th level.',
    mechanics: 'Once per turn: Extra damage with advantage or ally nearby. Scales with level.',
  },
  'thieves-cant': {
    id: 'thieves-cant',
    name: 'Thieves\' Cant',
    source: 'Rogue (Level 1)',
    description: 'During your rogue training you learned thieves\' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation. Only another creature that knows thieves\' cant understands such messages. It takes four times longer to convey such a message than it does to speak the same idea plainly. In addition, you understand a set of secret signs and symbols used to convey short, simple messages, such as whether an area is dangerous or the territory of a thieves\' guild.',
    mechanics: 'Secret language and symbols to communicate with other rogues.',
  },
  'cunning-action': {
    id: 'cunning-action',
    name: 'Cunning Action',
    source: 'Rogue (Level 2)',
    description: 'Your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action.',
    mechanics: 'Bonus action: Dash, Disengage, or Hide.',
  },
  'uncanny-dodge': {
    id: 'uncanny-dodge',
    name: 'Uncanny Dodge',
    source: 'Rogue (Level 5)',
    description: 'When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack\'s damage against you.',
    mechanics: 'Reaction: Halve damage from one attack you can see.',
  },
  'evasion': {
    id: 'evasion',
    name: 'Evasion',
    source: 'Rogue (Level 7)',
    description: 'You can nimbly dodge out of the way of certain area effects, such as a red dragon\'s fiery breath or an ice storm spell. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.',
    mechanics: 'DEX save: No damage on success, half on failure (instead of half/full).',
  },
  'lucky': {
    id: 'lucky',
    name: 'Lucky',
    source: 'Halfling',
    description: 'When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
    mechanics: 'Reroll natural 1s on d20 rolls.',
  },
  'brave': {
    id: 'brave',
    name: 'Brave',
    source: 'Halfling',
    description: 'You have advantage on saving throws against being frightened.',
    mechanics: 'Advantage on saves vs. frightened.',
  },
  'halfling-nimbleness': {
    id: 'halfling-nimbleness',
    name: 'Halfling Nimbleness',
    source: 'Halfling',
    description: 'You can move through the space of any creature that is of a size larger than yours.',
    mechanics: 'Move through spaces of larger creatures.',
  },
  'relentless-endurance': {
    id: 'relentless-endurance',
    name: 'Relentless Endurance',
    source: 'Half-Orc',
    description: 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can\'t use this feature again until you finish a long rest.',
    mechanics: 'Once per long rest: Drop to 1 HP instead of 0.',
  },
  'savage-attacks': {
    id: 'savage-attacks',
    name: 'Savage Attacks',
    source: 'Half-Orc',
    description: 'When you score a critical hit with a melee weapon attack, you can roll one of the weapon\'s damage dice one additional time and add it to the extra damage of the critical hit.',
    mechanics: 'Extra damage die on melee critical hits.',
  },
  'gnome-cunning': {
    id: 'gnome-cunning',
    name: 'Gnome Cunning',
    source: 'Gnome',
    description: 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
    mechanics: 'Advantage on INT/WIS/CHA saves vs. magic.',
  },
  // === EXTRA ATTACK & CORE CLASS FEATURES ===
  'extra-attack': {
    id: 'extra-attack',
    name: 'Extra Attack',
    source: 'Fighter (Level 5) / Other Martial Classes',
    description: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn. The number of attacks increases to three at 11th level and four at 20th level (Fighter only).',
    mechanics: 'Attack twice per Attack action. Fighters gain 3 attacks at 11th, 4 at 20th.',
  },
  'indomitable': {
    id: 'indomitable',
    name: 'Indomitable',
    source: 'Fighter (Level 9)',
    description: 'Beginning at 9th level, you can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can\'t use this feature again until you finish a long rest. You can use this feature twice between long rests at 13th level and three times at 17th level.',
    mechanics: 'Reroll a failed saving throw. Uses increase at 13th and 17th level.',
  },
  'eldritch-invocations': {
    id: 'eldritch-invocations',
    name: 'Eldritch Invocations',
    source: 'Warlock (Level 2)',
    description: 'In your study of occult lore, you have unearthed eldritch invocations, fragments of forbidden knowledge that imbue you with an abiding magical ability. You gain two eldritch invocations of your choice. When you gain certain warlock levels, you gain additional invocations of your choice. Additionally, when you gain a level in this class, you can choose one invocation you know and replace it with another.',
    mechanics: 'Gain 2 invocations at level 2, more at higher levels. Some have prerequisites.',
  },
  'pact-boon': {
    id: 'pact-boon',
    name: 'Pact Boon',
    source: 'Warlock (Level 3)',
    description: 'At 3rd level, your otherworldly patron bestows a gift upon you for your loyal service. You gain one of the following features of your choice: Pact of the Chain (familiar), Pact of the Blade (weapon), or Pact of the Tome (cantrips and Book of Shadows).',
    mechanics: 'Choose Pact of the Chain, Blade, or Tome at level 3.',
  },
  'mystic-arcanum': {
    id: 'mystic-arcanum',
    name: 'Mystic Arcanum',
    source: 'Warlock (Level 11)',
    description: 'At 11th level, your patron bestows upon you a magical secret called an arcanum. Choose one 6th-level spell from the warlock spell list as this arcanum. You can cast your arcanum spell once without expending a spell slot. You must finish a long rest before you can do so again. At higher levels, you gain more arcanum spells of higher levels.',
    mechanics: 'Cast one 6th+ level spell once per long rest without a slot. Gains higher level arcanums.',
  },
  'eldritch-master': {
    id: 'eldritch-master',
    name: 'Eldritch Master',
    source: 'Warlock (Level 20)',
    description: 'At 20th level, you can draw on your inner reserve of mystical power while entreating your patron to regain expended spell slots. You can spend 1 minute entreating your patron for aid to regain all your expended spell slots from your Pact Magic feature. Once you regain spell slots with this feature, you must finish a long rest before you can do so again.',
    mechanics: '1 minute to regain all Pact Magic slots. Once per long rest.',
  },
  // === CHAMPION FEATURES ===
  'remarkable-athlete': {
    id: 'remarkable-athlete',
    name: 'Remarkable Athlete',
    source: 'Fighter (Champion, Level 7)',
    description: 'Starting at 7th level, you can add half your proficiency bonus (round up) to any Strength, Dexterity, or Constitution check you make that doesn\'t already use your proficiency bonus. In addition, when you make a running long jump, the distance you can cover increases by a number of feet equal to your Strength modifier.',
    mechanics: 'Add half proficiency to STR/DEX/CON checks. Longer running jumps.',
  },
  'additional-fighting-style': {
    id: 'additional-fighting-style',
    name: 'Additional Fighting Style',
    source: 'Fighter (Champion, Level 10)',
    description: 'At 10th level, you can choose a second option from the Fighting Style class feature.',
    mechanics: 'Gain a second Fighting Style.',
  },
  'superior-critical': {
    id: 'superior-critical',
    name: 'Superior Critical',
    source: 'Fighter (Champion, Level 15)',
    description: 'Starting at 15th level, your weapon attacks score a critical hit on a roll of 18-20.',
    mechanics: 'Critical hits on 18-20 instead of 19-20.',
  },
  'survivor': {
    id: 'survivor',
    name: 'Survivor',
    source: 'Fighter (Champion, Level 18)',
    description: 'At 18th level, you attain the pinnacle of resilience in battle. At the start of each of your turns, you regain hit points equal to 5 + your Constitution modifier if you have no more than half of your hit points left. You don\'t gain this benefit if you have 0 hit points.',
    mechanics: 'Regenerate 5 + CON HP per turn when below half health.',
  },
  // === BATTLE MASTER FEATURES ===
  'student-of-war': {
    id: 'student-of-war',
    name: 'Student of War',
    source: 'Fighter (Battle Master, Level 3)',
    description: 'At 3rd level, you gain proficiency with one type of artisan\'s tools of your choice.',
    mechanics: 'Gain proficiency with one artisan\'s tools.',
  },
  'know-your-enemy': {
    id: 'know-your-enemy',
    name: 'Know Your Enemy',
    source: 'Fighter (Battle Master, Level 7)',
    description: 'Starting at 7th level, if you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own.',
    mechanics: 'Spend 1 minute to learn relative stats of a creature (higher/lower/equal in 2 characteristics).',
  },
  'improved-combat-superiority': {
    id: 'improved-combat-superiority',
    name: 'Improved Combat Superiority',
    source: 'Fighter (Battle Master, Level 10)',
    description: 'At 10th level, your superiority dice turn into d10s. At 18th level, they turn into d12s.',
    mechanics: 'Superiority dice become d10s (level 10) then d12s (level 18).',
  },
  'relentless': {
    id: 'relentless',
    name: 'Relentless',
    source: 'Fighter (Battle Master, Level 15)',
    description: 'Starting at 15th level, when you roll initiative and have no superiority dice remaining, you regain 1 superiority die.',
    mechanics: 'Regain 1 superiority die when rolling initiative if you have none.',
  },
  // === FIEND WARLOCK FEATURES ===
  'dark-ones-own-luck': {
    id: 'dark-ones-own-luck',
    name: "Dark One's Own Luck",
    source: 'Warlock (The Fiend, Level 6)',
    description: 'Starting at 6th level, you can call on your patron to alter fate in your favor. When you make an ability check or a saving throw, you can use this feature to add a d10 to your roll. You can do so after seeing the initial roll but before any of the roll\'s effects occur. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
    mechanics: 'Add d10 to ability check or saving throw. Recharges on short/long rest.',
  },
  'fiendish-resilience': {
    id: 'fiendish-resilience',
    name: 'Fiendish Resilience',
    source: 'Warlock (The Fiend, Level 10)',
    description: 'Starting at 10th level, you can choose one damage type when you finish a short or long rest. You gain resistance to that damage type until you choose a different one with this feature. Damage from magical weapons or silver weapons ignores this resistance.',
    mechanics: 'Choose resistance to one damage type after each rest.',
  },
  'hurl-through-hell': {
    id: 'hurl-through-hell',
    name: 'Hurl Through Hell',
    source: 'Warlock (The Fiend, Level 14)',
    description: 'Starting at 14th level, when you hit a creature with an attack, you can use this feature to instantly transport the target through the lower planes. The creature disappears and hurtles through a nightmare landscape. At the end of your next turn, the target returns to the space it previously occupied, or the nearest unoccupied space. If the target is not a fiend, it takes 10d10 psychic damage as it reels from its horrific experience. Once you use this feature, you can\'t use it again until you finish a long rest.',
    mechanics: 'Banish target through Hell. Non-fiends take 10d10 psychic damage. Recharges on long rest.',
  },
  // === ARCHFEY WARLOCK FEATURES ===
  'misty-escape': {
    id: 'misty-escape',
    name: 'Misty Escape',
    source: 'Warlock (The Archfey, Level 6)',
    description: 'Starting at 6th level, you can vanish in a puff of mist in response to harm. When you take damage, you can use your reaction to turn invisible and teleport up to 60 feet to an unoccupied space you can see. You remain invisible until the start of your next turn or until you attack or cast a spell. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
    mechanics: 'Reaction when damaged: Turn invisible and teleport 60 ft. Recharges on short/long rest.',
  },
  'beguiling-defenses': {
    id: 'beguiling-defenses',
    name: 'Beguiling Defenses',
    source: 'Warlock (The Archfey, Level 10)',
    description: 'Beginning at 10th level, your patron teaches you how to turn the mind-affecting magic of your enemies against them. You are immune to being charmed, and when another creature attempts to charm you, you can use your reaction to attempt to turn the charm back on that creature.',
    mechanics: 'Immune to charm. Reaction: Reflect charm attempts back at caster.',
  },
  'dark-delirium': {
    id: 'dark-delirium',
    name: 'Dark Delirium',
    source: 'Warlock (The Archfey, Level 14)',
    description: 'Starting at 14th level, you can plunge a creature into an illusory realm. As an action, choose a creature that you can see within 60 feet of you. It must make a Wisdom saving throw against your warlock spell save DC. On a failed save, it is charmed or frightened by you (your choice) for 1 minute or until your concentration is broken. This effect ends early if the creature takes any damage. Until this illusion ends, the creature thinks it is lost in a misty realm. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
    mechanics: 'Action: Target WIS save or charmed/frightened for 1 minute. Recharges on short/long rest.',
  },
  'hexblades-curse': {
    id: 'hexblades-curse',
    name: 'Hexblade\'s Curse',
    source: 'Warlock (The Hexblade, Level 1)',
    description: 'As a bonus action, you can curse a creature you can see within 30 feet for 1 minute. You gain bonus damage equal to your proficiency bonus against the cursed target, score a critical hit on a 19 or 20, and regain HP equal to your Warlock level + CHA modifier when the target dies. The curse ends early if the target dies or you lose concentration. You can use this feature once per short or long rest.',
    mechanics: 'Bonus action. Range 30 ft. Duration 1 minute. Bonus damage = proficiency bonus. Crit on 19-20. Regain HP on kill = Warlock level + CHA mod. Once per short/long rest.',
  },
  'hex-warrior': {
    id: 'hex-warrior',
    name: 'Hex Warrior',
    source: 'Warlock (The Hexblade, Level 1)',
    description: 'You acquire training with medium armor, shields, and martial weapons. When you finish a long rest, you can touch one weapon that lacks the two-handed property. Until your next long rest, you can use your Charisma modifier instead of Strength or Dexterity for attack and damage rolls with that weapon. This benefit lasts until you finish a long rest.',
    mechanics: 'Proficiency: Medium armor, shields, martial weapons. Touch 1 weapon after long rest. Use CHA for attacks/damage with that weapon (not two-handed). Lasts until next long rest.',
  },
  'celestial-resistance': {
    id: 'celestial-resistance',
    name: 'Celestial Resistance',
    source: 'Aasimar',
    description: 'You have resistance to necrotic damage and radiant damage.',
    mechanics: 'Take half damage from necrotic and radiant damage.',
  },
  'draconic-ancestry': {
    id: 'draconic-ancestry',
    name: 'Draconic Ancestry',
    source: 'Dragonborn',
    description: 'You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type.',
    mechanics: 'Choose dragon type (Black, Blue, Brass, Bronze, Copper, Gold, Green, Red, Silver, White). Gain corresponding breath weapon and damage resistance.',
  },
  'duergar-magic': {
    id: 'duergar-magic',
    name: 'Duergar Magic',
    source: 'Duergar (Gray Dwarf)',
    description: 'When you reach 3rd level, you can cast the Enlarge/Reduce spell on yourself once with this trait, using only the spell\'s enlarge option. When you reach 5th level, you can cast the Invisibility spell on yourself once with this trait. You regain the ability to cast these spells with this trait when you finish a long rest. Intelligence is your spellcasting ability for these spells.',
    mechanics: 'Level 3: Cast Enlarge/Reduce (enlarge only) on self once per long rest. Level 5: Cast Invisibility on self once per long rest.',
  },
  'duergar-resilience': {
    id: 'duergar-resilience',
    name: 'Duergar Resilience',
    source: 'Duergar (Gray Dwarf)',
    description: 'You have advantage on saving throws against illusions and against being charmed or paralyzed.',
    mechanics: 'Advantage on saves vs. illusions, charm, and paralysis.',
  },
  'feline-agility': {
    id: 'feline-agility',
    name: 'Feline Agility',
    source: 'Tabaxi',
    description: 'Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn. Once you use this trait, you can\'t use it again until you move 0 feet on one of your turns.',
    mechanics: 'Double your movement speed for one turn. Recharges when you don\'t move on a turn.',
  },
  'fey-step': {
    id: 'fey-step',
    name: 'Fey Step',
    source: 'Eladrin',
    description: 'As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
    mechanics: 'Bonus action: Teleport 30 ft. Uses = proficiency bonus per long rest.',
  },
  'fighting-style': {
    id: 'fighting-style',
    name: 'Fighting Style',
    source: 'Fighter',
    description: 'You adopt a particular style of fighting as your specialty. Choose one fighting style: Archery (+2 to ranged attacks), Defense (+1 AC in armor), Dueling (+2 damage with one-handed weapon), Great Weapon Fighting (reroll 1s and 2s on damage dice), Protection (impose disadvantage on attacks against allies), or Two-Weapon Fighting (add ability modifier to off-hand attacks).',
    mechanics: 'Choose one fighting style at level 1. Each provides different combat bonuses.',
  },
  'firbolg-magic': {
    id: 'firbolg-magic',
    name: 'Firbolg Magic',
    source: 'Firbolg',
    description: 'You can cast Detect Magic and Disguise Self with this trait. Once you cast either spell with this trait, you can\'t cast that spell with it again until you finish a long rest. Wisdom is your spellcasting ability for these spells.',
    mechanics: 'Cast Detect Magic and Disguise Self each once per long rest.',
  },
  'draconic-cry': {
    id: 'draconic-cry',
    name: 'Draconic Cry',
    source: 'Kobold (PHB 2024)',
    description: 'As a bonus action, you let out a cry at your enemies within 10 feet of you. Until the start of your next turn, you and your allies have advantage on attack rolls against any of those enemies who could hear the cry. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
    mechanics: 'Bonus action: You and allies gain advantage on attacks vs. enemies within 10 ft that can hear you until start of your next turn. Uses = proficiency bonus per long rest.',
  },
  'kobold-legacy': {
    id: 'kobold-legacy',
    name: 'Kobold Legacy',
    source: 'Kobold (PHB 2024)',
    description: 'Choose one of the following options when you select this race: Craftiness (you have proficiency in one skill of your choice), Defiance (you have advantage on saving throws to avoid or end the frightened condition on yourself), or Draconic Sorcery (you know one cantrip of your choice from the sorcerer spell list; Intelligence, Wisdom, or Charisma is your spellcasting ability for it).',
    mechanics: 'Choose: Craftiness (1 skill proficiency), Defiance (advantage vs. frightened), or Draconic Sorcery (1 sorcerer cantrip).',
  },
  'grovel-cower-beg': {
    id: 'grovel-cower-beg',
    name: 'Grovel, Cower, and Beg',
    source: 'Kobold (Legacy)',
    description: 'As an action, you can distract nearby foes. Until the end of your next turn, your allies gain advantage on attack rolls against enemies within 10 feet of you that can see you. Once you use this trait, you can\'t use it again until you finish a short or long rest.',
    mechanics: 'Action: Allies gain advantage on attacks vs. enemies within 10 ft for 1 round. Recharges on short/long rest.',
  },
  'healing-hands': {
    id: 'healing-hands',
    name: 'Healing Hands',
    source: 'Aasimar',
    description: 'As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can\'t use it again until you finish a long rest.',
    mechanics: 'Action: Heal creature for HP = your level. Once per long rest.',
  },
  'hidden-step': {
    id: 'hidden-step',
    name: 'Hidden Step',
    source: 'Firbolg',
    description: 'As a bonus action, you can magically turn invisible until the start of your next turn or until you attack, make a damage roll, or force someone to make a saving throw. Once you use this trait, you can\'t use it again until you finish a short or long rest.',
    mechanics: 'Bonus action: Turn invisible until your next turn. Recharges on short/long rest.',
  },
  'magic-resistance': {
    id: 'magic-resistance',
    name: 'Magic Resistance',
    source: 'Yuan-ti Pureblood',
    description: 'You have advantage on saving throws against spells and other magical effects.',
    mechanics: 'Advantage on all saves vs. spells and magic.',
  },
  'mimicry': {
    id: 'mimicry',
    name: 'Mimicry',
    source: 'Kenku',
    description: 'You can mimic sounds you have heard, including voices. A creature that hears the sounds can tell they are imitations with a successful Wisdom (Insight) check opposed by your Charisma (Deception) check.',
    mechanics: 'Mimic any sound you\'ve heard. Opposed Insight vs. Deception to detect.',
  },
  'natural-armor': {
    id: 'natural-armor',
    name: 'Natural Armor',
    source: 'Lizardfolk / Tortle',
    description: 'You have tough, scaly skin. When you aren\'t wearing armor, your AC is 13 + your Dexterity modifier. You can use your natural armor to determine your AC if the armor you wear would leave you with a lower AC. A shield\'s benefits apply as normal while you use your natural armor.',
    mechanics: 'AC = 13 + DEX when not wearing armor. Can use shield.',
  },
  'otherworldly-patron': {
    id: 'otherworldly-patron',
    name: 'Otherworldly Patron',
    source: 'Warlock',
    description: 'At 1st level, you have struck a bargain with an otherworldly being of your choice: the Archfey, the Fiend, the Great Old One, or the Hexblade. Your choice grants you features at 1st level and again at 6th, 10th, and 14th level.',
    mechanics: 'Choose patron at level 1. Gain patron features at levels 1, 6, 10, and 14.',
  },
  'pack-tactics': {
    id: 'pack-tactics',
    name: 'Pack Tactics',
    source: 'Kobold (Legacy)',
    description: 'You have advantage on an attack roll against a creature if at least one of your allies is within 5 feet of the creature and the ally isn\'t incapacitated.',
    mechanics: 'Advantage on attacks when ally is within 5 ft of target.',
  },
  'powerful-build': {
    id: 'powerful-build',
    name: 'Powerful Build',
    source: 'Goliath / Firbolg',
    description: 'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
    mechanics: 'Carry, push, drag, and lift as if one size larger.',
  },
  'shell-defense': {
    id: 'shell-defense',
    name: 'Shell Defense',
    source: 'Tortle',
    description: 'You can withdraw into your shell as an action. Until you emerge, you gain a +4 bonus to AC, and you have advantage on Strength and Constitution saving throws. While in your shell, you are prone, your speed is 0 and can\'t increase, you have disadvantage on Dexterity saving throws, you can\'t take reactions, and the only action you can take is a bonus action to emerge.',
    mechanics: 'Action: Enter shell for +4 AC and advantage on STR/CON saves. Speed 0, prone, can\'t take reactions.',
  },
  'stones-endurance': {
    id: 'stones-endurance',
    name: 'Stone\'s Endurance',
    source: 'Goliath',
    description: 'You can focus yourself to occasionally shrug off injury. When you take damage, you can use your reaction to roll a d12. Add your Constitution modifier to the number rolled, and reduce the damage by that total. After you use this trait, you can\'t use it again until you finish a short or long rest.',
    mechanics: 'Reaction when damaged: Reduce damage by 1d12 + CON. Recharges on short/long rest.',
  },
  'innate-spellcasting': {
    id: 'innate-spellcasting',
    name: 'Innate Spellcasting',
    source: 'Yuan-Ti Pureblood',
    description: 'You know the Poison Spray cantrip. At 3rd level, you can cast Animal Friendship (snakes only) at will. At 3rd level, you can also cast Suggestion once per long rest. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (your choice).',
    mechanics: 'Cantrip: Poison Spray. Level 3+: Animal Friendship (snakes) at will, Suggestion 1/long rest.',
  },
  'poison-immunity': {
    id: 'poison-immunity',
    name: 'Poison Immunity',
    source: 'Yuan-Ti Pureblood',
    description: 'You are immune to poison damage and the poisoned condition. Your serpentine heritage grants you complete resistance to all toxins and venoms.',
    mechanics: 'Immune to poison damage and poisoned condition.',
  },
  'essence': {
    id: 'essence',
    name: 'Essence',
    source: 'Necromancer (Level 1)',
    description: 'You have a resource pool called Essence equal to 10 + your Necromancer level. Essence regenerates when enemies die near you (10 feet). You spend Essence to fuel your necromantic abilities. Your maximum Essence increases as you level up.',
    mechanics: 'Resource pool: 10 + Necromancer level. Regenerates from nearby enemy deaths. Used for necromantic abilities.',
  },
  'raise-skeleton': {
    id: 'raise-skeleton',
    name: 'Raise Skeleton',
    source: 'Necromancer (Level 1)',
    description: 'As an action, you can raise a skeleton warrior from remains within 30 feet. The skeleton has AC 13, HP equal to your Necromancer level × 4, and attacks with +INT modifier to hit for 1d8 + INT slashing damage. You can have a maximum number of skeletons equal to your Intelligence modifier. Costs 5 Essence per skeleton.',
    mechanics: 'Action. Range 30 ft. Cost 5 Essence. Max skeletons = INT mod. AC 13, HP = level × 4, Attack: +INT to hit, 1d8+INT slashing.',
  },
  'bone-spear': {
    id: 'bone-spear',
    name: 'Bone Spear',
    source: 'Necromancer (Level 1)',
    description: 'You launch a bone projectile at a creature within 60 feet. Make a ranged spell attack. On hit, the target takes 2d8 piercing damage plus your Intelligence modifier. The spear can pierce through targets, hitting all creatures in a 5-foot wide line. Costs 3 Essence.',
    mechanics: 'Ranged spell attack. Range 60 ft. Cost 3 Essence. 2d8 + INT piercing. Pierces in 5-ft line.',
  },
  'corpse-explosion': {
    id: 'corpse-explosion',
    name: 'Corpse Explosion',
    source: 'Necromancer (Level 3)',
    description: 'Target a corpse or undead minion within 60 feet and cause it to explode. All creatures within 15 feet must make a Dexterity saving throw (DC = 8 + proficiency + INT). On failure, they take 4d8 necrotic damage, or half on success. Destroys the corpse/minion. Costs 7 Essence.',
    mechanics: 'Range 60 ft. AoE 15 ft radius. Cost 7 Essence. DEX save DC 8+prof+INT. 4d8 necrotic, half on save.',
  },
  'army-of-the-dead': {
    id: 'army-of-the-dead',
    name: 'Army of the Dead',
    source: 'Necromancer (Level 9)',
    description: 'You summon a massive horde of undead warriors. For 1 minute, 10 skeleton warriors rise from the ground within 60 feet and fight for you. They act on your turn and follow your mental commands. Each has AC 12, HP 15, and attacks for +4 to hit dealing 1d8+2 slashing. Costs 20 Essence. Once per long rest.',
    mechanics: '1 minute duration. Summon 10 skeletons. Range 60 ft. Cost 20 Essence. 1/long rest. AC 12, HP 15, +4/1d8+2.',
  },
  'bone-armor': {
    id: 'bone-armor',
    name: 'Bone Armor',
    source: 'Necromancer - Bone (Level 6)',
    description: 'As a bonus action, you summon protective bone plating around your body. You gain temporary hit points equal to your Necromancer level + Intelligence modifier. While you have these temporary HP, you have resistance to bludgeoning, piercing, and slashing damage. Lasts until the temporary HP are depleted. Costs 6 Essence.',
    mechanics: 'Bonus action. Gain temp HP = level + INT. Resistance to B/P/S while active. Cost 6 Essence.',
  },
  'bone-prison': {
    id: 'bone-prison',
    name: 'Bone Prison',
    source: 'Necromancer - Bone (Level 6)',
    description: 'Target a creature within 60 feet. It must make a Dexterity saving throw (DC = 8 + proficiency + INT) or become restrained as bones erupt from the ground, forming a cage. The creature can use its action to make a Strength check (same DC) to break free. The prison has AC 15 and HP equal to 5 × your Necromancer level. Lasts 1 minute. Costs 8 Essence.',
    mechanics: 'Range 60 ft. DEX save DC 8+prof+INT or restrained. STR check to break. Prison: AC 15, HP 5×level. 1 min. Cost 8 Essence.',
  },
  'bone-spirit': {
    id: 'bone-spirit',
    name: 'Bone Spirit',
    source: 'Necromancer - Bone (Level 10)',
    description: 'You launch a spectral bone projectile that homes in on a creature within 120 feet. The bone spirit cannot miss and deals 6d8 necrotic damage. When it hits, it explodes in a 10-foot radius. All other creatures in the area must make a Dexterity save (DC = 8 + proficiency + INT) or take half damage. Costs 12 Essence.',
    mechanics: 'Range 120 ft. Auto-hit. 6d8 necrotic. AoE 10 ft radius, DEX save for half. Cost 12 Essence.',
  },
  'bone-wall': {
    id: 'bone-wall',
    name: 'Bone Wall',
    source: 'Necromancer - Bone (Level 14)',
    description: 'You create an impassable wall of bones in a line up to 60 feet long, 10 feet high, and 5 feet thick. The wall provides total cover. Each 10-foot section has AC 15 and 30 HP. The wall lasts for 10 minutes or until destroyed. Costs 10 Essence.',
    mechanics: '60 ft long, 10 ft high, 5 ft thick line. Total cover. Each 10-ft section: AC 15, 30 HP. 10 min. Cost 10 Essence.',
  },
  'blood-nova': {
    id: 'blood-nova',
    name: 'Blood Nova',
    source: 'Necromancer - Blood (Level 6)',
    description: 'Target a corpse within 60 feet. It explodes in a blood nova, dealing 5d8 necrotic damage to all creatures within 20 feet. Creatures must make a Constitution saving throw (DC = 8 + proficiency + INT) or take full damage and be poisoned for 1 minute, half damage and not poisoned on success. Costs 10 Essence.',
    mechanics: 'Range 60 ft. AoE 20 ft. CON save DC 8+prof+INT. 5d8 necrotic + poisoned 1 min, half on save. Cost 10 Essence.',
  },
  'drain-life': {
    id: 'drain-life',
    name: 'Drain Life',
    source: 'Necromancer - Blood (Level 6)',
    description: 'Channel life force from a creature within 60 feet. The target must make a Constitution saving throw (DC = 8 + proficiency + INT) or take 3d8 necrotic damage. You regain hit points equal to half the necrotic damage dealt. Can be concentrated on for up to 1 minute, draining each turn. Costs 4 Essence per turn.',
    mechanics: 'Range 60 ft. CON save DC 8+prof+INT. 3d8 necrotic, heal half. Concentration 1 min. Cost 4 Essence/turn.',
  },
  'iron-maiden': {
    id: 'iron-maiden',
    name: 'Iron Maiden',
    source: 'Necromancer - Blood (Level 10)',
    description: 'You curse a creature within 60 feet for 1 minute. Whenever the cursed creature makes an attack, it takes necrotic damage equal to half the damage it deals (minimum 5 damage). Requires concentration. The creature can make a Wisdom saving throw (DC = 8 + proficiency + INT) at the end of each turn to end the effect. Costs 8 Essence.',
    mechanics: 'Range 60 ft. Concentration 1 min. Attacker takes half their damage as necrotic (min 5). WIS save to end. Cost 8 Essence.',
  },
  'blood-golem': {
    id: 'blood-golem',
    name: 'Blood Golem',
    source: 'Necromancer - Blood (Level 14)',
    description: 'You summon a powerful blood construct. It has AC 16, HP equal to 8 × your Necromancer level, and makes attacks with +INT+proficiency to hit for 2d10+INT bludgeoning damage. It can use a bonus action to heal you for 2d8 HP. Lasts 10 minutes. Costs 15 Essence.',
    mechanics: 'Duration 10 min. AC 16, HP 8×level. Attack: +(INT+prof)/2d10+INT bludgeoning. Bonus: heal 2d8. Cost 15 Essence.',
  },
  'skeletal-mages': {
    id: 'skeletal-mages',
    name: 'Skeletal Mages',
    source: 'Necromancer - Summoner (Level 6)',
    description: 'As an action, you raise skeleton mages from remains within 30 feet. Each mage has AC 11, HP equal to your level × 3, and can cast Ray of Frost (+INT to hit, 1d8+INT cold damage, reduce speed by 10 ft). You can have maximum skeleton mages equal to half your Intelligence modifier (rounded down). Costs 6 Essence per mage.',
    mechanics: 'Action. Range 30 ft. Max mages = INT÷2. Cost 6 Essence each. AC 11, HP level×3, Ray of Frost +INT/1d8+INT.',
  },
  'revive': {
    id: 'revive',
    name: 'Revive',
    source: 'Necromancer - Summoner (Level 6)',
    description: 'As a bonus action, you can bring back a destroyed undead minion within 60 feet. The minion returns with half its maximum hit points. Costs 4 Essence per minion revived. You can revive multiple minions in one turn by spending Essence for each.',
    mechanics: 'Bonus action. Range 60 ft. Cost 4 Essence. Revive destroyed minion at half HP.',
  },
  'golem-mastery': {
    id: 'golem-mastery',
    name: 'Golem Mastery',
    source: 'Necromancer - Summoner (Level 10)',
    description: 'You can create powerful golems: Clay (AC 14, HP 6×level, 2d8+INT bludgeoning, resistance to physical), Blood (AC 16, HP 8×level, 2d10+INT bludgeoning, heals you 2d8), Iron (AC 18, HP 10×level, 2d12+INT slashing, immunity to poison/fire), or Fire (AC 15, HP 7×level, 3d8+INT fire, AoE 10ft when hit). Costs 12 Essence. Lasts 1 hour.',
    mechanics: 'Choose golem type. Cost 12 Essence. Duration 1 hour. See description for stats.',
  },

  // === SORCERER ORIGIN TRAITS ===
  'wild-magic-surge': {
    id: 'wild-magic-surge',
    name: 'Wild Magic Surge',
    source: 'Sorcerer - Wild Magic (Level 1)',
    description: 'After you cast a sorcerer spell of 1st level or higher, the DM can have you roll a d20. If you roll a 1, roll on the Wild Magic Surge table to create a random magical effect. Wild magic is chaotic and unpredictable - effects range from helpful to harmful.',
    mechanics: 'After casting a spell (1st level+): DM calls for d20. On a 1, roll d100 on Wild Magic Surge table. See table for 50 random magical effects.',
  },
  'tides-of-chaos': {
    id: 'tides-of-chaos',
    name: 'Tides of Chaos',
    source: 'Sorcerer - Wild Magic (Level 1)',
    description: 'You can manipulate the forces of chance to gain advantage on one attack roll, ability check, or saving throw. Once used, you must finish a long rest before using this feature again. However, any time before you regain this feature, the DM can have you roll on the Wild Magic Surge table immediately after you cast a sorcerer spell of 1st level or higher. You then regain the use of this feature.',
    mechanics: 'Gain advantage on 1 attack/check/save. Recharges on long rest OR when DM triggers a Wild Magic Surge.',
  },
  'dragon-ancestor': {
    id: 'dragon-ancestor',
    name: 'Dragon Ancestor',
    source: 'Sorcerer - Draconic Bloodline (Level 1)',
    description: 'You choose one type of dragon as your ancestor (Black-Acid, Blue-Lightning, Brass-Fire, Bronze-Lightning, Copper-Acid, Gold-Fire, Green-Poison, Red-Fire, Silver-Cold, White-Cold). The damage type associated with your dragon ancestor is used by features you gain later. You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.',
    mechanics: 'Choose dragon type (determines damage type for later features). Gain Draconic language. Double proficiency on CHA checks with dragons.',
  },
  'draconic-resilience': {
    id: 'draconic-resilience',
    name: 'Draconic Resilience',
    source: 'Sorcerer - Draconic Bloodline (Level 1)',
    description: 'As magic flows through your body, it causes physical traits of your dragon ancestor to emerge. At 1st level, your hit point maximum increases by 1 and increases by 1 again whenever you gain a level in this class. Additionally, parts of your skin are covered by a thin sheen of dragon-like scales. When you aren\'t wearing armor, your AC equals 13 + your Dexterity modifier.',
    mechanics: '+1 HP per sorcerer level (total). Unarmored AC = 13 + DEX modifier.',
  },
  'elemental-affinity': {
    id: 'elemental-affinity',
    name: 'Elemental Affinity',
    source: 'Sorcerer - Draconic Bloodline (Level 6)',
    description: 'When you cast a spell that deals damage of the type associated with your draconic ancestry, you can add your Charisma modifier to one damage roll of that spell. At the same time, you can spend 1 sorcery point to gain resistance to that damage type for 1 hour.',
    mechanics: 'Spells matching dragon type: Add CHA modifier to 1 damage roll. Optional: Spend 1 sorcery point for 1 hour resistance to that damage type.',
  },
  'dragon-wings': {
    id: 'dragon-wings',
    name: 'Dragon Wings',
    source: 'Sorcerer - Draconic Bloodline (Level 14)',
    description: 'You gain the ability to sprout a pair of dragon wings from your back, gaining a flying speed equal to your current walking speed. You can create these wings as a bonus action on your turn. They last until you dismiss them as a bonus action on your turn. You can\'t manifest your wings while wearing armor unless the armor is made to accommodate them, and clothing not made to accommodate your wings might be destroyed when you manifest them.',
    mechanics: 'Bonus action: Sprout/dismiss dragon wings. Flying speed = walking speed. Wings incompatible with most armor.',
  },
  'draconic-presence': {
    id: 'draconic-presence',
    name: 'Draconic Presence',
    source: 'Sorcerer - Draconic Bloodline (Level 18)',
    description: 'You can channel the dread presence of your dragon ancestor, causing those around you to become awestruck or frightened. As an action, you can spend 5 sorcery points to draw on this power and exude an aura of awe or fear (your choice) to a distance of 60 feet. For 1 minute or until you lose your concentration, each hostile creature that starts its turn in this aura must succeed on a Wisdom saving throw or be charmed (if you chose awe) or frightened (if you chose fear) until the aura ends. A creature that succeeds on this saving throw is immune to your aura for 24 hours.',
    mechanics: 'Action. Cost: 5 sorcery points. 60 ft aura for 1 minute (concentration). Hostile creatures: WIS save or charmed/frightened until aura ends. Success = immune 24 hours.',
  },
  'lightning-breath': {
    id: 'lightning-breath',
    name: 'Lightning Breath',
    source: 'Dragonborn (Blue/Bronze)',
    description: 'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a Dexterity saving throw. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 lightning damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can\'t use it again until you complete a short or long rest.',
    mechanics: 'Action. 5 by 30 ft. line. DEX save (DC = 8 + CON mod + prof bonus). 2d6 lightning damage (half on success). Damage increases with level. Recharge: Short or long rest.',
  },
  'spellcasting': {
    id: 'spellcasting',
    name: 'Spellcasting',
    source: 'Multiple Classes (Level 1)',
    description: 'You have learned to cast spells. You can prepare and cast spells from your class spell list using your spellcasting ability (Intelligence for Wizards, Wisdom for Clerics and Druids, Charisma for Bards, Sorcerers, and Warlocks). You know cantrips (0-level spells) that can be cast at will without expending spell slots. For leveled spells, you must expend a spell slot of the appropriate level. You regain all expended spell slots when you finish a long rest. See the full spellcasting rules for details on preparing spells, spell attack rolls, spell save DCs, and casting spells at higher levels.',
    mechanics: 'Spell save DC = 8 + proficiency bonus + spellcasting ability modifier. Spell attack bonus = proficiency bonus + spellcasting ability modifier. Cantrips at will. Spell slots regain on long rest.',
  },
  'font-of-magic': {
    id: 'font-of-magic',
    name: 'Font of Magic',
    source: 'Sorcerer (Level 2)',
    description: 'You tap into a deep wellspring of magic within yourself. You have a number of sorcery points equal to your sorcerer level. You can use sorcery points to create spell slots as a bonus action, or convert spell slots into sorcery points as a bonus action. Creating Spell Slots: You can transform sorcery points into one spell slot as a bonus action. The cost is: 1st-level (2 points), 2nd-level (3 points), 3rd-level (5 points), 4th-level (6 points), 5th-level (7 points). Converting Spell Slots: As a bonus action, you can expend one spell slot and gain a number of sorcery points equal to the slot\'s level. You regain all spent sorcery points when you finish a long rest.',
    mechanics: 'Sorcery points = sorcerer level. Bonus action: Convert slots ↔ points. Spell slot cost: 1st=2pts, 2nd=3pts, 3rd=5pts, 4th=6pts, 5th=7pts. Regain all points on long rest.',
  },
  'metamagic': {
    id: 'metamagic',
    name: 'Metamagic',
    source: 'Sorcerer (Level 3)',
    description: 'You gain the ability to twist your spells to suit your needs. You learn two Metamagic options of your choice from the Metamagic Options list. You can use only one Metamagic option on a spell when you cast it, unless otherwise noted. Common Metamagic options include: Careful Spell (spend 1 sorcery point to protect allies from your spell\'s area), Distant Spell (spend 1 point to double spell range), Empowered Spell (spend 1 point to reroll damage dice), Extended Spell (spend 1 point to double duration), Heightened Spell (spend 3 points to give one target disadvantage on first save), Quickened Spell (spend 2 points to cast 1 action spell as bonus action), Subtle Spell (spend 1 point to cast without verbal/somatic components), and Twinned Spell (spend points equal to spell level to target second creature). You learn one additional Metamagic option at 10th level and another at 17th level.',
    mechanics: 'Learn 2 options at level 3 (+ 1 at 10th, +1 at 17th). Spend sorcery points to modify spells. Only one option per spell (unless specified).',
  },
  // Death Knight Traits
  'runic-power': {
    id: 'runic-power',
    name: 'Runic Power',
    source: 'Death Knight (Level 1)',
    description: 'You channel dark runic energy to fuel your abilities. You have a pool of Runic Power equal to 4 at 1st level, which increases to 4 + your Death Knight level starting at 2nd level. You regain half your maximum Runic Power (rounded down) when you finish a short rest, and all of it when you finish a long rest. Additionally, whenever you score a critical hit with a weapon attack, you regenerate 1 Runic Power.',
    mechanics: 'Pool = 4 at level 1, then 4 + level at level 2+. Regain half on short rest, all on long rest. +1 on critical hit.',
  },
  'rune-weapon': {
    id: 'rune-weapon',
    name: 'Rune Weapon',
    source: 'Death Knight (Level 1)',
    description: 'As a bonus action, you can spend 1 Runic Power to infuse your weapon with dark runes. For 1 minute, your weapon attacks deal an additional 1d4 necrotic damage. The necrotic damage increases to 1d6 at 5th level, 1d8 at 11th level, and 1d10 at 17th level.',
    mechanics: 'Bonus action. Cost: 1 Runic Power. Duration: 1 minute. +1d4 necrotic (scales with level).',
  },
  'death-grip': {
    id: 'death-grip',
    name: 'Death Grip',
    source: 'Death Knight (Level 2)',
    description: 'As an action, you can spend 2 Runic Power to pull a creature toward you with dark magic. Choose one Large or smaller creature you can see within 20 feet. The target must succeed on a Strength saving throw (DC = 8 + your proficiency bonus + your Constitution modifier) or be pulled up to 20 feet straight toward you, and its speed is reduced to 0 until the end of your next turn.',
    mechanics: 'Action. Cost: 2 Runic Power. Range: 20 ft. STR save or pulled and speed 0.',
  },
  'lichborne': {
    id: 'lichborne',
    name: 'Lichborne',
    source: 'Death Knight (Level 7)',
    description: 'You have embraced your undead nature. You are immune to being charmed or frightened. Additionally, you have advantage on saving throws against disease and poison, and you have resistance to poison damage.',
    mechanics: 'Immune to charmed and frightened. Advantage on disease/poison saves. Resistance to poison damage.',
  },
  // Dwarf Racial Traits
  'dwarven-toughness': {
    id: 'dwarven-toughness',
    name: 'Dwarven Toughness',
    source: 'Dwarf (Hill Dwarf)',
    description: 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level. This represents the remarkable resilience and endurance of hill dwarves, who are renowned for their ability to withstand hardship and injury. This trait is always active and cannot be turned off.',
    mechanics: 'Permanent +1 HP per character level (including 1st level).',
  },
  'dwarven-armor-training': {
    id: 'dwarven-armor-training',
    name: 'Dwarven Armor Training',
    source: 'Dwarf (Mountain Dwarf)',
    description: 'You have proficiency with light and medium armor. Mountain dwarves are trained from a young age in the use of armor, preparing them for the harsh and dangerous environments of their mountain homes. This proficiency allows you to wear these armor types without penalty and benefit from their full AC bonus.',
    mechanics: 'Gain proficiency with light armor and medium armor.',
  },
  // Rogue High-Level Features
  'reliable-talent': {
    id: 'reliable-talent',
    name: 'Reliable Talent',
    source: 'Rogue (Level 11)',
    description: 'By 11th level, you have refined your chosen skills until they approach perfection. Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10. This means that with a minimum roll of 10, plus your proficiency bonus and ability modifier, you will rarely fail at tasks you are skilled in. This feature only applies to skills and tools you are proficient in, not to saving throws or attack rolls.',
    mechanics: 'For any proficient ability check, treat rolls of 1-9 as 10. Minimum roll = 10 + proficiency + ability modifier.',
  },
  'blindsense': {
    id: 'blindsense',
    name: 'Blindsense',
    source: 'Rogue (Level 14)',
    description: 'Starting at 14th level, if you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you. This heightened awareness allows you to detect creatures even when they are concealed from sight. You still cannot see the creature (so you still have disadvantage on attack rolls against them), but you know exactly where they are, preventing them from hiding from you. This ability does not work if you are deafened.',
    mechanics: 'While you can hear, detect all hidden/invisible creatures within 10 ft. Does not negate invisibility attack penalties.',
  },
  'slippery-mind': {
    id: 'slippery-mind',
    name: 'Slippery Mind',
    source: 'Rogue (Level 15)',
    description: 'By 15th level, you have acquired greater mental strength. You gain proficiency in Wisdom saving throws. This represents your ability to resist mental manipulation, charms, fear effects, and other attacks that target your willpower. If you already have proficiency in Wisdom saves (such as from multiclassing), you instead gain proficiency in Intelligence or Charisma saves (your choice).',
    mechanics: 'Gain proficiency in Wisdom saving throws.',
  },
  'elusive': {
    id: 'elusive',
    name: 'Elusive',
    source: 'Rogue (Level 18)',
    description: 'Beginning at 18th level, you are so evasive that attackers rarely gain the upper hand against you. No attack roll has advantage against you while you aren\'t incapacitated. This means that even if an attacker would normally have advantage (such as from being hidden, flanking, or using the Help action), they roll normally instead. This is an incredibly powerful defensive ability that makes you extremely difficult to hit.',
    mechanics: 'No attack roll can have advantage against you (unless you are incapacitated).',
  },
  'stroke-of-luck': {
    id: 'stroke-of-luck',
    name: 'Stroke of Luck',
    source: 'Rogue (Level 20)',
    description: 'At 20th level, you have an uncanny knack for succeeding when you need to. If your attack misses a target within range, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20. Once you use this feature, you can\'t use it again until you finish a short or long rest. This capstone ability can turn a critical failure into a guaranteed success, making it invaluable in clutch moments.',
    mechanics: 'Once per short rest: Turn a missed attack into a hit, OR treat a failed ability check as a natural 20.',
  },
  // Thief Subclass Features
  'fast-hands': {
    id: 'fast-hands',
    name: 'Fast Hands',
    source: 'Rogue - Thief (Level 3)',
    description: 'Starting at 3rd level, you can use the bonus action granted by your Cunning Action to make a Dexterity (Sleight of Hand) check, use your thieves\' tools to disarm a trap or open a lock, or take the Use an Object action. This makes you incredibly versatile in and out of combat, allowing you to pick pockets, disarm traps, unlock doors, drink potions, activate magic items, and more as a bonus action.',
    mechanics: 'Cunning Action bonus action can also be used for: Sleight of Hand check, use thieves\' tools, or Use an Object action.',
  },
  'second-story-work': {
    id: 'second-story-work',
    name: 'Second-Story Work',
    source: 'Rogue - Thief (Level 3)',
    description: 'When you choose this archetype at 3rd level, you gain the ability to climb faster than normal; climbing no longer costs you extra movement. In addition, when you make a running jump, the distance you cover increases by a number of feet equal to your Dexterity modifier. This makes you an exceptional acrobat and second-story burglar, able to scale buildings and leap across rooftops with ease.',
    mechanics: 'Climbing costs no extra movement. Running jump distance increases by DEX modifier (in feet).',
  },
  'supreme-sneak': {
    id: 'supreme-sneak',
    name: 'Supreme Sneak',
    source: 'Rogue - Thief (Level 9)',
    description: 'Starting at 9th level, you have advantage on a Dexterity (Stealth) check if you move no more than half your speed on the same turn. This allows you to move stealthily while still covering ground, making you nearly impossible to detect when you take your time. Moving at half speed or less grants you advantage on all Stealth checks made during that turn.',
    mechanics: 'If you move ≤ half your speed on a turn, gain advantage on all Stealth checks that turn.',
  },
  'use-magic-device': {
    id: 'use-magic-device',
    name: 'Use Magic Device',
    source: 'Rogue - Thief (Level 13)',
    description: 'By 13th level, you have learned enough about the workings of magic that you can improvise the use of items even when they are not intended for you. You ignore all class, race, and level requirements on the use of magic items. This means you can attune to and use items that would normally be restricted to other classes (such as a wizard\'s staff, a cleric\'s holy symbol, or a paladin\'s magic armor).',
    mechanics: 'Ignore all class, race, and level requirements when using magic items.',
  },
  'thiefs-reflexes': {
    id: 'thiefs-reflexes',
    name: 'Thief\'s Reflexes',
    source: 'Rogue - Thief (Level 17)',
    description: 'When you reach 17th level, you have become adept at laying ambushes and quickly escaping danger. You can take two turns during the first round of any combat. You take your first turn at your normal initiative and your second turn at your initiative minus 10. In both turns, you can use all of your actions, bonus actions, and movement. This effectively lets you act twice before most enemies can react.',
    mechanics: 'In the first round of combat: Take two turns (one at normal initiative, one at initiative - 10).',
  },
  // Assassin Subclass Features
  'assassinate': {
    id: 'assassinate',
    name: 'Assassinate',
    source: 'Rogue - Assassin (Level 3)',
    description: 'Starting at 3rd level, you are at your deadliest when you get the drop on your enemies. You have advantage on attack rolls against any creature that hasn\'t taken a turn in the combat yet. In addition, any hit you score against a creature that is surprised is a critical hit. This makes you incredibly lethal in the opening moments of combat, especially when combined with your Sneak Attack damage.',
    mechanics: 'Advantage on attacks vs creatures that haven\'t acted yet. Automatic critical hit vs surprised creatures.',
  },
  'infiltration-expertise': {
    id: 'infiltration-expertise',
    name: 'Infiltration Expertise',
    source: 'Rogue - Assassin (Level 9)',
    description: 'Starting at 9th level, you can unfailingly create false identities for yourself. You must spend seven days and 25 gp to establish the history, profession, and affiliations for an identity. You can\'t establish an identity that belongs to someone else. For example, you might acquire appropriate clothing, letters of introduction, and official-looking certification to establish yourself as a member of a trading house from a remote city. Thereafter, other creatures believe you to be that person until given an obvious reason not to.',
    mechanics: 'Spend 7 days + 25 gp to create a believable false identity (documentation, backstory, profession).',
  },
  'impostor': {
    id: 'impostor',
    name: 'Impostor',
    source: 'Rogue - Assassin (Level 13)',
    description: 'At 13th level, you gain the ability to unerringly mimic another person\'s speech, writing, and behavior. You must spend at least three hours studying these three components of the person\'s behavior, listening to speech, examining handwriting, and observing mannerisms. Your ruse is indiscernible to the casual observer. If a wary creature suspects something is amiss, you have advantage on any Charisma (Deception) check you make to avoid detection.',
    mechanics: 'After 3 hours of study, perfectly mimic a person\'s speech, writing, and mannerisms. Advantage on Deception to maintain disguise.',
  },
  'death-strike': {
    id: 'death-strike',
    name: 'Death Strike',
    source: 'Rogue - Assassin (Level 17)',
    description: 'Starting at 17th level, you become a master of instant death. When you attack and hit a creature that is surprised, it must make a Constitution saving throw (DC 8 + your Dexterity modifier + your proficiency bonus). On a failed save, double the damage of your attack against the creature. Combined with Assassinate\'s automatic critical hit and your Sneak Attack damage, this can result in devastating opening strikes that can drop even tough enemies instantly.',
    mechanics: 'When you hit a surprised creature: Target makes CON save (DC 8 + DEX mod + prof). On fail, double all damage from the attack.',
  },
  // Fighter Additional Features
  'extra-attack-2': {
    id: 'extra-attack-2',
    name: 'Extra Attack (2)',
    source: 'Fighter (Level 11)',
    description: 'Beginning at 11th level, you can attack three times whenever you take the Attack action on your turn. This represents your mastery of combat techniques and ability to strike multiple foes or overwhelm a single target with a flurry of attacks.',
    mechanics: 'Make 3 attacks when you take the Attack action.',
  },
  'extra-attack-3': {
    id: 'extra-attack-3',
    name: 'Extra Attack (3)',
    source: 'Fighter (Level 20)',
    description: 'At 20th level, you can attack four times whenever you take the Attack action on your turn. You have become a legendary warrior capable of striking down multiple enemies in seconds.',
    mechanics: 'Make 4 attacks when you take the Attack action.',
  },
  // Barbarian Features
  'rage': {
    id: 'rage',
    name: 'Rage',
    source: 'Barbarian (Level 1)',
    description: 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits if you aren\'t wearing heavy armor: You have advantage on Strength checks and Strength saving throws. When you make a melee weapon attack using Strength, you gain a bonus to the damage roll. You have resistance to bludgeoning, piercing, and slashing damage. Your rage lasts for 1 minute (10 rounds) and ends early if you are knocked unconscious or if your turn ends and you haven\'t attacked a hostile creature since your last turn or taken damage since then.',
    mechanics: 'Bonus action to rage. While raging: advantage on STR checks/saves, bonus damage on STR melee attacks, resistance to physical damage. Lasts 1 minute.',
  },
  'unarmored-defense': {
    id: 'unarmored-defense',
    name: 'Unarmored Defense',
    source: 'Barbarian (Level 1)',
    description: 'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit. This represents your primal toughness and ability to avoid blows through instinct and natural resilience.',
    mechanics: 'AC = 10 + DEX mod + CON mod (no armor). Can use shield.',
  },
  'reckless-attack': {
    id: 'reckless-attack',
    name: 'Reckless Attack',
    source: 'Barbarian (Level 2)',
    description: 'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.',
    mechanics: 'When making first attack: Gain advantage on STR melee attacks this turn, but enemies have advantage on attacks against you until your next turn.',
  },
  'danger-sense': {
    id: 'danger-sense',
    name: 'Danger Sense',
    source: 'Barbarian (Level 2)',
    description: 'At 2nd level, you gain an uncanny sense of when things nearby aren\'t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can\'t be blinded, deafened, or incapacitated.',
    mechanics: 'Advantage on DEX saves against visible effects (traps, spells) while not blinded/deafened/incapacitated.',
  },
  'fast-movement': {
    id: 'fast-movement',
    name: 'Fast Movement',
    source: 'Barbarian (Level 5)',
    description: 'Starting at 5th level, your speed increases by 10 feet while you aren\'t wearing heavy armor. This represents your primal athleticism and ability to close distances quickly in combat.',
    mechanics: '+10 ft speed while not wearing heavy armor.',
  },
  'feral-instinct': {
    id: 'feral-instinct',
    name: 'Feral Instinct',
    source: 'Barbarian (Level 7)',
    description: 'By 7th level, your instincts are so honed that you have advantage on initiative rolls. Additionally, if you are surprised at the beginning of combat and aren\'t incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.',
    mechanics: 'Advantage on initiative. If surprised, can act normally if you rage first.',
  },
  'brutal-critical': {
    id: 'brutal-critical',
    name: 'Brutal Critical',
    source: 'Barbarian (Level 9)',
    description: 'Beginning at 9th level, you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack. This increases to two additional dice at 13th level and three additional dice at 17th level.',
    mechanics: 'On critical hit with melee weapon: Roll +1 weapon damage die (becomes +2 at 13th, +3 at 17th).',
  },
  'relentless-rage': {
    id: 'relentless-rage',
    name: 'Relentless Rage',
    source: 'Barbarian (Level 11)',
    description: 'Starting at 11th level, your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you\'re raging and don\'t die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead. Each time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10.',
    mechanics: 'When raging and reduced to 0 HP: DC 10 CON save to stay at 1 HP instead (DC +5 each use, resets on rest).',
  },
  'persistent-rage': {
    id: 'persistent-rage',
    name: 'Persistent Rage',
    source: 'Barbarian (Level 15)',
    description: 'Beginning at 15th level, your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it. This means your rage continues even if you don\'t attack or take damage, allowing you to maintain your rage benefits throughout extended combats.',
    mechanics: 'Rage only ends if you fall unconscious or choose to end it (no longer ends from not attacking/taking damage).',
  },
  'indomitable-might': {
    id: 'indomitable-might',
    name: 'Indomitable Might',
    source: 'Barbarian (Level 18)',
    description: 'Beginning at 18th level, if your total for a Strength check is less than your Strength score, you can use that score in place of the total. This represents your legendary physical prowess - you simply cannot fail at feats of strength that others would find challenging.',
    mechanics: 'If STR check total < your STR score, use your STR score as the result instead.',
  },
  'primal-champion': {
    id: 'primal-champion',
    name: 'Primal Champion',
    source: 'Barbarian (Level 20)',
    description: 'At 20th level, you embody the power of the wilds. Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24. This represents the pinnacle of physical perfection for a mortal warrior.',
    mechanics: 'STR and CON increase by 4. Maximum for both becomes 24.',
  },
  // Monk Features
  'martial-arts': {
    id: 'martial-arts',
    name: 'Martial Arts',
    source: 'Monk (Level 1)',
    description: 'Your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons (shortswords and simple melee weapons without the two-handed or heavy property). You gain the following benefits: (1) You can use DEX instead of STR for attack/damage rolls with unarmed strikes and monk weapons. (2) You can roll a d4 in place of normal damage for unarmed strikes and monk weapons (this die scales at higher levels). (3) When you use the Attack action with an unarmed strike or monk weapon, you can make one unarmed strike as a bonus action.',
    mechanics: 'Use DEX for monk weapons/unarmed. Unarmed/monk weapons deal 1d4+ (scales). Bonus action unarmed strike after Attack action.',
  },
  'ki': {
    id: 'ki',
    name: 'Ki',
    source: 'Monk (Level 2)',
    description: 'Your training allows you to harness the mystic energy of ki. You have a number of ki points equal to your monk level, which you can spend to fuel various ki features. When you spend a ki point, it is unavailable until you finish a short or long rest. Key ki features include Flurry of Blows (2 unarmed strikes as bonus action for 1 ki), Patient Defense (Dodge as bonus action for 1 ki), and Step of the Wind (Disengage or Dash as bonus action plus doubled jump distance for 1 ki).',
    mechanics: 'Ki points = Monk level. Spend ki for: Flurry of Blows (1 ki), Patient Defense (1 ki), Step of the Wind (1 ki). Recharges on short/long rest.',
  },
  'unarmored-movement': {
    id: 'unarmored-movement',
    name: 'Unarmored Movement',
    source: 'Monk (Level 2)',
    description: 'Your speed increases by 10 feet while you are not wearing armor or wielding a shield. This bonus increases as you gain monk levels: +15 ft at 6th, +20 ft at 10th, +25 ft at 14th, and +30 ft at 18th level. At 9th level, you gain the ability to move along vertical surfaces and across liquids on your turn without falling during the move.',
    mechanics: '+10 ft speed without armor/shield (scales to +30 ft at 18th). At 9th: walk on walls and water.',
  },
  'deflect-missiles': {
    id: 'deflect-missiles',
    name: 'Deflect Missiles',
    source: 'Monk (Level 3)',
    description: 'You can use your reaction to deflect or catch a missile when you are hit by a ranged weapon attack. When you do so, the damage you take from the attack is reduced by 1d10 + your Dexterity modifier + your monk level. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in one hand and you have at least one hand free. If you catch a missile in this way, you can spend 1 ki point to make a ranged attack with the weapon or piece of ammunition you just caught, as part of the same reaction.',
    mechanics: 'Reaction when hit by ranged attack: Reduce damage by 1d10 + DEX mod + Monk level. If reduced to 0, catch and throw back for 1 ki.',
  },
  'slow-fall': {
    id: 'slow-fall',
    name: 'Slow Fall',
    source: 'Monk (Level 4)',
    description: 'You can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level. This represents your ability to use ki energy and agility to slow your descent and land safely.',
    mechanics: 'Reaction when falling: Reduce fall damage by 5 × Monk level.',
  },
  'stunning-strike': {
    id: 'stunning-strike',
    name: 'Stunning Strike',
    source: 'Monk (Level 5)',
    description: 'You can interfere with the flow of ki in an opponent\'s body. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike. The target must succeed on a Constitution saving throw (DC = 8 + your proficiency bonus + your Wisdom modifier) or be stunned until the end of your next turn. This is one of the monk\'s most powerful combat abilities.',
    mechanics: 'After hitting with melee attack: Spend 1 ki. Target makes CON save (DC 8 + prof + WIS) or stunned until end of your next turn.',
  },
  'ki-empowered-strikes': {
    id: 'ki-empowered-strikes',
    name: 'Ki-Empowered Strikes',
    source: 'Monk (Level 6)',
    description: 'Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. This represents the ki energy infusing your strikes, allowing you to harm creatures that would otherwise shrug off mundane attacks.',
    mechanics: 'Unarmed strikes count as magical for overcoming resistance/immunity.',
  },
  'stillness-of-mind': {
    id: 'stillness-of-mind',
    name: 'Stillness of Mind',
    source: 'Monk (Level 7)',
    description: 'You can use your action to end one effect on yourself that is causing you to be charmed or frightened. Through mental discipline and control of ki, you can shake off mental compulsions that would control or terrify others.',
    mechanics: 'Action: End one charmed or frightened effect on yourself.',
  },
  'purity-of-body': {
    id: 'purity-of-body',
    name: 'Purity of Body',
    source: 'Monk (Level 10)',
    description: 'Your mastery of ki flowing through you makes you immune to disease and poison. Your body has become purified through discipline, rejecting all toxins and illnesses.',
    mechanics: 'Immune to disease and poison.',
  },
  'tongue-of-sun-and-moon': {
    id: 'tongue-of-sun-and-moon',
    name: 'Tongue of the Sun and Moon',
    source: 'Monk (Level 13)',
    description: 'You learn to touch the ki of other minds so that you understand all spoken languages. Moreover, any creature that can understand a language can understand what you say. This is a supernatural ability that transcends normal linguistic barriers.',
    mechanics: 'Understand all spoken languages. All creatures that understand any language can understand you.',
  },
  'diamond-soul': {
    id: 'diamond-soul',
    name: 'Diamond Soul',
    source: 'Monk (Level 14)',
    description: 'Your mastery of ki grants you proficiency in all saving throws. Additionally, whenever you make a saving throw and fail, you can spend 1 ki point to reroll it and take the second result. Your spirit has become as hard as diamond, resilient against all threats.',
    mechanics: 'Proficiency in all saves. When you fail a save, spend 1 ki to reroll (take second result).',
  },
  'timeless-body': {
    id: 'timeless-body',
    name: 'Timeless Body',
    source: 'Monk (Level 15)',
    description: 'Your ki sustains you so that you suffer none of the frailty of old age, and you can\'t be aged magically. You can still die of old age, however. Additionally, you no longer need food or water.',
    mechanics: 'No aging penalties. Can\'t be aged magically. No need for food or water.',
  },
  'empty-body': {
    id: 'empty-body',
    name: 'Empty Body',
    source: 'Monk (Level 18)',
    description: 'You can use your action to spend 4 ki points to become invisible for 1 minute. During that time, you also have resistance to all damage but force damage. Additionally, you can spend 8 ki points to cast the Astral Projection spell, without needing material components. When you do so, you can\'t take any other creatures with you.',
    mechanics: 'Action + 4 ki: Invisible for 1 minute + resistance to all damage except force. OR 8 ki: Cast Astral Projection (self only).',
  },
  'perfect-self': {
    id: 'perfect-self',
    name: 'Perfect Self',
    source: 'Monk (Level 20)',
    description: 'When you roll for initiative and have no ki points remaining, you regain 4 ki points. You have achieved the pinnacle of monastic training, your body and spirit perfectly aligned.',
    mechanics: 'At start of combat with 0 ki: Regain 4 ki points.',
  },
  // Paladin Additional Features
  'aura-of-protection': {
    id: 'aura-of-protection',
    name: 'Aura of Protection',
    source: 'Paladin (Level 6)',
    description: 'Whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Charisma modifier (with a minimum bonus of +1). You must be conscious to grant this bonus. At 18th level, the range of this aura increases to 30 feet.',
    mechanics: 'You and allies within 10 ft (30 ft at 18th): +CHA mod to all saves (min +1). Must be conscious.',
  },
  'aura-of-courage': {
    id: 'aura-of-courage',
    name: 'Aura of Courage',
    source: 'Paladin (Level 10)',
    description: 'You and friendly creatures within 10 feet of you can\'t be frightened while you are conscious. At 18th level, the range of this aura increases to 30 feet.',
    mechanics: 'You and allies within 10 ft (30 ft at 18th): Immune to frightened while you\'re conscious.',
  },
  'improved-divine-smite': {
    id: 'improved-divine-smite',
    name: 'Improved Divine Smite',
    source: 'Paladin (Level 11)',
    description: 'By 11th level, you are so suffused with righteous might that all your melee weapon strikes carry divine power with them. Whenever you hit a creature with a melee weapon, the creature takes an extra 1d8 radiant damage. This bonus damage is in addition to any damage from Divine Smite.',
    mechanics: 'All melee weapon hits deal +1d8 radiant damage (automatic, no resource cost).',
  },
  'cleansing-touch': {
    id: 'cleansing-touch',
    name: 'Cleansing Touch',
    source: 'Paladin (Level 14)',
    description: 'Beginning at 14th level, you can use your action to end one spell on yourself or on one willing creature that you touch. You can use this feature a number of times equal to your Charisma modifier (minimum of once). You regain expended uses when you finish a long rest.',
    mechanics: 'Action: End one spell on self or touched willing creature. Uses = CHA mod (min 1). Recharges on long rest.',
  },
  // Orc Racial Traits
  'aggressive': {
    id: 'aggressive',
    name: 'Aggressive',
    source: 'Orc',
    description: 'As a bonus action, you can move up to your speed toward an enemy you can see or hear. You must end this move closer to the enemy than you started. This represents the orc\'s fearless charge into battle.',
    mechanics: 'Bonus action: Move up to your speed toward an enemy (must end closer).',
  },
  'primal-intuition': {
    id: 'primal-intuition',
    name: 'Primal Intuition',
    source: 'Orc',
    description: 'You have proficiency in two of the following skills of your choice: Animal Handling, Insight, Intimidation, Medicine, Nature, Perception, and Survival. Your connection to primal instincts gives you keen awareness.',
    mechanics: 'Gain proficiency in 2 skills from: Animal Handling, Insight, Intimidation, Medicine, Nature, Perception, Survival.',
  },
  // Goblin Racial Traits
  'fury-of-the-small': {
    id: 'fury-of-the-small',
    name: 'Fury of the Small',
    source: 'Goblin',
    description: 'When you damage a creature with an attack or a spell and the creature\'s size is larger than yours, you can cause the attack or spell to deal extra damage to the creature. The extra damage equals your level. Once you use this trait, you can\'t use it again until you finish a short or long rest.',
    mechanics: 'When damaging larger creature: Deal extra damage = your level. Recharges on short/long rest.',
  },
  'nimble-escape': {
    id: 'nimble-escape',
    name: 'Nimble Escape',
    source: 'Goblin',
    description: 'You can take the Disengage or Hide action as a bonus action on each of your turns. This represents the goblin\'s natural agility and ability to slip away from danger.',
    mechanics: 'Bonus action: Disengage or Hide.',
  },
  // Half-Orc Racial Trait
  'menacing': {
    id: 'menacing',
    name: 'Menacing',
    source: 'Half-Orc',
    description: 'You gain proficiency in the Intimidation skill. Your imposing presence and orcish heritage make you naturally intimidating.',
    mechanics: 'Gain Intimidation proficiency.',
  },
  // Elf Subrace Traits
  'cantrip': {
    id: 'cantrip',
    name: 'Cantrip',
    source: 'High Elf',
    description: 'You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it. High elves have a natural affinity for magic.',
    mechanics: 'Learn 1 wizard cantrip. INT is spellcasting ability.',
  },
  'extra-language': {
    id: 'extra-language',
    name: 'Extra Language',
    source: 'High Elf',
    description: 'You can speak, read, and write one extra language of your choice. High elves are often scholars and diplomats who learn many tongues.',
    mechanics: 'Learn 1 additional language of your choice.',
  },
  'fleet-of-foot': {
    id: 'fleet-of-foot',
    name: 'Fleet of Foot',
    source: 'Wood Elf',
    description: 'Your base walking speed increases to 35 feet. Wood elves are swifter than other elves, able to move through forests with supernatural speed.',
    mechanics: 'Base speed = 35 ft.',
  },
  'mask-of-the-wild': {
    id: 'mask-of-the-wild',
    name: 'Mask of the Wild',
    source: 'Wood Elf',
    description: 'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena. Wood elves are masters of camouflage in natural settings.',
    mechanics: 'Can hide when lightly obscured by natural phenomena (foliage, rain, snow, mist).',
  },
  'child-of-the-sea': {
    id: 'child-of-the-sea',
    name: 'Child of the Sea',
    source: 'Sea Elf',
    description: 'You have a swimming speed of 30 feet, and you can breathe air and water. Sea elves are perfectly adapted to aquatic life.',
    mechanics: 'Swim speed 30 ft. Breathe air and water.',
  },
  'friend-of-the-sea': {
    id: 'friend-of-the-sea',
    name: 'Friend of the Sea',
    source: 'Sea Elf',
    description: 'Using gestures and sounds, you can communicate simple ideas with any beast that has an innate swimming speed. Sea elves have a natural bond with aquatic creatures.',
    mechanics: 'Communicate simple ideas with beasts that can swim.',
  },
  'shifting-seasons': {
    id: 'shifting-seasons',
    name: 'Shifting Seasons',
    source: 'Eladrin',
    description: 'Your emotional state influences your appearance. You can choose from four seasons: Autumn (peace and goodwill), Winter (contemplation and sorrow), Spring (cheerfulness and celebration), or Summer (boldness and aggression). You can change your season whenever you finish a long rest.',
    mechanics: 'Choose season: Autumn, Winter, Spring, or Summer. Can change after long rest.',
  },
  'blessing-of-the-raven-queen': {
    id: 'blessing-of-the-raven-queen',
    name: 'Blessing of the Raven Queen',
    source: 'Shadar-kai',
    description: 'As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. Once you use this trait, you can\'t do so again until you finish a long rest. Starting at 3rd level, you also gain resistance to all damage when you teleport. The resistance lasts until the start of your next turn.',
    mechanics: 'Bonus action: Teleport 30 ft. At 3rd level: Gain resistance to all damage until next turn. Recharges on long rest.',
  },
  // Halfling Subrace Traits
  'naturally-stealthy': {
    id: 'naturally-stealthy',
    name: 'Naturally Stealthy',
    source: 'Lightfoot Halfling',
    description: 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you. Lightfoot halflings are exceptionally good at disappearing into crowds.',
    mechanics: 'Can hide behind creatures one size larger.',
  },
  'stout-resilience': {
    id: 'stout-resilience',
    name: 'Stout Resilience',
    source: 'Stout Halfling',
    description: 'You have advantage on saving throws against poison, and you have resistance against poison damage. Stout halflings have dwarven-like hardiness.',
    mechanics: 'Advantage on saves vs poison. Resistance to poison damage.',
  },
  'silent-speech': {
    id: 'silent-speech',
    name: 'Silent Speech',
    source: 'Ghostwise Halfling',
    description: 'You can speak telepathically to any creature within 30 feet of you. The creature understands you only if the two of you share a language. You can speak telepathically in this way to one creature at a time.',
    mechanics: 'Telepathic communication within 30 ft (must share a language).',
  },
  // Gnome Subrace Traits
  'natural-illusionist': {
    id: 'natural-illusionist',
    name: 'Natural Illusionist',
    source: 'Forest Gnome',
    description: 'You know the Minor Illusion cantrip. Intelligence is your spellcasting ability for it. Forest gnomes have an innate talent for illusion magic.',
    mechanics: 'Know Minor Illusion cantrip. INT is spellcasting ability.',
  },
  'speak-with-small-beasts': {
    id: 'speak-with-small-beasts',
    name: 'Speak with Small Beasts',
    source: 'Forest Gnome',
    description: 'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often learn their ways.',
    mechanics: 'Communicate simple ideas with Small or smaller beasts.',
  },
  'artificers-lore': {
    id: 'artificers-lore',
    name: 'Artificer\'s Lore',
    source: 'Rock Gnome',
    description: 'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.',
    mechanics: 'Double proficiency on History checks for magic items, alchemy, or technology.',
  },
  'tinker': {
    id: 'tinker',
    name: 'Tinker',
    source: 'Rock Gnome',
    description: 'You have proficiency with artisan\'s tools (tinker\'s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device works for 24 hours. You can have up to three such devices active at a time. When you create a device, choose: Clockwork Toy, Fire Starter, or Music Box.',
    mechanics: 'Proficiency with tinker\'s tools. Create clockwork devices (Toy, Fire Starter, Music Box).',
  },
  'stone-camouflage': {
    id: 'stone-camouflage',
    name: 'Stone Camouflage',
    source: 'Deep Gnome (Svirfneblin)',
    description: 'You have advantage on Dexterity (Stealth) checks to hide in rocky terrain. Deep gnomes blend seamlessly into underground stone environments.',
    mechanics: 'Advantage on Stealth checks in rocky terrain.',
  },
  'svirfneblin-magic': {
    id: 'svirfneblin-magic',
    name: 'Svirfneblin Magic',
    source: 'Deep Gnome (Svirfneblin)',
    description: 'You can cast the Nondetection spell on yourself at will, without needing a material component. Deep gnomes use this magic to remain hidden from divination.',
    mechanics: 'Cast Nondetection on self at will (no material component).',
  },
  // Tiefling Subrace Traits
  'legacy-of-avernus': {
    id: 'legacy-of-avernus',
    name: 'Legacy of Avernus',
    source: 'Zariel Tiefling',
    description: 'You know the Thaumaturgy cantrip. When you reach 3rd level, you can cast the Searing Smite spell once per long rest as a 2nd-level spell. When you reach 5th level, you can cast the Branding Smite spell once per long rest. Charisma is your spellcasting ability for these spells.',
    mechanics: 'Thaumaturgy cantrip. At 3rd: Searing Smite (1/long rest). At 5th: Branding Smite (1/long rest). CHA spellcasting.',
  },
  'legacy-of-stygia': {
    id: 'legacy-of-stygia',
    name: 'Legacy of Stygia',
    source: 'Levistus Tiefling',
    description: 'You know the Ray of Frost cantrip. When you reach 3rd level, you can cast the Armor of Agathys spell once per long rest as a 2nd-level spell. When you reach 5th level, you can cast the Darkness spell once per long rest. Charisma is your spellcasting ability for these spells.',
    mechanics: 'Ray of Frost cantrip. At 3rd: Armor of Agathys (1/long rest). At 5th: Darkness (1/long rest). CHA spellcasting.',
  },
  // Shadar-kai Traits
  'necrotic-resistance': {
    id: 'necrotic-resistance',
    name: 'Necrotic Resistance',
    source: 'Shadar-kai (Elf subrace)',
    description: 'You have resistance to necrotic damage, a reflection of the lingering shadow magic that permeates Shadar-kai after years living in the Shadowfell. This resistance makes you hardier against the energy of death and undeath.',
    mechanics: 'Resistance to necrotic damage (half damage from necrotic sources).',
  },
  // Aasimar Traits
  'light-bearer': {
    id: 'light-bearer',
    name: 'Light Bearer',
    source: 'Aasimar',
    description: 'You know the Light cantrip. Charisma is your spellcasting ability for it. This celestial magic reflects the divine spark within you, allowing you to create light at will as a manifestation of your heavenly heritage.',
    mechanics: 'Know Light cantrip. CHA is spellcasting ability.',
  },
  // Aasimar Subrace Traits
  'radiant-soul': {
    id: 'radiant-soul',
    name: 'Radiant Soul',
    source: 'Protector Aasimar',
    description: 'As an action, you can unleash the divine energy within yourself, causing your eyes to glimmer and two luminous wings to sprout from your back. Your transformation lasts for 1 minute or until you end it as a bonus action. During it, you have a flying speed of 30 feet, and once on each of your turns, you can deal extra radiant damage equal to your proficiency bonus when you deal damage with an attack or a spell. Once you use this trait, you can\'t use it again until you finish a long rest.',
    mechanics: 'Action: 1 min transformation. Fly 30 ft. Add prof bonus as radiant damage once per turn. 1/long rest.',
  },
  'necrotic-shroud': {
    id: 'necrotic-shroud',
    name: 'Necrotic Shroud',
    source: 'Fallen Aasimar',
    description: 'As an action, you can unleash the divine energy within yourself, causing your eyes to turn into pools of darkness and two skeletal, ghostly, flightless wings to sprout from your back. The transformation lasts 1 minute or until you end it as a bonus action. It causes creatures other than your allies within 10 feet of you to make a Charisma saving throw (DC = 8 + proficiency bonus + Charisma modifier). On a failed save, they become frightened until the end of your next turn. Once on each of your turns you can deal extra necrotic damage equal to your proficiency bonus when you deal damage. Once you use this trait, you can\'t use it again until you finish a long rest.',
    mechanics: 'Action: 1 min transformation. 10 ft CHA save or frightened. Add prof bonus as necrotic damage once per turn. 1/long rest.',
  },
  'radiant-consumption': {
    id: 'radiant-consumption',
    name: 'Radiant Consumption',
    source: 'Scourge Aasimar',
    description: 'As an action, you can unleash the divine energy within yourself, causing a searing light to radiate from you, pour out of your eyes and mouth, and threaten to char you. Your transformation lasts 1 minute or until you end it as a bonus action. During it, you shed bright light in a 10-foot radius and dim light for an additional 10 feet, and at the end of each of your turns, you and each creature within 10 feet of you take radiant damage equal to half your level (rounded up). In addition, once on each of your turns, you can deal extra radiant damage equal to your proficiency bonus when you deal damage. Once you use this trait, you can\'t use it again until you finish a long rest.',
    mechanics: 'Action: 1 min transformation. 10 ft bright light. End of turn: half level radiant to you and nearby. Add prof bonus as radiant damage once per turn. 1/long rest.',
  },

  // ============================================
  // ============================================
  // ADDITIONAL CLASS AND SUBCLASS TRAITS
  // ============================================

  // ============================================
  // AMAZON CLASS TRAITS
  // ============================================
  'amazon': {
    id: 'amazon',
    name: 'Amazon',
    source: 'Amazon (Class)',
    description: 'A warrior from the Skovos Isles, master of javelin, bow, and spear combat with elemental magic.',
    mechanics: 'A warrior from the Skovos Isles, master of javelin, bow, and spear combat with elemental magic.',
  },
  'archery': {
    id: 'archery',
    name: 'Archery',
    source: 'Amazon (Level 1)',
    description: '+2 bonus to ranged attack rolls.',
    mechanics: '+2 bonus to ranged attack rolls.',
  },
  'critical-strike': {
    id: 'critical-strike',
    name: 'Critical Strike',
    source: 'Amazon (Level 1)',
    description: 'Once per short rest: gain advantage on next attack roll.',
    mechanics: 'Recharge: short/long rest. Grants advantage.',
  },
  'inner-sight': {
    id: 'inner-sight',
    name: 'Inner Sight',
    source: 'Amazon (Level 1)',
    description: 'Bonus action: target cannot benefit from invisible/hidden against you for 1 minute. Once per short rest.',
    mechanics: 'Bonus action. Recharge: short/long rest.',
  },
  'spear-fighting': {
    id: 'spear-fighting',
    name: 'Spear Fighting',
    source: 'Amazon (Level 1)',
    description: '+1 attack and damage with spear/javelin + shield.',
    mechanics: '+1 attack and damage with spear/javelin + shield.',
  },
  'thrown-weapon-fighting': {
    id: 'thrown-weapon-fighting',
    name: 'Thrown Weapon Fighting',
    source: 'Amazon (Level 1)',
    description: '+2 damage with thrown weapons, draw as part of attack.',
    mechanics: '+2 damage with thrown weapons, draw as part of attack.',
  },
  'dodge-reaction': {
    id: 'dodge-reaction',
    name: 'Dodge',
    source: 'Amazon (Level 2)',
    description: 'Reaction: impose disadvantage on attack against you.',
    mechanics: 'Reaction. Grants advantage. Impose disadvantage.',
  },
  'extra-attack-amazon': {
    id: 'extra-attack-amazon',
    name: 'Extra Attack',
    source: 'Amazon (Level 5)',
    description: 'Attack twice when you take the Attack action.',
    mechanics: 'Action.',
  },
  'avoid': {
    id: 'avoid',
    name: 'Avoid',
    source: 'Amazon (Level 7)',
    description: 'Advantage on DEX saves.',
    mechanics: 'Grants advantage.',
  },
  'summon-valkyrie': {
    id: 'summon-valkyrie',
    name: 'Summon Valkyrie',
    source: 'Amazon (Level 11)',
    description: 'Summon Valkyrie (AC 16, HP = 2x level + 10) for 1 minute.',
    mechanics: 'Summon Valkyrie (AC 16, HP = 2x level + 10) for 1 minute.',
  },

  // ============================================
  // ASSASSIN CLASS TRAITS
  // ============================================
  'assassin': {
    id: 'assassin',
    name: 'Assassin',
    source: 'Assassin (Subclass)',
    description: 'You focus your training on the grim art of death. You are an expert in disguise and deception, as well as sudden, lethal strikes.',
    mechanics: 'You focus your training on the grim art of death.',
  },

  // ============================================
  // BARBARIAN CLASS TRAITS
  // ============================================
  'barbarian': {
    id: 'barbarian',
    name: 'Barbarian',
    source: 'Barbarian (Class)',
    description: 'A fierce warrior who can enter a battle rage.',
    mechanics: 'A fierce warrior who can enter a battle rage.',
  },

  // ============================================
  // BARD CLASS TRAITS
  // ============================================
  'bard': {
    id: 'bard',
    name: 'Bard',
    source: 'Bard (Class)',
    description: 'An inspiring magician whose power echoes the music of creation.',
    mechanics: 'An inspiring magician whose power echoes the music of creation.',
  },
  'bardic-inspiration': {
    id: 'bardic-inspiration',
    name: 'Bardic Inspiration',
    source: 'Bard (Level 1)',
    description: 'You can inspire others through stirring words or music. A creature can add a d6 to one ability check, attack roll, or saving throw.',
    mechanics: 'You can inspire others through stirring words or music.',
  },
  'jack-of-all-trades': {
    id: 'jack-of-all-trades',
    name: 'Jack of All Trades',
    source: 'Bard (Level 2)',
    description: 'You can add half your proficiency bonus, rounded down, to any ability check you make that doesn\\',
    mechanics: 'You can add half your proficiency bonus, rounded down, to any ability check you make that doesn\\.',
  },
  'song-of-rest': {
    id: 'song-of-rest',
    name: 'Song of Rest',
    source: 'Bard (Level 2)',
    description: 'You can use soothing music or oration during a short rest to help revitalize your wounded allies. They regain an extra 1d6 HP.',
    mechanics: 'Damage: 1d6. Recharge: short/long rest.',
  },
  'font-of-inspiration': {
    id: 'font-of-inspiration',
    name: 'Font of Inspiration',
    source: 'Bard (Level 5)',
    description: 'You regain all expended uses of Bardic Inspiration when you finish a short or long rest.',
    mechanics: 'Recharge: short/long rest.',
  },
  'countercharm': {
    id: 'countercharm',
    name: 'Countercharm',
    source: 'Bard (Level 6)',
    description: 'As an action, you can start a performance that lasts until the end of your next turn. You and friendly creatures within 30 feet have advantage on saves against being frightened or charmed.',
    mechanics: 'Action. Grants advantage.',
  },
  'magical-secrets': {
    id: 'magical-secrets',
    name: 'Magical Secrets',
    source: 'Bard (Level 10)',
    description: 'You learn two spells of your choice from any class. They count as bard spells for you.',
    mechanics: 'You learn two spells of your choice from any class.',
  },
  'superior-inspiration': {
    id: 'superior-inspiration',
    name: 'Superior Inspiration',
    source: 'Bard (Level 20)',
    description: 'When you roll initiative and have no uses of Bardic Inspiration left, you regain one use.',
    mechanics: 'When you roll initiative and have no uses of Bardic Inspiration left, you regain one use.',
  },

  // ============================================
  // BATTLE MASTER CLASS TRAITS
  // ============================================
  'battle-master': {
    id: 'battle-master',
    name: 'Battle Master',
    source: 'Battle Master (Subclass)',
    description: 'Battle Masters employ martial techniques passed down through generations, using superiority dice to fuel powerful maneuvers.',
    mechanics: 'Battle Masters employ martial techniques passed down through generations, using superiority dice to fuel powerful man...',
  },

  // ============================================
  // BEAST MASTER CLASS TRAITS
  // ============================================
  'beast-master': {
    id: 'beast-master',
    name: 'Beast Master',
    source: 'Beast Master (Subclass)',
    description: 'The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world.',
    mechanics: 'The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world.',
  },
  'rangers-companion': {
    id: 'rangers-companion',
    name: 'Ranger\\',
    source: 'Beast Master (Level 3)',
    description: 'You gain a beast companion that accompanies you on your adventures and fights alongside you.',
    mechanics: 'You gain a beast companion that accompanies you on your adventures and fights alongside you.',
  },
  'exceptional-training': {
    id: 'exceptional-training',
    name: 'Exceptional Training',
    source: 'Beast Master (Level 7)',
    description: 'Your beast companion can take the Dash, Disengage, or Help action on its turn. Its attacks count as magical.',
    mechanics: 'Action.',
  },
  'bestial-fury': {
    id: 'bestial-fury',
    name: 'Bestial Fury',
    source: 'Beast Master (Level 11)',
    description: 'Your companion can make two attacks when you command it to use the Attack action.',
    mechanics: 'Action.',
  },
  'share-spells': {
    id: 'share-spells',
    name: 'Share Spells',
    source: 'Beast Master (Level 15)',
    description: 'When you cast a spell targeting yourself, you can also affect your beast companion if it is within 30 feet.',
    mechanics: 'When you cast a spell targeting yourself, you can also affect your beast companion if it is within 30 feet.',
  },

  // ============================================
  // BLOOD CLASS TRAITS
  // ============================================
  'blood-death-knight': {
    id: 'blood-death-knight',
    name: 'Blood',
    source: 'Blood (Subclass)',
    description: 'Vampiric tanks that sustain themselves through the lifeforce of enemies.',
    mechanics: 'Vampiric tanks that sustain themselves through the lifeforce of enemies.',
  },
  'blood-boil': {
    id: 'blood-boil',
    name: 'Blood Boil',
    source: 'Blood (Level 3)',
    description: 'Costs 3 Runic Power. Bonus action: enemies within 10ft take 1d8 necrotic, gain temp HP = half damage dealt. CON save for half damage.',
    mechanics: 'Bonus action. Damage: 1d8.',
  },
  'vampiric-blood': {
    id: 'vampiric-blood',
    name: 'Vampiric Blood',
    source: 'Blood (Level 6)',
    description: 'Costs 4 Runic Power. Gain temp HP = level + CON modifier for 1 minute, heal 10% of melee damage dealt.',
    mechanics: 'Costs 4 Runic Power.',
  },
  'dancing-rune-weapon': {
    id: 'dancing-rune-weapon',
    name: 'Dancing Rune Weapon',
    source: 'Blood (Level 14)',
    description: 'Costs 5 Runic Power. Summon spectral weapon that mirrors your attacks for 1 minute, dealing half damage.',
    mechanics: 'Costs 5 Runic Power.',
  },

  // ============================================
  // BOW AND CROSSBOW CLASS TRAITS
  // ============================================
  'bow-amazon': {
    id: 'bow-amazon',
    name: 'Bow and Crossbow',
    source: 'Bow and Crossbow (Subclass)',
    description: 'Master elemental arrows infused with fire, ice, and magical energy.',
    mechanics: 'Master elemental arrows infused with fire, ice, and magical energy.',
  },
  'magic-arrow': {
    id: 'magic-arrow',
    name: 'Magic Arrow',
    source: 'Bow and Crossbow (Level 3)',
    description: 'Ranged attacks deal +1d4 force damage (increases to +1d6 at 11th).',
    mechanics: 'Damage: 1d4.',
  },
  'immolation-arrow': {
    id: 'immolation-arrow',
    name: 'Immolation Arrow',
    source: 'Bow and Crossbow (Level 6)',
    description: 'Arrow explodes for 3d6 fire in 10ft radius. DEX save for half.',
    mechanics: 'Damage: 3d6.',
  },
  'strafe': {
    id: 'strafe',
    name: 'Strafe',
    source: 'Bow and Crossbow (Level 14)',
    description: 'Fire at up to 4 creatures, each takes normal weapon damage. DEX save or disadvantage on next attack.',
    mechanics: 'Grants advantage. Impose disadvantage.',
  },

  // ============================================
  // CHAMPION CLASS TRAITS
  // ============================================
  'champion': {
    id: 'champion',
    name: 'Champion',
    source: 'Champion (Subclass)',
    description: 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection.',
    mechanics: 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection.',
  },

  // ============================================
  // CIRCLE OF THE LAND CLASS TRAITS
  // ============================================
  'land': {
    id: 'land',
    name: 'Circle of the Land',
    source: 'Circle of the Land (Subclass)',
    description: 'The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through oral tradition.',
    mechanics: 'The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through oral tradition.',
  },
  'bonus-cantrip': {
    id: 'bonus-cantrip',
    name: 'Bonus Cantrip',
    source: 'Circle of the Land (Level 2)',
    description: 'You learn one additional druid cantrip of your choice.',
    mechanics: 'You learn one additional druid cantrip of your choice.',
  },
  'natural-recovery': {
    id: 'natural-recovery',
    name: 'Natural Recovery',
    source: 'Circle of the Land (Level 2)',
    description: 'During a short rest, you can recover spell slots with a combined level equal to or less than half your druid level (rounded up).',
    mechanics: 'Recharge: short/long rest.',
  },
  'circle-spells': {
    id: 'circle-spells',
    name: 'Circle Spells',
    source: 'Circle of the Land (Level 3)',
    description: 'Your mystical connection to the land infuses you with the ability to cast certain spells based on your chosen land type.',
    mechanics: 'Your mystical connection to the land infuses you with the ability to cast certain spells based on your chosen land type.',
  },
  'natures-ward': {
    id: 'natures-ward',
    name: 'Nature\\',
    source: 'Circle of the Land (Level 10)',
    description: 'You can\\',
    mechanics: 'You can\\.',
  },
  'natures-sanctuary': {
    id: 'natures-sanctuary',
    name: 'Nature\\',
    source: 'Circle of the Land (Level 14)',
    description: 'Creatures of the natural world sense your connection to nature and become hesitant to attack you.',
    mechanics: 'Creatures of the natural world sense your connection to nature and become hesitant to attack you.',
  },

  // ============================================
  // CIRCLE OF THE MOON CLASS TRAITS
  // ============================================
  'moon': {
    id: 'moon',
    name: 'Circle of the Moon',
    source: 'Circle of the Moon (Subclass)',
    description: 'Druids of the Circle of the Moon are fierce guardians of the wilds, shifting into powerful animal forms.',
    mechanics: 'Druids of the Circle of the Moon are fierce guardians of the wilds, shifting into powerful animal forms.',
  },
  'circle-forms': {
    id: 'circle-forms',
    name: 'Circle Forms',
    source: 'Circle of the Moon (Level 2)',
    description: 'You can transform into beasts with a higher CR than normal (CR 1 at 2nd level, increasing with druid level).',
    mechanics: 'You can transform into beasts with a higher CR than normal (CR 1 at 2nd level, increasing with druid level).',
  },
  'combat-wild-shape': {
    id: 'combat-wild-shape',
    name: 'Combat Wild Shape',
    source: 'Circle of the Moon (Level 2)',
    description: 'You can use Wild Shape as a bonus action. While transformed, you can expend a spell slot to regain 1d8 HP per slot level.',
    mechanics: 'Bonus action. Damage: 1d8.',
  },
  'primal-strike': {
    id: 'primal-strike',
    name: 'Primal Strike',
    source: 'Circle of the Moon (Level 6)',
    description: 'Your attacks in beast form count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks.',
    mechanics: 'Your attacks in beast form count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks.',
  },
  'elemental-wild-shape': {
    id: 'elemental-wild-shape',
    name: 'Elemental Wild Shape',
    source: 'Circle of the Moon (Level 10)',
    description: 'You can expend two uses of Wild Shape to transform into an air elemental, earth elemental, fire elemental, or water elemental.',
    mechanics: 'You can expend two uses of Wild Shape to transform into an air elemental, earth elemental, fire elemental, or water e...',
  },
  'thousand-forms': {
    id: 'thousand-forms',
    name: 'Thousand Forms',
    source: 'Circle of the Moon (Level 14)',
    description: 'You can cast the alter self spell at will.',
    mechanics: 'You can cast the alter self spell at will.',
  },

  // ============================================
  // CLERIC CLASS TRAITS
  // ============================================
  'cleric': {
    id: 'cleric',
    name: 'Cleric',
    source: 'Cleric (Class)',
    description: 'A priestly champion who wields divine magic in service of a higher power.',
    mechanics: 'A priestly champion who wields divine magic in service of a higher power.',
  },
  'channel-divinity': {
    id: 'channel-divinity',
    name: 'Channel Divinity',
    source: 'Cleric (Level 2)',
    description: 'You gain the ability to channel divine energy directly from your deity. You start with Turn Undead and gain additional options from your domain.',
    mechanics: 'You gain the ability to channel divine energy directly from your deity.',
  },
  'destroy-undead': {
    id: 'destroy-undead',
    name: 'Destroy Undead',
    source: 'Cleric (Level 5)',
    description: 'When an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed if its CR is at or below a certain threshold.',
    mechanics: 'When an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed if its CR...',
  },
  'divine-intervention': {
    id: 'divine-intervention',
    name: 'Divine Intervention',
    source: 'Cleric (Level 10)',
    description: 'You can call on your deity to intervene on your behalf. Roll a d100; if the number is equal to or lower than your cleric level, your deity intervenes.',
    mechanics: 'You can call on your deity to intervene on your behalf.',
  },
  'improved-divine-intervention': {
    id: 'improved-divine-intervention',
    name: 'Improved Divine Intervention',
    source: 'Cleric (Level 20)',
    description: 'Your call for divine intervention succeeds automatically.',
    mechanics: 'Your call for divine intervention succeeds automatically.',
  },

  // ============================================
  // COLLEGE OF LORE CLASS TRAITS
  // ============================================
  'lore': {
    id: 'lore',
    name: 'College of Lore',
    source: 'College of Lore (Subclass)',
    description: 'Bards of the College of Lore know something about most things, collecting bits of knowledge from diverse sources.',
    mechanics: 'Bards of the College of Lore know something about most things, collecting bits of knowledge from diverse sources.',
  },
  'cutting-words': {
    id: 'cutting-words',
    name: 'Cutting Words',
    source: 'College of Lore (Level 3)',
    description: 'When a creature within 60 feet makes an attack roll, ability check, or damage roll, you can use your reaction to expend one Bardic Inspiration die and subtract the number rolled.',
    mechanics: 'Reaction.',
  },
  'additional-magical-secrets': {
    id: 'additional-magical-secrets',
    name: 'Additional Magical Secrets',
    source: 'College of Lore (Level 6)',
    description: 'You learn two spells of your choice from any class. They must be of a level you can cast.',
    mechanics: 'You learn two spells of your choice from any class.',
  },
  'peerless-skill': {
    id: 'peerless-skill',
    name: 'Peerless Skill',
    source: 'College of Lore (Level 14)',
    description: 'When you make an ability check, you can expend one Bardic Inspiration die and add the number rolled to your ability check.',
    mechanics: 'When you make an ability check, you can expend one Bardic Inspiration die and add the number rolled to your ability c...',
  },

  // ============================================
  // COLLEGE OF VALOR CLASS TRAITS
  // ============================================
  'valor': {
    id: 'valor',
    name: 'College of Valor',
    source: 'College of Valor (Subclass)',
    description: 'Bards of the College of Valor are daring skalds whose tales keep alive the memory of the great heroes of the past.',
    mechanics: 'Bards of the College of Valor are daring skalds whose tales keep alive the memory of the great heroes of the past.',
  },
  'bonus-proficiencies': {
    id: 'bonus-proficiencies',
    name: 'Bonus Proficiencies',
    source: 'College of Valor (Level 3)',
    description: 'You gain proficiency with medium armor, shields, and martial weapons.',
    mechanics: 'You gain proficiency with medium armor, shields, and martial weapons.',
  },
  'combat-inspiration': {
    id: 'combat-inspiration',
    name: 'Combat Inspiration',
    source: 'College of Valor (Level 3)',
    description: 'A creature using your Bardic Inspiration can add the die to a weapon damage roll or to its AC against one attack.',
    mechanics: 'A creature using your Bardic Inspiration can add the die to a weapon damage roll or to its AC against one attack.',
  },
  'battle-magic': {
    id: 'battle-magic',
    name: 'Battle Magic',
    source: 'College of Valor (Level 14)',
    description: 'When you use your action to cast a bard spell, you can make one weapon attack as a bonus action.',
    mechanics: 'Bonus action.',
  },

  // ============================================
  // DEATH KNIGHT CLASS TRAITS
  // ============================================
  'death-knight': {
    id: 'death-knight',
    name: 'Death Knight',
    source: 'Death Knight (Class)',
    description: 'A fallen champion raised by dark powers, wielding runic magic and commanding the forces of death itself.',
    mechanics: 'A fallen champion raised by dark powers, wielding runic magic and commanding the forces of death itself.',
  },
  'extra-attack-dk': {
    id: 'extra-attack-dk',
    name: 'Extra Attack',
    source: 'Death Knight (Level 5)',
    description: 'Attack twice when you take the Attack action.',
    mechanics: 'Action.',
  },

  // ============================================
  // DEMON HUNTER CLASS TRAITS
  // ============================================
  'demon-hunter': {
    id: 'demon-hunter',
    name: 'Demon Hunter',
    source: 'Demon Hunter (Class)',
    description: 'A relentless slayer who sacrificed part of their humanity to gain demonic powers.',
    mechanics: 'A relentless slayer who sacrificed part of their humanity to gain demonic powers.',
  },
  'spectral-sight': {
    id: 'spectral-sight',
    name: 'Spectral Sight',
    source: 'Demon Hunter (Level 1)',
    description: 'See invisible creatures within 30ft. Darkvision extends by 30ft.',
    mechanics: 'See invisible creatures within 30ft.',
  },
  'fel-rush': {
    id: 'fel-rush',
    name: 'Fel Rush',
    source: 'Demon Hunter (Level 3)',
    description: 'Dash 20ft, creatures you pass take 1d8 fire damage. DEX save for half.',
    mechanics: 'Damage: 1d8.',
  },
  'extra-attack-dh': {
    id: 'extra-attack-dh',
    name: 'Extra Attack',
    source: 'Demon Hunter (Level 5)',
    description: 'Attack twice when you take the Attack action.',
    mechanics: 'Action.',
  },
  'blade-dance': {
    id: 'blade-dance',
    name: 'Blade Dance',
    source: 'Demon Hunter (Level 6)',
    description: 'All creatures within 5ft take 2d6 slashing. DEX save for half.',
    mechanics: 'Damage: 2d6.',
  },
  'metamorphosis': {
    id: 'metamorphosis',
    name: 'Metamorphosis',
    source: 'Demon Hunter (Level 9)',
    description: 'Transform for 1 minute: +1 AC, 30ft fly, +1d6 fire damage on attacks.',
    mechanics: 'Damage: 1d6.',
  },

  // ============================================
  // DRACONIC BLOODLINE CLASS TRAITS
  // ============================================
  'draconic': {
    id: 'draconic',
    name: 'Draconic Bloodline',
    source: 'Draconic Bloodline (Subclass)',
    description: 'Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors.',
    mechanics: 'Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors.',
  },

  // ============================================
  // DRUID CLASS TRAITS
  // ============================================
  'druid': {
    id: 'druid',
    name: 'Druid',
    source: 'Druid (Class)',
    description: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
    mechanics: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
  },
  'druidic': {
    id: 'druidic',
    name: 'Druidic',
    source: 'Druid (Level 1)',
    description: 'You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages.',
    mechanics: 'You know Druidic, the secret language of druids.',
  },
  'wild-shape': {
    id: 'wild-shape',
    name: 'Wild Shape',
    source: 'Druid (Level 2)',
    description: 'You can use your action to magically assume the shape of a beast that you have seen before.',
    mechanics: 'Action.',
  },
  'beast-spells': {
    id: 'beast-spells',
    name: 'Beast Spells',
    source: 'Druid (Level 18)',
    description: 'You can cast many of your druid spells in any shape you assume using Wild Shape.',
    mechanics: 'You can cast many of your druid spells in any shape you assume using Wild Shape.',
  },
  'archdruid': {
    id: 'archdruid',
    name: 'Archdruid',
    source: 'Druid (Level 20)',
    description: 'You can use your Wild Shape an unlimited number of times. You can ignore verbal and somatic components of druid spells.',
    mechanics: 'You can use your Wild Shape an unlimited number of times.',
  },

  // ============================================
  // ELDRITCH KNIGHT CLASS TRAITS
  // ============================================
  'eldritch-knight': {
    id: 'eldritch-knight',
    name: 'Eldritch Knight',
    source: 'Eldritch Knight (Subclass)',
    description: 'The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic.',
    mechanics: 'The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic.',
  },
  'weapon-bond': {
    id: 'weapon-bond',
    name: 'Weapon Bond',
    source: 'Eldritch Knight (Level 3)',
    description: 'You learn a ritual to bond with up to two weapons. Bonded weapons cannot be disarmed and you can summon them as a bonus action.',
    mechanics: 'Bonus action.',
  },
  'war-magic': {
    id: 'war-magic',
    name: 'War Magic',
    source: 'Eldritch Knight (Level 7)',
    description: 'When you use your action to cast a cantrip, you can make one weapon attack as a bonus action.',
    mechanics: 'Bonus action.',
  },
  'eldritch-strike': {
    id: 'eldritch-strike',
    name: 'Eldritch Strike',
    source: 'Eldritch Knight (Level 10)',
    description: 'When you hit a creature with a weapon attack, that creature has disadvantage on its next saving throw against a spell you cast before the end of your next turn.',
    mechanics: 'Grants advantage. Impose disadvantage.',
  },
  'arcane-charge': {
    id: 'arcane-charge',
    name: 'Arcane Charge',
    source: 'Eldritch Knight (Level 15)',
    description: 'When you use Action Surge, you can teleport up to 30 feet to an unoccupied space before or after the additional action.',
    mechanics: 'Action.',
  },
  'improved-war-magic': {
    id: 'improved-war-magic',
    name: 'Improved War Magic',
    source: 'Eldritch Knight (Level 18)',
    description: 'When you use your action to cast a spell, you can make one weapon attack as a bonus action.',
    mechanics: 'Bonus action.',
  },

  // ============================================
  // FIGHTER CLASS TRAITS
  // ============================================
  'fighter': {
    id: 'fighter',
    name: 'Fighter',
    source: 'Fighter (Class)',
    description: 'A master of martial combat, skilled with a variety of weapons and armor.',
    mechanics: 'A master of martial combat, skilled with a variety of weapons and armor.',
  },
  'dual-two-handed': {
    id: 'dual-two-handed',
    name: 'Dual Two-Handed',
    source: 'Fighter (Level 1)',
    description: 'Wield two two-handed weapons simultaneously (e.g., two greatswords). -4 AC penalty but roll damage for both weapons.',
    mechanics: 'Wield two two-handed weapons simultaneously (e.',
  },

  // ============================================
  // FROST CLASS TRAITS
  // ============================================
  'frost-death-knight': {
    id: 'frost-death-knight',
    name: 'Frost',
    source: 'Frost (Subclass)',
    description: 'Wield the power of ice and cold, devastating enemies with frozen strikes.',
    mechanics: 'Wield the power of ice and cold, devastating enemies with frozen strikes.',
  },
  'frost-strike': {
    id: 'frost-strike',
    name: 'Frost Strike',
    source: 'Frost (Level 3)',
    description: 'Costs 2 Runic Power. Add +1d8 cold damage and reduce target speed by 10ft until end of your next turn.',
    mechanics: 'Damage: 1d8.',
  },
  'killing-machine': {
    id: 'killing-machine',
    name: 'Killing Machine',
    source: 'Frost (Level 6)',
    description: 'Once per short rest: gain advantage on next attack roll. On crit, regain 2 Runic Power.',
    mechanics: 'Recharge: short/long rest. Grants advantage.',
  },
  'breath-of-sindragosa': {
    id: 'breath-of-sindragosa',
    name: 'Breath of Sindragosa',
    source: 'Frost (Level 14)',
    description: 'Costs 6 Runic Power. 30ft cone, 6d8 cold damage, CON save for half. Failed save = speed halved for 1 round.',
    mechanics: 'Damage: 6d8.',
  },

  // ============================================
  // HAVOC CLASS TRAITS
  // ============================================
  'havoc-demon-hunter': {
    id: 'havoc-demon-hunter',
    name: 'Havoc',
    source: 'Havoc (Subclass)',
    description: 'Melee DPS specialists dealing massive chaotic fel damage.',
    mechanics: 'Melee DPS specialists dealing massive chaotic fel damage.',
  },
  'eye-beam': {
    id: 'eye-beam',
    name: 'Eye Beam',
    source: 'Havoc (Level 3)',
    description: '40ft line, 4d6 fire damage. DEX save for half.',
    mechanics: 'Damage: 4d6.',
  },
  'momentum': {
    id: 'momentum',
    name: 'Momentum',
    source: 'Havoc (Level 6)',
    description: 'After Fel Rush, next attack deals +1d6 damage.',
    mechanics: 'Damage: 1d6.',
  },
  'demonic': {
    id: 'demonic',
    name: 'Demonic',
    source: 'Havoc (Level 14)',
    description: 'Once per long rest: Eye Beam triggers Metamorphosis for 1 minute.',
    mechanics: 'Recharge: long rest.',
  },

  // ============================================
  // HUNTER CLASS TRAITS
  // ============================================
  'hunter': {
    id: 'hunter',
    name: 'Hunter',
    source: 'Hunter (Subclass)',
    description: 'Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wilderness.',
    mechanics: 'Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wi...',
  },
  'hunters-prey': {
    id: 'hunters-prey',
    name: 'Hunter\\',
    source: 'Hunter (Level 3)',
    description: 'You gain one of the following features: Colossus Slayer, Giant Killer, or Horde Breaker.',
    mechanics: 'You gain one of the following features: Colossus Slayer, Giant Killer, or Horde Breaker.',
  },
  'defensive-tactics': {
    id: 'defensive-tactics',
    name: 'Defensive Tactics',
    source: 'Hunter (Level 7)',
    description: 'You gain one of the following features: Escape the Horde, Multiattack Defense, or Steel Will.',
    mechanics: 'You gain one of the following features: Escape the Horde, Multiattack Defense, or Steel Will.',
  },
  'multiattack': {
    id: 'multiattack',
    name: 'Multiattack',
    source: 'Hunter (Level 11)',
    description: 'You gain one of the following features: Volley or Whirlwind Attack.',
    mechanics: 'You gain one of the following features: Volley or Whirlwind Attack.',
  },
  'superior-hunters-defense': {
    id: 'superior-hunters-defense',
    name: 'Superior Hunter\\',
    source: 'Hunter (Level 15)',
    description: 'You gain one of the following features: Evasion, Stand Against the Tide, or Uncanny Dodge.',
    mechanics: 'You gain one of the following features: Evasion, Stand Against the Tide, or Uncanny Dodge.',
  },

  // ============================================
  // JAVELIN AND SPEAR CLASS TRAITS
  // ============================================
  'javelin-amazon': {
    id: 'javelin-amazon',
    name: 'Javelin and Spear',
    source: 'Javelin and Spear (Subclass)',
    description: 'Lightning-infused thrown weapons and devastating charged strikes.',
    mechanics: 'Lightning-infused thrown weapons and devastating charged strikes.',
  },
  'power-strike': {
    id: 'power-strike',
    name: 'Power Strike',
    source: 'Javelin and Spear (Level 3)',
    description: 'Add 1d6 lightning damage to javelin/spear attacks.',
    mechanics: 'Damage: 1d6.',
  },
  'charged-strike': {
    id: 'charged-strike',
    name: 'Charged Strike',
    source: 'Javelin and Spear (Level 6)',
    description: 'On hit, release bolt hitting 1 additional creature within 10ft for 2d6 lightning.',
    mechanics: 'Damage: 2d6.',
  },
  'lightning-fury': {
    id: 'lightning-fury',
    name: 'Lightning Fury',
    source: 'Javelin and Spear (Level 14)',
    description: '15ft radius, 6d6 lightning damage. DEX save for half.',
    mechanics: 'Damage: 6d6.',
  },

  // ============================================
  // LIFE DOMAIN CLASS TRAITS
  // ============================================
  'life-domain': {
    id: 'life-domain',
    name: 'Life Domain',
    source: 'Life Domain (Subclass)',
    description: 'The Life domain focuses on the vibrant positive energy that sustains all life. Gods of life promote vitality and health through healing the sick and wounded.',
    mechanics: 'The Life domain focuses on the vibrant positive energy that sustains all life.',
  },
  'bonus-proficiency': {
    id: 'bonus-proficiency',
    name: 'Bonus Proficiency',
    source: 'Life Domain (Level 1)',
    description: 'You gain proficiency with heavy armor.',
    mechanics: 'You gain proficiency with heavy armor.',
  },
  'disciple-of-life': {
    id: 'disciple-of-life',
    name: 'Disciple of Life',
    source: 'Life Domain (Level 1)',
    description: 'When you use a spell of 1st level or higher to restore hit points, the creature regains additional HP equal to 2 + the spell\\',
    mechanics: 'When you use a spell of 1st level or higher to restore hit points, the creature regains additional HP equal to 2 + th...',
  },
  'channel-divinity-preserve-life': {
    id: 'channel-divinity-preserve-life',
    name: 'Channel Divinity: Preserve Life',
    source: 'Life Domain (Level 2)',
    description: 'As an action, present your holy symbol and restore HP equal to 5x your cleric level, divided as you choose among creatures within 30 feet.',
    mechanics: 'Action.',
  },
  'blessed-healer': {
    id: 'blessed-healer',
    name: 'Blessed Healer',
    source: 'Life Domain (Level 6)',
    description: 'When you cast a spell of 1st level or higher that restores HP to another creature, you regain HP equal to 2 + the spell\\',
    mechanics: 'When you cast a spell of 1st level or higher that restores HP to another creature, you regain HP equal to 2 + the spell\\.',
  },
  'divine-strike': {
    id: 'divine-strike',
    name: 'Divine Strike',
    source: 'Life Domain (Level 8)',
    description: 'Once on each of your turns when you hit a creature with a weapon attack, you deal an extra 1d8 radiant damage (2d8 at 14th level).',
    mechanics: 'Damage: 1d8.',
  },
  'supreme-healing': {
    id: 'supreme-healing',
    name: 'Supreme Healing',
    source: 'Life Domain (Level 17)',
    description: 'When you would normally roll one or more dice to restore HP with a spell, you instead use the highest number possible for each die.',
    mechanics: 'When you would normally roll one or more dice to restore HP with a spell, you instead use the highest number possible...',
  },

  // ============================================
  // LIGHT DOMAIN CLASS TRAITS
  // ============================================
  'light-domain': {
    id: 'light-domain',
    name: 'Light Domain',
    source: 'Light Domain (Subclass)',
    description: 'Gods of light promote the ideals of rebirth and renewal, truth, vigilance, and beauty. Their clerics are aggressive enemies of undead.',
    mechanics: 'Gods of light promote the ideals of rebirth and renewal, truth, vigilance, and beauty.',
  },
  'warding-flare': {
    id: 'warding-flare',
    name: 'Warding Flare',
    source: 'Light Domain (Level 1)',
    description: 'When attacked by a creature within 30 feet that you can see, use your reaction to impose disadvantage on the attack roll. Uses WIS modifier per long rest.',
    mechanics: 'Reaction. Recharge: long rest. Grants advantage. Impose disadvantage.',
  },
  'channel-divinity-radiance': {
    id: 'channel-divinity-radiance',
    name: 'Channel Divinity: Radiance of the Dawn',
    source: 'Light Domain (Level 2)',
    description: 'As an action, dispel magical darkness within 30 feet. Hostile creatures within 30 feet must make CON save or take 2d10 + cleric level radiant damage.',
    mechanics: 'Action. Damage: 2d10.',
  },
  'improved-flare': {
    id: 'improved-flare',
    name: 'Improved Flare',
    source: 'Light Domain (Level 6)',
    description: 'You can use Warding Flare when a creature attacks a different creature within 30 feet of you.',
    mechanics: 'You can use Warding Flare when a creature attacks a different creature within 30 feet of you.',
  },
  'potent-spellcasting': {
    id: 'potent-spellcasting',
    name: 'Potent Spellcasting',
    source: 'Light Domain (Level 8)',
    description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.',
    mechanics: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.',
  },
  'corona-of-light': {
    id: 'corona-of-light',
    name: 'Corona of Light',
    source: 'Light Domain (Level 17)',
    description: 'As an action, activate an aura of sunlight that sheds bright light in a 60-foot radius and dim light for an additional 30 feet. Enemies have disadvantage on saves against fire or radiant damage.',
    mechanics: 'Action. Grants advantage. Impose disadvantage.',
  },

  // ============================================
  // MONK CLASS TRAITS
  // ============================================
  'monk': {
    id: 'monk',
    name: 'Monk',
    source: 'Monk (Class)',
    description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.',
    mechanics: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.',
  },

  // ============================================
  // NECROMANCER CLASS TRAITS
  // ============================================
  'necromancer': {
    id: 'necromancer',
    name: 'Necromancer',
    source: 'Necromancer (Class)',
    description: 'Master of the dark arts who commands undead minions and wields devastating curse magic.',
    mechanics: 'Master of the dark arts who commands undead minions and wields devastating curse magic.',
  },
  'summon-golem': {
    id: 'summon-golem',
    name: 'Summon Golem',
    source: 'Necromancer (Level 11)',
    description: 'Costs 5 Essence. Summon bone/blood/iron golem for 1 hour. Only one golem at a time.',
    mechanics: 'Costs 5 Essence.',
  },

  // ============================================
  // OATH OF DEVOTION CLASS TRAITS
  // ============================================
  'devotion': {
    id: 'devotion',
    name: 'Oath of Devotion',
    source: 'Oath of Devotion (Subclass)',
    description: 'The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order.',
    mechanics: 'The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order.',
  },
  'sacred-weapon': {
    id: 'sacred-weapon',
    name: 'Channel Divinity: Sacred Weapon',
    source: 'Oath of Devotion (Level 3)',
    description: 'As an action, imbue one weapon you are holding with positive energy. For 1 minute, you add your CHA modifier to attack rolls and the weapon emits bright light.',
    mechanics: 'Action.',
  },
  'turn-the-unholy': {
    id: 'turn-the-unholy',
    name: 'Channel Divinity: Turn the Unholy',
    source: 'Oath of Devotion (Level 3)',
    description: 'As an action, each fiend or undead within 30 feet must make a WIS save or be turned for 1 minute.',
    mechanics: 'Action.',
  },
  'aura-of-devotion': {
    id: 'aura-of-devotion',
    name: 'Aura of Devotion',
    source: 'Oath of Devotion (Level 7)',
    description: 'You and friendly creatures within 10 feet can\\',
    mechanics: 'You and friendly creatures within 10 feet can\\.',
  },
  'purity-of-spirit': {
    id: 'purity-of-spirit',
    name: 'Purity of Spirit',
    source: 'Oath of Devotion (Level 15)',
    description: 'You are always under the effects of a protection from evil and good spell.',
    mechanics: 'You are always under the effects of a protection from evil and good spell.',
  },
  'holy-nimbus': {
    id: 'holy-nimbus',
    name: 'Holy Nimbus',
    source: 'Oath of Devotion (Level 20)',
    description: 'As an action, you can emanate an aura of sunlight. For 1 minute, bright light shines from you in a 30-foot radius and enemies in it take 10 radiant damage at the start of each of their turns.',
    mechanics: 'Action.',
  },

  // ============================================
  // OATH OF VENGEANCE CLASS TRAITS
  // ============================================
  'vengeance': {
    id: 'vengeance',
    name: 'Oath of Vengeance',
    source: 'Oath of Vengeance (Subclass)',
    description: 'The Oath of Vengeance is a solemn commitment to punish those who have committed grievous sins.',
    mechanics: 'The Oath of Vengeance is a solemn commitment to punish those who have committed grievous sins.',
  },
  'abjure-enemy': {
    id: 'abjure-enemy',
    name: 'Channel Divinity: Abjure Enemy',
    source: 'Oath of Vengeance (Level 3)',
    description: 'As an action, choose one creature within 60 feet. It must make a WIS save or be frightened for 1 minute. Fiends and undead have disadvantage on this save.',
    mechanics: 'Action. Grants advantage. Impose disadvantage.',
  },
  'vow-of-enmity': {
    id: 'vow-of-enmity',
    name: 'Channel Divinity: Vow of Enmity',
    source: 'Oath of Vengeance (Level 3)',
    description: 'As a bonus action, you gain advantage on attack rolls against a creature within 10 feet for 1 minute.',
    mechanics: 'Bonus action. Grants advantage.',
  },
  'relentless-avenger': {
    id: 'relentless-avenger',
    name: 'Relentless Avenger',
    source: 'Oath of Vengeance (Level 7)',
    description: 'When you hit a creature with an opportunity attack, you can move up to half your speed immediately after the attack as part of the same reaction.',
    mechanics: 'Reaction.',
  },
  'soul-of-vengeance': {
    id: 'soul-of-vengeance',
    name: 'Soul of Vengeance',
    source: 'Oath of Vengeance (Level 15)',
    description: 'When a creature under your Vow of Enmity makes an attack, you can use your reaction to make a melee weapon attack against it.',
    mechanics: 'Reaction.',
  },
  'avenging-angel': {
    id: 'avenging-angel',
    name: 'Avenging Angel',
    source: 'Oath of Vengeance (Level 20)',
    description: 'As an action, you undergo a transformation. For 1 hour, you have a flying speed of 60 feet and emanate a menacing aura.',
    mechanics: 'Action.',
  },

  // ============================================
  // PALADIN CLASS TRAITS
  // ============================================
  'paladin': {
    id: 'paladin',
    name: 'Paladin',
    source: 'Paladin (Class)',
    description: 'A holy warrior bound to a sacred oath.',
    mechanics: 'A holy warrior bound to a sacred oath.',
  },
  'great-weapon': {
    id: 'great-weapon',
    name: 'Great Weapon Fighting',
    source: 'Paladin (Level 1)',
    description: 'Reroll 1s and 2s on damage dice for two-handed weapons.',
    mechanics: 'Reroll 1s and 2s on damage dice for two-handed weapons.',
  },
  'protection': {
    id: 'protection',
    name: 'Protection',
    source: 'Paladin (Level 1)',
    description: 'Use reaction to impose disadvantage on attack against adjacent ally.',
    mechanics: 'Reaction. Grants advantage. Impose disadvantage.',
  },

  // ============================================
  // PASSIVE AND MAGIC CLASS TRAITS
  // ============================================
  'passive-magic-amazon': {
    id: 'passive-magic-amazon',
    name: 'Passive and Magic',
    source: 'Passive and Magic (Subclass)',
    description: 'Focus on defensive techniques and summoning abilities.',
    mechanics: 'Focus on defensive techniques and summoning abilities.',
  },
  'decoy': {
    id: 'decoy',
    name: 'Decoy',
    source: 'Passive and Magic (Level 3)',
    description: 'Create illusory duplicate within 30ft for 1 minute. WIS save to distinguish.',
    mechanics: 'Create illusory duplicate within 30ft for 1 minute.',
  },
  'improved-dodge': {
    id: 'improved-dodge',
    name: 'Improved Dodge',
    source: 'Passive and Magic (Level 6)',
    description: 'Dodge has 3 charges per short rest. Move 5ft when you dodge.',
    mechanics: 'Recharge: short/long rest.',
  },
  'blade-guardian': {
    id: 'blade-guardian',
    name: 'Blade Guardian',
    source: 'Passive and Magic (Level 14)',
    description: 'Spectral blades give +1 AC for 1 minute, auto-attack melee attackers for 1d8 force.',
    mechanics: 'Damage: 1d8.',
  },

  // ============================================
  // PATH OF BLOOD CLASS TRAITS
  // ============================================
  'blood-necromancer': {
    id: 'blood-necromancer',
    name: 'Path of Blood',
    source: 'Path of Blood (Subclass)',
    description: 'Manipulate lifeforce, draining enemies and empowering yourself.',
    mechanics: 'Manipulate lifeforce, draining enemies and empowering yourself.',
  },
  'blood-surge': {
    id: 'blood-surge',
    name: 'Blood Surge',
    source: 'Path of Blood (Level 2)',
    description: 'Costs 2 Essence. Drain blood from creatures within 15ft for 2d6 necrotic, heal half damage dealt.',
    mechanics: 'Damage: 2d6.',
  },
  'siphon-blood': {
    id: 'siphon-blood',
    name: 'Siphon Blood',
    source: 'Path of Blood (Level 6)',
    description: 'Passive: Heal for 25% of necrotic spell damage dealt.',
    mechanics: 'Passive: Heal for 25% of necrotic spell damage dealt.',
  },
  'hemorrhage': {
    id: 'hemorrhage',
    name: 'Hemorrhage',
    source: 'Path of Blood (Level 14)',
    description: 'Costs 5 Essence. Target bleeds for 3d8 + 1d8/turn for 1 minute. CON save ends effect.',
    mechanics: 'Damage: 3d8 + 1.',
  },

  // ============================================
  // PATH OF BONE CLASS TRAITS
  // ============================================
  'bone-necromancer': {
    id: 'bone-necromancer',
    name: 'Path of Bone',
    source: 'Path of Bone (Subclass)',
    description: 'Focus on offensive bone magic, using remains as deadly weapons.',
    mechanics: 'Focus on offensive bone magic, using remains as deadly weapons.',
  },
  'bone-storm': {
    id: 'bone-storm',
    name: 'Bone Storm',
    source: 'Path of Bone (Level 14)',
    description: 'Costs 5 Essence. Vortex of bones deals 3d6 slashing to creatures within 10ft for 3 rounds.',
    mechanics: 'Damage: 3d6.',
  },

  // ============================================
  // PATH OF THE BERSERKER CLASS TRAITS
  // ============================================
  'berserker': {
    id: 'berserker',
    name: 'Path of the Berserker',
    source: 'Path of the Berserker (Subclass)',
    description: 'For some barbarians, rage is a means to an end—that end being violence. The Path of the Berserker is a path of untrammeled fury.',
    mechanics: 'For some barbarians, rage is a means to an end—that end being violence.',
  },
  'frenzy': {
    id: 'frenzy',
    name: 'Frenzy',
    source: 'Path of the Berserker (Level 3)',
    description: 'You can go into a frenzy when you rage. You can make a single melee weapon attack as a bonus action on each turn. When your rage ends, you suffer one level of exhaustion.',
    mechanics: 'Bonus action.',
  },
  'mindless-rage': {
    id: 'mindless-rage',
    name: 'Mindless Rage',
    source: 'Path of the Berserker (Level 6)',
    description: 'You can\\',
    mechanics: 'You can\\.',
  },
  'intimidating-presence': {
    id: 'intimidating-presence',
    name: 'Intimidating Presence',
    source: 'Path of the Berserker (Level 10)',
    description: 'You can use your action to frighten someone with your menacing presence. WIS save or frightened until end of your next turn.',
    mechanics: 'Action.',
  },
  'retaliation': {
    id: 'retaliation',
    name: 'Retaliation',
    source: 'Path of the Berserker (Level 14)',
    description: 'When you take damage from a creature within 5 feet, you can use your reaction to make a melee weapon attack against that creature.',
    mechanics: 'Reaction.',
  },

  // ============================================
  // PATH OF THE SUMMONER CLASS TRAITS
  // ============================================
  'summoner-necromancer': {
    id: 'summoner-necromancer',
    name: 'Path of the Summoner',
    source: 'Path of the Summoner (Subclass)',
    description: 'Command vast armies of undead.',
    mechanics: 'Command vast armies of undead.',
  },
  'skeleton-mastery': {
    id: 'skeleton-mastery',
    name: 'Skeleton Mastery',
    source: 'Path of the Summoner (Level 2)',
    description: 'Increase skeleton limit by 1. Skeletons gain +1 attack and damage.',
    mechanics: 'Increase skeleton limit by 1.',
  },
  'death-lord': {
    id: 'death-lord',
    name: 'Death Lord',
    source: 'Path of the Summoner (Level 14)',
    description: 'Passive: Undead minions gain +2 AC, +10 HP, and +1d6 necrotic damage.',
    mechanics: 'Damage: 1d6.',
  },

  // ============================================
  // PATH OF THE TOTEM WARRIOR CLASS TRAITS
  // ============================================
  'totem-warrior': {
    id: 'totem-warrior',
    name: 'Path of the Totem Warrior',
    source: 'Path of the Totem Warrior (Subclass)',
    description: 'The Path of the Totem Warrior is a spiritual journey, as the barbarian accepts a spirit animal as guide, protector, and inspiration.',
    mechanics: 'The Path of the Totem Warrior is a spiritual journey, as the barbarian accepts a spirit animal as guide, protector, a...',
  },
  'spirit-seeker': {
    id: 'spirit-seeker',
    name: 'Spirit Seeker',
    source: 'Path of the Totem Warrior (Level 3)',
    description: 'You gain the ability to cast the beast sense and speak with animals spells, but only as rituals.',
    mechanics: 'You gain the ability to cast the beast sense and speak with animals spells, but only as rituals.',
  },
  'totem-spirit': {
    id: 'totem-spirit',
    name: 'Totem Spirit',
    source: 'Path of the Totem Warrior (Level 3)',
    description: 'When you adopt this path, you choose a totem spirit (Bear, Eagle, Elk, Tiger, or Wolf) that grants you a feature while raging.',
    mechanics: 'When you adopt this path, you choose a totem spirit (Bear, Eagle, Elk, Tiger, or Wolf) that grants you a feature whil...',
  },
  'aspect-of-the-beast': {
    id: 'aspect-of-the-beast',
    name: 'Aspect of the Beast',
    source: 'Path of the Totem Warrior (Level 6)',
    description: 'You gain a magical benefit based on the totem animal of your choice (Bear, Eagle, Elk, Tiger, or Wolf).',
    mechanics: 'You gain a magical benefit based on the totem animal of your choice (Bear, Eagle, Elk, Tiger, or Wolf).',
  },
  'spirit-walker': {
    id: 'spirit-walker',
    name: 'Spirit Walker',
    source: 'Path of the Totem Warrior (Level 10)',
    description: 'You can cast the commune with nature spell, but only as a ritual.',
    mechanics: 'You can cast the commune with nature spell, but only as a ritual.',
  },
  'totemic-attunement': {
    id: 'totemic-attunement',
    name: 'Totemic Attunement',
    source: 'Path of the Totem Warrior (Level 14)',
    description: 'You gain a magical benefit based on a totem animal of your choice.',
    mechanics: 'You gain a magical benefit based on a totem animal of your choice.',
  },

  // ============================================
  // RANGER CLASS TRAITS
  // ============================================
  'ranger': {
    id: 'ranger',
    name: 'Ranger',
    source: 'Ranger (Class)',
    description: 'A warrior who combats threats on the edges of civilization.',
    mechanics: 'A warrior who combats threats on the edges of civilization.',
  },
  'defense': {
    id: 'defense',
    name: 'Defense',
    source: 'Ranger (Level 1)',
    description: '+1 bonus to AC while wearing armor.',
    mechanics: '+1 bonus to AC while wearing armor.',
  },
  'dueling': {
    id: 'dueling',
    name: 'Dueling',
    source: 'Ranger (Level 1)',
    description: '+2 bonus to damage with one-handed melee weapon and no other weapons.',
    mechanics: '+2 bonus to damage with one-handed melee weapon and no other weapons.',
  },
  'favored-enemy': {
    id: 'favored-enemy',
    name: 'Favored Enemy',
    source: 'Ranger (Level 1)',
    description: 'You have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.',
    mechanics: 'You have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.',
  },
  'natural-explorer': {
    id: 'natural-explorer',
    name: 'Natural Explorer',
    source: 'Ranger (Level 1)',
    description: 'You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions.',
    mechanics: 'You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such r...',
  },
  'two-weapon': {
    id: 'two-weapon',
    name: 'Two-Weapon Fighting',
    source: 'Ranger (Level 1)',
    description: 'Add ability modifier to off-hand attack damage.',
    mechanics: 'Add ability modifier to off-hand attack damage.',
  },
  'primeval-awareness': {
    id: 'primeval-awareness',
    name: 'Primeval Awareness',
    source: 'Ranger (Level 3)',
    description: 'You can use an action and expend a spell slot to focus your awareness on the region around you.',
    mechanics: 'Action.',
  },
  'lands-stride': {
    id: 'lands-stride',
    name: 'Land\\',
    source: 'Ranger (Level 8)',
    description: 'Moving through nonmagical difficult terrain costs you no extra movement.',
    mechanics: 'Moving through nonmagical difficult terrain costs you no extra movement.',
  },
  'hide-in-plain-sight': {
    id: 'hide-in-plain-sight',
    name: 'Hide in Plain Sight',
    source: 'Ranger (Level 10)',
    description: 'You can spend 1 minute creating camouflage for yourself. You gain a +10 bonus to Stealth checks while remaining there without moving.',
    mechanics: 'You can spend 1 minute creating camouflage for yourself.',
  },
  'vanish': {
    id: 'vanish',
    name: 'Vanish',
    source: 'Ranger (Level 14)',
    description: 'You can use the Hide action as a bonus action. Also, you can\\',
    mechanics: 'Bonus action.',
  },
  'feral-senses': {
    id: 'feral-senses',
    name: 'Feral Senses',
    source: 'Ranger (Level 18)',
    description: 'You gain preternatural senses that help you fight creatures you can\\',
    mechanics: 'You gain preternatural senses that help you fight creatures you can\\.',
  },
  'foe-slayer': {
    id: 'foe-slayer',
    name: 'Foe Slayer',
    source: 'Ranger (Level 20)',
    description: 'You become an unparalleled hunter. Once per turn, you can add your WIS modifier to the attack roll or damage roll against a favored enemy.',
    mechanics: 'You become an unparalleled hunter.',
  },

  // ============================================
  // ROGUE CLASS TRAITS
  // ============================================
  'rogue': {
    id: 'rogue',
    name: 'Rogue',
    source: 'Rogue (Class)',
    description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
    mechanics: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
  },

  // ============================================
  // SCHOOL OF ABJURATION CLASS TRAITS
  // ============================================
  'abjuration': {
    id: 'abjuration',
    name: 'School of Abjuration',
    source: 'School of Abjuration (Subclass)',
    description: 'The School of Abjuration emphasizes magic that blocks, banishes, or protects. You specialize in protective magic.',
    mechanics: 'The School of Abjuration emphasizes magic that blocks, banishes, or protects.',
  },
  'abjuration-savant': {
    id: 'abjuration-savant',
    name: 'Abjuration Savant',
    source: 'School of Abjuration (Level 2)',
    description: 'The gold and time you must spend to copy an abjuration spell into your spellbook is halved.',
    mechanics: 'The gold and time you must spend to copy an abjuration spell into your spellbook is halved.',
  },
  'arcane-ward': {
    id: 'arcane-ward',
    name: 'Arcane Ward',
    source: 'School of Abjuration (Level 2)',
    description: 'When you cast an abjuration spell of 1st level or higher, you create a magical ward that has HP equal to twice your wizard level + INT modifier. It absorbs damage you take.',
    mechanics: 'When you cast an abjuration spell of 1st level or higher, you create a magical ward that has HP equal to twice your w...',
  },
  'projected-ward': {
    id: 'projected-ward',
    name: 'Projected Ward',
    source: 'School of Abjuration (Level 6)',
    description: 'When a creature within 30 feet takes damage, you can use your reaction to cause your Arcane Ward to absorb that damage instead.',
    mechanics: 'Reaction.',
  },
  'improved-abjuration': {
    id: 'improved-abjuration',
    name: 'Improved Abjuration',
    source: 'School of Abjuration (Level 10)',
    description: 'When you cast an abjuration spell requiring an ability check (like counterspell or dispel magic), you add your proficiency bonus to that check.',
    mechanics: 'When you cast an abjuration spell requiring an ability check (like counterspell or dispel magic), you add your profic...',
  },
  'spell-resistance': {
    id: 'spell-resistance',
    name: 'Spell Resistance',
    source: 'School of Abjuration (Level 14)',
    description: 'You have advantage on saving throws against spells. You have resistance against the damage of spells.',
    mechanics: 'Grants advantage.',
  },

  // ============================================
  // SCHOOL OF EVOCATION CLASS TRAITS
  // ============================================
  'evocation': {
    id: 'evocation',
    name: 'School of Evocation',
    source: 'School of Evocation (Subclass)',
    description: 'You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid.',
    mechanics: 'You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thu...',
  },
  'evocation-savant': {
    id: 'evocation-savant',
    name: 'Evocation Savant',
    source: 'School of Evocation (Level 2)',
    description: 'The gold and time you must spend to copy an evocation spell into your spellbook is halved.',
    mechanics: 'The gold and time you must spend to copy an evocation spell into your spellbook is halved.',
  },
  'sculpt-spells': {
    id: 'sculpt-spells',
    name: 'Sculpt Spells',
    source: 'School of Evocation (Level 2)',
    description: 'When you cast an evocation spell that affects other creatures, you can choose a number of them equal to 1 + the spell\\',
    mechanics: 'When you cast an evocation spell that affects other creatures, you can choose a number of them equal to 1 + the spell\\.',
  },
  'potent-cantrip': {
    id: 'potent-cantrip',
    name: 'Potent Cantrip',
    source: 'School of Evocation (Level 6)',
    description: 'When a creature succeeds on a saving throw against your cantrip, the creature takes half the cantrip\\',
    mechanics: 'When a creature succeeds on a saving throw against your cantrip, the creature takes half the cantrip\\.',
  },
  'empowered-evocation': {
    id: 'empowered-evocation',
    name: 'Empowered Evocation',
    source: 'School of Evocation (Level 10)',
    description: 'You can add your Intelligence modifier to one damage roll of any wizard evocation spell you cast.',
    mechanics: 'You can add your Intelligence modifier to one damage roll of any wizard evocation spell you cast.',
  },
  'overchannel': {
    id: 'overchannel',
    name: 'Overchannel',
    source: 'School of Evocation (Level 14)',
    description: 'When you cast a wizard spell of 1st through 5th level that deals damage, you can deal maximum damage with that spell. After the first use, you take necrotic damage for each subsequent use.',
    mechanics: 'When you cast a wizard spell of 1st through 5th level that deals damage, you can deal maximum damage with that spell.',
  },

  // ============================================
  // SHADOW CLASS TRAITS
  // ============================================
  'shadow-demon-hunter': {
    id: 'shadow-demon-hunter',
    name: 'Shadow',
    source: 'Shadow (Subclass)',
    description: 'Blend stealth and ranged attacks, striking from darkness.',
    mechanics: 'Blend stealth and ranged attacks, striking from darkness.',
  },
  'shadow-power': {
    id: 'shadow-power',
    name: 'Shadow Power',
    source: 'Shadow (Level 3)',
    description: 'Hide as bonus action once per short rest. First attack from hiding deals +1d8.',
    mechanics: 'Bonus action. Damage: 1d8. Recharge: short/long rest.',
  },
  'multishot': {
    id: 'multishot',
    name: 'Multishot',
    source: 'Shadow (Level 6)',
    description: '15ft cone, 3d6 piercing. DEX save for half.',
    mechanics: 'Damage: 3d6.',
  },
  'rain-of-vengeance': {
    id: 'rain-of-vengeance',
    name: 'Rain of Vengeance',
    source: 'Shadow (Level 14)',
    description: '20ft radius, 6d6 piercing. DEX save for half.',
    mechanics: 'Damage: 6d6.',
  },

  // ============================================
  // SORCERER CLASS TRAITS
  // ============================================
  'sorcerer': {
    id: 'sorcerer',
    name: 'Sorcerer',
    source: 'Sorcerer (Class)',
    description: 'A spellcaster who draws on inherent magic from a gift or bloodline.',
    mechanics: 'A spellcaster who draws on inherent magic from a gift or bloodline.',
  },
  'sorcerous-restoration': {
    id: 'sorcerous-restoration',
    name: 'Sorcerous Restoration',
    source: 'Sorcerer (Level 20)',
    description: 'You regain 4 expended sorcery points whenever you finish a short rest.',
    mechanics: 'Recharge: short/long rest.',
  },

  // ============================================
  // THE ARCHFEY CLASS TRAITS
  // ============================================
  'archfey': {
    id: 'archfey',
    name: 'The Archfey',
    source: 'The Archfey (Subclass)',
    description: 'Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before mortal races were born.',
    mechanics: 'Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before mortal ra...',
  },

  // ============================================
  // THE CELESTIAL CLASS TRAITS
  // ============================================
  'celestial': {
    id: 'celestial',
    name: 'The Celestial',
    source: 'The Celestial (Subclass)',
    description: 'Your patron is a powerful being of the Upper Planes, such as an empyrean, solar, ki-rin, or unicorn. You have a connection to sacred light and radiance.',
    mechanics: 'Your patron is a powerful being of the Upper Planes, such as an empyrean, solar, ki-rin, or unicorn.',
  },
  'healing-light': {
    id: 'healing-light',
    name: 'Healing Light',
    source: 'The Celestial (Level 1)',
    description: 'You have a pool of d6s equal to 1 + warlock level. As a bonus action, you can heal a creature within 60 feet by spending dice from the pool.',
    mechanics: 'Bonus action.',
  },
  'celestial-resilience': {
    id: 'celestial-resilience',
    name: 'Celestial Resilience',
    source: 'The Celestial (Level 10)',
    description: 'You gain temporary HP equal to your warlock level + CHA modifier whenever you finish a short or long rest. Up to 5 allies within 30 feet also gain temporary HP equal to half your warlock level + CHA modifier.',
    mechanics: 'Recharge: short/long rest.',
  },
  'searing-vengeance': {
    id: 'searing-vengeance',
    name: 'Searing Vengeance',
    source: 'The Celestial (Level 14)',
    description: 'When you make a death saving throw at the start of your turn, you can instead spring back with half your HP, then stand and deal radiant damage to enemies within 30 feet.',
    mechanics: 'When you make a death saving throw at the start of your turn, you can instead spring back with half your HP, then sta...',
  },

  // ============================================
  // THE FIEND CLASS TRAITS
  // ============================================
  'fiend': {
    id: 'fiend',
    name: 'The Fiend',
    source: 'The Fiend (Subclass)',
    description: 'You have made a pact with a fiend from the lower planes of existence. Devils, demons, and other dark powers grant you abilities fueled by fire and destruction.',
    mechanics: 'You have made a pact with a fiend from the lower planes of existence.',
  },

  // ============================================
  // THE GREAT OLD ONE CLASS TRAITS
  // ============================================
  'great-old-one': {
    id: 'great-old-one',
    name: 'The Great Old One',
    source: 'The Great Old One (Subclass)',
    description: 'Your patron is a mysterious entity from the Far Realm or beyond the stars.',
    mechanics: 'Your patron is a mysterious entity from the Far Realm or beyond the stars.',
  },

  // ============================================
  // THE HEXBLADE CLASS TRAITS
  // ============================================
  'hexblade': {
    id: 'hexblade',
    name: 'The Hexblade',
    source: 'The Hexblade (Subclass)',
    description: 'You have made your pact with a mysterious entity from the Shadowfell, a force that manifests in sentient magic weapons carved from the stuff of shadow.',
    mechanics: 'You have made your pact with a mysterious entity from the Shadowfell, a force that manifests in sentient magic weapon...',
  },
  'accursed-specter': {
    id: 'accursed-specter',
    name: 'Accursed Specter',
    source: 'The Hexblade (Level 6)',
    description: 'When you slay a humanoid, you can curse its soul to rise as a specter that serves you until your next long rest.',
    mechanics: 'Recharge: long rest.',
  },
  'armor-of-hexes': {
    id: 'armor-of-hexes',
    name: 'Armor of Hexes',
    source: 'The Hexblade (Level 10)',
    description: 'If the target of your Hexblade\\',
    mechanics: 'If the target of your Hexblade\\.',
  },
  'master-of-hexes': {
    id: 'master-of-hexes',
    name: 'Master of Hexes',
    source: 'The Hexblade (Level 14)',
    description: 'When the creature cursed by your Hexblade\\',
    mechanics: 'When the creature cursed by your Hexblade\\.',
  },

  // ============================================
  // THIEF CLASS TRAITS
  // ============================================
  'thief': {
    id: 'thief',
    name: 'Thief',
    source: 'Thief (Subclass)',
    description: 'You hone your skills in the larcenous arts. Burglars, bandits, cutpurses, and other criminals typically follow this archetype.',
    mechanics: 'You hone your skills in the larcenous arts.',
  },

  // ============================================
  // UNHOLY CLASS TRAITS
  // ============================================
  'unholy-death-knight': {
    id: 'unholy-death-knight',
    name: 'Unholy',
    source: 'Unholy (Subclass)',
    description: 'Spread disease and command undead minions.',
    mechanics: 'Spread disease and command undead minions.',
  },
  'raise-dead': {
    id: 'raise-dead',
    name: 'Raise Dead',
    source: 'Unholy (Level 3)',
    description: 'Costs 4 Runic Power. Raise ghoul from corpse for 1 hour. Max ghouls = 1 (increases to 2 at level 11).',
    mechanics: 'Costs 4 Runic Power.',
  },
  'festering-wound': {
    id: 'festering-wound',
    name: 'Festering Wound',
    source: 'Unholy (Level 6)',
    description: 'Costs 2 Runic Power. Target bleeds for 1d4 necrotic per turn for 1 minute. Max 3 wounds. CON save ends effect.',
    mechanics: 'Damage: 1d4.',
  },
  'summon-gargoyle': {
    id: 'summon-gargoyle',
    name: 'Summon Gargoyle',
    source: 'Unholy (Level 14)',
    description: 'Costs 5 Runic Power. Summon gargoyle for 1 minute with 2d8 necrotic ranged attacks.',
    mechanics: 'Damage: 2d8.',
  },

  // ============================================
  // VENGEANCE CLASS TRAITS
  // ============================================
  'vengeance-demon-hunter': {
    id: 'vengeance-demon-hunter',
    name: 'Vengeance',
    source: 'Vengeance (Subclass)',
    description: 'Tanks who use pain to fuel demonic powers.',
    mechanics: 'Tanks who use pain to fuel demonic powers.',
  },
  'demon-spikes': {
    id: 'demon-spikes',
    name: 'Demon Spikes',
    source: 'Vengeance (Level 3)',
    description: '+1 AC, attackers take 1d4 piercing for 1 minute.',
    mechanics: 'Damage: 1d4.',
  },
  'infernal-strike': {
    id: 'infernal-strike',
    name: 'Infernal Strike',
    source: 'Vengeance (Level 6)',
    description: 'Leap 20ft, 2d6 fire damage on landing. DEX save or prone.',
    mechanics: 'Damage: 2d6.',
  },
  'fel-devastation': {
    id: 'fel-devastation',
    name: 'Fel Devastation',
    source: 'Vengeance (Level 14)',
    description: '20ft cone, 2d6 fire/round for 2 rounds. Heal 10% of damage dealt.',
    mechanics: 'Damage: 2d6.',
  },

  // ============================================
  // WARLOCK CLASS TRAITS
  // ============================================
  'warlock': {
    id: 'warlock',
    name: 'Warlock',
    source: 'Warlock (Class)',
    description: 'A wielder of magic derived from a bargain with an extraplanar entity.',
    mechanics: 'A wielder of magic derived from a bargain with an extraplanar entity.',
  },
  'mystic-arcanum-6': {
    id: 'mystic-arcanum-6',
    name: 'Mystic Arcanum (6th level)',
    source: 'Warlock (Level 11)',
    description: 'Your patron bestows upon you a magical secret called an arcanum.',
    mechanics: 'Your patron bestows upon you a magical secret called an arcanum.',
  },
  'mystic-arcanum-7': {
    id: 'mystic-arcanum-7',
    name: 'Mystic Arcanum (7th level)',
    source: 'Warlock (Level 13)',
    description: 'You gain a 7th-level arcanum.',
    mechanics: 'You gain a 7th-level arcanum.',
  },
  'mystic-arcanum-8': {
    id: 'mystic-arcanum-8',
    name: 'Mystic Arcanum (8th level)',
    source: 'Warlock (Level 15)',
    description: 'You gain an 8th-level arcanum.',
    mechanics: 'You gain an 8th-level arcanum.',
  },
  'mystic-arcanum-9': {
    id: 'mystic-arcanum-9',
    name: 'Mystic Arcanum (9th level)',
    source: 'Warlock (Level 17)',
    description: 'You gain a 9th-level arcanum.',
    mechanics: 'You gain a 9th-level arcanum.',
  },

  // ============================================
  // WAY OF SHADOW CLASS TRAITS
  // ============================================
  'shadow': {
    id: 'shadow',
    name: 'Way of Shadow',
    source: 'Way of Shadow (Subclass)',
    description: 'Monks of the Way of Shadow follow a tradition that values stealth and subterfuge.',
    mechanics: 'Monks of the Way of Shadow follow a tradition that values stealth and subterfuge.',
  },
  'shadow-arts': {
    id: 'shadow-arts',
    name: 'Shadow Arts',
    source: 'Way of Shadow (Level 3)',
    description: 'You can use your ki to duplicate the effects of certain spells. You can spend 2 ki points to cast darkness, darkvision, pass without trace, or silence.',
    mechanics: 'You can use your ki to duplicate the effects of certain spells.',
  },
  'shadow-step': {
    id: 'shadow-step',
    name: 'Shadow Step',
    source: 'Way of Shadow (Level 6)',
    description: 'When you are in dim light or darkness, you can use a bonus action to teleport up to 60 feet to an unoccupied space you can see that is also in dim light or darkness.',
    mechanics: 'Bonus action.',
  },
  'cloak-of-shadows': {
    id: 'cloak-of-shadows',
    name: 'Cloak of Shadows',
    source: 'Way of Shadow (Level 11)',
    description: 'When you are in an area of dim light or darkness, you can use your action to become invisible. You remain invisible until you make an attack, cast a spell, or are in an area of bright light.',
    mechanics: 'Action.',
  },
  'opportunist': {
    id: 'opportunist',
    name: 'Opportunist',
    source: 'Way of Shadow (Level 17)',
    description: 'When a creature within 5 feet of you is hit by an attack made by a creature other than you, you can use your reaction to make a melee attack against that creature.',
    mechanics: 'Reaction.',
  },

  // ============================================
  // WAY OF THE OPEN HAND CLASS TRAITS
  // ============================================
  'open-hand': {
    id: 'open-hand',
    name: 'Way of the Open Hand',
    source: 'Way of the Open Hand (Subclass)',
    description: 'Monks of the Way of the Open Hand are the ultimate masters of martial arts combat.',
    mechanics: 'Monks of the Way of the Open Hand are the ultimate masters of martial arts combat.',
  },
  'open-hand-technique': {
    id: 'open-hand-technique',
    name: 'Open Hand Technique',
    source: 'Way of the Open Hand (Level 3)',
    description: 'When you hit a creature with a Flurry of Blows attack, you can impose one of several effects: knock it prone, push it 15 feet away, or prevent it from taking reactions.',
    mechanics: 'Reaction.',
  },
  'wholeness-of-body': {
    id: 'wholeness-of-body',
    name: 'Wholeness of Body',
    source: 'Way of the Open Hand (Level 6)',
    description: 'As an action, you can regain HP equal to three times your monk level.',
    mechanics: 'Action.',
  },
  'tranquility': {
    id: 'tranquility',
    name: 'Tranquility',
    source: 'Way of the Open Hand (Level 11)',
    description: 'At the end of a long rest, you gain the effect of a sanctuary spell that lasts until the start of your next long rest.',
    mechanics: 'Recharge: long rest.',
  },
  'quivering-palm': {
    id: 'quivering-palm',
    name: 'Quivering Palm',
    source: 'Way of the Open Hand (Level 17)',
    description: 'When you hit a creature with an unarmed strike, you can spend 3 ki points to start imperceptible vibrations. You can then use an action to deal 10d10 necrotic damage or reduce the target to 0 HP.',
    mechanics: 'Action. Damage: 10d10.',
  },

  // ============================================
  // WILD MAGIC CLASS TRAITS
  // ============================================
  'wild-magic': {
    id: 'wild-magic',
    name: 'Wild Magic',
    source: 'Wild Magic (Subclass)',
    description: 'Your innate magic comes from the wild forces of chaos that underlie the order of existence.',
    mechanics: 'Your innate magic comes from the wild forces of chaos that underlie the order of existence.',
  },
  'bend-luck': {
    id: 'bend-luck',
    name: 'Bend Luck',
    source: 'Wild Magic (Level 6)',
    description: 'When another creature makes an attack roll, ability check, or saving throw, you can use your reaction and spend 2 sorcery points to roll 1d4 and apply the number as a bonus or penalty.',
    mechanics: 'Reaction. Damage: 1d4.',
  },
  'controlled-chaos': {
    id: 'controlled-chaos',
    name: 'Controlled Chaos',
    source: 'Wild Magic (Level 14)',
    description: 'When you roll on the Wild Magic Surge table, you can roll twice and use either number.',
    mechanics: 'When you roll on the Wild Magic Surge table, you can roll twice and use either number.',
  },
  'spell-bombardment': {
    id: 'spell-bombardment',
    name: 'Spell Bombardment',
    source: 'Wild Magic (Level 18)',
    description: 'When you roll damage for a spell and roll the highest number possible on any of the dice, you can roll that die again and add it to the damage.',
    mechanics: 'When you roll damage for a spell and roll the highest number possible on any of the dice, you can roll that die again...',
  },

  // ============================================
  // WIZARD CLASS TRAITS
  // ============================================
  'wizard': {
    id: 'wizard',
    name: 'Wizard',
    source: 'Wizard (Class)',
    description: 'A scholarly magic-user capable of manipulating the structures of reality through careful study.',
    mechanics: 'A scholarly magic-user capable of manipulating the structures of reality through careful study.',
  },
  'arcane-recovery': {
    id: 'arcane-recovery',
    name: 'Arcane Recovery',
    source: 'Wizard (Level 1)',
    description: 'Once per day during a short rest, you can recover spell slots with a combined level equal to or less than half your wizard level (rounded up).',
    mechanics: 'Recharge: short/long rest.',
  },
  'spell-mastery': {
    id: 'spell-mastery',
    name: 'Spell Mastery',
    source: 'Wizard (Level 18)',
    description: 'Choose a 1st-level and a 2nd-level spell in your spellbook. You can cast those spells at their lowest level without expending a spell slot.',
    mechanics: 'Choose a 1st-level and a 2nd-level spell in your spellbook.',
  },
  'signature-spells': {
    id: 'signature-spells',
    name: 'Signature Spells',
    source: 'Wizard (Level 20)',
    description: 'Choose two 3rd-level spells in your spellbook. You always have them prepared, they don\\',
    mechanics: 'Choose two 3rd-level spells in your spellbook.',
  },


}

// RULES DATA - Game mechanics explanations for new players
