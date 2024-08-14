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
        shortcut: "⌘ K",
        anchor: "bc" as TooltipAnchor
    };

    return (
        <div className={"size-40 bg-error"}
             onMouseEnter={(e) => {
                 addTooltip({ ...tooltipProps,
                     trigger: e.currentTarget.getBoundingClientRect()
                 });
             }}
             onMouseLeave={() => removeTooltip()}
        />
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