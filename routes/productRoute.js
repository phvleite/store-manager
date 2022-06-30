const { Router } = require('express');
const productController = require('../controllers/productController');

const productRoute = Router();

productRoute.get('/', productController.list);
productRoute.get('/:id', productController.getById);
productRoute.post('/', productController.create);
productRoute.put('/:id', productController.edit);

module.exports = productRoute;
