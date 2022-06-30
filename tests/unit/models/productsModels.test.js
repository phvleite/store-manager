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

  describe('#existsProduct', function () {
    it('ao mandar um nome de produto que existe deve retorna "true"', async () => {
      sinon.stub(connection, 'query').resolves([[{ name: 'Martelo de Thor' }]]);
      const existsProduct = await productModel.existsProduct({ name: 'Martelo de Thor' });
      expect(existsProduct).to.be.equal(true);
    });

    it('ao mandar um nome de produto que não existe deve retorna "false"', async () => {
      sinon.stub(connection, 'query').resolves([[{ name: 'Pano de prato da Mulher Maravilha' }]]);
      const existsProduct = await productModel.existsProduct({ name: 'Pano de prato da Mulher Maravilha' });
      expect(existsProduct).to.be.equal(false);
    });
  });
});
