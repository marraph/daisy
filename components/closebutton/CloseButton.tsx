"use client";

import React, {forwardRef} from "react";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";

interface CloseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  iconSize?: number;
}

const CloseButton = React.forwardRef<HTMLDivElement, CloseButtonProps>(({ iconSize, className, ...props }) => {
      return (
          <button className={cn("group/close bg-black hover:bg-dark rounded-lg", className)} {...props} >
              <X size={iconSize ? iconSize : 16} className={"text-gray group-hover/close:text-white m-1"}/>
          </button>
      );
});
CloseButton.displayName = "CloseButton";

export {CloseButton};
