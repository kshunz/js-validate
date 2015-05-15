module.exports = function() {
  "use strict";

  var rules = require('./rules/rules');
  var validate = require('./validate/validate');
  var validator = {
    rules: rules,
    validate: validate,
    alidate: validate
  };

  //Adds $v to Window in the browser
  global.$v = validator;
  
  return validator;
}();
