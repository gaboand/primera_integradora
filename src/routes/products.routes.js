import express from "express";
import ProductManager from "../services/fs/ProductManager.js";
import ProductDB from "../services/dbManager/productDB.js";

const productsRouter = express.Router();
const productManager = new ProductManager();
const productDB = new ProductDB();

productsRouter.get("/", async (req, res) => {
	try {
		const { limit } = req.query;
		const products = await productDB.getProducts();

		if (products.length < 1) {
			res.status(404).json({
				success: false,
				message: "Los productos no se cargando",
			});
			return;
		}

		res.status(200).json({
			success: true,
			data: limit ? products.slice(0, limit) : products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});
productsRouter.get("/:pid", async (req, res) => {
	try {
		const { pid } = req.params;

		const product = await productDB.getProductsById(pid);

		if (!product) {
			res.status(404).json({
				success: false,
				message: "Producto no encontrado",
			});
			return;
		}

		res.status(200).json({
			success: true,
			data: product,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

productsRouter.post("/", async (req, res) => {
	try {
		const productData = req.body;
		console.log(req);
		const newProduct = await productDB.createProduct(productData);

		if (!newProduct) {
			res.status(400).json({
				success: false,
				message: "NO se pudo crear el producto",
			});
			return;
		}

		const products = await productDB.getProducts();
	
		res.status(200).json({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

productsRouter.put("/:pid", async (req, res) => {
	try {
		const { pid } = req.params;
		const productData = req.body;

		const updatedProduct = await productDB.updateProduct(pid, productData);

		if (!updatedProduct) {
			res.status(400).json({
				success: false,
				message: "No se pudo actualizar el producto",
			});
			return;
		}

		res.status(200).json({
			success: true,
			data: updatedProduct,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

productsRouter.delete("/:pid", async (req, res) => {
	try {
		const { pid } = req.params;

		await productDB.deleteProductById(pid);

		const products = await productDB.getProducts();

		res.status(200).json({
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

export default productsRouter;
