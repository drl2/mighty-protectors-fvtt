import * as Crit from './crit.js';

export function addChatListeners(html) {
    html.on('click', 'button.rollforcritfumble', onRollForCrit);
}

function onRollForCrit(event) {
    const card = event.currentTarget.closest(".critroller");
    const owner = game.actors.get(card.dataset.ownerId);
    const targetName = card.dataset.targetName;
    const targetNum = card.dataset.targetNum;
    const rollType = card.dataset.rollType;
    Crit.RollForCritFumble(rollType, owner, targetName, targetNum);
}


export const hideCritFumble = function (app, html, data) {
    const chatCard = html.find(".critroller");

    if (chatCard.length > 0) {
        let actor = game.actors.get(chatCard.attr("data-owner-id"));

        if ((actor && !actor.isOwner)) {
            const buttons = chatCard.find(".rollforcritfumble");
            buttons.each((i, btn) => {
                btn.style.display = "none";
            });
        }

    }
    
    return chatCard;
}