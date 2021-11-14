'use strict'
const client = use('request-promise');
const Cache  = use('Cache');
/**
 * ServiceController
 */
class Controller {
  /**
   * constructor
   * @param urlDestiny
   * @param prefix
   */
  constructor({urlDestiny, prefix}) {
    this.urlDestiny = urlDestiny;
    this.prefix     = prefix;
  }

  /**
   * Função Sincrona responsável por passar todas as requisições para a API alvo
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async gatewaySync({ request, response }) {
    try {
      const url = this.urlDestiny + request.originalUrl().replace(this.prefix, '');


      if (request.method() === 'GET') {
        return await this.sendGet(url,{Accept: 'application/json'})
      } else {
        return await this.send(url,request.method(),{Accept: 'application/json'},request.body)
      }
    } catch (error) {

      return response.status(error.statusCode).send({
        ...error,
        status: error.statusCode,
        message: error.error.message ? error.error.message : error.error.error
      });
    }
  }

  /**
   *
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async gatewaySyncCache({ request, response }) {
    try {
      const url = this.urlDestiny + request.originalUrl().replace(this.prefix, '');

      if (request.method() === 'GET') {
        return await Cache.remember(url, 42, async() => {
          return await this.sendGet(url,{Accept: 'application/json'});
        });
      }

      return await this.send(url,request.method(),{Accept: 'application/json'}, request.body)
    } catch (err) {
      let error = err.error;
      return response.status(err.statusCode).send({error});
    }
  }

  /**
   * gatewayASync
   * @param request
   * @param response
   * @returns {Promise<*>}
   */
  async gatewayASync({ request, response }) {
    try {
      const url = this.urlDestiny + request.originalUrl().replace(this.prefix, '');

      if (request.method() === 'GET') {
        this.sendGet(url,{Accept: 'application/json'})
      } else {
        this.send(url,request.method(),{Accept: 'application/json'},request.body)
      }

      return response.status(200).send({error:false, message:'Enviado!'});

    } catch (err) {
      let error = err.error;
      return response.status(err.statusCode).send({error});
    }
  }

  /**
   * sendGet
   * @param url
   * @param header
   * @returns {Promise<*>}
   */
  async sendGet(url, header)
  {
     return await client({method: 'GET', url: url, headers:header, json: true, rejectUnauthorized: false});
  }

  /**
   *
   * @param url
   * @param method
   * @param header
   * @param body
   * @returns {Promise<*>}
   */
  async send(url, method, header, body)
  {
     return await client({method: method, url: url, headers: header, body: body, json: true, rejectUnauthorized: false});
  }
}

module.exports = Controller
