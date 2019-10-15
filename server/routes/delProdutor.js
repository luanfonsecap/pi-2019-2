/* Rota de exclusão de cadastro de produtores */
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function altProduto(req, res) {
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

router.post('/', altProduto);
module.exports = router;