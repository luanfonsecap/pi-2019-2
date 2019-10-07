'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 1337 //porta padr�o
const mysql = require('mysql');
const cors = require('cors');

//configurando o body parser para pegar POSTS
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

app.post('/cadastroCliente', (req, res) => {

    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, senha, urlImagem } = req.body;

    const type = 'C';
    const user = usuario;
    const name = nome;
    const mail = email;
    const phone = telefone;
    const sex = sexo;
    const postal = cep;
    const state = uf;
    const city = cidade;
    const street = rua;
    const number = numero;
    const neighbor = bairro;
    const pass = senha;
    const url = urlImagem

    execSQLQuery(`INSERT INTO cadastro (tipo,usuario,nome,email,telefone,sexo,cep,uf,cidade,rua,numero,bairro,senha, urlImagem) VALUES 
    ('${type}','${user}','${name}','${mail}','${phone}','${sex}','${postal}','${state}','${city}','${street}','${number}','${neighbor}','${pass}', '${url}')`, res);
    console.log('Cadastrado');
})

app.post('/cadastroProdutor', (req, res) => {

    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, senha, urlImagem } = req.body;

    const type = 'P';
    const user = usuario;
    const name = nome;
    const mail = email;
    const phone = telefone;
    const sex = sexo;
    const postal = cep;
    const state = uf;
    const city = cidade;
    const street = rua;
    const number = numero;
    const neighbor = bairro;
    const pass = senha;
    const url = urlImagem

    execSQLQuery(`INSERT INTO cadastro (tipo,usuario,nome,email,telefone,sexo,cep,uf,cidade,rua,numero,bairro,senha) VALUES 
    ('${type}','${user}','${name}','${mail}','${phone}','${sex}','${postal}','${state}','${city}','${street}','${number}','${neighbor}','${pass}', '${url}')`, res);
    console.log('Cadastrado');
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
        console.log(results);
        console.log('OK');
    });
}