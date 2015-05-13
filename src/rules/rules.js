module.exports = function() {
  "use strict";
  
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
