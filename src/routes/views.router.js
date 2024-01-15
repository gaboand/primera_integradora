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


//ESTO ES DEL VIEW CORREGIDO POR SANTIAGO
// import { Router } from "express";
// import ProductManager from "../services/ProductsManager.js";

// const viewsRouter = Router();
// const productManager = new ProductManager("src/products.json");

// viewsRouter.get("/products", async (req, res) => {
// 	const products = await productManager.getProducts();
// 	res.render("products", {
// 		title: "Listado de productos",
// 		products: products,
// 		style: "css/products.css",
// 	});
// });

// viewsRouter.get("/realtimeproducts", async (req, res) => {
// 	const products = await productManager.getProducts();
// 	res.render("realtime", {
// 		title: "Productos en tiempo real",
// 		products: products,
// 		style: "css/products.css",
// 	});
// });

// export default viewsRouter;