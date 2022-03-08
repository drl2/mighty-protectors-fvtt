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

        switch(this.actor.type) {
            case "npc":
                sheetData.typeAbbr = game.i18n.localize("ACTOR.TypeNpc");
                break;
            case "vehicle":
                sheetData.typeAbbr = game.i18n.localize("ACTOR.TypeVehicle");
                break;
            default:
                sheetData.typeAbbr = game.i18n.localize("ACTOR.TypeCharacter");
        }

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
        html.find('.initroll').click(this._onRollInitiative.bind(this));
        html.find('.genericroll').click(this._onRollGeneric.bind(this));
        html.find('.timed-rest').click(this._onRest.bind(this));
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

        await this.actor.rollSave(dataset);
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
                cardContent = "<h3>" + item.name + "</h3><div>" + item.data.data.rules + "</div>";
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
        let itemId = event.currentTarget.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);

        item.rollAttack();
    }

    async _onRollInitiative(event) {
        event.preventDefault();

        return await this.actor.rollInitiative({ createCombatants: true });
    }

    async _onRollGeneric(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        await this.actor.rollGeneric(dataset);
    }

    async _onRest(event) {
        event.preventDefault();

        let data = {
            config: MP
        }

        let dlgContent = await renderTemplate("systems/mighty-protectors/templates/dialogs/rest.hbs", data);

        let dlg = new Dialog({
            title: game.i18n.localize("MP.Rest"),
            content: dlgContent,
            buttons: {
                recoverAll: {
                    icon: "<i class='fas fa-first-aid'></i>",
                    label: game.i18n.localize("MP.RecoverAll"),
                    callback: (html) => rollRecoverCallback(html, this.actor)
                },
                timedRest: {
                    icon: "<i class='fas fa-bed'></i>",
                    label: game.i18n.localize("MP.TimedRest"),
                    callback: (html) => timedRestCallback(html, this.actor)
                },
                cancel: {
                    icon: "<i class='fas fa-times'></i>",
                    label: game.i18n.localize("MP.Cancel")
                }
            },
            default: "recoverAll"
        })
        dlg.render(true);

        async function rollRecoverCallback(html, actor) {
            return await actor.recoverAll();            
        }

        async function timedRestCallback(html, actor) {
            let healtime = html.find('[name="healtime"]')[0].value.trim();
            let timeframe = html.find('[name="timeframe"]')[0].value.trim();
            return await actor.timedRecovery(timeframe, healtime)
        }

    }
}


