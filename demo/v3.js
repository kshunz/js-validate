/* v3 is a new framework design that surrounds
* the functionality of v2
*/

const V2 = require('../');
const validate = new V2;

let revisions = 0;
class Framework extends V2 {
  constructor() {
    super(...arguments);
  }
}

function validator () {
  validate.__proto__ = Framework;
  validate.__proto__.revisions = revisions;
  validate.__proto__.alias = aliasOverride;
  validate.__proto__.__rules = new Map();

  return validate;
}

function aliasOverride() {

  this.rule(...arguments);

  V2.rules(...arguments);

  this.revisions++;

  this.__rules.set([this.rules()]);

}

module.exports = validator();
