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

};

module.exports = saleController;
