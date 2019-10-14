const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function cadProduto(req, res) {

    const { nome, valor, unidades, kg, id_produtor } = req.body;

    const sqlQry = `INSERT INTO produtos (nome,valor,unidades,kg,id_produtor) VALUES 
    ('${nome}','${valor}','${unidades}','${kg}','${id_produtor}')`;

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

router.post('/', cadProduto);
module.exports = router;