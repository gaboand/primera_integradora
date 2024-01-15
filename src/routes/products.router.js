import { Router } from "express";
import Products from "../dao/dbManager/product.js";

const router = Router();
const products = new Products();

router.get("/", async (req, res) => {
  try{
    const response = await products.getAll();
    res.json(response);
  } catch(error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try{
    const response = await products.getById(id);
    res.json(response);
  } catch(error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock, status } = req.body;
try{
  const response = await products.saveProduct({ title, description, price, thumbnail, code, stock, status });
  res.json(response);
} catch(error) {
  console.log(error);
} 
});

router.put("/:id", async (req, res) => {
const { id } = req.params;
const { title, description, price, thumbnail, code, stock, status } = req.body;
try{
  const response = await products.updateProduct(id, { title, description, price, thumbnail, code, stock, status });
  res.json(response);
} catch(error) {
  console.log(error);
}
});

router.delete("/:id", async (req, res) => {
const { id } = req.params;
try{
  const response = await products.deleteProduct(id);
  res.json(response);
} catch(error) {
  console.log(error);
}
});

export default router;