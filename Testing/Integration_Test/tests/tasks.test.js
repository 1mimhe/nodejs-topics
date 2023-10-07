const request = require('supertest');

let server;
const Task = require('../Task');

describe('/api/tasks', () => {
    // 'jest' call this function before/after each test
    beforeEach(() => {
        server = require('../tasks');
    });
    afterEach(async () => {
       server.close();
       await Task.deleteMany({}); // we should remove our added data after test.
    });

    describe('GET /', () => {
        it('should return all tasks', async () => {
            await Task.collection.insertMany([
                { description: 'Task1' },
                { description: 'Task2' },
                { description: 'Task3' },
                { description: 'Task4' }
            ]);

            const res = await request(server).get('/api/tasks');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(4);
        });
    });
});