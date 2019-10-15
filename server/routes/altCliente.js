/* Rota de alteração de cadastro do usuário Cliente */
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function altCliente(req, res) {

    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, senha, id } = req.body;

    const sqlQry = `UPDATE cadastro SET usuario='${usuario}', nome='${nome}', email='${email}', telefone='${telefone}', sexo='${sexo}', cep='${cep}', uf='${uf}',
    cidade='${cidade}', rua='${rua}', numero='${numero}', bairro='${bairro}', senha='${pass}' WHERE id='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            /* Lógica de tratamento da resposta */
            res.json(results);
        }
    });
}

router.post('/', altCliente);
module.exports = router;