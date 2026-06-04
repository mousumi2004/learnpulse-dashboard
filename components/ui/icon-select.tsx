import { COURSE_ICON_NAMES } from "@/lib/icon-registry";
import { cn } from "@/lib/cn";

type IconSelectProps = {
  defaultValue?: string;
  className?: string;
};

export function IconSelect({ defaultValue = "BookOpen", className }: IconSelectProps) {
  return (
    <label className={cn("grid gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500", className)}>
      Icon
      <select
        className="h-10 rounded-md border border-white/10 bg-zinc-950/70 px-3 text-sm normal-case tracking-normal text-zinc-100 outline-none transition-colors focus:border-cyan-200/50"
        defaultValue={defaultValue}
        name="iconName"
      >
        {COURSE_ICON_NAMES.map((iconName) => (
          <option key={iconName} value={iconName}>
            {iconName}
          </option>
        ))}
      </select>
    </label>
  );
}
