import { string } from 'joi';
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  items: [{ product: String, quantity: Number }],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

export const OrderModel = mongoose.model('Order', orderSchema);