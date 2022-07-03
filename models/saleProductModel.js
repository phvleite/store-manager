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
};

module.exports = saleProductModel;
