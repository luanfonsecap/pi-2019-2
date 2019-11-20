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
    console.log(id);
    const sqlQry = `SELECT * FROM pedidos WHERE id=${id}`;
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            var resultado;
            var products = results[0].produtos.split(',');
            var names = results[0].nomes.split(',');
            var types = results[0].tipo.split(',');
            var quant = results[0].qtde.split(',');
            var values = results[0].valor.split(',');
            var tamanho = products.length;
            var resultado = [{
                status: results[0].status,
                id_produtor: results[0].id_produtor,
                id_cliente: results[0].id_cliente,
                nome_cliente: results[0].nome_cliente,
                bairro: results[0].bairro,
                produtos: []
            }]
            var contador = 0
            while (contador != tamanho) {
                resultado[0].produtos.push({
                    id_produto: products[contador],
                    nome: names[contador],
                    tipo: types[contador],
                    quant: quant[contador],
                    valor_uni: values[contador],
                    total: values[contador] * quant[contador]
                })
                contador++;
            }
        }
        res.json(resultado);
    });
}

function infoPedProdutor(req, res) {
    const id = req.body.id;
    const sqlQry = `SELECT * FROM pedidos WHERE id_produtor='${id}' AND status='Aguardando'`;

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
                    id_cliente: results[contador].id_cliente,
                    nome: results[contador].nome_cliente,
                    valor: total.toFixed(2),
                    bairro: results[contador].bairro
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
    const sqlQry = `SELECT * FROM pedidos WHERE id_cliente='${id}' AND status='${status}'`;
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
                    IdCompra: results[contador].id,
                    Produtos: results[contador].nomes,
                    Data: results[contador].data,
                    Valor: total.toFixed(2),
                })
                contador++;
            }
            res.json(resultado);
        }
    });
}

function infoDestaque(req, res) {
    const sqlQry = `SELECT id,nome,tipo,id_produtor FROM produtos  ORDER BY vendas DESC LIMIT 4 `;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            var contador = 0;
            var resultado = [];
            console.log(results);
            while (contador != 4) {

                resultado.push({
                    nome: results[contador].nome,
                    tipo: results[contador].tipo,
                    id_produtor: results[contador].id_produtor,
                    id: results[contador].id
                })
                contador++;
            }
            res.json(resultado);
        }
    });
}

function infoMelhores(req, res) {
    const { cidade } = req.body;
    const sqlQry = `SELECT id,nome,avaliacao_med,urlImagem FROM cadastro WHERE avaliacao_med >= 4 AND cidade='${cidade}'`;

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            tamanho = results.length;
            contador = 0;
            resultado = []
            while (contador != tamanho) {
                resultado.push(
                    {
                        id: results[contador].id,
                        nome: results[contador].nome,
                        avaliacao: results[contador].avaliacao_med,
                        url: results[contador].urlImagem
                    }
                )
                contador++;
            }

            res.json(resultado);
        }
    });
}

function infoMercado(req, res) {
    const { id } = req.body;
    const sqlQry = `SELECT nome,cidade,avaliacao_med,urlImagem FROM cadastro WHERE id = ${id}`;
    const sqlQry2 = `SELECT * FROM produtos WHERE id_produtor = ${id}`
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            var resultado = [{
                nome: results[0].nome,
                cidade: results[0].cidade,
                avaliacao: results[0].avaliacao_med,
                url: results[0].urlImagem,
                produtos: []
            }]
            connection.query(sqlQry2, function (error2, results2, fields2) {
                if (error) {
                    /* Lógica de tratamento da resposta */
                    res.json(error);
                } else {
                    tamanho = results2.length;
                    contador = 0;
                    while (contador != tamanho) {
                        if (results2[contador].unidades === null) {
                            resultado[0].produtos.push({
                                id: results2[contador].id,
                                nome: results2[contador].nome,
                                qtde: results2[contador].kg,
                                tipo: "kg",
                                preço: results2[contador].valor,
                                icon: results2[contador].icon,
                            })
                        } else {
                            resultado[0].produtos.push({
                                id: results2[contador].id,
                                nome: results2[contador].nome,
                                qtde: results2[contador].unidades,
                                tipo: "unidades",
                                preço: results2[contador].valor,
                                icon: results2[contador].icon
                            })
                        }
                        contador++;
                    }
                    res.json(resultado);
                }
            });
        }
    });

}

function infoSaldo(req, res) {
    const { id_usuario } = req.body;
    const sqlQry = `SELECT saldo FROM conta WHERE id_usuario = ${id_usuario}`;
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            res.json(error);
        } else {
            res.json(results);
        }
    });

}

function infoCartao(req, res) {
    const { id_usuario, valorcompra, cartao, validade, cvv } = req.body;
    const sqlQry = `SELECT cartao,validade,cvv,limite FROM conta WHERE id_usuario = ${id_usuario}`;
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            res.json(error);
        } else {
            var cartaobanco = results[0].cartao;
            var validadebanco = results[0].validade;
            var cvvbanco = results[0].cvv;
            var limitebanco = results[0].limite;
            var resultado = [];
            var erro = 0;

            // Valida número do cartão.
            if (cartao != cartaobanco) {
                resultado.push({ Cartão: 'inválido' });
                erro++
            }
            else {
                resultado.push({ Cartão: 'válido' });
            }

            // Valida validade do cartão.
            if (validade != validadebanco) {
                resultado.push({ Validade: 'inválido' });
                erro++
            }
            else {
                resultado.push({ Validade: 'válido' });
            }

            // Valida o código de segurança do cartão.
            if (cvv != cvvbanco) {
                resultado.push({ CVV: 'inválido' });
                erro++
            }
            else {
                resultado.push({ CVV: 'válido' });
            }

            // Valida se o limite é suficiente para a compra.
            if (valorcompra > limitebanco) {
                resultado.push({ Limite: 'Insuficiente' });
                erro++
            }
            else {
                resultado.push({ Limite: 'suficiente' });
            }

            // Valida se a compra pode ser feita.
            if (erro != 0) {
                resultado.push({ Status: false });
            }
            else {
                resultado.push({ Status: true });
            }

            res.json(resultado);
        }
    });

}

router.post('/usuario', infoUsuario);
router.post('/produto', infoProduto);
router.post('/pedido', infoPedido);
router.post('/pedprodutor', infoPedProdutor);
router.post('/pedcliente', infoPedCliente);
router.post('/historico', infoHistoricoPed);
router.get('/destaque', infoDestaque);
router.post('/melhores', infoMelhores);
router.post('/mercado', infoMercado);
router.post('/saldo', infoSaldo);
router.post('/cartao', infoCartao);

module.exports = router;
