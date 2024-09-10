import { ColorPicker } from './ColorPicker';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof ColorPicker> = {
    title: "Components/ColorPicker",
    component: ColorPicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ColorPicker>

export const Default: Story = {
    args: {
        preColors: ["#4A90E2", "#FF6B6B", "#48D1CC", "#FFD700", "#9370DB", "#E17055", "#2ECC71", "#F39C12"],
        title: "Pick a color",
    },
};