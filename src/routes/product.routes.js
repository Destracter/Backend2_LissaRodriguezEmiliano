import express from 'express';
import passport from 'passport';
import { authorize } from '../middleware/auth.middleware.js';
import { createProduct, updateProduct, deleteProduct, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', passport.authenticate('jwt', { session: false }), authorize(['admin']), createProduct);
router.put('/:id', passport.authenticate('jwt', { session: false }), authorize(['admin']), updateProduct);
router.delete('/:id', passport.authenticate('jwt', { session: false }), authorize(['admin']), deleteProduct);

export default router;