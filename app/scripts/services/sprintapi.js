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
	var pontosPorDia;
	var pontoSobraDia;

	var _init = function(sprint){
		_sprint.dataInicio = sprint.dataInicio;
		_sprint.dias = sprint.dias;
		_sprint.usarDiasUteis = sprint.usarDiasUteis;
		_sprint.pontos = 1;
		setPontosPorDia(_sprint.pontos / _sprint.dias);
		gerarDataFim();

		if(_sprint.estorias){
			updatePontos();
			calcularDatas();
		}
	}

	var _addEstoria = function(estoria){
		if(estoria){
			if(!_sprint.estorias){
				_sprint.estorias = [];
			}
			estoria.nome = estoria.nome || "story-" + (_sprint.estorias.length + 1);
			_sprint.estorias.push(estoria);
			updatePontos();
		}
		calcularDatas();
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

	var setPontosPorDia = function(ponto){
		pontosPorDia = ponto;
	}

	//==============  Local functions  ================

	var calcularDatas = function(){
		var pontosDoDia = pontosPorDia;
		var auxData = angular.copy(_sprint.dataInicio);
			//auxData.setDate(auxData.getDate());

		_sprint.estorias.forEach(function(element){
			while(element.pontos >= pontosDoDia){
				pontosDoDia = pontosDoDia + pontosPorDia;
				auxData = dateUtil.incrementDay(auxData,1,_sprint.usarDiasUteis)
			}
			pontosDoDia = pontosDoDia - element.pontos;
			element.data = auxData;
		});
	}

	var gerarDataFim = function(sprint) {
		_sprint.dataFim = dateUtil.incrementDay(_sprint.dataInicio, _sprint.dias, _sprint.usarDiasUteis);
	}

	var updatePontos = function(){
		var sum = 0;
		_sprint.estorias.forEach(function(element,key){
			sum = sum + element.pontos;
		});

		setPontos(sum);
		setPontosPorDia(_sprint.pontos / _sprint.dias);
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
