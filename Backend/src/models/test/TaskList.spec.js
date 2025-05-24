const tasksModel = require("../tasksModels");
const connection = require("../connection");

jest.mock("../connection");

describe("Tasks Modell", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    test("should return all tasks", async () => {
      const mockTasks = [
        {
          id: 1,
          title: "Task 1",
          status: "pendente",
          created_at: "2023-01-01",
        },
        {
          id: 2,
          title: "Task 2",
          status: "concluida",
          created_at: "2023-01-02",
        },
      ];

      connection.execute.mockResolvedValue([mockTasks]);

      const result = await tasksModel.getAll();

      expect(connection.execute).toHaveBeenCalledWith("SELECT * FROM tasks");
      expect(result).toEqual(mockTasks);
    });

    test("should return empty array when no tasks exist", async () => {
      connection.execute.mockResolvedValue([[]]);

      const result = await tasksModel.getAll();

      expect(result).toEqual([]);
    });

    test("should throw error when database connection fails", async () => {
      connection.execute.mockRejectedValue(
        new Error("Database connection failed")
      );

      await expect(tasksModel.getAll()).rejects.toThrow(
        "Database connection failed"
      );
    });
  });

  describe("Create Task", () => {
    test("Create task sucessfully", async () => {
      const newTask = { title: 'New Task' };
      const mockInsertResult = {
        insertId: 1,
        affectedRows: 1,
        info: "",
        serverStatus: 2,
        warningStatus: 0,
      };
      const mockCreatedtask = {
        id: 1,
        title: "New Task",
        status: "pendente",
        created_at: expect.any(String),
      };

      connection.execute 
        .mockResolvedValueOnce([mockInsertResult, []])
        .mockResolvedValueOnce([[mockCreatedtask], []]);

      const result = await tasksModel.CreateTask(newTask);

      expect(connection.execute).toHaveBeenCalledTimes(2);

      expect(connection.execute).toHaveBeenNthCalledWith(
        1,
        "INSERT INTO tasks(title,status,created_at) VALUES (?,?,?)",
        ["New Task", "pendente", expect.any(String)]
      );

      expect(connection.execute).toHaveBeenNthCalledWith(
        2,
        "SELECT * FROM tasks WHERE id = ?",
        [1]
      );

        expect(result).toEqual(mockCreatedtask);
    });
    test('should handle database error during task creation', async () => {
            const newTask = { title: 'New Task' };
            connection.execute.mockRejectedValue(new Error('Insert failed'));

            await expect(tasksModel.CreateTask(newTask)).rejects.toThrow('Insert failed');
        });

        test('should create task with correct UTC date format', async () => {
            const newTask = { title: 'New Task' };
            const mockInsertResult = { insertId: 1 };
            const mockCreatedTask = { id: 1, title: 'New Task', status: 'pendente' };

            connection.execute
                .mockResolvedValueOnce([mockInsertResult])
                .mockResolvedValueOnce([[mockCreatedTask]]);

            const dateSpy = jest.spyOn(Date.prototype, 'toUTCString');

            await tasksModel.CreateTask(newTask);

            expect(dateSpy).toHaveBeenCalled();
            
            dateSpy.mockRestore();
        });
  });
 describe('deleteTask', () => {
        test('should delete task successfully', async () => {
            const taskId = 1;
            const mockDeleteResult = { affectedRows: 1 };
            connection.execute.mockResolvedValue([mockDeleteResult]);

            const result = await tasksModel.deleteTask(taskId);

            expect(connection.execute).toHaveBeenCalledWith('DELETE FROM tasks WHERE id = ?', [taskId]);
            expect(result).toEqual(mockDeleteResult);
        });

        test('should handle deletion of non-existent task', async () => {
            const taskId = 999;
            const mockDeleteResult = { affectedRows: 0 };
            connection.execute.mockResolvedValue([mockDeleteResult]);

            const result = await tasksModel.deleteTask(taskId);

            expect(result.affectedRows).toBe(0);
        });

        test('should handle database error during deletion', async () => {
            const taskId = 1;
            connection.execute.mockRejectedValue(new Error('Delete failed'));

            await expect(tasksModel.deleteTask(taskId)).rejects.toThrow('Delete failed');
        });
    });

    describe('updateTask', () => {
        test('should update task successfully', async () => {
            const taskId = 1;
            const updateData = { title: 'Updated Task', status: 'concluida' };
            const mockUpdatedTask = {
                id: 1,
                title: 'Updated Task',
                status: 'concluida',
                created_at: '2023-01-01'
            };

            connection.execute
                .mockResolvedValueOnce([{ affectedRows: 1 }])
                .mockResolvedValueOnce([[mockUpdatedTask]]); 

            const result = await tasksModel.updateTask(taskId, updateData);

            expect(connection.execute).toHaveBeenCalledTimes(2);
            
            expect(connection.execute).toHaveBeenNthCalledWith(1,
                'UPDATE tasks SET title = ?, status = ? WHERE id = ?',
                ['Updated Task', 'concluida', taskId]
            );
            
            expect(connection.execute).toHaveBeenNthCalledWith(2,
                'SELECT * FROM tasks WHERE id = ?',
                [taskId]
            );

            expect(result).toEqual(mockUpdatedTask);
        });

        test('should handle partial updates', async () => {
            const taskId = 1;
            const updateData = { title: 'Updated Title', status: undefined };
            const mockUpdatedTask = { id: 1, title: 'Updated Title', status: 'pendente' };

            connection.execute
                .mockResolvedValueOnce([{ affectedRows: 1 }])
                .mockResolvedValueOnce([[mockUpdatedTask]]);

            const result = await tasksModel.updateTask(taskId, updateData);

            expect(connection.execute).toHaveBeenNthCalledWith(1,
                'UPDATE tasks SET title = ?, status = ? WHERE id = ?',
                ['Updated Title', undefined, taskId]
            );
            expect(result).toEqual(mockUpdatedTask);
        });

        test('should handle update of non-existent task', async () => {
            const taskId = 999;
            const updateData = { title: 'Updated Task', status: 'concluida' };

            connection.execute
                .mockResolvedValueOnce([{ affectedRows: 0 }])
                .mockResolvedValueOnce([[]]);

            const result = await tasksModel.updateTask(taskId, updateData);

            expect(result).toBeUndefined();
        });

        test('should handle database error during update', async () => {
            const taskId = 1;
            const updateData = { title: 'Updated Task', status: 'concluida' };
            connection.execute.mockRejectedValue(new Error('Update failed'));

            await expect(tasksModel.updateTask(taskId, updateData)).rejects.toThrow('Update failed');
        });
    });

  
});
