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

app.post('/login', (req, res) => {
    var user = req.body.usuario;
    var pass = req.body.senha;
    console.log(user, pass);
    execSQLQuery(`SELECT nome,tipo FROM cadastro WHERE usuario = "${user}" AND senha = "${pass}"`, res);
    console.log(res);
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