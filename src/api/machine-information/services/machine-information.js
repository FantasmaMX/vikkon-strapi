'use strict';

/**
 * machine-information service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::machine-information.machine-information');
