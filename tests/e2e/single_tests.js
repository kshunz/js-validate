describe('E2E TESTING', () => {
    const Validator = require(process.cwd());
    const validate = new Validator;

    describe('alpha', () => {
        it('should validate alpha', () => {
            expect(validate('abc', 'alpha')).to.be.true;
        });
    });
    describe('alphanumeric', () => {
        it('should validate alphanumeric', () => {
            expect(validate('abc123', 'alphanumeric')).to.be.true;
        });
    });
    describe('boolean', () => {
        it('should validate boolean', () => {
            expect(validate(true, 'boolean')).to.be.true;
            expect(validate('true', 'boolean')).to.be.true;
            expect(validate('false', 'boolean')).to.be.true;
            expect(validate('foo', 'boolean')).to.be.false;
        });
    });
    describe('capitals', () => {
        it('should validate capitals', () => {
            expect(validate('R2D2', 'capitals 2')).to.be.true;
            expect(validate('R2D2', 'capitals 3')).to.be.false;
        });
    });
    describe('endsWith', () => {
        it('should validate endsWith', () => {
            expect(validate('R2D2', 'endsWith 2')).to.be.true;
            expect(validate('R2D2', 'endsWith R2D2')).to.be.true;
            expect(validate('R2D2', 'endsWith 3')).to.be.false;
        });
    });
    describe('equals', () => {
        it('should validate equals', () => {
            expect(validate('foo', 'equals foo')).to.be.true;
            expect(validate('foo', 'equals bar')).to.be.false;
            expect(validate('1', 'equals 1')).to.be.true;
            //does not support non-strings
            expect(validate(1, 'equals 1')).to.be.false;
            expect(validate(true, 'equals true')).to.be.false;
        });
    });
    describe('length', () => {
        it('should validate length', () => {
            expect(validate('', 'length 0')).to.be.true;
            expect(validate('a', 'length 1')).to.be.true;
            expect(validate('ab', 'length 2')).to.be.true;
            expect(validate('abc', 'length 3')).to.be.true;
            expect(validate('123', 'length 3')).to.be.true;
            expect(validate(123, 'length 3')).to.be.true;

            //000 is not a real number - becomes 0
            expect(validate(000, 'length 1')).to.be.true;
            expect(validate(00, 'length 1')).to.be.true;
            expect(validate(0, 'length 1')).to.be.true;
        });
    });
    describe('matches', () => {
        it('should validate matches', () => {
            expect(validate('123', 'matches 123')).to.be.true;
            expect(validate(123, 'matches 123')).to.be.true;
        });
    });
    describe('matchesExactly', () => {
        it('should validate matchesExactly', () => {
            expect(validate('foo', 'matchesExactly foo')).to.be.true;
        });
    });
    describe('max', () => {
        it('should validate max', () => {
            expect(validate('123', 'max 123')).to.be.true;
            expect(validate('123', 'max 122')).to.be.false;
        });
    });
    describe('max-length', () => {
        it('should validate max-length', () => {
            expect(validate('', 'max-length 0')).to.be.true;
            expect(validate('1', 'max-length 0')).to.be.false;
        });
    });
    describe('min', () => {
        it('should validate min', () => {
            expect(validate('1', 'min 1')).to.be.true;
            expect(validate('3', 'min 5')).to.be.false;
        });
    });
    describe('min-length', () => {
        it('should validate min-length', () => {
            expect(validate('', 'min-length 0')).to.be.true;
            expect(validate('', 'min-length 1')).to.be.false;
            expect(validate('OKC', 'min-length 2')).to.be.true;
        });
    });
    describe('number', () => {
        //NOTE: Not sure what this is doing - lock down or remove
        it('should validate number', () => {
            expect(validate('123 Main Street', 'number')).to.be.false;
            //Why?
            expect(validate('80 88', 'number 2 _space_ 0')).to.be.true;
        });
    });
    describe('numbers', () => {
        it('should validate numbers', () => {
            expect(validate('123 Main Street', 'numbers 3')).to.be.true;
            expect(validate('80 88', 'numbers 4')).to.be.true;
            expect(validate('80,988', 'numbers 5')).to.be.true;
            expect(validate('0005123', 'numbers 6')).to.be.true;
            expect(validate(123, 'numbers 3')).to.be.true;
            //@NOTE: Leading zeros will get removed with primitive number format
            expect(validate(0012, 'numbers 2')).to.be.true;
            //@TODO: Bug - 0 is a single number and should validate "numbers 1"
            expect(validate('0', 'numbers 0')).to.be.true;
            expect(validate(0, 'numbers 0')).to.be.true;
        });
    });
    describe('numeric', () => {
        it('should validate numbers', () => {
            expect(validate('123 Main Street', 'numeric')).to.be.false;
            expect(validate('12345', 'numeric')).to.be.true;
            expect(validate('0909', 'numeric')).to.be.true;
            expect(validate(123, 'numeric')).to.be.true;
        });
    });
    describe('specials', () => {
        it('should validate numbers', () => {
            expect(validate('abc*123*', 'specials 2')).to.be.true;
            expect(validate('$5.00', 'specials 2')).to.be.true;
            expect(validate('5.00', 'specials 2')).to.be.false;
            expect(validate('xyab', 'specials 0')).to.be.true;
        });
    });
    describe('startsWith', () => {
        it('should validate numbers', () => {
            expect(validate('abc123', 'startsWith abc'));
            expect(validate('abc123', 'startsWith ab'));
            expect(validate('abc123', 'startsWith a'));
        });
    });
});
