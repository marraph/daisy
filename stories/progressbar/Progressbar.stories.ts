import { Progressbar } from './Progressbar';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Progressbar> = {
    title: "Components/Progressbar",
    component: Progressbar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const White: Story = {
    args: {
        theme: "white",
        width: 100,
        height: 10,
        fill: 30,
    },
};

export const Primary: Story = {
    args: {
        theme: "primary",
        width: 100,
        height: 10,
        fill: 70,
    },
};