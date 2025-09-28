import { CartModel } from '../models/cart.model.js';

export class CartRepository {
  async findByUser(userId) {
    return CartModel.findOne({ user: userId });
  }
  async addItem(userId, productId, quantity) {
    const cart = await this.findByUser(userId);
    const item = cart.items.find(i => i.productId.equals(productId));
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    return cart;
  }
}