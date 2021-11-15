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

    prepareDerivedData() {
        super.prepareDerivedData();

        if (this.data.type === 'movement') this._prepareDerivedMovementData();
        if (this.data.type === 'attack') this._prepareDerivedAttackData();
    }


    async _prepareDerivedMovementData() {
        const itemData = this.data;
        const actorData = this.actor ? this.actor.data : null;

        // don't bother unless the move item is attached to a character, is set to constant rate type, and not set to manual entry
        if (itemData.data.moverateformula == "manual") {
            this.data.data.calcmoverate = this.data.data.moverate;
        }
        else if (actorData && (itemData.data.moveratetype === "constant")) {

            let rate = 0;

            if (itemData.data.moverateformula === "ground") {
                rate = (
                    (
                        (actorData.data.basecharacteristics.st.value + actorData.data.basecharacteristics.ag.value + actorData.data.basecharacteristics.en.value)
                        / 3
                    ) - .5
                );

                rate = Math.round(rate);
            }
            else if (itemData.data.moverateformula === "leaping") {
                if (actorData.data.weight > 0) {
                    rate = actorData.data.carry / actorData.data.weight;
                    rate = Math.round(rate * 100) / 100;
                }
            }

            this.data.data.calcmoverate = rate;
        }
    }

    _prepareDerivedAttackData() {
        const itemData = this.data.data;
        const actorData = this.actor ? this.actor.data : null;

        if (actorData) {

            // first get save for appropriate stat
            let toHit = 3;
            switch (itemData.attribute) {
                case "AG":
                    toHit += actorData.data.basecharacteristics.ag.save;
                    break;
                case "IN":
                    toHit += actorData.data.basecharacteristics.in.save;
                    break;
                case "CL":
                    toHit += actorData.data.basecharacteristics.cl.save;
                    break;
            }


            // then calc selected bonuses from abilities
            const items = actorData.items;
            const bonusids = itemData.bonusids;
            let totalbonus = 0;

            if (bonusids) {
                for (let i of items) {
                    if (i.type === 'ability' && i.data.data.tohitbonus && bonusids.includes(i.id)) {
                        totalbonus += i.data.data.tohitbonus
                    }
                }
            }

            toHit += totalbonus;
            itemData.tohit = toHit;
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