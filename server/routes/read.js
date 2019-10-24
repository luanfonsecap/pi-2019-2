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

function infoProduto(req, res) {
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

function infoPedido(req, res) {
    const id = req.body.id;
    const sqlQry = `SELECT * FROM pedidos WHERE id='${id}'`;
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            var resultado;
            var products = results[0].produtos.split(',');
            var types = results[0].tipo.split(',');
            var quant = results[0].qtde.split(',');
            var values = results[0].valor.split(',');
            var tamanho = products.length;
            var resultado = [{
                status: results[0].status,
                id_produtor: results[0].id_produtor,
                id_cliente: results[0].id_cliente,
                nome_cliente: results[0].nome_cliente,
                bairro: results[0].bairro
            }]
            var contador = 0
            while (contador != tamanho) {
                resultado.push({
                    id_produto: products[contador],
                    tipo: types[contador],
                    quant: quant[contador],
                    valor_uni: values[contador],
                    total: values[contador] * quant[contador]
                })
                contador++;
            }
            res.json(resultado);
        }
    });
}

function infoPedProdutor(req, res) {
    const id = req.body.id;
    const sqlQry = `SELECT * FROM pedidos WHERE id_produtor='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            var tamanho = results.length;
            var contador = 0;
            resultado = [];
            console.log(results);
            while (contador != tamanho) {
                values = results[contador].valor.split(',');
                client_id = results[contador].id_cliente;
                quant = results[contador].qtde.split(',');

                var count = 0;
                var size = values.length;
                var total = 0;
                while (count != size) {
                    total = total + (values[count] * quant[count])
                    count++;
                }
                resultado.push({
                    id: results[contador].id,
                    IDCliente: client_id[contador],
                    Nome: results[contador].nome_cliente,
                    Valor: total.toFixed(2),
                    Bairro: results[contador].bairro
                })
                contador++;
            }
            res.json(resultado);
        }
    });
}

function infoPedCliente(req, res) {
    const id = req.body.id;
    const sqlQry = `SELECT * FROM pedidos WHERE id_cliente='${id}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            var tamanho = results.length;
            var contador = 0;
            resultado = [];
            console.log(results);
            while (contador != tamanho) {
                values = results[contador].valor.split(',');
                quant = results[contador].qtde.split(',');

                var count = 0;
                var size = values.length;
                var total = 0;
                while (count != size) {
                    total = total + (values[count] * quant[count])
                    count++;
                }
                resultado.push({
                    id: results[contador].id,
                    IDProdutor: results[contador].id_produtor,
                    Valor: total.toFixed(2),
                    Status: results[contador].status
                })
                contador++;
            }
            res.json(resultado);
        }
    });
}

function infoHistoricoPed(req, res) {
    const { id, status } = req.body;
    const sqlQry = `SELECT * FROM pedidos WHERE id_produtor='${id}' AND status='${status}'`;
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            var tamanho = results.length;
            var contador = 0;
            resultado = [];

            console.log(results);
            while (contador != tamanho) {
                values = results[contador].valor.split(',');
                client_id = results[contador].id_cliente;
                quant = results[contador].qtde.split(',');

                var count = 0;
                var size = values.length;
                var total = 0;
                while (count != size) {
                    total = total + (values[count] * quant[count])
                    count++;
                }
                resultado.push({
                    id: results[contador].id,
                    IDProdutor: results[contador].id_produtor,
                    IDCliente: client_id[contador],
                    Nome: results[contador].nome_cliente,
                    Valor: total.toFixed(2),
                })
                contador++;
            }
            res.json(resultado);
        }
    });
}

function infoAvaliacao(req, res) {
    const { cidade } = req.body;
    const sqlQry = `SELECT  FROM avaliacao WHERE estrela >= 4`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            tamanho = results.length;
            res.json(results);
        }
    });
}

router.post('/usuario', infoUsuario);
router.post('/produto', infoProduto);
router.post('/pedido', infoPedido);
router.post('/pedprodutor', infoPedProdutor);
router.post('/pedcliente', infoPedCliente);
router.post('/historico', infoHistoricoPed);
router.post('/avaliacao', infoAvaliacao);
module.exports = router;