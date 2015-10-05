'use strict';

describe('Controller: GeraradorCtrl', function () {

  // load the controller's module
  beforeEach(module('datasSprintApp'));

  var GeraradorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GeraradorCtrl = $controller('GeraradorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GeraradorCtrl.awesomeThings.length).toBe(3);
  });
});
