/* Rota de cadastro usuário Cliente */
const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function cadCliente(req, res) {

    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, senha } = req.body;

    const sqlQry = `INSERT INTO cadastro (tipo,usuario,nome,email,telefone,sexo,cep,uf,cidade,rua,numero,bairro,senha) VALUES 
    ('C','${usuario}','${nome}','${email}','${telefone}','${sexo}','${cep}','${uf}','${cidade}','${rua}','${numero}','${bairro}','${senha}')`;

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

router.post('/', cadCliente);
module.exports = router;