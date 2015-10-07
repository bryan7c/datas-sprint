angular.module('datasSprintApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/contact.html',
    "<p>This is the contact view.</p>"
  );


  $templateCache.put('views/gerarador.html',
    "<form name=\"formGerador\"> <div layout=\"row\" layout-align=\"center center\"> <div flex=\"33\"> <md-datepicker ng-model=\"gerador.sprint.dataInicio\" md-placeholder=\"Data do início do Sprint\" md-min-date=\"gerador.dataMin\" md-max-date=\"gerador.dataMax\" required></md-datepicker> </div> <div flex> <md-input-container> <label>Quantidade de dias</label> <input ng-model=\"gerador.sprint.dias\" type=\"number\" max=\"14\" min=\"1\" required> </md-input-container> </div> <div flex=\"30\"> <md-checkbox ng-model=\"gerador.sprint.usarDiasUteis\" aria-label=\"Usar dias úteis\"> Considerar dias úteis </md-checkbox> </div> </div> <div layout=\"row\" layout-align=\"center center\"> <div flex=\"33\"> <md-datepicker ng-model=\"gerador.sprint.dataFim\" md-placeholder=\"Data do fim do Sprint\" disabled></md-datepicker> </div> <div flex> <md-input-container> <label>Quantidade de pontos</label> <input ng-model=\"gerador.sprint.pontos\" type=\"number\" max=\"999\" min=\"1\" disabled> </md-input-container> </div> </div> </form> <table class=\"table table-striped\" ng-if=\"gerador.sprint.estorias\"> <thead> <tr> <th>Estoria</th> <th>Pontos</th> <th>Tasks</th> <th>Data de entrega</th> </tr> </thead> <tbody> <tr ng-repeat=\"estoria in gerador.sprint.estorias\"> <td>{{estoria.nome}}</td> <td>{{estoria.pontos}}</td> <td>{{estoria.tasks}}</td> <td>{{estoria.data | date: 'dd/MM'}}</td> </tr> </tbody> </table> <div layout=\"row\" layout-align=\"end end\"> <md-button class=\"md-fab\" aria-label=\"Eat cake\" ng-disabled=\"formGerador.$invalid\" ng-click=\"gerador.iniciarInclusao()\"> <md-icon md-svg-src=\"images/icons/ic_add_white_24px.svg\">Add Estoria</md-icon> <md-tooltip> Adicionar estoria </md-tooltip> </md-button> </div> <md-sidenav class=\"md-sidenav-right md-whiteframe-z2\" md-component-id=\"right\"> <md-toolbar class=\"md-theme-light\"> <h1 class=\"md-toolbar-tools\">Adicionar Estoria</h1> </md-toolbar> <md-content layout-padding> <form name=\"formEstoria\"> <md-input-container> <label for=\"nome\">Estoria</label> <input type=\"text\" name=\"nome\" id=\"nome\" ng-model=\"gerador.estoria.nome\" md-autofocus> </md-input-container> <md-input-container> <label for=\"pontos\">Pontos</label> <input type=\"number\" name=\"pontos\" id=\"pontos\" ng-model=\"gerador.estoria.pontos\" required> </md-input-container> <md-input-container> <label for=\"tasks\">Quantidade de tasks</label> <input type=\"number\" name=\"tasks\" id=\"tasks\" ng-model=\"gerador.estoria.tasks\" required> </md-input-container> </form> <md-button ng-click=\"gerador.closeNav()\"> Cancelar </md-button> <md-button ng-click=\"gerador.adicionarEstoria(gerador.estoria)\" class=\"md-primary\" ng-disabled=\"formEstoria.$invalid\"> Add estoria </md-button> </md-content> </md-sidenav>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>"
  );

}]);
