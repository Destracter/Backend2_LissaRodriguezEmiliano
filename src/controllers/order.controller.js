import { OrderDAO } from '../daos/order.dao.js';
import Joi from 'joi';

const orderDAO = new OrderDAO();

const orderSchema = Joi.object({
  user: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().min(1).required()
    })
  ).min(1).required(),
  total: Joi.number().min(0).required()
});

export const getOrders = async (req, res) => {
  try {
    const orders = await orderDAO.getAll();
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createOrder = async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const order = await orderDAO.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.error('Error al crear orden:', err);
    res.status(500).json({ error: 'Error al guardar la orden' });
  }
};
