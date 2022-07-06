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

  // async edit(saleId, productId, quantity) {
  //   const SQL = `
  //   UPDATE StoreManager.sales_products SET
  //     product_id = ${productId}, quantity = ${quantity}
  //     WHERE sale_id = ${saleId} AND product_id = ${productId};
  //   `;
  //   // await connection.query(SQL, [productId, quantity, saleId, productId]);
  //   await connection.query(SQL);
  // },
};

module.exports = saleProductModel;
