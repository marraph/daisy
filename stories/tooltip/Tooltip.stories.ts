import { Tooltip } from './Tooltip';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Tooltip> = {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Small: Story = {
    args: {
        title: "Tooltip",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "small",
        border: "default",
        opacity: "none",
    },
};

export const Medium: Story = {
    args: {
        title: "Tooltip",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "medium",
        border: "default",
        opacity: "none",
    },
};

export const Large: Story = {
    args: {
        title: "Tooltip",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "large",
        border: "default",
        opacity: "none",
    },
};

export const Transparent: Story = {
    args: {
        title: "Tooltip",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "medium",
        border: "default",
        opacity: "default",
    },
};

export const WithoutTitle: Story = {
    args: {
        title: "",
        description: "This is an  lorem ipsum arma virumque.",
        theme: "dark",
        size: "medium",
        border: "default",
        opacity: "none",
    },
};