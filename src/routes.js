const express = require('express')
const router = express.Router()

const db = require('./database/db')
//console.log(db)
const Vehicle = db.Mongoose.model('vehicles', db.VehicleSchema, 'vehicles');

//Motoristas
router.get('/', (request, response) => {
  response.send('OK')
})

//Veiculos
//Listar veiculos
router.get('/vehicle', (request, response) => {
  response.send(Vehicle.find({}))
})

// Cadastrar veiculo
router.post('/vehicle', (request, response) => {
  const newVehicle = new Vehicle({ 
     nomeProprietario: request.body.nomeProprietario,
     placa: request.body.placa,
     renavam: request.body.renavam
    });
    console.log(newVehicle)
    newVehicle.save(function(err){
      if(err){
        response.status(500).json({ 'message': 'Erro'+ err })
        return
      }
      console.log(newVehicle)
      response.json(newVehicle)
    })
})

//Atualizar veiculo

//Deletar veiculo


module.exports = router