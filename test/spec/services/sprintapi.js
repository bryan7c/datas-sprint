'use strict';

describe('Service: SprintAPI', function () {

  // load the service's module
  beforeEach(module('datasSprintApp'));

  // instantiate service
  var SprintAPI;
  beforeEach(inject(function (_SprintAPI_) {
    SprintAPI = _SprintAPI_;
  }));

  it('should do something', function () {
    expect(!!SprintAPI).toBe(true);
  });

});
