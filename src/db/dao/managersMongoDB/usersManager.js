import { usersModel } from "../models/users.model.js";

class UsersManager {
  async findAll() {
    try {
      const response = await usersModel.find({}).lean();
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async findById(id) {
    try {
      const response = await usersModel.findById(id);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async createOne(obj) {
    try {
      const response = await usersModel.create(obj);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async updateOne(id, obj) {
    try {
      const result = await usersModel.updateOne({ _id: id }, obj);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteOne(id) {
    try {
      const result = await usersModel.deleteOne({ _id: id });
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

export const usersManager = new UsersManager();
