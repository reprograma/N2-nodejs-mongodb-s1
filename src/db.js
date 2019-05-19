const mongoose = require('mongoose')
const MONGO_URL = 'mongodb://localhost:27017/reprograma'

function connect (mongoUrl) {
  // 'mongodb://localhost:27017/reprograma'
  mongoose.connect(mongoUrl, { useNewUrlParser: true })

  var db = mongoose.connection
  //db.on("error", console.error.bind(console, "Erro de conexão:"))
  db.on('error', console.log)
  db.once('open', function() {
    console.log('Conexão feita com sucesso!')
  })
}

module.exports = { connect }
