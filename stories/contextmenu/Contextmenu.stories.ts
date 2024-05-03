import { Contextmenu } from './Contextmenu';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Contextmenu> = {
    title: "Components/Contextmenu",
    component: Contextmenu,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        text_color: "white",
        options: ["Delete", "Edit ", "Notify Owner", "Cancel"],
    },
};