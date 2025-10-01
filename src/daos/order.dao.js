import { OrderModel } from '../models/order.model.js';

export class OrderDAO {
  async getAll() {
    return OrderModel.find();
  }
  async getById(id) {
    return OrderModel.findById(id);
  }
  async create(data) {
    return OrderModel.create(data);
  }
  async update(id, data) {
    return OrderModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return OrderModel.findByIdAndDelete(id);
  }
}