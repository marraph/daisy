"use client";

import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import {cn} from "../../utils/cn";

const appointment = cva("relative flex w-full h-20 text-white ", {
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

interface AppointmentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof appointment> {
    title: string;
    description?: string;
    width: number;
    height: number;
}


const Appointment =  React.forwardRef<HTMLDivElement, AppointmentProps>(({ title, description, theme, width, height, className, ...props }, ref) => (
    <div className={cn(appointment({ theme }), className, "bg-opacity-10 rounded-lg")} ref={ref} {...props} style={{width: `${width}px`, height: `${height}px`}}>
        <div className={cn(appointment({theme}), "h-full w-3 mr-4 rounded-tl-lg rounded-bl-lg")}></div>
        <div className={cn("flex flex-col py-2", className)}>
            <span className={"text-lg font-semibold"}>{title}</span>
            {description &&
                <span className={"text-sm"}>{description}</span>
            }
        </div>
    </div>
));
Appointment.displayName = "Appointment";

export { Appointment };