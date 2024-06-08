import React from 'react';
import { ShinyBadge } from './ShinyBadge';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof ShinyBadge> = {
    title: "Components/ShinyBadge",
    component: ShinyBadge,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ShinyBadge>

export const Default: Story = {
    render: () => {
        return <ShinyBadge color={"transparent-yellow"} text={"Hello World!"}></ShinyBadge>;
    },
};