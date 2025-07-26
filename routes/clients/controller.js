const { transaction } = require("../../helpers/transaction");
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  disableClient
} = require("../../repository/clients");

exports.getAllClients = (req, res) => {
  const { data, error } = transaction(() => getAllClients(req.query, req.pagination));

  if (error) {
    throw "Erro ao buscar clientes";
  }

  res.json(data);
};

exports.getClientById = (req, res) => {
  const { id } = req.params;
  const { data, error } = transaction(() => getClientById(id));

  if (error) {
    throw "Erro ao buscar cliente";
  }

  res.json(data);
};

exports.createClient = (req, res) => {
  const { data, error } = transaction(() => createClient(req.body));

  if (error) {
    throw "Erro ao criar cliente";
  }

  res.status(201).json(data);
};

exports.updateClient = (req, res) => {
  const { id } = req.params;
  const { data, error } = transaction(() => updateClient(id, req.body));

  if (error) {
    throw "Erro ao atualizar cliente";
  }

  res.json(data);
};

exports.disableClient = (req, res) => {
  const { id } = req.params;
  const { data, error } = transaction(() => disableClient(id));

  if (error) {
    throw "Erro ao desativar cliente";
  }

  res.json(data);
};
