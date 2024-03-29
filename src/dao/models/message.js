import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
},
{ 
    timestamps: true, 
}
);

export const MessagesModel = mongoose.model("messages", MessageSchema);

