describe('RULES module', function() {
  "use strict";
  
  var rules = require('../../src/rules/rules');

  it('should have SETS of rules', function() {
    expect(rules.sets).to.not.be.undefined;
    expect(rules.sets).to.be.an('object');
  });
  it('should have an ADD (sets) method', function() {
    expect(rules.add).to.not.be.undefined;
    expect(rules.add).to.be.a('function');
  });

  describe('ADD (sets) method', function() {
    var myRule = function() {};
    rules.add('myRule', myRule);
    it('should add a RULE to sets', function() {
      expect(rules.sets.myRule).to.not.be.undefined;
      expect(rules.sets.myRule).to.be.a('function');
    });
  });

  describe('rule SETS registry', function() {
    var numRules;
    before(function(done) {
      rules.sets = {};
      done();
    });

    it('should start empty', function() {
      numRules = Object.keys(rules.sets).length;
      expect(numRules).to.equal(0);
    });
    it('should have the correct number of rule sets', function() {
      rules.add('ruleOne', function() {});
      rules.add('ruleTwo', function() {});
      numRules = Object.keys(rules.sets).length;

      expect(numRules).to.equal(2);
    });
  });
});
