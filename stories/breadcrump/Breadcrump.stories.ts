import { Breadcrump } from './Breadcrump';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof Breadcrump> = {
    title: "Components/Breadcrump",
    component: Breadcrump,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        firstText: "Tasks",
        secondText: "API Controller doesn't work",
        size: "medium",
    },
};