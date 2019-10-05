'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 1337 //porta padr�o
const mysql = require('mysql');
const cors = require('cors')

//configurando o body parser para pegar POSTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

// Trata as requisições de login. Retorna o nome e o tipo de usuário.
app.post('/login', (req, res) => {
    var user = req.body.usuario;
    var pass = req.body.senha;
    console.log(user, pass);
    execSQLQuery(`SELECT nome,tipo FROM cadastro WHERE usuario = "${user}" AND senha = "${pass}"`, res);
    console.log(res);
})

app.post('/cadastro', (req, res) => {
    var type = req.body.tipo;
    var user = req.body.usuario;
    var name = req.body.nome;
    var mail = req.body.email;
    var phone = req.body.telefone;
    var sex = req.body.sexo;
    var postal = req.body.cep;
    var state = req.body.uf;
    var city = req.body.cidade;
    var street = req.body.rua;
    var number = req.body.numero;
    var neighbor = req.body.bairro;
    var pass = req.body.senha;
    // console.log(user, pass);
    execSQLQuery(`INSERT INTO cadastro (tipo,usuario,nome,email,telefone,sexo,cep,uf,cidade,rua,numero,bairro,senha) VALUES 
    ('${type}','${user}','${name}','${mail}','${phone}','${sex}','${postal}','${state}','${city}','${street}','${number}','${neighbor}','${pass}')`, res);
    console.log('Cadastrado');
})

app.get('/teste', (req, res) => {
    res.send({teste: 'testado'});
})


//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'mercado@verde',
        database: 'mercadoverde'
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('OK');
    });
}
