const { expect, use } = require('chai');
const sinon = require('sinon');
const { ValidationError } = require('joi');
const chaiAsPromised = require('chai-as-promised');

const saleController = require('../../../controllers/saleController');

use(chaiAsPromised);

describe('SaleController', () => {
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

      expect(saleController.getById(req, res)).to.be
        .rejectedWith(ValidationError);
    });
  });

  describe('#add', () => {
    it('ao mandar uma venda sem o id do produto deve disparar um erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = [{ quantity: 2 }];

      expect(saleController.add(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar uma venda sem a quantidade do produto deve disparar um erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = [{ productId: 1 }];

      expect(saleController.add(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar uma venda com o id de produto inexistente deve disparar um erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = [{ productId: 111, quantity: 5 }];

      expect(saleController.add(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar uma venda com a quantidade igual a zero deve disparar um erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = [{ productId: 111, quantity: 0 }];

      expect(saleController.add(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar uma venda com a quantidade menor que zero deve disparar um erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = [{ productId: 111, quantity: -20 }];

      expect(saleController.add(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar uma venda com a quantidade com valor não inteiro deve disparar um erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = [{ productId: 111, quantity: 20.55 }];

      expect(saleController.add(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar uma venda com a quantidade com valor não numérico deve disparar um erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = [{ productId: 111, quantity: "XX" }];

      expect(saleController.add(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar um array vazio deve disparar um erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = [];

      expect(saleController.add(req, res)).to.be
        .rejectedWith(ValidationError);
    });

    it('ao mandar uma venda em um objeto deve disparar um erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { productId: 1, quantity: 2 };

      expect(saleController.add(req, res)).to.be
        .rejectedWith(ValidationError);
    });
  });
});
