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

type Story = StoryObj<typeof meta>

export const Small: Story = {
    args: {
        firstText: "Tasks",
        secondText: "API Controller doesn't work",
        size: "small",
        border: "none",
    },
};

export const Medium: Story = {
    args: {
        firstText: "Tasks",
        secondText: "API Controller doesn't work",
        size: "medium",
        border: "none",
    },
};

export const Large: Story = {
    args: {
        firstText: "Tasks",
        secondText: "API Controller doesn't work",
        size: "large",
        border: "none",
    },
};

export const Border: Story = {
    args: {
        firstText: "Tasks",
        secondText: "API Controller doesn't work",
        size: "medium",
        border: "default",
    },
};