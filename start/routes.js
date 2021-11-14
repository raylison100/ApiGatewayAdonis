'use strict';
const Route = use('Route');

Route.group(() => {
  Route.any('*', 'CrawlerController.gatewaySync');
}).prefix('crawler');


Route.any('*', 'HomeController.unauthorized');
Route.get('check/crawler/infra', 'HomeController.checkCrawlerInfra');