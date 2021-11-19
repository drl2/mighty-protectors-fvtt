# Item Creation Examples

In this document we'll set up a number of powers that can be assigned to characters as covered in the [Character Creation Example](character-example.md).

## Item Types
There are five different types of items that might be used in conjunction with a character sheet.

### Abilities
These are the the abilities and powers described under section 2.2.3 of the rule book, "Ability Descriptions".  Abilities have a number of associated details which can impact the stats of characters having that ability in various ways.

Abilities also encompass Disadvantages - simply create an Ability and assign it a negative points cost.

### Attacks
An attack is a rollable item featuring a calculated To Hit target number and manually defined damage information.  Most attacks are based on Abilities but not directly linked to them.  Attacks can also be drag-and-dropped onto the macro hotbar to create quick access icons there.

### Protection
Protection represents defenses against specific damage types, as provided for instance by armor or force fields.

### Movement
A movement item, as the name suggests, defines any means of locomotion a character possesses.  Most characters will have Ground and Leaping movement rates, which can be auto-calculated if desired.

### Backgrounds
A Background item represents a career background item as described in section 2.1.10 of the rules.

## Adding a New Item
Items can be added directly to a character sheet by clicking the __+Add__ button on the appropriate section of the sheet.  An item called "New (Item type)" will appear in the list below the add button and can then be customized by clicking the edit button next to that item.
 

![Adding abilities from the character sheet](/doc-images/Add_ability_to_character.webp)

![Adding backgrounds to a character](/doc-images/add_background.webp)


Items created this way will only be visible from the sheet they were created from unless they're drag-and-dropped over to the Items Directory tab. 

The second method of adding items is to navigate to the Items Directory tab in the main Foundry interface and click "Create Item".  You'll be prompted for the name and type of the new item.

![Item creation fromt toolbar](/doc-images/create-item.webp)

Items created in this fashion can be drag-and-dropped onto character sheets and customized further there.


## Options - Item Settings, Rules, and Compendiums

Within Foundry there are a number of ways to handle items (abilities, attacks, etc. within this system).  

A GM can choose to create individual items attached to each character, with settings specific to that character set in the item options.  This is a typical scenario when setting up a one-shot or a short series of adventures.

Alternatively, typically for a long-term campaign, the GM can create more generic items under the Items Directory tab to build up a library of pre-defined powers, etc. to draw from each time a new character is created.  This way, each power only needs to be created once, than dragged onto a character sheet when needed, to create a new copy of the ability where its specific details relative to that character (point allocations, modifiers, etc) can be edited.  This approach lends also lends itself to creation of compendiums which through methods like [this](https://www.reddit.com/r/FoundryVTT/comments/fvw3c7/how_to_create_a_tiny_module_for_shared_content/) or [this](https://foundryvtt.com/packages/My-Shared-Compendia) can be migrated across multiple campaign worlds.

Abilities in particular include a "Rules" tab intended for pasting in full power descriptions from the rule book, or entering summarries of them.  This way the full details of how a power works can be a mouse-click away if a question arises during gameplay.

For these examples I'll be using something of a mix of the two approaches.  Abilities and Backgrounds will be defined in a generic way under the Items Directory for re-usability.  Protection and Attack entries tend to be character-specific enough that there's not much benefit to making them generic.  This is true of Movement items as well except for the Ground and Leaping movement rates common to most characters; so generic versions of those two will be added, but others will be left to individual character stats.

## Ability Examples
The first Ability I'll create is Heightened Agility.

![Heightened Agility](/doc-images/heightened-ag.webp)

On the ability sheet that opens up, the first tab we see is Description.  Because this is going to be a generic copy of this power, I'll leave the CP and IP costs at zero, to be edited for each individual character who possesses the abilty.  Likewise with the Description field, where I'll put character-specific info such as modifiers and specific breakdowns of point allocations.

I'll leave the Details tab alone for now as well; this ability does confer an AG bonus which would be defined here, but since it's based on the CP or IP allocation, I won't add it to the generic copy.

For the Rules tab, I'm going to open up my PDF copy of the game's manual and use the PDF reader software on my PC to find and copy the description for the Heightened Agility ability.  I'll paste it into the Rules section and do my best to clean up the formatting.  (Pasted text from a PDF can translate badly, but it's the best option available right now.)

![Heightened AG Rules](/doc-images/heightened-ag-rules.webp)

![Heightened AG Rules Pasted](/doc-images/heightened-ag-rules-pasted.webp)

I'll do the same with the powers Special Weapon (though all those tables don't copy well at all into the Rules tab and I promise myself I'll definitely go back in and edit them manually later...), Heightened Expertise, and Super Speed.

For Super Speed in particular, its base function is to give its possessor extra inititative entries.  In this case, I can go to the details tab in the generic version and enable "Multi Init", because this power will always confer that property.  This is something of an exception to the rule that most items on the detail tab are usually entered at the character level.

## Movement Examples
Next I'll create generic movement items for Ground and Leaping.  THe default movement rate type is "Constant", meaning the character can move a fixed number of inches per round.  For constant movement rate types, "Calc from Formula" provides offers a choice of Ground or Leaping formulae or manual entry.

Notice that the actual movement rates have not been calculated yet in my examples, because the formulae are based on character stats and the item hasn't been assigned to a character yet.

If I were creating a movement type such as flight, which has acceleration and top speed values instead of a fixed rate, I would choose a "Acceleration/Max" as the move rate type, and once assigned to a character I would enter the appropriate values specific to that character.

![Movement Examples](/doc-images/movement-examples.webp)

## Other Items
Bakcground is fairly straightforward as its only property is its name.  Attacks and Protection are character-centric enough to be covered in more detail in the [Character Creation Example](character-example.md).