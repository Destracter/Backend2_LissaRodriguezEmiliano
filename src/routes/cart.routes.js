import express from 'express';
import passport from 'passport';
import { authorize } from '../middleware/auth.middleware.js';
import { addToCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/add', passport.authenticate('jwt', { session: false }), authorize(['user' , 'admin']), addToCart);

export default router;