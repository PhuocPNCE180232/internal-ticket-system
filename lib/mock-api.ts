import { Ticket, Comment, TicketStatus } from "@/types";

let tickets: Ticket[] = [
  { id: "tkt-001", title: "Lỗi đăng nhập", description: "Người dùng không thể đăng nhập", status: "Open", createdAt: new Date().toISOString() },
  { id: "tkt-002", title: "Cập nhật logo", description: "Thay đổi logo công ty trên navbar", status: "Done", createdAt: new Date().toISOString() },
  { id: "tkt-003", title: "Lỗi thanh toán", description: "Cổng thanh toán Stripe bị từ chối", status: "In Progress", createdAt: new Date().toISOString() },
  { id: "tkt-004", title: "Thêm dark mode", description: "Khách hàng yêu cầu giao diện tối", status: "Open", createdAt: new Date().toISOString() },
  { id: "tkt-005", title: "Sai chính tả footer", description: "Tên công ty bị viết sai", status: "Done", createdAt: new Date().toISOString() }
];

let comments: Comment[] = [
  { id: "cmt-001", ticketId: "tkt-001", content: "Tôi đang kiểm tra lỗi này.", createdAt: new Date().toISOString() },
  { id: "cmt-002", ticketId: "tkt-001", content: "Đã sửa xong trong bản deploy mới nhất.", createdAt: new Date().toISOString() }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getTickets: async (search?: string): Promise<Ticket[]> => {
    await delay(400);
    if (search) {
      return tickets.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    }
    return tickets;
  },
  
  getTicketById: async (id: string): Promise<Ticket> => {
    await delay(400);
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) throw { status: 404, message: "Ticket not found" };
    return ticket;
  },
  
  createTicket: async (data: { title: string; description: string }): Promise<Ticket> => {
    await delay(600);
    const newTicket: Ticket = {
      id: `tkt-${crypto.randomUUID()}`,
      title: data.title,
      description: data.description,
      status: "Open",
      createdAt: new Date().toISOString(),
    };
    tickets.push(newTicket);
    return newTicket;
  },
  
  updateTicketStatus: async (id: string, status: TicketStatus): Promise<Ticket> => {
    await delay(400);
    const ticketIndex = tickets.findIndex(t => t.id === id);
    if (ticketIndex === -1) throw { status: 404, message: "Ticket not found" };
    tickets[ticketIndex] = { ...tickets[ticketIndex], status };
    return tickets[ticketIndex];
  },
  
  addComment: async (ticketId: string, content: string): Promise<Comment> => {
    await delay(500);
    const ticketExists = tickets.some(t => t.id === ticketId);
    if (!ticketExists) throw { status: 404, message: "Ticket not found" };
    const newComment: Comment = {
      id: `cmt-${crypto.randomUUID()}`,
      ticketId,
      content,
      createdAt: new Date().toISOString(),
    };
    comments.push(newComment);
    return newComment;
  }
};