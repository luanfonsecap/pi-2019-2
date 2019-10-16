/* Rota de exclusão de cadastro */
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function delCliente(req, res) {
    const id = req.body.id;
    const sqlQry = `DELETE FROM cadastro WHERE id='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            results = [{
                status: true,
                msg: 'Cliente excluido com sucesso.'
            }]
            res.json(results);
        }
    });
}

function delProdutor(req, res) {
    const id = req.body.id;
    const sqlQry = `DELETE FROM cadastro WHERE id='${id}'; DELETE FROM produtos WHERE id_produtor='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            results = [{
                status: true,
                msg: 'Produtor e seus produtos excluidos com sucesso.'
            }]
            res.json(results);
        }
    });
}

function delProduto(req, res) {
    const id = req.body.id;
    const sqlQry = `DELETE FROM produtos WHERE id='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            results = [{
                status: true,
                msg: 'Produto excluido com sucesso.'
            }]
            res.json(results);
        }
    });
}

router.post('/cliente', delCliente);
router.post('/produtor', delProdutor);
router.post('/produto', delProduto);
module.exports = router;