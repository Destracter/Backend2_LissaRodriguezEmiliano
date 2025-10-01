import express from 'express';
import passport from 'passport';
import { authorize } from '../middleware/auth.middleware.js';
import { getAllTickets, getTicketById, deleteTicket } from '../controllers/ticket.controller.js';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), authorize(['admin']), getAllTickets);
router.get('/:id', passport.authenticate('jwt', { session: false }), authorize(['admin']), getTicketById);
router.delete('/:id', passport.authenticate('jwt', { session: false }), authorize(['admin']), deleteTicket);

export default router;
