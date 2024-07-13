"use client";

import { cva, VariantProps } from "class-variance-authority";
import React, {forwardRef, ReactNode} from "react";
import { cn } from "../../utils/cn";

const button = cva("w-max rounded-lg font-medium text-sm py-2 px-4 flex items-center", {
  variants: {
    theme: {
      dark: ["bg-black", "text-gray", "hover:text-white", "hover:bg-dark", "border", "border-white", "border-opacity-20",
             "disabled:cursor-not-allowed", "disabled:hover:none", "disabled:bg-dark-light", "disabled:text-marcador",
             "disabled:border", "disabled:border-edge"],
      white: ["bg-white", "text-dark", "hover:text-black", "hover:bg-white-dark", "border", "border-white",
              "disabled:cursor-not-allowed", "disabled:hover:none", "disabled:bg-dark-light", "disabled:text-gray",
              "disabled:border", "disabled:border-edge",],
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