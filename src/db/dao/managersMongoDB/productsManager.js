import { productsModel } from "../models/products.model.js";

class ProductManager {
  async findAll(limit) {
    try {
      const result = await productsModel.find({}).lean();
      const setLimit = result.slice(0, limit);
      if (!limit) return result;

      return setLimit;
    } catch (e) {
      console.log(e);
    }
  }

  async findById(id) {
    try {
      const result = await productsModel.findById(id);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async createOne(obj) {
    try {
      const result = await productsModel.create(obj);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async updateOne(id, obj) {
    try {
      const result = await productsModel.updateOne({ _id: id }, obj);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteOne(id) {
    try {
      const result = await productsModel.deleteOne({ _id: id });
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

export const productsManager = new ProductManager();
