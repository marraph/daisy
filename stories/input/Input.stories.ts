import { Input } from './Input';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Small: Story = {
    args: {
        theme: "dark",
        field_size: "small",
        placeholder: "Insert value!",
    },
};

export const Medium: Story = {
    args: {
        theme: "dark",
        field_size: "medium",
        placeholder: "Insert value!",
    },
};

export const Large: Story = {
    args: {
        theme: "dark",
        field_size: "large",
        placeholder: "Insert value!",
    },
};