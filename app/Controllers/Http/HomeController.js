'use strict';

const client = use('request-promise');
const Env    = use('Env');

/**
 * HomeController
 */
class HomeController extends Controller {

  /**
   * constructor
   */
  constructor() {
    this.urlCrawlerDestiny = Env.get('CRAWLER_URL')
  }
  /**
   *
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
    async unauthorized({request, response}){
      return response.unauthorized({message: 'unauthorized'});
    }

  /**
   * Função que checa infraestrura de comunicação entre os ms apigateway e payment
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async checkCrawlerInfra({ request, response }) {
    try {
      console.log('Check Crawler')
      const url = this.urlObDestiny + "/healthz";
      console.log(url)

      return await this.sendGet(url,{Accept: 'application/json'})
    } catch (error) {

      return response.status(error.statusCode).send({
        ...error,
        status: error.statusCode,
        message: error.error.message ? error.error.message : error.error.error
      });
    }
  }
}

module.exports = HomeController;
