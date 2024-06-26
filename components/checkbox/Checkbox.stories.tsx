import { Checkbox } from './Checkbox';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
    args: {
        text: "hallo",
    },
};