import { MP } from "./config.js";
import MightyProtectorsItemSheet from "./sheets/MightyProtectorsItemSheet.js";
import MightyProtectorsCharacterSheet from "./sheets/MightyProtectorsCharacterSheet.js";
import MPItem from './mpitem.js';
import MPActor from './mpactor.js';

Hooks.once("init", function() {
    console.log("***** MP initializing   *********");

    CONFIG.MP = MP;

    checkDsNSetting();
    registerSystemSettings();

    CONFIG.Item.documentClass = MPItem;
    CONFIG.Actor.documentClass = MPActor;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("mighty-protectors", MightyProtectorsItemSheet, {makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("mighty-protectors", MightyProtectorsCharacterSheet, {makeDefault: true });
});

Hooks.once("ready", function() {
    // one-time-only - set recommended setting for multi-rolling if Dice So Nice is in use
    if(!game.settings.get("mighty-protectors", "dsnSettingInit")){
        game.settings.set("dice-so-nice","enabledSimultaneousRollForMessage",false);
        game.settings.set("mighty-protectors", "dsnSettingInit",true);
    }
});


function checkDsNSetting() {
    game.settings.register("mighty-protectors", "dsnSettingInit", {
        name: "Flag for Dice So Nice settings init",
        scope: "world",
        config: false,
        type: Boolean,
        default: false
    });
}

function registerSystemSettings() {
    game.settings.register("mighty-protectors", "autoDecrementPowerOnAttack", {
        config: true,
        scope: "world",
        name: "SETTINGS.autoDecrementPowerOnAttack.name",
        hint: "SETTINGS.autoDecrementPowerOnAttack.label",
        type: String,
        choices: {
            "always": "MP.Always",
            "choose": "MP.Choose",
            "never": "MP.Never"
        },
        default: "choose"
    })

    game.settings.register("mighty-protectors", "checkPowerOnAttack", {
        config: true,
        scope: "world",
        name: "SETTINGS.checkPowerOnAttack.name",
        hint: "SETTINGS.checkPowerOnAttack.label",
        type: Boolean,
        default: true
    })

    game.settings.register("mighty-protectors", "checkChargesOnAttack", {
        config: true,
        scope: "world",
        name: "SETTINGS.checkChargesOnAttack.name",
        hint: "SETTINGS.checkChargesOnAttack.label",
        type: Boolean,
        default: true
    })

    game.settings.register("mighty-protectors", "checkChargesOnAttack", {
        config: true,
        scope: "world",
        name: "SETTINGS.checkChargesOnAttack.name",
        hint: "SETTINGS.checkChargesOnAttack.label",
        type: Boolean,
        default: true
    })

    game.settings.register("mighty-protectors", "showSaveTargetNumbers", {
        config: true,
        scope: "world",
        name: "SETTINGS.showSaveTargetNumbers.name",
        hint: "SETTINGS.showSaveTargetNumbers.label",
        type: Boolean,
        default: true
    })
    
    game.settings.register("mighty-protectors", "showAttackTargetNumbers", {
        config: true,
        scope: "world",
        name: "SETTINGS.showAttackTargetNumbers.name",
        hint: "SETTINGS.showAttackTargetNumbers.label",
        type: Boolean,
        default: true
    })

    game.settings.register("mighty-protectors", "showCanRollWith", {
        config: true,
        scope: "world",
        name: "SETTINGS.showCanRollWith.name",
        hint: "SETTINGS.showCanRollWith.label",
        type: Boolean,
        default: true
    })
}

Handlebars.registerHelper('ismoveconstant', function (value) {
    return value == "constant";
});

Handlebars.registerHelper('isformulamanual', function (value) {
    return value == "manual";
});