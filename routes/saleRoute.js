const { Router } = require('express');
const saleController = require('../controllers/saleController');

const saleRoute = Router();

saleRoute.post('/', saleController.add);

module.exports = saleRoute;
