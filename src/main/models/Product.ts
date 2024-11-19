import { queryDatabase } from "../database";

export class Product {
  private id: number;
  private name: string;
  private description: string;
  private price: number;
  private stock: number;

  constructor(name: string, description: string, price: number, stock: number, id?: number) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    if (id) this.id = id;
  }

  static async getAll(): Promise<Product[]> {
    const results = await queryDatabase("SELECT * FROM products");
    return results.map(
      (row: any) =>
        new Product(row.name, row.description, row.price, row.stock, row.id)
    );
  }

  async save(): Promise<void> {
    if (this.id) {
      await queryDatabase(
        "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
        [this.name, this.description, this.price, this.stock, this.id]
      );
    } else {
      const result = await queryDatabase(
        "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
        [this.name, this.description, this.price, this.stock]
      );
      this.id = result.insertId;
    }
  }

  static async delete(id: number): Promise<void> {
    await queryDatabase("DELETE FROM products WHERE id = ?", [id]);
  }
}
