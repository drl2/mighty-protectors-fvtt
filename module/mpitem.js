import { MP } from './config.js';

/**
 * Override and extend the basic Item implementation.
 * @extends {Item}
 */
export default class MPItem extends Item {

    /**
     * Extends Item._preCreate to add default images by item type
     * @param {*} data 
     * @param {*} options 
     * @param {*} userId 
     */
    async _preCreate(data, options, userId) {
        await super._preCreate(data, options, userId);

        // assign a default image based on item type
        if (!data.img) {
            const img = MP.ItemTypeImages[data.type];
            if (img) await this.data.update({ img });
        }
    }
}