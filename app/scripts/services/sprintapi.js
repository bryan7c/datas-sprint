'use strict';

/**
 * @ngdoc service
 * @name datasSprintApp.sprintAPI
 * @description
 * # sprintAPI
 * Factory in the datasSprintApp.
 */
angular.module('datasSprintApp')
  .factory('sprintAPI', function (dateUtil) {
    var _sprint = {}

    var _init = function(sprint){
      _sprint = sprint;
      _sprint.dataFim = dateUtil.incrementDay(_sprint.dataInicio, _sprint.dias);
      _sprint.diasParaFim = dateUtil.intervalDay(_sprint.dataInicio, _sprint.dataFim);
      _sprint.estorias = [];
      return _sprint
    }

    var _add = function(estoria){
      //estoria.nome = estoria.nome || "story-" + this.sprint.estorias.length() + 1
      _sprint.estorias.push(estoria);
    }

    var _listEstoria = function(){
      return _sprint.estorias;
    }

    // Public API here
    return {
      init: _init,
      add: _add,
      listEstoria: _listEstoria
    };
  });
