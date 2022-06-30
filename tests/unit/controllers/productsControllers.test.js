const { expect, use } = require('chai');
const sinon = require('sinon');
const { ValidationError } = require('joi');
const NotFoundError = require('../../../errors/NotFoundError');
const chaiAsPromised = require('chai-as-promised');

const productController = require('../../../controllers/productController');

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
  });
});
