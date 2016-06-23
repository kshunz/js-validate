<h2>js-validate</h2>
<i>Functional, extensible, input validation.  Make sure the value you receive is EXACTLY what you expect.</i>

<h1>Getting Started</h1>

<h4>Installation</h4>

    npm install js-validate

<h4>Quick Use</h4>
```node
var validator = require('js-validate');
```

```
var validate = validator.start();
```

<h5>Validate against a single rule:</h5>

    validate('123', 'min-length 2');  //--> true

<h5>Validate against multiple rules:</h5>

    validate('123', ['min-length 2', 'number']);  //-->true

<h4>Built-in Rules</h4>
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

<h5>Create a validator (rule) group:</h5>

    validator.group({
      'account-number': [
        'alphanumeric',
        'min-length 7',
        'starts-with 000-',
        'ends-with -00'
      ]
    });

<h5>Validate against a group of rules:</h5>

    validate('000-KLJ8989123-00', 'account-number');  //--> true

<h5>Create a custom rule:</h5>

    validator.rules({
      isOkay: function(input) {
        return input === 'ok';
      }
    });

<h5>Alphanumeric with additional characters</h5>
*Alphanumeric plus spaces*
    
    validate('Mulberry Lane', 'alphanumeric');  //--> false
    
    validate('Mulberry Lane', 'alphanumeric _space_');  //--> true
    
*Alphanumeric plus any other character*
    
    validate('Box #123', 'alphanumeric _space_ #');  //--> true
    validate('888-JS-VALIDATE', 'alphanumeric -');  //--> true

<h5>Keep this in mind when creating custom rules:</h5>

- Validator rules must return a pure boolean (true | false)
- The first parameter must be the user input
- Unlimited additional parameters are supported
- Custom rules are added to the default rule list
- Custom rules may be used in conjunction with defaults in rule groups
