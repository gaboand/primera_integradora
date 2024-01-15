import mongoose from "mongoose";

const messageCollection = "messages";

const MessageSchema = new mongoose.Schema({
    client: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true },
});

export const MessagesModel = mongoose.model(messageCollection, MessageSchema);

