const connection = require('./connection');

const saleModel = {

  async exists(id) {
    const SQL = `SELECT * FROM StoreManager.sales
      WHERE sales.id = ?`;
    const [[exists]] = await connection.query(SQL, [id]);
    return !!exists;
  },

  async getById(id) {
    const SQL = `
      SELECT
        s.date AS 'date',
        sp.product_id AS 'productId',
        sp.quantity AS 'quantity'
        FROM StoreManager.sales AS s
        INNER JOIN StoreManager.sales_products AS sp
        ON s.id = sp.sale_id
        WHERE s.id = ?
        ORDER BY sp.sale_id, sp.product_id;
    `;
    const [sale] = await connection.query(SQL, [id]);
    return sale;
  },

  async list() {
    const SQL = `
      SELECT
        s.id AS 'saleId',
        s.date AS 'date',
        sp.product_id AS 'productId',
        sp.quantity AS 'quantity'
        FROM StoreManager.sales AS s
        INNER JOIN StoreManager.sales_products AS sp
        ON s.id = sp.sale_id
        ORDER BY sp.sale_id, sp.product_id;
    `;
    const [sales] = await connection.query(SQL);
    return sales;
  },

  async remove(id) {
    const SQL = `DELETE FROM StoreManager.sales
      WHERE id = ?;
    `;
    await connection.query(SQL, [id]);
  },

  async add() {
    const SQL = `INSERT INTO StoreManager.sales (date)
      VALUES (NOW(3));
    `;
    const [{ insertId }] = await connection.query(SQL);
    return insertId;
  },
};

module.exports = saleModel;
