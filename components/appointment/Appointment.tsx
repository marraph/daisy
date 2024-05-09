import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import {cn} from "../../utils/cn";

const appointment = cva("relative flex w-60 h-20 text-white ", {
    variants: {
        theme: {
            blue: ["bg-calBlue", "text-calBlue"],
            green: ["bg-calGreen", "text-calGreen"],
            purple: ["bg-calPurple", "text-calPurple"],
            pink: ["bg-calPink", "text-calPink"],
            yellow: ["bg-calYellow", "text-calYellow"],
        }
    },
    defaultVariants: {
        theme: "blue",
    },
});

interface AppointmentTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

interface AppointmentDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    description: string;
}

export interface AppointmentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof appointment> {
    width: number;
    height: number;
}

const AppointmentTitle = React.forwardRef<HTMLDivElement, AppointmentTitleProps>(({ title, className, ...props }, ref) => (
    <div className={cn("text-lg font-semibold" , className)} ref={ref} {...props}>
        {title}
    </div>
));
AppointmentTitle.displayName = "AppointmentTitle";


const AppointmentDescription = React.forwardRef<HTMLDivElement, AppointmentDescriptionProps>(({ description, className, ...props }, ref) => (
    <div className={cn(className)} ref={ref} {...props}>
        {description}
    </div>
));
AppointmentDescription.displayName = "AppointmentDescription";

const Appointment =  React.forwardRef<HTMLDivElement, AppointmentProps>(({ theme, width, height, className, ...props }, ref) => (
    <div className={cn(appointment({ theme }), className, "bg-opacity-10 rounded-lg")} ref={ref} {...props} style={{width: `${width}px`, height: `${height}px`}}>
        <div className={cn(appointment({theme}), "h-full w-3 mr-4 rounded-tl-lg rounded-bl-lg")}></div>
        <div className={cn("flex flex-col py-2", className)}>
            {props.children}
        </div>
    </div>
));
Appointment.displayName = "Appointment";

export { Appointment, AppointmentTitle, AppointmentDescription };