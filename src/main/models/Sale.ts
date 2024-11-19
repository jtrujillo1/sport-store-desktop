import { queryDatabase } from "../database";
import { SaleProduct } from "./SaleProduct";

export class Sale {
  private id: number;
  private totalPrice: number;
  private date: Date;

  constructor(totalPrice: number, date: Date, id?: number) {
    this.totalPrice = totalPrice;
    this.date = date;
    if (id) this.id = id;
  }

  static async getAll(): Promise<Sale[]> {
    const results = await queryDatabase("SELECT * FROM sales");
    return results.map(
      (row: any) => new Sale(row.total_price, row.date, row.id)
    );
  }

  async save(): Promise<void> {
    if (this.id) {
      await queryDatabase(
        "UPDATE sales SET total_price = ?, date = ? WHERE id = ?",
        [this.totalPrice, this.date, this.id]
      );
    } else {
      const result = await queryDatabase(
        "INSERT INTO sales (total_price, date) VALUES (?, ?)",
        [this.totalPrice, this.date]
      );
      this.id = result.insertId;
    }
  }

  async addProduct(productId: number, quantity: number): Promise<void> {
    const saleProduct = new SaleProduct(this.id, productId, quantity);
    await saleProduct.save();
  }

  static async delete(id: number): Promise<void> {
    await queryDatabase("DELETE FROM sales WHERE id = ?", [id]);
  }
}
