import { MP } from './config.js';

/**
 * Override and extend the basic Item implementation.
 * @extends {Actor}
 */
export default class MPActor extends Actor {

    /**
     * Extends Actor._preCreate to add default images by actor type
     * @param {*} data 
     * @param {*} options 
     * @param {*} userId 
     */
    async _preCreate(data, options, userId) {
        await super._preCreate(data, options, userId);

        // assign a default image based on item type
        if (!data.img) {
            const img = MP.ActorTypeImages[data.type];
            if (img) await this.data.update({ img });
        }
    }


    prepareDerivedData() {
        super.prepareDerivedData();

        if (this.data.type === 'character') this._prepareDerivedCharacterData();
    }

    _prepareDerivedCharacterData() {
        const actorData = this.data.data;

        // let's do this in the right order
        this.prepareCharacterBaseAttributes();
        
        const statData = this.getStatData();
        const massRoll = this.getMassRoll(actorData.weight);


    }


    prepareCharacterBaseAttributes() {
        const actorData = this.data.data;


        // TODO: get bonuses from abilities & add them in
        actorData.basecharacteristics.st.value = actorData.basecharacteristics.st.cp;
        actorData.basecharacteristics.en.value = actorData.basecharacteristics.en.cp;
        actorData.basecharacteristics.ag.value = actorData.basecharacteristics.ag.cp;
        actorData.basecharacteristics.in.value = actorData.basecharacteristics.in.cp;
        actorData.basecharacteristics.cl.value = actorData.basecharacteristics.cl.cp;
        this.updateMoveSpeeds();
    }

    /**
     * Item updates happen before actor updates, not after
     * So have to force these to update after base stat changes to reflect the new values
     */
    updateMoveSpeeds() {
        for (let i of this.items) {
            if (i.type === 'movement') {
                i._prepareDerivedMovementData();
            }
        }
    }


    /**
     * Look up the stats associted with eachg base attribute value from the big giant table of stats
     */
    getStatData() {
        const actorData = this.data.data;

        return {
            st: MP.StatTable.filter(tableRow => (tableRow.min <= actorData.basecharacteristics.st.value && tableRow.max >= actorData.basecharacteristics.st.value)),
            en: MP.StatTable.filter(tableRow => (tableRow.min <= actorData.basecharacteristics.en.value && tableRow.max >= actorData.basecharacteristics.en.value)),
            ag: MP.StatTable.filter(tableRow => (tableRow.min <= actorData.basecharacteristics.ag.value && tableRow.max >= actorData.basecharacteristics.ag.value)),
            in: MP.StatTable.filter(tableRow => (tableRow.min <= actorData.basecharacteristics.in.value && tableRow.max >= actorData.basecharacteristics.in.value)),
            cl: MP.StatTable.filter(tableRow => (tableRow.min <= actorData.basecharacteristics.cl.value && tableRow.max >= actorData.basecharacteristics.cl.value))
        }  
    }

    /**
     * 
     * @param {int} weight 
     */
    getMassRoll(weight) {
        let massRoll = "";

        if (weight > 0) {
            // halve the weight value and check the big table for the closest value in 'carry', and get its index
            weight = weight/2;

			let closestValue = Infinity;
			let closestIndex = -1;
			for (let i = 0; i < MP.StatTable.length; ++i) {
			  let diff = Math.abs(MP.StatTable[i].carry - weight);
			  if (diff < closestValue) {
				closestValue = diff;
				closestIndex = i;
			  }
			}
            massRoll = MP.StatTable[closestIndex].hth_init;
        }
        return massRoll;
    }
}
