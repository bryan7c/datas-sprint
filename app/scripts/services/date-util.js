'use strict';

/**
 * @ngdoc service
 * @name datasSprintApp.dateUtil
 * @description
 * # dateUtil
 * Service in the datasSprintApp.
 */
angular.module('datasSprintApp')
  .service('dateUtil', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.incrementDay = function(data, dias, uteis){
    	uteis = uteis || false;
    	var aux = new Date(data);

    	aux.setDate(data.getDate()+dias);
    	return aux;
    }

    this.intervalDay = function(dataIni, dataFim, uteis){
    	uteis = uteis || false;
    	var utc1 = Date.UTC(dataIni.getFullYear(), dataIni.getMonth(), dataIni.getDate());
		var utc2 = Date.UTC(dataFim.getFullYear(), dataFim.getMonth(), dataFim.getDate());

		return Math.floor((utc2 - utc1) / ( 1000 * 60 * 60 * 24) );
    }
  });
