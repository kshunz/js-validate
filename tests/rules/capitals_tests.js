describe('Capital character rule validator', function() {
  var capital = RULES.capitals;

  it('should accept a string with at least one capital', function() {
    expect(capital('ePass')).to.be.true;
    expect(capital('EPASS')).to.be.true;
  });
  it('should accept a capitalized (starts with capital) string', function() {
    expect(capital('Hello world!')).to.be.true;
  });
  it('should reject lowercase strings', function() {
    expect(capital('iamlowercase!')).to.be.false;
  });
  it('should ignore whitespaces in strings', function() {
    expect(capital('I should be okay!')).to.be.true;
    expect(capital('i should BE okay!')).to.be.true;
  });
});