## js-validate
<i>Functional, extensible, input validation.  Make sure the value you receive is EXACTLY what you expect.</i>

# Getting Started

### Installation

    npm install js-validate

### Instantiate

    const Validator = require('js-validate');

    const validate = new Validator;

> Validate against a single rule:

    validate('123', 'min-length 2');  //--> true

> Validate against multiple rules:

    validate('123', ['min-length 2', 'number']);  //-->true

> Create a validator alias (single-rule):

    Validator.alias('short', 'max-length 3');


> Create a validator alias (multiple rules):

    Validator.alias('account-number', [
      'alphanumeric -',
      'min-length 7',
      'starts-with 000-',
      'ends-with -00'
    ]);

> Create a custom rule:

    Validator.rule('isOkay', (input) => {
      return String(input).toLowerCase() === 'ok';
    });

> Integrate other great validators:

``` const tin = require('tin-validator'); ```

    Validator.rule('ssn-ein-tin', tin.isValid);

> Test custom rules and aliases:

    validate('ok', 'isOkay'); //--> true

    validate('OK', ['isOkay', 'short']); //--> true

    validate('000-23422823934-00', 'account-number'); //--> true


### Keep this in mind when creating custom rules:

- Validator rules must return a pure boolean (true | false)
- The first parameter must be the user input
- Unlimited additional parameters are supported
- Custom rules are added to the default rule list so overrides are possible
- Custom rules may be used in conjunction with defaults with aliases


### Built-in Rules

- **alpha**
  - Input is composed entirely of alpha characters (A-Za-z)
  - ```validate('Abc', 'alpha'); //--> true```
  - ```validate('ABC123', 'alpha'); //--> false```
- **alphanumeric**
  - Input is contains only numbers and letters
  - ```validate('abc123', 'alphanumeric'); //--> true```
  - Extensible to include other specified characters
  - ```validate('123 Main Street', 'alphanumeric'); //--> false```
  - ```validate('123 Main Street', 'alphanumeric _space_'); //--> true```
- **boolean**
  - Input contains some variation of true or false
  - Data type not considered
  - ```validate('true', 'boolean'); //--> true```
  - ```validate('false', boolean'); //--> true```
  - ```validate(FALSE, 'boolean'); //--> true```
- **capitals**
  - Input has a specified amount of capital letters
  - ```validate('JoJo', 'capitals 2'); //--> true```
- **ends-with**
  - Input ends with a certain phrase or character
  - ```validate('abc123', 'endsWith 123'); //--> true```
  - ```validate('555-888-0000', 'endsWith 0'); //--> true```
- **equals**
  - Input equals a given value.
  - ```validate('abc', 'equal abc'); //--> true```
  - ```validate('abc', 'equal ABC'); //--> false```
  - ```validate('123', 'equal 123'); //--> true```
  - *ISSUE: Does not yet work with numbers*
  - ```validate(123, 'equal 123'); //--> false```
- **length**
  - Input has exactly the amount of characters specified
  - ```validate(123, 'length 3'); //--> true```
  - *NOTICE*: Leading zeros are not considered because leading zeros in Javascript are no longer base-10 numbers.
  - ```validate(000123, 'length 6'); //--> false```
  - ```validate(000123, 'length 2'); //--> true```
  - *FIX* by making a string before validating.
  - ```validate('000123', 'length 6'); //--> true```
- **matches**
  - Input superficially (non-typed) matches a given value
  - ```validate('123', 'matches 123');  //--> true```
  - ```validate(123, 'matches 123');  //--> true ```
- **matchesExactly**
  - Input exactly matches a given value
  - ```validate('123', 'matches 123');  //--> true```
  - *NOTICE:* will not validate numbers
  - ```validate(123, 'matches 123');  //--> false ```
- **max**
  - Input is less than or equal to a given number
  - ```validate(123, 'max 125'); //--> true```
- **max-length**
  - Validates that the number of characters in an input is less-than or equal to a given value
  - ```validate(123, 'max-length 3'); //--> true```
  - ```validate(123, 'max-length 2'); //--> false```
- **min**
  - Validates that a given input is less than or equal to a minimum number
  - ```validate(123, 'min 122'); //--> true```
- **min-length**
  - Validates that a given input is more than or equal to a given number
  - ```validate(123, 'min-length 3'); //--> true```
  - ```validate(123, 'min-length 4'); //--> false```
- **number** - Deprecation Warning (use numeric)
  - Tests if an input is a number
  - ```validate('50.00'', 'number'); //--> true```
  - ```validate('50A', 'number'); //--> false```
- **numbers** (Number Characters)
  - Validates that an exact amount of numerals is present in the input
  - ```validate('#1 Fan', 'numbers 1'); //--> true```
  - ```validate('Catch 22', 'numbers 1'); //--> false```
- **numeric**
  - Input consists entirely of numerical characters
  - ```validate('123', 'numeric'); //--> true```
  - ```validate(123, 'numeric'); //--> true```
  - ```validate('ABC123', 'numeric'); //--> false```
- **specials**
  - Input contains at least a given number of special (non-alphanumeric) characters
  - ```validate('ABC123', 'specials 0'); //--> true```
  - ```validate('ABC*123', 'specials 1'); //--> true```
  - ```validate('Hello!!!', 'specials 3'); //--> true```
- **starts-with**
  - Input starts with a precise character or phrase
  - ```validate('$1', 'starts-with $'); //--> true```
  - ```validate('ABC123', 'starts-with ABC'); //--> true```
  - ```validate('ABC123', 'starts-with abc'); //--> false```

## Please contribute: ##
We need to greatly expand the rules, prune, and modify them.  We are also open to changes in the API of this utility.  Make and issue on github to connect.
