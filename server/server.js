const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 1337 //porta padr�o
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

//definindo as rotas
app.use('/', router);
app.use('/login', login);
app.use('/cadastroCliente', cadCliente);
app.use('/cadastroProdutor', cadProdutor);

//inicia o servidor
app.listen(port, () => console.log('API Funcionando'));