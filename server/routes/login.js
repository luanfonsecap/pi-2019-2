/* Rota de autenticação de login */
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function login(req, res) {
    var user = req.body.usuario;
    var pass = req.body.senha;

    connection.query(`SELECT nome,tipo FROM cadastro WHERE usuario = "${user}" AND senha = "${pass}"`, function (error, results, fields) {
        if (error){
            if(error.errno == 'ECONNREFUSED') {
                error = {
                    status: 500,
                    msg: 'Não foi possível conectar com a base de dados.'
                }
                console.log(error);
                res.json(error);
            }
            /* Outras lógicas de tratamento de erro. */
        } else {
            res.json(results);
            connection.end();
        }
    });
}

router.post('/', login);
module.exports = router;