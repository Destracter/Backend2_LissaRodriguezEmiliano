import { UserModel } from '../models/user.model.js';

export class UserRepository {
  async findById(id) {
    return UserModel.findById(id);
  }
  async findByEmail(email) {
    return UserModel.findOne({ email });
  }
  async create(userData) {
    return UserModel.create(userData);
  }
  async update(id, data) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return UserModel.findByIdAndDelete(id);
  }
  async findAll() {
    return UserModel.find();
  }
}