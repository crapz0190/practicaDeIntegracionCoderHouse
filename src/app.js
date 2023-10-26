import express from "express";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerViews from "./routes/views.router.js";
import { engine } from "express-handlebars";
import dirname from "./utils.js";
import { join } from "node:path";
import morgan from "morgan";
import { createServer } from "node:http";
import { Server as SocketServer } from "socket.io";
import { usersManager } from "./db/dao/managersMongoDB/usersManager.js";
import { productsManager } from "./db/dao/managersMongoDB/productsManager.js";

const app = express();
const server = createServer(app);
const io = new SocketServer(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(dirname, "public")));
app.use(morgan("dev"));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", join(dirname, "views"));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/", routerViews);
export default server;

io.on("connection", (socketServer) => {
  console.log(`New client connected: ${socketServer.id}`);

  // ------------------- messages ---------------------
  socketServer.on("idUpdate", async (id) => {
    const idFound = await usersManager.findById(id);
    socketServer.emit("loadlist", idFound);
  });

  socketServer.on("updatelist", async (update) => {
    const id = update.idMessageForm;
    delete update.idMessageForm;

    await usersManager.updateOne(id, update);
  });

  socketServer.on("idDelete", async (id) => {
    const deleteProduct = await usersManager.deleteOne(id);
    socketServer.emit("loadlist", deleteProduct);
  });

  // ------------------- products ---------------------

  socketServer.on("idUpdateProducts", async (id) => {
    const idFound = await productsManager.findById(id);
    socketServer.emit("loadListProducts", idFound);
  });

  socketServer.on("updateListProducts", async (update) => {
    const id = update.idProductForm;
    delete update.idProductForm;

    await productsManager.updateOne(id, update);
  });

  socketServer.on("idDeleteProducts", async (id) => {
    const deleteProduct = await productsManager.deleteOne(id);
    socketServer.emit("loadListProducts", deleteProduct);
  });
});
