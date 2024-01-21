import mongoose from "mongoose";

const productCollection = "products";

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: {type: Number, required: true},
    thumbnail: { type: String },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, }
});

export const ProductsModel = mongoose.model(productCollection, ProductSchema);