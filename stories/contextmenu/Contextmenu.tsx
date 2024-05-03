import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import {Basecard} from "../basecard/Basecard";
import {cn} from "../../utils/cn";

const contextmenu = cva("group items-center top-full flex flex-col", {
    variants: {
        text_color: {
            white: ["text-white"],
            gray: ["text-gray"],
        },
    },
    defaultVariants: {
        text_color: "white",
    },
});

export interface ContextmenuProps extends React.AreaHTMLAttributes<HTMLDivElement>, VariantProps<typeof contextmenu> {
    options: string[];
}

export const Contextmenu: React.FC<ContextmenuProps> = ({ text_color, options, className, ...props }) => {
    return (
        <div className={"relative"}>
            <Basecard className={cn(contextmenu({ text_color }), className)} {...props}>
                {options.map((option, index) => (
                    <div key={index} className={"w-full bg-black text-gray cursor-pointer rounded-md hover:bg-selected hover:text-white px-4 py-2"}>
                        {option}
                    </div>
                ))}
            </Basecard>
        </div>
    );
};