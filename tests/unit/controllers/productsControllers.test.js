const { expect, use } = require('chai');
const sinon = require('sinon');
const { ValidationError, object } = require('joi');
const chaiAsPromised = require('chai-as-promised');

const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

use(chaiAsPromised);

describe('ProductController', () => {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#getById', () => {
    it('ao mandar um id inválido', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 'teste' };

      expect(productController.getById(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    // it('ao mandar um id válido', async () => {
    //   const req = {};
    //   const res = {};
    //   const data = { id: 1, name: "Martelo de Thor" };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub();

    //   req.params = { id: 1 };

    //   sinon.stub(productService, 'getById').resolves(data);
    //   const product = await productController.getById(req, res);

    //   // expect(res.status.calledWith(200)).to.be.equal(true);
    //   expect(product).to.be.a(object);
    // });
  });

  describe('#create', () => {
    it('ao mandar um nome vazio', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { nome: '' };

      expect(productController.create(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar um nome com menos de 5 caracteres', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { nome: 'Laço' };

      expect(productController.create(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar um nome com mais de 30 caracteres', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { nome: '1234567890123456789012345678901234567890' };

      expect(productController.create(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar um número e não um texto', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { nome: 123456 };

      expect(productController.create(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar uma chave vazia', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};

      expect(productController.create(req, res)).to.be
        .rejectedWith(ValidationError);
    });
  });
});
