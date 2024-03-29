export default class MPCombatTracker extends CombatTracker {
    get template() {
        return `systems/mighty-protectors/templates/system/combat-tracker.hbs`;
    }


    activateListeners(html) {
        super.activateListeners(html);

        html.find('.add-initiative').click(this._onAddInitiative.bind(this));
    }


    async getData(options) {
        const data = await super.getData(options);

        if (!data.hasCombat) {
            return data;
        }

        for (let [i, combatant] of data.combat.turns.entries()) {
            data.turns[i].hasMulti = combatant.getFlag("mighty-protectors","hasMulti");
        }
        return data;
    }


    /**
     * Add another entry in the combat for a character capable of multiple initiatives (i.e. Super Speed)
     * @param {string} event 
     */
    async _onAddInitiative(event) {
        const btn = event.currentTarget;
        const li = btn.closest(".combatant");
        const c = this.viewed.combatants.get(li.dataset.combatantId);
        const toCreate = [];

        toCreate.push({tokenId: c.tokenId, hidden: false});
        
        const newCombatant = await this.viewed.createEmbeddedDocuments("Combatant", toCreate)[0];
    }
}