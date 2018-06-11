const { expect } = require('chai');

describe('Number rule validator', function() {
  const RULES = require(process.cwd() + '/src/defaults/rules');
  const number = RULES.number;

  it('should accept whole numbers', function() {
    expect(number(123)).to.be.true;
  });
  it('should accept integers', function() {
    expect(number('123.0')).to.be.true;
    expect(number('123.023')).to.be.true;
    expect(number('123.023.55')).to.be.false;
  });
  it('should reject numbers that begin with zero', function() {
    expect(number('0123')).to.be.false;
  });
});
