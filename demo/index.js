const test = require('@kshunz/mutest');
const Validator = require('..');
const rules = Validator.rules;

Validator.rule('isFooLike', function isFooLike(input) {
  return input.replace('foo', '').length !== input.length;
});

Validator.rule('isBarLike', function isFooLike(input) {
  return /[bar]/g.test(input);
});

Validator.group('short', ['min-length 1', 'max-length 5']);

const validate = new Validator;
// const validate = Validator.start();

const env = {
    "To": "+15553331234",
    "From": "+15558880000",
    "Body": "Hello"
};

test(true, validate('12345', 'short'));
test(false, validate('', 'short'));

test(true, validate('fast food', 'isFooLike'));
test(true, validate('debarge', 'isBarLike'));

test(true, validate('000-123-ABC', [
  'startsWith 000-',
  'endsWith ABC',
  'alphanumeric -']
));

test(true, validate(env, [
    'To.startsWith +',
    'To.length 12',
    'From.startsWith +',
    'Body.startsWith H'
]));

test(false, validate(env, [
    'To.startsWith _',
    'To.length 12',
    'From.startsWith 0',
    'Body.startsWith H'
]));

test(true, validate(env, 'To.startsWith +'));
test(true, validate(env.To, 'startsWith +'));
test(false, validate(env.From, 'startsWith _'));
test(true, validate(env.From, 'startsWith +'));
test(true, validate('Foo', ['capitals 1', 'startsWith F', 'endsWith o']))

test(false, validate(000123, 'length 6'));
test(true, validate(000123, 'length 2'));
test(true, validate('000123', 'length 6'));

test(true, validate('123', 'matches 123'));
test(true, validate(123, 'matches 123'));

test(true, validate('123', 'matchesExactly 123'));
test(false, validate(123, 'matchesExactly 123'));

test(true, validate('123', 'numeric'));
test(true, validate(123, 'numeric'));
test(false, validate('ABC123', 'numeric'));
