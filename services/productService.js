const Joi = require('joi');
const productModel = require('../models/productModel');
const { runSchema } = require('./validators');
const NotFoundError = require('../errors/NotFoundError');

const productService = {

  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  async checkIfExists(id) {
    const exists = await productModel.exists(id);
    console.log(exists);
    if (!exists) {
      throw new NotFoundError('Product not found');
    }

    return true;
  },

  async getById(id) {
    const product = await productModel.getById(id);
    return product;
  },

  async list() {
    const products = await productModel.list();
    return products;
  },
};

module.exports = productService;
