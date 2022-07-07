const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const saleProductModel = require('../../../models/saleProductModel');

describe('SaleProductModel', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#bulkAddBySale', function () {
    it('deve retorna nada em caso de sucesso', async () => {
      sinon.stub(connection, 'query').resolves();
      expect(saleProductModel.bulkAddBySale({})).to.eventually.be.undefined;
    });
  });

  describe('#remove', function () {
    it('deve retorna nada em caso de sucesso', async () => {
      sinon.stub(connection, 'query').resolves();
      expect(saleProductModel.remove({})).to.eventually.be.undefined;
    });
  });

  describe('#edit', function () {
    it('deve retorna nada em caso de sucesso', async () => {
      sinon.stub(connection, 'query').resolves();
      expect(saleProductModel.edit({})).to.eventually.be.undefined;
    });
  });
});
