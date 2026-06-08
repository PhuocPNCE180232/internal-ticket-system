import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonList() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 border rounded-lg shadow-sm space-y-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}