import { MP } from "./config.js";
import MightyProtectorsItemSheet from "./sheets/MightyProtectorsItemSheet.js";
import MightyProtectorsCharacterSheet from "./sheets/MightyProtectorsCharacterSheet.js";

Hooks.once("init", function() {
    console.log("***** MP initializing   *********");

    CONFIG.MP = MP;

    game.settings.register("mighty-protectors", "dsnSettingInit", {
        name: "Flag for Dice So Nice settings init",
        scope: "world",
        config: false,
        type: Boolean,
        default: false
    });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("mighty-protectors", MightyProtectorsItemSheet, {makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("mighty-protectors", MightyProtectorsCharacterSheet, {makeDefault: true });
});

Hooks.once("ready", function() {
    if(!game.settings.get("mighty-protectors", "dsnSettingInit")){
        game.settings.set("dice-so-nice","enabledSimultaneousRollForMessage",false);
        game.settings.set("mighty-protectors", "dsnSettingInit",true);
    }
});
