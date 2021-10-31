import MPItem from "../mpitem.js";
import { MP } from "../config.js";

export default class MightyProtectorsCharacterSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/mighty-protectors/templates/sheets/MightyProtectorsCharacter-sheet.hbs",
            classes: ["mightyprotectors", "sheet", "character"],
            tabs: [{ navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "stats" }]
        });
    }

    getData(options) {
        const sheetData = super.getData(options);
        const actorData = this.actor.data.toObject(false);
        sheetData.actor = actorData;
        sheetData.data = actorData.data;

        this._prepareItems(sheetData);

        return sheetData;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (!this.options.editable) return;


        // Rollable abilities.
        html.find('.saveroll').click(this._onRollSave.bind(this));
        html.find('.item-create').click(this._onItemCreate.bind(this));
        html.find('.item-edit').click(this._onItemEdit.bind(this));
        html.find('.item-delete').click(this._onItemDelete.bind(this));
        html.find('.item-info').click(this._onItemInfo.bind(this));
        html.find('.item-chat').click(this._onItemChat.bind(this));
        html.find('.item-usecharge').click(this._onItemUseCharge.bind(this));
        html.find('.item-resetcharges').click(this._onItemResetCharges.bind(this));
        html.find('.attackroll').click(this._onRollAttack.bind(this));
    }


    _prepareItems(sheetData) {
        const abilities = [];
        const attacks = [];
        const protections = [];
        const movements = [];
        const backgrounds = [];

        // iterate through items & allocate to containers
        for (let i of sheetData.items) {
            i.img = i.img || DEFAULT_TOKEN;

            if (i.type === 'ability') {
                abilities.push(i);
            }

            if (i.type === 'attack') {
                attacks.push(i);
            }

            if (i.type === 'protection') {
                protections.push(i);
            }

            if (i.type === 'movement') {
                movements.push(i);
            }

            if (i.type === 'background') {
                backgrounds.push(i);
            }
        }

        sheetData.abilities = abilities;
        sheetData.attacks = attacks;
        sheetData.protections = protections;
        sheetData.movements = movements;
        sheetData.backgrounds = backgrounds;


    }

    /**
     * Roll a saving throw
     * @param {*} event 
     */
    async _onRollSave(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;
        const actor = this.actor;

        if (dataset.roll) {
            let dlgContent = await renderTemplate("systems/mighty-protectors/templates/dialogs/modifiers.hbs", dataset);

            let dlg = new Dialog({
                title: game.i18n.localize("MP.SavingThrow") + ": " + dataset.stat,
                content: dlgContent,
                buttons: {
                    rollSave: {
                        icon: "<i class='fas fa-dice-d20'></i>",
                        label: game.i18n.localize("MP.Roll"),
                        callback: (html) => saveRollCallback(html)
                    },
                    cancel: {
                        icon: "<i class='fas fa-times'></i>",
                        label: game.i18n.localize("MP.Cancel")
                    }
                },
                default: "rollSave"
            })

            dlg.render(true);


            async function saveRollCallback(html) {
                let modTarget = Number.parseInt(dataset.target);
                let mod = html.find('[name="mod"]')[0].value.trim();

                if (mod != "") {
                    modTarget += Number.parseInt(mod);
                }

                let roll = await new Roll(dataset.roll).evaluate({ async: true });

                let rollData = {
                    formula: roll._formula,
                    total: roll.total,
                    target: modTarget,
                    success: roll.total <= modTarget,
                    // only one roll on a save so no need to for-each through rolls
                    dieFormula: roll.dice[0].formula,
                    dieRoll: roll.dice[0].total,
                    rollMinMax: rollMinMax(roll.dice[0].total)
                };

                let cardContent = await renderTemplate("systems/mighty-protectors/templates/chatcards/savingthrow.hbs", rollData);

                let chatOptions = {
                    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                    roll: roll,
                    content: cardContent,
                    speaker: ChatMessage.getSpeaker({ actor: actor })
                }

                ChatMessage.create(chatOptions);
            }
        };
    }

    /**
     * Add an item directly to a character sheet
     * @param {*} event 
     * @returns 
     */
    async _onItemCreate(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemName = '';

        switch (element.dataset.type) {
            case 'ability':
                itemName = game.i18n.localize("MP.NewAbility");
                break;
            case 'attack':
                itemName = game.i18n.localize("MP.NewAttack");
                break;
            case 'movement':
                itemName = game.i18n.localize("MP.NewMovement");
                break;
            case 'protection':
                itemName = game.i18n.localize("MP.NewProtection");
                break;
            case 'background':
                itemName = game.i18n.localize("MP.NewBackground");
                break;
            default:
                console.log('Add item with no item type defined')
                break;
        }

        let itemData = [{
            name: itemName,
            type: element.dataset.type,
            img: MP.ItemTypeImages[element.dataset.type]
        }];

        // let newItem = 
        // const img = MP.ItemTypeImages[itemdata.type];
        // if (img) await newItem.data.update({ img });

        return await MPItem.create(itemData, { parent: this.actor });
    }

    /**
     * Open item edit form from the character sheet
     * @param {*} event 
     */
    async _onItemEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);

        item.sheet.render(true);
    }

    /**
     * Delete an item from the character sheet
     * @param {*} event 
     * @returns 
     */
    async _onItemDelete(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        return item.delete();
    }


    /**
     * Show "rules" value of an item in the chat.  Currently only useful for Ability type
     * @param {*} event 
     */
    _onItemInfo(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let cardContent = '';

        switch (element.dataset.type) {
            case 'ability':
                cardContent = item.data.data.rules;
                break;
            default:
                cardContent = "";
                break;
        }

        let chatOptions = {
            content: cardContent,
            speaker: ChatMessage.getSpeaker({ actor: this.actor })
        }

        ChatMessage.create(chatOptions);
    }



    /**
     * Post the item description to chat
     * @param {*} event 
     */
    _onItemChat(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let cardContent = '';

        switch (element.dataset.type) {
            case 'ability':
                cardContent = "<h3>" + item.name + "</h3><div>" + item.data.data.description + "</div>";
                break;
            default:
                cardContent = "";
                break;
        }

        let chatOptions = {
            content: cardContent,
            speaker: ChatMessage.getSpeaker({ actor: this.actor })
        }

        ChatMessage.create(chatOptions);
    }


    /**
     * Decrement the remaining charges on an ability that uses charges
     * @param {*} event 
     * @returns 
     */
    async _onItemUseCharge(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let itemData = item.data;

        let used = itemData.data.chargesused;
        if (used > 0) { used = used - 1; }
        itemData.data.chargesused = used;
        return item.update({ 'data.chargesused': used });
    }

    /**
     * Reset charges on an item to full.  Reload!
     * @param {*} event 
     * @returns 
     */
    async _onItemResetCharges(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let itemData = item.data;
        return item.update({ 'data.chargesused': itemData.data.charges });
    }

    /**
     * Roll an attack roll and its damage.  If a target is selected, use its stats to calculate hit or miss; if not, don't
     * ask for modifiers or try to determine success; just roll d20.
     * @param {*} event 
     */
    async _onRollAttack(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        const actor = this.actor;
        let item = actor.items.get(itemId);
        let itemData = item.data;
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
                attackName: item.name,
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



    /**
     * Task checks in MP are all d20 based with lower = better.  Switch around the normal min/max where possible
     * @param {*} dieRoll 
     */
    function rollMinMax(dieRoll) {
        let result = "";
        if (dieRoll == 20) result = "min";
        if (dieRoll == 1) result = "max";
        return result;
    }
