"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskService = __importStar(require("../services/task.service"));
const taskDA = __importStar(require("../data-access/task.da"));
const mongoose_1 = __importDefault(require("mongoose"));
// Mock the Data Access Layer
jest.mock('../data-access/task.da');
describe('Task Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create a task successfully', async () => {
        const taskData = { title: 'Test Task', status: 'todo' };
        // Mock TaskDocument
        const mockTask = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            title: 'Test Task',
            status: 'todo',
            priority: 'medium',
            projectId: new mongoose_1.default.Types.ObjectId(),
            createdBy: new mongoose_1.default.Types.ObjectId(),
            assignedTo: [],
            dependentTasks: [],
        };
        taskDA.createTask.mockResolvedValue(mockTask);
        const result = await taskService.createTaskUC(taskData);
        expect(result).toHaveProperty('_id');
        expect(result.title).toBe('Test Task');
    });
    it('should throw an error when task is not found', async () => {
        taskDA.getTask.mockResolvedValue(null);
        await expect(taskService.getTaskUC({ id: '123' })).rejects.toThrow('Task not found');
    });
});
