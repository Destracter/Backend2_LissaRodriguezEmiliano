import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import sessionRoutes from './routes/session.routes.js';
import userRoutes from './routes/user.routes.js';
import loginRoutes from './routes/login.routes.js';


import './config/passport.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(passport.initialize());

app.use('/api/sessions', sessionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', loginRoutes);
app.get('/ping', (req, res) => {
  res.send('pong');
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}).catch(err => {
  console.error('Error al conectar a MongoDB:', err);
});
