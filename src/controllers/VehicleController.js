const db = require('../database/db');
const Vehicle = db.Mongoose.model('vehicles', db.VehicleSchema, 'vehicles');

module.exports = {
  index(request, response){
    Vehicle.find({}).lean().exec(function(e,vehicles){
      response.json(vehicles);
   })
  },

  create(request, response) {
    const newVehicle = new Vehicle({ 
      nomeProprietario: request.body.nomeProprietario,
      placa: request.body.placa,
      renavam: request.body.renavam
     });

     newVehicle.save(function(err){
       if(err){
         response.status(500).json({ 'message': 'Erro'+ err })
         return
       }
       response.json(newVehicle)
     })
  },

  update(request, response){
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
  },

  delete(request, response) {
    Vehicle.deleteOne({ _id: request.params.id })
    .then(() => {
      response.status(204).json({'Mensagem': 'Deletado com sucesso'})
    }).catch((err) => {
      response.status(500).json({'Erro': 'Erro ao deletar' + err})
    })
  }
}