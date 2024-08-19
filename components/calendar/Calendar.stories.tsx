import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {CalendarSingle} from "./Calendar";

const meta: Meta<typeof CalendarSingle> = {
    title: "Components/Calendar",
    component: CalendarSingle,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CalendarSingle>;

export const Default: Story = {
    render: () => {
        return (
            <CalendarSingle/>
        );
    },
};