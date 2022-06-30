const productService = require('../services/productService');

const productController = {

  async getById(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    await productService.checkIfExists(id);
    const product = await productService.getById(id);
    res.status(200).json(product);
  },
  
  async list(_req, res) {
    const products = await productService.list();
    res.status(200).json(products);
  },

  async create(req, res) {
    const data = await productService.validateBodyCreate(req.body);
    await productService.checkIfExistsProduct(data);
    const id = await productService.create(data);
    res.status(201).json({ id, name: data.name });
  },
};

module.exports = productController;
