'use strict';
const Env      = use('Env');
const Controller = require("./Controller");

/**
 *
 * CrawlerController  para direcionamento da API CrawlerForms
 * @type {class}
 * @class CrawlerController
 */
class CrawlerController extends Controller {
  /**
   * constructor
   */
  constructor() {
    super({ urlDestiny: Env.get('CRAWLER_URL'), prefix: '/crawler/' })
  }
}

module.exports = CrawlerController;
