import { NavigationItem } from './NavigationItem';
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof NavigationItem> = {
    title: "Components/NavigationItem",
    component: NavigationItem,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: "Calendar",
    },
};