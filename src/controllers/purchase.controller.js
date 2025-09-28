import { TicketModel } from '../models/ticket.model.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { UserRepository } from '../repositories/user.repository.js';

const productRepo = new ProductRepository();
const userRepo = new UserRepository();

export const purchaseCart = async (req, res) => {
  const userId = req.user._id;
  const user = await userRepo.findById(userId);
  const cart = user.cart;
  let total = 0;
  let productsNoStock = [];

  for (const item of cart.items) {
    const product = await productRepo.findById(item.productId);
    if (product.stock >= item.quantity) {
      product.stock -= item.quantity;
      await productRepo.update(product._id, { stock: product.stock });
      total += product.price * item.quantity;
    } else {
      productsNoStock.push(product.name);
    }
  }

  if (total > 0) {
    const ticket = await TicketModel.create({
      code: Math.random().toString(36).substring(2, 10),
      amount: total,
      purchaser: user.email
    });
    return res.json({ message: 'Compra realizada', ticket, productsNoStock });
  } else {
    return res.status(400).json({ error: 'No hay productos disponibles para comprar', productsNoStock });
  }
};