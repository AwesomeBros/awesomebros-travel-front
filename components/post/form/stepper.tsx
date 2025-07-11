import { cn } from "@/lib/utils";

export default function Stepper({ count = 1, className = "" }) {
  return (
    <div className={cn("grid grid-cols-6 gap-3 h-1", className)}>
      {[...Array(count)]?.map((_, i) => (
        <div key={`active-${i}`} className="bg-primary w-full rounded-md h-1" />
      ))}
      {[...Array(6 - count)]?.map((_, i) => (
        <div
          key={`active-${i}`}
          className="bg-purple-300 w-full rounded-md h-1"
        />
      ))}
    </div>
  );
}
