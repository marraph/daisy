import {Tooltip, TooltipRef} from './Tooltip';
import {Meta, StoryObj} from "@storybook/react";
import React, {useRef} from "react";

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

export const Default: Story = {
    render: () => {
        const tooltipRef = useRef<TooltipRef>(null);

        return (
            <>
                <div className={"size-40 bg-error"}
                     onMouseEnter={(event) => tooltipRef.current?.show(event)} onMouseLeave={() => tooltipRef.current?.hide()}>
                </div>

                <Tooltip message={"this is a tooltip"} delay={500} ref={tooltipRef}/>
            </>

        );
    },
};