'use strict';

/**
 * active-model service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::active-model.active-model');
