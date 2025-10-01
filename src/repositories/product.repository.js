import { ProductDAO } from '../daos/product.dao.js';

export class ProductRepository {
  constructor() {
    this.dao = new ProductDAO();
  }

  async findById(id) {
    return this.dao.findById(id);
  }

  async findAll() {
    return this.dao.findAll();
  }

  async create(data) {
    return this.dao.create(data);
  }

  async update(id, data) {
    return this.dao.update(id, data);
  }

  async delete(id) {
    return this.dao.delete(id);
  }
}
