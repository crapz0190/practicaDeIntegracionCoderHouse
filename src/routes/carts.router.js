import { Router } from "express";
import { cartsManager } from "../db/dao/managersMongoDB/cartsManager.js";

const router = Router();

// lista todos los carritos
router.get("/", async (req, res) => {
  try {
    const listCarts = await cartsManager.findAll();
    res.status(200).json({ message: "List carts", payload: listCarts });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// muestra el carrito con el id especificado
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cartFound = await cartsManager.findById(cid);
    if (cartFound) {
      res.status(200).json({ message: "Cart found", payload: cartFound });
    } else {
      res.status(400).json({ message: "no existe" });
    }
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const addCart = await cartsManager.addCarts();
    res.status(200).json({ message: "New cart added", addCart });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  try {
    const addProduct = await cartsManager.addProductCart(cid, pid);
    res.status(200).json({ message: "Added product", payload: addProduct });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// elimina una unidad del quantity en el carrito
router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  try {
    const removeUnitCart = await cartsManager.deleteUnitCart(cid, pid);
    res
      .status(200)
      .json({ message: "Delete unit cart", payload: removeUnitCart });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// elimina un carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const removeCart = await cartsManager.deleteCart(cid);
    res.status(200).json({ message: "Delete cart", payload: removeCart });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

export default router;
