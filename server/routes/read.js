/* Rota de informação de cadastro */
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function infoUsuario(req, res) {
    const id = req.body.id;
    const sqlQry = `SELECT * FROM cadastro WHERE id='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            res.json(results);
        }
    });
}

function produtosProdutor(req, res) {
    const id = req.body.id;
    const sqlQry = `SELECT * FROM produtos WHERE id_produtor='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            res.json(results);
        }
    });
}

router.post('/usuario', infoUsuario);
router.post('/produto', produtosProdutor);
module.exports = router;