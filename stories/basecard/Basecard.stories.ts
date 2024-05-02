import { Basecard } from './Basecard';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Basecard> = {
    title: "Components/Basecard",
    component: Basecard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        theme: "dark",
    },
};