"use client";

import React, {forwardRef, HTMLAttributes} from "react";
import { cn } from "../../utils/cn";

const Seperator: React.FC<HTMLAttributes<HTMLHRElement>> = ({ className, ...props}) => {
    return (
        <div className={cn("rounded-full")}>
            <hr className={cn("flex-grow text-zinc-800 dark:text-white text-opacity-20 dark:text-opacity-20", className)} {...props}/>
        </div>
    );
}

export { Seperator };
