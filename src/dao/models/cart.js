import mongoose from "mongoose";

const cartCollection = "carts";

const CartSchema = new mongoose.Schema({
    products: [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, required: true, min: 1}             
    }],

});

export const CartModel = mongoose.model(cartCollection, CartSchema);