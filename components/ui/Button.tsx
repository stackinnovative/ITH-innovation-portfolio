import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "./icons";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white",
  "on-dark": "border-[1.5px] border-white text-white hover:bg-white hover:text-ink",
};

const sizes = {
  sm: "h-12 px-6 text-[15px]", // header
  md: "h-[52px] px-6 text-[15px] md:text-base",
  lg: "h-14 px-7 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  arrow?: boolean;
  fullWidth?: boolean;
  className?: string;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps>;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", arrow = false, fullWidth = false, className, ...rest } = props;

  const classes = cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 font-semibold whitespace-nowrap transition-colors",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
  const content = (
    <>
      {children}
      {arrow ? <ArrowRightIcon size={size === "lg" ? 18 : 16} /> : null}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<LinkButtonProps, keyof CommonProps>;
    // Internal routes get client-side navigation; tel:, mailto:, external and #hash links stay plain anchors.
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
