"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TicketStatus } from "@/types";
import { CommentSection } from "@/components/CommentSection";

export default function TicketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id as string;

  const { data: ticket, isLoading, error, isError } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => api.getTicketById(id),
    enabled: !!id, 
  });

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus: TicketStatus) => api.updateTicketStatus(id, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", id] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "In Progress": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Done": return "bg-green-100 text-green-800 hover:bg-green-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (isError) {
    const is404 = (error as any)?.status === 404;
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 text-center bg-white rounded-lg border shadow-sm py-16">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {is404 ? "404 - Ticket not found" : "Đã có lỗi xảy ra"}
        </h1>
        <p className="text-gray-600 mb-6">Không thể tìm thấy thông tin ticket bạn yêu cầu.</p>
        <Button onClick={() => router.push("/tickets")}>Quay lại danh sách</Button>
      </div>
    );
  }

  if (!ticket) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <Button variant="outline" className="mb-6" onClick={() => router.push("/tickets")}>
        &larr; Quay lại danh sách
      </Button>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{ticket.title}</h1>
          <Badge className={getStatusColor(ticket.status)} variant="secondary">
            {ticket.status}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-500 mb-6">
          Ngày tạo: {new Date(ticket.createdAt).toLocaleDateString("vi-VN")}
        </p>

        <div className="bg-slate-50 p-4 rounded-md border text-slate-700 min-h-[100px] mb-8 whitespace-pre-wrap">
          {ticket.description}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-sm font-medium mb-3 text-gray-700">Cập nhật trạng thái:</h3>
          <div className="flex gap-3">
            {(["Open", "In Progress", "Done"] as TicketStatus[]).map((status) => (
              <Button
                key={status}
                variant={ticket.status === status ? "default" : "outline"}
                onClick={() => updateStatusMutation.mutate(status)}
                disabled={updateStatusMutation.isPending || ticket.status === status}
                className={ticket.status === status ? getStatusColor(status) : ""}
              >
                {status}
              </Button>
            ))}
          </div>
          
          {updateStatusMutation.isError && (
            <p className="text-red-500 text-sm mt-2">Lỗi cập nhật trạng thái. Vui lòng thử lại.</p>
          )}
        </div>
      </div>
      <CommentSection ticketId={ticket.id} comments={(ticket as any).comments || []} />
    </div>
  );
}