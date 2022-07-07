const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const saleModel = require('../../../models/saleModel');

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

  describe('#add', function () {
    it('deve retorna o id inserido em caso de sucesso', async () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 2 }]);
      expect(saleModel.add({})).to.eventually.equal(1);
    });
  });

  describe('#remove', function () {
    it('deve retorna nada em caso de sucesso', async () => {
      sinon.stub(connection, 'query').resolves();
      expect(saleModel.remove({})).to.eventually.be.undefined;
    });
  });

  describe('#list', function () {
    it('deve retornar uma lista', async () => {
      sinon.stub(connection, 'query').resolves([[]]);
      expect(saleModel.list()).to.eventually.deep.equal([]);
    });
  });
});
