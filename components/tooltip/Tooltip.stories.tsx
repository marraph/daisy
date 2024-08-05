import {Tooltip} from './Tooltip';
import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TooltipProvider, useTooltip} from "./TooltipProvider";

const meta: Meta<typeof Tooltip> = {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tooltip>

const TooltipTemplate = () => {
    const { addTooltip, removeTooltip } = useTooltip();

    return (
        <div className={"size-40 bg-error"}
             onMouseEnter={(e) => addTooltip({
                 message: "this is a error",
                 x: e.clientX,
                 y: e.clientY,
             })}
             onMouseLeave={() => removeTooltip()}
        />
    );

}

export const Default: Story = {
    render: () => {
        return (
            <div className={"h-screen w-screen left-1/2 w-1/2"}>
                <TooltipProvider>
                    <TooltipTemplate/>
                </TooltipProvider>
            </div>
        );
    },
};