const express = require('express')
const router = express.Router()

const db = require('./database/db');
const Vehicle = db.Mongoose.model('vehicles', db.VehicleSchema, 'vehicles');
const Driver = db.Mongoose.model('drivers', db.DriverSchema, 'drivers');

//Motoristas
router.get('/', (request, response) => {
  response.send('OK')
})

//Buscar todos os motoristas
router.get('/driver', (request, response) => {
  Driver.find({}).lean().exec(function(e,driver){
    response.json(driver);
 });
})

//Cadastrar motorista
router.post('/driver', (request, response) => {
  const newDriver = new Driver({
    nome: request.body.nome,
    sobrenome: request.body.sobrenome,
    cpf: request.body.cpf,
    dataNascimento: new Date(request.body.dataNascimento)
  })

  newDriver.save(function(err){
    if(err){
      response.status(500).json({ 'message': 'Erro'+ err })
      return
    }
    // console.log(newDriver)
    response.json(newDriver)
  })
})

// Atualizar motorista
router.put('/driver/:id', (request, response) => {
  let status =  request.body.status
  if(!status){
    status =  false
  }
  else{
    status = true
  }

  Driver.findByIdAndUpdate(request.params.id, {
    $set:{
      nome: request.body.nome,
      sobrenome: request.body.sobrenome,
      cpf: request.body.cpf,
      dataNascimento: new Date(request.body.dataNascimento),
      status: status
    }
  }).then(() => {
    response.json({ 'Mensagem': 'Dados do motorista atualizados com sucesso' })
  }).catch((err) => {
    response.json({'Erro': 'Erro ao atualizar os dados do motorista' + err})
  })
})


//Deletar motorista
router.delete('/driver/:id', (request, response) => {
  Driver.deleteOne({ _id: request.params.id })
    .then(() => {
      response.status(204).json({'Mensagem': 'Deletado com sucesso'})
    }).catch((err) => {
      response.status(500).json({'Erro': 'Erro ao deletar' + err})
    })
})

//Veiculos
//Listar veiculos
router.get('/vehicle', (request, response) => {
  Vehicle.find({}).lean().exec(function(e,vehicles){
    response.json(vehicles);
 });
})

// Cadastrar veiculo
router.post('/vehicle', (request, response) => {
  const newVehicle = new Vehicle({ 
     nomeProprietario: request.body.nomeProprietario,
     placa: request.body.placa,
     renavam: request.body.renavam
    });
    // console.log(newVehicle)
    newVehicle.save(function(err){
      if(err){
        response.status(500).json({ 'message': 'Erro'+ err })
        return
      }
      response.json(newVehicle)
    })
})

//Atualizar veiculo
router.put('/vehicle/:id', (request, response) => {
  Vehicle.findByIdAndUpdate(request.params.id, {
    $set:{
      nomeProprietario: request.body.nomeProprietario,
      placa: request.body.placa,
      renavam: request.body.renavam
    }
  }).then(() => {
    response.json({ 'Mensagem': 'Dados do veiculo atualizados com sucesso' })
  }).catch((err) => {
    response.json({'Erro': 'Erro ao atualizar os dados do veiculo' + err})
  })
})

//Deletar veiculo
router.delete('/vehicle/:id', (request, response) => {
  Vehicle.deleteOne({ _id: request.params.id })
    .then(() => {
      response.status(204).json({'Mensagem': 'Deletado com sucesso'})
    }).catch((err) => {
      response.status(500).json({'Erro': 'Erro ao deletar' + err})
    })
})


module.exports = router