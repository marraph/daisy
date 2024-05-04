import { SwitchButton } from './SwitchButton';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof SwitchButton> = {
    title: "Components/SwitchButton",
    component: SwitchButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Small: Story = {
    args: {
        size: "small",
        firstTitle: "ButtonOne",
        secondTitle:"ButtonTwo",
    },
};

export const Medium: Story = {
    args: {
        size: "medium",
        firstTitle: "ButtonOne",
        secondTitle:"ButtonTwo",
    },
};

export const Large: Story = {
    args: {
        size: "large",
        firstTitle: "ButtonOne",
        secondTitle:"ButtonTwo",
    },
};