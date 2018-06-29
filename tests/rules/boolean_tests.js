const { expect } = require('chai');

describe('Boolean rule validator', function() {
  const RULES = require(process.cwd() + '/src/defaults/rules');
  const boolean = RULES.boolean;

  it('should accept pure booleans', function() {
    expect(boolean(true)).to.be.true;
    expect(boolean(false)).to.be.true;
  });

  it('should accept string booleans ("true" || "false")', function() {
    expect(boolean('true')).to.be.true;
    expect(boolean('false')).to.be.true;
  });

  it('should reject truthy values (not boolean)', function() {
    expect(boolean('123')).to.be.false;
    expect(boolean('1')).to.be.false;
    expect(boolean('abc')).to.be.false;
    expect(boolean({})).to.be.false;
    expect(boolean(function() {})).to.be.false;
  });

  it('should reject falsy values (not boolean)', function() {
    expect(boolean()).to.be.false;
    expect(boolean('')).to.be.false;
    expect(boolean('0')).to.be.false;
    expect(boolean(null)).to.be.false;
    expect(boolean(undefined)).to.be.false;
    expect(boolean(-1)).to.be.false;
    expect(boolean(NaN)).to.be.false;
  });

});
