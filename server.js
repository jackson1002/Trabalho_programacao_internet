const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express()
const PORT = 3000;


//middleware para ler as requisições HTTP que vierem do front
app.use(bodyParser.json())

//Rotas(Isso aqui é o endereço que você vai chamar no front,isso o que vai ser executado)
app.use('./api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta http://localhost:3000`) //Antes era console.log(`Servidor rodando na porta ${PORT}`)mostrando essa mensagem no terminal,mostrando a porta 3000  
})