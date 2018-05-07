describe('Numeric rule validator (made up of numbers)', function() {
  const RULES = require(process.cwd() + '/src/defaults/rules');
  const numeric = RULES.numeric;

  it('should accept whole numbers', function() {
    expect(numeric('123a')).to.be.false;
  });
  it('should accept integers', function() {
    expect(numeric('234.0')).to.be.true;
  });
  it('should accept numbers that begin with zero', function() {
    expect(numeric('0123')).to.be.true;
  });
  it('should accept numbers with multiple dots', function() {
    expect(numeric('255.255.255.0')).to.be.true;
    expect(numeric('...0...1...2...3...4...')).to.be.true;
  });
});
