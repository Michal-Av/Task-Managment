"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
let mongoServer;
beforeAll(async () => {
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose_1.default.connect(uri);
});
afterAll(async () => {
    await mongoose_1.default.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
    if (server_1.server) {
        server_1.server.close();
    }
});
describe('Tasks API', () => {
    let taskId;
    it('should create a new task', async () => {
        const response = await (0, supertest_1.default)(server_1.server)
            .post('/api/tasks')
            .send({ title: 'Test Task', status: 'todo' });
        expect(response.status).toBe(201);
        expect(response.body.task).toHaveProperty('title', 'Test Task');
        taskId = response.body.task._id;
    });
    it('should get all tasks', async () => {
        const response = await (0, supertest_1.default)(server_1.server).get('/api/tasks');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    it('should update a task', async () => {
        const response = await (0, supertest_1.default)(server_1.server)
            .put(`/api/tasks/${taskId}`)
            .send({ status: 'done' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task updated successfully!');
    });
    it('should delete a task', async () => {
        const response = await (0, supertest_1.default)(server_1.server).delete(`/api/tasks/${taskId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task deleted successfully!');
    });
});
