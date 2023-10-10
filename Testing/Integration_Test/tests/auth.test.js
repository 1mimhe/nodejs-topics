
const User = require('../User');
const auth = require('../auth');
const mongoose = require('mongoose');


// This is a Unit Test
describe('auth middleware', () => {
    it('should populate req.user with the payload of a valid jwt', () => {
        const user = {
            _id: new mongoose.Types.ObjectId().toHexString()
        };
        const token = new User(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next = jest.fn();

        auth(req, res, next);

        expect(req.user).toMatchObject(user);
    });
});