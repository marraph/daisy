import React from 'react';
import { Badge } from './Badge';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Badge> = {
    title: "Components/Badge",
    component: Badge,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Badge>

export const Default: Story = {
    render: () => {
        return <Badge text={"Hello World!"} border={"white"} className={"rounded-md"}></Badge>;
    },
};
