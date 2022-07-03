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
};

module.exports = saleController;
