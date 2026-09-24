import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "nav";
};

/** Max 1440px wide; side padding 16px phone / 24px tablet / 64px desktop. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-[1440px] px-4 md:px-6 xl:px-16", className)}>{children}</Tag>;
}
