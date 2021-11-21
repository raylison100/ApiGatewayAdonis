'use strict';
const Env      = use('Env');
const Controller = require("./Controller");

/**
 *
 * SiteController  para direcionamento da API CrawlerForms
 * @type {class}
 * @class SiteController
 */
class SiteController extends Controller {
  /**
   * constructor
   */
  constructor() {
    super({ urlDestiny: Env.get('SITE_URL'), prefix: '/sites/' })
  }
}

module.exports = SiteController;
