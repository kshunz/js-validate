describe('Number rule validator', function() {
  var number = RULES.number;

  it('should accept whole numbers', function() {});
  it('should accept integers', function() {});
  it('should reject numbers that begin with zero', function() {
    expect(number('0123')).to.be.false;
  });
});