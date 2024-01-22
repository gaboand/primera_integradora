import express from "express";
import CartsManager from "../services/fs/CartManager.js";
import CartDB from "../services/dbManager/cartDB.js";

const cartsRouter = express.Router();
const cartsManager = new CartsManager();
const cartDB = new CartDB();

cartsRouter.post("/", async (req, res) => {
	try {
		const cartData = {}
		const cart = await cartDB.createCart(cartData);

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
        const limitNumber = limit ? parseInt(limit, 10) : 10;

        const carts = await cartDB.getCarts(limitNumber);

        if (carts.length === 0) {
            res.status(404).json({
                success: false,
                message: "Carritos no encontrados",
            });
            return;
        }

        res.status(200).json({
            success: true,
            carts,
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
			cart,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

cartsRouter.post("/:cid/product", async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid, quantity, otherDetails } = req.body;

        if (!pid || !quantity) {
            res.status(400).json({
                success: false,
                message: "Faltan datos del producto (ID y cantidad).",
            });
            return;
        }

        const cart = await cartDB.addProductToCart(cid, pid, quantity, otherDetails);
        if (!cart) {
            res.status(404).json({
                success: false,
                message: `No se pudo agregar el producto ${pid} al carrito ${cid}.`,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: `Producto ${pid} agregado al carrito ${cid}.`,
            cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

cartsRouter.delete("/:cid/product/:productEntryId", async (req, res) => {
    try {
        const { cid, productEntryId } = req.params;
        const deleted = await cartDB.deleteProductFromCart(cid, productEntryId);
        if (!deleted) {
            res.status(404).json({
                success: false,
                message: `No se pudo borrar la entrada del producto ${productEntryId} del carrito ${cid}.`,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: `Entrada del producto ${productEntryId} borrada del carrito ${cid}.`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

cartsRouter.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        
        await cartDB.deleteCartById(cid);
        
        const carts  = await cartDB.getCarts();
        res.status(200).json({
            success: true,
            carts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
})


export default cartsRouter;