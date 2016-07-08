const RuleSets = require('../lib/rule_sets');

module.exports = class  {
    
    constructor () {
        console.log('validator constructor...');
        this.rulesets = function () {
            return new RuleSets;
        }
    }
    
    __start () {
        return new Promise(function (resolve) {
            resolve();
        });
    }

    validate () {

        var rules = Array.prototype.slice.call(arguments);
        var input = rules.shift();
        var rulesets = this.rulesets();

        var validators = rules.map(function (rule) {
            var params = typeof rule !== 'string' ? rule : rule.split(' ');
            var ruleName = params.shift();
            var validator = new Promise(function (resolve) {
                params.push(resolve);
            });

            params.unshift(input);

            rulesets[ruleName].apply(new WeakMap(), params);

            return validator;

        });

        //@TODO: Making a mistake with my promise setups somehow, urghhhh
        return Promise.all(validators)

    }
};