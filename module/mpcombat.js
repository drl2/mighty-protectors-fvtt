export default class MPCombat extends Combat { 

    /**
     * Reset all initiatives at top of new round
     */
    async nextRound() {
        super.nextRound();

        this.resetAll();
    }

    async rollInitiative(ids, options) {
        if (!options) {
            options = {updateTurn: false};
        }
        
        await super.rollInitiative(ids, options);
        return this.update({ turn: 0 });
    }

    setupTurns() {
        const turns = this.combatants.contents.sort(this._sortCombatants);

        this.current = {
          round: this.round,
          turn: 0,
        };
    
        return this.turns = turns;
      }

}