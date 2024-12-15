import request from 'supertest';
import { server } from '../server'; 
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
    if (server) {
        server.close();
    }
});

describe('Tasks API', () => {
    let taskId: string;

    it('should create a new task', async () => {
        const response = await request(server)
            .post('/api/tasks')
            .send({ title: 'Test Task', status: 'todo' });
        expect(response.status).toBe(201);
        expect(response.body.task).toHaveProperty('title', 'Test Task');
        taskId = response.body.task._id;
    });

    it('should get all tasks', async () => {
        const response = await request(server).get('/api/tasks');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should update a task', async () => {
        const response = await request(server)
            .put(`/api/tasks/${taskId}`)
            .send({ status: 'done' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task updated successfully!');
    });

    it('should delete a task', async () => {
        const response = await request(server).delete(`/api/tasks/${taskId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task deleted successfully!');
    });
});
