module.exports = function isFunction(fx) {
  var isFunc = typeof fx === "function";

  if(!isFunc) {
    isFunc = fx.constructor === Function;
  }

  return isFunc;
};
