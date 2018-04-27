// const validator = require('../src/validate');
const validator = require('..');
const validate = validator.start();

console.log(validator.rulesets);

console.log(validate('000-123-ABC', ['startsWith 000-', 'endsWith ABC', 'alphanumeric -']));
