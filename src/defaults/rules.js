module.exports = {
    'alpha': function(input) {
        return /^[A-Za-z]{1,}$/.test(input);
    },
    'alphanumeric': function(input) {
        return /^[A-Za-z0-9]{1,}$/.test(input);
    },
    'capitals': function(input, count) {
        count = Number(count);
        count = Number.isNaN(count) ? 1 : count;

        return new RegExp('^(.*[A-Z]){'+count+',}.*$').test(input);
    },
    'length': function(input, length) {
        return String(input).length === Number(length);
    },
    'max-length': function(input, length) {
        return String(input).length <= length
    },
    'min-length': function(input, length) {
        return String(input).length >= length;
    },
    'number': function(input) {
        return String(input) === String(Number(input));
    },
    'numbers': function(input, count) {
        count = Number(count);
        count = Number.isNaN(count) ? 1 : count;

        return new RegExp('^(.*[0-9]){'+count+',}.*$').test(input);
    },
    'specials': function(input, count) {
        count = Number(count);
        count = Number.isNaN(count) ? 1 : count;

        return new RegExp('^(.*[^A-Za-z0-9]){'+count+',}.*$').test(input);
    }
};