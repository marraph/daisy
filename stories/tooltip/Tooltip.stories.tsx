import { Tooltip, TooltipTitle, TooltipDescription } from './Tooltip';
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

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => {
        return (
        <Tooltip theme={"dark"}>
            <TooltipTitle title={"Title"}/>
            <TooltipDescription description={"This is lorem ipsum balni wniwgigiw"} />
        </Tooltip>
        );
    },
};