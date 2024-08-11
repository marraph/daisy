"use client";

import React, {forwardRef} from "react";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";

interface CloseButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  iconSize?: number;
}

const CloseButton: React.FC<CloseButtonProps> = ({ iconSize, className, ...props }) => {
      return (
          <button className={cn("group/close bg-zinc-200 dark:bg-black-light rounded-lg", className)} {...props}>
              <X size={iconSize ? iconSize : 16}
                 className={"text-zinc-700 dark:text-gray group-hover/close:text-zinc-800 dark:group-hover/close:text-white m-1"}
              />
          </button>
      );
}

export {CloseButton};
