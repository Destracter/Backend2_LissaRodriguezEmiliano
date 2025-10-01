import { TicketDAO } from '../daos/ticket.dao.js';

export class TicketRepository {
  constructor() {
    this.dao = new TicketDAO();
  }

  async createTicket({ amount, purchaser }) {
    const ticketData = {
      code: Math.random().toString(36).substring(2, 10),
      purchase_datetime: new Date(),
      amount,
      purchaser
    };
    return this.dao.create(ticketData);
  }

  async getTicket(id) {
    return this.dao.findById(id);
  }

  async getAllTickets() {
    return this.dao.findAll();
  }

  async deleteTicket(id) {
    return this.dao.delete(id);
  }
}
