const express = require('express')
const router = express.Router()

const DriverController  = require('./controllers/DriverController')
const VehicleController = require('./controllers/VehicleController')

// //Motoristas
// router.get('/', (request, response) => {
//   response.send('OK')
// })

router.get('/driver', DriverController.index)
router.post('/driver', DriverController.create)
router.put('/driver/:id', DriverController.update)
router.delete('/driver/:id', DriverController.delete)

// //Veiculos
router.get('/vehicle', VehicleController.index)
router.post('/vehicle', VehicleController.create)
router.put('/vehicle/:id', VehicleController.update)
router.delete('/vehicle/:id', VehicleController.delete)

module.exports = router