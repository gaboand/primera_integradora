import express from "express";
import CartsManager from "../services/fs/CartManager.js";
import CartDB from "../services/dbManager/cartDB.js";

const cartsRouter = express.Router();
const cartsManager = new CartsManager();
const cartDB = new CartDB();

cartsRouter.post("/", async (req, res) => {
	try {
		await cartDB.createCart();

		res.status(200).json({
			success: true,
			message: "Carrito creado correctamente",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});


cartsRouter.get("/", async (req, res) => {
	try {
		const { limit } = req.query;
		const products = await cartDB.getProducts();

		if (products.length < 1) {
			res.status(404).json({
				success: false,
				message: "Carritos no encontrados",
			});
			return;
		}

		res.status(200).json({
			success: true,
			cart,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});


cartsRouter.get("/:cid", async (req, res) => {
	try {
		const { cid } = req.params;
		const cart = await cartDB.getCartById(cid);

		if (!cart) {
			res.status(404).json({
				success: false,
				message: "Carrito no encontrado",
			});
			return;
		}

		res.status(200).json({
			success: true,
			message: "Carrito enviado",
			cart,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
	try {
		const { cid, pid } = req.params;

		const cart = await cartDB.addProductToCart(cid, pid);
		if (!cart) {
			res.status(400).json({
				success: false,
				message: "Product ",
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: `Producto ${pid} agregado al carrito ${cid}`,
			cart,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

export default cartsRouter;