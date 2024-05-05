import React from "react";
import {Basecard} from "../basecard/Basecard";

export interface AlertProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    theme: "dark" | "success" | "warning" | "error";
    size: "small" | "medium" | "large";
    border: "default" | "none";
    opacity: "default" | "none";
}

export const Alert: React.FC<AlertProps> = ({ title, description, theme, size, border, opacity, className}) => {
    return (
        <Basecard border={border} theme={theme} size={size} opacity={opacity}  className={className}>
            <div className={"flex flex-col items-start"}>
                <h3 className={"text-white"}>
                    {title}
                </h3>
                <p className={"font-normal float-left"}>
                    {description}
                </p>
            </div>
        </Basecard>

    );
};