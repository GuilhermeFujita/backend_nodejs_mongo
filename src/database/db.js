const { request } = require("express");

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/backend_nodejs')

var driverSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  cpf: String,
  dataNascimento: Date,
  status: {
    type: Boolean,
    default: true
  },
  dataCadastro:{
    type: Date,
    default: Date.now()

  },
  dataAtualizacao: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'drivers' }
);

var vehicleSchema = new mongoose.Schema({
  nomeProprietario: String,
  placa: String,
  renavam: String
}, { collection: 'vehicles' })

module.exports = { Mongoose: mongoose, DriverSchema: driverSchema, VehicleSchema: vehicleSchema}