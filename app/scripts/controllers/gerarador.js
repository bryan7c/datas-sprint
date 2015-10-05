'use strict';

/**
 * @ngdoc function
 * @name datasSprintApp.controller:GeraradorCtrl
 * @description
 * # GeraradorCtrl
 * Controller of the datasSprintApp
 */
angular.module('datasSprintApp')
  .controller('GeraradorCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    this.sprint = {};
    this.dias = 1;
    this.pontos = 1;

    this.sprint.dataInicio = new Date();
    this.myDate = new Date();
    this.dataMax = new Date(
		this.sprint.dataInicio.getFullYear(),
		this.sprint.dataInicio.getMonth() + 14,
		this.sprint.dataInicio.getDate()
    );
  	this.dataMin = new Date(
		this.sprint.dataInicio.getFullYear(),
		this.sprint.dataInicio.getMonth() - 3,
		this.sprint.dataInicio.getDate()
    );	
  });
