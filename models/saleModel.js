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
        FROM sales AS s
        INNER JOIN sales_products AS sp
        WHERE s.id = ? AND s.id = sp.sale_id
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
        FROM sales AS s
        INNER JOIN sales_products AS sp
        WHERE s.id = sp.sale_id
        ORDER BY sp.sale_id, sp.product_id;
    `;
    const [sales] = await connection.query(SQL);
    return sales;
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
