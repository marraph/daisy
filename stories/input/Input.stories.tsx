import React from 'react';
import { Input } from './Input';
import {Meta, StoryObj} from "@storybook/react";

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

export const Small: Story = {
    render: () => {
        return <Input placeholder="Small input"/>;
    },
};
