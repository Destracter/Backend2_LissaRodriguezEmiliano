import { UserDAO } from '../daos/user.dao.js';

export class UserRepository {
  constructor() {
    this.dao = new UserDAO();
  }

  async findById(id) {
    return this.dao.getById(id);
  }

  async findByEmail(email) {
    return this.dao.getByEmail(email);
  }

  async create(userData) {
    return this.dao.create(userData);
  }

  async update(id, data) {
    return this.dao.update(id, data);
  }

  async delete(id) {
    return this.dao.delete(id);
  }

  async findAll() {
    return this.dao.getAll();
  }
}
