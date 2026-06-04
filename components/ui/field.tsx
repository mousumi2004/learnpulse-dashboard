import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  name: string;
  type?: "text" | "number" | "hidden";
  defaultValue?: string | number;
  min?: number;
  max?: number;
  className?: string;
  required?: boolean;
  placeholder?: string;
};

export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  min,
  max,
  className,
  required,
  placeholder
}: FieldProps) {
  if (type === "hidden") {
    return <input name={name} type="hidden" value={defaultValue} />;
  }

  return (
    <label className={cn("grid gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500", className)}>
      {label}
      <input
        className="h-10 rounded-md border border-white/10 bg-zinc-950/70 px-3 text-sm normal-case tracking-normal text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-200/50"
        defaultValue={defaultValue}
        max={max}
        min={min}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}
