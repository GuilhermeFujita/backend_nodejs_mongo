const express = require('express')
const router = express.Router()

const db = require('./database/db')
//console.log(db)
var Driver = db.Mongoose.model('drivers', db.DriverSchema, 'drivers');

//Motoristas
router.get('/', (request, response) => {
  response.send('OK')
})

//Veiculos
//Listar veiculos
router.get('/vehicle', (request, response) => {

})

// Cadastrar veiculo
router.post('/vehicle', (request, response) => {
  const newVehicle = new Driver({ 
    nome_proprietario: request.body.nome_proprietario,
     placa: request.body.placa,
     renavam: request.body.renavam
    });
    console.log(newVehicle)
    // newVehicle.save(function(err){
    //   if(err){
    //     response.status(500).json({ 'message': 'Erro'+ err })
    //     return
    //   }
    //   console.log(newVehicle)
    //   response.json(newVehicle)
    // })
})

module.exports = router