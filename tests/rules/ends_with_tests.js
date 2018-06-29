const { expect } = require('chai');

describe('EndsWith rule validator', function() {
  const RULES = require(process.cwd() + '/src/defaults/rules');
  const endsWith = RULES.endsWith;

  it('should accept input that ends with a number', function() {
    expect(endsWith('Route 63', '63')).to.be.true;
  });
  it('should accept input that ends with a letter', function() {
    expect(endsWith('Sixty Three', 'Three')).to.be.true;
  });
  it('should match case', function() {
    expect(endsWith('Titan AE', 'AE')).to.be.true;
    expect(endsWith('Titan AE', 'ae')).to.be.false;
    expect(endsWith('Bee', 'ee')).to.be.true;
    expect(endsWith('Bee', 'EE')).to.be.false;
  });
});
