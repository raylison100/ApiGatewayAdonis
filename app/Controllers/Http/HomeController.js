'use strict';

const client = use('request-promise');
const Env    = use('Env');

/**
 * HomeController
 */
class HomeController {
  /**
   *
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
    async unauthorized({ response}){
      return response.unauthorized({message: 'unauthorized'});
    }
}

module.exports = HomeController;
