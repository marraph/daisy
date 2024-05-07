import React from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "../../utils/cn";

const tooltip = cva("group w-full rounded-lg font-medium py-2 px-2 bg-black", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            white: ["bg-white", "text-black"]
        },
        border: {
            default: ["border", "border-white", "border-opacity-20"],
            none: [""]
        },
        opacity: {
            default: ["bg-opacity-30"],
            none: [""],
        }
    },
    defaultVariants: {
        theme: "dark",
        border: "default",
        opacity: "none",
    },
});

interface TooltipTitleProps extends React.AreaHTMLAttributes<HTMLDivElement>{
    title: string;
}

interface TooltipDescriptionProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    description: string;
}

interface TooltipProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof tooltip> {}



const TooltipTitle = React.forwardRef<HTMLDivElement, TooltipTitleProps>(({ title, className, ...props }, ref) => (
    <div className={"text-white"} ref={ref} {...props}>
        {title}
    </div>
));
TooltipTitle.displayName = "TooltipHeader";


const TooltipDescription = React.forwardRef<HTMLDivElement, TooltipDescriptionProps>(({ description, className, ...props }, ref) => (
    <div className={"font-normal float-left"} ref={ref} {...props}>
        {description}
    </div>
));
TooltipDescription.displayName = "TooltipHeader";


const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({ theme, border, opacity, className, ...props }, ref) => (
        <div className={cn(tooltip({ theme, border, opacity }), className)} ref={ref} {...props}>
            <div className={"group rounded-md font-semibold flex flex-col items-start"}>
                {props.children}
            </div>
        </div>
));
Tooltip.displayName = "Tooltip";

export { Tooltip, TooltipTitle, TooltipDescription };