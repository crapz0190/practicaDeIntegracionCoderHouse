import { Router } from "express";
import { usersManager } from "../db/dao/managersMongoDB/usersManager.js";
import { productsManager } from "../db/dao/managersMongoDB/productsManager.js";

const router = Router();

router.get("/realtimeproducts", async (req, res) => {
  try {
    const getProducts = await productsManager.findAll();
    // console.log(getProducts);
    res.render("realTimeProducts", {
      title: "Products | Handlebars",
      products: getProducts,
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.post("/products/add", async (req, res) => {
  const obj = req.body;
  try {
    await productsManager.createOne(obj);
    res.redirect("/realtimeproducts");
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.get("/home", async (req, res) => {
  try {
    const getMessages = await usersManager.findAll();
    // console.log(getMessages);
    res.render("chat", {
      title: "Chat | Handlebars",
      messages: getMessages,
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.post("/message/add", async (req, res) => {
  const obj = req.body;
  try {
    await usersManager.createOne(obj);
    res.redirect("/home");
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.put("/message/:pid", async (req, res) => {
  const { pid } = req.params;
  const update = req.body;
  try {
    const updateProduct = await usersManager.updateOne(pid, update);
    res.status(200).json({ message: "Update Product", payload: updateProduct });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.delete("/message/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const removeProduct = await usersManager.deleteOne(pid);
    res.status(200).json({ message: "Delete Product", payload: removeProduct });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

export default router;
