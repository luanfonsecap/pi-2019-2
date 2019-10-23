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

    const { nome, valor, qtde, id_produtor, tipo, icon } = req.body;

    const sqlQry = `INSERT INTO produtos (nome,valor,${tipo},id_produtor, icon) VALUES 
    ('${nome}','${valor}','${qtde}','${id_produtor}', '${icon}')`;

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
    const { id_produtor, id_cliente, nome_cliente, bairro, produtos, valor, tipo, qtde } = req.body;

    const sqlQry = `INSERT INTO pedidos (status, id_produtor, id_cliente, nome_cliente, bairro, produtos, valor, tipo, qtde) VALUES ('Aguardando','${id_produtor}','${id_cliente}','${nome_cliente}', '${bairro}', '${produtos}','${valor}','${tipo}','${qtde}');`
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            console.log('Erro na requisição.');
            res.json(error);
        } else {
            console.log('Pedido salvo com sucesso.');
            results = [{
                status: true,
                msg: 'Pedido salvo com sucesso.'
            }]
            res.json(results);
        }
    });

}

function cadAvaliacao(req, res) {

    console.log('Recebendo requisição.');
    const { id_pedido, nome_produtor, id_produtor, urlImagem, estrelas } = req.body;
    const sqlQry = `INSERT INTO avaliacao (id_pedido, nome_produtor, id_produtor, urlImagem, estrelas) VALUES ('${id_pedido}','${nome_produtor}','${id_produtor}', '${urlImagem}', '${estrelas}');`
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            console.log("Erro ao avaliar produtor.");
            results = [{
                status: false,
                msg: 'Erro ao avaliar produtor.'
            }]
            res.json(results);
        } else {
            console.log('Avaliação recebida.');
            results = [{
                status: true,
                msg: 'Avaliação recebida.'
            }]
            res.json(results);
        }
    });

}
router.post('/cliente', cadCliente);
router.post('/produtor', cadProdutor);
router.post('/produto', cadProduto);
router.post('/pedido', cadPedido);
router.post('/avaliacao', cadAvaliacao);
module.exports = router;