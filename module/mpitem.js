import { MP } from './config.js';
import { rollMinMax } from './utility.js';

/**
 * Override and extend the basic Item implementation.
 * @extends {Item}
 */
export default class MPItem extends Item {

    chatTemplate = {
        "attack": "systems/mighty-protectors/templates/chatcards/attackroll.hbs"
    }

    dlgTemplate = {
        "attack": "systems/mighty-protectors/templates/dialogs/attackmods.hbs"
    }


    /**
     * Extends Item._preCreate to add default images by item type
     * @param {*} data 
     * @param {*} options 
     * @param {*} userId 
     */
    async _preCreate(data, options, userId) {
        await super._preCreate(data, options, userId);

        // assign a default image based on item type
        if (!data.img) {
            const img = MP.ItemTypeImages[data.type];
            if (img) await this.data.update({ img });
        }
    }


    async roll() {
        const actor = this.actor;
        let itemData = this.data;
        let target = null;
        let targetName = "";
        let defense = 0;


        // get target info if selected
        if (game.user.targets.size > 0) {
            target = Array.from(game.user.targets)[0];
            targetName = target.name;
            if (itemData.data.dmgtype == "Psychic") {
                defense = target.data.data.mentaldefense;
            }
            else {
                defense = target.actor.data.data.physicaldefense;
            }
        }

        let dlgData = {
            targetName: targetName
        }



        let dlgContent = await renderTemplate("systems/mighty-protectors/templates/dialogs/attackmods.hbs", dlgData);

        let dlg = new Dialog({
            title: game.i18n.localize("ITEM.TypeAttack") + ": " + itemData.name,
            content: dlgContent,
            buttons: {
                rollAttack: {
                    icon: "<i class='fas fa-dice-d20'></i>",
                    label: game.i18n.localize("MP.Roll"),
                    callback: (html) => rollAttackCallback(html)
                },
                cancel: {
                    icon: "<i class='fas fa-times'></i>",
                    label: game.i18n.localize("MP.Cancel")
                }
            },
            default: "rollAttack"
        })

        dlg.render(true);


        async function rollAttackCallback(html) {
            let modToHit = Number.parseInt(itemData.data.tohit);
            let mod = "";
            let push = html.find('[name="push"]')[0].value;
            let spendPower = html.find('[name="autodeduct"]')[0].value;
            let dmgFormula = itemData.data.dmgroll;
            let powerCost = itemData.data.powercost;

            if (targetName) {
                mod = html.find('[name="mod"]')[0].value.trim();
            }

            if (mod != "") {
                modToHit += (Number.parseInt(mod) - defense);
            }

            if (push) {
                dmgFormula += " + 2";
                powerCost += 2;
            }

            let attackRoll = await new Roll("1d20").evaluate({ async: true });
            attackRoll.dice[0].options.rollOrder = 1;

            let dmgRoll = await new Roll(dmgFormula).evaluate({ async: true });
            dmgRoll.dice[0].options.rollOrder = 2;

            const rolls = [attackRoll, dmgRoll];
            const pool = PoolTerm.fromRolls(rolls);
            let roll = Roll.fromTerms([pool]);

            let success = attackRoll.total <= modToHit;

            let rollData = {
                actorName: actor.name,
                attackName: itemData.name,
                dmgType: itemData.data.dmgtype,
                dmgSubtype: itemData.data.dmgsubtype,
                knockBack: itemData.data.knockback,
                targetName: targetName,
                success: success,
                attackRoll: attackRoll,
                rollMinMax: rollMinMax(attackRoll.dice[0].total),
                dmgRoll: dmgRoll
            };

            let cardContent = await renderTemplate("systems/mighty-protectors/templates/chatcards/attackroll.hbs", rollData);

            let chatOptions = {
                type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                roll: roll,
                content: cardContent,
                speaker: ChatMessage.getSpeaker({ actor: actor })
            }

            ChatMessage.create(chatOptions);

            if (spendPower) {
                actor.data.data.power.value -= powerCost;
            }

        }
    }
}