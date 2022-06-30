const { expect, use } = require('chai');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
const chaiAsPromised = require('chai-as-promised');

const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');

use(chaiAsPromised);

describe('ProductService', () => {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#validateParamsId', () => {
    it('se mandar um id válido deve retornar um objeto válido', () => {
      const object = productService.validateParamsId({ id: 1 });
      expect(object).to.be.deep.eq({ id: 1 });
    });

    it('se mandar um id inválido deve disparar um erro', () => {
      expect(() => productService.validateParamsId({ id: 'teste' })).to
        .throws('"id" must be a number');
    });
  });

  describe('#checkIfExists', () => {
    it('ao mandar um id que existe deve retorna "true"', async () => {
      sinon.stub(productModel, 'exists').resolves(true);
      const exists = await productService.checkIfExists(1);
      expect(exists).to.be.eq(true);
    });

    it('ao mandar um id não existe deve retorna "false"', () => {
      sinon.stub(productModel, 'exists').resolves(false);
      expect(productService.checkIfExists(1001)).to.be
        .rejectedWith(NotFoundError);
    });
  });
});
