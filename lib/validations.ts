import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Vui lòng nhập đúng định dạng email" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const createTicketSchema = z.object({
  title: z.string()
    .min(1, { message: "Vui lòng nhập tiêu đề" })
    .max(100, { message: "Tiêu đề không được vượt quá 100 ký tự" }),
  description: z.string()
    .min(1, { message: "Vui lòng nhập mô tả" }),
});

export type CreateTicketFormValues = z.infer<typeof createTicketSchema>;