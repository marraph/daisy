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

export interface AppointmentProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof appointment> {
    title: string;
    description: string;
}

export const Appointment: React.FC<AppointmentProps> = ({ theme, title, description, className, ...props }) => {
    return (
            <div className={cn(appointment({ theme }), className, "bg-opacity-10 rounded-lg")} {...props}>
                <div className={cn(appointment({theme}), "h-full w-3 mr-4 rounded-tl-lg rounded-bl-lg")}></div>
                <div className={"flex flex-col py-2"}>
                    <h3 className={"text-lg font-semibold"}>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
    );
};