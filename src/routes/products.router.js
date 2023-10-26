import { Router } from "express";
import { productsManager } from "../db/dao/managersMongoDB/productsManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productsManager.findAll(limit);
    res.status(200).json({ message: "Products", payload: products });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productId = await productsManager.findById(pid);
    res.status(200).json({ message: "Product found", payload: productId });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    const createProduct = await productsManager.createOne(newProduct);
    res
      .status(200)
      .json({ message: "Product created", payload: createProduct });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const update = req.body;
  try {
    const updateProduct = await productsManager.updateOne(pid, update);
    res.status(200).json({ message: "Update Product", payload: updateProduct });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const removeProduct = await productsManager.deleteOne(pid);
    res.status(200).json({ message: "Delete Product", payload: removeProduct });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

export default router;
