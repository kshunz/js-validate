const test = require('@kshunz/mutest');
const validate = require('./v3');

// test(true, validate(123, 'number'));
test(0, validate.revisions);
validate.alias('house', ['alphanumeric']);
test(1, validate.revisions);
validate.alias('carModel', ['alphanumeric']);
test(2, validate.revisions);

// test(true, validate('123 Main St', 'house'));

test(true, typeof validate === 'function');
test(true, typeof validate.alias === 'function');
test(true, typeof validate.group === 'function');
test(true, typeof validate.rules === 'function');

// test(validate.hasOwnProperty('alias'), true);
