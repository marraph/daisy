import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Textarea} from "./Textarea";

const meta: Meta<typeof Textarea> = {
    title: "Components/Textarea",
    component: Textarea,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
    render: () => {
        return (
            <Textarea placeholder="Small input">
            </Textarea>
        );
    },
};