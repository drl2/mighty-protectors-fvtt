export default class MPCombat extends Combat { 

    /**
     * Reset all initiatives at top of new round
     */
    async nextRound() {
        super.nextRound();

        this.resetAll();
    }


}