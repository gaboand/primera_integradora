import { ProductsModel } from "../models/product.js"; 


export default class Product {
    constructor() {
        console.log("Product creado en DAO Products");
    }

    async getAll() {
        const product = await ProductsModel.find().lean();
        return product;
    }

    async getById(id) {
        const product = await ProductsModel.findById(id).lean();
        return product;
    }
    async saveProduct(product) {
        const newProduct = new ProductsModel(product);
        const products = await newProduct.save();
        return product;
    }
    async updateProduct(id, product) {
        const products = await ProductsModel.updateOne({ _id: id }, product);
        return product;
    }

    async deleteProduct(id) {
        const product = await ProductsModel.findByIdAndDelete(id);
        return product;
    }
};


