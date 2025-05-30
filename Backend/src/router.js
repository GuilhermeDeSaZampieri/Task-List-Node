const express = require("express");

const router = express.Router();

const taskController = require("./controllers/taskController");
const tasksMiddleware = require("./middlewares/tasksMiddleware");

router.get("/tasks", taskController.getAll);
router.post(
  "/tasks",
  tasksMiddleware.validateTitle,
  taskController.CreateTask
);

router.delete(
  "/tasks/:id",
  tasksMiddleware.validateId,
  taskController.deleteTask
);

router.get(
  "/tasks/:id",
  tasksMiddleware.validateId,
);

router.put(
  "/tasks/:id",
  tasksMiddleware.validateId,
  tasksMiddleware.validateTitle,
  tasksMiddleware.validateStatus,
  taskController.updateTask
);

module.exports = router;
