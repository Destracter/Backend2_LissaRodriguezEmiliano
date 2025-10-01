import { OrderDAO } from '../daos/order.dao.js';

const orderDAO = new OrderDAO();

export const getOrders = async (req, res) => {
  const orders = await orderDAO.getAll();
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const order = await orderDAO.create(req.body);
  res.status(201).json(order);
};