'use strict';
const Env      = use('Env');
const User     = use('App/Models/User');
const moment   = use('moment');
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
    super({ urlDestiny: Env.get('CRAWLER_URL') + '/api', prefix: 'crawler/' })
  }
}

module.exports = CrawlerController;
