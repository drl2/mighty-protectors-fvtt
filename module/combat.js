/**
 * Override the default Initiative formula based on calculated initiative roll
 * Add AG score as a decimal for tiebreaker 
 */ 

export const _getInitiativeFormula = function() {
    const actor = this.actor;
    if ( !actor ) return "1d4";
    const actorData = actor.data.data;
    const init = actorData.initiative + " + " + (actorData.basecharacteristics.ag.value/100);

    return init;
};
