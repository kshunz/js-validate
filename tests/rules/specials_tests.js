describe('Special character rule validator', function() {
  const RULES = require(process.cwd() + '/src/defaults/rules');
  const special = RULES.specials;

  it('should accept a string with at least one special character', function() {
    expect(special('#1Stunner')).to.be.true;
    expect(special('1Stunner')).to.be.false;
  });
  it('should accept a string with a specified amount of special characters', function() {
    expect(special('#1Stunner', '1')).to.be.true;
    expect(special('#1*Stunner', '2')).to.be.true;
    expect(special('1Stunner', '0')).to.be.true;
  });
  it('ISSUE: Treats certain letters like special characters (é, ñ, etc.)', function() {
    expect(special('José', '1')).to.be.true;  //@TODO: Should be false
    expect(special('años', '1')).to.be.true; //@TODO: Should be false
  });
});
