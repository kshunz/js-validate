module.exports = function Validate() {
    var _ = require('lodash');

    this.groupNames = require('./defaults/groups');
    this.rulesets = require('./defaults/rules');

    this.rules = function(ruleset) {
        _.extend(this.rulesets, ruleset);
    };

    this.group = function(namedRules) {
        _.extend(this.groupNames, namedRules);
    };

    this.start = function() {

        var atLeastOneRuleFailed;
        var groupNames = this.groupNames;
        var rulesets = this.rulesets;

        return function(input, rule) {

            var rules = rule;
            var validator;
            var validatorInput;
            var flipRule = false;
            var result = false;

            if(!Array.isArray(rules)) {
                rules = [];
                rules.push(rule);
            }

            this.groupNames = groupNames;
            this.rulesets = rulesets;

            //swap group for associated rules
            rules = rules.map(function(rule) {
                return rule;
            });

            rules = rules.map(function(rule) {
                return this.groupNames[rule] || rule;
            });

            rules = _.flatten(rules);

            atLeastOneRuleFailed = rules.some(function(rule) {

                validatorInput = rule.split(' ');  //rules may have parameters separated by spaces
                flipRule = _.contains(['not', '!', '-'], _.first(validatorInput)) && validatorInput.length > 1;

                if(flipRule) {
                  validatorInput.shift();
                }

                rule = validatorInput.shift(); //the rule name is the first parameter; not needed by validator

                validator = this.groupNames[rule] || this.rulesets[rule];
                validatorInput.unshift(input); //the first parameter of a validator entry is the test input

                //auto-fail the rule if the rule isn't set
                result = validator ? validator.apply(null, validatorInput) === false : true;

                return flipRule ? !result : result;
            });

            return atLeastOneRuleFailed ? false : true;
        };
    };

    return this instanceof Validate ? this : new Validate();
}();

