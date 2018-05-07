describe('StartsWith rule validator', function() {
  const RULES = require(process.cwd() + '/src/defaults/rules');
  const startsWith = RULES.startsWith;

  it('should accept input that starts with a number', function() {
    expect(startsWith('1st Place', '1')).to.be.true;
  });
  it('should accept input that starts with a letter', function() {
    expect(startsWith('First Place', 'F')).to.be.true;
  });
  it('should match case', function() {
    expect(startsWith('First Place', 'f')).to.be.false;
    expect(startsWith('First Place', 'F')).to.be.true;
  });
});
