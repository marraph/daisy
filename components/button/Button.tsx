import { cva, VariantProps } from "class-variance-authority";
import React, {ReactNode} from "react";
import { cn } from "../../utils/cn";

const button = cva("w-full rounded-lg font-semibold text-base py-2 px-4 flex items-center", {
  variants: {
    theme: {
      dark: ["bg-black", "text-gray", "hover:text-white",],
      primary: ["bg-blue", "text-white"],
      ghost: ["bg-transparent", "text-white", "hover:bg-selected"],
      white: ["bg-white", "text-placeholder", "hover:text-black"],
    },
    border: {
      default: ["border", "border-white", "border-opacity-20"],
      none: [""],
    },
  },
  defaultVariants: {
    theme: "dark",
    border: "default",
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


const Button = React.forwardRef<HTMLDivElement, ButtonProps>(({ theme, border, text, className, ...props }) => (
    <button className={cn(button({ theme, border }), className)} {...props}>
      {props.children}
      {text}
    </button>
));
Button.displayName = "Button";

export { Button, ButtonIcon };