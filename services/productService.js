const Joi = require('joi');
const productModel = require('../models/productModel');
const { runSchema } = require('./validators');
const NotFoundError = require('../errors/NotFoundError');

const productService = {

  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBody: runSchema(Joi.object({
    name: Joi.string().required().max(30).min(5),
  })),

  async checkIfExists(id) {
    const exists = await productModel.exists(id);
    if (!exists) {
      const message = 'Product not found';
      throw new NotFoundError(message);
    }

    return true;
  },

  async checkIfExistsByArrayOfId(arrayOfId) {
    const products = await productModel.listByArrayOfId(arrayOfId);

    if (!products.length) throw new NotFoundError('Product not found');

    const listOfProductsId = products.map((product) => product.id);

    for (let i = 0; i < arrayOfId.length; i += 1) {
      if (!listOfProductsId.includes(arrayOfId[i])) {
        // throw new NotFoundError(`productId:${arrayOfId[i]} not found`);
        throw new NotFoundError('Product not found');
      }
    }
  },
  
  async checkIfExistsProduct(data) {
    const exists = await productModel.existsProduct(data);
    if (exists) {
      const message = 'Product already registered';
      throw new NotFoundError(message);
    }

    return false;
  },

  async edit(id, changes) {
    if (!Object.keys(changes).length) return false;

    await productModel.edit(id, changes);

    return true;
  },

  async remove(id) {
    await productModel.remove(id);
  },

  async create(data) {
    const id = await productModel.create(data);
    return id;
  },

  async getById(id) {
    const product = await productModel.getById(id);
    return product;
  },

  async getBySearch(q) {
    const products = await productModel.getBySearch(q);
    return products;
  },

  async list() {
    const products = await productModel.list();
    return products;
  },
};

module.exports = productService;
