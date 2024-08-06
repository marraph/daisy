"use client";

import { cva, VariantProps } from "class-variance-authority";
import React, {forwardRef, ReactNode} from "react";
import { cn } from "../../utils/cn";

const button = cva("w-max rounded-lg font-medium text-sm py-2 px-4 flex items-center disabled:cursor-not-allowed disabled:hover:none disabled:bg-dark-light disabled:border disabled:border-edge", {
  variants: {
    theme: {
      black: ["bg-black", "text-gray", "hover:text-white", "hover:bg-dark", "border", "border-edge", "disabled:text-marcador"],
      dark: ["bg-black-light", "text-gray", "hover:text-white", "hover:bg-dark-light", "border", "border-edge", "disabled:text-marcador"],
      white: ["bg-white", "text-dark", "hover:text-black", "hover:bg-white-dark", "border", "border-white", "disabled:text-gray"],
    },
    size: {
      small: ["text-xs", "py-1", "px-2"],
      medium: ["text-sm", "py-1.5", "px-3"],
    },
  },
  defaultVariants: {
    theme: "dark",
    size: "medium",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  text: string;
  icon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ icon, theme, size, text, className, ...props }, ref) => (
    <button className={cn(button({ theme, size }), className)} ref={ref} {...props}>
      {icon && icon}
      {text}
    </button>
));
Button.displayName = "Button";

export { Button };