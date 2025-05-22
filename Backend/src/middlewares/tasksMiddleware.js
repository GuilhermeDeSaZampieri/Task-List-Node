const connection = require("../models/connection");

const validateTitle = (req, resp, next) => {
  const { body } = req;

  if (body.title === undefined) {
    return resp.status(400).send({ error: "Titulo não pode ser vazio" });
  }
  if (!body.title.trim()) {
    return resp.status(400).send({ error: "Preencha corretamente" });
  }

  next();
};

const validateStatus = (req, resp, next) => {
  const { body } = req;

  if (body.status === undefined) {
    return resp.status(400).send({ error: "Status não pode ser vazio" });
  }

  if (!body.status.trim()) {
    return resp.status(400).send({ error: "Preencha corretamente" });
  }

  next();
};

const validateId = async (req, resp, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return resp.status(400).send({ error: "ID deve ser um número válido" });
  }

  try {
    const query = "SELECT id FROM tasks WHERE id = ?";
    const [result] = await connection.execute(query, [id]);

    if (result.length === 0) {
      return resp.status(404).json({ error: "Tarefa não encontrada" });
    }
    next();
  } catch (error) {
    return resp.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  validateTitle,
  validateStatus,
  validateId,
};
