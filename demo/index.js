// const Validator = require('../src/validate');
const Validator = require('..');
const rules = Validator.rules;

// Validator.rules({
//     isTwilio: (input) => {
//         return rules.length(input.To, 12) &&
//             rules.length(input.From, 12) &&
//             rules.startsWith(input.To, '+1') &&
//             rules.startsWith(input.From, '+1');
//     }
// });

const validate = new Validator;


const env = {
    "To": "+15553331234",
    "From": "+15558880000",
    "Body": "Hello"
};

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

function test(conditionToTest, expectedResult) {
	var failMsg = '\033[1;31mFail: \033[0m' + `${expectedResult} expected but got ${conditionToTest}`,
		  passMsg = '\033[1;32mPass: \033[0m' + `${expectedResult} === ${conditionToTest}`,
		  conditionPasses = conditionToTest === expectedResult;

	console.log(conditionPasses ? passMsg : failMsg);
}
