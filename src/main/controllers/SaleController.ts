import { Request, Response } from "express";
import { Sale } from "../models/Sale";

export const getAllSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.getAll();
    res.json(sales);
  } catch (error) {
    res.status(500).send("Error al obtener las ventas.");
  }
};

export const createSale = async (req: Request, res: Response) => {
  const { totalPrice, products } = req.body;
  try {
    const sale = new Sale(totalPrice, new Date());
    await sale.save();

    for (const product of products) {
      await sale.addProduct(product.id, product.quantity);
    }

    res.status(201).send("Venta creada exitosamente.");
  } catch (error) {
    res.status(500).send("Error al crear la venta.");
  }
};
