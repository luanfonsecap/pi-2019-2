/* Rota de informação de cadastro de usuários */
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function altProduto(req, res) {
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

router.post('/', altProduto);
module.exports = router;