import { Combobox } from './Combobox';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Combobox> = {
    title: "Components/Combobox",
    component: Combobox,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        buttonTitle: "Select an option",
        text_color: "white",
        options: ["Option 1", "Option 2", "Option 3"],
    },
};