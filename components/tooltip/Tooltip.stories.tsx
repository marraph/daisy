import {Tooltip, TooltipAnchor} from './Tooltip';
import {Meta, StoryObj} from "@storybook/react";
import React, {useRef} from "react";
import {TooltipProvider, useTooltip} from "./TooltipProvider";
import {GitBranch} from "lucide-react";

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

    const tooltipProps = {
        message: "This is an error",
        shortcut: "T",
        anchor: "rc" as TooltipAnchor
    };

    return (
        <div className={"flex flex-col space-y-2"}>
            <div className={"size-20 bg-error"}
                 onMouseEnter={(e) => {
                     addTooltip({
                         ...tooltipProps,
                         trigger: e.currentTarget.getBoundingClientRect()
                     });
                 }}
                 onMouseLeave={() => removeTooltip()}
            />
            <div className={"size-20 bg-error"}
                 onMouseEnter={(e) => {
                     addTooltip({
                         ...tooltipProps,
                         trigger: e.currentTarget.getBoundingClientRect()
                     });
                 }}
                 onMouseLeave={() => removeTooltip()}
            />
        </div>
    );
}

export const Default: Story = {
    render: () => {
        return (
            <div className={"w-screen h-screen"}>
                <TooltipProvider>
                    <TooltipTemplate/>
                </TooltipProvider>
            </div>
        );
    },
};