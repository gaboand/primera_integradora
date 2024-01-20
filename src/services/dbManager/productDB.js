import { ProductsModel } from "../../dao/models/product.js";

export default class ProductDB {
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
        const products = await newProduct.save();
        return product;
    }

    async updateProduct(id, product) {
        try {
            console.log("Actaulizando producto:", id, "con:", product);
            const result = await ProductsModel.updateOne({ _id: id }, product);
    
            if (result.nModified === 0) {
                console.log("El producto no se modificó.");
                return null; 
            }
    
            const updatedProduct = await ProductsModel.findById(id);
            return updatedProduct;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }
    

    async deleteProductById(id,productsUpdates) {
        const product = await ProductsModel.findByIdAndDelete(id);
        return product;
    }
};


