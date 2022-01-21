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
            options = {};
        }
        setProperty(options, "updateTurn", false);
        await super.rollInitiative(ids, options);
    }
}