import { Router } from "express";
import ProductsManager from "../dao/services/ProductManager.js";

const viewsRoutes = Router();
const productManager = new ProductsManager("src/products.json");

viewsRoutes.get("/fsproducts", async (req, res) => {
	const products = await productManager.getProducts();
	res.render("fsproducts", {
		title: "Listado de productos FS",
		products: products,
		style: "css/products.css",
	});
});

viewsRoutes.get("/realtimeproducts", async (req, res) => {
	const products = await productManager.getProducts();
	res.render("realtimeproducts", {
		title: "Productos en tiempo real",
		products: products,
		style: "css/products.css",
	});
});

export default viewsRoutes;