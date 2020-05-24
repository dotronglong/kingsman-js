var assert = require('assert');
const Query = require('../dist/query').default;
describe('Query', function () {
  it('should return url with queries', function () {
    const query = new Query();
    query.set('foo', 'bar').set('baz', 50);
    assert.equal(query.toString(), "foo=bar&baz=50");
  });
});