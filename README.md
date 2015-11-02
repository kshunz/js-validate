# js-validate #

### Functional, extensible, input validation.  Make sure the value you receive is EXACTLY what you expect. ###

Getting Started

<h4>Installation</h4>

```
npm install js-validate
```

<h4>Quick Use</h4>

```
var validator = require('js-validate');

var validate = validator.start();

validate(123, 'min-length 2');
```