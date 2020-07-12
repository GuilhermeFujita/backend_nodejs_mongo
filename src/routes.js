const express = require('express')
const router = express.Router()

const db = require('./database/db')
const Vehicle = db.Mongoose.model('vehicles', db.VehicleSchema, 'vehicles');

//Motoristas
router.get('/', (request, response) => {
  response.send('OK')
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
      //console.log(newVehicle)
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
  //console.log(request.params)
})


module.exports = router