import * as taskService from '../services/task.service';
import * as taskDA from '../data-access/task.da';
import { TaskDocument } from '../models/task.model';
import mongoose from 'mongoose';

// Mock the Data Access Layer
jest.mock('../data-access/task.da');

describe('Task Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a task successfully', async () => {
        const taskData = { title: 'Test Task', status: 'todo' };
    
        // Mock TaskDocument
        const mockTask: Partial<TaskDocument> = {
            _id: new mongoose.Types.ObjectId().toString(),
            title: 'Test Task',
            status: 'todo',
            priority: 'medium',
            projectId: new mongoose.Types.ObjectId(),
            createdBy: new mongoose.Types.ObjectId(),
            assignedTo: [],
            dependentTasks: [],
        };
    
        (taskDA.createTask as jest.MockedFunction<typeof taskDA.createTask>).mockResolvedValue(mockTask as TaskDocument);
    
        const result = await taskService.createTaskUC(taskData);
        expect(result).toHaveProperty('_id');
        expect(result.title).toBe('Test Task');
    });
    
    

    it('should throw an error when task is not found', async () => {
        (taskDA.getTask as jest.MockedFunction<typeof taskDA.getTask>).mockResolvedValue(null);

        await expect(taskService.getTaskUC({ id: '123' })).rejects.toThrow('Task not found');
    });
});
