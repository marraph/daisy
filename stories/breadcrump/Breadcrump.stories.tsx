import React from 'react';
import { Breadcrump } from './Breadcrump';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Breadcrump> = {
    title: "Components/Breadcrump",
    component: Breadcrump,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Breadcrump>

export const Small: Story = {
    render: () => {
        return <Breadcrump pastText={"Home"} nowText={"About"} />
    },
};