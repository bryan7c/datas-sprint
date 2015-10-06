'use strict';

/**
 * @ngdoc service
 * @name datasSprintApp.dateUtil
 * @description
 * # dateUtil
 * Service in the datasSprintApp.
 */
angular.module('datasSprintApp')
  .service('dateUtil', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.incrementDay = function(data, dias, uteis){
    	// $http.get("http://services.sapo.pt/Holiday/GetNationalHolidays?year=2015").success(function(data,status){
    	// 	console.log(data);
    	// })
    	uteis = uteis || false;
    	var aux = new Date(data);

    	if(uteis){
			var i = data.getDay() + dias;
			switch(true){
				case i >= 6:
					dias = dias + 2;
					break;
			}
		}

    	aux.setDate(data.getDate()+dias);
    	return aux;
    }

    this.intervalDay = function(dataIni, dataFim, uteis){
    	uteis = uteis || false;
    	var utc1 = Date.UTC(dataIni.getFullYear(), dataIni.getMonth(), dataIni.getDate());
		var utc2 = Date.UTC(dataFim.getFullYear(), dataFim.getMonth(), dataFim.getDate());
		var dias = Math.floor((utc2 - utc1) / ( 1000 * 60 * 60 * 24) );

		if(uteis){
			var i = dataIni.getDay() + dias;
			switch(true){
				case i > 6:
					dias = dias - 2;
					break;
				case i == 6:
					dias = dias - 1;
					break;
			}
		}

		return dias;
    }
  });
