import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export const CartModel = mongoose.model('Cart', cartSchema);