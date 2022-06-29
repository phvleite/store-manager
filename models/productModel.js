const connection = require('./connection');

const productModel = {

  async exists(id) {
    const SQL = `SELECT * FROM StoreManager.products
      WHERE products.id = ?`;
    const [[exists]] = await connection.execute(SQL, [id]);
    return !!exists;
  },

  async getById(id) {
    const SQL = `SELECT * FROM StoreManager.products
      WHERE products.id = ?`;
    const [[product]] = await connection.execute(SQL, [id]);
    return product;
   },
  
  async list() {
    const SQL = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.execute(SQL);
    return products;
  },
};

module.exports = productModel;
