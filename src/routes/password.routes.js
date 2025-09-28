import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository.js';
import { sendMail } from '../services/service.mailing.js';

const router = express.Router();
const userRepo = new UserRepository();

router.post('/forgot', async (req, res) => {
  const { email } = req.body;
  const user = await userRepo.findByEmail(email);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const link = `http://localhost:8080/api/password/reset/${token}`;
  await sendMail(email, 'Recuperar contraseña', `<a href="${link}">Restablecer contraseña</a>`);
  res.json({ message: 'Correo enviado' });
});

router.post('/reset/:token', async (req, res) => {
  const { password } = req.body;
  try {
    const payload = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await userRepo.findById(payload.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: 'La nueva contraseña no puede ser igual a la anterior' });
    }

    const hashed = bcrypt.hashSync(password, 10);
    await userRepo.update(user._id, { password: hashed });
    res.json({ message: 'Contraseña actualizada' });
  } catch (err) {
    res.status(400).json({ error: 'Token inválido o expirado' });
  }
});

export default router;