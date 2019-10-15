/* Rota de alteração de cadastro do usuário Produtor */
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');
const bcrypt = require('bcrypt');
var pass = "";

function altProdutor(req, res) {
    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, senha, id, urlImagem } = req.body;
    bcrypt.hash(senha, 1, function (err, hash) {
        pass = hash;
    })

    const sqlQry = `UPDATE cadastro SET usuario='${usuario}', nome='${nome}', email='${email}', telefone='${telefone}', sexo='${sexo}', cep='${cep}', uf='${uf}',
    cidade='${cidade}', rua='${rua}', numero='${numero}', bairro='${bairro}', senha='${pass}', urlImagem='${urlImagem}' WHERE id='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            results = [{
                status: true,
                msg: 'Produtor alterado com sucesso.'
            }]
            res.json(results);
        }
    });
}

router.post('/', altProdutor);
module.exports = router;