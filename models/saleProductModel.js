const connection = require('./connection');

const saleProductModel = {

  async bulkAddBySale(saleId, products) {
    const map = products.map((product) => [saleId, product.productId, product.quantity]);

    const SQL = `
    INSERT INTO StoreManager.sales_products
      (sale_id, product_id, quantity)
      VALUES ?;
    `;
    await connection.query(SQL, [map]);
  },

  async remove(saleId) {
    const SQL = `DELETE FROM StoreManager.sales_products
      WHERE sale_id = ?;
    `;
    await connection.query(SQL, [saleId]); 
  },

  async edit(saleId, quantity, productId) {
    const SQL = `
      UPDATE StoreManager.sales_products SET quantity = ?
      WHERE sale_id = ? AND product_id = ?;
    `;
    await connection.query(SQL, [quantity, saleId, productId]);
  },
};

module.exports = saleProductModel;
