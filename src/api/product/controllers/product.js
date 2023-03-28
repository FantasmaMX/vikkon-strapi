'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::product.product');

module.exports = createCoreController('api::product.product', ({ strapi }) => ({

    async find(ctx) {
        ctx.query = { ...ctx.query, local: 'en' };
        let { data, meta } = await super.find(ctx);


        // const query = strapi.db.query('api::article.article');

        data = data.filter(a => a.attributes.isActive === true);

        await Promise.all(
            data.map(async (item, index) => {
                // const article = await query.findOne({
                //     where: {
                //         id: item.id,
                //     },
                //     populate: ['createdBy'],
                // });

                // data[index].attributes.createdBy = {
                //     id: page.createdBy.id,
                //     firstName: page.createdBy.firstName,
                //     lastName: page.createdBy.lastName,
                // };                
                
                delete data[index].attributes.createdAt;
                delete data[index].attributes.updatedAt;
                delete data[index].attributes.publishedAt;

                let filterDetails = data[index].attributes.product_features.data || [];

                data[index].attributes.product_features.data = filterDetails.filter(a => a.attributes.isActive === true).map( (det, i) => {                    
                    delete det.attributes.createdAt;
                    delete det.attributes.updatedAt;
                    delete det.attributes.publishedAt;
                    if(!det.attributes.price) { det.attributes.price = 0; }

                    return det;
                });
            })
        );

        return { data, meta };
    }

}));
