import { MP } from './config.js';
import {simplifyDice} from './utility.js'

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
        const abiltyBonuses = this.getAbilityBonuses();
        this.prepareCharacterBaseAttributes(abiltyBonuses);       
        const statData = this.getStatData();
        

        // have to set 'em all anyway so might as well do the rest in one place
        actorData.basecharacteristics.st.save = statData.st.save;
        actorData.basecharacteristics.en.save = statData.en.save;
        actorData.basecharacteristics.ag.save = statData.ag.save;
        actorData.basecharacteristics.in.save = statData.in.save;
        actorData.basecharacteristics.cl.save = statData.cl.save;

        this.updateToHitValues();
        actorData.multiinit = abiltyBonuses.multiinit;
        actorData.carry = statData.st.carry;
        this.updateMoveSpeeds(); // some move speeds may need updates from carry & stats
        actorData.hth = statData.st.hth_init;
        actorData.mass = this.getMassRoll(actorData.weight);
        actorData.user_cp = actorData.base_cp + actorData.spent_xp;
        actorData.stat_cp = 
            actorData.basecharacteristics.st.cp
            + actorData.basecharacteristics.en.cp
            + actorData.basecharacteristics.ag.cp
            + actorData.basecharacteristics.in.cp
            + actorData.basecharacteristics.cl.cp;
        actorData.ability_cp = abiltyBonuses.cpcost;
        actorData.total_cp = abiltyBonuses.cpcost + actorData.stat_cp;
        actorData.avail_ip = Math.ceil(actorData.basecharacteristics.in.value/2);
        actorData.used_ip = abiltyBonuses.ipcost;

        actorData.caps = {};
        actorData.caps.bcs = Math.floor((actorData.total_cp/5)+10);
        actorData.caps.ability = Math.floor(actorData.total_cp/5);
        actorData.caps.dmg = Math.floor((actorData.total_cp/12.5)+3);
        actorData.gear = {};
        actorData.gear.break = Math.floor((actorData.total_cp/25)+5);
        actorData.gear.take = Math.floor((actorData.total_cp/25)+6);
        actorData.gear.disarm = Math.floor((actorData.total_cp/25)+3);
        actorData.gear.gbc = Math.floor((actorData.total_cp/15)+6);
        
        

        // need to add ability bonuses to these
        actorData.luck = 10 + abiltyBonuses.luck; 
        actorData.hitpts.max = statData.st.hits_st + statData.ag.hits_ag + statData.en.hits_en + statData.cl.hits_cl + abiltyBonuses.hp;
        actorData.power.max = actorData.basecharacteristics.st.value + actorData.basecharacteristics.ag.value + actorData.basecharacteristics.en.value + actorData.basecharacteristics.in.value + abiltyBonuses.power;
        actorData.healing = statData.en.heal;
        actorData.physicaldefense = (actorData.basecharacteristics.ag.save -10) + abiltyBonuses.physdef;
        actorData.mentaldefense = (actorData.basecharacteristics.in.save -10) + abiltyBonuses.mentdef;
        actorData.initiative = simplifyDice(statData.cl.hth_init + " + " + abiltyBonuses.init)
    }

    /**
     * total up stat changes caused by abilities
     */
    getAbilityBonuses() {
        const abiltyBonuses = {
            cpcost: 0,
            ipcost: 0,
            st: 0,
            ag: 0,
            en: 0,
            in: 0,
            cl: 0,
            physdef: 0,
            mentdef: 0,
            power: 0,
            hp: 0,
            init: 0,
            luck: 0,
            multiinit: false
        }

        const abilities = this.items.filter(item => item.type=="ability" );

        for (const ability of abilities) {
            abiltyBonuses.cpcost += ability.data.data.cpcost || 0;
            abiltyBonuses.ipcost += ability.data.data.ipcost || 0;
            abiltyBonuses.st += ability.data.data.stbonus || 0;
            abiltyBonuses.ag += ability.data.data.agbonus || 0;
            abiltyBonuses.en += ability.data.data.enbonus || 0;
            abiltyBonuses.in += ability.data.data.inbonus || 0;
            abiltyBonuses.cl += ability.data.data.clbonus || 0;
            abiltyBonuses.physdef += ability.data.data.physdefbonus || 0;
            abiltyBonuses.mentdef += ability.data.data.mentdefbonus || 0;
            abiltyBonuses.power += ability.data.data.powerbonus || 0;
            abiltyBonuses.hp += ability.data.data.hpbonus || 0;
            abiltyBonuses.init += ability.data.data.initbonus || 0;
            abiltyBonuses.luck += ability.data.data.luckbonus || 0;
            if (ability.data.data.multiinit) abiltyBonuses.multiinit = true;
        }

        return abiltyBonuses;
    }

    /**
     * calculate the base stats (ST, AG, EN, IN, CL) from points spent & bonuses from abilities
     */
    prepareCharacterBaseAttributes(bonuses) {
        const actorData = this.data.data;

        // TODO: get bonuses from abilities & add them in
        actorData.basecharacteristics.st.value = actorData.basecharacteristics.st.cp + bonuses.st;
        actorData.basecharacteristics.en.value = actorData.basecharacteristics.en.cp + bonuses.en;
        actorData.basecharacteristics.ag.value = actorData.basecharacteristics.ag.cp + bonuses.ag;
        actorData.basecharacteristics.in.value = actorData.basecharacteristics.in.cp + bonuses.in;
        actorData.basecharacteristics.cl.value = actorData.basecharacteristics.cl.cp + bonuses.cl;
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
     * Item updates happen before actor updates, not after
     * So have to force these to update after base stat changes to reflect the new values
     */
     updateToHitValues() {
        for (let i of this.items) {
            if (i.type === 'attack') {
                i._prepareDerivedAttackData();
            }
        }
    }


    /**
     * Look up the stats associted with eachg base attribute value from the big giant table of stats
     */
    getStatData() {
        const actorData = this.data.data;

        return {
            st: MP.StatTable.filter(tableRow => (tableRow.min <= actorData.basecharacteristics.st.value && tableRow.max >= actorData.basecharacteristics.st.value))[0],
            en: MP.StatTable.filter(tableRow => (tableRow.min <= actorData.basecharacteristics.en.value && tableRow.max >= actorData.basecharacteristics.en.value))[0],
            ag: MP.StatTable.filter(tableRow => (tableRow.min <= actorData.basecharacteristics.ag.value && tableRow.max >= actorData.basecharacteristics.ag.value))[0],
            in: MP.StatTable.filter(tableRow => (tableRow.min <= actorData.basecharacteristics.in.value && tableRow.max >= actorData.basecharacteristics.in.value))[0],
            cl: MP.StatTable.filter(tableRow => (tableRow.min <= actorData.basecharacteristics.cl.value && tableRow.max >= actorData.basecharacteristics.cl.value))[0]
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
