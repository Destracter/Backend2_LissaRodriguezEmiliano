import express from 'express';
import passport from 'passport';
import { purchaseCart } from '../controllers/purchase.controller.js';
import { authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), authorize(['user' , 'admin']), purchaseCart);

export default router;