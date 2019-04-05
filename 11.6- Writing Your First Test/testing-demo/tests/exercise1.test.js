const exercise1 = require('../exercise1');
const fizz = exercise1.fizzBuzz;

describe('fizzBuzz', () => {
    it('should throw if input is not a number', () => {
        expect(() => {fizz("a")} ).toThrow();
        expect(() => {fizz(null)} ).toThrow();
        expect(() => {fizz(undefined)} ).toThrow();
    });

    it('should return FizzBuzz if the input is divisible by 3 and 5', () => {
        const result = fizz(15);
        expect(result).toBe("FizzBuzz");
    });

    it('should return Fizz if the input is divisible by 3', () => {
        const result = fizz(3);
        expect(result).toBe("Fizz");
    });

    it('should return Buzz if the input is divisible by 5', () => {
        const result = fizz(5);
        expect(result).toBe("Buzz");
    });

    it('should return the input if it is not divisible by 3 or 5', () => {
        const result = fizz(1);
        expect(result).toBe(1);
    })
});