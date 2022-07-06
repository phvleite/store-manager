const saleService = require('../services/saleService');
const productService = require('../services/productService');

const saleController = {

  async add(req, res) {
    const data = await saleService.validateBodyAdd(req.body);
    const products = data.map((product) => product.productId);
    await productService.checkIfExistsByArrayOfId(products);
    const id = await saleService.add(data);
    res.status(201).json({ id, itemsSold: data });
  },

  async list(_req, res) {
    const sales = await saleService.list();
    res.status(200).json(sales);
  },

  async getById(req, res) {
    const { id } = await saleService.validateParamsId(req.params);
    await saleService.checkIfExists(id);
    const sale = await saleService.getById(id);
    res.status(200).json(sale);
  },

  async remove(req, res) {
    const { id } = await saleService.validateParamsId(req.params);
    await saleService.checkIfExists(id);
    saleService.remove(id);
    res.sendStatus(204);
  },

  async edit(req, res) {
    const { id } = await saleService.validateParamsId(req.params);
    const changes = await saleService.validateBodyAdd(req.body);
    await saleService.checkIfExists(id);
    const products = changes.map((product) => product.productId);
    await productService.checkIfExistsByArrayOfId(products);
    await saleService.edit(id, changes);
    res.status(200).json({ id, ItemsUpdated: changes });
  },
};

module.exports = saleController;
