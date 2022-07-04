const { expect, use } = require('chai');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
const chaiAsPromised = require('chai-as-promised');

const saleService = require('../../../services/saleService');
const saleModel = require('../../../models/saleModel');

use(chaiAsPromised);

describe('SaleService', () => {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#validateParamsId', () => {
    it('se mandar um id válido deve retornar um objeto válido', () => {
      const object = saleService.validateParamsId({ id: 1 });
      expect(object).to.be.deep.eq({ id: 1 });
    });

    it('se mandar um id inválido deve disparar um erro', () => {
      expect(() => saleService.validateParamsId({ id: 'teste' })).to
        .throws('"id" must be a number');
    });
  });

  describe('#checkIfExists', () => {
    it('ao mandar um id que existe deve retorna "true"', async () => {
      sinon.stub(saleModel, 'exists').resolves(true);
      const exists = await saleService.checkIfExists(1);
      expect(exists).to.be.eq(true);
    });

    it('ao mandar um id que não existe deve retorna "false"', () => {
      sinon.stub(saleModel, 'exists').resolves(false);
      expect(saleService.checkIfExists(10001)).to.be
        .rejectedWith(NotFoundError);
    });
  });
});
