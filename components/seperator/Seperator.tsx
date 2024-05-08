import React from "react";
import {cn} from "../../utils/cn";

const Seperator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(({ className, ...props }, ref) => (
        <div className={cn("rounded-full")}>
            <hr className={cn("flex-grow text-placeholder my-2 rounded-lg")} ref={ref} {...props}>
            </hr>
        </div>
));
Seperator.displayName = "Seperator";

export { Seperator };