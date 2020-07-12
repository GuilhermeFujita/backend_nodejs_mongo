const { request } = require("express");

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/backend_nodejs')

const driverSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  cpf: String,
  dataNascimento: Date,
  status: {
    type: Boolean,
    default: true
  }
}, { collection: 'drivers' }
);

const vehicleSchema = new mongoose.Mongoose.Schema({
  nomeProprietario: String,
  placa: String,
  renavan: String
}, { collection: 'vehicles' })