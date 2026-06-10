"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentSchema, CommentFormValues } from "@/lib/validations";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Comment } from "@/types";

interface CommentSectionProps {
  ticketId: string;
  comments: Comment[];
}

export function CommentSection({ ticketId, comments }: CommentSectionProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });

  const addCommentMutation = useMutation({
    mutationFn: (content: string) => api.addComment(ticketId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      reset();
    },
  });

  const onSubmit = (data: CommentFormValues) => {
    addCommentMutation.mutate(data.content);
  };

  return (
    <div className="mt-8 border-t pt-8">
      <h3 className="text-lg font-bold mb-4">Bình luận ({comments.length})</h3>

      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-slate-50 p-4 rounded-lg border">
            <p className="text-sm text-slate-500 mb-2">
              {new Date(comment.createdAt).toLocaleString("vi-VN")}
            </p>
            <p className="text-slate-800">{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-slate-500 italic">Chưa có bình luận nào.</p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <textarea
          {...register("content")}
          className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Nhập bình luận của bạn..."
          disabled={addCommentMutation.isPending}
        />
        
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}

        {addCommentMutation.isError && (
          <p className="text-red-500 text-sm font-medium">
            Có lỗi xảy ra khi gửi bình luận. Vui lòng thử lại.
          </p>
        )}

        <Button 
          type="submit" 
          disabled={addCommentMutation.isPending}
        >
          {addCommentMutation.isPending ? "Đang gửi..." : "Gửi bình luận"}
        </Button>
      </form>
    </div>
  );
}