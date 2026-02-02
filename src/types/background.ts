/**
 * D&D 5e Background
 * Backgrounds represent a character's life before adventuring
 */

/**
 * Background feature - special ability granted by background
 */
export interface BackgroundFeature {
  id: string
  name: string
  description: string
}

/**
 * Suggested characteristic for roleplaying
 */
export interface SuggestedCharacteristic {
  roll: number // d8 or d6 roll
  text: string
}

/**
 * Background definition
 */
export interface Background {
  id: string
  name: string
  description: string

  // Extended lore for "Read More" section
  lore: string

  // Proficiencies
  skillProficiencies: string[] // Two skills
  toolProficiencies?: string[] // Tools or gaming sets
  languages?: number // Number of languages to choose

  // Equipment
  startingEquipment: string[]
  startingGold: number // Alternative gold amount

  // Feature
  feature: BackgroundFeature

  // Suggested characteristics for roleplaying
  personalityTraits?: SuggestedCharacteristic[]
  ideals?: SuggestedCharacteristic[]
  bonds?: SuggestedCharacteristic[]
  flaws?: SuggestedCharacteristic[]
}

/**
 * Acolyte - Servant of a temple
 */
export const ACOLYTE: Background = {
  id: 'acolyte',
  name: 'Acolyte',
  description:
    'You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world.',
  lore: `From your earliest memories, the scent of incense and the echo of prayer have been your constant companions. You were raised within the sacred walls of a temple, whether dedicated to a god of light, a deity of the harvest, or darker powers that demand sacrifice and devotion.

Your days were filled with ritual: the morning prayers at dawn, the careful maintenance of holy relics, the endless study of sacred texts passed down through generations. You learned to read the signs of the divine—in the flight of birds, the flicker of candle flames, or the words of prophecy spoken by elder priests in their trances.

The faithful came to you seeking guidance, blessings for their newborns, last rites for their dying, and absolution for their sins. You learned that faith is both a comfort and a burden, that the gods speak in whispers that require years of devotion to understand.

Now, whether called by divine vision, sent on holy mission, or driven from your temple by darkness, you carry your faith into a world that desperately needs the light—or the shadow—that only the devoted can provide.`,
  skillProficiencies: ['insight', 'religion'],
  languages: 2,
  startingEquipment: [
    'Holy symbol',
    'Prayer book or prayer wheel',
    '5 sticks of incense',
    'Vestments',
    'Common clothes',
  ],
  startingGold: 15,
  feature: {
    id: 'shelter-of-the-faithful',
    name: 'Shelter of the Faithful',
    description:
      'As an acolyte, you command the respect of those who share your faith. You and your companions can expect free healing and care at temples, shrines, and other established presences of your faith. You can also call upon priests for assistance that won\'t risk their lives.',
  },
  personalityTraits: [
    { roll: 1, text: 'I idolize a particular hero of my faith, and constantly refer to their deeds and example.' },
    { roll: 2, text: 'I can find common ground between the fiercest enemies, empathizing with them.' },
    { roll: 3, text: 'I see omens in every event and action. The gods try to speak to us, we just need to listen.' },
    { roll: 4, text: 'Nothing can shake my optimistic attitude.' },
    { roll: 5, text: 'I quote sacred texts and proverbs in almost every situation.' },
    { roll: 6, text: 'I am tolerant of other faiths and respect the worship of other gods.' },
    { roll: 7, text: 'I\'ve enjoyed fine food, drink, and high society. Rough living grates on me.' },
    { roll: 8, text: 'I\'ve spent so long in the temple that I have little experience dealing with people.' },
  ],
  ideals: [
    { roll: 1, text: 'Tradition. The ancient traditions of worship must be preserved and upheld. (Lawful)' },
    { roll: 2, text: 'Charity. I always try to help those in need, no matter what the personal cost. (Good)' },
    { roll: 3, text: 'Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)' },
    { roll: 4, text: 'Power. I hope to one day rise to the top of my faith\'s hierarchy. (Lawful)' },
    { roll: 5, text: 'Faith. I trust that my deity will guide my actions. I have faith that if I work hard, good things will happen. (Lawful)' },
    { roll: 6, text: 'Aspiration. I seek to prove myself worthy of my god\'s favor by matching my actions against their teachings. (Any)' },
  ],
  bonds: [
    { roll: 1, text: 'I would die to recover an ancient relic of my faith that was lost long ago.' },
    { roll: 2, text: 'I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.' },
    { roll: 3, text: 'I owe my life to the priest who took me in when my parents died.' },
    { roll: 4, text: 'Everything I do is for the common people.' },
    { roll: 5, text: 'I will do anything to protect the temple where I served.' },
    { roll: 6, text: 'I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.' },
  ],
  flaws: [
    { roll: 1, text: 'I judge others harshly, and myself even more severely.' },
    { roll: 2, text: 'I put too much trust in those who wield power within my temple\'s hierarchy.' },
    { roll: 3, text: 'My piety sometimes leads me to blindly trust those that profess faith in my god.' },
    { roll: 4, text: 'I am inflexible in my thinking.' },
    { roll: 5, text: 'I am suspicious of strangers and expect the worst of them.' },
    { roll: 6, text: 'Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.' },
  ],
}

/**
 * Criminal - Life of crime
 */
export const CRIMINAL: Background = {
  id: 'criminal',
  name: 'Criminal',
  description:
    'You are an experienced criminal with a history of breaking the law. You have spent a lot of time among other criminals and still have contacts within the criminal underworld.',
  lore: `The shadows of the city's underbelly have been your home for as long as you can remember. Perhaps poverty forced you into a life of crime, or maybe the thrill of the heist called to something deep within your soul. Whatever the reason, you learned quickly that survival in the criminal world demands cunning, discretion, and absolute loyalty to the right people.

You've run with thieves' guilds in sprawling cities, served as muscle for crime lords, picked pockets in crowded marketplaces, or cracked safes in noble estates while their owners slept peacefully above. You've learned the secret signs chalked on walls, the whispered passwords that open hidden doors, and the unwritten codes that govern those who live outside the law.

The city watch knows your type, but they've never quite caught you—or if they have, you've always found a way to slip free. You've made enemies, certainly, but also allies who would rather die than betray you, bound by the blood oaths and shared secrets of the underworld.

Now you venture beyond the familiar streets, but you carry with you the skills honed in darkness: the ability to move unseen, to speak honeyed lies, and to always, always have a plan for when things go wrong.`,
  skillProficiencies: ['deception', 'stealth'],
  toolProficiencies: ['thieves-tools', 'gaming-set'],
  startingEquipment: [
    'Crowbar',
    'Dark common clothes with hood',
  ],
  startingGold: 15,
  feature: {
    id: 'criminal-contact',
    name: 'Criminal Contact',
    description:
      'You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances.',
  },
  personalityTraits: [
    { roll: 1, text: 'I always have a plan for what to do when things go wrong.' },
    { roll: 2, text: 'I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.' },
    { roll: 3, text: 'The first thing I do in a new place is note the locations of everything valuable—or where such things could be hidden.' },
    { roll: 4, text: 'I would rather make a new friend than a new enemy.' },
    { roll: 5, text: 'I am incredibly slow to trust. Those who seem fairest often have the most to hide.' },
    { roll: 6, text: 'I don\'t pay attention to the risks in a situation. Never tell me the odds.' },
    { roll: 7, text: 'The best way to get me to do something is to tell me I can\'t do it.' },
    { roll: 8, text: 'I blow up at the slightest insult.' },
  ],
  ideals: [
    { roll: 1, text: 'Honor. I don\'t steal from others in the trade. (Lawful)' },
    { roll: 2, text: 'Freedom. Chains are meant to be broken, as are those who would forge them. (Chaotic)' },
    { roll: 3, text: 'Charity. I steal from the wealthy so that I can help people in need. (Good)' },
    { roll: 4, text: 'Greed. I will do whatever it takes to become wealthy. (Evil)' },
    { roll: 5, text: 'People. I\'m loyal to my friends, not to any ideals. (Neutral)' },
    { roll: 6, text: 'Redemption. There\'s a spark of good in everyone. (Good)' },
  ],
  bonds: [
    { roll: 1, text: 'I\'m trying to pay off an old debt I owe to a generous benefactor.' },
    { roll: 2, text: 'My ill-gotten gains go to support my family.' },
    { roll: 3, text: 'Something important was taken from me, and I aim to steal it back.' },
    { roll: 4, text: 'I will become the greatest thief that ever lived.' },
    { roll: 5, text: 'I\'m guilty of a terrible crime. I hope I can redeem myself for it.' },
    { roll: 6, text: 'Someone I loved died because of a mistake I made. That will never happen again.' },
  ],
  flaws: [
    { roll: 1, text: 'When I see something valuable, I can\'t think about anything but how to steal it.' },
    { roll: 2, text: 'When faced with a choice between money and my friends, I usually choose the money.' },
    { roll: 3, text: 'If there\'s a plan, I\'ll forget it. If I don\'t forget it, I\'ll ignore it.' },
    { roll: 4, text: 'I have a "tell" that reveals when I\'m lying.' },
    { roll: 5, text: 'I turn tail and run when things look bad.' },
    { roll: 6, text: 'An innocent person is in prison for a crime that I committed. I\'m okay with that.' },
  ],
}

/**
 * Folk Hero - Champion of the common people
 */
export const FOLK_HERO: Background = {
  id: 'folk-hero',
  name: 'Folk Hero',
  description:
    'You come from a humble social rank, but you are destined for so much more. Already the people of your home village regard you as their champion.',
  lore: `You were born in a small village, a hamlet so unremarkable that it didn't even appear on most maps. Your parents were farmers, millers, or perhaps blacksmiths—honest folk who worked the land and expected you to do the same. And you did, for years, content with the simple rhythms of rural life.

Then came the defining moment. Perhaps a monster threatened your village—a marauding beast, a band of goblin raiders, or an oppressive lord who taxed the people to starvation. When no one else would act, when the mighty looked away and the powerful shrugged, you stood up. With nothing but a pitchfork, a prayer, and the desperate courage of the common folk, you faced the threat.

And you won.

The tale spread like wildfire through the surrounding countryside. Travelers carried stories of the peasant hero to distant taverns. Bards began composing ballads. Children play-acted your victory in the streets. Your name became a symbol of hope for the downtrodden, proof that one person—even the humblest among us—can make a difference.

Now destiny calls you to greater challenges. The people believe in you, and you carry their hopes upon your shoulders as you venture into a wider world filled with dangers that dwarf anything you've faced before.`,
  skillProficiencies: ['animal-handling', 'survival'],
  toolProficiencies: ['artisans-tools', 'vehicles-land'],
  startingEquipment: [
    'Artisan\'s tools (one of your choice)',
    'Shovel',
    'Iron pot',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'rustic-hospitality',
    name: 'Rustic Hospitality',
    description:
      'Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them.',
  },
  personalityTraits: [
    { roll: 1, text: 'I judge people by their actions, not their words.' },
    { roll: 2, text: 'If someone is in trouble, I\'m always ready to lend help.' },
    { roll: 3, text: 'When I set my mind to something, I follow through no matter what gets in my way.' },
    { roll: 4, text: 'I have a strong sense of fair play and always try to find the most equitable solution to arguments.' },
    { roll: 5, text: 'I\'m confident in my own abilities and do what I can to instill confidence in others.' },
    { roll: 6, text: 'Thinking is for other people. I prefer action.' },
    { roll: 7, text: 'I misuse long words in an attempt to sound smarter.' },
    { roll: 8, text: 'I get bored easily. When am I going to get on with my destiny?' },
  ],
  ideals: [
    { roll: 1, text: 'Respect. People deserve to be treated with dignity and respect. (Good)' },
    { roll: 2, text: 'Fairness. No one should get preferential treatment before the law. (Lawful)' },
    { roll: 3, text: 'Freedom. Tyrants must not be allowed to oppress the people. (Chaotic)' },
    { roll: 4, text: 'Might. If I become strong, I can take what I want. (Evil)' },
    { roll: 5, text: 'Sincerity. There\'s no good in pretending to be something I\'m not. (Neutral)' },
    { roll: 6, text: 'Destiny. Nothing can stop me from achieving my greater purpose. (Any)' },
  ],
  bonds: [
    { roll: 1, text: 'I have a family, but I have no idea where they are. I hope to see them again.' },
    { roll: 2, text: 'I worked the land, I love the land, and I will protect the land.' },
    { roll: 3, text: 'A proud noble once gave me a horrible beating, and I will take my revenge.' },
    { roll: 4, text: 'My tools are symbols of my past life, and I carry them so I\'ll never forget my roots.' },
    { roll: 5, text: 'I protect those who cannot protect themselves.' },
    { roll: 6, text: 'I wish my childhood sweetheart had come with me to pursue my destiny.' },
  ],
  flaws: [
    { roll: 1, text: 'The tyrant who rules my land will stop at nothing to see me killed.' },
    { roll: 2, text: 'I\'m convinced of the significance of my destiny, and blind to my shortcomings.' },
    { roll: 3, text: 'The people who knew me when I was young know my shameful secret.' },
    { roll: 4, text: 'I have a weakness for the vices of the city, especially hard drink.' },
    { roll: 5, text: 'Secretly, I believe that things would be better if I were a tyrant ruling the land.' },
    { roll: 6, text: 'I have trouble trusting in my allies.' },
  ],
}

/**
 * Noble - Aristocratic background
 */
export const NOBLE: Background = {
  id: 'noble',
  name: 'Noble',
  description:
    'You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence.',
  lore: `You were born into a life of privilege, your first breath drawn in a castle, manor, or grand estate. Servants attended your every need. Tutors educated you in history, etiquette, languages, and the arts. From your earliest days, you understood that your bloodline carried power—and responsibility.

Your family's name opens doors throughout the realm. Merchants bow when you pass, commoners step aside, and even other nobles treat you with measured respect, knowing that your house commands armies, controls trade routes, or holds ancient magical secrets. You've attended grand balls, negotiated treaties over wine and venison, and learned the subtle art of wielding influence without ever drawing a sword.

But noble life is not without its shadows. Rivals plot against your house, seeking to usurp your lands or destroy your reputation. Family secrets lurk in locked towers and forbidden libraries. The weight of expectation presses heavily—you are expected to marry advantageously, to produce heirs, to uphold the honor of ancestors whose portraits line your halls.

Now you've left the comfort of your estates behind, whether driven by duty, adventure, disgrace, or a desire to prove that you are more than your bloodline. In the wider world, your title means less—but the skills learned in court and the confidence bred into your bones remain your greatest weapons.`,
  skillProficiencies: ['history', 'persuasion'],
  toolProficiencies: ['gaming-set'],
  languages: 1,
  startingEquipment: [
    'Fine clothes',
    'Signet ring',
    'Scroll of pedigree',
  ],
  startingGold: 25,
  feature: {
    id: 'position-of-privilege',
    name: 'Position of Privilege',
    description:
      'Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. Common folk and merchants make every effort to accommodate you.',
  },
  personalityTraits: [
    { roll: 1, text: 'My eloquent flattery makes everyone I talk to feel like the most wonderful person in the world.' },
    { roll: 2, text: 'The common folk love me for my kindness and generosity.' },
    { roll: 3, text: 'No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.' },
    { roll: 4, text: 'I take great pains to always look my best and follow the latest fashions.' },
    { roll: 5, text: 'I don\'t like to get my hands dirty, and I won\'t be caught dead in unsuitable accommodations.' },
    { roll: 6, text: 'Despite my noble birth, I do not place myself above other folk. We all have the same blood.' },
    { roll: 7, text: 'My favor, once lost, is lost forever.' },
    { roll: 8, text: 'If you do me an injury, I will crush you, ruin your name, and salt your fields.' },
  ],
  ideals: [
    { roll: 1, text: 'Respect. Respect is due to me because of my position, but all people deserve to be treated with dignity. (Good)' },
    { roll: 2, text: 'Responsibility. It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)' },
    { roll: 3, text: 'Independence. I must prove that I can handle myself without coddling from my family. (Chaotic)' },
    { roll: 4, text: 'Power. If I can attain more power, no one will tell me what to do. (Evil)' },
    { roll: 5, text: 'Family. Blood runs thicker than water. (Any)' },
    { roll: 6, text: 'Noble Obligation. It is my duty to protect and care for the people beneath me. (Good)' },
  ],
  bonds: [
    { roll: 1, text: 'I will face any challenge to win the approval of my family.' },
    { roll: 2, text: 'My house\'s alliance with another noble family must be sustained at all costs.' },
    { roll: 3, text: 'Nothing is more important than the other members of my family.' },
    { roll: 4, text: 'I am in love with the heir of a family that my family despises.' },
    { roll: 5, text: 'My loyalty to my sovereign is unwavering.' },
    { roll: 6, text: 'The common folk must see me as a hero of the people.' },
  ],
  flaws: [
    { roll: 1, text: 'I secretly believe that everyone is beneath me.' },
    { roll: 2, text: 'I hide a truly scandalous secret that could ruin my family forever.' },
    { roll: 3, text: 'I too often hear veiled insults and threats in every word addressed to me.' },
    { roll: 4, text: 'I have an insatiable desire for carnal pleasures.' },
    { roll: 5, text: 'In fact, the world does revolve around me.' },
    { roll: 6, text: 'By my words and actions, I often bring shame to my family.' },
  ],
}

/**
 * Sage - Dedicated scholar
 */
export const SAGE: Background = {
  id: 'sage',
  name: 'Sage',
  description:
    'You spent years learning the lore of the multiverse. You scoured manuscripts, studied scrolls, and listened to the greatest experts on the subjects that interest you.',
  lore: `While others were learning to swing swords or plant crops, you were lost in books. The great libraries of the world became your true homes—the towering shelves of Candlekeep, the hidden archives of wizard academies, the dusty collections of forgotten monasteries. You devoured knowledge like a starving man at a feast.

Your specialty might be arcane theory, historical records, astronomical observations, or the study of planes beyond the mortal realm. Whatever drew your fascination, you pursued it with single-minded devotion. You've deciphered ancient languages dead for millennia, debated theories with the greatest minds of the age, and uncovered secrets that powerful people would kill to protect—or to possess.

The pursuit of knowledge is rarely without cost. You've sacrificed relationships, wealth, and years of your life in dark rooms lit only by candlelight. Perhaps you've grown socially awkward, more comfortable with texts than with people. Maybe your discoveries have earned you enemies among those who prefer certain truths remain buried.

But your mind is a weapon as sharp as any blade. You know things others cannot imagine, and in a world where knowledge is power, you are mightier than most realize. Now a mystery has drawn you from your studies—a question that cannot be answered from books alone, a secret that demands you seek the truth in the dangerous world beyond library walls.`,
  skillProficiencies: ['arcana', 'history'],
  languages: 2,
  startingEquipment: [
    'Bottle of black ink',
    'Quill',
    'Small knife',
    'Letter from dead colleague with unanswered question',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'researcher',
    name: 'Researcher',
    description:
      'When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. Usually, this comes from a library, scriptorium, university, or a sage.',
  },
  personalityTraits: [
    { roll: 1, text: 'I use polysyllabic words that convey the impression of great erudition.' },
    { roll: 2, text: 'I\'ve read every book in the world\'s greatest libraries—or I like to boast that I have.' },
    { roll: 3, text: 'I\'m used to helping out those who aren\'t as smart as I am, and I patiently explain anything and everything to others.' },
    { roll: 4, text: 'There\'s nothing I like more than a good mystery.' },
    { roll: 5, text: 'I\'m willing to listen to every side of an argument before I make my own judgment.' },
    { roll: 6, text: 'I... speak... slowly... when talking... to idiots... which... almost... everyone... is.' },
    { roll: 7, text: 'I am horribly, horribly awkward in social situations.' },
    { roll: 8, text: 'I\'m convinced that people are always trying to steal my secrets.' },
  ],
  ideals: [
    { roll: 1, text: 'Knowledge. The path to power and self-improvement is through knowledge. (Neutral)' },
    { roll: 2, text: 'Beauty. What is beautiful points us beyond itself toward what is true. (Good)' },
    { roll: 3, text: 'Logic. Emotions must not cloud our logical thinking. (Lawful)' },
    { roll: 4, text: 'No Limits. Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)' },
    { roll: 5, text: 'Power. Knowledge is the path to power and domination. (Evil)' },
    { roll: 6, text: 'Self-Improvement. The goal of a life of study is the betterment of oneself. (Any)' },
  ],
  bonds: [
    { roll: 1, text: 'It is my duty to protect my students.' },
    { roll: 2, text: 'I have an ancient text that holds terrible secrets that must not fall into the wrong hands.' },
    { roll: 3, text: 'I work to preserve a library, university, scriptorium, or monastery.' },
    { roll: 4, text: 'My life\'s work is a series of tomes related to a specific field of lore.' },
    { roll: 5, text: 'I\'ve been searching my whole life for the answer to a certain question.' },
    { roll: 6, text: 'I sold my soul for knowledge. I hope to do great deeds and win it back.' },
  ],
  flaws: [
    { roll: 1, text: 'I am easily distracted by the promise of information.' },
    { roll: 2, text: 'Most people scream and run when they see a demon. I stop and take notes on its anatomy.' },
    { roll: 3, text: 'Unlocking an ancient mystery is worth the price of a civilization.' },
    { roll: 4, text: 'I overlook obvious solutions in favor of complicated ones.' },
    { roll: 5, text: 'I speak without really thinking through my words, invariably insulting others.' },
    { roll: 6, text: 'I can\'t keep a secret to save my life, or anyone else\'s.' },
  ],
}

/**
 * Soldier - Military veteran
 */
export const SOLDIER: Background = {
  id: 'soldier',
  name: 'Soldier',
  description:
    'War has been your life for as long as you care to remember. You trained as a youth, studied the use of weapons and armor, and learned basic survival techniques.',
  lore: `The smell of blood and iron is as familiar to you as a mother's embrace to other folk. You were forged in the fires of war, trained from youth to march, to fight, to kill, and—if fortune favored you—to survive. Whether you served as a common foot soldier in a lord's levy, an elite knight in shining armor, a grizzled mercenary fighting for coin, or a scout ranging far ahead of the main force, warfare has shaped everything you are.

You've stood in shield walls while arrows darkened the sky. You've charged across battlefields slick with blood, screaming war cries that still echo in your nightmares. You've watched friends fall—some dying quickly, others not so fortunate—and learned to keep fighting because stopping meant joining them. The camaraderie of soldiers, the gallows humor, the unbreakable bonds forged between those who face death together: these are things that civilians can never truly understand.

War leaves its marks. Perhaps you bear physical scars from blade or fire. Perhaps the deeper wounds are the ones that don't show—the faces of the fallen that visit you in dreams, the sound of a scream that makes you reach for your weapon even in peaceful times. You've seen the worst of what mortals can do to each other, and somehow, you kept going.

Now the war is over—or perhaps you've simply left it behind. But the soldier's discipline, the warrior's instincts, and the veteran's hard-won wisdom remain. In a world still filled with monsters and conflicts, your skills are far from useless.`,
  skillProficiencies: ['athletics', 'intimidation'],
  toolProficiencies: ['gaming-set', 'vehicles-land'],
  startingEquipment: [
    'Insignia of rank',
    'Trophy from fallen enemy',
    'Bone dice or deck of cards',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'military-rank',
    name: 'Military Rank',
    description:
      'You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses.',
  },
  personalityTraits: [
    { roll: 1, text: 'I\'m always polite and respectful.' },
    { roll: 2, text: 'I\'m haunted by memories of war. I can\'t get the images of violence out of my mind.' },
    { roll: 3, text: 'I\'ve lost too many friends, and I\'m slow to make new ones.' },
    { roll: 4, text: 'I\'m full of inspiring and cautionary tales from my military experience.' },
    { roll: 5, text: 'I can stare down a hell hound without flinching.' },
    { roll: 6, text: 'I enjoy being strong and like breaking things.' },
    { roll: 7, text: 'I have a crude sense of humor.' },
    { roll: 8, text: 'I face problems head-on. A simple, direct solution is the best path to success.' },
  ],
  ideals: [
    { roll: 1, text: 'Greater Good. Our lot is to lay down our lives in defense of others. (Good)' },
    { roll: 2, text: 'Responsibility. I do what I must and obey just authority. (Lawful)' },
    { roll: 3, text: 'Independence. When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)' },
    { roll: 4, text: 'Might. In life as in war, the stronger force wins. (Evil)' },
    { roll: 5, text: 'Live and Let Live. Ideals aren\'t worth killing over or going to war for. (Neutral)' },
    { roll: 6, text: 'Nation. My city, nation, or people are all that matter. (Any)' },
  ],
  bonds: [
    { roll: 1, text: 'I would still lay down my life for the people I served with.' },
    { roll: 2, text: 'Someone saved my life on the battlefield. I will never leave a friend behind.' },
    { roll: 3, text: 'My honor is my life.' },
    { roll: 4, text: 'I\'ll never forget the crushing defeat my company suffered or the enemies who dealt it.' },
    { roll: 5, text: 'Those who fight beside me are those worth dying for.' },
    { roll: 6, text: 'I fight for those who cannot fight for themselves.' },
  ],
  flaws: [
    { roll: 1, text: 'The monstrous enemy we faced in battle still leaves me quivering with fear.' },
    { roll: 2, text: 'I have little respect for anyone who is not a proven warrior.' },
    { roll: 3, text: 'I made a terrible mistake in battle that cost many lives, and I would do anything to keep that secret.' },
    { roll: 4, text: 'My hatred of my enemies is blind and unreasoning.' },
    { roll: 5, text: 'I obey the law, even if the law causes misery.' },
    { roll: 6, text: 'I\'d rather eat my armor than admit when I\'m wrong.' },
  ],
}

/**
 * Charlatan - Master of deception
 */
export const CHARLATAN: Background = {
  id: 'charlatan',
  name: 'Charlatan',
  description:
    'You have always had a way with people. You know what makes them tick, and with a few words you can make them believe anything.',
  lore: `The world is full of fools, and you've made a comfortable living separating them from their coin. You've worn a hundred faces, told a thousand lies, and left a trail of empty pockets and broken hearts across the realm. Some call you a con artist, a swindler, a fraud—you prefer the term "entrepreneur."

Your schemes have ranged from petty street cons to elaborate long games spanning months or years. You've sold fake potions to the desperate, forged documents for the ambitious, and impersonated nobles at grand balls. Each mark is a puzzle, each con a work of art.

Perhaps you started from necessity—a street urchin who learned that a convincing lie was worth more than honest begging. Or maybe you discovered your talent in more comfortable circumstances, finding that people simply believed whatever you told them. Either way, you've honed deception into a razor-sharp skill.

Now you seek bigger games. The adventuring life offers access to wealthy patrons, ancient treasures, and situations where a silver tongue might be worth more than a steel blade.`,
  skillProficiencies: ['deception', 'sleight-of-hand'],
  toolProficiencies: ['disguise-kit', 'forgery-kit'],
  startingEquipment: [
    'Fine clothes',
    'Disguise kit',
    'Props for your con scheme',
  ],
  startingGold: 15,
  feature: {
    id: 'false-identity',
    name: 'False Identity',
    description:
      'You have created a second identity that includes documentation, established acquaintances, and disguises. You can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or handwriting.',
  },
}

/**
 * Entertainer - Performer and artist
 */
export const ENTERTAINER: Background = {
  id: 'entertainer',
  name: 'Entertainer',
  description:
    'You thrive in front of an audience. You know how to entrance them, entertain them, and inspire them.',
  lore: `The stage is your home, the crowd your family, and applause the sweetest music. Whether you're a traveling bard, a court jester, a circus performer, or a street musician, you've dedicated your life to bringing joy, tears, or gasps of wonder to audiences across the land.

You've performed in tavern corners for copper pieces and in grand theaters for noble patrons. You know the power of a well-timed joke, a heart-wrenching ballad, or a death-defying acrobatic feat. Your performances have made crowds laugh until they cried and weep until they forgot their sorrows.

The entertainer's life taught you to read a room instantly—to sense when a crowd is ready to riot or ready to throw coins. You've learned to think on your feet, to improvise when things go wrong, and to always leave them wanting more.

Now adventure calls with its promise of new stories to tell, new songs to compose, and the greatest stage of all: the epic tales of heroes and villains.`,
  skillProficiencies: ['acrobatics', 'performance'],
  toolProficiencies: ['disguise-kit', 'musical-instrument'],
  startingEquipment: [
    'Musical instrument',
    'Favor from an admirer',
    'Costume',
  ],
  startingGold: 15,
  feature: {
    id: 'by-popular-demand',
    name: 'By Popular Demand',
    description:
      'You can always find a place to perform, usually in an inn or tavern. You receive free lodging and food of modest quality in exchange for performing each night.',
  },
}

/**
 * Guild Artisan - Skilled tradesperson
 */
export const GUILD_ARTISAN: Background = {
  id: 'guild-artisan',
  name: 'Guild Artisan',
  description:
    'You are a member of an artisan guild, skilled in a particular field and closely associated with other artisans.',
  lore: `Your hands know the weight of a hammer, the texture of fine leather, or the delicate balance of alchemical compounds. You apprenticed under a master craftsperson, spending years learning techniques passed down through generations. The guild hall became your second home, its traditions and secrets your inheritance.

You've created works of beauty and utility—weapons that sing when swung, furniture that will outlast dynasties, potions that cure the incurable. Your guild mark appears on everything you make, a seal of quality recognized across the realm. Fellow artisans greet you as kin, and you can always find work and shelter in guild halls.

But the workshop's walls grew too confining. You've heard tales of lost techniques, legendary materials, and master artisans who achieved the impossible. Perhaps you seek the adamantine heart of a fallen star to forge the ultimate blade, or the feathers of a phoenix to craft garments of immortal flame.

Adventure offers resources and discoveries no guild can provide.`,
  skillProficiencies: ['insight', 'persuasion'],
  toolProficiencies: ['artisans-tools'],
  languages: 1,
  startingEquipment: [
    'Artisan\'s tools',
    'Letter of introduction from guild',
    'Traveler\'s clothes',
  ],
  startingGold: 15,
  feature: {
    id: 'guild-membership',
    name: 'Guild Membership',
    description:
      'As a member of your guild, you can rely on certain benefits. Your guild offers lodging if available, and you have access to meeting halls, courts, and potentially powerful political connections.',
  },
}

/**
 * Hermit - Reclusive seeker
 */
export const HERMIT: Background = {
  id: 'hermit',
  name: 'Hermit',
  description:
    'You lived in seclusion—either in a sheltered community or entirely alone—for a formative part of your life.',
  lore: `For years, perhaps decades, you withdrew from civilization. Your hermitage might have been a cave in the mountains, a hut in the deepest forest, a monastery at the world's edge, or simply a quiet room where you contemplated the infinite. In that solitude, you found something precious: time to think.

The world outside rushed past, but within your sanctuary, you explored the inner landscapes of meditation, prayer, or scholarly study. You kept meticulous notes on your discoveries. Perhaps you sought enlightenment, communion with nature, or answers to questions that haunted you. Perhaps you simply needed to escape something—or someone.

Solitude taught you patience and self-reliance. You learned to read the subtle signs of weather and season, to survive on little, and to find company in your own thoughts. The silence spoke to you, and in that silence, you discovered a truth that changed everything.

Now you've emerged, carrying knowledge that the crowded world has forgotten or never knew.`,
  skillProficiencies: ['medicine', 'religion'],
  toolProficiencies: ['herbalism-kit'],
  languages: 1,
  startingEquipment: [
    'Scroll case with notes',
    'Winter blanket',
    'Common clothes',
    'Herbalism kit',
  ],
  startingGold: 5,
  feature: {
    id: 'discovery',
    name: 'Discovery',
    description:
      'The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. It might be a great truth, a hidden site, a long-forgotten fact, or a piece of lore.',
  },
}

/**
 * Outlander - Wilderness survivor
 */
export const OUTLANDER: Background = {
  id: 'outlander',
  name: 'Outlander',
  description:
    'You grew up in the wilds, far from civilization and the comforts of town and technology.',
  lore: `Civilization is a cage, and you've never worn its chains. You were raised in the wild places—the trackless forests, the endless plains, the frozen tundra, or the burning deserts. Your tribe, your pack, or simply your own will to survive taught you lessons that city folk can never understand.

You've tracked prey through terrain that would kill the unprepared. You've read the language of the wind, the warnings of the animals, and the secrets written in the stars. Where others see wilderness, you see home. Where they see danger, you see opportunity. The wild has tested you a thousand times, and a thousand times you've proven worthy.

Perhaps you lived among a nomadic tribe, following the herds across continents. Maybe you were raised by wolves, bears, or stranger creatures. Or perhaps you simply wandered, a lone predator in an ecosystem of predators, surviving by wit and will.

Now you've come to the lands of "civilization," and these people with their walls and laws seem as foreign to you as you seem to them.`,
  skillProficiencies: ['athletics', 'survival'],
  toolProficiencies: ['musical-instrument'],
  languages: 1,
  startingEquipment: [
    'Staff',
    'Hunting trap',
    'Trophy from animal',
    'Traveler\'s clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'wanderer',
    name: 'Wanderer',
    description:
      'You have an excellent memory for maps and geography, and can always recall the general layout of terrain and settlements. You can find food and fresh water for yourself and up to five others each day, provided the land offers such resources.',
  },
}

/**
 * Sailor - Sea-faring adventurer
 */
export const SAILOR: Background = {
  id: 'sailor',
  name: 'Sailor',
  description:
    'You sailed on a seagoing vessel for years. You\'ve been in storms, battles at sea, and stranger things.',
  lore: `Salt water runs in your veins. You've spent years—perhaps a lifetime—on ships, learning the rhythms of the sea, the language of the wind, and the songs that sailors sing when land is but a memory. The deck of a ship became as natural to you as solid ground, perhaps more so.

You've weathered storms that would terrify landsmen, navigated by stars through fog-shrouded nights, and watched wonders emerge from the depths: merfolk cities, sea serpents, ghost ships crewed by the damned. You've raided merchant vessels or defended them, smuggled contraband or hunted pirates, explored uncharted islands or delivered passengers across treacherous waters.

The sea is a cruel master, but a fair one. It doesn't care about your birth or your wealth—only whether you can tie a knot, climb a mast, and keep your head when the waves are breaking. You've lost friends to the depths and made brothers of strangers.

Now the sea calls you to new horizons, new adventures, and perhaps the discovery of what lies beyond the maps' edges.`,
  skillProficiencies: ['athletics', 'perception'],
  toolProficiencies: ['navigators-tools', 'vehicles-water'],
  startingEquipment: [
    'Belaying pin (club)',
    '50 feet of silk rope',
    'Lucky charm',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'ships-passage',
    name: 'Ship\'s Passage',
    description:
      'When you need to, you can secure free passage on a sailing ship for yourself and your companions. You might sail on the ship you served on, or another ship you have good relations with.',
  },
}

/**
 * Urchin - Street survivor
 */
export const URCHIN: Background = {
  id: 'urchin',
  name: 'Urchin',
  description:
    'You grew up on the streets alone, orphaned, and poor. You had no one to watch over you, so you learned to provide for yourself.',
  lore: `The streets raised you when no one else would. As a child, you learned that hunger was your enemy, cold your nemesis, and other street children your only family. You slept in alleyways, beneath bridges, in abandoned buildings—anywhere that offered shelter from the elements and the guards.

You learned to move unseen through crowds, to spot an easy mark, to know which merchants left their stalls unguarded and which would chase you down. You learned the hidden geography of the city: the passages between buildings, the tunnels beneath streets, the rooftops that provided escape routes and vantage points.

Every coin was precious, every meal a victory. You developed a network of fellow urchins, beggars, and street folk—the invisible people that the wealthy pretend don't exist. You know the city's true face, the one hidden behind its prosperity and law.

Now you're no longer a helpless child. The skills you learned to survive have become valuable tools, and the world owes you a better life.`,
  skillProficiencies: ['sleight-of-hand', 'stealth'],
  toolProficiencies: ['disguise-kit', 'thieves-tools'],
  startingEquipment: [
    'Small knife',
    'Map of the city',
    'Pet mouse',
    'Token from parents',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'city-secrets',
    name: 'City Secrets',
    description:
      'You know the secret patterns and flow of cities and can find passages through urban sprawl that others would miss. You can travel twice as fast when not in combat, in cities.',
  },
}

/**
 * Haunted One - Touched by darkness
 */
export const HAUNTED_ONE: Background = {
  id: 'haunted-one',
  name: 'Haunted One',
  description:
    'You are haunted by something so terrible that you dare not speak of it. You\'ve tried to bury it and flee from it, but it continues to dog your steps.',
  lore: `There are things in this world that should not be seen, truths that should never be known. You have witnessed such things. Perhaps you stumbled upon a cultist ritual that summoned something from beyond the stars. Maybe you survived a plague that turned your village into shambling horrors. Or perhaps you simply looked too long into the darkness, and something looked back.

The experience shattered your previous life. Friends and family either died in the event or couldn't understand the changed person you became. You've tried to forget—through drink, through travel, through throwing yourself into danger—but the memories persist. The nightmares never end. Sometimes, in the corner of your eye, you see shadows that shouldn't be there.

But your trauma has also hardened you. You've stared into the abyss and survived. You know that monsters are real, that evil exists beyond mortal comprehension, and that the world's apparent normalcy is a thin veneer over howling chaos. This knowledge is both your curse and your shield.

You hunt the darkness now, or perhaps it hunts you.`,
  skillProficiencies: ['investigation', 'survival'],
  languages: 2,
  startingEquipment: [
    'Monster hunter\'s pack',
    'Trinket of special significance',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'heart-of-darkness',
    name: 'Heart of Darkness',
    description:
      'Those who look into your eyes can see that you have faced unimaginable horror. Common folk are afraid of you and will avoid you, but may offer help to get rid of you. You can also identify signs of demonic or undead presence.',
  },
}

/**
 * Cultist (Redeemed) - Former servant of dark powers
 */
export const CULTIST_REDEEMED: Background = {
  id: 'cultist-redeemed',
  name: 'Cultist (Redeemed)',
  description:
    'You once served dark powers, participating in forbidden rituals and unspeakable acts. Now you seek redemption—or at least escape from your former masters.',
  lore: `You remember the first ritual like it was yesterday: the flickering candles, the chanting in languages that hurt to hear, the moment when something answered. At the time, it seemed like power, like truth, like finally belonging somewhere. The cult welcomed you when no one else would.

For months or years, you descended deeper into the darkness. You learned forbidden secrets, participated in ceremonies that stained your soul, and witnessed the true faces of the entities your cult served. The power was intoxicating, the belonging absolute. You were part of something larger than yourself, something eternal.

Then came the moment of clarity. Perhaps you witnessed an atrocity too terrible even for you. Maybe you realized that you weren't a valued servant but a disposable pawn. Or perhaps you simply saw, in a moment of horrible lucidity, what you had become—and what you were becoming.

Escape was terrifying. Your former brothers and sisters hunt you still, and the powers you served do not forget. But you've seen the alternative, and death is preferable to that fate.`,
  skillProficiencies: ['arcana', 'religion'],
  languages: 2,
  startingEquipment: [
    'Tattered cult robes',
    'Hidden holy symbol',
    'Journal of dark secrets',
    'Common clothes',
  ],
  startingGold: 5,
  feature: {
    id: 'forbidden-knowledge',
    name: 'Forbidden Knowledge',
    description:
      'You have insider knowledge of cult operations, can recognize cult symbols and signs, and know how to infiltrate dark organizations. You can identify extraplanar entities and know basic protective wards against possession.',
  },
}

/**
 * Aberrant Scholar - Student of the Far Realm
 */
export const ABERRANT_SCHOLAR: Background = {
  id: 'aberrant-scholar',
  name: 'Aberrant Scholar',
  description:
    'Your academic pursuits led you to study the things that exist beyond reality—the Far Realm and its alien inhabitants.',
  lore: `It began as innocent curiosity. Ancient texts mentioned things from "outside"—entities older than the gods, realms that existed before space and time. Most scholars dismissed these as metaphor or madness. You knew better. You had to know.

Your research took you to forbidden libraries, to crumbling temples of forgotten gods, to the dreams of those driven mad by cosmic truth. Gradually, the pieces came together: there are places beyond the reality we know, and things live there that operate by laws utterly alien to mortal minds.

The knowledge changed you. Your dreams became strange, filled with geometries that shouldn't exist and colors without names. Sometimes you see things that others cannot—or perhaps you see them more clearly than others. Your mind has been expanded, but at what cost?

You've glimpsed the Far Realm's impossible vistas and the beings that dwell there. The experience left you forever changed. Most would call you mad; you call yourself enlightened.`,
  skillProficiencies: ['arcana', 'investigation'],
  languages: 2,
  startingEquipment: [
    'Scholarly robes',
    'Book of aberrant lore',
    'Strange crystal that glows faintly',
    'Writing supplies',
  ],
  startingGold: 10,
  feature: {
    id: 'alien-insight',
    name: 'Alien Insight',
    description:
      'Your exposure to aberrant knowledge allows you to recognize signs of Far Realm influence. You can identify aberrations on sight and know their basic weaknesses. Your dreams sometimes contain prophetic visions.',
  },
}

/**
 * Grave Warden - Guardian of the dead
 */
export const GRAVE_WARDEN: Background = {
  id: 'grave-warden',
  name: 'Grave Warden',
  description:
    'You have spent years tending graveyards and performing funeral rites, ensuring the dead remain at rest.',
  lore: `Death is not an ending—it's a transition, and one that requires careful management. You've dedicated your life to ensuring that the dead find proper rest, that their graves remain undisturbed, and that nothing crawls back from the other side uninvited.

Your days were spent digging graves, preparing bodies, performing last rites, and maintaining the sacred grounds. Your nights were spent patrolling, watching for grave robbers and worse things—the restless spirits, the hungry ghouls, the necromancers who see cemeteries as shopping markets for their dark arts.

You've seen things that would turn most people's hair white: bodies that refused to stay buried, ghosts bound by unfinished business, and the terrible price paid by those who disturb the dead. You've learned the prayers that put spirits to rest, the signs that indicate undead activity, and the techniques for fighting things that are already dead.

The work is grim but necessary. Someone must stand between the living and the dead.`,
  skillProficiencies: ['medicine', 'religion'],
  toolProficiencies: ['herbalism-kit'],
  languages: 1,
  startingEquipment: [
    'Holy symbol',
    'Shovel',
    'Book of funeral rites',
    'Dark robes',
  ],
  startingGold: 10,
  feature: {
    id: 'deathwatch',
    name: 'Deathwatch',
    description:
      'You can sense the presence of undead within 30 feet and know the proper rites for laying most spirits to rest. Undead creatures are hesitant to attack you directly, recognizing you as a keeper of the death covenant.',
  },
}

/**
 * Occult Investigator - Seeker of supernatural mysteries
 */
export const OCCULT_INVESTIGATOR: Background = {
  id: 'occult-investigator',
  name: 'Occult Investigator',
  description:
    'You investigate supernatural occurrences that authorities cannot—or will not—acknowledge.',
  lore: `The world is full of mysteries that defy explanation, and you've made it your mission to solve them. Haunted houses, mysterious disappearances, cursed objects, demonic possessions—these are the cases that come to you when the city watch throws up their hands and the temples offer only prayers.

Your methods combine detective work with occult knowledge. You interview witnesses, examine crime scenes, research historical records, and consult ancient texts. When necessary, you perform rituals, create protective wards, and confront entities that most people refuse to believe exist.

You've seen the supernatural's fingerprints everywhere: the politician controlled by a devil's whispers, the merchant whose success comes from a pact with something hungry, the orphanage built over a site of ancient sacrifice. You've become skilled at recognizing the signs and following the threads of otherworldly corruption.

The work is dangerous and often thankless. The powerful prefer their secrets stay hidden, and the entities you investigate don't appreciate the attention.`,
  skillProficiencies: ['investigation', 'arcana'],
  toolProficiencies: ['thieves-tools'],
  languages: 1,
  startingEquipment: [
    'Magnifying glass',
    'Journal of case notes',
    'Protective amulet',
    'Common clothes',
  ],
  startingGold: 15,
  feature: {
    id: 'case-files',
    name: 'Case Files',
    description:
      'You have extensive notes on supernatural phenomena and can quickly research supernatural occurrences. You know contacts in law enforcement, journalism, and occult circles who might provide information or assistance.',
  },
}

/**
 * Eldritch Touched - Marked by cosmic entities
 */
export const ELDRITCH_TOUCHED: Background = {
  id: 'eldritch-touched',
  name: 'Eldritch Touched',
  description:
    'Something from beyond the stars has taken an interest in you, leaving a mark upon your very soul.',
  lore: `You remember the night when the stars aligned in a pattern unknown to any astronomer, when the sky seemed to crack open and something vast gazed down at you. It saw you—truly saw you—and in that moment of cosmic attention, something fundamental changed.

The entity—if "entity" is even the right word for something so alien—left its mark upon you. Perhaps it's a strange birthmark that seems to shift when no one is watching, or a melody that plays in your mind at odd hours, or dreams filled with impossible geometries and colors that have no names. Whatever form it takes, you carry a piece of the beyond within you.

Some touched ones go mad, their fragile minds shattered by contact with the infinite. Others become prophets, cult leaders, or hermits babbling warnings that no one heeds. You've managed to maintain your sanity—mostly—but you're forever changed. The world seems thinner now, its reality more fragile. Sometimes you see through the cracks.

The entity watches you still. What it wants, you cannot imagine.`,
  skillProficiencies: ['insight', 'arcana'],
  languages: 2,
  startingEquipment: [
    'Strange robes that don\'t quite look right',
    'Pendant that hums faintly',
    'Journal filled with incomprehensible writings',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'beyond-sight',
    name: 'Beyond Sight',
    description:
      'Your connection to otherworldly forces grants you occasional flashes of insight. Once per long rest, you can receive cryptic guidance about a current problem. Your strange nature unnerves extraplanar beings.',
  },
}

/**
 * Plague Survivor - Escaped death's embrace
 */
export const PLAGUE_SURVIVOR: Background = {
  id: 'plague-survivor',
  name: 'Plague Survivor',
  description:
    'You survived a devastating plague that killed everyone around you. The experience left deep scars—physical and psychological.',
  lore: `The sickness came without warning. One day, people coughed. The next, they bled from their eyes. Within weeks, your village, your neighborhood, your family—all of them were gone. Bodies piled in the streets faster than anyone could bury them. The healthy fled, and the sick were left to die alone.

Somehow, you survived. The fever burned through you for days that felt like years, and you emerged on the other side, weak and alone among the corpses of everyone you'd ever known. The plague left its mark on your body—scars, perhaps, or a persistent cough, or skin that never quite looks healthy.

But you lived. While others succumbed, you endured. You developed an almost supernatural resistance to disease, and death no longer frightens you the way it once did—you've seen too much of it. You've walked through mass graves, helped burn the bodies of children, and learned that life is fragile and precious beyond measure.

Now you carry the memory of the dead with you, and perhaps a mission to ensure such devastation never happens again.`,
  skillProficiencies: ['medicine', 'survival'],
  toolProficiencies: ['herbalism-kit'],
  languages: 1,
  startingEquipment: [
    'Herbalism kit',
    'Face mask and gloves',
    'Journal of symptoms and treatments',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'plague-resistance',
    name: 'Plague Resistance',
    description:
      'Your survival has granted you exceptional resistance to disease. You have advantage on saving throws against diseases and can recognize the early symptoms of most plagues and contagions.',
  },
}

/**
 * Nightmare Walker - Traveler of dark dreams
 */
export const NIGHTMARE_WALKER: Background = {
  id: 'nightmare-walker',
  name: 'Nightmare Walker',
  description:
    'Your dreams take you to dark places—the nightmare realm, the domains of sleeping gods, and the fears of mortal minds.',
  lore: `Sleep has never been restful for you. Since childhood, your dreams have been portals to other places—not the soft fantasies of normal sleepers, but the screaming landscapes of pure nightmare. You've walked through forests of teeth, swam in seas of blood, and conversed with things that wear human faces like ill-fitting masks.

At first, you feared your dreams. You did everything to avoid sleep: potions, prayers, nights spent in desperate wakefulness. Nothing worked. Eventually, you realized that the nightmare realm responded to will. You could shape the darkness, navigate its horrors, even draw power from its depths.

Now you walk freely in the realm of nightmares. You've met others there—fellow travelers, imprisoned souls, and entities that have slept since before the world was young. You've learned secrets whispered only in dreams and developed abilities that work in both the waking and sleeping worlds.

But the nightmare realm never truly lets go. Sometimes its shadows bleed into your waking hours.`,
  skillProficiencies: ['arcana', 'insight'],
  languages: 2,
  startingEquipment: [
    'Dream journal',
    'Sleeping herbs',
    'Dreamcatcher amulet',
    'Dark robes',
  ],
  startingGold: 10,
  feature: {
    id: 'dream-walker',
    name: 'Dream Walker',
    description:
      'You can enter others\' dreams if you sleep near them, though you cannot directly harm them there. You can also receive messages in your dreams from far away and sometimes see prophetic visions.',
  },
}

/**
 * Bloodline Inheritor - Bearer of cursed ancestry
 */
export const BLOODLINE_INHERITOR: Background = {
  id: 'bloodline-inheritor',
  name: 'Bloodline Inheritor',
  description:
    'Your family carries a supernatural legacy—a blessing or curse passed down through generations.',
  lore: `The power runs in your blood, and has for generations beyond counting. Perhaps an ancestor made a pact with a demon lord, or a god blessed your line for some forgotten service, or your family simply carries the genetic echo of something ancient and not quite human. Whatever the source, you were born different.

You grew up knowing you were special—and knowing that specialness came with a price. Strange abilities manifested in childhood: dreams that predicted the future, an affinity for fire, or the ability to see spirits that others couldn't. Your family had rituals and traditions designed to manage the bloodline's power, to channel it safely and pass it on to the next generation.

But the bloodline also attracts attention. Enemies who destroyed your ancestors still hunt their descendants. Entities who made deals with your forebears expect you to honor ancient contracts. The power in your veins calls to things that would consume you to steal it for themselves.

You carry both your family's gift and its burden.`,
  skillProficiencies: ['history', 'arcana'],
  languages: 2,
  startingEquipment: [
    'Family grimoire',
    'Ancestral amulet',
    'Portrait of an ancestor',
    'Fine clothes',
  ],
  startingGold: 15,
  feature: {
    id: 'blood-memory',
    name: 'Blood Memory',
    description:
      'You can sometimes access memories from your ancestors, gaining insight into ancient history and forgotten secrets. Once per long rest, you can call upon blood memory for advantage on a History check.',
  },
}

/**
 * Exile - Cast out from home
 */
export const EXILE: Background = {
  id: 'exile',
  name: 'Exile',
  description:
    'You were banished from your homeland for crimes real or imagined. Now you wander, forever an outsider.',
  lore: `Home is a concept you can only remember, never experience. You were cast out—exiled from your kingdom, expelled from your guild, ostracized from your tribe, or excommunicated from your faith. The gates closed behind you, and you were told never to return on pain of death.

Perhaps you deserved it. Perhaps you committed a crime so terrible that banishment was mercy compared to execution. Or perhaps you were innocent, framed by political enemies, scapegoated for disasters you didn't cause, or simply born into the wrong faction when the wrong side won.

The early days of exile were the hardest. You had to learn new customs, new languages, new ways of survival. Every stranger was a potential enemy, every town a place you might be recognized and turned away. Slowly, you adapted. You learned to live as a perpetual outsider, to find comfort in anonymity and freedom in having nothing to lose.

Now the world is your home, or perhaps nowhere is.`,
  skillProficiencies: ['deception', 'survival'],
  languages: 2,
  startingEquipment: [
    'Traveler\'s clothes',
    'Token from homeland',
    'Map of trade routes',
    'Hidden blade',
  ],
  startingGold: 10,
  feature: {
    id: 'anonymous',
    name: 'Anonymous',
    description:
      'You\'ve become skilled at avoiding notice and creating false identities. You can blend into any crowd and know how to find underground networks that help those who live outside the law.',
  },
}

/**
 * Failed Apprentice - Couldn't complete training
 */
export const FAILED_APPRENTICE: Background = {
  id: 'failed-apprentice',
  name: 'Failed Apprentice',
  description:
    'You began training in a prestigious field—wizardry, knighthood, priesthood—but couldn\'t complete your education.',
  lore: `You had potential. Everyone said so. You were accepted into a prestigious academy, taken on by a renowned master, or admitted to an exclusive order. Your future seemed assured: you would become a wizard, a knight, a priest, or some other honored profession. The training was hard, but you were determined.

Then something went wrong. Perhaps you couldn't master a crucial skill. Perhaps you violated a sacred rule. Perhaps political machinations targeted you, or a jealous rival sabotaged your efforts. Whatever the cause, you were dismissed, sent away in disgrace. Your dreams shattered, your potential unfulfilled.

The experience left you with fragmentary knowledge—enough to be dangerous, not enough to be powerful. You know how to cast the first gestures of spells you can't complete, remember the beginning of rituals you never mastered, and recall lessons that your former masters probably wish you'd forget.

But failure is not the end. Many who now walk the paths of adventure found their true calling only after their first path collapsed.`,
  skillProficiencies: ['arcana', 'history'],
  languages: 2,
  startingEquipment: [
    'Incomplete spellbook or training manual',
    'Letter of expulsion',
    'Academic robes (slightly damaged)',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'fragmentary-training',
    name: 'Fragmentary Training',
    description:
      'You retain some knowledge from your incomplete training. You can attempt to use skills from your former profession at disadvantage, and your former institution might provide grudging assistance if you can prove yourself reformed.',
  },
}

/**
 * Bounty Hunter - Professional tracker of prey
 */
export const BOUNTY_HUNTER: Background = {
  id: 'bounty-hunter',
  name: 'Bounty Hunter',
  description:
    'You make your living tracking down fugitives and criminals for reward money.',
  lore: `Justice has a price, and you know exactly how to collect it. You've spent years tracking fugitives across every terrain imaginable: through city slums and noble estates, across frozen tundra and burning deserts, into dungeon depths and mountain strongholds. When someone doesn't want to be found, you find them anyway.

Your methods are pragmatic rather than heroic. You study your quarry's habits, interview their associates (willingly or otherwise), and follow trails that most people can't even see. You've learned to think like criminals, to anticipate their moves, and to set traps they never see coming.

The work isn't always clean. Sometimes you bring back corpses instead of prisoners. Sometimes the "criminals" you hunt turn out to be innocents framed by corrupt authorities. You've developed your own code for navigating these moral ambiguities—it might not satisfy philosophers, but it lets you sleep at night.

Now you hunt bigger game.`,
  skillProficiencies: ['investigation', 'survival'],
  toolProficiencies: ['thieves-tools'],
  languages: 1,
  startingEquipment: [
    'Manacles',
    'Set of wanted posters',
    'Hunting trap',
    'Traveler\'s clothes',
  ],
  startingGold: 15,
  feature: {
    id: 'hunters-quarry',
    name: 'Hunter\'s Quarry',
    description:
      'You have contacts in law enforcement and criminal networks. You can quickly learn if a person is wanted by authorities and can access bounty board postings in most settlements.',
  },
}

/**
 * Gladiator - Arena survivor
 */
export const GLADIATOR: Background = {
  id: 'gladiator',
  name: 'Gladiator',
  description:
    'You fought for the entertainment of crowds in the arenas, where combat is as much performance as violence.',
  lore: `The roar of the crowd is a drug more potent than any potion. You've felt it wash over you as you stood victorious in blood-soaked sand, your weapon raised, your opponents broken at your feet. The arena was your stage, combat your art, and survival your greatest performance.

Perhaps you were a slave, forced to fight for others' profit. Perhaps you were a criminal, given a choice between the arena and the executioner. Or perhaps you chose this life, drawn by glory, gold, or the simple thrill of combat. Whatever brought you to the sands, you proved yourself worthy of survival.

You've fought against other gladiators, against wild beasts, against monsters dragged from dungeons for public spectacle. You've learned to read opponents instantly, to sense the crowd's mood, and to turn impending defeat into dramatic victory. Your scars are your medals, your fighting style your signature.

But the arena's walls grew too confining. You've proven yourself the best within those walls—now it's time to test yourself in the wider world.`,
  skillProficiencies: ['athletics', 'performance'],
  toolProficiencies: ['gaming-set'],
  languages: 1,
  startingEquipment: [
    'Exotic weapon of choice',
    'Fan letter',
    'Costume',
    'Common clothes',
  ],
  startingGold: 15,
  feature: {
    id: 'arena-fame',
    name: 'Arena Fame',
    description:
      'Your fighting style is recognizable, and fans may approach you. You can find free lodging and meals from admirers, and can always find a fighting pit or arena where you can earn money through combat.',
  },
}

/**
 * Archaeologist - Seeker of ancient secrets
 */
export const ARCHAEOLOGIST: Background = {
  id: 'archaeologist',
  name: 'Archaeologist',
  description:
    'You\'ve made your career uncovering the ruins of fallen civilizations and claiming their treasures.',
  lore: `The dead speak to those who know how to listen. Not through necromancy, but through the artifacts they left behind: the pottery shards, the crumbling inscriptions, the architectural choices that reveal how ancient peoples thought and lived. You've learned their language, and ruins have become libraries to you.

You've crawled through collapsing tombs, deciphered scripts dead for millennia, and held objects that hadn't been touched by living hands since before your great-great-grandparents were born. Each dig is a chance to resurrect forgotten history, to give voice to civilizations that would otherwise be lost to time.

The work is dangerous. Ancient sites are often protected by traps that still function perfectly after thousands of years. Curses laid by long-dead priests can still strike down the unwary. And there are always rivals—other archaeologists, treasure hunters, and those who believe certain knowledge should stay buried.

But the discoveries make it worthwhile. You've held crown jewels of fallen empires, you've read the private thoughts of legendary rulers, and you've stood in chambers that changed the world.`,
  skillProficiencies: ['history', 'survival'],
  toolProficiencies: ['cartographers-tools'],
  languages: 1,
  startingEquipment: [
    'Map case with expedition maps',
    'Trowel and brush',
    'Journal of discoveries',
    'Traveler\'s clothes',
  ],
  startingGold: 25,
  feature: {
    id: 'dust-digger',
    name: 'Dust Digger',
    description:
      'You can identify the approximate age and culture of origin of most artifacts. You know how to find promising dig sites and can navigate ancient ruins with expertise, recognizing common trap patterns.',
  },
}

/**
 * Inheritor - Left a mysterious legacy
 */
export const INHERITOR: Background = {
  id: 'inheritor',
  name: 'Inheritor',
  description:
    'You have inherited something of great value—not just gold, but something that carries responsibility and perhaps danger.',
  lore: `The will was read in a dusty solicitor's office, and your life changed forever. A relative you barely knew—or perhaps never knew existed—had left you something extraordinary. Not mere gold or property, but something that carries weight and purpose: a magical weapon, a title to contested lands, a book of forbidden secrets, or perhaps an ancient obligation.

With the inheritance came expectations. Distant relatives emerged from nowhere, each with claims on your legacy. Ancient enemies of your family line renewed their attention. Strangers who recognized what you carried began to watch you with calculating eyes. The gift was also a burden, and the burden was also a target.

But you also inherited power. Whatever your legacy might be, it grants you resources and capabilities beyond those of ordinary people. You're learning to use it, to understand its history, and to decide what you want to do with this unexpected gift.

Some inheritances are curses. Some are blessings. Most are both.`,
  skillProficiencies: ['history', 'persuasion'],
  toolProficiencies: ['gaming-set'],
  languages: 1,
  startingEquipment: [
    'Your inheritance',
    'Documentation of ownership',
    'Traveler\'s clothes',
  ],
  startingGold: 15,
  feature: {
    id: 'inheritance',
    name: 'Inheritance',
    description:
      'You possess a valuable inheritance that may be an item, a title, a secret, or an obligation. This inheritance connects you to a larger story and may grant you unique resources or responsibilities.',
  },
}

/**
 * Monster Slayer - Hunter of supernatural prey
 */
export const MONSTER_SLAYER: Background = {
  id: 'monster-slayer',
  name: 'Monster Slayer',
  description:
    'You have dedicated your life to hunting and destroying monsters that threaten civilization.',
  lore: `The monsters are real, and someone has to stop them. While others cower behind walls and pray for protection, you sharpen your blade, check your silver bolts, and walk into the darkness. You've made it your calling to hunt the creatures that haunt nightmares and devour the innocent.

Perhaps monsters destroyed everything you loved, and vengeance drove you onto this path. Perhaps a mentor trained you in the ancient arts of monster hunting. Or perhaps you simply recognized your calling the first time you faced a creature from the dark and discovered you weren't afraid.

You know the weaknesses of vampires and werewolves, the vulnerabilities of demons and undead, and the signs that reveal a monster's presence before the bodies start appearing. You carry specialized weapons—silver, cold iron, blessed blades—and you know how to use them. You've faced things that would drive ordinary people mad with terror, and you've won.

The work never ends. For every monster you destroy, more lurk in the shadows.`,
  skillProficiencies: ['arcana', 'survival'],
  toolProficiencies: ['herbalism-kit'],
  languages: 1,
  startingEquipment: [
    'Monster hunter\'s kit',
    'Silver weapon',
    'Journal of monster lore',
    'Traveler\'s clothes',
  ],
  startingGold: 15,
  feature: {
    id: 'monster-lore',
    name: 'Monster Lore',
    description:
      'You can identify most common monsters and know their basic weaknesses. You have contacts in monster hunting circles and can find specialized equipment and information about local supernatural threats.',
  },
}

/**
 * Mercenary Veteran - Professional soldier for hire
 */
export const MERCENARY_VETERAN: Background = {
  id: 'mercenary-veteran',
  name: 'Mercenary Veteran',
  description:
    'You\'ve fought for coin rather than country, selling your martial skills to the highest bidder.',
  lore: `War is a trade, and you're a professional. You've fought under a dozen flags for a dozen paymasters, your loyalty lasting exactly as long as the gold. You've defended merchant caravans, guarded noble estates, suppressed peasant rebellions, and joined both sides of more civil wars than you can count.

The mercenary life stripped away any illusions about honor and glory. You've seen what war really looks like: the bodies, the looting, the commanders who spend soldiers' lives like copper coins. You've learned to trust only your brothers-and-sisters-in-arms—the fellow mercenaries who watch your back because you watch theirs, until the contract ends.

You've worked for the righteous and the wicked, protected the innocent and threatened them, because money spends the same regardless of its source. Perhaps you've developed your own code, drawing lines you won't cross. Or perhaps you've learned to swallow any reservation when the price is right.

Now you fight for your own purposes, whatever those might be.`,
  skillProficiencies: ['athletics', 'persuasion'],
  toolProficiencies: ['gaming-set', 'vehicles-land'],
  startingEquipment: [
    'Uniform of former company',
    'Insignia of rank',
    'Gaming set',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'mercenary-life',
    name: 'Mercenary Life',
    description:
      'You know how mercenary companies operate and can quickly find work or information about military matters. You can identify former mercenaries by their bearing and equipment, creating an instant network of contacts.',
  },
}

/**
 * Spy - Agent of hidden powers
 */
export const SPY: Background = {
  id: 'spy',
  name: 'Spy',
  description:
    'You\'ve worked as a spy for a government, organization, or private patron, gathering secrets and manipulating events from the shadows.',
  lore: `Your true face is the one nobody sees. You've lived double lives, worn false identities like masks, and moved through the world as a ghost. The secrets you've gathered have toppled governments, destroyed families, and saved kingdoms—often without anyone knowing you existed.

Your training covered every aspect of the spy's craft: surveillance and counter-surveillance, code-breaking and code-making, disguise and detection, seduction and assassination. You learned to trust no one, to assume every friendship might be false, and to always, always have an exit strategy.

The work has left its marks. You find it difficult to form genuine connections, to let down your guard, to be simply yourself. Every conversation is analyzed for hidden meanings, every stranger evaluated as a potential threat or asset. You've done terrible things for what your masters called the greater good—or perhaps simply for gold.

Now you operate independently, but the skills remain. The mask is part of your face.`,
  skillProficiencies: ['deception', 'stealth'],
  toolProficiencies: ['thieves-tools', 'disguise-kit'],
  startingEquipment: [
    'Disguise kit',
    'Coded message from handler',
    'Dark clothes',
    'Hidden blade',
  ],
  startingGold: 15,
  feature: {
    id: 'spy-network',
    name: 'Spy Network',
    description:
      'You have a network of contacts who can provide intelligence, safe houses, and dead drops. You can communicate in codes that your former organization understands, and you know how to recognize other operatives.',
  },
}

/**
 * Urban Bounty Hunter - City stalker
 */
export const URBAN_BOUNTY_HUNTER: Background = {
  id: 'urban-bounty-hunter',
  name: 'Urban Bounty Hunter',
  description:
    'You\'ve specialized in hunting fugitives through the complex terrain of city streets.',
  lore: `The city is a jungle, and you're its apex predator. While some bounty hunters track their quarry through forests and mountains, you've mastered the urban environment: the maze of streets and alleys, the networks of informants, the unofficial hierarchies of criminal organizations.

You know every neighborhood's character, from wealthy estates to slum warrens. You know which gangs control which territories, which merchants deal in stolen goods, which corrupt officials can be bribed for information. The city's millions of inhabitants are your cover—there's no better place to hide than a crowd, and no better place to hunt.

Your methods are adapted to urban realities. You cultivate relationships with innkeepers, beggars, and street children who see everything. You've learned to pick locks, forge documents, and fight in the confined spaces of buildings. When a fugitive thinks they're safe in the city's anonymous embrace, they find you waiting.

The city never sleeps, and neither do you.`,
  skillProficiencies: ['investigation', 'stealth'],
  toolProficiencies: ['thieves-tools'],
  languages: 1,
  startingEquipment: [
    'Manacles',
    'City maps',
    'Disguise kit',
    'Common clothes',
  ],
  startingGold: 20,
  feature: {
    id: 'city-secrets',
    name: 'Urban Network',
    description:
      'You have an extensive network of informants in urban areas: street children, tavern keepers, guards, and criminals who owe you favors. You can quickly learn about individuals and events in any city you visit.',
  },
}

/**
 * Clan Crafter - Dwarven artisan tradition
 */
export const CLAN_CRAFTER: Background = {
  id: 'clan-crafter',
  name: 'Clan Crafter',
  description:
    'You were raised in a dwarven clan, learning the ancient craft traditions that have been passed down for millennia.',
  lore: `Deep beneath the mountains, in the forge-lit halls of your ancestors, you learned the secrets that make dwarven craftsmanship legendary. Your clan's traditions date back to the earliest days, when the first dwarves were taught by the gods themselves to work stone and metal into beauty and function.

Every stroke of the hammer is a prayer, every finished piece an offering to the ancestors who watch over your work. You learned not just technique, but history—the stories of every great craftsperson in your lineage, the meaning of every symbol and pattern, the proper rituals for each stage of creation.

But the outside world called to you. Perhaps you seek rare materials that can only be found beyond the mountain halls. Perhaps clan politics drove you away. Or perhaps you simply yearned to see the sky, to learn what other races create, and to test your skills against the world's challenges.

You carry your clan's traditions with you, and one day you'll return with treasures and knowledge to enrich your people.`,
  skillProficiencies: ['history', 'insight'],
  toolProficiencies: ['artisans-tools'],
  languages: 1,
  startingEquipment: [
    'Artisan\'s tools',
    'Clan signet',
    'Stone from ancestral mountain',
    'Traveler\'s clothes',
  ],
  startingGold: 15,
  feature: {
    id: 'clan-respect',
    name: 'Clan Respect',
    description:
      'Dwarves recognize your clan mark and accord you respect. You can always find lodging with dwarven communities and have advantage on social interactions with dwarves who value traditional crafts.',
  },
}

/**
 * Cloistered Scholar - Academic recluse
 */
export const CLOISTERED_SCHOLAR: Background = {
  id: 'cloistered-scholar',
  name: 'Cloistered Scholar',
  description:
    'You spent years in a great library or academy, immersed in the pursuit of knowledge and isolated from the world.',
  lore: `The great library was your universe. Its towering shelves contained more knowledge than any mortal could absorb in a hundred lifetimes, and you tried anyway. You spent years—decades, perhaps—reading, copying, researching, and debating in its hushed halls.

Your days followed scholarly rhythms: morning lectures, afternoon research, evening discussions with fellow academics over simple meals. The outside world existed only as a subject of study, something to be read about rather than experienced. Wars rose and fell, kingdoms crumbled and formed, and you noticed only when the treaties or histories arrived for cataloging.

But pure scholarship reached its limits. Some questions can't be answered from books. Some knowledge exists only in ruins that must be explored, in witnesses who must be interviewed, in phenomena that must be observed firsthand. The library gave you the framework; now you must fill it with experience.

Besides, there might be books out there that even your great library doesn't possess.`,
  skillProficiencies: ['history', 'arcana'],
  languages: 2,
  startingEquipment: [
    'Scholar\'s robes',
    'Writing supplies',
    'Borrowed book',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'library-access',
    name: 'Library Access',
    description:
      'You have access to the great library that trained you, and can request research assistance by mail. You know how to navigate other libraries and can quickly find relevant information in any collection.',
  },
}

/**
 * Courtier - Political operator
 */
export const COURTIER: Background = {
  id: 'courtier',
  name: 'Courtier',
  description:
    'You\'ve served in a noble court, navigating the treacherous waters of political intrigue.',
  lore: `The court is a battlefield where words are weapons and smiles are shields. You've spent years navigating its treacherous currents: the alliances that shift with every whisper, the ambitions that lurk behind every bow, the secrets that can destroy or elevate entire families.

You learned to read faces like books, to hear what's not being said, and to say nothing that could be used against you. You attended endless balls, ceremonies, and private audiences, mastering the dance of etiquette and the art of subtle manipulation. Your rivals have been nobles, ministers, and foreign ambassadors—all playing the same game for stakes of power and survival.

Perhaps you served a specific monarch or noble house. Perhaps you were a freelance agent, offering your services to whoever paid best. Either way, you've seen behind the mask of civilization that courts present to the world, and you know how power really works.

Now you take your skills beyond the palace walls.`,
  skillProficiencies: ['insight', 'persuasion'],
  languages: 2,
  startingEquipment: [
    'Fine clothes',
    'Letters of recommendation',
    'Signet ring',
  ],
  startingGold: 15,
  feature: {
    id: 'court-functionary',
    name: 'Court Functionary',
    description:
      'You understand court protocols and can navigate bureaucracy efficiently. You can secure audiences with nobles and officials, and you recognize the signs of court intrigue when you see them.',
  },
}

/**
 * Far Traveler - From distant lands
 */
export const FAR_TRAVELER: Background = {
  id: 'far-traveler',
  name: 'Far Traveler',
  description:
    'You came from a distant land, with customs, beliefs, and knowledge unknown to the people around you.',
  lore: `You are a stranger in a strange land. Your homeland lies beyond the maps most people use, across oceans or continents, perhaps even across planes of existence. Everything here is different: the food, the customs, the way people dress and pray and fight. They stare at you, and you stare back, both equally bewildered.

Your journey here was long and arduous. You crossed seas that had never seen your people's sails, traveled through kingdoms that had never heard your language, and endured trials that would have broken lesser travelers. Whatever drove you from your homeland—duty, disaster, or destiny—kept you moving forward when others would have turned back.

Now you must learn to navigate a world where everything you knew is strange or wrong. Your customs confuse the locals; their customs confuse you. But you also bring something valuable: a perspective no native could possess, knowledge of things this land has never seen, and the fresh eyes that notice what familiarity hides.

You are a bridge between worlds.`,
  skillProficiencies: ['insight', 'perception'],
  toolProficiencies: ['musical-instrument'],
  languages: 1,
  startingEquipment: [
    'Clothing from homeland',
    'Piece of jewelry worth 10 gp',
    'Poorly drawn maps',
    'Travel journal',
  ],
  startingGold: 15,
  feature: {
    id: 'all-eyes-on-you',
    name: 'All Eyes on You',
    description:
      'Your exotic appearance marks you as foreign, attracting curiosity and attention. People assume you know interesting stories and may offer hospitality. You can use your outsider status to get information that locals take for granted.',
  },
}

/**
 * Knight of the Order - Sworn warrior of ideals
 */
export const KNIGHT_OF_THE_ORDER: Background = {
  id: 'knight-of-the-order',
  name: 'Knight of the Order',
  description:
    'You were inducted into a knightly order, taking sacred vows and dedicating yourself to a higher cause.',
  lore: `The vigil lasted all night, on your knees before the altar, contemplating the oaths you would swear at dawn. When the sun rose, you arose as a knight—not merely a warrior, but a symbol, a champion of everything your order represents.

Your order might serve a god, a kingdom, a philosophical ideal, or an ancient tradition. Whatever its foundation, membership demanded that you subordinate your personal desires to the cause. You trained not just in combat, but in the history and doctrine of your order, learning to see yourself as part of a chain that stretches back centuries.

You've ridden on quests assigned by your superiors, fought to protect those your order defends, and upheld its principles even when doing so was difficult or dangerous. The order became your family, its knights your brothers and sisters, its traditions your identity.

But now you ride alone, whether by choice or circumstance, carrying your order's ideals into a world that may have forgotten them.`,
  skillProficiencies: ['persuasion', 'religion'],
  toolProficiencies: ['gaming-set'],
  languages: 1,
  startingEquipment: [
    'Insignia of your order',
    'Sealed orders from superiors',
    'Fine clothes',
    'Common clothes',
  ],
  startingGold: 10,
  feature: {
    id: 'knightly-regard',
    name: 'Knightly Regard',
    description:
      'Your order is known and respected. You can invoke your membership to gain audience with nobles, shelter in affiliated institutions, and demand hospitality from those who respect knightly traditions.',
  },
}

/**
 * All available backgrounds
 */
export const AVAILABLE_BACKGROUNDS: Background[] = [
  ACOLYTE,
  CRIMINAL,
  FOLK_HERO,
  NOBLE,
  SAGE,
  SOLDIER,
  CHARLATAN,
  ENTERTAINER,
  GUILD_ARTISAN,
  HERMIT,
  OUTLANDER,
  SAILOR,
  URCHIN,
  HAUNTED_ONE,
  CULTIST_REDEEMED,
  ABERRANT_SCHOLAR,
  GRAVE_WARDEN,
  OCCULT_INVESTIGATOR,
  ELDRITCH_TOUCHED,
  PLAGUE_SURVIVOR,
  NIGHTMARE_WALKER,
  BLOODLINE_INHERITOR,
  EXILE,
  FAILED_APPRENTICE,
  BOUNTY_HUNTER,
  GLADIATOR,
  ARCHAEOLOGIST,
  INHERITOR,
  MONSTER_SLAYER,
  MERCENARY_VETERAN,
  SPY,
  URBAN_BOUNTY_HUNTER,
  CLAN_CRAFTER,
  CLOISTERED_SCHOLAR,
  COURTIER,
  FAR_TRAVELER,
  KNIGHT_OF_THE_ORDER,
]
