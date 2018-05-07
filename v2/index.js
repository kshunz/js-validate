const _ = require('lodash');
const v1 = require('../src/validate');
const v1Validate = v1.start();

class Rules {
    constructor(userRules = {}) {
        //@TODO: Obviously don't do this for long
        Object.assign(this, v1.rulesets);
        Object.assign(this, userRules);

        //@TODO: Seriously, upgrade for real
        v1.rules(this);
    }
}
class Validator {
    constructor() {
        //don't extend so that namespacing will be possible
        //@NOTE: defs are only set if group is called by the user
        this.rules = Validator.definitions || new Rules(Validator.userRules);

        let isInstance = this instanceof Validator;
        if (isInstance) {
            return this.validate.bind(this);
        }
    }

    static group(name, defs) {
      //needs a reference to rules at this.definitions
      this.importRules();
      v1.group({[name]: defs});
    }

    static rule(name, method) {
      this.userRules = this.userRules || {};
      this.userRules[name] = method;
    }

    static rules() {
      if(!this.definitions) {
        this.importRules();
      }

      return this.definitions;
    }

    static importRules() {
      this.definitions = new Rules(Validator.userRules);
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
