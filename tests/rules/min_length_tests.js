describe('Min-length validator', function() {
  const RULES = require(process.cwd() + '/src/defaults/rules');
  const minLength = RULES['min-length'];

  it('should accept inputs equal to or less than a specified length', function() {
    expect(minLength('hello', '5')).to.be.true;
    expect(minLength('hello', '15')).to.be.false;
    expect(minLength('hello', '1')).to.be.true;
  });
  it('should reject inputs less than a specified length', function() {
    expect(minLength('hello', '15')).to.be.false;
  });
  it('should accept/reject empty strings based on min-length rule', function() {
    expect(minLength('', '0')).to.be.true;
    expect(minLength('', '2')).to.be.false;
  });
});
