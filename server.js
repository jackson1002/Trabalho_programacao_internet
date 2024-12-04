const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
const authRoutes = require ('./routes/auth');
const { readUsers } = require('./controllers/authController');


const app = express()
const PORT = 3001;


app.use(cors());


//middleware para ler as requisições HTTP que vierem do front
app.use(bodyParser.json())


//rotas (endreço que vai chamra no front, o que vai ser executado)
app.use('/api/auth', authRoutes);


app.get('/api/users', (req, res) => {
    try {
        const users = readUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao ler os usuários', error: error.message });
    }
});


app.listen(PORT, ()=>{
    console.log(`Servidor rodando na outra porta ${PORT}`)
})
