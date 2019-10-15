const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 1337 //porta padrao
const cors = require('cors')

//configurando o body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//configurando router
const router = express.Router();
router.get('/', (req, res) => res.json({ message: `API respondendo na porta ${port}.` }));

//importando rotas
const login = require('./routes/login');
const cadCliente = require('./routes/cadCliente');
const cadProdutor = require('./routes/cadProdutor');
const cadProduto = require('./routes/cadProduto');
const altCliente = require('./routes/altCliente');
const altProdutor = require('./routes/altProdutor');
const altProduto = require('./routes/altProduto');
const delCliente = require('./routes/delCliente');
const delProdutor = require('./routes/delProdutor');
const delProduto = require('./routes/delProduto');
const infoUsuario = require('./routes/infoUsuario');
const infoProduto = require('./routes/infoProduto');

//definindo as rotas
app.use('/', router);
app.use('/login', login);
app.use('/cadastroCliente', cadCliente);
app.use('/cadastroProdutor', cadProdutor);
app.use('/cadastroProduto', cadProduto);
app.use('/alterarCliente', altCliente);
app.use('/alterarProdutor', altProdutor);
app.use('/alterarProduto', altProduto);
app.use('/deletarCliente', delCliente);
app.use('/deletarProdutor', delProdutor);
app.use('/deletarProduto', delProduto);
app.use('/infoUsuario', infoUsuario);
app.use('/infoProduto', infoProduto);


//inicia o servidor
app.listen(port, () => console.log('API Funcionando'));