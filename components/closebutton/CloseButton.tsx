"use client";

import React from "react";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";

interface CloseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  iconSize?: number;
  onClose?: () => void;
}

const CloseButton = React.forwardRef<HTMLDivElement, CloseButtonProps>(({ onClose, iconSize, className, ...props }) => {

    const handleClick = () => {
        if (onClose) {
            onClose();
        }
    };

      return (
          <button className={cn("group/close bg-black hover:bg-dark rounded-lg", className)} {...props} onClick={handleClick}>
              <X size={iconSize ? iconSize : 16} className={"text-gray group-hover/close:text-white m-1"}/>
          </button>
      );
});
CloseButton.displayName = "CloseButton";

export { CloseButton };
