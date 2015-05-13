module.exports = function(input, rule) {
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
