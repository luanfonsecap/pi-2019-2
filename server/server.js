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
router.get('/', (req, res) => res.json({
    message: `API respondendo na porta ${port}.`,
    status: `Running...`
}));

//importando rotas
const login = require('./routes/login');
const create = require('./routes/create');
const read = require('./routes/read');
const update = require('./routes/update');
const delet = require('./routes/delete');

//definindo as rotas
app.use('/', router);
app.use('/login', login);
app.use('/create', create);
app.use('/read', read)
app.use('/update', update);
app.use('/delete', delet);

//inicia o servidor
app.listen(port, () => console.log('API Funcionando'));