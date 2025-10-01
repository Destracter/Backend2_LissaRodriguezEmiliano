import { BusinessModel } from '../models/business.model.js';

export class BusinessDAO {
  async getAll() {
    return BusinessModel.find();
  }
  async getById(id) {
    return BusinessModel.findById(id);
  }
  async create(data) {
    return BusinessModel.create(data);
  }
  async update(id, data) {
    return BusinessModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return BusinessModel.findByIdAndDelete(id);
  }
}