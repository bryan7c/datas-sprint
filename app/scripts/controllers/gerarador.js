	'use strict';

	/**
	* @ngdoc function
	* @name datasSprintApp.controller:GeraradorCtrl
	* @description
	* # GeraradorCtrl
	* Controller of the datasSprintApp
	*/
	angular.module('datasSprintApp')
	.controller('GeraradorCtrl', ['$scope','SprintAPI','$mdSidenav', function ($scope, SprintAPI, $mdSidenav) {
		this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
		];

		this.sprint = {};
		this.sprint.dataInicio = new Date();
		this.sprint.dias = 1;

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

		SprintAPI.init(this.sprint, true);
		this.sprint = SprintAPI.getSprint();

	//============= Nav functions =================

	this.closeNav = function () {
		closeNav();
	};

	this.openNav = function () {
		openNav();
	};

	//============= Story functions =================

	this.adicionarEstoria = function(estoria){
		SprintAPI.addEstoria(estoria);
		this.sprint = SprintAPI.getSprint();

		this.estoria = {};
		$scope.formEstoria.$setUntouched();
		formEstoria.nome.focus();
	}

	this.iniciarInclusao = function(){
		atualizarSprint();
		openNav();
	}

	//============= Local functions =================
	function atualizarSprint(){
		SprintAPI.init($scope.gerador.sprint, true);
		$scope.gerador.sprint = SprintAPI.getSprint();
	}

	function iniciarSprint(){
		this.sprint.init();
	}

	function toggleNav(){
		$mdSidenav('right').toggle();
	}

	function closeNav(){
		$mdSidenav('right').close()
		.then(function () {
			console.log("fechado");
		});
	}

	function openNav(){
		$mdSidenav('right').open()
		.then(function () {
			console.log("aberto");
		});
	}

	$scope.$watch("sprint", function(){
		console.log("something has changed");
	}, true);

}]);
