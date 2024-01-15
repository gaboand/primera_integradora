import {CartModel} from "../models/cart.js";

export default class Cart {

    async getAll() {
        const cart = await CartModel.find().lean();
        return cart;
    };

    async getById(id) {
        const cart = await CartModel.findById(id).lean();
        return cart;
    };

    async saveCart(cart) {
        const newCart = new CartModel(cart);
        const cartCollection = await newCart.save();
        return cart;
    };

    async deleteById(id) {
        const cart = await CartModel.findByIdAndDelete(id);
        return cart;
    };
};

