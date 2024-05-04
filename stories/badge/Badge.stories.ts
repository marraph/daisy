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

type Story = StoryObj<typeof meta>

export const Small: Story = {
    args: {
        text: "Badge",
        theme: "dark",
        size: "small",
        opacity: "medium",
        border: "none",
        roundness: "medium",
    },
};

export const Medium: Story = {
    args: {
        text: "Badge",
        theme: "dark",
        size: "medium",
        opacity: "medium",
        border: "none",
        roundness: "medium",
    },
};

export const Large: Story = {
    args: {
        text: "Badge",
        theme: "dark",
        size: "large",
        opacity: "medium",
        border: "none",
        roundness: "medium",
    },
};

export const Success: Story = {
    args: {
        text: "Badge",
        theme: "success",
        size: "medium",
        opacity: "medium",
        border: "none",
        roundness: "medium",
    },
};

export const Warning: Story = {
    args: {
        text: "Badge",
        theme: "warning",
        size: "medium",
        opacity: "medium",
        border: "none",
        roundness: "medium",
    },
};

export const Error: Story = {
    args: {
        text: "Badge",
        theme: "error",
        size: "medium",
        opacity: "medium",
        border: "none",
        roundness: "medium",
    },
};

export const Ghost: Story = {
    args: {
        text: "Badge",
        theme: "ghost",
        size: "medium",
        opacity: "medium",
        border: "default",
        roundness: "medium",
    },
};