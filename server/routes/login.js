/* Rota de autenticação de login */
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');
const bcrypt = require('bcrypt');

function login(req, res) {

    const { usuario, senha } = req.body;

    connection.query(`SELECT nome,senha,tipo,urlImagem,id,cidade FROM cadastro WHERE usuario = "${usuario}"`, function (error, results, fields) {
        if (error){
            if(error.errno == 'ECONNREFUSED') {
                error = {
                    status: 500,
                    msg: 'Não foi possível conectar com a base de dados.'
                }
                res.json(error);
            } else {
                res.json(error);
            }
            /* Outras lógicas de tratamento de erro. */
        } else {
            if(results.length === 0) {
                results = [{
                    status: false,
                    msg: 'Usuário inexistente.'
                }]
                res.json(results);
            } else {
                if (bcrypt.compareSync(senha, results[0].senha)) {
                    results[0].status = true;
                    console.log(results);
                    res.json(results);
                } else {
                    console.log(results);
                    results = [{
                        status: false,
                        msg: 'Senha incorreta.'
                    }]
                    res.json(results);
                }
            }
        }
    });
}

router.post('/', login);
module.exports = router;