import { CartModel } from '../models/cart.model.js';

export class CartDAO {
  async findByUser(userId) {
    return CartModel.findOne({ user: userId });
  }

  async create(userId) {
    return CartModel.create({ user: userId, items: [] });
  }

  async save(cart) {
    return cart.save();
  }
}
