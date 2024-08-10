"use client";

import React, {forwardRef} from "react";
import { cn } from "../../utils/cn";

const Seperator: React.FC = ({}) => {
    return (
        <div className={cn("rounded-full")}>
            <hr className={cn("flex-grow text-zinc-800 dark:text-white text-opacity-20")}></hr>
        </div>
    );
}

export { Seperator };
