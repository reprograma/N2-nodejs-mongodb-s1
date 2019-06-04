const mongoose = require("mongoose")

function connect (mongoUrl) {
  // padrao: mongodb://dominio:porta/database
  // "mongodb://localhost:27017/reprograma"
  mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true, useFindAndModify: false },
    function(error) {
      if(error){
        console.error("Ocorreu um erro ao conectar com o mongo: ", error)
      } else{
        console.log("Conexão feita com sucesso!!!")
      }
    }
  )
}

module.exports = { connect }
