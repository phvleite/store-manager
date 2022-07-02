const connection = require('./connection');

const saleModel = {

  async add() {
    const SQL = `INSERT INTO StoreManager.sales (date)
      VALUES (NOW(3));
    `;
    const [{ insertId }] = await connection.execute(SQL);
    return insertId;
  },
};

module.exports = saleModel;
