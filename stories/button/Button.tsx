import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const button = cva("w-full rounded-md font-semibold", {
  variants: {
    theme: {
      dark: ["bg-black", "text-gray", "hover:text-white",],
      primary: ["bg-blue", "text-white"],
      ghost: ["bg-transparent", "text-white", "hover:bg-selected"],
      white: ["bg-white", "text-placeholder", "hover:text-black"],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
      large: ["text-lg", "py-2", "px-5"],
    },
    border: {
      default: ["border", "border-white", "border-opacity-20"],
      thick: ["border-2", "border-white", "border-opacity-20"],
      none: [""],
    },
    scaling: {
      default: ["hover:scale-105"],
      none: [""],
    },
  },
  defaultVariants: {
    theme: "dark",
    size: "medium",
    border: "default",
    scaling: "default",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({ className, theme, size, border, scaling, ...props }) => {
  return (
      <button className={cn(button({ theme, size, border, scaling }), className)} {...props}>
          {props.children}
      </button>
  );
};