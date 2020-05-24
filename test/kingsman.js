var assert = require('assert');
const Kingsman = require('../dist/index').default;

const km = new Kingsman(registry => {
  registry.GET("petstore", "https://{{api_address}}/{{version}}/swagger.json");
  registry.parameters = {
    "api_address": "petstore.swagger.io",
    "version": "v2"
  };
});

describe('Kingsman', function () {
  it('should execute get request', function (done) {
    km.make("petstore").send()
      .then(response => {
        assert.equal(response.statusCode, 200);
        assert.notEqual(JSON.stringify(response.body), "");
        assert.equal(response.headers.get('content-type'), 'application/json');
        done();
      });
  });

  it("should handle other response status codes", function (done) {
    km.make("petstore", {
      version: "v99999"
    }).send()
      .then(response => {
        assert.equal(response.statusCode, 404);
        done();
      });
  });

  it("should handle error", function (done) {
    km.make("petstore", {
      api_address: "{{api_address}}"
    }).onError((r, e) => {
        assert.equal(r.name, "petstore");
        assert.equal(e.message, "No responses found");
      }).send()
      .catch(e => {
        assert.equal(e.message, "No responses found");
        done();
      });
  });

  it("should handle error in error", function (done) {
    km.make("petstore", {
      api_address: "{{api_address}}"
    }).onError((r, e) => {
        assert.notEqual(r.name, "petstore");
      }).send()
      .catch(e => {
        assert.equal(e.message, "'petstore' != 'petstore'");
        done();
      });
  });
});