'use strict';

/**
 * @ngdoc function
 * @name datasSprintApp.controller:GeraradorCtrl
 * @description
 * # GeraradorCtrl
 * Controller of the datasSprintApp
 */
angular.module('datasSprintApp')
  .controller('GeraradorCtrl', ['sprintAPI','$mdSidenav'], function (sprintAPI, $mdSidenav) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    this.sprint = {};
    this.sprint.dias = 1;
    this.sprint.pontos = 1;

    this.sprint.dataInicio = new Date();
    this.myDate = new Date();
    this.dataMax = new Date(
		this.sprint.dataInicio.getFullYear(),
		this.sprint.dataInicio.getMonth(),
		this.sprint.dataInicio.getDate() + 14
    );
  	this.dataMin = new Date(
		this.sprint.dataInicio.getFullYear(),
		this.sprint.dataInicio.getMonth(),
		this.sprint.dataInicio.getDate() - 3
    );

//============= Sprint functions ================

  	this.iniciarSprint = function(sprint){
  		this.sprint = sprintAPI.init(sprint);
  	}

  	this.closeNav = function () {
      $mdSidenav('right').close()
        .then(function () {
          console.log("adicionado");
        });
    };
//=================== Close =====================
//============= Story functions =================

	 this.adicionarEstoria = function(estoria){
	 	if(!this.sprint.estorias){
	 		this.iniciarSprint(this.sprint);
	 	}

	 	sprintAPI.add(estoria)
	 	this.estoria = {};
  		toggleNav();
  	}

//=================== Close =====================
//============= Local functions =================

  	function toggleNav(){
  		$mdSidenav('right').toggle();
  	}

  });
