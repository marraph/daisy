import React from 'react';
import { Avatar } from './Avatar';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Avatar> = {
    title: "Components/Avatar",
    component: Avatar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Avatar>

export const Round: Story = {
    render: () => {
        return (
            <Avatar shape={"round"} width={100} height={100} img_url={"/image-example.jpg"}/>
        );
    },
};

export const Box: Story = {
    render: () => {
        return (
            <Avatar shape={"box"} width={100} height={100} img_url={"/image-example.jpg"}/>
        );
    },
};