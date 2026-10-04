# World Cup 2026 – Full Game Design Spec

Version: 1.0  
Date: 2026-10-04  
Platform target: Web browser  
Audience: Private/friends prototype  
Visual direction: Simple 2D broadcast-style football presentation

---

## 1. High-level concept

**World Cup 2026** is a fast, fun, replayable football tournament game based on the real 2026 FIFA World Cup structure.

It combines:
- a real-feeling tournament format
- short, accessible match sessions
- interactive key moments rather than full 90-minute football simulation
- optional chaos through **Taidghfantino rule changes**

The player can:
- control one team through the tournament
- choose a side in every match
- watch the tournament unfold with minimal interaction
- set up quick friendly matches

The game should feel like:
- a television tournament broadcast
- a football management-lite game
- a quick arcade decision game during key chances

It is **not** intended to be a full 11-v-11 manual football game like FIFA/EA FC or eFootball.

---

## 2. Product vision

Create a browser game that lets friends play through an exciting World Cup tournament in short sessions, with just enough realism to feel authentic and just enough interactivity to feel dramatic and funny.

---

## 3. Design pillars

### 3.1 Authentic tournament, simplified matches
Use the real tournament structure and recognizable teams/players, but simplify match simulation so games stay short and easy to follow.

### 3.2 Key moments are the fun
The most important gameplay happens during:
- big chances
- penalties
- substitutions
- tactical decisions
- injuries/cards
- Taidghfantino popups

### 3.3 Short sessions, strong replayability
A full match should take about **7 minutes**, making tournament progress quick and satisfying.

### 3.4 Dramatic but readable
The player should understand why things happen. Even probability-based outcomes must feel fair and explainable.

### 3.5 Taidghfantino gives the game personality
The optional rule-change system should make the game memorable without ruining competitive balance.

---

## 4. Target players

Primary audience:
- football fans
- kids/families/friends
- players who like tournaments and sports drama
- players who want a lighter alternative to complex football games

Secondary audience:
- players who enjoy simulation brackets
- people who like “what if” World Cup runs

---

## 5. Platform and release assumptions

### 5.1 Platform
- Browser-first
- Desktop/laptop priority
- Should still be usable on tablet/mobile later

### 5.2 Release type
- Version 1 is a private/friends prototype
- Can use placeholder or simplified presentation for some licensed elements if needed

### 5.3 Save model
- Local save in browser for v1
- Optional cloud save later

---

## 6. Core fantasy

The player fantasy is:
- “I guided my country to World Cup glory.”
- “I made the key decisions in the biggest moments.”
- “I survived Taidghfantino’s weird tournament rules.”
- “I won a dramatic penalty shootout by guessing right.”

---

## 7. Scope summary

### In scope for version 1
- 2026 World Cup tournament structure
- 4 game modes
- short 7-minute event-driven matches
- interactive goal chance system
- interactive penalty system
- substitutions
- injuries
- yellow/red cards
- Taidghfantino ON/OFF setting
- sound/music toggles
- tournament save/resume
- end-of-tournament trophy/flag scene

### Nice-to-have for later
- commentary audio
- cloud save
- multiple save slots
- richer player stats
- form/morale system
- achievements
- multiple animation sets
- advanced data import pipeline

---

## 8. Official rules basis

The game should use the real **2026 World Cup structure**:
- 48 teams
- 12 groups of 4
- 3 group matches per team
- 3 points win / 1 draw / 0 loss
- top 2 in each group qualify
- 8 best third-placed teams qualify
- knockout rounds: Round of 32, Round of 16, quarter-finals, semi-finals, third-place playoff, final
- knockout ties use extra time and then penalties if needed

General football rules to model:
- 11 players per side
- minimum 7 players to continue
- 5 substitutions in normal time
- 1 extra substitute in extra time
- yellow cards, red cards, suspensions, injuries

The game should use these rules as the base, even though match play itself is abbreviated.

---

## 9. Game modes

## 9.1 Mode A – One Team Only
Player selects one national team and only directly plays that team’s matches.

### Purpose
- fastest full tournament mode
- strongest emotional attachment to one team

### Flow
- choose team
- all non-selected-team matches auto-simulate
- selected team matches are playable
- if selected team is eliminated, tournament ends for that save

### Player control
- tactics
- substitutions
- interactive chances
- penalties
- setting changes between matches

---

## 9.2 Mode B – Choose a Team Every Game
Player can select which side to control in every match.

### Purpose
- “director mode” for full tournament control
- useful for players who want to shape the whole tournament

### Flow
- before each match, choose Team A, Team B, or possibly neutral watch mode
- every match can be played interactively

### Player control
- full match interaction each fixture

---

## 9.3 Mode C – Watch Mode
Player mostly watches the tournament unfold.

### Purpose
- low-pressure mode
- ideal for bracket drama and storylines

### Flow
- choose favourite team at start
- matches simulate automatically or with lightweight highlight popups
- player tracks progress but does not make direct in-match interventions

### Optional interaction
- between-match morale choices
- prediction bonuses
- favourite-team notifications

---

## 9.4 Mode D – Friendly Match
Player chooses any two teams and plays a one-off match.

### Purpose
- fast play
- sandbox testing
- replay value

### Settings options
- normal rules or Taidghfantino ON
- penalties after draw optional
- choose match difficulty
- possibly choose weather/stadium later

---

## 10. Core game loop

### Tournament-level loop
1. Main menu
2. Select mode
3. Select teams/settings
4. Pre-match screen
5. Play/simulate match
6. Post-match results
7. Updated standings or bracket
8. Next match
9. Save/resume anytime between matches
10. Tournament ending screen if complete

### Match-level loop
1. Match intro
2. First-half timer runs
3. Event simulation produces chances, fouls, cards, injuries, subs opportunities
4. Player interacts during key moments
5. Half-time choices
6. Second-half timer runs
7. End of normal time
8. Extra time if knockout and tied
9. Penalties if still tied
10. Match result summary

---

## 11. Match structure

## 11.1 Match duration
Target total match time: **~7 minutes**

Recommended timing:
- pre-match intro: 10–15 sec
- first half: 3 min 15 sec
- half-time: 20–30 sec
- second half: 3 min 15 sec
- stoppage time: represented within event pacing or as short extension
- extra time: ~2 minutes total gameplay equivalent
- penalties: 30–90 sec depending on length

This is a **compressed representation** of a 90-minute match.

## 11.2 Time model
The game clock displays real football time:
- 0'–45+'
- 45'–90+'
- 90'–120+'

Internally, the simulation runs on compressed time.

Example:
- every few real-time seconds, the match state advances several virtual minutes
- key moments interrupt the clock and open interaction scenes

---

## 12. Match simulation philosophy

The match engine should be **event-driven** rather than physics-driven.

It should simulate:
- possession swings
- territory
- buildup pressure
- chance creation
- shot quality
- defensive resistance
- fatigue
- player events

The player is not controlling every pass or movement.
Instead, the game decides when an important event happens and then invites the player to influence it.

---

## 13. Match states

Each match can move between these states:
- intro
- kickoff
- open play simulation
- attack buildup event
- key chance event
- foul/card event
- injury event
- substitution menu
- half-time
- extra time
- penalty shootout
- full-time summary

These states should be explicit in code.

---

## 14. Team strength model

Each team should have a set of ratings:
- overall rating
- attack rating
- midfield/control rating
- defence rating
- goalkeeper rating
- stamina rating
- discipline rating
- penalty rating
- bench depth rating

These can be derived from real player data.

### Team strength uses
- likelihood of controlling possession
- creation of big chances
- resistance to pressure
- success in extra time
- shootout performance
- injury/fatigue resilience

---

## 15. Player data model

Each player should ideally have:
- name
- shirt number
- position
- team
- overall rating
- finishing
- shot power
- composure
- passing
- dribbling
- defending
- pace
- stamina
- discipline
- injury risk
- penalty stat
- goalkeeper-specific stats if applicable:
  - diving
  - reflexes
  - positioning
  - handling

### Minimum viable stat set
If a full stat set is too much at first, use:
- overall
- attack contribution
- defence contribution
- stamina
- discipline
- penalty skill
- keeper save ability

---

## 16. Lineups and squads

Each team should have:
- starting XI
- bench players
- default formation
- captain
- primary penalty takers ranking
- backup goalkeeper if available

### Squad size for game purposes
For v1, a simplified squad size can work if needed, but ideal is enough players to support:
- injuries
- suspensions
- substitutions
- realistic lineup changes between matches

Recommended v1 tournament squad representation:
- 18 to 23 players minimum in usable data

---

## 17. Match event system

Events are generated based on:
- team strength mismatch
- current scoreline
- tactics
- fatigue
- cards/injuries
- game minute
- Taidghfantino modifiers
- home/neutral pressure feel if included

### Event categories
- harmless possession spell
- dangerous attack
- big chance
- shot from distance
- set piece
- corner pressure
- foul
- yellow card
- red card
- injury
- substitution prompt
- VAR-style drama popup optional later

Most small events are handled in text/animation summaries.
Only some become interactive scenes.

---

## 18. Interactive chance system

This is the main gameplay mechanic.

## 18.1 Chance trigger
When the engine creates a major opportunity, the game cuts to an interactive sequence.

### Chance types
- open-play shot
- one-on-one
- close-range chance
- header chance
- penalty kick

## 18.2 Attacking interaction
When the player’s controlled side is about to shoot:
- goalmouth shows **8 selectable zones**
- arranged as **2 rows of 4**
- player selects exactly **1 zone**
- optional timing meter or power choice can be added later
- short animation plays
- outcome resolved by probability

## 18.3 Defensive interaction
When the opposition is about to take a major shot against the player’s controlled side:
- same 8-zone goal graphic appears
- player chooses **1 zone to dive/save**
- keeper animation plays
- outcome resolved by probability

## 18.4 Why this works
This keeps matches short while making the player feel responsible for dramatic moments.

---

## 19. Goal grid design

The goal is divided into 8 squares:

Top row:
- top-left
- top-mid-left
- top-mid-right
- top-right

Bottom row:
- bottom-left
- bottom-mid-left
- bottom-mid-right
- bottom-right

### Design notes
- zones should be large and easy to click/tap
- selected zone should highlight strongly
- there should be a short countdown so the player must decide quickly
- bottom corners can be slightly easier to hit but easier for keepers depending on stats
- top corners can be harder to hit but harder to save

---

## 20. Chance resolution model

Outcome should depend on a blend of:
- shooter finishing/composure/power
- goalkeeper diving/reflexes/positioning
- angle and chance quality
- selected shot zone difficulty
- selected save zone correctness
- fatigue
- pressure moment
- tactical context
- Taidghfantino rules
- random variance

### Simple conceptual formula
1. Generate base chance conversion probability from chance quality
2. Modify by shooter and keeper attributes
3. Modify by zone difficulty
4. Modify by whether defending player guessed the correct zone
5. Clamp to sensible min/max values
6. Roll outcome

### Example design target
A very good chance might convert around 45–65% before player input and modifiers.
A poor chance might convert around 10–20%.
A penalty might convert around 70–85% depending on stats and guesses.

---

## 21. Penalty shootout system

## 21.1 Trigger
In knockout games, if scores are level after extra time, proceed to penalties.

## 21.2 Presentation
- scoreboard with kick order
- taker name shown
- goalkeeper shown
- 8-square target system reused

## 21.3 Attacking penalty
- player picks target square
- optional subtle timing bar later
- short run-up + dive animation

## 21.4 Defending penalty
- player picks dive square
- animation resolves

## 21.5 Shootout logic
- alternating kicks
- initial set of 5 each
- sudden death afterward if required
- appropriate eligible takers order

### Optional tension features
- crowd gets louder
- camera zoom
- heart-beat sound
- composure penalties after misses

---

## 22. Tactical system

The tactical system should be light, readable, and impactful.

## 22.1 Team mentality options
- Ultra Defensive
- Defensive
- Balanced
- Attacking
- Ultra Attacking

## 22.2 Effects
Tactics change:
- chance creation rate
- exposure to counters
- foul frequency
- fatigue drain
- late-match behaviour

## 22.3 In-match tactical moments
The player can change tactics:
- before kickoff
- at half-time
- during stoppages
- after conceding/scoring if allowed through pause menu

---

## 23. Substitution system

The player wants to make substitutions through the match.

## 23.1 Rules
- 5 subs in normal time
- 1 extra sub in extra time
- ideally 3 substitution windows in normal time, plus half-time, mirroring real rules

### Simpler v1 option
If substitution windows are too complex for v1, keep the total sub count but simplify the window restriction. This can be listed as a design trade-off.

## 23.2 Reasons to sub
- injury
- fatigue
- tactical switch
- protect player on yellow card
- bring on a better penalty taker
- replace sent-off keeper logic if needed

## 23.3 Sub UI
Show:
- current lineup
- bench
- stamina bars
- cards
- injury status
- position fit

## 23.4 AI substitutions
AI-controlled teams should also make subs based on:
- fatigue
- trailing/leading state
- injuries
- red card adjustments
- extra time penalties strategy

---

## 24. Injury system

## 24.1 Purpose
Adds drama, squad management, and longer tournament consequences.

## 24.2 Injury event types
- minor knock
- playable injury with reduced performance
- forced substitution injury
- multi-match injury

## 24.3 Causes
- random fatigue/injury chance
- hard tackle events
- accumulated fatigue
- Taidghfantino modifier

## 24.4 Tournament effect
Injuries may:
- affect current match
- carry into later matches
- force lineup changes

### V1 recommendation
Use short, readable injury categories such as:
- fine
- doubtful
- out 1 match
- out 2 matches
- out for tournament

---

## 25. Card and discipline system

## 25.1 Yellow cards
Players can be cautioned for fouls, tactical fouls, dissent-style text events, or strict-referee modifiers.

## 25.2 Red cards
Players can be sent off for:
- second yellow
- straight red event

## 25.3 In-match effect
- team down to 10 or fewer players
- lower attacking output
- defensive shape changes
- increased fatigue on remaining players

## 25.4 Tournament effect
- suspension for accumulation or red card
- tracked across the tournament

### V1 recommendation
Support:
- yellow cards in match
- two-yellows suspension across tournament
- straight red suspension at least next match

---

## 26. Suspensions system

Track per-player:
- yellow accumulation count
- current suspension matches remaining
- red-card status

The pre-match screen must warn the player if:
- a starter is suspended
- a player is one yellow from suspension

---

## 27. Fatigue and stamina

Fatigue should matter because it affects:
- chance quality
- pressing effectiveness
- injury risk
- late-game performance
- extra-time survival

### Inputs to fatigue
- minutes played
- tactics
- recent matches
- red-card situations
- extra time

### Uses
- encourage substitutions
- create realistic late drama

---

## 28. Morale / momentum system

A lightweight hidden or semi-visible momentum system can improve drama.

Momentum rises when:
- scoring
- dominating possession
- making key saves
- winning tackles

Momentum drops when:
- conceding
- red card
- injury to key player
- missed penalty

### Effects
- temporary chance creation boost
- increased mistake risk for the other team

### Recommendation
Use this subtly so it feels alive but not unfair.

---

## 29. Taidghfantino system

This is the game’s unique personality feature.

## 29.1 Core concept
**Taidghfantino** is the tournament boss who can introduce small random rule changes across the competition.

## 29.2 Player setting
In Settings:
- Taidghfantino Rules: ON/OFF

When OFF:
- tournament uses normal rules only

When ON:
- occasional rule events occur before matches, rounds, or the whole tournament

## 29.3 Design goals
- funny
- surprising
- still fair enough
- easy to understand quickly

## 29.4 Rule-change categories
### Match modifiers
- long shots boosted
- tighter refereeing
- less stoppage for fouls
- goalkeepers slightly stronger/weaker
- first goal gives confidence boost

### Squad modifiers
- one extra substitute this match
- tired players recover slightly faster/slower
- yellow cards carry more risk this round

### Tournament flavour modifiers
- underdogs gain a small morale boost
- penalties are more likely in knockout games
- group-stage draw breaker behaviour change is **not** recommended unless clearly explained

## 29.5 Frequency
Recommended frequency:
- 1 small rule event every 1–3 matches in player-involved modes
- 1 per round in watch mode

## 29.6 Communication
When a rule change activates:
- popup appears
- Taidghfantino portrait appears
- short title + one-line explanation

Example:
- “Taidghfantino Decree: Extra Sub Tonight”
- “Both teams receive one additional substitution in this match.”

## 29.7 Visuals
Use a stylized or edited portrait of Taidghfantino in a suit for these announcements.
Potential variants:
- smiling official portrait
- serious decree portrait
- excited thumbs-up portrait
- trophy ceremony portrait

---

## 30. AI behaviour

AI should feel sensible, not perfect.

## 30.1 AI goals
- produce believable football outcomes
- use subs sensibly
- change tactics when behind or ahead
- handle penalties reasonably

## 30.2 AI tactical profiles
Each team can have a style bias:
- possession-heavy
- direct attacking
- defensive/counter
- balanced
- aggressive pressing

## 30.3 AI shot selection
AI does not literally “click” zones, but its shot target should be weighted by player skill and context.
When the human is defending, the AI shot zone is generated first, then the player tries to read it.

---

## 31. Difficulty system

The game should support at least 3 difficulty levels.

### Suggested levels
- Easy
- Normal
- Hard

### What difficulty changes
- AI decision quality
- chance conversion slight modifiers
- keeper reactions
- forgiveness in save/shot probability
- injury/card harshness should not change too much unless clearly signposted

---

## 32. User interface flow

## 32.1 Main menu
Buttons:
- New Tournament
- Continue
- Friendly Match
- Settings
- Credits / About

## 32.2 Tournament setup screen
Options:
- mode A/B/C
- choose team/favourite team
- difficulty
- Taidghfantino ON/OFF
- sound/music ON/OFF
- maybe match speed later

## 32.3 Team selection screen
- flags
- team ratings
- favourite player highlights optional

## 32.4 Pre-match screen
Show:
- fixture
- stage/round
- current standings or bracket
- lineups
- suspensions/injuries
- tactics
- Taidghfantino active rule if any
- buttons: Play / Sim / Manage Team

## 32.5 Match HUD
Show:
- score
- match clock
- team names/flags
- cards indicator
- stamina summary
- tactic indicator
- pause/settings/sub button

## 32.6 Interactive chance UI
Show:
- goal with 8 target zones
- current player name
- shot context text
- timer ring/countdown

## 32.7 Half-time screen
Show:
- score
- stats summary
- cards/injuries
- make substitutions
- change tactics
- continue

## 32.8 Post-match screen
Show:
- final score
- scorers
- cards
- injuries
- player of match
- bracket/standings update
- next match or save/quit

## 32.9 Tournament screens
- group tables
- knockout bracket
- top scorers
- suspensions list
- injured players list

---

## 33. Audio design

The player requested music and sounds toggles.

## 33.1 Settings
- Music ON/OFF
- Sounds ON/OFF

## 33.2 Sound categories
### Music
- menu music
- victory stinger
- trophy scene music

### Match sounds
- crowd ambience
- cheer swell
- groans
- whistle
- kick sound
- net sound
- card whistle sting
- injury/foul impact light effect

### UI sounds
- button clicks
- popup open
- Taidghfantino decree sting

## 33.3 Audio design goal
Make matches feel alive without needing full commentary.

---

## 34. Visual style

## 34.1 General style
Simple 2D broadcast presentation.

### Match scenes can be shown as:
- side-on penalty/chance scenes
- stylized pitch overview for text events
- overlay cards and popups

## 34.2 Art direction
- bright tournament colours
- clean UI
- strong readability
- bold team colours and flags
- playful but not silly

## 34.3 Character use
Taidghfantino portrait set should be visually consistent with the game.

---

## 35. Animation requirements

### Minimum v1 animation set
- kicker run-up and shot
- goalkeeper dive left/center/right style variants
- goal celebration short loop
- save animation
- miss animation
- card shown animation
- injury stop-play animation
- halftime/fulltime transitions
- Taidghfantino popup entrance

### Nice-to-have later
- bench reaction
- crowd flag waves
- confetti in final

---

## 36. Commentary / text presentation

Even without voice commentary, the game can use short text commentary.

Examples:
- “Mbappé bursts through the line!”
- “Huge save from Martínez!”
- “That looked reckless…”
- “Taidghfantino has changed the rules again.”

Text should be short and dramatic.

---

## 37. Tournament progression system

## 37.1 Group stage
Need to support:
- full fixture list generation
- standings calculation
- tie-breakers
- third-place ranking across groups

## 37.2 Knockout stage
Need to support:
- correct round of 32 mapping from group results
- progression through final
- third-place playoff

## 37.3 Tournament records
Track:
- top scorer
- clean sheets optional
- goals conceded optional
- team journey

---

## 38. Tie-breakers

Use real-feeling tie-breakers.

### Group ranking priority
Recommended implementation:
1. points
2. head-to-head points
3. head-to-head goal difference
4. head-to-head goals scored
5. overall goal difference
6. overall goals scored
7. fair play / discipline
8. ranking fallback

### Best third-placed teams
Use:
1. points
2. goal difference
3. goals scored
4. discipline
5. ranking fallback

If implementation complexity is high for v1, this may be simplified internally but should still feel credible.

---

## 39. Save/load system

## 39.1 Requirement
Player must be able to stop and continue later.

## 39.2 Save timing
Allow save:
- after every match
- on tournament hub screens
- optionally at half-time if technically easy

Avoid saving during a shot animation unless state serialization is very robust.

## 39.3 Data to save
- game mode
- tournament stage
- match schedule/results
- group tables
- knockout bracket
- team rosters
- lineup choices
- injuries
- suspensions
- yellow card counts
- settings
- Taidghfantino active modifiers
- user favourite/selected team
- stats leaders

## 39.4 Storage
For v1:
- browser local storage or IndexedDB

### Optional later
- export/import save file
- cloud sync account system

---

## 40. End-of-tournament sequence

At the end of the tournament, show:
- trophy image/animation
- winning country flag
- winning team name
- final score result
- top scorer
- best goalkeeper optional
- tournament summary
- Taidghfantino final message if enabled

### Ceremony variants
- normal ending if Taidghfantino OFF
- special funny ending if Taidghfantino ON

---

## 41. Data and content requirements

## 41.1 Team content
Need:
- 48 teams in tournament mode
- flags
- names
- ratings
- squad/player lists

## 41.2 Player content
Need:
- names
- basic stats
- positions
- penalty order

## 41.3 Art assets
Need:
- menus
- pitch background
- goal/chance screen
- team flags
- trophy scene
- Taidghfantino portraits
- cards/icons
- stamina/card/injury icons

## 41.4 Audio assets
Need:
- music loop(s)
- crowd ambience
- UI sfx
- match event sfx

---

## 42. Technical architecture recommendation

Recommended stack for browser version:
- HTML/CSS/JavaScript or TypeScript
- a simple web framework if desired
- Canvas or lightweight game rendering layer for match scenes
- JSON-driven content data for teams/players/rules
- local save via localStorage or IndexedDB

### Suggested structure
- `data/teams.json`
- `data/players.json`
- `data/rules.json`
- `data/taidghfantino_rules.json`
- `src/sim/`
- `src/ui/`
- `src/state/`
- `src/assets/`

---

## 43. Game state model

High-level persistent state should include:

```json
{
  "mode": "one_team",
  "selectedTeam": "New Zealand",
  "favouriteTeam": "New Zealand",
  "difficulty": "normal",
  "settings": {
    "music": true,
    "sounds": true,
    "taidghfantino": true
  },
  "tournament": {
    "stage": "group",
    "groups": [],
    "fixtures": [],
    "bracket": {},
    "thirdPlaceRanking": []
  },
  "teams": {},
  "players": {},
  "injuries": {},
  "suspensions": {},
  "stats": {
    "topScorers": [],
    "results": []
  },
  "activeRuleModifiers": []
}
```

---

## 44. Probability model spec

## 44.1 Base match outcome layer
Before a match, compute expected strength balance from:
- team ratings
- form/fatigue
- cards/injuries
- tactics

This influences:
- possession share
- attack frequency
- chance quality distribution

## 44.2 Chance generation layer
Every segment of the match, determine whether an event occurs.
Possible outputs:
- no major event
- one team gets half-chance
- one team gets big chance
- foul/injury/card event

## 44.3 Finishing layer
When a shot occurs, compute:
- base xG-like value
- shooter modifier
- keeper modifier
- zone difficulty
- guessed-correctly modifier
- pressure modifier
- randomness

## 44.4 Penalty layer
Penalty resolution should have a higher baseline score probability than open play, but still allow skill and guessing to matter.

### Suggested balance target
- correct keeper guess should matter a lot
- poor penalty takers should still miss or be saved more often
- top penalty takers should feel reliable, not automatic

---

## 45. Balancing goals

The game should feel:
- exciting every match
- not too random
- not too predictable
- forgiving enough for casual players

### Balance principles
- strong teams should usually perform better over the tournament
- weaker teams should still occasionally upset stronger sides
- human input should matter in big moments
- one wrong click should not decide every match unfairly

---

## 46. Accessibility and usability

## 46.1 Usability
- big buttons
- easy-to-read fonts
- clear iconography
- simple menus
- fast retries in friendlies

## 46.2 Accessibility options
Nice-to-have:
- colourblind-friendly card/icons
- reduced motion toggle
- larger text mode
- volume sliders later instead of only ON/OFF

---

## 47. Monetisation

Not required for current scope.
If ever expanded publicly:
- keep base game premium or free
- avoid predatory design
- do not let Taidghfantino modifiers become paid advantages

---

## 48. Risks and constraints

## 48.1 Licensing risk
Using official logos, real player likenesses, and official trophy imagery may raise rights issues for broader public release.

### For prototype/friends
Lower concern, but still good to document.

## 48.2 Data complexity
Real player data and full tournament logic increase implementation complexity.

## 48.3 Balance risk
Too much randomness can feel unfair.
Too little randomness can feel boring.

## 48.4 Scope risk
Building all four modes, tournament logic, and polished interactions at once may be too large for a first milestone.

---

## 49. Recommended versioning plan

## 49.1 Version 0.1 – Match prototype
Build:
- friendly mode only
- 2 teams
- 7-minute match
- 8-square shot/save mechanic
- scoreline, halftime, penalties

## 49.2 Version 0.2 – Match systems
Add:
- substitutions
- cards
- injuries
- tactics
- save/load for friendly settings

## 49.3 Version 0.3 – Tournament framework
Add:
- group stage
- standings
- knockout bracket
- one-team mode

## 49.4 Version 0.4 – Full mode support
Add:
- choose team each game mode
- watch mode
- full save system

## 49.5 Version 0.5 – Personality/polish
Add:
- Taidghfantino rule changes
- portrait popups
- audio polish
- final ceremony

---

## 50. Acceptance criteria for version 1

Version 1 is successful if:
- player can start a new tournament in browser
- player can choose a team and play through matches
- matches take about 7 minutes
- interactive goal/penalty mechanic works reliably
- substitutions, injuries, and cards function
- tournament standings/bracket update correctly
- player can save and resume later
- Taidghfantino ON/OFF works
- end tournament scene shows trophy and winning flag

---

## 51. Open design decisions

These are not blockers, but should be confirmed before production:

1. Should the game use the exact real 2026 qualified teams and squads, or a configurable data pack?
2. How realistic should player stats be in v1?
3. Should watch mode have any interaction at all?
4. Should substitution-window rules be fully authentic in v1 or simplified?
5. Should difficulty affect only AI behaviour, or also probabilities directly?
6. Should friendly mode allow any nation in the data, even if not in the 2026 tournament?
7. Should Taidghfantino rules be cosmetic/fun only, or can they materially affect outcomes?
8. Should the player be allowed to simulate any match from the pre-match screen?
9. Do we want one save slot or multiple?
10. Should halftime always pause, or can players optionally skip halftime management?

---

## 52. Final recommendation

The best implementation path is:
- build a **friendly-match prototype first**
- prove the **interactive 8-square shooting/saving mechanic** is fun
- then layer on tournament progression, save/load, and Taidghfantino personality

This reduces risk while keeping the final vision intact.

---

## 53. One-sentence product summary

**World Cup 2026** is a browser-based, 2D, event-driven football tournament game where players guide teams through the real 2026 World Cup structure, making key decisions in dramatic moments while optional Taidghfantino rule changes add humor and surprise.
