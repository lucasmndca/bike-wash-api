const { getAllServices, createService } = require("../../repository/services");
const { transaction } = require("../../helpers/transaction");

exports.getAllServices = (req, res) => {
  const { data, error } = transaction(() => getAllServices(req.query, req.pagination));

  if (error) {
    throw "Erro ao buscar serviço";
  }

  res.json(data);
};

exports.createServie = (req, res) => {
  const { data, error } = transaction(() => createService(req.body));

  if (error) {
    console.error(error)
    throw "Erro ao criar serviço";
  }

  res.json(data);
};
