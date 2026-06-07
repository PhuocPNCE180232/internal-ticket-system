import axios from 'axios';
import { mockApi } from './mock-api';
import { TicketStatus } from '@/types';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Đường dẫn ảo
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  getTickets: (search?: string) => mockApi.getTickets(search),
  getTicketById: (id: string) => mockApi.getTicketById(id),
  createTicket: (data: { title: string; description: string }) => mockApi.createTicket(data),
  updateTicketStatus: (id: string, status: TicketStatus) => mockApi.updateTicketStatus(id, status),
  addComment: (ticketId: string, content: string) => mockApi.addComment(ticketId, content),
};