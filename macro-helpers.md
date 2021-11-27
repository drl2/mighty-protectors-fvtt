# Macro Helper Functions

Several functions have been added to the system to simplify adding common rolls to the hotbar.  All rolls generated are based on the currently selected actor and will fail if no actor is selected.

![Macro Examples](/doc-images/macro-examples.webp)

## rollItemMacro
Rolls the attack associated with an attack item.  Just supply the item name; if more than one attack item has the same name, it will roll the first matching one it encounters.

When an attack item is dragged from a character sheet and dropped onto a hotbar slot, this macro is created for it automatically.

Example:

`game.mp.rollItemMacro("Pointy Stick");`


## rollSaveMacro
Rolls the save for a specific base characteristic (or a Luck roll which functions the same way).  Recognizes full names or 2-letter abbreviations for base characteristics.

Examples:

`game.mp.rollSaveMacro("EN");`

`game.mp.rollSaveMacro("Luck");`

`game.mp.rollSaveMacro("Agility");`


## RollOtherMacro
A miscellaneous catch-all for other common types of rolls.  (Note that luck has been included here as well, since it's not really a save.  Calling Luck from this function )

Examples:

`game.mp.rollOtherMacro("Luck");`

`game.mp.rollOtherMacro("Mass");`

`game.mp.rollOtherMacro("Wealth");`

`game.mp.rollOtherMacro("HtH");`