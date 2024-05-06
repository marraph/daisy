import React from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "../../utils/cn";

const alert = cva("group w-full rounded-lg font-semibold py-2 px-2 bg-black text-gray flex flex-col items-start", {
    variants: {
        theme: {
            dark: ["bg-black", "text-gray"],
            success: ["bg-success", "bg-opacity-30", "text-white"],
            warning: ["bg-warning", "bg-opacity-30", "text-white"],
            error: ["bg-error", "bg-opacity-30", "text-white"],
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

interface AlertTitleProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title: string;
}

interface AlertDescriptionProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    description: string;
}

interface AlertProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof alert> {}


const AlertTitle = React.forwardRef<HTMLDivElement, AlertTitleProps>(({ title, className, ...props }, ref) => (
        <div className={cn("text-white", className)} ref={ref} {...props}>
            {title}
        </div>
));
AlertTitle.displayName = "AlertTitle";


const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(({ description, className, ...props }, ref) => (
    <div className={cn("font-normal float-left", className)} ref={ref} {...props}>
        {description}
    </div>
));
AlertDescription.displayName = "AlertDescription";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ theme, border, opacity, className, ...props }, ref) => (
    <div className={cn(alert({ theme, }), className)} ref={ref} {...props}>
    </div>
));
Alert.displayName = "Alert";


export { Alert, AlertTitle, AlertDescription };