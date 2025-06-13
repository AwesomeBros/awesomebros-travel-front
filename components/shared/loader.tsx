import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-4 justify-center", className)}>
      <div className="size-2 rounded-full bg-gray-500 animate-ping" />
      <div className="size-2 rounded-full bg-gray-500 animate-ping" />
      <div className="size-2 rounded-full bg-gray-500 animate-ping" />
    </div>
  );
}
