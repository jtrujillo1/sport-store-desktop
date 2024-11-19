import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).send("Error al obtener los productos.");
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock } = req.body;
  try {
    const product = new Product(name, description, price, stock);
    await product.save();
    res.status(201).send("Producto creado exitosamente.");
  } catch (error) {
    res.status(500).send("Error al crear el producto.");
  }
};
