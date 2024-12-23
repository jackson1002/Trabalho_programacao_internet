const fs = require('fs');
const path = require('path');


const usersPath = path.join(__dirname, '../routes/usuarios.json');


const readUsers = () => {
    if (!fs.existsSync(usersPath)) {
        fs.writeFileSync(usersPath, JSON.stringify([]));
    }
    const data = fs.readFileSync(usersPath);
    return JSON.parse(data);
};


const saveUsers = (users) => {
    console.log('Salvando usuários:', users);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
};




const login = (req, res) => {
    const {email, senha } = req.body;
    const arquivo = fs.readFileSync(usersPath)
   
    const dados = JSON.parse(arquivo)
   
    console.log(dados)
   
    for (const usuario of dados) {
        if (usuario.email === email && usuario.senha === senha) {
            return res.status(200).json({ message: 'Success', token: 'token' });
        }
    }


    return res.status(401).json({message: 'Credenciais Inválidas'})
}


const cadastro = (req, res) => {
    const {email, senha } = req.body;
    if (!email || !senha){
        return res.status(400).json({ message: "Email e senha são obrigatórios!" });
    }


    const users = readUsers();


    const userExists = users.find(user => user.email === email);


    if(userExists){
        return res.status(409).json({ message: " O email já está cadastrado!"})
    }


    users.push({ email, senha})
    saveUsers(users);


    return res.status(201).json({ message: "Usuario cadastrado com sucesso!"})
};
module.exports = {cadastro,login}
