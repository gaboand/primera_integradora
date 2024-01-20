import { Router } from "express";
import ProductsManager from "../services/fs/ProductManager.js";
import Message from "../services/dbManager/messageDB.js";
import CartsManager from "../services/fs/CartManager.js";

const viewsRouter = Router();
const productManager = new ProductsManager("src/products.json");
const cartManager = new CartsManager("src/carts.json");
const Messages = new Message();

viewsRouter.get("/products", async (req, res) => {
	const products = await productManager.getProducts();
	res.render("products", {
		title: "Listado de productos",
		products: products,
		style: "css/products.css",
	});
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
	const products = await productManager.getProducts();
	res.render("realtime", {
		title: "Productos en tiempo real",
		products: products,
		style: "css/products.css",
	});
});

viewsRouter.get("/carts", async (req, res) => {
	const carts = await cartManager.getCarts();

	res.render("carts", {
		title: "Cart",
		carts: carts,
		style: "css/cart.css",
	});
});


viewsRouter.get("/chat", async (req, res) => {
	const messages = await Messages.findMessages();

	res.render("chat", {
		title: "Chat",
		messages: messages,
		style: "css/chat.css",
	});
});
export default viewsRouter;