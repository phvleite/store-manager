const express = require('express');
require('express-async-errors');
const productRoute = require('./routes/productRoute');

const app = express();
app.use(express.json());

app.use('/products', productRoute);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  const { name, message, type, code } = err;
  
  console.log(code);
  if (type && type === 'string.min') {
    return res.status(422).json({ message });
  }

  switch (name) {
    case 'ValidationError': res.status(400).json({ message }); break;
    case 'NotFoundError': res.status(code).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;