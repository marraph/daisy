import { SwitchButton } from './SwitchButton';
import {Meta, StoryObj} from "@storybook/react";
import React from "react";

const meta: Meta<typeof SwitchButton> = {
    title: "Components/SwitchButton",
    component: SwitchButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SwitchButton>

export const Default: Story = {
    render: () => {
        return (
            <SwitchButton firstTitle={"Table"} secondTitle={"Card"} className={"h-8"}/>
        );
    },
};