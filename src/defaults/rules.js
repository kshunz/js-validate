module.exports = function () {
    var _ = require('lodash');

    return {
        'alpha': function (input) {
            var extraChars = Array.prototype.slice.call(arguments, 1);
            var pattern = '^[A-Za-z' + _.flatten(extraChars) + ']+$';

            return new RegExp(pattern).test(input);

        },
        'alphanumeric': function (input) {
            var extraChars = Array.prototype.slice.call(arguments, 1);
            var pattern = '^[A-Za-z0-9' + _.flatten(extraChars) + ']+$';

            return new RegExp(pattern).test(input);
        },
        'capitals': function (input, count) {
            count = Number(count);
            count = Number.isNaN(count) ? 1 : count;

            return new RegExp('^(.*[A-Z]){' + count + ',}.*$').test(input);
        },
        'length': function (input, length) {
            return String(input).length === Number(length);
        },
        'max-length': function (input, length) {
            return String(input).length <= length
        },
        'min-length': function (input, length) {
            return String(input).length >= length;
        },
        'number': function (input) {
            var extraChars = Array.prototype.slice.call(arguments, 1);

            extraChars.forEach(function(char) {
                if(String(char).toLowerCase() === 'space') {
                    char = ' ';
                }

                input = input.split(char).join('');
            })

            return String(input) === String(Number(input));
        },
        'numbers': function (input, count) {
            count = Number(count);
            count = Number.isNaN(count) ? 1 : count;

            return new RegExp('^(.*[0-9]){' + count + ',}.*$').test(input);
        },
        'specials': function (input, count) {
            count = Number(count);
            count = Number.isNaN(count) ? 1 : count;

            return new RegExp('^(.*[^A-Za-z0-9]){' + count + ',}.*$').test(input);
        }
    };
}();