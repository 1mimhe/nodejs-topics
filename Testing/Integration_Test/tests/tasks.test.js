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
            await Task.insertMany([
                { description: 'Task1' },
                { description: 'Task2' },
                { description: 'Task3' },
                { description: 'Task4' }
            ]);

            const res = await request(server).get('/api/tasks');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(4);
            expect(res.body.some((t) => t.description === 'Task1'));
        });
    });
    
    describe('GET /:id', () => {
        it('should return a task if valid id is passed', async () => {
            const task = new Task({ description: 'New Task' });
            await task.save();
            console.log('/api/tasks/' + task._id)
            const res = await request(server).get('/api/tasks/' + task._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('description', task.description);
        });
    });
});