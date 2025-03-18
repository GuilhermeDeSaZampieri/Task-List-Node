const express = require("express");


const router = express.Router();

const taskController = require("./controllers/taskController");
const tasksMiddleware = require('./middlewares/tasksMiddleware');

router.get('/tasks/get', taskController.getAll);
router.post('/tasks/post', tasksMiddleware.validateTitle ,taskController.CreateTask);
router.delete('/tasks/delete/:id' ,taskController.deleteTask);
router.put('/tasks/put/:id' ,tasksMiddleware.validateTitle,tasksMiddleware.validateStatus,taskController.updateTask);



module.exports = router;