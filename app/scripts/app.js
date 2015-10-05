'use strict';

/**
 * @ngdoc overview
 * @name datasSprintApp
 * @description
 * # datasSprintApp
 *
 * Main module of the application.
 */
angular
  .module('datasSprintApp', [
	'ngAnimate',
	'ngAria',
	'ngCookies',
	'ngMessages',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'ngMaterial'
  ])
  .config(function ($routeProvider) {
	$routeProvider
	  .when('/gerador', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl',
		controllerAs: 'main'
	  })
	  .when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'about'
	  })
	  .when('/', {
		templateUrl: 'views/gerarador.html',
		controller: 'GeraradorCtrl',
		controllerAs: 'gerador'
	  })
	  .when('/contact', {
		templateUrl: 'views/contact.html',
		controller: 'ContactCtrl',
		controllerAs: 'contact'
	  })
	  .otherwise({
		redirectTo: '/gerador'
	  });
  });
