import { queryDatabase } from "../database";

export class SaleProduct {
  private saleId: number;
  private productId: number;
  private quantity: number;

  constructor(saleId: number, productId: number, quantity: number) {
    this.saleId = saleId;
    this.productId = productId;
    this.quantity = quantity;
  }

  async save(): Promise<void> {
    await queryDatabase(
      "INSERT INTO sale_product (sale_id, product_id, quantity) VALUES (?, ?, ?)",
      [this.saleId, this.productId, this.quantity]
    );
  }

  static async getProductsBySale(saleId: number): Promise<any[]> {
    const results = await queryDatabase(
      "SELECT p.name, sp.quantity FROM sale_product sp JOIN products p ON sp.product_id = p.id WHERE sp.sale_id = ?",
      [saleId]
    );
    return results;
  }
}
