const lib = require('../lib');

// Testing numbers:
describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

// or:
// test('absolute - should return a positive number if input is positive', () => {
//     const result = lib.absolute(1);
//     expect(result).toBe(1);
// });
// ...

// Testing strings:
describe('welcome', () => {
    it('should return the welcome message', () => {
        const result = lib.welcome('Mammad');
        expect(result).toMatch(/Mammad/);
        expect(result).toContain('Mammad');
    });
});

// Testing arrays:
describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // To general:
        // expected(result).toBeDefined();
        // expected(result).not.toBeNull();

        // Ideal way:
        expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
    });
});

// Testing objects:
describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct();

        // toBe() vs. toEqual()
        expect(result).toBe({ id: 1, price: 10, category: 'a' });
        // FAILED: because this two object's references are not the same.
        expect(result).toEqual({ id: 1, price: 10, category: 'a' });
        // PASSED: because this object has the same properties.

        expect(result).toHaveProperty('id', 1);
        // PASSED: because this property exists in the object.
        expect(result).toMatchObject({ id: 1, price: 10 });
        // PASSED: because this object matches a subset of the properties of the object.
    });
});