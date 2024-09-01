import React from 'react';
import { Avatar } from './Avatar';
import type {Meta, StoryObj} from "@storybook/react";

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
            <Avatar shape={"round"}
                    img_url={"/image-example.jpg"}
                    size={100}
            />
        );
    },
};

export const Box: Story = {
    render: () => {
        return (
            <Avatar shape={"box"}
                    img_url={"/image-example.jpg"}
                    size={100}
            />
        );
    },
};

export const FallbackRound: Story = {
    render: () => {
        return (
            <Avatar shape={"round"}
                    size={100}
            />
        );
    },
};

export const FallbackBox: Story = {
    render: () => {
        return (
            <Avatar shape={"box"}
                    size={100}
            />
        );
    },
};