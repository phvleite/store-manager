const { Router } = require('express');
const saleController = require('../controllers/saleController');

const saleRoute = Router();

saleRoute.post('/', saleController.add);
saleRoute.get('/', saleController.list);
saleRoute.get('/:id', saleController.getById);
saleRoute.delete('/:id', saleController.remove);
// saleRoute.put('/:id', saleController.edit);

module.exports = saleRoute;
