import { CartRepository } from '../repositories/cart.repository.js';

const cartRepo = new CartRepository();

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const cart = await cartRepo.addItem(userId, productId, quantity);
  res.json(cart);
};