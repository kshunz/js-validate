## js-validate
<i>Functional, extensible, input validation.  Make sure the value you receive is EXACTLY what you expect.</i>

# Getting Started

### Installation

    npm install js-validate

### Quick Use

    const validator = require('js-validate');

    const validate = validator.start();


> Validate against a single rule:

    validate('123', 'min-length 2');  //--> true

> Validate against multiple rules:

    validate('123', ['min-length 2', 'number']);  //-->true

### Built-in Rules

- alpha
- alphanumeric **NOW ACCEPTS ADDITIONAL CHARACTERS**
- boolean
- capitals (counts capital characters)
- ends-with
- equals
- length
- matches **NEW**
- matchesExactly **NEW**
- max
- max-length
- min
- min-length
- number (isNumber)
- numbers (Number Characters)
- numeric (consists of numerical digits)
- specials (Special Characters)
- starts-with

> Create a validator (rule) group:

    validator.group({
      'account-number': [
        'alphanumeric',
        'min-length 7',
        'starts-with 000-',
        'ends-with -00'
      ]
    });

> Validate against a group of rules:

    validate('000-KLJ8989123-00', 'account-number');  //--> true

> Create a custom rule:

    validator.rules({
      isOkay: function(input) {
        return input === 'ok';
      }
    });

> Alphanumeric with spaces

    validate('Mulberry Lane', 'alphanumeric');  //--> false

    validate('Mulberry Lane', 'alphanumeric _space_');  //--> true

> Alphanumeric plus any other character

    validate('Box #123', 'alphanumeric _space_ #');  //--> true

    validate('888-JS-VALIDATE', 'alphanumeric -');  //--> true

### Keep this in mind when creating custom rules:

- Validator rules must return a pure boolean (true | false)
- The first parameter must be the user input
- Unlimited additional parameters are supported
- Custom rules are added to the default rule list
- Custom rules may be used in conjunction with defaults in rule groups
