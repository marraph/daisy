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

type Story = StoryObj<typeof Progressbar>

export const Default: Story = {
    args: {
        width: 400,
        height: 30,
        fill: 30,
    },
};
