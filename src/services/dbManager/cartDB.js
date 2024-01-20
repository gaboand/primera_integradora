import { CartModel } from "../../dao/models/cart.js"; 

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
    

    async deleteById(id) {
    try{
        const cart = await CartModel.findByIdAndDelete(id);
        return cart;
    } catch (error) {
        throw error;
    }
    };
};

