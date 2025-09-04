import express from 'express';
import passport from 'passport';
import { createUser } from '../controllers/user.controller.js';
import { UserModel } from '../models/user.model.js';

const router = express.Router();

router.post('/', createUser);

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuario eliminado' });
});

export default router;