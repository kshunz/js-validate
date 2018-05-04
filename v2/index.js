const _ = require('lodash');
const v1 = require('../src/validate');
const v1Validate = v1.start();

class Rules {
    constructor() {
        //@TODO: Obviously don't do this for long
        Object.assign(this, v1.rulesets);
    }
}
class Validator {
    constructor() {
        //don't extend so that namespacing will be possible
        this.rules = new Rules(...arguments);

        let isInstance = this instanceof Validator;
        if (isInstance) {
            return this.validate.bind(this);
        }
    }

    static start() {
        return new Validator;
    }

    compare(input, rules) {
        rules = rules.constructor === Array ? rules : [rules];

        return rules.map(rule => {
            let resolvedInput = input;

            //resolve objectified inputs
            if(_.isObject(resolvedInput)) {
              rule = rule.split('.');
              resolvedInput = input[rule[0]];
              rule.shift();
            }

            return v1Validate(resolvedInput, rule);
        });
    }

    validate(input, rules) {
        /* @TODO: make a method that does not use every
        * This way specific rule failures will be evident
        */
        return _.every(this.compare(input, rules));
    }
}

module.exports = Validator;
