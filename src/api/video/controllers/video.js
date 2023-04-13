'use strict';

/**
 * video controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::video.video');

module.exports = createCoreController('api::video.video', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = { ...ctx.query, local: 'en' };
        let { data, meta } = await super.find(ctx);

        await Promise.all(
            data.map(async (item, index) => {
                data[index].attributes.source = JSON.parse(data[index].attributes.source);
            })
        );
        return { data, meta };
    },

    async findOne(ctx) {
        ctx.query = { ...ctx.query, local: 'en' };
        let { data, meta } = await super.findOne(ctx);
        data.attributes.source = JSON.parse(data.attributes.source);
        return { data, meta };
    }
}));
