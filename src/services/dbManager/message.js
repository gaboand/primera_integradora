import { MessagesModel } from "../../dao/models/message.js"; 

export default class Message {

    async createMessage(message) {
        const newMessage = await MessagesModel.create(message);
        return newMessage;
    }

    async findMessages() {
        const message = await MessagesModel.find().lean();
        return message;
    }
};


