const express = require("express");
const maravilhosas = require("./schema.js");
const bodyParser = require('body-parser');

const db =  require("./repository.js");

const PORT = process.env.PORT || 5000;
const MONGO_URL = "mongodb://localhost:27017/reprograma";
// padrao: mongodb://dominio:porta/database

db.connect(MONGO_URL)

const app = express();
app.use(bodyParser.json());

app.get("/maravilhosas", (req, res) => {
  maravilhosas.find((error, response) => {
    // preciso tratar o erro, caso ocorra
    if (error) {
      // caso tenha algum erro
      return res.status(500).send(error);
    }
    // caso contrário, envio o retorno
    res.status(200).send(response);
  });
})

app.get("/maravilhosas/:id", (req, res) => {
  maravilhosas.findById(
    req.params.id,
    function (err, maravilhosa) {
      if (err) return res.send(err);

      if(!maravilhosa) return res.status(404).send({});
console.log('*** maravilhosa.id:', maravilhosa.id)
      res.send(maravilhosa);
    }
  );
});

app.post("/maravilhosas", (req, res) => {
  const novaMaravilhosa = new maravilhosas({
    nome: req.body.nome,
    bio: req.body.bio,
    avatar: req.body.avatar,
  });
  
  novaMaravilhosa.save(err => {
    if (err) return res.send(err);
  
    res.send(novaMaravilhosa);
  });
});

// app.put("/maravilhosas/:id", (req, res) => {
//   maravilhosas.findByIdAndUpdate(
//     req.params.id,
//     { $set: req.body },
//     { new: true },
//     function(error, maravilhosa) {
//       if (error) return res.status(error.code).send(error.message);
//       res.send(maravilhosa);
//     }
//   );
// })

app.patch("/maravilhosas/:id", (req, res) => {
  maravilhosas.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    function(error, maravilhosa) {
      if (error) {
        let errorCode = error.code
        if(!error.code){
          errorCode = 400 // Bad Request
        }
        return res.status(errorCode).send(error.message);
      }

      res.send(maravilhosa);
    }
  );
})

app.delete("/maravilhosas/:id", (req, res) => {
  maravilhosas.findByIdAndDelete(
    req.params.id,
    { $set: req.body },
    function(err, maravilhosa) {
      if (err) return res.status(err.code).send(err.message);
      res.send(maravilhosa);
    }
  );
});



app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}...`));
