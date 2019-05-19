const mongoose = require("mongoose");

// cada schema equivale a uma coleção
var Schema = mongoose.Schema;

// crio uma nova coleção
var MaravilhosaSchema = new Schema({
  // identifico que o _id, será o id gerado pelo banco
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  nome: { type: String, required: true },
  bio: { type: String, required: true },
  avatar: { type: String, required: true } // link para a foto de avatar
  // desafio: salvar a imagem dentro do banco (fica: base64)

  /*
    nascimento: { type: Date, default: Date.now },
    idade: { type: Number },
    maravilhosa: { type: Boolean },
    lacres: [{ local: String, data: Date }],
  */
});

// retorno o _id no campo id para manter compatibilidade com o front
MaravilhosaSchema.virtual("id").get(function() {
  return this._id;
});

// exporto este módulo
const maravilhosas = mongoose.model("maravilhosas", MaravilhosaSchema);

module.exports = maravilhosas;
