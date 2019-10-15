/* Rota de cadastro usuário Produtor */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../services/connection');
var pass = "";

function cadProdutor(req, res) {

    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, senha } = req.body;
    bcrypt.hash(senha, 1, function (err, senha) {
        pass = senha;
    })

    const sqlQry = `INSERT INTO cadastro (tipo,usuario,nome,email,telefone,sexo,cep,uf,cidade,rua,numero,bairro,senha) VALUES 
    ('P','${usuario}','${nome}','${email}','${telefone}','${sexo}','${cep}','${uf},'${cidade}','${rua}','${numero}','${bairro}','${pass}')`;

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

router.post('/', cadProdutor);
module.exports = router;