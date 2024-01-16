import { Router } from "express";
import Carts from "../dao/dbManager/cart.js";
import Products from "../dao/dbManager/product.js";
import Messages from "../dao/dbManager/message.js";

const router = Router();

router.get("/carts", async (req, res) => {
  const carts = new Carts();
  const result = await carts.getAll();
  res.render("carts", { carts: result });
});

router.get("/products", async (req, res) => {
  const products = new Products();
  const result = await products.getAll();
  res.render("products", { products: result });
});

router.get("/messages", async (req, res) => {
  const messages = new Messages();
  const result = await messages.getAll();
  res.render("messages", { messages: result });
});

export default router


