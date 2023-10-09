const request = require('supertest');

let server;
const Task = require('../Task');
const User = require('../User');

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

            const res = await request(server).get('/api/tasks/' + task._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('description', task.description);
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/tasks/1');

            expect(res.status).toBe(404);
        });
    });

    // Test Authorization
    describe('POST /', () => {
        it('should return 401 if client is not logged in', async () => {
            const res = await request(server)
                .post('/api/tasks')
                // .send({ description: 'NEW TASK' });

            expect(res.status).toBe(401);
        });

        it('should return 400 if description is not required', async () => {
            const token = new User().generateAuthToken();

            const res = await request(server)
                .post('/api/tasks')
                .set('X-Auth_Token', token)
                .send({});

            expect(res.status).toBe(400);
        });

        it('should save the task if it is valid', async () => {
            const token = new User().generateAuthToken();

            const res = await request(server)
                .post('/api/tasks')
                .set('X-Auth_Token', token)
                .send({ description: 'NEW TASK' });

            const task = await Task.find({ description: 'NEW TASK' });

            expect(task).not.toBeNull();
            expect(res.status).toBe(201);
        });

        it('should return the task if it is valid', async () => {
            const token = new User().generateAuthToken();

            const res = await request(server)
                .post('/api/tasks')
                .set('X-Auth_Token', token)
                .send({ description: 'NEW TASK' });

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('description');
        });
    });
});

// For Clean Test (My Tests are not clean!):
// Define the happy path, and then in each test, we change
// one parameter that clearly aligns with the name of the
// test.