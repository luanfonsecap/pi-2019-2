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

    const sqlQry = `INSERT INTO produtos (nome,valor,${tipo},id_produtor, icon, tipo) VALUES 
    ('${nome}','${valor}','${qtde}','${id_produtor}', '${icon}', '${tipo}')`;

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
    const { id_produtor, id_cliente, nome_cliente, cidade, produtos, valor, tipo, qtde, nomes, metodo } = req.body;
    const data = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    const sqlQry = `INSERT INTO pedidos (status, id_produtor, id_cliente, nome_cliente, cidade, produtos, valor, tipo, qtde, nomes, data) VALUES ('Aguardando','${id_produtor}','${id_cliente}','${nome_cliente}', '${cidade}', '${produtos}','${valor}','${tipo}','${qtde}', '${nomes}', '${data}');`
    var prods = produtos.split(',');
    var values = valor.split(',');
    var amount = qtde.split(',');
    var total = 0;
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            /* Lógica de tratamento da resposta */
            console.log('Erro na requisição I.');
            res.json(error);
        } else {
            var contador = 0;
            prods.forEach(prod => {
                var sqlQry2 = `SELECT vendas FROM produtos WHERE id=${prod}`;
                connection.query(sqlQry2, function (error2, results2, fields2) {
                    if (error) {
                        /* Lógica de tratamento da resposta */
                        console.log('Erro na requisição II.');
                        res.json(error2);
                    } else {
                        var soma = results2[0].vendas + 1;
                        var sqlQry3 = `UPDATE produtos SET vendas='${soma}' WHERE id='${prod}'`;
                        connection.query(sqlQry3, function (error3, results3, fields3) {
                            if (error) {
                                /* Lógica de tratamento da resposta */
                                console.log('Erro na requisição III.');
                                res.json(error3);
                            } else {
                                console.log("OK");
                                
                            }
                        });
                    }
                });
            });
            var contador = 0;
            while (contador != values.length) {
                total = total + (values[contador]*amount[contador]);
                contador++
            }
            if (metodo === "saldo") {
                var sqlQry = `SELECT saldo FROM conta WHERE id_usuario=${id_cliente}; SELECT saldo FROM conta WHERE id_usuario=${id_produtor}`;
                var saldo_cliente = 0;
                var saldo_produtor = 0;
                connection.query(sqlQry, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    } else {
                    saldo_cliente = ((results[0][0].saldo) - total);
                    saldo_produtor = ((results[1][0].saldo) + total);
                    var sqlQry2 = `UPDATE conta SET saldo='${saldo_cliente}' WHERE id_usuario=${id_cliente};
                                   UPDATE conta SET saldo='${saldo_produtor}' WHERE id_usuario=${id_produtor}`;                               
                    }
                    connection.query(sqlQry2, function (error2, results2, fields2) {
                        if (error) {
                            console.log(error2);
                        } else {
                        console.log("ok");
                                                      
                        }    
                    });
                });
                
            }
            if (metodo === "cartao") {
                var sqlQry = `SELECT limite FROM conta WHERE id_usuario=${id_cliente}; SELECT saldo FROM conta WHERE id_usuario =${id_produtor}`; 
                var limite_cliente = 0;
                var saldo_produtor = 0;
                connection.query(sqlQry, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    } else {
                        connection.query(sqlQry, function (error, results, fields) {
                            if (error) {
                                console.log(error);
                            } else {
                            limite_cliente = ((results[0][0].limite) - total);
                            saldo_produtor = ((results[1][0].saldo) + total);
                            var sqlQry2 = `UPDATE conta SET limite='${limite_cliente}' WHERE id_usuario=${id_cliente};
                                           UPDATE conta SET saldo='${saldo_produtor}' WHERE id_usuario=${id_produtor}`;                               
                            }
                            connection.query(sqlQry2, function (error2, results2, fields2) {
                                if (error) {
                                    console.log(error2);
                                } else {
                                console.log("ok");
                                                              
                                }    
                            });
                        });
                        
                    }
                });
                
            }
            res.json([{ status: true }]);
        }
    });

}

function cadAvaliacao(req, res) {
    console.log('Recebendo requisição.');
    const { id_pedido, nome_produtor, id_produtor, estrelas } = req.body;
    const sqlQry = `INSERT INTO avaliacao (id_pedido, nome_produtor, id_produtor, estrelas) VALUES ('${id_pedido}','${nome_produtor}','${id_produtor}','${estrelas}');`
    const sqlQry2 = `SELECT  estrelas FROM avaliacao WHERE id_produtor='${id_produtor}'`;
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
            connection.query(sqlQry2, function (error1, results1, fields2) {
                if (error1) {
                    /* Lógica de tratamento da resposta */
                    console.log("Erro");
                    results = [{
                        status: false,
                        msg: 'Erro ao extrair dados.'
                    }]
                    res.json(results2);
                } else {
                    var tamanho = results1.length;
                    var contador = 0;
                    var valores = 0;
                    while (contador != tamanho) {
                        valores = valores + results1[contador].estrelas;
                        contador++;
                    }
                    media = valores / tamanho;
                    console.log(media);

                    var sqlQry3 = `UPDATE cadastro SET avaliacao_med='${media}' WHERE id=${id_produtor}`;
                    connection.query(sqlQry3, function (error3, results3, fields3) {
                        if (error1) {
                            /* Lógica de tratamento da resposta */
                            console.log("Erro ao alterar avaliação média.");
                            results = [{
                                status: false,
                                msg: 'Erro ao alterar avaliação média.'
                            }]
                            res.json(error3);
                        } else {
                            console.log("Sucesso");
                        }
                    });
                }
            });
            res.json({ status: true });
        }
    });
}

function cadCompra(req, res) {
    const {valor, metodo, id_produtor, id_cliente} = req.body;
    var resultado = [];
    if (metodo === cartao) {
        const sqlQry = `SELECT limite FROM conta WHERE id_usuario='${id_cliente}'; SELECT saldo FROM conta WHERE id_usuario='${id_produtor}'`
        var limite;
        var saldo;
        connection.query(sqlQry, function (error, results, fields) {
            if (error) {
                console.log(error);
                resultado.push({status: false});
            } else {
                var nlimite = limite - results[0].limite;
                var nsaldo = saldo + results[1].saldo;
                console.log(nlimite, nsaldo);
                
            }
        });

    } else {
        
    }

}

router.post('/cliente', cadCliente);
router.post('/produtor', cadProdutor);
router.post('/produto', cadProduto);
router.post('/pedido', cadPedido);
router.post('/avaliacao', cadAvaliacao);
router.post('/compra', cadCompra);
module.exports = router;