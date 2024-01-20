import { Router } from "express";
import  Messages from "../services/dbManager/message.js";

const messagesRouter = Router();
const messages = new Messages();


messagesRouter.post ("/", async (req, res) => {
  const { user, message } = req.body;
  try{
      const response = await message.createMesage({ user, message });
      if(!response) {
        res.status(400).json({
          success: false,
          message: "El mensaje no pudo ser creado",

        });

        req.io.emit("new-message", response);
        
        return res.status (201).json ({success: true, message: "El mensaje fue creado"});
      }
    } catch(error) {
      return res.status(500).json({ success: false, message: error.message });
    }
});

export default messagesRouter;