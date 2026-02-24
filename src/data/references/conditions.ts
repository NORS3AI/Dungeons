/**
 * Condition reference data
 * All D&D 5e status conditions and custom conditions
 */
import type { ConditionRef } from './types'

export const CONDITIONS: Record<string, ConditionRef> = {
  'blinded': {
    id: 'blinded',
    name: 'Blinded',
    effects: [
      'A blinded creature can\'t see and automatically fails any ability check that requires sight.',
      'Attack rolls against the creature have advantage, and the creature\'s attack rolls have disadvantage.',
    ],
  },
  'charmed': {
    id: 'charmed',
    name: 'Charmed',
    effects: [
      'A charmed creature can\'t attack the charmer or target the charmer with harmful abilities or magical effects.',
      'The charmer has advantage on any ability check to interact socially with the creature.',
    ],
  },
  'deafened': {
    id: 'deafened',
    name: 'Deafened',
    effects: [
      'A deafened creature can\'t hear and automatically fails any ability check that requires hearing.',
    ],
  },
  'frightened': {
    id: 'frightened',
    name: 'Frightened',
    effects: [
      'A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.',
      'The creature can\'t willingly move closer to the source of its fear.',
    ],
  },
  'grappled': {
    id: 'grappled',
    name: 'Grappled',
    effects: [
      'A grappled creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.',
      'The condition ends if the grappler is incapacitated or if an effect removes the grappled creature from the grappler\'s reach.',
    ],
  },
  'incapacitated': {
    id: 'incapacitated',
    name: 'Incapacitated',
    effects: [
      'An incapacitated creature can\'t take actions or reactions.',
    ],
  },
  'invisible': {
    id: 'invisible',
    name: 'Invisible',
    effects: [
      'An invisible creature is impossible to see without the aid of magic or a special sense.',
      'The creature\'s location can be detected by noise it makes or tracks it leaves.',
      'Attack rolls against the creature have disadvantage, and the creature\'s attack rolls have advantage.',
    ],
  },
  'paralyzed': {
    id: 'paralyzed',
    name: 'Paralyzed',
    effects: [
      'A paralyzed creature is incapacitated and can\'t move or speak.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'Attack rolls against the creature have advantage.',
      'Any attack that hits the creature is a critical hit if the attacker is within 5 feet.',
    ],
  },
  'petrified': {
    id: 'petrified',
    name: 'Petrified',
    effects: [
      'A petrified creature is transformed into a solid inanimate substance. Its weight increases by a factor of ten.',
      'The creature is incapacitated, can\'t move or speak, and is unaware of its surroundings.',
      'Attack rolls against the creature have advantage.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'The creature has resistance to all damage and is immune to poison and disease.',
    ],
  },
  'poisoned': {
    id: 'poisoned',
    name: 'Poisoned',
    effects: [
      'A poisoned creature has disadvantage on attack rolls and ability checks.',
    ],
  },
  'prone': {
    id: 'prone',
    name: 'Prone',
    effects: [
      'A prone creature\'s only movement option is to crawl, unless it stands up.',
      'The creature has disadvantage on attack rolls.',
      'An attack roll against the creature has advantage if the attacker is within 5 feet. Otherwise, the attack roll has disadvantage.',
    ],
  },
  'restrained': {
    id: 'restrained',
    name: 'Restrained',
    effects: [
      'A restrained creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.',
      'Attack rolls against the creature have advantage, and the creature\'s attack rolls have disadvantage.',
      'The creature has disadvantage on Dexterity saving throws.',
    ],
  },
  'stunned': {
    id: 'stunned',
    name: 'Stunned',
    effects: [
      'A stunned creature is incapacitated, can\'t move, and can speak only falteringly.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'Attack rolls against the creature have advantage.',
    ],
  },
  'unconscious': {
    id: 'unconscious',
    name: 'Unconscious',
    effects: [
      'An unconscious creature is incapacitated, can\'t move or speak, and is unaware of its surroundings.',
      'The creature drops whatever it\'s holding and falls prone.',
      'The creature automatically fails Strength and Dexterity saving throws.',
      'Attack rolls against the creature have advantage.',
      'Any attack that hits the creature is a critical hit if the attacker is within 5 feet.',
    ],
  },
  'enraged': {
    id: 'enraged',
    name: 'Enraged',
    effects: [
      'An enraged creature deals +1 damage on all successful attacks.',
      'The creature\'s AC is reduced by 1 due to reckless aggression.',
      'The creature prioritizes offensive actions over defensive maneuvers.',
    ],
  },
  'bleeding-minor': {
    id: 'bleeding-minor',
    name: 'Bleeding (Minor)',
    effects: [
      'The creature takes 1 damage at the start of each of its turns.',
      'A creature can use an action to staunch the bleeding with a DC 10 Wisdom (Medicine) check.',
      'The bleeding stops if the creature receives magical healing.',
    ],
  },
  'bleeding-moderate': {
    id: 'bleeding-moderate',
    name: 'Bleeding (Moderate)',
    effects: [
      'The creature takes 1d4 damage at the start of each of its turns.',
      'A creature can use an action to staunch the bleeding with a DC 12 Wisdom (Medicine) check.',
      'The bleeding stops if the creature receives magical healing.',
    ],
  },
  'bleeding-severe': {
    id: 'bleeding-severe',
    name: 'Bleeding (Severe)',
    effects: [
      'The creature takes 1d6 damage at the start of each of its turns.',
      'A creature can use an action to staunch the bleeding with a DC 15 Wisdom (Medicine) check.',
      'The bleeding stops if the creature receives magical healing of 5 or more hit points.',
    ],
  },
  'broken-bone': {
    id: 'broken-bone',
    name: 'Broken Bone',
    effects: [
      'The creature has disadvantage on all ability checks and attack rolls using the affected limb.',
      'Movement speed is reduced by 10 feet if a leg is broken.',
      'Cannot hold items with both hands if an arm is broken.',
      'Requires medical treatment or magical healing to remove this condition.',
    ],
  },
  'concussed': {
    id: 'concussed',
    name: 'Concussed',
    effects: [
      'The creature has disadvantage on Intelligence checks and concentration saves.',
      'The creature cannot take reactions.',
      'The creature has a -2 penalty to AC.',
      'This condition ends after a short or long rest, or with magical healing.',
    ],
  },
  'infected': {
    id: 'infected',
    name: 'Infected',
    effects: [
      'The creature\'s maximum hit points are reduced by 1d4 per day.',
      'The creature has disadvantage on Constitution saving throws.',
      'Requires medical treatment (DC 15 Medicine check) or magical healing to cure.',
      'If maximum HP reaches 0, the creature dies.',
    ],
  },
}
