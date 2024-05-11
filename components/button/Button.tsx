"use client";

import { cva, VariantProps } from "class-variance-authority";
import React, {ReactNode} from "react";
import { cn } from "../../utils/cn";

const button = cva("w-full rounded-lg font-semibold text-base py-2 px-4 flex items-center", {
  variants: {
    theme: {
      dark: ["bg-black", "text-gray", "hover:text-white", "hover:bg-selected", "border", "border-white", "border-opacity-20"],
      primary: ["bg-blue", "text-white", "hover:bg-lightblue"],
      white: ["bg-white", "text-dark", "hover:text-black"],
      outline: ["bg-transparent", "text-white", "hover:bg-white", "hover:text-dark", "border-2", "border-white"],
    },
  },
  defaultVariants: {
    theme: "dark",
  },
});

export interface ButtonIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  text: string;
}


const ButtonIcon = React.forwardRef<HTMLDivElement, ButtonIconProps>(({ icon, className, ...props }, ref) => (
    <div className={cn("mr-3", className)} ref={ref} {...props}>
      {icon}
    </div>
));
ButtonIcon.displayName = "ButtonIcon";


const Button = React.forwardRef<HTMLDivElement, ButtonProps>(({ theme, text, className, ...props }) => (
    <button className={cn(button({ theme }), className)} {...props}>
      {props.children}
      {text}
    </button>
));
Button.displayName = "Button";

export { Button, ButtonIcon };