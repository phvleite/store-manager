const { expect, use } = require('chai');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
const chaiAsPromised = require('chai-as-promised');

const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');

use(chaiAsPromised);

describe('ProductService', () => {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#validateParamsId', () => {
    it('se mandar um id válido deve retornar um objeto válido', () => {
      const object = productService.validateParamsId({ id: 1 });
      expect(object).to.be.deep.eq({ id: 1 });
    });

    it('se mandar um id inválido deve disparar um erro', () => {
      expect(() => productService.validateParamsId({ id: 'teste' })).to
        .throws('"id" must be a number');
    });
  });

  describe('#checkIfExists', () => {
    it('ao mandar um id que existe deve retorna "true"', async () => {
      sinon.stub(productModel, 'exists').resolves(true);
      const exists = await productService.checkIfExists(1);
      expect(exists).to.be.eq(true);
    });

    it('ao mandar um id que não existe deve retorna "false"', () => {
      sinon.stub(productModel, 'exists').resolves(false);
      expect(productService.checkIfExists(1001)).to.be
        .rejectedWith(NotFoundError);
    });
  });

  describe('#checkIfExistsProduct', () => {
    it('ao mandar um nome de produto que não existe deve retorna "false"', async () => {
      sinon.stub(productModel, 'existsProduct').resolves(false);
      const existsProduct = await productService.checkIfExistsProduct({ name: 'Laço da Mulher Maravilha' });
      expect(existsProduct).to.be.eq(false);
    });

    it('ao mandar um nome de produto que existe deve retorna "true"', () => {
      sinon.stub(productModel, 'existsProduct').resolves(true);
      expect(productService.checkIfExistsProduct({ name: 'Martelo de Thor' })).to.be
        .rejectedWith(NotFoundError);
    });
  });

  describe('#list', () => {
    it('deve disparar um erro caso productModel.list dispare um erro', () => {
      sinon.stub(productModel, 'list').rejects();
      expect(productService.list()).to.eventually.be.rejected;
    });

    it('deve retornar uma lista caso productModel.list retorne uma', () => {
      sinon.stub(productModel, 'list').resolves([]);
      expect(productService.list()).to.eventually.deep.equal([]);
    });
  });

  describe('#create', () => {
    it('deve disparar um erro caso productModel.creat dispare um erro', () => {
      sinon.stub(productModel, 'create').rejects();
      expect(productService.create()).to.eventually.be.rejected;
    });

    it('deve retornar um id caso productModel.creat retorne um', () => {
      sinon.stub(productModel, 'create').resolves(1);
      expect(productService.create({})).to.eventually.equal(1);
    });
  });

  describe('#remove', () => {
    it('deve disparar um erro caso productModel.remove dispare um erro', () => {
      sinon.stub(productModel, 'remove').rejects();
      expect(productService.remove(1)).to.eventually.be.rejected;
    });

    it('deve retornar caso productModel.remove remova o produto', () => {
      sinon.stub(productModel, 'remove').resolves();
      expect(productService.remove(1)).to.eventually.be.undefined;
    });
  });

  describe('#edit', () => {
    it('deve disparar um erro caso productModel.edit dispare um erro', () => {
      sinon.stub(productModel, 'edit').rejects();
      expect(productService.edit(1)).to.eventually.be.rejected;
    });

    it('deve retornar caso productModel.edit altere o produto', () => {
      sinon.stub(productModel, 'edit').resolves();
      expect(productService.edit(1)).to.eventually.be.undefined;
    });
  });

  describe('#getById', () => {
    it('deve disparar um erro caso productModel.getById dispare um erro', () => {
      sinon.stub(productModel, 'getById').rejects();
      expect(productService.getById(1)).to.eventually.be.rejected;
    });

    it('deve retornar um objeto caso productModel.getById retorn', () => {
      sinon.stub(productModel, 'getById').resolves({});
      expect(productService.getById(1)).to.eventually.deep.equal({});
    });
  });

  describe('#getBySearch', () => {
    it('deve disparar um erro caso productModel.getBySearch dispare um erro', () => {
      sinon.stub(productModel, 'getBySearch').rejects();
      expect(productService.getBySearch(1)).to.eventually.be.rejected;
    });

    it('deve retornar uma lista de objetos caso productModel.getBySearch retorn', () => {
      sinon.stub(productModel, 'getBySearch').resolves({});
      expect(productService.getBySearch(1)).to.eventually.deep.equal([{}]);
    });
  });
});
