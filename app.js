const STORAGE_KEYS = {
  settings: 'wc2026-prototype-settings',
  savedMatch: 'wc2026-prototype-saved-match'
};

const LIVE_TICK_MS = 250;

const GOAL_ZONES = [
  { id: 0, label: 'Top Left', x: 12, y: 18, difficulty: -0.08, keeperBias: 0.08 },
  { id: 1, label: 'Top Mid-L', x: 38, y: 18, difficulty: -0.04, keeperBias: 0.03 },
  { id: 2, label: 'Top Mid-R', x: 62, y: 18, difficulty: -0.04, keeperBias: 0.03 },
  { id: 3, label: 'Top Right', x: 88, y: 18, difficulty: -0.08, keeperBias: 0.08 },
  { id: 4, label: 'Bottom Left', x: 12, y: 68, difficulty: 0.03, keeperBias: 0.05 },
  { id: 5, label: 'Bottom Mid-L', x: 38, y: 68, difficulty: 0.02, keeperBias: -0.02 },
  { id: 6, label: 'Bottom Mid-R', x: 62, y: 68, difficulty: 0.02, keeperBias: -0.02 },
  { id: 7, label: 'Bottom Right', x: 88, y: 68, difficulty: 0.03, keeperBias: 0.05 }
];

const TACTIC_OPTIONS = {
  ultra_defensive: { label: 'Ultra Defensive', attack: -8, defence: 9, stamina: -0.3 },
  defensive: { label: 'Defensive', attack: -4, defence: 4, stamina: -0.1 },
  balanced: { label: 'Balanced', attack: 0, defence: 0, stamina: 0 },
  attacking: { label: 'Attacking', attack: 5, defence: -4, stamina: 0.35 },
  ultra_attacking: { label: 'Ultra Attacking', attack: 9, defence: -8, stamina: 0.65 }
};

const DEFAULT_FORMATION = '4-3-3';

const FORMATION_OPTIONS = {
  '4-4-2': { label: '4-4-2', attack: 0, defence: 2, width: 0.2, press: 0.1, bands: [{ x: 22, count: 4 }, { x: 45, count: 4 }, { x: 74, count: 2 }] },
  '4-3-3': { label: '4-3-3', attack: 3, defence: -1, width: 1.2, press: 0.8, bands: [{ x: 22, count: 4 }, { x: 46, count: 3 }, { x: 74, count: 3 }] },
  '4-2-3-1': { label: '4-2-3-1', attack: 2, defence: 1, width: 0.8, press: 0.5, bands: [{ x: 22, count: 4 }, { x: 38, count: 2 }, { x: 58, count: 3 }, { x: 76, count: 1 }] },
  '3-5-2': { label: '3-5-2', attack: 1, defence: 0, width: 1.1, press: 0.6, bands: [{ x: 24, count: 3 }, { x: 40, count: 2 }, { x: 56, count: 3 }, { x: 75, count: 2 }] },
  '3-4-3': { label: '3-4-3', attack: 4, defence: -3, width: 1.8, press: 1.1, bands: [{ x: 24, count: 3 }, { x: 49, count: 4 }, { x: 76, count: 3 }] },
  '5-3-2': { label: '5-3-2', attack: -1, defence: 4, width: -0.4, press: -0.2, bands: [{ x: 18, count: 5 }, { x: 46, count: 3 }, { x: 74, count: 2 }] }
};

const DIFFICULTIES = {
  easy: { label: 'Easy', userBoost: 4, aiBoost: -2, keeperHelp: 0.06 },
  normal: { label: 'Normal', userBoost: 0, aiBoost: 0, keeperHelp: 0 },
  hard: { label: 'Hard', userBoost: -2, aiBoost: 4, keeperHelp: -0.05 }
};

const MATCH_LENGTHS = {
  4: { label: '4 mins', segmentRange: [6, 8] },
  7: { label: '7 mins', segmentRange: [10, 12] },
  10: { label: '10 mins', segmentRange: [14, 16] }
};

const MISS_SAYINGS = [
  'He misses a sitter!',
  'Blazed over the bar!',
  'Dragged the shot wide!'
];

const MODE_OPTIONS = {
  friendly: 'Friendly Match',
  tournament_one: 'World Cup Mode A',
  tournament_all: 'World Cup Mode B',
  watch: 'World Cup Mode C'
};

const PROTOTYPE_TOURNAMENT_GROUPS = {
  A: ['France', 'USA', 'Japan', 'New Zealand'],
  B: ['Argentina', 'Mexico', 'Morocco', 'Portugal'],
  C: ['Brazil', 'England', 'Germany', 'Spain']
};

const TAIDGHRULES = [
  {
    id: 'extra-sub',
    title: 'Bench Buffet',
    text: 'Taidghfantino wants fresh chaos. Both teams get one extra substitution tonight.',
    effect: { extraSubs: 1 }
  },
  {
    id: 'strict-ref',
    title: 'No Nonsense Night',
    text: 'The referee has been told to stamp authority everywhere. Cards come out quicker.',
    effect: { cardRate: 0.08 }
  },
  {
    id: 'long-shots',
    title: 'Long Shot Festival',
    text: 'Taidghfantino demands screamers. Efforts from distance get a lift.',
    effect: { longShotBoost: 0.08 }
  },
  {
    id: 'nervy-keepers',
    title: 'Butter Gloves',
    text: 'The gloves feel slippery tonight. Goalkeepers look much less secure.',
    effect: { keeperNerf: 7 }
  },
  {
    id: 'ice-penalties',
    title: 'Ice-Cold Penalties',
    text: 'If it goes to a shootout, penalty takers get a little extra composure.',
    effect: { penaltyBoost: 5 }
  },
  {
    id: 'turbo-pitch',
    title: 'Turbo Pitch',
    text: 'The ball is zipping around. Open-play chances arrive more often for everyone.',
    effect: { chanceBoost: 0.05 }
  },
  {
    id: 'heavy-legs',
    title: 'Heavy Legs Decree',
    text: 'Taidghfantino says nobody gets a rest. Players tire faster all over the pitch.',
    effect: { staminaTax: 0.18 }
  },
  {
    id: 'let-it-flow',
    title: 'Let It Flow',
    text: 'The ref is told to keep the game moving. Cards are slightly less likely.',
    effect: { cardRate: -0.03 }
  },
  {
    id: 'goal-rush',
    title: 'Goal Rush Hour',
    text: 'Taidghfantino wants fireworks. Big attacking moments are boosted tonight.',
    effect: { chanceBoost: 0.08, longShotBoost: 0.04 }
  },
  {
    id: 'all-out-benches',
    title: 'Empty The Bench',
    text: 'Managers are told to use everybody. Two extra substitutions are allowed.',
    effect: { extraSubs: 2 }
  }
];

const SAMPLE_TEAMS = [
  createTeam('Argentina', '🇦🇷', { overall: 88, attack: 89, midfield: 87, defence: 84, gk: 87, stamina: 82, discipline: 79, penalties: 88 }, [
    ['Emiliano Martínez', 'GK', 87, 86], ['Nahuel Molina', 'RB', 80, 66], ['Cristian Romero', 'CB', 85, 58], ['Lisandro Martínez', 'CB', 84, 61],
    ['Nicolás Tagliafico', 'LB', 80, 63], ['Enzo Fernández', 'CM', 84, 73], ['Alexis Mac Allister', 'CM', 85, 76], ['Rodrigo De Paul', 'CM', 83, 71],
    ['Lionel Messi', 'RW', 90, 93], ['Julián Álvarez', 'ST', 87, 88], ['Lautaro Martínez', 'ST', 86, 89],
    ['Leandro Paredes', 'CM', 82, 69], ['Ángel Correa', 'FW', 82, 79], ['Nicolás González', 'LW', 81, 77], ['Germán Pezzella', 'CB', 80, 47], ['Gonzalo Montiel', 'RB', 79, 55]
  ]),
  createTeam('Brazil', '🇧🇷', { overall: 87, attack: 90, midfield: 84, defence: 82, gk: 86, stamina: 84, discipline: 75, penalties: 85 }, [
    ['Alisson', 'GK', 88, 87], ['Danilo', 'RB', 81, 60], ['Marquinhos', 'CB', 86, 61], ['Gabriel Magalhães', 'CB', 84, 56], ['Guilherme Arana', 'LB', 81, 67],
    ['Bruno Guimarães', 'CM', 85, 74], ['Lucas Paquetá', 'CM', 84, 78], ['João Gomes', 'CM', 81, 66], ['Vinícius Júnior', 'LW', 90, 91], ['Rodrygo', 'RW', 87, 86], ['Endrick', 'ST', 84, 84],
    ['Raphinha', 'RW', 85, 84], ['Richarlison', 'ST', 83, 81], ['Bremer', 'CB', 83, 51], ['Douglas Luiz', 'CM', 82, 71], ['Yan Couto', 'RB', 79, 63]
  ]),
  createTeam('England', '🏴', { overall: 86, attack: 88, midfield: 85, defence: 83, gk: 84, stamina: 84, discipline: 80, penalties: 86 }, [
    ['Jordan Pickford', 'GK', 83, 84], ['Kyle Walker', 'RB', 83, 63], ['John Stones', 'CB', 84, 57], ['Marc Guéhi', 'CB', 82, 47], ['Luke Shaw', 'LB', 81, 63],
    ['Declan Rice', 'CM', 86, 71], ['Jude Bellingham', 'CM', 90, 86], ['Phil Foden', 'AM', 89, 88], ['Bukayo Saka', 'RW', 88, 87], ['Harry Kane', 'ST', 89, 92], ['Cole Palmer', 'LW', 87, 88],
    ['Anthony Gordon', 'LW', 82, 78], ['Conor Gallagher', 'CM', 80, 68], ['Ollie Watkins', 'ST', 84, 85], ['Trent Alexander-Arnold', 'RB', 84, 74], ['Ezri Konsa', 'CB', 81, 46]
  ]),
  createTeam('France', '🇫🇷', { overall: 89, attack: 91, midfield: 86, defence: 85, gk: 85, stamina: 84, discipline: 78, penalties: 87 }, [
    ['Mike Maignan', 'GK', 86, 85], ['Jules Koundé', 'RB', 85, 63], ['William Saliba', 'CB', 87, 56], ['Dayot Upamecano', 'CB', 83, 49], ['Theo Hernández', 'LB', 84, 74],
    ['Aurélien Tchouaméni', 'CM', 86, 72], ['Adrien Rabiot', 'CM', 83, 69], ['Antoine Griezmann', 'AM', 87, 84], ['Ousmane Dembélé', 'RW', 86, 84], ['Kylian Mbappé', 'LW', 92, 94], ['Randal Kolo Muani', 'ST', 84, 83],
    ['Marcus Thuram', 'ST', 84, 82], ['Bradley Barcola', 'LW', 83, 80], ['Eduardo Camavinga', 'CM', 86, 74], ['Ibrahima Konaté', 'CB', 84, 50], ['Kingsley Coman', 'RW', 84, 82]
  ]),
  createTeam('Germany', '🇩🇪', { overall: 85, attack: 86, midfield: 85, defence: 82, gk: 84, stamina: 83, discipline: 81, penalties: 84 }, [
    ['Marc-André ter Stegen', 'GK', 86, 84], ['Joshua Kimmich', 'RB', 85, 70], ['Antonio Rüdiger', 'CB', 85, 50], ['Jonathan Tah', 'CB', 83, 45], ['David Raum', 'LB', 80, 68],
    ['İlkay Gündoğan', 'CM', 85, 77], ['Jamal Musiala', 'AM', 89, 89], ['Florian Wirtz', 'AM', 89, 88], ['Leroy Sané', 'RW', 85, 84], ['Kai Havertz', 'ST', 84, 83], ['Niclas Füllkrug', 'ST', 82, 82],
    ['Chris Führich', 'LW', 80, 75], ['Emre Can', 'CM', 79, 61], ['Maximilian Mittelstädt', 'LB', 78, 64], ['Pascal Groß', 'CM', 81, 68], ['Deniz Undav', 'ST', 81, 80]
  ]),
  createTeam('Spain', '🇪🇸', { overall: 87, attack: 87, midfield: 89, defence: 84, gk: 84, stamina: 85, discipline: 84, penalties: 83 }, [
    ['Unai Simón', 'GK', 84, 83], ['Dani Carvajal', 'RB', 84, 66], ['Robin Le Normand', 'CB', 83, 45], ['Aymeric Laporte', 'CB', 84, 49], ['Marc Cucurella', 'LB', 82, 66],
    ['Rodri', 'CM', 90, 79], ['Pedri', 'CM', 87, 81], ['Fabián Ruiz', 'CM', 84, 72], ['Lamine Yamal', 'RW', 88, 88], ['Nico Williams', 'LW', 86, 86], ['Álvaro Morata', 'ST', 83, 82],
    ['Dani Olmo', 'AM', 84, 81], ['Mikel Oyarzabal', 'FW', 83, 82], ['Álex Grimaldo', 'LB', 83, 70], ['Martín Zubimendi', 'CM', 83, 64], ['Ferran Torres', 'FW', 81, 78]
  ]),
  createTeam('Portugal', '🇵🇹', { overall: 86, attack: 88, midfield: 85, defence: 82, gk: 83, stamina: 83, discipline: 81, penalties: 88 }, [
    ['Diogo Costa', 'GK', 84, 83], ['João Cancelo', 'RB', 83, 74], ['Rúben Dias', 'CB', 87, 49], ['Gonçalo Inácio', 'CB', 82, 47], ['Nuno Mendes', 'LB', 84, 73],
    ['Vitinha', 'CM', 85, 76], ['Bruno Fernandes', 'AM', 88, 86], ['Bernardo Silva', 'AM', 88, 84], ['Rafael Leão', 'LW', 86, 85], ['Cristiano Ronaldo', 'ST', 86, 91], ['Francisco Conceição', 'RW', 82, 81],
    ['João Félix', 'FW', 82, 80], ['Palhinha', 'CM', 82, 58], ['Pepe', 'CB', 78, 41], ['Gonçalo Ramos', 'ST', 82, 83], ['Diogo Jota', 'FW', 84, 85]
  ]),
  createTeam('USA', '🇺🇸', { overall: 78, attack: 79, midfield: 78, defence: 76, gk: 77, stamina: 81, discipline: 79, penalties: 77 }, [
    ['Matt Turner', 'GK', 77, 76], ['Sergiño Dest', 'RB', 79, 69], ['Chris Richards', 'CB', 77, 44], ['Tim Ream', 'CB', 74, 38], ['Antonee Robinson', 'LB', 81, 66],
    ['Tyler Adams', 'CM', 80, 63], ['Weston McKennie', 'CM', 79, 69], ['Yunus Musah', 'CM', 77, 68], ['Christian Pulisic', 'LW', 84, 84], ['Tim Weah', 'RW', 78, 77], ['Folarin Balogun', 'ST', 79, 80],
    ['Ricardo Pepi', 'ST', 76, 76], ['Gio Reyna', 'AM', 79, 79], ['Malik Tillman', 'AM', 77, 72], ['Joe Scally', 'RB', 75, 52], ['Cameron Carter-Vickers', 'CB', 76, 39]
  ]),
  createTeam('Mexico', '🇲🇽', { overall: 77, attack: 77, midfield: 77, defence: 76, gk: 78, stamina: 80, discipline: 76, penalties: 76 }, [
    ['Guillermo Ochoa', 'GK', 78, 80], ['Jorge Sánchez', 'RB', 76, 58], ['César Montes', 'CB', 77, 42], ['Johan Vásquez', 'CB', 77, 40], ['Jesús Gallardo', 'LB', 75, 59],
    ['Edson Álvarez', 'CM', 82, 61], ['Luis Chávez', 'CM', 78, 72], ['Orbelín Pineda', 'AM', 79, 75], ['Hirving Lozano', 'LW', 80, 79], ['Santiago Giménez', 'ST', 81, 82], ['Julián Quiñones', 'RW', 79, 78],
    ['Raúl Jiménez', 'ST', 77, 79], ['César Huerta', 'LW', 75, 73], ['Luis Romo', 'CM', 77, 65], ['Israel Reyes', 'CB', 74, 35], ['Érick Sánchez', 'CM', 75, 66]
  ]),
  createTeam('Japan', '🇯🇵', { overall: 79, attack: 80, midfield: 80, defence: 78, gk: 77, stamina: 83, discipline: 84, penalties: 78 }, [
    ['Zion Suzuki', 'GK', 77, 77], ['Yukinari Sugawara', 'RB', 78, 65], ['Takehiro Tomiyasu', 'CB', 82, 48], ['Ko Itakura', 'CB', 78, 44], ['Hiroki Ito', 'LB', 77, 55],
    ['Wataru Endo', 'CM', 80, 60], ['Hidemasa Morita', 'CM', 78, 69], ['Daichi Kamada', 'AM', 80, 77], ['Takefusa Kubo', 'RW', 84, 84], ['Kaoru Mitoma', 'LW', 84, 84], ['Ayase Ueda', 'ST', 78, 79],
    ['Ritsu Doan', 'RW', 79, 77], ['Junya Ito', 'RW', 78, 75], ['Ao Tanaka', 'CM', 77, 66], ['Keito Nakamura', 'LW', 77, 73], ['Shogo Taniguchi', 'CB', 74, 34]
  ]),
  createTeam('Morocco', '🇲🇦', { overall: 80, attack: 81, midfield: 79, defence: 81, gk: 82, stamina: 82, discipline: 81, penalties: 79 }, [
    ['Yassine Bounou', 'GK', 84, 83], ['Achraf Hakimi', 'RB', 86, 76], ['Romain Saïss', 'CB', 77, 40], ['Nayef Aguerd', 'CB', 80, 43], ['Noussair Mazraoui', 'LB', 81, 71],
    ['Sofyan Amrabat', 'CM', 80, 58], ['Azzedine Ounahi', 'CM', 79, 73], ['Ismael Saibari', 'AM', 79, 77], ['Hakim Ziyech', 'RW', 82, 83], ['Sofiane Boufal', 'LW', 79, 77], ['Youssef En-Nesyri', 'ST', 81, 83],
    ['Abde Ezzalzouli', 'LW', 78, 78], ['Amine Adli', 'RW', 79, 78], ['Bilal El Khannouss', 'AM', 78, 75], ['Jawad El Yamiq', 'CB', 74, 32], ['Yahia Attiyat Allah', 'LB', 75, 52]
  ]),
  createTeam('New Zealand', '🇳🇿', { overall: 71, attack: 70, midfield: 69, defence: 72, gk: 73, stamina: 80, discipline: 82, penalties: 72 }, [
    ['Max Crocombe', 'GK', 72, 73], ['Tim Payne', 'RB', 71, 52], ['Liberato Cacace', 'LB', 74, 63], ['Michael Boxall', 'CB', 72, 34], ['Tommy Smith', 'CB', 71, 33],
    ['Joe Bell', 'CM', 72, 65], ['Alex Rufer', 'CM', 70, 60], ['Matthew Garbett', 'AM', 71, 68], ['Ben Waine', 'ST', 71, 74], ['Chris Wood', 'ST', 78, 82], ['Elijah Just', 'RW', 71, 71],
    ['Sarpreet Singh', 'AM', 72, 72], ['Callan Elliot', 'RB', 69, 50], ['Finn Surman', 'CB', 68, 30], ['Joe Champness', 'FW', 70, 68], ['Marco Rojas', 'FW', 71, 70]
  ])
];

SAMPLE_TEAMS.push(
  createGeneratedTeam('South Africa', '🇿🇦', { overall: 74, attack: 73, midfield: 74, defence: 74, gk: 73, stamina: 79, discipline: 78, penalties: 73 }),
  createGeneratedTeam('South Korea', '🇰🇷', { overall: 79, attack: 80, midfield: 79, defence: 78, gk: 77, stamina: 82, discipline: 80, penalties: 78 }),
  createGeneratedTeam('Canada', '🇨🇦', { overall: 77, attack: 79, midfield: 76, defence: 75, gk: 76, stamina: 82, discipline: 77, penalties: 77 }),
  createGeneratedTeam('Bosnia and Herzegovina', '🇧🇦', { overall: 75, attack: 76, midfield: 74, defence: 74, gk: 74, stamina: 76, discipline: 77, penalties: 75 }),
  createGeneratedTeam('Qatar', '🇶🇦', { overall: 74, attack: 74, midfield: 74, defence: 73, gk: 74, stamina: 77, discipline: 76, penalties: 73 }),
  createGeneratedTeam('Switzerland', '🇨🇭', { overall: 81, attack: 80, midfield: 80, defence: 81, gk: 80, stamina: 79, discipline: 82, penalties: 79 }),
  createGeneratedTeam('Haiti', '🇭🇹', { overall: 69, attack: 69, midfield: 68, defence: 68, gk: 69, stamina: 76, discipline: 74, penalties: 68 }),
  createGeneratedTeam('Scotland', '🏴', { overall: 79, attack: 78, midfield: 78, defence: 79, gk: 78, stamina: 81, discipline: 80, penalties: 77 }),
  createGeneratedTeam('Paraguay', '🇵🇾', { overall: 78, attack: 76, midfield: 77, defence: 80, gk: 78, stamina: 79, discipline: 80, penalties: 76 }),
  createGeneratedTeam('Australia', '🇦🇺', { overall: 76, attack: 75, midfield: 75, defence: 77, gk: 76, stamina: 80, discipline: 79, penalties: 75 }),
  createGeneratedTeam('Türkiye', '🇹🇷', { overall: 79, attack: 80, midfield: 79, defence: 77, gk: 77, stamina: 80, discipline: 77, penalties: 79 }),
  createGeneratedTeam('Curaçao', '🇨🇼', { overall: 68, attack: 68, midfield: 67, defence: 67, gk: 68, stamina: 74, discipline: 73, penalties: 68 }),
  createGeneratedTeam('Ivory Coast', '🇨🇮', { overall: 79, attack: 80, midfield: 78, defence: 78, gk: 77, stamina: 81, discipline: 76, penalties: 78 }),
  createGeneratedTeam('Ecuador', '🇪🇨', { overall: 80, attack: 79, midfield: 79, defence: 80, gk: 78, stamina: 82, discipline: 79, penalties: 78 }),
  createGeneratedTeam('Netherlands', '🇳🇱', { overall: 86, attack: 85, midfield: 85, defence: 85, gk: 84, stamina: 82, discipline: 82, penalties: 84 }),
  createGeneratedTeam('Sweden', '🇸🇪', { overall: 78, attack: 78, midfield: 77, defence: 78, gk: 77, stamina: 79, discipline: 81, penalties: 77 }),
  createGeneratedTeam('Tunisia', '🇹🇳', { overall: 74, attack: 73, midfield: 73, defence: 75, gk: 74, stamina: 77, discipline: 79, penalties: 73 }),
  createGeneratedTeam('Belgium', '🇧🇪', { overall: 84, attack: 84, midfield: 84, defence: 82, gk: 82, stamina: 79, discipline: 78, penalties: 83 }),
  createGeneratedTeam('Egypt', '🇪🇬', { overall: 78, attack: 80, midfield: 76, defence: 76, gk: 77, stamina: 78, discipline: 77, penalties: 79 }),
  createGeneratedTeam('Iran', '🇮🇷', { overall: 77, attack: 77, midfield: 76, defence: 77, gk: 76, stamina: 78, discipline: 79, penalties: 77 }),
  createGeneratedTeam('Cape Verde', '🇨🇻', { overall: 73, attack: 73, midfield: 72, defence: 73, gk: 72, stamina: 77, discipline: 76, penalties: 72 }),
  createGeneratedTeam('Saudi Arabia', '🇸🇦', { overall: 75, attack: 74, midfield: 75, defence: 75, gk: 74, stamina: 79, discipline: 78, penalties: 74 }),
  createGeneratedTeam('Uruguay', '🇺🇾', { overall: 84, attack: 83, midfield: 84, defence: 84, gk: 82, stamina: 81, discipline: 80, penalties: 82 }),
  createGeneratedTeam('Senegal', '🇸🇳', { overall: 80, attack: 80, midfield: 79, defence: 80, gk: 79, stamina: 82, discipline: 78, penalties: 78 }),
  createGeneratedTeam('Iraq', '🇮🇶', { overall: 72, attack: 72, midfield: 72, defence: 71, gk: 71, stamina: 76, discipline: 75, penalties: 72 }),
  createGeneratedTeam('Norway', '🇳🇴', { overall: 81, attack: 83, midfield: 79, defence: 78, gk: 77, stamina: 80, discipline: 79, penalties: 81 }),
  createGeneratedTeam('Algeria', '🇩🇿', { overall: 78, attack: 79, midfield: 78, defence: 76, gk: 76, stamina: 79, discipline: 76, penalties: 78 }),
  createGeneratedTeam('Austria', '🇦🇹', { overall: 80, attack: 79, midfield: 80, defence: 79, gk: 78, stamina: 81, discipline: 81, penalties: 78 }),
  createGeneratedTeam('Jordan', '🇯🇴', { overall: 71, attack: 71, midfield: 71, defence: 70, gk: 70, stamina: 75, discipline: 74, penalties: 71 }),
  createGeneratedTeam('DR Congo', '🇨🇩', { overall: 75, attack: 75, midfield: 74, defence: 74, gk: 73, stamina: 78, discipline: 75, penalties: 74 }),
  createGeneratedTeam('Uzbekistan', '🇺🇿', { overall: 73, attack: 73, midfield: 72, defence: 72, gk: 72, stamina: 76, discipline: 75, penalties: 72 }),
  createGeneratedTeam('Colombia', '🇨🇴', { overall: 83, attack: 82, midfield: 83, defence: 81, gk: 80, stamina: 81, discipline: 78, penalties: 81 }),
  createGeneratedTeam('Croatia', '🇭🇷', { overall: 82, attack: 81, midfield: 83, defence: 81, gk: 79, stamina: 79, discipline: 82, penalties: 80 }),
  createGeneratedTeam('Ghana', '🇬🇭', { overall: 75, attack: 75, midfield: 74, defence: 74, gk: 73, stamina: 79, discipline: 76, penalties: 74 }),
  createGeneratedTeam('Panama', '🇵🇦', { overall: 72, attack: 71, midfield: 72, defence: 72, gk: 71, stamina: 77, discipline: 76, penalties: 71 }),
  createGeneratedTeam('Czechia', '🇨🇿', { overall: 77, attack: 77, midfield: 76, defence: 77, gk: 76, stamina: 78, discipline: 80, penalties: 76 })
);

function createGeneratedTeam(name, flag, ratings) {
  return createTeam(name, flag, ratings, [
    [`${name} Keeper`, 'GK', ratings.gk, ratings.gk],
    [`${name} Right Back`, 'RB', ratings.defence - 1, 55],
    [`${name} Centre Back 1`, 'CB', ratings.defence, 48],
    [`${name} Centre Back 2`, 'CB', ratings.defence - 1, 46],
    [`${name} Left Back`, 'LB', ratings.defence - 1, 56],
    [`${name} Midfielder 1`, 'CM', ratings.midfield, 68],
    [`${name} Midfielder 2`, 'CM', ratings.midfield - 1, 70],
    [`${name} Playmaker`, 'AM', ratings.midfield, 76],
    [`${name} Right Wing`, 'RW', ratings.attack - 1, 79],
    [`${name} Striker 1`, 'ST', ratings.attack, 82],
    [`${name} Left Wing`, 'LW', ratings.attack - 1, 78],
    [`${name} Striker 2`, 'ST', ratings.attack - 2, 78],
    [`${name} Utility Midfielder`, 'CM', ratings.midfield - 2, 66],
    [`${name} Reserve Defender`, 'CB', ratings.defence - 2, 42],
    [`${name} Reserve Fullback`, 'RB', ratings.defence - 2, 50],
    [`${name} Impact Forward`, 'FW', ratings.attack - 2, 77]
  ]);
}

const WORLD_CUP_2026_FIFA_RANK = {
  Argentina: 1,
  Spain: 2,
  France: 3,
  England: 4,
  Portugal: 5,
  Brazil: 6,
  Morocco: 7,
  Netherlands: 8,
  Belgium: 9,
  Germany: 10,
  Croatia: 11,
  Colombia: 13,
  Mexico: 14,
  Senegal: 15,
  Uruguay: 16,
  USA: 17,
  Japan: 18,
  Switzerland: 19,
  Iran: 20,
  'Türkiye': 22,
  Ecuador: 23,
  Austria: 24,
  'South Korea': 25,
  Australia: 27,
  Algeria: 28,
  Egypt: 29,
  Canada: 30,
  Norway: 31,
  'Ivory Coast': 33,
  Panama: 34,
  Sweden: 38,
  Czechia: 40,
  Paraguay: 41,
  Scotland: 42,
  Tunisia: 45,
  'DR Congo': 46,
  Uzbekistan: 50,
  Qatar: 56,
  Iraq: 57,
  'South Africa': 60,
  'Saudi Arabia': 61,
  Jordan: 63,
  'Bosnia and Herzegovina': 64,
  'Cape Verde': 67,
  Ghana: 73,
  Haiti: 82,
  'Curaçao': 83,
  'New Zealand': 85
};

function getWorldCupFifaRank(teamName) {
  return WORLD_CUP_2026_FIFA_RANK[teamName] ?? 999;
}

SAMPLE_TEAMS.sort((a, b) => getWorldCupFifaRank(a.name) - getWorldCupFifaRank(b.name) || a.name.localeCompare(b.name));

let audioContext = null;
let liveInterval = null;
let pendingTimeouts = [];

const appState = {
  screen: 'menu',
  setupMode: 'friendly',
  settings: loadSettings(),
  friendlySetup: {
    homeTeam: 'France',
    awayTeam: 'Argentina',
    controlSide: 'home',
    difficulty: 'normal',
    knockoutFinish: true
  },
  tournamentSetup: {
    selectedTeam: 'New Zealand',
    favouriteTeam: 'France',
    difficulty: 'normal'
  },
  tournamentTab: 'standings',
  tournament: null,
  currentMatch: null,
  overlay: null,
  toast: null,
  hasSavedMatch: !!loadSavedMatch(),
  meta: {
    milestone: 'v0.2 Tournament Prototype'
  }
};

init();

function init() {
  window.addEventListener('resize', () => render());
  window.addEventListener('orientationchange', () => render());
  render();
}

function createTeam(name, flag, ratings, playersRaw) {
  const players = playersRaw.map((entry, index) => {
    const [playerName, pos, rating, finishing] = entry;
    const isGK = pos === 'GK';
    return {
      id: `${name}-${index}`.replace(/\s+/g, '-').toLowerCase(),
      name: playerName,
      pos,
      rating,
      finishing: isGK ? 15 : finishing,
      composure: isGK ? 20 : Math.min(95, Math.round((finishing + rating) / 2 + 3)),
      penalty: isGK ? 18 : Math.min(95, Math.round(finishing + randomInt(-3, 4))),
      passing: Math.min(92, Math.round(rating + randomInt(-5, 5))),
      pace: isGK ? 40 : Math.min(95, Math.round(rating + randomInt(-7, 8))),
      defending: isGK ? 25 : pos.includes('CB') ? rating + 4 : pos.includes('B') ? rating : Math.max(40, rating - 12),
      stamina: Math.min(96, Math.max(63, Math.round((ratings.stamina + rating) / 2 + randomInt(-4, 4)))),
      discipline: Math.min(94, Math.max(58, Math.round(ratings.discipline + randomInt(-10, 9)))),
      injuryRisk: Math.min(30, Math.max(8, 18 + randomInt(-5, 5))),
      gk: isGK ? rating + 2 : 0,
      diving: isGK ? rating + 2 : 0,
      reflexes: isGK ? rating + 1 : 0,
      positioning: isGK ? rating : 0
    };
  });

  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    flag,
    ratings,
    players
  };
}

function chooseDefaultFormation(team) {
  const ratings = team.ratings || {};
  const attackBias = (ratings.attack || 75) - (ratings.defence || 75);
  const midfield = ratings.midfield || 75;
  if (attackBias >= 7) return '3-4-3';
  if (attackBias >= 3) return '4-3-3';
  if (attackBias <= -7) return '5-3-2';
  if (attackBias <= -3) return '4-4-2';
  if (midfield >= 84) return '4-2-3-1';
  if (midfield >= 80) return '3-5-2';
  return DEFAULT_FORMATION;
}

function getFormationOption(key) {
  return FORMATION_OPTIONS[key] || FORMATION_OPTIONS[DEFAULT_FORMATION];
}

function sanitizeSettings(raw = {}) {
  return {
    sounds: raw.sounds !== false,
    taidghfantino: raw.taidghfantino !== false,
    difficulty: Object.prototype.hasOwnProperty.call(DIFFICULTIES, raw.difficulty) ? raw.difficulty : 'normal',
    matchLength: [4, 7, 10].includes(Number(raw.matchLength)) ? Number(raw.matchLength) : 4
  };
}

function loadSettings() {
  const raw = localStorage.getItem(STORAGE_KEYS.settings);
  if (raw) {
    try {
      return sanitizeSettings(JSON.parse(raw));
    } catch (error) {}
  }
  return sanitizeSettings();
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(appState.settings));
}

function loadSavedMatch() {
  const raw = localStorage.getItem(STORAGE_KEYS.savedMatch);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function saveCurrentMatch() {
  const payload = {
    screen: appState.screen,
    setupMode: appState.setupMode,
    friendlySetup: appState.friendlySetup,
    tournamentSetup: appState.tournamentSetup,
    tournamentTab: appState.tournamentTab,
    tournament: appState.tournament,
    currentMatch: appState.currentMatch,
    overlay: appState.overlay,
    settings: appState.settings
  };
  localStorage.setItem(STORAGE_KEYS.savedMatch, JSON.stringify(payload));
  appState.hasSavedMatch = true;
  showToast('Game saved. Continue it later from the menu.');
}

function clearSavedMatch() {
  localStorage.removeItem(STORAGE_KEYS.savedMatch);
  appState.hasSavedMatch = false;
}

function resumeSavedMatch() {
  const payload = loadSavedMatch();
  if (!payload) {
    showToast('No saved match found.');
    return;
  }
  stopLiveLoop();
  clearPendingTimeouts();
  appState.settings = sanitizeSettings({ ...appState.settings, ...(payload.settings || {}) });
  appState.setupMode = payload.setupMode || 'friendly';
  appState.friendlySetup = payload.friendlySetup || appState.friendlySetup;
  appState.tournamentSetup = payload.tournamentSetup || appState.tournamentSetup;
  appState.tournamentTab = payload.tournamentTab || 'standings';
  appState.tournament = payload.tournament || null;
  appState.currentMatch = payload.currentMatch || null;
  if (appState.currentMatch && appState.currentMatch.segmentDuration && appState.currentMatch.segmentDuration < 1000) {
    appState.currentMatch.segmentDuration *= 1000;
    appState.currentMatch.segmentRemaining *= 1000;
    appState.currentMatch.segmentProgress *= 1000;
  }
  appState.overlay = payload.overlay || null;
  appState.screen = payload.screen || (payload.currentMatch ? 'match' : payload.tournament ? 'tournamentHub' : 'menu');
  render();
  if (appState.overlay?.type === 'chance' && !appState.overlay.resolved) {
    startChanceCountdown();
  } else if (appState.screen === 'match' && !appState.overlay && appState.currentMatch && (!appState.currentMatch.phase || appState.currentMatch.phase === 'live' || appState.currentMatch.phase === 'paused')) {
    startLiveLoop();
  }
}

function startFriendlyMatch() {
  stopLiveLoop();
  clearPendingTimeouts();
  const home = getTeam(appState.friendlySetup.homeTeam);
  const away = getTeam(appState.friendlySetup.awayTeam);
  if (!home || !away || home.name === away.name) {
    showToast('Please choose two different teams.');
    return;
  }

  const rule = appState.settings.taidghfantino ? clone(randomFrom(TAIDGHRULES)) : null;
  appState.currentMatch = createMatch(home, away, appState.friendlySetup, rule);
  appState.overlay = rule ? { type: 'rule', rule } : null;
  appState.screen = 'match';
  render();
  if (!rule) {
    playStartWhistle();
    startLiveLoop();
  }
}

function createMatch(homeTeam, awayTeam, setup, rule) {
  const difficultyKey = appState.settings.difficulty || setup.difficulty || 'normal';
  const difficulty = DIFFICULTIES[difficultyKey] || DIFFICULTIES.normal;
  const matchLength = Number(appState.settings.matchLength || 4);
  const segmentRange = MATCH_LENGTHS[matchLength]?.segmentRange || MATCH_LENGTHS[4].segmentRange;
  const home = buildMatchTeam(homeTeam, 'home', setup, difficulty, rule);
  const away = buildMatchTeam(awayTeam, 'away', setup, difficulty, rule);

  return {
    id: `match-${Date.now()}`,
    createdAt: Date.now(),
    stage: 'Friendly Match',
    difficulty: difficultyKey,
    controlSide: setup.controlSide,
    knockoutFinish: setup.knockoutFinish,
    phase: 'live',
    rule,
    matchLength,
    segmentRange,
    home,
    away,
    feed: [{ minute: 0, text: 'The teams walk out for a fast, dramatic World Cup-style friendly.' }],
    score: { home: 0, away: 0 },
    stats: {
      homeShots: 0,
      awayShots: 0,
      homeOnTarget: 0,
      awayOnTarget: 0,
      homeBigChances: 0,
      awayBigChances: 0,
      homePossession: 0,
      awayPossession: 0
    },
    momentum: { home: 0, away: 0 },
    periods: [
      { label: '1st Half', startMinute: 0, segments: 15, segmentMinutes: 3 },
      { label: '2nd Half', startMinute: 45, segments: 15, segmentMinutes: 3 },
      { label: 'Extra Time 1', startMinute: 90, segments: 5, segmentMinutes: 3 },
      { label: 'Extra Time 2', startMinute: 105, segments: 5, segmentMinutes: 3 }
    ],
    periodIndex: 0,
    segmentIndex: 0,
    minute: 0,
    displayMinute: 0,
    segmentMinuteStart: 0,
    segmentMinuteEnd: 3,
    segmentDuration: segmentRange[0] * 1000,
    segmentRemaining: segmentRange[0] * 1000,
    segmentProgress: 0,
    extraTimeStarted: false,
    penaltiesStarted: false,
    ended: false,
    shootout: null,
    audioState: {
      liveCrowdElapsed: 0,
      nextLiveCrowdMs: 4200
    }
  };
}

function buildMatchTeam(team, side, setup, difficulty, rule) {
  const squad = clone(team.players).map((player, index) => ({
    ...player,
    staminaCurrent: player.stamina,
    onField: index < 11,
    bench: index >= 11,
    sentOff: false,
    injured: false,
    injuryText: '',
    yellow: 0,
    red: false,
    minutesPlayed: 0,
    isKeeper: player.pos === 'GK',
    subbedInMinute: null,
    subbedOutMinute: null
  }));

  const isControlled = setup.controlSide === side;
  return {
    side,
    controlled: isControlled,
    info: clone(team),
    squad,
    tactic: 'balanced',
    formation: chooseDefaultFormation(team),
    subsUsed: 0,
    maxSubs: 5 + (rule?.effect?.extraSubs || 0),
    cards: 0,
    reds: 0,
    injuries: 0,
    morale: 0,
    difficultyBoost: isControlled ? difficulty.userBoost : difficulty.aiBoost,
    keeperHelp: isControlled ? difficulty.keeperHelp : 0
  };
}

function getTeam(name) {
  return SAMPLE_TEAMS.find((team) => team.name === name);
}

function render() {
  const root = document.getElementById('app');
  root.innerHTML = `
    <div class="screen">
      <div class="page-shell">${renderScreen()}</div>
    </div>
    ${appState.overlay ? renderOverlay(appState.overlay) : ''}
    ${renderRotateNotice()}
    ${appState.toast ? `<div class="toast">${appState.toast}</div>` : ''}
  `;
  bindEvents();
  animateSceneIfNeeded();
}

function renderScreen() {
  if (appState.screen === 'settings') return renderSettingsScreen();
  if (appState.screen === 'setup') return renderSetupScreen();
  if (appState.screen === 'match') return renderMatchScreen();
  if (appState.screen === 'tournamentHub') return renderTournamentHubScreen();
  return renderMenuScreen();
}

function renderRotateNotice() {
  if (!isMobileLandscape()) return '';
  return `
    <div class="overlay rotate-overlay">
      <div class="overlay-card rotate-card">
        <div class="title-badge">📱 Portrait Mode</div>
        <h2>Please rotate your device</h2>
        <div class="button-row" style="justify-content:center;">
          <button data-action="lock-portrait">Try Portrait Mode</button>
        </div>
      </div>
    </div>
  `;
}

function renderMenuScreen() {
  return `
    <div class="card compact-card menu-main-card">
      <h1 class="big-title">World Cup 2026<span class="big-title-subline">with Taidghfantino</span></h1>
      <div class="subtitle">Choose how you want to play.</div>
      <div class="menu-mode-grid stacked-modes">
        <button data-action="go-setup-one">Tournament - Play as one team</button>
        <button data-action="go-setup-all">Tournament - Play every game</button>
        <button data-action="go-setup-watch">Tournament - Watch only</button>
        <button class="secondary" data-action="go-setup-friendly">Friendly Match</button>
      </div>
      <div class="button-row">
        <button class="secondary" data-action="continue-saved" ${appState.hasSavedMatch ? '' : 'disabled'}>Continue Saved Game</button>
        <button class="ghost" data-action="go-settings">Settings</button>
      </div>
    </div>
  `;
}

function renderSettingsScreen() {
  return `
    <div class="card">
      <div class="title-badge">⚙️ Prototype Settings</div>
      <h1>Settings</h1>
      <div class="settings-grid">
        <div class="toggle-row">
          <div>
            <strong>Match Sounds</strong><br />
            <small>Crowd cheer, whistles, shots, saves, cards, and other football effects.</small>
          </div>
          <input type="checkbox" data-setting="sounds" ${appState.settings.sounds ? 'checked' : ''} />
        </div>
        <div class="toggle-row">
          <div>
            <strong>Taidghfantino Rule Changes</strong><br />
            <small>Enable the special boss rule popup before matches.</small>
          </div>
          <input type="checkbox" data-setting="taidghfantino" ${appState.settings.taidghfantino ? 'checked' : ''} />
        </div>
        <div class="toggle-row setting-select-row">
          <div>
            <strong>Difficulty</strong><br />
            <small>Set the default challenge for friendly matches and every tournament mode.</small>
          </div>
          <select data-setting-select="difficulty" class="setting-inline-select">
            ${Object.entries(DIFFICULTIES).map(([key, value]) => `<option value="${key}" ${key === appState.settings.difficulty ? 'selected' : ''}>${value.label}</option>`).join('')}
          </select>
        </div>
        <div class="toggle-row setting-select-row">
          <div>
            <strong>Match Length</strong><br />
            <small>Choose short, normal, or longer matches.</small>
          </div>
          <select data-setting-select="matchLength" class="setting-inline-select">
            ${Object.entries(MATCH_LENGTHS).map(([key, value]) => `<option value="${key}" ${Number(appState.settings.matchLength) === Number(key) ? 'selected' : ''}>${value.label}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="button-row">
        <button data-action="go-menu">Back to Menu</button>
      </div>
    </div>
  `;
}

function renderSetupScreen() {
  if (appState.setupMode !== 'friendly') return renderTournamentSetupScreen();

  const homeTeam = getTeam(appState.friendlySetup.homeTeam);
  const awayTeam = getTeam(appState.friendlySetup.awayTeam);
  const homeOptions = SAMPLE_TEAMS.map((team) => `<option value="${team.name}" ${team.name === appState.friendlySetup.homeTeam ? 'selected' : ''}>${team.name}</option>`).join('');
  const awayOptions = SAMPLE_TEAMS.map((team) => `<option value="${team.name}" ${team.name === appState.friendlySetup.awayTeam ? 'selected' : ''}>${team.name}</option>`).join('');

  return `
    <div class="card compact-card">
      <div class="title-badge">🏟️ Friendly Match</div>
      <h1>Set Up a Match</h1>

      <div class="matchup-row">
        <div class="form-row compact-form-row">
          <label>Team 1</label>
          <select data-setup="homeTeam">${homeOptions}</select>
        </div>
        <div class="vs-chip">VS</div>
        <div class="form-row compact-form-row">
          <label>Team 2</label>
          <select data-setup="awayTeam">${awayOptions}</select>
        </div>
      </div>

      <div class="setup-grid compact-setup-grid" style="margin-top:12px;">
        <div class="form-row compact-form-row">
          <label>You control</label>
          <select data-setup="controlSide">
            <option value="home" ${appState.friendlySetup.controlSide === 'home' ? 'selected' : ''}>${homeTeam ? homeTeam.name : 'Team 1'}</option>
            <option value="away" ${appState.friendlySetup.controlSide === 'away' ? 'selected' : ''}>${awayTeam ? awayTeam.name : 'Team 2'}</option>
          </select>
        </div>
        <div class="form-row compact-form-row">
          <label>Difficulty</label>
          <div class="small-note">${DIFFICULTIES[appState.settings.difficulty]?.label || 'Normal'} — change this in Settings.</div>
        </div>
      </div>

      <div class="toggle-row compact-toggle" style="margin-top:12px;">
        <div>
          <strong>Extra Time + Penalties if Drawn</strong><br />
          <small>Useful for testing the 8-square mechanic under pressure.</small>
        </div>
        <input type="checkbox" data-setup-check="knockoutFinish" ${appState.friendlySetup.knockoutFinish ? 'checked' : ''} />
      </div>

      <div class="button-row" style="margin-top:16px;">
        <button data-action="start-friendly">Kick Off Friendly</button>
        <button class="secondary" data-action="go-menu">Back</button>
      </div>
    </div>
  `;
}

function renderTournamentSetupScreen() {
  const mode = appState.setupMode;
  const teamOptions = SAMPLE_TEAMS.map((team) => `<option value="${team.name}" ${team.name === appState.tournamentSetup.selectedTeam ? 'selected' : ''}>${team.name}</option>`).join('');
  const favouriteOptions = SAMPLE_TEAMS.map((team) => `<option value="${team.name}" ${team.name === appState.tournamentSetup.favouriteTeam ? 'selected' : ''}>${team.name}</option>`).join('');
  const title = mode === 'tournament_one' ? 'Tournament - Play as one team' : mode === 'tournament_all' ? 'Tournament - Play every game' : 'Tournament - Watch only';
  const desc = mode === 'tournament_one'
    ? 'Choose one country. You only play that team’s matches. The rest auto-play.'
    : mode === 'tournament_all'
      ? 'Choose a favourite country, then decide which side to control in each match.'
      : 'Choose a favourite country and watch the tournament unfold automatically.';

  return `
    <div class="card compact-card">
      <h1>${title}</h1>
      <div class="subtitle" style="font-size:16px;">${desc}</div>

      <div class="setup-grid compact-setup-grid" style="margin-top:14px;">
        <div class="form-row compact-form-row">
          <label>${mode === 'tournament_one' ? 'Your country' : 'Favourite country'}</label>
          <select data-tournament-setup="${mode === 'tournament_one' ? 'selectedTeam' : 'favouriteTeam'}">
            ${mode === 'tournament_one' ? teamOptions : favouriteOptions}
          </select>
        </div>
        <div class="form-row compact-form-row">
          <label>Difficulty</label>
          <div class="small-note">${DIFFICULTIES[appState.settings.difficulty]?.label || 'Normal'} — change this in Settings.</div>
        </div>
      </div>

      <div class="button-row" style="margin-top:16px;">
        <button data-action="start-tournament">Start Tournament</button>
        <button class="secondary" data-action="go-menu">Back</button>
      </div>
    </div>
  `;
}


function renderTournamentHubScreen() {
  const tournament = appState.tournament;
  if (!tournament) {
    return `<div class="card compact-card"><h2>No tournament loaded</h2><button data-action="go-menu">Back to menu</button></div>`;
  }

  const tables = buildTournamentTables(tournament);
  const currentFixture = getCurrentTournamentFixture(tournament);
  const title = tournament.mode === 'tournament_one'
    ? `One Team • ${tournament.selectedTeam}`
    : tournament.mode === 'tournament_all'
      ? `Play Every Game • ${tournament.favouriteTeam}`
      : `Watch Only • ${tournament.favouriteTeam}`;

  return `
    <div class="match-shell">
      <div class="card compact-card scoreboard-top">
        <div class="score-top tournament-score-top">
          <div>
            <h2 style="margin:0 0 4px;">${title}</h2>
            <div class="small-note">${tournament.complete ? 'Tournament complete' : currentFixture ? currentFixture.label : 'Awaiting next match'}</div>
          </div>
          <div class="tournament-head-right">
            ${tournament.complete ? `<div class="match-clock">Champion: ${tournament.champion}</div>` : ''}
            <div class="tabs-row tournament-tabs-row">
              <button class="${appState.tournamentTab === 'standings' ? 'secondary active-tab' : 'ghost'}" data-action="tab-standings">Standings</button>
              <button class="${appState.tournamentTab === 'results' ? 'secondary active-tab' : 'ghost'}" data-action="tab-results">Results</button>
            </div>
          </div>
        </div>

        <div class="button-row compact-button-row">
          ${renderTournamentActionButtons(tournament, currentFixture)}
          <button class="ghost" data-action="save-progress">Save Progress</button>
          <button class="ghost" data-action="go-menu">Menu</button>
        </div>

        <div class="tournament-fixture-strip">
          <span class="tournament-fixture-label">${tournament.complete ? 'Champion' : 'Current fixture'}</span>
          <strong>${tournament.complete ? (tournament.champion || 'Tournament complete') : currentFixture ? `${currentFixture.homeTeam} vs ${currentFixture.awayTeam}` : 'Awaiting next match'}</strong>
          <span class="tournament-fixture-stage">${tournament.complete ? 'Tournament Complete' : tournament.phase === 'group' ? 'Group Stage' : 'Knockout Stage'}</span>
        </div>
      </div>

      ${appState.tournamentTab === 'standings'
        ? `${tournament.phase === 'knockout' ? `<div class="card compact-card">${renderKnockoutGraphic(tournament)}</div>` : ''}<div class="group-grid">${tables.map((table) => renderGroupTable(table)).join('')}</div>`
        : `<div class="card compact-card"><h3>Results</h3><div class="feed">${(tournament.history || []).slice().reverse().map((item) => `<div class="feed-item"><div class="minute">${item.label}</div>${item.text}</div>`).join('') || '<div class="small-note">No results yet.</div>'}</div></div>`}
    </div>
  `;
}

function renderMatchScreen() {
  const match = appState.currentMatch;
  if (!match) {
    return `<div class="card"><h2>No active match</h2><button data-action="go-menu">Back to menu</button></div>`;
  }

  return `
    <div class="match-shell">
      <div class="card scoreboard scoreboard-top">
        <div class="score-top match-score-top">
          <div class="match-header-meta">
            <div class="title-badge match-stage-badge">${match.stage}</div>
            <div class="small-note match-rule-note">${match.rule ? `Taidghfantino rule: ${match.rule.title}` : 'Standard rules this match'}</div>
          </div>
          <div class="match-top-actions">
            <button class="ghost match-header-btn" data-action="save-match">Save Match</button>
            <button class="ghost match-header-btn" data-action="go-menu-from-match">Save & Exit</button>
          </div>
        </div>

        <div class="team-score-row top-score-row">
          <div class="team-name-large team-name-home">${match.home.info.name}</div>
          <div class="score-big">${match.score.home} - ${match.score.away}</div>
          <div class="team-name-large team-name-away">${match.away.info.name}</div>
        </div>

        <div class="live-strip">
          <div class="control-grid top-controls match-play-controls">
            <button class="secondary" data-action="toggle-tactic">Tactics & Formation</button>
            <button class="secondary" data-action="open-subs">Make Substitution</button>
          </div>
        </div>
      </div>

      ${renderBirdsEyePitch(match)}

      <div class="card compact-card match-stats-card">
        <div class="stat-grid compact-stats compact-match-stats">
          <div class="mini-stat"><strong>${match.stats.homeShots}-${match.stats.awayShots}</strong>Shots</div>
          <div class="mini-stat"><strong>${match.stats.homeOnTarget}-${match.stats.awayOnTarget}</strong>On target</div>
        </div>
      </div>

      <div class="card commentary-card">
        <h3>Match Commentary</h3>
        <div class="feed">
          ${match.feed.slice().reverse().map((item) => `<div class="feed-item"><div class="minute">${item.minute}'</div>${item.text}</div>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function spreadLine(count, minY = 16, maxY = 84) {
  if (count <= 1) return [50];
  return Array.from({ length: count }, (_, index) => minY + ((maxY - minY) * index) / (count - 1));
}

function getPitchPhase(progressToGoal) {
  if (progressToGoal < 38) {
    return { attackKey: 'build', attackLabel: 'Build attack', defendLabel: 'High press' };
  }
  if (progressToGoal < 68) {
    return { attackKey: 'create', attackLabel: 'Create attack', defendLabel: 'Mid block' };
  }
  return { attackKey: 'finish', attackLabel: 'Finish attack', defendLabel: 'Low block' };
}

function easeInOutProgress(value) {
  const t = clamp(value, 0, 1);
  return 0.5 - Math.cos(Math.PI * t) / 2;
}

function lerp(start, end, value) {
  return start + (end - start) * clamp(value, 0, 1);
}

function getPitchControlBias(match) {
  const minute = match.displayMinute || 0;
  const progress = segmentPercent(match) / 100;
  const homeFormation = getFormationOption(match.home.formation);
  const awayFormation = getFormationOption(match.away.formation);
  let homeControl = 0.5
    + ((possessionPercent(match, 'home') - 50) / 75)
    + (TACTIC_OPTIONS[match.home.tactic].attack - TACTIC_OPTIONS[match.away.tactic].attack) / 42
    + (homeFormation.attack - awayFormation.attack) / 28
    - (homeFormation.defence - awayFormation.defence) / 48
    + Math.sin(minute / 5 + progress * Math.PI * 2) * 0.05
    + (match.score.home - match.score.away) * 0.02;

  if (appState.overlay?.type === 'chance') {
    homeControl = appState.overlay.shooterSide === 'home' ? 0.88 : 0.12;
  }

  return clamp(homeControl, 0.14, 0.86);
}

function getRelativePitchProgress(ballX, attackSide) {
  return clamp(attackSide === 'home' ? ballX : 100 - ballX, 12, 88);
}

function absolutePitchXFromProgress(progressToGoal, attackSide) {
  return clamp(attackSide === 'home' ? progressToGoal : 100 - progressToGoal, 10, 90);
}

function buildPossessionNodes(visual, startProgress, carryY) {
  const startY = clamp(carryY || 50, 16, 84);
  const switchDirection = visual.laneBias >= 0 ? -1 : 1;
  const wideBias = visual.laneBias * 13;
  const buildY = clamp(startY + wideBias * 0.45 + randomInt(-10, 10), 16, 84);
  const recycleY = clamp(50 + switchDirection * randomInt(8, 18), 16, 84);
  const createY = clamp(50 + wideBias * 0.75 + randomInt(-12, 12), 16, 84);
  const finalY = clamp(50 + switchDirection * randomInt(4, 14), 22, 78);

  const buildMid = clamp(lerp(startProgress, visual.buildTarget, 0.46), startProgress + 2, visual.buildTarget);
  const createMid = clamp(lerp(visual.buildTarget, visual.createTarget, 0.55), visual.buildTarget + 2, visual.createTarget);

  return [
    { t: 0, progress: startProgress, y: startY },
    { t: 0.16, progress: buildMid, y: buildY },
    { t: 0.34, progress: visual.buildTarget, y: recycleY },
    { t: 0.56, progress: createMid, y: createY },
    { t: 0.78, progress: visual.createTarget, y: clamp((createY + finalY) / 2 + randomInt(-5, 5), 18, 82) },
    { t: 1, progress: visual.finishTarget, y: finalY }
  ];
}

function seedPitchPossessionPlan(visual, attackSide, startProgress = 24, carryY = 50) {
  const safeStart = clamp(startProgress, 18, 82);
  const buildTarget = clamp(safeStart + (safeStart < 40 ? randomInt(8, 13) : randomInt(3, 7)), safeStart, 54);
  const createTarget = clamp(Math.max(buildTarget + randomInt(7, 12), safeStart + 10), buildTarget + 1, 74);
  const finishTarget = clamp(Math.max(createTarget + randomInt(6, 10), safeStart + 18), createTarget + 1, 86);

  visual.attackSide = attackSide;
  visual.possessionElapsed = 0;
  visual.possessionDuration = randomInt(6200, 9200);
  visual.possessionStartProgress = safeStart;
  visual.buildTarget = buildTarget;
  visual.createTarget = createTarget;
  visual.finishTarget = finishTarget;
  visual.laneBias = clamp(((carryY || 50) - 50) / 18 + (Math.random() * 0.7 - 0.35), -1, 1);
  visual.laneSeed = Math.random() * Math.PI * 2;
  visual.possessionNodes = buildPossessionNodes(visual, safeStart, carryY);
}

function getPitchProgressForPossession(visual, possessionT) {
  const nodes = visual.possessionNodes || [];
  if (!nodes.length) return visual.possessionStartProgress || 24;
  const t = clamp(possessionT, 0, 1);
  let from = nodes[0];
  let to = nodes[nodes.length - 1];

  for (let index = 0; index < nodes.length - 1; index += 1) {
    if (t >= nodes[index].t && t <= nodes[index + 1].t) {
      from = nodes[index];
      to = nodes[index + 1];
      break;
    }
  }

  const localT = easeInOutProgress((t - from.t) / Math.max(0.0001, to.t - from.t));
  return lerp(from.progress, to.progress, localT);
}

function buildBallTargetForVisual(visual, possessionT) {
  const nodes = visual.possessionNodes || [];
  if (!nodes.length) {
    const fallbackProgress = getPitchProgressForPossession(visual, possessionT);
    return {
      x: absolutePitchXFromProgress(fallbackProgress, visual.attackSide),
      y: 50,
      progressToGoal: fallbackProgress,
      phaseInfo: getPitchPhase(fallbackProgress)
    };
  }

  const t = clamp(possessionT, 0, 1);
  let from = nodes[0];
  let to = nodes[nodes.length - 1];

  for (let index = 0; index < nodes.length - 1; index += 1) {
    if (t >= nodes[index].t && t <= nodes[index + 1].t) {
      from = nodes[index];
      to = nodes[index + 1];
      break;
    }
  }

  const localT = easeInOutProgress((t - from.t) / Math.max(0.0001, to.t - from.t));
  const progressToGoal = lerp(from.progress, to.progress, localT);
  const phaseInfo = getPitchPhase(progressToGoal);
  const ballX = absolutePitchXFromProgress(progressToGoal, visual.attackSide);
  const ballY = clamp(lerp(from.y, to.y, localT), 14, 86);

  return {
    x: ballX,
    y: ballY,
    progressToGoal,
    phaseInfo
  };
}

function ensurePitchVisual(match) {
  if (!match.pitchVisual) {
    const homeControl = getPitchControlBias(match);
    const attackSide = homeControl >= 0.5 ? 'home' : 'away';
    const visual = {
      attackSide,
      possessionElapsed: 0,
      possessionDuration: 0,
      possessionStartProgress: 24,
      buildTarget: 36,
      createTarget: 58,
      finishTarget: 80,
      progressToGoal: 24,
      laneBias: 0,
      laneSeed: 0,
      ball: null,
      targetBall: null,
      lastBall: null,
      phaseInfo: getPitchPhase(24)
    };
    seedPitchPossessionPlan(visual, attackSide, 24, 50);
    const openingBall = buildBallTargetForVisual(visual, 0);
    visual.ball = { x: openingBall.x, y: openingBall.y };
    visual.targetBall = { ...visual.ball };
    visual.lastBall = { ...visual.ball };
    visual.progressToGoal = openingBall.progressToGoal;
    visual.phaseInfo = openingBall.phaseInfo;
    match.pitchVisual = visual;
  }
  return match.pitchVisual;
}

function updatePitchVisual(match, elapsedMs = 0) {
  const visual = ensurePitchVisual(match);

  if (appState.overlay?.type === 'chance') {
    const shooterSide = appState.overlay.shooterSide;
    const targetX = absolutePitchXFromProgress(84, shooterSide);
    const targetY = 50;
    visual.attackSide = shooterSide;
    visual.progressToGoal = 84;
    visual.phaseInfo = getPitchPhase(84);
    visual.targetBall = { x: targetX, y: targetY };
    if (!visual.ball) visual.ball = { ...visual.targetBall };
    if (elapsedMs > 0) {
      const follow = clamp(elapsedMs / 620, 0.14, 0.42);
      visual.ball.x += (visual.targetBall.x - visual.ball.x) * follow;
      visual.ball.y += (visual.targetBall.y - visual.ball.y) * follow;
    }
    visual.lastBall = { ...visual.ball };
    return visual;
  }

  const homeControl = getPitchControlBias(match);

  if (elapsedMs > 0) {
    visual.possessionElapsed += elapsedMs;
    if (visual.possessionElapsed >= visual.possessionDuration) {
      const previousBall = visual.ball || visual.targetBall || { x: absolutePitchXFromProgress(visual.progressToGoal || 24, visual.attackSide), y: 50 };
      const holdBias = visual.attackSide === 'home' ? 0.08 : -0.08;
      const nextHomeChance = clamp(homeControl + holdBias, 0.12, 0.88);
      const nextSide = Math.random() < nextHomeChance ? 'home' : 'away';
      const startProgress = getRelativePitchProgress(previousBall.x, nextSide);
      seedPitchPossessionPlan(visual, nextSide, startProgress, previousBall.y);
    }
  }

  const possessionT = clamp(visual.possessionElapsed / Math.max(1, visual.possessionDuration), 0, 1);
  const targetBall = buildBallTargetForVisual(visual, possessionT);
  visual.progressToGoal = targetBall.progressToGoal;
  visual.phaseInfo = targetBall.phaseInfo;
  visual.targetBall = { x: targetBall.x, y: targetBall.y };

  if (!visual.ball || elapsedMs > 0) {
    visual.ball = { ...visual.targetBall };
  }

  visual.lastBall = { ...visual.ball };
  return visual;
}

function getPhaseTuning(teamState, side, attackSide, phaseInfo) {
  const attacking = side === attackSide;
  const formation = getFormationOption(teamState.formation);
  const tactic = TACTIC_OPTIONS[teamState.tactic];

  if (attacking) {
    if (phaseInfo.attackKey === 'build') {
      return {
        baseShift: -1.6,
        bandAdvance: 4.2,
        widthFactor: 1.06 + formation.width * 0.05,
        compactness: 0.96,
        supportBias: 0.35,
        compactX: 0.92,
        tacticScale: 0.9 + Math.max(0, tactic.attack) * 0.01
      };
    }
    if (phaseInfo.attackKey === 'create') {
      return {
        baseShift: 0.4,
        bandAdvance: 5.1,
        widthFactor: 1.18 + formation.width * 0.07,
        compactness: 1,
        supportBias: 0.72,
        compactX: 1,
        tacticScale: 1
      };
    }
    return {
      baseShift: 1.9,
      bandAdvance: 6.0,
      widthFactor: 0.9 + Math.max(0, formation.width) * 0.03,
      compactness: 0.88,
      supportBias: 1.02,
      compactX: 1.05,
      tacticScale: 1.06
    };
  }

  if (phaseInfo.attackKey === 'build') {
    return {
      baseShift: 3.5,
      bandAdvance: 3.2,
      widthFactor: 0.94,
      compactness: 0.9,
      supportBias: 0.42,
      compactX: 0.88,
      tacticScale: 0.95
    };
  }
  if (phaseInfo.attackKey === 'create') {
    return {
      baseShift: 0.2,
      bandAdvance: 2.3,
      widthFactor: 0.84,
      compactness: 0.8,
      supportBias: -0.08,
      compactX: 0.8,
      tacticScale: 0.88
    };
  }
  return {
    baseShift: -4.2,
    bandAdvance: 1.2,
    widthFactor: 0.72,
    compactness: 0.64,
    supportBias: -0.42,
    compactX: 0.64,
    tacticScale: 0.78
  };
}

function buildFormationPlayers(teamState, side, minute, attackSide, phaseInfo, ball) {
  const formation = getFormationOption(teamState.formation);
  const tactic = TACTIC_OPTIONS[teamState.tactic];
  const attackDirection = side === 'home' ? 1 : -1;
  const ownGoalDirection = -attackDirection;
  const attacking = side === attackSide;
  const ballX = clamp(ball?.x ?? (side === 'home' ? 24 : 76), 10, 90);
  const ballY = clamp(ball?.y ?? 50, 10, 90);
  const players = [{ x: side === 'home' ? 8 : 92, y: clamp(50 + (ballY - 50) * 0.16, 34, 66) }];

  formation.bands.forEach((band, bandIndex) => {
    const bandCount = Math.max(1, formation.bands.length - 1);
    const relativeBand = bandIndex / bandCount;
    const baseLineX = side === 'home' ? band.x : 100 - band.x;
    const widthFactor = attacking
      ? 1.02 + formation.width * 0.06 + (phaseInfo.attackKey === 'create' ? 0.08 : 0)
      : (phaseInfo.attackKey === 'finish' ? 0.72 : 0.86) + formation.width * 0.03;

    let lineX = baseLineX;
    if (attacking) {
      const ballTrail = phaseInfo.attackKey === 'build'
        ? lerp(-22, 4, relativeBand)
        : phaseInfo.attackKey === 'create'
          ? lerp(-24, 6, relativeBand)
          : lerp(-28, 2, relativeBand);
      const targetLineX = ballX + attackDirection * ballTrail;
      const phasePull = phaseInfo.attackKey === 'build' ? 0.42 : phaseInfo.attackKey === 'create' ? 0.57 : 0.72;
      lineX = lerp(baseLineX, targetLineX, clamp(phasePull + tactic.attack * 0.018, 0.32, 0.86));
    } else {
      const screenDepth = phaseInfo.attackKey === 'build'
        ? 10 + relativeBand * 15
        : phaseInfo.attackKey === 'create'
          ? 12 + relativeBand * 17
          : 9 + relativeBand * 15;
      const targetLineX = ballX + ownGoalDirection * screenDepth;
      const phasePull = phaseInfo.attackKey === 'build' ? 0.4 : phaseInfo.attackKey === 'create' ? 0.56 : 0.72;
      lineX = lerp(baseLineX, targetLineX, clamp(phasePull + Math.max(0, tactic.defence) * 0.02, 0.28, 0.84));
    }

    const spreadHalf = 32 * widthFactor * (0.92 + Math.abs(0.5 - relativeBand) * 0.14);
    const ySlots = spreadLine(band.count, 50 - spreadHalf, 50 + spreadHalf);

    ySlots.forEach((slotY, slotIndex) => {
      const swayX = Math.sin(minute / 5.2 + bandIndex * 0.8 + slotIndex * 0.6) * (attacking ? 0.7 : 0.55);
      const swayY = Math.cos(minute / 4.1 + bandIndex + slotIndex * 0.65) * (attacking ? 1.5 : 1.25);
      const bandShiftY = (ballY - 50) * (attacking ? (0.18 + relativeBand * 0.18) : (0.24 + (1 - relativeBand) * 0.08));
      const closeToBallY = (ballY - slotY) * (attacking ? (0.12 + relativeBand * 0.1) : (0.18 + (1 - relativeBand) * 0.06));
      players.push({
        x: clamp(lineX + swayX, 6, 94),
        y: clamp(slotY + bandShiftY + closeToBallY + swayY, 10, 90)
      });
    });
  });

  return players.slice(0, 11);
}

function clusterPlayersAroundBall(players, side, role, ball) {
  const adjusted = players.map((player) => ({ ...player }));
  const attackDirection = side === 'home' ? 1 : -1;
  const ownGoalDirection = -attackDirection;
  const ballX = clamp(ball.x, 10, 90);
  const ballY = clamp(ball.y, 10, 90);
  const outfield = adjusted.slice(1).map((player, index) => ({
    player,
    index: index + 1,
    distance: Math.hypot(player.x - ballX, player.y - ballY)
  })).sort((a, b) => a.distance - b.distance);

  if (!outfield.length) return adjusted;

  if (role === 'attack') {
    outfield[0].player.x = clamp(ballX - attackDirection * 1.2, 8, 92);
    outfield[0].player.y = clamp(ballY, 10, 90);
    if (outfield[1]) {
      outfield[1].player.x = clamp(ballX - attackDirection * 5.8, 8, 92);
      outfield[1].player.y = clamp(ballY + (outfield[1].player.y >= ballY ? 5.5 : -5.5), 10, 90);
    }
    if (outfield[2]) {
      outfield[2].player.x = clamp(ballX + attackDirection * 4.2, 8, 92);
      outfield[2].player.y = clamp(ballY + (outfield[2].player.y >= ballY ? 7 : -7), 10, 90);
    }
  } else {
    outfield[0].player.x = clamp(ballX + ownGoalDirection * 2.4, 8, 92);
    outfield[0].player.y = clamp(ballY, 10, 90);
    if (outfield[1]) {
      outfield[1].player.x = clamp(ballX + ownGoalDirection * 6.8, 8, 92);
      outfield[1].player.y = clamp(ballY + (outfield[1].player.y >= ballY ? 5 : -5), 10, 90);
    }
  }

  adjusted[0].y = clamp(ballY + (role === 'defend' ? 0.22 : 0.14) * (50 - ballY), 34, 66);
  return adjusted;
}

function buildPitchFrame(match) {
  const minute = match.displayMinute || 0;
  const visual = updatePitchVisual(match, 0);
  const attackSide = visual.attackSide;
  const shapeBall = visual.ball || visual.targetBall || { x: absolutePitchXFromProgress(visual.progressToGoal || 24, attackSide), y: 50 };
  const progressToGoal = getRelativePitchProgress(shapeBall.x, attackSide);
  const phaseInfo = getPitchPhase(progressToGoal);

  let homePlayers = buildFormationPlayers(match.home, 'home', minute, attackSide, phaseInfo, shapeBall);
  let awayPlayers = buildFormationPlayers(match.away, 'away', minute, attackSide, phaseInfo, shapeBall);

  homePlayers = clusterPlayersAroundBall(homePlayers, 'home', attackSide === 'home' ? 'attack' : 'defend', shapeBall);
  awayPlayers = clusterPlayersAroundBall(awayPlayers, 'away', attackSide === 'away' ? 'attack' : 'defend', shapeBall);

  const attackPlayers = attackSide === 'home' ? homePlayers : awayPlayers;
  const possessionT = clamp(visual.possessionElapsed / Math.max(1, visual.possessionDuration), 0, 1);
  const passRoute = [
    { t: 0, index: 0 },
    { t: 0.12, index: 1 },
    { t: 0.26, index: 3 },
    { t: 0.4, index: 5 },
    { t: 0.56, index: 6 },
    { t: 0.72, index: 7 },
    { t: 0.86, index: 8 },
    { t: 1, index: 9 }
  ];

  let passFrom = passRoute[0];
  let passTo = passRoute[passRoute.length - 1];
  for (let index = 0; index < passRoute.length - 1; index += 1) {
    if (possessionT >= passRoute[index].t && possessionT <= passRoute[index + 1].t) {
      passFrom = passRoute[index];
      passTo = passRoute[index + 1];
      break;
    }
  }

  const routeFrom = attackPlayers[Math.min(passFrom.index, attackPlayers.length - 1)] || attackPlayers[0];
  const routeTo = attackPlayers[Math.min(passTo.index, attackPlayers.length - 1)] || attackPlayers[attackPlayers.length - 1];
  const passT = easeInOutProgress((possessionT - passFrom.t) / Math.max(0.0001, passTo.t - passFrom.t));
  const arcLift = phaseInfo.attackKey === 'finish' ? 2.4 : phaseInfo.attackKey === 'create' ? 1.6 : 1.1;
  const ballX = clamp(lerp(routeFrom.x, routeTo.x, passT), 10, 90);
  const ballY = clamp(lerp(routeFrom.y, routeTo.y, passT) - Math.sin(passT * Math.PI) * arcLift, 10, 90);

  visual.progressToGoal = progressToGoal;
  visual.phaseInfo = phaseInfo;
  visual.lastBall = { x: ballX, y: ballY };

  return {
    homePlayers,
    awayPlayers,
    ballX,
    ballY,
    attackSide,
    phaseInfo
  };
}

function renderBirdsEyePitch(match) {
  const frame = buildPitchFrame(match);
  const statusLabel = frame.attackSide === 'home' ? `${match.home.info.name} attacking` : `${match.away.info.name} attacking`;
  const defendingLabel = frame.attackSide === 'home' ? match.away.info.name : match.home.info.name;
  const homePoss = possessionPercent(match, 'home');
  const awayPoss = 100 - homePoss;
  return `
    <div class="card compact-card match-pitch-card">
      <div class="pitch-possession-row" aria-label="Possession split">
        <div class="pitch-possession-team home"><span>${match.home.info.name}</span><strong>${homePoss}%</strong></div>
        <div class="pitch-possession-bar"><span style="width:${homePoss}%"></span></div>
        <div class="pitch-possession-team away"><strong>${awayPoss}%</strong><span>${match.away.info.name}</span></div>
      </div>
      <div class="pitch-status-row">
        <div class="pitch-status-chip">Attack: ${statusLabel} • ${frame.phaseInfo.attackLabel}</div>
        <div class="pitch-meta-row">
          <span class="pitch-meta-tag home">${match.home.formation || DEFAULT_FORMATION} • ${TACTIC_OPTIONS[match.home.tactic].label}</span>
          <span class="pitch-meta-tag away">${match.away.formation || DEFAULT_FORMATION} • ${TACTIC_OPTIONS[match.away.tactic].label}</span>
        </div>
      </div>
      <div class="small-note pitch-phase-note">${defendingLabel} shaping into a ${frame.phaseInfo.defendLabel.toLowerCase()}.</div>
      <div class="pitch-view">
        <div class="pitch-inline-clock">${formatMinute(match)} • ${match.periods[match.periodIndex]?.label || 'Full Time'}</div>
        <div class="pitch-box left"></div>
        <div class="pitch-box right"></div>
        <div class="pitch-six left"></div>
        <div class="pitch-six right"></div>
        <div class="pitch-half-line"></div>
        <div class="pitch-centre-circle"></div>
        <div class="pitch-centre-spot"></div>
        <div class="pitch-team-label home">${match.home.info.name}</div>
        <div class="pitch-team-label away">${match.away.info.name}</div>
        ${frame.homePlayers.map((player) => `<span class="pitch-player home" style="left:${player.x}%; top:${player.y}%;"></span>`).join('')}
        ${frame.awayPlayers.map((player) => `<span class="pitch-player away" style="left:${player.x}%; top:${player.y}%;"></span>`).join('')}
        <span class="pitch-ball" style="left:${frame.ballX}%; top:${frame.ballY}%;"></span>
      </div>
    </div>
  `;
}

function renderSubSelectionButton(player, selected = false, mode = 'out') {
  const secondaryNote = mode === 'out'
    ? `${player.injured ? 'Injured' : 'Available'}${player.yellow ? ' • On a yellow' : ''}`
    : 'Bench option • Ready to enter';

  return `
    <button class="select-player-btn ${selected ? 'selected' : ''}" ${mode === 'out' ? `data-sub-out="${player.id}"` : `data-sub-in="${player.id}"`}>
      <span class="sub-btn-topline">
        <strong>${player.pos}</strong>
        <span class="sub-btn-stamina">Stamina ${Math.round(player.staminaCurrent)}</span>
      </span>
      <span class="sub-btn-name">${player.name}</span>
      <span class="small-note">${secondaryNote}</span>
    </button>
  `;
}

function renderSubsTeamBoard(teamState, overlay = null, editable = false) {
  const active = onFieldPlayers(teamState).filter((player) => !player.sentOff);
  const bench = benchPlayers(teamState);
  return `
    <div class="card compact-card subs-team-board ${editable ? 'editable' : 'read-only'}">
      <div class="team-header subs-team-header">
        <div>
          <div class="subs-board-kicker">${editable ? 'Your team' : 'Other team'}</div>
          <h2 class="subs-team-title">${teamState.info.name}</h2>
        </div>
        <div class="subs-board-summary">
          <span class="subs-info-pill">${teamState.formation || DEFAULT_FORMATION}</span>
          <span class="subs-info-pill">${TACTIC_OPTIONS[teamState.tactic].label}</span>
          <span class="subs-info-pill">Subs ${teamState.subsUsed}/${teamState.maxSubs}</span>
        </div>
      </div>
      <div class="subs-sections">
        <div class="subs-section-block">
          <h3 class="subs-section-title">${editable ? 'Take off' : 'On the pitch'}</h3>
          <div class="team-list">
            ${active.map((player) => editable ? renderSubSelectionButton(player, overlay?.outPlayerId === player.id, 'out') : renderPlayerRow(player)).join('')}
          </div>
        </div>
        <div class="subs-section-block">
          <h3 class="subs-section-title">${editable ? 'Bring on' : 'Bench'}</h3>
          <div class="bench-list">
            ${bench.length ? bench.map((player) => editable ? renderSubSelectionButton(player, overlay?.inPlayerId === player.id, 'in') : renderPlayerRow(player, true)).join('') : '<div class="small-note subs-empty-note">No bench players left.</div>'}
          </div>
        </div>
      </div>
      ${editable ? `<div class="action-row subs-board-actions">
        <div class="small-note subs-action-note">Choose one outgoing player and one incoming player.</div>
        <div class="subs-board-button-row">
          <button data-action="confirm-sub" ${overlay?.outPlayerId && overlay?.inPlayerId ? '' : 'disabled'}>Confirm Sub</button>
          <button class="secondary" data-action="close-overlay">Back to Match</button>
        </div>
      </div>` : ''}
    </div>
  `;
}

function renderGoalkeeperIcon() {
  return '<img src="assets/taidgh-goalie.png" alt="Taidghfantino goalkeeper" class="gk-figure" />';
}

function renderTeamPanel(teamState) {
  const active = onFieldPlayers(teamState);
  const lowStamina = active.filter((player) => player.staminaCurrent < 45).length;
  const yellows = active.filter((player) => player.yellow > 0).length;
  const injured = active.filter((player) => player.injured).length;

  return `
    <div class="card team-summary compact-card">
      <div class="team-header">
        <div>
          <h2 style="margin:0;">${teamState.info.name}</h2>
          <div class="small-note">${teamState.controlled ? '<span class="badge controlled">🎮 Controlled</span>' : 'AI controlled'}</div>
        </div>
      </div>

      <div class="rating-bars">
        ${['attack','midfield','defence','gk'].map((key) => `
          <div class="rating-bar">
            <label><span>${key === 'gk' ? 'Goalkeeper' : key[0].toUpperCase() + key.slice(1)}</span><span>${teamState.info.ratings[key]}</span></label>
            <div class="bar"><span style="width:${teamState.info.ratings[key]}%"></span></div>
          </div>
        `).join('')}
      </div>

      <div class="small-note">Formation: <strong>${teamState.formation || DEFAULT_FORMATION}</strong> • Tactic: <strong>${TACTIC_OPTIONS[teamState.tactic].label}</strong></div>
      <div class="small-note">Low stamina: <strong>${lowStamina}</strong> • Yellows: <strong>${yellows}</strong> • Injuries: <strong>${injured}</strong></div>

      <div>
        <h3>On the pitch</h3>
        <div class="team-list">${active.map((player) => renderPlayerRow(player)).join('')}</div>
      </div>

      <div>
        <h3>Bench</h3>
        <div class="bench-list">${benchPlayers(teamState).map((player) => renderPlayerRow(player, true)).join('')}</div>
      </div>
    </div>
  `;
}

function renderPlayerRow(player, bench = false) {
  return `
    <div class="player-row">
      <div><strong>${player.pos}</strong></div>
      <div>
        <div>${player.name}</div>
        <small>
          Stamina ${Math.round(player.staminaCurrent)}
          ${bench ? ' • bench' : ''}
          ${player.yellow ? ' • 🟨' + player.yellow : ''}
          ${player.red ? ' • 🟥' : ''}
          ${player.injured ? ' • injured' : ''}
        </small>
      </div>
      <div class="stamina"><div class="bar"><span style="width:${Math.max(0, player.staminaCurrent)}%; background:linear-gradient(90deg,#ffd973,#25d366);"></span></div></div>
    </div>
  `;
}

function renderOverlay(overlay) {
  if (overlay.type === 'rule') return renderRuleOverlay(overlay.rule);
  if (overlay.type === 'chance') return renderChanceOverlay(overlay);
  if (overlay.type === 'subs') return renderSubsOverlay(overlay);
  if (overlay.type === 'halftime') return renderHalftimeOverlay();
  if (overlay.type === 'period-break') return renderPeriodBreakOverlay(overlay);
  if (overlay.type === 'final') return renderFinalOverlay(overlay);
  if (overlay.type === 'tactics') return renderTacticsOverlay();
  return '';
}

function renderRuleOverlay(rule) {
  return `
    <div class="overlay">
      <div class="overlay-card">
        <div class="rule-card">
          <img src="assets/taidghfantino.png" alt="Taidghfantino" />
          <div>
            <div class="title-badge">📣 Taidghfantino Decree</div>
            <div class="rule-title">${rule.title}</div>
            <p class="subtitle" style="font-size:18px; margin-top:0;">${rule.text}</p>
            <div class="action-row">
              <button data-action="accept-rule">Start Match</button>
              <button class="secondary" data-action="go-settings">Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderChanceOverlay(overlay) {
  const modeLabel = overlay.mode === 'attack'
    ? `YOU ARE SHOOTING FOR ${overlay.team.info.name.toUpperCase()}`
    : `YOU ARE SAVING FOR ${overlay.defendingTeam.info.name.toUpperCase()}`;
  const shortInstruction = overlay.mode === 'attack' ? 'Pick 1 square to shoot at.' : 'Pick 1 square to dive to.';

  return `
    <div class="overlay">
      <div class="overlay-card">
        <div class="goal-overlay simplified-goal-overlay">
          <div class="goal-scene" id="goal-scene">
            <div class="goal-line"></div>
            <div class="penalty-box-lines"></div>
            <div class="six-yard-box-lines"></div>
            <div class="penalty-spot"></div>
            <div class="goal-arc"></div>
            <div class="goal-frame">
              <div class="goal-net"></div>
              <div class="goal-grid">
                ${GOAL_ZONES.map((zone) => {
                  const classes = ['goal-cell'];
                  if (overlay.selectedZone === null && !overlay.resolved) classes.push('selectable');
                  if (overlay.selectedZone === zone.id) classes.push('selected');
                  if (overlay.guessZone === zone.id) classes.push('guessed');
                  if (overlay.resolved && overlay.targetZone === zone.id && overlay.outcome === 'goal') classes.push('outcome-goal');
                  return `<div class="${classes.join(' ')}" data-zone="${zone.id}"></div>`;
                }).join('')}
              </div>
            </div>
            <div class="gk" id="gk">${renderGoalkeeperIcon()}</div>
            <div class="ball" id="ball"></div>
            <div class="scene-banner">${overlay.sceneText}</div>
            ${!overlay.resolved ? `<div class="scene-countdown">${overlay.countdown}</div>` : ''}
          </div>

          <div class="goal-panel compact-goal-panel">
            <div class="chance-mode ${overlay.mode === 'attack' ? 'attack' : 'save'}">${modeLabel}</div>
            <div>
              <div class="title-badge">${overlay.kind === 'penalty' ? '🎯 Penalty' : '🔥 Big Chance'}</div>
              <h2>${shortInstruction}</h2>
            </div>
            ${overlay.resolved ? `<div class="chance-result ${overlay.outcome}">${overlay.resultText}</div><div class="small-note auto-return-note">Back to the match in 3 seconds...</div>` : '<div class="action-row"><button class="secondary" data-action="auto-pick-zone">Auto Pick</button></div>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSubsOverlay(overlay) {
  const team = getMatchTeam(overlay.side);
  const opponent = getMatchTeam(overlay.side === 'home' ? 'away' : 'home');

  return `
    <div class="overlay">
      <div class="overlay-card subs-screen-card">
        <div class="title-badge">🔁 Substitutions</div>
        <div class="subs-screen-head">
          <div>
            <h2>Substitution screen</h2>
            <div class="subtitle subs-screen-subtitle">Pick one player to come off and one to come on. Stamina is shown across both teams so formation decisions stay quick and readable.</div>
          </div>
          <div class="subs-screen-legend">
            <span class="subs-legend-pill editable">Your team</span>
            <span class="subs-legend-pill">Other team</span>
          </div>
        </div>
        <div class="subs-side-by-side">
          ${renderSubsTeamBoard(team, overlay, true)}
          ${renderSubsTeamBoard(opponent, null, false)}
        </div>
      </div>
    </div>
  `;
}

function renderHalftimeOverlay() {
  const match = appState.currentMatch;
  return `
    <div class="overlay">
      <div class="overlay-card">
        <div class="title-badge">⏱️ Half-time</div>
        <h2>${match.home.info.name} ${match.score.home} - ${match.score.away} ${match.away.info.name}</h2>
        <div class="stat-grid" style="margin:18px 0;">
          <div class="mini-stat"><strong>${match.stats.homeShots}-${match.stats.awayShots}</strong>Shots</div>
          <div class="mini-stat"><strong>${match.stats.homeOnTarget}-${match.stats.awayOnTarget}</strong>On target</div>
          <div class="mini-stat"><strong>${possessionPercent(match, 'home')}%-${possessionPercent(match, 'away')}%</strong>Possession</div>
          <div class="mini-stat"><strong>${match.home.subsUsed + match.away.subsUsed}</strong>Total subs</div>
        </div>
        <div class="action-row">
          <button data-action="continue-second-half">Start Second Half</button>
          <button class="secondary" data-action="open-subs">Make Substitution</button>
          <button class="secondary" data-action="toggle-tactic">Change Tactic</button>
        </div>
      </div>
    </div>
  `;
}

function renderPeriodBreakOverlay(overlay) {
  return `
    <div class="overlay">
      <div class="overlay-card">
        <div class="title-badge">⏳ ${overlay.title}</div>
        <h2>${overlay.message}</h2>
        <div class="action-row">
          <button data-action="continue-period-break">Continue</button>
          ${overlay.canSub ? '<button class="secondary" data-action="open-subs">Make Substitution</button>' : ''}
        </div>
      </div>
    </div>
  `;
}

function renderFinalOverlay(overlay) {
  return `
    <div class="overlay">
      <div class="overlay-card final-card">
        ${overlay.championCeremony ? `
          <div class="title-badge">🏆 Champion</div>
          <div class="champion-ceremony">
            <img src="assets/taidghfantino.png" alt="Taidghfantino" class="champion-taidgh" />
            <div class="champion-trophy">${renderWorldCupIcon()}</div>
          </div>
        ` : '<div class="title-badge">🏁 Full Time</div>'}
        <h1>${overlay.title}</h1>
        <div class="final-score">${overlay.scoreline}</div>
        <div class="subtitle" style="font-size:18px; max-width:700px; margin:0 auto;">${overlay.summary}</div>
        <div class="button-row" style="justify-content:center; margin-top:24px;">
          ${overlay.tournamentContinue ? '<button data-action="continue-tournament">Continue Tournament</button>' : '<button data-action="new-friendly">Play Another Friendly</button>'}
          <button class="secondary" data-action="go-menu-and-clear">Back to Menu</button>
        </div>
      </div>
    </div>
  `;
}

function renderTacticsOverlay() {
  const controlled = getControlledTeam(appState.currentMatch);
  const currentFormation = controlled.formation || DEFAULT_FORMATION;
  return `
    <div class="overlay">
      <div class="overlay-card">
        <div class="title-badge">🧠 Tactics</div>
        <h2>${controlled.info.name} tactics & formation</h2>
        <div class="small-note">Current setup: <strong>${currentFormation}</strong> • <strong>${TACTIC_OPTIONS[controlled.tactic].label}</strong></div>

        <h3 style="margin-top:16px;">Formation</h3>
        <div class="feature-grid formation-grid" style="margin-top:10px;">
          ${Object.entries(FORMATION_OPTIONS).map(([key, value]) => `
            <button class="select-player-btn ${currentFormation === key ? 'selected' : ''}" data-formation="${key}">
              <strong>${value.label}</strong><br />
              <span class="small-note">Attack ${formatSigned(value.attack)} • Defence ${formatSigned(value.defence)}</span>
            </button>
          `).join('')}
        </div>

        <h3 style="margin-top:16px;">Mentality</h3>
        <div class="feature-grid" style="margin-top:10px;">
          ${Object.entries(TACTIC_OPTIONS).map(([key, value]) => `
            <button class="select-player-btn ${controlled.tactic === key ? 'selected' : ''}" data-tactic="${key}">
              <strong>${value.label}</strong><br />
              <span class="small-note">Attack ${formatSigned(value.attack)} • Defence ${formatSigned(value.defence)} • Stamina ${formatSigned(value.stamina)}</span>
            </button>
          `).join('')}
        </div>
        <div class="button-row"><button class="secondary" data-action="close-overlay">Done</button></div>
      </div>
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      ensureAudio();
      handleAction(event.currentTarget.getAttribute('data-action'));
    });
  });

  document.querySelectorAll('[data-setting]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      appState.settings[event.currentTarget.getAttribute('data-setting')] = event.currentTarget.checked;
      saveSettings();
      render();
    });
  });

  document.querySelectorAll('[data-setting-select]').forEach((select) => {
    select.addEventListener('change', (event) => {
      const key = event.currentTarget.getAttribute('data-setting-select');
      appState.settings[key] = key === 'matchLength' ? Number(event.currentTarget.value) : event.currentTarget.value;
      saveSettings();
      render();
    });
  });

  document.querySelectorAll('[data-setup]').forEach((select) => {
    select.addEventListener('change', (event) => {
      appState.friendlySetup[event.currentTarget.getAttribute('data-setup')] = event.currentTarget.value;
      render();
    });
  });

  document.querySelectorAll('[data-setup-check]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      appState.friendlySetup[event.currentTarget.getAttribute('data-setup-check')] = event.currentTarget.checked;
    });
  });

  document.querySelectorAll('[data-tournament-setup]').forEach((select) => {
    select.addEventListener('change', (event) => {
      appState.tournamentSetup[event.currentTarget.getAttribute('data-tournament-setup')] = event.currentTarget.value;
      render();
    });
  });

  document.querySelectorAll('[data-zone]').forEach((cell) => {
    cell.addEventListener('click', () => {
      ensureAudio();
      if (!appState.overlay || appState.overlay.type !== 'chance' || appState.overlay.selectedZone !== null || appState.overlay.resolved) return;
      pickChanceZone(Number(cell.getAttribute('data-zone')));
    });
  });

  document.querySelectorAll('[data-sub-out]').forEach((button) => {
    button.addEventListener('click', () => {
      appState.overlay.outPlayerId = button.getAttribute('data-sub-out');
      render();
    });
  });

  document.querySelectorAll('[data-sub-in]').forEach((button) => {
    button.addEventListener('click', () => {
      appState.overlay.inPlayerId = button.getAttribute('data-sub-in');
      render();
    });
  });

  document.querySelectorAll('[data-tactic]').forEach((button) => {
    button.addEventListener('click', () => {
      const team = getControlledTeam(appState.currentMatch);
      team.tactic = button.getAttribute('data-tactic');
      addFeed(appState.currentMatch, appState.currentMatch.minute, `${team.info.name} switch to ${TACTIC_OPTIONS[team.tactic].label}.`);
      render();
    });
  });

  document.querySelectorAll('[data-formation]').forEach((button) => {
    button.addEventListener('click', () => {
      const team = getControlledTeam(appState.currentMatch);
      team.formation = button.getAttribute('data-formation');
      addFeed(appState.currentMatch, appState.currentMatch.minute, `${team.info.name} switch to ${getFormationOption(team.formation).label}.`);
      render();
    });
  });
}

function handleAction(action) {
  switch (action) {
    case 'lock-portrait':
      requestPortrait();
      return;
    case 'go-setup-friendly':
      appState.setupMode = 'friendly';
      appState.screen = 'setup';
      render();
      return;
    case 'go-setup-one':
      appState.setupMode = 'tournament_one';
      appState.screen = 'setup';
      render();
      return;
    case 'go-setup-all':
      appState.setupMode = 'tournament_all';
      appState.screen = 'setup';
      render();
      return;
    case 'go-setup-watch':
      appState.setupMode = 'watch';
      appState.screen = 'setup';
      render();
      return;
    case 'tab-standings':
      appState.tournamentTab = 'standings';
      render();
      return;
    case 'tab-results':
      appState.tournamentTab = 'results';
      render();
      return;
    case 'go-menu':
      stopLiveLoop();
      appState.overlay = null;
      appState.screen = 'menu';
      render();
      return;
    case 'go-settings':
      appState.screen = 'settings';
      render();
      return;
    case 'continue-saved':
      resumeSavedMatch();
      return;
    case 'start-friendly':
      startFriendlyMatch();
      return;
    case 'start-tournament':
      startTournament();
      return;
    case 'tournament-play-selected':
      playCurrentTournamentFixture(appState.tournament?.selectedTeam);
      return;
    case 'tournament-play-home':
      playCurrentTournamentFixture(getCurrentTournamentFixture(appState.tournament)?.homeTeam);
      return;
    case 'tournament-play-away':
      playCurrentTournamentFixture(getCurrentTournamentFixture(appState.tournament)?.awayTeam);
      return;
    case 'tournament-sim-next':
      simulateNextTournamentFixture();
      return;
    case 'tournament-sim-to-team':
      simulateUntilSelectedTeam();
      return;
    case 'tournament-sim-all':
      simulateEntireTournament();
      return;
    case 'continue-tournament':
      appState.currentMatch = null;
      appState.overlay = null;
      appState.screen = 'tournamentHub';
      render();
      return;
    case 'save-progress':
      saveCurrentMatch();
      return;
    case 'accept-rule':
      appState.overlay = null;
      render();
      playStartWhistle();
      startLiveLoop();
      return;
    case 'toggle-tactic': {
      const returnOverlay = appState.overlay && (appState.overlay.type === 'halftime' || appState.overlay.type === 'period-break')
        ? clone(appState.overlay)
        : null;
      pauseMatch('overlay');
      appState.overlay = { type: 'tactics', returnOverlay };
      render();
      return;
    }
    case 'open-subs': {
      const controlled = getControlledTeam(appState.currentMatch);
      if (!controlled || controlled.subsUsed >= controlled.maxSubs || benchPlayers(controlled).length === 0) {
        showToast('No substitutions available.');
        return;
      }
      const returnOverlay = appState.overlay && (appState.overlay.type === 'halftime' || appState.overlay.type === 'period-break')
        ? clone(appState.overlay)
        : null;
      pauseMatch('overlay');
      appState.overlay = { type: 'subs', side: controlled.side, outPlayerId: null, inPlayerId: null, returnOverlay };
      render();
      return;
    }
    case 'confirm-sub':
      confirmSubstitution();
      return;
    case 'close-overlay': {
      const prior = appState.overlay?.returnOverlay || null;
      appState.overlay = prior;
      render();
      if (!prior) resumeLiveIfPossible();
      return;
    }
    case 'continue-second-half':
      appState.overlay = null;
      startPeriod(1);
      return;
    case 'continue-period-break':
      handleContinuePeriodBreak();
      return;
    case 'auto-pick-zone':
      pickChanceZone(randomInt(0, 7));
      return;
    case 'continue-after-chance':
      finishChanceOverlay();
      return;
    case 'save-match':
      pauseMatch('paused');
      saveCurrentMatch();
      render();
      return;
    case 'go-menu-from-match':
      pauseMatch('paused');
      saveCurrentMatch();
      appState.overlay = null;
      appState.screen = 'menu';
      render();
      return;
    case 'new-friendly':
      stopLiveLoop();
      clearPendingTimeouts();
      appState.currentMatch = null;
      appState.overlay = null;
      clearSavedMatch();
      appState.screen = 'setup';
      render();
      return;
    case 'go-menu-and-clear':
      stopLiveLoop();
      clearPendingTimeouts();
      appState.currentMatch = null;
      appState.overlay = null;
      clearSavedMatch();
      appState.screen = 'menu';
      render();
      return;
    default:
      return;
  }
}

function startLiveLoop() {
  stopLiveLoop();
  const match = appState.currentMatch;
  if (!match || match.ended) return;
  normaliseMatchClockState(match);
  match.phase = 'live';
  if (!match.segmentRemaining || match.segmentRemaining <= 0) {
    scheduleNextSegment(false);
    match.minute = clamp(typeof match.minute === 'number' ? match.minute : match.segmentMinuteStart, match.segmentMinuteStart, match.segmentMinuteEnd);
    match.displayMinute = clamp(typeof match.displayMinute === 'number' ? match.displayMinute : match.minute, match.segmentMinuteStart, match.segmentMinuteEnd);
  }
  liveInterval = setInterval(tickLiveMatch, LIVE_TICK_MS);
}

function normaliseMatchClockState(match) {
  if (!match?.periods?.length) return;

  const minuteMark = Math.max(Number(match.displayMinute) || 0, Number(match.minute) || 0);
  let inferredPeriodIndex = 0;
  if (minuteMark >= 105) inferredPeriodIndex = 3;
  else if (minuteMark >= 90) inferredPeriodIndex = 2;
  else if (minuteMark >= 45) inferredPeriodIndex = 1;

  const existingPeriod = match.periods[Number.isInteger(match.periodIndex) ? match.periodIndex : 0] || match.periods[0];
  const existingPeriodEnd = existingPeriod.startMinute + existingPeriod.segmentMinutes * existingPeriod.segments;
  if (!Number.isInteger(match.periodIndex) || minuteMark < existingPeriod.startMinute || minuteMark >= existingPeriodEnd) {
    match.periodIndex = inferredPeriodIndex;
  }
  match.periodIndex = clamp(match.periodIndex, 0, match.periods.length - 1);

  const period = match.periods[match.periodIndex] || match.periods[0];
  const withinPeriodMinute = clamp(minuteMark - period.startMinute, 0, Math.max(0, period.segmentMinutes * period.segments - 0.001));
  const inferredSegmentIndex = clamp(Math.floor(withinPeriodMinute / period.segmentMinutes), 0, period.segments - 1);

  if (
    !Number.isInteger(match.segmentIndex)
    || match.segmentIndex < 0
    || match.segmentIndex >= period.segments
    || Math.abs((period.startMinute + period.segmentMinutes * match.segmentIndex) - minuteMark) >= period.segmentMinutes
  ) {
    match.segmentIndex = inferredSegmentIndex;
  }

  match.segmentMinuteStart = period.startMinute + period.segmentMinutes * match.segmentIndex;
  match.segmentMinuteEnd = match.segmentMinuteStart + period.segmentMinutes;

  if (typeof match.minute !== 'number' || Number.isNaN(match.minute)) {
    match.minute = match.segmentMinuteStart;
  }
  if (typeof match.displayMinute !== 'number' || Number.isNaN(match.displayMinute)) {
    match.displayMinute = match.minute;
  }
}

function stopLiveLoop() {
  if (liveInterval) {
    clearInterval(liveInterval);
    liveInterval = null;
  }
}

function pauseMatch(phase = 'overlay') {
  if (!appState.currentMatch) return;
  stopLiveLoop();
  appState.currentMatch.phase = phase;
}

function resumeLiveIfPossible() {
  if (!appState.currentMatch || appState.currentMatch.ended || appState.overlay) return;
  if (appState.currentMatch.phase === 'overlay' || appState.currentMatch.phase === 'paused') {
    startLiveLoop();
  }
}

function startPeriod(periodIndex) {
  const match = appState.currentMatch;
  if (!match) return;
  stopLiveLoop();
  match.periodIndex = periodIndex;
  match.segmentIndex = 0;
  scheduleNextSegment(true);
  render();
  playWhistle();
  startLiveLoop();
}

function scheduleNextSegment(resetMinute = false) {
  const match = appState.currentMatch;
  const period = match.periods[match.periodIndex];
  const [minDuration, maxDuration] = match.segmentRange || MATCH_LENGTHS[4].segmentRange;
  match.segmentDuration = randomInt(minDuration, maxDuration) * 1000;
  match.segmentRemaining = match.segmentDuration;
  match.segmentProgress = 0;
  match.segmentMinuteStart = period.startMinute + period.segmentMinutes * match.segmentIndex;
  match.segmentMinuteEnd = match.segmentMinuteStart + period.segmentMinutes;
  if (resetMinute) {
    match.minute = match.segmentMinuteStart;
    match.displayMinute = match.segmentMinuteStart;
  }
}

function tickLiveMatch() {
  const match = appState.currentMatch;
  if (!match || match.phase !== 'live') return;

  match.segmentRemaining -= LIVE_TICK_MS;
  match.segmentProgress += LIVE_TICK_MS;
  const travel = 1 - match.segmentRemaining / match.segmentDuration;
  match.displayMinute = Math.min(match.segmentMinuteEnd, match.segmentMinuteStart + (match.segmentMinuteEnd - match.segmentMinuteStart) * travel);

  tickStamina(match.home);
  tickStamina(match.away);
  updatePitchVisual(match, LIVE_TICK_MS);
  tickCrowdAmbience(match, LIVE_TICK_MS);
  render();

  if (match.segmentRemaining <= 0) {
    match.minute = match.segmentMinuteEnd;
    match.displayMinute = match.minute;
    resolveSegment();
  }
}

function tickStamina(team) {
  const tactic = TACTIC_OPTIONS[team.tactic];
  const formation = getFormationOption(team.formation);
  const staminaTax = appState.currentMatch?.rule?.effect?.staminaTax || 0;
  onFieldPlayers(team).forEach((player) => {
    const drain = 0.7 + tactic.stamina + Math.max(0, formation.press) * 0.08 + Math.max(0, formation.width) * 0.02 + (player.yellow ? 0.05 : 0) + (player.injured ? 0.3 : 0) + staminaTax;
    player.staminaCurrent = Math.max(10, player.staminaCurrent - drain);
    player.minutesPlayed += 1;
  });
}

function tickCrowdAmbience(match, elapsedMs) {
  if (!match || !appState.settings.sounds) return;
  const audioState = match.audioState || (match.audioState = { liveCrowdElapsed: 0, nextLiveCrowdMs: 4200 });
  audioState.liveCrowdElapsed += elapsedMs;
  if (audioState.liveCrowdElapsed < audioState.nextLiveCrowdMs) return;

  const visual = updatePitchVisual(match, 0);
  const phase = visual ? visual.progressToGoal : 40;
  const phaseInfo = getPitchPhase(phase);
  const intensity = phaseInfo.attackKey === 'finish' ? 0.62 : phaseInfo.attackKey === 'create' ? 0.4 : 0.24;
  playCrowdMurmur(intensity);
  if (phaseInfo.attackKey === 'finish') playCrowdAnticipation(2);
  else if (phaseInfo.attackKey === 'create' && Math.random() < 0.45) playCrowdAnticipation(4);

  audioState.liveCrowdElapsed = 0;
  audioState.nextLiveCrowdMs = randomInt(2800, phaseInfo.attackKey === 'finish' ? 4300 : 6200);
}

function resolveSegment() {
  const match = appState.currentMatch;
  stopLiveLoop();
  maybeAISub(match, match.home);
  maybeAISub(match, match.away);

  const attackSide = chooseAttackingSide(match);
  const defendSide = attackSide === 'home' ? 'away' : 'home';
  const attackingTeam = match[attackSide];
  const defendingTeam = match[defendSide];

  match.stats.homePossession += attackSide === 'home' ? 1.2 : 0.6;
  match.stats.awayPossession += attackSide === 'away' ? 1.2 : 0.6;

  const eventType = chooseEventType(match, attackingTeam, defendingTeam);

  if (eventType === 'quiet') {
    addFeed(match, match.minute, randomFrom([
      `${attackingTeam.info.name} circulate the ball, but ${defendingTeam.info.name} stay organised.`,
      `A tense midfield battle breaks out as both teams search for control.`,
      `${attackingTeam.info.name} push forward, but the final pass is not there yet.`
    ]));
    advanceOrBreak();
    return;
  }

  if (eventType === 'card') {
    resolveCardEvent(match, attackingTeam, defendingTeam);
    if (checkMinimumPlayers(defendingTeam) || checkMinimumPlayers(attackingTeam)) return;
    advanceOrBreak();
    return;
  }

  if (eventType === 'injury') {
    resolveInjuryEvent(match, attackingTeam, defendingTeam);
    if (appState.overlay?.type === 'subs') return;
    advanceOrBreak();
    return;
  }

  if (eventType === 'chance' || eventType === 'longshot' || eventType === 'setpiece') {
    const shooter = chooseShooter(attackingTeam, eventType);
    const keeper = goalkeeper(defendingTeam);
    const baseChance = baseChanceForEvent(eventType, attackingTeam, defendingTeam, shooter, match);

    if (attackSide === 'home') match.stats.homeBigChances += 1;
    else match.stats.awayBigChances += 1;

    appState.overlay = {
      type: 'chance',
      kind: eventType === 'setpiece' ? 'set-piece' : eventType,
      team: attackingTeam,
      defendingTeam,
      shooterSide: attackSide,
      mode: attackingTeam.controlled ? 'attack' : 'save',
      kicker: shooter,
      goalkeeper: keeper,
      selectedZone: null,
      guessZone: null,
      targetZone: null,
      outcome: null,
      resolved: false,
      resultText: '',
      baseChance,
      sceneText: eventType === 'longshot'
        ? `${shooter.name} lines one up from distance...`
        : eventType === 'setpiece'
          ? `${shooter.name} stands over a dangerous dead ball...`
          : `${shooter.name} breaks clear inside the box...`,
      countdown: eventType === 'longshot' ? 5 : 6
    };
    match.phase = 'overlay';
    playCrowdBuildUp();
    render();
    startChanceCountdown();
    return;
  }

  advanceOrBreak();
}

function advanceOrBreak() {
  const match = appState.currentMatch;
  if (match.segmentIndex < match.periods[match.periodIndex].segments - 1) {
    match.segmentIndex += 1;
    scheduleNextSegment();
    render();
    startLiveLoop();
  } else {
    handleEndOfPeriod();
  }
}

function handleEndOfPeriod() {
  const match = appState.currentMatch;
  stopLiveLoop();
  if (match.periodIndex === 0) {
    match.phase = 'halftime';
    appState.overlay = { type: 'halftime' };
    playWhistle();
    render();
    return;
  }

  if (match.periodIndex === 1) {
    if (match.score.home === match.score.away && match.knockoutFinish) {
      match.extraTimeStarted = true;
      match.phase = 'overlay';
      appState.overlay = {
        type: 'period-break',
        title: 'Extra Time',
        message: 'Scores are level after 90 minutes. Extra time is coming up.',
        nextPeriodIndex: 2,
        canSub: true
      };
      render();
      return;
    }
    finishMatch();
    return;
  }

  if (match.periodIndex === 2) {
    match.phase = 'overlay';
    appState.overlay = {
      type: 'period-break',
      title: 'Extra Time Interval',
      message: 'Fifteen more minutes remain. One last push before penalties.',
      nextPeriodIndex: 3,
      canSub: true
    };
    render();
    return;
  }

  if (match.periodIndex === 3) {
    if (match.score.home === match.score.away) {
      startPenaltyShootout();
      return;
    }
    finishMatch();
  }
}

function handleContinuePeriodBreak() {
  const overlay = appState.overlay;
  if (!overlay || overlay.type !== 'period-break') return;
  appState.overlay = null;
  startPeriod(overlay.nextPeriodIndex);
}

function chooseAttackingSide(match) {
  const homeValue = teamAttackValue(match.home) + match.momentum.home;
  const awayValue = teamAttackValue(match.away) + match.momentum.away;
  return Math.random() * (homeValue + awayValue) < homeValue ? 'home' : 'away';
}

function teamAttackValue(team) {
  const tactic = TACTIC_OPTIONS[team.tactic];
  const formation = getFormationOption(team.formation);
  const active = onFieldPlayers(team);
  const avgStamina = average(active.map((p) => p.staminaCurrent));
  const manpowerPenalty = (11 - active.length) * 3;
  return team.info.ratings.attack + tactic.attack + formation.attack + formation.press * 1.4 + team.difficultyBoost + team.morale + avgStamina * 0.08 - manpowerPenalty;
}

function teamDefenceValue(team) {
  const tactic = TACTIC_OPTIONS[team.tactic];
  const formation = getFormationOption(team.formation);
  const active = onFieldPlayers(team);
  const avgStamina = average(active.map((p) => p.staminaCurrent));
  const manpowerPenalty = (11 - active.length) * 4;
  const gk = goalkeeper(team);
  return team.info.ratings.defence + tactic.defence + formation.defence + team.info.ratings.gk * 0.35 + avgStamina * 0.06 + (gk?.gk || 70) * 0.2 - manpowerPenalty;
}

function chooseEventType(match, attackingTeam, defendingTeam) {
  const pressure = teamAttackValue(attackingTeam) - teamDefenceValue(defendingTeam);
  let roll = Math.random();
  if (pressure > 8) roll -= 0.08;
  if (pressure < -5) roll += 0.05;
  if (roll < 0.22) return 'quiet';
  if (roll < 0.29) return 'card';
  if (roll < 0.34) return 'injury';
  if (roll < 0.60) return 'chance';
  if (roll < 0.74) return 'setpiece';
  return 'longshot';
}

function resolveCardEvent(match, attackingTeam, defendingTeam) {
  const strictness = (match.rule?.effect?.cardRate || 0) + 0.05;
  const offenderTeam = Math.random() < 0.55 ? defendingTeam : attackingTeam;
  const player = randomFrom(onFieldPlayers(offenderTeam).filter((p) => !p.isKeeper));
  if (!player) return;

  const redChance = 0.05 + Math.max(0, 70 - player.discipline) / 250 + strictness / 2;
  if (Math.random() < redChance || (player.yellow >= 1 && Math.random() < 0.22)) {
    player.red = true;
    player.sentOff = true;
    player.onField = false;
    offenderTeam.reds += 1;
    addFeed(match, match.minute, `🟥 ${player.name} is sent off for ${offenderTeam.info.name}! The referee shows no mercy.`);
    playCardSound(true);
  } else {
    player.yellow += 1;
    offenderTeam.cards += 1;
    addFeed(match, match.minute, `🟨 ${player.name} goes into the book after a clumsy challenge.`);
    playCardSound(false);
  }
}

function resolveInjuryEvent(match, attackingTeam, defendingTeam) {
  const affectedTeam = Math.random() < 0.5 ? attackingTeam : defendingTeam;
  const player = randomFrom(onFieldPlayers(affectedTeam).filter((p) => !p.isKeeper));
  if (!player) return;
  player.injured = true;
  player.injuryText = randomFrom(['tight hamstring', 'twisted ankle', 'heavy knock']);
  player.staminaCurrent = Math.max(15, player.staminaCurrent - 22);
  affectedTeam.injuries += 1;
  addFeed(match, match.minute, `🤕 ${player.name} is down with a ${player.injuryText}.`);
  playCardSound(false, 220);

  if (affectedTeam.controlled && affectedTeam.subsUsed < affectedTeam.maxSubs && benchPlayers(affectedTeam).length > 0) {
    pauseMatch('overlay');
    appState.overlay = { type: 'subs', side: affectedTeam.side, outPlayerId: player.id, inPlayerId: null };
    render();
  }
}

function checkMinimumPlayers(team) {
  if (onFieldPlayers(team).length >= 7) return false;
  const other = appState.currentMatch[team.side === 'home' ? 'away' : 'home'];
  finishMatch(`${other.info.name} win by forfeit after ${team.info.name} are reduced below seven players.`);
  return true;
}

function chooseShooter(team, eventType) {
  const field = onFieldPlayers(team).filter((p) => !p.isKeeper);
  const weighted = field.flatMap((player) => {
    let weight = Math.max(1, player.finishing - 55);
    if (player.pos.includes('ST')) weight += 25;
    if (player.pos.includes('W') || player.pos === 'AM' || player.pos === 'FW') weight += 10;
    if (eventType === 'longshot') weight += Math.max(0, player.passing - 68);
    return Array.from({ length: Math.max(1, Math.round(weight / 7)) }, () => player);
  });
  return randomFrom(weighted.length ? weighted : field);
}

function goalkeeper(team) {
  return onFieldPlayers(team).find((player) => player.isKeeper) || team.squad.find((player) => player.isKeeper);
}

function baseChanceForEvent(eventType, attackingTeam, defendingTeam, shooter, match) {
  let base = 0.38 + (match.rule?.effect?.chanceBoost || 0);
  if (eventType === 'longshot') base = 0.16 + (match.rule?.effect?.longShotBoost || 0) + (match.rule?.effect?.chanceBoost || 0);
  if (eventType === 'setpiece') base = 0.32 + (match.rule?.effect?.chanceBoost || 0) * 0.7;
  base += (shooter.finishing - 75) / 220;
  base += (teamAttackValue(attackingTeam) - teamDefenceValue(defendingTeam)) / 420;
  if (shooter.staminaCurrent < 45) base -= 0.04;
  return clamp(base, 0.08, 0.78);
}

function startChanceCountdown() {
  clearPendingTimeouts();
  const overlay = appState.overlay;
  if (!overlay || overlay.type !== 'chance') return;
  playCrowdAnticipation(overlay.countdown);
  const tick = () => {
    if (!appState.overlay || appState.overlay.type !== 'chance' || appState.overlay.resolved || appState.overlay.selectedZone !== null) return;
    overlay.countdown -= 1;
    if (overlay.countdown <= 0) {
      pickChanceZone(randomInt(0, 7));
      return;
    }
    playCrowdAnticipation(overlay.countdown);
    render();
    queueTimeout(tick, 1000);
  };
  queueTimeout(tick, 1000);
}

function pickChanceZone(zoneId) {
  const overlay = appState.overlay;
  if (!overlay || overlay.type !== 'chance' || overlay.selectedZone !== null) return;
  overlay.selectedZone = zoneId;
  playKickSound();
  playCrowdAnticipation(1);
  render();
  queueTimeout(() => resolveChance(zoneId), 900);
}

function resolveChance(zoneId) {
  const match = appState.currentMatch;
  const overlay = appState.overlay;
  if (!match || !overlay || overlay.type !== 'chance') return;

  const attackSide = overlay.shooterSide;
  const defendSide = attackSide === 'home' ? 'away' : 'home';
  const attackingTeam = match[attackSide];
  const defendingTeam = match[defendSide];
  const shooter = overlay.kicker;
  const keeper = overlay.goalkeeper;
  const targetZone = overlay.mode === 'attack' ? zoneId : randomWeightedZoneForAI(shooter);
  const guessZone = overlay.mode === 'save' ? zoneId : randomGoalkeeperGuess(keeper, targetZone);
  const zone = GOAL_ZONES[targetZone];
  const difficulty = DIFFICULTIES[match.difficulty];
  const guessedCorrect = guessZone === targetZone;

  overlay.targetZone = targetZone;
  overlay.guessZone = guessZone;

  let chance = overlay.baseChance;
  chance += (shooter.finishing - 78) / 170;
  chance += (shooter.composure - 78) / 250;
  chance += zone.difficulty;
  chance += TACTIC_OPTIONS[attackingTeam.tactic].attack / 220;
  chance -= TACTIC_OPTIONS[defendingTeam.tactic].defence / 260;
  chance -= ((keeper.gk || 75) - 78) / 230;
  chance += (match.rule?.effect?.chanceBoost || 0) * 0.9;
  chance += (match.rule?.effect?.keeperNerf || 0) / 220;
  if (overlay.kind === 'penalty') chance = 0.79 + (shooter.penalty - 78) / 125 + ((match.rule?.effect?.penaltyBoost || 0) / 100) + (match.rule?.effect?.keeperNerf || 0) / 220;
  if (overlay.kind === 'longshot') chance += (match.rule?.effect?.longShotBoost || 0);
  if (guessedCorrect) chance -= overlay.kind === 'penalty' ? 0.40 : 0.34 + zone.keeperBias;
  else chance += overlay.kind === 'penalty' ? 0.06 : 0.08;
  chance += attackingTeam.controlled ? difficulty.userBoost / 180 : 0;
  chance -= defendingTeam.controlled ? difficulty.keeperHelp * 1.2 : 0;
  chance = clamp(chance, overlay.kind === 'penalty' ? 0.42 : 0.10, overlay.kind === 'penalty' ? 0.95 : 0.90);

  const missChance = overlay.kind === 'penalty'
    ? 0.04 + (zone.difficulty < 0 ? 0.04 : 0.01)
    : Math.max(0.05, 0.18 - shooter.finishing / 620 - zone.difficulty / 2);

  let outcome;
  if (overlay.mode === 'attack') {
    if (!guessedCorrect) {
      outcome = 'goal';
    } else {
      outcome = Math.random() <= chance ? 'goal' : 'saved';
    }
  } else {
    if (Math.random() <= chance) {
      outcome = 'goal';
    } else if (guessedCorrect) {
      outcome = 'saved';
    } else {
      outcome = 'miss';
    }

    if (!guessedCorrect && Math.random() < missChance) outcome = 'miss';
    if (guessedCorrect && Math.random() < 0.08) outcome = 'saved';
  }

  if (outcome === 'goal') {
    match.score[attackSide] += 1;
    attackingTeam.morale += 2;
    defendingTeam.morale -= 1;
    playGoalSound();
    playGoalCheer();
  } else if (outcome === 'saved') {
    defendingTeam.morale += 1;
    playSaveSound();
    playSaveSceneCrowd();
  } else {
    defendingTeam.morale += 1;
    playMissSound();
  }

  if (attackSide === 'home') {
    match.stats.homeShots += 1;
    if (outcome !== 'miss') match.stats.homeOnTarget += 1;
  } else {
    match.stats.awayShots += 1;
    if (outcome !== 'miss') match.stats.awayOnTarget += 1;
  }

  overlay.outcome = outcome;
  overlay.resolved = true;
  overlay.resultText = buildChanceResultText(overlay, outcome);
  addFeed(match, match.minute, overlay.resultText);

  if (match.shootout) resolvePenaltyBookkeeping(overlay, outcome);
  render();
  queueTimeout(() => {
    if (appState.overlay && appState.overlay.type === 'chance' && appState.overlay.resolved) finishChanceOverlay();
  }, 3000);
}

function buildChanceResultText(overlay, outcome) {
  if (outcome === 'goal') return `⚽ GOAL TO ${overlay.team.info.name.toUpperCase()}!`;
  if (outcome === 'saved') return `🧤 SAVE FOR ${overlay.defendingTeam.info.name.toUpperCase()}!`;
  return `❌ ${randomFrom(MISS_SAYINGS)}`;
}

function finishChanceOverlay() {
  const match = appState.currentMatch;
  if (!match) return;
  const wasPenalty = !!match.shootout;
  appState.overlay = null;
  clearPendingTimeouts();
  render();
  if (wasPenalty) {
    continuePenaltyShootout();
  } else {
    advanceAfterChance();
  }
}

function advanceAfterChance() {
  const match = appState.currentMatch;
  if (!match) return;
  if (match.segmentIndex < match.periods[match.periodIndex].segments - 1) {
    match.segmentIndex += 1;
    scheduleNextSegment();
    render();
    startLiveLoop();
  } else {
    handleEndOfPeriod();
  }
}

function confirmSubstitution() {
  const overlay = appState.overlay;
  if (!overlay || overlay.type !== 'subs') return;
  const team = getMatchTeam(overlay.side);
  const outPlayer = team.squad.find((player) => player.id === overlay.outPlayerId);
  const inPlayer = team.squad.find((player) => player.id === overlay.inPlayerId);
  if (!outPlayer || !inPlayer || !outPlayer.onField || inPlayer.onField) return;

  outPlayer.onField = false;
  outPlayer.bench = true;
  outPlayer.subbedOutMinute = Math.round(appState.currentMatch.minute);
  inPlayer.onField = true;
  inPlayer.bench = false;
  inPlayer.subbedInMinute = Math.round(appState.currentMatch.minute);
  inPlayer.staminaCurrent = Math.max(inPlayer.staminaCurrent, 80);
  team.subsUsed += 1;
  addFeed(appState.currentMatch, appState.currentMatch.minute, `🔁 ${team.info.name} sub off ${outPlayer.name} and bring on ${inPlayer.name}.`);

  const returnOverlay = overlay.returnOverlay || null;
  appState.overlay = returnOverlay;
  render();
  if (!returnOverlay) resumeLiveIfPossible();
}

function maybeAISub(match, team) {
  if (team.controlled || team.subsUsed >= team.maxSubs || benchPlayers(team).length === 0) return;
  const tired = onFieldPlayers(team).filter((player) => !player.isKeeper && (player.staminaCurrent < 42 || player.injured));
  const behind = team.side === 'home' ? match.score.home < match.score.away : match.score.away < match.score.home;
  if (!tired.length && !(behind && Math.random() < 0.14) && Math.random() > 0.08) return;

  const outPlayer = tired[0] || randomFrom(onFieldPlayers(team).filter((player) => !player.isKeeper));
  const inPlayer = randomFrom(benchPlayers(team).filter((player) => player.pos === outPlayer.pos || !player.isKeeper)) || benchPlayers(team)[0];
  if (!outPlayer || !inPlayer) return;

  outPlayer.onField = false;
  outPlayer.bench = true;
  inPlayer.onField = true;
  inPlayer.bench = false;
  inPlayer.staminaCurrent = Math.max(80, inPlayer.staminaCurrent);
  team.subsUsed += 1;
  addFeed(match, match.minute, `🔁 ${team.info.name} make a change: ${outPlayer.name} off, ${inPlayer.name} on.`);
}

function startPenaltyShootout() {
  const match = appState.currentMatch;
  stopLiveLoop();
  match.penaltiesStarted = true;
  match.phase = 'overlay';
  match.shootout = {
    home: [],
    away: [],
    takers: {
      home: eligiblePenaltyTakers(match.home),
      away: eligiblePenaltyTakers(match.away)
    }
  };
  addFeed(match, 120, 'Penalty shootout time. The tension is enormous.');
  continuePenaltyShootout();
}

function continuePenaltyShootout() {
  const match = appState.currentMatch;
  if (!match || !match.shootout) return;
  const winner = evaluateShootoutWinner(match.shootout);
  if (winner) {
    finishMatch(`Penalty shootout won by ${match[winner].info.name}.`);
    return;
  }

  const totalTaken = match.shootout.home.length + match.shootout.away.length;
  const side = totalTaken % 2 === 0 ? 'home' : 'away';
  const team = match[side];
  const defendingTeam = match[side === 'home' ? 'away' : 'home'];
  const kicker = nextPenaltyTaker(team, match.shootout[side].length);
  const keeper = goalkeeper(defendingTeam);

  playPenaltyWhistle();

  appState.overlay = {
    type: 'chance',
    kind: 'penalty',
    team,
    defendingTeam,
    shooterSide: side,
    mode: team.controlled ? 'attack' : 'save',
    kicker,
    goalkeeper: keeper,
    selectedZone: null,
    guessZone: null,
    targetZone: null,
    outcome: null,
    resolved: false,
    resultText: '',
    baseChance: 0.78,
    sceneText: `${kicker.name} walks up for ${team.info.name}.`,
    countdown: 5
  };
  render();
  startChanceCountdown();
}

function resolvePenaltyBookkeeping(overlay, outcome) {
  const match = appState.currentMatch;
  const side = overlay.shooterSide;
  match.shootout[side].push(outcome === 'goal' ? 1 : 0);
}

function evaluateShootoutWinner(shootout) {
  const homeTaken = shootout.home.length;
  const awayTaken = shootout.away.length;
  const homeGoals = sum(shootout.home);
  const awayGoals = sum(shootout.away);

  if (homeTaken < 5 || awayTaken < 5) {
    const homeRemaining = 5 - homeTaken;
    const awayRemaining = 5 - awayTaken;
    if (homeGoals > awayGoals + awayRemaining) return 'home';
    if (awayGoals > homeGoals + homeRemaining) return 'away';
    if (homeTaken === 5 && awayTaken === 5 && homeGoals !== awayGoals) return homeGoals > awayGoals ? 'home' : 'away';
    return null;
  }

  if (homeTaken === awayTaken && homeGoals !== awayGoals) return homeGoals > awayGoals ? 'home' : 'away';
  return null;
}

function eligiblePenaltyTakers(team) {
  return onFieldPlayers(team)
    .slice()
    .sort((a, b) => b.penalty - a.penalty)
    .map((player) => player.id);
}

function nextPenaltyTaker(team, takenCount) {
  const ids = team.side === 'home' ? appState.currentMatch.shootout.takers.home : appState.currentMatch.shootout.takers.away;
  const id = ids[takenCount % ids.length];
  return team.squad.find((player) => player.id === id) || onFieldPlayers(team)[0];
}

function finishMatch(customSummary = '') {
  const match = appState.currentMatch;
  if (!match) return;
  stopLiveLoop();
  clearPendingTimeouts();
  match.ended = true;
  clearSavedMatch();

  const homeName = match.home.info.name;
  const awayName = match.away.info.name;
  const shootout = match.shootout;
  let title = 'Match Drawn';
  let summary = customSummary || 'A dramatic friendly ends level.';

  if (shootout) {
    const homePens = sum(shootout.home);
    const awayPens = sum(shootout.away);
    title = `${homePens > awayPens ? homeName : awayName} win on penalties`;
    summary = customSummary || `${homeName} ${match.score.home} - ${match.score.away} ${awayName}, then ${homePens}-${awayPens} in the shootout.`;
  } else if (match.score.home > match.score.away) {
    title = `${homeName} win`;
    summary = customSummary || `${homeName} controlled the key moments and got over the line.`;
  } else if (match.score.away > match.score.home) {
    title = `${awayName} win`;
    summary = customSummary || `${awayName} take the result after surviving the big moments.`;
  }

  playFinalWhistle();

  const isTournamentMatch = !!match.context?.type;
  if (isTournamentMatch) {
    applyPlayedMatchToTournament(match, summary);
  }
  const championCeremony = !!(isTournamentMatch && appState.tournament?.complete && appState.tournament?.champion);
  if (championCeremony) {
    title = `${appState.tournament.champion} are world champions!`;
    summary = `Taidghfantino presents the cup to ${appState.tournament.champion}. What a finish to the tournament.`;
    playChampionSound();
  }

  appState.overlay = {
    type: 'final',
    title,
    scoreline: `${homeName} ${match.score.home} - ${match.score.away} ${awayName}`,
    summary,
    tournamentContinue: isTournamentMatch,
    championCeremony
  };
  render();
}


function startTournament() {
  stopLiveLoop();
  clearPendingTimeouts();
  appState.tournamentTab = 'standings';
  appState.tournament = createPrototypeTournament(appState.setupMode, appState.tournamentSetup);
  appState.currentMatch = null;
  appState.overlay = null;
  appState.screen = 'tournamentHub';
  render();
}

function createPrototypeTournament(mode, setup) {
  const anchorTeam = mode === 'tournament_one' ? setup.selectedTeam : setup.favouriteTeam;
  const groups = buildPrototypeGroups(anchorTeam);
  const fixtures = [];
  const schedule = [
    [[0, 1], [2, 3]],
    [[0, 2], [3, 1]],
    [[3, 0], [1, 2]]
  ];
  const groupEntries = Object.entries(groups);
  let id = 1;

  schedule.forEach((matchdayPairs, index) => {
    matchdayPairs.forEach(([homeIndex, awayIndex], slotIndex) => {
      groupEntries.forEach(([groupName, teamNames]) => {
        fixtures.push({
          id: `fx-${id++}`,
          stageType: 'group',
          stage: 'Group Stage',
          label: `Group ${groupName} • Matchday ${index + 1}`,
          group: groupName,
          matchday: index + 1,
          matchSlot: slotIndex + 1,
          homeTeam: teamNames[homeIndex],
          awayTeam: teamNames[awayIndex],
          status: 'pending',
          knockout: false
        });
      });
    });
  });

  return {
    id: `tournament-${Date.now()}`,
    mode,
    difficulty: appState.settings.difficulty || setup.difficulty || 'normal',
    selectedTeam: mode === 'tournament_one' ? setup.selectedTeam : (setup.favouriteTeam || setup.selectedTeam),
    favouriteTeam: setup.favouriteTeam || setup.selectedTeam,
    phase: 'group',
    complete: false,
    champion: null,
    groups,
    fixtures,
    history: []
  };
}

function buildPrototypeGroups(anchorTeam) {
  const groupNames = 'ABCDEFGHIJKL'.split('');
  const groups = Object.fromEntries(groupNames.map((group) => [group, []]));
  const orderedTeams = SAMPLE_TEAMS.slice().sort((a, b) => getWorldCupFifaRank(a.name) - getWorldCupFifaRank(b.name) || a.name.localeCompare(b.name));
  const pots = [
    orderedTeams.slice(0, 12),
    orderedTeams.slice(12, 24),
    orderedTeams.slice(24, 36),
    orderedTeams.slice(36, 48)
  ];

  pots.forEach((pot) => {
    const workingPot = pot.slice();
    shuffle(workingPot);
    const anchorIndex = workingPot.findIndex((team) => team.name === anchorTeam);
    if (anchorIndex >= 0) {
      const [anchor] = workingPot.splice(anchorIndex, 1);
      groups.A.push(anchor.name);
      const remainingGroups = groupNames.filter((group) => group !== 'A');
      remainingGroups.forEach((groupName, index) => {
        groups[groupName].push(workingPot[index].name);
      });
      return;
    }

    groupNames.forEach((groupName, index) => {
      groups[groupName].push(workingPot[index].name);
    });
  });

  return groups;
}

function renderTournamentActionButtons(tournament, fixture) {
  if (tournament.complete) {
    return '<button data-action="go-menu">Back to Menu</button>';
  }
  if (!fixture) {
    return '<button data-action="go-menu">Back to Menu</button>';
  }
  if (tournament.mode === 'tournament_one') {
    if (fixture.homeTeam === tournament.selectedTeam || fixture.awayTeam === tournament.selectedTeam) {
      return `<button data-action="tournament-play-selected">Play as ${tournament.selectedTeam}</button><button class="secondary" data-action="tournament-sim-next">Simulate This Match</button>`;
    }
    return `<button data-action="tournament-sim-to-team">Auto-Play to ${tournament.selectedTeam} Match</button><button class="secondary" data-action="tournament-sim-next">Simulate Next Match</button>`;
  }
  if (tournament.mode === 'tournament_all') {
    return `<button data-action="tournament-play-home">Play as ${fixture.homeTeam}</button><button data-action="tournament-play-away">Play as ${fixture.awayTeam}</button><button class="secondary" data-action="tournament-sim-next">Simulate Next Match</button>`;
  }
  return `<button data-action="tournament-sim-next">Simulate Next Match</button><button class="secondary" data-action="tournament-sim-all">Auto Finish Tournament</button>`;
}

function renderGroupTable(table) {
  return `
    <div class="card compact-card group-table-card">
      <h3>Group ${table.group}</h3>
      <table class="standings-table">
        <colgroup>
          <col class="table-col-team" />
          <col span="8" class="table-col-stat" />
        </colgroup>
        <thead>
          <tr>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          ${table.entries.map((entry) => `
            <tr class="${entry.team === appState.tournament?.selectedTeam || entry.team === appState.tournament?.favouriteTeam ? 'focus-row' : ''}">
              <td class="team-cell">${entry.team}</td>
              <td>${entry.played}</td>
              <td>${entry.won}</td>
              <td>${entry.drawn}</td>
              <td>${entry.lost}</td>
              <td>${entry.gf}</td>
              <td>${entry.ga}</td>
              <td>${entry.gd >= 0 ? '+' : ''}${entry.gd}</td>
              <td><strong>${entry.pts}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function getKnockoutBracketSlots(tournament) {
  const qfs = [1, 2, 3, 4].map((index) => tournament.fixtures.find((fixture) => fixture.label === `Quarter-final ${index}`) || null);
  const sfs = [1, 2].map((index) => tournament.fixtures.find((fixture) => fixture.label === `Semi-final ${index}`) || null);
  const finalFixture = tournament.fixtures.find((fixture) => fixture.stageType === 'final') || null;

  return {
    qf1: qfs[0],
    qf2: qfs[1],
    qf3: qfs[2],
    qf4: qfs[3],
    sf1: sfs[0] || {
      label: 'Semi-final 1',
      homeTeam: qfs[0]?.status === 'complete' ? qfs[0].winnerTeam : 'Winner QF1',
      awayTeam: qfs[3]?.status === 'complete' ? qfs[3].winnerTeam : 'Winner QF4',
      status: 'pending'
    },
    sf2: sfs[1] || {
      label: 'Semi-final 2',
      homeTeam: qfs[1]?.status === 'complete' ? qfs[1].winnerTeam : 'Winner QF2',
      awayTeam: qfs[2]?.status === 'complete' ? qfs[2].winnerTeam : 'Winner QF3',
      status: 'pending'
    },
    final: finalFixture || {
      label: 'Final',
      homeTeam: sfs[0]?.status === 'complete' ? sfs[0].winnerTeam : 'Winner SF1',
      awayTeam: sfs[1]?.status === 'complete' ? sfs[1].winnerTeam : 'Winner SF2',
      status: 'pending'
    }
  };
}

function getBracketDisplayLabel(teamName) {
  const team = teamName ? getTeam(teamName) : null;
  return team ? team.name : (teamName || 'TBD');
}

function trimBracketLabel(text, max = 18) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function renderBracketMatchSvg(match, x, y, side = 'left', options = {}) {
  const width = options.width || 190;
  const height = options.height || 60;
  const scoreWidth = options.scoreWidth || 38;
  const mirrored = side === 'right';
  const homeText = trimBracketLabel(getBracketDisplayLabel(match.homeTeam), options.final ? 20 : 18);
  const awayText = trimBracketLabel(getBracketDisplayLabel(match.awayTeam), options.final ? 20 : 18);
  const homeScore = match.status === 'complete' ? match.homeScore : '–';
  const awayScore = match.status === 'complete' ? match.awayScore : '–';
  const label = options.stageLabel || match.label;
  const title = `${label}: ${getBracketDisplayLabel(match.homeTeam)} ${homeScore}-${awayScore} ${getBracketDisplayLabel(match.awayTeam)}${match.penalties ? `, penalties ${match.penalties.home}-${match.penalties.away}` : ''}`;
  const mainX = mirrored ? x + scoreWidth : x;
  const scoreX = mirrored ? x : x + width - scoreWidth;
  const dividerX = mirrored ? x + scoreWidth : x + width - scoreWidth;
  const homeWinner = match.status === 'complete' && match.winnerTeam === match.homeTeam;
  const awayWinner = match.status === 'complete' && match.winnerTeam === match.awayTeam;
  const labelX = x + width / 2;
  const note = match.penalties ? `Pens ${match.penalties.home}-${match.penalties.away}` : (match.status === 'complete' ? 'Full time' : 'To play');
  return `
    <g>
      <title>${title}</title>
      <text x="${labelX}" y="${y - 10}" text-anchor="middle" font-size="11" font-weight="700" fill="#dcebdc" letter-spacing="0.5">${label.toUpperCase()}</text>
      <rect x="${mainX}" y="${y}" width="${width - scoreWidth}" height="${height}" rx="13" fill="#ffffff" stroke="#d5b35a" stroke-width="2" />
      <rect x="${scoreX}" y="${y}" width="${scoreWidth}" height="${height}" rx="13" fill="#f7f1dc" stroke="#d5b35a" stroke-width="2" />
      <line x1="${dividerX}" y1="${y}" x2="${dividerX}" y2="${y + height}" stroke="#d5b35a" stroke-width="2" />
      <line x1="${x}" y1="${y + height / 2}" x2="${x + width}" y2="${y + height / 2}" stroke="#e7dec7" stroke-width="1.5" />
      <rect x="${mainX + 2}" y="${y + 2}" width="${width - scoreWidth - 4}" height="${height / 2 - 3}" rx="11" fill="${homeWinner ? '#eef7d7' : '#ffffff'}" opacity="0.95" />
      <rect x="${mainX + 2}" y="${y + height / 2 + 1}" width="${width - scoreWidth - 4}" height="${height / 2 - 3}" rx="11" fill="${awayWinner ? '#eef7d7' : '#ffffff'}" opacity="0.95" />
      <text x="${mainX + 10}" y="${y + 20}" font-size="12" font-weight="700" fill="#111111">${homeText}</text>
      <text x="${mainX + 10}" y="${y + 49}" font-size="12" font-weight="700" fill="#111111">${awayText}</text>
      <text x="${scoreX + scoreWidth / 2}" y="${y + 20}" text-anchor="middle" font-size="20" font-weight="800" fill="#111111">${homeScore}</text>
      <text x="${scoreX + scoreWidth / 2}" y="${y + 49}" text-anchor="middle" font-size="20" font-weight="800" fill="#111111">${awayScore}</text>
      <text x="${labelX}" y="${y + height + 15}" text-anchor="middle" font-size="10" fill="#dcebdc">${note}</text>
    </g>
  `;
}

function renderKnockoutMobileMatch(match, label) {
  const home = getBracketDisplayLabel(match.homeTeam);
  const away = getBracketDisplayLabel(match.awayTeam);
  const scoreline = match.status === 'complete'
    ? `${match.homeScore} - ${match.awayScore}`
    : 'vs';
  const note = match.penalties
    ? `Pens ${match.penalties.home}-${match.penalties.away}`
    : (match.status === 'complete' ? 'Full time' : 'To play');
  return `
    <div class="knockout-mobile-match">
      <div class="knockout-mobile-label">${label}</div>
      <div class="knockout-mobile-row">
        <span>${home}</span>
        <strong>${scoreline}</strong>
        <span>${away}</span>
      </div>
      <div class="small-note">${note}</div>
    </div>
  `;
}

function renderKnockoutGraphic(tournament) {
  const slots = getKnockoutBracketSlots(tournament);
  return `
    <h3>Knockout Stage</h3>
    <div class="knockout-bracket-shell">
      <svg viewBox="0 0 1200 430" class="knockout-bracket-svg" role="img" aria-label="Knockout bracket showing quarter-finals, semi-finals and the final">
        <defs>
          <linearGradient id="knockoutBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#07511f" />
            <stop offset="100%" stop-color="#0a7030" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1200" height="430" rx="28" fill="url(#knockoutBg)" />
        <circle cx="600" cy="215" r="120" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
        <line x1="600" y1="95" x2="600" y2="335" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
        <line x1="480" y1="215" x2="720" y2="215" stroke="rgba(255,255,255,0.08)" stroke-width="2" />

        <text x="115" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#ffffff">Quarter-finals</text>
        <text x="355" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#ffffff">Semi-finals</text>
        <text x="600" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#ffffff">Final</text>
        <text x="845" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#ffffff">Semi-finals</text>
        <text x="1085" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#ffffff">Quarter-finals</text>

        <line x1="210" y1="100" x2="260" y2="100" stroke="#dbe9d5" stroke-width="3" />
        <line x1="210" y1="330" x2="260" y2="330" stroke="#dbe9d5" stroke-width="3" />
        <line x1="260" y1="100" x2="260" y2="330" stroke="#dbe9d5" stroke-width="3" />
        <line x1="260" y1="215" x2="300" y2="215" stroke="#dbe9d5" stroke-width="3" />

        <line x1="990" y1="100" x2="940" y2="100" stroke="#dbe9d5" stroke-width="3" />
        <line x1="990" y1="330" x2="940" y2="330" stroke="#dbe9d5" stroke-width="3" />
        <line x1="940" y1="100" x2="940" y2="330" stroke="#dbe9d5" stroke-width="3" />
        <line x1="940" y1="215" x2="900" y2="215" stroke="#dbe9d5" stroke-width="3" />

        <line x1="490" y1="215" x2="505" y2="215" stroke="#dbe9d5" stroke-width="3" />
        <line x1="695" y1="215" x2="710" y2="215" stroke="#dbe9d5" stroke-width="3" />

        ${renderBracketMatchSvg(slots.qf1 || { label: 'Quarter-final 1', homeTeam: 'TBD', awayTeam: 'TBD', status: 'pending' }, 20, 70, 'left', { stageLabel: 'Quarter-final 1' })}
        ${renderBracketMatchSvg(slots.qf4 || { label: 'Quarter-final 4', homeTeam: 'TBD', awayTeam: 'TBD', status: 'pending' }, 20, 300, 'left', { stageLabel: 'Quarter-final 4' })}
        ${renderBracketMatchSvg(slots.sf1, 300, 185, 'left', { stageLabel: 'Semi-final 1' })}
        ${renderBracketMatchSvg(slots.final, 505, 185, 'left', { width: 190, stageLabel: 'Final', final: true })}
        ${renderBracketMatchSvg(slots.sf2, 710, 185, 'right', { stageLabel: 'Semi-final 2' })}
        ${renderBracketMatchSvg(slots.qf2 || { label: 'Quarter-final 2', homeTeam: 'TBD', awayTeam: 'TBD', status: 'pending' }, 990, 70, 'right', { stageLabel: 'Quarter-final 2' })}
        ${renderBracketMatchSvg(slots.qf3 || { label: 'Quarter-final 3', homeTeam: 'TBD', awayTeam: 'TBD', status: 'pending' }, 990, 300, 'right', { stageLabel: 'Quarter-final 3' })}

        ${tournament.complete && tournament.champion ? `<text x="600" y="380" text-anchor="middle" font-size="22" font-weight="900" fill="#ffffff">Champion: ${getBracketDisplayLabel(tournament.champion)}</text>` : ''}
      </svg>
    </div>
    <div class="knockout-mobile-bracket">
      <div class="knockout-mobile-stage">
        <h4>Quarter-finals</h4>
        ${renderKnockoutMobileMatch(slots.qf1 || { homeTeam: 'TBD', awayTeam: 'TBD', status: 'pending' }, 'Quarter-final 1')}
        ${renderKnockoutMobileMatch(slots.qf2 || { homeTeam: 'TBD', awayTeam: 'TBD', status: 'pending' }, 'Quarter-final 2')}
        ${renderKnockoutMobileMatch(slots.qf3 || { homeTeam: 'TBD', awayTeam: 'TBD', status: 'pending' }, 'Quarter-final 3')}
        ${renderKnockoutMobileMatch(slots.qf4 || { homeTeam: 'TBD', awayTeam: 'TBD', status: 'pending' }, 'Quarter-final 4')}
      </div>
      <div class="knockout-mobile-stage">
        <h4>Semi-finals</h4>
        ${renderKnockoutMobileMatch(slots.sf1, 'Semi-final 1')}
        ${renderKnockoutMobileMatch(slots.sf2, 'Semi-final 2')}
      </div>
      <div class="knockout-mobile-stage knockout-mobile-stage-final">
        <h4>Final</h4>
        ${renderKnockoutMobileMatch(slots.final, 'Final')}
        ${tournament.complete && tournament.champion ? `<div class="knockout-mobile-champion">Champion: ${getBracketDisplayLabel(tournament.champion)}</div>` : ''}
      </div>
    </div>
  `;
}

function renderWorldCupIcon() {
  return `
    <svg viewBox="0 0 120 180" class="worldcup-svg" aria-hidden="true">
      <circle cx="60" cy="34" r="24" fill="#f7d35f" />
      <path d="M42 56 C46 92, 74 92, 78 56 L88 64 C84 108, 70 122, 68 138 L52 138 C50 122, 36 108, 32 64 Z" fill="#d9ad26" />
      <rect x="42" y="138" width="36" height="14" rx="6" fill="#c79412" />
      <rect x="34" y="154" width="52" height="12" rx="6" fill="#8e6510" />
    </svg>
  `;
}

function renderKnockoutOverview(tournament) {
  const grouped = ['quarterfinal', 'semifinal', 'third', 'final'];
  const items = grouped.map((stageKey) => {
    const fixtures = tournament.fixtures.filter((fixture) => fixture.stageType === stageKey);
    if (!fixtures.length) return '';
    const labelMap = {
      quarterfinal: 'Quarter-finals',
      semifinal: 'Semi-finals',
      third: 'Third-place playoff',
      final: 'Final'
    };
    return `
      <div style="margin-bottom:12px;">
        <strong>${labelMap[stageKey]}</strong>
        ${fixtures.map((fixture) => `
          <div class="feed-item" style="margin-top:8px;">
            <div class="minute">${fixture.label}</div>
            ${fixture.homeTeam} ${fixture.status === 'complete' ? fixture.homeScore : ''}
            ${fixture.status === 'complete' ? '-' : 'vs'}
            ${fixture.status === 'complete' ? fixture.awayScore : ''} ${fixture.awayTeam}
            ${fixture.penalties ? `<div class="small-note">Pens: ${fixture.penalties.home}-${fixture.penalties.away}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
  return items || '<div class="small-note">Knockout stage not generated yet.</div>';
}

function buildTournamentTables(tournament) {
  const sourceGroups = tournament.groups || PROTOTYPE_TOURNAMENT_GROUPS;
  const tables = Object.entries(sourceGroups).map(([group, teamNames]) => {
    const entries = teamNames.map((teamName) => ({
      team: teamName,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      pts: 0,
      group,
      rank: 0
    }));
    const byTeam = Object.fromEntries(entries.map((entry) => [entry.team, entry]));
    tournament.fixtures.filter((fixture) => fixture.stageType === 'group' && fixture.group === group && fixture.status === 'complete').forEach((fixture) => {
      const home = byTeam[fixture.homeTeam];
      const away = byTeam[fixture.awayTeam];
      home.played += 1; away.played += 1;
      home.gf += fixture.homeScore; home.ga += fixture.awayScore;
      away.gf += fixture.awayScore; away.ga += fixture.homeScore;
      if (fixture.homeScore > fixture.awayScore) { home.won += 1; away.lost += 1; home.pts += 3; }
      else if (fixture.awayScore > fixture.homeScore) { away.won += 1; home.lost += 1; away.pts += 3; }
      else { home.drawn += 1; away.drawn += 1; home.pts += 1; away.pts += 1; }
    });
    entries.forEach((entry) => { entry.gd = entry.gf - entry.ga; });
    entries.sort(compareTableEntries);
    entries.forEach((entry, index) => { entry.rank = index + 1; });
    return { group, entries };
  });
  tournament.tables = tables;
  return tables;
}

function compareTableEntries(a, b) {
  return b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.localeCompare(b.team);
}

function getCurrentTournamentFixture(tournament) {
  if (!tournament) return null;
  maybeProgressTournament(tournament);
  return tournament.fixtures.find((fixture) => fixture.status === 'pending') || null;
}

function maybeProgressTournament(tournament) {
  buildTournamentTables(tournament);
  const groupDone = tournament.fixtures.filter((fixture) => fixture.stageType === 'group').every((fixture) => fixture.status === 'complete');
  if (groupDone && !tournament.fixtures.some((fixture) => fixture.stageType === 'round32')) {
    generateRoundOf32(tournament);
  }

  const r32 = tournament.fixtures.filter((fixture) => fixture.stageType === 'round32');
  if (r32.length && r32.every((fixture) => fixture.status === 'complete') && !tournament.fixtures.some((fixture) => fixture.stageType === 'round16')) {
    generateRoundOf16(tournament, r32);
  }

  const r16 = tournament.fixtures.filter((fixture) => fixture.stageType === 'round16');
  if (r16.length && r16.every((fixture) => fixture.status === 'complete') && !tournament.fixtures.some((fixture) => fixture.stageType === 'quarterfinal')) {
    generateQuarterFinals(tournament, r16);
  }

  const qfs = tournament.fixtures.filter((fixture) => fixture.stageType === 'quarterfinal');
  if (qfs.length && qfs.every((fixture) => fixture.status === 'complete') && !tournament.fixtures.some((fixture) => fixture.stageType === 'semifinal')) {
    generateSemiFinals(tournament, qfs);
  }

  const sfs = tournament.fixtures.filter((fixture) => fixture.stageType === 'semifinal');
  if (sfs.length && sfs.every((fixture) => fixture.status === 'complete') && !tournament.fixtures.some((fixture) => fixture.stageType === 'final')) {
    generateFinalAndThird(tournament, sfs);
  }

  const final = tournament.fixtures.find((fixture) => fixture.stageType === 'final');
  if (final && final.status === 'complete') {
    tournament.complete = true;
    tournament.champion = final.winnerTeam;
  }
}

function knockoutSeedValue(entry) {
  return (entry.rank === 1 ? 2000 : entry.rank === 2 ? 1200 : 400) + entry.pts * 100 + entry.gd * 10 + entry.gf;
}

function generateRoundOf32(tournament) {
  const tables = buildTournamentTables(tournament);
  const qualifiers = [];
  tables.forEach((table) => qualifiers.push(...table.entries.filter((entry) => entry.rank <= 2)));
  const thirds = tables
    .map((table) => table.entries.find((entry) => entry.rank === 3))
    .sort(compareTableEntries)
    .slice(0, 8);
  qualifiers.push(...thirds);

  const seeded = qualifiers.slice().sort((a, b) => knockoutSeedValue(b) - knockoutSeedValue(a) || a.team.localeCompare(b.team));
  const pool = seeded.slice();
  const pairs = [];
  while (pool.length) {
    const home = pool.shift();
    let awayIndex = pool.length - 1;
    while (awayIndex > 0 && pool[awayIndex].group === home.group) awayIndex -= 1;
    const [away] = pool.splice(Math.max(0, awayIndex), 1);
    pairs.push([home, away]);
  }

  let idBase = tournament.fixtures.length + 1;
  pairs.forEach((pair, index) => {
    tournament.fixtures.push({
      id: `fx-${idBase++}`,
      stageType: 'round32',
      stage: 'Knockout',
      label: `Round of 32 ${index + 1}`,
      homeTeam: pair[0].team,
      awayTeam: pair[1].team,
      status: 'pending',
      knockout: true
    });
  });
  tournament.phase = 'knockout';
}

function generateRoundOf16(tournament, r32) {
  let idBase = tournament.fixtures.length + 1;
  for (let i = 0; i < r32.length; i += 2) {
    tournament.fixtures.push({
      id: `fx-${idBase++}`,
      stageType: 'round16',
      stage: 'Knockout',
      label: `Round of 16 ${i / 2 + 1}`,
      homeTeam: r32[i].winnerTeam,
      awayTeam: r32[i + 1].winnerTeam,
      status: 'pending',
      knockout: true
    });
  }
}

function generateQuarterFinals(tournament, r16) {
  let idBase = tournament.fixtures.length + 1;
  for (let i = 0; i < r16.length; i += 2) {
    tournament.fixtures.push({
      id: `fx-${idBase++}`,
      stageType: 'quarterfinal',
      stage: 'Knockout',
      label: `Quarter-final ${i / 2 + 1}`,
      homeTeam: r16[i].winnerTeam,
      awayTeam: r16[i + 1].winnerTeam,
      status: 'pending',
      knockout: true
    });
  }
}

function generateSemiFinals(tournament, qfs) {
  const winners = qfs.map((fixture) => fixture.winnerTeam);
  let idBase = tournament.fixtures.length + 1;
  tournament.fixtures.push({ id: `fx-${idBase++}`, stageType: 'semifinal', stage: 'Knockout', label: 'Semi-final 1', homeTeam: winners[0], awayTeam: winners[3], status: 'pending', knockout: true });
  tournament.fixtures.push({ id: `fx-${idBase++}`, stageType: 'semifinal', stage: 'Knockout', label: 'Semi-final 2', homeTeam: winners[1], awayTeam: winners[2], status: 'pending', knockout: true });
}

function generateFinalAndThird(tournament, sfs) {
  let idBase = tournament.fixtures.length + 1;
  const sf1Loser = sfs[0].homeTeam === sfs[0].winnerTeam ? sfs[0].awayTeam : sfs[0].homeTeam;
  const sf2Loser = sfs[1].homeTeam === sfs[1].winnerTeam ? sfs[1].awayTeam : sfs[1].homeTeam;
  tournament.fixtures.push({ id: `fx-${idBase++}`, stageType: 'third', stage: 'Knockout', label: 'Third-place playoff', homeTeam: sf1Loser, awayTeam: sf2Loser, status: 'pending', knockout: true });
  tournament.fixtures.push({ id: `fx-${idBase++}`, stageType: 'final', stage: 'Knockout', label: 'Final', homeTeam: sfs[0].winnerTeam, awayTeam: sfs[1].winnerTeam, status: 'pending', knockout: true });
}

function recordTournamentResult(tournament, fixtureId, result) {
  const fixture = tournament.fixtures.find((item) => item.id === fixtureId);
  if (!fixture || fixture.status === 'complete') return;
  fixture.status = 'complete';
  fixture.homeScore = result.homeScore;
  fixture.awayScore = result.awayScore;
  fixture.penalties = result.penalties || null;
  fixture.winnerTeam = result.winnerTeam || (result.homeScore > result.awayScore ? fixture.homeTeam : fixture.awayTeam);
  fixture.summary = result.summary || `${fixture.homeTeam} ${result.homeScore}-${result.awayScore} ${fixture.awayTeam}`;
  tournament.history.push({ label: fixture.label, text: fixture.summary });
  if (tournament.history.length > 14) tournament.history = tournament.history.slice(tournament.history.length - 14);
  maybeProgressTournament(tournament);
}

function simulateNextTournamentFixture() {
  const fixture = getCurrentTournamentFixture(appState.tournament);
  if (!fixture) {
    render();
    return;
  }
  simulateTournamentFixture(appState.tournament, fixture);
  render();
}

function simulateUntilSelectedTeam() {
  const tournament = appState.tournament;
  let count = 0;
  let fixture = getCurrentTournamentFixture(tournament);
  while (fixture && fixture.homeTeam !== tournament.selectedTeam && fixture.awayTeam !== tournament.selectedTeam && !tournament.complete) {
    simulateTournamentFixture(tournament, fixture);
    count += 1;
    fixture = getCurrentTournamentFixture(tournament);
  }
  showToast(count ? `${count} matches simulated.` : 'Your team is up next.');
  render();
}

function simulateEntireTournament() {
  const tournament = appState.tournament;
  let safety = 200;
  while (!tournament.complete && safety-- > 0) {
    const fixture = getCurrentTournamentFixture(tournament);
    if (!fixture) break;
    simulateTournamentFixture(tournament, fixture);
  }
  render();
}

function simulateTournamentFixture(tournament, fixture) {
  const home = getTeam(fixture.homeTeam);
  const away = getTeam(fixture.awayTeam);
  let homeExp = clamp(1.05 + (home.ratings.attack - away.ratings.defence) / 35 + (home.ratings.overall - away.ratings.overall) / 60, 0.4, 2.8);
  let awayExp = clamp(0.95 + (away.ratings.attack - home.ratings.defence) / 35 + (away.ratings.overall - home.ratings.overall) / 60, 0.3, 2.6);
  let homeScore = sampleGoals(homeExp);
  let awayScore = sampleGoals(awayExp);
  let penalties = null;
  let winnerTeam = null;
  if (fixture.knockout && homeScore === awayScore) {
    if (Math.random() < 0.35) homeScore += 1;
    else if (Math.random() < 0.35) awayScore += 1;
    if (homeScore === awayScore) {
      penalties = simulatePenalties(home, away);
      winnerTeam = penalties.home > penalties.away ? fixture.homeTeam : fixture.awayTeam;
    }
  }
  if (!winnerTeam && fixture.knockout) winnerTeam = homeScore > awayScore ? fixture.homeTeam : fixture.awayTeam;
  const summary = penalties
    ? `${fixture.homeTeam} ${homeScore}-${awayScore} ${fixture.awayTeam} • pens ${penalties.home}-${penalties.away}`
    : `${fixture.homeTeam} ${homeScore}-${awayScore} ${fixture.awayTeam}`;
  recordTournamentResult(tournament, fixture.id, { homeScore, awayScore, penalties, winnerTeam, summary });
  if (tournament.complete) showChampionOverlayFromTournament(tournament);
}

function simulatePenalties(home, away) {
  let homePens = 0;
  let awayPens = 0;
  for (let i = 0; i < 5; i += 1) {
    if (Math.random() < clamp(0.68 + (home.ratings.penalties - away.ratings.gk) / 200, 0.45, 0.9)) homePens += 1;
    if (Math.random() < clamp(0.68 + (away.ratings.penalties - home.ratings.gk) / 200, 0.45, 0.9)) awayPens += 1;
  }
  while (homePens === awayPens) {
    if (Math.random() < 0.7) homePens += 1;
    if (Math.random() < 0.7) awayPens += 1;
  }
  return { home: homePens, away: awayPens };
}

function sampleGoals(xg) {
  let goals = 0;
  for (let i = 0; i < 5; i += 1) {
    if (Math.random() < xg / 5) goals += 1;
  }
  return goals;
}

function playCurrentTournamentFixture(controlTeamName) {
  const tournament = appState.tournament;
  const fixture = getCurrentTournamentFixture(tournament);
  if (!fixture) return;
  const controlSide = fixture.homeTeam === controlTeamName ? 'home' : 'away';
  const setup = {
    controlSide,
    difficulty: tournament.difficulty,
    knockoutFinish: fixture.knockout
  };
  const rule = appState.settings.taidghfantino ? clone(randomFrom(TAIDGHRULES)) : null;
  const match = createMatch(getTeam(fixture.homeTeam), getTeam(fixture.awayTeam), setup, rule);
  match.stage = fixture.label;
  match.context = {
    type: 'tournament',
    fixtureId: fixture.id
  };
  appState.currentMatch = match;
  appState.overlay = rule ? { type: 'rule', rule } : null;
  appState.screen = 'match';
  render();
  if (!rule) {
    playStartWhistle();
    startLiveLoop();
  }
}

function showChampionOverlayFromTournament(tournament) {
  const finalFixture = tournament.fixtures.find((fixture) => fixture.stageType === 'final' && fixture.status === 'complete');
  if (!finalFixture) return;
  playChampionSound();
  appState.overlay = {
    type: 'final',
    title: `${tournament.champion} are world champions!`,
    scoreline: `${finalFixture.homeTeam} ${finalFixture.homeScore} - ${finalFixture.awayScore} ${finalFixture.awayTeam}`,
    summary: `Taidghfantino presents the cup to ${tournament.champion}. What a finish to the tournament.`,
    tournamentContinue: true,
    championCeremony: true
  };
}

function applyPlayedMatchToTournament(match, summary) {
  if (!appState.tournament || !match.context?.fixtureId) return;
  const penalties = match.shootout ? { home: sum(match.shootout.home), away: sum(match.shootout.away) } : null;
  let winnerTeam = null;
  if (penalties) winnerTeam = penalties.home > penalties.away ? match.home.info.name : match.away.info.name;
  else if (match.score.home !== match.score.away) winnerTeam = match.score.home > match.score.away ? match.home.info.name : match.away.info.name;
  recordTournamentResult(appState.tournament, match.context.fixtureId, {
    homeScore: match.score.home,
    awayScore: match.score.away,
    penalties,
    winnerTeam,
    summary
  });
}

function getControlledTeam(match) {
  if (!match) return null;
  return match.home.controlled ? match.home : match.away;
}

function getMatchTeam(side) {
  return appState.currentMatch?.[side];
}

function onFieldPlayers(team) {
  return team.squad.filter((player) => player.onField && !player.sentOff);
}

function benchPlayers(team) {
  return team.squad.filter((player) => player.bench && !player.onField && !player.sentOff);
}

function possessionPercent(match, side) {
  const total = match.stats.homePossession + match.stats.awayPossession;
  if (!total) return 50;
  return Math.round((match.stats[`${side}Possession`] / total) * 100);
}

function formatMinute(match) {
  const minute = Math.floor(match.displayMinute || match.minute || 0);
  if (minute >= 120) return `120'`;
  if (minute > 105 && match.periodIndex === 3) return `${minute}'`;
  if (minute > 90 && match.periodIndex >= 2) return `${minute}'`;
  if (minute > 45 && match.periodIndex === 1) return `${minute}'`;
  return `${minute}'`;
}

function segmentPercent(match) {
  if (!match.segmentDuration) return 0;
  return Math.round((match.segmentProgress / match.segmentDuration) * 100);
}

function randomWeightedZoneForAI(shooter) {
  const weights = GOAL_ZONES.map((zone) => {
    let weight = 1;
    if (zone.id >= 4) weight += 1.4;
    if (zone.id === 0 || zone.id === 3) weight += Math.max(0, shooter.finishing - 83) / 10;
    if (zone.id === 5 || zone.id === 6) weight += 1;
    return weight;
  });
  return weightedPick(GOAL_ZONES.map((zone) => zone.id), weights);
}

function randomGoalkeeperGuess(keeper, targetZone) {
  const catchChance = clamp(0.18 + Math.max(0, keeper.reflexes - 80) / 80, 0.18, 0.42);
  if (Math.random() < catchChance) return targetZone;
  return randomInt(0, 7);
}

function bindAfterFrame(callback) {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}

function animateSceneIfNeeded() {
  const overlay = appState.overlay;
  if (!overlay || overlay.type !== 'chance' || overlay.selectedZone === null) return;
  const ball = document.getElementById('ball');
  const gk = document.getElementById('gk');
  const scene = document.getElementById('goal-scene');
  const frame = scene?.querySelector('.goal-frame');
  if (!ball || !gk || !scene || !frame) return;

  const ballZoneId = overlay.resolved ? overlay.targetZone : null;
  const ballZone = ballZoneId !== null ? GOAL_ZONES[ballZoneId] : null;
  const gkZoneId = overlay.resolved ? (overlay.guessZone !== null ? overlay.guessZone : overlay.selectedZone) : null;
  const gkZone = gkZoneId !== null ? GOAL_ZONES[gkZoneId] : null;
  const zoneCell = ballZoneId !== null ? scene.querySelector(`[data-zone="${ballZoneId}"]`) : null;
  const gkCell = gkZoneId !== null ? scene.querySelector(`[data-zone="${gkZoneId}"]`) : null;
  const sceneRect = scene.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  const gkRect = gk.getBoundingClientRect();
  const goalInnerLeft = frameRect.left - sceneRect.left;
  const goalInnerRight = frameRect.right - sceneRect.left;
  const goalInnerTop = frameRect.top - sceneRect.top;
  const goalInnerBottom = frameRect.bottom - sceneRect.top;
  const baseGkCenterX = sceneRect.width / 2;
  const baseGkCenterY = (gkRect.top - sceneRect.top) + gkRect.height / 2;
  const zoneRect = zoneCell ? zoneCell.getBoundingClientRect() : null;
  const gkZoneRect = gkCell ? gkCell.getBoundingClientRect() : null;
  const rawBallLeft = zoneRect
    ? zoneRect.left - sceneRect.left + zoneRect.width / 2
    : sceneRect.width * 0.5;
  const rawBallTop = zoneRect
    ? zoneRect.top - sceneRect.top + zoneRect.height / 2
    : goalInnerBottom + 93;

  const desiredGkCenterX = gkZoneRect
    ? clamp(gkZoneRect.left - sceneRect.left + gkZoneRect.width / 2, goalInnerLeft + gkRect.width * 0.24, goalInnerRight - gkRect.width * 0.24)
    : baseGkCenterX;
  const desiredGkCenterY = gkZoneRect
    ? clamp(gkZoneRect.top - sceneRect.top + gkZoneRect.height / 2, goalInnerTop + 24, goalInnerBottom - 12)
    : baseGkCenterY;
  const diveX = desiredGkCenterX - baseGkCenterX;
  const diveY = desiredGkCenterY - baseGkCenterY;

  let targetLeft = rawBallLeft;
  let targetTop = rawBallTop;
  let ballScale = ballZone ? 0.72 : 1;

  if (overlay.resolved && overlay.outcome === 'saved') {
    targetLeft = rawBallLeft;
    targetTop = rawBallTop;
    ballScale = 0.84;
  }

  if (overlay.resolved && overlay.outcome === 'miss' && ballZone) {
    const missLeft = ballZone.x < 50 ? goalInnerLeft - 20 : goalInnerRight + 20;
    const missTop = ballZone.y < 40 ? goalInnerTop - 14 : goalInnerTop + frameRect.height * 0.72;
    targetLeft = missLeft;
    targetTop = missTop;
  }

  bindAfterFrame(() => {
    ball.style.left = `${targetLeft}px`;
    ball.style.top = `${targetTop}px`;
    ball.style.transform = `translate(-50%, -50%) scale(${ballScale})`;
    gk.style.transform = `translate(${diveX}px, ${diveY}px)`;
  });
}

function addFeed(match, minute, text) {
  match.feed.push({ minute: Math.max(1, Math.round(minute)), text });
  if (match.feed.length > 40) match.feed = match.feed.slice(match.feed.length - 40);
}

function queueTimeout(callback, delay) {
  const id = setTimeout(callback, delay);
  pendingTimeouts.push(id);
}

function clearPendingTimeouts() {
  pendingTimeouts.forEach((id) => clearTimeout(id));
  pendingTimeouts = [];
}

function showToast(text) {
  appState.toast = text;
  render();
  queueTimeout(() => {
    appState.toast = null;
    render();
  }, 1800);
}

function ensureAudio() {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      audioContext = null;
    }
  }
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

function playTone(freq, duration = 0.12, type = 'sine', volume = 0.03, delay = 0) {
  if (!audioContext || !appState.settings.sounds) return;
  const start = audioContext.currentTime + delay;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

function playNoise(duration = 0.4, volume = 0.02, lowpass = 1800, highpass = 120, delay = 0) {
  if (!audioContext || !appState.settings.sounds) return;
  const start = audioContext.currentTime + delay;
  const frameCount = Math.max(1, Math.floor(audioContext.sampleRate * duration));
  const buffer = audioContext.createBuffer(1, frameCount, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frameCount);
  }
  const source = audioContext.createBufferSource();
  const hp = audioContext.createBiquadFilter();
  const lp = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  hp.type = 'highpass';
  hp.frequency.setValueAtTime(highpass, start);
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(lowpass, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.buffer = buffer;
  source.connect(hp);
  hp.connect(lp);
  lp.connect(gain);
  gain.connect(audioContext.destination);
  source.start(start);
  source.stop(start + duration + 0.02);
}

function playSweep(startFreq, endFreq, duration = 0.18, type = 'triangle', volume = 0.02, delay = 0) {
  if (!audioContext || !appState.settings.sounds) return;
  const start = audioContext.currentTime + delay;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, start);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(volume, start + Math.min(0.03, duration / 3));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(start);
  osc.stop(start + duration + 0.03);
}

function playImpact(thumpFreq = 110, snapLowpass = 1200, intensity = 1, delay = 0) {
  playTone(thumpFreq, 0.055, 'triangle', 0.02 * intensity, delay);
  playTone(Math.max(65, thumpFreq * 0.72), 0.09, 'sine', 0.012 * intensity, delay + 0.01);
  playNoise(0.07, 0.012 * intensity, snapLowpass, 260, delay + 0.008);
}

function playCrowdRoar(intensity = 1, delay = 0) {
  playNoise(2.3, 0.032 * intensity, 2600, 90, delay);
  playNoise(1.6, 0.018 * intensity, 1750, 120, delay + 0.03);
  playNoise(1.05, 0.012 * intensity, 1100, 150, delay + 0.08);
  playSweep(160, 210, 0.28, 'triangle', 0.005 * intensity, delay + 0.05);
  playSweep(210, 280, 0.34, 'triangle', 0.0045 * intensity, delay + 0.14);
}

function playCrowdGroan(intensity = 1, delay = 0) {
  playNoise(1.45, 0.018 * intensity, 1400, 110, delay);
  playNoise(0.95, 0.01 * intensity, 900, 140, delay + 0.03);
  playSweep(240, 150, 0.26, 'triangle', 0.0052 * intensity, delay + 0.03);
}

function playCrowdBuildUp() {
  playNoise(1.2, 0.013, 1800, 140, 0);
  playNoise(0.7, 0.007, 1200, 150, 0.1);
  playSweep(175, 225, 0.2, 'triangle', 0.0045, 0.06);
}

function playCrowdMurmur(intensity = 0.3, delay = 0) {
  playNoise(1.35, 0.0075 * intensity, 1500, 120, delay);
  playNoise(0.85, 0.0038 * intensity, 900, 150, delay + 0.03);
}

function playCrowdAnticipation(secondsLeft = 4) {
  const intensity = secondsLeft <= 1 ? 1.08 : secondsLeft <= 2 ? 0.9 : secondsLeft <= 4 ? 0.68 : 0.46;
  playNoise(0.6, 0.0105 * intensity, 1950, 150, 0);
  playNoise(0.4, 0.0055 * intensity, 1150, 150, 0.06);
  if (secondsLeft <= 2) {
    playImpact(90, 900, 0.42 * intensity, 0.02);
    playImpact(90, 900, 0.42 * intensity, 0.18);
  }
}

function playGoalCheer() {
  playCrowdRoar(2.1, 0);
  playCrowdRoar(1.55, 0.42);
  playNoise(1.2, 0.025, 3200, 130, 0.08);
}

function playGoalSceneCrowd() {
  playGoalCheer();
}

function playSaveSceneCrowd() {
  playCrowdGroan(1.05, 0.02);
  playCrowdMurmur(0.38, 0.36);
}

function playKickSound() {
  playImpact(118, 1300, 0.95, 0);
  playNoise(0.035, 0.006, 1600, 320, 0.014);
}

function playGoalSound() {
  playImpact(124, 1700, 1.05, 0);
  playNoise(0.08, 0.008, 2200, 380, 0.04);
  playCrowdRoar(1.28, 0.08);
}

function playSaveSound() {
  playImpact(152, 1650, 0.9, 0);
  playTone(820, 0.035, 'triangle', 0.018, 0.018);
  playTone(560, 0.05, 'triangle', 0.012, 0.04);
  playNoise(0.05, 0.008, 2400, 700, 0.016);
  playNoise(0.09, 0.006, 1200, 280, 0.045);
  playCrowdGroan(0.58, 0.11);
}

function playMissSound() {
  playImpact(104, 1000, 0.62, 0);
  playSweep(250, 145, 0.28, 'triangle', 0.007, 0.03);
  playNoise(0.08, 0.006, 1700, 360, 0.02);
  playCrowdGroan(1.28, 0.04);
  playCrowdGroan(0.92, 0.42);
  playCrowdMurmur(0.52, 0.74);
}

function playWhistle() {
  playSweep(1320, 1180, 0.09, 'square', 0.032, 0);
  playSweep(1260, 1040, 0.1, 'square', 0.027, 0.12);
}

function playStartWhistle() {
  playSweep(1380, 1120, 0.11, 'square', 0.038, 0);
  playSweep(1340, 980, 0.13, 'square', 0.032, 0.13);
}

function playFinalWhistle() {
  playSweep(1460, 1200, 0.14, 'square', 0.04, 0);
  playSweep(1420, 1100, 0.14, 'square', 0.038, 0.2);
  playSweep(1380, 1020, 0.18, 'square', 0.044, 0.44);
  playSweep(1320, 920, 0.24, 'square', 0.042, 0.76);
}

function playPenaltyWhistle() {
  playSweep(1540, 1240, 0.12, 'square', 0.038, 0);
  playSweep(1480, 980, 0.14, 'square', 0.032, 0.1);
}

function playCardSound(red = false, freq = null) {
  playWhistle();
  playTone(freq || (red ? 180 : 300), 0.13, red ? 'sawtooth' : 'triangle', 0.018, 0.2);
  if (red) playTone(150, 0.18, 'sine', 0.012, 0.24);
}

function playChampionSound() {
  playCrowdRoar(1.5, 0.02);
  playCrowdRoar(1.1, 0.55);
  playTone(392, 0.22, 'triangle', 0.03, 0);
  playTone(523, 0.22, 'triangle', 0.034, 0.16);
  playTone(659, 0.24, 'triangle', 0.038, 0.32);
  playTone(784, 0.28, 'triangle', 0.042, 0.5);
  playTone(523, 0.54, 'sawtooth', 0.014, 0.06);
  playTone(659, 0.54, 'sawtooth', 0.014, 0.11);
  playTone(784, 0.54, 'sawtooth', 0.014, 0.16);
}

function isMobileLandscape() {
  const likelyMobile = window.innerWidth <= 900 || ('ontouchstart' in window);
  return likelyMobile && window.innerWidth > window.innerHeight;
}

function requestPortrait() {
  try {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('portrait').catch(() => {});
    }
  } catch (error) {}
  showToast('Rotate your device to portrait for the best view.');
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min, maxInclusive) {
  return Math.floor(Math.random() * (maxInclusive - min + 1)) + min;
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sumValue, value) => sumValue + value, 0) / values.length;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function weightedPick(items, weights) {
  const total = sum(weights);
  let roll = Math.random() * total;
  for (let i = 0; i < items.length; i += 1) {
    roll -= weights[i];
    if (roll <= 0) return items[i];
  }
  return items[items.length - 1];
}

function formatSigned(value) {
  if (value > 0) return `+${value}`;
  return `${value}`;
}
