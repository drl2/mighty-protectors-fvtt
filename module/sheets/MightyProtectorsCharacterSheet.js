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

                let roll = await new Roll(dataset.roll).evaluate({async:true});

                let rollData = {
                    formula: roll._formula,
                    total: roll.total,
                    target: modTarget,
                    success: roll.total <= modTarget,
                    // only one roll on a save so no need to for-each through rolls
                    dieFormula: roll.dice[0].formula,
                    dieRoll: roll.dice[0].total
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

    async _onItemCreate(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemName = '';

        switch(element.dataset.type) {
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
            type: element.dataset.type
        }];

        return Item.create(itemData, {parent: this.actor});
    }

    async _onItemEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);

        item.sheet.render(true);
    }

    async _onItemDelete(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        return item.delete();
    }


    _onItemInfo(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let cardContent = '';

        switch(element.dataset.type) {
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
    

    

    _onItemChat(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let cardContent = '';

        switch(element.dataset.type) {
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


    async _onItemUseCharge(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let itemData = item.data;

        let used = itemData.data.chargesused;
        if (used > 0) { used = used -1; }
        itemData.data.chargesused = used;
        return item.update({'data.chargesused': used});
    }

    async _onItemResetCharges(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let itemData = item.data;
        return item.update({'data.chargesused': itemData.data.charges});
    }

    async _onRollAttack(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let itemData = item.data;
        const actor = this.actor;
        let target = null;
        let targetName = "";

        // get target info if selected
        if (game.user.targets.size > 0) {
            target = Array.from(game.user.targets)[0];
            targetName = target.name;
        }

        let dlgData = {
            hasTarget: target != null,
            targetName: targetName
        }

        console.log(target.actor.data.data);

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
            let modTarget = Number.parseInt(itemData.data.tohit);
            let mod = html.find('[name="mod"]')[0].value.trim();
            let push = html.find('[name="mod"]')[0].value;
            let dmgFormula = itemData.data.dmgroll;

            if (mod != "") {
                modTarget += Number.parseInt(mod);
            }

            if (push) {
                dmgFormula += " + 2";
            }

            let attackRoll = await new Roll("1d20").evaluate({async:true});
            attackRoll.dice[0].options.rollOrder = 1;

            let dmgRoll = await new Roll(dmgFormula).evaluate({async:true});
            dmgRoll.dice[0].options.rollOrder = 2;

            const rolls = [attackRoll, dmgRoll];
            const pool = PoolTerm.fromRolls(rolls);
            let roll = Roll.fromTerms([pool]);
            
            let rollData = {
                attackFormula: attackRoll._formula,
                attackTtotal: attackRoll.total,
                target: modTarget,
                success: attackRoll.total <= modTarget,
                dieFormula: attackRoll.dice[0].formula,
                dieRoll: attackRoll.dice[0].total
            };

            let cardContent = await renderTemplate("systems/mighty-protectors/templates/chatcards/attackroll.hbs", rollData);

            let chatOptions = {
                type: CONST.CHAT_MESSAGE_TYPES.ROLL,
                roll: roll,
                content: cardContent,
                speaker: ChatMessage.getSpeaker({ actor: actor })
            }

            ChatMessage.create(chatOptions);
            
        }

    }
}

