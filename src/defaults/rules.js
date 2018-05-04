module.exports = function() {
    var _ = require('lodash');

    return {
        alpha: function(input) {
            var extraChars = Array.prototype.slice.call(arguments, 1);
            var pattern = '^[A-Za-z' + _.flatten(extraChars) + ']+$';

            return new RegExp(pattern).test(input);
        },
        alphanumeric: function(input) {
            var extraChars = Array.prototype.slice.call(arguments, 1).map(function(char) {
                return char === '_space_' ? ' ' : char;
            });

            var pattern = '^[A-Za-z0-9' + _.flatten(extraChars) + ']+$';

            return new RegExp(pattern).test(input);
        },
        boolean: function(input) {
            var pureBoolean = typeof input === 'boolean';

            if (!pureBoolean) {
                input = String(input).toLowerCase();
            }

            return pureBoolean || input === 'true' || input === 'false';
        },
        capitals: function(input, count) {
            count = Number(count);
            count = Number.isNaN(count) ? 1 : count;

            return new RegExp('^(.*[A-Z]){' + count + ',}.*$').test(input);
        },
        endsWith: function(input, char) {
            return _.endsWith(input, char);
        },
        equals: function(input, value) {
            return input === value;
        },
        length: function(input, length) {
            return String(input).length === Number(length);
        },
        matches: function(input) {
            var options = Array.prototype.slice.call(arguments, 1);

            return options.some(function(opt) {
                return input.toUpperCase() === opt.toUpperCase();
            });
        },
        matchesExactly: function(input, value) {
            return input === value;
        },
        max: function(input, value) {
            return Number(input) <= value;
        },
        'max-length': function(input, length) {
            return String(input).length <= length;
        },
        min: function(input, value) {
            return Number(input) >= value;
        },
        'min-length': function(input, length) {
            return String(input).length >= length;
        },
        number: function(input) {
            var extraChars = Array.prototype.slice.call(arguments, 1);

            extraChars.forEach(function(char) {
                if (String(char).toLowerCase() === 'space') {
                    char = ' ';
                }

                input = input.split(char).join('');
            });

            var decimals = String(input).split('.')[1];
            var numDecimals = decimals ? decimals.length : 0;

            return String(input) === String(Number(input).toFixed(numDecimals));
        },
        numbers: function(input, count) {
            count = Number(count);
            count = Number.isNaN(count) ? 1 : count;

            return new RegExp('^(.*[0-9]){' + count + ',}.*$').test(input);
        },
        numeric: function(input) {
            var inputAsString = String(input);
            var numbers = inputAsString.split('');

            return !numbers.some(function(num) {
                num = num === '.' ? 0 : Number(num);
                return num * 1 !== Number(num);
            });
        },
        specials: function(input, count) {
            count = Number(count);
            count = Number.isNaN(count) ? 1 : count;

            return new RegExp('^(.*[^A-Za-z0-9]){' + count + ',}.*$').test(input);
        },
        startsWith: function(input, char) {
            return _.startsWith(input, char);
        }
    };

}();
