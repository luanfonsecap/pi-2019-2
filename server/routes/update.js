/* Rota de alteração de cadastro*/
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function altCliente(req, res) {
    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, id } = req.body;

    const sqlQry = `UPDATE cadastro SET usuario='${usuario}', nome='${nome}', email='${email}', telefone='${telefone}', sexo='${sexo}', cep='${cep}', uf='${uf}',
    cidade='${cidade}', rua='${rua}', numero='${numero}', bairro='${bairro}' WHERE id='${id}'`;

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
    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, id } = req.body;

    const sqlQry = `UPDATE cadastro SET usuario='${usuario}', nome='${nome}', email='${email}', telefone='${telefone}', sexo='${sexo}', cep='${cep}', uf='${uf}',
    cidade='${cidade}', rua='${rua}', numero='${numero}', bairro='${bairro}' WHERE id='${id}'`;

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
    const { id, nome, valor, tipo, qtde } = req.body;
    let coluna = "";

    console.log(tipo, qtde, valor);

    if (tipo === "kg") {
        coluna = "unidades";
    } else {
        coluna = "kg";
    }

    const sqlQry = `UPDATE produtos SET nome='${nome}', valor='${valor}', ${tipo}='${qtde}', ${coluna}=${null} WHERE id='${id}'`;

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

function altPedido(req, res) {
    const { id, status } = req.body;
    const sqlQry = `UPDATE pedidos SET status='${status}' WHERE id='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            results = {
                status: true,
                msg: `Pedido alterado com sucesso.`
            };
            res.json(results);
        }
    });
}

function altAvaliacao(req, res) {
    const { id_pedido, estrelas } = req.body;
    const sqlQry = `UPDATE avaliacao SET estrelas='${estrelas}' WHERE id_pedido='${id_pedido}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            results = [{
                status: true,
                msg: 'Avaliação alterada.'
            }]
            res.json(results);
        }
    });
}

function altTaxa(req, res) {
    const { id, valorTaxa } = req.body;
    const sqlQry = `UPDATE cadastro SET taxa='${valorTaxa}' WHERE id='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            const error = {
                status: false,
                msg: 'Não foi possível atualizar sua taxa.'
            }
            res.json(error);
        } else {
            results = [{
                status: true,
                msg: 'Taxa atualizada.'
            }]
            res.json(results);
        }
    });
}

router.post('/cliente', altCliente);
router.post('/produtor', altProdutor);
router.post('/produto', altProduto);
router.post('/pedido', altPedido);
router.post('/taxa', altTaxa);

module.exports = router;