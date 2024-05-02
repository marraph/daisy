import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";
import Image from "next/image"

const avatar = cva("relative inline-block object-cover object-center", {
    variants: {
        shape: {
            round: ["rounded-full"],
            box: ["rounded-xl"],
        },
    },
    defaultVariants: {
        shape: "round",
    },
});

export interface AvatarProps extends React.ButtonHTMLAttributes<HTMLImageElement>, VariantProps<typeof avatar> {
    img_url: string;
    height: number;
    width: number;
}

export const Avatar: React.FC<AvatarProps> = ({ shape, img_url, height, width, className, ...props }) => {
    return (
        <Image className={cn(avatar({ shape }), className)} {...props}
            src={img_url}
            alt={"Avatar"}
            width={width}
            height={height}
        />
    );
};