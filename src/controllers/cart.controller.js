import { CartRepository } from '../repositories/cart.repository.js';

const cartRepo = new CartRepository();

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Faltan datos de producto o cantidad.' });
    }
    const cart = await cartRepo.addItem(userId, productId, quantity);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar al carrito.' });
  }
};