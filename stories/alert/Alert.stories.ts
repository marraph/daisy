import { Alert } from './Alert';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Alert> = {
    title: "Components/Alert",
    component: Alert,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Small: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "small",
        border: "default",
        opacity: "none",
    },
};

export const Medium: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "medium",
        border: "default",
        opacity: "none",
    },
};

export const Large: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "large",
        border: "default",
        opacity: "none",
    },
};

export const Success: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "success",
        size: "medium",
        border: "default",
        opacity: "default",
    },
};

export const Warning: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "warning",
        size: "medium",
        border: "default",
        opacity: "default",
    },
};

export const Error: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "error",
        size: "medium",
        border: "default",
        opacity: "default",
    },
};

export const Ghost: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "medium",
        border: "default",
        opacity: "default",
    },
};

export const NoBorder: Story = {
    args: {
        title: "Alert",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "medium",
        border: "none",
        opacity: "default",
    },
};
