import React from "react";
import {Basecard} from "../basecard/Basecard";

export interface TooltipProps extends React.AreaHTMLAttributes<HTMLDivElement> {
    title?: string;
    description: string;
    theme: "dark" | "success" | "warning" | "error";
    size: "small" | "medium" | "large";
    border: "default" | "none";
    opacity: "default" | "none";
}

export const Tooltip: React.FC<TooltipProps> = ({ title, description, theme, border, size, opacity, className}) => {
    return (
        <Basecard theme={theme} border={border} size={size} opacity={opacity} className={className}>
            <div className={"group rounded-md font-semibold flex flex-col items-start"}>
                {title != null && (
                    <h3 className={theme === "dark" ? "text-white" : "text-black"}>
                        {title}
                    </h3>
                )}
                <p className={"font-normal float-left"}>
                    {description}
                </p>
            </div>
        </Basecard>
    );
};