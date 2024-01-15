import mongoose from "mongoose";

const cartCollection = "carts";

const CartSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: {type: Number, required: true},
    thumbnail: { type: String, required: true },
    quantity: { type: Number, required: true },

});

export const CartModel = mongoose.model(cartCollection, CartSchema);


