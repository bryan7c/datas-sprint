'use strict';

describe('Service: dateUtil', function () {

  // load the service's module
  beforeEach(module('datasSprintApp'));

  // instantiate service
  var dateUtil;
  beforeEach(inject(function (_dateUtil_) {
    dateUtil = _dateUtil_;
  }));

  it('should do something', function () {
    expect(!!dateUtil).toBe(true);
  });

});
