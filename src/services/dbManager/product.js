import { ProductsModel } from "../../dao/models/product.js";

export default class Product {
    constructor() {
        console.log("Product creado en DAO Products");
    }

    async getProducts() {
        const product = await ProductsModel.find().lean();
        return product;
    }

    async getProductsById(id) {
        const product = await ProductsModel.findById(id).lean();
        return product;
    }

    async createProduct(product) {
        const newProduct = new ProductsModel(product);
        const product = await newProduct.save();
        return product;
    }

    async updateProduct(id, product) {
        const product = await ProductsModel.updateOne({ _id: id }, product);
        return product;
    }

    async deleteProductById(id,productsUpdates) {
        const product = await ProductsModel.findByIdAndDelete(id);
        return product;
    }
};


