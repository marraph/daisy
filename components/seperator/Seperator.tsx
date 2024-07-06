"use client";

import React, {forwardRef} from "react";
import { cn } from "../../utils/cn";

const Seperator = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(({ className, ...props }, ref) => (
  <div className={cn("rounded-full")}>
      <hr className={cn("flex-grow text-white text-opacity-20")} ref={ref}{...props}></hr>
  </div>
));
Seperator.displayName = "Seperator";

export { Seperator };
