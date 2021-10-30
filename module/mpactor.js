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
}
