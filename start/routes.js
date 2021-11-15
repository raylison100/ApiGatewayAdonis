'use strict';
const Route = use('Route');

Route.group(() => {
  Route.any('*', 'CrawlerController.gatewaySync');
}).prefix('crawler');

Route.group(() => {
  Route.post('create-user', 'AuthController.create');
  Route.put('udpate-user/:id', 'AuthController.updateUser');
  Route.delete('delete-user/:id', 'AuthController.delete');

  Route.post('login', 'AuthController.authenticate');
  Route.get('logout', 'AuthController.logout');
}).prefix('autheticate');

Route.any('*', 'HomeController.unauthorized');
Route.get('check/crawler/infra', 'HomeController.checkCrawlerInfra');