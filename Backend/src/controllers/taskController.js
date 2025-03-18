const tasksModel = require('../models/tasksModels');

const getAll = async (_req, resp) => {

    const tasks = await tasksModel.getAll();

    return resp.status(200).json({tasks});
};

const CreateTask = async (req, resp) => {
    const createdTask = await tasksModel.CreateTask(req.body);
    return resp.status(201).json(createdTask);
};

const deleteTask = async (req, resp) => {
    const {id} =  req.params;
    
    await tasksModel.deleteTask(id);
    return resp.status(204).json({message: "Deletado com sucesso!"});
}

const updateTask = async (req, resp) => {
    const {id} =  req.params;
    
    await tasksModel.updateTask(id, req.body);
    return resp.status(204).json();
}

module.exports = {
    getAll,
    CreateTask,
    deleteTask,
    updateTask
    
};