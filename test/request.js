var assert = require('assert');
const Request = require('../dist/request').default;
describe('Request', function () {
  it('should return url with queries', function () {
    const request = new Request("name", "GET", "https://domain.com");
    assert.equal(request.name, "name");
    assert.equal(request.method, 'get');
    assert.equal(request.url, "https://domain.com");
  });
});