const cds = require("@sap/cds");
class CatalogService extends cds.ApplicationService {
  async init() {
    const db = await cds.connect.to("db"); // connect to database service
    const { Books } = db.entities; // get reflected definitions

    // Reduce stock of ordered books if available stock suffices
    this.on("submitOrder", async (req) => {
      const { book, quantity } = req.data;
      const n = await UPDATE(Books, book)
        .with({ stock: { "-=": quantity } })
        .where({ stock: { ">=": quantity } });
      n > 0 || req.error(409, `${quantity} exceeds stock for book #${book}`);
    });

    // Add some discount for overstocked books
    this.after("each", "Books", (book) => {
      if (book.stock > 111) book.title += ` -- 11% discount!`;
    });

    return super.init();
  }
}
module.exports = CatalogService;
