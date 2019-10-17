/* Rota de alteração de cadastro*/
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');
const bcrypt = require('bcrypt');
var pass = "";

function altCliente(req, res) {
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
                msg: 'Cliente alterado com sucesso!'
            }]
            res.json(results);
        }
    });
}

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

function altProduto(req, res) {
    const { id, nome, valor, unidades, kg, id_produtor } = req.body;
    const sqlQry = `UPDATE produtos SET nome='${nome}', valor='${valor}', unidades='${unidades}', kg='${kg}' WHERE id='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            results = [{
                status: true,
                msg: 'Produto alterado com sucesso.'
            }]
            res.json(results);
        }
    });
}

router.post('/cliente', altCliente);
router.post('/produtor', altProdutor);
router.post('/produto', altProduto);

module.exports = router;