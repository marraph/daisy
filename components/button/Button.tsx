import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const button = cva("w-max rounded-lg font-medium text-sm py-2 px-4 flex items-center", {
  variants: {
    theme: {
      dark: ["bg-black", "text-gray", "hover:text-white", "hover:bg-selected", "border", "border-white", "border-opacity-20"],
      white: ["bg-white", "text-dark", "hover:text-black", "hover:bg-selectwhite"],
    },
    size: {
      small: ["text-xs", "py-1", "px-2"],
      medium: ["text-sm", "py-2", "px-3"],
      large: ["text-base", "py-3", "px-4"],
    },
  },
  defaultVariants: {
    theme: "dark",
    size: "medium",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  text: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ theme, text, className, ...props }, ref) => (
    <button className={cn(button({ theme }), className)} ref={ref} {...props}>
      {props.children}
      {text}
    </button>
));
Button.displayName = "Button";

export { Button };