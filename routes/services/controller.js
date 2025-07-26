const { getAllServices } = require("../../repository/services");
const { transaction } = require("../../helpers/transaction");

exports.getAllServices = (req, res) => {
  const { data, error } = transaction(() => getAllServices(req.query, req.pagination));

  if (error) {
    throw "Erro ao buscar clientes";
  }

  res.json(data);
};
