const tasksController = require('../taskController'); 
const tasksModel = require('../../models/tasksModels');

// Mock do model
jest.mock('../../models/tasksModels');

describe('Tasks Controller', () => {
  
  let mockReq, mockRes;

  beforeEach(() => {

    jest.clearAllMocks();
    
    mockReq = {
      body: {},
      params: {}
    };
    
    // Mock do res com métodos chainable
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  describe('getAll', () => {
    
    test('should return all tasks successfully', async () => {
      // Arrange
      const mockTasks = [
        { id: 1, title: 'Task 1', status: 'pendente', created_at: '2024-01-01' },
        { id: 2, title: 'Task 2', status: 'concluida', created_at: '2024-01-02' }
      ];
      
      tasksModel.getAll.mockResolvedValue(mockTasks);

      // Act
      await tasksController.getAll(mockReq, mockRes);

      // Assert
      expect(tasksModel.getAll).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ tasks: mockTasks });
    });

    test('should return empty array when no tasks exist', async () => {
      // Arrange
      tasksModel.getAll.mockResolvedValue([]);

      // Act
      await tasksController.getAll(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ tasks: [] });
    });

    test('should handle database errors', async () => {
      // Arrange
      tasksModel.getAll.mockRejectedValue(new Error('Database connection failed'));

      // Act
      await tasksController.getAll(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao Econtrar tarefa" 
      });
    });

    test('should handle unexpected errors', async () => {
      // Arrange
      tasksModel.getAll.mockRejectedValue(new Error('Unexpected error'));

      // Act
      await tasksController.getAll(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao Econtrar tarefa" 
      });
    });
  });

  describe('CreateTask', () => {
    
    test('should create task successfully', async () => {
      // Arrange
      const taskData = { title: 'New Task' };
      const createdTask = {
        id: 1,
        title: 'New Task',
        status: 'pendente',
        created_at: '2024-01-01 10:30:00'
      };
      
      mockReq.body = taskData;
      tasksModel.CreateTask.mockResolvedValue(createdTask);

      // Act
      await tasksController.CreateTask(mockReq, mockRes);

      // Assert
      expect(tasksModel.CreateTask).toHaveBeenCalledWith(taskData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(createdTask);
    });

    test('should handle creation with complete task data', async () => {
      // Arrange
      const taskData = { 
        title: 'Complete Task',
        description: 'Task with description'
      };
      const createdTask = {
        id: 2,
        title: 'Complete Task',
        status: 'pendente',
        created_at: '2024-01-01 11:00:00'
      };
      
      mockReq.body = taskData;
      tasksModel.CreateTask.mockResolvedValue(createdTask);

      // Act
      await tasksController.CreateTask(mockReq, mockRes);

      // Assert
      expect(tasksModel.CreateTask).toHaveBeenCalledWith(taskData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(createdTask);
    });

    test('should handle model errors during creation', async () => {
      // Arrange
      mockReq.body = { title: 'Error Task' };
      tasksModel.CreateTask.mockRejectedValue(new Error('Title is required'));

      // Act
      await tasksController.CreateTask(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao Cadastrar tarefa" 
      });
    });

    test('should handle database errors during creation', async () => {
      // Arrange
      mockReq.body = { title: 'DB Error Task' };
      tasksModel.CreateTask.mockRejectedValue(new Error('Database connection failed'));

      // Act
      await tasksController.CreateTask(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao Cadastrar tarefa" 
      });
    });

    test('should handle empty request body', async () => {
      // Arrange
      mockReq.body = {};
      tasksModel.CreateTask.mockRejectedValue(new Error('Title is required'));

      // Act
      await tasksController.CreateTask(mockReq, mockRes);

      // Assert
      expect(tasksModel.CreateTask).toHaveBeenCalledWith({});
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao Cadastrar tarefa" 
      });
    });
  });

  describe('deleteTask', () => {
    
    test('should delete task successfully', async () => {
      // Arrange
      const taskId = '1';
      mockReq.params = { id: taskId };
      tasksModel.deleteTask.mockResolvedValue({ affectedRows: 1 });

      // Act
      await tasksController.deleteTask(mockReq, mockRes);

      // Assert
      expect(tasksModel.deleteTask).toHaveBeenCalledWith(taskId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: "Deletado com sucesso!" 
      });
    });

    test('should handle deletion of non-existent task', async () => {
      // Arrange
      const taskId = '999';
      mockReq.params = { id: taskId };
      tasksModel.deleteTask.mockResolvedValue({ affectedRows: 0 });

      // Act
      await tasksController.deleteTask(mockReq, mockRes);

      // Assert
      expect(tasksModel.deleteTask).toHaveBeenCalledWith(taskId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        message: "Deletado com sucesso!" 
      });
    });

    test('should handle database errors during deletion', async () => {
      // Arrange
      const taskId = '1';
      mockReq.params = { id: taskId };
      tasksModel.deleteTask.mockRejectedValue(new Error('Database error'));

      // Act
      await tasksController.deleteTask(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao deletar tarefa" 
      });
    });

    test('should handle missing id parameter', async () => {
      // Arrange
      mockReq.params = {}; // ID ausente
      tasksModel.deleteTask.mockRejectedValue(new Error('ID is required'));

      // Act
      await tasksController.deleteTask(mockReq, mockRes);

      // Assert
      expect(tasksModel.deleteTask).toHaveBeenCalledWith(undefined);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao deletar tarefa" 
      });
    });

    test('should handle invalid id format', async () => {
      // Arrange
      const taskId = 'invalid-id';
      mockReq.params = { id: taskId };
      tasksModel.deleteTask.mockRejectedValue(new Error('Invalid ID format'));

      // Act
      await tasksController.deleteTask(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao deletar tarefa" 
      });
    });
  });

  describe('updateTask', () => {
    
    test('should update task successfully', async () => {
      // Arrange
      const taskId = '1';
      const updateData = { title: 'Updated Task', status: 'concluida' };
      const updatedTask = {
        id: 1,
        title: 'Updated Task',
        status: 'concluida',
        created_at: '2024-01-01 10:30:00'
      };
      
      mockReq.params = { id: taskId };
      mockReq.body = updateData;
      tasksModel.updateTask.mockResolvedValue(updatedTask);

      // Act
      await tasksController.updateTask(mockReq, mockRes);

      // Assert
      expect(tasksModel.updateTask).toHaveBeenCalledWith(taskId, updateData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(updatedTask);
    });

    test('should handle partial updates', async () => {
      // Arrange
      const taskId = '2';
      const updateData = { status: 'concluida' }; // Só mudando status
      const updatedTask = {
        id: 2,
        title: 'Original Title',
        status: 'concluida',
        created_at: '2024-01-01 09:00:00'
      };
      
      mockReq.params = { id: taskId };
      mockReq.body = updateData;
      tasksModel.updateTask.mockResolvedValue(updatedTask);

      // Act
      await tasksController.updateTask(mockReq, mockRes);

      // Assert
      expect(tasksModel.updateTask).toHaveBeenCalledWith(taskId, updateData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(updatedTask);
    });

    test('should handle update of non-existent task', async () => {
      // Arrange
      const taskId = '999';
      const updateData = { title: 'Non-existent Task' };
      
      mockReq.params = { id: taskId };
      mockReq.body = updateData;
      tasksModel.updateTask.mockResolvedValue(undefined); // Task não encontrada

      // Act
      await tasksController.updateTask(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(undefined);
    });

    test('should handle database errors during update', async () => {
      // Arrange
      const taskId = '1';
      const updateData = { title: 'Error Task' };
      
      mockReq.params = { id: taskId };
      mockReq.body = updateData;
      tasksModel.updateTask.mockRejectedValue(new Error('Database connection failed'));

      // Act
      await tasksController.updateTask(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao Atualizar tarefa" 
      });
    });

    test('should handle empty update data', async () => {
      // Arrange
      const taskId = '1';
      const updateData = {};
      
      mockReq.params = { id: taskId };
      mockReq.body = updateData;
      tasksModel.updateTask.mockRejectedValue(new Error('No data to update'));

      // Act
      await tasksController.updateTask(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao Atualizar tarefa" 
      });
    });

    test('should handle missing id parameter', async () => {
      // Arrange
      mockReq.params = {}; // ID ausente
      mockReq.body = { title: 'Update Task' };
      tasksModel.updateTask.mockRejectedValue(new Error('ID is required'));

      // Act
      await tasksController.updateTask(mockReq, mockRes);

      // Assert
      expect(tasksModel.updateTask).toHaveBeenCalledWith(undefined, { title: 'Update Task' });
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ 
        error: "Erro ao Atualizar tarefa" 
      });
    });
  });
});