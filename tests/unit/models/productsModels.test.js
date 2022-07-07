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
      sinon.stub(connection, 'query').resolves([[]]);
      const existsProduct = await productModel.existsProduct({ name: 'Pano prato da Mulher Maravilha' });
      expect(existsProduct).to.be.equal(false);
    });
  });

  describe('#list', function () {
    it('deve retornar uma lista', async () => {
      sinon.stub(connection, 'query').resolves([[]]);
      expect(productModel.list()).to.eventually.deep.equal([]);
    });
  });

  describe('#getById', function () {
    it('ao mandar um id de um registro que existe deve retorna um objeto', async () => {
      sinon.stub(connection, 'query').resolves([[{}]]);
      expect(productModel.getById(0)).to.eventually.deep.equal([]);
    });
  });

  describe('#creat', function () {
    it('deve retorna o id inserido em caso de sucesso', async () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 2 }]);
      expect(productModel.create({})).to.eventually.equal(1);
    });
  });

  describe('#edit', function () {
    it('deve retorna nada em caso de sucesso', async () => {
      sinon.stub(connection, 'query').resolves();
      expect(productModel.edit({})).to.eventually.be.undefined;
    });
  });

  describe('#remove', function () {
    it('deve retorna nada em caso de sucesso', async () => {
      sinon.stub(connection, 'query').resolves();
      expect(productModel.remove({})).to.eventually.be.undefined;
    });
  });

  describe('#getBySearch', function () {
    it('ao mandar uma pesquisa deve retorna um objeto', async () => {
      sinon.stub(connection, 'query').resolves([[{}]]);
      expect(productModel.getBySearch(0)).to.eventually.deep.equal([]);
    });
  });
});
