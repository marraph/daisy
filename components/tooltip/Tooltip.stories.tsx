import { Tooltip } from './Tooltip';
import {Meta, StoryObj} from "@storybook/react";
import React from "react";

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
        return (
        <div className={"size-40 bg-error"}>
            <Tooltip message={"hello this is a tooltip"} delay={1000}/>
        </div>
        );
    },
};