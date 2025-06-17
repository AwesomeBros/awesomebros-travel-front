import { Loader2 } from "lucide-react";

export function Loader({ className }: { className?: string }) {
  return <Loader2 className="size-6 text-slate-300 animate-spin" />;
}
