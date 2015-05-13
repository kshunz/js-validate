module.exports = function() {
  var rules = require('./rules/rules');
  var validate = require('./validate/validate');

  return {
    rules: rules,
    validate: validate,
    alidate: validate
  };
}();
