import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const button = cva("group w-full rounded-md font-semibold border border-white border-opacity-20", {
  variants: {
    theme: {
      dark: ["bg-black", "text-gray", "hover:text-white", "hover:scale-105", "hover:border-opacity-30"],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
      large: ["text-lg", "py-3", "px-6"],
    },
  },
  defaultVariants: {
    theme: "dark",
    size: "medium",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  icon_url?: string;
}

export const Button: React.FC<ButtonProps> = ({ className, theme, size, icon_url, ...props }) => {
  return (
      <button className={cn(button({ theme, size }), className)} {...props}>
        <div className="flex items-center">
          {icon_url && (
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,30,30">
                  <path d={ icon_url } className={"fill-gray group-hover:fill-white"}/>
                </svg>
              </span>
          )}
          {props.children}
        </div>
      </button>
  );
};