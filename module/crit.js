import {rollMinMax} from './utility.js'

export async function RollForCritFumble(rollType, owner, targetName, targetNum) {
    const messageTemplate = "systems/mighty-protectors/templates/chatcards/iscritfumble.hbs";
    const showTarget = game.settings.get(game.system.id, "showAttackTargetNumbers");
    let rollFormula = "1d20";

    let roll = await new Roll(rollFormula).evaluate({ async: true });

    let rollData = {
        formula: rollFormula,
        total: roll.total,
        rolltype: rollType,
        rollmessage: (rollType === 'crit') ? game.i18n.localize("MP.RollingForCrit") : game.i18n.localize("MP.RollingForFumble"),
        showtarget: showTarget
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