import { TicketRepository } from '../repositories/ticket.repository.js';

const ticketRepo = new TicketRepository();

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketRepo.getAllTickets();
    res.json(tickets);
  } catch (error) {
    console.error('Error al obtener tickets:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await ticketRepo.getTicket(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.json(ticket);
  } catch (error) {
    console.error('Error al obtener ticket:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const deleted = await ticketRepo.deleteTicket(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.json({ message: 'Ticket eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar ticket:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
