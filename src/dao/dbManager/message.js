import { MessagesModel } from "../models/message.js"; 

export default class Message {

    async getAll() {
        const message = await MessagesModel.find().lean();
        return message;
    }

    async getById(id) {
        const message = await MessagesModel.findById(id).lean();
        return message;
    }

    async deleteProduct(id) {
        const message = await MessagesModel.findByIdAndDelete(id);
        return message;
    }
};


