const Joi = require('joi');
const saleModel = require('../models/saleModel');
const saleProductModel = require('../models/saleProductModel');
const { runSchema } = require('./validators');
// const NotFoundError = require('../errors/NotFoundError');

const saleService = {

  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBodyAdd: runSchema(Joi.array().required().items(Joi.object({
    productId: Joi.number().required().positive().integer(),
    quantity: Joi.number().required().integer().min(1),
  }))),

  async add(data) {
    const id = await saleModel.add();
    await saleProductModel.bulkAddBySale(id, data);
    return id;
  },

};

module.exports = saleService;
