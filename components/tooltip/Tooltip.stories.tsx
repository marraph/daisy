import {Tooltip} from './Tooltip';
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
    const triggerRef = useRef<HTMLDivElement>(null);

    return (
        <div className={"size-40 bg-error"}
             ref={triggerRef}
             onMouseEnter={() => addTooltip({
                 message: "this is a error",
                 anchor: "right",
                 children: <GitBranch size={14} className={"text-white"}/>,
                 triggerRef: triggerRef,
             })}
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