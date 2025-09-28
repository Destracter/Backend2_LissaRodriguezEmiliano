import express from 'express';
import passport from 'passport';
import { UserDTO } from '../dtos/user.dto.js';

const router = express.Router();

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: new UserDTO(req.user) });
});

export default router;