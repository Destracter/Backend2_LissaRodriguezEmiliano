import { CartDAO } from '../daos/cart.dao.js';

export class CartRepository {
  constructor() {
    this.dao = new CartDAO();
  }

  async findByUser(userId) {
    return this.dao.findByUser(userId);
  }

  async addItem(userId, productId, quantity) {
    let cart = await this.dao.findByUser(userId);
    if (!cart) {
      cart = await this.dao.create(userId);
    }

    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await this.dao.save(cart);
    return cart;
  }
}
