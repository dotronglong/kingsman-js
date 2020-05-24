var assert = require('assert');
const FactoryReplacer = require('../dist/replacer/factory').default;
describe('Replacer', function() {
  it('should replace string with parameters', function() {
    const replacer = new FactoryReplacer();
    assert.equal(replacer.replace("/users/{{id}}/{{name}}", {id: 1234, name: "John"}), "/users/1234/John");
  });
});