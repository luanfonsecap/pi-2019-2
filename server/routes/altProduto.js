/* Rota de alteração de cadastro de produtos */
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function altProduto(req, res) {
    const { id, nome, valor, unidades, kg, id_produtor } = req.body;
    const sqlQry = `UPDATE produtos SET nome='${nome}', valor='${valor}', unidades='${unidades}', kg='${kg}', id_produtor='${id_produtor}' WHERE id='${id}'`;

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

router.post('/', altProduto);
module.exports = router;