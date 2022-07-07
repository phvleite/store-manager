const connection = require('./connection');

const productModel = {

  async exists(id) {
    const SQL = `SELECT * FROM StoreManager.products
      WHERE products.id = ?`;
    const [[exists]] = await connection.query(SQL, [id]);
    return !!exists;
  },

  async existsProduct(data) {
    const SQL = `SELECT * FROM StoreManager.products
      WHERE products.name = ?`;
    const [[exists]] = await connection.query(SQL, [data.name]);
    return !!exists;
  },

  async getBySearch(q) {
    const SQL = `SELECT * FROM StoreManager.products
      WHERE products.name LIKE '%${q}%'`;
    const [products] = await connection.query(SQL);
    return products;
  },

  async remove(id) {
    const SQL = `DELETE FROM StoreManager.products
      WHERE id = ?;
    `;
    await connection.query(SQL, [id]);
  },

  async create(data) {
    const SQL = `INSERT INTO StoreManager.products (name)
      VALUES (?);
    `;
    const [{ insertId }] = await connection.query(SQL, [data.name]);
    return insertId;
  },

  async edit(id, changes) {
    console.log(changes);
    const SQL = 'UPDATE StoreManager.products SET ? WHERE id = ?;';
    const [{ affectedRows }] = await connection.query(SQL, [changes, id]);
    return Boolean(affectedRows);
  },

  async getById(id) {
    const SQL = `SELECT * FROM StoreManager.products
      WHERE products.id = ?`;
    const [[product]] = await connection.query(SQL, [id]);
    return product;
  },
  
  async listByArrayOfId(arrayOfId) {
    const SQL = `
      SELECT *
      FROM StoreManager.products
      WHERE id IN (?);`;

    const [products] = await connection.query(SQL, [arrayOfId]);
    return products;
  },

  async list() {
    const SQL = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.query(SQL);
    return products;
  },
};

module.exports = productModel;
