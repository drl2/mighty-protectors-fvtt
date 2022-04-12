import MPItem from '../mpitem.js';

export default class MightyProtectorsItemSheet extends ItemSheet {
    constructor(...args) {
        super(...args);

        // expand default size for attack item type
        if (this.object.data.type === 'attack') {
            this.options.width = this.position.width = 600;
            this.options.height = this.position.height = 420;
        }
        else if (this.object.data.type === 'vehiclesystem') {
            this.options.height = this.position.height = 420;
        }
    }


    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            height: 350,
            classes: ["mightyprotectors", "sheet", "item"],
            tabs: [{ navSelector: ".sheet-navigation", contentSelector: ".sheet-body", initial: "description" }]
        })
    }

    get template() {
        return `systems/mighty-protectors/templates/sheets/${this.item.data.type}-sheet.hbs`;
    }

    getData(options) {
        const baseData = super.getData();
        const isOwned = (baseData.item.actor !== null)
        let sheetData = {
            owner: this.item.isOwner,
            editable: this.isEditable,
            item: baseData.item,
            data: baseData.item.data.data,
            isowned: isOwned,
            config: CONFIG.MP
        }
        sheetData.itemType = game.i18n.localize(`ITEM.Type${sheetData.item.data.type.titleCase()}`)


        if (isOwned) {
            this._prepareItems(sheetData, baseData.item.actor.items);
        }
        return sheetData;
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('.apply-bonus').click(this._onApplyBonus.bind(this));
        html.find('.remove-bonus').click(this._onRemoveBonus.bind(this));
    }


    _prepareItems(sheetData, items) {
        const appliedabilities = [];
        const availabilities = [];
        const chargesources = []
        const bonusids = sheetData.item.data.data.bonusids;

        // iterate through items & allocate to containers
        for (let i of items) {
            if (i.type === 'ability' && i.data.data.tohitbonus) {
                if (bonusids && bonusids.includes(i.id)) {
                    appliedabilities.push(
                        {
                            id: i.id,
                            name: i.name,
                            bonus: i.data.data.tohitbonus
                        }
                    );
                }
                else {
                    availabilities.push(
                        {
                            id: i.id,
                            name: i.name,
                            bonus: i.data.data.tohitbonus
                        }
                    );
                }
            }


            if (i.type === 'ability' && i.data.data.usescharges) {
                chargesources.push(
                    {
                        id: i.id,
                        name: i.name
                    }
                );
            }
        }

        sheetData.availabilities = availabilities;
        sheetData.appliedabilities = appliedabilities;
        sheetData.chargesources = chargesources;
    }


    async _onApplyBonus(event) {
        const element = event.currentTarget;
        const dataset = element.dataset;
        const actor = this.item.actor;
        const abilityItem = actor.items.find(i => i.id === dataset.itemid);
        const itemData = abilityItem.data.data;
        let bonusids = this.item.data.data.bonusids;


        
        if (!bonusids.includes(dataset.itemid)) {
            bonusids.push(dataset.itemid)

            await this.item.update({ 'data.bonusids': bonusids });
            this.item._prepareDerivedAttackData();
        }

        return;
    }

    async _onRemoveBonus(event) {
        const element = event.currentTarget;
        const dataset = element.dataset;
        const actor = this.item.actor;
        const abilityItem = actor.items.find(i => i.id === dataset.itemid);
        const itemData = abilityItem.data.data;
        let bonusids = this.item.data.data.bonusids;

        
        if (bonusids.includes(dataset.itemid)) {
            bonusids = bonusids.filter(function (value, index, arr) {
                return value != dataset.itemid;
            });


            await this.item.update({ 'data.bonusids': bonusids });
            this.item._prepareDerivedAttackData();
        }
        return;
    }
}
