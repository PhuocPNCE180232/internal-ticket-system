"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createTicketSchema, CreateTicketFormValues } from "@/lib/validations";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateTicketPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: CreateTicketFormValues) => api.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      router.push("/tickets");
    },
  });

  const onSubmit = (data: CreateTicketFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border mt-10">
      <h1 className="text-2xl font-bold mb-6">Tạo Ticket Mới</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tiêu đề</label>
          <Input 
            {...register("title")} 
            placeholder="Ví dụ: Lỗi đăng nhập trên Chrome..." 
            disabled={mutation.isPending}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mô tả chi tiết</label>
          <textarea 
            {...register("description")} 
            className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Mô tả các bước để tái tạo lỗi..."
            disabled={mutation.isPending}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {mutation.isError && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
            {mutation.error instanceof Error ? mutation.error.message : "Có lỗi xảy ra khi tạo ticket. Vui lòng thử lại."}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/tickets")}
            disabled={mutation.isPending}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Đang xử lý..." : "Tạo Ticket"}
          </Button>
        </div>
      </form>
    </div>
  );
}