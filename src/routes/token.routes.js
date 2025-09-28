import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';

const router = express.Router();

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: 'Token requerido' });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await UserModel.findById(payload.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: 'Refresh token inválido o expirado' });
  }
});

export default router;