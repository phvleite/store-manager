const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const saleModel = require('../../../models/productModel');

describe('SaleModel', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#exists', function () {
    it('ao mandar um id de uma venda que exista deve retorna "true"', async () => {
      sinon.stub(connection, 'query').resolves([[{ id: 1 }]]);
      const exists = await saleModel.exists(1);
      expect(exists).to.be.equal(true);
    });

    it('ao mandar um id de uma venda que não exista deve retorna "false"', async () => {
      sinon.stub(connection, 'query').resolves([[]]);
      const exists = await saleModel.exists(1001);
      expect(exists).to.be.equal(false);
    });
  });
});
