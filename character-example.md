# Character Creation Example

In this document we'll create a sample character using some of the items defined in [Ability Examples](ability-example.md).

## A New Hero Arises

From the Actors tab in Foundry we'll click "Create Actor".  The powers we're going to give him are useful as examples but don't make a whole lot of sense together, so we're going to call him Mister Mismatch.  

The available actor types are Character, NPC, and Vehicle.  The only difference between Character and NPC is that tokens associated with the Character type default to being marked as Friendly and have the "Link to Actor" option enabled.  Vehicle is currently a placeholder for a vehicle sheet to be implemented later.  For this eaxmple, we'll choose "Character".

![Create Character](/doc-images/create-character.webp)

The "Stats" tab is where you'll spend most of your time, but let's take a look a the other tabs first.

"Bio" covers mostly non-statistical information about the character - origins, gender/sexuality, career backgrounds, etc.  The only item here that needs to be filled out for some stat calculations to function is Weight, but I'll make up a name and pull some random background bits from [MPGen](http://mpgen.drl2.com/), including adding two Backgrounds using the "+Add" button, then clicking the edit icon to rename each one.

![Character Bio Tab](/doc-images/character-bio-tab.webp)

"Story", as the name suggests, contains a text block for entering longer backstory information, notes, etc.

Heading back to the Stats tab, we'll make Mister Mismatch a 100-point hero and allocate points to his base characteristics as appropriate for that power level.  At this point we can see that a number of values, such as physical and mental defense, max hits and power, saving throws, and overall ability scores, have been calculated based on these stats.

![Base Characteristics](/doc-images/base-characteristics.webp)

## Adding Abilities

Now let's go to Foundry's items tab, grab each of the abilities created in [Ability Examples](ability-example.md), and drag them onto the character sheet.  They're now visible on the sheet, but need to be customized for our new character.  Before we do that, however, we'll click the "+Add" button over the Abilities section of the character sheet to create a new item, which we'll turn into a weakness to buy Mr. M some more points to play with.

![Character Weakness](/doc-images/character-weakness.webp)


Heightened Agility will be allocated 10 CPs, and we'll add the corresponding 10 points of AG under BC Adjustments on the Details tab.  These points are now reflected in the Score column of the stat list on the character sheet, and related stats have all been adjusted accordingly.

![Heightened Agility](/doc-images/char-htnd-ag.webp)


Ten points of Heightened Expertise will buy +3 to hit on one class of attacks, so let's say he's got some skill in unarmed combat.  I'll enter the CP cost and then on the Details tab enter 3 next to the "To Hit" entry.  We'll get to how and where to apply these bonuses shortly.

![Heightened Expertise](/doc-images/char-htnd-exp.webp)

Next we'll look at the Special Weapon rules and give him a 10 point melee weapon, which will buy us an additional d6 sharp kinetic damage (bringing the total to 2d6+1 with his base hand-to-hand) with +2 to hit; we'll add the Throwable modifier since it's free and makes sense.  Special weapons are gear by default, so we'll tick that checkbox on the details tab and also enter the To Hit bonus there.


![Special Weapon Description Tab](/doc-images/char-special-weap-desc.webp)

![Special Weapon Detail Tab](/doc-images/char-special-weap-detail.webp)

For Super Speed, we're going to try to achieve two extra turns per round instead of just one extra by turning it into gear and spending those 5 extra CP from the weakness we added.  We'll also add the "Charges to PR" modifier, which maps to 6 charges.

![Super Speed Description Tab](/doc-images/char-ss-desc.webp)

On the Details tab, "Multi Init" is already selected because the generic copy of the power was created that way.  We'll also check "Charges" and "Is Gear", and enter 6/6 next to Charges to indicate the current and maximum charge count.  Notice that a charge counter is now shown on the character sheet, along with buttons to use a charge or reset the count.

![Super Speed Detail Tab](/doc-images/char-ss-detail.webp)


Super Speed impacts combat inititative in a way that other powers don't, so it needs a little extra explanation.  When a combat is started, the GM will see a + sign next to a speedster's entry in the combat tracker.  Clicking this once for each extra turn the character gets (2 in this case) will add more turns for that character.  Each initiative roll for that character will be added to the previous roll, as specified in the ability description.

![Super Speed Combat Tracker](/doc-images/ss-combat-tracker.webp)

Clicking an ability name from the character sheet will post its basic description to chat.  Clicking the "i" info icon on the far right of the ability entry will post the contents of its "Rules" tab.

![Ability Descriptions](/doc-images/char-ability-desc.webp)

## Adding Attacks

Now we'll set up rollable attacks for Mr M's hand-to-hand and his pointy stick.  Clicking "+Add" under the attacks section gets us two new entries there, with the "To Hit" scores already calculated based on Agility and some default damage types and values supplied.  Taking note of Mr M's base hand-to-hand damage of d6+1 as already calculated on the character sheet, we'll edit the first attack item.  After renaming the attack and setting the damage formula, we can look at the list of available "to hit" bonuses (remember setting those up under "Abilities"?) and choose which ones are valid for this attack.  In this case the Heightened Expertise bonus is valid, so we'll click "Apply" next to it.  Note that the "To hit" value has been updated.

![Punch](/doc-images/punch.webp)

The second entry will be for the Pointy Stick.  As noted previously, damage will be set to 2d6+1 Sharp Kinetic, no knockback.  We'll also apply the to hit bonus from the Special Weapon - Pointy Stick ability.

Clicking the icon to the left of an attack entry on the character sheet will pop open a dialog box where additional "to hit" modifiers (based on range, defensive stances, etc) can be entered and the player can choose to push damage.  (Note that in future versions the GM will be able to toggle the Auto Power Deduct feature on or off via system settings).

![Attack Dialog](/doc-images/attack-mods.webp)

If no target is selected, clicking the "Roll" button will produce To Hit and Damage roll results like the following:

![Simple Attack Results](/doc-images/simple-attack.webp)

If a target is selected, however, that target's Mental Defense (for damage type "Psychic") for Physical Defense (for all other damage types) will be factored into the target roll number, and the output will indicate a hit or miss.

![Targeted Attack Results](/doc-images/targeted-attack.webp)


## Adding Protection

Mister Mismatch doesn't have any armor, but if he did it might look something like this:

![Protection](/doc-images/protection.webp)

## Adding Movement

A simple drag-and-drop of the two movement types we previously created will add them to the character sheet with values calculated.

![Movement](/doc-images/movement.webp)

## Finishing Up

Note that applicable abilty changes have altered the character's max hit points and power, but *not* the current values for those stats.  This is to prevent changes to the current values in instances where someone might make an adjustment or correction while a game is in progress.  Once the character sheet is ready to go, the player or GM should raise these current values to match the maximums.


