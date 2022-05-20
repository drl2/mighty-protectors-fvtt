import {rollMinMax} from './utility.js'

export async function RollForCritFumble(data) {
    const messageTemplate = "systems/mighty-protectors/templates/chatcards/iscritfumble.hbs";
    const showTarget = game.settings.get(game.system.id, "showAttackTargetNumbers");
    const rollFormula = "1d20";
    let success = false;
    let showButton = true;

    let roll = await new Roll(rollFormula).evaluate({ async: true });
    const total = roll.total;

    if (data.targetName && data.targetNum) {
        if (data.rollType === "crit") {
            success = roll.total <= data.targetNum;
        }
        else {
            success = roll.total > data.targetNum;
        }
        showButton = success;
    }

    let rollData = {
        formula: rollFormula,
        total: total,
        rolltype: data.rollType,
        rollmessage: (data.rollType === 'crit') ? game.i18n.localize("MP.RollingForCrit") : game.i18n.localize("MP.RollingForFumble"),
        showsuccess: data.showSuccess && success,
        success: success,
        showbutton: showButton,
        isCrit: (data.rollType === 'crit'),
        owner: data.owner.id
    };

    let cardContent = await renderTemplate(messageTemplate, rollData);

    let messageData = {
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        roll: roll,
        speaker: ChatMessage.getSpeaker(),
        content: cardContent
    }

    ChatMessage.create(messageData);
}

export async function RollCritFumbleType(data) {
    const tableName = (data.rollType === "crit") ? "Critical Success" : "Critical Failure";
    const table = game.tables.getName(tableName);

    if (table) {
        table.draw();
    }
    else {
        // just roll a d20
        const roll = new Roll("1d20");
        await roll.toMessage({
            speaker: ChatMessage.getSpeaker(),
            flavor: ((data.rollType === "crit") ?  game.i18n.localize("MP.RollsCritSuccess") : game.i18n.localize("MP.RollsCritFailure")) + ":"
        });
    }
}

