describe('Alphanumeric character rule validator', function() {
  const RULES = require(process.cwd() + '/src/defaults/rules');
  const alphanumeric = RULES.alphanumeric;

  it('should accept lowercase characters and numbers', function() {
    expect(alphanumeric('abc123')).to.be.true;
  });
  it('should accept capital characters and numbers', function() {
    expect(alphanumeric('ABC123')).to.be.true;
  });
  it('should accept capital and lowercase characters and numbers', function() {
    expect(alphanumeric('ABCabc')).to.be.true;
  });
  it('ISSUE: fails on non-English characters and numbers', function() {
    expect(alphanumeric('años')).to.be.false;
    expect(alphanumeric('José')).to.be.false;
  });
  it('should accept numbers only', function () {
    /*jshint -W046 */
    expect(alphanumeric(1232)).to.be.true;
    expect(alphanumeric(000222)).to.be.true;
    expect(alphanumeric('00324')).to.be.true;
    expect(alphanumeric('123456')).to.be.true;
  });
  it('should reject multi-word phrases and phrases with non-alphanumeric characters', function () {
    expect(alphanumeric('Hello World')).to.be.false;
    expect(alphanumeric('I am #1')).to.be.false;
    expect(alphanumeric('ABC 123')).to.be.false;
  });
  it('should accept multi-word phrases and non-alphanumeric characters if the chars are specified in the rule', function () {
    expect(alphanumeric('Hello World', '_space_')).to.be.true;
    expect(alphanumeric('I am #1', '_space_', '#')).to.be.true;
    expect(alphanumeric('ABC 123', '_space_')).to.be.true;
  });
});
