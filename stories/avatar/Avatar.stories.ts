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

type Story = StoryObj<typeof meta>

export const Round: Story = {
    args: {
        shape: "round",
        img_url: "/image-example.jpg",
        height: 100,
        width: 100,
    },
};

export const Box: Story = {
    args: {
        shape: "box",
        img_url: "/image-example.jpg",
        height: 100,
        width: 100,
    },
};