const Rules = require('../lib/rule_sets');

module.exports = class  {

    validate () {
        var rules = Array.prototype.slice.call(arguments);
        var input = rules.shift();
        var rulesets = new Rules();

        rules = rules[0];
        rules = typeof rules === 'string' ? [rules] : rules;

        var validators = rules.map(function (rule) {
            var params = typeof rule !== 'string' ? rule : rule.split(' ');
            var ruleName = params.shift();
            var validatorContext = Object.create(null);
            var validator = new Promise(function (resolve) {
                validatorContext.resolve = resolve;
            });

            params.unshift(input);

            rulesets[ruleName].apply(validatorContext, params);

            return validator;
        });

        return Promise.all(validators);
    }

    constructor () {
        return this.validate;
    }
};
