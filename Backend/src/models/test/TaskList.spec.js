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
      const newTask = { title: "New Task" };
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
        .mockResolvedValueOnce([mockCreatedtask, []]);

      const result = await tasksModel.CreateTask(newTask);

      console.log("🔍 Result received:", result);
      console.log("🔍 Expected:", mockCreatedtask);

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

        expect(result).toBeDefined();

        expect(result).toEqual(mockCreatedtask);
    });
  });
});
