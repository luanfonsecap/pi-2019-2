const express = require('express');
const router = express.Router();
const connection = require('../services/connection');

function cadProdutor(req, res) {

    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, senha } = req.body;

    const type = 'P';
    const user = usuario;
    const name = nome;
    const mail = email;
    const phone = telefone;
    const sex = sexo;
    const postal = cep;
    const state = uf;
    const city = cidade;
    const street = rua;
    const number = numero;
    const neighbor = bairro;
    const pass = senha;

    const sqlQry = `INSERT INTO cadastro (tipo,usuario,nome,email,telefone,sexo,cep,uf,cidade,rua,numero,bairro,senha) VALUES 
    ('${type}','${user}','${name}','${mail}','${phone}','${sex}','${postal}','${state}','${city}','${street}','${number}','${neighbor}','${pass}')`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            /* Lógica de tratamento da resposta */
            res.json(results);
        }
        connection.end();
    });

}

router.post('/', cadProdutor);
module.exports = router;