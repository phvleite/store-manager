const Joi = require('joi');
const productModel = require('../models/productModel');
const { runSchema } = require('./validators');
const NotFoundError = require('../errors/NotFoundError');

const productService = {

  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBodyCreate: runSchema(Joi.object({
    name: Joi.string().required().max(30).min(5),
  })),

  async checkIfExists(id) {
    const exists = await productModel.exists(id);
    if (!exists) {
      throw new NotFoundError('Product not found');
    }

    return true;
  },

  async checkIfExistsProduct(data) {
    const exists = await productModel.existsProduct(data);
    if (exists) {
      throw new NotFoundError('Product already registered');
    }

    return false;
  },

  async create(data) {
    const id = await productModel.create(data);
    return id;
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
