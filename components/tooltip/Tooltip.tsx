"use client";

import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "../../utils/cn";

interface TooltipProps extends HTMLAttributes<HTMLDivElement>{
    message: string;
    delay?: number;
    color?: string;
    y: number;
    x: number;
}


const Tooltip: React.FC<TooltipProps> = ({ x, y, delay, color, message, ...props }) => {
    return (
        <div className={"absolute flex flex-row space-x-2 rounded-lg py-2 px-2 bg-dark text-white z-50"}
             style={{top: y -40, left: x +10}}
        >
            {props.children}
            <span className={"items-start"}>{message}</span>
        </div>
    );
}

export {Tooltip};
export type {TooltipProps};