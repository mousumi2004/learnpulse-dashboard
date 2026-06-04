import { cn } from "@/lib/cn";

type SurfaceProps = {
  children: React.ReactNode;
  className?: string;
  as?: "article" | "section" | "aside" | "div";
};

export function Surface({ children, className, as: Component = "article" }: SurfaceProps) {
  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] shadow-[0_24px_90px_rgba(0,0,0,0.34)]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_0%,rgba(99,243,255,0.08),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)]",
        className
      )}
    >
      {children}
    </Component>
  );
}
