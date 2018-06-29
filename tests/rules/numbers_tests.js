const { expect } = require('chai');

describe('Number character rule validator', function() {
  const RULES = require(process.cwd() + '/src/defaults/rules');
  const numbers = RULES.numbers;

  it('should accept a string with at least one number', function() {
    expect(numbers('Route66')).to.be.true;
    expect(numbers('Hwy 5', '1')).to.be.true;
  });
  it('should accept a string with at least a specified amount of numbers', function() {
    //@TODO: Zero should behave as no numbers allowed instead of at least zero
    expect(numbers('Call 911!', '0')).to.be.true;
    expect(numbers('Call 911!', '1')).to.be.true;
    expect(numbers('Call 911!', '2')).to.be.true;
    expect(numbers('Call 911!', '3')).to.be.true;
    expect(numbers('Call 911!', '4')).to.be.false;
  });
  it('should reject phrases with no numbers', function() {
    expect(numbers('onetwothree')).to.be.false;
    expect(numbers('onetwothree'), '2').to.be.false;
    expect(numbers('onetwothree'), '3').to.be.false;
  });
});
