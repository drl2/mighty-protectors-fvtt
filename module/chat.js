import * as Crit from './crit.js';

export function addChatListeners(html) {
    html.on('click', 'button.rollforcritfumble', onRollForCrit);
    html.on('click', 'button.rollforcritfumbletype', onRollCritFumbleType);
}

function onRollForCrit(event) {
    const card = event.currentTarget.closest(".critroller");
    const data = {
        owner: game.actors.get(card.dataset.ownerId),
        targetName: card.dataset.targetName,
        targetNum: card.dataset.targetNum,
        rollType: card.dataset.rollType,
        showSuccess: card.dataset.showSuccess,
        targetVehicle: card.dataset.targetVehicle
    };
    Crit.RollForCritFumble(data);
}


function onRollCritFumbleType(event) {
    const card = event.currentTarget.closest(".crittype");
    const data = {
        owner: game.actors.get(card.dataset.ownerId),
        rollType: card.dataset.rollType
    };
    Crit.RollCritFumbleType(data);
}



export const hideCritFumble = function (app, html, data) {
    let chatCard = html.find(".critshowhide");   

    if (chatCard.length > 0) {
        let actor = game.actors.get(chatCard.attr("data-owner-id"));

        if ((actor && !actor.isOwner)) {
            const buttons = chatCard.find(".critshowhidebutton");
            buttons.each((i, btn) => {
                btn.style.display = "none";
            });
        }
    }
    
    return chatCard;
}