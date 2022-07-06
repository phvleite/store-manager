const productService = require('../services/productService');

const productController = {

  async getById(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    await productService.checkIfExists(id);
    const product = await productService.getById(id);
    res.status(200).json(product);
  },

  async getBySearch(req, res) {
    const { q } = req.query;
    const products = await productService.getBySearch(q);
    res.status(200).json(products);
  },

  async remove(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    await productService.checkIfExists(id);
    productService.remove(id);
    res.sendStatus(204);
  },

  async list(_req, res) {
    const products = await productService.list();
    res.status(200).json(products);
  },

  async create(req, res) {
    const data = await productService.validateBody(req.body);
    await productService.checkIfExistsProduct(data);
    const id = await productService.create(data);
    res.status(201).json({ id, name: data.name });
  },

  async edit(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    const changes = await productService.validateBody(req.body);
    await productService.checkIfExists(id);
    await productService.edit(id, changes);
    res.status(200).json({ id, name: changes.name });
  },

};

module.exports = productController;
