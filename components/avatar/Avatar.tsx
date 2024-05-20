"use client";

import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";
import Image from "next/image"

const avatar = cva("relative inline-block object-cover object-center", {
    variants: {
        shape: {
            round: ["rounded-full"],
            box: ["rounded-2xl"],
        },
    },
    defaultVariants: {
        shape: "round",
    },
});

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof avatar> {
    img_url: string;
    size: number;
}

const Avatar =  React.forwardRef<HTMLImageElement, AvatarProps>(({ shape, img_url, size, className, ...props }, ref) => (
        <Image className={cn(avatar({ shape }), className)} ref={ref}  {...props}
            src={img_url}
            alt={"Avatar"}
            width={size}
            height={size}
        />
));
Avatar.displayName = "Avatar";

export { Avatar };