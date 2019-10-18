/* Rota de cadastro */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../services/connection');
var pass = "";

function cadCliente(req, res) {

    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, senha, urlImagem } = req.body;
    bcrypt.hash(senha, 1, function (err, hash) {
        pass = hash;
    })

    const sqlQry = `INSERT INTO cadastro (tipo,usuario,nome,email,telefone,sexo,cep,uf,cidade,rua,numero,bairro,senha,urlImagem) VALUES 
    ('C','${usuario}','${nome}','${email}','${telefone}','${sexo}','${cep}','${uf}','${cidade}','${rua}','${numero}','${bairro}','${pass}','${urlImagem}')`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            /* Lógica de tratamento da resposta */
            results = [{
                status: true,
                msg: 'Cliente cadastrado com sucesso.'
            }]
            res.json(results);
        }
    });
}

function cadProdutor(req, res) {

    const { usuario, nome, email, telefone, sexo, cep, uf, cidade, rua, numero, bairro, senha, urlImagem } = req.body;
    bcrypt.hash(senha, 1, function (err, hash) {
        pass = hash;
    })

    const sqlQry = `INSERT INTO cadastro (tipo,usuario,nome,email,telefone,sexo,cep,uf,cidade,rua,numero,bairro,senha,urlImagem) VALUES 
    ('P','${usuario}','${nome}','${email}','${telefone}','${sexo}','${cep}','${uf}','${cidade}','${rua}','${numero}','${bairro}','${pass}','${urlImagem}')`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            console.log(error);
            res.json(error);
        } else {
            /* Lógica de tratamento da resposta */
            results = [{
                status: true,
                msg: 'Produtor alterado com sucesso.'
            }]
            res.json(results);
        }
    });

}

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
            results = [{
                status: true,
                msg: 'Produto cadastrado com sucesso.'
            }]
            res.json(results);
        }
    });

}

function cadPedido(req, res) {

    console.log('Recebendo requisição.');
    const { status, id_produtor, id_cliente } = req.body;

    const sqlQry = `INSERT INTO pedidos (status, id_produtor, id_cliente) VALUES ('${status}','${id_produtor}','${id_cliente}');`
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            console.log('Erro na requisição.');
            res.json(error);
        } else {
            console.log('Usuário criado.');
            res.json(results);
        }
    });

}

router.post('/cliente', cadCliente);
router.post('/produtor', cadProdutor);
router.post('/produto', cadProduto);
router.post('/pedido', cadPedido);
module.exports = router;