import MPItem from '../mpitem.js';

export default class MightyProtectorsItemSheet extends ItemSheet {

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
        let sheetData = {
            owner: this.item.isOwner,
            editable: this.isEditable,
            item: baseData.item,
            data: baseData.item.data.data,
            isowned: (baseData.item.actor !== null),
            config: CONFIG.MP
        }
        sheetData.itemType = game.i18n.localize(`ITEM.Type${sheetData.item.data.type.titleCase()}`)

        return sheetData;
    }




}
