const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

// Testing Numbers:
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

// Testing Strings:
describe('welcome', () => {
    it('should return the welcome message', () => {
        const result = lib.welcome('Mammad');
        expect(result).toMatch(/Mammad/);
        expect(result).toContain('Mammad');
    });
});

// Testing Arrays:
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

// Testing Objects:
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

// Testing Exceptions:
describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow();
        });
    });
});

// Using Mock Functions:
// In unit tests, we should not talk to external resources;
// So we use mock (fake) functions to test our code.
describe('getUser', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        // Mock function:
        db.getUserSync = function (username) {
            console.log('Fake reading costumer...');
            return { username, points: 20 };
        }

        const order = { userID: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

// Jest Mock Functions:
describe('notifyUser', () => {
    it('should send an email to costumer', () => {
        db.getUserSync = jest.fn().mockReturnValue({ email: 'a' });
        // if function was async:
        // jest.fn().mockResolvedValue();
        // jest.fn().mockRejectedValue();

        mail.send = jest.fn();

        lib.notifyUser({ userId: 'a' });

        expect(mail.send).toHaveBeenCalled(); // toHaveBeenCalledTimes(1);
        // expect(mail.send).toHaveBeenCalledWith(just strings, numbers,...);
        // or:
        // ...mock.calls[which call][which argument]
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});