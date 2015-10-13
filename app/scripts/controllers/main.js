'use strict';

/**
 * @ngdoc function
 * @name datasSprintApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the datasSprintApp
 */
angular.module('datasSprintApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.menu = [
    	{
    		title: "Criar Sprint",
    		active: false,
    		link: "#/gerador"
    	},
    	{
    		title: "Gerar por lista",
    		active: false,
    		link: "#/gerador-by-lista"
    	}
    ];
  });
