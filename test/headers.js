var assert = require('assert');
const Headers = require('../dist/headers').default;
describe('Headers', function() {
  it('should allow to set and get key case insensitive', function() {
    const header = new Headers();
    header.set('x-Api-Key', 'some-key');
    assert.equal(header.get('x-api-key'), 'some-key');
    header.set('x-api-KEY', 'some-other-key');
    assert.equal(header.get('X-Api-Key'), 'some-other-key');
    header.set('access-control-max-age', 86400);
    assert.equal(header.get('Access-Control-Max-Age'), "86400");
    assert.equal(header.get('not-exist'), null);
  });

  it('should return header as data\'s object', function() {
    const header = new Headers();
    header.set('x-api-key', 'aaa').set('authorization', 'bearer token');
    assert.equal(JSON.stringify(header.data), '{"X-Api-Key":"aaa","Authorization":"bearer token"}');
  });
});