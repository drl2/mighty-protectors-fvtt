# Mighty Protectors System for FoundryVTT
A Villains and Vigilantes 3:  Mighty Protectors system implementation for Foundry VTT

This is the initial public release of this system, intended primarily for testing.  Near-future updates might change the underlying data model in ways that will break characters or items created under this version, so use at your own risk.

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
- Creating a vehicle just adds a normal character sheet; the vehicle sheet has not been implemented yet.
- Adding a turn for a super-speed character to an in-progress combat will throw an error if Monk's Little Details is activated.  Doesn't seem to cause any actual problems though.

## To Do, Short Term
- Enable link from an attack item to an ability with charges, to auto-decrement charges on attack
- Implement vehicles

## To Do... Maybe?
- Token HUD conditions to be replaced or supplemented by MP-sepcific ones
- Re-skinning/re-styling to look less like the generic Foundry character sheet?
- Replace or supplement default token status effect with Mighty-Protectors-Specific ones?
- More automation?  Potentially auto-apply damage on a hit when a target is selected; would require adding in some more intelligence around damage types, potential invulnerabilities, etc.

## Support
(Sigh) Well, since Discord seems to be the way to do things these days.... [Foundry Protectors Discord Server](https://discord.gg/VU98efBCuP)

## Contributing
Not currently in search of help with functional development, but would be interested in collaborating with someone with design skills and strong modern CSS knowledge on layout improvements.

The system is set up for multi-language support but is currently only in English; multi-lingual folks willing to translate lists of keywords are also welcome.

The project is free and open source, but if you'd like to contribute financially, feel free to make purchases through the [DriveThruRPG](https://www.drivethrurpg.com/?affiliate_id=1692486) affiliate links above or this [Amazon link](https://amzn.to/3kGDqgc).


## Change Log


### [0.7.0] - 2022-03-07

- GM might prefer to hide the relative strength of NPCs from players, so separated "Show roll with" option into separate ones for characters and NPCs; NPC one has option to show only to GM
- Added display on character sheet to differentiate between NPC & Char actors
- Added inventing point bonus to ability sheet (for the "Inventing" power)
- Clicking "Healing" now pops up a dialog for healing over time as laid out in section 4.13 of the rules
- Did a lot of prep work for implementing vehicle sheets, including entering in the Big Giant Table of vehicle properties (rules p. 78)
- Still haven't settled on how to implement vehicles, though - thinking of just a slight modification to the regular character sheet with a "vehicle systems" section in place of abilities but working more or less the same way


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

