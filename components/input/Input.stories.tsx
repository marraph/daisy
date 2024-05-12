import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Input} from "./Input";

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>

export const Default: Story = {
    render: () => {
        return (
            <Input placeholder="Small input" label={"Label Title"} border={"none"}>
            </Input>
        );
    },
};
