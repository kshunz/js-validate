describe('isFunction utility', function() {
  var isFunc = require('../../src/util/is_func');

  it('should return false when provided a STRING', function() {
    expect(isFunc('hello')).to.be.false;
  });
  it('should return false when provided a NUMBER', function() {
    expect(isFunc(123)).to.be.false;
  });
  it('should return false when provided a POJO', function() {
    expect(isFunc({})).to.be.false;
  });
  it('should return true when provided a FUNCTION', function() {
    expect(isFunc(function() {})).to.be.true;
  });
});
