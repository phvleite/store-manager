const { Router } = require('express');
const saleController = require('../controllers/saleController');

const saleRoute = Router();

saleRoute.post('/', saleController.add);
saleRoute.get('/', saleController.list);
saleRoute.get('/:id', saleController.getById);

module.exports = saleRoute;
