import { TicketModel } from '../models/ticket.model.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { CartRepository } from '../repositories/cart.repository.js';
import { UserRepository } from '../repositories/user.repository.js';

const productRepo = new ProductRepository();
const cartRepo = new CartRepository();
const userRepo = new UserRepository();

export const purchaseCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await cartRepo.findByUser(userId);

  if (!cart || !cart.items || cart.items.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío.' });
  }

  let total = 0;
  let productsNoStock = [];

  for (const item of cart.items) {
    const product = await productRepo.findById(item.productId);
    if (product && product.stock >= item.quantity) {
      product.stock -= item.quantity;
      await productRepo.update(product._id, { stock: product.stock });
      total += product.price * item.quantity;
    } else {
      productsNoStock.push(product ? product.name : 'Producto no encontrado');
    }
  }

  if (total > 0) {
    const ticket = await TicketModel.create({
      code: Math.random().toString(36).substring(2, 10),
      amount: total,
      purchaser: req.user.email
    });
  
    cart.items = [];
    await cart.save();
    return res.json({ message: 'Compra realizada', ticket, productsNoStock });
  } else {
    return res.status(400).json({ error: 'No hay productos disponibles para comprar', productsNoStock });
  }
};