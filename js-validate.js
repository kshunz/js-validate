(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./rules/rules":2,"./validate/validate":4}],2:[function(require,module,exports){
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

},{"../util/is_func":3}],3:[function(require,module,exports){
module.exports = function isFunction(fx) {
  var isFunc = typeof fx === "function";

  if(!isFunc) {
    isFunc = fx.constructor === Function;
  }

  return isFunc;
};

},{}],4:[function(require,module,exports){
module.exports = function(input, rule) {
  "use strict";
  
  input = input || null;
  rule = rule || null;

  this.rules = this.rules || {};
  this.rules.sets = this.rules.sets || {};

  var isValid = false;
  var selectedFx;

  if(!(input && rule)) {
    return isValid;
  }

  if(!this.rules.sets.hasOwnProperty(rule)) {
    return isValid;
  }

  selectedFx = this.rules.sets[rule];

  return selectedFx.apply(null, arguments);
};

},{}]},{},[1])