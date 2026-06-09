"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SkeletonList } from "@/components/SkeletonList";
import { ErrorCard } from "@/components/ErrorCard";
import Link from "next/link";

export default function TicketsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: tickets, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["tickets", searchTerm],
    queryFn: () => api.getTickets(searchTerm),
    staleTime: 30_000, 
  });

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; max-age=0";
    router.push("/login");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "In Progress": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Done": return "bg-green-100 text-green-800 hover:bg-green-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Danh sách Tickets</h1>
        <div className="space-x-4">
          <Button onClick={() => router.push("/tickets/create")}>+ Tạo Ticket mới</Button>
          <Button variant="outline" onClick={handleLogout}>Đăng xuất</Button>
        </div>
      </div>

      <div className="mb-6">
        <Input 
          placeholder="Tìm kiếm theo tiêu đề..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {isLoading && <SkeletonList />}
      
      {isError && (
        <ErrorCard 
          message={error instanceof Error ? error.message : "Đã có lỗi xảy ra khi tải danh sách."} 
          onRetry={() => refetch()} 
        />
      )}

      {!isLoading && !isError && tickets?.length === 0 && (
        <p className="text-gray-500 text-center py-8">Không tìm thấy ticket nào.</p>
      )}

      {!isLoading && !isError && tickets && tickets.length > 0 && (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Link href={`/tickets/${ticket.id}`} key={ticket.id} className="block">
              <div className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md hover:border-slate-300 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-slate-900">{ticket.title}</h3>
                  <Badge className={getStatusColor(ticket.status)} variant="secondary">
                    {ticket.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Ngày tạo: {new Date(ticket.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}