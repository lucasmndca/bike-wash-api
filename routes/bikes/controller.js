const { transaction } = require("../../helpers/transaction");
const {
  getClientBikes,
  createBike,
  getBikeById,
  disableBike,
  enableBike,
} = require("../../repository/bikes");

exports.getClientBikes = (req, res) => {
  const { data, error } = transaction(() =>
    getClientBikes(req.params.clientId, req.pagination)
  );

  if (error) {
    throw "Erro ao buscar motos do cliente";
  }

  res.json(data);
};

exports.getBike = (req, res) => {
  const { data, error } = transaction(() => getBikeById(req.params.bikeId));

  if (error) {
    throw "Erro ao buscar moto";
  }

  res.json(data);
};

exports.createBike = (req, res) => {
  const { data, error } = transaction(() => createBike(req.body));

  if (error) {
    throw "Erro ao criar bike";
  }

  res.status(201).json(data);
};

exports.disableBike = (req, res) => {
  const { data, error } = transaction(() => disableBike(req.params.bikeId));

  if (error) {
    throw "Erro ao desabilitar bike";
  }

  res.status(201).json(data);
};

exports.enableBike = (req, res) => {
  const { data, error } = transaction(() => enableBike(req.params.bikeId));

  if (error) {
    throw "Erro ao reabilitar bike";
  }

  res.status(201).json(data);
};
