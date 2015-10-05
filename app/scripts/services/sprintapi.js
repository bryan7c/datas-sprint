'use strict';

/**
 * @ngdoc service
 * @name datasSprintApp.sprintAPI
 * @description
 * # sprintAPI
 * Factory in the datasSprintApp.
 */
angular.module('datasSprintApp')
  .factory('sprintAPI', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
