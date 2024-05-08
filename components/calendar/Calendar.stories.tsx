import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Calendar} from "./Calendar";

const meta: Meta<typeof Calendar> = {
    title: "Components/Calendar",
    component: Calendar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
    render: () => {
        return (
            <Calendar>

            </Calendar>
        );
    },
};