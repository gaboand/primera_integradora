import { Router } from "express";
import  Carts from "../dao/dbManager/cart.js";

const router = Router();
const carts = new Carts();

router.get ("/", async (req, res) => {
  try{
      const response = await carts.getAll();
      res.json(response);
    } catch(error) {
      console.log(error);
    }
  });

router.post ("/", async (req, res) => {
  const { title, description, price, thumbnail, quantity } = req.body;
  try{
      const response = await carts.saveCart({ title, description, price, thumbnail, quantity });
      res.json(response);
    } catch(error) {
      console.log(error);
    }
});

router.get ("/:id", async (req, res) => {
  const { id } = req.params;
  try{
      const response = await carts.getById(id);
      res.json(response);
    } catch(error) {
      console.log(error);
    }
});

router.post ("/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, dni, age, courses } = req.body;
  try{
      const response = await carts.updateCart(id, { first_name, last_name, email, dni, age, courses });
      res.json(response);
    } catch(error) {
      console.log(error);
    }
})

router.delete ("/:id", async (req, res) => {
  const { id } = req.params;
  try{
      const response = await carts.deleteById(id);
      res.json(response);
    } catch(error) {
      console.log(error);
    }
})

export default router;