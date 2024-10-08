import { Seperator } from './Seperator';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Seperator> = {
    title: "Components/Seperator",
    component: Seperator,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Seperator>

export const Default: Story = {};