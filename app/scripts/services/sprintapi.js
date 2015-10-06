'use strict';

/**
* @ngdoc service
* @name datasSprintApp.SprintAPI
* @description
* # SprintAPI
* Factory in the datasSprintApp.
*/
angular.module('datasSprintApp')
.factory('SprintAPI', function (dateUtil) {

	var _sprint = {};
	_sprint.usarDiasUteis = false;

	var _init = function(sprint, diasUteis){
		_sprint.dataInicio = sprint.dataInicio;
		_sprint.dias = sprint.dias;
		_sprint.usarDiasUteis = diasUteis;

		gerarDataFim();
	}

	var _addEstoria = function(estoria){
		if(estoria){
			if(!_sprint.estorias){
				_sprint.estorias = [];
			}
			estoria.nome = estoria.nome || "story-" + _sprint.estorias.length + 1;
			_sprint.estorias.push(estoria);
			updatePontos();
		}
	}

	//==============  Getters  ================

	var _getPontos = function(){
		return _sprint.pontos;
	}

	var _getSprint = function(){
		return _sprint;
	}

	var _getDataFim = function(){
		return _sprint.dataFim;
	}

	var _getEstorias = function(){
		return _sprint.estorias;
	}

	var setPontos = function(pontos){
		_sprint.pontos = pontos;
	}

	//==============  Local functions  ================

	var gerarDataFim = function(sprint) {
		_sprint.dataFim = dateUtil.incrementDay(_sprint.dataInicio, _sprint.dias, _sprint.usarDiasUteis);
	}

	var updatePontos = function(){
		var sum = 0;
		_sprint.estorias.forEach(function(element,key){
			sum = sum + element.pontos;
		});

		setPontos(sum);
	}

	// Public API here
	return {
		init: _init,
		getSprint: _getSprint,
		addEstoria: _addEstoria,
		getEstorias: _getEstorias,
		getDataFim: _getDataFim,
		getPontos: _getPontos
	};
});
