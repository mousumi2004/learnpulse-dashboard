import {
  BookOpen,
  Brain,
  Code2,
  Database,
  PenTool,
  Sparkles,
  type LucideIcon
} from "lucide-react";

export const COURSE_ICON_NAMES = ["BookOpen", "Brain", "Code2", "Database", "PenTool", "Sparkles"] as const;

export type CourseIconName = (typeof COURSE_ICON_NAMES)[number];

const iconMap: Record<CourseIconName, LucideIcon> = {
  BookOpen,
  Brain,
  Code2,
  Database,
  PenTool,
  Sparkles
};

export function getCourseIconName(iconName: string | null | undefined): CourseIconName {
  if (COURSE_ICON_NAMES.includes(iconName as CourseIconName)) {
    return iconName as CourseIconName;
  }

  return "BookOpen";
}

export function getCourseIcon(iconName: string | null | undefined): LucideIcon {
  return iconMap[getCourseIconName(iconName)];
}
