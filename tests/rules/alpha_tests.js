describe('Alpha character rule validator', function() {
  const RULES = require(process.cwd() + '/src/defaults/rules');
  const alpha = RULES.alpha;

  it('should accept lowercase characters', function() {
    expect(alpha('abc')).to.be.true;
  });
  it('should accept capital characters', function() {
    expect(alpha('ABC')).to.be.true;
  });
  it('should accept capital and lowercase characters', function() {
    expect(alpha('ABCabc')).to.be.true;
  });
  it('ISSUE: fails on non-English characters', function() {
    expect(alpha('años')).to.be.false;
    expect(alpha('José')).to.be.false;
  });
});
