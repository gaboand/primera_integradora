import { CartModel } from "../../dao/models/cart.js"; 

export default class CartDB {
    async createCart(cart) {
        try{
            const newCart = new CartModel();
            const cartCollection = await newCart.save();
        return cartCollection; 
    } catch (error) {
        throw error;
    }
};

    async getCarts() {
        const cart = await CartModel.find().lean();
        return cart;
    };

    async getCartById(id) {
        const cart = await CartModel.findById(id).lean();
        return cart;
    };

    async addProductToCart(cid, id) {
        const cart = await CartModel.findById(cid);
        cart.products.push(id);
        const updatedCart = await cart.save();
        return updatedCart;
        
    }

    async deleteById(id) {
        const cart = await CartModel.findByIdAndDelete(id);
        return cart;
    };
};

