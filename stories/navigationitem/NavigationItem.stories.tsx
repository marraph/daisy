import { NavigationItem } from './NavigationItem';
import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {CalendarDays} from "lucide-react";


const meta: Meta<typeof NavigationItem> = {
    title: "Components/NavigationItem",
    component: NavigationItem,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NavigationItem>

export const Default: Story = {
    args: {
        title: "Calendar",
        icon: <CalendarDays/>,
    },
};