const { Router } = require('express');
const productController = require('../controllers/productController');

const productRoute = Router();

productRoute.get('/', productController.list);
productRoute.get('/search', productController.getBySearch);
productRoute.get('/:id', productController.getById);
productRoute.post('/', productController.create);
productRoute.put('/:id', productController.edit);
productRoute.delete('/:id', productController.remove);

module.exports = productRoute;
