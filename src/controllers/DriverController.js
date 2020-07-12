const db = require('../database/db');
const Driver = db.Mongoose.model('drivers', db.DriverSchema, 'drivers');

module.exports = {
  index(request, response){
    Driver.find({}).lean().exec(function(e,driver){
      response.json(driver);
   })
  },

  create(request, response){
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
      response.json(newDriver)
    })
  },

  update(request, response) {
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
  },

  delete(request, response){
    Driver.deleteOne({ _id: request.params.id })
    .then(() => {
      response.status(204).json({'Mensagem': 'Deletado com sucesso'})
    }).catch((err) => {
      response.status(500).json({'Erro': 'Erro ao deletar' + err})
    })
  }
}