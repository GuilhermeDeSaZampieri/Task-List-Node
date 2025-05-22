const tasksModel = require("../models/tasksModels");

const getAll = async (_req, resp) => {
  try {
    const tasks = await tasksModel.getAll();
    return resp.status(200).json({ tasks });
  } catch (error) {
    return resp.status(500).send({ error: "Erro ao Econtrar tarefa" });
  }
};

const CreateTask = async (req, resp) => {
  try {
    const createdTask = await tasksModel.CreateTask(req.body);
    return resp.status(201).json(createdTask);
  } catch (error) {
    return resp.status(500).send({ error: "Erro ao Cadastrar tarefa" });
  }
};

const deleteTask = async (req, resp) => {
  const { id } = req.params;

  try {
    await tasksModel.deleteTask(id);
    return resp.status(200).send({ message: "Deletado com sucesso!"});
  } catch (error) {
    return resp.status(500).send({ error: "Erro ao deletar tarefa" });
  }
};

const updateTask = async (req, resp) => {
  try {
    const { id } = req.params;

    const update = await tasksModel.updateTask(id, req.body);
    return resp.status(201).json(update);
  } catch (error) {
    return resp.status(500).send({ error: "Erro ao Atualizar tarefa" });
  }
};

module.exports = {
  getAll,
  CreateTask,
  deleteTask,
  updateTask,
};
