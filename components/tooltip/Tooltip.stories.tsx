import {Tooltip, TooltipAnchor} from './Tooltip';
import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TooltipProvider, useTooltip} from "./TooltipProvider";
import {GitFork, Wrench} from "lucide-react";
import {Button} from "@/components/button/Button";

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
        <div className={"h-screen w-screen flex flex-col space-y-2 items-center justify-center"}>

            <Button text={"Build"}
                    icon={<Wrench size={16}/>}
                    onMouseEnter={(e) => {
                        addTooltip({
                            message: "Build your application",
                            shortcut: "B",
                            anchor: "rc" as TooltipAnchor,
                            trigger: e.currentTarget.getBoundingClientRect(),
                        });
                    }}
                    onMouseLeave={() => removeTooltip()}
            />

            <Button text={"Fork"}
                    icon={<GitFork size={16}/>}
                    onMouseEnter={(e) => {
                        addTooltip({
                            message: "Create a fork",
                            shortcut: "F",
                            anchor: "rc" as TooltipAnchor,
                            trigger: e.currentTarget.getBoundingClientRect(),
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