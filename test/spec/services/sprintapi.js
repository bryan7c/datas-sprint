'use strict';

describe('Service: sprintAPI', function () {

  // load the service's module
  beforeEach(module('datasSprintApp'));

  // instantiate service
  var sprintAPI;
  beforeEach(inject(function (_sprintAPI_) {
    sprintAPI = _sprintAPI_;
  }));

  it('should do something', function () {
    expect(!!sprintAPI).toBe(true);
  });

});
