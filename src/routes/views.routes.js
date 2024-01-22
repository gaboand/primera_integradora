import { Router } from "express";
import ProductsManager from "../services/fs/ProductManager.js";
import Message from "../services/dbManager/messageDB.js";
import CartsManager from "../services/fs/CartManager.js";
import CartDB from "../services/dbManager/cartDB.js";
import ProductDB from "../services/dbManager/productDB.js";
import MessageDB from "../services/dbManager/messageDB.js";

const viewsRouter = Router();
const productManager = new ProductsManager("src/products.json");
const cartManager = new CartsManager("src/carts.json");
const Messages = new Message();
const cartDB = new CartDB();
const productDB = new ProductDB();
const messageDB = new MessageDB();


viewsRouter.get("/products", async (req, res) => {
	const products = await productDB.getProducts();
	res.render("products", {
		title: "Listado de productos",
		products: products,
		style: "css/products.css",
	});
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
	const product = await productDB.getProducts();
	res.render("realtime", {
		title: "Productos en tiempo real",
		product: product,
		style: "css/products.css",
	});
});

viewsRouter.get("/carts", async (req, res) => {
	const carts = await cartDB.getCarts();

	res.render("carts", {
		title: "Cart",
		carts: carts,
		style: "css/cart.css",
	});
});


viewsRouter.get("/chat", async (req, res) => {
	const messages = await messageDB.findMessages();

	res.render("chat", {
		title: "Chat",
		messages: messages,
		style: "css/chat.css",
	});
});

viewsRouter.get("/carts/:id", async (req, res) => {
    try {
        const cartId = req.params.id;
        const detailedCart = await cartDB.getCartWithProductDetails(cartId);

		console.log(detailedCart);
        res.render("carts", {
            title: "Detalle del Carrito",
            detailedCart: detailedCart,
            style: "css/cart.css",
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default viewsRouter;
