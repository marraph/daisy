"use client";

import {type VariantProps, cva } from "class-variance-authority";
import Image from "next/image"
import React from "react";
import {useState} from "react";
import {cn} from "../../utils/cn";

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
    img_url?: string;
    size: number;
}

const Avatar: React.FC<AvatarProps> = ({ shape, img_url, size, className, ...props }) => {
    const generateRandomGradient = () => {
        const colors = [
            'bg-gradient-to-br from-red-500 to-yellow-500',
            'bg-gradient-to-br from-green-400 to-blue-500',
            'bg-gradient-to-br from-purple-500 to-pink-500',
            'bg-gradient-to-br from-yellow-300 to-red-500',
            'bg-gradient-to-br from-blue-400 to-emerald-500',
            'bg-gradient-to-br from-indigo-500 to-purple-500'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const [imgError, setImgError] = useState(false);
    const gradientClass = generateRandomGradient();

    if (!img_url || imgError) {
        return (
            <div className={cn(avatar({ shape }), 'flex items-center justify-center', className, gradientClass)}
                style={{ width: size, height: size }}
            />
        );
    }

    return (
        <Image
            className={cn(avatar({ shape }), className)}
            {...props}
            src={img_url}
            alt={props.alt || "Avatar"}
            width={size}
            height={size}
            onError={() => setImgError(true)}
        />
    );
}

export { Avatar };