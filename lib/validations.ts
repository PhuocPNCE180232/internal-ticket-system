import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Vui lòng nhập đúng định dạng email" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;