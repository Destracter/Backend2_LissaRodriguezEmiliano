import { ProductModel } from '../models/product.model.js';

export class ProductDAO {
  async findById(id) {
    return ProductModel.findById(id);
  }
  async findAll() {
    return ProductModel.find();
  }
  async create(data) {
    return ProductModel.create(data);
  }
  async update(id, data) {
    return ProductModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return ProductModel.findByIdAndDelete(id);
  }
}
