module.exports = function() {

  var _ = require('lodash');

  return {
    add: function(rule, validator) {
      if(_.isFunction(validator)) {
        this.sets[rule] = validator;
      }
    },
    sets: {}
  };
}();
