import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.model.js";

class CartsManager {
  async findAll() {
    try {
      const response = await cartsModel.find();
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async findById(cid) {
    try {
      const response = await cartsModel.findById(cid);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async addCarts() {
    try {
      const response = await cartsModel.insertMany();
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  // realizar correciones
  // se puede agregar el id del producto al carrito, pero al realizar su posterior incremento este no se realiza correctamente
  async addProductCart(cid, pid) {
    try {
      const cartFound = await this.findById(cid);
      const prodFound = await productsModel.findById(pid);

      const verifyId = cartFound.products.findIndex((product) =>
        product._id.equals(pid)
      );

      if (verifyId === -1) {
        cartFound.products.push({ _id: prodFound._id, quantity: 1 });
      } else {
        cartFound.products[verifyId].quantity++;
      }
      return cartFound.save();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUnitCart(cid, pid) {
    try {
      const cartFound = await this.findById(cid);
      const prodFound = await productsModel.findById(pid);

      if (cartFound.products.some((item) => (item._id = prodFound._id))) {
        const query = { _id: cartFound._id };

        const idProduct = cartFound.products.find(
          (product) => (product._id = pid)
        );
        idProduct.quantity--;
        await cartsModel.updateOne(
          query,
          { $set: cartFound },
          { $upsert: true }
        );

        return "Delete units";
      }
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCart(cid) {
    try {
      const removeCart = await cartsModel.deleteOne({ _id: cid });
      return removeCart;
    } catch (e) {
      console.log(e);
    }
  }
}

export const cartsManager = new CartsManager();