import { Tooltip } from './Tooltip';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Tooltip> = {
    title: "Components/Tooltip",
    component: Tooltip,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Small: Story = {
    render: () => {
        return

    },
};