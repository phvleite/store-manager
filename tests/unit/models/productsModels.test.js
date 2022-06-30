const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productModel = require('../../../models/productModel');

describe('ProductModel', function () { 
  beforeEach(function () { 
    sinon.restore();
  });

  describe('#exists', function () {
    it('ao mandar um id de um registro que existe deve retorna "true"', async () => {
      sinon.stub(connection, 'query').resolves([[{ id: 1, name: 'Martelo de Thor' }]]);
      const exists = await productModel.exists(1);
      expect(exists).to.be.equal(true);
    });

    it('ao mandar um id de um registro que não existe deve retorna "false"', async () => {
      sinon.stub(connection, 'query').resolves([[]]);
      const exists = await productModel.exists(1001);
      expect(exists).to.be.equal(false);
    });
  });
});
