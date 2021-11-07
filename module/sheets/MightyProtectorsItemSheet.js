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

    activateListeners(html) {
        super.activateListeners(html);

        if (!this.options.editable) return;


        // Rollable abilities.
        html.find('.moveformula').click(this._onMoveFormula.bind(this));
    }


    async _onMoveFormula(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;
        const actordata = this.actor.data.data;
        
        let rate = 0;

        if (dataset.formulatype=="ground")
        {
            rate = (
                (
                    (actordata.basecharacteristics.st.value + actordata.basecharacteristics.ag.value + actordata.basecharacteristics.en.value)
                    / 3
                ) -.5
            );
            rate = Math.round(rate);
        }
        else if (dataset.formulatype=="leaping")
        {
            if (actordata.weight > 0){
                rate = actordata.carry / actordata.weight;
                rate = Math.round(rate*100)/100;
            }
        }

        return this.item.update({ 'data.moverate': rate });
    }

}
