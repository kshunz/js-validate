describe('JS-VALIDATE CORE', function() {
  "use strict";

  var validator = require('../src/js-validate');

  it('should be a object', function() {
    expect(validator).to.be.an('object');
  });
  it('should have a RULES object', function() {
    expect(validator.hasOwnProperty('rules')).to.be.true;
    expect(validator.rules).to.be.an('object');
  });
  it('should have a VALIDATE method', function() {
    expect(validator.hasOwnProperty('validate')).to.be.true;
    expect(validator.validate).to.be.a('function');
  });
  it('should have alidate alias', function() {
    expect(validator.hasOwnProperty('alidate')).to.be.true;
    expect(validator.alidate).to.be.a('function');
  });
  it('should require a RULE', function() {
    expect(validator.validate('something')).to.be.false;
  });
  it('should require a VALID RULE', function() {
    expect(validator.validate('something', 'fakeRule')).to.be.false;
  });

  describe('VALIDATOR module', function() {
    //Covers src/validate/validate
    var v = require('../src/js-validate');
    
    v.rules.add('minLen5', function(input) {
      return input.length > 4;
    });

    it('should validate against a provided RULE', function() {
      expect(v.validate(123, 'Number')).to.be.false
      expect(v.rules.sets.minLen5).to.not.be.undefined;
      expect(v.rules.sets.minLen5).to.be.a('function');
      expect(v.validate('rosebud', 'minLen5')).to.be.true;
    });
  });
});
