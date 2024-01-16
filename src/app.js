import express from "express"; 
import { Server } from "socket.io"; 
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import messageRouter from "./routes/messages.router.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import IndexRouter from "./routes/index.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/messages", messageRouter);
app.use("/", viewsRouter);

mongoose.connect(DB_URL).then(() => {
  console.log("Base de datos conectada");
}).catch((error) => {
  console.error("Error al conectar a la base de datos:", error);
});

// Middleware que agrega el servidor de ws (io) a todas las peticiones que llegan al servidor VIENE DE LA CORRECCION DE SANTIAGO
app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use("/", IndexRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor está corriendo en el puerto ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
	console.log("Se conecto un nuevo ususario");
});

export default app;
