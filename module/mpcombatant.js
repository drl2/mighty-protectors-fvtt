export default class MPCombatant extends Combatant { 


    
    _onCreate(data, options, userId) {
        super._onCreate(data, options, userId);
        let multiInit = false;

         if (data.actorId) {
             const actor = game.actors.find(x => x.id == data.actorId);
             multiInit = actor.data.data.multiinit;
         }

         this.setFlag("mighty-protectors", "hasMulti", multiInit);   
    }



    /**
     * Override the default Initiative formula based on calculated initiative roll
     * Add AG score as a decimal for tiebreaker 
     * Also need to check for super-speed characters with multiple rolls to add previous high roll to current result
     */ 
    _getInitiativeFormula = function() {
        const actor = this.actor;
        let previousInit = null;

        if ( !actor ) return "1d4";

        // if character can have multiple initiatives, need to check if some have already been rolled and add them to the result
        if (actor.data.data.multiinit) { previousInit = this.getPreviousInit(this.token.id); }

        const actorData = actor.data.data;

        let init = actorData.initiative;
        if (previousInit) { init += ' + ' + previousInit}
        init += ' + ' + (actorData.basecharacteristics.ag.value/100);

        return init;
    };

    /**
     * Check for other initiative rolls for this token; if they exist, return the highest so far
     * @param {string} tokenId 
     */
    getPreviousInit(tokenId)
    {
        const combat = this.parent;
        let highest = null;

        const entries = combat.combatants.filter(entry => (entry.data.tokenId == tokenId) && entry.data.initiative && entry.id != this.id);

        if (entries.length) {
            highest = Math.max.apply(Math, entries.map(function(entry) { return entry.data.initiative; }))
        }
        
        return Math.floor(highest);
    }

}