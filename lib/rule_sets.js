const _ = require('lodash');

module.exports = class {

    alpha (input) {
        var extraChars = Array.prototype.slice.call(arguments, 1);
        var pattern = '^[A-Za-z' + _.flatten(extraChars) + ']+$';

        this.resolve(new RegExp(pattern).test(input));
    }

    alphanumeric (input) {
        var extraChars = Array.prototype.slice.call(arguments, 1).map(function (char) {
            return char === '_space_' ? ' ' : char;
        });

        var pattern = '^[A-Za-z0-9' + _.flatten(extraChars) + ']+$';

        this.resolve(new RegExp(pattern).test(input));
    }

    boolean (input) {
        var pureBoolean = typeof input === 'boolean';

        if (!pureBoolean) {
            input = String(input).toLowerCase();
        }

        this.resolve(pureBoolean || input === 'true' || input === 'false');
    }

    capitals (input, count) {
        count = Number(count);
        count = Number.isNaN(count) ? 1 : count;

        this.resolve(new RegExp('^(.*[A-Z]){' + count + ',}.*$').test(input));
    }

    endsWith (input, char) {
        this.resolve(_.endsWith(input, char));
    }

    equals (input, value) {
        this.resolve(input === value);
    }

    length (input, length) {
        this.resolve(String(input).length === Number(length));
    }

    matches (input) {
        var options = Array.prototype.slice.call(arguments, 1);

        this.resolve(options.some(function (opt) {
            return input.toUpperCase() === opt.toUpperCase();
        }));
    }

    matchesExactly (input, value) {
        this.resolve(input === value);
    }

    max (input, value) {
        this.resolve(Number(input) <= value);
    }

    'max-length' (input, length) {
        this.resolve(String(input).length <= length);
    }

    min (input, value) {
        this.resolve(Number(input) >= value);
    }

    'min-length' (input, length) {
        this.resolve(String(input).length >= length);
    }

    number (input) {
        var extraChars = Array.prototype.slice.call(arguments, 1);

        extraChars.forEach(function (char) {
            if (String(char).toLowerCase() === 'space') {
                char = ' ';
            }

            input = input.split(char).join('');
        });

        var decimals = String(input).split('.')[1];
        var numDecimals = decimals ? decimals.length : 0;

        this.resolve(String(input) === String(Number(input).toFixed(numDecimals)));
    }

    numbers (input, count) {
        count = Number(count);
        count = Number.isNaN(count) ? 1 : count;

        this.resolve(new RegExp('^(.*[0-9]){' + count + ',}.*$').test(input));
    }

    numeric (input) {
        var inputAsString = String(input);
        var numbers = inputAsString.split('');

        this.resolve(!numbers.some(function (num) {
            num = num === '.' ? 0 : Number(num);
            return num * 1 !== Number(num);
        }));
    }

    specials (input, count) {
        count = Number(count);
        count = Number.isNaN(count) ? 1 : count;

        this.resolve(new RegExp('^(.*[^A-Za-z0-9]){' + count + ',}.*$').test(input));
    }

    startsWith (input, char) {
        this.resolve(_.startsWith(input, char));
    }
    
};
