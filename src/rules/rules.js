module.exports = function() {
  "use strict";

  var isFunc = require('../util/is_func');

  return {
    add: function(rule, validator) {
      if(isFunc(validator)) {
        this.sets[rule] = validator;
      }
    },
    sets: {}
  };
}();
