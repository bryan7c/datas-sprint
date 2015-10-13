'use strict';

/**
 * @ngdoc overview
 * @name datasSprintApp
 * @description
 * # datasSprintApp
 *
 * Main module of the application.
 */
angular
  .module('datasSprintApp', [
	'ngAnimate',
	'ngAria',
	'ngCookies',
	'ngMessages',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'ngMaterial'
  ])
  .config(["$routeProvider", function ($routeProvider) {
	$routeProvider
	.when('/main', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl',
		controllerAs: 'main'
	})
	.when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'about'
	})
	.when('/', {
		templateUrl: 'views/gerarador.html',
		controller: 'GeraradorCtrl',
		controllerAs: 'gerador'
	})
	.when('/gerador', {
		templateUrl: 'views/gerarador.html',
		controller: 'GeraradorCtrl',
		controllerAs: 'gerador'
	})
	.when('/gerador-by-lista', {
		templateUrl: 'views/gerador-by-lista.html',
		controller: 'GeradorByListaCtrl',
		controllerAs: 'geradorByLista'
	})
	.otherwise({
		redirectTo: '/gerador'
	});
  }]);

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

'use strict';

/**
 * @ngdoc function
 * @name datasSprintApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the datasSprintApp
 */
angular.module('datasSprintApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

	'use strict';

	/**
	* @ngdoc function
	* @name datasSprintApp.controller:GeraradorCtrl
	* @description
	* # GeraradorCtrl
	* Controller of the datasSprintApp
	*/
	angular.module('datasSprintApp')
	.controller('GeraradorCtrl', ['$scope','SprintAPI','$mdSidenav','$filter', '$mdToast', function ($scope, SprintAPI, $mdSidenav, $filter, $mdToast) {
		this.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
		];

		this.sprint = {};
		this.sprint.dataInicio = new Date();
		this.sprint.dias = 1;
		this.sprint.usarDiasUteis = true;

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

		SprintAPI.init(this.sprint);
		this.sprint = SprintAPI.getSprint();

	//============= Nav functions =================

	this.closeNav = function () {
		closeNav();
	};

	this.openNav = function () {
		openNav();
	};

	//============= Toast functions =================

	function showActionToast(text) {
		text = text || "Deu zica";
		var toast = $mdToast.simple()
			.content(text)
			.action('OK')
			.highlightAction(false)
			.position("top right");
		
		$mdToast.show(toast);
		/*.then(function(response) {
			if ( response == 'ok' ) {
				alert('You clicked \'OK\'.');
			}
		});*/
	}

	//============= Story functions =================

	this.adicionarEstoria = function(estoria){
		SprintAPI.addEstoria(estoria);
		this.sprint = SprintAPI.getSprint();

		this.estoria = {};
		$scope.formEstoria.$setUntouched();
		formEstoria.nome.focus();
	};

	this.iniciarInclusao = function(){
		atualizarSprint();
		openNav();
	};

	//============= Local functions =================
	function atualizarSprint(){
		SprintAPI.init($scope.gerador.sprint);
		$scope.gerador.sprint = SprintAPI.getSprint();
	}

	/*function toggleNav(){
		$mdSidenav('right').toggle();
	}*/

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

	$scope.$watch("gerador.sprint", function(){
		atualizarSprint();
	}, true);

	$scope.$watch("gerador.sprint.feriado", function(){
		if($scope.gerador.sprint.feriado){
			showActionToast("Este sprint contém um feriado!");
		}
	}, true);
}]);

'use strict';

/**
* @ngdoc service
* @name datasSprintApp.SprintAPI
* @description
* # SprintAPI
* Factory in the datasSprintApp.
*/
angular.module('datasSprintApp')
.factory('SprintAPI', ["dateUtil", function (dateUtil) {

	var _sprint = {};
		_sprint.usarDiasUteis = false;
	var pontosPorDia;

	var _init = function(sprint){
		_sprint.dataInicio = sprint.dataInicio;
		_sprint.dias = sprint.dias;
		_sprint.usarDiasUteis = sprint.usarDiasUteis;
		_sprint.pontos = 1;
		_sprint.feriado = dateUtil.hasHoliday;
		setPontosPorDia(_sprint.pontos / _sprint.dias);
		gerarDataFim();

		if(_sprint.estorias){
			updatePontos();
			calcularDatas();
		}
	};

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
	};

	//==============  Getters  ================

	var _getPontos = function(){
		return _sprint.pontos;
	};

	var _getSprint = function(){
		return _sprint;
	};

	var _getDataFim = function(){
		return _sprint.dataFim;
	};

	var _getEstorias = function(){
		return _sprint.estorias;
	};

	var setPontos = function(pontos){
		_sprint.pontos = pontos;
	};

	var setPontosPorDia = function(ponto){
		pontosPorDia = ponto;
	};

	//==============  Local functions  ================

	var calcularDatas = function(){
		var pontosDoDia = pontosPorDia;
		var auxData = angular.copy(_sprint.dataInicio);
			//auxData.setDate(auxData.getDate());

		_sprint.estorias.forEach(function(element){
			while(element.pontos >= pontosDoDia){
				pontosDoDia = pontosDoDia + pontosPorDia;
				auxData = dateUtil.incrementDay(auxData,1,_sprint.usarDiasUteis);
			}
			pontosDoDia = pontosDoDia - element.pontos;
			element.data = auxData;
		});
	};

	var gerarDataFim = function() {
		_sprint.dataFim = dateUtil.incrementDay(_sprint.dataInicio, _sprint.dias, _sprint.usarDiasUteis);
	};

	var updatePontos = function(){
		var sum = 0;
		_sprint.estorias.forEach(function(element){
			sum = sum + element.pontos;
		});

		setPontos(sum);
		setPontosPorDia(_sprint.pontos / _sprint.dias);
	};

	// Public API here
	return {
		init: _init,
		getSprint: _getSprint,
		addEstoria: _addEstoria,
		getEstorias: _getEstorias,
		getDataFim: _getDataFim,
		getPontos: _getPontos
	};
}]);

'use strict';

/**
 * @ngdoc service
 * @name datasSprintApp.dateUtil
 * @description
 * # dateUtil
 * Service in the datasSprintApp.
 */
angular.module('datasSprintApp')
  .service('dateUtil', ["$http", function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var holidayDetail = [],
    	holidayDateStringList = [];

    $http.get("http://services.sapo.pt/Holiday/GetNationalHolidays?year=2015").success(function(data){
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
  }]);

'use strict';

/**
 * @ngdoc function
 * @name datasSprintApp.controller:GeradorByListaCtrl
 * @description
 * # GeradorByListaCtrl
 * Controller of the datasSprintApp
 */
angular.module('datasSprintApp')
  .controller('GeradorByListaCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

angular.module('datasSprintApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/gerador-by-lista.html',
    "<p>This is the gerador-by-lista view.</p>"
  );


  $templateCache.put('views/gerarador.html',
    "<form name=\"formGerador\"> <div layout=\"row\" layout-wrap layout-align=\"space-between center\"> <div flex=\"30\" flex-order=\"1\" flex-sm=\"60\"> <md-datepicker ng-model=\"gerador.sprint.dataInicio\" md-placeholder=\"Data do início do Sprint\" md-min-date=\"gerador.dataMin\" md-max-date=\"gerador.dataMax\" required></md-datepicker> </div> <div flex=\"40\" flex-order=\"2\" flex-sm=\"40\"> <md-input-container> <label>Quantidade de dias</label> <input ng-model=\"gerador.sprint.dias\" type=\"number\" max=\"14\" min=\"1\" required> </md-input-container> </div> <div flex=\"30\" flex-order=\"3\" flex-sm=\"100\"> <md-checkbox ng-model=\"gerador.sprint.usarDiasUteis\" aria-label=\"Usar dias úteis\"> Considerar dias úteis </md-checkbox> </div> <div flex=\"30\" flex-order=\"4\" flex-sm=\"60\"> <md-datepicker ng-model=\"gerador.sprint.dataFim\" md-placeholder=\"Data do fim do Sprint\" disabled></md-datepicker> </div> <div flex=\"70\" flex-order=\"5\" flex-sm=\"40\"> <md-input-container> <label>Quantidade de pontos</label> <input ng-model=\"gerador.sprint.pontos\" type=\"number\" max=\"999\" min=\"1\" disabled> </md-input-container> </div> </div> </form> <div class=\"table-responsive\"> <table class=\"table table-striped\" ng-if=\"gerador.sprint.estorias\"> <thead> <tr> <th>Estoria</th> <th>Pontos</th> <th>Tasks</th> <th>Data de entrega</th> </tr> </thead> <tbody> <tr ng-repeat=\"estoria in gerador.sprint.estorias\"> <td>{{estoria.nome}}</td> <td>{{estoria.pontos}}</td> <td>{{estoria.tasks}}</td> <td>{{estoria.data | date: 'dd/MM'}} <!-- <md-input-container>\n" +
    "\t\t\t\t\t  <input type=\"text\" value=\"{{estoria.data |  date: 'dd/MM'}}\" />\n" +
    "\t\t\t\t\t</md-input-container> --> </td> <!-- <td>\n" +
    "\t\t\t\t\t<md-button class=\"md-icon-button\" aria-label=\"Settings\">\n" +
    "\t\t\t\t\t\t<md-icon aria-label=\"Delete\">\n" +
    "\t\t\t\t\t\t\t<i class=\"material-icons md-24\">delete</i>\n" +
    "\t\t\t\t\t\t</md-icon>\n" +
    "\t\t\t\t    </md-button>\n" +
    "\t      \t\t</td> --> </tr> </tbody> </table> </div> <div layout=\"row\" layout-align=\"end end\"> <md-button class=\"md-fab\" aria-label=\"Eat cake\" ng-disabled=\"formGerador.$invalid\" ng-click=\"gerador.iniciarInclusao()\"> <md-icon aria-label=\"Adicionar estoria\"> <i class=\"material-icons md-24\">add</i> </md-icon> <md-tooltip> Adicionar estoria </md-tooltip> </md-button> </div> <md-sidenav class=\"md-sidenav-right md-whiteframe-z2\" md-component-id=\"right\"> <md-toolbar class=\"md-theme-light\"> <h1 class=\"md-toolbar-tools\">Adicionar Estoria</h1> </md-toolbar> <md-content layout-padding> <form name=\"formEstoria\"> <md-input-container> <label for=\"nome\">Estoria</label> <input type=\"text\" name=\"nome\" id=\"nome\" ng-model=\"gerador.estoria.nome\" md-autofocus> </md-input-container> <md-input-container> <label for=\"pontos\">Pontos</label> <input type=\"number\" name=\"pontos\" id=\"pontos\" ng-model=\"gerador.estoria.pontos\" min=\"1\" required> </md-input-container> <md-input-container> <label for=\"tasks\">Quantidade de tasks</label> <input type=\"number\" name=\"tasks\" id=\"tasks\" ng-model=\"gerador.estoria.tasks\" min=\"1\" required> </md-input-container> </form> <md-button ng-click=\"gerador.closeNav()\"> Cancelar </md-button> <md-button ng-click=\"gerador.adicionarEstoria(gerador.estoria)\" class=\"md-primary\" ng-disabled=\"formEstoria.$invalid\"> Add estoria </md-button> </md-content> </md-sidenav>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>"
  );

}]);
