# Mighty Protectors System for FoundryVTT
A Villains and Vigilantes 3:  Mighty Protectors system implementation for Foundry VTT

This is the "Version 1.0" release of this system, meaning it has reached the point where the initial goals listed below have been achieved.  Minor updates will be issued to fix bugs, maintain compatibility with Foundry versions, etc.

More significant changes may happen based on time/inclination/inspiration.  Suggestions and bug reports can be submitted via the support links below.

## Documentation
- [Creating powers/abilities for a compendium](ability-example.md)
- [Character creation example](character-example.md)
- [Macros](macro-helpers.md)

## The Game
[Mighty Protectors](https://www.drivethrurpg.com/product/220501/VV-30-Mighty-Protectors?affiliate_id=1692486) is the property of [Monkey House Games](https://monkeyhousegames.com/).  This system is an independent project unaffiliated with Monkey House.

## Goals
Targeted functionality for a version 1.0 release of this system includes:
- Character and vehicle sheets featuring automated stat calculations similar to those in the official [Excel Record Sheet](https://www.drivethrurpg.com/product/222459/Mighty-Protectors-Excel-Record-Sheet-Pack?term=mighty+protectors?affiliate_id=1692486) version of the character sheet.
- Initiative management that includes per-round re-rolls and support for multiple initiative entries for characters with super speed.
- Attack, Damage, and saving throw rolls based on stats & powers defined on the character/vehicle sheets.

Future versions may incorporate features such as optional further automation of combat actions.

## Known issues
- Adding a turn for a super-speed character to an in-progress combat will throw an error if Monk's Little Details is activated.  Doesn't seem to cause any actual problems though.

## To Do... Maybe?
- Token HUD conditions to be replaced or supplemented by MP-sepcific ones (this can be achieved now with the Combat Utility Belt module)
- Re-skinning/re-styling to look less like the generic Foundry character sheet?
- More automation?  Potentially auto-apply damage on a hit when a target is selected; would require adding in some more intelligence around damage types, potential invulnerabilities, etc.

## Support
(Sigh) Well, since Discord seems to be the way to do things these days.... [Foundry Protectors Discord Server](https://discord.gg/VU98efBCuP).  In addition, while Monkey House Games does not offer official support for this product, I frequently check their [official Discord server](https://discord.gg/aC8v35gAPP).  In addition I try to visit the forum on their [official web site](https://monkeyhousegames.com/) a few times a month, though it seems to be allergic to my IP address and I spend more time blocked than not.


## Contributing
Not currently in search of help with functional development, but would be interested in collaborating with someone with design skills and strong modern CSS knowledge on layout improvements.

The system is set up for multi-language support but is currently only in English; multi-lingual folks willing to translate lists of keywords are also welcome.

The project is free and open source, but if you'd like to contribute financially, feel free to donate via [ko-fi](https://ko-fi.com/drl2461951) or make purchases through the [DriveThruRPG](https://www.drivethrurpg.com/?affiliate_id=1692486) affiliate links above or this [Amazon link](https://amzn.to/3kGDqgc).


## Change Log

### [1.0.2] - 2022-08-05

- Fixed an issue where players were seeing permission errors at start of combat
- Should now correctly reset the current active turn after initiative rolls at the top of a new round.

### [1.0.1] - 2022-05-23

- Fixed an issue with fumble rolls

### [1.0.0] - 2022-05-21

- Attacks that use charges can now be linked to powers that have them as long as both are owned by the same character - so now charges can be auto-deducted when the attack is rolled.
- Added buttons to the attack results to roll for possible crits and fumbles.  If the first d20 roll indicates a crit or fumble, a second button will appear to roll for the specific effect.  If the included crit & fumble roll tables have not been renamed or deleted, the second button rolls against those.
- Vehicle sheets!
    - I haven't used the vehicle rules much myself so it's very likely there are some bugs to discover and tweaks to be made.  Please share feedback on the support Discord server.
    - Because vehicles' attacks and defenses are almost always at least partly based on the stats of pilots, gunners, etc., target numbers and automatic hit detection are not available for attacks by or against vehicles.  You'll have to do it the old fashioned way.

### [0.7.0] - 2022-03-07

- Fixed issue where current turn wasn't moving to top of the initiative list at the beginning of a round
- GM might prefer to hide the relative strength of NPCs from players, so separated "Show roll with" option into separate ones for characters and NPCs; NPC one has option to show only to GM
- Added display on character sheet to differentiate between NPC & Char actors
- Added inventing point bonus to ability sheet (for the "Inventing" power)
- Clicking "Healing" now pops up a dialog for healing over time as laid out in section 4.13 of the rules
- Did a lot of prep work for implementing vehicle sheets, including entering in the Big Giant Table of vehicle properties (rules p. 78)
- Still haven't settled on how to implement vehicles, though - thinking of just a slight modification to the regular character sheet with a "vehicle systems" section in place of abilities but working more or less the same way
- Added Crit & Fumble roll tables


### [0.5.5] - 2021-11-27

- System settings actually implemented
- HtH roll added to ST
- XP spent has turned into a calculated field, negating the need for a "Calculated" copy of the total xp
- Blunt vs Sharp kinetic distinction removed, as the presence or absence of Knockback indicates this
- Added Security Clearance to the character Bio tab, on the off chance anybody ever uses it
- Added some macro shortcuts and documentation for them

### [0.5.0] - 2021-11-17

- Initial public test release

## Acknowlewdgements

- Thanks to Jack Herman and Jeff Dee for releasing Mighty Protectors at pretty much exactly the time I was looking to get back into tabletop gaming after a many-year hiatus.  (In other words:  Jeff, this is *all your fault*!.)
- Thanks to all the folks on the League of Extraordinary FoundryVTT Developers discord for answering so many of my possibly sometimes inane questions.  (But I still despise Discord as a development support mechanism.)
- Thanks to Brian and the rest of the Tuesday night group for helping to keep the games going during Coronapalooza.

