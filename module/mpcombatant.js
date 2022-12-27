export default class MPCombatant extends Combatant { 
    
    _onCreate(data, options, userId) {
        super._onCreate(data, options, userId);
        let multiInit = false;
        let actor = null;

         if (data.actorId) {
             actor = game.actors.find(x => x.id == data.actorId);
         }
         else if (data.tokenId) {
             let token = canvas.tokens.get(data.tokenId);
             actor = token.actor;
         }

         if (this.isOwner) {
            multiInit = actor.system.multiinit;
            this.setFlag("mighty-protectors", "hasMulti", multiInit);
         }   
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
        if (actor.system.multiinit) { previousInit = this.getPreviousInit(this.token.id); }

        const actorData = actor.system;

        let init = actorData.initiative;
        if (previousInit) { init += ' + ' + previousInit};
        init += ' + ' + (actorData.basecharacteristics.ag.value/100);

        return init;
    }

    /**
     * Check for other initiative rolls for this token; if they exist, return the highest so far
     * @param {string} tokenId 
     */
    getPreviousInit(tokenId)
    {
        const combat = this.parent;
        let highest = null;

        const entries = combat.combatants.filter(entry => (entry.tokenId == tokenId) && entry.initiative && entry.id != this.id);

        if (entries.length) {
            highest = Math.max.apply(Math, entries.map(function(entry) { return entry.initiative; }));
        }
        
        return Math.floor(highest);
    }

}