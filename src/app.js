import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import sessionRoutes from './routes/session.routes.js';
import userRoutes from './routes/user.routes.js';
import loginRoutes from './routes/login.routes.js';
import passwordRoutes from './routes/password.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import tokenRoutes from './routes/token.routes.js';
import orderRoutes from './routes/order.routes.js';
import ticketRoutes from './routes/ticket.routes.js'

import './config/passport.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(passport.initialize());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: ['http://localhost:8080','http://localhost:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/api/tickets', ticketRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', loginRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/orders', orderRoutes);

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