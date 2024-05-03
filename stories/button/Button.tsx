import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const button = cva("w-full rounded-md font-semibold border border-white border-opacity-20", {
  variants: {
    theme: {
      dark: ["bg-black", "text-gray", "hover:text-white"],
      primary: ["bg-blue", "text-white"],
      ghost: ["bg-transparent", "text-white", "border-none", "hover:bg-selected"],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
      large: ["text-lg", "py-2", "px-5"],
    },
    purpose: {
      button: ["hover:scale-105"],
      combo: [""],
    }
  },
  defaultVariants: {
    theme: "dark",
    size: "medium",
    purpose: "button"
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  icon_url?: string;
}

export const Button: React.FC<ButtonProps> = ({ className, theme, size, purpose, icon_url, ...props }) => {
  return (
      <button className={cn(button({ theme, size, purpose }), className)} {...props}>
          {props.children}
      </button>
  );
};