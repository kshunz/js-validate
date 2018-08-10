const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');
const core = require('../src/validate');

const coreValidate = core.start();
const messages = new Map();

class Rules {
  constructor(userRules = {}) {
    //@TODO: Obviously don't do this for long
    Object.assign(this, core.rulesets);
    Object.assign(this, userRules);

    //@TODO: Seriously, upgrade for real
    core.rules(this);
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

  static alias() {
    return core.group(...arguments);
  }

  static error(rule, response) {
    messages.set(`invalid.${rule}`, response);
  }

  static file(filename) {
    const isYaml = coreValidate(path.extname(filename), 'equals .yaml');

    let file = {};
    if (isYaml) {
      file = yaml.load(filename);
    }

    Object.keys(file || {})
      .map(a => [a, file[a]])
      .map(sets => this.alias(...sets));
  }

  static success(rule, response) {
    messages.set(`valid.${rule}`, response);
  }

  static group(name, defs) {
    //needs a reference to rules at this.definitions
    this.importRules();
    core.group({
      [name]: defs
    });
  }

  static rule(name, method) {
    this.userRules = this.userRules || {};
    this.userRules[name] = method;
  }

  static rules() {
    if (!this.definitions) {
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
      if (_.isObject(resolvedInput)) {
        rule = rule.split('.');
        resolvedInput = input[rule[0]];
        rule.shift();
      }

      return coreValidate(resolvedInput, rule);
    });
  }

  validate(input, rules) {
    /* @TODO: make a method that does not use every
     * This way specific rule failures will be evident
     */
    const result = _.every(this.compare(input, rules));
    const invalidKey = `invalid.${rules}`;
    const validKey = `valid.${rules}`;

    if (result === true && messages.has(validKey)) {
      return messages.get(validKey);
    }

    if (result === false && messages.has(invalidKey)) {
      return messages.get(invalidKey);
    }

    return result;
  }
}

module.exports = Validator;
