import { CartModel } from "../../dao/models/cart.js"; 
import { ProductsModel } from "../../dao/models/product.js";

export default class CartDB {
    async createCart(cart) {
        try{
            const newCart = new CartModel(cart);
            const cartCollection = await newCart.save();
        return cartCollection; 
    } catch (error) {
        throw error;
    }
};

    async getCarts() {
    try{
        const cart = await CartModel.find().lean();
        return cart;
    } catch (error) {
        throw error;
    }
    };

    async getCartById(id) {
    try{
        const cart = await CartModel.findById(id).lean();
        return cart;
    } catch (error) {
        throw error;
    }
    };

    async addProductToCart(cid, productId, quantity) {
    try{
        const cart = await CartModel.findById(cid);
        const existingProductIndex = cart.products.findIndex(p => p.productId.equals(productId));
    
        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
    
        const updatedCart = await cart.save();
        return updatedCart;
    } catch (error) {
        throw error;
    }
    }

    async deleteProductFromCart(cid, productEntryId) {
        try {
            const cart = await CartModel.findById(cid);
            const productIndex = cart.products.findIndex(p => p._id.equals(productEntryId));
            if (productIndex >= 0) {
                cart.products.splice(productIndex, 1);
            } else {
                throw new Error("Producto no encontrado en el carrito");
            }
            const updatedCart = await cart.save();
            return updatedCart;
        } catch (error) {
            throw error;
        }
    }

    async deleteCartById(id) {
        try {
            const cart = await CartModel.findById(id);
            if (!cart) {
                return null;
            }
    
            const pruebaID = await CartModel.findByIdAndDelete(id);
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getCartWithProductDetails(cartId) {
        try {
            const cart = await CartModel.findById(cartId).lean();
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
    
            const productIds = cart.products.map(p => p.productId);
            const products = await ProductsModel.find({_id: { $in: productIds }}).lean();
    
            const detailedCart = cart.products.map(item => {
                const product = products.find(p => p._id.toString() === item.productId.toString());
    
                if (!product) {
                    return {
                        ...item,
                        title: "Producto no encontrado",
                        description: "",
                        price: 0,
                        thumbnail: ""
                    };
                }
    
                return {
                    ...item,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    thumbnail: product.thumbnail
                };
            });
    
            return detailedCart;
        } catch (error) {
            throw error;
        }
    }
    
};
