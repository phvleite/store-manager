const productService = require('../services/productService');

const productController = {

  async getById(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    await productService.checkIfExist(id);
    const product = await productService.getById(id);
    res.status(200).json(product);
  },
  
  async list(_req, res) {
    const products = await productService.list();
    res.status(200).json(products);
  },
};

module.exports = productController;
