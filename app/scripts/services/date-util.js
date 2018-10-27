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
    var holidayDetail = [],
    	holidayDateStringList = [];
	var date = new Date();
    $http.get("http://services.sapo.pt/Holiday/GetNationalHolidays?year="+date.getFullYear()).then(function(data){
		parserFeriados(data);
	});

	this.hasHoliday = false;

	function parserFeriados (data) {
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(data,"text/xml");
		xmlDoc = xmlDoc.getElementsByTagName("Holiday");

		for(var i = 0; i < xmlDoc.length; i++){
			holidayDetail.push({
				nome:xmlDoc[i].getElementsByTagName("Name")[0].innerHTML,
				date:new Date(xmlDoc[i].getElementsByTagName("Date")[0].innerHTML),
				description:xmlDoc[i].getElementsByTagName("Description")[0].innerHTML
			});
			holidayDateStringList.push(xmlDoc[i].getElementsByTagName("Date")[0].innerHTML);
		}
	}

    this.incrementDay = function(data, dias, uteis){
    	uteis = uteis || false;
    	this.hasHoliday = false;
    	var aux = new Date(data);
    	//var increment = 0;

    	if(dias > 0){
			
			//TODO pensar em uma lógica melhor para evitar o loop

    		var diasAdd = 0;
    		while(diasAdd < dias){
    			aux.setDate(aux.getDate()+1);
    			if(uteis){
	    			if(aux.getDay() === 0 || aux.getDay() === 6){
	    				continue;
	    			}
	    		}
    			if(isHoliday(aux) > -1){
					this.hasHoliday = true;
					continue;
				}

    			diasAdd++;
    		}

    		/*if((data.getDay() + dias) > 5){
    			increment = 1;
    			var outr = dias - (6 - data.getDay());

    			if(outr >= 0){
    				increment++;
    				
    			}

    			outr = outr + increment;
    			if(outr>7)
    				outr = outr % 7;
    			var multIncr = parseInt(outr / 7);

    			console.log({passadoDasemana: outr, multiplicador: multIncr});
    			increment = increment + (multIncr * 2);
    		}*/
		}
    	return aux;
    };

    function isHoliday(date){
    	try{
    		if(date === ""){ throw "empty";}
    		if(!date){ throw "Not is valid";}
    		if(date.constructor.name !== "Date"){ throw "Not is a Date type";}

    		var dateString = date.toISOString();
    		return holidayDateStringList.indexOf(dateString.substring(0,11) + "00:00:00");
    	}
    	catch(e){
    		console.error("date-util: isHoliday error:" + e);
    	}
    }

    this.intervalDay = function(dataIni, dataFim, uteis){
    	uteis = uteis || false;
    	var utc1 = Date.UTC(dataIni.getFullYear(), dataIni.getMonth(), dataIni.getDate());
		var utc2 = Date.UTC(dataFim.getFullYear(), dataFim.getMonth(), dataFim.getDate());
		var dias = Math.floor((utc2 - utc1) / ( 1000 * 60 * 60 * 24) );

		if(uteis){
			var diasInterval = 0;
    		while(dataIni !== dataFim){
    			dataIni.setDate(dataIni.getDate()+1);
    			if(dataIni.getDay() === 0 || dataIni.getDay() === 6){
    				continue;
    			}
    			diasInterval++;
    		}
    		dias = diasInterval;
			/*var i = dataIni.getDay() + dias;
			switch(true){
				case i > 6:
					dias = dias - 2;
					break;
				case i == 6:
					dias = dias - 1;
					break;
			}*/
		}

		return dias;
    };
  });
