import { CartModel } from '../models/cart.model.js';

export class CartRepository {
  async findByUser(userId) {
    return CartModel.findOne({ user: userId });
  }

  async addItem(userId, productId, quantity) {
    let cart = await this.findByUser(userId);
    if (!cart) {
      cart = await CartModel.create({
        user: userId,
        items: []
      });
    }
    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    return cart;
  }
}